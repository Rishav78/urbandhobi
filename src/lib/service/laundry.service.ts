import { Request } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "../utils";

export interface ScheduleBody {
  timingId: number;
  addressId: string;
  pickupDate: Date;
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

  public async revoke(id: string) {
    const url = api.laundry.revoke(id);
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<null, boolean>(url, "PATCH")
        .setTokens(auth)
        .send();
      return res;
    }
    catch (error) {

    }
  }

  public async delete(id: string) {
    const url = api.laundry.delete(id);
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<null, boolean>(url, "DELETE")
        .setTokens(auth)
        .send();
      return res;
    }
    catch (error) {

    }
  }

  public request = async () => {
    const url = api.laundry.request();
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<{ paymentMethod: "cod" }, Request>(url, "PUT")
        .setData({ paymentMethod: "cod" })
        .setTokens(auth)
        .send();
      return res;
    }
    catch (error) {
      console.error(error);
    }
  }

  public schedule = async (id: string, {timingId, addressId, pickupDate}: ScheduleBody) => {
    const url = api.laundry.schdule(id);
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<ScheduleBody, boolean>(url, "PATCH")
        .setData({ timingId, addressId, pickupDate })
        .setTokens(auth)
        .send();

      return res;
    }
    catch (error) {
      console.error(error);
    }
  }
}
