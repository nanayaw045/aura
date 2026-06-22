'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const industries = ['Retail', 'Services', 'Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Hospitality', 'Education', 'Energy'];
const revenueRanges = ['<$250k', '$250k-$1M', '$1M-$5M', '$5M+'];
const goals = ['Grow revenue', 'Increase efficiency', 'Expand globally', 'Reduce risk'];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    companyName: '',
    industry: industries[0],
    password: '',
    country: '',
    city: '',
    revenueRange: revenueRanges[0],
    goals: [] as string[]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleGoal = (goal: string) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((item) => item !== goal) : [...prev.goals, goal]
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Signup failed.');
      return;
    }

    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen bg-navy-950 px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass rounded-[32px] border border-white/10 p-10 shadow-card">
          <h1 className="text-4xl font-heading font-semibold text-white">Create your account</h1>
          <p className="mt-4 max-w-xl text-slate-400">Start your free trial and unlock AI-powered business intelligence for your team.</p>
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <label className="block text-sm text-slate-300">
              Full Name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} type="text" className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold" placeholder="Jane Doe" required />
            </label>
            <label className="block text-sm text-slate-300">
              Email
              <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold" placeholder="you@example.com" required />
            </label>
            <label className="block text-sm text-slate-300">
              Company
              <input value={form.companyName} onChange={(event) => setForm({ ...form, companyName: event.target.value })} type="text" className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold" placeholder="Aura Ventures" required />
            </label>
            <label className="block text-sm text-slate-300">
              Password
              <input value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} type="password" className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold" placeholder="••••••••" required />
            </label>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Industry
                <select value={form.industry} onChange={(event) => setForm({ ...form, industry: event.target.value })} className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold">
                  {industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}
                </select>
              </label>
              <label className="block text-sm text-slate-300">
                Revenue Range
                <select value={form.revenueRange} onChange={(event) => setForm({ ...form, revenueRange: event.target.value })} className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold">
                  {revenueRanges.map((range) => (<option key={range} value={range}>{range}</option>))}
                </select>
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {goals.map((goal) => (
                <button key={goal} type="button" onClick={() => toggleGoal(goal)} className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${form.goals.includes(goal) ? 'border-gold bg-gold/10 text-white' : 'border-white/10 bg-navy-950/70 text-slate-300'}`}>
                  {goal}
                </button>
              ))}
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="gold-button w-full rounded-full px-5 py-3 text-sm font-semibold text-navy-950">{loading ? 'Creating account...' : 'Create account'}</button>
          </form>
        </div>
        <div className="glass-card rounded-[32px] border border-white/10 p-10 text-white shadow-card">
          <h2 className="text-3xl font-semibold">Why Aura?</h2>
          <p className="mt-4 text-slate-400">Get tailored business intelligence, fast planning, and AI guidance built for SMEs.</p>
          <ul className="mt-8 space-y-4 text-slate-300">
            <li>• Personalized business insights</li>
            <li>• Secure data foundation with Neon Postgres</li>
            <li>• Elegant UI for executive decisions</li>
          </ul>
          <div className="mt-10">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm font-semibold text-gold transition hover:bg-white/5">Already have an account</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
