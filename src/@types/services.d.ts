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

export interface Address {
  id: string;
  address: string;
  city: {
    id: string;
    city: string;
    state: string;
    country: string;
    createdAt: Date;
    updateAt: Date;
  }
  createdAt: Date;
  updateAt: Date;
}
