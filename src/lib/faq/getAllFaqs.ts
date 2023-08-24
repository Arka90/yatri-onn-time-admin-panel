import axios from "@/config/axios";
import { TFaq } from "@/types/faq";

const getAllReminders = async (): Promise<TFaq[]> => {
    const { data } = await axios.get("/api/faq");
    return data as TFaq[];
};

export default getAllReminders;
