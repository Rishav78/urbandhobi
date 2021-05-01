export interface Token {
  token: string;
  exp: number;
  iat: number;
}

export interface ResponseToken {
  access: Token;
  refresh: Token;
}
