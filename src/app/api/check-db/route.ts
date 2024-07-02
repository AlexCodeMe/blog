import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const posts = await db.blogPost.findMany();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ success: false, error: 'Database connection error' }, { status: 500 });
  }
}
