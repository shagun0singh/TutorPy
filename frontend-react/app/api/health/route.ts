// Next.js API route: GET /api/health
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: 'ok', mongodb: 'connected' });
  } catch (error) {
    return NextResponse.json({ status: 'ok', mongodb: 'disconnected' });
  }
}
