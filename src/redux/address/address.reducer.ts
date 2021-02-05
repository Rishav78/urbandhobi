import { AddressAction, AddressActionType, AddressState } from "./address.type";

const initialState: AddressState = {
  loading: true,
  data: [],
};

export type AddressReducerFn = (state: AddressState, action: AddressAction) => AddressState;

export const AddressReducer: AddressReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AddressActionType.SET_LOADING: return {
      ...state,
      loading: payload,
    };
    case AddressActionType.SET_ADDRESS: return {
      ...state,
      loading: false,
      data: payload,
    };
    case AddressActionType.RESET: return {
      ...initialState,
      loading: false,
    };
    default: return state;
  }
};

