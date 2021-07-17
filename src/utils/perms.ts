/**
 * A bitwise representation of all user permissions.
 */
export enum Permissions {
  /** Represents a banned member, this is the lowest level. */
  BANNED = 0x00,

  /** Represents a member, this is the standard permission level. */
  MEMBER = 0x02,

  /** Represents a member of our support team, which should allow them to perform more actions. */
  SUPPORT = MEMBER | 0x32,

  /** Represents a member of our moderation team, which should allow them to perform most actions. */
  MODERATOR = SUPPORT | 0x64,

  /** Represents a member of our administration team, which should allow then to perform almost all actions. */
  ADMIN = MODERATOR | 0x128,

  /** Represents a member of our management team, which should allow them to perform every action. */
  MANAGEMENT = ADMIN | 0x256,
}

/**
 * Easily check if a user has a certain permission.
 *
 * @param user The user that should be checked.
 * @param permission The permission which the user must have.
 * @returns Whether the user has that permission or not.
 */
export const hasPermission = (
  user: { permissionLevel: number },
  permission: number
): boolean => (user.permissionLevel & permission) === permission;

/**
 * Get the named permission from a permission level.
 *
 * @param perm The permission to get the name from.
 * @returns The name of the permission.
 */
export const getNamedPermission = (perm: number) => {
  const hsPerm = (lvl: number) => hasPermission({ permissionLevel: perm }, lvl);

  if (hsPerm(Permissions.MANAGEMENT)) return "Management";
  else if (hsPerm(Permissions.ADMIN)) return "Admin";
  else if (hsPerm(Permissions.MODERATOR)) return "Moderator";
  else if (hsPerm(Permissions.SUPPORT)) return "Support";
  else if (hsPerm(Permissions.MEMBER)) return "Member";
  else if (hsPerm(Permissions.BANNED)) return "Banned";

  throw new Error(
    `Permission name with value ${perm} could not get extracted.`
  );
};
