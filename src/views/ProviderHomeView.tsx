import React from 'react';
import {
  Building2,
  Flame,
  BarChart3,
  Briefcase,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Clock,
  ChevronLeft,
  Tag,
  ShieldCheck,
  Users,
  Plus,
  Layers,
  Bell
} from 'lucide-react';

interface ProviderHomeViewProps {
  providerName?: string;
  onNavigate: (tab: string) => void;
  activeOffersCount?: number;
  activeJobsCount?: number;
}

export const ProviderHomeView: React.FC<ProviderHomeViewProps> = ({
  providerName = 'شركة الاتصالات السعودية (STC)',
  onNavigate,
  activeOffersCount = 4,
  activeJobsCount = 4,
}) => {
  return (
    <div id="mueeni-provider-home-screen" className="space-y-6 pb-20 animate-fade-in text-right" dir="rtl">
      {/* 1. Welcome Message & Overview Header */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white border border-white/20 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>بوابة مقدم الخدمة والمنشآت</span>
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>شريك موثق</span>
              </span>
            </div>
            <span className="text-xs text-indigo-200 font-bold">
              {new Date().toLocaleDateString('ar-SA', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              مرحباً بك في مُعِيني! 🏢
            </h1>
            <p className="text-sm font-bold text-indigo-200 mt-1">
              مرحباً بك، {providerName}
            </p>
            <p className="text-xs text-indigo-100 max-w-xl leading-relaxed mt-2 opacity-95">
              تساعد منصة مُعِيني مقدمي الخدمات على التواصل المباشر مع الأشخاص ذوي الإعاقة ودعمهم وتمكينهم، عبر تقديم خدمات استثنائية، وطرح فرص مواءمة، والمشاركة الفاعلة في المبادرات الوطنية.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quick Overview Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-slate-900">
            نظرة عامة سريعة
          </h2>
          <span className="text-xs text-indigo-700 font-bold">مؤشرات حية</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* 1. Active Services */}
          <div
            onClick={() => onNavigate('provider_services')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">الخدمات النشطة</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-slate-900 font-mono block">
              {activeOffersCount} خدمات
            </span>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>مفعلة وتستقبل الطلبات</span>
            </span>
          </div>

          {/* 2. Active Campaigns */}
          <div
            onClick={() => onNavigate('provider_campaigns')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">الحملات النشطة</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-purple-900 font-mono block">
              3 مبادرات
            </span>
            <span className="text-[10px] text-purple-600 font-bold mt-0.5 block">
              السبت البنفسجي واليوم الوطني
            </span>
          </div>

          {/* 3. Beneficiaries Reached */}
          <div
            onClick={() => onNavigate('provider_analytics')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">المستفيدون المخدومون</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-blue-900 font-mono block">
              3,420+
            </span>
            <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">
              عبر بطاقات مُعِيني
            </span>
          </div>

          {/* 4. Engagement */}
          <div
            onClick={() => onNavigate('provider_analytics')}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">معدل التفاعل</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-emerald-700 font-mono block">
              18.4%
            </span>
            <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
              +3.2% هذا الشهر
            </span>
          </div>
        </div>
      </section>

      {/* 3. Quick Actions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-slate-900">
            الإجراءات السريعة
          </h2>
          <span className="text-xs text-slate-500 font-bold">اختصارات فورية</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Quick Action 1: Add Service */}
          <button
            id="qa-btn-add-service"
            onClick={() => onNavigate('provider_services')}
            className="p-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-indigo-800 text-white shadow-xs hover:shadow-sm transition-all flex items-center justify-between text-right cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">إضافة خدمة</span>
                <span className="text-[11px] text-indigo-100 block">نشر خدمة أو عرض جديد</span>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-indigo-200 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Quick Action 2: Create Campaign */}
          <button
            id="qa-btn-create-campaign"
            onClick={() => onNavigate('provider_campaigns')}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-700 to-purple-800 text-white shadow-xs hover:shadow-sm transition-all flex items-center justify-between text-right cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">إنشاء حملة</span>
                <span className="text-[11px] text-purple-100 block">إطلاق مبادرة تمكينية</span>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-purple-200 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Quick Action 3: View Analytics */}
          <button
            id="qa-btn-view-analytics"
            onClick={() => onNavigate('provider_analytics')}
            className="p-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-xs hover:shadow-sm transition-all flex items-center justify-between text-right cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">عرض الإحصائيات</span>
                <span className="text-[11px] text-blue-100 block">تقارير التفاعل والأثر</span>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-blue-200 group-hover:-translate-x-1 transition-transform" />
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
              <span>النشاط الأخير</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-bold">اليوم</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-900">
                  تفعيل كود الخصم (STC50) لـ 210 مستفيدين
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  تم التحقق الفوري من استحقاق المستفيدين عبر الربط الآمن مع منصة مُعِيني
                </p>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">منذ 35 دقيقة</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-900">
                  انضمام 84 مستفيداً لمبادرة السبت البنفسجي
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  تم تسجيلهم للاستفادة من الباقات الميسرة المخصصة لذوي الإعاقة
                </p>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">منذ 3 ساعات</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-slate-900">
                  تقديم استشارة فيديو بلغة الإشارة
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  أتم موظفو خدمة العملاء المعتمدون 18 مكالمة دعم تقني ميسرة اليوم
                </p>
                <span className="text-[10px] text-slate-400 font-bold mt-1 block">منذ 5 ساعات</span>
              </div>
            </div>
          </div>
        </section>

        {/* Important Updates */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-purple-700" />
              <span>التحديثات الهامة</span>
            </h3>
            <span className="text-[11px] text-indigo-700 font-bold">تنبيهات النظام</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-purple-50/50 border border-indigo-200/70 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-700 text-white">
                  تحديث تنظيمي
                </span>
                <span className="text-[10px] text-slate-500 font-bold">اليوم</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-2">
                تحديث معايير شهادة مواءمة للبيئات الرقمية
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                أصدرت هيئة رعاية الأشخاص ذوي الإعاقة الدليل الإرشادي المحدث للوصول الشامل لعام 2025. تم تحديث متطلبات منشأتكم بنجاح.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  إشعار اعتماد
                </span>
                <span className="text-[10px] text-slate-500 font-bold">أمس</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-2">
                توثيق 45 فرعاً مجهزاً بالكامل بالمملكة
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                تم اعتماد مسارات الوصول والمواقف المخصصة ومنصات لغة الإشارة في الفروع الرئيسية وربطها بالخريطة التفاعلية للمستفيدين.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
