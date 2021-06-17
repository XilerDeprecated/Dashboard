import type {
  CustomRequestCookieType,
  ErrorType,
  UserCookieType,
} from "@utils/requestTypes";

import type { NextApiResponse } from "next";
import { Permissions } from "@utils/perms";
import { accessToken } from "../login";

type UserResponseDataType = {
  id: string;
  permissionLevel: number;
  username: string;
  profilePicture?: string;
  status: "online" | "idle" | "offline";
};

const CurrentUserHandler = (
  req: CustomRequestCookieType<UserCookieType>,
  res: NextApiResponse<UserResponseDataType | ErrorType>
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
      id: "74127192-562a-4170-b3fe-58e4e3c9dd2e",
      permissionLevel: Permissions.MANAGEMENT,
      username: "Arthurdw",
      profilePicture: "https://avatars.githubusercontent.com/u/38541241?v=4",
      status: "online",
    });
  return res.status(401).json({
    error: "The user_secret cookie was invalid!",
    code: 401,
  });
};

export default CurrentUserHandler;
