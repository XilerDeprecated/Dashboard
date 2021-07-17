import {
  ApplicationsIcon,
  ArrowIcon,
  DashboardIcon,
  DocumentationIcon,
  Icon,
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
    ref: "/docs",
    Icon: DocumentationIcon,
  },
  {
    name: "Applications",
    ref: "/apps",
    Icon: ApplicationsIcon,
  },
  // {
  //   name: "Inbox",
  //   ref: "/inbox",
  //   Icon: InboxIcon,
  // },
];

export const Sidebar: React.FC<SidebarProps> = ({ barItems }) => {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState<boolean>(window.innerWidth < 1152);

  return (
    <div
      className={`bg-dark-500 h-full ${
        isHidden ? "w-16" : "w-52"
      } row-span-2 transition-all grid grid-rows-fix-bottom`}
    >
      <div>
        <div className="flex justify-center py-6 align-middle">
          <Icon
            className={`${
              isHidden ? "mr-0" : "sm:mr-4 delay-100"
            } fill-current text-secondary-500 transition-all`}
            size={{ width: 40, height: 40 }}
          />

          <h1
            className={`my-auto text-2xl text-secondary-500 select-none font-bold invisible ${
              isHidden ? "invisible absolute" : "delay-100 sm:visible"
            }`}
          >
            Xiler
          </h1>
        </div>
        <nav
          className={`flex flex-col ${
            isHidden ? "w-min" : "w-11/12"
          } mx-auto transition-all min-w-max`}
        >
          {routes.map((route, idx) => {
            const isActive = route.ref === router.route;
            const bgColor = isActive ? "bg-dark-700" : "";
            const fgColor = isActive ? "text-primary-500" : "text-primary-600";

            return (
              <Link key={idx} href={route.ref}>
                <a
                  className={`text-primary-500 sm:${fgColor} my-auto hover:text-primary-500 transition-all flex ${bgColor} p-2 rounded group cursor-pointer ${
                    isActive ? "" : "delay-100"
                  }`}
                >
                  <route.Icon
                    className={`fill-current text-primary-500 sm:${fgColor} ${
                      isHidden ? "" : "mr-1.5"
                    } group-hover:text-primary-500 transition-all m-1`}
                    size={{ width: 20, height: 20 }}
                  />
                  <span
                    className={`${
                      isHidden
                        ? "invisible absolute opacity-0"
                        : "delay-100 opacity-100"
                    } transition-all`}
                  >
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
        className="p-1.5 group mb-3 ml-3 cursor-pointer w-min invisible sm:visible"
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
