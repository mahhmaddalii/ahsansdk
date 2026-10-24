import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '../../../../data/mockGroceryData';

export async function GET(request: NextRequest) {
  // Return customer-safe catalog where sensitive pricing fields (purchaseCost, sellingPrice)
  // are completely stripped and excluded from the server payload!
  const customerSafeCatalog = INITIAL_PRODUCTS.map((prod) => ({
    id: prod.id,
    name: prod.name,
    nameUrdu: prod.nameUrdu,
    description: prod.description,
    descriptionUrdu: prod.descriptionUrdu,
    category: prod.category,
    categoryUrdu: prod.categoryUrdu,
    image: prod.image,
    packSizes: prod.packSizes,
    defaultPackSize: prod.defaultPackSize,
    unit: prod.unit,
    stock: prod.stock,
    inStock: prod.inStock,
    minStock: prod.minStock,
    sku: prod.sku,
    barcode: prod.barcode,
  }));

  return NextResponse.json({
    success: true,
    data: customerSafeCatalog,
  });
}
