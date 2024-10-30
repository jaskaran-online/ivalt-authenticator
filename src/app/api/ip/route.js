import { NextResponse } from 'next/server';

export async function GET(request) {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : request.ip;

    return NextResponse.json({ ip });
}