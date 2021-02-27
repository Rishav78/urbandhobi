import { LaundryState } from "@urbandhobi/redux/laundry/laundry.type";
import { AddressState } from "../redux/address/address.type";
import { AuthState } from "../redux/authentication/auth.type";
import { HomeState } from "../redux/home/home.type";

export interface RootReducerType {
  auth: AuthState;
  home: HomeState;
  address: AddressState;
  laundry: LaundryState;
}

export interface SupportedCloth {
  id: string;
  name: string;
  gender: "men" | "women";
  cost: number;
  kids: boolean;
  kidsCost: number | null;
  createdAt: Date;
  updatedAt: Date;
}
