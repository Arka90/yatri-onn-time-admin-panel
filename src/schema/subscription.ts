import * as y from "yup";

const subscriptionVSchema = y.object({
    title: y.string().required("title field is required"),
    validity: y.number().required("validity field is required"),
    price: y.number().required("price field is required"),
    compare_price: y.number().default(0),
    no_of_reminder: y.number().required("no_of_reminders field is required"),
    status: y.boolean().default(true),
});

export default subscriptionVSchema;

export type TSubscriptionValues = y.InferType<typeof subscriptionVSchema>;
