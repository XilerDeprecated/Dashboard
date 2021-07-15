/** The baseurl of the API, this will be prepended for all requests. */
export const API_BASE_URL = "/api";

/** The url that must be used to sign in. */
export const LOGIN_URL = "/login";

/**
 * All API endpoints must be specified here.
 * This gets used throughout the whole application. 
 */
export enum ApiEndpoints {
  login = "/login",
  logout = "/logout",
  me = "/user/@me",
  balance = "/user/balance",
}
