import { CartState } from "@urbandhobi/redux/cart/cart.type";
import { LaundryState } from "@urbandhobi/redux/laundry/laundry.type";
import { UserState } from "@urbandhobi/redux/user/user.type";
import { AddressState } from "../redux/address/address.type";
import { AuthState } from "../redux/authentication/auth.type";
import { HomeState } from "../redux/home/home.type";
import { ServiceState } from "../redux/services/services.type";

export interface RootReducerType {
  auth: AuthState;
  home: HomeState;
  address: AddressState;
  laundry: LaundryState;
  cart: CartState;
  services: ServiceState;
  user: UserState;
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
