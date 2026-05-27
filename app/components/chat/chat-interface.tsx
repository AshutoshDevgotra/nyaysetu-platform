"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Globe2, Sparkles, MessageSquare, AlertCircle } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "ai";
    content: string;
    lang?: "en" | "hi" | "pa";
};

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Namaste! 🙏 I am your Legal AI Assistant. I can help you understand your legal rights, explain legal procedures, and guide you on what to do in difficult situations.\n\nनमस्ते! मैं आपका कानूनी एआई सहायक हूं। मैं आपको आपके कानूनी अधिकारों को समझने में मदद कर सकता हूं।",
        }
    ]);
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState<"en" | "hi" | "pa">("en");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: userMsg.content }),
            });

            if (!response.ok) {
                throw new Error("Failed to connect to the legal AI system.");
            }

            const data = await response.json();
            const responseContent = data.answer || "I received an empty response. Please try again.";

            // Add an empty AI message to be streamed into
            const aiMsgId = (Date.now() + 1).toString();
            const aiMsg: Message = {
                id: aiMsgId,
                role: "ai",
                content: "",
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false); // Hide the typing bubble as the text starts to stream

            // Stream the text character by character for a smooth typing animation
            let index = 0;
            const speed = 12; // Milliseconds per character
            const interval = setInterval(() => {
                if (index < responseContent.length) {
                    const nextChar = responseContent[index];
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === aiMsgId
                                ? { ...msg, content: msg.content + nextChar }
                                : msg
                        )
                    );
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, speed);

        } catch (error) {
            console.error("Legal AI query error:", error);
            setIsTyping(false);
            
            // Graceful fallback description
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "I'm sorry, I'm currently having trouble connecting to the legal RAG engine. Please ensure your Python backend is running at http://127.0.0.1:8000 and try again.",
            };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] bg-[#1a1a1a] rounded-2xl border border-[#333] shadow-sm overflow-hidden">

            {/* Chat Header */}
            <div className="bg-[#262626] border-b border-[#333] p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ffcc99]/20 rounded-full flex items-center justify-center text-[#ffcc99]">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Legal Assistant</h2>
                        <p className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-lg p-1">
                    <Globe2 size={16} className="text-gray-400 ml-2" />
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "pa")}
                        className="bg-transparent text-sm text-white focus:outline-none py-1 pr-2 cursor-pointer"
                    >
                        <option value="en" className="bg-[#1a1a1a]">English</option>
                        <option value="hi" className="bg-[#1a1a1a]">हिंदी (Hindi)</option>
                        <option value="pa" className="bg-[#1a1a1a]">ਪੰਜਾਬੀ (Punjabi)</option>
                    </select>
                </div>
            </div>

            {/* Action Prompts (only shown if just 1 message) */}
            {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 p-4 bg-[#262626]/50 border-b border-[#333]">
                    {["Traffic Challan Issue", "Property Dispute", "Divorce / Domestic Issue", "Check Legal Aid"].map((prompt, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setInput(`I need help regarding a ${prompt}. What are my rights?`);
                            }}
                            className="text-xs bg-[#1a1a1a] border border-[#ffcc99]/30 text-[#ffcc99] px-3 py-1.5 rounded-full hover:bg-[#ffcc99]/10 transition-colors"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-start gap-3 mb-6">
                    <div className="flex-1 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg text-yellow-200/80 text-xs flex gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <p>This is an AI assistant, not a human lawyer. It provides legal information and rights awareness, not formal legal advice.</p>
                    </div>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role === "ai" && (
                            <div className="w-8 h-8 rounded-full bg-[#ffcc99]/20 flex items-center justify-center text-[#ffcc99] mr-2 shrink-0 mt-1">
                                <Sparkles size={14} />
                            </div>
                        )}

                        <div
                            className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap ${msg.role === "user"
                                    ? "bg-[#ffcc99] text-black rounded-tr-sm"
                                    : "bg-[#262626] border border-[#333] text-white rounded-tl-sm"
                                }`}
                        >
                            {msg.content}
                        </div>

                        {msg.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-white ml-2 shrink-0 mt-1">
                                U
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="w-8 h-8 rounded-full bg-[#ffcc99]/20 flex items-center justify-center text-[#ffcc99] mr-2 shrink-0 mt-1">
                            <Sparkles size={14} />
                        </div>
                        <div className="bg-[#262626] border border-[#333] text-white rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-[#262626] border-t border-[#333]">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            language === "hi" ? "अपना कानूनी प्रश्न यहां टाइप करें..." :
                                language === "pa" ? "ਆਪਣਾ ਕਾਨੂੰਨੀ ਸਵਾਲ ਇੱਥੇ ਟਾਈਪ ਕਰੋ..." :
                                    "Type your legal question here..."
                        }
                        className="w-full bg-[#0f0f0f] border border-[#333] text-white rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-[#ffcc99] transition-colors"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 p-2 bg-[#ffcc99] text-black rounded-lg hover:bg-[#ffe0b3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="text-center text-[10px] text-gray-500 mt-2">
                    AI generated information. Always verify with an advocate.
                </p>
            </div>

        </div>
    );
}
