"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const platformFeatures = [
  {
    title: 'Strategic Market Intelligence',
    description:
      'AUIRA translates global risk, liquidity, and macro data into a refined executive narrative for capital allocators.',
  },
  {
    title: 'Asset-Forward Architecture',
    description:
      'Secure infrastructure, encrypted workflows, and institutional-grade governance designed for premier financial teams.',
  },
  {
    title: 'Decision-Ready Insights',
    description:
      'High-fidelity dashboards, real-time signal layers, and proprietary scenario analytics that power confident action.',
  },
];

const editorialHighlights = [
  { label: 'Advisory assets', value: '$412B' },
  { label: 'Markets covered', value: '24 global hubs' },
  { label: 'Institutional clients', value: '72 partners' },
];

const partnerLogos = [
  { src: '/images/partner-1.svg', alt: 'Aurora Capital' },
  { src: '/images/partner-2.svg', alt: 'Sable Partners' },
  { src: '/images/partner-3.svg', alt: 'Crescent Advisory' },
  { src: '/images/partner-1.svg', alt: 'Aurora Capital' },
  { src: '/images/partner-2.svg', alt: 'Sable Partners' }
];

const competitorComparison = [
  {
    feature: 'Insight velocity',
    aura: 'Instant, AI-curated executive insights',
    competitor: 'Delayed manual reporting',
    legacy: 'Spreadsheet-based summaries'
  },
  {
    feature: 'Scenario modeling',
    aura: 'Dynamic risk and revenue simulations',
    competitor: 'Static forecasts',
    legacy: 'Manual spreadsheets with limited visibility'
  },
  {
    feature: 'Team onboarding',
    aura: 'One-click resend invites and guided setup',
    competitor: 'Email support and ticketing',
    legacy: 'Fragmented onboarding and spreadsheets'
  }
];

