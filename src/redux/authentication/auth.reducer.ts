import { AuthAction, AuthActionType, AuthState } from "./auth.type";

const initialState: AuthState = {
  authenticated: false,
  refreshToken: null,
  token: null,
};

export type AuthReducerFn = (state: AuthState, action: AuthAction) => AuthState;

export const AuthReducer: AuthReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.SET_TOKEN: return {
      ...state,
      authenticated: false,
      token: payload.token,
      refreshToken: payload.refreshToken,
    };
    case AuthActionType.SET_TOKEN: return {
      ...state,
      authenticated: true,
      token: payload.token,
    };
    case AuthActionType.SET_REFRESH_TOKEN: return {
      ...state,
      refreshToken: payload.refreshToken,
    };
    case AuthActionType.RESET: return {
      ...initialState,
    };
    default: return {
      ...state,
    };
  }
};

