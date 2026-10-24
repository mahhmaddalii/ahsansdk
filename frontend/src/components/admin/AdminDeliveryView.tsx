'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminDeliveryView: React.FC = () => {
  const { deliveryZones, orders, language } = useGrocery();

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const outForDelivery = orders.filter((o) => o.status === 'Dispatched').length;
  const deliveredToday = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'ڈیلیوری، زونز و رائیڈر ڈسپیچ' : 'Delivery Dispatch & Area Logistics'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'لاہور کے زونز، رائیڈرز، مفت ترسیل کی حد اور ڈیلیوری چارجز'
              : 'Configure Lahore delivery zones, free delivery thresholds, and fleet dispatch tracking'}
          </p>
        </div>
      </div>

      {/* 4 Top Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Pending Deliveries</span>
          <span className="text-xl sm:text-2xl font-black text-amber-600">{pendingCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Out for Delivery</span>
          <span className="text-xl sm:text-2xl font-black text-indigo-700">{outForDelivery} Vans</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Delivered Today</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-700">{deliveredToday}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">Failed / Returned</span>
          <span className="text-xl sm:text-2xl font-black text-slate-400">0</span>
        </div>
      </div>

      {/* Delivery Zones Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-extrabold text-slate-900 text-sm">Configured Lahore Delivery Sectors</h3>
          <span className="text-xs text-slate-500">Standard Fleet: 6 Electric Loaders & 8 Motorbikes</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Area Coverage</th>
                <th className="py-3 px-4">Zone Code</th>
                <th className="py-3 px-4 text-right rtl:text-left">Standard Charge</th>
                <th className="py-3 px-4 text-right rtl:text-left">Free Delivery Threshold</th>
                <th className="py-3 px-4 text-center">Avg Transit Time</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {deliveryZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{zone.area}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-800">{zone.zone}</td>
                  <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-slate-900">
                    {zone.deliveryCharge} PKR
                  </td>
                  <td className="py-3 px-4 text-right rtl:text-left font-mono text-slate-600">
                    Above {zone.freeDeliveryThreshold.toLocaleString()} PKR
                  </td>
                  <td className="py-3 px-4 text-center text-slate-500 font-medium">{zone.avgTime}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="badge-emerald px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {zone.status}
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
