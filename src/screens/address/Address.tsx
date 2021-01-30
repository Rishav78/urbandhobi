import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header/Header";
import AddressCard from "./components/addressCard";

export const Address = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        headerLeftContainerStyle={styles.headerleft} />
      <Text style={styles.title}>SAVED ADDRESS</Text>
      <Text style={styles.subTitle}>Manage Address</Text>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <AddressCard />
          <AddressCard />
          <AddressCard />
          <AddressCard />
          <AddressCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  headerleft: {
    marginHorizontal: wp("3%"),
  },
  title: {
    color: "#0C0C0C",
    fontSize: wp("6%"),
    marginHorizontal: wp("3%"),
  },
  subTitle: {
    color: "#898989",
    marginVertical: hp("2%"),
    marginHorizontal: wp("3%"),
  },
});
