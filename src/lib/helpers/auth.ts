import AsyncStorage from "@react-native-async-storage/async-storage";

export const setTokens = async (authToken: string, refreshToken: string) => {
  await AsyncStorage.setItem("authtoken", authToken);
  await AsyncStorage.setItem("refreshtoken", refreshToken);
};

export const getTokens = async () => {
  return {
    auth: await AsyncStorage.getItem("authtoken"),
    refresh: await AsyncStorage.getItem("refreshtoken"),
  };
};
