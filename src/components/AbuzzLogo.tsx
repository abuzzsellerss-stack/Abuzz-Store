'use client';

import React from 'react';

interface AbuzzLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  layout?: 'horizontal' | 'vertical';
}

export const AbuzzLogo: React.FC<AbuzzLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  variant = 'auto',
  layout = 'horizontal'
}) => {
  const sizeMap = {
    sm: { imgHeight: 'h-7 sm:h-8', text: 'text-xs', line: 'w-2 sm:w-3' },
    md: { imgHeight: 'h-8 sm:h-10', text: 'text-xs sm:text-sm font-black', line: 'w-3 sm:w-4' },
    lg: { imgHeight: 'h-12 sm:h-16', text: 'text-base sm:text-xl font-black', line: 'w-5 sm:w-6' },
    xl: { imgHeight: 'h-16 sm:h-24', text: 'text-xl sm:text-3xl font-black', line: 'w-8 sm:w-10' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  let textColor = 'text-slate-900 dark:text-slate-50';
  if (variant === 'light') textColor = 'text-white';
  if (variant === 'dark') textColor = 'text-slate-900';

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center justify-center font-sans ${className}`}>
        <div className={`relative ${currentSize.imgHeight} aspect-square shrink-0 flex items-center justify-center`}>
          <img
            src="/favicon.svg"
            alt="Abuzz Hardware Tools Emblem"
            className="h-full w-full object-contain drop-shadow-md transition-transform duration-200 hover:scale-105"
          />
        </div>
        {showText && (
          <div className="flex items-center gap-1 mt-1 tracking-wider">
            <span className={`${currentSize.line} h-[2px] bg-orange-500 shrink-0 rounded-full`} />
            <span className={`${currentSize.text} font-black ${textColor} tracking-[0.18em] uppercase whitespace-nowrap`}>
              ABUZZ<span className="text-orange-500 font-black">.STORE</span>
            </span>
            <span className={`${currentSize.line} h-[2px] bg-orange-500 shrink-0 rounded-full`} />
          </div>
        )}
      </div>
    );
  }

  // Horizontal Sleek Inline Layout (Default for Header Alignment)
  return (
    <div className={`inline-flex items-center gap-2 font-sans ${className}`}>
      {/* Tool-Crafted Emblem */}
      <div className={`relative ${currentSize.imgHeight} aspect-square shrink-0 flex items-center justify-center`}>
        <img
          src="/favicon.svg"
          alt="Abuzz Hardware Tools Emblem"
          className="h-full w-full object-contain drop-shadow-md transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Brand Text: — ABUZZ.STORE — */}
      {showText && (
        <div className="flex items-center gap-1 tracking-wider">
          <span className={`${currentSize.text} font-black ${textColor} tracking-[0.15em] uppercase whitespace-nowrap`}>
            ABUZZ<span className="text-orange-500 font-black">.STORE</span>
          </span>
        </div>
      )}
    </div>
  );
};
export default AbuzzLogo;
