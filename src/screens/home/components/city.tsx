import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface Data {
  image: string;
  name: string;
}

export const City: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <View style={cityStyle.container}>
      <Image style={cityStyle.image} source={{ uri: data.image }} />
      <Text numberOfLines={1}>{data.name}</Text>
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
