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

export const ServiceScreen = () => {
  const {service} = useRoute().params as {service: Service};
  const clothSelector = useCallback((state: RootReducerType) => state.laundry.data, []);

  const cart = useSelector(cartSelector, shallowEqual);
  const clothes = useSelector(clothSelector, shallowEqual);
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
    await new ServiceManager()
      .cart()
      .cart(cart.id)
      .addItem(data);
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
