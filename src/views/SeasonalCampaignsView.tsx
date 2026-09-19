import React, { useState } from 'react';
import {
  SeasonalCampaign
} from '../types';
import { initialCampaigns } from '../data/mockData';
import {
  Gift,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2,
  Share2,
  Award,
  Heart,
  ChevronLeft,
  Tag,
  Building2,
  Target,
  MapPin,
  Clock,
  ShieldCheck,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SeasonalCampaignsViewProps {
  campaign: SeasonalCampaign;
  onNavigateTab: (tab: string) => void;
}

export const SeasonalCampaignsView: React.FC<SeasonalCampaignsViewProps> = ({
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
    if (status === 'active' || status === 'جارية') {
      return (
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>نشطة وجارية</span>
        </span>
      );
    }
    if (status === 'upcoming' || status === 'قادمة') {
      return (
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/40 flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-300" />
          <span>قادمة قريباً</span>
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-400/40">
        منتهية ومكتملة
      </span>
    );
  };

  return (
    <div id="mueeni-campaigns-screen" className="space-y-6 pb-24 animate-fade-in text-right">
      {/* Hero Banner with Purple Identity */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-purple-400/40 relative overflow-hidden space-y-4">
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-500 text-white shadow-xs">
                مبادرة وطنية سنوية
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
                <span>الجهة المنظمة والراعي:</span>
              </div>
              <p className="font-extrabold text-white text-[11px] leading-snug">
                {campaign.organizer || 'هيئة رعاية الأشخاص ذوي الإعاقة (APD) بالشراكة مع وزارة التجارة'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <Target className="w-3.5 h-3.5 text-purple-300" />
                <span>الهدف من الحملة:</span>
              </div>
              <p className="text-white text-[11px] leading-snug">
                {campaign.purpose || 'تعزيز الشمول المجتمعي والاقتصادي ودعم القوة الشرائية للأشخاص ذوي الإعاقة.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <Users className="w-3.5 h-3.5 text-purple-300" />
                <span>الفئة المستهدفة:</span>
              </div>
              <p className="text-white text-[11px] leading-snug">
                {campaign.targetGroup || 'جميع الأشخاص ذوي الإعاقة وأسرهم والمرافقون في كافة مناطق المملكة.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-purple-300" />
                <span>تاريخ البداية والنهاية:</span>
              </div>
              <p className="text-white text-[11px] font-mono leading-snug">
                {campaign.startDate || '1 يوليو 2024'} - {campaign.endDate || '31 يوليو 2024'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-purple-200 font-bold text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-purple-300" />
                <span>نطاق التغطية والموقع:</span>
              </div>
              <p className="text-white text-[11px] leading-snug">
                {campaign.location || 'كافة مناطق ومدن المملكة العربية السعودية (متاجر حضورية ومنصات رقمية)'}
              </p>
            </div>
          </div>

          {/* Metrics counter & Registration Button */}
          <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <Users className="w-6 h-6 text-purple-300" />
              <div>
                <span className="text-[11px] text-purple-200 block">المستفيدين المسجلين:</span>
                <span className="text-lg font-black text-white font-mono">
                  {participantsCount.toLocaleString('ar-SA')} مستفيد
                </span>
              </div>
            </div>

            <button
              id="join-purple-saturday-btn"
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
                  <span>أنت مسجل ومستفيد من الحملة</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>التسجيل والمشاركة في الحملة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Features & Offers Access */}
      <section className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">
          مزايا وفعاليات السبت البنفسجي:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 space-y-1">
            <Tag className="w-5 h-5 text-purple-700" />
            <h4 className="font-bold text-xs">خصومات حتى 70%</h4>
            <p className="text-[11px] text-purple-800 leading-tight">
              أكثر من 500 علامة تجارية ومطعم وفندق مشارك بالمملكة.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
            <Heart className="w-5 h-5 text-emerald-700" />
            <h4 className="font-bold text-xs">خدمات تأهيل مجانية</h4>
            <p className="text-[11px] text-emerald-800 leading-tight">
              فحوصات واستشارات مجانية عبر المراكز الطبية الشريكة.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
            <Award className="w-5 h-5 text-blue-700" />
            <h4 className="font-bold text-xs">جوائز وسحوبات</h4>
            <p className="text-[11px] text-blue-800 leading-tight">
              سحوبات على أجهزة ذكية وكراسي كهربائية مجهزة.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('offers')}
          className="w-full py-3 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <span>تصفح عروض المبادرة في صفحة الخصومات</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </section>

      {/* Campaigns Directory & Upcoming/Past Campaigns */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-purple-700" />
            <span>سجل المبادرات والحملات الوطنية:</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-bold">
            {initialCampaigns.length} حملات معتمدة
          </span>
        </div>

        <div className="space-y-3">
          {initialCampaigns.map((camp) => (
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
                          <span>مسجل</span>
                        </>
                      ) : (
                        <span>تسجيل ومشاركة</span>
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
                  <span>الجهة المنظمة: <strong>{camp.organizer || 'هيئة رعاية الأشخاص ذوي الإعاقة'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>الهدف: <strong>{camp.purpose || 'تمكين ذوي الإعاقة والمشاركة الشاملة'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>الفئة: <strong>{camp.targetGroup || 'حاملو بطاقة التسهيلات ومرافقوهم'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>الفترة: <strong>{camp.startDate ? `${camp.startDate} - ${camp.endDate}` : camp.date}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                  <span>التغطية: <strong>{camp.location || 'كافة مناطق المملكة'}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
