import axios from "@/config/axios";
import { TUser } from "@/types/users";

const updateRemindersById = async (payload: any) => {
    const { data } = await axios.patch(`api/reminder/${payload._id}`, payload);
    return data;
};

export default updateRemindersById;
