export interface AuthAction {
  type: AuthActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum AuthActionType {
  SIGN_IN = "@@auth/SIGN_IN",
  RESET = "@@auth/RESET",
}

export interface AuthState {
  authenticated: boolean;
}
