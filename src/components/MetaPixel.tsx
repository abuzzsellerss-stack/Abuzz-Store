'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { getMetaConfig } from '@/utils/adminMockData';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const MetaPixel: React.FC = () => {
  const pathname = usePathname();
  const config = getMetaConfig();

  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || config.pixelId || '1632757315074398';
  const isActive = config.isActive !== false && Boolean(pixelId);

  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return;

    // Track PageView on route changes
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, isActive]);

  if (!isActive) return null;

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt="Meta Pixel"
        />
      </noscript>
    </>
  );
};

export function trackMetaEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    if (window.fbq) {
      try {
        window.fbq('track', eventName, data);
      } catch (e) {
        console.warn('Meta Pixel Event error:', e);
      }
    } else {
      // Queue event if fbq is initializing
      window._fbq = window._fbq || [];
      window._fbq.push(['track', eventName, data]);
    }
  }
}

export default MetaPixel;

