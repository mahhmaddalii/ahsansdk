import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  parseSessionToken,
  COOKIE_CUSTOMER_TOKEN,
  COOKIE_ADMIN_TOKEN,
} from '../../../../lib/auth';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const customerCookie = cookieStore.get(COOKIE_CUSTOMER_TOKEN)?.value;
  const adminCookie = cookieStore.get(COOKIE_ADMIN_TOKEN)?.value;

  let customerUser = null;
  let adminUser = null;

  if (customerCookie) {
    const parsed = parseSessionToken(customerCookie);
    if (parsed && parsed.user.role === 'customer') {
      customerUser = parsed.user;
    }
  }

  if (adminCookie) {
    const parsed = parseSessionToken(adminCookie);
    if (parsed && parsed.user.role === 'admin') {
      adminUser = parsed.user;
    }
  }

  return NextResponse.json({
    customerUser,
    adminUser,
  });
}
