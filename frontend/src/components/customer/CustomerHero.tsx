'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { ArrowRight, ShieldCheck, Truck, Scale, Sparkles, CheckCircle2 } from 'lucide-react';

export const CustomerHero: React.FC = () => {
  const { t, language, setCustomerPage, setSelectedCategory } = useGrocery();

  return (
    <div className="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background subtle geometric patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grocery-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grocery-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Headline & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ur' ? 'لاہور کی سب سے معتبر کریانہ سروس' : 'Authentic Pakistani Karyana & Whole Staples'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              {t.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              {t.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start rtl:lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setCustomerPage('products');
                }}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-98 text-sm sm:text-base cursor-pointer"
              >
                <span>{t.startShopping}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                onClick={() => setCustomerPage('categories')}
                className="flex items-center justify-center gap-2 bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl border border-emerald-500/50 transition-colors text-sm sm:text-base cursor-pointer"
              >
                <span>{t.viewCategories}</span>
              </button>
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-emerald-700/60 text-[11px] sm:text-xs text-emerald-100">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start rtl:lg:justify-start">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.featureFastDelivery}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start rtl:lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{t.featureFreshQuality}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start rtl:lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.featureCod}</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card - Clean Grocery Stack */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-emerald-600/50 shadow-xl">
              <div className="bg-white text-slate-900 rounded-xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                      {language === 'ur' ? 'آج کی ترجیحی راشن فہرست' : "Today's Essential Rations"}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {language === 'ur' ? 'خالص اور تصدیق شدہ پیکنگ' : 'Standard Household Pack Sizes'}
                    </h3>
                  </div>
                  <span className="badge-emerald px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {language === 'ur' ? 'دستیاب ہے' : 'In Stock'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-medium text-slate-800">
                      {language === 'ur' ? 'سپر کرنل باسمتی چاول' : 'Super Kernel Basmati Rice'}
                    </span>
                    <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      5 KG & 25 KG Bag
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-medium text-slate-800">
                      {language === 'ur' ? 'ڈالڈا بناسپتی گھی' : 'Dalda Banaspati Ghee'}
                    </span>
                    <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      2.5 KG & 5 KG Tin
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-medium text-slate-800">
                      {language === 'ur' ? 'تازہ چکی کا خالص آٹا' : 'Fresh Chakki Whole Wheat Atta'}
                    </span>
                    <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      10 KG & 20 KG Bag
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-medium text-slate-800">
                      {language === 'ur' ? 'دال چنا اسپیشل مشینی صاف' : 'Daal Chana Machine Cleaned'}
                    </span>
                    <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      1 KG & 2 KG Pack
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-center border-t border-slate-100 text-[11px] text-slate-500">
                  {language === 'ur'
                    ? 'سامان براہ راست گودام سے تول کر مکمل صفائی سے بھیجا جاتا ہے۔'
                    : 'Dispatched directly from licensed grain storage with digital scales.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
