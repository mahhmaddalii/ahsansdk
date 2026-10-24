import type { Metadata, Viewport } from 'next';
import { AppProviders } from '../components/providers/AppProviders';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'KaryanaExpress | Pure Pakistani Grocery & Wholesale Operations',
  description:
    'Modern responsive online grocery ordering portal and ERP business management dashboard for Pakistani Karyana stores. Certified weights, pure staples, and fast doorstep COD delivery.',
  keywords: [
    'Karyana',
    'Pakistan Grocery',
    'Chakki Atta',
    'Basmati Rice',
    'Banaspati Ghee',
    'Daal Chana',
    'Lahore Grocery Delivery',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
