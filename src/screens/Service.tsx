import { useRoute } from "@react-navigation/core";
import { AddItemBody, RootReducerType, Service } from "@urbandhobi/@types";
import ClothView from "@urbandhobi/components/cloth/ClothView";
import { useCloth } from "@urbandhobi/hooks";
import ServiceManager from "@urbandhobi/lib/service";
import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { shallowEqual, useSelector } from "react-redux";

const cartSelector = (state: RootReducerType) => state.cart.cart;

export const ServiceScreen = () => {
  const { service } = useRoute().params as { service: Service };

  const cart = useSelector(cartSelector, shallowEqual);
  const {getCloths, clothArray} = useCloth();

  const onAddToCard = useCallback(async (data: AddItemBody[]) => {
    if (!cart) {
      return Alert.alert("Some error occur try again");
    }
    const res = await new ServiceManager()
      .cart()
      .addItem(data);
    if (res) {
      Alert.alert("Added to cart");
    }
  }, []);

  useEffect(() => {
    getCloths();
  }, []);

  return (
    <ClothView
      service={service}
      onAddToCard={onAddToCard}
      data={clothArray} />
  );
};

export default ServiceScreen;
