import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let query: string | undefined;
  try {
    const body = await req.json();
    query = body.query;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required and must be a valid string' }, { status: 400 });
    }

    // Get backend URL from environment variable or use default
    const backendBaseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.PYTHON_BACKEND_URL ||
      'https://api.growwithgarry.in';

    const sanitizedBase = backendBaseUrl.replace(/\/+$/, '');
    const backendUrl = sanitizedBase.endsWith('/ask') ? sanitizedBase : `${sanitizedBase}/ask`;

    // Make request to Python RAG backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query.trim() }),
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(30000), // 30 seconds timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', response.status, errorText);

      // Provide fallback response for any backend errors
      const fallbackResponse = {
        answer: `I apologize, but the advanced legal AI system encountered an issue. Here's some general guidance for your query: "${query.trim()}"

General Legal Resources:
• Supreme Court of India: sci.gov.in
• Ministry of Law and Justice: lawmin.gov.in
• Indian Kanoon (free case law database): indiankanoon.org
• Bar Council of India: barcouncilofindia.org

For specific legal advice, please consult with a qualified lawyer in your jurisdiction.

Common Legal Information:
• Fundamental Rights are covered in Articles 12-35 of the Indian Constitution
• The Indian Penal Code (IPC) covers criminal offenses
• The Code of Civil Procedure governs civil court proceedings
• Personal laws vary based on religion and community

Please note: This is a general response due to technical difficulties. Always seek professional legal advice for your specific situation.`,
        metadata: { fallback: true, backend_error: response.status, timestamp: new Date().toISOString() },
        sources: null
      };

      return NextResponse.json(fallbackResponse, { status: 200 });
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== 'object') {
      const fallbackResponse = {
        answer: `The legal AI system returned an unexpected response format. Here's general guidance for your query: "${query.trim()}"

For reliable legal information, please refer to:
• Official government legal websites
• Established legal databases
• Qualified legal professionals

This platform aims to provide AI-assisted legal information, but due to technical issues, please verify any information with authoritative sources.`,
        metadata: { fallback: true, reason: 'invalid_response_structure', timestamp: new Date().toISOString() },
        sources: null
      };
      return NextResponse.json(fallbackResponse, { status: 200 });
    }

    // Enhanced response formatting for better output
    const formattedAnswer = data.answer || data.response || 'No response received from RAG model';

    return NextResponse.json({
      answer: formattedAnswer,
      metadata: {
        timestamp: new Date().toISOString(),
        model: 'Llama3-RAG', // Default fallback
        ...data.metadata, // Allow backend to override
        query_processed: query.trim()
      },
      sources: data.sources || null,
      confidence: data.confidence || null
    });

  } catch (error: any) {
    console.error('Error connecting to Python backend:', error);

    // Provide a fallback response when backend is unavailable
    const fallbackResponse = {
      answer: `I apologize, but the advanced legal AI system is currently unavailable. However, I can provide some general guidance:

For your query: "${(query ?? '').trim()}"

Here are some general resources and suggestions:
• Visit the official website of the Supreme Court of India (sci.gov.in) for case laws and judgments
• Check the Ministry of Law and Justice website (lawmin.gov.in) for legal acts and amendments
• Consult with a qualified legal professional for specific legal advice
• Use legal databases like Manupatra or SCC Online for comprehensive legal research

Please note: This is a general response. For specific legal advice, always consult with a qualified lawyer.`,
      metadata: { fallback: true, timestamp: new Date().toISOString() },
      sources: null
    };

    if (error.name === 'TimeoutError') {
      return NextResponse.json(fallbackResponse, { status: 200 });
    } else if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(fallbackResponse, { status: 200 });
    } else {
      return NextResponse.json(fallbackResponse, { status: 200 });
    }
  }
}
