import { RootReducerType } from "@urbandhobi/@types";
import { getMyAddress } from "@urbandhobi/actions";
import { setAddress } from "@urbandhobi/redux/address/address.action";
import { useCallback } from "react";
import { getDefaultAddress as getDAddress } from "@urbandhobi/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setDefaultAddress } from "@urbandhobi/redux/address/address.action";

const addressSelector = (state: RootReducerType) => state.address.data;
const defaultAddressSelector = (state: RootReducerType) => state.address.defaultAddress;

export const useAddress = () => {
  const dispatch = useDispatch();
  const defaultAddress = useSelector(defaultAddressSelector, shallowEqual);
  const addresses = useSelector(addressSelector, shallowEqual);

  const getAddress = useCallback(async () => {
    const myAddress = await getMyAddress();
    if (myAddress) {
      dispatch(setAddress(myAddress));
    }
  }, []);

  const getDefaultAddress = useCallback(async () => {
    try {
      const address = await getDAddress();
      dispatch(setDefaultAddress(address));
    }
    catch (error) {
      console.error(error);
    }
  }, []);

  return {
    addresses,
    defaultAddress,
    getAddress,
    getDefaultAddress,
  };
};
