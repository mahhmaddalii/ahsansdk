import { AuthUser, AuthSession, UserRole } from '../types/auth';

export const COOKIE_CUSTOMER_TOKEN = 'karyana_customer_token';
export const COOKIE_ADMIN_TOKEN = 'karyana_admin_token';

// Demo Users
export const DEMO_ADMIN_USER: AuthUser = {
  id: 'usr_admin_01',
  name: 'Store Administrator',
  email: 'admin@karyana.pk',
  role: 'admin',
  createdAt: '2025-01-01T00:00:00.000Z',
};

export const DEMO_CUSTOMER_USER: AuthUser = {
  id: 'cust_01',
  name: 'Muhammad Salman Khan',
  email: 'salman@karyana.pk',
  phone: '0300-4829104',
  role: 'customer',
  area: 'Gulberg III, Lahore',
  address: 'House # 42, Block C-2, Main Boulevard',
  createdAt: '2025-01-10T12:00:00.000Z',
};

// In-memory customer repository for demo & signup persistence across requests
let registeredCustomers: Array<AuthUser & { passwordHash: string }> = [
  {
    ...DEMO_CUSTOMER_USER,
    passwordHash: 'customer123',
  },
];

export function findCustomerByIdentifier(identifier: string) {
  const clean = identifier.trim().toLowerCase();
  return registeredCustomers.find(
    (c) =>
      (c.email && c.email.toLowerCase() === clean) ||
      (c.phone && c.phone.replace(/[\s-]/g, '') === clean.replace(/[\s-]/g, ''))
  );
}

export function registerCustomer(params: {
  fullName: string;
  phone: string;
  email?: string;
  area: string;
  address: string;
  password: string;
}): AuthUser {
  const existing = findCustomerByIdentifier(params.email || params.phone);
  if (existing) {
    throw new Error('A customer account with this email or phone number already exists.');
  }

  const newCustomer: AuthUser & { passwordHash: string } = {
    id: `cust_${Date.now()}`,
    name: params.fullName.trim(),
    email: params.email ? params.email.trim().toLowerCase() : undefined,
    phone: params.phone.trim(),
    role: 'customer',
    area: params.area.trim(),
    address: params.address.trim(),
    createdAt: new Date().toISOString(),
    passwordHash: params.password,
  };

  registeredCustomers.push(newCustomer);

  const { passwordHash: _, ...safeUser } = newCustomer;
  return safeUser;
}

// Simple token creator with expiry and role verification
export function createSessionToken(user: AuthUser): string {
  const payload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    area: user.area,
    address: user.address,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const str = JSON.stringify(payload);
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64url');
  }
  return btoa(str);
}

export function parseSessionToken(token: string): { user: AuthUser; expiresAt: string } | null {
  try {
    let str = '';
    if (typeof Buffer !== 'undefined') {
      str = Buffer.from(token, 'base64url').toString('utf-8');
    } else {
      str = atob(token);
    }
    const payload = JSON.parse(str);

    if (!payload.userId || !payload.role || !payload.expiresAt) {
      return null;
    }

    if (Date.now() > payload.expiresAt) {
      return null; // Expired
    }

    return {
      user: {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        role: payload.role as UserRole,
        area: payload.area,
        address: payload.address,
        createdAt: new Date(payload.issuedAt).toISOString(),
      },
      expiresAt: new Date(payload.expiresAt).toISOString(),
    };
  } catch {
    return null;
  }
}
