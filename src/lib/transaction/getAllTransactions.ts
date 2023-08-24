import axios from "@/config/axios";
import { TTransaction } from "@/types/transactions";

const getAllTransactions = async (): Promise<TTransaction[]> => {
    const { data } = await axios.get("/api/transaction");
    return data as TTransaction[];
};

export default getAllTransactions;
