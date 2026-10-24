import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  parseSessionToken,
  COOKIE_ADMIN_TOKEN,
  COOKIE_CUSTOMER_TOKEN,
} from '../../../../lib/auth';
import { INITIAL_PRODUCTS } from '../../../../data/mockGroceryData';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  // Also check Authorization header if token passed explicitly
  const authHeader = request.headers.get('Authorization');
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const cookieToken = cookieStore.get(COOKIE_ADMIN_TOKEN)?.value;
  const token = headerToken || cookieToken;

  if (!token) {
    // Check if customer cookie is present to give informative 403 vs 401
    const customerToken = cookieStore.get(COOKIE_CUSTOMER_TOKEN)?.value;
    if (customerToken) {
      const parsedCustomer = parseSessionToken(customerToken);
      if (parsedCustomer && parsedCustomer.user.role === 'customer') {
        return NextResponse.json(
          {
            error: 'Forbidden: Customers cannot access administrative endpoints or pricing data.',
            code: 'FORBIDDEN_ROLE',
          },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Unauthorized: Administrative authentication session required.',
        code: 'UNAUTHORIZED',
      },
      { status: 401 }
    );
  }

  const session = parseSessionToken(token);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized: Session has expired or token is invalid.',
        code: 'SESSION_EXPIRED',
      },
      { status: 401 }
    );
  }

  // Strict role check: role MUST be admin!
  if (session.user.role !== 'admin') {
    return NextResponse.json(
      {
        error: 'Forbidden: Access denied. Insufficient administrative privileges.',
        code: 'FORBIDDEN_ROLE',
      },
      { status: 403 }
    );
  }

  // Admin has full access to products WITH purchase costs, selling prices, and profit margins
  return NextResponse.json({
    success: true,
    data: INITIAL_PRODUCTS,
    user: session.user,
  });
}
