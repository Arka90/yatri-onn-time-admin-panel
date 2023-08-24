import axios from "@/config/axios";

const deleteFaqsById = async (id: string) => {
    await axios.delete(`api/faq/${id}`);
};

export default deleteFaqsById;
