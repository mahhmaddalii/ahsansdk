'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CustomerPortal } from '../components/customer/CustomerPortal';
import { CustomerAuthScreen } from '../components/customer/CustomerAuthScreen';

export default function Home() {
  const { customerUser, isAuthLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch and wait for client mount + auth check
  if (!mounted || isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-emerald-400">کریانہ ایکسپریس • Karyana Express</p>
          <p className="text-xs text-slate-400">Securing your grocery session...</p>
        </div>
      </div>
    );
  }

  // If customer is NOT logged in, render Customer Login & Sign Up screen
  if (!customerUser) {
    return <CustomerAuthScreen />;
  }

  // Once authenticated as a customer, render the Customer Grocery Ordering Store
  // Strictly NO admin links, switchers, or preview tools are rendered
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <CustomerPortal />
    </div>
  );
}
