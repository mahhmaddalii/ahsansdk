'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { ClockAlert, CheckCircle, AlertTriangle, XCircle, Search, Filter } from 'lucide-react';

export const AdminBatchExpiryView: React.FC = () => {
  const { batches, language, t } = useGrocery();
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = batches.filter((b) => {
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchSearch =
      b.productName.toLowerCase().includes(search.toLowerCase()) ||
      b.batchNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.warehouse.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'بیچ و میعاد (ایکسپائری) انتظام' : 'Batch & Expiry Quality Control'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'کھانے پینے کے سامان، گھی، دالوں اور آٹے کے بیجز کی معیاد اور کوالٹی چیکس'
              : 'FIFO (First-In-First-Out) batch rotation, expiry warning thresholds, and quarantine tracking'}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product, batch number, or warehouse bay..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 rtl:pl-3 rtl:pr-9"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 w-full sm:w-auto"
          >
            <option value="All">All Statuses ({batches.length})</option>
            <option value="Healthy">Healthy / Safe</option>
            <option value="Expiring Soon">Expiring Soon (&lt;60d)</option>
            <option value="Expired">Expired / Quarantine</option>
          </select>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Commodity / Product</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4">Purchase Date</th>
                <th className="py-3 px-4">Mfg Date</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4 text-center">Remaining / Initial</th>
                <th className="py-3 px-4">Warehouse Location</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{b.productName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{b.batchNumber}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{b.purchaseDate}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{b.mfgDate}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{b.expiryDate}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-slate-900">{b.remainingStock}</span>
                    <span className="text-slate-400 text-[11px]"> / {b.quantity}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{b.warehouse}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Healthy'
                          ? 'badge-emerald'
                          : b.status === 'Expiring Soon'
                          ? 'badge-amber'
                          : 'badge-red'
                      }`}
                    >
                      {b.status}
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
