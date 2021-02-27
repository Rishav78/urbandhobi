import { RootReducerType } from "@urbandhobi/@types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Cart = () => {

  const data = useSelector((state: RootReducerType) => state.cart);

  console.log(data);

  return (
    <View>
      <Text />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
