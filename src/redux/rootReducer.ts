import { combineReducers } from "redux";

import {AuthReducer} from "./authentication/auth.reducer";

const RootReducer = combineReducers({
  AuthReducer,
});

export default RootReducer;
