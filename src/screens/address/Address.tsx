import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../@types";
import { getMyAddress } from "../../actions/address";
import Header from "../../components/header/Header";
import { setAddress } from "../../redux/address/address.action";
import AddressCard from "./components/addressCard";

const addressSelector = (state: RootReducerType) => state.address.data;

export const Address = () => {

  const dispatch = useDispatch();
  const addresses = useSelector(addressSelector, shallowEqual);

  const fetchAddress = useCallback(async () => {
    const myAddress = await getMyAddress();
    if (myAddress) {
      dispatch(setAddress(myAddress));
    }
  }, []);

  useEffect(() => {
    console.log(addresses)
    if (addresses.length === 0) {
      fetchAddress();
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerLeftContainerStyle={styles.headerleft} />
      <Text style={styles.title}>SAVED ADDRESS</Text>
      <Text style={styles.subTitle}>Manage Address</Text>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {
            addresses &&
            addresses.map(address => (
              <AddressCard
                key={address.id}
                address={address.address}
                city={address.city.city}
                country={address.city.country}
                state={address.city.state}/>
            ))
          }
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
