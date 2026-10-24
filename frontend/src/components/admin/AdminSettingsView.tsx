'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  Settings,
  Building,
  Truck,
  Globe,
  Bell,
  Lock,
  Database,
  CheckCircle,
  Save,
} from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const { language, setLanguage } = useGrocery();
  const [saved, setSaved] = useState(false);

  const [bizInfo, setBizInfo] = useState({
    name: 'KaryanaExpress Lahore',
    nameUrdu: 'کریانہ ایکسپریس لاہور',
    phone: '042-3111-5279',
    whatsapp: '+92 300 4829104',
    address: 'Depot # 4, Wholesale Grain Terminal, Circular Road, Lahore',
    ntn: 'NTN-7492019-3',
  });

  const [deliveryConfig, setDeliveryConfig] = useState({
    defaultCharge: 150,
    freeThreshold: 5000,
    maxRadiusKm: 25,
  });

  const [notifications, setNotifications] = useState({
    whatsappOrderAlerts: true,
    smsRiderTracking: true,
    emailDailyReport: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'سسٹم ترتیبات و کنفیگریشن' : 'System Configuration & Business Preferences'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'کاروباری معلومات، واٹس ایپ نوٹیفیکیشنز، سیکیورٹی اور خودکار بیک اپ'
              : 'Store profile, Lahore delivery logic, automated WhatsApp dispatch triggers, and database snapshots'}
          </p>
        </div>

        {saved && (
          <span className="badge-emerald px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Settings Saved Successfully!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Business Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
            <Building className="w-4 h-4 text-emerald-700" />
            <span>Registered Business Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Trading Name (English)</label>
              <input
                type="text"
                value={bizInfo.name}
                onChange={(e) => setBizInfo({ ...bizInfo, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Trading Name (Urdu)</label>
              <input
                type="text"
                value={bizInfo.nameUrdu}
                onChange={(e) => setBizInfo({ ...bizInfo, nameUrdu: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Landline Helpline</label>
              <input
                type="text"
                value={bizInfo.phone}
                onChange={(e) => setBizInfo({ ...bizInfo, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Official WhatsApp Dispatch</label>
              <input
                type="text"
                value={bizInfo.whatsapp}
                onChange={(e) => setBizInfo({ ...bizInfo, whatsapp: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Central Depot Address</label>
              <input
                type="text"
                value={bizInfo.address}
                onChange={(e) => setBizInfo({ ...bizInfo, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Delivery & Thresholds */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>Delivery & Free Shipping Defaults</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Base Delivery Rate (PKR)</label>
              <input
                type="number"
                value={deliveryConfig.defaultCharge}
                onChange={(e) =>
                  setDeliveryConfig({ ...deliveryConfig, defaultCharge: Number(e.target.value) })
                }
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Free Delivery Minimum (PKR)</label>
              <input
                type="number"
                value={deliveryConfig.freeThreshold}
                onChange={(e) =>
                  setDeliveryConfig({ ...deliveryConfig, freeThreshold: Number(e.target.value) })
                }
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-emerald-700"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Max Electric Loader Radius</label>
              <input
                type="number"
                value={deliveryConfig.maxRadiusKm}
                onChange={(e) =>
                  setDeliveryConfig({ ...deliveryConfig, maxRadiusKm: Number(e.target.value) })
                }
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Notification Channels */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <span>Instant Dispatch Notifications</span>
          </h3>

          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
              <input
                type="checkbox"
                checked={notifications.whatsappOrderAlerts}
                onChange={(e) =>
                  setNotifications({ ...notifications, whatsappOrderAlerts: e.target.checked })
                }
                className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-600"
              />
              <span className="font-medium text-slate-800">
                Send WhatsApp order confirmation template & tracking link directly to customer phone
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-slate-50">
              <input
                type="checkbox"
                checked={notifications.smsRiderTracking}
                onChange={(e) =>
                  setNotifications({ ...notifications, smsRiderTracking: e.target.checked })
                }
                className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-600"
              />
              <span className="font-medium text-slate-800">
                SMS customer rider contact details as soon as order is marked "Dispatched"
              </span>
            </label>
          </div>
        </div>

        {/* Section 4: Automated Backups */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
            <Database className="w-4 h-4 text-emerald-700" />
            <span>Database Backup & Snapshots</span>
          </h3>

          <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-900">Encrypted Cloud Backup Status: Healthy</p>
              <p className="text-[11px] text-slate-500">Last automated snapshot: Today at 02:00 AM PKT (Size: 14.8 MB)</p>
            </div>
            <button
              type="button"
              onClick={() => alert('Manual database snapshot successfully created!')}
              className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition-colors"
            >
              Backup Now
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save All System Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
