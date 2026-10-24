'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  X,
  Package,
  TrendingUp,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Product } from '../../types/grocery';

export const AdminProductsView: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    language,
    t,
  } = useGrocery();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    nameUrdu: '',
    description: '',
    descriptionUrdu: '',
    category: 'rice',
    categoryUrdu: 'چاول اور اناج',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    unit: 'Bag',
    packSizes: '1 KG, 5 KG Bag, 25 KG Bag',
    defaultPackSize: '5 KG Bag',
    purchaseCost: 1500,
    sellingPrice: 1850,
    stock: 100,
    minStock: 20,
    sku: 'SKU-NEW-001',
    barcode: '896400019999',
    inStock: true,
  });

  const openNewModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameUrdu: '',
      description: '',
      descriptionUrdu: '',
      category: 'rice',
      categoryUrdu: 'چاول اور اناج',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      unit: 'Bag',
      packSizes: '1 KG, 5 KG Bag, 25 KG Bag',
      defaultPackSize: '5 KG Bag',
      purchaseCost: 1500,
      sellingPrice: 1850,
      stock: 100,
      minStock: 20,
      sku: `SKU-${Math.floor(100 + Math.random() * 900)}`,
      barcode: `8964000${Math.floor(10000 + Math.random() * 90000)}`,
      inStock: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      nameUrdu: p.nameUrdu,
      description: p.description,
      descriptionUrdu: p.descriptionUrdu,
      category: p.category,
      categoryUrdu: p.categoryUrdu,
      image: p.image,
      unit: p.unit,
      packSizes: p.packSizes.join(', '),
      defaultPackSize: p.defaultPackSize,
      purchaseCost: p.purchaseCost,
      sellingPrice: p.sellingPrice,
      stock: p.stock,
      minStock: p.minStock,
      sku: p.sku,
      barcode: p.barcode,
      inStock: p.inStock,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packSizesArr = formData.packSizes.split(',').map((s) => s.trim()).filter(Boolean);
    const catObj = categories.find((c) => c.id === formData.category);

    const productPayload = {
      name: formData.name,
      nameUrdu: formData.nameUrdu,
      description: formData.description,
      descriptionUrdu: formData.descriptionUrdu,
      category: formData.category,
      categoryUrdu: catObj ? catObj.nameUrdu : formData.categoryUrdu,
      image: formData.image,
      unit: formData.unit,
      packSizes: packSizesArr.length > 0 ? packSizesArr : ['1 KG'],
      defaultPackSize: formData.defaultPackSize || packSizesArr[0] || '1 KG',
      purchaseCost: Number(formData.purchaseCost),
      sellingPrice: Number(formData.sellingPrice),
      stock: Number(formData.stock),
      minStock: Number(formData.minStock),
      sku: formData.sku,
      barcode: formData.barcode,
      inStock: formData.inStock,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameUrdu.includes(search) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {language === 'ur' ? 'مصنوعات کی فہرست و قیمتیں' : 'Products & Pricing Directory'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'ur'
              ? 'خریداری، فروخت اور منافع کا مکمل حساب کتاب (صرف ایڈمن کے لیے)'
              : 'Full inventory pricing, purchase costs, selling prices, and margin controls.'}
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addNewProduct}</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, SKU, or Urdu text..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 rtl:pl-4 rtl:pr-9"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 w-full sm:w-auto"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {language === 'ur' ? c.nameUrdu : c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive Products Table: transforms on mobile */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Desktop / Tablet Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">SKU / Unit</th>
                <th className="py-3 px-4 text-right rtl:text-left">Purchase Cost</th>
                <th className="py-3 px-4 text-right rtl:text-left">Selling Price</th>
                <th className="py-3 px-4 text-right rtl:text-left">Margin</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProducts.map((p) => {
                const margin = p.sellingPrice - p.purchaseCost;
                const marginPct = ((margin / p.sellingPrice) * 100).toFixed(1);
                const isLowStock = p.stock <= p.minStock;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Product */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">{p.name}</p>
                          <p className="text-[11px] text-slate-500 font-sans">{p.nameUrdu}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-slate-600">
                      <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                        {language === 'ur' ? p.categoryUrdu : p.category}
                      </span>
                    </td>

                    {/* SKU & Unit */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-slate-800 font-bold block">{p.sku}</span>
                      <span className="text-[11px] text-slate-400">{p.unit}</span>
                    </td>

                    {/* Purchase Cost (ADMIN ONLY) */}
                    <td className="py-3 px-4 text-right rtl:text-left font-mono font-semibold text-slate-600">
                      {p.purchaseCost.toLocaleString()} PKR
                    </td>

                    {/* Selling Price (ADMIN ONLY) */}
                    <td className="py-3 px-4 text-right rtl:text-left font-mono font-extrabold text-emerald-800">
                      {p.sellingPrice.toLocaleString()} PKR
                    </td>

                    {/* Margin */}
                    <td className="py-3 px-4 text-right rtl:text-left">
                      <span className="text-emerald-700 font-bold block text-xs">
                        +{margin.toLocaleString()} PKR
                      </span>
                      <span className="text-[10px] text-slate-400">({marginPct}%)</span>
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-bold ${
                          isLowStock ? 'text-rose-600' : 'text-slate-900'
                        }`}
                      >
                        {p.stock} {p.unit}
                      </span>
                      {isLowStock && (
                        <span className="block text-[10px] text-rose-500 font-semibold">Low</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.inStock ? 'badge-emerald' : 'badge-red'
                        }`}
                      >
                        {p.inStock ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {editingProduct ? t.editProduct : t.addNewProduct}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {t.productName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {t.productNameUrdu} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameUrdu}
                    onChange={(e) => setFormData({ ...formData, nameUrdu: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.nameUrdu})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pack Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.packSizes}
                    onChange={(e) => setFormData({ ...formData, packSizes: e.target.value })}
                    placeholder="1 KG, 5 KG Bag, 25 KG Bag"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Pricing Section (ADMIN ONLY) */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                <span className="font-bold text-emerald-900 text-xs block">
                  Confidential Pricing & Margin Controls (Admin Screen Only)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {t.purchaseCost} *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.purchaseCost}
                      onChange={(e) => setFormData({ ...formData, purchaseCost: Number(e.target.value) })}
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {t.sellingPrice} *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.sellingPrice}
                      onChange={(e) => setFormData({ ...formData, sellingPrice: Number(e.target.value) })}
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 font-bold text-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Calculated Margin</label>
                    <div className="p-2 bg-white rounded-lg border border-slate-200 font-extrabold text-emerald-700">
                      {(formData.sellingPrice - formData.purchaseCost).toLocaleString()} PKR
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min Threshold</label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.sku}</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit Type</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
