import {
  BellIcon,
  SearchIcon,
  SettingsIcon,
  SignOutIcon,
} from "@xiler/icon/lib/Components";
import { Permissions, getNamedPermission } from "@utils/perms";
import React, { useContext } from "react";

import Image from "next/image";
import { UserContext } from "pages/_app";

export const Header: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <header className="grid grid-cols-fix-right bg-dark-500 m-6 py-1 px-6 rounded">
      <div className="flex h-min my-auto">
        <div>
          <BellIcon
            className="fill-current mr-3 text-primary-500"
            size={{ width: 20, height: 20 }}
          />
        </div>
        <div>
          <SettingsIcon
            className="fill-current mr-3 text-primary-500"
            size={{ width: 20, height: 20 }}
          />
        </div>
        <div>
          <SignOutIcon
            className="fill-current mr-3 text-primary-500"
            size={{ width: 20, height: 20 }}
          />
        </div>
        <div>
          <SearchIcon
            className="fill-current text-primary-500"
            size={{ width: 20, height: 20 }}
          />
        </div>
      </div>
      <div className="grid grid-cols-fix-right text-right gap-x-3">
        <h3 className="self-end text-base font-bold">{user?.username}</h3>
        <div className="row-span-2">
          <Image
            src={user?.profilePicture ?? ""}
            alt=""
            width={60}
            height={60}
          />
        </div>
        <h4 className="text-xs">
          {getNamedPermission(user?.permissionLevel ?? Permissions.MEMBER)}
        </h4>
      </div>
    </header>
  );
};
