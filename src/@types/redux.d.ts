import { AddressState } from "../redux/address/address.type";
import { AuthState } from "../redux/authentication/auth.type";
import { HomeState } from "../redux/home/home.type";

export interface RootReducerType {
  auth: AuthState;
  home: HomeState;
  address: AddressState,
}
