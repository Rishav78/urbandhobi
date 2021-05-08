import { combineReducers } from "redux";
import { AddressReducer } from "./address/address.reducer";

import {AuthReducer} from "./authentication/auth.reducer";
import {HomeReducer} from "./home/home.reducer";
import { LaundryReducer } from "./laundry/laundry.reducer";
import {CartReducer} from "./cart/cart.reducer";
import { ServicesReducer } from "./services/services.reducer";
import {UserReducer} from "./user/user.reducer";


const RootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  address: AddressReducer,
  laundry: LaundryReducer,
  cart: CartReducer,
  services: ServicesReducer,
  user: UserReducer,
});

export default RootReducer;
