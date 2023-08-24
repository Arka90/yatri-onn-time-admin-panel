import subscriptionVSchema, {
    TSubscriptionValues,
} from "@/schema/subscription";
import { useFormik } from "formik";
import type { FC } from "react";
import FormInput from "../utility/FormInput";
import FormCheckBox from "../utility/FormCheckBox";
import useApi from "@/hooks/userApi";
import useStore from "@/store";
import createSubscription from "@/lib/subscriptions/createSubscription";

type SubscriptionFormProps = {
    handleClose: () => void;
};

const SubscriptionForm: FC<SubscriptionFormProps> = ({ handleClose }) => {
    const api = useApi();
    const store = useStore();
    const initialValues: TSubscriptionValues = {
        compare_price: 0,
        no_of_reminder: 0,
        price: 0,
        status: true,
        title: "",
        validity: 0,
    };

    async function handleSubmit(values: TSubscriptionValues) {
        api.startLoading();
        try {
            const subscription = await createSubscription(values);
            store.actions.pushSubcription(subscription);
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

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validateOnBlur: true,
        validationSchema: subscriptionVSchema,
    });

    function handleCancel(e: any) {
        handleClose();
        formik.handleReset(e);
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
            onReset={handleCancel}
            className="w-96 space-y-4"
        >
            <FormInput
                formik={formik}
                label="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormInput
                formik={formik}
                label="Validity"
                name="validity"
                value={formik.values.validity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormInput
                formik={formik}
                label="Price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormInput
                formik={formik}
                label="Compare Price"
                name="compare_price"
                value={formik.values.compare_price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormInput
                formik={formik}
                label="No of Reminders"
                name="no_of_reminder"
                value={formik.values.no_of_reminder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <FormCheckBox
                formik={formik}
                name="status"
                onChange={formik.handleChange}
            >
                Status
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

export default SubscriptionForm;
