import axios from "@/config/axios";

import { TReminder } from "@/types/reminders";

const getAllReminders = async (): Promise<TReminder[]> => {
  const { data } = await axios.get("api/reminder");
  return data as TReminder[];
};

export default getAllReminders;
