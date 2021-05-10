import { Cart, RootReducerType } from "@urbandhobi/@types";
import Service from "@urbandhobi/lib/service";
import { setCart as setCartRedux, setCartItems } from "@urbandhobi/redux/cart/cart.action";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const cartSelector = (state: RootReducerType) => state.cart.cart;
const itemSelector = (state: RootReducerType) => state.cart.items;

export const useCart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(cartSelector, shallowEqual);
  const items = useSelector(itemSelector, shallowEqual);

  const getCart = useCallback(async () => {
    const res = await new Service().cart().getCart();
    if (res) {
      dispatch(setCartRedux(res));
    }
  }, []);

  const getItems = useCallback(async () => {
    const res = await new Service().cart().getItems();
    if (res) {
      dispatch(setCartItems(res));
    }
  }, []);

  const setCart = useCallback((obj: Cart) => {
    dispatch(setCartRedux(obj));
  }, []);

  return {
    cart,
    items,
    getCart,
    getItems,
    setCart,
  };
};
