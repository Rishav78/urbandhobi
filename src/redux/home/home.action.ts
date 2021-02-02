import { ServiceSections, ServiceState } from "../../@types/services";
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

export const setHomeState = (): HomeAction => {
  return {
    type: HomeActionType.RESET,
  };
};
