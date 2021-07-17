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
          "OAuth": 18_684,
          "Image Generation": 15_456,
          "Application Name 1": 6_684,
          "Application Name 2": 2_760,
          "Application Name 3": 2_510,
          "Application Name 4": 712,
          "Application Name 5": 180,
      });
  
    return res.status(401).json({
      error: "The user_secret cookie was invalid!",
      code: 401,
    });
  };
  
  export default CurrentUserHandler;
  