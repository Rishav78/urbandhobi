import { ServiceSections, ServiceState } from "@urbandhobi/@types";
import {Address} from "@urbandhobi/@types/screens";
import { HomeActionType, HomeAction } from "./home.type";

export const setService = (payload: ServiceSections[]): HomeAction => {
  return {
    type: HomeActionType.SET_SERVICES,
    payload,
  };
};

export const setServiceState = (payload: ServiceState[]): HomeAction => {
  return {
    type: HomeActionType.SET_SERVICE_STATE,
    payload,
  };
};

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
