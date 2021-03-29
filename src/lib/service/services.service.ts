import { ServiceSections } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers"
import { getFetchWrapper } from "../utils";

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
}
