"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Search, Filter, Plus, MoreHorizontal, ChevronDown } from "lucide-react";
import Fuse from "fuse.js";

const mockCases = [
    { id: "1", caseNo: "CS/2023/104", title: "Rajesh Kumar vs. State", court: "District Court, Delhi", type: "Civil Suit", status: "Active", nextHearing: "2026-03-05" },
    { id: "2", caseNo: "BA/2024/012", title: "Bail App: Suresh Singh", court: "High Court, Delhi", type: "Criminal", status: "Active", nextHearing: "2026-03-10" },
    { id: "3", caseNo: "MACT/22/041", title: "Amit Sharma MACT Claim", court: "Saket Court", type: "MACT", status: "Stayed", nextHearing: "2026-04-12" },
    { id: "4", caseNo: "CRA/2021/89", title: "State vs. Vikas", court: "High Court, Punjab", type: "Criminal", status: "Disposed", nextHearing: "N/A" },
    { id: "5", caseNo: "WP/2024/005", title: "Green Tech vs UoI", court: "Supreme Court", type: "Writ", status: "Active", nextHearing: "2026-03-22" },
];

export default function CasesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    let filteredCases = mockCases;

    if (searchTerm) {
        const fuse = new Fuse(mockCases, {
            keys: ["caseNo", "title", "type", "court"],
            threshold: 0.4, // Lower threshold = stricter matching
            minMatchCharLength: 2,
        });
        filteredCases = fuse.search(searchTerm).map(result => result.item);
    }

    if (statusFilter !== "All") {
        filteredCases = filteredCases.filter(c => c.status === statusFilter);
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Case Directory</h1>
                    <p className="text-[#a0a0a0]">Manage your active, disposed, and stayed matters.</p>
                </div>
                <Button className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold">
                    <Link href="/lawyer-dashboard/cases/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Case
                    </Link>
                </Button>
            </div>

            <Card className="bg-[#111] border-[#333]">
                <CardHeader className="p-4 border-b border-[#222]">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#888]" />
                            <input
                                type="text"
                                placeholder="Search by case number or title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2 pl-9 pr-4 text-white placeholder-[#888] focus:border-[#ffcc99] focus:outline-none text-sm transition-colors"
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none bg-[#1a1a1a] border border-[#333] text-white rounded-lg py-2 pl-4 pr-10 hover:border-[#555] focus:outline-none focus:border-[#ffcc99] text-sm cursor-pointer"
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Active">Active</option>
                                    <option value="Stayed">Stayed</option>
                                    <option value="Disposed">Disposed</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#888] pointer-events-none" />
                            </div>
                            <Button variant="outline" className="border-[#333] text-[#ccc] hover:bg-[#1a1a1a] hover:text-white">
                                <Filter className="h-4 w-4 mr-2" />
                                More Filters
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#ccc]">
                        <thead className="bg-[#1a1a1a] text-[#888]">
                            <tr>
                                <th className="px-6 py-4 border-b border-[#222] font-medium">Case Info</th>
                                <th className="px-6 py-4 border-b border-[#222] font-medium">Court & Type</th>
                                <th className="px-6 py-4 border-b border-[#222] font-medium">Next Hearing</th>
                                <th className="px-6 py-4 border-b border-[#222] font-medium">Status</th>
                                <th className="px-6 py-4 border-b border-[#222] font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#222]">
                            {filteredCases.map((c) => (
                                <tr key={c.id} className="hover:bg-[#151515] transition-colors group">
                                    <td className="px-6 py-4">
                                        <Link href={`/lawyer-dashboard/cases/${c.id}`} className="block">
                                            <p className="font-semibold text-white group-hover:text-[#ffcc99] transition-colors">{c.caseNo}</p>
                                            <p className="text-[#888] text-xs mt-0.5">{c.title}</p>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-white">{c.court}</p>
                                        <p className="text-[#888] text-xs mt-0.5">{c.type}</p>
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {c.nextHearing}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${c.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            c.status === 'Stayed' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                            }`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" className="h-8 w-8 p-0 px-2 py-1 text-xs text-[#888] hover:text-white hover:bg-[#222]">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredCases.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-[#888]">
                                        No cases found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}
