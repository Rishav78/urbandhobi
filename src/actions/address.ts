import { Address } from "@urbandhobi/@types";
import { api } from "@urbandhobi/lib/config";
import { getTokens } from "@urbandhobi/lib/helpers";
import { getFetchWrapper } from "@urbandhobi/lib/utils";

export const getMyAddress = async () => {
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
};

export const saveAddress = async <T>(body: T) => {
  const url = api.address.create;
  const { auth } = await getTokens();
  const res = await getFetchWrapper<T, any>()
    .setURL(url)
    .setReqMethod("PUT")
    .setTokens(auth!)
    .setData(body)
    .send();
  return res;
};

export const makeAddressDefault = async (id: string) => {
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
};

export const deleteAddress = async (id: string) => {
  try {
    const { auth } = await getTokens();
    await getFetchWrapper<{address: string}>(api.address.delete, "POST")
      .setTokens(auth)
      .setData({address: id})
      .send();
  }
  catch (error) {
    console.error(error);
  }
};
