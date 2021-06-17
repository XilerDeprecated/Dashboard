export const fetcher = (nput: RequestInfo, init?: RequestInit | undefined) =>
  fetch(nput, { ...init, credentials: "include" }).then((res) => res.json());

export const poster = (nput: RequestInfo, init?: RequestInit | undefined) =>
  fetch(nput, init).then((res) => res.json());
