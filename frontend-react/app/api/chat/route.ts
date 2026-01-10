// Next.js API route: POST /api/chat
import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { connectDB } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

// Create Groq client lazily (not at module level to avoid build-time errors)
function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY environment variable is not set');
  }
  return new Groq({ apiKey });
}

export async function POST(req: NextRequest) {
  try {
    // Check if we should use Railway backend instead
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (backendUrl) {
      // If NEXT_PUBLIC_API_URL is set, this route shouldn't be called
      // Frontend should call the Railway backend directly
      // But if it reaches here, proxy to backend
      const token = getTokenFromRequest(req);
      const { message } = await req.json();
      
      const backendResponse = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await backendResponse.json();
      return NextResponse.json(data, { status: backendResponse.status });
    }
    
    // If NEXT_PUBLIC_API_URL is not set, return helpful error
    // Note: This code should never execute if NEXT_PUBLIC_API_URL is properly set
    // because the frontend should call Railway directly
    console.error('❌ NEXT_PUBLIC_API_URL is not set! Frontend should call Railway backend directly.');
    return NextResponse.json(
      { 
        error: 'Backend configuration error. NEXT_PUBLIC_API_URL environment variable is not set in Vercel. Please set it to your Railway backend URL.',
        hint: 'Set NEXT_PUBLIC_API_URL in Vercel Dashboard → Settings → Environment Variables'
      },
      { status: 500 }
    );
    
  } catch (error: any) {
    console.error('❌ Error processing message:', error.message);
    
    // Handle Groq API errors
    if (error.message && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Groq API key configuration error.' },
        { status: 500 }
      );
    }
    
    if (error.message && error.message.includes('rate limit')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again.' },
      { status: 500 }
    );
  }
}
