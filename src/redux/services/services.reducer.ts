import { ServiceAction, ServiceActionType, ServiceState } from "./services.type";

const initialState: ServiceState = {
  loading: true,
  serviceType: {},
  services: {},
  serviceState: null,
};

export type ServicesReducerFn = (state: ServiceState, action: ServiceAction) => ServiceState;

export const ServicesReducer: ServicesReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ServiceActionType.SET_LOADING: return {
      ...state,
      loading: payload,
    };
    case ServiceActionType.SET_SERVICES: return {
      ...state,
      loading: false,
      services: payload,
    };
    case ServiceActionType.SET_SERVICES_TYPE: return {
      ...state,
      loading: false,
      serviceType: payload,
    };
    case ServiceActionType.SET_SERVICE_STATE: return {
      ...state,
      serviceState: payload,
      loading: false,
    };
    case ServiceActionType.RESET: return {
      ...initialState,
      loading: false,
    };
    default: return state;
  }
};

