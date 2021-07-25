import { Activity } from "@components/Activity.comp";
import { Balance } from "@components/Balance.comp";
import { MostUsedApps } from "@components/MostUsedApps.comp";
import React from "react";

export const Main: React.FC = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-fix-left lg:grid-rows-fix-top lg:grid-flow-col">
      <Balance />
      <MostUsedApps />
      <Activity />
    </div>
  );
};
export default Main;
