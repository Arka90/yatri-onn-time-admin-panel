import type { FC } from "react";
import NextHead from "next/head";

type HeadProps = {
    title?: string;
    description?: string;
};

const Head: FC<HeadProps> = ({
    description = "Yatri admin panel",
    title = "Admin Panel | Yattri on time",
}) => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
        </NextHead>
    );
};

export default Head;
