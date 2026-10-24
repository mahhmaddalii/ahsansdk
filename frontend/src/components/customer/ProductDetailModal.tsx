'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { X, Plus, Minus, Check, Package, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Product } from '../../types/grocery';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    products,
    language,
    t,
    addToCart,
  } = useGrocery();

  const product = selectedProductForModal;

  const [selectedPack, setSelectedPack] = useState<string>(
    product?.defaultPackSize || product?.packSizes[0] || '1 KG'
  );
  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedPack, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedProductForModal(null);
    }, 1200);
  };

  // Find 2 recommended items in same or related category
  const relatedItems = products
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 bg-white/90 hover:bg-slate-100 text-slate-700 p-2 rounded-full border border-slate-200 shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Large Product Image */}
          <div className="relative bg-slate-100 min-h-[260px] md:min-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 flex gap-1.5">
              <span className="badge-emerald px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
                {product.inStock ? t.inStock : t.outOfStock}
              </span>
              <span className="bg-slate-900/80 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                {product.unit}
              </span>
            </div>
          </div>

          {/* Right Product Details Content */}
          <div className="p-5 sm:p-7 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {language === 'ur' ? product.categoryUrdu : product.category.replace('-', ' ')}
              </span>

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                {language === 'ur' ? product.nameUrdu : product.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {language === 'ur' ? product.descriptionUrdu : product.description}
              </p>

              {/* Pack Sizes */}
              <div className="mt-4 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  {t.selectPackSize}:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.packSizes.map((pack) => (
                    <button
                      key={pack}
                      type="button"
                      onClick={() => setSelectedPack(pack)}
                      className={`text-xs p-2 rounded-xl font-medium border text-center transition-all ${
                        selectedPack === pack
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pack}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Guarantee Box */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'خالص کوالٹی اور وزن کی گارنٹی' : 'Guaranteed Net Certified Weight'}</span>
                </div>
                <p>
                  {language === 'ur'
                    ? 'گودام کے ڈیجیٹل اسکیل سے تول کر سیل بند پیکنگ میں ترسیل۔'
                    : 'Packed under food-grade hygiene standards with verified digital net weight.'}
                </p>
              </div>
            </div>

            {/* Quantity Selector & Add To Basket */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{t.quantity}:</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="p-2 hover:bg-slate-200 text-slate-700 active:bg-slate-300"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-900 min-w-[32px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((prev) => prev + 1)}
                    className="p-2 hover:bg-slate-200 text-slate-700 active:bg-slate-300"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* STRICT ZERO PRICE: ONLY ADD BUTTON */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  !product.inStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : added
                    ? 'bg-emerald-800 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    <span>{t.addToCart}</span>
                  </>
                )}
              </button>
            </div>

            {/* Frequently Ordered With This Product */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-2">
                {t.frequentlyOrderedTogether}:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {relatedItems.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProductForModal(rel);
                      setSelectedPack(rel.defaultPackSize);
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-white cursor-pointer transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-8 h-8 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-800 truncate">
                        {language === 'ur' ? rel.nameUrdu : rel.name}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-medium">
                        {rel.defaultPackSize}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
