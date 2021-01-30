import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Clickable } from "../../../components/click";

const AddressCard = () => {
  return (
    <Animated.View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="home-city-outline"
          size={24}
          color="#0C0C0C" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.address}>404, Premlata enclave, Near doaba mill, Mandi gobindgarh, Punjab, India</Text>
        <View style={styles.action}>
          <Clickable activeOpacity={0.5}>
            <Text style={styles.delete}>Delete</Text>
          </Clickable>
          <Clickable activeOpacity={0.5} style={styles.clickable}>
            <Text style={styles.makedefault}>Make Default</Text>
          </Clickable>
        </View>
      </View>
    </Animated.View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: wp("2%"),
    marginVertical: hp("2%"),
    flex: 1,
  },
  iconContainer: {},
  detailsContainer: {
    marginHorizontal: wp("4%"),
    borderBottomWidth: 0.5,
    borderBottomColor: "#898989",
  },
  title: {
    color: "#0C0C0C",
    fontSize: wp("5%"),
  },
  address: {
    color: "#898989",
    fontSize: wp("4%"),
    marginVertical: hp("1%"),
  },
  action: {
    display: "flex",
    flexDirection: "row",
    marginTop: hp("1%"),
    marginBottom: hp("3%"),
  },
  clickable: {
    marginHorizontal: wp("5%"),
  },
  delete: {
    color: "#ff0000",
  },
  makedefault: {
    color: "#33cc33",
  },
});
