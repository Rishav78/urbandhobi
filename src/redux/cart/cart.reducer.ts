import { CartAction, CartActionType, CartState } from "./cart.type";

const initialState: CartState = {
  loading: false,
  cart: null,
  items: {},
};

export type AuthReducerFn = (state: CartState, action: CartAction) => CartState;

export const CartReducer: AuthReducerFn = (state = initialState, action) => {
  const { type, payload} = action;
  switch (type) {
    case CartActionType.SET_DATA: return {
      ...state,
      cart: payload.cart,
      items: payload.items,
      loading: false,
    };
    default: return state;
  }
};