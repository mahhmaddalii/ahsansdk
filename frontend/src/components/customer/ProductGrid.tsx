'use client';

import React, { useMemo } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Package, RefreshCw, AlertCircle } from 'lucide-react';

interface ProductGridProps {
  title?: string;
  limit?: number;
  featuredOnly?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, limit, featuredOnly }) => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedPackFilter,
    setSelectedPackFilter,
    searchQuery,
    setSearchQuery,
    language,
    t,
  } = useGrocery();

  // Filter products based on search query, selected category, and pack filter
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedPackFilter) {
      list = list.filter((p) =>
        p.packSizes.some((s) => s.toLowerCase().includes(selectedPackFilter.toLowerCase()))
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameUrdu.includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryUrdu.includes(q) ||
          p.packSizes.some((size) => size.toLowerCase().includes(q)) ||
          p.unit.toLowerCase().includes(q)
      );
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  }, [products, selectedCategory, selectedPackFilter, searchQuery, limit]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  const packFilterOptions = ['All Packs', '1 KG', '5 KG', '25 KG', 'Tin', 'Bag', 'Bottle'];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {title || (activeCategoryObj ? (language === 'ur' ? activeCategoryObj.nameUrdu : activeCategoryObj.name) : t.featuredProducts)}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {searchQuery ? (
                <span>
                  {language === 'ur'
                    ? `تلاش کے نتائج: "${searchQuery}" (${filteredProducts.length} اشیاء ملی ہیں)`
                    : `Search results for "${searchQuery}" (${filteredProducts.length} items found)`}
                </span>
              ) : activeCategoryObj ? (
                language === 'ur' ? activeCategoryObj.descriptionUrdu : activeCategoryObj.description
              ) : (
                language === 'ur'
                  ? 'لاہور کے گھروں اور ہوٹلوں کے لیے بہترین معیار کے اناج اور گھی'
                  : 'Certified quality rations packed for household & commercial requirements'
              )}
            </p>
          </div>

          {/* Quick pack size filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              <span>Pack:</span>
            </span>
            {packFilterOptions.map((opt) => {
              const isActive =
                (opt === 'All Packs' && selectedPackFilter === null) ||
                selectedPackFilter === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setSelectedPackFilter(opt === 'All Packs' ? null : opt)}
                  className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Search / Category Reset pill if any */}
        {(selectedCategory || searchQuery || selectedPackFilter) && (
          <div className="flex items-center gap-2 mb-6 text-xs text-slate-600 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
            <span className="font-semibold text-emerald-900">
              {language === 'ur' ? 'فلٹرز لاگو ہیں:' : 'Active Filters:'}
            </span>
            {selectedCategory && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-emerald-300 font-medium">
                {language === 'ur' ? activeCategoryObj?.nameUrdu : activeCategoryObj?.name}
              </span>
            )}
            {searchQuery && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-emerald-300 font-medium">
                "{searchQuery}"
              </span>
            )}
            {selectedPackFilter && (
              <span className="bg-white px-2 py-0.5 rounded-md border border-emerald-300 font-medium">
                {selectedPackFilter}
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setSelectedPackFilter(null);
              }}
              className="ml-auto text-emerald-800 font-bold hover:underline flex items-center gap-1 rtl:mr-auto rtl:ml-0"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{language === 'ur' ? 'تمام فلٹرز ختم کریں' : 'Clear All'}</span>
            </button>
          </div>
        )}

        {/* Products Grid: 4 cols desktop, 2-3 tablet, 2 mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {language === 'ur' ? 'کوئی پروڈکٹ نہیں ملی' : 'No Grocery Products Found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              {language === 'ur'
                ? 'براہ کرم کوئی دوسرا لفظ تلاش کریں یا زمرہ تبدیل کریں۔'
                : 'Try adjusting your search query or removing pack filters to see available inventory.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setSelectedPackFilter(null);
              }}
              className="mt-4 bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-800"
            >
              {language === 'ur' ? 'تمام مصنوعات دکھائیں' : 'Show All Groceries'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
