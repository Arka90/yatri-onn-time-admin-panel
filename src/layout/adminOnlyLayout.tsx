import useStore from "@/store";
import { chownSync } from "fs";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";

type AdminOnlyLayoutProps = {
    children: ReactNode;
};

const AdminOnlyLayout: FC<AdminOnlyLayoutProps> = ({ children }) => {
    const router = useRouter();
    const store = useStore();
    // useEffect(() => {
    //     console.log(store.auth.admin.isAdmin);
    //     if (!store.auth.admin.isAdmin && !store.api.isLoading) {
    //         router.push("/");
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [store.auth.admin.isAdmin, store.api.isLoading]);
    // if (store.auth.admin.isAdmin) {
    //     return <>{children}</>;
    // }

    function pushToLoginPage() {
        router.push("/");
    }

    if (store.api.isLoading) return <>Loading</>;

    if (!store.api.isLoading && !store.auth.admin?.userId)
        return (
            <div className="min-h-screen w-full grid place-items-center">
                <div className="space-y-4">
                    <h2>You are not authorized to access this route</h2>
                    <button
                        className="btn bg-slate-800 text-white"
                        onClick={pushToLoginPage}
                    >
                        Login
                    </button>
                </div>
            </div>
        );

    if (!store.auth?.admin?.isAdmin) return <>Access Denied</>;

    return <>{children}</>;
};

export default AdminOnlyLayout;
