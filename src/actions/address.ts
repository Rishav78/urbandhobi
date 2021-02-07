import { Address } from "@urbandhobi/@types/services";
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
