import React, { useEffect } from "react";

import { ApiEndpoints } from "@utils/config";
import { Graph } from "./Graph.comp";
import { UserActivityDataType } from "@appTypes/user";
import { isError } from "@appTypes/requests";
import { toast } from "react-toastify";
import { useAPI } from "@utils/requests";

export const Activity: React.FC = () => {
  const { data, isLoading, error } = useAPI<UserActivityDataType>(
    ApiEndpoints.activity
  );

  useEffect(() => {
    if (!isLoading && error !== undefined) {
      toast.error(
        `An error occurred while trying to fetch your activity. Please try again later. ${
          isError(error) ? `(${error.error})` : ""
        }`
      );
    }
  }, [data, isLoading, error]);

  if (isLoading || data === undefined || isError(data)) return <></>;

  const today_subs: string[] = [];

  // Make a list of all the hours that have passed.
  for (let i = 0; i < data.today.length; i++)
    today_subs.push(`${("0" + i).slice(-2)}:00`);

  return (
    <div className="row-span-2">
      <div className="grid gap-5 p-5 text-sm rounded bg-dark-500">
        <h1 className="text-2xl select-none">Activity</h1>
        <Graph title="Today" data={data.today} subs={today_subs} showSubs />
        {/* TODO: Implement month stubs */}
        <Graph title="Month" data={data.month} />
      </div>
    </div>
  );
};
