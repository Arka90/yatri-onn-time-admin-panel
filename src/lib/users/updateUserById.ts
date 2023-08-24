import axios from "@/config/axios";
import { TUser } from "@/types/users";

const updateUserById = async (payload: any) => {
    const { data } = await axios.patch(`api/user/${payload._id}`, payload);
    return data;
};

export default updateUserById;
