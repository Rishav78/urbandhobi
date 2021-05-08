import AsyncStorage from "@react-native-async-storage/async-storage";
import { Token } from "@urbandhobi/@types";
import { refreshAuthToken } from "@urbandhobi/actions/auth";

export interface AuthToken {
  timestamp: number;
  token: string;
  expireIn: number;
}

export const setTokens = async (authToken: Token, refreshToken: Token) => {
  await AsyncStorage.setItem("authtoken", JSON.stringify(authToken));
  await AsyncStorage.setItem("refreshtoken", JSON.stringify(refreshToken));
};

export const resetTokens = async () => {
  await Promise.all([AsyncStorage.removeItem("authtoken"), AsyncStorage.removeItem("refreshtoken")]);
};

export const getTokens = async () => {
  const auth = await AsyncStorage.getItem("authtoken");
  let refreshTokenString = await AsyncStorage.getItem("refreshtoken");
  if (!auth) {
    throw new Error("token not available");
  }
  let { token: refresh }: Token = JSON.parse(refreshTokenString || "{}");
  let { exp, iat, token }: Token = JSON.parse(auth);
  const isExpired = new Date().getTime() >= new Date(iat).setSeconds(new Date(iat).getSeconds() + exp);
  console.info("isExpired", isExpired);
  if (isExpired) {
    if (!refresh) {
      throw new Error("refresh token not available");
    }
    const { access, refresh: refreshToken } = await refreshAuthToken(token, refresh);
    await setTokens(access, refreshToken);
    refresh = refreshToken.token;
    token = access.token;
  }
  return {
    refresh,
    auth: token,
  };
};
