import Head from "next/head";
import { logout } from "@utils/requests";
import { useRouter } from "next/router";

export const BannedScreen: React.FC<{ username: string }> = ({ username }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Xiler | Access Denied</title>
      </Head>
      <div className="absolute top-0 left-0 grid w-full h-screen">
        <div className="grid self-center w-4/5 max-w-lg gap-4 md:w-3/5 lg:w-2/5 justify-self-center justify-items-center">
          <h1 className="text-3xl font-bold">Oops...</h1>
          {/* prettier-ignore */}
          <div className="text-center">
            It seems like your account <span className="text-sm italic">({username})</span> has been banned from Xiler. If you think
            this is incorrect, please contact us at{" "}
            <a className="font-bold hover:text-accent-500 transition-colors" href="mailto:support@xiler.net">support@xiler.net</a> or{" "}
            <a className="font-bold hover:text-accent-500 transition-colors" href="https://dc.xiler.net">dc.xiler.net</a>.
          </div>

          <button
            className="p-3 mt-5 transition-colors rounded bg-secondary-500 hover:bg-secondary-600"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
