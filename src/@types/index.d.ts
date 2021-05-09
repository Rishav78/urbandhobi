export * from "./authentication";
export * from "./hooks";
export * from "./error";
export * from "./redux";
export * from "./services";
export * from "./screens";
export * from "./actions";
export * from "./service";
export * from "./common";
export * from "./user";
export * from "./laundry";

export interface FABState {
  open: boolean;
}

export type AddressType = "home" | "work";

export interface EditAddress {
  title?: string;
  email: string;
  phonenumber: string;
  city: string;
  postalCode: string;
  state: string;
  locality: string;
  houseno: string;
  type: AddressType;
}

export interface Address extends EditAddress{
  id: string;
  default: boolean;

  createdAt: Date;
  updatedAt: Date;
}

