"use client";
import React from "react";
import { Sidebar } from "@/app/components/layout/Sidebar";
import { ChatInterface } from "@/app/components/chat/chat-interface";

export default function CitizenChatPage() {
    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Sidebar role="client" />

            <main className="lg:col-span-3">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-white">AI Legal Assistant</h1>
                    <p className="text-[#ffcc99] mt-1">Get immediate guidance on your rights and legal procedures</p>
                </header>

                <div className="w-full max-w-4xl mx-auto">
                    <ChatInterface />
                </div>
            </main>
        </div>
    );
}
