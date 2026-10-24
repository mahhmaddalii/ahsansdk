'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Boxes, AlertTriangle, CheckCircle, Search, Filter, Warehouse, TrendingDown } from 'lucide-react';

export const AdminInventoryView: React.FC = () => {
  const { products, batches, language, t } = useGrocery();
  const [search, setSearch] = useState('');

  const totalProducts = products.length;
  const totalStockValue = products.reduce((acc, p) => acc + p.purchaseCost * p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock <= p.minStock && p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock === 0 || !p.inStock).length;
  const expiringSoonCount = batches.filter((b) => b.status === 'Expiring Soon').length;
  const expiredCount = batches.filter((b) => b.status === 'Expired').length;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'گودام و اسٹاک انوینٹری' : 'Warehouse Stock & Inventory Valuation'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'لاہور مرکزی گودام کے حقیقی اسٹاک، محفوظ شدہ مال اور ویلیو کا جائزہ'
              : 'Real-time stock valuation, bin locations, reserved bags, and reorder alerts'}
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Total Stock Value</span>
          <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
            {(totalStockValue / 1000000).toFixed(2)}M <span className="text-xs font-normal">PKR</span>
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Total SKUs</span>
          <span className="text-base sm:text-lg font-black text-slate-900">{totalProducts} Products</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Low Stock</span>
          <span className="text-base sm:text-lg font-black text-amber-600">{lowStockCount} Items</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Out of Stock</span>
          <span className="text-base sm:text-lg font-black text-rose-600">{outOfStockCount} Items</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Expiring Soon</span>
          <span className="text-base sm:text-lg font-black text-amber-600">{expiringSoonCount} Batches</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Expired Stock</span>
          <span className="text-base sm:text-lg font-black text-rose-700">{expiredCount} Batches</span>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product or SKU..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4 text-center">Current Stock</th>
                <th className="py-3 px-4 text-center">Reserved</th>
                <th className="py-3 px-4 text-center">Available</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4">Warehouse Location</th>
                <th className="py-3 px-4 text-center">Stock Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProducts.map((p, idx) => {
                const reserved = Math.floor(p.stock * 0.12);
                const available = p.stock - reserved;
                const isLow = p.stock <= p.minStock;

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.nameUrdu}</p>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{p.sku}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">{p.stock}</td>
                    <td className="py-3 px-4 text-center text-slate-400 font-semibold">{reserved}</td>
                    <td className="py-3 px-4 text-center font-extrabold text-emerald-800">{available}</td>
                    <td className="py-3 px-4 text-slate-500">{p.unit}</td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Warehouse className="w-3.5 h-3.5 text-slate-400" />
                        <span>Central Bay #{idx % 4 + 1}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isLow ? 'badge-amber' : 'badge-emerald'
                        }`}
                      >
                        {isLow ? 'Low Stock' : 'Optimal'}
                      </span>
                    </td>
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
