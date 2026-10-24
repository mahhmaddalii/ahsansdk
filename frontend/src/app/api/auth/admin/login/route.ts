import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  DEMO_ADMIN_USER,
  createSessionToken,
  COOKIE_ADMIN_TOKEN,
} from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please enter admin email and password.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Verify against authorized Admin credentials
    // Demo admin credentials: admin@karyana.pk / admin123
    if (cleanEmail !== DEMO_ADMIN_USER.email?.toLowerCase() || password !== 'admin123') {
      return NextResponse.json(
        { error: 'Invalid administrative credentials. Access restricted to authorized store staff.' },
        { status: 401 }
      );
    }

    const token = createSessionToken(DEMO_ADMIN_USER);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_ADMIN_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      user: DEMO_ADMIN_USER,
      token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Admin authentication failed.' },
      { status: 500 }
    );
  }
}
