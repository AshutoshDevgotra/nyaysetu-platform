"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Scale } from "lucide-react";

export default function LoginPage() {
  const [loginType, setLoginType] = useState<"client" | "advocate">("client");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect based on login type
      if (loginType === "client") {
        router.push("/client-dashboard");
      } else {
        router.push("/lawyer-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (loginType === "client") {
        router.push("/client-dashboard");
      } else {
        router.push("/lawyer-dashboard");
      }
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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
            Access your legal platform account
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="mb-6">
          <div className="flex bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setLoginType("client")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                loginType === "client"
                  ? "bg-[#ffcc99] text-black"
                  : "text-[#ffcc99] hover:bg-[#2a2a2a]"
              }`}
            >
              <User className="h-4 w-4" />
              Client
            </button>
            <button
              type="button"
              onClick={() => setLoginType("advocate")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                loginType === "advocate"
                  ? "bg-[#ffcc99] text-black"
                  : "text-[#ffcc99] hover:bg-[#2a2a2a]"
              }`}
            >
              <Scale className="h-4 w-4" />
              Advocate
            </button>
          </div>
        </div>

        <Card className="bg-[#1a1a1a] border border-[#ffcc99] shadow-xl">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-white">
              {loginType === "client" ? "Client Login" : "Advocate Login"}
            </h2>
            <p className="text-center text-[#ffe0b3]">
              {loginType === "client" 
                ? "Access your cases and legal services"
                : "Manage your practice and clients"
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#ffe0b3]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:border-[#ffcc99] focus:outline-none transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#ffe0b3]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] h-4 w-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-400 focus:border-[#ffcc99] focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffcc99] hover:text-[#ffe0b3] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-[#ffcc99] hover:text-[#ffe0b3] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? "Signing In..." : `Login as ${loginType === "client" ? "Client" : "Advocate"}`}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1a1a] text-[#ffe0b3]">or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black font-semibold py-3 transition-all duration-300"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-[#ffe0b3]">
                Don't have an account?{" "}
                <Link 
                  href={loginType === "advocate" ? "/lawyer-dashboard" : "/register"}
                  className="text-[#ffcc99] hover:text-[#ffe0b3] font-semibold transition-colors"
                >
                  {loginType === "advocate" ? "Register as Advocate" : "Sign Up"}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[#ffe0b3] text-sm">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="text-[#ffcc99] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#ffcc99] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}