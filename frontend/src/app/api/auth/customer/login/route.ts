import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  findCustomerByIdentifier,
  createSessionToken,
  COOKIE_CUSTOMER_TOKEN,
  DEMO_CUSTOMER_USER,
} from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Please provide phone/email and password.' },
        { status: 400 }
      );
    }

    const customer = findCustomerByIdentifier(identifier);

    if (!customer) {
      return NextResponse.json(
        { error: 'No customer account found with this email or phone.' },
        { status: 401 }
      );
    }

    if (customer.passwordHash !== password) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    const { passwordHash: _, ...safeCustomer } = customer;
    const token = createSessionToken(safeCustomer);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_CUSTOMER_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      user: safeCustomer,
      token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Customer login failed.' },
      { status: 500 }
    );
  }
}
