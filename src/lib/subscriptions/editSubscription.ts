import axios from "@/config/axios";
import { TSubscriptionValues } from "@/schema/subscription";
import { TSubcription } from "@/types/subcriptions";
const editSubcriptionById = async (
  id: string,
  payload: TSubscriptionValues
): Promise<TSubcription> => {
  const { data } = await axios.patch(`api/subscription/${id}`, payload);

  return data.udatedSubscription as TSubcription;
};

export default editSubcriptionById;
