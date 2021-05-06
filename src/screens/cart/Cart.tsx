import { useNavigation } from "@react-navigation/core";
import { CartItem } from "@urbandhobi/@types";
import { Button, Seperator } from "@urbandhobi/components";
import CardView from "@urbandhobi/components/cardview";
import ClothCardv2 from "@urbandhobi/components/cloth/ClothCardv2";
import { RefreshSectionList } from "@urbandhobi/components/pullrefresh";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import { useCloth } from "@urbandhobi/hooks/cloth.hook";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, { useCallback, useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useService, useCart } from "@urbandhobi/hooks";

const Cart = () => {
  const {goBack} = useNavigation();
  const { navigateToTiming } = useNavigate();
  const {getCloths, cloths} = useCloth();
  const {getAndSetService, services} = useService();
  const { items, cart, getItems, getCart } = useCart();

  const data = useMemo<Array<{ title: string, data: CartItem[] }>>(() => {
    const keys = Object.keys(items);
    return keys.map(service => {
      return {
        data: items[service],
        title: (services[service] && services[service].name) || "Invalid Service",
      };
    });
  }, [items]);

  const submitCart = useCallback(async () => {
    try {
      if (!cart) {
        return console.error("cart is not intilized");
      }

      navigateToTiming();

      // const newCart = await new Service().laundry(cart.id).request();
      // if (newCart) {
      //   dispatch(setCart(newCart));
      // }
    }
    catch (error) {
      console.log(error);
    }
  }, [cart]);

  const onRefresh = useCallback(async () => {
    await Promise.all([getCart(), getItems(), getCloths(), getAndSetService()]);
  }, []);

  useEffect(() => {
    getItems();
  }, [cart]);

  useEffect(() => {
    onRefresh();
  }, []);

  const _renderItem = useCallback(({ item }: { item: CartItem }) => {
    return (
      <ClothCardv2
        editable={false}
        quantity={item.count}
        data={cloths[item.itemId] || {}} />
    );
  }, [cloths]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header theme={{colors: {primary: "#fff"}}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Cart" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <RefreshSectionList
          sections={data}
          onRefreshHandler={onRefresh}
          ItemSeparatorComponent={() => <Seperator style={{ height: 1, marginHorizontal: wp("5%") }} />}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
          renderSectionHeader={({ section: { title, data } }) => (
            data.length > 0 ?
              <CardView>
                <Text style={{
                  paddingHorizontal: wp("3%"),
                  fontSize: wp("6%"),
                }}>{toTitleCase(title)}</Text>
              </CardView> : <></>
          )}
          ListFooterComponent={() => <View style={{ height: hp("10%") }} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={submitCart} activeOpacity={1} title="SUBMIT CART" />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: wp("3%"),
  },
});
