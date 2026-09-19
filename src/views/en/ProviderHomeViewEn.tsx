import React from 'react';
import {
  Building2,
  Flame,
  BarChart3,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  ChevronRight,
  Tag,
  ShieldCheck,
  Users,
  Plus,
  Layers,
  Bell
} from 'lucide-react';

interface ProviderHomeViewEnProps {
  providerName?: string;
  onNavigate: (tab: string) => void;
  activeOffersCount?: number;
  activeJobsCount?: number;
}

export const ProviderHomeViewEn: React.FC<ProviderHomeViewEnProps> = ({
  providerName = 'STC Telecom',
  onNavigate,
  activeOffersCount = 4,
  activeJobsCount = 4,
}) => {
  return (
    <div id="mueeni-provider-home-screen-en" className="space-y-6 pb-20 animate-fade-in text-left" dir="ltr">
      {/* 1. Welcome Message & Overview Header */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white border border-white/20 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Service Provider & Business Portal</span>
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Partner</span>
              </span>
            </div>
            <span className="text-xs text-indigo-200 font-bold">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Welcome to Mu'ini! 🏢
            </h1>
            <p className="text-sm font-bold text-indigo-200 mt-1">
              Welcome, {providerName}
            </p>
            <p className="text-xs text-indigo-100 max-w-xl leading-relaxed mt-2 opacity-95">
              Mu'ini helps service providers connect with and support people with disabilities through high-quality accessible services, inclusive employment opportunities, and national empowerment campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quick Overview Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-slate-900">
            Quick Overview
          </h2>
          <span className="text-xs text-indigo-700 font-bold">Live Indicators</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* 1. Active Services */}
          <div
            onClick={() => onNavigate('provider_services')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Active Services</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900 font-mono block">
              {activeOffersCount} Services
            </span>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Active & Published</span>
            </span>
          </div>

          {/* 2. Active Campaigns */}
          <div
            onClick={() => onNavigate('provider_campaigns')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Active Campaigns</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-purple-900 font-mono block">
              3 Initiatives
            </span>
            <span className="text-[10px] text-purple-600 font-bold mt-0.5 block">
              Purple Saturday & National Day
            </span>
          </div>

          {/* 3. Beneficiaries Reached */}
          <div
            onClick={() => onNavigate('provider_analytics')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Beneficiaries Reached</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-blue-900 font-mono block">
              3,420+
            </span>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">
              Via digital cards
            </span>
          </div>

          {/* 4. Engagement */}
          <div
            onClick={() => onNavigate('provider_analytics')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Engagement</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-emerald-700 font-mono block">
              18.4%
            </span>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
              +3.2% this month
            </span>
          </div>
        </div>
      </section>

      {/* 3. Quick Actions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-slate-900">
            Quick Actions
          </h2>
          <span className="text-xs text-slate-500 font-bold">Direct Shortcuts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Quick Action 1: Add Service */}
          <button
            id="qa-btn-add-service-en"
            onClick={() => onNavigate('provider_services')}
            className="p-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-indigo-800 text-white shadow-xs hover:shadow-sm transition-all flex items-center justify-between text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">Add Service</span>
                <span className="text-[11px] text-indigo-100 block">Publish service or offer</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick Action 2: Create Campaign */}
          <button
            id="qa-btn-create-campaign-en"
            onClick={() => onNavigate('provider_campaigns')}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-700 to-purple-800 text-white shadow-xs hover:shadow-sm transition-all flex items-center justify-between text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">Create Campaign</span>
                <span className="text-[11px] text-purple-100 block">Launch new initiative</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick Action 3: View Analytics */}
          <button
            id="qa-btn-view-analytics-en"
            onClick={() => onNavigate('provider_analytics')}
            className="p-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-xs hover:shadow-sm transition-all flex items-center justify-between text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">View Analytics</span>
                <span className="text-[11px] text-blue-100 block">Impact & reach reports</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 4. Recent Activity & Important Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-700" />
              <span>Recent Activity</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-bold">Today</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-900">
                  Promo Code (STC50) Redeemed by 210 Beneficiaries
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Instant eligibility verification verified via Mu'ini digital integration
                </p>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">35 minutes ago</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-900">
                  84 Beneficiaries Joined Purple Saturday Initiative
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Subscribed to special telecom subsidies for disability cardholders
                </p>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">3 hours ago</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-900">
                  Sign Language Video Consultations Completed
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Certified customer care staff completed 18 accessible video support sessions today
                </p>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">5 hours ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Important Updates */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-purple-700" />
              <span>Important Updates</span>
            </h3>
            <span className="text-[11px] text-indigo-700 font-bold">System Alerts</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-purple-50/50 border border-indigo-200/70 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-700 text-white">
                  Regulatory Update
                </span>
                <span className="text-[10px] text-slate-500 font-bold">Today</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-2">
                Mowaamah Digital Accessibility Guidelines 2025
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Authority of Persons with Disabilities released updated accessibility standards. Your provider portal profile has been aligned.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Accreditation Notice
                </span>
                <span className="text-[10px] text-slate-500 font-bold">Yesterday</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-2">
                45 Flagship Branches Universally Accredited
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Tactile pathways, accessible parking, and sign language stations in certified branches now linked to Mu'ini interactive map.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
