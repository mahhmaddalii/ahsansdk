'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  X,
  Printer,
  FileText,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Phone,
  Scale,
  DollarSign,
} from 'lucide-react';
import { Order, OrderStatus } from '../../types/grocery';

export const AdminOrderDetailModal: React.FC = () => {
  const {
    selectedOrderForDetail,
    setSelectedOrderForDetail,
    updateOrderStatus,
    language,
    t,
  } = useGrocery();

  const order = selectedOrderForDetail;

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = (status: OrderStatus) => {
    updateOrderStatus(order.id, status);
    setSelectedOrderForDetail({ ...order, status });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        {/* Header & Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                {order.id}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  order.status === 'Delivered'
                    ? 'badge-emerald'
                    : order.status === 'Dispatched'
                    ? 'badge-amber'
                    : order.status === 'Preparing'
                    ? 'badge-blue'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{order.date}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              title="Print Official Order Invoice & Slip"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printInvoice}</span>
            </button>

            <button
              onClick={() => setSelectedOrderForDetail(null)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Transition Control Bar */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Update Fulfillment Status:
          </span>
          <div className="flex flex-wrap gap-2">
            {order.status === 'Pending' && (
              <>
                <button
                  onClick={() => handleStatusChange('Confirmed')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Confirm Order</span>
                </button>
                <button
                  onClick={() => handleStatusChange('Cancelled')}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject / Cancel</span>
                </button>
              </>
            )}

            {order.status === 'Confirmed' && (
              <button
                onClick={() => handleStatusChange('Preparing')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Move to Packing (Preparing)</span>
              </button>
            )}

            {order.status === 'Preparing' && (
              <button
                onClick={() => handleStatusChange('Dispatched')}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Assign Rider & Dispatch</span>
              </button>
            )}

            {order.status === 'Dispatched' && (
              <button
                onClick={() => handleStatusChange('Delivered')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark Delivered (COD Collected)</span>
              </button>
            )}
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-700" />
              <span>Customer Information</span>
            </span>
            <p className="font-extrabold text-slate-800">{order.customerName}</p>
            <p className="font-mono text-slate-600 flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{order.customerPhone}</span>
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Delivery Destination</span>
            </span>
            <p className="text-slate-800 font-medium">{order.address}</p>
            <p className="text-emerald-800 font-bold">{order.area}</p>
            {order.orderNotes && (
              <p className="text-[11px] text-slate-500 italic">Notes: "{order.orderNotes}"</p>
            )}
          </div>
        </div>

        {/* Internal Item Pricing Table (ADMIN VISIBLE) */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-slate-100/70 p-3 text-xs font-bold text-slate-700 flex justify-between">
            <span>Ordered Items & Internal Pricing</span>
            <span className="text-emerald-800 font-semibold">Total Weight: ~{order.totalQuantityKg} KG</span>
          </div>

          <table className="w-full text-xs text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="p-3">Product Name</th>
                <th className="p-3">Pack Size</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right rtl:text-left">Unit Rate</th>
                <th className="p-3 text-right rtl:text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{item.productName}</p>
                    <p className="text-[10px] text-slate-400">{item.productNameUrdu}</p>
                  </td>
                  <td className="p-3 font-medium">{item.packSize}</td>
                  <td className="p-3 text-center font-bold">{item.quantity}</td>
                  <td className="p-3 text-right rtl:text-left font-mono">
                    {item.unitPrice ? `${item.unitPrice.toLocaleString()} PKR` : '---'}
                  </td>
                  <td className="p-3 text-right rtl:text-left font-mono font-bold text-slate-900">
                    {item.subtotal ? `${item.subtotal.toLocaleString()} PKR` : '---'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Aggregates Breakdown (Admin View) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-200 text-xs">
          <div className="space-y-1 text-slate-500">
            <p>Payment: <strong className="text-slate-800">{order.paymentMethod}</strong></p>
            <p>Rider Assignment: <strong className="text-emerald-800">{order.assignedStaff || 'Unassigned'}</strong></p>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-right rtl:text-left">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal:</span>
              <span className="font-bold font-mono">
                {(order.finalTotal - order.deliveryCharge).toLocaleString()} PKR
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charge:</span>
              <span className="font-bold font-mono">{order.deliveryCharge.toLocaleString()} PKR</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Grand Total:</span>
              <span className="text-emerald-800 font-mono">
                {order.finalTotal.toLocaleString()} PKR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
