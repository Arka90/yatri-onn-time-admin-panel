import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppWrapper from "@/wrappers/appWrapper";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/fallback";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary FallbackComponent={Fallback}>
            <AppWrapper>
                <Component {...pageProps} />
            </AppWrapper>
        </ErrorBoundary>
    );
}
