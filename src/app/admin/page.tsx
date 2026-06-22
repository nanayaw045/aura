"use client";

import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/admin/toggle');
        const json = await res.json();
        if (res.ok && json.ok) {
          setLoggedIn(true);
          setMaintenance(!!json.maintenance);
        }
      } catch (err) {
        // ignore
      }
    }
    fetchStatus();
  }, []);

  async function login(e?: React.FormEvent) {
    e?.preventDefault();
    setMsg('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      if (json.ok) {
        setLoggedIn(true);
        setMsg('Logged in');
        const status = await fetch('/api/admin/toggle');
        const statusJson = await status.json();
        if (status.ok && statusJson.ok) {
          setMaintenance(!!statusJson.maintenance);
        }
      } else {
        setMsg('Unauthorized');
      }
    } catch (err) {
      setMsg('Error');
    }
  }

  async function toggle() {
    setMsg('');
    try {
      const res = await fetch('/api/admin/toggle', {
        method: 'POST',
        body: JSON.stringify({ action: 'toggle' }),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      if (json.ok) {
        setMaintenance(!!json.maintenance);
        setMsg('Updated');
      } else setMsg(json.message || 'Failed');
    } catch (err) {
      setMsg('Error');
    }
  }

  async function logout() {
    setMsg('');
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        setLoggedIn(false);
        setMaintenance(false);
        setPassword('');
        setMsg('Logged out');
      }
    } catch (err) {
      setMsg('Error');
    }
  }

  return (
    <div className="min-h-screen bg-[#071726] text-slate-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-[#081a2b]/80 p-8 border border-white/6">
        <h2 className="text-2xl font-semibold">Admin — AUIRA</h2>
        {!loggedIn ? (
          <form onSubmit={login} className="mt-4 flex gap-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="admin password" className="flex-1 rounded-md bg-[#0b1d3a] border border-white/6 px-3 py-2 text-white" />
            <button className="rounded-md bg-[#C7A461] px-4 py-2 text-[#061427]">Login</button>
          </form>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-slate-400">Maintenance mode</p>
                <p className="text-lg font-medium">{maintenance ? 'ON' : 'OFF'}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={toggle} className="rounded-md bg-[#C7A461] px-4 py-2 text-[#061427]">Toggle</button>
                <button onClick={logout} className="rounded-md border border-white/10 bg-transparent px-4 py-2 text-white">Logout</button>
              </div>
            </div>
          </div>
        )}
        <p className="mt-4 text-sm text-slate-300">{msg}</p>
      </div>
    </div>
  );
}
