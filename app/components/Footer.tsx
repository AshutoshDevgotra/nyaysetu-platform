import React from 'react';
import Link from 'next/link';
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-[#ffcc99] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-[#333] pb-8">
        {/* Left Column - Brand */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚖️</span>
            <span className="text-white">Nyaya</span>
            <span className="text-[#ffcc99]">Dwar</span>
          </h2>
          <p className="text-sm text-[#ffe0b3] mb-6 leading-relaxed">
            Making legal advice accessible to all. Connect with verified advocates across India at affordable prices. Justice shouldn't be a privilege - it's a right for everyone.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="mailto:contact@nyaysetu.com" className="text-[#ffcc99] hover:text-[#ffe0b3] transition-colors">
              <FaEnvelope />
            </a>
            <a href="#" className="text-[#ffcc99] hover:text-[#ffe0b3] transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="text-[#ffcc99] hover:text-[#ffe0b3] transition-colors">
              <FaLinkedin />
            </a>
            <a href="#" className="text-[#ffcc99] hover:text-[#ffe0b3] transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ffcc99]">Quick Links</h3>
          <ul className="space-y-3 text-sm text-[#ffe0b3]">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/find-lawyers" className="hover:text-white transition-colors">Find Advocates</Link></li>
            <li><Link href="/document-qa" className="hover:text-white transition-colors">AI Legal Assistant</Link></li>
            <li><Link href="/client-dashboard" className="hover:text-white transition-colors">Client Portal</Link></li>
            <li><Link href="/lawyer-dashboard" className="hover:text-white transition-colors">Advocate Portal</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>

        {/* Legal Areas */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ffcc99]">Legal Areas</h3>
          <ul className="space-y-3 text-sm text-[#ffe0b3]">
            <li>Criminal Law</li>
            <li>Family Law</li>
            <li>Civil Law</li>
            <li>Property Law</li>
            <li>Corporate Law</li>
            <li>Consumer Protection</li>
            <li>Labour Law</li>
            <li>Tax Law</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ffcc99]">Contact Us</h3>
          <div className="space-y-3 text-sm text-[#ffe0b3]">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#ffcc99] flex-shrink-0" />
              <span>contact@nyayadwar.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-[#ffcc99] flex-shrink-0" />
              <span>+91 9877292856</span>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#ffcc99] flex-shrink-0 mt-1" />
              <span>New Delhi, India<br />Legal Services Platform</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-[#ffcc99]">Support Hours</h4>
            <p className="text-sm text-[#ffe0b3]">
              Mon - Sat: 9:00 AM - 8:00 PM<br />
              Sun: 10:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm text-[#ffe0b3] mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 NyayaDwar. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#333]">
          <p className="text-xs text-gray-400">
            NyaySetu is a legal services platform. We connect clients with qualified advocates but do not provide legal advice directly. 
            Always consult with a qualified legal professional for your specific legal matters.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
