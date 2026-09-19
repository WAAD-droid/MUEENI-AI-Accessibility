import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Tag,
  Flame,
  MousePointerClick,
  TrendingUp,
  Calendar,
  Award,
  ArrowUpRight
} from 'lucide-react';

interface ProviderAnalyticsViewEnProps {
  onNavigate?: (tab: string) => void;
}

export const ProviderAnalyticsViewEn: React.FC<ProviderAnalyticsViewEnProps> = ({ onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  // Monthly activity data
  const monthlyData = [
    { month: 'March', reach: 1850, interactions: 4200, percentage: 55 },
    { month: 'April', reach: 2100, interactions: 5100, percentage: 65 },
    { month: 'May', reach: 2400, interactions: 6300, percentage: 72 },
    { month: 'June', reach: 2800, interactions: 7100, percentage: 80 },
    { month: 'July', reach: 3420, interactions: 8950, percentage: 100 },
    { month: 'August', reach: 3150, interactions: 8200, percentage: 92 },
  ];

  const campaignPerformance = [
    {
      name: 'Purple Saturday Initiative 2024',
      status: 'Active',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      reach: '2,140 Cardholders',
      interactions: '5,320 Engagements',
      redemptionRate: '88%',
      satisfaction: '4.9 / 5',
      trend: '+24%'
    },
    {
      name: 'Saudi National Day 94 Initiatives',
      status: 'In Preparation',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      reach: '1,280 Cardholders',
      interactions: '3,630 Engagements',
      redemptionRate: '72%',
      satisfaction: '4.8 / 5',
      trend: '+18%'
    }
  ];

  return (
    <div id="mueeni-provider-analytics-screen-en" className="space-y-6 pb-20 animate-fade-in text-left">
      {/* Header */}
      <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Analytics & Performance Statistics
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive tracking of reach, interactions, and community impact
              </p>
            </div>
          </div>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedPeriod === 'month'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPeriod('quarter')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedPeriod === 'quarter'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setSelectedPeriod('year')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedPeriod === 'year'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Annual
          </button>
        </div>
      </section>

      {/* 5 Key Metric Cards Requested by Prompt */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* 1. Beneficiaries reached */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Beneficiaries Reached</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono">3,420</div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+14% this month</span>
            </div>
          </div>
        </div>

        {/* 2. Services provided */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Services Provided</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono">8 Offers</div>
            <span className="text-[10px] font-bold text-indigo-700 mt-0.5 block">
              Active & verified
            </span>
          </div>
        </div>

        {/* 3. Active campaigns */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active Campaigns</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono">2 Campaigns</div>
            <span className="text-[10px] font-bold text-purple-700 mt-0.5 block">
              Participating partner
            </span>
          </div>
        </div>

        {/* 4. Number of interactions */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Interactions</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono">8,950</div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+22% growth</span>
            </div>
          </div>
        </div>

        {/* 5. Engagement rate */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Engagement Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700 font-mono">18.4%</div>
            <span className="text-[10px] font-bold text-slate-500 mt-0.5 block">
              +4.2% above benchmark
            </span>
          </div>
        </div>
      </section>

      {/* Monthly Activity Visual Chart & Indicators */}
      <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-700" />
              <span>Monthly Provider Activity</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Trajectory of beneficiary reach and interaction over the past 6 months
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Steady Growth +28%
          </span>
        </div>

        {/* Visual Bar Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-3">
          {monthlyData.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
            >
              <div className="text-center">
                <span className="text-xs font-bold text-slate-800 block">{item.month}</span>
                <span className="text-[10px] text-slate-400 font-mono">{item.reach} reach</span>
              </div>

              {/* Progress Bar Indicator */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <div className="text-center">
                <span className="text-[11px] font-black text-indigo-900 font-mono">
                  {item.interactions.toLocaleString('en-US')}
                </span>
                <span className="text-[9px] text-slate-500 block">interactions</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campaign Performance */}
      <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-purple-700" />
              <span>Campaign & Initiative Performance</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Beneficiary engagement metrics with national partnership campaigns
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {campaignPerformance.length} Registered Campaigns
          </span>
        </div>

        <div className="space-y-3">
          {campaignPerformance.map((camp, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      {camp.name}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Beneficiary satisfaction rating: {camp.satisfaction} ★
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${camp.badgeColor}`}>
                    {camp.status}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{camp.trend}</span>
                  </span>
                </div>
              </div>

              {/* Campaign Key Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 text-xs">
                <div className="p-2 rounded-xl bg-white border border-slate-200/60 text-center">
                  <span className="text-[10px] text-slate-500 block">Beneficiaries Reached</span>
                  <span className="font-extrabold text-slate-800">{camp.reach}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200/60 text-center">
                  <span className="text-[10px] text-slate-500 block">Total Engagements</span>
                  <span className="font-extrabold text-slate-800">{camp.interactions}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200/60 text-center">
                  <span className="text-[10px] text-slate-500 block">Redemption Rate</span>
                  <span className="font-extrabold text-indigo-700">{camp.redemptionRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
