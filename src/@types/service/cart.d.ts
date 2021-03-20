import {SupportedCloth} from "@urbandhobi/@types";
import { CleanType } from "../common";

export interface CartItem {
  id: string;
  count: number;
  cleanType: CleanType;
  cloth: SupportedCloth;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  status: "pending" | "submited";
  createdAt: Date;
  updatedAt: Date;
}

export interface CartNItems extends Cart {
  items: Array<CartItem>;
}

export interface AddItemBody {
  itemId: string;
  cleanType: CleanType;
  count: number;
}