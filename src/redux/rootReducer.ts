import { combineReducers } from "redux";
import { AddressReducer } from "./address/address.reducer";

import {AuthReducer} from "./authentication/auth.reducer";
import {HomeReducer} from "./home/home.reducer";
import { LaundryReducer } from "./laundry/laundry.reducer";
import {CartReducer} from "./cart/cart.reducer";


const RootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  address: AddressReducer,
  laundry: LaundryReducer,
  cart: CartReducer,
});

export default RootReducer;
