import type { ErrorType, JsonRequest } from "@utils/requestTypes";

import type { NextApiResponse } from "next";
import { serialize } from "cookie";

export const password =
  "2795ebd37cb3d964e5ae4dbe41e78e5b402a338a5d2d0bcd9634d60572c65b76c0c525231dfcee6f5a08ad1dfc6230b96b2082cd077f066562156302c1d99363";
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
    req.body.user.toLowerCase() === "arthurdw" &&
    req.body.password === password
  )
    return res
      .status(200)
      .setHeader(
        "Set-Cookie",
        serialize("@xiler/user_secret", accessToken, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          httpOnly: process.env.NODE_ENV === "production",
        })
      )
      .send(undefined);
  return res.status(401).json({
    error: "The provided credentials are invalid!",
    code: 401,
  });
};

export default TemporaryLoginHandler;
