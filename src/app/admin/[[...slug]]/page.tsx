import React, { Suspense } from 'react';
import { AdminContent } from '../AdminContent';
import { Loader2 } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['dashboard'] },
    { slug: ['orders'] },
    { slug: ['catalog'] },
    { slug: ['payments'] },
    { slug: ['taxation'] },
    { slug: ['vendors'] },
    { slug: ['logistics'] },
    { slug: ['shiprocket'] },
    { slug: ['rfqs'] },
    { slug: ['credit'] },
    { slug: ['marketing'] },
    { slug: ['integrations'] },
    { slug: ['customers'] },
  ];
}

export default function AdminCatchAllPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Loading Admin Workspace...
          </p>
        </div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}
