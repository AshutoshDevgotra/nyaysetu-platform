import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vlogsData, Vlog } from "@/lib/vlogsData";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ArrowLeft, Clock, Calendar, User, Video, ShieldAlert, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for Next.js build optimization
export async function generateStaticParams() {
  return vlogsData.map((vlog) => ({
    slug: vlog.slug,
  }));
}

// Dynamic SEO Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vlog = vlogsData.find((v) => v.slug === slug);

  if (!vlog) {
    return {
      title: "Vlog Not Found - NyaySetu",
      description: "The requested legal educational vlog could not be found.",
    };
  }

  return {
    title: `${vlog.title} | Know Your Rights`,
    description: vlog.description,
    keywords: [...vlog.tags, "Indian Law", "Legal Literacy", "NyaySetu", "Advocate Advice"],
    openGraph: {
      title: vlog.title,
      description: vlog.description,
      type: "video.other",
      url: `https://nyaysetu.in/vlogs/${vlog.slug}`,
      images: [
        {
          url: `https://nyaysetu.in${vlog.thumbnail}`,
          width: 1200,
          height: 630,
          alt: vlog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: vlog.title,
      description: vlog.description,
      images: [`https://nyaysetu.in${vlog.thumbnail}`],
    }
  };
}

export default async function VlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vlog = vlogsData.find((v) => v.slug === slug);

  if (!vlog) {
    notFound();
  }

  // Get related vlogs
  const relatedVlogs = vlogsData.filter((v) => v.slug !== slug).slice(0, 3);

  // Schema.org structured data for SEO rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": vlog.title,
    "description": vlog.description,
    "thumbnailUrl": [
      `https://nyaysetu.in${vlog.thumbnail}`
    ],
    "uploadDate": `${vlog.uploadDate}T09:00:00+05:30`,
    "duration": `PT${vlog.duration.split(":")[0]}M${vlog.duration.split(":")[1]}S`,
    "embedUrl": vlog.videoUrl,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": 3820
    },
    "regionsAllowed": "IN"
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-12 px-6">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/vlogs"
          className="inline-flex items-center gap-2 text-sm text-[#ffcc99] hover:text-[#ffe0b3] mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Legal Vlogs</span>
        </Link>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Embedded Video Player Container with Custom Glassmorphism styling */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#ffcc99]/30 bg-[#141414] shadow-2xl shadow-black">
              <iframe
                src={vlog.videoUrl}
                title={vlog.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-none"
              ></iframe>
            </div>

            {/* Video Meta Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#ffcc99] text-black font-bold uppercase tracking-wider text-xs">
                  {vlog.category}
                </Badge>
                {vlog.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400 text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl font-extrabold text-white leading-tight">
                {vlog.title}
              </h1>

              <div className="flex flex-wrap gap-6 items-center text-sm text-gray-400 border-b border-[#222] pb-6">
                <div className="flex items-center gap-2 text-[#ffe0b3]">
                  <User className="h-4 w-4 text-[#ffcc99]" />
                  <span className="font-semibold">{vlog.author} (Verified Legal Partner)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{vlog.duration} mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Published on {vlog.uploadDate}</span>
                </div>
              </div>
            </div>

            {/* Detailed Transcript / Legal Guide Container */}
            <Card className="bg-[#141414] border border-[#ffcc99]/10">
              <CardContent className="p-8 prose prose-invert prose-amber max-w-none">
                <h2 className="text-2xl font-bold text-[#ffcc99] mb-6 flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Legal Video Guide & Notes
                </h2>
                <div className="text-gray-300 space-y-6 leading-relaxed whitespace-pre-line text-base">
                  {vlog.transcript}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Quick Consultation CTA */}
            <Card className="bg-gradient-to-br from-[#2a1a10] to-[#141414] border border-[#ffcc99] shadow-xl p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#ffcc99]/10 rounded-full blur-xl"></div>
              <h3 className="text-xl font-bold text-[#ffcc99] mb-2 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Legal Dispute?
              </h3>
              <p className="text-sm text-[#ffe0b3]/80 mb-6 leading-relaxed">
                Connect with professional advocates specializing in this field. Book a private consultation directly.
              </p>
              <Link href="/find-lawyers">
                <button className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-[#ffcc99]/10 flex items-center justify-center gap-2">
                  <span>Consult with an Expert</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Link>
            </Card>

            {/* Related Vlogs Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-wide border-l-2 border-[#ffcc99] pl-3">
                Related Vlogs
              </h3>
              <div className="space-y-4">
                {relatedVlogs.map((item) => (
                  <Link key={item.slug} href={`/vlogs/${item.slug}`} className="block group">
                    <Card className="bg-[#141414] border border-[#222] hover:border-[#ffcc99]/40 hover:bg-[#1a1a1a] transition-all p-4">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#ffcc99]">
                          {item.category}
                        </span>
                        <h4 className="font-semibold text-white group-hover:text-[#ffcc99] transition-colors line-clamp-2 text-sm">
                          {item.title}
                        </h4>
                        <div className="flex justify-between items-center text-[11px] text-gray-500 pt-2">
                          <span>By {item.author.split(" ")[1]}</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="h-3 w-3" /> {item.duration}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
