"use client";
import React from "react";
import { signInWithGoogle } from "@/utils/authFunctions";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Logged in user:", user);
      router.push("/lawyer-register");
    } catch (err) {
      console.error("Google login error", err);
    }
  };

  const handleGithubLogin = async () => {
    // TODO: implement signInWithGithub in authFunctions.ts
  };

  const handleAppleLogin = () => {
    alert("Apple login coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-6">Sign in to Your Account</h2>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-2 mb-4 border rounded hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          Sign in with Google
        </button>

        <button
          onClick={handleGithubLogin}
          className="flex items-center justify-center gap-3 w-full py-2 mb-4 border rounded hover:bg-gray-50 transition"
        >
          <FaGithub size={22} />
          Sign in with GitHub
        </button>

        <button
          onClick={handleAppleLogin}
          className="flex items-center justify-center gap-3 w-full py-2 border rounded hover:bg-gray-50 transition"
        >
          <FaApple size={22} />
          Sign in with Apple
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
