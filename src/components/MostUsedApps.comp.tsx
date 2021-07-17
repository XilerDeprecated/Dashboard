import { ApiEndpoints } from "@utils/config";
import { MostUsedAppsDataType } from "@appTypes/apps";
import { isError } from "@appTypes/requests";
import { toast } from "react-toastify";
import { useAPI } from "@utils/requests";
import { useEffect } from "react";

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
    .sort((a, b) => (apps[a] > apps[b] ? -1 : apps[a] < apps[b] ? 1 : 0))
    .slice(0, 5); // Take the first 5.

  return appsSorted.length === 0 ? (
    <></>
  ) : (
    <div className="grid gap-5 p-5 text-sm rounded bg-dark-500">
      <h1 className="text-2xl">Most Used Apps</h1>
      {appsSorted.map((app, idx) => (
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
    </div>
  );
};
