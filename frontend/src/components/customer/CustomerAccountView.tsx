import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  ShoppingBag,
  MapPin,
  RefreshCw,
  Globe,
  Shield,
  Phone,
  FileText,
  ChevronRight,
  Plus,
  Truck,
  CheckCircle,
  LogOut,
} from 'lucide-react';

export const CustomerAccountView: React.FC = () => {
  const { customerUser, customerLogout } = useAuth();
  const {
    orders,
    setSelectedOrderForDetail,
    setCustomerPage,
    language,
    setLanguage,
    t,
    addToCart,
    products,
  } = useGrocery();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'policy'>('orders');

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Home (Residence)',
      address: 'House # 42, Block C-2, Main Boulevard, Gulberg III, Lahore',
      phone: '0300-4829104',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'Office (Gulberg Heights)',
      address: 'Suite 404, Gulberg Heights, Near Liberty Roundabout, Lahore',
      phone: '0321-8842109',
      isDefault: false,
    },
  ]);

  const handleReorder = (order: (typeof orders)[0]) => {
    order.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId) || products[0];
      addToCart(prod, item.packSize, item.quantity);
    });
    setCustomerPage('cart');
  };

  const handleTrack = (order: (typeof orders)[0]) => {
    setSelectedOrderForDetail(order);
    setCustomerPage('tracking');
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-[calc(100vh-180px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Profile Heading Banner */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              {customerUser?.name?.charAt(0) || 'K'}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {customerUser?.name || 'Muhammad Salman Khan'}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{customerUser?.phone || '0300-4829104'}</span>
                <span>•</span>
                <span className="text-emerald-800 font-semibold">{customerUser?.area || (language === 'ur' ? 'لاہور' : 'Gulberg III, Lahore')}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}</span>
            </button>

            <button
              onClick={() => customerLogout()}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'اکاؤنٹ لاگ آؤٹ' : 'Log Out'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'orders'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.orderHistory}</span>
            <span className="text-xs bg-white/20 px-1.5 rounded-full font-normal">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'addresses'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t.savedAddresses}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.profileDetails}</span>
          </button>

          <button
            onClick={() => setActiveTab('policy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'policy'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.navPolicy}</span>
          </button>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
                      {order.id}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
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
                </div>

                {/* Items preview */}
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">
                    {order.items.length} {t.items} (~{order.totalQuantityKg} KG):
                  </div>
                  <p className="text-slate-500 text-[11px] line-clamp-1">
                    {order.items
                      .map((i) => `${i.productName} (${i.packSize} x ${i.quantity})`)
                      .join(', ')}
                  </p>
                </div>

                {/* Footer with Final Total and Reorder Button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t.finalPayableTotal}:</span>
                    <span className="text-base font-extrabold text-emerald-800">
                      {order.finalTotal.toLocaleString()} PKR
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTrack(order)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      {t.trackOrder}
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      className="text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t.reorder}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm">{t.savedAddresses}</h3>
              <button className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'نیا پتہ شامل کریں' : 'Add New Address'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{addr.title}</span>
                    {addr.isDefault && (
                      <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {language === 'ur' ? 'بنیادی پتہ' : 'Default'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{addr.address}</p>
                  <p className="text-xs text-slate-400 font-mono">{addr.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-lg">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              {t.profileDetails}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">{t.fullName}:</label>
                <input
                  type="text"
                  readOnly
                  value="Muhammad Salman Khan"
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">{t.phoneNumber}:</label>
                <input
                  type="text"
                  readOnly
                  value="0300-4829104"
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">{language === 'ur' ? 'شہر و علاقہ:' : 'City & Sector:'}</label>
                <input
                  type="text"
                  readOnly
                  value="Gulberg III, Lahore, Pakistan"
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Delivery Policy */}
        {activeTab === 'policy' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 leading-relaxed text-xs sm:text-sm text-slate-600">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-2">
              {language === 'ur' ? 'کریانہ ایکسپریس ڈیلیوری و راشن پالیسی' : 'KaryanaExpress Delivery & Packaging Policy'}
            </h3>
            <p>
              {language === 'ur'
                ? 'ہمارا تمام راشن اور اناج لاہور کی مرکزی منڈی اور لائسنس یافتہ ملوں سے تصدیق شدہ وزنی پیمانوں پر تول کر فراہم کیا جاتا ہے۔'
                : 'All kitchen staples, flours, grains, and ghee are weighed on calibrated digital industrial scales and hermetically sealed to prevent moisture ingress.'}
            </p>
            <div className="space-y-2 pt-2">
              <div className="font-bold text-slate-900">
                {language === 'ur' ? 'ڈیلیوری کے اوقات اور چارجز:' : 'Delivery Schedules & Rates:'}
              </div>
              <ul className="list-disc pl-5 rtl:pr-5 space-y-1 text-xs">
                <li>Gulberg, Model Town, Garden Town: 150 PKR (Free above 5,000 PKR).</li>
                <li>DHA Phases 1-6 & Cantt: 200 PKR (Free above 6,000 PKR).</li>
                <li>Johar Town & Faisal Town: 180 PKR.</li>
                <li>Bahria Town Lahore: 350 PKR.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
