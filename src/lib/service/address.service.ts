import { Address, ReverseGeoCode } from "@urbandhobi/@types";
import { api, HERE_API, HERE_API_KEY } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "../utils";

export class AddressService {
  public async get() {
    try {
      const url = api.address.myAddress;
      const tokens = await getTokens();
      const res = await getFetchWrapper<null, Address[]>()
        .setURL(url)
        .setReqMethod("GET")
        .setTokens(tokens.auth!)
        .send();
      return res;
    }
    catch (error) {
      console.error(error);
    }
  }

  public async save<T>(body: T) {
    const url = api.address.create;
    const { auth } = await getTokens();
    const res = await getFetchWrapper<T, any>()
      .setURL(url)
      .setReqMethod("PUT")
      .setTokens(auth!)
      .setData(body)
      .send();
    return res;
  }

  public async makeDefault(id: string) {
    try {
      const url = api.address.updatedDefault(id);
      const { auth } = await getTokens();
      await getFetchWrapper(url, "PATCH")
        .setTokens(auth)
        .send();
    }
    catch (error) {
      console.error(error);
    }
  }

  public async getDefault() {
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
  }

  public async delete(id: string) {
    try {
      const url = api.address.delete(id);
      const { auth } = await getTokens();
      await getFetchWrapper<{address: string}>(url, "DELETE")
        .setTokens(auth)
        .send();
    }
    catch (error) {
      console.error(error);
    }
  }

  public async reverseGeoCoding(ln: number, lt: number) {
    const url = `${HERE_API}/revgeocode?apikey=${HERE_API_KEY}&lang=en-US&at=${lt}%2C${ln}`;
    const res = (await (await fetch(url)).json()).items as ReverseGeoCode[];
    if (!res) {
      throw new Error("HERE service api expired");
    }
    return res[0];
  }
}
