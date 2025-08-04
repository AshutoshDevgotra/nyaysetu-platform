import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required and must be a valid string' }, { status: 400 });
    }

    // Get backend URL from environment variable or use default
    const backendUrl = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

    // Make request to Python RAG backend
    const response = await fetch(`${backendUrl}/ask`, {
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

      if (response.status === 500) {
        return NextResponse.json({ error: 'Internal server error in RAG model' }, { status: 500 });
      } else if (response.status === 404) {
        return NextResponse.json({ error: 'RAG endpoint not found' }, { status: 404 });
      } else {
        return NextResponse.json({ error: 'Backend service unavailable' }, { status: 503 });
      }
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid response from backend' }, { status: 502 });
    }

    return NextResponse.json({
      answer: data.answer || data.response || 'No response received from RAG model',
      metadata: data.metadata || null,
      sources: data.sources || null
    });

  } catch (error: any) {
    console.error('Error connecting to Python backend:', error);

    if (error.name === 'TimeoutError') {
      return NextResponse.json({ error: 'Request timeout - backend took too long to respond' }, { status: 408 });
    } else if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ error: 'Cannot connect to RAG backend - please ensure it is running' }, { status: 503 });
    } else {
      return NextResponse.json({ error: 'Failed to process query' }, { status: 500 });
    }
  }
}
