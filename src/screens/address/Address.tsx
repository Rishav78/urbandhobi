import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@urbandhobi/@types";
import { getMyAddress } from "@urbandhobi/actions/address";
import { FloatingAction } from "@urbandhobi/components";
import Header from "@urbandhobi/components/header/Header";
import { setAddress } from "@urbandhobi/redux/address/address.action";
import AddressCard from "./components/addressCard";
import { useNavigate } from "@urbandhobi/hooks/navigation";

const addressSelector = (state: RootReducerType) => state.address.data;

export const Address = () => {

  const {navigateToAddAddress} = useNavigate();
  const dispatch = useDispatch();
  const addresses = useSelector(addressSelector, shallowEqual);

  const fetchAddress = useCallback(async () => {
    const myAddress = await getMyAddress();
    if (myAddress) {
      dispatch(setAddress(myAddress));
    }
  }, []);

  useEffect(() => {
    fetchAddress();
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
                title={address.title}
                address={address.location} />
            ))
          }
        </ScrollView>
      </View>
      <FloatingAction onPress={navigateToAddAddress}>
        <AntDesign
          name="plus"
          size={28}
          color="#fff" />
      </FloatingAction>
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
