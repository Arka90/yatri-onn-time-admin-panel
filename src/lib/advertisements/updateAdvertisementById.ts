import axios from "@/config/axios";

const updateAdvertisementById = async (payload: any) => {
    const { data } = await axios.patch(
        `api/advertisement/${payload._id}`,
        payload
    );
    return data;
};

export default updateAdvertisementById;
