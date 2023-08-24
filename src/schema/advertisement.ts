import * as y from "yup";

const advertisementVSchema = y.object({
    image: y.mixed().nullable(),
    title: y.string().required("title field is required"),
    url: y.string().optional().default(""),
    description:y.string().optional().default("").max(55 , "description should contain less than 55 char"),
    description2:y.string().optional().default("").max(90 , "description2 should contain less than 90 char"),
    cta_text:y.string().optional().default(""),
    status: y.boolean().default(false),
});

export default advertisementVSchema;

export type TAdvertisementValues = y.InferType<typeof advertisementVSchema>;
