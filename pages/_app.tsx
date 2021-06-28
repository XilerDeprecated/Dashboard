import "../styles/tailwind.css";

import { ErrorType, isError } from "@appTypes/requestTypes";
import { NextRouter, useRouter } from "next/router";
import { Permissions, hasPermission } from "@utils/perms";
import React, { createContext } from "react";

import { API_BASE_URL } from "@utils/config";
import type { AppProps } from "next/app";
import { BannedScreen } from "src/components/BannedScreen";
import Head from "next/head";
import { UserResponseDataType } from "@appTypes/user";
import { fetcher } from "@utils/requests";
import useSWR from "swr";

export const UserContext = createContext<UserResponseDataType | undefined>(
  undefined
);

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

    if (isLoading)
      return (
        <>
          <Head>Xiler | Loading...</Head>
          <p>Loading...</p>
        </>
      );
    if (error !== undefined) {
      router.push("/login").then();
      return <></>;
    }

    const usr = user as UserResponseDataType;

    // Check if the user has member rights, if not they were banned.
    if (!hasPermission(usr, Permissions.MEMBER))
      return <BannedScreen username={usr.username} />;

    return (
      <UserContext.Provider value={usr}>
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
