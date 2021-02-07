import { Address } from "@urbandhobi/@types/services";

export interface AddressAction {
  type: AddressActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum AddressActionType {
  SET_LOADING = "@@address/SET_LOADING",
  SET_ADDRESS = "@@address/SET_ADDRESS",
  RESET = "@@address/RESET",
}

export interface AddressState {
  loading: boolean;
  data: Array<Address>;
}
