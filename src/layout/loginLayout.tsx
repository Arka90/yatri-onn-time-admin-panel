import type { ComponentProps, FC, ReactNode } from "react";
import clsx from "clsx";

type LoginLayoutProps = ComponentProps<"main"> & {
    children: ReactNode;
};

const LoginLayout: FC<LoginLayoutProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <main
            className={clsx(
                className,
                `min-h-screen grid place-items-center bg-slate-100/50`
            )}
            {...props}
        >
            {children}
        </main>
    );
};

export default LoginLayout;
