import { Address } from "@urbandhobi/@types/screens";
import { AddressAction, AddressActionType } from "./address.type";

export const setAddress = (payload: Array<Address>): AddressAction => {
  return {
    type: AddressActionType.SET_ADDRESS,
    payload,
  };
};
