// export const AUTH_API: string = "http://192.168.43.202:4000/api/v1/auth";
// export const URBANDHOBI_API: string = "http://192.168.43.202:3000/api/v1";
import {AUTH_API, UD_API} from "./app.config";
export const URBANDHOBI_API: string = "http://localhost:3000/api/v1";
export const HERE_API: string = "https://revgeocode.search.hereapi.com/v1";
export const api = {
  auth: {
    SIGNIN: `${AUTH_API}/signin`,
    SIGNUP: `${AUTH_API}/signup`,
    REFRESH_TOKEN: `${AUTH_API}/token/refresh`,
  },
  services: `${UD_API}/api/services/v1/type`,
  service: `${UD_API}/api/services/v1`,
  serviceArea: {
    state: `${UD_API}/api/services/v1/area/state`,
  },
  address: {
    myAddress: `${UD_API}:3004/api/address/v1`,
    create: `${UD_API}:3004/api/address/v1`,
    delete: (id: string) => `${UD_API}:3004/api/address/v1/${id}`,
    default: `${UD_API}:3004/api/address/v1/default`,
    updatedDefault: (id: string) => `${UD_API}:3004/api/address/v1/default/${id}`,
  },
  user: {
    current: `${UD_API}:3001/api/user/v1/currentuser`,
    CREATE_USER: `${URBANDHOBI_API}/user/create`,
    VERIFIED: `${URBANDHOBI_API}/auth/verified`,
  },
  cloth: {
    laundry: `${UD_API}/api/cloth/v1`,
    dryclean: {

    },
  },
  cart: {
    createCart: () => `${URBANDHOBI_API}/cart`,
    getCart: () => `${UD_API}/api/cart/v1/user`,
    deleteCart: () => `${URBANDHOBI_API}/cart`,
    cartItems: () => `${UD_API}/api/cart/v1/item/all`,
    addItem: () => `${UD_API}/api/cart/v1/item`,
    updateItem: (cart: string, item: string) => `${URBANDHOBI_API}/cart/${cart}/item/${item}`,
    deleteItem: (cart: string, item: string) => `${URBANDHOBI_API}/cart/${cart}/item/${item}`,
  },
  laundry: {
    request: () => `${UD_API}:3006/api/laundry/v1/raise`,
    getRequests: `${UD_API}:3006/api/laundry/v1`,
    schdule: (id: string) => `${UD_API}:3006/api/laundry/v1/schedule/${id}`,
    revoke: (id: string) => `${UD_API}:3006/api/laundry/v1/revoke/${id}`,
    delete: (id: string) => `${UD_API}:3006/api/laundry/v1/${id}`,
    timing: () => `${UD_API}/api/services/v1/timing/pickup`,
  },
};

export const serviceAreaStateURL = async () => {
  return `${api.serviceArea}/states?country=1`;
};

