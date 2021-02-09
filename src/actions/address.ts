import { Address, AddressBody } from "@urbandhobi/@types/screens";
import { api } from "@urbandhobi/lib/config";
import { getTokens } from "@urbandhobi/lib/helpers";
import { getFetchWrapper } from "@urbandhobi/lib/utils";

export const getMyAddress = async () => {
  try {
    const url = api.address.myAddress;
    const tokens = await getTokens();
    console.log(url);
    const res = await getFetchWrapper<null, Address[]>()
      .setURL(url)
      .setReqMethod("GET")
      .setTokens(tokens.auth!)
      .send();
    return res;
  }
  catch (error) {
    console.log(error);
  }
};

export const saveAddress = async (body: AddressBody) => {
  const url = api.address.create;
  const { auth } = await getTokens();
  const res = await getFetchWrapper<AddressBody, any>()
    .setURL(url)
    .setReqMethod("POST")
    .setTokens(auth!)
    .setData(body)
    .send();
  return res;
};

export const makeAddressDefault = async (id: string) => {
  try {
    const { auth } = await getTokens();
    const res = await getFetchWrapper(api.address.default, "POST")
      .setTokens(auth)
      .setData({id})
      .send();
  }
  catch (error) {
    console.log(error);
  }
}