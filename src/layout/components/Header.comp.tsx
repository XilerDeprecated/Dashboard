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
    <header className="grid px-6 py-1 m-6 rounded grid-cols-fix-right bg-dark-500">
      <div className="flex my-auto h-min">
        {NavItems.map((itm, idx) => (
          <itm.Wrapper key={idx}>
            <itm.Icon
              className="mr-3 transition-colors cursor-pointer fill-current text-primary-500 sm:text-primary-600 hover:text-primary-500"
              size={{ width: 20, height: 20 }}
            />
          </itm.Wrapper>
        ))}
      </div>
      <div className="grid invisible text-right grid-cols-fix-right gap-x-3 h-14 sm:visible">
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
        <div className="relative rounded-full select-none bg-dark-700 h-14 w-14">
          <Image
            className="object-cover"
            src={user?.profilePicture ?? ""}
            alt=""
            width={56}
            height={56}
          />
          <div className="absolute w-4 h-4 rounded-full bg-online bottom-px right-px border-3 border-dark-500"></div>
        </div>
      </div>
    </header>
  );
};
