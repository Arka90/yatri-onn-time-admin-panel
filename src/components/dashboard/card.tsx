/* eslint-disable @next/next/no-img-element */
import type { ComponentProps, FC } from "react";
import clsx from "clsx";
import getRandomArbitrary from "@/lib/utils/getRandomArbitart";

type CardProps = ComponentProps<"div"> & {
    title: string;
    image?: string;
    message: string;
    lr: number;
    ur: number;
    Icon: FC<ComponentProps<"svg">>;
};

const Card: FC<CardProps> = ({
    className,
    children,
    title,
    image,
    message,
    Icon,
    lr,
    ur,

    ...props
}) => {
    const growth = getRandomArbitrary(lr, ur);
    return (
        <div
            className={clsx(
                "border border-slate-200 rounded-md max-w-sm p-4 text-slate-800",
                className
            )}
            {...props}
        >
            <div className="">
                <div className="relative">
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-slate-600">
                            {title}
                        </h3>
                        <h2 className="text-4xl flex items-center gap-2">
                            {growth}
                            <Icon className="h-7 w-7" />
                        </h2>
                        <p className="px-4 p-0.5 rounded-full bg-purple-300/30 capitalize text-purple-600 font-medium w-fit">
                            {message}
                        </p>
                    </div>
                    {image && (
                        <div className="absolute right-0 -top-10 h-[140%] ">
                            <img
                                src={image}
                                alt=""
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
