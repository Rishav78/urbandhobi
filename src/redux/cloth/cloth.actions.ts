import { GenericObject, Cloth } from "@urbandhobi/@types";
import { ClothAction, ClothActionType } from "./cloth.type";

export const setLoading = (payload: boolean = true): ClothAction => {
  return {
    type: ClothActionType.SET_LOADING,
    payload,
  };
};

export const setCloth = (payload: GenericObject<Cloth>): ClothAction => {
  return {
    type: ClothActionType.SET_CLOTHS,
    payload,
  };
};
