import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@urbandhobi/@types";
import { deleteAddress, getMyAddress, makeAddressDefault } from "@urbandhobi/actions";
import { FloatingAction } from "@urbandhobi/components";
import Header from "@urbandhobi/components/header/Header";
import { setAddress } from "@urbandhobi/redux/address/address.action";
import AddressCard from "./components/addressCard";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import MessageTile from "@urbandhobi/components/messageTile";
import { Address as AddressInstance } from "@urbandhobi/@types";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";

const addressSelector = (state: RootReducerType) => state.address.data;

export const Address = () => {

  const { navigateToAddAddress } = useNavigate();
  const dispatch = useDispatch();
  const addresses = useSelector(addressSelector, shallowEqual);

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

  const onRefresh = useCallback(async (cb: () => void) => {
    await fetchAddress();
    cb();
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
          data={addresses}
          keyExtractor={keyExtractor}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={!addresses || addresses.length === 0 ?
            <MessageTile
              style={styles.message}
              message="NO SAVED ADDRESS" /> : <></>
          }
          onRefreshHandler={onRefresh}
        />
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
});
