import type { ComponentProps, FC } from "react";
import Sidebar from "@/components/basicLayout/sidebar";
import Navbar from "@/components/basicLayout/navbar";
import { useRouter } from "next/router";
import clsx from "clsx";
import AdminOnlyLayout from "./adminOnlyLayout";
// import AdminOnlyLayout from "./adminOnlyLayout";

type BasicLayoutProps = ComponentProps<"main">;

const BasicLayout: FC<BasicLayoutProps> = ({
    children,
    className,
    ...props
}) => {
    const { pathname } = useRouter();
    const path = pathname.split("/")[1];
    return (
        <AdminOnlyLayout>
            <main className={clsx("flex text-slate-800", className)} {...props}>
                <Sidebar />
                {/* outlet */}
                <div className="flex-auto overflow-auto ">
                    <Navbar title={path} />
                    <div className="p-4">{children}</div>
                </div>
            </main>
        </AdminOnlyLayout>
    );
};

export default BasicLayout;
