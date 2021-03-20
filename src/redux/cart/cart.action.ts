import { Cart, CartItem, GenericObject } from "@urbandhobi/@types";
import { CartAction, CartActionType } from "./cart.type";

export const setData = (payload: {cart: Cart, items: GenericObject<CartItem[]>}): CartAction => {
  return {
    type: CartActionType.SET_DATA,
    payload,
  };
};
