import Link from 'next/link';

const plans = [
  { name: 'Starter', price: '$49/mo', features: ['Core analytics', '3 dashboards', 'Email support', 'Goal tracking', 'Standard reports', 'AI summaries'] },
  { name: 'Professional', price: '$149/mo', features: ['All Starter features', 'Advanced forecasts', 'AI mentor', 'Custom action plans', 'Growth signals', 'Priority support', 'Risk monitoring', 'Team collaboration', 'Market data'], popular: true },
  { name: 'Enterprise', price: '$349/mo', features: ['All Professional features', 'API access', 'Custom integrations', 'Dedicated success manager', 'Advanced security', 'Compliance reporting', 'Unlimited users', 'Premium analytics', 'White-labeling', 'Enterprise SLA'] }
];

const faqs = [
  { question: 'Can I upgrade later?', answer: 'Yes, plans are flexible so you can scale as your business grows.' },
  { question: 'Is onboarding included?', answer: 'Every new account receives guided setup and tailored industry recommendations.' },
  { question: 'Do you offer custom integrations?', answer: 'Enterprise customers can connect with existing systems via API and data pipelines.' },
  { question: 'What payment methods are supported?', answer: 'We support card payments and invoicing for enterprise plans.' }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Simple, Transparent Pricing</p>
          <h1 className="text-5xl font-heading font-semibold text-white">Choose Your Path to Growth</h1>
          <p className="max-w-3xl text-slate-300">Whether you're launching, scaling, or transforming operations, Aura has a plan for modern SMEs.</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`glass-card rounded-[32px] border border-white/10 p-8 shadow-card ${plan.popular ? 'bg-navy-900/80 border-gold/30' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{plan.name}</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{plan.price}</p>
                </div>
                {plan.popular && <span className="rounded-full bg-gold/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold">Most Popular</span>}
              </div>
              <ul className="mt-8 space-y-3 text-slate-300">
                {plan.features.map((feature) => (<li key={feature}>• {feature}</li>))}
              </ul>
              <button className="gold-button mt-8 w-full rounded-full px-6 py-3 text-sm font-semibold text-navy-950">Select plan</button>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="glass rounded-[28px] p-6">
              <p className="font-semibold text-white">{item.question}</p>
              <p className="mt-3 text-slate-300">{item.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
