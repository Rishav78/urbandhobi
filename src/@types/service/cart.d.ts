import {SupportedCloth} from "@urbandhobi/@types";

export interface CartItem {
  id: string;
  count: number;
  cloth: SupportedCloth;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  status: "pending" | "submited";
  items: Array<CartItem>;
  createdAt: Date;
  updatedAt: Date;
}
