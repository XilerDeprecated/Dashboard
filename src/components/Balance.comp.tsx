import { ApiEndpoints } from "@utils/config";
import { CoinsIcon } from "@xiler/icon/lib/Components";
import { UserBalanceResponseDataType } from "@src/types/user";
import { isError } from "@appTypes/requestTypes";
import { isNumber } from "@utils/typeChecking";
import { toast } from "react-toastify";
import { useAPI } from "@utils/requests";
import { useEffect } from "react";

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

  // Simply get the percentage of the balance that has been consumed. 
  const percentage =
    isNumber(dt.balance) && isNumber(dt.consumed)
      ? Math.floor((dt.consumed / dt.balance) * 10000) / 100
      : 0;

  // We need to calculate an offset because 99% would fully fill the circle.
  const perWithOffset = percentage > 1 ? percentage - 0.6 : percentage;

  // Convert the percentage to degree's which ade being used to calculate. the circle.
  const degree = (perWithOffset / 100) * 360;

  // Calculate our radians which are used for the arc.
  const radian = (Math.PI * (360 - degree)) / 180;

  return !isLoading && error !== undefined ? (
    <></>
  ) : (
    <div className="bg-dark-500 rounded p-5 text-sm grid grid-cols-fix-right grid-flow-col gap-x-5">
      <h1 className="text-2xl">Balance</h1>
      <h3 className="text-primary-600">Account Balance</h3>
      <div className="flex">
        <CoinsIcon
          className="fill-current text-transparent my-auto mr-1"
          size={{ width: 17, height: 15.3 }}
        />
        <p>{dt.balance.toLocaleString()}</p>
      </div>
      <h3 className="text-primary-600">Consumed this month</h3>
      <div className="flex">
        <CoinsIcon
          className="fill-current text-transparent my-auto mr-1"
          size={{ width: 17, height: 15.3 }}
        />
        <p>{dt.consumed.toLocaleString()}</p>
      </div>
      <div className="relative row-span-5 grid bg-dark-700 w-32 h-32 rounded-full">
        <p className="text-lg self-center text-center z-50 absolute left-1/2 transform -translate-x-1/2">
          {percentage}%
        </p>
        <svg className="w-32 h-32 transform rotate-180 rounded-full">
          <circle
            className="fill-current text-accent-500"
            cx={64 + 56 * Math.sin(radian)}
            cy={64 + 56 * Math.cos(radian)}
            r="8"
          />
          <circle
            r="47"
            cx="50%"
            cy="50%"
            className="stroke-current text-accent-500"
            style={{
              strokeDasharray: `${
                (perWithOffset / 100) * (47 * (2 * Math.PI))
              } ${(1 - perWithOffset / 100) * (47 * (2 * Math.PI))}`,
              strokeDashoffset: "-73",
              strokeWidth: "36",
            }}
          />
          <circle
            r="48"
            cx="50%"
            cy="50%"
            className="fill-current text-dark-500"
          />
        </svg>
      </div>
    </div>
  );
};
