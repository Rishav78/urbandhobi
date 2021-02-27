import { SupportedCloth } from "@urbandhobi/@types";
import { CartAction, CartActionType } from "./cart.type";

export const addToWash = (payload: {[key: string]: number}): CartAction => {
  return {
    type: CartActionType.ADD_TO_WASH,
    payload,
  };
};

export const addToWashAndIron = (payload: SupportedCloth): CartAction => {
  return {
    type: CartActionType.ADD_TO_WASH_AND_IRON,
    payload,
  };
};

export const addToWashAndFold = (payload: SupportedCloth): CartAction => {
  return {
    type: CartActionType.ADD_TO_WASH_AND_FOLD,
    payload,
  };
};

export const addToDryClean = (payload: SupportedCloth): CartAction => {
  return {
    type: CartActionType.ADD_TO_DRY_CLEAN,
    payload,
  };
};
