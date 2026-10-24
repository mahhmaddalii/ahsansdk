'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { ScrollText, Search, ArrowDownRight, ArrowUpRight, Filter } from 'lucide-react';
import { StockTransactionType } from '../../types/grocery';

export const AdminStockLedgerView: React.FC = () => {
  const { stockLedger, language, t } = useGrocery();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = stockLedger.filter((entry) => {
    const matchSearch =
      entry.productName.toLowerCase().includes(search.toLowerCase()) ||
      entry.reference.toLowerCase().includes(search.toLowerCase()) ||
      entry.user.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || entry.transactionType === typeFilter;
    return matchSearch && matchType;
  });

  const transactionTypes: string[] = [
    'All',
    'Opening Stock',
    'Purchase',
    'Sale',
    'Return',
    'Damage',
    'Wastage',
    'Adjustment',
    'Transfer',
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'اسٹاک لیجر و ٹرانزیکشن آڈٹ' : 'Stock Ledger & Inventory Movements'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'گودام میں آنے اور جانے والے ہر اناج، گھی اور آٹے کے تھیلے کا تاریخی ریکارڈ'
              : 'Immutable transaction log tracking sales, purchases, damages, adjustments, and QC returns'}
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product, order/PO reference, or user..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 rtl:pl-3 rtl:pr-9"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 w-full sm:w-auto"
          >
            {transactionTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Commodity / Product</th>
                <th className="py-3 px-4">Transaction Type</th>
                <th className="py-3 px-4 text-center">Movement Qty</th>
                <th className="py-3 px-4 text-center">Remaining Balance</th>
                <th className="py-3 px-4">Document Reference</th>
                <th className="py-3 px-4">Authorized User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((entry) => {
                const isPositive = entry.quantity > 0;

                return (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{entry.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{entry.productName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                          entry.transactionType === 'Sale'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : entry.transactionType === 'Purchase'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : entry.transactionType === 'Wastage' || entry.transactionType === 'Damage'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {entry.transactionType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-mono font-bold flex items-center justify-center gap-1 ${
                          isPositive ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        <span>{entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-extrabold text-slate-900">
                      {entry.balance}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 font-semibold">{entry.reference}</td>
                    <td className="py-3 px-4 text-slate-500">{entry.user}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
