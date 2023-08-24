import { TLoginValues } from "@/schema/login";
import axios from "@/config/axios";
import { TStoreValues } from "@/types/store";

interface ILoginData {
    info: TStoreValues["auth"]["admin"];
    message: string;
    token: string;
}

export default async function loginWithEmailAndPassword(
    payload: TLoginValues
): Promise<ILoginData> {
    const { data } = await axios.post("/api/admin/login", payload);
    return data as ILoginData;
}
