import { User } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "../utils";

export class UserService {
  public async get() {
    const url = api.user.current;
    try {
      const { auth } = await getTokens();
      const res = await getFetchWrapper<null, User>(url, "GET")
        .setTokens(auth)
        .send();
      return res;
    }
    catch (error) {
      console.error(error);
    }
  }
}