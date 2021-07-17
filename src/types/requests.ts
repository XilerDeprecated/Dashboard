import { NextApiRequest } from "next";

/**
 * All cookies related to Xiler.
 */
export type UserCookieType = {
  /** This cookie contains the user their private token. */
  "@xiler/user_secret": string;
};

/**
 * Represents the response that is returned from the API when am error occurs.
 */
export type ErrorType = {
  /** The error message describing the error. */
  error: string;
  /** The error code, this can be a custom code or a generic HTTP error code. */
  code: number;
};

/**
 * Utility to add generic types to cookies.
 */
export interface CustomRequestCookieType<T extends { [key: string]: string }>
  extends NextApiRequest {
  cookies: T;
}

/**
 * Utility to add generic types to NextApiRequest.
 */
export interface JsonRequest<T> extends NextApiRequest {
  body: T;
}

/**
 * Check if an object is an ErrorType object.
 *
 * @param obj The object that should be checked.
 * @returns Whether or not the object is an instance of the ErrorType
 */
export const isError = (
  obj: ErrorType | object | undefined
): obj is ErrorType => !!(obj as ErrorType)?.error;
