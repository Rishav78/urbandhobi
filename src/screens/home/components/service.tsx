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
  services: Array<Service>;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  services,
}) => {
  return (
    <Animated.View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
      </View>
      <View style={styles.serviceContainer   }>
        {
          services.map(service => (
            <ServiceCard
              key={service.id}
              image={service.image.url}
              title={service.name}
              days={service.daysRequired}
            />
          ))
        }
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
