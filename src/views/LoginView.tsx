import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import {
  User,
  Building2,
  Fingerprint,
  ScanFace,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lock,
  Sliders
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
  onOpenAccessibility: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onOpenAccessibility,
}) => {
  const [isSimulatingAbsher, setIsSimulatingAbsher] = useState(false);
  const [absherStep, setAbsherStep] = useState<'id' | 'otp' | 'success'>('id');
  const [nationalIdInput, setNationalIdInput] = useState('1190000000');
  const [otpInput, setOtpInput] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('beneficiary');

  const handleStartAbsher = (role: UserRole) => {
    setSelectedRole(role);
    setIsSimulatingAbsher(true);
    setAbsherStep('id');
    setOtpInput('');
  };

  const handleAbsherNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (absherStep === 'id') {
      setAbsherStep('otp');
    } else if (absherStep === 'otp') {
      setAbsherStep('success');
      setTimeout(() => {
        setIsSimulatingAbsher(false);
        onLogin(selectedRole);
      }, 1200);
    }
  };

  const handleQuickBiometric = (role: UserRole) => {
    // Quick instant simulated biometric login
    onLogin(role);
  };

  return (
    <div
      id="mueeni-login-screen"
      className="min-h-screen bg-gradient-to-b from-[#eef7f4] via-[#f5f9f8] to-[#edf4f2] text-slate-800 flex flex-col justify-between p-4 sm:p-6"
    >
      {/* Top Header Accessibility Trigger */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between pt-2">
        <span className="text-xs font-bold text-slate-500 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
          المملكة العربية السعودية 🇸🇦
        </span>
        <button
          id="login-accessibility-btn"
          onClick={onOpenAccessibility}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs border border-slate-200 transition-all"
        >
          <Sliders className="w-3.5 h-3.5 text-emerald-600" />
          <span>سهولة الوصول</span>
        </button>
      </div>

      {/* Center Main Content */}
      <div className="w-full max-w-md mx-auto my-auto py-6 space-y-6">
        {/* Brand Logo & Slogan */}
        <div className="text-center flex flex-col items-center">
          <Logo size="lg" showText={true} showSubtitle={true} className="mb-2" />
        </div>

        {/* Portal Entry Cards */}
        <div className="space-y-4">
          {/* Card 1: Beneficiary Portal (Green theme matching prototype) */}
          <div
            id="portal-beneficiary-card"
            className="p-5 rounded-3xl bg-gradient-to-br from-[#00875a] to-[#016846] text-white shadow-lg shadow-emerald-900/15 border border-emerald-600/30 relative overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/25">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">بوابة العضو</h2>
                  <p className="text-xs text-emerald-100 font-medium">المستفيد / المرافق</p>
                </div>
              </div>

              <p className="text-xs text-emerald-50 mb-4 leading-relaxed">
                الدخول والاستفادة من خدمات مُعِيني، التسهيلات المرورية، بطاقات الإركاب، والفرص المتاحة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  id="login-beneficiary-btn"
                  onClick={() => handleStartAbsher('beneficiary')}
                  className="w-full py-3 px-4 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 text-sm font-black shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <span>تسجيل الدخول</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-700" />
                </button>

                <button
                  id="quick-login-beneficiary-btn"
                  onClick={() => handleQuickBiometric('beneficiary')}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-950/30 hover:bg-emerald-950/45 text-white text-xs font-bold border border-white/20 backdrop-blur-xs flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <ScanFace className="w-4 h-4 text-emerald-200" />
                  <span>دخول سريع</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Service Provider Portal (Indigo/Purple theme matching prototype) */}
          <div
            id="portal-provider-card"
            className="p-5 rounded-3xl bg-gradient-to-br from-[#473bb0] to-[#312782] text-white shadow-lg shadow-indigo-950/15 border border-indigo-500/30 relative overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/25">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">بوابة مقدم الخدمة</h2>
                  <p className="text-xs text-indigo-100 font-medium">القطاع الخاص / المنشآت والجهات</p>
                </div>
              </div>

              <p className="text-xs text-indigo-50 mb-4 leading-relaxed">
                إدارة العروض، طرح الفرص الوظيفية والتدريبية، وتحديث مصفوفة التهيئة اللوجستية للمنشأة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  id="login-provider-btn"
                  onClick={() => handleStartAbsher('provider')}
                  className="w-full py-3 px-4 rounded-2xl bg-white text-indigo-950 hover:bg-indigo-50 text-sm font-black shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <span>تسجيل الدخول</span>
                  <ArrowLeft className="w-4 h-4 text-indigo-800" />
                </button>

                <button
                  id="quick-login-provider-btn"
                  onClick={() => handleQuickBiometric('provider')}
                  className="w-full py-3 px-4 rounded-2xl bg-indigo-950/30 hover:bg-indigo-950/45 text-white text-xs font-bold border border-white/20 backdrop-blur-xs flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Fingerprint className="w-4 h-4 text-indigo-200" />
                  <span>دخول سريع</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Absher Single Sign-On / Biometric Concept */}
        <div className="text-center pt-2 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
            <span>أو تسجيل الدخول عبر</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black">
              النفاذ الوطني الموحد - أبشر
            </span>
          </div>

          <div className="flex items-center justify-center gap-6 pt-1">
            <button
              onClick={() => handleQuickBiometric('beneficiary')}
              className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-emerald-700 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all">
                <ScanFace className="w-6 h-6 text-slate-700 group-hover:text-emerald-700" />
              </div>
              <span className="text-[11px] font-bold">بصمة الوجه</span>
            </button>

            <button
              onClick={() => handleQuickBiometric('beneficiary')}
              className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-emerald-700 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all">
                <Fingerprint className="w-6 h-6 text-slate-700 group-hover:text-emerald-700" />
              </div>
              <span className="text-[11px] font-bold">بصمة الإصبع</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-md mx-auto text-center pb-2 text-[11px] text-slate-400 font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>منظومة وطنية آمنة تدعم معايير الوصول الشامل W3C / WCAG</span>
      </div>

      {/* Simulated Absher / IAM Modal */}
      {isSimulatingAbsher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xs">
                  أبشر
                </div>
                <span className="font-extrabold text-sm text-slate-900">
                  بوابة النفاذ الوطني الموحد
                </span>
              </div>
              <button
                onClick={() => setIsSimulatingAbsher(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                إلغاء
              </button>
            </div>

            {absherStep === 'id' && (
              <form onSubmit={handleAbsherNext} className="space-y-4 text-right">
                <p className="text-xs text-slate-600">
                  الرجاء إدخال رقم الهوية الوطنية أو الإقامة للتحقق عبر نظام النفاذ الوطني:
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهوية الوطنية / الإقامة
                  </label>
                  <input
                    type="text"
                    value={nationalIdInput}
                    onChange={(e) => setNationalIdInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-slate-900 font-mono text-center font-bold text-base focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all"
                >
                  إرسال رمز التحقق (OTP)
                </button>
              </form>
            )}

            {absherStep === 'otp' && (
              <form onSubmit={handleAbsherNext} className="space-y-4 text-right">
                <p className="text-xs text-slate-600">
                  تم إرسال رمز تحقق مكون من 4 أرقام إلى جوالك المسجل في أبشر (+966 50 *** 4567):
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                    رمز التحقق المؤقت
                  </label>
                  <input
                    type="text"
                    placeholder="9 4 2 1"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-500 text-slate-900 font-mono text-center font-bold text-2xl tracking-widest focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                    autoFocus
                  />
                  <span className="block text-[11px] text-center text-slate-500 mt-1">
                    للتجربة السريعة: اضغط على متابعة مباشرة
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all"
                >
                  تأكيد والدخول إلى المنصة
                </button>
              </form>
            )}

            {absherStep === 'success' && (
              <div className="py-6 flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  تم التحقق بنجاح!
                </h3>
                <p className="text-xs text-slate-600">
                  مرحباً بك يا أحمد في مُعِيني AI... جاري تجهيز خدماتك
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
