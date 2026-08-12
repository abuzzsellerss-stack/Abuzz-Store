'use client';

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CartDrawer } from '../../components/CartDrawer';

export default function BlogPage() {
  const [cartOpen, setCartOpen] = useState(false);

  const posts = [
    {
      title: "Understanding Wire Thickness Guidelines: A Guide to Safe Cabling",
      date: "July 12, 2026",
      author: "Rajesh Sharma (Logistics QA)",
      summary: "Choosing between 1.5 sq mm and 2.5 sq mm copper wire can impact load safety. Read how standard electrical codes govern wire installation parameters.",
      link: "/blog/wire-thickness"
    },
    {
      title: "How to Extend the Lifespan of Cordless Power Tools",
      date: "June 28, 2026",
      author: "Amit Patel (Technician Hub)",
      summary: "Extreme jobsite temperatures can wear out lithium-ion batteries. These battery storage and heat protection practices will prolong drill lifespan.",
      link: "/blog/cordless-tools"
    },
    {
      title: "Cement Setting Strength: PPC vs. OPC Grade 53 explained",
      date: "May 15, 2026",
      author: "Dr. Fixit Audit Team",
      summary: "Understand differences in curing times, concrete moisture resist capabilities, and structural binder selection standards.",
      link: "/blog/cement-setting"
    }
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-background text-foreground transition-colors duration-300">
      <Header onCartToggle={() => setCartOpen(true)} />
      
      <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary mb-6 min-h-[44px]">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-md glass space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border pb-6">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
                Industrial Blog
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Professional tips, safety standards, and project guides.</p>
            </div>
          </div>

          {/* Posts list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <div 
                key={idx}
                className="flex flex-col bg-slate-500/5 border border-border/40 rounded-2xl p-5 hover:border-primary/20 transition-all duration-200"
              >
                {/* Meta details */}
                <div className="flex flex-col gap-1 text-[10px] text-muted-foreground mb-3 font-sans border-b border-border/20 pb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                </div>

                <h3 className="text-xs font-black uppercase text-foreground leading-snug tracking-wide mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-[11px] text-muted-foreground leading-normal font-sans line-clamp-4 mb-4">
                  {post.summary}
                </p>

                <span className="text-[10px] font-bold text-primary hover:underline mt-auto cursor-pointer">
                  Read Article →
                </span>
              </div>
            ))}
          </div>

        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
