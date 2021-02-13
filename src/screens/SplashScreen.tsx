import { AppLogo } from "@urbandhobi/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <AppLogo
        contentContainerStyle={styles.iconContainer}
        iconStyle={styles.icon} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: wp("45%"),
    height: wp("45%"),
    borderRadius: wp("4%"),
  },
  icon: {
    fontSize: wp("30%"),
  },
});
