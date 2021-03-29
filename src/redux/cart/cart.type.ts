import { Cart, CartItem, CartItemGBService, GenericObject } from "@urbandhobi/@types";

export interface CartAction {
  type: CartActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum CartActionType {
  SET_CART="@@cart/SET_CART",
  SET_ITEMS="@@cart/SET_ITEMS",
}

export interface CartState {
  loading: boolean;
  cart: Cart | null;
  items: CartItemGBService[]
}
