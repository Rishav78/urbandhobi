import { useRoute } from "@react-navigation/core";
import { AddItemBody, RootReducerType, Service } from "@urbandhobi/@types";
import { getSupportedLaundry } from "@urbandhobi/actions";
import ClothView from "@urbandhobi/components/cloth/ClothView";
import ServiceManager from "@urbandhobi/lib/service";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const cartSelector = (state: RootReducerType) => state.cart.cart;
const clothSelector = (state: RootReducerType) => state.laundry.data;

export const ServiceScreen = () => {
  const { service } = useRoute().params as { service: Service };

  const cart = useSelector(cartSelector, shallowEqual);
  const clothes = Object.values(useSelector(clothSelector, shallowEqual));
  const dispatch = useDispatch();

  const fetchLaundryData = async () => {
    const cloths = await getSupportedLaundry();
    if (cloths) {
      dispatch(setSupportedLaundry(cloths));
    }
  };

  const onAddToCard = useCallback(async (data: AddItemBody[]) => {
    if (!cart) {
      return Alert.alert("Some error occur try again");
    }
    const res = await new ServiceManager()
      .cart()
      .cart(cart.id)
      .addItem(data);
    if (res) {
      Alert.alert("Added to cart");
    }
  }, []);

  useEffect(() => {
    fetchLaundryData();
  }, []);

  return (
    <ClothView
      service={service}
      onAddToCard={onAddToCard}
      data={clothes} />
  );
};

export default ServiceScreen;
