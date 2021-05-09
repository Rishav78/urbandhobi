import {Request} from "@urbandhobi/@types";

export interface LaundryAction {
  type: LaundryActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum LaundryActionType {
  SET_LOADING = "@@laundry/SET_LOADING",
  SET_REQUESTS = "@@laundry/SET_REQUESTS",
  RESET = "@@laundry/RESET",
}

export interface LaundryState {
  loading: boolean;
  data: Request[] | null;
}
