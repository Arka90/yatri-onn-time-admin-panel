import advertisementVSchema, {
  TAdvertisementValues,
} from "@/schema/advertisement";
import { useFormik } from "formik";
import type { FC, FormEvent } from "react";
import FormInput from "../utility/FormInput";
import FormikTextBox from "../utility/FormTextBox";
import useApi from "@/hooks/userApi";
import { Button } from "@mui/material";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import createAdvertisement from "@/lib/advertisements/createAdvertisement";
import useStore from "@/store";
import FormCheckBox from "../utility/FormCheckBox";

type AdvertisementFormProps = {
  handleClose: () => void;
};

const AdvertisementForm: FC<AdvertisementFormProps> = ({ handleClose }) => {
  const api = useApi();
  const store = useStore();
  const initialValues: TAdvertisementValues = {
    image: null,
    title: "",
    url: "",
    description: "",
    description2: "",
    cta_text: "",
    status: false,
  };

  async function handleSubmit(values: TAdvertisementValues) {
    api.startLoading();
    try {
      // console.log(values , "================ in the console")
      const advertisement = await createAdvertisement(values);
      store.actions.pushAdvertisement(advertisement);
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

  function onImageChange(e: any) {
    console.log(e);
  }

  function handleCancel(e: any) {
    handleClose();
    formik.handleReset(e);
  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validationSchema: advertisementVSchema,
  });

  function setImage(e: any) {
    formik.setFieldValue(
      "image",
      e?.target?.files[0] ? e.target.files[0] : null
    );
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={handleCancel}
      className="w-96 space-y-4"
      // encType="multipart/form-data"
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
        label="URL"
        name="url"
        value={formik.values.url}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <FormInput
        formik={formik}
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <FormInput
        formik={formik}
        label="Description2"
        name="description2"
        value={formik.values.description2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <FormInput
        formik={formik}
        label="Cta text"
        name="cta_text"
        value={formik.values.cta_text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <div className="flex items-center justify-between gap-4">
        Upload Image
        <Button
          variant="contained"
          component="label"
          sx={{
            bgcolor: colors.slate[100],
            color: colors.slate[800],
            fontWeight: defaultTheme.fontWeight.medium,
            borderRadius: defaultTheme.borderRadius.md,
            ":hover": {
              bgcolor: colors.slate[200],
            },
          }}
        >
          Upload
          <input hidden type="file" name="image" onChange={setImage} />
        </Button>
      </div>

      <FormCheckBox
        formik={formik}
        name="status"
        onChange={formik.handleChange}
      >
        Publish Advertisement
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

export default AdvertisementForm;
