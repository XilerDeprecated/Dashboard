import "../styles/tailwind.css";

import { ErrorType, isError } from "@appTypes/requestTypes";
import { NextRouter, useRouter } from "next/router";
import React, { createContext } from "react";

import { API_BASE_URL } from "@utils/config";
import type { AppProps } from "next/app";
import { UserResponseDataType } from "@appTypes/user";
import { fetcher } from "@utils/requests";
import useSWR from "swr";

export const UserContext =
  createContext<UserResponseDataType | undefined>(undefined);

const useLoggedInUser = () => {
  const { data, error } = useSWR<UserResponseDataType | ErrorType>(
    `${API_BASE_URL}/user/@me`,
    fetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    error: isError(data) ? data : error,
  };
};

const DashboardAppWithLogin: React.FC<{ app: AppProps; router: NextRouter }> =
  ({ app, router }) => {
    const { user, isLoading, error } = useLoggedInUser();

    if (isLoading) return <p>Loading...</p>;
    if (error !== undefined) {
      router.push("/login");
      return <></>;
    }
    return (
      <UserContext.Provider value={user as UserResponseDataType}>
        <app.Component {...app.pageProps} />
      </UserContext.Provider>
    );
  };

const DashboardApp: React.FC<AppProps> = (app) => {
  const router = useRouter();

  if (router.pathname === "/login") return <app.Component {...app.pageProps} />;

  return <DashboardAppWithLogin app={app} router={router} />;
};

export default DashboardApp;
