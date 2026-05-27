"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Scale, Shield, Phone, KeyRound } from "lucide-react";

// Schemas
const emailLoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpLoginSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9]+$/, "Must contain only digits"),
  otp: z.string().optional(),
});

type EmailLoginForm = z.infer<typeof emailLoginSchema>;
type OtpLoginForm = z.infer<typeof otpLoginSchema>;

type RoleType = "client" | "advocate" | "admin";
type LoginMethodType = "email" | "otp";

export default function LoginPage() {
  const [role, setRole] = useState<RoleType>("client");
  const [loginMethod, setLoginMethod] = useState<LoginMethodType>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const emailForm = useForm<EmailLoginForm>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const otpForm = useForm<OtpLoginForm>({
    resolver: zodResolver(otpLoginSchema),
    defaultValues: { phone: "", otp: "" },
  });

  const onEmailSubmit = async (data: EmailLoginForm) => {
    setIsLoading(true);
    // Clear any previous error
    emailForm.clearErrors();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to authenticate");
      }

      // Cookies are automatically set by the API response (httpOnly)
      // Redirect based on role returned by API (or selected role if preferred, but API is authoritative)
      const userRole = result.user?.role || role;

      if (userRole === "client") router.push("/client-dashboard");
      else if (userRole === "advocate") router.push("/lawyer-dashboard");
      else router.push("/admin-dashboard");
    } catch (error: any) {
      console.error(error);
      emailForm.setError("root", { message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const onSendOtp = async () => {
    const isValid = await otpForm.trigger("phone");
    if (isValid) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOtpSent(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onOtpSubmit = async (data: OtpLoginForm) => {
    if (!data.otp || data.otp.length !== 6) {
      otpForm.setError("otp", { message: "OTP must be 6 digits" });
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      document.cookie = `auth-token=mock-token; path=/`;
      document.cookie = `user-role=${role}; path=/`;

      if (role === "client") router.push("/client-dashboard");
      else if (role === "advocate") router.push("/lawyer-dashboard");
      else router.push("/admin-dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#ffcc99] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#ffcc99] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#ffcc99] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-2">⚖️</span>
            <h1 className="text-3xl font-bold">
              <span className="text-white">Nyay</span>
              <span className="text-[#ffcc99]">Setu</span>
            </h1>
          </div>
          <p className="text-[#ffe0b3] text-lg">
            Enterprise Legal System Access
          </p>
        </div>

        {/* Role Selector */}
        <div className="mb-6">
          <div className="flex bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-1">
            {[
              { id: "client", label: "Client", icon: User },
              { id: "advocate", label: "Advocate", icon: Scale },
              { id: "admin", label: "Admin", icon: Shield }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id as RoleType)}
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
            <div className="flex justify-between items-center mb-4 border-b border-[#333] pb-2">
              <button
                onClick={() => setLoginMethod("email")}
                className={`text-sm font-semibold pb-2 px-2 transition-colors ${loginMethod === "email" ? "text-[#ffcc99] border-b-2 border-[#ffcc99]" : "text-[#888] hover:text-[#bbb]"}`}
              >
                Email
              </button>
              <button
                onClick={() => setLoginMethod("otp")}
                className={`text-sm font-semibold pb-2 px-2 transition-colors ${loginMethod === "otp" ? "text-[#ffcc99] border-b-2 border-[#ffcc99]" : "text-[#888] hover:text-[#bbb]"}`}
              >
                Phone OTP
              </button>
            </div>
            <h2 className="text-xl font-bold text-center text-white capitalize">
              {role} Login
            </h2>
            <p className="text-center text-[#ffe0b3] text-sm">
              {role === "client" ? "Access your cases & services" : role === "advocate" ? "Manage your legal practice" : "System administration access"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {loginMethod === "email" ? (
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#ffe0b3]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                    <input
                      {...emailForm.register("email")}
                      className={`w-full pl-10 pr-4 py-3 bg-[#0f0f0f] border ${emailForm.formState.errors.email ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none transition-colors`}
                      placeholder="admin@nyaysetu.in"
                    />
                  </div>
                  {emailForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{emailForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#ffe0b3]">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...emailForm.register("password")}
                      className={`w-full pl-10 pr-12 py-3 bg-[#0f0f0f] border ${emailForm.formState.errors.password ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] hover:text-[#ffe0b3] transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {emailForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{emailForm.formState.errors.password.message}</p>
                  )}
                  {emailForm.formState.errors.root && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm mt-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 shrink-0" />
                      {emailForm.formState.errors.root.message}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <Link href="/forgot-password" className="text-xs text-[#ffcc99] hover:text-[#ffe0b3] transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold py-3 transition-all duration-300 shadow-lg"
                >
                  {isLoading ? "Authenticating..." : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                </Button>
              </form>
            ) : (
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#ffe0b3]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                    <span className="absolute left-9 top-1/2 transform -translate-y-1/2 text-[#888] text-sm">+91</span>
                    <input
                      {...otpForm.register("phone")}
                      disabled={otpSent}
                      maxLength={10}
                      className={`w-full pl-16 pr-4 py-3 bg-[#0f0f0f] border ${otpForm.formState.errors.phone ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none transition-colors disabled:opacity-50`}
                      placeholder="9876543210"
                    />
                  </div>
                  {otpForm.formState.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{otpForm.formState.errors.phone.message}</p>
                  )}
                </div>

                {otpSent && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-sm font-medium text-[#ffe0b3]">Enter OTP</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                      <input
                        {...otpForm.register("otp")}
                        maxLength={6}
                        className={`w-full pl-10 pr-4 py-3 bg-[#0f0f0f] border ${otpForm.formState.errors.otp ? 'border-red-500' : 'border-[#333]'} rounded-lg text-white placeholder-gray-500 focus:border-[#ffcc99] focus:outline-none transition-colors tracking-widest`}
                        placeholder="123456"
                      />
                    </div>
                    {otpForm.formState.errors.otp && (
                      <p className="text-red-500 text-xs mt-1">{otpForm.formState.errors.otp.message}</p>
                    )}
                  </div>
                )}

                {!otpSent ? (
                  <Button
                    type="button"
                    onClick={onSendOtp}
                    disabled={isLoading}
                    className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold py-3 transition-all duration-300 shadow-lg"
                  >
                    {isLoading ? "Sending OTP..." : "Get OTP"}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold py-3 transition-all duration-300 shadow-lg"
                    >
                      {isLoading ? "Verifying..." : "Verify & Login"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-xs text-[#888] hover:text-[#ffcc99] transition-colors"
                    >
                      Wrong number? Change
                    </button>
                  </div>
                )}
              </form>
            )}

            {/* Sign Up Link */}
            <div className="pt-4 border-t border-[#333] text-center">
              <p className="text-[#ffe0b3] text-sm">
                Don't have an account?{" "}
                <Link
                  href={role === "advocate" ? "/register?role=advocate" : "/register"}
                  className="text-[#ffcc99] hover:text-[#ffe0b3] font-semibold transition-colors"
                >
                  Submit Registration Request
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[#ffe0b3] text-xs">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="text-[#ffcc99] hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#ffcc99] hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}