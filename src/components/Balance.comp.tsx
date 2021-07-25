import React, { useEffect } from "react";

import { ApiEndpoints } from "@utils/config";
import { CoinsIcon } from "@xiler/icon/lib/Components";
import { DoughnutChart } from "@components/DoughnutChart.comp";
import { UserBalanceResponseDataType } from "@src/types/user";
import { isError } from "@appTypes/requests";
import { isNumber } from "@utils/typeChecking";
import { toast } from "react-toastify";
import { useAPI } from "@utils/requests";

export const Balance: React.FC = () => {
  const { data, isLoading, error } = useAPI<UserBalanceResponseDataType>(
    ApiEndpoints.balance
  );

  useEffect(() => {
    if (!isLoading && error !== undefined) {
      toast.error(
        `An error occurred while trying to fetch your balance. Please try again later. ${
          isError(error) ? `(${error.error})` : ""
        }`
      );
    }
  }, [data, isLoading, error]);

  // When the data is being fetched or is nonexistent, we want to display loading.
  const dt =
    isLoading || data === undefined
      ? { balance: "Loading...", consumed: "Loading..." }
      : (data as UserBalanceResponseDataType);

  const returnIfNumElseZero = (x: any) => (isNumber(x) ? x : 0);

  return !isLoading && error !== undefined ? (
    <></>
  ) : (
    <div className="grid grid-flow-col p-5 text-sm rounded bg-dark-500 grid-cols-fix-right gap-x-5">
      <h1 className="text-2xl select-none">Balance</h1>
      <h3 className="text-primary-600">Account Balance</h3>
      <div className="flex">
        <CoinsIcon
          className="my-auto mr-1 text-transparent fill-current"
          size={{ width: 17, height: 15.3 }}
        />
        <p>{dt.balance.toLocaleString()}</p>
      </div>
      <h3 className="text-primary-600">Consumed this month</h3>
      <div className="flex">
        <CoinsIcon
          className="my-auto mr-1 text-transparent fill-current"
          size={{ width: 17, height: 15.3 }}
        />
        <p>{dt.consumed.toLocaleString()}</p>
      </div>
      <DoughnutChart
        used={returnIfNumElseZero(dt.consumed)}
        total={returnIfNumElseZero(dt.balance)}
      />
    </div>
  );
};
