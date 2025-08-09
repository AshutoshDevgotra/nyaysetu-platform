# NyaySetu - Legal Services Platform

## 🏛️ About NyaySetu

**"Making Legal Advice Accessible to All"**

NyaySetu is a comprehensive legal services platform that connects citizens with verified advocates across India at affordable prices. Our mission is to democratize access to justice and make legal assistance available to every Indian citizen, regardless of their economic background.

### ✨ Key Features

- **🔍 Find Advocates**: Search and filter verified legal professionals by specialization, location, experience, and pricing
- **📅 Easy Booking**: Simple appointment scheduling system with multiple consultation types
- **💬 AI Legal Assistant**: Get instant legal guidance and information using our AI-powered assistant
- **👥 Dual Dashboards**: Separate portals for clients and advocates with comprehensive features
- **💰 Transparent Pricing**: Clear, upfront pricing with no hidden fees
- **📱 Responsive Design**: Fully responsive interface that works on all devices
- **🔐 Secure Authentication**: Robust login system for both clients and advocates

## 🚀 Platform Capabilities

### For Clients
- Browse and search verified advocates
- Book consultations (in-person, video call, phone call)
- Track case progress and timeline
- Manage documents and communications
- Access AI legal assistant for quick queries
- View upcoming hearings and appointments
- Secure messaging with advocates

### For Advocates
- Professional registration and profile management
- Client and case management
- Appointment scheduling and calendar
- Document management system
- Revenue tracking and analytics
- Client communication tools
- Practice area specialization

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom component library with Radix UI
- **Icons**: Lucide React, React Icons
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
nyaysetu-platform/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── Banner.tsx      # Hero section component
│   │   ├── ExpertProfiles.tsx  # Advocate listings
│   │   ├── Navbar.tsx      # Navigation header
│   │   ├── Footer.tsx      # Footer component
│   │   └── Sidebar.tsx     # Dashboard sidebar
│   ├── appointment-form/   # Booking system
│   ├── client-dashboard/   # Client portal
│   ├── find-lawyers/      # Advocate search page
│   ├── lawyer-dashboard/  # Advocate portal
│   ├── login/            # Authentication
│   ├── document-qa/      # AI assistant
│   └── api/              # Backend API routes
├── lib/                  # Utilities and configurations
├── public/              # Static assets
│   └── Advocates/       # Advocate profile images
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#ffcc99` - Main brand color
- **Light Gold**: `#ffe0b3` - Hover states and highlights  
- **Dark Background**: `#0f0f0f` - Primary background
- **Card Background**: `#1a1a1a` - Component backgrounds
- **Text Primary**: `#ffffff` - Main text color
- **Text Secondary**: `#ffe0b3` - Secondary text

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Responsive scaling** for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nyaysetu-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Key Pages & Features

### 🏠 Landing Page (`/`)
- Compelling hero section with platform mission
- AI legal assistant integration
- Featured advocates showcase
- Trust indicators and value propositions

### 🔍 Find Advocates (`/find-lawyers`)
- Advanced search and filtering system
- Filter by specialization, location, experience, price
- Advocate profile cards with ratings and reviews
- Direct booking and contact functionality

### 👤 Client Dashboard (`/client-dashboard`)
- Case timeline and progress tracking
- Document management system
- Upcoming hearings and appointments
- Secure messaging with advocates
- Payment and billing history

### ⚖️ Advocate Dashboard (`/lawyer-dashboard`)
- Professional registration system
- Client and case management
- Appointment scheduling
- Revenue tracking and analytics
- Profile management and verification

### 📅 Appointment Booking (`/appointment-form`)
- Multi-step booking process
- Case type and urgency selection
- Flexible scheduling options
- Consultation type selection (in-person/video/phone)

### 🔐 Authentication (`/login`)
- Dual login system (Client/Advocate)
- Google OAuth integration
- Secure session management
- Password recovery system

## 🎯 Core Functionalities

### ✅ Completed Features
- [x] Responsive design across all devices
- [x] Advocate image display fix
- [x] Enhanced landing page with mission statement
- [x] Functional find lawyers page with filters
- [x] Complete client dashboard
- [x] Advocate registration and dashboard
- [x] Authentication system
- [x] Appointment booking system
- [x] AI legal assistant integration
- [x] Professional navigation and footer

### 🔄 Integration Points
- **Firebase Authentication**: User management and security
- **AI Backend**: Legal query processing (rag_backend.py)
- **Payment Gateway**: Razorpay integration ready
- **Email Services**: EmailJS for notifications
- **Document Management**: File upload and storage

## 🎨 UI/UX Highlights

### Design Philosophy
- **Accessibility First**: Ensuring legal services are accessible to all
- **Trust & Credibility**: Professional design that builds user confidence
- **Simplicity**: Complex legal processes made simple and intuitive
- **Mobile-First**: Optimized for mobile usage patterns

### User Experience
- **Intuitive Navigation**: Clear paths for different user types
- **Quick Actions**: Fast booking and contact options
- **Visual Hierarchy**: Important information prominently displayed
- **Loading States**: Smooth transitions and feedback
- **Error Handling**: User-friendly error messages and recovery

## 🔒 Security & Privacy

- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Authentication**: Secure login with session management
- **Privacy Controls**: User data protection and consent management
- **Verification**: Advocate verification through Bar Council IDs
- **Secure Communications**: Encrypted messaging between clients and advocates

## 🌟 Unique Value Propositions

1. **Affordable Justice**: Transparent pricing makes legal help accessible
2. **Verified Professionals**: All advocates verified through Bar Council
3. **AI-Powered Assistance**: Instant legal guidance and information
4. **Comprehensive Platform**: End-to-end legal service management
5. **User-Centric Design**: Built for ease of use by all demographics
6. **Pan-India Coverage**: Advocates from across India available

## 📈 Future Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ User authentication and profiles
- ✅ Basic booking system

### Phase 2 (Next)
- [ ] Payment integration
- [ ] Video consultation feature
- [ ] Document templates library
- [ ] Advanced analytics dashboard

### Phase 3 (Future)
- [ ] Mobile application
- [ ] AI-powered legal document generation
- [ ] Multi-language support
- [ ] Advanced case management tools

## 🤝 Contributing

We welcome contributions to make legal services more accessible! Please read our contributing guidelines and code of conduct.

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design principles
- Ensure accessibility compliance
- Write comprehensive tests
- Document new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Email**: contact@nyaysetu.com
- **Phone**: +91 98765 43210
- **Address**: New Delhi, India

## 🙏 Acknowledgments

- All the advocates and legal professionals who inspired this platform
- The open-source community for the amazing tools and libraries
- Our beta users for valuable feedback and suggestions

---

**NyaySetu** - *Bridging the gap between citizens and justice*

*"Justice shouldn't be a privilege - it's a right for everyone"*