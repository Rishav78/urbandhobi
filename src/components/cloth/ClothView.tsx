import { useNavigation } from "@react-navigation/core";
import { AddItemBody, Service, SupportedCloth } from "@urbandhobi/@types";
import { Button, Seperator } from "@urbandhobi/components";
import ClothCard from "@urbandhobi/components/cloth/ClothCardv2";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ClothViewProps {
  onAddToCard: (data: AddItemBody[]) => void;
  data: Array<SupportedCloth>;
  service: Service
}

export const ClothView: React.FC<ClothViewProps> = ({
  onAddToCard,
  data,
  service,
}) => {
  const [counter, setCounter] = useState<{ [key: string]: AddItemBody }>({});

  const {goBack} = useNavigation();

  const onAddCloth = (cloth: SupportedCloth) => {
    return () => {
      const { id } = cloth;
      setCounter(state => {
        const newState = { ...state };
        if (newState[id]) {
          newState[id].count++;
        }
        else {
          newState[id] = {
            serviceId: service.id,
            count: 1,
            itemId: id,
            serviceTypeId: service.categoryId,
          };
        }
        return newState;
      });
      return true;
    };
  };

  const onRemoveCloth = (cloth: SupportedCloth) => {
    return () => {
      const { id } = cloth;
      setCounter(state => {
        const newState = { ...state };
        if (!newState[id]) {
          return state;
        }
        if (newState[id].count === 1) {
          delete newState[id];
        }
        else {
          newState[id].count--;
        }
        return newState;
      });
      return true;
    };
  };

  const addToCart = useCallback(() => {
    if (onAddToCard) {
      onAddToCard(Object.values(counter));
    }
    setCounter({});
  }, [counter, onAddToCard]);

  const _keyExtractor = useCallback((item: SupportedCloth) => {
    return item.id;
  }, []);

  const _renderItem = useCallback(({ item }: { item: SupportedCloth }) => {
    return (
      <ClothCard
        onRemove={onRemoveCloth(item)}
        onAdd={onAddCloth(item)}
        quantity={counter[item.id] ? counter[item.id].count : 0}
        data={item} />
    );
  }, [counter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header theme={{colors: {primary: "#fff"}}}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={toTitleCase(service.name) || "Service"} />
      </Appbar.Header>
      <RefreshFlatList
        data={data}
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
        <Button onPress={addToCart} activeOpacity={1} title="ADD TO CARD" />
      </View>
    </SafeAreaView>
  );
};

export default ClothView;

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
