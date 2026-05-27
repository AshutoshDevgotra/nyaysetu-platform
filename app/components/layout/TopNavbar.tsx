"use client";

import { Bell, Search, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function TopNavbar() {
    const [showProfile, setShowProfile] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "user-role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
    };

    return (
        <div className="h-16 border-b border-[#333] bg-[#111] bg-opacity-80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
            <div className="flex-1 flex items-center">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#666]" />
                    <input
                        type="text"
                        placeholder="Search cases, clients, documents..."
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#ffcc99] transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-[#888] hover:text-[#ffcc99] transition-colors rounded-full hover:bg-[#222]">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-[#111]"></span>
                </button>

                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-[#222] transition-colors border border-transparent hover:border-[#333]"
                    >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#ffcc99] to-[#d4af37] flex items-center justify-center text-black font-semibold text-sm">
                            AD
                        </div>
                    </button>

                    {showProfile && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl py-1 overflow-hidden z-50">
                            <div className="px-4 py-3 border-b border-[#333]">
                                <p className="text-sm font-medium text-white">Admin User</p>
                                <p className="text-xs text-[#888] truncate">admin@nyaysetu.in</p>
                            </div>
                            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-[#ccc] hover:bg-[#2a2a2a] hover:text-white transition-colors">
                                <User className="h-4 w-4" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#2a2a2a] hover:text-red-300 transition-colors text-left"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
