import React, { useEffect, useState } from "react";

import { Activity } from "@components/Activity.comp";
import { Balance } from "@components/Balance.comp";
import { MostUsedApps } from "@components/MostUsedApps.comp";

export const Main: React.FC = () => {
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => setShowActivity(true), []);
  
  return (
    <div className="grid gap-6 lg:grid-cols-fix-left lg:grid-rows-fix-top lg:grid-flow-col">
      <Balance />
      <MostUsedApps />
      {showActivity && <Activity />}
    </div>
  );
};
export default Main;
