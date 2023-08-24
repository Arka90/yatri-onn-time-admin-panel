import { sidebarItems } from "@/data/sidebar";
import Link from "next/link";
import type { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type SidebarProps = {};

const Sidebar: FC<SidebarProps> = () => {
    const { pathname } = useRouter();
    return (
        <div className="w-[16rem] py-4 border-r border-slate-200 h-screen">
            {/* image */}
            <div className="flex items-center justify-center">
                <Image
                    src={`/images/logo.png`}
                    alt="logo"
                    width={256}
                    height={256}
                    className="w-24 h-24 object-contain object-center"
                />
            </div>
            {/* links */}
            <ul className="mt-4 px-2">
                {sidebarItems.map((item, index) => {
                    const isActive = pathname.includes(item.href);
                    return (
                        <li key={item.title + index.toString()}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-2 font-medium p-4 rounded-md ${
                                    isActive
                                        ? `text-sky-500 bg-sky-500/10`
                                        : `text-slate-500 bg-transparent hover:bg-slate-100`
                                }`}
                            >
                                <item.icon className="w-6 h-6" />
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
