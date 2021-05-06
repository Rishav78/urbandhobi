import { GenericObject, Service, ServiceSections, ServiceState } from "@urbandhobi/@types";
import { ServiceActionType, ServiceAction } from "./services.type";

export const setServiceType = (payload: ServiceSections[]): ServiceAction => {
  return {
    type: ServiceActionType.SET_SERVICES_TYPE,
    payload,
  };
};

export const setServices = (payload: GenericObject<Service>): ServiceAction => {
  return {
    type: ServiceActionType.SET_SERVICES,
    payload,
  };
};

export const setServiceState = (payload: ServiceState[]): ServiceAction => {
  return {
    type: ServiceActionType.SET_SERVICE_STATE,
    payload,
  };
};

export const setLoading = (payload: boolean): ServiceAction => {
  return {
    type: ServiceActionType.SET_LOADING,
    payload,
  };
};

export const setHomeState = (): ServiceAction => {
  return {
    type: ServiceActionType.RESET,
  };
};
