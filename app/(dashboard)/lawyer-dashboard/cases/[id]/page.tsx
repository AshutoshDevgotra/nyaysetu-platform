"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Edit, FileText, UploadCloud, Calendar, User, MapPin, Scale } from "lucide-react";
import { useParams } from "next/navigation";

// Mock Data targeting ID
const caseData = {
    id: "1",
    caseNo: "CS/2023/104",
    title: "Rajesh Kumar vs. State of Delhi",
    court: "District Court, Delhi (Court Room 4)",
    judge: "Hon'ble Mr. Justice A.K. Sharma",
    type: "Civil Suit",
    status: "Active",
    filingDate: "12 Oct 2023",
    client: { name: "Rajesh Kumar", phone: "+91 9876543210", email: "rajesh.k@example.com" },
    opposing: { name: "State of Delhi", counsel: "Adv. Meera Singh" },
    timeline: [
        { id: 101, date: "15 Oct 2023", title: "Case Filed", desc: "Plaint submitted and scrutinized by the registry.", past: true },
        { id: 102, date: "02 Nov 2023", title: "First Hearing", desc: "Summons issued to the opposing party.", past: true },
        { id: 103, date: "20 Dec 2023", title: "Written Statement", desc: "Opposing party filed their written statement.", past: true },
        { id: 104, date: "05 Mar 2026", title: "Evidence Stage", desc: "Plaintiff to produce witnesses.", past: false, active: true },
        { id: 105, date: "12 Apr 2026", title: "Final Arguments", desc: "Listed for final arguments.", past: false },
    ]
};

export default function CaseDetailPage() {
    const params = useParams();
    // In a real app, 'params.id' is used to fetch the data.

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="p-2 text-[#888] hover:text-white hover:bg-[#1a1a1a]">
                        <Link href="/lawyer-dashboard/cases">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-white">{caseData.caseNo}</h1>
                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border bg-green-500/10 text-green-500 border-green-500/20">
                                {caseData.status}
                            </span>
                        </div>
                        <p className="text-sm text-[#a0a0a0]">{caseData.title}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-[#333] text-[#ccc] hover:bg-[#1a1a1a] hover:text-white">
                        <Edit className="h-4 w-4 mr-2" /> Edit Details
                    </Button>
                    <Button className="bg-[#1a1a1a] text-[#ffcc99] border border-[#ffcc99] hover:bg-[#ffcc99] hover:text-black transition-colors">
                        <UploadCloud className="h-4 w-4 mr-2" /> Upload Document
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Col: Case Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-[#111] border-[#333]">
                        <CardHeader className="border-b border-[#222] pb-4">
                            <CardTitle className="text-lg text-white">Case Information</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                            <div className="flex gap-3">
                                <MapPin className="h-5 w-5 text-[#888] shrink-0" />
                                <div>
                                    <p className="text-xs text-[#888] mb-1">Court & Judge</p>
                                    <p className="text-sm text-white font-medium">{caseData.court}</p>
                                    <p className="text-xs text-[#aaa] mt-1">{caseData.judge}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Scale className="h-5 w-5 text-[#888] shrink-0" />
                                <div>
                                    <p className="text-xs text-[#888] mb-1">Case Type</p>
                                    <p className="text-sm text-white font-medium">{caseData.type}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Calendar className="h-5 w-5 text-[#888] shrink-0" />
                                <div>
                                    <p className="text-xs text-[#888] mb-1">Filing Date</p>
                                    <p className="text-sm text-white font-medium">{caseData.filingDate}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <FileText className="h-5 w-5 text-[#888] shrink-0" />
                                <div>
                                    <p className="text-xs text-[#888] mb-1">Connected Matters</p>
                                    <p className="text-sm text-white font-medium">None</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-[#111] border-[#333]">
                            <CardHeader className="border-b border-[#222] pb-4">
                                <CardTitle className="text-base text-white flex items-center gap-2">
                                    <User className="h-4 w-4 text-[#ffcc99]" /> Client Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <p className="text-xs text-[#888]">Name</p>
                                    <p className="text-sm text-white font-medium">{caseData.client.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#888]">Contact</p>
                                    <p className="text-sm text-white">{caseData.client.phone}</p>
                                    <p className="text-sm text-white">{caseData.client.email}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#111] border-[#333]">
                            <CardHeader className="border-b border-[#222] pb-4">
                                <CardTitle className="text-base text-white flex items-center gap-2">
                                    <User className="h-4 w-4 text-red-400" /> Opposing Party
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <p className="text-xs text-[#888]">Name</p>
                                    <p className="text-sm text-white font-medium">{caseData.opposing.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#888]">Opposing Counsel</p>
                                    <p className="text-sm text-white">{caseData.opposing.counsel}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Col: Hearing Timeline UI */}
                <div className="space-y-6">
                    <Card className="bg-[#111] border-[#333] h-full flex flex-col">
                        <CardHeader className="border-b border-[#222] pb-4 sticky top-0 bg-[#111] z-10 rounded-t-xl">
                            <CardTitle className="text-lg text-white">Hearing Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 flex-1">
                            <div className="relative border-l-2 border-[#333] ml-3 space-y-8">
                                {caseData.timeline.map((item) => (
                                    <div key={item.id} className="relative pl-6">
                                        {/* Timeline Dot */}
                                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-[#111] ${item.active ? 'bg-[#ffcc99] shadow-[0_0_10px_rgba(255,204,153,0.5)]' :
                                            item.past ? 'bg-blue-500' :
                                                'bg-[#444]'
                                            }`} />

                                        <div className={`${item.active ? 'bg-[#1a1a1a] border border-[#ffcc99]/30 rounded-lg p-3 -mt-2 -ml-2' : ''}`}>
                                            <p className={`text-xs font-semibold mb-1 ${item.active ? 'text-[#ffcc99]' : item.past ? 'text-blue-400' : 'text-[#888]'}`}>
                                                {item.date}
                                            </p>
                                            <h4 className={`text-sm font-medium mb-1 ${item.past || item.active ? 'text-white' : 'text-[#aaa]'}`}>
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-[#888] leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
