'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  FaFolderOpen, FaCalendarAlt, FaCommentDots, FaPhone, FaFileAlt, 
  FaRobot, FaBook, FaChartBar, FaCog, FaBell, FaUsers, FaBriefcase, FaRupeeSign
} from 'react-icons/fa';

const LawyerDashboard = () => {
  const router = useRouter();

  // Uncomment when ready for auth
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       router.push('/lawyer-dashboard');
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [router]);

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-[#ffcc99] p-4">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <img src="/logo.svg" className="w-6 h-6" alt="logo" />
          Nyay Setu
        </h2>
        <nav className="space-y-4 text-sm">
          <SidebarItem icon={<FaFolderOpen />} text="My Cases" />
          <SidebarItem icon={<FaCalendarAlt />} text="Appointments" />
          <SidebarItem icon={<FaCommentDots />} text="Client Messages" />
          <SidebarItem icon={<FaPhone />} text="Requested Calls" />
          <SidebarItem icon={<FaFileAlt />} text="Document Requests" />
          <SidebarItem icon={<FaRobot />} text="AI Assistant" />
          <SidebarItem icon={<FaBook />} text="Legal Resources" />
          <SidebarItem icon={<FaChartBar />} text="Case Analytics" />
          <SidebarItem icon={<FaCog />} text="Settings" />
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8 flex justify-between relative">

        {/* Left — Clean Center Area */}
        <div className="flex-1 pr-4">
          
          {/* Top Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <button className="border border-[#ffcc99] px-4 py-2 rounded-md text-sm text-white">
              Filter Cases ▼
            </button>
            <div className="flex gap-2">
              <button className="bg-[#ffe0b3] text-black px-4 py-1 rounded-full text-xs font-semibold">
                Ongoing Cases
              </button>
              <button className="bg-[#2b2b2b] px-4 py-1 rounded-full text-xs text-white">
                Pending Cases
              </button>
            </div>
          </div>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard icon={<FaUsers />} label="Active Clients" value="5" />
            <StatsCard icon={<FaBriefcase />} label="Active Cases" value="12" />
            <StatsCard icon={<FaRupeeSign />} label="Revenue" value="₹2,45,000" />
            <StatsCard icon={<FaCalendarAlt />} label="Appointments" value="7" />
          </div>

          {/* Clean workspace area (empty) */}
          <div className="border-2 border-dashed border-[#333] rounded-lg h-[400px] flex items-center justify-center text-[#555]">
            Central Workspace Area (Empty for Now)
          </div>
        </div>

        {/* Right — Appointments & Documents */}
        <div className="w-full max-w-xs space-y-6">
          
          {/* Upcoming Appointments */}
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffcc99]">
            <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[#ffcc99]">
                  <th className="py-2">Client</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <TableRow client="Rahul Sharma" date="12 May" time="10:30 AM" status="Confirmed" />
                <TableRow client="Pooja Verma" date="13 May" time="1:00 PM" status="Pending" />
                <TableRow client="Amit Kumar" date="14 May" time="3:45 PM" status="Confirmed" />
              </tbody>
            </table>
          </div>

          {/* Recent Documents */}
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffcc99]">
            <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[#ffcc99]">
                  <th className="py-2">Document</th>
                  <th className="py-2">Uploaded By</th>
                </tr>
              </thead>
              <tbody>
                <DocumentRow name="Affidavit.pdf" uploadedBy="Rahul Sharma" date="10 May" />
                <DocumentRow name="Agreement.docx" uploadedBy="Pooja Verma" date="9 May" />
                <DocumentRow name="Evidence.zip" uploadedBy="Amit Kumar" date="7 May" />
              </tbody>
            </table>
          </div>

        </div>

        {/* Notification Bell */}
        <div className="absolute bottom-6 right-6">
          <div className="relative">
            <FaBell className="text-[#ffe0b3] text-2xl cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white px-1 rounded-full">
              3
            </span>
          </div>
        </div>

      </main>
    </div>
  );
};

// Components
const SidebarItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 hover:text-[#ffe0b3] cursor-pointer">
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </div>
);

const StatsCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-[#1a1a1a] border border-[#ffcc99] rounded-lg p-4 flex items-center gap-4">
    <div className="text-[#ffe0b3] text-2xl">{icon}</div>
    <div>
      <p className="text-sm text-[#ffe0b3]">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const TableRow = ({ client, date, time, status }: { client: string; date: string; time: string; status: string }) => (
  <tr className="border-b border-[#333]">
    <td className="py-2">{client}</td>
    <td className="py-2">{date}</td>
    <td className="py-2">{time}</td>
    <td className="py-2">{status}</td>
  </tr>
);

const DocumentRow = ({ name, uploadedBy, date }: { name: string; uploadedBy: string; date: string }) => (
  <tr className="border-b border-[#333]">
    <td className="py-2">{name}</td>
    <td className="py-2">{uploadedBy}</td>
    <td className="py-2">{date}</td>
  </tr>
);

export default LawyerDashboard;
