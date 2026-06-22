'use client';

import { useEffect, useRef, useState } from 'react';

const prompts = ['What growth levers should I focus on?', 'How can I improve profit margins?', 'What risks are emerging next quarter?', 'Compare our offering to competitors'];
const initialMessages = [
  { role: 'assistant', text: 'How can I help you today? Ask about profit margins, growth, or market strategy.' }
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Based on your profile, the best next step is to focus on revenue expansion with minimal operational risk.' }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="space-y-8">
      <section className="glass-card rounded-[32px] border border-white/10 p-8 shadow-card">
        <h1 className="text-3xl font-heading font-semibold">AI Mentor Chat</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Ask Aura for suggestions on growth, risk, strategy, and financial optimization.</p>
      </section>
      <section className="glass rounded-[32px] border border-white/10 p-8 shadow-card">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] bg-navy-950/70 p-6">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 max-w-[90%] rounded-3xl p-4 ${message.role === 'user' ? 'ml-auto rounded-br-none bg-gold/10 text-white' : 'rounded-bl-none bg-white/5 text-slate-200'}`}>
                  <p className="text-sm leading-7">{message.text}</p>
                </div>
              ))}
              {typing && <p className="text-sm text-slate-400">Aura is typing...</p>}
              <div ref={listRef} />
            </div>
            <div className="space-y-3">
              <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type your question..." className="w-full rounded-[28px] border border-white/10 bg-navy-950/70 p-4 text-white outline-none focus:border-gold" rows={4} />
              <button type="button" onClick={() => sendMessage(input)} className="gold-button rounded-full px-6 py-3 text-sm font-semibold text-navy-950">Send</button>
            </div>
          </div>
          <aside className="rounded-[32px] bg-navy-950/65 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-gold">Suggested prompts</p>
            <div className="mt-5 space-y-3">
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => sendMessage(prompt)} className="w-full rounded-3xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-gold/40 hover:bg-white/5">
                  {prompt}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
