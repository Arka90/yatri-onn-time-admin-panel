import type { FC } from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import useStore from "@/store";
import unsetAdminToken from "@/lib/utils/unsetAdminToken";
import { useRouter } from "next/router";

type NavbarProps = {
    title?: string;
};

const Navbar: FC<NavbarProps> = ({ title }) => {
    const route = useRouter();
    const store = useStore();

    function logout() {
        unsetAdminToken();
        store.actions.resetAdmin();
        route.push("/");
    }

    return (
        <nav className="min-h-[4rem] border-b border-slate-200 flex items-center justify-between p-4">
            {/* title */}
            {title && (
                <h1 className="text-2xl font-extrabold capitalize">{title}</h1>
            )}
            {/* links */}
            <div className="flex items-center gap-x-4">
                {/* notification */}
                <div className="">
                    <BellIcon className="h-7 w-7" aria-hidden="true" />
                </div>
                {/* user profile */}
                <div className="">
                    <UserCircleIcon className="w-7 h-7" aria-hidden="true" />
                </div>
                {/* logout */}
                <button
                    onClick={logout}
                    type="button"
                    className="px-4 outline-none py-1 rounded-md bg-slate-800 text-white font-medium"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
