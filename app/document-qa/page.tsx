'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Upload, FileText, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  answer?: string;
  status: 'pending' | 'processing' | 'completed';
}

interface DocumentSession {
  id: string;
  fileName: string;
  uploadedAt: string;
  questions: Question[];
}

export default function DocumentQAPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentSession, setCurrentSession] = useState<DocumentSession | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setIsUploading(true);
    setUploadedFile(file);

    // Simulate file processing
    setTimeout(() => {
      const session: DocumentSession = {
        id: Date.now().toString(),
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        questions: []
      };
      setCurrentSession(session);
      setIsUploading(false);
    }, 2000);
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.trim() || !currentSession) return;

    const question: Question = {
      id: Date.now().toString(),
      text: newQuestion.trim(),
      status: 'processing'
    };

    setCurrentSession(prev => prev ? {
      ...prev,
      questions: [...prev.questions, question]
    } : null);

    setNewQuestion('');
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const sampleAnswers: { [key: string]: string } = {
        'grace period': 'A grace period of thirty days is provided for premium payment after the due date, during which the policy remains in force.',
        'maternity': 'Yes, the policy covers maternity expenses including hospitalization costs for normal delivery and cesarean section after a waiting period of 9 months.',
        'coverage': 'The policy provides comprehensive health insurance coverage including hospitalization, pre and post hospitalization expenses, day care procedures, and ambulance charges.',
        'waiting period': 'Initial waiting period of 30 days applies for all illnesses except accidental injuries. Pre-existing diseases have a waiting period of 2-4 years.',
        'claim': 'Claims can be filed within 30 days of discharge. Required documents include discharge summary, bills, prescriptions, and diagnostic reports.'
      };

      const questionLower = question.text.toLowerCase();
      let answer = 'I could not find specific information about this in the document. Please rephrase your question or contact our support team for assistance.';

      for (const [key, value] of Object.entries(sampleAnswers)) {
        if (questionLower.includes(key)) {
          answer = value;
          break;
        }
      }

      setCurrentSession(prev => prev ? {
        ...prev,
        questions: prev.questions.map(q => 
          q.id === question.id 
            ? { ...q, answer, status: 'completed' }
            : q
        )
      } : null);

      setIsProcessing(false);
    }, 3000);
  };

  const resetSession = () => {
    setCurrentSession(null);
    setUploadedFile(null);
    setNewQuestion('');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#d4af37] mb-4">
            Document Q&A Assistant
          </h1>
          <p className="text-[#ffcc99] max-w-2xl mx-auto">
            Upload your legal documents and ask specific questions to get precise answers extracted from the content.
            Perfect for policy documents, contracts, and legal agreements.
          </p>
        </div>

        {/* Upload Section */}
        {!currentSession && (
          <Card className="bg-[#1a1a1a] border-[#ffcc99] p-8 mb-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Upload Your Document
                </h3>
                <p className="text-[#ffcc99] mb-6">
                  Supported formats: PDF (up to 10MB)
                </p>
              </div>

              <div className="border-2 border-dashed border-[#ffcc99] rounded-lg p-8 hover:border-[#d4af37] transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer block"
                >
                  {isUploading ? (
                    <div className="text-[#d4af37]">
                      <div className="animate-spin w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p>Processing document...</p>
                    </div>
                  ) : (
                    <>
                      <FileText className="w-12 h-12 text-[#ffcc99] mx-auto mb-4" />
                      <p className="text-[#ffcc99] mb-2">
                        Click to browse or drag and drop your PDF here
                      </p>
                      <Button className="bg-[#d4af37] text-black hover:bg-[#c49f27]">
                        Choose File
                      </Button>
                    </>
                  )}
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Document Session */}
        {currentSession && (
          <div className="space-y-6">
            {/* Document Info */}
            <Card className="bg-[#1a1a1a] border-[#ffcc99] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {currentSession.fileName}
                    </h3>
                    <p className="text-[#ffcc99] text-sm">
                      Uploaded on {new Date(currentSession.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={resetSession}
                  variant="outline"
                  className="border-[#ffcc99] text-[#ffcc99] hover:bg-[#ffcc99] hover:text-black"
                >
                  Upload New Document
                </Button>
              </div>
            </Card>

            {/* Question Input */}
            <Card className="bg-[#1a1a1a] border-[#ffcc99] p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-lg font-semibold text-white">Ask a Question</h3>
              </div>
              <div className="flex gap-4">
                <Textarea
                  placeholder="e.g., What is the grace period for this policy? Does it cover maternity expenses?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="flex-1 bg-[#2a2a2a] border-[#444] text-white placeholder-[#888] resize-none"
                  rows={3}
                />
                <Button
                  onClick={handleAddQuestion}
                  disabled={!newQuestion.trim() || isProcessing}
                  className="bg-[#d4af37] text-black hover:bg-[#c49f27] self-end"
                >
                  {isProcessing ? 'Processing...' : 'Ask'}
                </Button>
              </div>
            </Card>

            {/* Questions and Answers */}
            {currentSession.questions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#d4af37] flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Questions & Answers
                </h3>
                
                {currentSession.questions.map((question) => (
                  <Card key={question.id} className="bg-[#1a1a1a] border-[#333] p-6">
                    <div className="space-y-4">
                      {/* Question */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-semibold text-sm">Q</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{question.text}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {question.status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {question.status === 'processing' && (
                            <div className="animate-spin w-5 h-5 border-2 border-[#d4af37] border-t-transparent rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {/* Answer */}
                      {question.answer && (
                        <div className="flex items-start gap-3 pl-11">
                          <div className="w-8 h-8 bg-[#ffcc99] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-black font-semibold text-sm">A</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#ffcc99] leading-relaxed">{question.answer}</p>
                          </div>
                        </div>
                      )}

                      {question.status === 'processing' && (
                        <div className="flex items-start gap-3 pl-11">
                          <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="animate-spin w-4 h-4 border-2 border-[#ffcc99] border-t-transparent rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#888] italic">Analyzing document...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Sample Questions */}
            {currentSession.questions.length === 0 && (
              <Card className="bg-[#1a1a1a] border-[#333] p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Sample Questions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "What is the grace period?",
                    "Does this policy cover maternity?",
                    "What are the waiting periods?",
                    "How do I file a claim?",
                    "What documents are required?",
                    "What is the coverage amount?"
                  ].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => setNewQuestion(sample)}
                      className="text-left p-3 rounded border border-[#444] hover:border-[#ffcc99] text-[#ffcc99] hover:text-white transition-colors"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Info Section */}
        <Card className="bg-[#1a1a1a] border-[#333] p-6 mt-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-semibold mb-2">How it works</h4>
              <ul className="text-[#ffcc99] space-y-1 text-sm">
                <li>• Upload your PDF document (policy, contract, agreement)</li>
                <li>• Ask specific questions about the content</li>
                <li>• Get precise answers extracted from the document</li>
                <li>• All processing is secure and your documents are not stored</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
