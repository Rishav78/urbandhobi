import { RootReducerType, SupportedCloth } from "@urbandhobi/@types";
import { getSupportedLaundry } from "@urbandhobi/actions";
import ClothCard from "@urbandhobi/components/clothCard/ClothCard";
import Header from "@urbandhobi/components/header/Header";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.laundry.data;

export const Laundry = () => {
  const clothes = useSelector(clothSelector, shallowEqual);
  const dispatch = useDispatch();

  const fetchLaundryData = async () => {
    const cloths = await getSupportedLaundry();
    if (cloths) {
      dispatch(setSupportedLaundry(cloths));
    }
  };

  const _keyExtractor = useCallback((item: SupportedCloth, index: number) => {
    return item.id;
  }, []);

  const _renderItem = useCallback(({ item }: { item: SupportedCloth }) => {
    return (
      <ClothCard data={item} />
    );
  }, []);

  useEffect(() => {
    fetchLaundryData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        headerLeftContainerStyle={{ marginHorizontal: wp("3%") }} />
      <RefreshFlatList
        data={clothes}
        ListHeaderComponent={<View style={{ height: hp("2%") }} />}
        ListFooterComponent={<View style={{ height: hp("2%") }} />}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={() => <View style={{ height: hp("2%") }} />}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
};

export default Laundry;

const styles = StyleSheet.create({});
