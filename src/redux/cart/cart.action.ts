import { Cart, CartItemGBService } from "@urbandhobi/@types";
import { CartAction, CartActionType } from "./cart.type";

export const setCart = (payload: Cart): CartAction => {
  return {
    type: CartActionType.SET_CART,
    payload,
  };
};

export const setCartItems = (payload: CartItemGBService[]): CartAction => {
  return {
    type: CartActionType.SET_ITEMS,
    payload,
  };
};
