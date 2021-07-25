import { Graph } from "./Graph.comp";
import React from "react";

// TODO: Fetch from API

const data = {
  today: [
    540, 110, 80, 60, 84, 160, 200, 370, 350, 490, 600, 510, 780, 890, 1_200,
    1_100, 1_600, 1_800, 2_700, 3_100, 5_000, 10_000, 9_000, 3_000,
  ],
  month: [
    9605, 3062, 1671, 3140, 3026, 3557, 4545, 4187, 2168, 1270, 8181, 1621,
    2119, 9049, 2179, 7652, 8564, 3715, 3321, 4904, 3742, 8383, 9251, 1390,
    1094, 7575, 1762, 8363, 9092, 9610,
  ],
};

export const Activity: React.FC = () => {
  const today_subs: string[] = [];

  // Make a list of all the hours that have passed.
  for (let i = 0; i < data.today.length; i++)
    today_subs.push(`${("0" + i).slice(-2)}:00`);

  return (
    <div className="row-span-2">
      <div className="grid gap-5 p-5 text-sm rounded bg-dark-500">
        <h1 className="text-2xl">Activity</h1>
        <Graph title="Today" data={data.today} subs={today_subs} showSubs />
        <Graph title="Month" data={data.month} />
      </div>
    </div>
  );
};
