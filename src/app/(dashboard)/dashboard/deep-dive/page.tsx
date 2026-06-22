'use client';

import { useState } from 'react';

type DeepDiveResults = {
  scores: { label: string; value: string; description: string }[];
  swot: { title: string; items: string[] }[];
  recommendations: { title: string; detail: string }[];
};

const presets = ['Market Analysis', 'Competitor Review', 'Financial Deep Dive'];

export default function DeepDivePage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('category');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DeepDiveResults | null>(null);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!query.trim()) {
      setError('Enter a query to analyze.');
      return;
    }

    setError('');
    setLoading(true);
    const response = await fetch('/api/deep-dive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Analysis failed.');
      return;
    }

    const data = await response.json();
    setResults(data.analysis);
    setActiveTab('category');
  };

  return (
    <div className="space-y-8">
      <section className="glass-card rounded-[32px] border border-white/10 p-8 shadow-card">
        <h1 className="text-3xl font-heading font-semibold">Deep Dive Analysis</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Ask Aura for a detailed financial, competitor, or market view with real analytics stored securely in your business workspace.</p>
        <div className="mt-8 space-y-6">
          <textarea value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter an analysis query..." className="min-h-[160px] w-full rounded-[28px] border border-white/10 bg-navy-950/70 p-5 text-white outline-none focus:border-gold" />
          <div className="flex flex-wrap gap-3">
            {presets.map((preset) => (
              <button key={preset} type="button" onClick={() => setQuery(preset)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-gold/40 hover:bg-white/5">
                {preset}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="button" onClick={analyze} disabled={loading} className="gold-button rounded-full px-6 py-3 text-sm font-semibold text-navy-950">
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>
      </section>

      <section className="glass rounded-[32px] border border-white/10 p-8 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3 rounded-full bg-navy-950/80 p-2 text-sm text-slate-300">
            <button className={`rounded-full px-4 py-2 ${activeTab === 'category' ? 'bg-gold/15 text-white' : 'hover:bg-white/5'}`} onClick={() => setActiveTab('category')}>Category Analysis</button>
            <button className={`rounded-full px-4 py-2 ${activeTab === 'swot' ? 'bg-gold/15 text-white' : 'hover:bg-white/5'}`} onClick={() => setActiveTab('swot')}>SWOT Analysis</button>
            <button className={`rounded-full px-4 py-2 ${activeTab === 'recommendations' ? 'bg-gold/15 text-white' : 'hover:bg-white/5'}`} onClick={() => setActiveTab('recommendations')}>Recommendations</button>
          </div>
          <p className="text-sm text-slate-400">Analysis is built from your query and stored for future review.</p>
        </div>

        {results ? (
          <>
            {activeTab === 'category' && (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {results.scores.map((item) => (
                  <div key={item.label} className="glass rounded-3xl p-6">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'swot' && (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {results.swot.map((item) => (
                  <div key={item.title} className="glass rounded-3xl p-6">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
                      {item.items.map((itemText) => (<li key={itemText}>{itemText}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="mt-8 space-y-4">
                {results.recommendations.map((recommendation) => (
                  <div key={recommendation.title} className="glass rounded-3xl border border-white/10 p-6">
                    <p className="font-semibold text-white">{recommendation.title}</p>
                    <p className="mt-2 text-sm text-slate-300">{recommendation.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-3xl bg-navy-950/70 p-6 text-slate-400">Run your first deep dive to see a structured analysis card set, including market, financial and risk insights.</div>
        )}
      </section>
    </div>
  );
}
