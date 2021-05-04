import { ServiceSections, ServiceState } from "@urbandhobi/@types";
import {Address} from "@urbandhobi/@types";
export interface HomeAction {
  type: HomeActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum HomeActionType {
  SET_LOADING = "@@home/SET_LOADING",
  SET_SERVICES = "@@home/SET_SERVICES",
  SET_DEFAULT_ADDRESS = "@@home/SET_DEFAULT_ADDRESS",
  SET_SERVICE_STATE = "@@home/SET_SERVICE_STATE",
  RESET = "@@home/RESET",
}

export interface HomeState {
  loading: boolean;
  data: Array<ServiceSections>;
  serviceState: ServiceState[] | null;
  defaultAddress: Address | null;
}
