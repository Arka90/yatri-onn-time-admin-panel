import * as y from "yup";

const loginVSchema = y.object({
    email: y
        .string()
        .required("Email field is required")
        .email("Invalid email address"),
    password: y
        .string()
        .required("Password field is required")
        .min(6, "Password must be at least 6 characters long"),
});

export default loginVSchema;

export type TLoginValues = y.InferType<typeof loginVSchema>;
