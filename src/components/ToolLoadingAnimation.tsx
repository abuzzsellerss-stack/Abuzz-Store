'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Hammer, 
  Settings, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Sparkles, 
  Nut
} from 'lucide-react';

interface ToolLoadingAnimationProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  showProgress?: boolean;
}

export const ToolLoadingAnimation: React.FC<ToolLoadingAnimationProps> = ({
  message,
  size = 'fullscreen',
  showProgress = true
}) => {
  const [progress, setProgress] = useState(15);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const taglines = [
    'Forging Precision Hardware & Tools...',
    'Calibrating Industrial Power Specifications...',
    'Verifying GST Tax Invoices & HSN Slabs...',
    'Securing Enterprise Wholesale Pricing...',
    'Assembling Certified Quality Goods...'
  ];

  useEffect(() => {
    // Progress bar simulation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 15;
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 450);

    // Tagline cycler
    const taglineTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % taglines.length);
    }, 2200);

    // Safety timeout to prevent getting stuck on fullscreen loading overlay
    const safetyTimer = setTimeout(() => {
      if (size === 'fullscreen') {
        setIsVisible(false);
      }
    }, 1500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(taglineTimer);
      clearTimeout(safetyTimer);
    };
  }, [size]);

  if (size === 'fullscreen' && !isVisible) {
    return null;
  }

  const displayMessage = message || taglines[currentMessageIndex];

  // Container height based on size
  const containerClasses = size === 'fullscreen'
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-6'
    : size === 'lg'
      ? 'w-full py-16 flex flex-col items-center justify-center bg-card border border-border/60 rounded-3xl p-8 shadow-sm glass'
      : size === 'md'
        ? 'w-full py-10 flex flex-col items-center justify-center bg-card/50 rounded-2xl p-6'
        : 'py-6 flex flex-col items-center justify-center';

  return (
    <div className={containerClasses}>
      
      {/* TOOL ANIMATION HUB */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        
        {/* Outer Pulsing Glow Circle */}
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-25" />
        
        {/* Outer Rotating Industrial Gear Ring */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin text-primary/40">
          <Settings className="w-28 h-28 stroke-[1.2]" />
        </div>

        {/* Counter-Rotating Inner Gear */}
        <div className="absolute inset-3 flex items-center justify-center animate-spin-reverse text-primary/70">
          <Settings className="w-20 h-20 stroke-[1.5]" />
        </div>

        {/* Floating Tool Icons Array Around Center */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="p-1.5 rounded-xl bg-primary text-white shadow-md shadow-primary/30">
            <Wrench className="w-4 h-4 animate-gear-wiggle" />
          </div>
        </div>

        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 animate-bounce duration-700">
          <div className="p-1.5 rounded-xl bg-slate-900 text-white shadow-md">
            <Hammer className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute -left-1 top-1/2 -translate-y-1/2 animate-pulse">
          <div className="p-1.5 rounded-xl bg-amber-500 text-white shadow-md">
            <Zap className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute -right-1 top-1/2 -translate-y-1/2 animate-pulse">
          <div className="p-1.5 rounded-xl bg-blue-600 text-white shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Central Hex Nut Core */}
        <div className="relative z-10 w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-orange-600 text-white flex items-center justify-center shadow-lg shadow-primary/40 animate-tool-pulse">
          <Nut className="w-6 h-6 stroke-[2.5]" />
        </div>

      </div>

      {/* TEXT & PROGRESS BAR */}
      <div className="mt-6 flex flex-col items-center text-center max-w-sm w-full space-y-3">
        
        {/* Dynamic Tagline Text */}
        <div className="min-h-[24px] flex items-center justify-center">
          <p className="text-xs font-black uppercase tracking-wider text-foreground animate-in fade-in duration-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-spin" />
            <span>{displayMessage}</span>
          </p>
        </div>

        {/* Metallic Shimmer Progress Bar */}
        {showProgress && (
          <div className="w-full space-y-1.5">
            <div className="w-full h-2 rounded-full bg-foreground/10 border border-border/40 overflow-hidden relative p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-primary to-orange-600 transition-all duration-300 ease-out shadow-xs relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 shimmer-bg" />
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[9.5px] font-bold text-muted-foreground uppercase tracking-widest px-1">
              <span>Abuzz Industrial Standard</span>
              <span className="text-primary font-black">{progress}%</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default ToolLoadingAnimation;
