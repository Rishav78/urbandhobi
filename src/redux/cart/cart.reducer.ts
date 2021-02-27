import { SupportedCloth } from "@urbandhobi/@types";
import { CartAction, CartActionType, CartState } from "./cart.type";

const initialState: CartState = {
  wash: {
    title: "wash",
    data: {},
  },
  washAndIron: {
    title: "wash & iron",
    data: {},
  },
  washAndFold: {
    title: "wash & Fold",
    data: {},
  },
  dryClean: {
    title: "dry clean",
    data: {},
  },
};

export type AuthReducerFn = (state: CartState, action: CartAction) => CartState;

// export const addToCart = (state:CartState, key: "wash" | "washAndIron" | "washAndFold" | "dryClean", payload: SupportedCloth): CartState => {
//   if (typeof state[key].data[payload.id] !== "undefined") {
//     return {
//       ...state,
//       [key]: {
//         ...state[key],
//         data: {
//           ...state[key].data,
//           [payload.id]: {
//             ...state[key].data[payload.id],
//             count: state[key].data[payload.id].count + 1,
//           },
//         },
//       },
//     };
//   }
//   return {
//     ...state,
//     [key]: {
//       ...state[key],
//       data: {
//         ...state[key].data,
//         [payload.id]: {
//           id: payload.id,
//           count: 1,
//         },
//       },
//     },
//   };
// };

const addToCart = (state: CartState, key: "wash" | "washAndIron" | "washAndFold" | "dryClean", payload: {[key: string]: number}) => {
  const newState = {...state};
  for (const k of Object.keys(payload)) {
    console.log(k, payload);
    if (state[key].data[k]) {
      state[key].data[k].count++;
    }
    else {
      state[key].data[k] = {id: k, count: 1};
    }
  }
  return newState;
};

export const CartReducer: AuthReducerFn = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CartActionType.ADD_TO_WASH:
      return addToCart(state, "wash", payload);
    case CartActionType.ADD_TO_WASH_AND_IRON:
      return addToCart(state, "washAndIron", payload);
    case CartActionType.ADD_TO_WASH_AND_FOLD:
      return addToCart(state, "washAndFold", payload);
    case CartActionType.ADD_TO_DRY_CLEAN:
      return addToCart(state, "dryClean", payload);
    default: return state;
  }
};

