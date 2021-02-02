import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLogo } from "../../components";
import Header from "../../components/header/Header";
import Heading from "./components/heading";
import ServiceSection from "./components/service";
import ServiceArea from "./components/serviceArea";
import { RootReducerType } from "../../@types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getServices } from "../../actions";
import { setService } from "../../redux/home/home.action";

export interface HomeScreenProps { }

const serviceSelector = (state: RootReducerType) => state.home.data;
const loadingSelector = (state: RootReducerType) => state.home.loading;

export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {

  const dispatch = useDispatch();
  const sections = useSelector(serviceSelector, shallowEqual);
  const loading = useSelector(loadingSelector, shallowEqual);


  const getAvailableService = async () => {
    try {
      const serviceSections = await getServices();
      console.log(serviceSections);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ServiceArea />
        {
          sections.map(section => (
            <ServiceSection
              title={section.name}
              services={section.services}
              key={section.id} />
          ))
        }
      </ScrollView>
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
