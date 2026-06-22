import Link from 'next/link';
import { Bell, LayoutDashboard, MessageSquare, Sparkles, Settings } from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/deep-dive', label: 'Deep Dive', icon: Sparkles },
  { href: '/dashboard/chat', label: 'AI Mentor', icon: MessageSquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[256px_1fr]">
        <aside className="glass-card border-r border-white/10 bg-navy-950/70 p-8 shadow-card">
          <div className="mb-10 space-y-4">
            <div className="rounded-3xl bg-navy-900/80 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Aura</p>
              <p className="mt-2 text-2xl font-semibold">BI Workspace</p>
            </div>
          </div>
          <nav className="space-y-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-3xl border border-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-gold/40 hover:bg-white/5">
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-8 p-8 lg:p-10">
          <div className="flex items-center justify-end gap-3">
            <button className="glass rounded-full p-3 text-slate-200 transition hover:bg-white/10">
              <Bell size={18} />
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
