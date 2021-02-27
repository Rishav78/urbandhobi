import { SupportedCloth } from "@urbandhobi/@types";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, {memo} from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardView from "../cardview";

export interface ClothCardProps {
  imageUri?: string;
  data: SupportedCloth
}

const ClothCard: React.FC<ClothCardProps> = ({
  data,
}) => {
  const title = toTitleCase(data.name);
  return (
    <CardView style={{
      backgroundColor: "#fff",
      marginHorizontal: wp("3%"),
    }}>
      <View style={{
        flexDirection: "row",
        paddingVertical: wp("2%"),
      }}>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: wp("2%"),
        }}>
          <View style={{
            width: wp("30%"),
            height: wp("30%"),
            backgroundColor: "#333",
          }} />
        </View>
        <View style={{ flex: 1, paddingHorizontal: wp("2%") }}>
          <Text style={{
            fontSize: wp("5%"),
          }}>
            {title}
          </Text>
        <Text>Rs. {data.cost}/Pcs</Text>
        </View>
      </View>
    </CardView>
  );
};

export default memo(ClothCard);

const styles = StyleSheet.create({});
