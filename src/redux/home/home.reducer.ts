import { HomeAction, HomeActionType, HomeState } from "./home.type";

const initialState: HomeState = {
  loading: true,
  defaultAddress: null,
};

export type HomeReducerFn = (state: HomeState, action: HomeAction) => HomeState;

export const HomeReducer: HomeReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HomeActionType.SET_LOADING: return {
      ...state,
      loading: payload,
    };
    case HomeActionType.SET_DEFAULT_ADDRESS: return {
      ...state,
      loading: false,
      defaultAddress: payload,
    };
    case HomeActionType.RESET: return {
      ...initialState,
      loading: false,
    };
    default: return state;
  }
};

