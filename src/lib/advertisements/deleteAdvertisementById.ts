import axios from "@/config/axios";

const deleteAdvertisementById = async (id: string) => {
    await axios.delete(`api/advertisement/${id}`);
};

export default deleteAdvertisementById;
