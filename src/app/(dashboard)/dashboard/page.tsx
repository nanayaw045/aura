import Link from 'next/link';
import { CircleDollarSign, CheckCircle2, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$2.4M', change: '+12.5%' },
  { label: 'Active Customers', value: '8,420', change: '+8.2%' },
  { label: 'Growth Score', value: '94/100', change: '+5 pts' },
  { label: 'Risk Score', value: 'Low', change: '-2 pts' }
];

const tasks = [
  { label: 'Review quarterly forecast', priority: 'High', due: 'Today', completed: false },
  { label: 'Approve marketing campaign', priority: 'Medium', due: 'Thu', completed: true },
  { label: 'Refresh cash flow model', priority: 'Low', due: 'Fri', completed: false }
];

const insights = [
  { title: 'Opportunity', description: 'Expand into the APAC market with targeted product bundles.', tone: 'success' },
  { title: 'Warning', description: 'Margins are concentrated in two clients. Diversification is advised.', tone: 'warning' },
  { title: 'Insight', description: 'Subscription upgrades could yield 18% additional revenue this quarter.', tone: 'info' }
];

const toneStyles = {
  success: 'bg-emerald-500/10 border-emerald-500/15 text-emerald-200',
  warning: 'bg-amber-500/10 border-amber-500/15 text-amber-200',
  info: 'bg-slate-200/5 border-slate-200/10 text-slate-100'
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="glass-card rounded-[32px] border border-white/10 p-8 shadow-card">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Health Score</p>
            <h1 className="mt-4 text-4xl font-heading font-semibold">Excellent performance this week</h1>
            <p className="mt-3 max-w-2xl text-slate-300">Your business is on track with strong growth signals and a low risk score. Keep momentum with AI-driven actions.</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/5 px-5 py-3 text-sm text-slate-200">
              <CheckCircle2 size={18} />
              Updated 2 hours ago
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm rounded-[32px] bg-navy-950/70 p-8 text-center shadow-glow">
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-navy-900/80">
              <div>
                <p className="text-5xl font-semibold text-white">94</p>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">Excellent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="glass rounded-[28px] p-6">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-3 text-sm text-slate-300">{item.change}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="glass-card rounded-[32px] border border-white/10 p-8 shadow-card">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gold">Action Plan</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Next priorities</h2>
            </div>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.label} className="flex items-center justify-between rounded-3xl border border-white/10 bg-navy-950/70 p-5">
                <div>
                  <p className={`text-sm font-semibold ${task.completed ? 'text-slate-300 line-through' : 'text-white'}`}>{task.label}</p>
                  <p className="mt-1 text-xs text-slate-400">Due {task.due}</p>
                </div>
                <div className="space-y-2 text-right">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs ${task.priority === 'High' ? 'bg-red-500/10 text-red-200' : task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-200' : 'bg-emerald-500/10 text-emerald-200'}`}>{task.priority}</span>
                  {task.completed ? <span className="text-emerald-300 text-sm">Completed</span> : <span className="text-slate-400 text-sm">Pending</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-[32px] border border-white/10 p-8 shadow-card">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck size={18} className="text-gold" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gold">AI Insights</p>
              <h2 className="text-xl font-semibold text-white">What to act on</h2>
            </div>
          </div>
          <div className="space-y-4">
            {insights.map((item) => (
              <div key={item.title} className={`rounded-3xl border p-5 ${toneStyles[item.tone as keyof typeof toneStyles]}`}>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-white">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/dashboard/chat" className="gold-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-navy-950">Ask AI</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
