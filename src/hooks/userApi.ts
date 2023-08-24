import sleep from "@/lib/utils/sleep";
import { useState } from "react";

type TStatus = "idle" | "success" | "error";
export default function useApi() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<TStatus>("idle");
    const [message, setMessage] = useState<string>("");

    function startLoading() {
        setIsLoading(true);
    }
    function stopLoading() {
        setIsLoading(false);
    }

    function setSuccess() {
        setStatus("success");
        sleep(5);
        setStatus("idle");
    }
    function setError() {
        setStatus("error");
        sleep(5);
        setStatus("idle");
    }

    function setResponseMessage(message: string) {
        setMessage(message);
    }

    return {
        isLoading,
        status,
        message,
        startLoading,
        stopLoading,
        setSuccess,
        setError,
        setResponseMessage,
    };
}
