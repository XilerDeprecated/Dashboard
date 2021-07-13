import { Activity } from "@components/Activity.comp";
import { Balance } from "@components/Balance.comp";
import { MostUsedApps } from "@components/MostUsedApps.comp";
import React from "react";

export const Main: React.FC = () => {
  return (
    <div className="grid grid-cols-2 grid-flow-col gap-6">
      <Balance />
      <MostUsedApps />
      <Activity />
    </div>
  );
};
export default Main;
