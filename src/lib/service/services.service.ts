import { Service, ServiceSections } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers"
import { getFetchWrapper, Iterator } from "../utils";

export class ServicesService {
  public getServiceTypes = async () => {
    const {services} = api;
    try {
      const {auth} = await getTokens();
      const res = await getFetchWrapper<null, ServiceSections[]>()
        .setURL(services)
        .setReqMethod("GET")
        .setTokens(auth)
        .send();
      return res;
    }
    catch (error) {
      console.error(error);
    }
  }

  public getServices = async () => {
    try {
      const {auth} = await getTokens();
      const res = await getFetchWrapper<null, Service[]>()
        .setURL(api.service)
        .setReqMethod("GET")
        .setTokens(auth)
        .send();
      const grouped = await Iterator.groupby(res, service => service.id);
      return grouped;
    }
    catch (error) {
      console.error(error);
    }
  }
}
