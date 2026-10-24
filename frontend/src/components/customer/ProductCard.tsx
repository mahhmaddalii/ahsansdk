'use client';

import React, { useState } from 'react';
import { Product } from '../../types/grocery';
import { useGrocery } from '../../context/GroceryContext';
import { Plus, Minus, Check, Eye, Package, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t, addToCart, setSelectedProductForModal } = useGrocery();
  const [selectedPackSize, setSelectedPackSize] = useState<string>(
    product.defaultPackSize || product.packSizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, 50));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedPackSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div
      onClick={() => setSelectedProductForModal(product)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative w-full pt-[75%] bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={language === 'ur' ? product.nameUrdu : product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Stock Status Badge */}
        <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-10">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200"></span>
              <span>{t.inStock}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-rose-700/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              <span>{t.outOfStock}</span>
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProductForModal(product);
          }}
          className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          title="Quick View / تفصیلات دیکھیں"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Category Pill */}
        <div className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2">
          <span className="bg-slate-900/70 backdrop-blur-xs text-white text-[9px] font-medium px-2 py-0.5 rounded-md">
            {language === 'ur' ? product.categoryUrdu : product.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
            {language === 'ur' ? product.nameUrdu : product.name}
          </h3>

          {/* Short description */}
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {language === 'ur' ? product.descriptionUrdu : product.description}
          </p>
        </div>

        {/* Available Pack Sizes Selector */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-medium flex items-center gap-1">
              <Package className="w-3 h-3 text-emerald-700" />
              <span>{t.selectPackSize}:</span>
            </span>
            <span className="text-emerald-800 font-bold text-[11px]">{selectedPackSize}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.packSizes.map((pack) => (
              <button
                key={pack}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPackSize(pack);
                }}
                className={`text-[10px] sm:text-[11px] px-2 py-1 rounded-md font-medium transition-all ${
                  selectedPackSize === pack
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {pack}
              </button>
            ))}
          </div>
        </div>

        {/* Notice: STRICT BUSINESS RULE - NO PRICE IS SHOWN HERE */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Quantity Selector */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden"
          >
            <button
              onClick={handleDecrement}
              className="p-1 sm:p-1.5 hover:bg-slate-200 text-slate-700 active:bg-slate-300 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs sm:text-sm font-bold text-slate-800 min-w-[24px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-1 sm:p-1.5 hover:bg-slate-200 text-slate-700 active:bg-slate-300 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs ${
              !product.inStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-800 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.addedToCart}</span>
              </>
            ) : (
              <span>{t.addToCart}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
