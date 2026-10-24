'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Users, Search, Phone, MapPin, DollarSign, CheckCircle } from 'lucide-react';

export const AdminCustomersView: React.FC = () => {
  const { customers, language, t } = useGrocery();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'صارفین، کھاتہ اور کریڈٹ مینجمنٹ' : 'Customer Accounts & Credit Ledger (Udhaar)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'گھریلو اور کمرشل کسٹمرز کے سابقہ آرڈرز اور واجب الوصول بقایا جات'
              : 'Customer lifetime values, household delivery histories, and outstanding credit balances'}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:max-w-md mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer by name, phone, or sector..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 rtl:pl-3 rtl:pr-9"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Mobile Phone</th>
                <th className="py-3 px-4">Area & Address</th>
                <th className="py-3 px-4 text-center">Lifetime Orders</th>
                <th className="py-3 px-4 text-right rtl:text-left">Total Spent</th>
                <th className="py-3 px-4 text-right rtl:text-left">Credit Balance</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-[10px] text-slate-400">Last: {c.lastOrderDate}</p>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{c.phone}</td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="font-semibold text-emerald-800 block">{c.area}</span>
                    <span className="text-[11px] text-slate-400">{c.address}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900">{c.totalOrders} Orders</td>
                  <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-slate-900">
                    {c.totalSales.toLocaleString()} PKR
                  </td>
                  <td className="py-3 px-4 text-right rtl:text-left font-mono font-extrabold">
                    {c.outstandingBalance > 0 ? (
                      <span className="text-amber-700">{c.outstandingBalance.toLocaleString()} PKR</span>
                    ) : (
                      <span className="text-emerald-700">0 PKR (Clear)</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
