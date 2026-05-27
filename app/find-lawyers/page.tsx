"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Star, MapPin, Calendar, Scale, Phone, Mail, Search, Filter, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Fuse from "fuse.js";

interface Advocate {
  _id: string;
  name: string;
  email: string;
  phone: string;
  barRegistrationNumber: string;
  experience: string;
  caseTypes: string;
  pricePerAppearance: string;
  court: string;
  state: string;
  image: string;
  rating?: number;
  casesCount?: number;
  createdAt?: string;
}

export default function FindLawyers() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const res = await fetch("/api/advocates");
        if (res.ok) {
          const data = await res.json();
          setAdvocates(data);
        }
      } catch (err) {
        console.error("Failed to fetch advocates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvocates();
  }, []);

  // Get unique values for filters dynamically based on fetched advocates
  const states = useMemo(() => {
    return [...new Set(advocates.map(adv => adv.state).filter(Boolean))];
  }, [advocates]);

  const specializations = useMemo(() => {
    return [...new Set(advocates.flatMap(adv =>
      (adv.caseTypes || "").split(",").map(type => type.trim()).filter(Boolean)
    ))];
  }, [advocates]);

  // Set up Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(advocates, {
      keys: ["name", "caseTypes", "court", "state"],
      threshold: 0.35, // Adjust threshold for search sensitivity (lower is stricter)
    });
  }, [advocates]);

  // Filter advocates based on search and filters
  const filteredAdvocates = useMemo(() => {
    let results = advocates;

    // Apply Fuse.js fuzzy search if search term is provided
    if (searchTerm.trim() !== "") {
      results = fuse.search(searchTerm).map(r => r.item);
    }

    // Apply secondary filters
    return results.filter(advocate => {
      const matchesState = !selectedState || advocate.state === selectedState;

      const matchesSpecialization = !selectedSpecialization ||
        (advocate.caseTypes || "").toLowerCase().includes(selectedSpecialization.toLowerCase());

      const matchesExperience = !selectedExperience ||
        (selectedExperience === "0-5" && parseInt(advocate.experience || "0") <= 5) ||
        (selectedExperience === "5-10" && parseInt(advocate.experience || "0") > 5 && parseInt(advocate.experience || "0") <= 10) ||
        (selectedExperience === "10+" && parseInt(advocate.experience || "0") > 10);

      return matchesState && matchesSpecialization && matchesExperience;
    });
  }, [advocates, searchTerm, selectedState, selectedSpecialization, selectedExperience, fuse]);

  const formatCaseTypes = (caseTypes: string) => {
    return (caseTypes || "")
      .split(",")
      .map((type) => type.trim())
      .filter((type) => type.length > 0);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("");
    setSelectedSpecialization("");
    setSelectedExperience("");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] py-12 px-4 border-b border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Find Expert Advocates</h1>
          <p className="text-[#ffcc99] text-lg mb-8 max-w-2xl mx-auto">
            Connect with verified legal professionals across India. Get expert guidance for your legal matters.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, specialization, or court..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#1a1a1a] border border-[#ffcc99] text-white placeholder-gray-400 focus:outline-none focus:border-[#ffe0b3]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] px-6 py-4 rounded-lg font-semibold flex items-center gap-2"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters Section */}
        {showFilters && (
          <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#ffcc99]">Filter Advocates</h3>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black"
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium text-[#ffe0b3] mb-2">State</label>
                <select
                  className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Specialization Filter */}
              <div>
                <label className="block text-sm font-medium text-[#ffe0b3] mb-2">Specialization</label>
                <select
                  className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-[#ffe0b3] mb-2">Experience</label>
                <select
                  className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none"
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                >
                  <option value="">Any Experience</option>
                  <option value="0-5">0-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#ffe0b3]">
            {loading ? (
              "Loading advocates..."
            ) : (
              `Showing ${filteredAdvocates.length} advocate${filteredAdvocates.length !== 1 ? "s" : ""}${searchTerm ? ` for "${searchTerm}"` : ""}`
            )}
          </p>
        </div>

        {/* Advocates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[#1a1a1a] border border-[#333] rounded-lg h-[400px] animate-pulse"></div>
            ))}
          </div>
        ) : filteredAdvocates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdvocates.map((advocate) => {
              const caseTypesList = formatCaseTypes(advocate.caseTypes);

              return (
                <Card
                  key={advocate._id}
                  className="bg-[#1a1a1a] border border-[#ffcc99] hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300 text-white flex flex-col justify-between"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <Image
                        src={advocate.image || "/placeholder.svg?height=120&width=120"}
                        alt={advocate.name}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-[#ffcc99] object-cover h-[120px] w-[120px]"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Verified
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Adv. {advocate.name}</h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-[#ffcc99] text-[#ffcc99]" />
                        <span className="text-sm font-medium ml-1 text-[#ffe0b3]">{advocate.rating || 4.5}</span>
                      </div>
                      <span className="text-[#666]">•</span>
                      <span className="text-sm text-[#ffcc99]">{advocate.casesCount || 120} cases</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#ffcc99]">
                        <Calendar className="h-4 w-4" />
                        <span>{advocate.experience} years experience</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#ffcc99]">
                        <MapPin className="h-4 w-4" />
                        <span>{advocate.court}, {advocate.state}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#ffcc99]">
                        <Scale className="h-4 w-4" />
                        <span>Bar ID: {advocate.barRegistrationNumber}</span>
                      </div>

                      <div className="pt-2">
                        <h4 className="font-medium text-white mb-2 text-sm">Specializations:</h4>
                        <div className="flex flex-wrap gap-1">
                          {caseTypesList.slice(0, 3).map((caseType, index) => (
                            <Badge
                              key={index}
                              className="bg-[#2b2b2b] text-[#ffe0b3] border border-[#ffcc99] text-xs hover:bg-[#ffcc99] hover:text-black"
                            >
                              {caseType}
                            </Badge>
                          ))}
                          {caseTypesList.length > 3 && (
                            <Badge className="bg-[#2b2b2b] text-[#ffe0b3] border border-[#ffcc99] text-xs">
                              +{caseTypesList.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#333] pt-4 mt-4">
                      <div className="space-y-2">
                        <Button className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold">
                          Book Consultation (₹{advocate.pricePerAppearance || "1500"})
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Advocate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Scale className="h-16 w-16 text-[#ffcc99] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Advocates Found</h3>
            <p className="text-[#ffcc99] mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={clearFilters}
              className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3]"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}