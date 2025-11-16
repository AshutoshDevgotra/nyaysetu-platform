"use client"

import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Star, MapPin, Calendar, Scale, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Advocate {
  id: string
  fullName: string
  email: string
  phone: string
  barCouncilId: string
  experience: string
  caseTypes: string
  pricePerAppearance: string
  court: string
  state: string
  image: string
  createdAt: any
}

interface ExpertProfilesProps {
  teaser?: boolean;
}

export default function ExpertProfiles({ teaser = false }: ExpertProfilesProps) {
  const [advocates, setAdvocates] = useState<Advocate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      state: "Bombay",
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
  fullName: "Adv. Sakshi Baadkar",
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
  fullName: "Adv. Sagar Panghal",
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
  fullName: "Adv. Mandeep Baisla",
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

  ]

  useEffect(() => {
    // Simulate loading time
    setLoading(true)
    setTimeout(() => {
      setAdvocates(staticAdvocates)
      setLoading(false)
    }, 1000)
  }, [])

  const formatCaseTypes = (caseTypes: string) => {
    return caseTypes
      .split(",")
      .map((type) => type.trim())
      .filter((type) => type.length > 0)
  }

  const generateRating = () => {
    // Generate a random rating between 4.0 and 5.0 for demo purposes
    return (4.0 + Math.random()).toFixed(1)
  }

  const generateCaseCount = () => {
    // Generate a random case count for demo purposes
    return Math.floor(Math.random() * 500) + 50
  }

  if (loading) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Connect with Expert Advocates</h2>
            <p className="text-[#ffcc99] max-w-2xl mx-auto">
              Find experienced legal professionals specializing in various areas of Indian law.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-6 animate-pulse">
                <div className="text-center pb-4">
                  <div className="w-32 h-32 bg-[#333] rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-[#333] rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-[#333] rounded w-1/2 mx-auto"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-[#333] rounded w-full"></div>
                  <div className="h-4 bg-[#333] rounded w-3/4"></div>
                  <div className="h-4 bg-[#333] rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Connect with Expert Advocates</h2>
            <div className="bg-[#1a1a1a] border border-red-500 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-400">{error}</p>
              <Button onClick={() => {}} className="mt-2 bg-[#ffcc99] text-black hover:bg-[#ffe0b3]">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (advocates.length === 0) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Connect with Expert Advocates</h2>
            <p className="text-[#ffcc99] max-w-2xl mx-auto">
              Find experienced legal professionals specializing in various areas of Indian law.
            </p>
          </div>
          <div className="text-center py-12">
            <Scale className="h-16 w-16 text-[#ffcc99] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Advocates Found</h3>
            <p className="text-[#ffcc99] mb-4">Be the first advocate to register on our platform!</p>
            <a href="/lawyer-register">
              <Button className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3]">
                Register as Advocate
              </Button>
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (teaser) {
    const teaserList = staticAdvocates.slice(0, 8);
    const loop = [...teaserList, ...teaserList];
    return (
      <section className="bg-[#0f0f0f] py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Top Verified Advocates</h2>
            <p className="text-[#ffcc99]">Peek at a few profiles — verified via Bar Council ID & Aadhaar-linked auth.</p>
          </div>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 blur-sm" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 blur-sm" />
            <motion.div className="flex gap-4" initial={{ x: 0 }} animate={{ x: [0, -800, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
              {loop.map((adv, idx) => (
                <div key={`${adv.id}-${idx}`} className="shrink-0 bg-[#1a1a1a] border border-[#ffcc99] rounded-xl p-4 w-[260px] hover:shadow-lg hover:shadow-[#ffcc99]/20 transition hover-zoom">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={adv.image} alt={adv.fullName} width={48} height={48} className="rounded-full border-2 border-[#ffcc99] object-cover" />
                    <div>
                      <div className="text-white font-semibold text-sm">Adv. {adv.fullName}</div>
                      <div className="text-[#ffe0b3] text-xs">{adv.court}</div>
                    </div>
                  </div>
                  <div className="text-secondary text-xs line-clamp-2">{adv.caseTypes}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="text-center mt-6">
            <a href="/find-lawyers" className="inline-block px-6 py-3 rounded-lg border-2 brand-border brand hover:bg-[#ffcc99] hover:text-black transition">View all advocates</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Connect with Expert Advocates</h2>
          <p className="text-[#ffcc99] max-w-2xl mx-auto">
            Find experienced legal professionals specializing in various areas of Indian law. Get expert guidance for
            your legal matters with our verified advocates.
          </p>
          <p className="text-sm text-[#ffe0b3] mt-2">
            {advocates.length} verified advocate{advocates.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advocates.map((advocate) => {
            const caseTypesList = formatCaseTypes(advocate.caseTypes)
            const rating = generateRating()
            const caseCount = generateCaseCount()

            return (
              <motion.div
                key={advocate.id}
                className="bg-[#1a1a1a] brand-border border hover:shadow-lg hover:shadow-[#ffcc99]/20 transition-all duration-300 text-white rounded-lg"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.45 }}
              >
              <Card
                className="bg-transparent border-0 text-white"
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4 border-[#ffcc99] overflow-visible">
                    <Image
                      src={advocate.image || "/placeholder.svg?height=150&width=150"}
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
                    <span className="text-sm font-medium ml-1 text-secondary">{rating}</span>
                    </div>
                    <span className="text-[#666]">•</span>
                    <span className="text-sm text-[#ffcc99]">{caseCount} cases</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm brand">
                    <Calendar className="h-4 w-4" />
                    <span>{advocate.experience} years experience</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm brand">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {advocate.court}, {advocate.state}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm brand">
                    <Scale className="h-4 w-4" />
                    <span>Bar ID: {advocate.barCouncilId}</span>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Specializations:</h4>
                    <div className="flex flex-wrap gap-1">
                      {caseTypesList.map((caseType, index) => (
                        <Badge
                          key={index}
                          className="bg-[#2b2b2b] text-secondary brand-border border text-xs hover:bg-[#ffcc99] hover:text-black"
                        >
                          {caseType}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#ffcc99]">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{advocate.phone}</span>
                    </div>
                  </div>

                  <div className="border-t border-[#333] pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-[#ffcc99]">Court Appearance:</span>
                      <span className="font-semibold text-[#ffe0b3]">₹{advocate.pricePerAppearance}</span>
                    </div>
                                          <div className="space-y-2">
                        <Button 
                          onClick={() => window.location.href = '/appointment-form'}
                          className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-semibold"
                        >
                          Book Consultation
                        </Button>
                        <Button
                          onClick={() => window.open(`mailto:${advocate.email}?subject=Legal Consultation Inquiry&body=Dear Adv. ${advocate.fullName},%0A%0AI am interested in consulting with you regarding a legal matter. Please let me know your availability.%0A%0AThank you.`, '_blank')}
                          variant="outline"
                          className="w-full border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Advocate
                        </Button>
                      </div>
                  </div>

                  <div className="text-xs text-[#666] text-center">
                    Registered: {advocate.createdAt?.toLocaleDateString() || "Recently"}
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => {}}
            variant="outline"
            size="default"
            className="border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black"
          >
            Refresh Advocates
          </Button>
        </div>
      </div>
    </div>
  )
}
