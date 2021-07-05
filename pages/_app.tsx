import "../styles/tailwind.css";

import { ErrorType, isError } from "@appTypes/requestTypes";
import { NextRouter, useRouter } from "next/router";
import { Permissions, hasPermission } from "@utils/perms";
import React, { createContext } from "react";

import { API_BASE_URL } from "@utils/config";
import type { AppProps } from "next/app";
import { BannedScreen } from "@components/BannedScreen";
import { ErrorScreen } from "@src/components/ErrorScreen";
import Head from "next/head";
import { Layout } from "@src/layout";
import { UserResponseDataType } from "@appTypes/user";
import { fetcher } from "@utils/requests";
import useSWR from "swr";

/** The global user, it will never get shown to the client as undefined. */
// prettier-ignore
export const UserContext = createContext<UserResponseDataType | undefined>(undefined);

/**
 * Fetch the current logged in user, this utilizes SWR. (So requests are optimized.)
 *
 * @returns An object which contains the current state and details about the request.
 */
const useLoggedInUser = () => {
  const { data, error } = useSWR<UserResponseDataType | ErrorType>(
    `${API_BASE_URL}/user/@me`,
    fetcher
  );

  return {
    /** The response ot the request, which should be a user. */
    user: data,
    /** If the request is still being processed. */
    isLoading: !error && !data,
    /** This will contain an error if the request returned an error or if an error with SWR occurred. */
    error: isError(data) ? data : error,
  };
};

/**
 *
 * @param app The passed application.
 * @param router An initialized router.
 * @returns The page in the dashboard layout with a user in the context.
 */
const DashboardAppWithLogin: React.FC<{ app: AppProps; router: NextRouter }> =
  ({ app, router }) => {
    const { user, isLoading, error } = useLoggedInUser();

    if (isLoading)
      return (
        <>
          <Head>Xiler | Loading...</Head>
          {/* TODO: Add loader component. */}
          <p>Loading...</p>
        </>
      );

    // Redirect the user to the login and provide the current URI as reference for a redirect afterwards.
    if (error !== undefined) {
      router
        .push({ pathname: "/login", query: { ref: app.router.asPath } })
        .then();
      return <></>;
    }

    const usr = user as UserResponseDataType;

    // Check if the user has member rights, if not they were banned.
    if (!hasPermission(usr, Permissions.MEMBER))
      return <BannedScreen username={usr.username} />;

    return (
      <UserContext.Provider value={usr}>
        <Layout>
          <app.Component {...app.pageProps} />
        </Layout>
      </UserContext.Provider>
    );
  };

const DashboardApp: React.FC<AppProps> = (app) => {
  const router = useRouter();

  // Since a user has not signed in we need to redirect them the sign in screen.
  if (app.router.route === "/login")
    return <app.Component {...app.pageProps} />;
  else if (app.router.route === "/_error")
    return <ErrorScreen />

  // Otherwise we can display the page.
  return <DashboardAppWithLogin app={app} router={router} />;
};

export default DashboardApp;
