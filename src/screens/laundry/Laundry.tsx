import { Route, useRoute } from "@react-navigation/native";
import { RootReducerType, SupportedCloth } from "@urbandhobi/@types";
import { getSupportedLaundry } from "@urbandhobi/actions";
import { Button, Seperator } from "@urbandhobi/components";
import ClothCard from "@urbandhobi/components/clothCard/ClothCardv2";
import Header from "@urbandhobi/components/header/Header";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { addToWash } from "@urbandhobi/redux/cart/cart.action";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.laundry.data;

export const Laundry = () => {
  const { params } = useRoute<Route<string, { id: "wash" | "washAndIron" | "washAndFold" | "dryClean" }>>();
  const [counter, setCounter] = useState<{ [key: string]: number }>({});

  const clothes = useSelector(clothSelector, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  const fetchLaundryData = async () => {
    const cloths = await getSupportedLaundry();
    if (cloths) {
      dispatch(setSupportedLaundry(cloths));
    }
  };

  const onAddCloth = (cloth: SupportedCloth) => {
    return () => {
      setCounter(state => ({
        ...state,
        [cloth.id]: (state[cloth.id] || 0) + 1,
      }));
      return true;
    };
  };

  const onAddToCard = useCallback(() => {
    switch (params.id) {
      case "wash":
        addToWash(counter);
        break;
      default:
        return Alert.alert("ERROR", "Some error occur, please try again later");
    }
    Alert.alert("ADDED TO CART");
  }, [counter]);

  const _keyExtractor = useCallback((item: SupportedCloth) => {
    return item.id;
  }, []);

  const _renderItem = useCallback(({ item }: { item: SupportedCloth }) => {
    return (
      <ClothCard
        onAdd={onAddCloth(item)}
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
        <Button onPress={onAddToCard} activeOpacity={1} title="ADD TO CARD" />
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
    paddingHorizontal: wp("3%"),
  },
});
