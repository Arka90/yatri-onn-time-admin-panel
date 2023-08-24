import authenticateAdmin from "@/lib/auth/authenticateAdmin";
import getAdminToken from "@/lib/utils/getAdminToken";
import useStore, { initialState } from "@/store";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";

type AppWrapperProps = {
  children: ReactNode;
};

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const store = useStore();
  const router = useRouter();

  async function runAuthentication(token: string) {
    store.actions.startLoading();
    try {
      const admin = await authenticateAdmin(token);
      console.log("hhhhhh");
      if (!admin) {
        store.actions.setAdmin(
          initialState.auth.authState,
          initialState.auth.admin
        );
      } else {
        store.actions.setAdmin("LOGGED_IN", admin);
      }
    } catch (error) {
      store.actions.resetAdmin();
      router.push("/");
    } finally {
      store.actions.stopLoading();
    }
  }

  useEffect(() => {
    if (store.auth.authState === "IDLE") {
      const adminToken = getAdminToken();
      if (adminToken) runAuthentication(adminToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.auth.admin.email]);

  return <>{children}</>;
};

export default AppWrapper;
