'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AbuzzLogo } from './AbuzzLogo';
import { Facebook, Twitter, Instagram, ShieldCheck, Award, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { getSocialLinks, INITIAL_SOCIAL_LINKS, SocialMediaLinks } from '../utils/adminMockData';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>(INITIAL_SOCIAL_LINKS);

  useEffect(() => {
    setSocialLinks(getSocialLinks());
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full border-t border-border bg-card/60 backdrop-blur-md pt-12 pb-24 md:pb-12 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 mb-8">
          
          {/* Column 1: Store Intro */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="hover:opacity-95 transition-opacity self-start">
              <AbuzzLogo size="md" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans max-w-xs">
              India's premier e-commerce destination for heavy-duty industrial power tools, architectural hardware, safety equipment, and premium construction materials.
            </p>
            
            {/* Social Media links */}
            <div className="flex items-center gap-2.5 mt-2 flex-wrap">
              {socialLinks.facebook && (
                <a 
                  href={socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-foreground/5 hover:bg-primary hover:text-white transition-colors" 
                  aria-label="Facebook"
                  title="Facebook Profile"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-foreground/5 hover:bg-primary hover:text-white transition-colors" 
                  aria-label="Twitter"
                  title="Twitter / X Profile"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-foreground/5 hover:bg-primary hover:text-white transition-colors" 
                  aria-label="Instagram"
                  title="Instagram Profile"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-foreground/5 hover:bg-primary hover:text-white transition-colors" 
                  aria-label="LinkedIn"
                  title="LinkedIn Page"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a 
                  href={socialLinks.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-foreground/5 hover:bg-primary hover:text-white transition-colors" 
                  aria-label="YouTube"
                  title="YouTube Channel"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {socialLinks.whatsapp && (
                <a 
                  href={socialLinks.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-foreground/5 hover:bg-emerald-600 hover:text-white transition-colors" 
                  aria-label="WhatsApp"
                  title="WhatsApp Business"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Policy Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">
              Policy Info
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-sans">
              <li>
                <Link href="/refund-policy" className="hover:text-primary font-bold text-primary transition-colors">Return & Refund Policy</Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/policies/terms-of-sale" className="hover:text-primary transition-colors">Terms of Sale</Link>
              </li>
              <li>
                <Link href="/policies/terms-of-use" className="hover:text-primary transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link href="/policies/report-abuse" className="hover:text-primary transition-colors">Report Abuse & Takedown Policy</Link>
              </li>
              <li>
                <Link href="/policies/bis-standard" className="hover:text-primary transition-colors">Know Your BIS Standard</Link>
              </li>
              <li>
                <Link href="/policies/bis-certification" className="hover:text-primary transition-colors">Products Under Compulsory BIS Certification</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-sans">
              <li>
                <Link href="/track-order" className="hover:text-primary transition-colors font-bold text-primary">Track Order Status</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Credentials / BIS Certification */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-1">
              Quality & Trust
            </h4>
            <p className="text-[10px] text-muted-foreground leading-normal font-sans">
              All tools, infrastructure components, and safety equipment conform strictly to Bureau of Indian Standards (BIS) parameters.
            </p>
            
            <div className="space-y-2 mt-1">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-500/5 border border-border/40">
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-foreground">100% Genuine Products</span>
                  <span className="text-[8px] text-muted-foreground">Original brand warranty protection</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-500/5 border border-border/40">
                <Award className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-foreground">BIS Standard Compliant</span>
                  <span className="text-[8px] text-muted-foreground">Certified quality materials</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Payment Methods Section */}
        <div className="border-t border-border/30 pt-6 mt-4 mb-6">
          <h5 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-3">
            Payment
          </h5>
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Card 1: Custom RuPay color bar card */}
            <div className="h-8 w-12 rounded-md bg-gradient-to-b from-[#3b82f6] via-slate-100 to-[#f59e0b] p-1 shadow-sm flex flex-col justify-between overflow-hidden relative">
              <div className="h-1 bg-[#2563eb] rounded-t-sm w-full"></div>
              <div className="h-2 bg-slate-300 w-6 mx-auto rounded-sm"></div>
              <div className="h-1.5 bg-[#d97706] rounded-b-sm w-full"></div>
            </div>

            {/* Card 2: Visa representation card */}
            <div className="h-8 w-12 rounded-md bg-[#38bdf8] p-1.5 flex flex-col justify-center gap-1 shadow-sm">
              <div className="h-1.5 bg-white rounded-sm w-full"></div>
              <div className="h-1.5 bg-white rounded-sm w-full"></div>
            </div>

            {/* Card 3: Mastercard circles card */}
            <div className="h-8 w-12 rounded-md bg-[#6366f1] p-1 flex items-center justify-center shadow-sm relative overflow-hidden">
              <div className="w-4.5 h-4.5 rounded-full bg-[#ef4444] opacity-90 absolute -translate-x-[4px]"></div>
              <div className="w-4.5 h-4.5 rounded-full bg-[#f59e0b] opacity-90 absolute translate-x-[4px]"></div>
              <div className="w-1.5 h-3.5 bg-gradient-to-r from-[#ef4444] to-[#f59e0b] absolute z-10 opacity-70"></div>
            </div>

            {/* Card 4: Maestro / RuPay representation card */}
            <div className="h-8 w-12 rounded-md bg-[#0070c0] p-1.5 flex items-center justify-center shadow-sm relative">
              <div className="w-5 h-5 rounded-full bg-white/20 absolute -translate-x-1.5"></div>
              <div className="w-5 h-5 rounded-full bg-white/20 absolute translate-x-1.5"></div>
              <div className="w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center text-[7px] font-black text-white z-10 uppercase tracking-widest font-sans">
                i
              </div>
            </div>

            {/* Card 5: Cash on Delivery */}
            <div className="h-8 px-2.5 rounded-md bg-[#f0f9ff]/70 dark:bg-slate-800/60 border border-border/40 flex items-center gap-2 shadow-sm">
              <span className="text-xs font-bold text-foreground">₹</span>
              <div className="flex flex-col text-[7px] leading-tight font-extrabold text-muted-foreground uppercase tracking-wide">
                <span>Cash on</span>
                <span>Delivery</span>
              </div>
            </div>

            {/* Card 6: Net Banking */}
            <div className="h-8 px-2.5 rounded-md bg-[#f0f9ff]/70 dark:bg-slate-800/60 border border-border/40 flex items-center gap-2 shadow-sm">
              <svg className="w-3 h-3.5 text-muted-foreground shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="7" />
                <path d="M12 6v4" />
              </svg>
              <div className="flex flex-col text-[7px] leading-tight font-extrabold text-muted-foreground uppercase tracking-wide">
                <span>Net</span>
                <span>Banking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground gap-4">
          <div>
            © {new Date().getFullYear()} Abuzz Store. All rights reserved. | <strong className="text-foreground">GSTIN: 27ALMPY1073G1ZP</strong>
            <span className="block text-[10px] text-muted-foreground mt-0.5">
              Corporate HQ & Warehouse: S.NO13/1 Walhekarwadi Rd. , Chinchwad, Pune, Maharashtra 411033 | Helpline: +91-8329819618 | Email: support@abuzz.store
            </span>
          </div>
          <div className="flex gap-4 font-sans">
            <span>Made in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
