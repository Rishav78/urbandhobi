import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAuthToken } from "@urbandhobi/actions/auth";

export interface AuthToken {
  timestamp: number;
  token: string;
  expireIn: number;
}

export const setTokens = async (authToken: string, refreshToken: string) => {
  await AsyncStorage.setItem("authtoken", JSON.stringify({
    timestamp: new Date().getTime(),
    token: authToken,
    expireIn: 60 * 60,
  }));
  await AsyncStorage.setItem("refreshtoken", refreshToken);
};

export const getTokens = async () => {
  const auth = await AsyncStorage.getItem("authtoken");
  let refresh = await AsyncStorage.getItem("refreshtoken");
  if (!auth) {
    throw new Error("token not available");
  }
  let {expireIn, timestamp, token}: AuthToken = JSON.parse(auth);
  const isExpired = new Date().getTime() >= new Date(timestamp).setSeconds(new Date(timestamp).getSeconds() + expireIn);
  console.log("isExpired", isExpired);
  if (isExpired) {
    if (!refresh) {
      throw new Error("refresh token not available");
    }
    const {refreshToken, token: authToken} = await refreshAuthToken(token, refresh);
    await setTokens(authToken, refreshToken);
    refresh = refreshToken;
    token = authToken;
  }
  return {
    refresh,
    auth: token,
  };
};
