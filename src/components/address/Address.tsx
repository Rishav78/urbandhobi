import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AddressCard from "./addressCard";
import { useAddress, useNavigate } from "@urbandhobi/hooks";
import { Address } from "@urbandhobi/@types";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { FAB } from "react-native-paper";
import Service from "@urbandhobi/lib/service";

export interface AddressViewProps {
  mode?: "select" | "config";
  onSelect?: (address: Address) => void;
}

export const AddressView = ({
  mode = "config",
  onSelect,
}: AddressViewProps) => {

  const { navigateToAddAddress } = useNavigate();
  const { addressArray, getAddress, getDefaultAddress } = useAddress();
  const [FABVisible, setFABVisible] = useState(true);

  const onDefaulClickHandler = useCallback(async (address: Address) => {
    try {
      const service = new Service().address();
      await service.makeDefault(address.id);
      getDefaultAddress();
      await getAddress();
    }
    catch (error) {

    }
  }, []);

  const onDeleteClickHandler = useCallback(async (address: Address) => {
    try {
      const service = new Service().address();
      await service.delete(address.id);
      await getAddress();
    }
    catch (error) {

    }
  }, []);

  const keyExtractor = useCallback((address: Address) => {
    return address.id;
  }, []);

  const _renderItem = useCallback(({ item }: { index: number, item: Address }) => {
    return (
      <AddressCard
        mode={mode}
        onDelete={onDeleteClickHandler}
        onMakeDefault={onDefaulClickHandler}
        data={item}
        onSelect={onSelect} />
    );
  }, [mode, onSelect]);

  const onRefresh = useCallback(async () => {
    await getAddress();
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <Text style={styles.subTitle}>{mode === "config" ? "Manage Address" : "Select Address"}</Text>
      <View style={{ flex: 1 }}>
        <RefreshFlatList
          onMomentumScrollBegin={() => setFABVisible(false)}
          onMomentumScrollEnd={() => setFABVisible(true)}
          data={addressArray}
          keyExtractor={keyExtractor}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          onRefreshHandler={onRefresh}
        />
      </View>
      {mode === "config" &&
        <FAB
          onPress={navigateToAddAddress}
          visible={FABVisible}
          style={styles.fab}
          color="#333"
          icon={FABIcon} />
      }
    </>
  );
};

export default memo(AddressView);

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
  subTitle: {
    color: "#898989",
    marginVertical: hp("1%"),
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
