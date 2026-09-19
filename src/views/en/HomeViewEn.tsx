import React from 'react';
import {
  Bot,
  Briefcase,
  AlertCircle,
  Tag,
  Sparkles,
  ArrowRight,
  Gift,
  ChevronRight,
  Clock
} from 'lucide-react';
import { UserProfile, SmartReminder, OfferItem } from '../../types';
import { initialUserProfileEn } from '../../data/mockDataEn';

interface HomeViewEnProps {
  user?: UserProfile;
  reminders: SmartReminder[];
  featuredOffers: OfferItem[];
  onNavigate: (tab: string) => void;
  onOpenCampaign: () => void;
  onOpenSupport: () => void;
}

export const HomeViewEn: React.FC<HomeViewEnProps> = ({
  user = initialUserProfileEn,
  reminders,
  featuredOffers,
  onNavigate,
  onOpenCampaign,
  onOpenSupport,
}) => {
  const urgentReminder = reminders.find((r) => !r.completed && r.dueInDays <= 3);

  return (
    <div id="mueeni-home-screen-en" className="space-y-6 pb-20 animate-fade-in text-left">
      {/* Top Greeting & Intro */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-emerald-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white border border-white/20">
                MUEENI Smart Platform
              </span>
              <span className="text-xs font-medium text-emerald-200">
                {user.role}
              </span>
            </div>
            <span className="text-xs text-emerald-100 font-bold">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Welcome, {user?.name || 'Ahmed'} 👋
            </h1>
            <p className="text-base sm:text-lg font-bold text-emerald-100 mt-1">
              MUEENI is ready to help you
            </p>
            <p className="text-xs text-emerald-50 max-w-md leading-relaxed mt-1 opacity-95">
              Your unified smart companion; always prepared to answer questions, empower your career, resolve accessibility obstacles, and bring you exclusive services and discounts.
            </p>
          </div>

          {/* Area for Important Updates & Notifications */}
          <div className="space-y-2 mt-2">
            {urgentReminder ? (
              <div
                onClick={() => onNavigate('profile')}
                className="p-3 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/25 cursor-pointer transition-all flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">
                      Important Alert: {urgentReminder.title}
                    </span>
                    <span className="text-emerald-100 text-[11px]">
                      {urgentReminder.subtitle} (Due in {urgentReminder.dueInDays} days)
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200 shrink-0" />
              </div>
            ) : (
              <div
                onClick={onOpenCampaign}
                className="p-3 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/25 cursor-pointer transition-all flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">
                      New Update: Purple Saturday Initiatives
                    </span>
                    <span className="text-emerald-100 text-[11px]">
                      Over 500 exclusive offers and accessible services active this month
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200 shrink-0" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main 4 Core Services Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-extrabold text-slate-900">
            Core Smart Services
          </h2>
          <span className="text-xs text-emerald-700 font-bold">Quick Access</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. AI Assistant */}
          <div
            id="card-ai-assistant-en"
            onClick={() => onNavigate('assistant')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-blue-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  AI Powered
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-1.5">
                  <span>AI Assistant</span>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </h3>
                <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                  Ask MUEENI about governmental services, legal rights, application procedures, and rehabilitation dates.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-cyan-200 group-hover:translate-x-1 transition-transform">
                <span>Start conversation</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. Jobs & Training */}
          <div
            id="card-jobs-training-en"
            onClick={() => onNavigate('jobs')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-emerald-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  Empowerment Hub
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Jobs & Training
                </h3>
                <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                  Explore certified employment and cooperative training programs with full accessibility readiness matrices.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-emerald-200 group-hover:translate-x-1 transition-transform">
                <span>Browse opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 3. Smart Reports */}
          <div
            id="card-smart-reporting-en"
            onClick={() => onNavigate('reports')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-amber-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  Voice Heard
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Smart Reports
                </h3>
                <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                  Report parking violations and accessibility hurdles with live tracking until official municipal resolution.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-amber-200 group-hover:translate-x-1 transition-transform">
                <span>Submit & track report</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 4. Services & Discounts */}
          <div
            id="card-services-discounts-en"
            onClick={() => onNavigate('offers')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-900 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-purple-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <Tag className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  Exclusive Offers
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Services & Discounts
                </h3>
                <p className="text-xs text-purple-100 mt-1 leading-relaxed">
                  Discover hundreds of partner discounts in dining, hotels, healthcare, and retail tailored for cardholders.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-purple-200 group-hover:translate-x-1 transition-transform">
                <span>Explore discounts</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purple Saturday Promotional Hero Banner */}
      <section
        id="banner-purple-saturday-en"
        onClick={onOpenCampaign}
        className="cursor-pointer p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white shadow-md hover:shadow-lg border border-purple-500/40 relative overflow-hidden transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-purple-200 shrink-0">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500 text-white">
                  Seasonal Campaign
                </span>
                <span className="text-xs text-purple-200">Active Now</span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">
                Purple Saturday 2024 Initiative
              </h3>
              <p className="text-xs text-purple-100 mt-0.5 line-clamp-1">
                Exclusive offers up to 70% with over 500 partner stores across the Kingdom
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-purple-950 text-xs font-black shrink-0 hover:bg-purple-100 transition-colors">
            <span>Explore Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>
    </div>
  );
};
