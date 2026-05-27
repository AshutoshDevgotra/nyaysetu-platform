"use client";

import React, { useState } from "react";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function BillingPage() {
    const [currentPlan, setCurrentPlan] = useState("Pro");

    const handleUpgrade = () => {
        toast.success("Redirecting to payment gateway...", {
            description: "You'll be upgraded to Pro once payment is complete.",
        });
    };

    const handleCancel = () => {
        toast.error("Subscription Cancelled", {
            description: "You will lose access to Pro features at the end of the billing cycle.",
        });
        setCurrentPlan("Free");
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Sidebar />

            <main className="lg:col-span-3 space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
                    <p className="text-[#ffcc99]">Manage your NyaySetu Advocate Plan</p>
                </header>

                {/* Current Plan Overview */}
                <div className="bg-[#1a1a1a] border border-[#ffcc99]/30 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffcc99]/10 rounded-full blur-3xl"></div>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-white">Current Plan: {currentPlan}</h2>
                                {currentPlan === "Pro" && (
                                    <span className="px-3 py-1 bg-[#ffcc99] text-black text-xs font-bold rounded-full uppercase tracking-wide">
                                        Active
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-400">Your next billing date is <strong className="text-white">August 15, 2025</strong></p>
                        </div>

                        <div className="text-left lg:text-right">
                            <p className="text-3xl font-bold text-[#ffcc99]">₹999<span className="text-lg text-gray-500 font-normal">/month</span></p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        {currentPlan === "Free" ? (
                            <button onClick={handleUpgrade} className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] px-6 py-3 rounded-xl font-semibold transition-colors">
                                Upgrade to Pro
                            </button>
                        ) : (
                            <button onClick={handleCancel} className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30 px-6 py-3 rounded-xl font-semibold transition-colors">
                                Cancel Subscription
                            </button>
                        )}
                        <button className="bg-[#262626] border border-[#333] hover:border-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                            View Invoices
                        </button>
                    </div>
                </div>

                {/* Plan Comparison */}
                <h3 className="text-xl font-semibold text-white mt-12 mb-6">Plan Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Free Plan */}
                    <div className={`border rounded-2xl p-6 transition-all ${currentPlan === "Free" ? "border-[#ffcc99] bg-[#1a1a1a]" : "border-[#333] bg-[#0f0f0f]"}`}>
                        <h4 className="text-2xl font-bold text-white mb-2">Free Core</h4>
                        <p className="text-gray-400 mb-6">Basic case directory and client messaging.</p>
                        <p className="text-3xl font-bold text-white mb-8">₹0<span className="text-sm font-normal text-gray-400">/forever</span></p>

                        <ul className="space-y-4 mb-8 text-sm">
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-gray-500 shrink-0" size={18} /> <span>Manage up to 10 active cases</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-gray-500 shrink-0" size={18} /> <span>Client messaging</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-gray-500 shrink-0" size={18} /> <span>Basic case timeline tracking</span></li>
                            <li className="flex items-start gap-3 opacity-50"><ShieldAlert className="text-red-400 shrink-0" size={18} /> <span>No AI Tools access</span></li>
                            <li className="flex items-start gap-3 opacity-50"><ShieldAlert className="text-red-400 shrink-0" size={18} /> <span>No Document Generation</span></li>
                        </ul>

                        {currentPlan !== "Free" && (
                            <button onClick={handleCancel} className="w-full py-3 border border-[#333] text-gray-300 rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium">Downgrade</button>
                        )}
                        {currentPlan === "Free" && (
                            <div className="w-full py-3 bg-[#333] text-gray-400 rounded-lg text-center font-medium">Current Plan</div>
                        )}
                    </div>

                    {/* Pro Plan */}
                    <div className={`border rounded-2xl p-6 transition-all relative overflow-hidden ${currentPlan === "Pro" ? "border-[#ffcc99] bg-[#1a1a1a]" : "border-[#333] bg-[#1a1a1a] hover:border-gray-500"}`}>
                        {currentPlan === "Pro" && <div className="absolute top-0 right-0 py-1 px-4 bg-[#ffcc99] text-black text-xs font-bold rounded-bl-lg">ACTIVE</div>}

                        <h4 className="text-2xl font-bold text-[#ffcc99] mb-2">Pro Advocate</h4>
                        <p className="text-gray-400 mb-6">Full suite of AI tools and unlimited case tracking.</p>
                        <p className="text-3xl font-bold text-white mb-8">₹999<span className="text-sm font-normal text-gray-400">/month</span></p>

                        <ul className="space-y-4 mb-8 text-sm">
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#ffcc99] shrink-0" size={18} /> <span>Unlimited active cases</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#ffcc99] shrink-0" size={18} /> <span>Full access to AI Judgment Finder</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#ffcc99] shrink-0" size={18} /> <span>FIR Analyzer & Summarizer</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#ffcc99] shrink-0" size={18} /> <span>Automated Document Generation</span></li>
                            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#ffcc99] shrink-0" size={18} /> <span>Priority Placement in Client Search</span></li>
                        </ul>

                        {currentPlan !== "Pro" && (
                            <button onClick={handleUpgrade} className="w-full py-3 bg-[#ffcc99] text-black rounded-lg hover:bg-[#ffe0b3] transition-colors font-bold shadow-lg shadow-[#ffcc99]/20">Upgrade Now</button>
                        )}
                        {currentPlan === "Pro" && (
                            <div className="w-full py-3 bg-[#262626] text-[#ffcc99] border border-[#ffcc99]/30 rounded-lg text-center font-medium">Current Plan</div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
