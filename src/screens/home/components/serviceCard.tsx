import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardView from "@urbandhobi/components/cardview";
import { Clickable } from "@urbandhobi/components/click";

export interface ServiceCardProps {
  title: string;
  category?: string;
  image: string;
  days: number;
  onPress?: (event: GestureResponderEvent) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  image,
  days,
  onPress,
}) => {
  return (
    <CardView style={styles.container}>
      <Clickable onPress={onPress} style={styles.clickable}>
        <View style={styles.content}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
          {days && <Text style={styles.days}>{days} Days</Text>}
        </View>
      </Clickable>
    </CardView>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    width: wp("45%"),
    height: wp("45%"),
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
    width: wp("25%"),
    height: wp("25%"),
    marginVertical: wp("2%"),
  },
  title: {
    color: "#4A4A4A",
    fontSize: wp("4%"),
  },
  days: {
    color: "#4A4A4A",
    fontSize: wp("3.5%"),
  },
});
