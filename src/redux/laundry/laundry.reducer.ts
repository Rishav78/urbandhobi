import { LaundryAction, LaundryActionType, LaundryState } from "./laundry.type";

const initialState: LaundryState = {
  loading: true,
  data: [],
};

export type LaundryReducerFn = (state: LaundryState, action: LaundryAction) => LaundryState;

export const LaundryReducer: LaundryReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LaundryActionType.SET_LOADING: return {
      ...state,
      loading: payload,
    };
    case LaundryActionType.SET_CLOTHS: return {
      ...state,
      loading: false,
      data: payload,
    };
    case LaundryActionType.RESET: return {
      ...initialState,
      loading: false,
    };
    default: return state;
  }
};

