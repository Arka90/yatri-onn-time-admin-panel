import axios from "@/config/axios";
import { TSubscriptionValues } from "@/schema/subscription";
import { TSubcription } from "@/types/subcriptions";

const createSubscription = async (
    payload: TSubscriptionValues
): Promise<TSubcription> => {
    const { data } = await axios.post(`api/subscription`, payload);
    return data as TSubcription;
};

export default createSubscription;
