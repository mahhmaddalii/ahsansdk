'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { CustomerHeader } from './CustomerHeader';
import { CustomerHero } from './CustomerHero';
import { CategoryShowcase } from './CategoryShowcase';
import { ProductGrid } from './ProductGrid';
import { ProductDetailModal } from './ProductDetailModal';
import { CartView } from './CartView';
import { CheckoutView } from './CheckoutView';
import { OrderConfirmationView } from './OrderConfirmationView';
import { OrderTrackingView } from './OrderTrackingView';
import { CustomerAccountView } from './CustomerAccountView';
import { CustomerFooter } from './CustomerFooter';
import { CustomerMobileNav } from './CustomerMobileNav';

export const CustomerPortal: React.FC = () => {
  const { customerPage, selectedCategory, t, language } = useGrocery();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Customer Header */}
      <CustomerHeader />

      {/* Main Page Routing */}
      <main className="flex-1">
        {customerPage === 'home' && (
          <>
            <CustomerHero />
            <CategoryShowcase />
            <ProductGrid title={language === 'ur' ? 'سب سے زیادہ خریدی جانے والی ضروری اشیاء' : 'Frequently Ordered Groceries'} limit={8} />
          </>
        )}

        {customerPage === 'categories' && (
          <div className="py-6">
            <CategoryShowcase />
            <ProductGrid />
          </div>
        )}

        {customerPage === 'products' && (
          <div className="py-4">
            <ProductGrid />
          </div>
        )}

        {customerPage === 'cart' && <CartView />}
        {customerPage === 'checkout' && <CheckoutView />}
        {customerPage === 'confirmation' && <OrderConfirmationView />}
        {customerPage === 'tracking' && <OrderTrackingView />}
        {(customerPage === 'account' ||
          customerPage === 'orders' ||
          customerPage === 'addresses' ||
          customerPage === 'policy' ||
          customerPage === 'contact') && <CustomerAccountView />}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal />

      {/* Customer Footer */}
      <CustomerFooter />

      {/* Mobile Bottom Navigation Bar */}
      <CustomerMobileNav />
    </div>
  );
};
