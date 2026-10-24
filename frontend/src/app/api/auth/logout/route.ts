import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  COOKIE_CUSTOMER_TOKEN,
  COOKIE_ADMIN_TOKEN,
} from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const target = body.target || 'all'; // 'customer' | 'admin' | 'all'

    const cookieStore = await cookies();

    if (target === 'customer' || target === 'all') {
      cookieStore.set(COOKIE_CUSTOMER_TOKEN, '', {
        path: '/',
        maxAge: 0,
      });
    }

    if (target === 'admin' || target === 'all') {
      cookieStore.set(COOKIE_ADMIN_TOKEN, '', {
        path: '/',
        maxAge: 0,
      });
    }

    return NextResponse.json({ success: true, message: 'Logged out successfully.' });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Logout failed.' },
      { status: 500 }
    );
  }
}
