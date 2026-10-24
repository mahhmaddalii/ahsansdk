'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { useAuth } from '../../context/AuthContext';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  Store,
  ChevronDown,
  Layers,
  PhoneCall,
  CheckCircle2,
  LogOut,
} from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { customerUser, customerLogout } = useAuth();
  const {
    t,
    language,
    setLanguage,
    customerPage,
    setCustomerPage,
    cart,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useGrocery();

  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCustomerPage('products');
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
            <span>{language === 'ur' ? 'لاہور بھر میں فاسٹ ایکسپریس ڈیلیوری دستیاب ہے' : 'Fast Karyana delivery available across all Lahore sectors'}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-emerald-200 text-[11px]">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3" />
              <span>042-3111-KARYANA (5279)</span>
            </span>
            <span>•</span>
            <span>{language === 'ur' ? 'کیش آن ڈیلیوری' : 'Cash on Delivery'}</span>
          </div>
        </div>
      </div>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Logo */}
          <div
            onClick={() => {
              setCustomerPage('home');
              setSelectedCategory(null);
            }}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {language === 'ur' ? 'کریانہ' : 'Karyana'}
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-700">
                  {language === 'ur' ? 'ایکسپریس' : 'Express'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                {language === 'ur' ? 'خالص اور معیاری راشن' : 'Pure Karyana & Wholesale Groceries'}
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl relative"
            suppressHydrationWarning
            autoComplete="off"
          >
            <div className="relative w-full" suppressHydrationWarning>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                autoComplete="off"
                suppressHydrationWarning
                className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 transition-all rtl:pl-24 rtl:pr-10"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors rtl:right-auto rtl:left-1.5"
              >
                {t.navSearch}
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
            >
              {language === 'en' ? 'اردو' : 'English'}
            </button>

            {/* Account Link & Name */}
            <button
              onClick={() => setCustomerPage('account')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                customerPage === 'account'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                {customerUser?.name?.charAt(0) || 'K'}
              </div>
              <span className="max-w-[120px] truncate">{customerUser?.name?.split(' ')[0] || t.myAccount}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => customerLogout()}
              title={language === 'ur' ? 'لاگ آؤٹ' : 'Log Out'}
              className="hidden sm:flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'خروج' : 'Logout'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCustomerPage('cart')}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-all shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t.cart}</span>
              <span className="bg-white text-emerald-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible on small screens) */}
        <div className="md:hidden pb-3" suppressHydrationWarning>
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full"
            suppressHydrationWarning
            autoComplete="off"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ur' ? 'آٹا، گھی، چاول یا دالیں تلاش کریں...' : 'Search rice, ghee, atta, lentils...'}
              autoComplete="off"
              suppressHydrationWarning
              className="w-full pl-9 pr-20 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 rtl:pl-20 rtl:pr-9"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md rtl:right-auto rtl:left-1"
            >
              {t.navSearch}
            </button>
          </form>
        </div>

        {/* Categories Bar (Desktop) */}
        <div className="hidden md:flex items-center justify-between border-t border-slate-100 py-2 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setCustomerPage('products');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === null && customerPage === 'products'
                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {t.allCategories}
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCustomerPage('products');
                }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {language === 'ur' ? cat.nameUrdu : cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-slate-500 shrink-0">
            <button
              onClick={() => setCustomerPage('policy')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t.navPolicy}
            </button>
            <button
              onClick={() => setCustomerPage('contact')}
              className="hover:text-emerald-700 transition-colors"
            >
              {t.navContact}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
            {t.allCategories}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCustomerPage('products');
                  setMobileMenuOpen(false);
                }}
                className={`text-left rtl:text-right p-2 rounded-lg text-xs border transition-colors ${
                  selectedCategory === cat.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {language === 'ur' ? cat.nameUrdu : cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <button
              onClick={() => {
                setCustomerPage('orders');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left rtl:text-right py-1.5 text-slate-700 hover:text-emerald-700 font-medium"
            >
              {t.navOrders}
            </button>
            <button
              onClick={() => {
                setCustomerPage('account');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left rtl:text-right py-1.5 text-slate-700 hover:text-emerald-700 font-medium"
            >
              {t.navAccount}
            </button>
            <button
              onClick={() => {
                setCustomerPage('policy');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left rtl:text-right py-1.5 text-slate-700 hover:text-emerald-700 font-medium"
            >
              {t.navPolicy}
            </button>
            <button
              onClick={() => {
                setCustomerPage('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left rtl:text-right py-1.5 text-slate-700 hover:text-emerald-700 font-medium"
            >
              {t.navContact}
            </button>
          </div>

          {/* Mobile Logged In User Card & Logout */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                {customerUser?.name?.charAt(0) || 'K'}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{customerUser?.name}</p>
                <p className="text-[10px] text-slate-500">{customerUser?.phone || customerUser?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                customerLogout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-lg hover:bg-rose-100"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'خروج' : 'Logout'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
