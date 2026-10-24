'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { INITIAL_AUDIT_LOGS } from '../../data/mockGroceryData';
import { History, Shield, CheckCircle2 } from 'lucide-react';

export const AdminAuditLogView: React.FC = () => {
  const { language } = useGrocery();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'سسٹم آڈٹ لاگ و سیکیورٹی ٹریل' : 'System Audit Trail & Immutable Log'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'قیمتوں میں ردوبدل، اسٹاک آمد و رفت اور آرڈرز کی تمام سرگرمیوں کا ریکارڈ'
              : 'Cryptographically hashed event stream tracking inventory adjustments, price edits, and approvals'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User & Role</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Record Identifier</th>
                <th className="py-3 px-4">Previous Value</th>
                <th className="py-3 px-4">New Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {INITIAL_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.date}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{log.user}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">{log.role}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-[11px]">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{log.action}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-900">{log.record}</td>
                  <td className="py-3 px-4 text-slate-400 line-through">{log.previousValue}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{log.newValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
