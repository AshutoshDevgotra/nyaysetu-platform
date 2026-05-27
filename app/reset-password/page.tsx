"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Lock, Eye, EyeOff, CheckCircle2, Shield, ArrowLeft } from "lucide-react";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        if (!token) {
            setErrorMsg("Invalid or missing reset token. Please request a new link.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to reset password.");
            }

            setIsSuccess(true);
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center space-y-4 animate-in fade-in duration-500 py-6">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-bold text-white">Password Updated</h3>
                <p className="text-[#888] text-sm max-w-xs mx-auto mb-4">
                    Your password has been successfully reset. You can now sign in with your new credentials.
                </p>
                <Button asChild className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold">
                    <Link href="/login">Return to Sign In</Link>
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 shrink-0" />
                    {errorMsg}
                </div>
            )}

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#ffe0b3]">New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full pl-10 pr-12 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffcc99] hover:text-[#ffe0b3]"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#ffe0b3]">Confirm New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full pl-10 pr-12 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffcc99] hover:text-[#ffe0b3]"
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading || !token}
                className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold py-3 shadow-lg transition-all"
            >
                {isLoading ? "Updating Password..." : "Submit New Password"}
            </Button>

            {!token && (
                <div className="text-center pt-2">
                    <Link href="/forgot-password" className="text-xs text-[#888] hover:text-[#ffcc99] transition-colors">
                        Missing token? Request a new link
                    </Link>
                </div>
            )}
        </form>
    );
}

export default function ResetPasswordPage() {
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
                        <h2 className="text-xl font-bold text-center text-white">Secure Reset</h2>
                        <p className="text-center text-[#ffe0b3] text-sm">Please provide your strict new credentials.</p>
                    </CardHeader>

                    <CardContent>
                        <Suspense fallback={<div className="text-center text-[#888] py-8">Loading token parameter...</div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
