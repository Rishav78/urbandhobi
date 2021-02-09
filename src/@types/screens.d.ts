import { Position } from "./services";

export interface AddAddressFormData {
  title: string,
  location: string;
  houseno: string;
  email: string;
}

export interface AddressBody extends AddAddressFormData {
  position: Position;
  city: string;
  countryCode: string;
  country: string;
  state: string;
  postalCode: string;
  locality: string;
  nearby: string;
  district: string;
  stateCode: string;
}

export interface Address extends AddressBody {
  id: string;
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
}
