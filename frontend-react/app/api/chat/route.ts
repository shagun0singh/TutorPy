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
    // Verify authentication
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json(
        { error: 'No token, authorization denied' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token is not valid' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const { message } = await req.json();
    
    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    console.log('📩 Received message:', message);
    
    // TutorPy system prompt
    const systemPrompt = `You are TutorPy, an AI coding tutor.
Your job is to help users THINK, not solve problems.
Support only Python.
First decide if the problem statement is clear.
If unclear, ask concise clarifying questions about input, output, or constraints.
If clear, respond with:
'✅ Thinking mode'
followed by a short explanation of how to approach the problem step by step.
Do not provide code.
Do not provide full algorithms.
Keep responses concise and encouraging (max 4–5 sentences).`;
    
    let reply: string;
    
    // Check if we should use demo mode
    if (process.env.DEMO_MODE === 'true') {
      reply = `✅ Thinking mode\n\nGreat question! To ${message.toLowerCase()}, think about breaking the problem into steps:\n1. First, understand what data structure you're working with\n2. Consider what Python built-in functions or methods might help\n3. Think about edge cases (empty inputs, special characters)\n4. Try writing pseudocode before actual code\n\nTry implementing a solution step by step!`;
      console.log('🔧 Demo mode active - using simulated response');
    } else {
      // Call Groq API
      const groq = getGroqClient();
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 200,
      });
      
      reply = chatCompletion.choices[0].message.content || 'Failed to generate response';
    }
    
    console.log('✅ AI reply generated');
    
    return NextResponse.json({ reply });
    
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
