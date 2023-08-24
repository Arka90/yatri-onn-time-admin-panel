import axios from "@/config/axios";

const deleteSubcriptionById = async (id: string) => {
  await axios.delete(`api/subscription/${id}`);
};

export default deleteSubcriptionById;
