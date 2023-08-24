import clsx from "clsx";
import type { FormikProps } from "formik";
import type { ComponentProps } from "react";
import React from "react";

interface TextBoxProps extends ComponentProps<"textarea"> {
    formik: FormikProps<any>;
    label: string;
    name: string;
}

const FormikTextBox: React.FC<TextBoxProps> = ({
    formik,
    label,
    name,
    placeholder = ``,
    required,
    className,
    ...TextBoxProps
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="pl-2 font-semibold text-skin-muted"
            >
                {label}
                {required && (
                    <span className={formik.errors[name] && `!text-rose-600`}>
                        *
                    </span>
                )}
            </label>
            <textarea
                {...TextBoxProps}
                name={name}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={clsx(
                    `rounded-lg border bg-skin-base px-4 bg-transparent py-2 w-full tracking-tight text-skin-base outline-none placeholder:text-sm placeholder:text-skin-muted/50 focus:ring-0  ${
                        formik.errors[name] && formik.touched[name]
                            ? `!border-rose-600 focus:!ring-rose-600`
                            : `border-skin-base hover:border-text-base focus:border-skin-accent`
                    } `,
                    className
                )}
            />
            {formik.errors[name] && formik.touched[name] && (
                <p className="pl-2 text-sm font-medium text-rose-600">
                    {formik.errors[name]?.toString()}
                </p>
            )}
        </div>
    );
};

export default FormikTextBox;
