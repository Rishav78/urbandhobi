import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLogo } from "@urbandhobi/components";
import Header from "@urbandhobi/components/header/Header";
import Heading from "./components/heading";
import ServiceSection from "./components/service";
import ServiceArea from "./components/serviceArea";
import { RefreshScrollView } from "@urbandhobi/components/pullrefresh";
import ServiceCard from "./components/serviceCard";
import { HeaderRight } from "./header";
import { Service } from "@urbandhobi/@types";
import Loading from "@urbandhobi/components/loading";
import { useService, useCart, useNavigate } from "@urbandhobi/hooks";

export interface HomeScreenProps { }

export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
  const { navigateToService } = useNavigate();

  const {getAndSetServiceType, serviceType, getServiceStates} = useService();
  const {getCart} = useCart();
  const serviceTypeArray = Object.values(serviceType);

  const onServicePress = useCallback((service: Service) => {
    navigateToService({service});
  }, []);

  const onRefresh = useCallback(async () => {
    await Promise.all([getCart(), getAndSetServiceType(), getServiceStates()]);
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerContainerStyle={styles.header}
        headerTitle={<AppLogo contentContainerStyle={styles.logoContainer} iconStyle={styles.logoIcon} />}
        headerRight={HeaderRight}
        headerLeft={null} />
      <Heading />
      <RefreshScrollView
        onRefreshHandler={onRefresh}
        showsVerticalScrollIndicator={false}>
        <ServiceArea />
        <Loading loading={serviceTypeArray.length === 0}>
          {
            serviceTypeArray.map(type => (
              <ServiceSection key={type.id} title={type.name}>
                {
                  type.services.map(service => (
                    <ServiceCard
                      key={service.id}
                      onPress={onServicePress}
                      data={service}
                    />
                  ))
                }
              </ServiceSection>
            ))
          }
        </Loading>
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
