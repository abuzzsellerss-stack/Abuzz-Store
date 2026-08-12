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
    sm: { imgHeight: 'h-8 sm:h-9', text: 'text-xs sm:text-sm font-black' },
    md: { imgHeight: 'h-10 sm:h-12', text: 'text-sm sm:text-base font-black' },
    lg: { imgHeight: 'h-16 sm:h-20', text: 'text-xl sm:text-2xl font-black' },
    xl: { imgHeight: 'h-24 sm:h-32', text: 'text-2xl sm:text-4xl font-black' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  let textColor = 'text-foreground';
  if (variant === 'light') textColor = 'text-white';
  if (variant === 'dark') textColor = 'text-slate-900';

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center justify-center font-sans ${className}`}>
        <div className={`relative ${currentSize.imgHeight} aspect-square shrink-0 flex items-center justify-center`}>
          <img
            src="/abuzz-tool-eagle-logo.png"
            alt="Abuzz Hardware Tools Eagle Logo"
            className="h-full w-full object-contain transition-transform duration-200 hover:scale-105"
          />
        </div>
      </div>
    );
  }

  // Horizontal Sleek Inline Layout (Default for Header Alignment)
  return (
    <div className={`inline-flex items-center gap-1.5 font-sans ${className}`}>
      {/* Tool Eagle Emblem — transparent PNG */}
      <div className={`relative ${currentSize.imgHeight} aspect-square shrink-0 flex items-center justify-center`}>
        <img
          src="/abuzz-tool-eagle-logo.png"
          alt="Abuzz Hardware Tools Eagle Logo"
          className="h-full w-full object-contain transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Brand Text: ABUZZ.STORE */}
      {showText && (
        <div className="flex items-center tracking-wider">
          <span className={`${currentSize.text} font-black ${textColor} tracking-[0.15em] uppercase whitespace-nowrap`}>
            ABUZZ<span className="text-orange-500 font-black">.STORE</span>
          </span>
        </div>
      )}
    </div>
  );
};
export default AbuzzLogo;
