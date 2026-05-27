"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { vlogsData, Vlog } from "@/lib/vlogsData";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Search, Play, Clock, Calendar, User, ArrowRight } from "lucide-react";

export default function VlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(vlogsData.map(v => v.category))];
  }, []);

  const filteredVlogs = useMemo(() => {
    return vlogsData.filter(vlog => {
      const matchesSearch =
        vlog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vlog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vlog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || vlog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#ffcc99]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero Banner Section */}
      <div className="relative border-b border-[#1f1f1f] bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffcc99] font-bold mb-3 inline-block">
            Legal Literacy Initiative
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcc99] to-[#ffe0b3]">Rights</span>
          </h1>
          <p className="text-[#ffe0b3]/80 text-lg max-w-2xl mx-auto mb-8">
            Access free educational legal vlogs created by verified legal professionals. Empower yourself with knowledge of Indian laws.
          </p>

          {/* Search bar inside Hero */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search legal topics, laws, or tags..."
              className="w-full pl-12 pr-4 py-6 rounded-xl bg-[#151515]/90 border border-[#ffcc99]/40 text-white placeholder-gray-500 focus:border-[#ffcc99] focus:ring-1 focus:ring-[#ffcc99] focus:outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#ffcc99] text-black shadow-lg shadow-[#ffcc99]/10"
                  : "bg-[#1a1a1a] text-[#ffcc99] border border-[#ffcc99]/20 hover:bg-[#ffcc99]/15 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Vlogs Grid */}
        {filteredVlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVlogs.map((vlog) => (
              <Link key={vlog.slug} href={`/vlogs/${vlog.slug}`} className="group">
                <Card className="bg-[#141414] border border-[#ffcc99]/20 hover:border-[#ffcc99] hover:shadow-xl hover:shadow-[#ffcc99]/5 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden group-hover:-translate-y-1">
                  {/* Thumbnail / Video Preview area */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#222]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                    {/* Fallback styling if image is missing */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2a1b10] to-[#121212]">
                      <span className="text-5xl opacity-40">⚖️</span>
                    </div>
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="p-4 rounded-full bg-[#ffcc99] text-black transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="h-6 w-6 fill-current" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-md font-mono flex items-center gap-1 z-20 border border-white/10">
                      <Clock className="h-3 w-3" />
                      {vlog.duration}
                    </span>
                    {/* Category tag */}
                    <span className="absolute top-3 left-3 bg-[#ffcc99] text-black text-xs font-bold px-2.5 py-1 rounded-md uppercase z-20 tracking-wider">
                      {vlog.category}
                    </span>
                  </div>

                  <CardHeader className="p-5 pb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#ffcc99] transition-colors line-clamp-2 leading-snug">
                      {vlog.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="p-5 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {vlog.description}
                    </p>

                    <div className="border-t border-[#222] pt-4 mt-auto">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1.5 text-[#ffe0b3]/70">
                          <User className="h-3.5 w-3.5 text-[#ffcc99]" />
                          <span>{vlog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{vlog.uploadDate}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#ffcc99] group-hover:text-white transition-colors">
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-[#ffcc99]/20 rounded-2xl max-w-xl mx-auto bg-[#141414]">
            <Search className="h-16 w-16 text-[#ffcc99]/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Vlogs Found</h3>
            <p className="text-gray-400 max-w-xs mx-auto mb-6">
              We couldn't find any vlogs matching your current search parameters.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 bg-[#ffcc99] text-black font-semibold rounded-lg hover:bg-[#ffe0b3] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
