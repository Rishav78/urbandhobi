import { ResponseToken } from "@urbandhobi/@types";
import { api } from "@urbandhobi/lib/config";
import { getFetchWrapper } from "@urbandhobi/lib/utils";

export const refreshAuthToken = async (auth: string, refresh: string) => {
  const {refreshToken, token} = await getFetchWrapper<null, ResponseToken>()
    .setURL(api.auth.REFRESH_TOKEN)
    .setReqMethod("GET")
    .setTokens(auth, refresh)
    .send();
  return {refreshToken, token};
};
