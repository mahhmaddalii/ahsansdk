import React from 'react';
import { useRouter } from 'next/navigation';
import { useGrocery } from '../../context/GroceryContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, Search, Bell, Plus, Globe, Shield, RefreshCw, LogOut } from 'lucide-react';

export const AdminTopNav: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const router = useRouter();
  const { adminUser, adminLogout } = useAuth();
  const {
    adminPage,
    setAdminPage,
    language,
    setLanguage,
    t,
    orders,
    batches,
    products,
    setPortalMode,
  } = useGrocery();

  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const lowStock = products.filter((p) => p.stock <= p.minStock).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 capitalize flex items-center gap-2">
            <span>{adminPage.replace('-', ' ')}</span>
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
              Live DB
            </span>
          </h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Product action */}
        <button
          onClick={() => setAdminPage('products')}
          className="hidden sm:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? 'پروڈکٹ شامل کریں' : 'Add Product'}</span>
        </button>

        {/* Quick Orders shortcut */}
        <button
          onClick={() => setAdminPage('orders')}
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          title="Orders"
        >
          <Bell className="w-4 h-4" />
          {pendingOrders > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
          )}
        </button>

        {/* Language Switch */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-700" />
          <span>{language === 'en' ? 'اردو' : 'English'}</span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            {adminUser?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block text-left rtl:text-right">
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              {adminUser?.name || 'Administrator'}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold block leading-tight">
              {adminUser?.role === 'admin' ? 'Store Owner' : 'Staff'}
            </span>
          </div>
        </div>

        {/* Explicit Admin Logout Button */}
        <button
          onClick={async () => {
            await adminLogout();
            router.push('/admin/login');
          }}
          title={language === 'ur' ? 'ایڈمن لاگ آؤٹ' : 'Admin Logout'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'ur' ? 'لاگ آؤٹ' : 'Admin Logout'}</span>
        </button>
      </div>
    </header>
  );
};
