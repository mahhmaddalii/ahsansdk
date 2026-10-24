'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Home, Grid, Search, Clock, User, ShoppingBag } from 'lucide-react';

export const CustomerMobileNav: React.FC = () => {
  const { customerPage, setCustomerPage, t, cart, setSelectedCategory } = useGrocery();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 z-40 px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setCustomerPage('home');
            setSelectedCategory(null);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-w-[56px] transition-colors ${
            customerPage === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight">{t.navHome}</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            setCustomerPage('categories');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-w-[56px] transition-colors ${
            customerPage === 'categories' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight">{t.navCategories}</span>
        </button>

        {/* Cart - Center Action */}
        <button
          onClick={() => setCustomerPage('cart')}
          className="relative -top-2 flex flex-col items-center justify-center bg-emerald-700 text-white w-12 h-12 rounded-full shadow-md hover:bg-emerald-800 transition-transform active:scale-95"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* Orders */}
        <button
          onClick={() => setCustomerPage('orders')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-w-[56px] transition-colors ${
            customerPage === 'orders' || customerPage === 'tracking'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight">{t.navOrders}</span>
        </button>

        {/* Account */}
        <button
          onClick={() => setCustomerPage('account')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-w-[56px] transition-colors ${
            customerPage === 'account' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] leading-tight">{t.navAccount}</span>
        </button>
      </div>
    </nav>
  );
};
