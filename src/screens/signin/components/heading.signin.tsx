import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { SigninMethod } from "../../../@types";
import { AppLogo } from "../../../components";
import { colors } from "../../../lib/constants";

export interface SigninHeadingProps {
  method?: SigninMethod;
  contentContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
}

const subHeading = {
  email: "LOGIN with your email and password",
};

export const Heading: React.FC<SigninHeadingProps> = ({ 
  method = "email",
  contentContainerStyle = {},
  titleStyle = {},
  subTitleStyle = {},
}) => {
  return (
    <>
      <View style={[styles.container, contentContainerStyle]}>
        <View style={styles.headings}>
          <Text style={[styles.title, titleStyle]}>LOGIN</Text>
          <Text style={[styles.subTitle, subTitleStyle]}>{subHeading[method]}</Text>
        </View>
        <View>
          <AppLogo />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  headings: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 25,
    color: colors.heading,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    color: colors.subHeading,
  },
});
