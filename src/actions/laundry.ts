import { SupportedCloth } from "@urbandhobi/@types";
import { api } from "@urbandhobi/lib/config";
import { getTokens } from "@urbandhobi/lib/helpers";
import { getFetchWrapper } from "@urbandhobi/lib/utils";

export const getSupportedLaundry = async () => {
  const url = api.cloth.laundry;
  try {
    console.log(url);
    // const { auth } = await getTokens();
    const clothes = await getFetchWrapper<null, Array<SupportedCloth>>(url)
      .setReqMethod("GET")
      // .setTokens(auth)
      .send();
    return clothes;
  }
  catch (error) {
    console.log(error);
  }
};
