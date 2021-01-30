export * from "./authentication";
export * from "./hooks";
export * from "./error";
export * from "./redux";

export type ReqMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface Response<T=object> {
  code: number;
  data: T;
}
