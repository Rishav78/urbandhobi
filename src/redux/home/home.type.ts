import { ServiceSections, ServiceState } from "@urbandhobi/@types/services";

export interface HomeAction {
  type: HomeActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum HomeActionType {
  SET_LOADING = "@@home/SET_LOADING",
  SET_SERVICES = "@@home/SET_SERVICES",
  SET_SERVICE_STATE = "@@home/SET_SERVICE_STATE",
  RESET = "@@home/RESET",
}

export interface HomeState {
  loading: boolean;
  data: Array<ServiceSections>;
  serviceState: ServiceState[] | null;
}
