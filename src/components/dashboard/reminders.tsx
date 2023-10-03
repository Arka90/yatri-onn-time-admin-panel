import { Transactions } from "@/data/dashboard";
import getRandomArbitrary from "@/lib/utils/getRandomArbitart";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import type { ComponentProps, FC } from "react";

type RemindersProps = ComponentProps<"div"> & {};

const Reminders: FC<RemindersProps> = () => {
  const growth = getRandomArbitrary(12, 80);
  return (
    <div className="border border-slate-200 rounded-md p-4 col-span-2">
      {/* heading */}
      <div className="space-y-4">
        <h3 className="text-2xl font-medium">Trasactions</h3>
        <p className="font-medium flex items-center gap-x-4">
          Total {growth}% Growth{" "}
          <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-500" />
          <span className="px-2 p-0.5 bg-slate-300/20 text-slate-700 flex items-center gap-2 font-semibold capitalize text-sm rounded-full">
            This month{" "}
          </span>
        </p>
      </div>
      {/* charts */}
      <div className="flex items-center justify-between pr-8 mt-6">
        {Transactions.map((transaction) => {
          return (
            <div key={transaction.title} className="flex gap-x-2">
              {/* icon */}
              <div className="p-2 rounded-md bg-pink-600 w-fit h-fit">
                <transaction.Icon className="w-7 h-7 text-white" />
              </div>
              {/* info */}
              <div className="">
                {/* title */}
                <p className="text-sm font-medium text-slate-500">
                  {transaction.title}
                </p>
                {/* growth */}
                <h4 className="font-semibold text-xl">{20}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reminders;
