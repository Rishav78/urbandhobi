import { RootReducerType, SupportedCloth } from "@urbandhobi/@types";
import { getSupportedLaundry } from "@urbandhobi/actions";
import { Button, Seperator } from "@urbandhobi/components";
import ClothCard from "@urbandhobi/components/clothCard/ClothCardv2";
import Header from "@urbandhobi/components/header/Header";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.laundry.data;

export const Laundry = () => {

  const [counter, setCounter] = useState<{[key: string]: number}>({});

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
      <ClothCard 
        
        data={item} />
    );
  }, [counter]);

  useEffect(() => {
    fetchLaundryData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        headerLeftContainerStyle={{ marginHorizontal: wp("3%") }} />
      <RefreshFlatList
        data={clothes}
        ListFooterComponent={<View style={{ height: hp("8%") }} />}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={() => (
          <Seperator
            style={styles.seprator}
            contentContainerStyle={{ marginVertical: hp("1%") }}
          />
        )}
        renderItem={_renderItem}
      />
      <View style={styles.buttonContainer}>
        <Button title="ADD TO CARD" />
      </View>
    </SafeAreaView>
  );
};

export default Laundry;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  seprator: {
    height: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: wp("3%")
  }
});
