import React from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Wrench, Home, Search, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
              <Wrench className="w-12 h-12" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1.5 shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold text-foreground tracking-tight">404</h1>
            <h2 className="text-xl font-bold text-foreground">Page or Tool Not Found</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We couldn't find the tool, product, or page you were looking for. It might have been moved, renamed, or is temporarily out of stock.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-colors text-sm gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Catalog
            </Link>
            <Link
              href="/sitemap"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-input bg-background font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors text-sm gap-2"
            >
              <Search className="w-4 h-4" />
              Browse Sitemap
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
