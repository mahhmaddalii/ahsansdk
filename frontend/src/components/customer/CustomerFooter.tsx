'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Store, Phone, Mail, MapPin, ShieldCheck, Clock, MessageCircle } from 'lucide-react';

export const CustomerFooter: React.FC = () => {
  const { language, setCustomerPage, setSelectedCategory, categories, setPortalMode } = useGrocery();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {language === 'ur' ? 'کریانہ ایکسپریس' : 'KaryanaExpress'}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {language === 'ur'
                ? 'لاہور بھر کے گھرانوں، ریسٹورنٹس اور ہوٹلوں کے لیے خالص آٹا، باسمتی چاول، گھی، دالیں اور مصالحہ جات کی سب سے معتبر ڈور سٹیپ سروس۔'
                : 'Premium quality Pakistani kitchen provisions, lentils, grains, flour, and ghee delivered with calibrated digital weights and sealed hygiene packaging.'}
            </p>
            <div className="flex items-center gap-2 pt-1 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Halal • ISO Grade Cleaned Pulses • Digital Weight</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'ur' ? 'مقبول راشن زمرے' : 'Popular Categories'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCustomerPage('products');
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {language === 'ur' ? cat.nameUrdu : cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service & Timings */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'ur' ? 'اوقاتِ ترسیل' : 'Dispatch Timings'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Monday - Sunday</span>
                  <span>08:00 AM - 11:30 PM PKT</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'ur'
                  ? 'جمعہ کی نماز کے دوران ترسیل میں مختصر وقفہ ہوتا ہے۔'
                  : 'Orders placed after 10 PM are queued for next morning 8 AM dispatch.'}
              </p>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'ur' ? 'رابطہ و مدد' : 'Helpline & WhatsApp'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono">042-3111-5279</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono">+92 300 4829104</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Main Wholesale Warehouse, Lahore</span>
              </div>
            </div>

            {/* Admin Portal Jump Link */}
            <div className="pt-2">
              <button
                onClick={() => setPortalMode('admin')}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 underline font-medium"
              >
                Staff / Admin Management Access →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© 2026 KaryanaExpress Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCustomerPage('policy')} className="hover:text-white">
              Terms & Delivery Policy
            </button>
            <span>•</span>
            <button onClick={() => setCustomerPage('contact')} className="hover:text-white">
              Customer Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
