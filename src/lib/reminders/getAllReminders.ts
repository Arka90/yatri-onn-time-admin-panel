import axios from "@/config/axios";
import { TReminder } from "@/types/reminders";

const getAllReminders = async (): Promise<TReminder[]> => {
    const { data } = await axios.get("/api/reminder");
    console.log(data);
    const reminders = data.flatMap((reminder: any) => {
        let { user_id, ...rem } = reminder;
        if (typeof user_id !== "string") {
            rem = {
                ...rem,
                ...user_id,
            };
        }
        return rem;
    });
    return reminders as TReminder[];
};

export default getAllReminders;
