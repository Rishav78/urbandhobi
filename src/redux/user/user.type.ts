import { User } from "@urbandhobi/@types";

export interface UserAction {
  type: UserActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum UserActionType {
  SET_LOADING = "@@user/SET_LOADING",
  SET_DATA = "@@user/SET_DATA",
  RESET = "@@user/RESET",
}

export interface UserState {
  loading: boolean;
  data: User | null;
}
