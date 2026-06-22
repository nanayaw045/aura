'use client';

import { ReactNode } from 'react';

export function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="glass rounded-[28px] border border-white/10 p-8">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-slate-400">{description}</p>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}
