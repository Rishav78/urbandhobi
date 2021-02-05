import { combineReducers } from "redux";
import { AddressReducer } from "./address/address.reducer";

import {AuthReducer} from "./authentication/auth.reducer";
import {HomeReducer} from "./home/home.reducer";


const RootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  address: AddressReducer,
});

export default RootReducer;
