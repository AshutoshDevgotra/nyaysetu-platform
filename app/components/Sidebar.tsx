import { useState } from "react";
import { Home, Calendar, MessageSquare, FileText, Lightbulb, Settings } from "lucide-react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("My Cases");

  const menuItems = [
    { name: "My Cases", icon: <Home size={18} /> },
    { name: "Appointments", icon: <Calendar size={18} /> },
    { name: "Messages", icon: <MessageSquare size={18} /> },
    { name: "Documents", icon: <FileText size={18} /> },
    { name: "Legal Advice", icon: <Lightbulb size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex flex-col justify-between h-screen w-64 bg-black text-white border-r border-gold p-4">
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <img src="/logo.png" alt="Nyay Setu" className="w-6 h-6" />
          <h1 className="text-lg font-bold">Nyay Setu</h1>
        </div>

        <div className="mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold mb-2">
            NS
          </div>
          <div>
            <h2 className="font-semibold text-sm">Nyay Setu</h2>
            <p className="text-xs text-gray-400">Client</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === item.name
                  ? "bg-gold text-black font-semibold"
                  : "text-white hover:bg-gold hover:text-black"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
        <span className="text-sm font-bold">N</span>
      </div>
    </div>
  );
}

const gold = '#FFD700'; // This constant can be used in Tailwind config or inline styles if needed
