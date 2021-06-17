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

/**
 * Check if an object is an ErrorType object.
 *
 * @param obj The object that should be checked.
 * @returns Wheter or not the object is an instance of the ErrorType
 */
export const isError = (
  obj: ErrorType | object | undefined
): obj is ErrorType => !!(obj as ErrorType)?.error;
