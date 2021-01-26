import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

export interface AppLogoProps {
  contentContainerStyle?: ViewStyle;
  iconStyle?: TextStyle;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  contentContainerStyle = {},
  iconStyle = {},
}) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <Text style={[styles.symbol, iconStyle]}>UD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    backgroundColor: "#000",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  symbol: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
});

