import { Request } from "@urbandhobi/@types";
import {LaundryAction, LaundryActionType} from "./laundry.type";

export const setRequests = (payload: Request[]): LaundryAction => {
  return {
    type: LaundryActionType.SET_REQUESTS,
    payload,
  };
};
