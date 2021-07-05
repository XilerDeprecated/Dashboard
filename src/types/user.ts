/**
 * Represents a user response from the @me endpoint,
 */
export type UserResponseDataType = {
  /** The user their unique identifier. */
  id: string;
  /** The user their permissions. */
  permissionLevel: number;
  /** The user their username. */
  username: string;
  /** If available, the user their profile picture. */
  profilePicture?: string;
  /** The user their current status. */
  status: "online" | "idle" | "offline";
};
