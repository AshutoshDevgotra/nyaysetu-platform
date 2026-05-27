"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Mail, Lock, User, Scale, Shield, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const [role, setRole] = useState("client");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const r = params.get("role");
            if (r === "advocate" || r === "client") {
                setRole(r);
            }
        }
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        barRegistrationNumber: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }

            router.push("/login");
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
                    <p className="text-[#ffe0b3] text-lg">Create a new account</p>
                </div>

                <div className="mb-6">
                    <div className="flex bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-1">
                        {[
                            { id: "client", label: "Client", icon: User },
                            { id: "advocate", label: "Advocate", icon: Scale },
                        ].map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-md font-medium text-sm transition-all duration-300 ${role === r.id
                                        ? "bg-[#ffcc99] text-black shadow-sm"
                                        : "text-[#ffcc99] hover:bg-[#2a2a2a]"
                                    }`}
                            >
                                <r.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{r.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <Card className="bg-[#1a1a1a] border border-[#ffcc99] shadow-xl">
                    <CardHeader className="pb-4">
                        <h2 className="text-xl font-bold text-center text-white capitalize">{role} Registration</h2>
                        <p className="text-center text-[#ffe0b3] text-sm">Join the enterprise legal system.</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errorMsg && (
                                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm flex items-center gap-2">
                                    <Shield className="h-4 w-4 shrink-0" />
                                    {errorMsg}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ffe0b3]">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none"
                                        placeholder="Adv. Sharma"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ffe0b3]">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#ffe0b3]">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
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

                            {role === "advocate" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#ffe0b3]">Bar Registration Number</label>
                                    <input
                                        name="barRegistrationNumber"
                                        value={formData.barRegistrationNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none"
                                        placeholder="e.g. P/123/2021"
                                    />
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold py-3 shadow-lg"
                            >
                                {isLoading ? "Registering..." : "Create Account"}
                            </Button>
                        </form>

                        <div className="pt-4 border-t border-[#333] text-center">
                            <p className="text-[#ffe0b3] text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="text-[#ffcc99] hover:text-[#ffe0b3] font-semibold">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
