// Inside Navbar or any component
"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/utils/authFunctions";
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
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-lg bg-black shadow-[#d4af37]">
      <div className="text-2xl font-bold text-[#d4af37]">
        <Link href="/">LegalPlatform</Link>
      </div>

      <div className="space-x-6 text-white font-medium">
        <Link href="/find-lawyers" className="hover:text-[#d4af37] transition">Find Lawyers</Link>
        <Link href="/ai-expert" className="hover:text-[#d4af37] transition">AI Expert</Link>
        <Link href="/legal-resources" className="hover:text-[#d4af37] transition">Legal Resources</Link>
         <Link href="/client-dashboard" className="hover:text-[#d4af37] transition">Client Dashboard</Link>
         <Link href="/lawyer-dashboard" className="hover:text-[#d4af37] transition">Laywer Dashboard</Link>
      </div>

      <div className="flex gap-4">
       <Link href="/login">
        <button
          
          className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#c49f27] transition"
        >
          Login
        </button>
       </Link>
        <Link href="/lawyer-register">
          <button className="px-4 py-2 border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-black transition">
            Register as Advocate
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
