"use client"
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

export default function Page() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setResult(data.result || 'No response received.');
    } catch (error) {
      setResult('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Ask Something</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        result && <p className="mt-4 bg-gray-100 p-4 rounded">{result}</p>
      )}
    </div>
  );
}
