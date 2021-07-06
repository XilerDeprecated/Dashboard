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
import { logout } from "@utils/requests";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  const btnStyle =
    "fill-current mr-3 text-primary-600 cursor-pointer hover:text-primary-500 transition-colors";

  return (
    <header className="grid grid-cols-fix-right bg-dark-500 m-6 py-1 px-6 rounded">
      <div className="flex h-min my-auto">
        <div>
          <BellIcon className={btnStyle} size={{ width: 20, height: 20 }} />
        </div>
        <div>
          <SettingsIcon className={btnStyle} size={{ width: 20, height: 20 }} />
        </div>
        <div
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <SignOutIcon className={btnStyle} size={{ width: 20, height: 20 }} />
        </div>
        <div>
          <SearchIcon className={btnStyle} size={{ width: 20, height: 20 }} />
        </div>
      </div>
      <div className="grid grid-cols-fix-right text-right gap-x-3 h-14">
        <div className="my-auto">
          <h3 className="self-end text-base font-bold">{user?.username}</h3>
          <h4 className="text-xs">
            {getNamedPermission(user?.permissionLevel ?? Permissions.MEMBER)}
          </h4>
        </div>
        <div className="rounded-full bg-dark-700 h-14">
          <Image
            src={user?.profilePicture ?? ""}
            alt=""
            width={56}
            height={56}
          />
        </div>
      </div>
    </header>
  );
};
