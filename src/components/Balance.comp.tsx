import { ApiEndpoints } from "@utils/config";
import { CoinsIcon } from "@xiler/icon/lib/Components";
import { UserBalanceResponseDataType } from "@src/types/user";
import { isError } from "@appTypes/requestTypes";
import { toast } from "react-toastify";
import { useAPI } from "@utils/requests";
import { useEffect } from "react";

const getNumberOrZero = (x: any): number => (Number.isInteger(x) ? x : 0);

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

  // TODO: Document this
  const dt =
    data === undefined
      ? { balance: "Loading...", consumed: "Loading..." }
      : (data as UserBalanceResponseDataType);

  // TODO: Document this
  const percentage =
    Math.round(
      (getNumberOrZero(dt.consumed) / getNumberOrZero(dt.balance)) * 10000
    ) / 100;

  // TODO: Document this
  const degree = (percentage / 100) * 360;
  const circle = (Math.PI * 2 * (360 - degree)) / 360;

  return !isLoading && error !== undefined ? (
    <></>
  ) : (
    <div className="bg-dark-500 rounded p-5 text-sm grid grid-cols-2 grid-flow-col">
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
        <svg className="fill-current text-accent-500 w-32 h-32 transform rotate-180 rounded-full">
          <circle
            cx={64 + 56 * Math.sin(circle)}
            cy={64 + 56 * Math.cos(circle)}
            r="8"
          />
          {/* TODO: Implement the pie chart.*/}
          {/* <path fill="blue" d={`M64,64 L64,0 A64,64 1 0 1 121.21,121.21 z`} /> */}
        </svg>
        <div className="bg-dark-500 h-24 w-24 rounded-full self-center absolute left-1/2 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
};
