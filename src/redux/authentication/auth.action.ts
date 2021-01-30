import { AuthActionType, AuthAction } from "./auth.type";

export type SignIn = () => AuthAction;
export type ResetAuth = () => AuthAction;

export const signIn: SignIn = () => {
  return {
    type: AuthActionType.SIGN_IN,
  };
};

export const resetAuth: ResetAuth = () => {
  return {
    type: AuthActionType.RESET,
  };
};

