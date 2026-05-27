"use client";
import React, { useState } from "react";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { RightsCard } from "@/app/components/ui/rights-card";

export default function RightsPage() {
    const [topic, setTopic] = useState("all");

    const rightsData = [
        {
            id: "challan",
            title: "Traffic Police Challan Rights",
            icon: "🚗",
            summary: "Know your rights when stopped by traffic police.",
            category: "police",
            details: [
                {
                    title: "Right to See Identification",
                    description: "You have the right to ask the traffic police officer for their identification or badge number before showing your documents."
                },
                {
                    title: "No Confiscation Without Receipt",
                    description: "Traffic police cannot unilaterally confiscate your driving license or RC without providing an official receipt or challan."
                },
                {
                    title: "Right Against Harassment",
                    description: "No police officer is legally permitted to physically assault you, snatch your keys, or verbally abuse you under any circumstances."
                },
                {
                    title: "Freek Challan Receipt",
                    description: "You must always receive a proper challan receipt for any fine you pay, whether physical or digital. Do not pay without one."
                }
            ]
        },
        {
            id: "property",
            title: "Property Dispute Rights",
            icon: "🏠",
            summary: "Legal protections for property owners and tenants.",
            category: "civil",
            details: [
                {
                    title: "Protection Against Illegal Eviction",
                    description: "A tenant cannot be evicted without due process of law and a proper court order, regardless of the rent agreement status."
                },
                {
                    title: "Right to Peaceful Possession",
                    description: "If you have peaceful and settled possession of a property, you cannot be dispossessed by force, even by the true owner, without a court order."
                },
                {
                    title: "Ancestral Property Rights",
                    description: "Daughters have equal rights as sons in Hindu ancestral property, irrespective of whether they were born before or after the 2005 amendment."
                }
            ]
        },
        {
            id: "domestic",
            title: "Protection from Domestic Violence",
            icon: "⚖️",
            summary: "Immediate legal recourse for victims of abuse.",
            category: "criminal",
            details: [
                {
                    title: "Right to Reside in Shared Household",
                    description: "A woman has the right to reside in her matrimonial or shared household, regardless of whether she has any legal title to the property."
                },
                {
                    title: "Protection Orders",
                    description: "You can approach the magistrate for a protection order to prevent the abuser from committing further acts of violence or communicating with you."
                },
                {
                    title: "Right to Monetary Relief",
                    description: "The court can order the abuser to pay monetary relief to meet the expenses incurred and losses suffered as a result of the domestic violence."
                },
                {
                    title: "Zero FIR",
                    description: "You can file a First Information Report (FIR) at any police station, irrespective of where the incident occurred. It will be transferred to the correct jurisdiction later."
                }
            ]
        }
    ];

    const filteredData = topic === "all" ? rightsData : rightsData.filter(r => r.id === topic);

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Sidebar role="client" />

            <main className="lg:col-span-3 space-y-6">
                <header>
                    <h1 className="text-3xl font-bold text-white">Know Your Rights</h1>
                    <p className="text-[#ffcc99] mt-1">Simple explanations of your legal protections in various situations</p>
                </header>

                {/* Filters */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setTopic("all")}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${topic === "all" ? "bg-[#ffcc99] text-black" : "bg-[#1a1a1a] text-white border border-[#333] hover:border-[#ffcc99]"}`}
                    >
                        All Rights
                    </button>
                    <button
                        onClick={() => setTopic("challan")}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${topic === "challan" ? "bg-[#ffcc99] text-black" : "bg-[#1a1a1a] text-white border border-[#333] hover:border-[#ffcc99]"}`}
                    >
                        Traffic & Police
                    </button>
                    <button
                        onClick={() => setTopic("property")}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${topic === "property" ? "bg-[#ffcc99] text-black" : "bg-[#1a1a1a] text-white border border-[#333] hover:border-[#ffcc99]"}`}
                    >
                        Property
                    </button>
                    <button
                        onClick={() => setTopic("domestic")}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${topic === "domestic" ? "bg-[#ffcc99] text-black" : "bg-[#1a1a1a] text-white border border-[#333] hover:border-[#ffcc99]"}`}
                    >
                        Domestic Issues
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {filteredData.map((data, idx) => (
                        <RightsCard
                            key={idx}
                            title={data.title}
                            icon={data.icon}
                            summary={data.summary}
                            details={data.details}
                        />
                    ))}
                    {filteredData.length === 0 && (
                        <div className="col-span-2 text-center py-12 text-gray-400 bg-[#1a1a1a] rounded-2xl border border-[#333]">
                            No rights information found for this topic.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
