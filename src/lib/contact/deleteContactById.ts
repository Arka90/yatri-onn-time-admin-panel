import axios from "@/config/axios";

const deleteContactById = async (id: string) => {
    await axios.delete(`api/contact/${id}`);
};

export default deleteContactById;
