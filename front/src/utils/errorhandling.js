export const handleErrors = (error) => {
            //frontend error handling
            const frontendErrMessage = error.message;

            //backend errors handling
            const backendErrMessage =
                error?.response?.data?.message || // common: { message: "..." }
                error?.response?.data?.error || // sometimes: { error: "..." }
                (typeof error?.response?.data === "string" ? error.response.data : null) ||
                (error?.request ? "No response from server (network/CORS?)" : null) ||
                error?.message ||
                "Unknown error";
            return frontendErrMessage + "\n" + backendErrMessage;
}