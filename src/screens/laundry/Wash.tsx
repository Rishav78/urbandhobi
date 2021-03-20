import { AddItemBody, RootReducerType } from "@urbandhobi/@types";
import { getSupportedLaundry } from "@urbandhobi/actions";
import ClothView from "@urbandhobi/components/cloth/ClothView";
import Service from "@urbandhobi/lib/service";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.laundry.data;
const cartSelector = (state: RootReducerType) => state.cart.cart;

export const Laundry = () => {

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
    await new Service()
      .cart()
      .cart(cart.id)
      .addItem(data);
  }, []);

  useEffect(() => {
    fetchLaundryData();
  }, []);

  return (
    <ClothView
      type="wash"
      onAddToCard={onAddToCard}
      data={clothes} />
  );
};

export default Laundry;
