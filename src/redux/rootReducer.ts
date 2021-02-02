import { combineReducers } from "redux";

import {AuthReducer} from "./authentication/auth.reducer";
import {HomeReducer} from "./home/home.reducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
});

export default RootReducer;
