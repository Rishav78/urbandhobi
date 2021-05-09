import { Address, GenericObject } from "@urbandhobi/@types";
import { AddressAction, AddressActionType } from "./address.type";

export const setAddress = (payload: GenericObject<Address>): AddressAction => {
  return {
    type: AddressActionType.SET_ADDRESS,
    payload,
  };
};

export const setDefaultAddress = (payload: Address): AddressAction => {
  return {
    type: AddressActionType.SET_DEFAULT_ADDRESS,
    payload,
  };
};
