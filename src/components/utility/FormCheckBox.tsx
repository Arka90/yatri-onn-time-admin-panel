import clsx from "clsx";
import type { FormikProps } from "formik";
import type { ComponentProps } from "react";
import React from "react";

interface CheckBoxProps extends ComponentProps<"input"> {
    formik: FormikProps<any>;
    name: string;
}

const FormCheckBox: React.FC<CheckBoxProps> = ({
    formik,
    name,
    placeholder = ``,
    className,
    children,
    ...CheckBoxProps
}) => {
    return (
        <div className="flex gap-4 items-center">
            <input
                {...CheckBoxProps}
                name={name}
                type="checkbox"
                placeholder={placeholder}
                value={formik.values[name]}
                checked={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={clsx(``, className)}
            />
            <p className="font font-medium">{children}</p>
        </div>
    );
};

export default FormCheckBox;
