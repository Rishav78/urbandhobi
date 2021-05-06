import {Address} from "@urbandhobi/@types";
import { HomeActionType, HomeAction } from "./home.type";

export const setLoading = (payload: boolean): HomeAction => {
  return {
    type: HomeActionType.SET_LOADING,
    payload,
  };
};

export const setDefaultAddress = (payload: Address | null | undefined): HomeAction => {
  return {
    type: HomeActionType.SET_DEFAULT_ADDRESS,
    payload,
  };
};

export const setHomeState = (): HomeAction => {
  return {
    type: HomeActionType.RESET,
  };
};
