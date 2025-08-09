"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Star, MapPin, Calendar, Scale, Phone, Mail, Search, Filter, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

interface Advocate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  barCouncilId: string;
  experience: string;
  caseTypes: string;
  pricePerAppearance: string;
  court: string;
  state: string;
  image: string;
  createdAt: Date;
}

const staticAdvocates: Advocate[] = [
  {
    id: "1",
    fullName: "Pooja Patil",
    email: "advocatepoojapatil@gmail.com",
    phone: "+91 98765 43210",
    barCouncilId: "D/1234/2010",
    experience: "12",
    caseTypes: "Family Law, Divorce Cases, Child Custody, Domestic Violence",
    pricePerAppearance: "2500",
    court: "Bombay High Court",
    state: "Maharashtra",
    image: "/Advocates/PoojaPatil.jpeg",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "16",
    fullName: "Aditya Chauhan",
    email: "fixitaditya@gmail.com",
    phone: "+91 90000 10000",
    barCouncilId: "DL/2020/6789",
    experience: "4",
    caseTypes: "Criminal Law, Cyber Crime, Youth Cases",
    pricePerAppearance: "3000",
    court: "Tis Hazari Court",
    state: "Delhi",
    image: "/Advocates/AdityaChauhan.jpg",
    createdAt: new Date("2024-01-04"),
  },
  {
    id: "17",
    fullName: "Sakshi Baadkar",
    email: "sakshi@bombaybar.in",
    phone: "+91 98888 10001",
    barCouncilId: "MH/2021/4321",
    experience: "3",
    caseTypes: "Family Law, Women Rights, PIL",
    pricePerAppearance: "2500",
    court: "Bombay High Court",
    state: "Maharashtra",
    image: "/Advocates/SakshiBaadkar.jpg",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "18",
    fullName: "Amish Aggarwala",
    email: "amish@supremecourt.in",
    phone: "+91 98765 00000",
    barCouncilId: "DL/2015/3210",
    experience: "9",
    caseTypes: "Supreme Court, Constitutional Law, Criminal Appeals",
    pricePerAppearance: "20000",
    court: "Supreme Court of India",
    state: "Delhi",
    image: "/Advocates/AmishAggarwala.jpg",
    createdAt: new Date("2024-01-06"),
  },
  {
    id: "19",
    fullName: "Sagar Panghal",
    email: "sagar@scourt.in",
    phone: "+91 95555 11111",
    barCouncilId: "DL/2019/7654",
    experience: "5",
    caseTypes: "Criminal Law, Podcast Legal Reviews, Public Policy",
    pricePerAppearance: "4000",
    court: "Delhi High Court",
    state: "Delhi",
    image: "/Advocates/SagarPanghal.jpg",
    createdAt: new Date("2024-01-07"),
  },
  {
    id: "20",
    fullName: "Vipin Poria",
    email: "vipin@scindia.org",
    phone: "+91 93121 59058",
    barCouncilId: "DL/2010/5566",
    experience: "12",
    caseTypes: "Supreme Court, Constitutional Law, Civil Appeals",
    pricePerAppearance: "12000",
    court: "Supreme Court of India",
    state: "Delhi",
    image: "/Advocates/VipinPoria.jpg",
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "21",
    fullName: "Mandeep Baisla",
    email: "mandeepbaisla@gmail.com",
    phone: "+91 94444 33333",
    barCouncilId: "DL/2012/7788",
    experience: "11",
    caseTypes: "Criminal Law, Bail, Youth Legal Awareness",
    pricePerAppearance: "5000",
    court: "Supreme Court of India",
    state: "Delhi",
    image: "/Advocates/MandeepBaisla.jpg",
    createdAt: new Date("2024-01-09"),
  },
  {
    id: "22",
    fullName: "Kanika Bhardwaj",
    email: "kanika@saketcourt.in",
    phone: "+91 90001 88888",
    barCouncilId: "DL/2016/5432",
    experience: "7",
    caseTypes: "Civil, Matrimonial, Bail, Criminal Law",
    pricePerAppearance: "6000",
    court: "Saket District Court",
    state: "Delhi",
    image: "/Advocates/KanikaBhardwaj.jpg",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "23",
    fullName: "Ayan Sharma",
    email: "ayan@vakeelsahaaab.in",
    phone: "+91 98761 23456",
    barCouncilId: "DL/2018/9843",
    experience: "6",
    caseTypes: "Criminal Law, Legal Strategy, Civil Disputes",
    pricePerAppearance: "5000",
    court: "Patiala House Court",
    state: "Delhi",
    image: "/Advocates/AyanSharma.jpg",
    createdAt: new Date("2024-01-11"),
  },
];

