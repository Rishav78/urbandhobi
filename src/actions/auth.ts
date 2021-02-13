import { CreateUserForm, ResponseToken } from "@urbandhobi/@types";
import { api } from "@urbandhobi/lib/config";
import { getTokens } from "@urbandhobi/lib/helpers";
import { getFetchWrapper } from "@urbandhobi/lib/utils";

export const refreshAuthToken = async (auth: string, refresh: string) => {
  const { refreshToken, token } = await getFetchWrapper<null, ResponseToken>()
    .setURL(api.auth.REFRESH_TOKEN)
    .setReqMethod("GET")
    .setTokens(auth, refresh)
    .send();
  return { refreshToken, token };
};

export const createUser = async (user: CreateUserForm) => {
  const { auth } = await getTokens();
  try {
    await getFetchWrapper()
      .setURL(api.user.CREATE_USER)
      .setReqMethod("POST")
      .setTokens(auth)
      .setData(user)
      .send();
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

export const isVerified = async () => {
  const { auth } = await getTokens();
  try {
    const {verified} = await getFetchWrapper<null, {verified: boolean}>()
      .setURL(api.user.VERIFIED)
      .setReqMethod("GET")
      .setTokens(auth)
      .send();
    return verified;
  }
  catch (error) {
    console.log(error);
  }
}