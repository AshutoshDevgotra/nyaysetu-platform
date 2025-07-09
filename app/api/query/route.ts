import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query } = await req.json();

  // Simulated response for the search query
  const answer = `You searched for: ${query}`;

  return NextResponse.json({ answer });
}
