export interface AuthAction {
  type: AuthActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum AuthActionType {
  SIGN_IN = "@@auth/SET_TOKEN",
  SET_TOKEN = "@@auth/SET_TOKEN",
  SET_REFRESH_TOKEN = "@@auth/SET_REFRESH_TOKEN",
  RESET = "@@auth/RESET",
}

export interface AuthState {
  authenticated: boolean;
  token: string | null;
  refreshToken?: string | null;
}
