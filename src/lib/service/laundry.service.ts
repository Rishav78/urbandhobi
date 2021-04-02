import { Cart, Timings } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "../utils";

export interface RequestBody {
  paymentMethod: "cod";
  timingId: number;
}

export class LaundryService {
  constructor(private cart: string) { }

  public request = async (timingId: number) => {
    const url = api.laundry.request(this.cart);
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

  public timings = async () => {
    const url = api.laundry.timing();
    try {
      const res = await getFetchWrapper<null, Timings[]>(url, "GET").send();
      return res;
    }
    catch (error) {
      console.error(error);
    }
  }
}
