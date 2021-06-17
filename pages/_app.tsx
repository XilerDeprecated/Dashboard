import type { AppProps } from "next/app";

function DashboardApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default DashboardApp;
