'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log runtime errors to monitoring service
    console.error('Unhandled runtime error in Abuzz Store:', error);
  }, [error]);

  const handleClearCacheAndReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('abuzz_catalog_overrides');
        localStorage.removeItem('abuzz_catalog_custom');
        localStorage.removeItem('abuzz_catalog_deleted');
        window.location.href = '/';
        return;
      }
    } catch (e) {
      console.error('Failed to clear cache:', e);
    }
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border p-8 rounded-2xl shadow-xl">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20 shadow-md">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-foreground">Something Went Wrong</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            An unexpected runtime error occurred while rendering this section of Abuzz Store.
          </p>
          {error?.message && (
            <p className="text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-xl break-words text-left">
              <strong>Error:</strong> {error.message}
            </p>
          )}
          {error?.digest && (
            <p className="text-[10px] font-mono text-muted-foreground bg-muted p-1.5 rounded-lg">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleClearCacheAndReset}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white font-bold text-xs gap-2 hover:bg-primary/90 transition-all shadow-md cursor-pointer min-h-[44px]"
          >
            <RefreshCw className="w-4 h-4" />
            Clear Cache & Reload
          </button>
          <Link
            href="/"
            onClick={() => {
              if (typeof window !== 'undefined') window.location.href = '/';
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border bg-card font-bold text-xs text-foreground gap-2 hover:bg-foreground/5 transition-all min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
