import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@urbandhobi/components";
import AntDesign from "react-native-vector-icons/AntDesign";

export const AuthHeaderLeft = () => {
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      style={leftStyles.icon}
      color="black"
    />
  );
};

export const leftStyles = StyleSheet.create({
  icon: {
    marginLeft: 15,
  },
});

export const AuthHeaderRight = () => {
  return (
    <Button
      style={rightStyles.button}
      textStyle={rightStyles.text}
      transparent
      title="SIGNUP" />
  );
};

const rightStyles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  text: {
    color: "#333",
  },
});

export const AuthHeader = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    elevation: 0,
  },
});
