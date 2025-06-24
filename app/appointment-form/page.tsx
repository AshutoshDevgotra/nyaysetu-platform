"use client";
import React, { useState, useEffect } from 'react';

// Extend the Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

const AppointmentForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [matter, setMatter] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false);

  // Dynamically load the Razorpay script only on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setRazorpayScriptLoaded(true);  // Update state once script is loaded
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup on unmount
      };
    }
  }, []);

  // Function to handle booking and triggering the Razorpay payment window
  const handleBooking = () => {
    if (!name || !email || !phone || !matter) {
      alert('Please fill in all the fields');
      return;
    }

    if (!razorpayScriptLoaded) {
      alert('Razorpay script is not loaded!');
      return;
    }

    // Make sure Razorpay object is available before using it
    if (window.Razorpay) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: 1 * 100, // Amount in paise (99 INR)
        currency: 'INR',
        name: 'Legal Consultancy',
        description: 'Consultation for Legal Advice',
        image: 'https://example.com/your_logo.png', // Optional, replace with your logo
        handler: function (response: any) {
          alert('Payment successful! Thank you for booking.');
          // Handle further actions like saving the appointment details, etc.
        },
        prefill: {
          name: name,
          email: email,
          phone: phone,
        },
        theme: {
          color: '#3399cc', // Customize color
        },
      };

      // Creating an instance of Razorpay after ensuring it is available
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      alert('Razorpay not available!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold text-center mb-6">Request Legal Consultancy</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="matter" className="block text-sm font-medium text-gray-700">Brief Description of Matter</label>
          <textarea
            id="matter"
            value={matter}
            onChange={(e) => setMatter(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="documents" className="block text-sm font-medium text-gray-700">Upload Important Documents (optional)</label>
          <input
            type="file"
            id="documents"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full text-sm text-gray-700"
          />
        </div>

        <button
          type="button"
          onClick={handleBooking}
          className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
