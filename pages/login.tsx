import { API_BASE_URL, ApiEndpoints } from "@utils/config";
import React, { useEffect, useState } from "react";

import { ErrorType } from "@appTypes/requests";
import Head from "next/head";
import { Icon } from "@xiler/icon/lib/Components";
import { SHA3 } from "sha3";
import { logout } from "@utils/requests";

const UserLoginComponent: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [exception, setException] = useState<string>("");

  const performSignIn = async () => {
    if (user.trim() === "" || password.trim() === "") {
      setException("Please fill in both fields. (user and password)");
      return;
    }

    const hash = new SHA3(512).update(password).digest("hex");
    const res = await fetch(API_BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password: hash }),
    });

    if (res.status === 200) {
      window.location.href = "/";
      return;
    }

    const data = (await res.json()) as ErrorType | null;

    if (data?.error) setException(data.error);
  };

  return (
    <form
      className="flex flex-col w-4/5"
      onSubmit={(e) => {
        e.preventDefault();
        performSignIn();
      }}
    >
      <label htmlFor="user">User:</label>
      <input
        type="text"
        id="user"
        autoComplete="username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="px-2 py-1 rounded outline-none text-dark-900"
      />

      <label htmlFor="password" className="mt-2">
        Password:
      </label>
      <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-2 py-1 rounded outline-none text-dark-900"
      />
      <button
        className="py-3 mt-8 transition-colors rounded bg-secondary-500 hover:bg-secondary-600"
        type="submit"
      >
        Sign in
      </button>
      {exception && (
        <p className="p-3 mt-5 text-center rounded bg-accent-500">
          {exception}
        </p>
      )}
    </form>
  );
};

export const LoginPage: React.FC = () => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <Head>
        <title>Xiler | Secure Sign In</title>
      </Head>
      <div className="absolute top-0 left-0 grid w-full h-screen">
        <div className="grid self-center w-4/5 max-w-lg gap-10 md:w-3/5 lg:w-2/5 justify-self-center justify-items-center">
          <Icon
            className="max-w-full w-28 h-28 md:w-full"
            size={{ width: 200, height: 200 }}
          />
          <UserLoginComponent />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
