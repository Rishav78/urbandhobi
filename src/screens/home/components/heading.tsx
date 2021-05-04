import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Clickable } from "@urbandhobi/components/click";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import MessageTile from "@urbandhobi/components/messageTile";
import { RootReducerType } from "@urbandhobi/@types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getDefaultAddress } from "@urbandhobi/actions";
import { setDefaultAddress } from "@urbandhobi/redux/home/home.action";

const addressSelector = (state: RootReducerType) => state.home.defaultAddress;

const Heading = () => {
  const dispatch = useDispatch();
  const defaultAddress = useSelector(addressSelector, shallowEqual);
  const { navigateToAddress } = useNavigate();

  const fetchDefaultAddress = async () => {
    try {
      const address = await getDefaultAddress();
      dispatch(setDefaultAddress(address));
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDefaultAddress();
  }, []);
  return (
    <View style={styles.container}>
      <Clickable
        style={styles.clickable}
        onPress={navigateToAddress}>
        {!defaultAddress ?
          <MessageTile message="NO DEFAULT ADDRESS" /> :
          <>
            <Text
              numberOfLines={1}
              style={styles.addressTitle}>{defaultAddress.title || defaultAddress.email}</Text>
            <Text
              numberOfLines={1}
              style={styles.address}>{defaultAddress.houseno}, {defaultAddress.locality}, {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}</Text>
          </>
        }
      </Clickable>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  clickable: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  addressTitlecontainer: {
    display: "flex",
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  addressTitle: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "bold",
  },
  address: {
    fontSize: 12,
    color: "#4A4A4A",
  },
});
