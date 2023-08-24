import axios from "@/config/axios";
import { TUser } from "@/types/users";

const updateFaqsById = async (payload: any) => {
    const { data } = await axios.patch(`api/faq/${payload._id}`, payload);
    return data;
};

export default updateFaqsById;
