import { useEffect, useState } from "react";

import { ApiEndpoints } from "@utils/config";
import { MostUsedAppsDataType } from "@appTypes/apps";
import { isError } from "@appTypes/requests";
import { toast } from "react-toastify";
import { useAPI } from "@utils/requests";

/**
 * The props for the most used apps component.
 */
type ComponentProps = {
  /** All of the apps and their usage. */
  apps: MostUsedAppsDataType;
  /** The sorted list of the apps. */
  appsSorted: string[];
  /** The total amount of requests. */
  total: number;
};

const Component: React.FC<ComponentProps> = ({ apps, appsSorted, total }) => {
  const [showAmount, setShowAmount] = useState<number>(5);

  return (
    <div className="grid gap-5 p-5 text-sm rounded bg-dark-500">
      <h1 className="text-2xl select-none">Most Used Apps</h1>
      {appsSorted.slice(0, showAmount).map((app, idx) => (
        <div
          key={idx}
          className="grid grid-flow-row text-sm text-primary-600 grid-cols-fix-right"
        >
          <p className="truncate">{app}</p>
          <p className="pl-2">{apps[app].toLocaleString()}</p>
          <div className="relative col-span-2 pt-2 pb-1 overflow-hidden rounded-full bg-dark-700">
            <div
              className="absolute top-0 col-span-2 pt-2 pb-1 rounded-full bg-secondary-500 -left-1/4"
              style={{ width: `${(apps[app] / total) * 100 + 25}%` }}
            ></div>
          </div>
        </div>
      ))}
      <div className="grid grid-flow-col">
        {showAmount < appsSorted.length && (
          <button onClick={() => setShowAmount((c) => c + 5)}>Show More</button>
        )}
        {showAmount > 5 && (
          <button
            onClick={() => setShowAmount((c) => (c % 5 === 0 ? c - 5 : c % 5))}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export const MostUsedApps: React.FC = () => {
  const { data, isLoading, error } = useAPI<MostUsedAppsDataType>(
    ApiEndpoints.apps.usage
  );

  useEffect(() => {
    if (!isLoading && error !== undefined) {
      toast.error(
        `An error occurred while trying to fetch your most used apps. Please try again later. ${
          isError(error) ? `(${error.error})` : ""
        }`
      );
    }
  }, [data, isLoading, error]);

  // Convert to object
  const apps: MostUsedAppsDataType = (data as MostUsedAppsDataType) ?? {};
  const total = Object.values(apps).reduce((a, b) => a + b, 0);
  const appsSorted = Object.keys(apps)
    .sort() // Sort by name, so that when apps have the same usage they are alphabetically sorted.
    .sort((a, b) => (apps[a] > apps[b] ? -1 : apps[a] < apps[b] ? 1 : 0));

  return appsSorted.length === 0 ? (
    <></>
  ) : (
    <div>
      <Component apps={apps} total={total} appsSorted={appsSorted} />
    </div>
  );
};
