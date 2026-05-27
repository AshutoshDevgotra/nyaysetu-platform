"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Mail, ArrowLeft, CheckCircle2, Shield } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong.");
            }

            setIsSent(true);
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center px-4 py-8">
            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-4xl mr-2">⚖️</span>
                        <h1 className="text-3xl font-bold">
                            <span className="text-white">Nyay</span>
                            <span className="text-[#ffcc99]">Setu</span>
                        </h1>
                    </div>
                </div>

                <Card className="bg-[#1a1a1a] border border-[#ffcc99] shadow-xl">
                    <CardHeader className="pb-4">
                        <h2 className="text-xl font-bold text-center text-white">Password Recovery</h2>
                        <p className="text-center text-[#ffe0b3] text-sm">Enter the email associated with your account.</p>
                    </CardHeader>

                    <CardContent>
                        {isSent ? (
                            <div className="text-center space-y-4 animate-in fade-in duration-500 py-6">
                                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                                <h3 className="text-lg font-bold text-white">Recovery Email Sent!</h3>
                                <p className="text-[#888] text-sm max-w-xs mx-auto">
                                    If an account exists for {email}, you will receive a password reset link shortly.
                                </p>
                                <div className="pt-4">
                                    <Button asChild className="w-full bg-[#333] text-white hover:bg-[#444]">
                                        <Link href="/login">Return to Login</Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {errorMsg && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm flex items-center gap-2">
                                        <Shield className="h-4 w-4 shrink-0" />
                                        {errorMsg}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none"
                                            placeholder="account@email.com"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold py-3 shadow-lg"
                                >
                                    {isLoading ? "Sending Instructions..." : "Reset Password"}
                                </Button>

                                <div className="text-center pt-2">
                                    <Link href="/login" className="text-xs text-[#888] hover:text-[#ffcc99] flex items-center justify-center gap-1 transition-colors">
                                        <ArrowLeft className="h-3 w-3" /> Back to Sign In
                                    </Link>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
