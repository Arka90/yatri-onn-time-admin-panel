import axios from "@/config/axios";
import { TSubcription } from "@/types/subcriptions";

export default async function getAllSubscriptions(): Promise<TSubcription[]> {
    const { data } = await axios.get("/api/subscription");
    console.log(data);

    return data as TSubcription[];
}
