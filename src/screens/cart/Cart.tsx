import { useNavigation } from "@react-navigation/core";
import { CartItem } from "@urbandhobi/@types";
import CardView from "@urbandhobi/components/cardview";
import ClothCardv2 from "@urbandhobi/components/cloth/ClothCardv2";
import { RefreshSectionList } from "@urbandhobi/components/pullrefresh";
import { useNavigate } from "@urbandhobi/hooks/navigation";
import { useCloth } from "@urbandhobi/hooks/cloth.hook";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, DefaultSectionT, Platform, SectionListData, StyleSheet, Text, View } from "react-native";
import { Appbar, Divider, FAB } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useService, useCart } from "@urbandhobi/hooks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "@urbandhobi/lib/service";
import { globalStyles, theme } from "@urbandhobi/lib/constants";

const HEADER_TITLE = Platform.select({ ios: "CART", android: "Cart" });

const Cart = () => {
  const { goBack } = useNavigation();
  const [FABVisible, setFABVisible] = useState(true);
  const { navigateToTiming, navigateToHome } = useNavigate();
  const { getCloths, clothes } = useCloth();
  const { getAndSetService, services } = useService();
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
      const service = new Service().laundry();
      const req = await service.request();
      await getCart();
      if (req) {
        navigateToTiming(req);
      } else {
        Alert.alert("Error", "Fail to raised request. Please try again laster", [
          {
            text: "Ok",
            onPress: () => navigateToHome(),
          },
        ]);
      }
    }
    catch (error) {
      console.log(error);
    }
  }, [cart]);

  const onRefresh = useCallback(async () => {
    await Promise.all([getCart(), getItems(), getCloths(), getAndSetService()]);
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  const _renderSectionHeader = useCallback(({ section }: { section: SectionListData<any, DefaultSectionT>; }) => {
    const { title, data } = section;
    if (data.length <= 0) { return <></>; }
    return (
      <CardView>
        <Text style={{
          paddingHorizontal: wp("3%"),
          fontSize: wp("6%"),
        }}>{toTitleCase(title)}</Text>
      </CardView>
    );
  }, []);

  const _keyExtractor = useCallback((item: CartItem) => {
    return item.id;
  }, []);

  const _itemSeparatorComponent = useCallback(() => {
    return (
      <Divider />
    );
  }, []);

  const _listFooterComponent = useCallback(() => {
    return (
      <View style={{ height: hp("10%") }} />
    );
  }, []);

  const _renderItem = useCallback(({ item }: { item: CartItem }) => {
    return (
      <ClothCardv2
        editable={false}
        quantity={item.count}
        data={clothes[item.itemId] || {}} />
    );
  }, [clothes]);

  return (
    <SafeAreaView style={styles.safearea}>
      <Appbar.Header style={globalStyles.headerContainer} theme={theme.light}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={HEADER_TITLE} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <RefreshSectionList
          sections={data}
          onRefreshHandler={onRefresh}
          ItemSeparatorComponent={_itemSeparatorComponent}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          onMomentumScrollBegin={() => setFABVisible(false)}
          onMomentumScrollEnd={() => setFABVisible(true)}
          renderSectionHeader={_renderSectionHeader}
          ListFooterComponent={_listFooterComponent}
        />
      </View>
      <FAB
        onPress={submitCart}
        visible={FABVisible}
        style={styles.fab}
        color="#333"
        icon={FABIcon} />
    </SafeAreaView>
  );
};

export default Cart;

const FABIcon = () => (
  <MaterialIcons name="arrow-forward" size={24} color="#fff" />
);

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: wp("3%"),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#333",
  },
});
