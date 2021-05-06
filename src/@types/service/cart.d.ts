import {SupportedCloth} from "@urbandhobi/@types";
import { Service } from "../services";

export interface CartItem {
  id: string;
  count: number;
  itemId: string;
  serviceId: string;
  serviceTypeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  status: "pending" | "submited";
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemGBService extends Service {
  items: CartItem[];
}

export interface CartNItems extends Cart {
  items: Array<CartItem>;
}

export interface AddItemBody {
  itemId: string;
  serviceId: string;
  serviceTypeId: string;
  count: number;
}
