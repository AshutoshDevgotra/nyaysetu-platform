"use client";

import React from "react";
import { Users, Gavel, FileText, Database, ArrowUpRight, ArrowDownRight, Activity, DollarSign } from "lucide-react";
import { Sidebar } from "@/app/components/layout/Sidebar";

export default function AdminDashboard() {
    const kpis = [
        { title: "Total Users", value: "14,582", trend: "+12.5%", isUp: true, icon: <Users size={20} /> },
        { title: "Active Advocates", value: "3,240", trend: "+5.2%", isUp: true, icon: <Gavel size={20} /> },
        { title: "Cases Tracked", value: "8,921", trend: "+18.1%", isUp: true, icon: <FileText size={20} /> },
        { title: "MRR", value: "₹45.2L", trend: "-2.4%", isUp: false, icon: <DollarSign size={20} /> },
    ];

    const recentUsers = [
        { name: "Rajesh Kumar", role: "Advocate", date: "2 minutes ago", status: "Active" },
        { name: "Sunita Devi", role: "Citizen", date: "15 minutes ago", status: "Pending Verification" },
        { name: "Vikram Singh", role: "Advocate", date: "1 hour ago", status: "Active" },
        { name: "Priya Sharma", role: "Citizen", date: "2 hours ago", status: "Active" },
    ];

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Sidebar />

            <main className="lg:col-span-3 space-y-6">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            <Database className="text-[#ffcc99]" size={28} />
                            Platform Analytics
                        </h1>
                        <p className="text-[#ffcc99] mt-1">High-level view of NyaySetu activity</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-[#333] hover:border-[#ffcc99] rounded-lg text-sm font-medium transition-colors">
                            Export CSV
                        </button>
                        <button className="px-4 py-2 bg-[#ffcc99] text-black hover:bg-[#ffe0b3] rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <Activity size={16} /> Live Report
                        </button>
                    </div>
                </header>

                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-[#1a1a1a] border border-[#333] hover:border-[#ffcc99]/50 rounded-2xl p-6 transition-colors shadow-sm relative overflow-hidden group">
                            <div className="absolute -right-6 -top-6 text-[#ffcc99]/5 opacity-20 group-hover:opacity-100 transition-opacity">
                                {React.cloneElement(kpi.icon as React.ReactElement, { size: 100 })}
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-[#262626] rounded-lg text-[#ffcc99]">
                                    {kpi.icon}
                                </div>
                                <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${kpi.isUp ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                                    {kpi.isUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                                    {kpi.trend}
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">{kpi.value}</h3>
                            <p className="text-sm text-gray-400 font-medium">{kpi.title}</p>
                        </div>
                    ))}
                </div>

                {/* Charts & Graphs Area (Mocked visual layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#333] rounded-2xl p-6 h-80 flex flex-col relative overflow-hidden">
                        <h3 className="text-lg font-semibold text-white mb-1">User Growth</h3>
                        <p className="text-[#ffcc99] text-sm mb-4">Past 30 days active users vs. registrations</p>
                        <div className="flex-1 border-t border-l border-[#333] mt-2 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#ffcc99]/10 to-transparent bottom-0 h-1/2"></div>
                            <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-[#ffcc99]"></div>
                            <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-[#ffcc99]"></div>
                            <div className="absolute bottom-1/2 left-2/4 w-2 h-2 rounded-full bg-[#ffcc99]"></div>
                            <div className="absolute top-1/3 left-3/4 w-2 h-2 rounded-full bg-[#ffcc99]"></div>
                            <div className="absolute top-16 right-10 w-2 h-2 rounded-full bg-[#ffcc99] shadow-[0_0_15px_#ffcc99]"></div>
                            {/* Mocking lines connecting dots */}
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                <path d="M 40 200 L 200 160 L 400 120 L 600 80 L 760 64" fill="none" stroke="#ffcc99" strokeWidth="2" strokeDasharray="5,5" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6 flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Registrations</h3>
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-thin">
                            {recentUsers.map((user, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-[#262626] rounded-xl border border-[#333]">
                                    <div>
                                        <h4 className="text-sm font-semibold text-white">{user.name}</h4>
                                        <p className="text-xs text-gray-400 mt-0.5">{user.role} • {user.date}</p>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 w-full text-sm text-[#ffcc99] bg-[#262626] py-2 rounded-lg hover:bg-[#333] transition-colors">
                            View All Users
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}
