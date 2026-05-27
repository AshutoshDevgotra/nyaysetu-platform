"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Briefcase,
  Clock,
  CalendarDays,
  AlertTriangle,
  FilePlus,
  FileText,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

// Mock Data
const stats = [
  { label: "Active Cases", value: "24", icon: Briefcase, color: "text-blue-400" },
  { label: "Hearings Today", value: "3", icon: CalendarDays, color: "text-amber-400" },
  { label: "Pending Documents", value: "7", icon: FileText, color: "text-green-400" },
];

const todaysHearings = [
  { id: 1, caseNo: "CS/2023/104", client: "Rajesh Kumar", court: "Court Room 4, THC", time: "10:30 AM", type: "Evidence" },
  { id: 2, caseNo: "BA/2024/012", client: "Suresh Singh", court: "Court Room 2, DHC", time: "02:15 PM", type: "Arguments" },
  { id: 3, caseNo: "MACT/22/041", client: "Amit Sharma", court: "Saket District Court", time: "04:00 PM", type: "Order" },
];

const limitationAlerts = [
  { id: 1, caseNo: "CS/2024/089", action: "File Written Statement", daysLeft: 2, priority: "high" },
  { id: 2, caseNo: "CRA/2023/211", action: "File Rejoinder", daysLeft: 5, priority: "medium" },
  { id: 3, caseNo: "WP/2024/005", action: "Submit Process Fee", daysLeft: 12, priority: "low" },
];

export default function LawyerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Welcome back, Adv. Sharma</h1>
          <p className="text-[#a0a0a0]">Here is your practice overview for today.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#1a1a1a] text-white border border-[#333] hover:bg-[#2a2a2a] gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
          <Button className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold gap-2">
            <Link href="/lawyer-dashboard/cases/new">
              <FilePlus className="h-4 w-4" />
              Add New Case
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#111] border-[#333] hover:border-[#555] transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#888] mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-[#1a1a1a] ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hearings Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#111] border-[#333]">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-[#222]">
              <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#ffcc99]" />
                Today's Hearings
              </CardTitle>
              <Button variant="ghost" className="text-sm text-[#ffcc99] hover:text-white hover:bg-transparent p-0">
                View Calendar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#222]">
                {todaysHearings.map((hearing) => (
                  <div key={hearing.id} className="p-4 hover:bg-[#1a1a1a] transition-colors flex items-center justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="py-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{hearing.caseNo}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-[#222] text-[#aaa] whitespace-nowrap">{hearing.type}</span>
                        </div>
                        <p className="text-sm text-[#888]">{hearing.client} • {hearing.court}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2 shrink-0 ml-4">
                      <span className="text-sm font-medium text-[#ffcc99] bg-[#1a1a1a] px-3 py-1 rounded-full group-hover:bg-[#222]">
                        {hearing.time}
                      </span>
                      <Button variant="outline" className="h-7 px-2 py-1 text-xs border-[#333] hover:border-[#ffcc99] hover:text-[#ffcc99]">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/lawyer-dashboard/documents">
              <Card className="h-full bg-gradient-to-br from-[#1a1a1a] to-[#111] border-[#333] hover:border-[#ffcc99] transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-[#ffcc99] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-1">Document Generator</h3>
                  <p className="text-sm text-[#888]">Draft petitions, plaints, and applications automatically.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/lawyer-dashboard/cases">
              <Card className="h-full bg-gradient-to-br from-[#1a1a1a] to-[#111] border-[#333] hover:border-[#ffcc99] transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <Briefcase className="h-8 w-8 text-[#ffcc99] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-1">Case Directory</h3>
                  <p className="text-sm text-[#888]">Access all your active and disposed cases.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Limitation Alerts */}
        <div className="space-y-6">
          <Card className="bg-[#111] border-[#333]">
            <CardHeader className="pb-4 border-b border-[#222]">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Limitation Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#222]">
                {limitationAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 hover:bg-[#1a1a1a] transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-white text-sm">{alert.caseNo}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 shrink-0 ml-2
                        ${alert.priority === 'high' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          alert.priority === 'medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            'bg-green-500/10 text-green-500 border border-green-500/20'}`}
                      >
                        <Clock className="h-3 w-3" />
                        {alert.daysLeft} Days
                      </span>
                    </div>
                    <p className="text-sm text-[#888]">{alert.action}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-[#222]">
                <Button variant="ghost" className="w-full text-sm text-[#aaa] hover:text-white">
                  View All Deadlines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
