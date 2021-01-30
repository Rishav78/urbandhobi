import React from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppLogo } from "../../components";
import Header from "../../components/header/Header";
import Heading from "./components/heading";
import ServiceArea from "./components/serviceArea";

export interface HomeScreenProps { }

export const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
  return (
    <SafeAreaView>
      <Header
        headerContainerStyle={styles.header}
        headerTitle={<AppLogo contentContainerStyle={styles.logoContainer} iconStyle={styles.logoIcon} />}
        headerLeft={null} />
      <Heading />
      <ServiceArea />
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
