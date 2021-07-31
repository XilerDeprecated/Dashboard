import { API_BASE_URL, ApiEndpoints } from "./config";
import { ErrorType, isError } from "@appTypes/requests";

import { toast } from "react-toastify";
import useSWR from "swr";

/**
 * Fetch something from the API, this method gets used by SWR.
 *
 * @param input The request url.
 * @param init The request props, credentials is on "include".
 * @returns The json response as an object from the request.
 */
export const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  send<any>(input, "GET", "include", init, true);

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
    endpoint.valueOf().toString(),
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

export const logout = () => send(ApiEndpoints.logout, "DELETE", "include");

// TODO: Document this
const send = async <T>(
  endpoint: ApiEndpoints | string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  credentials: RequestCredentials,
  config?: RequestInit,
  throw_errors?: boolean
) => {
  try {
    const res = await fetch(API_BASE_URL + endpoint, {
      method,
      credentials,
      ...config,
    });
    if (!res.ok) throw new Error(res.statusText);
    const txt = await res.text();
    if (txt === "") return undefined;
    return JSON.parse(txt) as T;
  } catch (error) {
    if (throw_errors) throw error;

    toast.error(
      `An error occurred while sending an API request. ([${method} ${endpoint}] ${error})`
    );
  }
};
