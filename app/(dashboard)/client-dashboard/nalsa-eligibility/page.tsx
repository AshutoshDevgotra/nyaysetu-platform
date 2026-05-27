"use client";
import React, { useState } from "react";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { Check, ChevronRight, X } from "lucide-react";
import Link from 'next/link';

export default function NalsaEligibilityPage() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        citizenship: "",
        category: "",
        income: "",
    });

    const categories = [
        { id: "sc_st", label: "SC or ST category" },
        { id: "women_children", label: "Woman or Child" },
        { id: "disabled", label: "Person with Disability" },
        { id: "indrev", label: "Industrial Workman" },
        { id: "custody", label: "Person in custody / Jail" },
        { id: "disaster", label: "Victim of mass disaster / violence / flood / drought / earthquake / industrial disaster" },
        { id: "trafficking", label: "Victim of Trafficking in Human beings or Begar" },
        { id: "general", label: "None of the above (General Category)" },
    ];

    const handleNext = () => setStep(s => Math.min(s + 1, 4));
    const handlePrev = () => setStep(s => Math.max(s - 1, 1));

    const isEligible = () => {
        if (answers.citizenship !== "yes") return false;
        if (answers.category !== "general" && answers.category !== "") return true; // Most specific categories are unconditionally eligible
        if (answers.income === "below_3L" || answers.income === "below_5L") return true; // Income limits vary by state, generally 3L or 5L
        return false;
    };

    const getResult = () => {
        if (isEligible()) {
            return {
                status: "eligible",
                title: "You are likely ELIGIBLE for Free Legal Aid.",
                desc: "Based on the information provided, you qualify for free legal services from NALSA / State Legal Services Authority.",
                icon: <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} /></div>
            };
        } else {
            return {
                status: "not_eligible",
                title: "You may NOT be eligible for Free Legal Aid.",
                desc: "Based on the information provided, you might not qualify under the standard criteria. However, exceptions exist. We recommend consulting a legal professional.",
                icon: <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><X size={32} /></div>
            };
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Sidebar role="client" />

            <main className="lg:col-span-3 space-y-6">
                <header>
                    <h1 className="text-3xl font-bold text-white">Free Legal Aid (NALSA) Check</h1>
                    <p className="text-[#ffcc99] mt-1">Answer a few questions to see if you qualify for completely free legal representation.</p>
                </header>

                <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 shadow-sm max-w-2xl mx-auto mt-12">

                    {/* Progress Bar */}
                    {step < 4 && (
                        <div className="mb-8">
                            <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                                <span className={step >= 1 ? "text-[#ffcc99]" : ""}>Citizenship</span>
                                <span className={step >= 2 ? "text-[#ffcc99]" : ""}>Category</span>
                                <span className={step >= 3 ? "text-[#ffcc99]" : ""}>Income</span>
                            </div>
                            <div className="w-full bg-[#333] rounded-full h-2">
                                <div
                                    className="bg-[#ffcc99] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Steps Content */}
                    <div className="min-h-[300px] flex flex-col justify-center">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h3 className="text-2xl font-semibold text-white">Are you a citizen of India?</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => { setAnswers({ ...answers, citizenship: "yes" }); setTimeout(handleNext, 300); }}
                                        className={`py-4 rounded-xl border transition-colors text-lg font-medium ${answers.citizenship === "yes" ? "border-[#ffcc99] bg-[#ffcc99]/10 text-[#ffcc99]" : "border-[#333] bg-[#262626] hover:border-gray-400"}`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => { setAnswers({ ...answers, citizenship: "no" }); setTimeout(handleNext, 300); }}
                                        className={`py-4 rounded-xl border transition-colors text-lg font-medium ${answers.citizenship === "no" ? "border-[#ffcc99] bg-[#ffcc99]/10 text-[#ffcc99]" : "border-[#333] bg-[#262626] hover:border-gray-400"}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h3 className="text-2xl font-semibold text-white">Do you belong to any of these categories?</h3>
                                <div className="space-y-3">
                                    {categories.map((cat) => (
                                        <label key={cat.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${answers.category === cat.id ? "border-[#ffcc99] bg-[#ffcc99]/10" : "border-[#333] bg-[#262626] hover:border-gray-500"}`}>
                                            <input
                                                type="radio"
                                                name="category"
                                                className="w-5 h-5 accent-[#d4af37]"
                                                checked={answers.category === cat.id}
                                                onChange={() => setAnswers({ ...answers, category: cat.id })}
                                            />
                                            <span className="ml-3 text-white font-medium">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-8">
                                    <button onClick={handlePrev} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">Back</button>
                                    <button
                                        disabled={!answers.category}
                                        onClick={handleNext}
                                        className="bg-[#ffcc99] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#ffe0b3] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        Continue <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h3 className="text-2xl font-semibold text-white mb-2">What is your annual family income?</h3>
                                {answers.category !== "general" && answers.category !== "" && (
                                    <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-sm mb-4">
                                        Based on your category selection, income limits may not strictly apply to you. However, please provide an estimate.
                                    </div>
                                )}
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: "below_3L", label: "Less than ₹3,000,000 (3 Lakhs)" },
                                        { id: "below_5L", label: "₹3 Lakhs to ₹5 Lakhs" },
                                        { id: "above_5L", label: "Above ₹5 Lakhs" },
                                    ].map((inc) => (
                                        <button
                                            key={inc.id}
                                            onClick={() => setAnswers({ ...answers, income: inc.id })}
                                            className={`py-4 rounded-xl border text-left px-6 transition-colors text-lg font-medium ${answers.income === inc.id ? "border-[#ffcc99] bg-[#ffcc99]/10 text-[#ffcc99]" : "border-[#333] bg-[#262626] hover:border-gray-400"}`}
                                        >
                                            {inc.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-8">
                                    <button onClick={handlePrev} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">Back</button>
                                    <button
                                        disabled={!answers.income}
                                        onClick={handleNext}
                                        className="bg-[#ffcc99] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#ffe0b3] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Check Eligibility
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="text-center animate-in zoom-in-95 duration-500">
                                {getResult().icon}
                                <h2 className="text-2xl font-bold text-white mb-4">{getResult().title}</h2>
                                <p className="text-gray-300 mb-8 max-w-md mx-auto">{getResult().desc}</p>

                                <div className="space-y-4">
                                    {getResult().status === "eligible" ? (
                                        <button className="w-full sm:w-auto bg-[#ffcc99] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#ffe0b3]">
                                            Apply for Free Legal Aid Now
                                        </button>
                                    ) : (
                                        <Link href="/client-dashboard">
                                            <button className="w-full sm:w-auto bg-[#ffcc99] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#ffe0b3]">
                                                Back to Dashboard
                                            </button>
                                        </Link>
                                    )}
                                    <div>
                                        <button
                                            onClick={() => { setStep(1); setAnswers({ citizenship: "", category: "", income: "" }); }}
                                            className="text-[#ffcc99] hover:text-white text-sm"
                                        >
                                            Check Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
