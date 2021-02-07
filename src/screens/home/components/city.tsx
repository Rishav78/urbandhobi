import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";

interface CityProps {
  image: string;
  name: string;
}

export const City: React.FC<CityProps> = ({ image, name }) => {
  const areaName = useMemo(() => toTitleCase(name), [name]);
  return (
    <View style={cityStyle.container}>
      <Image style={cityStyle.image} source={{ uri: image }} />
      <Text numberOfLines={1}>{areaName}</Text>
    </View>
  );
};

export default City;

const cityStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("15%"),
    marginHorizontal: wp("3%"),
  },
  image: {
    width: wp("17%"),
    height: wp("17%"),
    borderRadius: wp("17%") / 2,
  },
});
