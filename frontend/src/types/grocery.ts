export type Language = 'en' | 'ur';
export type PortalMode = 'customer' | 'admin';

export type CustomerPage =
  | 'home'
  | 'categories'
  | 'products'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'tracking'
  | 'account'
  | 'orders'
  | 'addresses'
  | 'contact'
  | 'policy'
  | 'login'
  | 'register';

export type AdminPage =
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'stock-ledger'
  | 'batch-expiry'
  | 'orders'
  | 'order-detail'
  | 'purchases'
  | 'suppliers'
  | 'customers'
  | 'delivery'
  | 'accounting'
  | 'reports'
  | 'users'
  | 'audit'
  | 'settings';

export interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  descriptionUrdu: string;
  category: string;
  categoryUrdu: string;
  image: string;
  packSizes: string[];
  defaultPackSize: string;
  unit: string;
  stock: number;
  inStock: boolean;
  minStock: number;
  sku: string;
  barcode: string;
  // Admin-only fields (NEVER exposed to customer views)
  purchaseCost: number;
  sellingPrice: number;
}

export interface Category {
  id: string;
  name: string;
  nameUrdu: string;
  iconName: string;
  productCount: number;
  description: string;
  descriptionUrdu: string;
  badge?: string;
  badgeUrdu?: string;
}

export interface CartItem {
  productId: string;
  packSize: string;
  quantity: number;
  product: Product;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export interface OrderItem {
  productId: string;
  productName: string;
  productNameUrdu: string;
  packSize: string;
  quantity: number;
  // Admin only internal unit price
  unitPrice?: number;
  subtotal?: number;
}

export interface Order {
  id: string; // e.g. ORD-82914
  customerName: string;
  customerPhone: string;
  address: string;
  area: string;
  orderNotes?: string;
  items: OrderItem[];
  totalQuantityKg: number;
  deliveryCharge: number;
  finalTotal: number; // Aggregate total payable
  paymentMethod: 'Cash on Delivery';
  status: OrderStatus;
  date: string;
  estimatedDelivery: string;
  assignedStaff?: string;
  staffNotes?: string;
}

export interface BatchExpiry {
  id: string;
  productId: string;
  productName: string;
  batchNumber: string;
  purchaseDate: string;
  mfgDate: string;
  expiryDate: string;
  quantity: number;
  remainingStock: number;
  warehouse: string;
  status: 'Healthy' | 'Expiring Soon' | 'Expired';
}

export type StockTransactionType =
  | 'Opening Stock'
  | 'Purchase'
  | 'Sale'
  | 'Return'
  | 'Damage'
  | 'Wastage'
  | 'Adjustment'
  | 'Transfer';

export interface StockLedgerEntry {
  id: string;
  date: string;
  productId: string;
  productName: string;
  transactionType: StockTransactionType;
  quantity: number;
  balance: number;
  reference: string;
  user: string;
}

export interface Supplier {
  id: string;
  name: string;
  nameUrdu: string;
  contactPerson: string;
  phone: string;
  area: string;
  balance: number; // Supplier payable
  totalPurchases: number;
  rating: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  itemsCount: number;
  totalCost: number;
  paymentStatus: 'Paid' | 'Partial' | 'Pending';
  deliveryStatus: 'Received' | 'Pending' | 'In Transit';
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  area: string;
  address: string;
  totalOrders: number;
  totalSales: number;
  outstandingBalance: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
}

export interface DeliveryZone {
  id: string;
  area: string;
  zone: string;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  avgTime: string;
  status: 'Active' | 'Inactive';
}

export interface AccountingAccount {
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  status: 'Posted' | 'Draft';
}

export interface AuditLog {
  id: string;
  date: string;
  user: string;
  role: string;
  action: string;
  module: string;
  record: string;
  previousValue: string;
  newValue: string;
}

export interface RolePermission {
  role: string;
  roleUrdu: string;
  description: string;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
    export: boolean;
    managePrices: boolean;
    manageInventory: boolean;
    manageAccounting: boolean;
  };
}
