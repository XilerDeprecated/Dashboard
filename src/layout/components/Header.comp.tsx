import { Permissions, getNamedPermission } from "@utils/perms";
import React, { useContext } from "react";

import Image from "next/image";
import { SignOut } from "./nav/SignOut.comp";
import { SignOutIcon } from "@xiler/icon/lib/Components";
import { UserContext } from "pages/_app";

const NavItems = [
  {
    Wrapper: SignOut,
    Icon: SignOutIcon,
  },
  // TODO: Implement BellIcon, SettingsIcon, SearchIcon
];

export const Header: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <header className="grid grid-cols-fix-right bg-dark-500 m-6 py-1 px-6 rounded">
      <div className="flex h-min my-auto">
        {NavItems.map((itm, idx) => (
          <itm.Wrapper key={idx}>
            <itm.Icon
              className="fill-current mr-3 text-primary-500 sm:text-primary-600 cursor-pointer hover:text-primary-500 transition-colors"
              size={{ width: 20, height: 20 }}
            />
          </itm.Wrapper>
        ))}
      </div>
      <div className="grid grid-cols-fix-right text-right gap-x-3 h-14 invisible sm:visible">
        <div className="my-auto">
          <h3
            className="self-end text-base font-bold truncate max-w-xxs"
            title={
              (user?.username?.length ?? 0) > 15 ? user?.username : undefined
            }
          >
            {user?.username}
          </h3>
          <h4 className="text-xs">
            {getNamedPermission(user?.permissionLevel ?? Permissions.MEMBER)}
          </h4>
        </div>
        <div className="rounded-full bg-dark-700 h-14 w-14 relative select-none">
          <Image
            className="object-cover"
            src={user?.profilePicture ?? ""}
            alt=""
            width={56}
            height={56}
          />
          <div className="rounded-full absolute bg-online w-4 h-4 bottom-px right-px border-3 border-dark-500"></div>
        </div>
      </div>
    </header>
  );
};
