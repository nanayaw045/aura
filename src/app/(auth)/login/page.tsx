'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Login failed.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-navy-950 px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card rounded-[32px] border border-white/10 p-10 text-white shadow-card">
          <div className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-gold">Welcome back</p>
            <h1 className="text-4xl font-heading font-semibold">Login to Aura</h1>
            <p className="max-w-xl text-slate-400">Access intelligent insights, automated action plans, and your company analytics in one premium workspace.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-sm text-slate-300">
              Email
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold" placeholder="you@example.com" required />
            </label>
            <label className="block text-sm text-slate-300">
              Password
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="mt-2 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none transition focus:border-gold" placeholder="••••••••" required />
            </label>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <button type="button" className="text-gold transition hover:text-white">Forgot password?</button>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="gold-button w-full rounded-full px-5 py-3 text-sm font-semibold text-navy-950">{loading ? 'Signing in...' : 'Sign in'}</button>
          </form>
        </div>
        <div className="glass rounded-[32px] border border-white/10 p-10 text-white shadow-card">
          <h2 className="text-3xl font-semibold">New to Aura?</h2>
          <p className="mt-4 text-slate-400">Create your account and start a guided onboarding experience designed for growing businesses.</p>
          <div className="mt-10 space-y-4 rounded-[28px] bg-navy-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Benefits</p>
            <ul className="space-y-3 text-slate-300">
              <li>• Personalized business insights</li>
              <li>• Live metrics and health score</li>
              <li>• AI mentor chat support</li>
            </ul>
          </div>
          <div className="mt-8">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm font-semibold text-gold transition hover:bg-white/5">Create account</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
