"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Scale,
  MessageSquare,
  HelpCircle,
  CreditCard
} from "lucide-react";

interface SidebarProps {
  role?: "client" | "advocate" | "admin";
}

export default function Sidebar({ role = "advocate" }: SidebarProps) {
  const pathname = usePathname();

  const getLinks = () => {
    switch (role) {
      case "client":
        return [
          { name: "Dashboard", href: "/client-dashboard", icon: LayoutDashboard },
          { name: "My Cases", href: "/client-dashboard/cases", icon: FileText },
          { name: "AI Assistant", href: "/client-dashboard/chat", icon: MessageSquare },
          { name: "Know Your Rights", href: "/client-dashboard/rights", icon: Scale },
          { name: "Free Legal Aid", href: "/client-dashboard/nalsa-eligibility", icon: HelpCircle },
          { name: "Settings", href: "/client-dashboard/settings", icon: Settings },
        ];
      case "admin":
        return [
          { name: "Platform Analytics", href: "/admin-dashboard", icon: LayoutDashboard },
          { name: "All Cases", href: "/admin-dashboard/cases", icon: FileText },
          { name: "Manage Users", href: "/admin-dashboard/users", icon: Users },
          { name: "Settings", href: "/admin-dashboard/settings", icon: Settings },
        ];
      case "advocate":
      default:
        return [
          { name: "Dashboard", href: "/lawyer-dashboard", icon: LayoutDashboard },
          { name: "My Cases", href: "/lawyer-dashboard/cases", icon: FileText },
          { name: "Clients", href: "/lawyer-dashboard/clients", icon: Users },
          { name: "Billing", href: "/lawyer-dashboard/billing", icon: CreditCard },
          { name: "Settings", href: "/lawyer-dashboard/settings", icon: Settings },
        ];
    }
  };

  const links = getLinks();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-3rem)] sticky top-6">
      <div className="flex items-center gap-2 mb-8 px-4">
        <span className="text-3xl">⚖️</span>
        <h2 className="text-2xl font-bold brand">
          <span className="text-white">Nyay</span><span className="text-[#ffcc99]">Setu</span>
        </h2>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-[#ffcc99] text-black font-semibold shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                }`}
            >
              <link.icon size={20} className={isActive ? "text-black" : "text-gray-400"} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-6 border-t border-[#333]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400 font-medium">Theme</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[#1a1a1a] rounded-lg transition">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#ffcc99] flex items-center justify-center text-black font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-xs text-gray-400 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
