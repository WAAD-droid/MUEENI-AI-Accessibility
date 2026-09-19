import React, { useState } from 'react';
import {
  SeasonalCampaign
} from '../../types';
import { initialCampaignsEn } from '../../data/mockDataEn';
import {
  Users,
  CheckCircle2,
  Award,
  Heart,
  ChevronRight,
  Tag,
  Sparkles,
  Building2,
  Target,
  Calendar,
  MapPin,
  Clock,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SeasonalCampaignsViewEnProps {
  campaign: SeasonalCampaign;
  onNavigateTab: (tab: string) => void;
}

export const SeasonalCampaignsViewEn: React.FC<SeasonalCampaignsViewEnProps> = ({
  campaign,
  onNavigateTab,
}) => {
  const [joined, setJoined] = useState(campaign.isJoined);
  const [participantsCount, setParticipantsCount] = useState(campaign.participantsCount);
  const [joinedCampaigns, setJoinedCampaigns] = useState<Record<string, boolean>>({
    [campaign.id]: !!campaign.isJoined
  });

  const handleJoin = (campId?: string) => {
    const targetId = campId || campaign.id;
    if (!joinedCampaigns[targetId]) {
      setJoinedCampaigns(prev => ({ ...prev, [targetId]: true }));
      if (targetId === campaign.id) {
        setJoined(true);
        setParticipantsCount((prev) => prev + 1);
      }
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const getStatusBadge = (status?: string) => {
    if (status === 'active') {
      return (
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </span>
      );
    }
    if (status === 'upcoming') {
      return (
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/40 flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-300" />
          <span>Upcoming</span>
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-400/40">
        Expired
      </span>
    );
  };

  return (
    <div id="mueeni-campaigns-screen-en" className="space-y-6 pb-24 animate-fade-in text-left">
      {/* Hero Banner with Purple Identity */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-purple-400/40 relative overflow-hidden space-y-4">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-500 text-white shadow-xs">
                Annual National Initiative
              </span>
              {getStatusBadge(campaign.status || 'active')}
            </div>
            <span className="text-xs font-bold text-purple-200">
              {campaign.date}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>{campaign.title}</span>
              <span className="text-2xl">💜</span>
            </h1>
            <p className="text-sm font-bold text-purple-200 mt-1">
              {campaign.subtitle}
            </p>
            <p className="text-xs text-purple-100 mt-2 leading-relaxed max-w-2xl">
              {campaign.description}
            </p>
          </div>

          {/* Requested Details: Organizer, Purpose, Target Group, Dates, Coverage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-purple-500/30 text-xs">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-purple-300" />
                <span>Organizing Entity & Sponsor:</span>
              </div>
              <p className="font-extrabold text-white text-[11px] leading-snug">
                {campaign.organizer || 'Authority for the Care of People with Disabilities (APD) & Ministry of Commerce'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <Target className="w-3.5 h-3.5 text-purple-300" />
                <span>Purpose of Campaign:</span>
              </div>
              <p className="text-white text-[11px] leading-snug">
                {campaign.purpose || 'Empower economic participation, enhance purchasing power, and celebrate PwD contributions.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <Users className="w-3.5 h-3.5 text-purple-300" />
                <span>Target Group:</span>
              </div>
              <p className="text-white text-[11px] leading-snug">
                {campaign.targetGroup || 'All persons with disabilities, families, and certified companions across Saudi Arabia.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-purple-300" />
                <span>Start & End Dates:</span>
              </div>
              <p className="text-white text-[11px] font-mono leading-snug">
                {campaign.startDate || 'July 1, 2024'} - {campaign.endDate || 'July 31, 2024'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-purple-300" />
                <span>Location & Coverage Area:</span>
              </div>
              <p className="text-white text-[11px] leading-snug">
                {campaign.location || 'All provinces and cities across Saudi Arabia (In-Person & Online)'}
              </p>
            </div>
          </div>

          {/* Metrics counter & Registration button */}
          <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <Users className="w-6 h-6 text-purple-300" />
              <div>
                <span className="text-[11px] text-purple-200 block">Registered Beneficiaries:</span>
                <span className="text-lg font-black text-white font-mono">
                  {participantsCount.toLocaleString('en-US')} Members
                </span>
              </div>
            </div>

            <button
              id="join-purple-saturday-btn-en"
              onClick={() => handleJoin(campaign.id)}
              disabled={joined}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md ${
                joined
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-500 hover:bg-purple-400 text-white active:scale-95'
              }`}
            >
              {joined ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enrolled in Initiative</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Register & Unlock Perks</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Features & Offers Access */}
      <section className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">
          Purple Saturday Benefits & Perks:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 space-y-1">
            <Tag className="w-5 h-5 text-purple-700" />
            <h4 className="font-bold text-xs">Up to 70% Discounts</h4>
            <p className="text-[11px] text-purple-800 leading-tight">
              Over 500 participating partner brands, cafes, and hospitality venues across Saudi Arabia.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
            <Heart className="w-5 h-5 text-emerald-700" />
            <h4 className="font-bold text-xs">Complimentary Rehabilitation</h4>
            <p className="text-[11px] text-emerald-800 leading-tight">
              Free consultations and assessments with partnered medical and wellness centers.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
            <Award className="w-5 h-5 text-blue-700" />
            <h4 className="font-bold text-xs">Prizes & Raffles</h4>
            <p className="text-[11px] text-blue-800 leading-tight">
              Draws for smart assistive devices and specialized mobility equipment.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('offers')}
          className="w-full py-3 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <span>Explore Purple Saturday Offers in Discounts Tab</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* Campaigns Directory & Upcoming/Past Campaigns */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-purple-700" />
            <span>National Campaigns Directory:</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-bold">
            {initialCampaignsEn.length} Verified Initiatives
          </span>
        </div>

        <div className="space-y-3">
          {initialCampaignsEn.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-purple-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-sm text-slate-900">
                      {camp.title}
                    </h4>
                    {getStatusBadge(camp.status || (camp.active ? 'active' : 'expired'))}
                  </div>
                  <p className="text-xs font-bold text-purple-800 mt-0.5">
                    {camp.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-xl">
                    {camp.period}
                  </span>
                  {camp.status !== 'expired' && (
                    <button
                      onClick={() => handleJoin(camp.id)}
                      disabled={joinedCampaigns[camp.id]}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        joinedCampaigns[camp.id]
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-purple-700 hover:bg-purple-800 text-white shadow-xs'
                      }`}
                    >
                      {joinedCampaigns[camp.id] ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Enrolled</span>
                        </>
                      ) : (
                        <span>Register & Join</span>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {camp.description}
              </p>

              {/* Detailed meta grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>Sponsor: <strong>{camp.organizer || 'Authority for Care of PwD'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>Objective: <strong>{camp.purpose || 'Promoting inclusion & accessibility'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>Audience: <strong>{camp.targetGroup || 'Tas’heelat cardholders & companions'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>Duration: <strong>{camp.startDate ? `${camp.startDate} - ${camp.endDate}` : camp.date}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>Scope: <strong>{camp.location || 'Nationwide across Saudi Arabia'}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
