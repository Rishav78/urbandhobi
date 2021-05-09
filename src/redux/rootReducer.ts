import { combineReducers } from "redux";
import { AddressReducer } from "./address/address.reducer";

import {AuthReducer} from "./authentication/auth.reducer";
import {HomeReducer} from "./home/home.reducer";
import { ClothReducer } from "./cloth/cloth.reducer";
import {CartReducer} from "./cart/cart.reducer";
import { ServicesReducer } from "./services/services.reducer";
import {UserReducer} from "./user/user.reducer";
import {LaundryReducer} from "./laundry/laundry.reducer";


const RootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  address: AddressReducer,
  cloth: ClothReducer,
  cart: CartReducer,
  services: ServicesReducer,
  user: UserReducer,
  laundry: LaundryReducer,
});

export default RootReducer;
