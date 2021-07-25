/**
 * Represents a user response from the `GET me` endpoint,
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

/**
 * Represents a response from the `GET balance` endpoint.
 */
export type UserBalanceResponseDataType = {
  /** The user their balance. */
  balance: number;
  /** How much they have used of their balance this month. */
  consumed: number;
};

/** Represents a response from the `GET activity` endpoint. */
export type UserActivityDataType = {
  /** A collection of numbers which represent the amount of requests that have been sent in the past 24 hrs. */
  today: number[];
  /** A collection of numbers which represent the amount of requests that have been sent in the past month. */
  month: number[];
};
