"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
    ArrowLeft,
    Search,
    Filter,
    Scale,
    Sparkles,
    ChevronRight,
    Bookmark,
    ExternalLink
} from "lucide-react";

const mockResults = [
    {
        id: 1,
        title: "State of Punjab vs Raghubir Singh",
        citation: "2023 SCC OnLine P&H 1450",
        court: "Punjab and Haryana High Court",
        year: "2023",
        relevance: 94,
        aiSummary: "The court held that in cases under the NDPS Act where the recovered quantity is marginally above the 'intermediate' threshold, the rigor of Section 37 may be relaxed if conscious possession is not immediately established prima facie. Relevant to your query on border-line commercial quantities."
    },
    {
        id: 2,
        title: "Surjit Kumar vs Union territory of Chandigarh",
        citation: "2021 (4) RCR (Criminal) 801",
        court: "Punjab and Haryana High Court",
        year: "2021",
        relevance: 88,
        aiSummary: "Established that prolonged incarceration without framing of charges can be a standalone ground for bail even when the contraband quantity falls under the commercial bracket, invoking Article 21 rights."
    },
    {
        id: 3,
        title: "Gurmeet Singh vs State of Haryana",
        citation: "2018 (1) RCR (Criminal) 112",
        court: "Punjab and Haryana High Court",
        year: "2018",
        relevance: 76,
        aiSummary: "Discusses the importance of independent witnesses during recovery under Section 50 of the NDPS Act. Failure to join independent witnesses casts doubt on the prosecution's case."
    }
];

export default function JudgmentFinderPage() {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsSearching(true);
        setShowResults(false);
        setTimeout(() => {
            setIsSearching(false);
            setShowResults(true);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="p-2 text-[#888] hover:text-white hover:bg-[#1a1a1a]" asChild>
                    <Link href="/lawyer-dashboard/ai-tools">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Search className="h-6 w-6 text-amber-400" />
                        Semantic Judgment Finder
                    </h1>
                    <p className="text-[#888] text-sm">Natural language search across the Punjab & Haryana High Court database.</p>
                </div>
            </div>

            <Card className="bg-[#111] border-[#333]">
                <CardContent className="p-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#888]" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Describe your legal scenario (e.g., 'Bail in NDPS case when recovery is slightly above commercial quantity but no independent witness present')"
                                className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl py-4 pl-12 pr-4 text-white text-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder-[#555]"
                            />
                            <Button
                                type="submit"
                                disabled={isSearching || !query}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-400 text-black hover:bg-amber-500 font-semibold"
                            >
                                {isSearching ? "Searching..." : "Find Precedents"}
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-1.5">
                                <Filter className="h-4 w-4 text-[#888]" />
                                <select className="bg-transparent text-[#ccc] text-sm focus:outline-none">
                                    <option>Bench: All</option>
                                    <option>P&H High Court</option>
                                    <option>Supreme Court</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-1.5">
                                <select className="bg-transparent text-[#ccc] text-sm focus:outline-none">
                                    <option>Year: Last 5 Years</option>
                                    <option>Year: Last 10 Years</option>
                                    <option>Year: All Time</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-1.5">
                                <select className="bg-transparent text-[#ccc] text-sm focus:outline-none">
                                    <option>Subject: All Matters</option>
                                    <option>Subject: Criminal</option>
                                    <option>Subject: Civil</option>
                                    <option>Subject: Constitution</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {isSearching && (
                <div className="flex justify-center py-12">
                    <div className="space-y-4 text-center">
                        <Sparkles className="h-10 w-10 text-amber-400 mx-auto animate-pulse" />
                        <p className="text-amber-400/80 font-medium">Vectorizing query and searching knowledge graph...</p>
                    </div>
                </div>
            )}

            {showResults && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Top Relevant Judgments</h2>
                        <span className="text-[#888] text-sm">3 results found in 1.4s</span>
                    </div>

                    <div className="space-y-4">
                        {mockResults.map((result) => (
                            <Card key={result.id} className="bg-[#111] border-[#333] hover:border-[#555] transition-colors group">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                                                        {result.title}
                                                    </h3>
                                                    <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold shrink-0 border border-green-500/20">
                                                        {result.relevance}% Match
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-[#888]">
                                                    <span className="text-[#ccc] font-medium">{result.citation}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><Scale className="h-3 w-3" /> {result.court}</span>
                                                    <span>•</span>
                                                    <span>{result.year}</span>
                                                </div>
                                            </div>

                                            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-amber-400/20 relative">
                                                <Sparkles className="absolute -top-3 -left-3 h-6 w-6 text-amber-400 bg-[#111] rounded-full p-1 border border-[#333]" />
                                                <h4 className="text-amber-400 text-xs font-bold uppercase mb-2 tracking-wider">AI Relevance Summary</h4>
                                                <p className="text-[#ccc] text-sm leading-relaxed">{result.aiSummary}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col gap-2 shrink-0 md:w-48">
                                            <Button className="flex-1 md:flex-none w-full bg-[#1a1a1a] text-white hover:bg-[#222] border border-[#333]">
                                                Read Full Text <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                            <Button variant="outline" className="flex-1 md:flex-none w-full border-[#333] text-[#ccc] hover:bg-[#1a1a1a] hover:text-white">
                                                <Bookmark className="h-4 w-4 mr-2" /> Save to Folder
                                            </Button>
                                            <Button variant="ghost" className="flex-1 md:flex-none w-full text-[#888] hover:text-white">
                                                <ExternalLink className="h-4 w-4 mr-2" /> PDF Version
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
