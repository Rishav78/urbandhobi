import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@urbandhobi/@types";
import { deleteAddress, getMyAddress, makeAddressDefault } from "@urbandhobi/actions";
import Header from "@urbandhobi/components/header/Header";
import { setAddress } from "@urbandhobi/redux/address/address.action";
import AddressCard from "./components/addressCard";
import { useNavigate } from "@urbandhobi/hooks";
import { Address as AddressInstance } from "@urbandhobi/@types";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { FAB } from "react-native-paper";

const addressSelector = (state: RootReducerType) => state.address.data;

export const Address = () => {

  const { navigateToAddAddress } = useNavigate();
  const dispatch = useDispatch();
  const addresses = useSelector(addressSelector, shallowEqual);
  const [FABVisible, setFABVisible] = useState(true);

  const fetchAddress = useCallback(async () => {
    const myAddress = await getMyAddress();
    if (myAddress) {
      dispatch(setAddress(myAddress));
    }
  }, []);

  const onDefaulClickHandler = useCallback(async (address: AddressInstance) => {
    try {
      await makeAddressDefault(address.id);
      await fetchAddress();
    }
    catch (error) {

    }
  }, []);

  const onDeleteClickHandler = useCallback(async (address: AddressInstance) => {
    try {
      await deleteAddress(address.id);
      await fetchAddress();
    }
    catch (error) {

    }
  }, []);

  const keyExtractor = useCallback((address: AddressInstance) => {
    return address.id;
  }, []);

  const _renderItem = useCallback(({ item }: { index: number, item: AddressInstance }) => {
    return (
      <AddressCard
        onDelete={onDeleteClickHandler}
        onMakeDefault={onDefaulClickHandler}
        data={item} />
    );
  }, []);

  const onRefresh = useCallback(async () => {
    await fetchAddress();
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
        <RefreshFlatList
          onMomentumScrollBegin={() => setFABVisible(false)}
          onMomentumScrollEnd={() => setFABVisible(true)}
          data={addresses}
          keyExtractor={keyExtractor}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          onRefreshHandler={onRefresh}
        />
      </View>
      <FAB
        onPress={navigateToAddAddress}
        visible={FABVisible}
        style={styles.fab}
        color="#333"
        icon={FABIcon} />
    </SafeAreaView>
  );
};

export default Address;

const FABIcon = () => (
  <AntDesign
    name="plus"
    size={24}
    color="#fff" />
);

const styles = StyleSheet.create({
  headerleft: {
    marginHorizontal: wp("3%"),
  },
  title: {
    color: "#0C0C0C",
    fontSize: wp("6%"),
    marginHorizontal: wp("3%"),
  },
  message: {
    elevation: 10,
    backgroundColor: "#fff",
    paddingVertical: hp("2%"),
    marginHorizontal: wp("3%"),
    borderRadius: wp("2%"),
  },
  subTitle: {
    color: "#898989",
    marginVertical: hp("2%"),
    marginHorizontal: wp("3%"),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#333",
  },
});
