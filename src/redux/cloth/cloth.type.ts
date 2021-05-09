import { GenericObject, Cloth } from "@urbandhobi/@types";

export interface ClothAction {
  type: ClothActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum ClothActionType {
  SET_LOADING = "@@cloth/SET_LOADING",
  SET_CLOTHS = "@@cloth/SET_CLOTHS",
  RESET = "@@cloth/RESET",
}

export interface ClothState {
  loading: boolean;
  data: GenericObject<Cloth>;
}
