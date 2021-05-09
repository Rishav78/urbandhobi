import { ClothAction, ClothActionType, ClothState } from "./cloth.type";

const initialState: ClothState = {
  loading: true,
  data: {},
};

export type ClothReducerFn = (state: ClothState, action: ClothAction) => ClothState;

export const ClothReducer: ClothReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ClothActionType.SET_LOADING: return {
      ...state,
      loading: payload,
    };
    case ClothActionType.SET_CLOTHS: return {
      ...state,
      loading: false,
      data: payload,
    };
    case ClothActionType.RESET: return {
      ...initialState,
      loading: false,
    };
    default: return state;
  }
};

