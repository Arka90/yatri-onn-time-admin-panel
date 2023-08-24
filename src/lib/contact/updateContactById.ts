import axios from "@/config/axios";

const updateContactById = async (payload: any) => {
    const { data } = await axios.patch(`api/contact/${payload._id}`, payload);
    return data;
};

export default updateContactById;
