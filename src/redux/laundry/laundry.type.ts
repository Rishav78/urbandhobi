import { SupportedCloth } from "@urbandhobi/@types";

export interface LaundryAction {
  type: LaundryActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum LaundryActionType {
  SET_LOADING = "@@laundry/SET_LOADING",
  SET_CLOTHS = "@@laundry/SET_CLOTHS",
  RESET = "@@laundry/RESET",
}

export interface LaundryState {
  loading: boolean;
  data: Array<SupportedCloth>;
}
