'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { INITIAL_ROLES } from '../../data/mockGroceryData';
import { ShieldCheck, Check, X, UserPlus, Lock } from 'lucide-react';
import { RolePermission } from '../../types/grocery';

export const AdminUsersView: React.FC = () => {
  const { language } = useGrocery();
  const [roles, setRoles] = useState<RolePermission[]>(INITIAL_ROLES);

  const togglePermission = (roleIdx: number, permKey: keyof RolePermission['permissions']) => {
    setRoles((prev) => {
      const updated = [...prev];
      updated[roleIdx].permissions[permKey] = !updated[roleIdx].permissions[permKey];
      return updated;
    });
  };

  const permKeys: { key: keyof RolePermission['permissions']; label: string }[] = [
    { key: 'view', label: 'View Records' },
    { key: 'create', label: 'Create Records' },
    { key: 'edit', label: 'Edit Records' },
    { key: 'delete', label: 'Delete Records' },
    { key: 'approve', label: 'Approve Orders' },
    { key: 'export', label: 'Export Data' },
    { key: 'managePrices', label: 'Manage Confidential Prices' },
    { key: 'manageInventory', label: 'Manage Warehouse Stock' },
    { key: 'manageAccounting', label: 'Manage Accounts & Ledger' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'صارفین، رولز و اختیارات کی میٹرکس' : 'Role-Based Access Control & Permissions Matrix'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'مالک، منیجر، کیشئر، گودام عملہ اور رائیڈرز کے سیکیورٹی اختیارات'
              : 'Enforce granular segregation of duties across pricing, inventory, and ledger authority'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 min-w-[160px]">Staff Role</th>
                {permKeys.map((p) => (
                  <th key={p.key} className="py-3 px-3 text-center whitespace-nowrap">
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {roles.map((r, roleIdx) => (
                <tr key={r.role} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-extrabold text-slate-900">{r.role}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">{r.roleUrdu}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{r.description}</p>
                  </td>

                  {permKeys.map((p) => {
                    const isAllowed = r.permissions[p.key];
                    return (
                      <td key={p.key} className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => togglePermission(roleIdx, p.key)}
                          className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                            isAllowed
                              ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {isAllowed ? <Check className="w-4 h-4 font-bold" /> : <X className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
