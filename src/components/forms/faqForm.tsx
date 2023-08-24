import type { FC } from "react";
import faqVSchema, { TFaqValues } from "@/schema/faq";
import { useFormik } from "formik";
import FormInput from "../utility/FormInput";
import FormikTextBox from "../utility/FormTextBox";
import useApi from "@/hooks/userApi";
import FormCheckBox from "../utility/FormCheckBox";
import createFaq from "@/lib/faq/createFaq";
import useStore from "@/store";

type FaqFormProps = {
    handleClose: () => void;
};

const FaqForm: FC<FaqFormProps> = ({ handleClose }) => {
    const api = useApi();
    const store = useStore();
    const initialValues: TFaqValues = {
        subject: "",
        body: "",
        isActive: true,
    };

    async function handleSubmit(values: TFaqValues) {
        api.startLoading();
        try {
            const faq = await createFaq(values);
            store.actions.pushFaq(faq);
            api.setSuccess();
            handleClose();
        } catch (error) {
            const { response } = error as any;
            api.setResponseMessage(response.message);
            api.setError();
        } finally {
            api.stopLoading();
        }
    }

    function handleCancel(e: any) {
        handleClose();
        formik.handleReset(e);
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validateOnBlur: true,
        validationSchema: faqVSchema,
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            onReset={handleCancel}
            className="w-96 space-y-4"
        >
            <FormInput
                formik={formik}
                label="Question"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormikTextBox
                formik={formik}
                className="min-h-[8rem]"
                label="Answer"
                name="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormCheckBox
                formik={formik}
                name="isActive"
                onChange={formik.handleChange}
            >
                Active
            </FormCheckBox>
            <button
                type="submit"
                className="btn w-full text-slate-800 uppercase tracking-wider bg-slate-50 py-1.5"
            >
                {api.isLoading ? "Creating..." : "Create"}
            </button>
            <button
                type="reset"
                className="btn w-full uppercase tracking-wider border border-slate-50 py-1.5"
            >
                cancel
            </button>
        </form>
    );
};

export default FaqForm;