const dashboardPreview = [
  { label: 'KPI pulse', value: '94', note: 'Overall health score updated in real time' },
  { label: 'Revenue signal', value: '+12.5%', note: 'Trending higher month over month' },
  { label: 'Risk alert', value: 'Low', note: 'Balanced exposure across portfolios' }
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // focus email input when modal opens
    if (modalOpen) {
      const el = document.getElementById('trial-email') as HTMLInputElement | null;
      setTimeout(() => el?.focus(), 120);
    }
  }, [modalOpen]);

  const daysSince = (timestamp: number) => (Date.now() - timestamp) / (1000 * 60 * 60 * 24);

  async function handleStartTrial(e?: React.FormEvent) {
    e?.preventDefault();
    setMsg('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMsg('Please enter a valid institutional email.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) {
        setMsg(data.error || 'Unable to start trial.');
        setSubmitting(false);
        return;
      }
      setMsg('Trial started — check your inbox for onboarding.');
      try {
        localStorage.setItem('auira_trial', JSON.stringify({ email, startedAt: Date.now() }));
      } catch {}
      setSubmitting(false);
      setTimeout(() => setModalOpen(false), 900);
    } catch (err) {
      setSubmitting(false);
      setMsg('Unable to start trial. Please try again.');
    }
  }

  return (
    <main className="relative overflow-hidden bg-[#0B1D3A] text-slate-100">
      <div className="absolute -right-0 top-12 hidden h-[520px] w-[700px] lg:block">
        <Image src="/images/hero-spotlight.svg" alt="AURA spotlight" width={700} height={520} className="w-full h-full object-cover" priority />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-8 lg:px-12">
        <nav className="flex items-center justify-between py-6">
          <div>
            <Image src="/images/logo.png" alt="AURA BUSINESS INTELLIGENCE" width={180} height={40} priority />
          </div>
          <div className="flex items-center gap-6">
            <a href="#overview" className="text-sm text-slate-200 hover:text-white">Platform</a>
            <a href="#features" className="text-sm text-slate-200 hover:text-white">Features</a>
            <a href="#pricing" className="text-sm text-slate-200 hover:text-white">Pricing</a>
            <a href="#contact" className="rounded-full border border-[#C7A461] bg-[#C7A461]/10 px-4 py-2 text-sm font-semibold text-[#C7A461]">Contact</a>
          </div>
        </nav>

        <header className="flex flex-col gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#C7A461]">AUIRA</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold uppercase tracking-[0.12em] text-white sm:text-6xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              The premium financial platform for global capital stewardship.
            </h1>
          </div>
          <div className="space-y-3 text-right">
            <p className="text-sm text-slate-300">
              Engineered for sovereign funds, family offices, and institutional investors.
            </p>
            <div className="flex gap-3 justify-end">
              <a href="#overview" className="inline-flex rounded-full border border-[#C7A461] bg-[#C7A461]/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#C7A461] transition hover:bg-[#C7A461]/20">Explore AUIRA</a>
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#C7A461] hover:text-[#C7A461]">Start 7‑Day Trial</button>
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#C7A461]/20 bg-[#C7A461]/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-[#C7A461]">
              World-class capital intelligence
            </div>
            <h2 className="text-5xl font-semibold leading-tight text-white sm:text-6xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              AUIRA unifies insight, execution, and governance into a single distinguished platform.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Delivering a $10 billion-grade experience with premium design, elite analytics, and secure workflows tailored for the most selective financial institutions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#features" className="inline-flex items-center justify-center rounded-full bg-[#C7A461] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1D3A] transition hover:bg-[#d3b979]">Request a demo</a>
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#C7A461] hover:text-[#C7A461]">Start 7‑Day Trial</button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-8 rounded-3xl bg-[#0B1D3A]/80 p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-[#C7A461]">Market intelligence</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">Executive insights, risk pulse, and portfolio clarity in one premium view.</h3>
            </div>
            <div className="grid gap-5">
              {editorialHighlights.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-[#09172f]/90 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="rounded-[24px] border border-white/6 bg-[#061427]/60 px-6 py-6">
            <p className="text-sm uppercase tracking-[0.22em] text-[#C7A461]">Trusted by</p>
            <div className="mt-6 flex items-center gap-8">
              <img src="/images/partner-1.svg" alt="Aurora Capital" className="h-8" />
              <img src="/images/partner-2.svg" alt="Sable Partners" className="h-8" />
              <img src="/images/partner-3.svg" alt="Crescent Advisory" className="h-8" />
            </div>
          </div>
        </section>

        <section className="mt-12">
            <div className="rounded-[32px] border border-white/10 bg-[#061427]/60 p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#C7A461]">Partner carousel</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">Neon-backed partners, premium delivery</h3>
                <p className="mt-3 max-w-2xl text-slate-300">AUIRA connects enterprise teams, trusted advisors, and modern data workflows with zero friction.</p>
              </div>
              <span className="rounded-full bg-[#C7A461]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#C7A461]">Neon Postgres powered</span>
            </div>
            <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#08172f]/80">
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-6">
                {partnerLogos.map((partner, index) => (
                  <div key={`${partner.alt}-${index}`} className="snap-start flex h-20 min-w-[180px] items-center justify-center rounded-[24px] border border-white/10 bg-white/5 px-6">
                      <Image src={partner.src} alt={partner.alt} width={160} height={40} />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[40px] border border-white/10 bg-[#071426]/80 px-8 py-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#C7A461]">Competitor comparison</p>
              <h3 className="mt-4 text-4xl font-semibold text-white">Designed to outpace traditional BI and legacy systems</h3>
              <p className="mt-4 text-lg leading-8 text-slate-300">AUIRA delivers elite premium intelligence with Gemini-ready AI workflow support and GROQ-inspired query patterns.</p>
            </div>
            <div className="grid gap-4">
              {competitorComparison.map((item) => (
                <div key={item.feature} className="rounded-[28px] border border-white/10 bg-[#0B1D3A]/90 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#C7A461]">{item.feature}</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <p><span className="font-semibold text-white">AUIRA</span>: {item.aura}</p>
                    <p><span className="font-semibold text-white">Competitors</span>: {item.competitor}</p>
                    <p><span className="font-semibold text-white">Legacy tools</span>: {item.legacy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[40px] border border-white/10 bg-[#08172f]/80 p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-[#C7A461]">Dashboard preview</p>
            <h3 className="mt-4 text-4xl font-semibold text-white">A preview of the elite executive workspace</h3>
            <p className="mt-4 max-w-2xl text-slate-300">Live metrics, AI alerts, and next-step recommendations stitched into one premium command center.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {dashboardPreview.map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-[#0B1D3A]/80 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-3 text-sm text-slate-300">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0B1D3A]/80 p-8">
            <div className="absolute inset-y-0 right-6 top-12 h-24 w-24 rounded-full bg-[#C7A461]/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-[#071426]/90 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#C7A461]">Workspace</p>
                  <h4 className="mt-3 text-2xl font-semibold text-white">Executive pulse</h4>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">Live</span>
              </div>
              <div className="mt-8 space-y-5">
                <div className="rounded-[24px] bg-[#0B1D3A]/90 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Portfolio value</p>
                  <p className="mt-3 text-3xl font-semibold text-white">$412B</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-[#0B1D3A]/90 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Risk exposure</p>
                    <p className="mt-3 text-xl font-semibold text-white">Low</p>
                  </div>
                  <div className="rounded-[24px] bg-[#0B1D3A]/90 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Opportunity score</p>
                    <p className="mt-3 text-xl font-semibold text-white">94</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="mt-24 grid gap-8 rounded-[40px] border border-white/10 bg-[#071426]/80 px-8 py-12 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#C7A461]">Elevated platform experience</p>
              <h3 className="mt-4 text-4xl font-semibold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>Designed for global capital managers who demand strategic clarity.</h3>
            </div>
            <p className="text-lg leading-8 text-slate-300">AUIRA blends curated product design with institutional-grade data orchestration to empower treasury, advisory, and investment teams.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {platformFeatures.map((feature) => (
              <div key={feature.title} className="rounded-[32px] border border-white/10 bg-[#0B1D3A]/80 p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[#C7A461]">{feature.title}</p>
                <p className="mt-4 text-base leading-7 text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[20px] border border-white/8 bg-[#08172f]/80 p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[#C7A461]">Starter</p>
              <p className="mt-3 text-3xl font-semibold text-white">$49<span className="text-sm">/mo</span></p>
              <p className="mt-4 text-sm text-slate-300">7‑day free trial, then monthly billing. Ideal for small advisory teams.</p>
              <button onClick={() => setModalOpen(true)} className="mt-6 w-full rounded-full bg-[#C7A461] px-4 py-3 text-sm font-semibold text-[#0B1D3A]">Start 7‑Day Free Trial</button>
            </div>

            <div className="rounded-[20px] border border-white/8 bg-[#08172f]/80 p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[#C7A461]">Professional</p>
              <p className="mt-3 text-3xl font-semibold text-white">$149<span className="text-sm">/mo</span></p>
              <p className="mt-4 text-sm text-slate-300">Full platform access, dedicated support, and advanced analytics.</p>
              <button className="mt-6 w-full rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white">Contact Sales</button>
            </div>

            <div className="rounded-[20px] border border-white/8 bg-[#08172f]/80 p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[#C7A461]">Enterprise</p>
              <p className="mt-3 text-3xl font-semibold text-white">Custom</p>
              <p className="mt-4 text-sm text-slate-300">Tailored SLAs, integrations, and onboarding for global institutions.</p>
              <button className="mt-6 w-full rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white">Request Quote</button>
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Image src="/images/logo.png" alt="AURA BUSINESS INTELLIGENCE" width={140} height={32} />
              <p className="mt-3 max-w-xl text-sm leading-7">AURA BUSINESS INTELLIGENCE is the premium financial platform built for the world’s most discerning capital stewards.</p>
            </div>
            <div className="flex flex-wrap gap-5 text-sm">
              <a href="#" className="transition hover:text-white">Privacy</a>
              <a href="#" className="transition hover:text-white">Security</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
            </div>
          </div>
        </footer>

        {/* Trial modal */}
          <div id="trial-modal" className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 ${modalOpen ? '' : 'hidden'}`}>
          <div className="w-full max-w-md rounded-xl bg-[#071726] p-6">
            <h4 className="text-lg font-semibold text-white">Start your 7‑Day Free Trial</h4>
            <p className="mt-2 text-sm text-slate-300">Enter your email to begin. Trial enrollment is now persisted on the backend and limited to one email for 7 days.</p>
            <form onSubmit={handleStartTrial} className="mt-4 flex flex-col gap-3">
              <input id="trial-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@institution.com" className="w-full rounded-md bg-[#0b1d3a] border border-white/8 px-3 py-2 text-white" required />
              <div className="flex items-center justify-between gap-3">
                <button type="submit" disabled={submitting} className="rounded-full bg-[#C7A461] px-4 py-2 text-sm font-semibold text-[#061427]">{submitting ? 'Starting…' : 'Start Trial'}</button>
                <button type="button" onClick={() => { setModalOpen(false); setMsg(''); }} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">Cancel</button>
              </div>
              <p className={`mt-2 text-sm ${msg ? 'text-slate-200' : 'text-slate-400'}`}>{msg}</p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
