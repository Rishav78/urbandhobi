import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "../utils";

export interface RequestBody {
  paymentMethod: "cod";
  timingId: number;
}

export class LaundryService {
  constructor(private cart: string) { }

  public request = async () => {
    const url = api.laundry.request(this.cart);
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<RequestBody, { success: true }>(url, "PUT")
        .setData({paymentMethod: "cod", timingId: 1})
        .setTokens(auth)
        .send();

      if (!res.success) {
        throw new Error("some error ocur");
      }
      return true;
    }
    catch (error) {
      console.error(error);
    }
  }
}
