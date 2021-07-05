import {
  ApplicationsIcon,
  ArrowIcon,
  DashboardIcon,
  DocumentationIcon,
  Icon,
  InboxIcon,
} from "@xiler/icon/lib/Components";
import { SidebarItem, SidebarSection } from "../index.types";

import { ImageProps } from "@xiler/icon/lib/utils/ImageType";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface SidebarProps {
  /** All the items that should get shown in the layout sidebar. */
  barItems: (SidebarItem | SidebarSection)[];
}

interface Route {
  name: string;
  ref: string;
  Icon: React.FC<ImageProps>;
}

const routes: Route[] = [
  {
    name: "Dashboard",
    ref: "/",
    Icon: DashboardIcon,
  },
  {
    name: "Documentation",
    ref: "/documentation",
    Icon: DocumentationIcon,
  },
  {
    name: "Applications",
    ref: "/applications",
    Icon: ApplicationsIcon,
  },
  {
    name: "Inbox",
    ref: "/inbox",
    Icon: InboxIcon,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ barItems }) => {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState<boolean>(false);

  return (
    <div
      className={`bg-dark-500 h-full ${
        isHidden ? "w-16" : "w-52"
      } row-span-2 transition-all grid grid-rows-fix-bottom`}
    >
      <div>
        <div className="flex justify-center align-middle py-6">
          <Icon
            className={`${
              isHidden ? "delay-100" : "mr-4"
            } fill-current text-secondary-500 transition-all`}
            size={{ width: 40, height: 40 }}
          />

          <h1
            className={`my-auto text-2xl text-secondary-500 select-none font-bold ${
              isHidden ? "invisible absolute" : ""
            }`}
          >
            Xiler
          </h1>
        </div>
        <nav
          className={`flex flex-col ${
            isHidden ? "w-min" : "w-11/12"
          } mx-auto transition-all`}
        >
          {routes.map((route, idx) => {
            const isActive = route.ref === router.route;
            const bgColor = isActive ? "bg-dark-700" : "";
            const fgColor = isActive ? "text-primary-500" : "text-primary-600";

            return (
              <Link key={idx} href={route.ref}>
                <a
                  className={`${fgColor} my-auto hover:text-primary-500 transition-colors flex align-middle ${bgColor} p-2 rounded group cursor-pointer`}
                >
                  <route.Icon
                    className={`fill-current ${fgColor} ${
                      isHidden ? "" : "mr-1.5"
                    } my-auto group-hover:text-primary-500 transition-all`}
                    size={{ width: 20, height: 20 }}
                  />
                  <span className={isHidden ? "invisible absolute" : "delay-100"}>
                    {route.name}
                  </span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
      <div
        onClick={() => setIsHidden(!isHidden)}
        className="p-1.5 group mb-3 ml-3 cursor-pointer w-min"
      >
        <ArrowIcon
          className={`fill-current text-primary-600 group-hover:text-primary-500 ${
            isHidden ? "transform rotate-180" : ""
          } transition-all`}
          size={{ width: 21, height: 13.5 }}
        />
      </div>
    </div>
  );
};
