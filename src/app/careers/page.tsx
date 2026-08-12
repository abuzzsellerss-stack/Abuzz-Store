'use client';

import React, { useState } from 'react';
import { ArrowLeft, Briefcase, Mail } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CartDrawer } from '../../components/CartDrawer';

export default function CareersPage() {
  const [cartOpen, setCartOpen] = useState(false);

  const jobs = [
    {
      title: "Warehouse & Logistics Manager",
      dept: "Operations",
      loc: "Mumbai Hub",
      desc: "Supervise regional fulfillment centers, heavy freight carriers routing, and concrete materials inventory distribution."
    },
    {
      title: "Quality Control Auditor (BIS Specialist)",
      dept: "Compliance",
      loc: "Bengaluru Hub",
      desc: "Audit incoming brand merchandise and verify compliance certification records for ISI standards."
    },
    {
      title: "Lead Frontend Developer (PWA Specialist)",
      dept: "Technology",
      loc: "Remote (India)",
      desc: "Optimize offline capabilities, database sync, and mobile-first touch target layout rendering for our Next.js PWA."
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
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
                Work With Us
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Shape the future of industrial logistics and digital commerce in India.</p>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs text-muted-foreground leading-relaxed font-sans max-w-2xl">
            At Abuzz Store, we solve high-impact structural procurement problems for infrastructure builders. We are expanding rapidly and seek motivated engineers, logistics operations veterans, and compliance specialists.
          </div>

          {/* Job listings */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Open Opportunities</h3>
            {jobs.map((job, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-500/5 border border-border/40 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/30 pb-2 mb-3">
                  <h4 className="text-sm font-bold text-foreground">{job.title}</h4>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">{job.dept}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-500/10 text-muted-foreground px-2.5 py-0.5 rounded-full">{job.loc}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>

          {/* Application CTA */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-primary/5 border border-primary/20 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-foreground">Interested in joining our team?</span>
                <span className="text-[10px] text-muted-foreground font-sans mt-0.5">Submit your resume and department preference.</span>
              </div>
            </div>
            
            <a 
              href="mailto:careers@abuzz-store.com"
              className="rounded-xl bg-primary text-white text-xs font-bold px-5 py-3 shadow-md hover:bg-primary/95 transition-all text-center shrink-0 min-h-[44px]"
            >
              Apply via Email
            </a>
          </div>

        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
