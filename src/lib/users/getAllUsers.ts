import axios from "@/config/axios";
import { TUser } from "@/types/users";

const getAllUsers = async (): Promise<TUser[]> => {
    const { data } = await axios.get("api/user");

    return data as TUser[];
};

export default getAllUsers;
