import type {
  CustomRequestCookieType,
  ErrorType,
  UserCookieType,
} from "@utils/requestTypes";

import type { NextApiResponse } from "next";
import { serialize } from "cookie";

const LogoutHandler = (
  req: CustomRequestCookieType<UserCookieType>,
  res: NextApiResponse<undefined | ErrorType>
) => {
  if (req.method !== "DELETE")
    return res.status(405).json({
      error: "This endpoint can only be accessed using a DELETE request!",
      code: 405,
    });

  if (req.cookies["@xiler/user_secret"] === undefined)
    return res.status(400).json({
      error: "No user_secret cookie was passed!",
      code: 400,
    });

  return res
    .status(200)
    .setHeader(
      "Set-Cookie",
      serialize("@xiler/user_secret", "", { path: "/", expires: new Date(0) })
    )
    .send(undefined);
};

export default LogoutHandler;
