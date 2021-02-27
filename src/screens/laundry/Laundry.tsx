import { Route, useRoute } from "@react-navigation/native";
import { RootReducerType } from "@urbandhobi/@types";
import { getSupportedLaundry } from "@urbandhobi/actions";
import ClothView from "@urbandhobi/components/cloth/ClothView";
import { addToWash, addToWashAndFold, addToWashAndIron } from "@urbandhobi/redux/cart/cart.action";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.laundry.data;

export const Laundry = () => {
  const { params } = useRoute<Route<string, { id: "wash" | "washAndIron" | "washAndFold" | "dryClean" }>>();

  const clothes = useSelector(clothSelector, shallowEqual);
  const dispatch = useDispatch();

  const fetchLaundryData = async () => {
    const cloths = await getSupportedLaundry();
    if (cloths) {
      dispatch(setSupportedLaundry(cloths));
    }
  };

  const onAddToCard = useCallback((data: any) => {
    console.log(params.id);
    switch (params.id) {
      case "wash":
        dispatch(addToWash(data));
        break;
      case "washAndFold":
        dispatch(addToWashAndFold(data));
        break;
      case "washAndIron":
        dispatch(addToWashAndIron(data));
        break;
      default:
        return Alert.alert("ERROR", "Some error occur, please try again later");
    }
    Alert.alert("ADDED TO CART");
  }, []);

  useEffect(() => {
    fetchLaundryData();
  }, []);

  return (
    <ClothView
      onAddToCard={onAddToCard}
      data={clothes} />
  );
};

export default Laundry;
