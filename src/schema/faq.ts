import * as y from "yup";

const faqVSchema = y.object({
    subject: y.string().required("subject field is required"),
    body: y.string().required("description field is required"),
    isActive: y.boolean().default(true),
});

export default faqVSchema;

export type TFaqValues = y.InferType<typeof faqVSchema>;
