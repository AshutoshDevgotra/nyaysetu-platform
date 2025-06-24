'use client';
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult('');

    const payload = { query };

    console.log('Sending request with payload:', payload); // Log the request payload

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      setResult(data.result || 'No result returned.');
    } catch (error) {
      setResult('❌ Error connecting to API. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-4">
      <div className="flex w-full">
        <input
          type="text"  /* Changed to 'text' instead of 'string' */
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for legal services, lawyers, topics..."
          className="w-full px-4 py-3 rounded-l-md border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-5 py-3 bg-[#d4af37] text-white rounded-r-md hover:bg-[#d4af47] transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {result && (
        <div className="w-full p-4 border rounded bg-gray-100 text-left whitespace-pre-wrap">
          <strong>Result:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
