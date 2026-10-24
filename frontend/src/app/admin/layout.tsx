'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useGrocery } from '../../context/GroceryContext';
import { ShieldAlert, Lock, ArrowRight } from 'lucide-react';

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminUser, isAuthLoading } = useAuth();
  const { setPortalMode } = useGrocery();

  // If this is the login page itself, do not apply the auth protection shield
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Keep grocery context aligned to admin mode for ERP screens
    setPortalMode('admin');
  }, [setPortalMode]);

  useEffect(() => {
    if (!isLoginPage && !isAuthLoading && (!adminUser || adminUser.role !== 'admin')) {
      router.replace('/admin/login?denied=1');
    }
  }, [adminUser, isAuthLoading, router, isLoginPage]);

  // If on login page, let it render directly without blocking
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state guard
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  // Unauthorized guard (renders access denied shield while redirecting)
  if (!adminUser || adminUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center mx-auto mb-4 text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">403 - Administrative Access Denied</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            This module requires an authenticated Administrator session. Customers and unauthorized visitors are strictly barred from ERP configurations, pricing, and accounting ledgers.
          </p>
          <a
            href="/admin/login?denied=1"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Lock className="w-4 h-4" />
            <span>Proceed to Admin Authentication</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/"
            className="inline-block mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Return to Customer Store
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
