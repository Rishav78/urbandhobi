import { RootReducerType } from "@urbandhobi/@types";
import { Seperator } from "@urbandhobi/components";
import CardView from "@urbandhobi/components/cardview";
import ClothCardv2 from "@urbandhobi/components/cloth/ClothCardv2";
import Header from "@urbandhobi/components/header/Header";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, { useState } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual, useSelector } from "react-redux";

const cartSelector = (state: RootReducerType) => state.cart;

const Cart = () => {

  const cart = Object.values(useSelector(cartSelector, shallowEqual));
  const [data] = useState<Array<{ title: string, data: { id: string, count: number }[] }>>(() => {
    return cart.map(item => {
      return {
        title: item.title,
        data: Object.values(item.data),
      };
    });
  });

  console.log(data);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header headerLeftContainerStyle={{marginHorizontal: wp("3%")}} />
      <View>
        <SectionList
          sections={data}
          ItemSeparatorComponent={() => <Seperator style={{ height: 1, marginHorizontal: wp("5%") }} />}
          keyExtractor={item => item.id}

          renderItem={({ item }) => <ClothCardv2 editable={false} quantity={item.count} data={item.id} />}
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
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
