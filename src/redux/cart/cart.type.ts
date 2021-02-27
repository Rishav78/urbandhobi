export interface CartAction {
  type: CartActionType,
  payload?: any
}

// eslint-disable-next-line no-shadow
export enum CartActionType {
  ADD_TO_WASH="@@cart/ADD_TO_WASH",
  ADD_TO_WASH_AND_IRON="@@cart/ADD_TO_WASH",
  ADD_TO_WASH_AND_FOLD="@@cart/ADD_TO_WASH",
  ADD_TO_DRY_CLEAN="@@cart/ADD_TO_WASH",
}

export interface SelectedCloth {
  id: string;
  count: number;
}

export interface CartState {
  [key: string]: {
    title: string;
    data: {
      [key: string]: SelectedCloth
    }
  };
}
