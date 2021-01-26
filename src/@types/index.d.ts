export * from "./signin";
export * from "./hooks";
export * from "./error";

export type ReqMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface Response<T> {
  code: number;
  data: T;
}
