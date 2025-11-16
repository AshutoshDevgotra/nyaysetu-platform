// Inside Navbar or any component
"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/utils/authFunctions";
import Link from "next/link";


const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50">
      <nav className="w-full backdrop-blur glass">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-3.5 flex items-center justify-between">
          <div className="text-2xl font-bold brand flex items-center gap-3">
            <div className="flex items-center">
              <span className="text-3xl">⚖️</span>
              <Link href="/" className="ml-2">
                <span className="text-white">Nyaya</span>
                <span className="text-[#ffcc99]">Dwar</span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 text-white font-medium">
            <Link href="/find-lawyers" className="px-3 py-2 rounded hover:text-[#ffcc99] transition duration-300 hover:bg-[#1a1a1a]">
              Find Advocates
            </Link>
            <Link href="/document-qa" className="px-3 py-2 rounded hover:text-[#ffcc99] transition duration-300 hover:bg-[#1a1a1a]">
              AI Legal Assistant
            </Link>
            <Link href="/client-dashboard" className="px-3 py-2 rounded hover:text-[#ffcc99] transition duration-300 hover:bg-[#1a1a1a]">
              Client Portal
            </Link>
            <Link href="/lawyer-dashboard" className="px-3 py-2 rounded hover:text-[#ffcc99] transition duration-300 hover:bg-[#1a1a1a]">
              Advocate Portal
            </Link>
          </div>

          <div className="hidden md:flex gap-3">
            <a href="#book-demo" className="px-4 py-2 border-2 border-[#ffcc99] text-[#ffcc99] rounded-lg hover:bg-[#ffcc99] hover:text-black transition duration-300 font-semibold">
              Book demo
            </a>
            <Link href="/login">
              <button className="px-5 py-2 brand-bg rounded-lg hover:bg-[#ffe0b3] transition duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Login
              </button>
            </Link>
            <Link href="/lawyer-dashboard">
              <button className="px-5 py-2 border-2 brand-border brand rounded-lg hover:bg-[#ffcc99] hover:text-black transition duration-300 font-semibold">
                Join as Advocate
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button aria-label="Open menu" onClick={() => setOpen(!open)} className="text-[#ffcc99] text-2xl">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden px-4 pb-4 border-t border-[#1f1f1f]">
            <div className="flex flex-col gap-2 text-white font-medium">
              <a href="#book-demo" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">Book demo</a>
              <Link href="/find-lawyers" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">Find Advocates</Link>
              <Link href="/document-qa" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">AI Legal Assistant</Link>
              <Link href="/client-dashboard" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">Client Portal</Link>
              <Link href="/lawyer-dashboard" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">Advocate Portal</Link>
              <div className="flex gap-2 pt-2">
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
                  <button className="w-full px-4 py-2 brand-bg rounded-lg hover:bg-[#ffe0b3] transition duration-300 font-semibold">Login</button>
                </Link>
                <Link href="/lawyer-dashboard" onClick={() => setOpen(false)} className="flex-1">
                  <button className="w-full px-4 py-2 border-2 brand-border brand rounded-lg hover:bg-[#ffcc99] hover:text-black transition duration-300 font-semibold">Join</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
