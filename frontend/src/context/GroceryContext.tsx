'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  BatchExpiry,
  StockLedgerEntry,
  Supplier,
  PurchaseOrder,
  CustomerProfile,
  DeliveryZone,
  Language,
  PortalMode,
  CustomerPage,
  AdminPage,
} from '../types/grocery';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_BATCHES,
  INITIAL_STOCK_LEDGER,
  INITIAL_SUPPLIERS,
  INITIAL_PURCHASES,
  INITIAL_CUSTOMERS,
  INITIAL_DELIVERY_ZONES,
} from '../data/mockGroceryData';
import { TRANSLATIONS } from '../data/translations';

interface GroceryContextType {
  // Navigation & Localization
  portalMode: PortalMode;
  setPortalMode: (mode: PortalMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (typeof TRANSLATIONS)['en'];
  customerPage: CustomerPage;
  setCustomerPage: (page: CustomerPage) => void;
  adminPage: AdminPage;
  setAdminPage: (page: AdminPage) => void;

  // Catalog & Search
  products: Product[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  selectedPackFilter: string | null;
  setSelectedPackFilter: (pack: string | null) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (p: Product | null) => void;

  // Customer Cart
  cart: CartItem[];
  addToCart: (product: Product, packSize: string, quantity: number) => void;
  removeFromCart: (productId: string, packSize: string) => void;
  updateCartQuantity: (productId: string, packSize: string, delta: number) => void;
  updateCartPackSize: (productId: string, oldPackSize: string, newPackSize: string) => void;
  clearCart: () => void;
  totalCartWeightKg: number;
  totalCartItemsCount: number;

  // Orders
  orders: Order[];
  selectedOrderForDetail: Order | null;
  setSelectedOrderForDetail: (order: Order | null) => void;
  latestPlacedOrder: Order | null;
  placeOrder: (customerData: {
    fullName: string;
    phone: string;
    address: string;
    area: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, notes?: string) => void;

  // Admin Data & Mutators
  batches: BatchExpiry[];
  stockLedger: StockLedgerEntry[];
  suppliers: Supplier[];
  purchases: PurchaseOrder[];
  customers: CustomerProfile[];
  deliveryZones: DeliveryZone[];
  addProduct: (newProd: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Mobile drawer state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export const GroceryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portalMode, setPortalMode] = useState<PortalMode>('customer');
  const [language, setLanguage] = useState<Language>('en');
  const [customerPage, setCustomerPage] = useState<CustomerPage>('home');
  const [adminPage, setAdminPage] = useState<AdminPage>('dashboard');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [batches] = useState<BatchExpiry[]>(INITIAL_BATCHES);
  const [stockLedger, setStockLedger] = useState<StockLedgerEntry[]>(INITIAL_STOCK_LEDGER);
  const [suppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [purchases] = useState<PurchaseOrder[]>(INITIAL_PURCHASES);
  const [customers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [deliveryZones] = useState<DeliveryZone[]>(INITIAL_DELIVERY_ZONES);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);

  const [cart, setCart] = useState<CartItem[]>([
    {
      productId: 'prod-1',
      packSize: '5 KG Tin',
      quantity: 1,
      product: INITIAL_PRODUCTS[0],
    },
    {
      productId: 'prod-5',
      packSize: '10 KG Bag',
      quantity: 2,
      product: INITIAL_PRODUCTS[4],
    },
    {
      productId: 'prod-9',
      packSize: '2 KG',
      quantity: 1,
      product: INITIAL_PRODUCTS[8],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPackFilter, setSelectedPackFilter] = useState<string | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isRTL = language === 'ur';
  const t = TRANSLATIONS[language];

  // Sync HTML dir attribute for native RTL layout behavior
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  // Cart actions
  const addToCart = (product: Product, packSize: string, quantity: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.packSize === packSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { productId: product.id, packSize, quantity, product }];
    });
  };

  const removeFromCart = (productId: string, packSize: string) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.packSize === packSize)));
  };

  const updateCartQuantity = (productId: string, packSize: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.packSize === packSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const updateCartPackSize = (productId: string, oldPackSize: string, newPackSize: string) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.productId === productId && item.packSize === oldPackSize) {
          return { ...item, packSize: newPackSize };
        }
        return item;
      });
    });
  };

  const clearCart = () => setCart([]);

  // Calculate approximate weight for heavy grocery items
  const totalCartWeightKg = cart.reduce((total, item) => {
    const sizeStr = item.packSize.toLowerCase();
    let weight = 1;
    if (sizeStr.includes('10 kg')) weight = 10;
    else if (sizeStr.includes('25 kg')) weight = 25;
    else if (sizeStr.includes('16 kg')) weight = 16;
    else if (sizeStr.includes('5 kg') || sizeStr.includes('5 litre')) weight = 5;
    else if (sizeStr.includes('2.5 kg') || sizeStr.includes('3 litre')) weight = 2.5;
    else if (sizeStr.includes('2 kg')) weight = 2;
    else if (sizeStr.includes('1 kg') || sizeStr.includes('1 litre')) weight = 1;
    else if (sizeStr.includes('500g') || sizeStr.includes('450g')) weight = 0.5;
    return total + weight * item.quantity;
  }, 0);

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Customer Place Order (Strict Zero Individual Price Rule)
  const placeOrder = (customerData: {
    fullName: string;
    phone: string;
    address: string;
    area: string;
    notes?: string;
  }): Order => {
    // Internal cost & price calculation for the order aggregate
    let itemsAggregateSubtotal = 0;
    const orderItems = cart.map((item) => {
      const unitPrice = item.product.sellingPrice;
      const subtotal = unitPrice * item.quantity;
      itemsAggregateSubtotal += subtotal;
      return {
        productId: item.productId,
        productName: item.product.name,
        productNameUrdu: item.product.nameUrdu,
        packSize: item.packSize,
        quantity: item.quantity,
        unitPrice,
        subtotal,
      };
    });

    // Find area delivery charge
    const matchedZone = deliveryZones.find((z) => customerData.area.includes(z.area.split(' ')[0])) || deliveryZones[0];
    const deliveryCharge = itemsAggregateSubtotal >= matchedZone.freeDeliveryThreshold ? 0 : matchedZone.deliveryCharge;
    const finalTotal = itemsAggregateSubtotal + deliveryCharge;

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: customerData.fullName,
      customerPhone: customerData.phone,
      address: customerData.address,
      area: customerData.area,
      orderNotes: customerData.notes || '',
      items: orderItems,
      totalQuantityKg: totalCartWeightKg,
      deliveryCharge,
      finalTotal,
      paymentMethod: 'Cash on Delivery',
      status: 'Pending',
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      estimatedDelivery: 'Today within 90 minutes',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestPlacedOrder(newOrder);
    clearCart();

    // Append to stock ledger
    const newLedgerEntries: StockLedgerEntry[] = cart.map((ci) => ({
      id: `led-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toLocaleString(),
      productId: ci.productId,
      productName: ci.product.name,
      transactionType: 'Sale',
      quantity: -ci.quantity,
      balance: Math.max(0, ci.product.stock - ci.quantity),
      reference: newOrder.id,
      user: 'Web Checkout',
    }));
    setStockLedger((prev) => [...newLedgerEntries, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, notes?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            staffNotes: notes || ord.staffNotes,
            assignedStaff:
              newStatus === 'Dispatched' && !ord.assignedStaff ? 'Bilal Arshad (Rider # 7)' : ord.assignedStaff,
          };
        }
        return ord;
      })
    );
  };

  // Admin Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const productWithId: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [productWithId, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <GroceryContext.Provider
      value={{
        portalMode,
        setPortalMode,
        language,
        setLanguage,
        isRTL,
        t,
        customerPage,
        setCustomerPage,
        adminPage,
        setAdminPage,

        products,
        categories,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedPackFilter,
        setSelectedPackFilter,
        selectedProductForModal,
        setSelectedProductForModal,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartPackSize,
        clearCart,
        totalCartWeightKg,
        totalCartItemsCount,

        orders,
        selectedOrderForDetail,
        setSelectedOrderForDetail,
        latestPlacedOrder,
        placeOrder,
        updateOrderStatus,

        batches,
        stockLedger,
        suppliers,
        purchases,
        customers,
        deliveryZones,
        addProduct,
        updateProduct,
        deleteProduct,

        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error('useGrocery must be used within a GroceryProvider');
  }
  return context;
};
