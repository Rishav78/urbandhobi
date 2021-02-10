import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLogo } from "@urbandhobi/components";
import Header from "@urbandhobi/components/header/Header";
import Heading from "./components/heading";
import ServiceSection from "./components/service";
import ServiceArea from "./components/serviceArea";
import { RootReducerType } from "@urbandhobi/@types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getServices } from "@urbandhobi/actions";
import { setService } from "@urbandhobi/redux/home/home.action";
import { RefreshScrollView } from "@urbandhobi/components/pullrefresh";

export interface HomeScreenProps { }

const serviceSelector = (state: RootReducerType) => state.home.data;

export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {

  const dispatch = useDispatch();
  const sections = useSelector(serviceSelector, shallowEqual);

  const getAvailableService = async () => {
    try {
      const serviceSections = await getServices();
      if (serviceSections) {
        dispatch(setService(serviceSections));
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sections.length === 0) {
      getAvailableService();
    }
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerContainerStyle={styles.header}
        headerTitle={<AppLogo contentContainerStyle={styles.logoContainer} iconStyle={styles.logoIcon} />}
        headerLeft={null} />
      <Heading />
      <RefreshScrollView
        onRefreshHandler={() => {}}
        showsVerticalScrollIndicator={false}>
        <ServiceArea />
        {
          sections.map(section => (
            <ServiceSection
              title={section.name}
              services={section.services}
              key={section.id} />
          ))
        }
      </RefreshScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    height: hp("5%"),
  },
  logoContainer: {
    height: hp("5%"),
    backgroundColor: "transparent",
    elevation: 0,
    padding: 0,
    margin: 0,
  },
  logoIcon: {
    fontSize: hp("4.5%"),
  },
});
