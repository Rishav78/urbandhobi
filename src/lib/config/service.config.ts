export const AUTH_API: string = "http://192.168.43.202:4000/api/v1/auth";
export const URBANDHOBI_API: string = "http://192.168.43.202:3000/api/v1";

export const api = {
  auth: {
    SIGNIN: `${AUTH_API}/signin`,
    SIGNUP: `${AUTH_API}/signup`,
  },
  services: `${URBANDHOBI_API}/services`,
  serviceArea: `${URBANDHOBI_API}/location`,
  address: {
    myAddress: `${URBANDHOBI_API}/user/address`,
    create: `${URBANDHOBI_API}/user/address/create`,
    delete: `${URBANDHOBI_API}/user/address/delete`,
  },
};

export const serviceAreaStateURL = async () => {
  return `${api.serviceArea}/states?country=1`;
};
