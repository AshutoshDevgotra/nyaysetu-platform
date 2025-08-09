"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Calendar, Clock, User, Mail, Phone, FileText, Scale, CheckCircle } from "lucide-react";

export default function AppointmentForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Client Information
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    
    // Case Information
    caseType: "",
    caseDescription: "",
    urgency: "normal",
    
    // Appointment Details
    preferredDate: "",
    preferredTime: "",
    consultationType: "in-person",
    
    // Additional Information
    previousLegalHelp: "no",
    documents: "no",
    budget: "",
    additionalNotes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(5); // Success step
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const caseTypes = [
    "Criminal Law",
    "Civil Law", 
    "Family Law",
    "Property Law",
    "Corporate Law",
    "Labour Law",
    "Consumer Protection",
    "Tax Law",
    "Immigration Law",
    "Other"
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  if (step === 5) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
        <Card className="bg-[#1a1a1a] border border-[#ffcc99] max-w-md w-full text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Appointment Booked Successfully!</h2>
            <p className="text-[#ffe0b3] mb-6">
              Your consultation request has been sent to the advocate. You will receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => router.push('/client-dashboard')}
                className="w-full bg-[#ffcc99] text-black hover:bg-[#ffe0b3]"
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Book Legal Consultation</h1>
          <p className="text-[#ffe0b3]">Schedule your appointment with our expert advocates</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    stepNumber <= step
                      ? "bg-[#ffcc99] text-black"
                      : "bg-[#333] text-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs text-[#ffe0b3] mt-1">
                  {stepNumber === 1 && "Personal"}
                  {stepNumber === 2 && "Case Details"}
                  {stepNumber === 3 && "Schedule"}
                  {stepNumber === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 bg-[#333] h-1 rounded-full">
            <div
              className="bg-[#ffcc99] h-1 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="bg-[#1a1a1a] border border-[#ffcc99]">
          <CardHeader>
            <h2 className="text-xl font-semibold text-[#ffcc99]">
              {step === 1 && "Personal Information"}
              {step === 2 && "Case Details"}
              {step === 3 && "Schedule Appointment"}
              {step === 4 && "Review & Confirm"}
            </h2>
          </CardHeader>

          <CardContent>
            <form onSubmit={step === 4 ? handleSubmit : undefined}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Case Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      <Scale className="inline h-4 w-4 mr-1" />
                      Type of Legal Matter *
                    </label>
                    <select
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                      required
                    >
                      <option value="">Select case type</option>
                      {caseTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      <FileText className="inline h-4 w-4 mr-1" />
                      Case Description *
                    </label>
                    <textarea
                      name="caseDescription"
                      value={formData.caseDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none resize-none"
                      placeholder="Please describe your legal matter in detail..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent (within 24 hours)</option>
                      <option value="emergency">Emergency (immediate)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      Budget Range (₹)
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                    >
                      <option value="">Select budget range</option>
                      <option value="1000-5000">₹1,000 - ₹5,000</option>
                      <option value="5000-10000">₹5,000 - ₹10,000</option>
                      <option value="10000-25000">₹10,000 - ₹25,000</option>
                      <option value="25000+">₹25,000+</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Schedule */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                      required
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      Consultation Type
                    </label>
                    <select
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none"
                    >
                      <option value="in-person">In-Person Meeting</option>
                      <option value="video-call">Video Call</option>
                      <option value="phone-call">Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#ffe0b3] mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 bg-[#0f0f0f] border border-[#333] rounded-lg text-white focus:border-[#ffcc99] focus:outline-none resize-none"
                      placeholder="Any additional information or special requirements..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#333]">
                    <h3 className="text-lg font-semibold text-[#ffcc99] mb-3">Review Your Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Name:</p>
                        <p className="text-white">{formData.clientName}</p>
                      </div>
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Email:</p>
                        <p className="text-white">{formData.clientEmail}</p>
                      </div>
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Phone:</p>
                        <p className="text-white">{formData.clientPhone}</p>
                      </div>
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Case Type:</p>
                        <p className="text-white">{formData.caseType}</p>
                      </div>
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Date:</p>
                        <p className="text-white">{formData.preferredDate}</p>
                      </div>
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Time:</p>
                        <p className="text-white">{formData.preferredTime}</p>
                      </div>
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Type:</p>
                        <p className="text-white">{formData.consultationType}</p>
                      </div>
                      <div>
                        <p className="text-[#ffe0b3] font-medium">Urgency:</p>
                        <p className="text-white capitalize">{formData.urgency}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-[#ffe0b3] font-medium">Case Description:</p>
                      <p className="text-white text-sm mt-1">{formData.caseDescription}</p>
                    </div>
                  </div>

                  <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#333]">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mr-3 w-4 h-4 text-[#ffcc99] bg-[#0f0f0f] border-[#333] rounded focus:ring-[#ffcc99]"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-[#ffe0b3]">
                        I agree to the Terms of Service and Privacy Policy
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="contact"
                        className="mr-3 w-4 h-4 text-[#ffcc99] bg-[#0f0f0f] border-[#333] rounded focus:ring-[#ffcc99]"
                      />
                      <label htmlFor="contact" className="text-sm text-[#ffe0b3]">
                        I consent to be contacted by the advocate regarding this consultation
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={step === 1}
                  variant="outline"
                  className="border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black disabled:opacity-50"
                >
                  Previous
                </Button>

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3]"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#ffcc99] text-black hover:bg-[#ffe0b3]"
                  >
                    {isSubmitting ? "Submitting..." : "Book Appointment"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}