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
    <main className="min-h-screen bg-white px-6 py-10 text-[#0A1F44] lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-10">
          <div className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-[#C9A961]">Welcome back</p>
            <h1 className="text-4xl font-semibold">Login to AURA BUSINESS INTELLIGENCE</h1>
            <p className="max-w-xl text-base text-[#475569]">Access your secured business intelligence workspace with real-time enterprise data and governance controls.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-sm text-[#0A1F44]">
              Email
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="mt-2 w-full rounded-[20px] border border-[#E5E7EB] px-4 py-3 text-[#0A1F44] outline-none" placeholder="you@example.com" required />
            </label>
            <label className="block text-sm text-[#0A1F44]">
              Password
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="mt-2 w-full rounded-[20px] border border-[#E5E7EB] px-4 py-3 text-[#0A1F44] outline-none" placeholder="Enter your password" required />
            </label>
            <div className="flex items-center justify-between text-sm text-[#475569]">
              <button type="button" className="text-[#C9A961]">Forgot password?</button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-[#C9A961] px-5 py-3 text-sm font-semibold text-[#0A1F44]">{loading ? 'Signing in...' : 'Sign in'}</button>
          </form>
        </div>
        <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-10">
          <h2 className="text-3xl font-semibold">New to AURA BUSINESS INTELLIGENCE?</h2>
          <p className="mt-4 text-base text-[#475569]">Create your account and begin onboarding live analytics, secure workflows, and trusted executive reporting.</p>
          <div className="mt-10 rounded-[28px] border border-[#E5E7EB] bg-[#F8FAFC] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#C9A961]">Benefits</p>
            <ul className="mt-6 space-y-3 text-base text-[#475569]">
              <li>• Secure account creation with bcrypt password hashing</li>
              <li>• Live dashboards connected to real data</li>
              <li>• Audit logging and institutional controls</li>
            </ul>
          </div>
          <div className="mt-8">
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[#C9A961] px-5 py-3 text-sm font-semibold text-[#0A1F44] transition hover:bg-[#C9A961]/10">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
