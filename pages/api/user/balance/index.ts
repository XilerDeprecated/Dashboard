import type {
  CustomRequestCookieType,
  ErrorType,
  UserCookieType,
} from "@appTypes/requests";

import type { NextApiResponse } from "next";
import { UserBalanceResponseDataType } from "@appTypes/user";
import { accessToken } from "pages/api/login";

const CurrentUserHandler = (
  req: CustomRequestCookieType<UserCookieType>,
  res: NextApiResponse<UserBalanceResponseDataType | ErrorType>
) => {
  if (req.method !== "GET")
    return res.status(405).json({
      error: "This endpoint can only be accessed using a GET request!",
      code: 405,
    });

  if (req.cookies["@xiler/user_secret"] === undefined)
    return res.status(400).json({
      error: "No user_secret cookie was passed!",
      code: 400,
    });

  if (req.cookies["@xiler/user_secret"] === accessToken)
    return res.status(200).json({
      balance: 81_491,
      consumed: 47_986,
    });

  return res.status(401).json({
    error: "The user_secret cookie was invalid!",
    code: 401,
  });
};

export default CurrentUserHandler;
