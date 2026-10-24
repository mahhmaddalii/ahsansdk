export type UserRole = 'customer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  area?: string;
  address?: string;
  createdAt: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  expiresAt: string;
}

export interface CustomerLoginCredentials {
  identifier: string; // email or phone
  password: string;
}

export interface CustomerSignUpCredentials {
  fullName: string;
  phone: string;
  email?: string;
  area: string;
  address: string;
  password: string;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}