export default function FindLawyers() {
  const [advocates] = useState<Advocate[]>(staticAdvocates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const states = [...new Set(advocates.map(adv => adv.state))];
  const specializations = [...new Set(advocates.flatMap(adv => 
    adv.caseTypes.split(",").map(type => type.trim())
  ))];

  // Filter advocates based on search and filters
  const filteredAdvocates = useMemo(() => {
    return advocates.filter(advocate => {
      const matchesSearch = 
        advocate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.caseTypes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.court.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = !selectedState || advocate.state === selectedState;
      
      const matchesSpecialization = !selectedSpecialization || 
        advocate.caseTypes.toLowerCase().includes(selectedSpecialization.toLowerCase());
      
      const matchesExperience = !selectedExperience || 
        (selectedExperience === "0-5" && parseInt(advocate.experience) <= 5) ||
        (selectedExperience === "5-10" && parseInt(advocate.experience) > 5 && parseInt(advocate.experience) <= 10) ||
        (selectedExperience === "10+" && parseInt(advocate.experience) > 10);
      
      const matchesPrice = !priceRange ||
        (priceRange === "0-3000" && parseInt(advocate.pricePerAppearance) <= 3000) ||
        (priceRange === "3000-10000" && parseInt(advocate.pricePerAppearance) > 3000 && parseInt(advocate.pricePerAppearance) <= 10000) ||
        (priceRange === "10000+" && parseInt(advocate.pricePerAppearance) > 10000);

      return matchesSearch && matchesState && matchesSpecialization && matchesExperience && matchesPrice;
    });
  }, [advocates, searchTerm, selectedState, selectedSpecialization, selectedExperience, priceRange]);

  const formatCaseTypes = (caseTypes: string) => {
    return caseTypes
      .split(",")
      .map((type) => type.trim())
      .filter((type) => type.length > 0);
  };

  const generateRating = () => {
    return (4.0 + Math.random()).toFixed(1);
  };

  const generateCaseCount = () => {
    return Math.floor(Math.random() * 500) + 50;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedState("");
    setSelectedSpecialization("");
    setSelectedExperience("");
    setPriceRange("");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] py-12 px-4">
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
          <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-6 mb-8">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-[#ffe0b3] mb-2">Price Range</label>
                <select
                  className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-[#333] text-white focus:border-[#ffcc99] focus:outline-none"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-3000">₹0 - ₹3,000</option>
                  <option value="3000-10000">₹3,000 - ₹10,000</option>
                  <option value="10000+">₹10,000+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#ffe0b3]">
            Showing {filteredAdvocates.length} advocate{filteredAdvocates.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
          <div className="flex gap-2">
            <select className="p-2 rounded bg-[#1a1a1a] border border-[#333] text-white text-sm">
              <option>Sort by Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Experience: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Advocates Grid */}
        {filteredAdvocates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdvocates.map((advocate) => {
              const caseTypesList = formatCaseTypes(advocate.caseTypes);
              const rating = generateRating();
              const caseCount = generateCaseCount();

              return (
                <Card
                  key={advocate.id}
                  className="bg-[#1a1a1a] border border-[#ffcc99] hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300 text-white"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <Image
                        src={advocate.image || "/placeholder.svg?height=120&width=120"}
                        alt={advocate.fullName}
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-[#ffcc99] object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Verified
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Adv. {advocate.fullName}</h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-[#ffcc99] text-[#ffcc99]" />
                        <span className="text-sm font-medium ml-1 text-[#ffe0b3]">{rating}</span>
                      </div>
                      <span className="text-[#666]">•</span>
                      <span className="text-sm text-[#ffcc99]">{caseCount} cases</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
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
                      <span>Bar ID: {advocate.barCouncilId}</span>
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-2">Specializations:</h4>
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

                    <div className="border-t border-[#333] pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-[#ffcc99]">Court Appearance:</span>
                        <span className="font-semibold text-[#ffe0b3] text-lg">₹{advocate.pricePerAppearance}</span>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold">
                          Book Consultation
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