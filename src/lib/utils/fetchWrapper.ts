import { APIError, ReqMethod, Response } from "@urbandhobi/@types";

export class fetchWrapper<Body = any, Res = any> {
  private url!: string;
  private method!: ReqMethod;
  private data?: string;
  private authToken: string;
  private refreshToken: string;

  constructor(url?: string, method?: ReqMethod) {
    if (url) {
      this.url = url;
    }
    if (method) {
      this.method = method;
    }
    this.authToken = "";
    this.refreshToken = "";
  }

  setURL = (url: string) => {
    this.url = url;
    return this;
  }

  setReqMethod = (method: ReqMethod) => {
    this.method = method;
    return this;
  }

  setData = (data: Body) => {
    this.data = JSON.stringify(data);
    return this;
  }

  setTokens = (authToken: string, refreshToken: string = "") => {
    this.authToken = authToken;
    this.refreshToken = refreshToken;
    return this;
  }

  send = async (): Promise<Res> => {
    const auth = this.authToken ? `Barrer ${this.authToken}` : "";
    if (!this.url) {
      throw new Error("provide the url");
    }
    if (!this.method) {
      throw new Error("provide the request method type");
    }
    const res = await fetch(this.url, {
      method: this.method,
      body: this.data,
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth,
        "x-refresh-token": this.refreshToken,
      },
    });
    console.log(res.status);
    if (res.status >= 400) {
      let error = await res.json();
      if (typeof error === "object") {
        error = JSON.stringify(error, null, 2);
      }
      console.error(error);
      throw new Error(error);
    }
    const data: Res | APIError = await res.json();
    return data as Res;
  }
}

export const getFetchWrapper = <Body = any, Res = any>(url?: string, method?: ReqMethod) => {
  return new fetchWrapper<Body, Res>(url, method);
};

