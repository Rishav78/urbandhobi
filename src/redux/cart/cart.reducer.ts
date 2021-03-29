import { CartAction, CartActionType, CartState } from "./cart.type";

const initialState: CartState = {
  loading: false,
  cart: null,
  items: [],
};

export type AuthReducerFn = (state: CartState, action: CartAction) => CartState;

export const CartReducer: AuthReducerFn = (state = initialState, action) => {
  const { type, payload} = action;
  switch (type) {
    case CartActionType.SET_CART: return {
      ...state,
      cart: payload,
      loading: false,
    };
    case CartActionType.SET_ITEMS: return {
      ...state,
      items: payload,
      loading: false,
    };
    default: return state;
  }
};