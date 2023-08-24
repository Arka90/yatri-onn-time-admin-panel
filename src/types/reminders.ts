import { TUser } from "./users";

export type TReminder = {
    _id: string;
    category: "train" | "bus" | "flight" | "others";
    date_time: Date;
    title: string;
    call_time: Date;
    number: string;
    source: string;
    destination: string;
    message: string;
    name: string;
    phone: string;
    status: boolean;
};
