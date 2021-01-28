import { AuthActionType, AuthAction } from "./auth.type";


export type SetAuthToken = (payload: {token: string, refreshToken: string}) => AuthAction;

export const setAuthToken: SetAuthToken = (payload) => {
  return {
    type: AuthActionType.SET_TOKEN,
    payload,
  };
};
