import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "../../../components";

export const AuthHeaderLeft = () => {
  return (
    <></>
  );
};

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
