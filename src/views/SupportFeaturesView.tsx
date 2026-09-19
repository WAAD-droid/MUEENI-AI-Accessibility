import React, { useState } from 'react';
import {
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Sliders,
  Bell,
  HeartHandshake,
  Send,
  CheckCircle2,
  Lock,
  Headphones
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SupportFeaturesViewProps {
  onOpenAccessibility: () => void;
}

export const SupportFeaturesView: React.FC<SupportFeaturesViewProps> = ({
  onOpenAccessibility,
}) => {
  const [supportMessage, setSupportMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSentSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setSupportMessage('');
      setSentSuccess(false);
    }, 2500);
  };

  return (
    <div id="mueeni-support-screen" className="space-y-5 pb-24 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-5 shadow-md border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-700 text-white">
              Support & Ecosystem
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              مميزات إضافية والدعم المباشر
            </h1>
            <p className="text-xs text-emerald-100 mt-1 max-w-md leading-relaxed">
              نحن هنا لخدمتك على مدار الساعة، وتقديم أفضل تجربة وصول رقمي شامل وموثوق.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-200 border border-white/20">
            <Headphones className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Ecosystem Highlights Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            أعلى معايير الأمان والخصوصية
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            جميع بياناتك ووثائقك مشفرة ومحمية بالربط مع النفاذ الوطني الموحد والأنظمة السيادية.
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            سهولة الوصول الشامل WCAG 2.1
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            تخصيص كامل للألوان، حجم الخط، قارئ الشاشة الصوتي، ودعم لوحات المفاتيح والأجهزة المساعدة.
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            المنبه الذكي والتنبيه الاستباقي
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            تنبيهات تلقائية قبل انتهاء بطاقات التسهيلات، ومواعيد المراجعات الطبية والتقارير.
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">
            الربط الحكومي الموحد
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            ربط مباشر مع هيئة رعاية الأشخاص ذوي الإعاقة، وزارة الموارد، المرور، والنقل.
          </p>
        </div>
      </section>

      {/* Official Hotlines */}
      <section className="p-5 rounded-3xl bg-slate-100/90 border border-slate-200 space-y-3">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-700" />
          <span>قنوات الاتصال المباشرة والخطوط الساخنة:</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">وزارة الموارد البشرية والتنمية الاجتماعية</span>
              <span className="text-[11px] text-slate-500">لخدمات التأهيل الشامل والتمكين</span>
            </div>
            <a href="tel:19911" className="font-mono font-black text-emerald-700 text-sm bg-emerald-50 px-3 py-1.5 rounded-xl">
              19911
            </a>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">مركز الاتصال الصحي (وزارة الصحة)</span>
              <span className="text-[11px] text-slate-500">للاستشارات والتقارير الطبية والمواعيد</span>
            </div>
            <a href="tel:937" className="font-mono font-black text-emerald-700 text-sm bg-emerald-50 px-3 py-1.5 rounded-xl">
              937
            </a>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">الإدارة العامة للمرور</span>
              <span className="text-[11px] text-slate-500">لبلاغات التعدي العاجلة على المواقف</span>
            </div>
            <a href="tel:993" className="font-mono font-black text-emerald-700 text-sm bg-emerald-50 px-3 py-1.5 rounded-xl">
              993
            </a>
          </div>
        </div>
      </section>

      {/* Direct Feedback / Ticket Box */}
      <section className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <h3 className="font-extrabold text-sm text-slate-900">
          تواصل مع فريق الدعم الفني لمنصة مُعِيني
        </h3>

        <form onSubmit={handleSendTicket} className="space-y-3 text-xs">
          <textarea
            rows={3}
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            placeholder="اكتب ملاحظتك، اقتراحك، أو استفسارك هنا وسيقوم الفريق بالرد الفوري..."
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-medium outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-400"
            required
          />

          {sentSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>تم استلام رسالتك وسيتم التواصل معك عبر رقم الجوال المسجل.</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4 rotate-180" />
              <span>إرسال الرسالة</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
