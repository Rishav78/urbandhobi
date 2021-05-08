import { User } from "@urbandhobi/@types";
import { UserAction, UserActionType } from "./user.type";

export const setUser = (payload: User): UserAction => {
  return {
    type: UserActionType.SET_DATA,
    payload,
  };
};
