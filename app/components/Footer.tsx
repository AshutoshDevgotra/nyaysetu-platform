import React from 'react';
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-8">
        {/* Left Column */}
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-white">⚖️</span> Nyay Setu
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Expert legal advice just a click away. Our team of professional attorneys is dedicated to providing you with the highest quality legal services.
          </p>
          <div className="flex gap-4 text-xl text-gray-400">
            <FaEnvelope className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedin className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Middle Column - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Practice Areas</a></li>
            <li><a href="#" className="hover:text-white">Our Attorneys</a></li>
            <li><a href="#" className="hover:text-white">Case Results</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>

        {/* Right Column - Practice Areas */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Practice Areas</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Corporate Law</li>
            <li>Family Law</li>
            <li>Criminal Defense</li>
            <li>Real Estate Law</li>
            <li>Intellectual Property</li>
            <li>Employment Law</li>
            <li>Immigration</li>
            <li>Personal Injury</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © 2025 Nyay Setu. All rights reserved. | 
        <a href="#" className="hover:text-white mx-1">Privacy Policy</a> | 
        <a href="#" className="hover:text-white mx-1">Terms of Services</a>
      </div>
    </footer>
  );
};

export default Footer;
