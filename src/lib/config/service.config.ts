// export const AUTH_API: string = "http://192.168.43.202:4000/api/v1/auth";
// export const URBANDHOBI_API: string = "http://192.168.43.202:3000/api/v1";

export const AUTH_API: string = "https://base-authentication.herokuapp.com/api/v1/auth";
export const URBANDHOBI_API: string = "https://laundry-app.herokuapp.com/api/v1";
export const HERE_API: string = "https://revgeocode.search.hereapi.com/v1";
export * from "../../../env";
export const api = {
  auth: {
    SIGNIN: `${AUTH_API}/signin`,
    SIGNUP: `${AUTH_API}/signup`,
    REFRESH_TOKEN: `${AUTH_API}/token/refresh`,
  },
  services: `${URBANDHOBI_API}/services`,
  serviceArea: `${URBANDHOBI_API}/location`,
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
};

export const serviceAreaStateURL = async () => {
  return `${api.serviceArea}/states?country=1`;
};
