import type { ErrorType, JsonRequest } from "@appTypes/requestTypes";

import type { NextApiResponse } from "next";
import { serialize } from "cookie";

export const password =
  "62a43b7ff9f25a70c6ebe8565ec103831178de13f3786f956dea195f272ebd210abdf2c82d6a4dc81afac06fc8a628bc0d9a143482619c7b6827d739ae2e87a6";
export const accessToken =
  "BQJPX4Y11CIacwFY1mTKa0tT6RJ8Flyo2SZxStYTeIdB8gB4PVwmsDUYzhjplp6oRYrQ82l5rzzgT5cIuIeDGl7NsSQs7HhrgxMEJhTy2Ot1DOSgSv73BzaXH2L1w5OR";

type RequestData = {
  user?: string;
  password?: string;
};

const TemporaryLoginHandler = (
  req: JsonRequest<RequestData>,
  res: NextApiResponse<undefined | ErrorType>
) => {
  if (req.method !== "POST")
    return res.status(405).json({
      error: "This endpoint can only be accessed using a POST request!",
      code: 405,
    });

  if (req.body?.user === undefined || req.body?.password === undefined)
    return res.status(400).json({
      error: 'You have to provide a "user" and "password" field!',
      code: 400,
    });

  if (
    (req.body.user.toLowerCase() === "arthurdw" ||
      req.body.user.toLowerCase() === "arthur.dewitte@gmail.com") &&
    req.body.password === password
  ) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    res.setHeader(
      "Set-Cookie",
      serialize("@xiler/user_secret", accessToken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires,
      })
    );

    return res.status(200).send(undefined);
  }
  return res.status(401).json({
    error: "The provided credentials are invalid!",
    code: 401,
  });
};

export default TemporaryLoginHandler;
