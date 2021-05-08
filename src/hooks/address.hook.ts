import { RootReducerType } from "@urbandhobi/@types";
import { setAddress } from "@urbandhobi/redux/address/address.action";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setDefaultAddress } from "@urbandhobi/redux/address/address.action";
import Service from "@urbandhobi/lib/service";

const addressSelector = (state: RootReducerType) => state.address.data;
const defaultAddressSelector = (state: RootReducerType) => state.address.defaultAddress;

export const useAddress = () => {
  const dispatch = useDispatch();
  const defaultAddress = useSelector(defaultAddressSelector, shallowEqual);
  const addresses = useSelector(addressSelector, shallowEqual);

  const getAddress = useCallback(async () => {
    const service = new Service().address();
    const myAddress = await service.get();
    if (myAddress) {
      dispatch(setAddress(myAddress));
    }
  }, []);

  const getDefaultAddress = useCallback(async () => {
    const service = new Service().address();
    try {
      const address = await service.getDefault();
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
