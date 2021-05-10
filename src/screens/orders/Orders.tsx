import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { useAddress, useLaundry, useNavigate } from "@urbandhobi/hooks";
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./components/order-card";
import { Request } from "@urbandhobi/@types";
import Service from "@urbandhobi/lib/service";

interface OrdersProps { }

const Orders = ({ }: OrdersProps) => {
  const { goBack } = useNavigation();
  const { getRequests, requests } = useLaundry();
  const { getAddress, addresses } = useAddress();
  const {navigateToTiming} = useNavigate();

  const onRefresh = useCallback(async () => {
    await Promise.all([getRequests(), getAddress()]);
  }, []);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const revokeHandler = useCallback(async (req: Request) => {
    const service = new Service().laundry();
    await service.revoke(req.id);
    await onRefresh();
  }, []);

  const deleteHandler = useCallback(async (req: Request) => {
    const service = new Service().laundry();
    await service.delete(req.id);
    await onRefresh();
  }, []);

  const scheduleHandler = useCallback(async (req: Request) => {
    navigateToTiming(req);
  }, []);

  const _renderItem = useCallback(({ item }: { item: Request }) => {
    return (
      <OrderCard onSchdule={scheduleHandler} onDelete={deleteHandler} onRevoke={revokeHandler} address={addresses[item.addressId]} request={item} />
    );
  }, [requests]);

  const _keyExtractor = useCallback((item: Request) => {
    return item.id;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header theme={{ colors: { primary: "#fff" } }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Orders" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
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
