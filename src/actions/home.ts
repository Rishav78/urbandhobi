import { Address } from "@urbandhobi/@types/screens";
import { ServiceSections, ServiceState } from "@urbandhobi/@types/services";
import { api, serviceAreaStateURL } from "@urbandhobi/lib/config";
import { getTokens } from "@urbandhobi/lib/helpers";
import { getFetchWrapper } from "@urbandhobi/lib/utils";

export const getServices = async () => {
  try {
    const services = await getFetchWrapper<null, ServiceSections[]>()
      .setURL(api.services)
      .setReqMethod("GET")
      .send();
    return services;
  }
  catch (error) {
    console.log(error);
  }
};

export const getAvailableStates = async () => {
  try {
    const url = await serviceAreaStateURL();
    const states = await getFetchWrapper<null, ServiceState[]>()
      .setURL(url)
      .setReqMethod("GET")
      .send();
    return states;
  }
  catch (error) {
    console.log(error);
  }
};

export const getDefaultAddress = async () => {
  try {
    const {auth} = await getTokens();
    const address = await getFetchWrapper<null, Address>(api.address.default)
      .setTokens(auth)
      .setReqMethod("GET")
      .send();
    return address;
  }
  catch (error) {
    throw error;
  }
};

