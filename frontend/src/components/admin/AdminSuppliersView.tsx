'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Building2, Phone, MapPin, DollarSign, Star } from 'lucide-react';

export const AdminSuppliersView: React.FC = () => {
  const { suppliers, language } = useGrocery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'سپلائرز و تھوک ملوں کی فہرست' : 'Suppliers & Miller Directory'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'ڈالڈا فوڈز، میٹکو رائس ملز، شکر گنج اور غلہ منڈی لاہور کے کھاتے'
              : 'Direct supply contracts, payables ledger, and grain terminal credit limits'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{sup.name}</h3>
                <p className="text-xs text-emerald-700 font-semibold">{sup.nameUrdu}</p>
              </div>
              <span className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md border border-amber-200">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{sup.rating}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block">Contact Person:</span>
                <span className="font-bold text-slate-800">{sup.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone:</span>
                <span className="font-mono text-slate-800 font-semibold">{sup.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Depot / Mandi:</span>
                <span className="text-slate-800">{sup.area}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Total Volume:</span>
                <span className="font-bold text-slate-800 font-mono">
                  {(sup.totalPurchases / 1000000).toFixed(2)}M PKR
                </span>
              </div>

              <div className="text-right rtl:text-left">
                <span className="text-slate-400 block">Payable Balance:</span>
                <span className="font-extrabold text-rose-700 font-mono text-sm">
                  {sup.balance.toLocaleString()} PKR
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
