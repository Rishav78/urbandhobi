import { HomeAction, HomeActionType, HomeState } from "./home.type";

const initialState: HomeState = {
  loading: true,
  data: [],
  serviceState: null,
};

export type HomeReducerFn = (state: HomeState, action: HomeAction) => HomeState;

export const HomeReducer: HomeReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HomeActionType.SET_LOADING: return {
      ...state,
      loading: payload,
    };
    case HomeActionType.SET_SERVICES: return {
      ...state,
      loading: false,
      data: payload,
    };
    case HomeActionType.SET_SERVICE_STATE: return {
      ...state,
      serviceState: payload,
      loading: false,
    };
    case HomeActionType.RESET: return {
      ...initialState,
      loading: false,
    };
    default: return state;
  }
};

