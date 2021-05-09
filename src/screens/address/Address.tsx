import React from "react";
import { AddressView } from "@urbandhobi/components/address/Address";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

export const Address = () => {
  const {goBack} = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
      <Appbar.Header theme={{colors: {primary: "#fff"}}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Saved address" />
      </Appbar.Header>
      <AddressView mode="config" />
    </SafeAreaView>
  );
};

export default Address;
