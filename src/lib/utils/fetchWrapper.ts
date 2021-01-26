import {ReqMethod} from "../../@types";

export class fetchWrapper<Body=any, Res=any> {
  private url!: string;
  private method!: ReqMethod;
  private authReq: boolean;
  private data?: string;

  constructor(url?: string, method?: ReqMethod) {
    if (url) {
      this.url = url;
    }
    if (method) {
      this.method = method;
    }
    this.authReq = false;
  }

  setURL = (url: string) => {
    this.url = url;
    return this;
  }

  setReqMethod = (method: ReqMethod) => {
    this.method = method;
    return this;
  }

  requireAuth = () => {
    this.authReq = true;
    return this;
  }

  setData = (data: Body) => {
    this.data = JSON.stringify(data);
    return this;
  }

  send = async (): Promise<Res> => {
    let token: string = "";
    if (!this.url) {
      throw new Error("provide the url");
    }
    if (!this.method) {
      throw new Error("provide the request method type");
    }
    if (this.authReq) {
      // get stored token
    }
    console.log(this.url, this.method);
    const res = await fetch(this.url, {
      method: this.method,
      body: this.data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data: Res = await res.json();
    return data;
  }
}

export const getFetchWrapper = <Body = any, Res = any>(url?: string, method?: ReqMethod) => {
  return new fetchWrapper<Body, Res>(url, method);
};

