/**
 * A bitwise representation of all user permissions.
 */
export enum Permissions {
  /** Represents a banned member, this is the lowest level. */
  BANNED = 0x00,

  /** Represents a member, this is the standard permission level. */
  MEMBER = 0x02,

  /** Represents a member of our support team, which should allow them to perfom more actions. */
  SUPPORT = MEMBER | 0x32,

  /** Represents a member of our moderation team, which should allow them to perform most actions. */
  MODERATOR = SUPPORT | 0x64,

  /** Represents a member of our administration team, which should allow then to perform almost all actions. */
  ADMIN = MODERATOR | 0x128,

  /** Represents a member of our management team, which should allow them to perform every action. */
  MANAGEMENT = ADMIN | 0x256,
}
