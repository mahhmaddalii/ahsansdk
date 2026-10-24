'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGrocery } from '../../context/GroceryContext';
import {
  ShoppingBag,
  Phone,
  Lock,
  Mail,
  User,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Truck,
  Scale,
} from 'lucide-react';

export const CustomerAuthScreen: React.FC = () => {
  const { customerLogin, customerSignUp } = useAuth();
  const { language, setLanguage, deliveryZones } = useGrocery();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(deliveryZones[0]?.area || 'Gulberg III, Lahore');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  // Auto fill demo customer credentials
  const fillDemoCustomer = () => {
    setMode('login');
    setLoginIdentifier('salman@karyana.pk');
    setLoginPassword('customer123');
    setErrorMsg('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg(language === 'ur' ? 'براہ کرم فون یا ای میل اور پاس ورڈ درج کریں۔' : 'Please enter your phone/email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await customerLogin({
      identifier: loginIdentifier,
      password: loginPassword,
    });
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim() || !address.trim() || !password.trim()) {
      setErrorMsg(language === 'ur' ? 'براہ کرم تمام لازمی فیلڈز مکمل کریں۔' : 'Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg(language === 'ur' ? 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے۔' : 'Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const res = await customerSignUp({
      fullName,
      phone,
      email: email.trim() || undefined,
      area,
      address,
      password,
    });
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Registration failed. Please try again.');
    }
  };

  const isUr = language === 'ur';

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-slate-50 to-emerald-50/30 flex flex-col justify-between" dir={isUr ? 'rtl' : 'ltr'}>
      {/* Top Bar with Brand & Language */}
      <header className="border-b border-emerald-100/80 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {isUr ? 'کریانہ' : 'Karyana'}
                </span>
                <span className="text-xl font-extrabold text-emerald-700 tracking-tight">
                  {isUr ? 'ایکسپریس' : 'Express'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isUr ? 'لاہور میں خالص راشن اور تیز ترین ترسیل' : 'Doorstep Grocery Delivery • Lahore'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(isUr ? 'en' : 'ur')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-200 text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              {isUr ? 'English' : 'اردو'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Center Auth Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Card Shell */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 p-6 text-white text-center relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 text-emerald-100 text-[11px] font-medium mb-2 border border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>{isUr ? 'کسٹمر پورٹل • محفوظ اور تصدیق شدہ' : 'Customer Portal • 100% Guaranteed Staples'}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                {mode === 'login'
                  ? isUr ? 'خوش آمدید! اکاؤنٹ میں داخل ہوں' : 'Welcome Back'
                  : isUr ? 'نیا گاہک اکاؤنٹ بنائیں' : 'Create Customer Account'}
              </h1>
              <p className="text-xs text-emerald-100/90 mt-1 max-w-xs mx-auto">
                {mode === 'login'
                  ? isUr ? 'اپنا آرڈر جاری رکھنے کے لیے لاگ ان کریں' : 'Log in to order fresh chakki atta, basmati rice, ghee & lentils'
                  : isUr ? 'چند سیکنڈز میں اکاؤنٹ بنائیں اور کیش آن ڈیلیوری آرڈر کریں' : 'Register in seconds for certified weight staples & COD doorstep delivery'}
              </p>
            </div>

            {/* Quick Demo Credentials Bar */}
            <div className="bg-emerald-50/80 border-b border-emerald-100 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isUr ? 'ٹیسٹ اکاؤنٹ دستیاب ہے:' : 'Testing? Use Demo Account:'}</span>
              </div>
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white hover:bg-emerald-100/70 border border-emerald-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {isUr ? 'ڈیمو کسٹمر لاگ ان' : 'Fill Demo Info'}
              </button>
            </div>

            {/* Toggle Tabs (Login vs Sign Up) */}
            <div className="p-6">
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isUr ? 'لاگ ان کریں' : 'Customer Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isUr ? 'نیا اکاؤنٹ (سائن اپ)' : 'New Customer'}
                </button>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* LOGIN FORM */}
              {mode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4" autoComplete="off">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isUr ? 'فون نمبر یا ای میل' : 'Phone Number or Email'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="0300-4829104 or salman@karyana.pk"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-4 rtl:pr-10"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        {isUr ? 'پاس ورڈ' : 'Password'}
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono">Demo: customer123</span>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-4 rtl:pr-10"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{isUr ? 'لاگ ان کریں اور خریداری شروع کریں' : 'Log In to Store'}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* SIGNUP FORM */}
              {mode === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5" autoComplete="off">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isUr ? 'پورا نام *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Salman"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-3 rtl:pr-9"
                      />
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isUr ? 'موبائل نمبر *' : 'Phone Number *'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0300-1234567"
                          required
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-3 rtl:pr-9"
                        />
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isUr ? 'ای میل (اختیاری)' : 'Email (Optional)'}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="salman@gmail.com"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-3 rtl:pr-9"
                        />
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isUr ? 'ڈیلیوری ایریا (لاہور) *' : 'Delivery Area (Lahore) *'}
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900"
                    >
                      {deliveryZones.map((z) => (
                        <option key={z.id} value={z.area}>
                          {z.area} ({z.avgTime})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isUr ? 'مکمل گھر کا پتہ *' : 'Complete Delivery Address *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House #, Street #, Block/Phase"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-3 rtl:pr-9"
                      />
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isUr ? 'پاس ورڈ (کم از کم 6 حروف) *' : 'Password (min 6 characters) *'}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-3 rtl:pr-9"
                      />
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-3 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{isUr ? 'اکاؤنٹ بنائیں اور خریداری کریں' : 'Create Account & Start Shopping'}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Value Props Footer in Card */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600">
              <div className="flex flex-col items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold">{isUr ? 'سو فیصد خالص وزن' : 'Certified Weights'}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold">{isUr ? 'تیز رفتار ڈیلیوری' : 'Same-Day Dispatch'}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold">{isUr ? 'کیش آن ڈیلیوری' : 'Cash On Delivery'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Bottom Copyright */}
      <footer className="py-4 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Karyana Express. {isUr ? 'تمام حقوق محفوظ ہیں' : 'All rights reserved.'}</p>
      </footer>
    </div>
  );
};
