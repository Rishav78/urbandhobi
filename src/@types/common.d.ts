export type CleanType = "wash" | "washandiron" | "washandfold" | "dryclean";

export type ReqMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Response<T=object> {
  code: number;
  data: T;
}

export interface GenericObject<value=any> {
  [key: string]: value;
  [key: number]: value;
}
