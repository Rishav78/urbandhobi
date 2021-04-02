import { CartItem, RootReducerType } from "@urbandhobi/@types";
import { Button, Seperator } from "@urbandhobi/components";
import CardView from "@urbandhobi/components/cardview";
import ClothCardv2 from "@urbandhobi/components/cloth/ClothCardv2";
import Header from "@urbandhobi/components/header/Header";
import { RefreshSectionList } from "@urbandhobi/components/pullrefresh";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import Service from "@urbandhobi/lib/service";
import { setCart, setCartItems } from "@urbandhobi/redux/cart/cart.action";
import React, { useCallback, useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const cartSelector = (state: RootReducerType) => state.cart;

const Cart = () => {

  const dispatch = useDispatch();
  const { navigateToTiming } = useNavigate();

  const { items, cart } = useSelector(cartSelector, shallowEqual);
  const data = useMemo<Array<{ title: string, data: CartItem[] }>>(() => {
    return items.map(service => {
      return {
        data: service.items,
        title: service.name,
      };
    });
  }, [items]);

  const fetchCartItems = useCallback(async (cb?: (err?: Error) => void) => {
    if (!cart) {
      return console.error("cart is not intilized");
    }
    const res = await new Service()
      .cart(cart.id)
      .getItems();

    if (res) {
      dispatch(setCartItems(res));
    }
    if (cb) {
      cb();
    }
  }, [cart]);

  const fetchCartData = useCallback((cb?: (err?: Error) => void) => {
    new Service()
      .cart()
      .getCart()
      .then(res => {
        if (res) {
          dispatch(setCart(res));
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

  useEffect(() => {
    fetchCartItems();
  }, [cart]);

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
        <RefreshSectionList
          sections={data}
          onRefreshHandler={fetchCartItems}
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
