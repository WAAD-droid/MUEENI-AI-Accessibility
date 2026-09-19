import React from 'react';
import {
  Bot,
  Briefcase,
  AlertCircle,
  Wallet,
  Tag,
  Sparkles,
  ArrowLeft,
  Calendar,
  Gift,
  Building2,
  HelpCircle,
  PhoneCall,
  ChevronLeft,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { UserProfile, SmartReminder, OfferItem } from '../types';
import { initialUserProfile } from '../data/mockData';

interface HomeViewProps {
  user?: UserProfile;
  reminders: SmartReminder[];
  featuredOffers: OfferItem[];
  onNavigate: (tab: string) => void;
  onOpenCampaign: () => void;
  onOpenSupport: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user = initialUserProfile,
  reminders,
  featuredOffers,
  onNavigate,
  onOpenCampaign,
  onOpenSupport,
}) => {
  const urgentReminder = reminders.find((r) => !r.completed && r.dueInDays <= 3);

  return (
    <div id="mueeni-home-screen" className="space-y-6 pb-20 animate-fade-in">
      {/* Top Greeting & Intro */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-emerald-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white border border-white/20">
                منصة مُعِيني الذكية
              </span>
              <span className="text-xs font-medium text-emerald-200">
                {user.role}
              </span>
            </div>
            <span className="text-xs text-emerald-100 font-bold">
              {new Date().toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              مرحباً بك، {user?.name || 'أحمد'} 👋
            </h1>
            <p className="text-base sm:text-lg font-bold text-emerald-100 mt-1">
              منصة مُعِيني جاهزة لمساعدتك
            </p>
            <p className="text-xs text-emerald-50 max-w-md leading-relaxed mt-1 opacity-95">
              مُعِيني رفيقك الذكي الموحد؛ جاهز دائماً للإجابة على استفساراتك، تمكينك وظيفياً وتدريبياً، رصد ومتابعة عوائق الوصول، وتقديم كافة الخدمات والخصومات التي تستحقها.
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
                      تنبيه هام: {urgentReminder.title}
                    </span>
                    <span className="text-emerald-100 text-[11px]">
                      {urgentReminder.subtitle} (المتبقي {urgentReminder.dueInDays} يوم)
                    </span>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-emerald-200 shrink-0" />
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
                      إشعار وتحديث جديد: فعاليات السبت البنفسجي
                    </span>
                    <span className="text-emerald-100 text-[11px]">
                      تم تفعيل أكثر من 500 عرض حصري ومبادرات وصول ميسرة لهذا الشهر
                    </span>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-emerald-200 shrink-0" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main 4 Core Services Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-extrabold text-slate-900">
            الخدمات الذكية الرئيسية
          </h2>
          <span className="text-xs text-emerald-700 font-bold">الوصول السريع</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. المستشار الذكي (AI Assistant) */}
          <div
            id="card-ai-assistant"
            onClick={() => onNavigate('assistant')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-blue-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  ذكاء اصطناعي
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-1.5">
                  <span>المستشار الذكي</span>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </h3>
                <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                  اسأل مُعِيني عن الخدمات الحكومية، الحقوق النظامية، إجراءات التقديم ومواعيد التأهيل.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-cyan-200 group-hover:translate-x-[-4px] transition-transform">
                <span>ابدأ المحادثة الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. الوظائف والتدريب (Jobs & Training) */}
          <div
            id="card-jobs-training"
            onClick={() => onNavigate('jobs')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-emerald-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  بوابة التمكين
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  الوظائف والتدريب
                </h3>
                <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                  تصفح فرص العمل والتدريب التعاوني مع فحص مصفوفة التهيئة اللوجستية للمنشآت.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-emerald-200 group-hover:translate-x-[-4px] transition-transform">
                <span>استكشف الفرص المتاحة</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 3. صوتك مسموع (Smart Reporting) */}
          <div
            id="card-smart-reporting"
            onClick={() => onNavigate('reports')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-amber-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  رصد ومتابعة
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  صوتك مسموع
                </h3>
                <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                  رفع بلاغات التعدي على مواقف ذوي الإعاقة وعوائق الطرق مع التتبع المباشر حتى الحل.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-amber-200 group-hover:translate-x-[-4px] transition-transform">
                <span>رفع ومتابعة بلاغ</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 4. الخدمات والخصومات (Services & Discounts) */}
          <div
            id="card-services-discounts"
            onClick={() => onNavigate('offers')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-900 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden border border-purple-400/30 active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <Tag className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                  عروض حصرية
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  الخدمات والخصومات
                </h3>
                <p className="text-xs text-purple-100 mt-1 leading-relaxed">
                  تصفح مئات الخصومات والعروض المخصصة في المطاعم، الفنادق، المراكز الطبية والمتاجر الشريكة.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-purple-200 group-hover:translate-x-[-4px] transition-transform">
                <span>استكشف العروض والخصومات</span>
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purple Saturday Promotional Hero Banner */}
      <section
        id="banner-purple-saturday"
        onClick={onOpenCampaign}
        className="cursor-pointer p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white shadow-md hover:shadow-lg border border-purple-500/40 relative overflow-hidden transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-purple-200 shrink-0">
              <Gift className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-purple-500 text-white">
                  مبادرة وطنية
                </span>
                <span className="text-xs text-purple-200 font-bold">
                  مركز المشاركة الموسمية
                </span>
              </div>
              <h3 className="text-xl font-black text-white mt-1">
                السبت البنفسجي 💜
              </h3>
              <p className="text-xs text-purple-100 mt-0.5 leading-relaxed">
                عروض وتخفيضات استثنائية تصل حتى 70% لدى أكثر من 500 شريك ومقدم خدمة بالمملكة.
              </p>
            </div>
          </div>

          <button
            id="join-purple-saturday-home-btn"
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-black shadow-md transition-transform shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>انضمام واستعراض</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Offers & Benefits Section Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              الخدمات والخصومات المميزة
            </h2>
            <p className="text-xs text-slate-500">
              مزايا حصرية لحاملي بطاقات مُعِيني
            </p>
          </div>
          <button
            onClick={() => onNavigate('offers')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>عرض الكل</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featuredOffers.slice(0, 2).map((offer) => (
            <div
              key={offer.id}
              onClick={() => onNavigate('offers')}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex items-center gap-3.5"
            >
              <img
                src={offer.imageUrl}
                alt={offer.title}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {offer.categoryLabel}
                  </span>
                  <span className="text-xs font-black text-rose-600">
                    {offer.discount}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 truncate mt-1">
                  {offer.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {offer.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action Links & Emergency Hotlines */}
      <section className="p-5 rounded-3xl bg-slate-100/90 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-sm text-slate-900">
              قنوات الدعم وأرقام الطوارئ المباشرة
            </h3>
          </div>
          <button
            onClick={onOpenSupport}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            المساعدة والتواصل
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200">
            <span className="block font-black text-emerald-700 text-sm">19911</span>
            <span className="text-[10px] text-slate-500 font-medium">الموارد البشرية</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200">
            <span className="block font-black text-emerald-700 text-sm">937</span>
            <span className="text-[10px] text-slate-500 font-medium">طوارئ الصحة</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200">
            <span className="block font-black text-emerald-700 text-sm">993</span>
            <span className="text-[10px] text-slate-500 font-medium">المرور للمواقف</span>
          </div>
        </div>
      </section>
    </div>
  );
};
