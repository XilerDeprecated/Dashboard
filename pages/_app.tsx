import "../styles/tailwind.css";
import "react-toastify/dist/ReactToastify.min.css";

import { NextRouter, useRouter } from "next/router";
import { Permissions, hasPermission } from "@utils/perms";
import React, { createContext } from "react";

import { ApiEndpoints } from "@utils/config";
import type { AppProps } from "next/app";
import { BannedScreen } from "@src/components/Banned.screen";
import { ErrorScreen } from "@src/components/Error.screen";
import Head from "next/head";
import { Layout } from "@src/layout";
import { ToastContainer } from "react-toastify";
import { UserResponseDataType } from "@appTypes/user";
import { useAPI } from "@utils/requests";

/** The global user, it will never get shown to the client as undefined. */
// prettier-ignore
export const UserContext = createContext<UserResponseDataType | undefined>(undefined);

/**
 *
 * @param app The passed application.
 * @param router An initialized router.
 * @returns The page in the dashboard layout with a user in the context.
 */
const DashboardAppWithLogin: React.FC<{ app: AppProps; router: NextRouter }> =
  ({ app, router }) => {
    const { data, isLoading, error } = useAPI<UserResponseDataType>(
      ApiEndpoints.me
    );

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
      const query = app.router.asPath === "/" ? {} : { ref: app.router.asPath };
      router.push({ pathname: "/login", query }).then();
      return <></>;
    }

    const usr = data as UserResponseDataType;

    // Check if the user has member rights, if not they were banned.
    if (!hasPermission(usr, Permissions.MEMBER))
      return <BannedScreen username={usr.username} />;

    return (
      <>
        <UserContext.Provider value={usr}>
          <Layout>
            <app.Component {...app.pageProps} />
          </Layout>
        </UserContext.Provider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  };

const DashboardApp: React.FC<AppProps> = (app) => {
  const router = useRouter();

  // Since a user has not signed in we need to redirect them the sign in screen.
  if (app.router.route === "/login")
    // TODO: In production let it redirect to the OAuth.
    return <app.Component {...app.pageProps} />;
  else if (app.router.route === "/_error") return <ErrorScreen />;

  // Otherwise we can display the page.
  return <DashboardAppWithLogin app={app} router={router} />;
};

export default DashboardApp;
