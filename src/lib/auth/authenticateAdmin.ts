import axios from "@/config/axios";
import { TState } from "@/types/store";

const authenticateAdmin = async (
    token: string
): Promise<TState["auth"]["admin"] | null> => {
    const { data } = await axios.get("/api/admin/show-admin", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const adminPayload: TState["auth"]["admin"] = {
        email: data.email,
        isAdmin: data.isAdmin,
        userId: data.userId,
    };
    return adminPayload;
};

export default authenticateAdmin;
