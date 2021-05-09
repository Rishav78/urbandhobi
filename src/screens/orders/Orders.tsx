import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface OrdersProps {}

const Orders = ({}: OrdersProps) => {
  const {goBack} = useNavigation();
  return (
    <SafeAreaView>
      <Appbar.Header theme={{colors: {primary: "#fff"}}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Orders" />
      </Appbar.Header>
      <View>
        <Text>Orders</Text>
      </View>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {},
});
