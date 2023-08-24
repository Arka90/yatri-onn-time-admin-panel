import type { ComponentProps, FC } from "react";
import {
    NewspaperIcon,
    UsersIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    CreditCardIcon,
    ClockIcon,
    UserCircleIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

interface ISidebarItem {
    icon: FC<ComponentProps<"svg">>;
    title: string;
    href: string;
}

export const sidebarItems: Array<ISidebarItem> = [
    {
        icon: ChartBarIcon,
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: UsersIcon,
        title: "Users",
        href: "/users",
    },
    {
        icon: CreditCardIcon,
        title: "Subcriptions",
        href: "/subcriptions",
    },
    {
        icon: NewspaperIcon,
        title: "Advertisement",
        href: "/advertisement",
    },
    {
        icon: CurrencyDollarIcon,
        title: "Transactions",
        href: "/transactions",
    },
    {
        icon: ClockIcon,
        title: "Reminders",
        href: "/reminders",
    },
    {
        icon: UserCircleIcon,
        title: "Contact",
        href: "/contact",
    },
    {
        icon: QuestionMarkCircleIcon,
        title: "FAQ",
        href: "/faq",
    },
];
