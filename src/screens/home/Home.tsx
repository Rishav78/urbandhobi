import React, { useCallback } from "react";
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
import { useNavigate } from "@urbandhobi/hooks/navigation";

export interface HomeScreenProps { }


export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
  const { navigateToLaundry } = useNavigate();

  const onWashPressHandler = useCallback(() => {
    navigateToLaundry();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerContainerStyle={styles.header}
        headerTitle={<AppLogo contentContainerStyle={styles.logoContainer} iconStyle={styles.logoIcon} />}
        headerLeft={null} />
      <Heading />
      <RefreshScrollView
        onRefreshHandler={() => { }}
        showsVerticalScrollIndicator={false}>
        <ServiceArea />
        <ServiceSection title="LAUNDRY">
          <ServiceCard
            onPress={onWashPressHandler}
            title="wash"
            image="https://laundry-app.herokuapp.com/f/app/i/wash.png"
            days={5}
          />
          <ServiceCard
            onPress={onWashPressHandler}
            title="wash & iron"
            image="https://laundry-app.herokuapp.com/f/app/i/wash-and-iron.png"
            days={5}
          />
          <ServiceCard
            onPress={onWashPressHandler}
            title="wash & fold"
            image="https://laundry-app.herokuapp.com/f/app/i/wash-and-fold.png"
            days={5}
          />
        </ServiceSection>
        <ServiceSection title="dry clean">
          <ServiceCard
            title="men"
            image="https://laundry-app.herokuapp.com/f/app/i/men.png"
            days={5}
          />
          <ServiceCard
            title="women"
            image="https://laundry-app.herokuapp.com/f/app/i/women.png"
            days={5}
          />
          <ServiceCard
            title="stream press"
            image="https://laundry-app.herokuapp.com/f/app/i/stream-iron.png"
            days={5}
          />
          <ServiceCard
            title="dry clean"
            image="https://laundry-app.herokuapp.com/f/app/i/accessories.png"
            days={5}
          />
        </ServiceSection>
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
