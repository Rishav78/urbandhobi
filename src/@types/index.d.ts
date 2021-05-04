export * from "./authentication";
export * from "./hooks";
export * from "./error";
export * from "./redux";
export * from "./services";
export * from "./screens";
export * from "./actions";
export * from "./service";
export * from "./common";

export interface FABState {
  open: boolean;
}

export type AddressType = "home" | "work";

export interface EditAddress {
  email: string
  phonenumber: string;
  city: string;
  postalCode: string;
  state: string;
  locality: string;
  houseno: string;
  type: AddressType;
}
