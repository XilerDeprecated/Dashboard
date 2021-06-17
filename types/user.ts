export type UserResponseDataType = {
  id: string;
  permissionLevel: number;
  username: string;
  profilePicture?: string;
  status: "online" | "idle" | "offline";
};
