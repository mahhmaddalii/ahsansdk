'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  INITIAL_CHART_OF_ACCOUNTS,
  INITIAL_JOURNAL_ENTRIES,
} from '../../data/mockGroceryData';
import {
  FileSpreadsheet,
  DollarSign,
  TrendingUp,
  Download,
  Printer,
  Calendar,
  Layers,
} from 'lucide-react';

export const AdminAccountingView: React.FC = () => {
  const { language } = useGrocery();
  const [activeTab, setActiveTab] = useState<'overview' | 'coa' | 'journal'>('overview');

  // Summary figures
  const cash = 1734500;
  const receivables = 198000;
  const inventory = 3420000;
  const totalAssets = cash + receivables + inventory;
  const payables = 1455000;
  const grossSales = 1840000;
  const cogs = 1390000;
  const grossProfit = grossSales - cogs;
  const opex = 143000;
  const netProfit = grossProfit - opex;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'کھاتہ داری، فنانس و جنرل لیجر' : 'Accounting, General Ledger & Balance Sheet'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'چارٹ آف اکاؤنٹس، روزنامچہ اینٹریز، نفع و نقصان اور بیلنس شیٹ'
              : 'Double-entry bookkeeping, COGS, gross margins, cash on hand, and tax ledgers'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Financials</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Financial Summary (P&L)
        </button>

        <button
          onClick={() => setActiveTab('coa')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'coa'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Chart of Accounts ({INITIAL_CHART_OF_ACCOUNTS.length})
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'journal'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Journal Entries ({INITIAL_JOURNAL_ENTRIES.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 6 Top Financial Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">Gross Sales</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                {grossSales.toLocaleString()} <span className="text-[10px]">PKR</span>
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">COGS (Procurement)</span>
              <span className="text-base sm:text-lg font-black text-slate-600 font-mono">
                {cogs.toLocaleString()} <span className="text-[10px]">PKR</span>
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">Gross Profit (24.4%)</span>
              <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
                +{grossProfit.toLocaleString()} <span className="text-[10px]">PKR</span>
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">Operating Expenses</span>
              <span className="text-base sm:text-lg font-black text-rose-600 font-mono">
                -{opex.toLocaleString()} <span className="text-[10px]">PKR</span>
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">Net Profit</span>
              <span className="text-base sm:text-lg font-black text-emerald-800 font-mono">
                +{netProfit.toLocaleString()} <span className="text-[10px]">PKR</span>
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 block">Cash in Hand & Bank</span>
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                {(cash / 1000000).toFixed(2)}M <span className="text-[10px]">PKR</span>
              </span>
            </div>
          </div>

          {/* Balance Sheet Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Assets Summary (Total: {totalAssets.toLocaleString()} PKR)
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Cash on Hand (Till & Vaults)</span>
                  <span className="font-mono font-bold">284,500 PKR</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Meezan Bank Operating Account</span>
                  <span className="font-mono font-bold">1,450,000 PKR</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Customer Receivables (Credit Balances)</span>
                  <span className="font-mono font-bold text-amber-700">198,000 PKR</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Grocery Inventory Valuation</span>
                  <span className="font-mono font-bold text-emerald-800">3,420,000 PKR</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
                Liabilities & Equity (Total: {totalAssets.toLocaleString()} PKR)
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Accounts Payable (Millers & Suppliers)</span>
                  <span className="font-mono font-bold text-rose-700">1,455,000 PKR</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Sales Tax & PRA Accrued</span>
                  <span className="font-mono font-bold">64,200 PKR</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span>Owner Equity & Capital</span>
                  <span className="font-mono font-bold">3,200,000 PKR</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Retained Earnings (Net Month)</span>
                  <span className="font-mono font-bold text-emerald-800">633,300 PKR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'coa' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Account Name</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4 text-right rtl:text-left">Current Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {INITIAL_CHART_OF_ACCOUNTS.map((acc) => (
                  <tr key={acc.code} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{acc.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{acc.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          acc.type === 'Asset'
                            ? 'badge-emerald'
                            : acc.type === 'Liability'
                            ? 'badge-amber'
                            : acc.type === 'Revenue'
                            ? 'badge-blue'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {acc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-slate-900">
                      {acc.balance.toLocaleString()} PKR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'journal' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Date & Ref</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Debit Account</th>
                  <th className="py-3 px-4">Credit Account</th>
                  <th className="py-3 px-4 text-right rtl:text-left">Amount (PKR)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {INITIAL_JOURNAL_ENTRIES.map((je) => (
                  <tr key={je.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-slate-900 block">{je.id}</span>
                      <span className="text-[10px] text-slate-400">{je.date} ({je.reference})</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{je.description}</td>
                    <td className="py-3 px-4 font-mono text-emerald-800">{je.debitAccount}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{je.creditAccount}</td>
                    <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-slate-900">
                      {je.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="badge-emerald px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {je.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
