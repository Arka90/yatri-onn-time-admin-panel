import axios from "@/config/axios";
import { TFaqValues } from "@/schema/faq";
import { TFaq } from "@/types/faq";

const createFaq = async (payload: TFaqValues): Promise<TFaq> => {
    const { data } = await axios.post(`api/faq`, payload);
    return data as TFaq;
};

export default createFaq;
