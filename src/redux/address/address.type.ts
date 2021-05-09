import { Address, GenericObject } from "@urbandhobi/@types";

export interface AddressAction {
  type: AddressActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum AddressActionType {
  SET_LOADING = "@@address/SET_LOADING",
  SET_ADDRESS = "@@address/SET_ADDRESS",
  SET_DEFAULT_ADDRESS="@@address/SET_DEFAULT_ADDRESS",
  RESET = "@@address/RESET",
}

export interface AddressState {
  loading: boolean;
  data: GenericObject<Address>;
  defaultAddress: Address | null;
}
