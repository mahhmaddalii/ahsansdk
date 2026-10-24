'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AuthUser,
  CustomerLoginCredentials,
  CustomerSignUpCredentials,
  AdminLoginCredentials,
} from '../types/auth';
import { DEMO_ADMIN_USER, DEMO_CUSTOMER_USER } from '../lib/auth';

interface AuthContextType {
  // Session States
  customerUser: AuthUser | null;
  adminUser: AuthUser | null;
  isAuthLoading: boolean;

  // Customer Actions
  customerLogin: (credentials: CustomerLoginCredentials) => Promise<{ success: boolean; error?: string }>;
  customerSignUp: (credentials: CustomerSignUpCredentials) => Promise<{ success: boolean; error?: string }>;
  customerLogout: () => Promise<void>;

  // Admin Actions
  adminLogin: (credentials: AdminLoginCredentials) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customerUser, setCustomerUser] = useState<AuthUser | null>(null);
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Initialize and verify session on load
  useEffect(() => {
    async function initAuth() {
      try {
        // First check client storage for instant rendering
        const cachedCustomer = localStorage.getItem('karyana_customer_user');
        const cachedAdmin = localStorage.getItem('karyana_admin_user');

        if (cachedCustomer) {
          try {
            setCustomerUser(JSON.parse(cachedCustomer));
          } catch {}
        }

        if (cachedAdmin) {
          try {
            setAdminUser(JSON.parse(cachedAdmin));
          } catch {}
        }

        // Verify with server endpoint
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setCustomerUser(data.customerUser || null);
          setAdminUser(data.adminUser || null);

          if (data.customerUser) {
            localStorage.setItem('karyana_customer_user', JSON.stringify(data.customerUser));
          } else {
            localStorage.removeItem('karyana_customer_user');
          }

          if (data.adminUser) {
            localStorage.setItem('karyana_admin_user', JSON.stringify(data.adminUser));
          } else {
            localStorage.removeItem('karyana_admin_user');
          }
        }
      } catch (e) {
        console.error('Failed to verify authentication session:', e);
      } finally {
        setIsAuthLoading(false);
      }
    }

    initAuth();
  }, []);

  // Customer Login
  const customerLogin = async (credentials: CustomerLoginCredentials) => {
    try {
      const res = await fetch('/api/auth/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed.' };
      }

      setCustomerUser(data.user);
      localStorage.setItem('karyana_customer_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during login.' };
    }
  };

  // Customer Sign Up
  const customerSignUp = async (credentials: CustomerSignUpCredentials) => {
    try {
      const res = await fetch('/api/auth/customer/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Sign up failed.' };
      }

      setCustomerUser(data.user);
      localStorage.setItem('karyana_customer_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during sign up.' };
    }
  };

  // Customer Logout
  const customerLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: 'customer' }),
      });
    } catch {}

    setCustomerUser(null);
    localStorage.removeItem('karyana_customer_user');
  };

  // Admin Login
  const adminLogin = async (credentials: AdminLoginCredentials) => {
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Admin login failed.' };
      }

      setAdminUser(data.user);
      localStorage.setItem('karyana_admin_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during admin login.' };
    }
  };

  // Admin Logout
  const adminLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: 'admin' }),
      });
    } catch {}

    setAdminUser(null);
    localStorage.removeItem('karyana_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        customerUser,
        adminUser,
        isAuthLoading,
        customerLogin,
        customerSignUp,
        customerLogout,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
