import { ServiceSections, ServiceState } from "@urbandhobi/@types/services";
import { api, serviceAreaStateURL } from "@urbandhobi/lib/config";
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
    console.log(url);
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

