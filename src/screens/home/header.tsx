import React from "react";
import IconIndicator from "@urbandhobi/components/iconIndicator";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

export const HeaderRight = () => {
  return (
    <>
      <IconIndicator style={rightStyle.icon} icon="notifications-outline" />
      <IconIndicator style={rightStyle.icon} icon="md-cart-outline" />
    </>
  );
};

const rightStyle = StyleSheet.create({
  icon: {
    marginHorizontal: wp("2%"),
  },
});
