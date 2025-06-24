import React from 'react';
import SearchBar from './SearchBar';

const Banner: React.FC = () => {
  return (
    <section className="w-full h-[60vh] bg-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-4">
        Welcome to NyaySetu
      </h1>
      <p className="text-lg text-white mb-6">
        India’s Legal Platform to Find Lawyers, AI Legal Experts, and More
      </p>
      <SearchBar />
    </section>
  );
};

export default Banner;
