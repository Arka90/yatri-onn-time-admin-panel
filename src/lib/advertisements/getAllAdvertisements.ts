import axios from "@/config/axios";
import { TAdvertisement } from "@/types/advertisement";

export default async function getAllAdvertisements(): Promise<
    TAdvertisement[]
> {
    const { data } = await axios.get("/api/advertisement");
    return data as TAdvertisement[];
}
