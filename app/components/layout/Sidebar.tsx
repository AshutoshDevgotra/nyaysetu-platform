"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Briefcase,
    FileText,
    Scale,
    MessageSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    ShieldAlert,
    Users
} from "lucide-react";

interface SidebarProps {
    role?: string;
}

export function Sidebar({ role = "client" }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        // Auto collapse on mobile
        if (window.innerWidth < 768) {
            setCollapsed(true);
        }
    }, []);

    if (!mounted) return null;

    const advocateLinks = [
        { name: "Dashboard", href: "/lawyer-dashboard", icon: Home },
        { name: "Cases", href: "/lawyer-dashboard/cases", icon: Briefcase },
        { name: "Documents", href: "/lawyer-dashboard/documents", icon: FileText },
        { name: "AI Tools", href: "/lawyer-dashboard/ai-tools", icon: Scale },
        { name: "Messages", href: "/lawyer-dashboard/messages", icon: MessageSquare },
    ];

    const clientLinks = [
        { name: "My Dashboard", href: "/client-dashboard", icon: Home },
        { name: "My Cases", href: "/client-dashboard/cases", icon: Briefcase },
        { name: "Legal AI", href: "/client-dashboard/legal-ai", icon: Scale },
        { name: "Messages", href: "/client-dashboard/messages", icon: MessageSquare },
    ];

    const adminLinks = [
        { name: "Overview", href: "/admin-dashboard", icon: Home },
        { name: "Users", href: "/admin-dashboard/users", icon: Users },
        { name: "System Alerts", href: "/admin-dashboard/alerts", icon: ShieldAlert },
        { name: "Settings", href: "/admin-dashboard/settings", icon: Settings },
    ];

    const links = role === "advocate" ? advocateLinks : role === "admin" ? adminLinks : clientLinks;

    return (
        <div
            className={`fixed left-0 top-0 h-full bg-[#111] border-r border-[#333] transition-all duration-300 z-50 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex items-center justify-between p-4 h-16 border-b border-[#333]">
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl">⚖️</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-[#ffcc99] bg-clip-text text-transparent">
                            NyaySetu
                        </span>
                    </Link>
                )}
                {collapsed && (
                    <Link href="/" className="mx-auto text-2xl">
                        ⚖️
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`text-[#888] hover:text-[#ffcc99] transition-colors ${collapsed ? "hidden" : "block"}`}
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            </div>

            {collapsed && (
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 bg-[#222] border border-[#333] rounded-full p-1 text-[#888] hover:text-[#ffcc99] transition-colors"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            )}

            <div className="py-6 flex flex-col gap-2 px-3">
                {links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? "bg-[#2a2a2a] text-[#ffcc99] border border-[#444]"
                                    : "text-[#888] hover:bg-[#1a1a1a] hover:text-[#e0e0e0]"
                                }`}
                            title={collapsed ? link.name : ""}
                        >
                            <link.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-[#ffcc99]" : "text-[#888] group-hover:text-[#ccc]"}`} />
                            {!collapsed && (
                                <span className="font-medium text-sm">{link.name}</span>
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="absolute bottom-0 w-full p-4 border-t border-[#333]">
                <Link
                    href={`/${role === 'advocate' ? 'lawyer' : role}-dashboard/settings`}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-[#888] hover:bg-[#1a1a1a] hover:text-[#e0e0e0] ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? "Settings" : ""}
                >
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span className="font-medium text-sm">Settings</span>}
                </Link>
            </div>
        </div>
    );
}
