'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { 
  FaFolderOpen, FaCalendarAlt, FaCommentDots, FaPhone, FaFileAlt, 
  FaChartBar, FaCog, FaUsers, FaBriefcase, 
  FaRupeeSign, FaPlus, FaEdit, FaSave, FaTimes
} from 'react-icons/fa';
import { Scale, User, Mail, Phone as PhoneIcon, MapPin, Calendar, Star } from 'lucide-react';

const LawyerDashboard = () => {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    barCouncilId: '',
    experience: '',
    caseTypes: '',
    pricePerAppearance: '',
    court: '',
    state: '',
    description: '',
    languages: '',
    address: ''
  });

  const [profileData, setProfileData] = useState({
    fullName: 'Advocate Name',
    email: 'advocate@example.com',
    phone: '+91 98765 43210',
    barCouncilId: 'DL/2020/1234',
    experience: '5',
    caseTypes: 'Criminal Law, Civil Law, Family Law',
    pricePerAppearance: '5000',
    court: 'Delhi High Court',
    state: 'Delhi',
    description: 'Experienced advocate specializing in criminal and civil matters.',
    languages: 'Hindi, English, Punjabi',
    address: 'New Delhi, India'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...formData });
    setIsRegistered(true);
    setActiveTab('dashboard');
  };

  const handleEditProfile = () => {
    setFormData({ ...profileData });
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...formData });
    setIsEditing(false);
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Join NyaySetu as an Advocate
            </h1>
            <p className="text-[#ffe0b3] text-lg max-w-2xl mx-auto">
              Register your practice and connect with clients seeking legal assistance. 
              Make justice accessible to all citizens.
            </p>
          </div>

          <Card className="bg-[#1a1a1a] border border-[#ffcc99]">
            <CardHeader>
              <h2 className="text-2xl font-bold text-[#ffcc99]">Professional Registration</h2>
              <p className="text-[#ffe0b3]">Please fill in your professional details to get started</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleRegistration} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#ffcc99] border-b border-[#333] pb-2">
                      Personal Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#ffcc99] border-b border-[#333] pb-2">
                      Professional Details
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Bar Council ID *
                      </label>
                      <input
                        type="text"
                        name="barCouncilId"
                        value={formData.barCouncilId}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="DL/2020/1234"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="5"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Court/Jurisdiction *
                      </label>
                      <input
                        type="text"
                        name="court"
                        value={formData.court}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="Delhi High Court"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Specialization and Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#ffcc99] border-b border-[#333] pb-2">
                    Practice Areas & Pricing
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Areas of Practice *
                      </label>
                      <input
                        type="text"
                        name="caseTypes"
                        value={formData.caseTypes}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="Criminal Law, Civil Law, Family Law"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Separate multiple areas with commas</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                        Price per Court Appearance (₹) *
                      </label>
                      <input
                        type="number"
                        name="pricePerAppearance"
                        value={formData.pricePerAppearance}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        placeholder="5000"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      Professional Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none resize-none"
                      placeholder="Brief description of your experience and expertise..."
                    />
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mr-3 w-4 h-4 text-[#ffcc99] bg-[#0f0f0f] border-[#333] rounded focus:ring-[#ffcc99]"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-[#ffe0b3]">
                      I agree to the Terms of Service and Privacy Policy, and confirm that all information provided is accurate.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3] font-bold py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Register as Advocate
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-[#ffcc99] p-4">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <span className="text-white">Nyay</span>
          <span className="text-[#ffcc99]">Setu</span>
        </h2>
        <nav className="space-y-4 text-sm">
          <SidebarItem icon={<FaFolderOpen />} text="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<FaCalendarAlt />} text="Appointments" active={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')} />
          <SidebarItem icon={<FaCommentDots />} text="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
          <SidebarItem icon={<FaPhone />} text="Consultations" active={activeTab === 'requests'} onClick={() => setActiveTab('requests')} />
          <SidebarItem icon={<FaFileAlt />} text="Documents" active={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
          <SidebarItem icon={<User />} text="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <SidebarItem icon={<FaChartBar />} text="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem icon={<FaCog />} text="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, Adv. {profileData.fullName}</h1>
                <p className="text-[#ffe0b3] mt-2">Here's your practice overview for today</p>
              </div>
              <Button className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] flex items-center gap-2">
                <FaPlus />
                New Case
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard icon={<FaUsers />} label="Active Clients" value="15" color="bg-blue-500" />
              <StatsCard icon={<FaBriefcase />} label="Active Cases" value="23" color="bg-green-500" />
              <StatsCard icon={<FaRupeeSign />} label="Monthly Revenue" value="₹1,25,000" color="bg-yellow-500" />
              <StatsCard icon={<FaCalendarAlt />} label="This Week" value="8 appointments" color="bg-purple-500" />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#1a1a1a] border border-[#ffcc99]">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-[#ffcc99]">Recent Cases</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Property Dispute - Sharma vs Kumar", status: "Hearing Scheduled", date: "Tomorrow" },
                      { name: "Divorce Case - Priya Malhotra", status: "Document Review", date: "Today" },
                      { name: "Criminal Defense - Raj Patel", status: "Bail Application", date: "Urgent" }
                    ].map((case_, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-[#0f0f0f] rounded-lg border border-[#333]">
                        <div>
                          <p className="text-white font-medium">{case_.name}</p>
                          <p className="text-[#ffe0b3] text-sm">{case_.status}</p>
                        </div>
                        <Badge className={`${case_.date === 'Urgent' ? 'bg-red-500' : 'bg-[#ffcc99]'} text-black`}>
                          {case_.date}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border border-[#ffcc99]">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-[#ffcc99]">Upcoming Appointments</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { client: "Rahul Sharma", time: "10:30 AM", type: "Consultation", date: "Today" },
                      { client: "Anita Singh", time: "2:00 PM", type: "Case Review", date: "Today" },
                      { client: "Vikram Reddy", time: "11:00 AM", type: "Court Prep", date: "Tomorrow" }
                    ].map((appointment, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-[#0f0f0f] rounded-lg border border-[#333]">
                        <div>
                          <p className="text-white font-medium">{appointment.client}</p>
                          <p className="text-[#ffe0b3] text-sm">{appointment.type} - {appointment.time}</p>
                        </div>
                        <Badge className="bg-[#ffcc99] text-black">
                          {appointment.date}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Professional Profile</h1>
              {!isEditing && (
                <Button onClick={handleEditProfile} className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] flex items-center gap-2">
                  <FaEdit />
                  Edit Profile
                </Button>
              )}
            </div>

            {isEditing ? (
              <Card className="bg-[#1a1a1a] border border-[#ffcc99]">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-[#ffcc99]">Edit Profile Information</h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#ffe0b3] mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#ffe0b3] mb-2">Price per Appearance</label>
                        <input
                          type="number"
                          name="pricePerAppearance"
                          value={formData.pricePerAppearance}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button type="submit" className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3] flex items-center gap-2">
                        <FaSave />
                        Save Changes
                      </Button>
                      <Button type="button" onClick={() => setIsEditing(false)} variant="outline" className="border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black flex items-center gap-2">
                        <FaTimes />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-[#1a1a1a] border border-[#ffcc99]">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-[#ffcc99]">Professional Information</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="text-[#ffcc99] h-5 w-5" />
                      <div>
                        <p className="text-[#ffe0b3] text-sm">Full Name</p>
                        <p className="text-white font-medium">Adv. {profileData.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Scale className="text-[#ffcc99] h-5 w-5" />
                      <div>
                        <p className="text-[#ffe0b3] text-sm">Bar Council ID</p>
                        <p className="text-white font-medium">{profileData.barCouncilId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="text-[#ffcc99] h-5 w-5" />
                      <div>
                        <p className="text-[#ffe0b3] text-sm">Experience</p>
                        <p className="text-white font-medium">{profileData.experience} years</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaRupeeSign className="text-[#ffcc99] h-5 w-5" />
                      <div>
                        <p className="text-[#ffe0b3] text-sm">Price per Appearance</p>
                        <p className="text-white font-medium">₹{profileData.pricePerAppearance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Other tabs */}
        {activeTab !== 'dashboard' && activeTab !== 'profile' && (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h2>
            <p>This functionality is coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

// Components
const SidebarItem = ({ icon, text, active = false, onClick }: { icon: React.ReactNode; text: string; active?: boolean; onClick?: () => void }) => (
  <div 
    className={`flex items-center gap-3 cursor-pointer p-2 rounded transition-colors ${
      active ? 'bg-[#ffcc99] text-black' : 'hover:text-[#ffe0b3] text-white'
    }`}
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </div>
);

const StatsCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) => (
  <Card className="bg-[#1a1a1a] border border-[#ffcc99]">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className={`${color} p-3 rounded-lg text-white text-xl`}>
          {icon}
        </div>
        <div>
          <p className="text-[#ffe0b3] text-sm">{label}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LawyerDashboard;
