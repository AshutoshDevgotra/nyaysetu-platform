import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface RightDetail {
    title: string;
    description: string;
}

export interface RightsCardProps {
    title: string;
    icon?: string;
    summary: string;
    details: RightDetail[];
}

export function RightsCard({ title, icon, summary, details }: RightsCardProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="bg-[#1a1a1a] border border-[#333] hover:border-[#ffcc99] rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
            <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    {icon && <span className="text-3xl">{icon}</span>}
                    <div>
                        <h3 className="text-xl font-semibold text-white">{title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{summary}</p>
                    </div>
                </div>
                <div className="text-[#ffcc99]">
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
            </div>

            {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-[#333] bg-[#0f0f0f]">
                    <div className="space-y-4 mt-4">
                        {details.map((detail, idx) => (
                            <div key={idx} className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333]">
                                <h4 className="text-[#ffcc99] font-medium text-lg mb-2 flex items-center gap-2">
                                    <span className="bg-[#ffcc99] text-black w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                                        {idx + 1}
                                    </span>
                                    {detail.title}
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed">{detail.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
