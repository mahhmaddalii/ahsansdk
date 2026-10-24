'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Truck,
  AlertTriangle,
  Calendar,
  CreditCard,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Package,
  Boxes,
  Users,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    orders,
    products,
    batches,
    customers,
    suppliers,
    setAdminPage,
    setSelectedOrderForDetail,
    language,
    t,
  } = useGrocery();

  // Metrics calculation
  const todaysSales = orders.reduce((sum, o) => sum + o.finalTotal, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const dispatchedOrders = orders.filter((o) => o.status === 'Dispatched');
  const lowStockProducts = products.filter((p) => p.stock <= p.minStock);
  const expiringBatches = batches.filter((b) => b.status === 'Expiring Soon' || b.status === 'Expired');
  const totalReceivables = customers.reduce((sum, c) => sum + c.outstandingBalance, 0);
  const totalPayables = suppliers.reduce((sum, s) => sum + s.balance, 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + p.purchaseCost * p.stock, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'کاروباری رپورٹ و انالیٹکس ڈیش بورڈ' : 'Executive Business Overview'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'لاہور راشن گودام و تمام آن لائن آرڈرز کی لائیو صورتحال'
              : 'Real-time performance metrics across central warehouse, orders & cash flows'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{language === 'ur' ? 'لائیو کنکشن قائم ہے' : 'Live Sync Active'}</span>
          </span>
        </div>
      </div>

      {/* 8 Key KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Today's Sales */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.todaysSales}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900">
            {todaysSales.toLocaleString()} <span className="text-xs font-normal text-slate-500">PKR</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% vs yesterday</span>
          </p>
        </div>

        {/* KPI 2: Today's Orders */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.todaysOrders}</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900">
            {orders.length} <span className="text-xs font-normal text-slate-500">Orders</span>
          </div>
          <p className="text-[11px] text-slate-500">Average ticket: ~{(todaysSales / (orders.length || 1)).toFixed(0)} PKR</p>
        </div>

        {/* KPI 3: Pending Orders */}
        <div
          onClick={() => setAdminPage('orders')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.pendingOrders}</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-amber-700">
            {pendingOrders.length}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold">Requires confirmation</p>
        </div>

        {/* KPI 4: Orders to Deliver */}
        <div
          onClick={() => setAdminPage('orders')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-emerald-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.ordersToDeliver}</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-indigo-900">
            {dispatchedOrders.length}
          </div>
          <p className="text-[11px] text-slate-500">On the road with riders</p>
        </div>

        {/* KPI 5: Low Stock */}
        <div
          onClick={() => setAdminPage('inventory')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-rose-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.lowStockItems}</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-rose-700">
            {lowStockProducts.length}
          </div>
          <p className="text-[11px] text-rose-600 font-semibold">Below threshold</p>
        </div>

        {/* KPI 6: Expiring Soon */}
        <div
          onClick={() => setAdminPage('batch-expiry')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-amber-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.expiringBatches}</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900">
            {expiringBatches.length}
          </div>
          <p className="text-[11px] text-amber-700 font-semibold">Quality inspection needed</p>
        </div>

        {/* KPI 7: Customer Receivables */}
        <div
          onClick={() => setAdminPage('customers')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-slate-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.customerReceivables}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900">
            {totalReceivables.toLocaleString()} <span className="text-xs font-normal text-slate-500">PKR</span>
          </div>
          <p className="text-[11px] text-slate-500">From 2 credit accounts</p>
        </div>

        {/* KPI 8: Supplier Payables */}
        <div
          onClick={() => setAdminPage('suppliers')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 cursor-pointer hover:border-slate-400 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t.supplierPayables}</span>
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900">
            {totalPayables.toLocaleString()} <span className="text-xs font-normal text-slate-500">PKR</span>
          </div>
          <p className="text-[11px] text-slate-500">Due to 4 millers & suppliers</p>
        </div>
      </div>

      {/* Analytics Charts & Visual Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales by Category & Top Products */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                {language === 'ur' ? 'سیلز کی تقسیم بلحاظ کیٹیگری' : 'Sales Revenue by Commodity Category'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ur' ? 'گزشتہ ۷ یوم کا حجم' : 'Volume across major staple lines'}
              </p>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md">
              Total: {totalInventoryValue.toLocaleString()} PKR Stock
            </span>
          </div>

          {/* Bar metrics visualization */}
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ur' ? 'چاول و کائنات سیلا (Rice)' : 'Rice & Grains (Super Kernel / Kainat)'}</span>
                <span>38% (38,400 PKR)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ur' ? 'گھی اور کوکنگ آئل (Ghee & Oil)' : 'Ghee & Cooking Oil (Banaspati / Canola)'}</span>
                <span>28% (27,600 PKR)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ur' ? 'تازہ چکی آٹا و میدہ (Flour)' : 'Wheat Flour & Chakki Atta'}</span>
                <span>18% (18,200 PKR)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>{language === 'ur' ? 'دالیں و چنا (Pulses)' : 'Pulses & Lentils (Daal Chana, Moong, Masoor)'}</span>
                <span>16% (16,100 PKR)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>
          </div>

          {/* Top Selling Products List */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {language === 'ur' ? 'سب سے زیادہ بکنے والے آئٹمز' : 'Top Performing Inventory SKUs'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-900 text-xs truncate">{p.name}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Sell: {p.sellingPrice} PKR / {p.unit}
                  </p>
                  <p className="text-[10px] text-slate-500">Margin: {(((p.sellingPrice - p.purchaseCost) / p.sellingPrice) * 100).toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Urgent Alerts Panel */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>{language === 'ur' ? 'فوری انتباہات اور ایکشنز' : 'Operational Priority Alerts'}</span>
            </h3>
            <span className="badge-amber px-2 py-0.5 rounded-md text-[10px] font-bold">
              {pendingOrders.length + lowStockProducts.length} Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Pending Orders Alerts */}
            {pendingOrders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => {
                  setSelectedOrderForDetail(ord);
                  setAdminPage('orders');
                }}
                className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition-colors"
              >
                <div>
                  <span className="font-bold block">{ord.id} - Pending Review</span>
                  <span className="text-[11px] text-amber-800">
                    {ord.customerName} ({ord.area}) • Total: {ord.finalTotal.toLocaleString()} PKR
                  </span>
                </div>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-1 rounded-md">
                  Action
                </span>
              </div>
            ))}

            {/* Low Stock Alerts */}
            {lowStockProducts.map((lsp) => (
              <div
                key={lsp.id}
                onClick={() => setAdminPage('inventory')}
                className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 flex items-center justify-between cursor-pointer hover:bg-rose-100/70 transition-colors"
              >
                <div>
                  <span className="font-bold block">{lsp.name}</span>
                  <span className="text-[11px] text-rose-800">
                    Stock remaining: {lsp.stock} {lsp.unit} (Min: {lsp.minStock})
                  </span>
                </div>
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                  Reorder
                </span>
              </div>
            ))}

            {/* Expiring batch alert */}
            {expiringBatches.map((eb) => (
              <div
                key={eb.id}
                onClick={() => setAdminPage('batch-expiry')}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div>
                  <span className="font-bold block">{eb.productName} ({eb.batchNumber})</span>
                  <span className="text-[11px] text-slate-500">
                    Expiry: {eb.expiryDate} ({eb.warehouse})
                  </span>
                </div>
                <span className="badge-amber text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {eb.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
