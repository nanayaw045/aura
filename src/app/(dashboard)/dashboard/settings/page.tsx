'use client';

import { useState } from 'react';

const tabs = ['Profile', 'Business', 'Notifications', 'Security'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="space-y-8">
      <section className="glass-card rounded-[32px] border border-white/10 p-8 shadow-card">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Settings</p>
            <h1 className="mt-3 text-3xl font-heading font-semibold">Manage your account</h1>
          </div>
          <div className="flex flex-wrap gap-3 rounded-full bg-navy-950/80 p-2 text-sm text-slate-300">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 transition ${activeTab === tab ? 'bg-gold/20 text-white' : 'hover:bg-white/5'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="glass rounded-[28px] p-8">
          {activeTab === 'Profile' && (
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Name
                <input className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="block text-sm text-slate-300">
                Email
                <input className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="block text-sm text-slate-300">
                Role
                <input className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
            </div>
          )}
          {activeTab === 'Business' && (
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Company
                <input className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="block text-sm text-slate-300">
                Industry
                <input className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="block text-sm text-slate-300">
                Location
                <input className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="block text-sm text-slate-300">
                Website
                <input className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
            </div>
          )}
          {activeTab === 'Notifications' && (
            <div className="space-y-5">
              {['Email', 'Weekly Report', 'AI Insights', 'Risk Alerts', 'Marketing'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-3xl border border-white/10 bg-navy-950/70 p-4">
                  <div>
                    <p className="font-semibold text-white">{item}</p>
                    <p className="text-sm text-slate-400">Enable alerts for {item.toLowerCase()}</p>
                  </div>
                  <button className="rounded-full border border-white/10 bg-gold/10 px-4 py-2 text-sm text-white">On</button>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <label className="block text-sm text-slate-300">
                Change Password
                <input type="password" className="mt-3 w-full rounded-3xl border border-white/10 bg-navy-950/70 px-4 py-3 text-white outline-none focus:border-gold" />
              </label>
              <label className="block text-sm text-slate-300">
                Enable 2FA
                <input type="checkbox" className="mt-3 h-5 w-5 accent-gold" />
              </label>
              <div className="rounded-3xl border border-red-400/20 bg-red-500/5 p-5">
                <p className="font-semibold text-white">Danger zone</p>
                <p className="mt-2 text-sm text-slate-400">Delete your account and all associated data.</p>
                <button className="mt-4 rounded-full border border-red-400/40 px-5 py-3 text-sm text-red-200 hover:bg-red-500/10">Delete account</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
