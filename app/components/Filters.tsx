'use client';
import React from 'react';

const Filters: React.FC = () => {
  return (
    <div className="w-full px-4 py-6 bg-white shadow-md">
      <div className="flex flex-wrap gap-4 justify-center md:justify-between">
        {/* State Filter */}
        <select className="p-2 border rounded">
          <option value="">Select State</option>
          <option>Delhi</option>
          <option>Maharashtra</option>
          <option>Punjab</option>
          {/* Add all states */}
        </select>

        {/* Case Type Filter */}
        <select className="p-2 border rounded">
          <option value="">Select Case Type</option>
          <option>Family Law</option>
          <option>Civil Law</option>
          <option>Criminal Law</option>
          <option>Consumer Protection</option>
          <option>Corporate Law</option>
          <option>Intellectual Property</option>
          <option>Labor & Employment</option>
          <option>Taxation</option>
        </select>

        {/* Court Filter */}
        <select className="p-2 border rounded">
          <option value="">Select Court</option>
          <option>Supreme Court</option>
          <option>High Court</option>
          <option>District Court</option>
          <option>Family Court</option>
        </select>

        {/* Sorting Tabs */}
        <div className="flex gap-2 flex-wrap">
          {['Top Rated', 'Most Experienced', 'Lowest Price'].map((tab) => (
            <button key={tab} className="px-4 py-2 bg-black text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-black transition">
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
