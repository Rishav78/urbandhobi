import { SupportedCloth } from "@urbandhobi/@types";
import { api } from "@urbandhobi/lib/config";
import { getTokens } from "@urbandhobi/lib/helpers";
import { getFetchWrapper, Iterator } from "@urbandhobi/lib/utils";

export const getSupportedLaundry = async () => {
  const url = api.cloth.laundry;
  try {
    const { auth } = await getTokens();
    const clothes = await getFetchWrapper<null, Array<SupportedCloth>>(url)
      .setReqMethod("GET")
      .setTokens(auth)
      .send();
    const grouped = await Iterator.groupby(clothes, cloth => cloth.id);
    return grouped;
  }
  catch (error) {
    console.error(error);
  }
};

export const getClothById = async (id: string) => {
  const url = `${api.cloth.laundry}?id=${id}`;
  try {
    // const { auth } = await getTokens();
    const cloth = (await getFetchWrapper<null, Array<SupportedCloth>>(url)
      .setReqMethod("GET")
      // .setTokens(auth)
      .send())[0];
    return cloth;
  }
  catch (error) {
    console.error(error);
  }
}