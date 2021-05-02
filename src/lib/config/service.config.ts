// export const AUTH_API: string = "http://192.168.43.202:4000/api/v1/auth";
// export const URBANDHOBI_API: string = "http://192.168.43.202:3000/api/v1";

export const AUTH_API: string = "http://192.168.101.2/api/auth/v1";
export const URBANDHOBI_API: string = "http://localhost:3000/api/v1";
export const HERE_API: string = "https://revgeocode.search.hereapi.com/v1";
export * from "../../../env";
export const api = {
  auth: {
    SIGNIN: `${AUTH_API}/signin`,
    SIGNUP: `${AUTH_API}/signup`,
    REFRESH_TOKEN: `${AUTH_API}/token/refresh`,
  },
  services: "http://192.168.101.2:3005/api/services/v1/type",
  serviceArea: {
    state: "http://192.168.101.2:3005/api/services/v1/area/state",
  },
  address: {
    myAddress: `${URBANDHOBI_API}/user/address`,
    create: `${URBANDHOBI_API}/user/address/create`,
    delete: `${URBANDHOBI_API}/user/address/delete`,
    default: `${URBANDHOBI_API}/user/address/default`,
  },
  user: {
    CREATE_USER: `${URBANDHOBI_API}/user/create`,
    VERIFIED: `${URBANDHOBI_API}/auth/verified`,
  },
  cloth: {
    laundry: "http://192.168.101.2/api/cloth/v1",
    dryclean: {

    },
  },
  cart: {
    createCart: () => `${URBANDHOBI_API}/cart`,
    getCart: (cart?: string) => "http://192.168.101.2/api/cart/v1/user",
    deleteCart: () => `${URBANDHOBI_API}/cart`,
    cartItems: (cart: string) => `${URBANDHOBI_API}/cart/${cart}/item`,
    addItem: (cart: string) => `${URBANDHOBI_API}/cart/${cart}/item`,
    updateItem: (cart: string, item: string) => `${URBANDHOBI_API}/cart/${cart}/item/${item}`,
    deleteItem: (cart: string, item: string) => `${URBANDHOBI_API}/cart/${cart}/item/${item}`,
  },
  laundry: {
    request: (cart: string) => `${URBANDHOBI_API}/laundry/request?c=${cart}`,
    timing: () => `${URBANDHOBI_API}/laundry/timing`,
  },
};

export const serviceAreaStateURL = async () => {
  return `${api.serviceArea}/states?country=1`;
};

