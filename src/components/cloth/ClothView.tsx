import { useNavigation } from "@react-navigation/core";
import { AddItemBody, Service, Cloth } from "@urbandhobi/@types";
import ClothCard from "@urbandhobi/components/cloth/ClothCardv2";
import { RefreshFlatList } from "@urbandhobi/components/pullrefresh";
import { globalStyles, theme } from "@urbandhobi/lib/constants";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import React, { useCallback, useMemo, useState } from "react";
import { Platform, StyleSheet, SafeAreaView } from "react-native";
import { Appbar, Divider, FAB } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export interface ClothViewProps {
  onAddToCard: (data: AddItemBody[]) => void;
  data: Array<Cloth>;
  service: Service
}

export const ClothView: React.FC<ClothViewProps> = ({
  onAddToCard,
  data,
  service,
}) => {
  const HEADER_TITLE = useMemo(() => Platform.select({ ios: service.name.toUpperCase(), android: toTitleCase(service.name) }), [service.name]);
  const [counter, setCounter] = useState<{ [key: string]: AddItemBody }>({});
  const [FABVisible, setFABVisible] = useState(true);

  const { goBack } = useNavigation();

  const onAddCloth = (cloth: Cloth) => {
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

  const onRemoveCloth = (cloth: Cloth) => {
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

  const _keyExtractor = useCallback((item: Cloth) => {
    return item.id;
  }, []);

  const _renderItem = useCallback(({ item }: { item: Cloth }) => {
    return (
      <ClothCard
        onRemove={onRemoveCloth(item)}
        onAdd={onAddCloth(item)}
        quantity={counter[item.id] ? counter[item.id].count : 0}
        data={item} />
    );
  }, [counter]);

  return (
    <SafeAreaView style={globalStyles.safearea}>
      <Appbar.Header style={globalStyles.headerContainer} theme={theme.light}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={HEADER_TITLE} />
      </Appbar.Header>
      <RefreshFlatList
        data={data}
        onMomentumScrollBegin={() => setFABVisible(false)}
        onMomentumScrollEnd={() => setFABVisible(true)}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={() => (
          <Divider />
        )}
        renderItem={_renderItem}
      />
      <FAB
        onPress={addToCart}
        visible={FABVisible && Object.keys(counter).length !== 0}
        style={styles.fab}
        color="#333"
        icon={FABAddIcon} />
    </SafeAreaView>
  );
};

export default ClothView;

const FABAddIcon = () => (
  <MaterialIcons name="add-shopping-cart" size={24} color="#fff" />
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
