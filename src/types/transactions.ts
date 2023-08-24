export type TTransaction = {
    payment_id: string;
    amount: number;
    user_id: string;
    date: Date;
    status: "success" | "pending" | "failed";
    remarks: string | null;
};
