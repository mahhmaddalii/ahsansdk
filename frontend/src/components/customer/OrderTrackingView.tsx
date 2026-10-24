'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Home,
  MapPin,
  Scale,
  Phone,
  User,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { OrderStatus } from '../../types/grocery';

const statusSteps: { key: OrderStatus; labelEn: string; labelUr: string; icon: React.FC<{ className?: string }> }[] = [
  { key: 'Pending', labelEn: 'Order Received', labelUr: 'آرڈر موصول ہوا', icon: Clock },
  { key: 'Confirmed', labelEn: 'Confirmed', labelUr: 'تصدیق ہو گئی', icon: CheckCircle2 },
  { key: 'Preparing', labelEn: 'Preparing', labelUr: 'گودام میں پیکنگ', icon: Package },
  { key: 'Dispatched', labelEn: 'Dispatched', labelUr: 'رائیڈر روانہ', icon: Truck },
  { key: 'Delivered', labelEn: 'Delivered', labelUr: 'پہنچ گیا ہے', icon: Home },
];

export const OrderTrackingView: React.FC = () => {
  const {
    orders,
    selectedOrderForDetail,
    latestPlacedOrder,
    setCustomerPage,
    language,
    t,
  } = useGrocery();

  const activeOrder = selectedOrderForDetail || latestPlacedOrder || orders[0];

  if (!activeOrder) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-slate-500">No active order to track.</p>
        <button
          onClick={() => setCustomerPage('home')}
          className="mt-4 bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          {t.startShopping}
        </button>
      </div>
    );
  }

  // Calculate current step index
  const statusHierarchy: OrderStatus[] = ['Pending', 'Confirmed', 'Preparing', 'Dispatched', 'Delivered'];
  const currentStepIndex = statusHierarchy.indexOf(activeOrder.status);

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[calc(100vh-180px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <button
          onClick={() => setCustomerPage('orders')}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{language === 'ur' ? 'میرے تمام آرڈرز' : 'Back to Order History'}</span>
        </button>

        {/* Top Tracking Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-slate-500 block">{t.orderNumber}:</span>
              <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900">
                {activeOrder.id}
              </h1>
            </div>

            <div className="text-right rtl:text-left">
              <span className="text-xs text-slate-500 block">{t.estimatedArrival}:</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700">
                {activeOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Visual Step-by-Step Progress Timeline */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              {t.trackingTitle}
            </h3>

            {/* Desktop / Tablet Timeline Horizontal */}
            <div className="hidden sm:grid grid-cols-5 gap-2 relative">
              {statusSteps.map((step, idx) => {
                const isPassed = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="flex flex-col items-center text-center relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-sm'
                          : isPassed
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-bold mt-2 leading-tight ${
                        isCurrent ? 'text-emerald-800 font-extrabold' : isPassed ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {language === 'ur' ? step.labelUr : step.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="sm:hidden space-y-4">
              {statusSteps.map((step, idx) => {
                const isPassed = currentStepIndex >= idx;
                const isCurrent = currentStepIndex === idx;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : isPassed
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-emerald-800' : isPassed ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        {language === 'ur' ? step.labelUr : step.labelEn}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {language === 'ur' ? 'جاری ہے' : 'In Progress'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Staff or Rider note if available */}
          {activeOrder.assignedStaff && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <div>
                  <span className="font-semibold block">{language === 'ur' ? 'تفویض کردہ رائیڈر:' : 'Assigned Rider / Van:'}</span>
                  <span className="font-bold text-emerald-900">{activeOrder.assignedStaff}</span>
                </div>
              </div>
              <span className="text-[11px] bg-white px-2 py-1 rounded-md border border-emerald-300 font-mono">
                {activeOrder.status}
              </span>
            </div>
          )}

          {/* Address and Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-medium block">{t.customerInfo}:</span>
              <p className="font-bold text-slate-800 mt-0.5">{activeOrder.customerName}</p>
              <p className="text-slate-600 font-mono">{activeOrder.customerPhone}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t.deliveryAddress}:</span>
              <p className="font-bold text-slate-800 mt-0.5">{activeOrder.address}</p>
              <p className="text-emerald-800 font-medium">{activeOrder.area}</p>
            </div>
          </div>

          {/* Ordered items with quantities (NO individual prices) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
              {language === 'ur' ? 'آرڈر کی اشیاء:' : 'Package Inventory & Quantities:'}
            </span>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between bg-white text-xs">
                  <div>
                    <p className="font-bold text-slate-900">
                      {language === 'ur' ? item.productNameUrdu : item.productName}
                    </p>
                    <p className="text-[11px] text-slate-500">Pack: {item.packSize}</p>
                  </div>
                  <div className="bg-slate-100 px-3 py-1 rounded-lg text-slate-800 font-bold text-xs">
                    Qty: {item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Aggregate Payable Total */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-600 block">{t.finalPayableTotal}:</span>
              <span className="text-[10px] text-slate-400">Cash on Delivery</span>
            </div>
            <span className="text-xl font-extrabold text-emerald-800">
              {activeOrder.finalTotal.toLocaleString()} PKR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
