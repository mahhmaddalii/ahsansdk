'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Scale, Truck, Info } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    totalCartWeightKg,
    totalCartItemsCount,
    setCustomerPage,
    language,
    t,
  } = useGrocery();

  if (cart.length === 0) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-5 shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          {t.emptyCart}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
          {t.emptyCartSub}
        </p>
        <button
          onClick={() => setCustomerPage('home')}
          className="mt-6 inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          <span>{t.startShopping}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[calc(100vh-180px)] pb-28 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {t.cartTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {totalCartItemsCount} {t.items} • {t.totalWeight}: <strong className="text-emerald-800">{totalCartWeightKg} KG</strong>
            </p>
          </div>
          <button
            onClick={() => setCustomerPage('products')}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline"
          >
            {language === 'ur' ? '+ مزید اشیاء شامل کریں' : '+ Add More Items'}
          </button>
        </div>

        {/* Informational Zero-Price Compliance Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-emerald-900">
              {language === 'ur' ? 'شفاف کریانہ راشن سروس' : 'Standard Wholesale & Household Ordering'}
            </span>
            <p className="text-emerald-800/90 mt-0.5 leading-relaxed">
              {t.cartDisclaimer}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cart Item Cards List */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.packSize}`}
                className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 sm:gap-4 transition-all hover:border-slate-300"
              >
                {/* Product Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                />

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                    {language === 'ur' ? item.product.categoryUrdu : item.product.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                    {language === 'ur' ? item.product.nameUrdu : item.product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium border border-slate-200">
                      {item.packSize}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({item.product.unit})
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shrink-0">
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.packSize, -1)}
                    className="p-1 sm:p-1.5 hover:bg-slate-200 text-slate-700 active:bg-slate-300 transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 sm:px-3 text-xs sm:text-sm font-bold text-slate-800 min-w-[28px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.productId, item.packSize, 1)}
                    className="p-1 sm:p-1.5 hover:bg-slate-200 text-slate-700 active:bg-slate-300 transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.productId, item.packSize)}
                  className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary Card (Desktop) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              {t.orderSummary}
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{language === 'ur' ? 'کل منتخب اشیاء:' : 'Total Items:'}</span>
                <span className="font-bold text-slate-900">{totalCartItemsCount} {t.items}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.totalWeight}:</span>
                </span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  ~ {totalCartWeightKg} KG
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.deliveryCharge}:</span>
                </span>
                <span className="text-slate-500 italic text-right">
                  {language === 'ur' ? 'چیک آؤٹ پر معلوم ہوگا' : 'Calculated at checkout'}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-100 text-slate-800 font-semibold">
                <span>{language === 'ur' ? 'کل بل:' : 'Order Total:'}</span>
                <span className="text-emerald-700 font-bold">
                  {language === 'ur' ? 'چیک آؤٹ پر ظاہر ہوگا' : 'Available at checkout'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCustomerPage('checkout')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 text-sm"
              >
                <span>{t.proceedToCheckout}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{language === 'ur' ? 'کیش آن ڈیلیوری کی مکمل سہولت دستیاب ہے' : 'Cash on Delivery (COD) supported upon arrival'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Bar for Mobile Devices */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg z-30">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-500">
              {totalCartItemsCount} {t.items} • ~{totalCartWeightKg} KG
            </div>
            <div className="text-xs font-extrabold text-emerald-800">
              {language === 'ur' ? 'کل بل چیک آؤٹ پر' : 'Total at checkout'}
            </div>
          </div>
          <button
            onClick={() => setCustomerPage('checkout')}
            className="flex items-center gap-1.5 bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md"
          >
            <span>{t.proceedToCheckout}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
