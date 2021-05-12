import React from "react";
import { AddressView } from "@urbandhobi/components/address/Address";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { globalStyles, theme } from "@urbandhobi/lib/constants";
import { Platform } from "react-native";

const HEADER_TITLE = Platform.select({ios: "SAVED ADDRESS", android: "Saved address"});

export const Address = () => {
  const {goBack} = useNavigation();
  return (
    <SafeAreaView style={globalStyles.safearea}>
      <Appbar.Header style={globalStyles.headerContainer} theme={theme.light}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={HEADER_TITLE} />
      </Appbar.Header>
      <AddressView mode="config" />
    </SafeAreaView>
  );
};

export default Address;
