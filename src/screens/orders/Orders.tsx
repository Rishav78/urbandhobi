import { useNavigation } from "@react-navigation/core";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { useLaundry } from "@urbandhobi/hooks";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./components/order-card";
import {Request} from "@urbandhobi/@types";

interface OrdersProps {}

const Orders = ({}: OrdersProps) => {
  const {goBack} = useNavigation();
  const {getRequests, requests} = useLaundry();

  const onRefresh = useCallback(async () => {
    await Promise.all([getRequests()]);
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  const _renderItem = useCallback(({item}: {item: Request}) => {
    return (
      <OrderCard data={item} />
    );
  }, [requests]);

  const _keyExtractor = useCallback((item: Request) => {
    return item.id;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Appbar.Header theme={{colors: {primary: "#fff"}}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Orders" />
      </Appbar.Header>
      <View style={{flex: 1}}>
        <RefreshFlatList
          data={requests || []}
          onRefreshHandler={onRefresh}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {},
});
