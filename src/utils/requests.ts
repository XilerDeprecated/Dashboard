import { API_BASE_URL } from "./config";

export const fetcher = (nput: RequestInfo, init?: RequestInit | undefined) =>
  fetch(nput, { ...init, credentials: "include" }).then((res) => res.json());

export const logout = () =>
  fetch(`${API_BASE_URL}/logout`, {
    method: "DELETE",
    credentials: "include",
  }).catch((e) => e);
