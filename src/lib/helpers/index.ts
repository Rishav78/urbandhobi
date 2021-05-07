export * from "./auth";
export * from "./validator";
export * from "./location";

export const toJSON = <T>(obj: any): T => {
  try {
    const res = JSON.parse(obj);
    return res;
  }
  catch (error) {
    return obj;
  }
};
