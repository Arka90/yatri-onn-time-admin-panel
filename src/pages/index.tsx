import { Inter } from "next/font/google";
import LoginLayout from "@/layout/loginLayout";
import FormikInput from "@/components/utility/FormInput";
import { TLoginValues } from "@/schema/login";
import loginVSchema from "@/schema/login";
import { useFormik } from "formik";
import Image from "next/image";
import useStore from "@/store";
import loginWithEmailAndPassword from "@/lib/auth/loginWithEmailAndPassword";
import setAdminToken from "@/lib/utils/setAdminToken";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getAdminToken from "@/lib/utils/getAdminToken";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const router = useRouter();
  const store = useStore();
  const initialValues: TLoginValues = {
    email: "",
    password: "",
  };

  async function handleSubmit(values: TLoginValues) {
    store.actions.startLoading();
    try {
      const { info, token, message } = await loginWithEmailAndPassword(values);
      store.actions.setAdmin("LOGGED_IN", info);
      setAdminToken(token);
      store.actions.setSuccessResponse(message);
      if (info.isAdmin) router.push("/dashboard");
    } catch (error) {
      const { response } = error as any;
      store.actions.setErrorResponse(response.data.message);
    } finally {
      store.actions.stopLoading();
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validationSchema: loginVSchema,
  });

  //   useEffect(() => {
  //     const token = getAdminToken();
  //     if (token) {
  //       router.push("/dashboard");
  //     } else {
  //       router.push("/");
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <LoginLayout>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-lg px-5 py-6 shadow-md shadow-slate-800/10 w-[20rem] space-y-4"
      >
        {/* heading */}
        <div className="-space-y-1 ">
          {/* logo */}
          <div className="flex items-center">
            <Image
              src={`/images/logo.png`}
              alt="logo"
              width={256}
              height={256}
              className="w-20 h-20 object-contain object-center"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">Welcome to Admin Panel</p>
            {/* <span className="text-[12px] font-medium px-4 py-1 rounded-full bg-slate-100"></span> */}
          </div>
          <h2 className="text-3xl text-slate-800 font-bold">Yatri onn time</h2>
        </div>
        <FormikInput
          formik={formik}
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormikInput
          formik={formik}
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button type="submit" className="large-btn bg-sky-500 text-white">
          Login
        </button>
      </form>
    </LoginLayout>
  );
}
