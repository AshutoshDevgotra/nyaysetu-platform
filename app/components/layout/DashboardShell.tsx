"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    const [role, setRole] = useState("client");

    useEffect(() => {
        // Read role from cookie
        const cookies = document.cookie.split("; ");
        const roleCookie = cookies.find(row => row.startsWith("user-role="));
        if (roleCookie) {
            setRole(roleCookie.split("=")[1]);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] flex">
            <Sidebar role={role} />

            {/* Main Content Area - changes margin based on sidebar width */}
            <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64 ml-20">
                <TopNavbar />
                <main className="flex-1 p-6 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
