"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import {
    Bot,
    Search,
    Scale,
    FileSearch,
    Clock,
    ArrowRight,
    ShieldAlert
} from "lucide-react";

const aiTools = [
    {
        title: "FIR Analyzer",
        description: "Upload or paste an FIR to instantly extract penal codes, involved parties, and actionable legal insights.",
        icon: FileSearch,
        href: "/lawyer-dashboard/ai-tools/fir-analyzer",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-500/20"
    },
    {
        title: "Judgment Finder",
        description: "Semantic search engine to find highly relevant past judgments based on case facts or legal queries.",
        icon: Search,
        href: "/lawyer-dashboard/ai-tools/judgment-finder",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-500/20"
    },
    {
        title: "Limitation Tracker",
        description: "Automatically compute statutory limitation periods and filing deadlines for various case types.",
        icon: Clock,
        href: "/lawyer-dashboard/ai-tools/limitation-tracker",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-500/20"
    },
    {
        title: "NDPS Quantity Classifier",
        description: "Determine if a seized narcotic quantity falls under Small, Intermediate, or Commercial categories to assess bail probability.",
        icon: ShieldAlert,
        href: "/lawyer-dashboard/ai-tools/ndps-classifier",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-500/20"
    }
];

export default function AIToolsHubPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Bot className="h-8 w-8 text-[#ffcc99]" />
                        AI Intelligence Hub
                    </h1>
                    <p className="text-[#a0a0a0] text-lg max-w-2xl">
                        Leverage domain-specific generative AI agents to accelerate legal research, analyze documents, and compute critical deadlines.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {aiTools.map((tool, idx) => (
                    <Link key={idx} href={tool.href} className="group">
                        <Card className={`h-full bg-[#111] border-[#333] hover:border-[#ffcc99] transition-all duration-300 relative overflow-hidden`}>
                            {/* Hover gradient background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <CardHeader className="relative z-10 flex flex-row items-start gap-4 pb-2">
                                <div className={`p-4 rounded-xl ${tool.bg} ${tool.border} border ring-1 ring-white/5 shadow-inner`}>
                                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-xl text-white group-hover:text-[#ffcc99] transition-colors">
                                        {tool.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10 pt-4">
                                <CardDescription className="text-[#888] text-base leading-relaxed mb-6">
                                    {tool.description}
                                </CardDescription>

                                <div className="flex items-center text-sm font-semibold text-[#ffcc99] group-hover:translate-x-1 transition-transform">
                                    Launch Tool <ArrowRight className="h-4 w-4 ml-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#333] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <Scale className="h-10 w-10 text-[#555] shrink-0 mt-1" />
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-1">Coming Soon: Draft Reviewer</h3>
                        <p className="text-[#888] max-w-xl">
                            An AI agent designed to read your drafted plaints and petitions, cross-checking them against High Court formatting rules and identifying highly-probabilistic omissions before filing.
                        </p>
                    </div>
                </div>
                <div className="px-4 py-2 rounded-full border border-[#333] bg-[#111] text-xs font-mono text-[#666] uppercase tracking-wider whitespace-nowrap">
                    In Development
                </div>
            </div>
        </div>
    );
}
