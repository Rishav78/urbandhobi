import React, { useCallback, useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardView from "@urbandhobi/components/cardview";
import { Clickable } from "@urbandhobi/components/click";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import { Service } from "@urbandhobi/@types";

export interface ServiceCardProps {
  data: Service;
  onPress?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  data,
  onPress,
}) => {
  const {
    name: title,
    image: {
      url: image,
    },
    daysRequired,
  } = data;
  const name = useMemo(() => toTitleCase(title), [title]);

  const onClick = useCallback(() => {
    if (onPress) {
      onPress(data);
    }
  }, [data]);

  return (
    <CardView style={styles.container}>
      <Clickable onPress={onClick} style={styles.clickable}>
        <View style={styles.content}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.days}>
            {typeof daysRequired === "number" ? `${daysRequired} Days` : "Unvailable"}
          </Text>
        </View>
      </Clickable>
    </CardView>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    width: wp("31%"),
    height: wp("31%"),
    backgroundColor: "#fff",
    marginVertical: heightPercentageToDP("1%"),
  },
  clickable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp("15%"),
    height: wp("15%"),
    marginVertical: wp("2%"),
  },
  title: {
    color: "#4A4A4A",
    fontSize: wp("4%"),
  },
  days: {
    color: "#4A4A4A",
    fontSize: wp("2.5%"),
  },
});
