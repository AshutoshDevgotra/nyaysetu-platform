// Inside Navbar or any component
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setUser(data.user);
          }
        }
      } catch (err) {
        console.error("Failed to load user info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getDashboardLink = (role: string) => {
    if (role === "client") return "/client-dashboard";
    if (role === "advocate") return "/lawyer-dashboard";
    if (role === "admin") return "/admin-dashboard";
    return "/";
  };

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
            <Link href="/vlogs" className="px-3 py-2 rounded hover:text-[#ffcc99] transition duration-300 hover:bg-[#1a1a1a]">
              Know Your Rights (Vlogs)
            </Link>
            {user && (
              <Link href={getDashboardLink(user.role)} className="px-3 py-2 rounded hover:text-[#ffcc99] transition duration-300 hover:bg-[#1a1a1a]">
                {user.role === "client" ? "Client Portal" : user.role === "advocate" ? "Advocate Portal" : "Admin Portal"}
              </Link>
            )}
          </div>

          <div className="hidden md:flex gap-3 items-center">
            <ThemeToggle />
            {!loading && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#ffcc99]">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 border-2 border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition duration-300 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-5 py-2 brand-bg rounded-lg hover:bg-[#ffe0b3] transition duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-5 py-2 border-2 brand-border brand rounded-lg hover:bg-[#ffcc99] hover:text-black transition duration-300 font-semibold">
                    Join as Advocate
                  </button>
                </Link>
              </>
            )}
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
              <div className="py-2"><ThemeToggle /></div>
              <Link href="/find-lawyers" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">Find Advocates</Link>
              <Link href="/document-qa" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">AI Legal Assistant</Link>
              <Link href="/vlogs" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">Know Your Rights (Vlogs)</Link>
              {user && (
                <Link href={getDashboardLink(user.role)} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:text-[#ffcc99] hover:bg-[#1a1a1a]">
                  {user.role === "client" ? "Client Portal" : user.role === "advocate" ? "Advocate Portal" : "Admin Portal"}
                </Link>
              )}
              <div className="flex gap-2 pt-2">
                {!loading && user ? (
                  <div className="w-full flex items-center justify-between bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">
                    <span className="text-[#ffcc99] font-medium">Hi, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-1.5 border border-red-500/55 text-red-400 rounded hover:bg-red-500/10 text-sm font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
                      <button className="w-full px-4 py-2 brand-bg rounded-lg hover:bg-[#ffe0b3] transition duration-300 font-semibold">Login</button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)} className="flex-1">
                      <button className="w-full px-4 py-2 border-2 brand-border brand rounded-lg hover:bg-[#ffcc99] hover:text-black transition duration-300 font-semibold">Join</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
