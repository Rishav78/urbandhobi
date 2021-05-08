import { useNavigation } from "@react-navigation/core";
import { AddItemBody, Service, SupportedCloth } from "@urbandhobi/@types";
import { Seperator } from "@urbandhobi/components";
import ClothCard from "@urbandhobi/components/cloth/ClothCardv2";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
  const [FABVisible, setFABVisible] = useState(true);

  const { goBack } = useNavigation();

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
      <Appbar.Header theme={{ colors: { primary: "#fff" } }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={toTitleCase(service.name) || "Service"} />
      </Appbar.Header>
      <RefreshFlatList
        data={data}
        onMomentumScrollBegin={() => setFABVisible(false)}
        onMomentumScrollEnd={() => setFABVisible(true)}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={() => (
          <Seperator
            style={styles.seprator}
            contentContainerStyle={{ marginVertical: hp("1%") }}
          />
        )}
        renderItem={_renderItem}
      />
      <FAB
        onPress={addToCart}
        visible={FABVisible}
        style={styles.fab}
        color="#333"
        icon={() => (
          <MaterialIcons name="add-shopping-cart" size={24} color="#fff" />
        )} />
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#333",
  },
});
