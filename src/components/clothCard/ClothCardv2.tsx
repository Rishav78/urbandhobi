import { SupportedCloth } from "@urbandhobi/@types";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardView from "../cardview";
import Counter from "./counter";

export interface ClothCardProps {
  imageUri?: string;
  data: SupportedCloth;
}

const ClothCard: React.FC<ClothCardProps> = ({
  data,
}) => {
  const title = useMemo(() => toTitleCase(data.name), [data.name]);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <View style={styles.clothDescription}>
          <Text style={{fontSize: wp("5%")}}>
            {title}
          </Text>
          <Text>Rs. {data.cost}/Pcs</Text>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.imageContainer} />
          <CardView style={styles.counterContainer}>
            <Counter />
          </CardView>
        </View>
      </View>
    </View>
  );
};

export default memo(ClothCard);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp("3%"),
    paddingVertical: wp("5%"),
  },
  clothDescription: {
    flex: 1,
    paddingHorizontal: wp("2%"),
    justifyContent: "center",
  },
  rightSide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("2%"),
  },
  imageContainer: {
    width: wp("28%"),
    height: wp("27%"),
    borderRadius: wp("3%"),
    backgroundColor: "#333",
  },
  counterContainer: {
    position: "absolute",
    width: "90%",
    height: wp("9%"),
    bottom: -wp("3.5%"),
    borderRadius: wp("1%"),
    overflow: "hidden",
  },
});
