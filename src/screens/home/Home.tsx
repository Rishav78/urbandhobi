import React, { useCallback, useEffect } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AppLogo } from "@urbandhobi/components";
import Heading from "./components/heading";
import ServiceSection from "./components/service";
import ServiceArea from "./components/serviceArea";
import { RefreshScrollView } from "@urbandhobi/components/pullrefresh";
import ServiceCard from "./components/serviceCard";
import { Service } from "@urbandhobi/@types";
import Loading from "@urbandhobi/components/loading";
import { useService, useCart, useNavigate, useAddress } from "@urbandhobi/hooks";
import { Appbar } from "react-native-paper";
import { theme } from "@urbandhobi/lib/constants";
import Ionicons from "react-native-vector-icons/Ionicons";

export interface HomeScreenProps { }

export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
  const { navigateToService, navigateToCart } = useNavigate();

  const { getAndSetServiceType, serviceType, getServiceStates } = useService();
  const { getCart } = useCart();
  const { getDefaultAddress } = useAddress();
  const serviceTypeArray = Object.values(serviceType);

  const onServicePress = useCallback((service: Service) => {
    navigateToService({ service });
  }, []);

  const onRefresh = useCallback(async () => {
    await Promise.all([getCart(), getAndSetServiceType(), getServiceStates(), getDefaultAddress()]);
  }, []);

  const _cartIcon = useCallback(() => {
    return (
      <Ionicons
        name="md-cart-outline"
        size={27}
        color="#fff" />
    );
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);


  return (
    <SafeAreaView style={styles.safearea}>
      <Appbar.Header style={styles.header} theme={theme.black}>
        <View style={styles.logoContainer}>
          <AppLogo contentContainerStyle={styles.logoContainer} iconStyle={styles.logoIcon} />
        </View>
        <View style={{ flex: 1 }} />
        <Appbar.Action onPress={navigateToCart} icon={_cartIcon} />
      </Appbar.Header>
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
  safearea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: { height: 40 },
  logoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "transparent",
  },
  logoIcon: {
    fontSize: hp("4.5%"),
  },
});
