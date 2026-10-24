'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useGrocery } from '../../../context/GroceryContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  KeyRound,
  ShieldAlert,
  Server,
  Layers,
} from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDenied = searchParams.get('denied') === '1';

  const { adminLogin, adminUser } = useAuth();
  const { language, setLanguage } = useGrocery();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(
    isDenied
      ? 'Access Denied: Customer accounts cannot access the Admin Management Panel. Please log in with authorized administrator credentials.'
      : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in as admin, provide quick jump or auto-redirect
  React.useEffect(() => {
    if (adminUser && adminUser.role === 'admin') {
      router.push('/admin');
    }
  }, [adminUser, router]);

  const fillDemoAdmin = () => {
    setEmail('admin@karyana.pk');
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await adminLogin({ email, password });
    setIsSubmitting(false);

    if (res.success) {
      router.push('/admin');
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please verify administrative credentials.');
    }
  };

  const isUr = language === 'ur';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white" dir={isUr ? 'rtl' : 'ltr'}>
      {/* Top Bar with System Security Badge & Language */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-emerald-400 tracking-wider">ERP BACK-OFFICE</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">v2.4</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isUr ? 'کریانہ ایکسپریس • انتظامی کنسول' : 'Karyana Express • Secure Operations Portal'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(isUr ? 'en' : 'ur')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {isUr ? 'English' : 'اردو'}
          </button>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          {/* Access Denied Banner if redirected */}
          {isDenied && (
            <div className="mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3 animate-in fade-in">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-200">Restricted Admin Environment</p>
                <p className="mt-0.5 text-amber-300/90 text-[11px]">
                  Customer accounts are not authorized to view product costs, margins, or ERP configurations.
                </p>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden relative">
            {/* Subtle top glow */}
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"></div>

            <div className="p-6 sm:p-8">
              {/* Security Shield Icon Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700/80 mb-3 shadow-inner">
                  <KeyRound className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono font-medium mb-2">
                  <Server className="w-3 h-3 text-emerald-400" />
                  <span>AUTHORIZED PERSONNEL ONLY</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {isUr ? 'انتظامیہ لاگ ان' : 'Administrator Login'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  {isUr ? 'اسٹور کی ترتیبات اور قیمتوں کے انتظام کے لیے داخل ہوں' : 'Enter enterprise credentials to access inventory, pricing & accounting'}
                </p>
              </div>

              {/* Demo Credentials Helper */}
              <div className="mb-5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between">
                <div className="text-xs text-emerald-300">
                  <p className="font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Demo Admin Credentials</span>
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">admin@karyana.pk • admin123</p>
                </div>
                <button
                  type="button"
                  onClick={fillDemoAdmin}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 transition-colors cursor-pointer"
                >
                  Fill Demo
                </button>
              </div>

              {/* Error Alert */}
              {errorMsg && !isDenied && (
                <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {isUr ? 'ایڈمن ای میل' : 'Administrator Email'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@karyana.pk"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all rtl:pl-4 rtl:pr-10"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      {isUr ? 'پاس ورڈ' : 'Password'}
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">Min 8 chars</span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all rtl:pl-4 rtl:pr-10"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{isUr ? 'ایڈمن کنسول میں داخل ہوں' : 'Authenticate & Enter Console'}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>

              {/* Customer Portal Link for confused users */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-500">
                  {isUr ? 'کیا آپ گاہک ہیں؟' : 'Looking to place a grocery order?'}
                </p>
                <a
                  href="/"
                  className="inline-block mt-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  ← {isUr ? 'کسٹمر اسٹور پر واپس جائیں' : 'Return to Customer Ordering Store'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>Karyana Express ERP Security Subsystem • TLS 1.3 Encrypted Session</p>
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
