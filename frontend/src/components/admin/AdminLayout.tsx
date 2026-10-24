'use client';

import React, { useState } from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopNav } from './AdminTopNav';
import { AdminDashboardView } from './AdminDashboardView';
import { AdminProductsView } from './AdminProductsView';
import { AdminInventoryView } from './AdminInventoryView';
import { AdminStockLedgerView } from './AdminStockLedgerView';
import { AdminBatchExpiryView } from './AdminBatchExpiryView';
import { AdminOrdersView } from './AdminOrdersView';
import { AdminOrderDetailModal } from './AdminOrderDetailModal';
import { AdminPurchasesView } from './AdminPurchasesView';
import { AdminSuppliersView } from './AdminSuppliersView';
import { AdminCustomersView } from './AdminCustomersView';
import { AdminDeliveryView } from './AdminDeliveryView';
import { AdminAccountingView } from './AdminAccountingView';
import { AdminReportsView } from './AdminReportsView';
import { AdminUsersView } from './AdminUsersView';
import { AdminAuditLogView } from './AdminAuditLogView';
import { AdminSettingsView } from './AdminSettingsView';

export const AdminLayout: React.FC = () => {
  const { adminPage } = useGrocery();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Column */}
      <div className="flex-1 lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64 flex flex-col min-w-0">
        <AdminTopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 pb-16">
          {adminPage === 'dashboard' && <AdminDashboardView />}
          {adminPage === 'products' && <AdminProductsView />}
          {adminPage === 'inventory' && <AdminInventoryView />}
          {adminPage === 'stock-ledger' && <AdminStockLedgerView />}
          {adminPage === 'batch-expiry' && <AdminBatchExpiryView />}
          {adminPage === 'orders' && <AdminOrdersView />}
          {adminPage === 'purchases' && <AdminPurchasesView />}
          {adminPage === 'suppliers' && <AdminSuppliersView />}
          {adminPage === 'customers' && <AdminCustomersView />}
          {adminPage === 'delivery' && <AdminDeliveryView />}
          {adminPage === 'accounting' && <AdminAccountingView />}
          {adminPage === 'reports' && <AdminReportsView />}
          {adminPage === 'users' && <AdminUsersView />}
          {adminPage === 'audit' && <AdminAuditLogView />}
          {adminPage === 'settings' && <AdminSettingsView />}
        </main>

        {/* Global Admin Order Detail Modal */}
        <AdminOrderDetailModal />
      </div>
    </div>
  );
};
