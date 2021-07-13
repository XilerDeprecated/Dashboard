import { API_BASE_URL, ApiEndpoints } from "./config";
import { ErrorType, isError } from "@src/types/requestTypes";

import useSWR from "swr";

/**
 * Fetch something from the API, this method gets used by SWR.
 *
 * @param input The request url.
 * @param init The request props, credentials is on "include".
 * @returns The json response as an object from the request.
 */
export const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, { ...init, credentials: "include" }).then((res) => res.json());

/**
 * Utilize the API, this utilizes SWR. (So requests are optimized.)
 *
 * @param endpoint The endpoint to where the request must be sent.
 * @param contactor The method that will be used to execute the request.
 * @returns An object which contains the current state and details about the request.
 */
export const useAPI = <Response extends object>(
  endpoint: ApiEndpoints,
  contactor: typeof fetcher = fetcher
) => {
  const { data, error } = useSWR<Response | ErrorType>(
    API_BASE_URL + endpoint.valueOf(),
    contactor
  );

  return {
    /** The response ot the request, which should be your response type. */
    data,
    /** If the request is still being processed. */
    isLoading: !error && !data,
    /** This will contain an error if the request returned an error or if an error with SWR occurred. */
    error: isError(data) ? data : error,
  };
};

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

// TODO: Make custom method for all request types and handle then properly. (fg get, post, ...)
