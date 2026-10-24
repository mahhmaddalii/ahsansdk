import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  registerCustomer,
  createSessionToken,
  COOKIE_CUSTOMER_TOKEN,
} from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, area, address, password } = body;

    if (!fullName || !phone || !address || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Name, Phone, Address, and Password).' },
        { status: 400 }
      );
    }

    const safeCustomer = registerCustomer({
      fullName,
      phone,
      email,
      area: area || 'Lahore',
      address,
      password,
    });

    const token = createSessionToken(safeCustomer);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_CUSTOMER_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      user: safeCustomer,
      token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Customer registration failed.' },
      { status: 400 }
    );
  }
}
