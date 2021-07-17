import type {
  CustomRequestCookieType,
  ErrorType,
  UserCookieType,
} from "@appTypes/requests";

import { MostUsedAppsDataType } from "@appTypes/apps";
import type { NextApiResponse } from "next";
import { accessToken } from "pages/api/login";

const CurrentUserHandler = (
  req: CustomRequestCookieType<UserCookieType>,
  res: NextApiResponse<MostUsedAppsDataType | ErrorType>
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
      "Discord Bot Image Generator": 1_205_751,
      "SEO Image Generator": 802_456,
      "Discord Bot Anti Robot Image Generator": 375_456,
      "Site Xiler OAuth": 58_684,
      "Receipt image generation": 70_684,
      "Site Support": 18_523,
      "Application Name 7": 6_684,
      "Application Name 8": 3_242,
      "Application Name 9": 2_510,
      "Application Name 10": 712,
      "Application Name 11": 573,
      "Application Name 12": 180,
    });

  return res.status(401).json({
    error: "The user_secret cookie was invalid!",
    code: 401,
  });
};

export default CurrentUserHandler;
