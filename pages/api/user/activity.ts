import type {
  CustomRequestCookieType,
  ErrorType,
  UserCookieType,
} from "@appTypes/requests";

import type { NextApiResponse } from "next";
import { UserActivityDataType } from "@appTypes/user";
import { accessToken } from "pages/api/login";

const CurrentUserHandler = (
  req: CustomRequestCookieType<UserCookieType>,
  res: NextApiResponse<UserActivityDataType | ErrorType>
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
      today: [
        540, 110, 80, 60, 84, 160, 200, 370, 350, 490, 600, 510, 780, 890,
        1_200, 1_100, 1_600, 1_800, 2_700, 3_100, 5_000, 10_000, 9_000, 3_000,
      ],
      month: [
        9605, 3062, 1671, 3140, 3026, 3557, 4545, 4187, 2168, 1270, 8181, 1621,
        2119, 9049, 2179, 7652, 8564, 3715, 3321, 4904, 3742, 8383, 9251, 1390,
        1094, 7575, 1762, 8363, 9092, 9610,
      ],
    });

  return res.status(401).json({
    error: "The user_secret cookie was invalid!",
    code: 401,
  });
};

export default CurrentUserHandler;
