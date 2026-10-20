import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  if (process.env.NODE_ENV === 'production') return new Response(null, { status: 404 });
  try {
    const body = await request.json();
    console.log('PUT test received:', body);
    
    return NextResponse.json({
      success: true,
      message: 'PUT method works!',
      received: body
    });
  } catch (error) {
    console.error('PUT test error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Invalid request'
    }, { status: 500 });
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') return new Response(null, { status: 404 });
  return NextResponse.json({
    message: 'PUT test API is working'
  });
}

export const runtime = 'nodejs';
