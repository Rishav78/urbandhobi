import { Cart, CartItem, GenericObject } from "@urbandhobi/@types";

export interface CartAction {
  type: CartActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum CartActionType {
  SET_DATA="@@cart/SET_DATA",
}

export interface CartState {
  loading: boolean;
  cart: Cart | null;
  items: GenericObject<CartItem[]>
}
