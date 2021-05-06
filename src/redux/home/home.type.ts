import {Address} from "@urbandhobi/@types";
export interface HomeAction {
  type: HomeActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum HomeActionType {
  SET_LOADING = "@@home/SET_LOADING",
  SET_DEFAULT_ADDRESS = "@@home/SET_DEFAULT_ADDRESS",
  RESET = "@@home/RESET",
}

export interface HomeState {
  loading: boolean;
  defaultAddress: Address | null;
}
