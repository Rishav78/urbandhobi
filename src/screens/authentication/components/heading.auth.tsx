import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { AppLogo } from "../../../components";
import { colors } from "../../../lib/constants";

export interface SigninHeadingProps {
  contentContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  title: string;
  subTitle: string;
}

export const Heading: React.FC<SigninHeadingProps> = ({ 
  title,
  subTitle,
  contentContainerStyle = {},
  titleStyle = {},
  subTitleStyle = {},
}) => {
  return (
    <>
      <View style={[styles.container, contentContainerStyle]}>
        <View style={styles.headings}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
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
