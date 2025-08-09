"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

// utils
function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

// Badge component
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", className)}>
      {children}
    </span>
  );
}

// Button component
function Button({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-[#d4af37] text-black hover:bg-[#c49f27]",
    outline: "border border-[#d4af37] text-[#d4af37] bg-transparent hover:bg-[#d4af371a]",
    ghost: "hover:bg-muted hover:text-foreground",
  };
  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    icon: "h-9 w-9",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

// Main Component
export default function ClientDashboard() {
  const [activeCase, setActiveCase] = useState("Property Dispute");
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Sidebar />

      {/* Left 2/3 Main Section */}
      <main className="lg:col-span-2 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white">Client Dashboard</h1>
          <p className="text-[#ffcc99] mt-1">Track your case progress and communicate with your advocate</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg px-4 py-2">
              <span className="text-[#ffcc99] text-sm">Active Case:</span>
              <span className="text-white font-semibold ml-2">{activeCase}</span>
            </div>
            <Button className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3]">
              Schedule Meeting
            </Button>
          </div>
        </header>

        {/* Case Timeline */}
        <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#ffcc99] mb-4">Case Timeline</h2>
          <ul className="mt-4 space-y-4">
            {[
              { step: "Case Filed", desc: "Your case was officially filed with the court", date: "10 Apr 2025", status: "completed" },
              { step: "Initial Hearing", desc: "Preliminary hearing scheduled at Delhi High Court", date: "25 Apr 2025", status: "upcoming", tag: "14 days left" },
              { step: "Document Submission", desc: "All required documents must be submitted", date: "15 May 2025", status: "pending" },
              { step: "Final Hearing", desc: "Final arguments and case conclusion", date: "10 Jun 2025", status: "pending" }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className={cn(
                  "w-3 h-3 mt-1 rounded-full",
                  item.status === "completed" ? "bg-[#4caf50]" :
                  item.status === "upcoming" ? "bg-[#f0ad4e]" : "bg-gray-500"
                )}></span>
                <div className="flex-1">
                  <p className="font-medium text-white">{item.step}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span>{item.date}</span>
                    {item.tag && (
                      <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded-full text-xs font-medium">{item.tag}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#ffcc99] mb-4">Documents</h2>
          <div className="flex justify-between items-center mb-4">
            <Button className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3]">Upload Document</Button>
            <Button variant="outline" className="border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black">
              Request Document
            </Button>
          </div>
          <table className="w-full mt-4 text-left text-sm">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="py-3 text-[#ffcc99] text-left">Name</th>
                <th className="text-[#ffcc99] text-left">Category</th>
                <th className="text-[#ffcc99] text-left">Uploaded By</th>
                <th className="text-[#ffcc99] text-left">Date</th>
                <th className="text-[#ffcc99] text-left">Status</th>
                <th className="text-[#ffcc99] text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[{ name: "Complaint_Filing.pdf", cat: "Case", by: "You", date: "10 Apr 2025", status: "Approved" },
                { name: "ID_Proof.jpg", cat: "Personal", by: "You", date: "09 Apr 2025", status: "Approved" },
                { name: "Property_Documents.pdf", cat: "Evidence", by: "Lawyer", date: "15 Apr 2025", status: "Pending" },
                { name: "Witness_Statement.docx", cat: "Evidence", by: "You", date: "18 Apr 2025", status: "Pending" }
              ].map((doc, idx) => (
                <tr key={idx} className="border-b border-[#333]">
                  <td className="py-3 text-white font-medium">{doc.name}</td>
                  <td className="text-[#ffe0b3]">{doc.cat}</td>
                  <td className="text-[#ffe0b3]">{doc.by}</td>
                  <td className="text-[#ffe0b3]">{doc.date}</td>
                  <td>
                    <Badge className={doc.status === "Approved" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}>
                      {doc.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black">
                        👁️
                      </Button>
                      <Button size="icon" variant="ghost" className="text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black">
                        ⬇️
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Right Sidebar - Upcoming Hearings & Messages */}
      <aside className="space-y-6">
        {/* Upcoming Hearings */}
        <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-[#ffcc99]">Upcoming Hearings</h2>
          <div className="mt-4 space-y-4">
            <div className="border border-[#333] p-3 rounded-lg">
              <p className="text-white font-medium">Initial Hearing</p>
              <p className="text-sm text-gray-400">25 Apr 2025, 10:30 AM</p>
              <p className="text-sm text-gray-400">Delhi High Court, Room 203</p>
              <Badge className="bg-red-500 text-white mt-2">Urgent</Badge>
            </div>
            <div className="border border-[#333] p-3 rounded-lg">
              <p className="text-white font-medium">Evidence Presentation</p>
              <p className="text-sm text-gray-400">15 May 2025, 02:00 PM</p>
              <p className="text-sm text-gray-400">Delhi High Court, Room 105</p>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-[#ffcc99] mb-4">Recent Messages</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-[#262626] border border-[#333] p-3 rounded-md">
              <p className="font-medium text-white">Adv. Vikram Reddy</p>
              <p className="text-[#ffe0b3]">I've reviewed the documents you sent. We need to discuss the next steps for your case.</p>
              <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
            </div>
            <div className="bg-[#262626] border border-[#333] p-3 rounded-md">
              <p className="font-medium text-white">Adv. Priya Malhotra</p>
              <p className="text-[#ffe0b3]">The hearing date has been confirmed. Please make sure you're available on the scheduled date.</p>
              <p className="text-gray-500 text-xs mt-1">Yesterday</p>
            </div>
          </div>
          
          {/* Message Input */}
          <div className="mt-4 space-y-2">
            <textarea
              className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-400 resize-none focus:border-[#ffcc99] focus:outline-none"
              rows={3}
              placeholder="Type your message to advocate..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button 
              onClick={handleSendMessage}
              className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3]"
            >
              Send Message
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
