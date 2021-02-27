import React from "react";
import IconIndicator from "@urbandhobi/components/iconIndicator";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import { Clickable } from "@urbandhobi/components/click";

export const HeaderRight = () => {
  const { navigateToCart } = useNavigate();
  return (
    <>
      <IconIndicator style={rightStyle.icon} icon="notifications-outline" />
      <Clickable onPress={navigateToCart}>
        <IconIndicator
          style={rightStyle.icon}
          icon="md-cart-outline" />
      </Clickable>
    </>
  );
};

const rightStyle = StyleSheet.create({
  icon: {
    marginHorizontal: wp("2%"),
  },
});
