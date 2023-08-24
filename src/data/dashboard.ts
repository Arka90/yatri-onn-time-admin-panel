import { CalendarIcon, UserIcon, RssIcon } from "@heroicons/react/24/solid";
import { ComponentProps, FC } from "react";

interface IDataItems {
    title: string;
    Icon: FC<ComponentProps<"svg">>;
    lr: number;
    ur: number;
}

export const Transactions: IDataItems[] = [
    {
        title: "Active Users",
        Icon: UserIcon,
        lr: 20,
        ur: 70,
    },
    {
        title: "Reminders",
        Icon: CalendarIcon,
        lr: 100,
        ur: 700,
    },
    {
        title: "Subcriptions",
        Icon: RssIcon,
        lr: 700,
        ur: 900,
    },
];
