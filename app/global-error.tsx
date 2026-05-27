"use client";

import { useEffect } from "react";
import { Button } from "./components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white p-6 text-center">
                    <div className="bg-[#1a1a1a] border border-red-500/30 p-8 rounded-2xl max-w-md w-full shadow-lg">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Critical System Error</h2>
                        <p className="text-gray-300 mb-6 font-medium">
                            We apologize, but something went terribly wrong on our end.
                        </p>
                        <Button
                            onClick={() => reset()}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Try to recover
                        </Button>
                        <p className="text-xs text-gray-500 mt-4">
                            Error Digest: {error.digest || "Unknown"}
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
}
