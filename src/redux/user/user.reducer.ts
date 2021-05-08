import { UserAction, UserActionType, UserState } from "./user.type";

const initialState: UserState = {
  loading: true,
  data: null,
};

export type UserReducerFn = (state: UserState, action: UserAction) => UserState;

export const UserReducer: UserReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserActionType.SET_LOADING: return {
      ...state,
      loading: payload,
    };
    case UserActionType.SET_DATA: return {
      ...state,
      loading: false,
      data: payload,
    };
    case UserActionType.RESET: return {
      ...initialState,
      loading: false,
    };
    default: return state;
  }
};

