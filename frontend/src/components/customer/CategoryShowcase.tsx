'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Droplet, Wheat, Layers, Sparkles, CircleDot, Flame, Coffee, ChevronRight } from 'lucide-react';
import { Category } from '../../types/grocery';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Droplet,
  Wheat,
  Layers,
  Sparkles,
  CircleDot,
  Flame,
  Coffee,
};

export const CategoryShowcase: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory, setCustomerPage, language, t } = useGrocery();

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setCustomerPage('products');
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.popularCategories}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {language === 'ur'
                ? 'تمام گھریلو و ہوٹل راشن کی معیاری کیٹیگریز'
                : 'Browse staple Pakistani kitchen provisions and bulk packaging'}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCustomerPage('categories');
            }}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>{language === 'ur' ? 'سبھی دیکھیں' : 'View All'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.iconName] || CircleDot;
            const isSelected = selectedCategory === category.id;

            return (
              <div
                key={category.id}
                onClick={() => handleSelectCategory(category.id)}
                className={`group cursor-pointer rounded-2xl p-4 text-center transition-all bg-white border ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-400 hover:shadow-md'
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-50 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                  {language === 'ur' ? category.nameUrdu : category.name}
                </h3>

                <p className="text-[11px] text-slate-500 mt-1">
                  {category.productCount} {language === 'ur' ? 'اقسام' : 'varieties'}
                </p>

                {category.badge && (
                  <span className="inline-block mt-2 text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {language === 'ur' ? category.badgeUrdu : category.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
