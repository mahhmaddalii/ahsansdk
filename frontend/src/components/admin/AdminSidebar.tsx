import React from 'react';
import { useRouter } from 'next/navigation';
import { useGrocery } from '../../context/GroceryContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  ScrollText,
  ClockAlert,
  Truck,
  Users,
  Building2,
  FileSpreadsheet,
  BarChart3,
  ShieldCheck,
  History,
  Settings,
  Store,
  ChevronRight,
  X,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { AdminPage } from '../../types/grocery';

interface NavItem {
  id: AdminPage;
  label: string;
  labelUrdu: string;
  icon: React.FC<{ className?: string }>;
  badge?: number | string;
  badgeColor?: string;
  category?: string;
}

export const AdminSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { adminUser, adminLogout } = useAuth();
  const { adminPage, setAdminPage, orders, batches, products, language, t } = useGrocery();

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const expiringCount = batches.filter((b) => b.status === 'Expiring Soon' || b.status === 'Expired').length;
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', labelUrdu: 'ڈیش بورڈ', icon: LayoutDashboard },

    // Operations
    { id: 'orders', label: 'Orders & Dispatch', labelUrdu: 'آرڈرز و ترسیل', icon: ShoppingCart, badge: pendingOrdersCount, badgeColor: 'bg-amber-500 text-slate-950' },
    { id: 'products', label: 'Products & Pricing', labelUrdu: 'مصنوعات و قیمتیں', icon: Package },
    { id: 'inventory', label: 'Stock Inventory', labelUrdu: 'گودام و انوینٹری', icon: Boxes, badge: lowStockCount > 0 ? lowStockCount : undefined, badgeColor: 'bg-rose-500 text-white' },
    { id: 'stock-ledger', label: 'Stock Ledger', labelUrdu: 'اسٹاک لیجر', icon: ScrollText },
    { id: 'batch-expiry', label: 'Batch & Expiry', labelUrdu: 'بیچ و ایکسپائری', icon: ClockAlert, badge: expiringCount > 0 ? expiringCount : undefined, badgeColor: 'bg-amber-500 text-slate-950' },

    // Supply & CRM
    { id: 'purchases', label: 'Purchases (PO)', labelUrdu: 'خریداری (پرچیز)', icon: FileSpreadsheet },
    { id: 'suppliers', label: 'Suppliers', labelUrdu: 'سپلائرز', icon: Building2 },
    { id: 'customers', label: 'Customers & Credit', labelUrdu: 'کسٹمرز و کھاتہ', icon: Users },
    { id: 'delivery', label: 'Delivery Zones', labelUrdu: 'ڈیلیوری زونز', icon: Truck },

    // Financials & Reporting
    { id: 'accounting', label: 'Accounting & Ledger', labelUrdu: 'کھاتہ داری و فنانس', icon: FileSpreadsheet },
    { id: 'reports', label: 'Reports & P&L', labelUrdu: 'کاروباری رپورٹس', icon: BarChart3 },

    // Administration
    { id: 'users', label: 'Users & Permissions', labelUrdu: 'صارفین و اختیارات', icon: ShieldCheck },
    { id: 'audit', label: 'Audit Logs', labelUrdu: 'آڈٹ لاگز', icon: History },
    { id: 'settings', label: 'Settings', labelUrdu: 'سسٹم ترتیبات', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 rtl:left-auto rtl:right-0 z-40 w-64 bg-slate-900 text-slate-300 border-r rtl:border-r-0 rtl:border-l border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                K
              </div>
              <div>
                <span className="font-extrabold text-white text-sm tracking-tight block">
                  {language === 'ur' ? 'کریانہ ای آر پی' : 'Karyana ERP'}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {language === 'ur' ? 'کاروباری مینجمنٹ' : 'Wholesale & Retail'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-none text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminPage(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{language === 'ur' ? item.labelUrdu : item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        item.badgeColor || 'bg-slate-700 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User / Admin Logout Box */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-slate-950 flex items-center justify-center font-bold text-xs">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{adminUser?.name || 'Administrator'}</p>
              <p className="text-[10px] text-emerald-400 font-mono">{adminUser?.email || 'admin@karyana.pk'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 rounded-xl border border-slate-700 transition-colors font-medium text-center"
              title="Open customer storefront in new tab"
            >
              <Store className="w-3.5 h-3.5 text-emerald-400" />
              <span>Storefront</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
            </a>

            <button
              onClick={async () => {
                await adminLogout();
                router.push('/admin/login');
              }}
              className="flex items-center justify-center gap-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs py-2 rounded-xl border border-rose-800/50 transition-colors font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
