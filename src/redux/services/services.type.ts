import { GenericObject, Service, ServiceType, ServiceStates } from "@urbandhobi/@types";

export interface ServiceAction {
  type: ServiceActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum ServiceActionType {
  SET_LOADING = "@@service/SET_LOADING",
  SET_SERVICES_TYPE = "@@service/SET_SERVICES_TYPE",
  SET_SERVICES = "@@service/SET_SERVICES",
  SET_SERVICE_STATE = "@@service/SET_SERVICE_STATE",
  RESET = "@@service/RESET",
}

export interface ServiceState {
  loading: boolean;
  serviceType: GenericObject<ServiceType>;
  services: GenericObject<Service>;
  serviceState: ServiceStates[] | null;
}
