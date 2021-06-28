import { API_BASE_URL } from "./config";

/**
 * Fetch something from the API, this method gets used by SWR.
 *
 * @param nput The request url.
 * @param init The request props, credentials is on "include".
 * @returns The json response as an object from the request.
 */
export const fetcher = (
  nput: RequestInfo,
  init?: RequestInit | undefined
): object =>
  fetch(nput, { ...init, credentials: "include" }).then((res) => res.json());

/**
 * Signs out the current user.
 *
 * @returns An error if one got thrown.
 */
export const logout = () =>
  fetch(`${API_BASE_URL}/logout`, {
    method: "DELETE",
    credentials: "include",
  }).catch((e) => e);

// TODO: Make custom method for all request types and handle then properly.
