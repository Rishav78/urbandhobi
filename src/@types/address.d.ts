export type AddressMode = "config" | "select";
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

