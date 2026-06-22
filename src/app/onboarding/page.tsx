'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  { label: 'Business Name', field: 'businessName' },
  { label: 'Industry', field: 'industry' },
  { label: 'Location', field: 'location' },
  { label: 'Revenue Range', field: 'revenueRange' },
  { label: 'Goals', field: 'goals' }
];

const industries = ['Retail', 'Services', 'Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Hospitality', 'Education', 'Energy'];
const revenueRanges = ['<$250k', '$250k-$1M', '$1M-$5M', '$5M+'];
const goals = ['Grow revenue', 'Increase efficiency', 'Expand globally', 'Reduce risk'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: industries[0],
    country: '',
    city: '',
    revenueRange: revenueRanges[0],
    goals: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    setStep((value) => Math.min(value + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStep((value) => Math.max(value - 1, 0));
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((item) => item !== goal) : [...prev.goals, goal]
    }));
  };

  const completeSetup = async () => {
    setError('');
    setLoading(true);

    const response = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Unable to complete onboarding.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-navy-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="glass-card rounded-[32px] border border-white/10 p-10 shadow-card">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Onboarding</p>
              <h1 className="mt-4 text-4xl font-heading font-semibold">Set up your business profile</h1>
            </div>
            <p className="text-sm text-slate-400">Step {step + 1} of {steps.length}</p>
          </div>
          <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-gold via-gold to-amber-400" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>

          <div className="glass rounded-[28px] p-8">
            <h2 className="text-2xl font-semibold">{steps[step].label}</h2>
            <div className="mt-6 space-y-6">
              {step === 0 && (
                <label className="block text-sm text-slate-300">
                  Business Name
                  <input type="text" value={formData.businessName} onChange={(event) => setFormData((prev) => ({ ...prev, businessName: event.target.value }))} className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" placeholder="Aura Ventures" required />
                </label>
              )}
              {step === 1 && (
                <label className="block text-sm text-slate-300">
                  Industry
                  <select value={formData.industry} onChange={(event) => setFormData((prev) => ({ ...prev, industry: event.target.value }))} className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold">
                    {industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}
                  </select>
                </label>
              )}
              {step === 2 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    Country
                    <input type="text" value={formData.country} onChange={(event) => setFormData((prev) => ({ ...prev, country: event.target.value }))} className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" placeholder="United States" required />
                  </label>
                  <label className="block text-sm text-slate-300">
                    City
                    <input type="text" value={formData.city} onChange={(event) => setFormData((prev) => ({ ...prev, city: event.target.value }))} className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" placeholder="New York" required />
                  </label>
                </div>
              )}
              {step === 3 && (
                <label className="block text-sm text-slate-300">
                  Revenue Range
                  <select value={formData.revenueRange} onChange={(event) => setFormData((prev) => ({ ...prev, revenueRange: event.target.value }))} className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold">
                    {revenueRanges.map((range) => (<option key={range} value={range}>{range}</option>))}
                  </select>
                </label>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">Choose your top goals</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {goals.map((goal) => (
                      <button key={goal} type="button" onClick={() => toggleGoal(goal)} className={`rounded-3xl border px-4 py-3 text-left transition ${formData.goals.includes(goal) ? 'border-gold bg-gold/10 text-white' : 'border-white/10 bg-navy-950/70 text-slate-300'}`}>
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={handleBack} className="rounded-full border border-white/10 px-6 py-3 text-sm text-slate-300 transition hover:border-gold">Back</button>
            <button type="button" onClick={step === steps.length - 1 ? completeSetup : handleNext} disabled={loading} className="gold-button rounded-full px-6 py-3 text-sm font-semibold text-navy-950">{loading ? 'Saving...' : step === steps.length - 1 ? 'Complete Setup' : 'Continue'}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
