import Link from 'next/link';
import { Cpu, Target, TrendingUp, Shield, Zap, Globe, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'SMEs Empowered', value: '500+' },
  { label: 'Revenue Generated', value: '$2.3B' },
  { label: 'Client Retention', value: '98.5%' },
  { label: 'Countries Served', value: '45+' }
];

const features = [
  { title: 'AI-Powered Insights', icon: Cpu },
  { title: 'Strategic Planning', icon: Target },
  { title: 'Growth Acceleration', icon: TrendingUp },
  { title: 'Risk Intelligence', icon: Shield },
  { title: 'Real-Time Analytics', icon: Zap },
  { title: 'Global Market View', icon: Globe }
];

const pricing = [
  { name: 'Starter', price: '$49/mo', features: 6 },
  { name: 'Professional', price: '$149/mo', features: 9, popular: true },
  { name: 'Enterprise', price: '$349/mo', features: 10 }
];

const testimonials = [
  { name: 'Mia Carter', role: 'Founder, Nova Retail', quote: 'Aura gave us the clarity to scale confidently and simplify planning across teams.' },
  { name: 'Leo Grant', role: 'COO, Helix Services', quote: 'The insights are precise, the dashboard feels premium, and our decisions are faster.' },
  { name: 'Aria Chen', role: 'CFO, Solace Ventures', quote: 'Revenue signals and risk alerts keep us ahead of every quarter.' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-12">
      <section className="mx-auto max-w-7xl space-y-12">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-sm text-gold">
              AI-Powered Business Intelligence
            </span>
            <h1 className="max-w-3xl text-5xl font-heading font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Transform Your Business with <span className="gold-text">Intelligent Insights</span>
            </h1>
            <p className="max-w-2xl text-base text-slate-300 leading-8">Aura combines elite analytics, AI mentoring, and operational planning to help SMEs navigate growth with confidence.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="gold-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-glow transition hover:scale-[1.02]">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
                Watch Demo
              </Link>
            </div>
          </div>
          <div className="glass-card rounded-[32px] border border-white/10 p-8 shadow-card backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-200">Live insights</span>
              <span className="text-xs text-slate-400">Updated just now</span>
            </div>
            <div className="space-y-5">
              <div className="rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-300">Revenue</p>
                    <p className="text-3xl font-semibold text-white">$2.4M</p>
                  </div>
                  <div className="rounded-3xl bg-navy-950/70 px-4 py-2 text-sm text-emerald-400">+12.5%</div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.label} className="glass rounded-3xl p-5">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {pricing.slice(0, 3).map((plan) => (
                  <div key={plan.name} className="glass rounded-3xl p-4 text-center">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{plan.name}</p>
                    <p className="mt-4 text-2xl font-semibold text-white">{plan.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="glass rounded-3xl p-6">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="glass rounded-[28px] p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                <feature.icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">Designed to surface the most relevant metrics and growth signals for your business.</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="glass-card rounded-[28px] p-7">
              <p className="text-sm leading-7 text-slate-300">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.role}</p>
              </div>
            </div>
          ))}
        </section>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-slate-500">
        <div className="mx-auto max-w-7xl text-center">
          <p>© 2026 Aura Business Intelligence. Built for premium growth teams.</p>
        </div>
      </footer>
    </main>
  );
}
