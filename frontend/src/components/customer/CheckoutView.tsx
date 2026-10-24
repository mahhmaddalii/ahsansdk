'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  ShieldCheck,
  Truck,
  Scale,
  MapPin,
  Phone,
  User,
  FileText,
  CreditCard,
  Banknote,
  ArrowRight,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    totalCartWeightKg,
    totalCartItemsCount,
    deliveryZones,
    placeOrder,
    setCustomerPage,
    language,
    t,
  } = useGrocery();

  const [fullName, setFullName] = useState('Muhammad Salman Khan');
  const [phone, setPhone] = useState('0300-4829104');
  const [selectedArea, setSelectedArea] = useState(deliveryZones[0]?.area || 'Gulberg III, Lahore');
  const [address, setAddress] = useState('House # 42, Block C-2, Main Boulevard');
  const [notes, setNotes] = useState('Please bring exact change for COD if possible.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Find delivery charge for selected zone
  const matchedZone =
    deliveryZones.find((z) => selectedArea.includes(z.area.split(' ')[0])) || deliveryZones[0];

  // Calculate internal item total to determine aggregate final payable total ONLY
  const itemsSubtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);
  const deliveryFee = itemsSubtotal >= (matchedZone?.freeDeliveryThreshold || 5000) ? 0 : (matchedZone?.deliveryCharge || 150);
  const finalPayableTotal = itemsSubtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg(language === 'ur' ? 'براہ کرم تمام لازمی معلومات درج کریں۔' : 'Please fill out all required delivery fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        fullName,
        phone,
        address,
        area: selectedArea,
        notes,
      });
      setIsSubmitting(false);
      setCustomerPage('confirmation');
    }, 900);
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-slate-500">{t.emptyCart}</p>
        <button
          onClick={() => setCustomerPage('home')}
          className="mt-4 bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          {t.startShopping}
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[calc(100vh-180px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {t.checkoutTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'ur'
              ? 'صرف چند سیکنڈ میں اپنا آرڈر مکمل کریں - کیش آن ڈیلیوری'
              : 'Effortless 1-step checkout with Cash on Delivery'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-5">
            {/* Customer Information Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm">{t.customerInfo}</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.fullName} <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Muhammad Salman Khan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.phoneNumber} <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 bg-slate-50/50"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm">{t.deliveryAddress}</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.deliveryArea} <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 bg-slate-50/50"
                  >
                    {deliveryZones.map((zone) => (
                      <option key={zone.id} value={`${zone.area}, Lahore`}>
                        {zone.area} ({zone.zone} - {zone.avgTime})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.deliveryAddress} <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.addressPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.orderNotes}
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Banknote className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm">{t.paymentMethod}</h3>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-300 flex items-start gap-3">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  checked
                  readOnly
                  className="mt-1 text-emerald-700 focus:ring-emerald-600"
                />
                <label htmlFor="cod" className="cursor-pointer text-xs">
                  <span className="font-bold text-emerald-950 block text-sm">
                    {t.cashOnDelivery}
                  </span>
                  <span className="text-emerald-800 mt-0.5 block leading-relaxed">
                    {t.cashOnDeliveryDesc}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: STRICT ZERO INDIVIDUAL PRICE RULE */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              {t.orderSummary}
            </h3>

            {/* Selected Items List with Quantities (Zero Individual Prices) */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.packSize}`}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0"
                >
                  <div className="min-w-0 flex-1 pr-2 rtl:pr-0 rtl:pl-2">
                    <p className="font-bold text-slate-900 truncate">
                      {language === 'ur' ? item.product.nameUrdu : item.product.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Pack: <span className="font-medium text-slate-700">{item.packSize}</span>
                    </p>
                  </div>
                  <div className="shrink-0 bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md">
                    x {item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Aggregates */}
            <div className="space-y-2 pt-3 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{language === 'ur' ? 'کل اشیاء:' : 'Total Packets/Bags:'}</span>
                <span className="font-bold text-slate-900">{totalCartItemsCount}</span>
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

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.deliveryCharge}:</span>
                </span>
                <span className="font-bold text-slate-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">{language === 'ur' ? 'مفت ڈیلیوری' : 'FREE'}</span>
                  ) : (
                    `${deliveryFee.toLocaleString()} PKR`
                  )}
                </span>
              </div>

              {/* CRITICAL: ONLY SHOW THE FINAL PAYABLE TOTAL */}
              <div className="flex justify-between items-center pt-3 border-t-2 border-slate-200 text-slate-900">
                <div>
                  <span className="font-extrabold text-sm sm:text-base block text-slate-900">
                    {t.finalPayableTotal}:
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {language === 'ur' ? '(سامان ملنے پر واجب الادا رقم)' : '(Payable upon delivery)'}
                  </span>
                </div>
                <div className="text-right rtl:text-left">
                  <span className="text-lg sm:text-xl font-extrabold text-emerald-800 block">
                    {finalPayableTotal.toLocaleString()} PKR
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    {language === 'ur' ? 'کیش آن ڈیلیوری' : 'Cash on Delivery'}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{t.placingOrder}</span>
                ) : (
                  <>
                    <span>{t.placeOrder}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1 font-semibold text-slate-700">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'ur' ? 'اندازاً ترسیل کا وقت: ۳۰ سے ۶۰ منٹ' : 'Estimated Delivery: 30 - 60 mins'}</span>
              </div>
              <p>
                {language === 'ur'
                  ? 'آرڈر موصول ہوتے ہی رائیڈر کو روانہ کر دیا جائے گا۔'
                  : 'Your grocery items are weighed and prepared directly from our centralized depot.'}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
