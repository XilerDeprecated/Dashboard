import { NextApiRequest } from "next";

export type UserCookieType = {
  "@xiler/user_secret": string;
};

export type ErrorType = {
  error: string;
  code: number;
};

export interface CustomRequestCookieType<T extends { [key: string]: string }>
  extends NextApiRequest {
  cookies: T;
}

export interface JsonRequest<T> extends NextApiRequest {
  body: T;
}
