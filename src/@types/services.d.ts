export interface Position {
  lng: number;
  lat: number;
}

export interface Assets {
  id: string;
  mimeType: string;
  size: number;
  name: string;
  extension: string;
  url: string;
  createdAt: Date;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  data: string;
  daysRequired: number;
  image: Assets;
  createdAt: Date;
  updatedAt: string;
}

export interface ServiceSections {
  id: string;
  name: string;
  services: Array<Service>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceState {
  id: string;
  state: string;
  country: string;
  symbol: string;
  image: Assets;
}

export interface ReverseGeoCode {
  title: string;
  id: string;
  resultType: string;
  address: {
    label: string;
    countryCode: string;
    countryName: string;
    stateCode: string;
    state: string;
    county: string;
    city: string;
    district: string;
    postalCode: string;
  };
  position: Position;
  access: Array<Position>;
  distance: number;
  categories: Array<{
    id: string;
    name: string;
    primary: boolean;
  }>
}
