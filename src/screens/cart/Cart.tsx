import { CartItem, RootReducerType } from "@urbandhobi/@types";
import { Seperator } from "@urbandhobi/components";
import CardView from "@urbandhobi/components/cardview";
import ClothCardv2 from "@urbandhobi/components/cloth/ClothCardv2";
import Header from "@urbandhobi/components/header/Header";
import MessageTile from "@urbandhobi/components/messageTile";
import { RefreshSectionList } from "@urbandhobi/components/pullrefresh";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import Service from "@urbandhobi/lib/service";
import { setData } from "@urbandhobi/redux/cart/cart.action";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const cartSelector = (state: RootReducerType) => state.cart;

const Cart = () => {

  const dispatch = useDispatch();

  const { items } = useSelector(cartSelector, shallowEqual);
  const data = useMemo<Array<{ title: string, data: CartItem[] }>>(() => {
    const keys = Object.keys(items);
    return keys.map(key => {
      return {
        data: items[key],
        title: key,
      };
    });
  }, [items]);

  const fetchCartData = useCallback((cb?: (err?: Error) => void) => {
    console.log("start")
    new Service()
      .cart()
      .getCart()
      .then(res => {
        if (res) {
          dispatch(setData(res));
        }
        if (cb) {
          cb();
        }
      })
      .catch(err => {
        if (cb) {
          cb(err);
        }
      });
  }, []);

  useEffect(fetchCartData, []);

  const _renderItem = useCallback(({ item }: { item: CartItem }) => {
    return (
      <ClothCardv2
        editable={false}
        quantity={item.count}
        data={item.cloth} />
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header headerLeftContainerStyle={{ marginHorizontal: wp("3%") }} />
      <View style={{ flex: 1 }}>
        {data.length > 0 ?
          <RefreshSectionList
            sections={data}
            onRefreshHandler={fetchCartData}
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
          /> :
          <MessageTile style={styles.message} message="NO DATA IN THE CART" />
        }
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  message: {
    elevation: 10,
    backgroundColor: "#fff",
    paddingVertical: hp("2%"),
    marginHorizontal: wp("3%"),
    borderRadius: wp("2%"),
  },
});
