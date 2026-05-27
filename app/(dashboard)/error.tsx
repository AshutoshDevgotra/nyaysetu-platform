"use client";

import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#0f0f0f] text-white p-6">
            <div className="text-center max-w-md w-full p-8 rounded-3xl bg-[#1a1a1a] border border-[#ffcc99]/30 shadow-[0_0_40px_rgba(255,204,153,0.05)]">
                <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="text-red-500" size={32} />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Something went wrong!</h2>
                <p className="text-gray-400 mb-8">
                    We experienced an issue loading this section of the dashboard. Your data is safe.
                </p>

                <div className="flex gap-4 p-4 rounded-xl bg-black border border-[#333] mb-8 text-left">
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs text-red-400 font-mono truncate">
                            {error.message || "Unknown error occurred"}
                        </p>
                        {error.digest && (
                            <p className="text-[10px] text-gray-500 font-mono mt-1">Digest: {error.digest}</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        onClick={() => window.history.back()}
                        variant="outline"
                        className="flex-1 border-[#333] text-gray-300 hover:text-white hover:bg-[#333]"
                    >
                        Go Back
                    </Button>
                    <Button
                        onClick={() => reset()}
                        className="flex-1 bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold flex items-center justify-center gap-2"
                    >
                        <RefreshCcw size={16} />
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    );
}
