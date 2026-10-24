'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  CheckCircle,
  Truck,
  MapPin,
  Phone,
  Scale,
  ShoppingBag,
  Clock,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { latestPlacedOrder, setCustomerPage, setSelectedOrderForDetail, language, t } = useGrocery();

  const order = latestPlacedOrder;

  if (!order) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-slate-500">No recent order found.</p>
        <button
          onClick={() => setCustomerPage('home')}
          className="mt-4 bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          {t.startShopping}
        </button>
      </div>
    );
  }

  const handleTrackOrder = () => {
    setSelectedOrderForDetail(order);
    setCustomerPage('tracking');
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-[calc(100vh-180px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center animate-bounce">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div>
            <span className="badge-emerald px-3 py-1 rounded-full text-xs font-bold">
              {language === 'ur' ? 'آرڈر تصدیق شدہ' : 'Order Received & Queued'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t.orderSuccess}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'ur'
                ? 'آپ کا کریانہ کا سامان گودام سے تیاری کے مراحل میں ہے۔'
                : 'Your grocery order has been assigned to our central warehouse dispatch.'}
            </p>
          </div>

          <div className="inline-block bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
            <span className="text-xs text-slate-500 block">{t.orderNumber}:</span>
            <span className="text-base sm:text-lg font-mono font-extrabold text-emerald-800">
              {order.id}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleTrackOrder}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>{t.trackOrder}</span>
            </button>

            <button
              onClick={() => setCustomerPage('home')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <span>{t.continueShopping}</span>
            </button>

            <a
              href="https://wa.me/923004829104"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.contactSupport}</span>
            </a>
          </div>
        </div>

        {/* Order Details Breakdown Card: STRICT ZERO PRODUCT PRICE */}
        <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">
              {language === 'ur' ? 'آرڈر کی تفصیلات' : 'Order Summary & Details'}
            </h3>
            <span className="text-xs text-slate-500">{order.date}</span>
          </div>

          {/* Customer & Address Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-medium block">{t.customerInfo}:</span>
              <p className="font-bold text-slate-800 mt-0.5">{order.customerName}</p>
              <p className="text-slate-600 font-mono">{order.customerPhone}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t.deliveryAddress}:</span>
              <p className="font-bold text-slate-800 mt-0.5">{order.address}</p>
              <p className="text-emerald-800 font-medium">{order.area}</p>
            </div>
          </div>

          {/* Ordered Items List with Quantities (No individual prices) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
              {language === 'ur' ? 'شامل کردہ اشیاء:' : 'Dispatched Items & Quantities:'}
            </span>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between bg-white text-xs">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {language === 'ur' ? item.productNameUrdu : item.productName}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Pack Size: <span className="font-semibold text-emerald-800">{item.packSize}</span>
                    </p>
                  </div>
                  <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-slate-800 font-extrabold text-xs">
                    Qty: {item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Aggregates */}
          <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.totalWeight}:</span>
              </span>
              <span className="font-bold text-slate-900">~ {order.totalQuantityKg} KG</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.deliveryCharge}:</span>
              </span>
              <span className="font-bold text-slate-900">
                {order.deliveryCharge === 0 ? 'FREE' : `${order.deliveryCharge.toLocaleString()} PKR`}
              </span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <div>
                <span className="font-extrabold text-sm sm:text-base text-slate-900 block">
                  {t.finalPayableTotal}:
                </span>
                <span className="text-[10px] text-slate-500">
                  {language === 'ur' ? '(سامان ملنے پر نقد ادائیگی)' : '(Cash on Delivery)'}
                </span>
              </div>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-800">
                {order.finalTotal.toLocaleString()} PKR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
