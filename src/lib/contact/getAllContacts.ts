import axios from "@/config/axios";
import { TContact } from "@/types/contact";

export default async function getAllContacts(): Promise<TContact[]> {
    const { data } = await axios.get("/api/contact");
    console.log(data);

    return data as TContact[];
}
