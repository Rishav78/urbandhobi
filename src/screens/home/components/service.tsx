import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import ServiceCard from "./serviceCard";
import { Service } from "@urbandhobi/@types/services";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export interface ServiceSectionProps {
  title: string;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  children,
}) => {
  return (
    <Animated.View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
      </View>
      <View style={styles.serviceContainer}>
        {children}
      </View>
    </Animated.View>
  );
};

export default ServiceSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("1%"),
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#4A4A4A",
    fontSize: wp("5%"),
  },
  serviceContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
