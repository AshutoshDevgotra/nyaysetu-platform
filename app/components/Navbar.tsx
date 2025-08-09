// Inside Navbar or any component
"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/utils/authFunctions";
import Link from "next/link";


const Navbar = () => {
  const router = useRouter();

  const handleGoogleLogin = useCallback(async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed in:", user.displayName);
      router.push("/lawyer-dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }, [router]);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-lg bg-black shadow-[#ffcc99] relative z-50">
      <div className="text-2xl font-bold text-[#ffcc99] flex items-center gap-3">
        <div className="flex items-center">
          <span className="text-3xl">⚖️</span>
          <Link href="/" className="ml-2">
            <span className="text-white">Nyaya</span>
            <span className="text-[#ffcc99]">Dwar</span>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex space-x-6 text-white font-medium">
        <Link href="/find-lawyers" className="hover:text-[#ffcc99] transition duration-300 px-3 py-2 rounded hover:bg-[#1a1a1a]">
          Find Advocates
        </Link>
        <Link href="/document-qa" className="hover:text-[#ffcc99] transition duration-300 px-3 py-2 rounded hover:bg-[#1a1a1a]">
          AI Legal Assistant
        </Link>
        <Link href="/client-dashboard" className="hover:text-[#ffcc99] transition duration-300 px-3 py-2 rounded hover:bg-[#1a1a1a]">
          Client Portal
        </Link>
        <Link href="/lawyer-dashboard" className="hover:text-[#ffcc99] transition duration-300 px-3 py-2 rounded hover:bg-[#1a1a1a]">
          Advocate Portal
        </Link>
      </div>

      <div className="flex gap-4">
       <Link href="/login">
        <button className="px-6 py-2 bg-[#ffcc99] text-black rounded-lg hover:bg-[#ffe0b3] transition duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Login
        </button>
       </Link>
        <Link href="/lawyer-dashboard">
          <button className="px-6 py-2 border-2 border-[#ffcc99] text-[#ffcc99] rounded-lg hover:bg-[#ffcc99] hover:text-black transition duration-300 font-semibold">
            Join as Advocate
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-[#ffcc99] text-2xl">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
