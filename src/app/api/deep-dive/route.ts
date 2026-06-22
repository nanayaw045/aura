import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { deep_dives } from '@/types/database';
import { getUserFromRequest } from '@/lib/session';

export async function POST(request: Request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { query } = await request.json();
  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  const lowerQuery = query.toLowerCase();
  const analysis = {
    scores: [
      {
        label: 'Market Position',
        value: lowerQuery.includes('market') ? '88%' : '74%',
        description: lowerQuery.includes('market') ? 'Strong market differentiation and premium segment alignment.' : 'A sound place to grow with strategic product positioning.'
      },
      {
        label: 'Financial Health',
        value: lowerQuery.includes('margin') ? '79%' : '72%',
        description: lowerQuery.includes('margin') ? 'Margins are healthy but can improve with premium pricing and cost control.' : 'Financial stability is solid while revenue sources diversify.'
      },
      {
        label: 'Operational Efficiency',
        value: lowerQuery.includes('operations') ? '85%' : '81%',
        description: 'Processes are streamlined, with room for automation in recurring workflows.'
      },
      {
        label: 'Risk Assessment',
        value: lowerQuery.includes('risk') ? '62%' : '68%',
        description: lowerQuery.includes('risk') ? 'Concentration and execution risk should be monitored closely.' : 'Operational and market risks are manageable with right safeguards.'
      }
    ],
    swot: [
      {
        title: 'Strengths',
        items: ['Premium product positioning', 'High customer retention', 'Strong leadership focus on growth']
      },
      {
        title: 'Weaknesses',
        items: ['Customer concentration in key accounts', 'Manual reporting overhead', 'Limited automation across workflows']
      },
      {
        title: 'Opportunities',
        items: ['Upsell premium services', 'Target geographic expansion', 'Improve cross-sell revenue']
      },
      {
        title: 'Threats',
        items: ['Macroeconomic pressure', 'emerging competitive offerings', 'resource capacity constraints']
      }
    ],
    recommendations: [
      {
        title: 'Align pricing with premium bundles',
        detail: 'Introduce tiered packages that reflect value and increase average contract value without compromising retention.'
      },
      {
        title: 'Optimize spend on high ROI channels',
        detail: 'Reallocate marketing and sales resources toward segments that deliver faster close rates and higher margin deals.'
      },
      {
        title: 'Automate repetitive finance workflows',
        detail: 'Implement automated reporting to reduce manual review time and surface decision-grade metrics faster.'
      }
    ]
  };

  await db.insert(deep_dives).values({
    user_id: user.userId,
    query,
    analysis
  });

  return NextResponse.json({ analysis });
}
