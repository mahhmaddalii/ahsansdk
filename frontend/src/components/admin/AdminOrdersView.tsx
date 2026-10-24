'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Truck,
  Clock,
  Printer,
  ChevronRight,
  Package,
} from 'lucide-react';
import { OrderStatus, Order } from '../../types/grocery';

export const AdminOrdersView: React.FC = () => {
  const {
    orders,
    selectedOrderForDetail,
    setSelectedOrderForDetail,
    updateOrderStatus,
    language,
    t,
  } = useGrocery();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const tabs = [
    'All',
    'Pending',
    'Confirmed',
    'Preparing',
    'Dispatched',
    'Delivered',
    'Cancelled',
    'Returned',
  ];

  const filteredOrders = orders.filter((ord) => {
    const matchesTab = activeTab === 'All' || ord.status === activeTab;
    const matchesSearch =
      ord.id.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerPhone.includes(search) ||
      ord.area.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'آرڈرز کی ترسیل و انتظام' : 'Order Fulfillment & Dispatch'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'صارفین کے آن لائن آرڈرز کی تصدیق، پیکنگ اور رائیڈر تفویض'
              : 'Real-time order workflow from customer submission to doorstep COD delivery'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            Total Orders: {orders.length}
          </span>
        </div>
      </div>

      {/* Status Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        {tabs.map((tab) => {
          const count =
            tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-emerald-900 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order ID (ORD-XXXXX), customer name, phone, or area..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 rtl:pl-4 rtl:pr-9"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Area & Destination</th>
                <th className="py-3 px-4 text-center">Items (KG)</th>
                <th className="py-3 px-4 text-right rtl:text-left">Total (PKR)</th>
                <th className="py-3 px-4 text-center">Payment</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Assigned Staff</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Order Number */}
                  <td className="py-3 px-4">
                    <span className="font-mono font-extrabold text-slate-900 block">{ord.id}</span>
                    <span className="text-[10px] text-slate-400">{ord.date}</span>
                  </td>

                  {/* Customer */}
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{ord.customerName}</p>
                    <p className="font-mono text-[11px] text-slate-500">{ord.customerPhone}</p>
                  </td>

                  {/* Area */}
                  <td className="py-3 px-4">
                    <p className="font-semibold text-emerald-800">{ord.area}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{ord.address}</p>
                  </td>

                  {/* Items & KG */}
                  <td className="py-3 px-4 text-center">
                    <span className="bg-slate-100 px-2 py-1 rounded font-bold text-slate-800">
                      {ord.items.length} items (~{ord.totalQuantityKg} KG)
                    </span>
                  </td>

                  {/* Final Total (Admin Visible) */}
                  <td className="py-3 px-4 text-right rtl:text-left font-mono font-extrabold text-slate-900 text-sm">
                    {ord.finalTotal.toLocaleString()}
                  </td>

                  {/* Payment */}
                  <td className="py-3 px-4 text-center">
                    <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
                      COD
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.status === 'Delivered'
                          ? 'badge-emerald'
                          : ord.status === 'Dispatched'
                          ? 'badge-amber'
                          : ord.status === 'Preparing'
                          ? 'badge-blue'
                          : ord.status === 'Cancelled'
                          ? 'badge-red'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>

                  {/* Assigned Rider */}
                  <td className="py-3 px-4 text-slate-600 text-[11px]">
                    {ord.assignedStaff ? (
                      <span className="font-semibold text-slate-800">{ord.assignedStaff}</span>
                    ) : (
                      <span className="text-amber-600 font-semibold italic">Unassigned</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedOrderForDetail(ord)}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 mx-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Manage</span>
                    </button>
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
