import { Cart, Request } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "../utils";

export interface RequestBody {
  paymentMethod: "cod";
  timingId: number;
}

export class LaundryService {
  constructor() { }

  public async get() {
    const url = api.laundry.getRequests;
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<null, Request[]>(url, "GET")
      .setTokens(auth)
      .send();

    return res;
    }
    catch (error) {

    }
  }

  public request = async (timingId: number) => {
    const url = api.laundry.request();
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<RequestBody, Cart>(url, "PUT")
        .setData({paymentMethod: "cod", timingId})
        .setTokens(auth)
        .send();

      return res;
    }
    catch (error) {
      console.error(error);
    }
  }
}
