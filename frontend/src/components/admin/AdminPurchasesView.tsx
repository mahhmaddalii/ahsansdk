'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { FileSpreadsheet, Plus, CheckCircle, Clock } from 'lucide-react';

export const AdminPurchasesView: React.FC = () => {
  const { purchases, language } = useGrocery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'خریداری و پرچیز آرڈرز (PO)' : 'Procurement & Purchase Orders (PO)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'ملوں اور سپلائرز سے راشن کی تھوک خریداری، ادائیگیاں اور وصولی'
              : 'Wholesale procurement receipts, miller contracts, and vendor payment statuses'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">PO #</th>
                <th className="py-3 px-4">Supplier / Miller</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Bags / Items</th>
                <th className="py-3 px-4 text-right rtl:text-left">Total Cost</th>
                <th className="py-3 px-4 text-center">Payment</th>
                <th className="py-3 px-4 text-center">Receipt Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {purchases.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{po.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{po.supplierName}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{po.date}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">{po.itemsCount} Units</td>
                  <td className="py-3 px-4 text-right rtl:text-left font-mono font-extrabold text-slate-900">
                    {po.totalCost.toLocaleString()} PKR
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        po.paymentStatus === 'Paid' ? 'badge-emerald' : 'badge-amber'
                      }`}
                    >
                      {po.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="badge-blue px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {po.deliveryStatus}
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
