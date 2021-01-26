import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const AppLogo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>U</Text>
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
    fontSize: 40,
  },
});

