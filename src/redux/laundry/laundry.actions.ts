import { SupportedCloth } from "@urbandhobi/@types";
import { LaundryAction, LaundryActionType } from "./laundry.type";

export const setLoading = (payload: boolean = true): LaundryAction => {
  return {
    type: LaundryActionType.SET_LOADING,
    payload,
  };
};

export const setSupportedLaundry = (payload: Array<SupportedCloth>): LaundryAction => {
  return {
    type: LaundryActionType.SET_CLOTHS,
    payload,
  };
};
