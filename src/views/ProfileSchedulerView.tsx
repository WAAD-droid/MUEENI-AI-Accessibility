import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  SmartReminder,
  WalletDocument
} from '../types';
import {
  User,
  Calendar,
  Clock,
  Bell,
  ShieldCheck,
  Phone,
  Heart,
  Plus,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Sliders,
  Sparkles,
  X,
  Copy,
  Check,
  Building2,
  FileText,
  Accessibility,
  Bot,
  Layers,
  Settings2,
  Lock,
  ChevronLeft,
  Wallet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DigitalWalletView } from './DigitalWalletView';
import { initialUserProfile } from '../data/mockData';

interface ProfileSchedulerViewProps {
  user?: UserProfile;
  reminders: SmartReminder[];
  onToggleReminder: (id: string) => void;
  onAddReminder: (reminder: SmartReminder) => void;
  onOpenAccessibility: () => void;
  onLogout: () => void;
  onUpdateUser?: (updatedUser: UserProfile) => void;
  documents?: WalletDocument[];
  onAddDocument?: (doc: WalletDocument) => void;
  initialSubTab?: 'info' | 'wallet' | 'reminders' | 'settings' | 'all';
  onSubTabChange?: (subTab: 'info' | 'wallet' | 'reminders' | 'settings' | 'all') => void;
}

export const ProfileSchedulerView: React.FC<ProfileSchedulerViewProps> = ({
  user = initialUserProfile,
  reminders,
  onToggleReminder,
  onAddReminder,
  onOpenAccessibility,
  onLogout,
  onUpdateUser,
  documents = [],
  onAddDocument,
  initialSubTab = 'info',
  onSubTabChange,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'wallet' | 'reminders' | 'settings' | 'all'>(
    initialSubTab || 'info'
  );

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const handleSelectSubTab = (tab: 'info' | 'wallet' | 'reminders' | 'settings' | 'all') => {
    setActiveSubTab(tab);
    if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSub, setNewSub] = useState('');
  const [newDueDays, setNewDueDays] = useState('3');
  const [newType, setNewType] = useState<SmartReminder['type']>('medical');
  const [copiedId, setCopiedId] = useState(false);

  // Local AI Personalization state
  const [aiSettings, setAiSettings] = useState(
    user.aiPersonalization || {
      allowDisabilityType: true,
      allowAssistiveDevices: true,
      allowMobilityNeeds: true,
      allowAccommodations: true,
    }
  );

  const handleToggleAISetting = (key: keyof typeof aiSettings) => {
    const updated = { ...aiSettings, [key]: !aiSettings[key] };
    setAiSettings(updated);
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        aiPersonalization: updated,
      });
    }
  };

  const handleCopyNationalId = () => {
    navigator.clipboard.writeText(user.nationalId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1800);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const days = parseInt(newDueDays) || 5;
    const dateStr = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const reminder: SmartReminder = {
      id: `rem-${Date.now()}`,
      title: newTitle,
      subtitle: newSub || 'تذكير مجدول عبر مُعِيني AI',
      targetDate: dateStr,
      dueInDays: days,
      type: newType,
      completed: false,
    };

    onAddReminder(reminder);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewSub('');
  };

  return (
    <div id="mueeni-profile-screen" className="space-y-5 pb-28 animate-fade-in">
      {/* Profile Card */}
      <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-emerald-500/30 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border-2 border-white/40 shadow-inner">
              <User className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">{user?.name || 'أحمد محمد العتيبي'}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                  موثق نفاذ
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                {user?.disabilityType || 'مستفيد'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono text-emerald-100 bg-white/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span>هوية: {user?.nationalId || '1190000000'}</span>
                  <button
                    onClick={handleCopyNationalId}
                    title="نسخ رقم الهوية"
                    className="hover:text-white"
                  >
                    {copiedId ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  </button>
                </span>
              </div>
            </div>
          </div>

          <button
            id="profile-logout-btn"
            onClick={onLogout}
            title="تسجيل الخروج"
            aria-label="تسجيل الخروج من الحساب"
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Details Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/15 text-xs text-emerald-100">
          <div className="p-2.5 rounded-2xl bg-white/10 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-300 shrink-0" />
            <div>
              <span className="text-[10px] text-emerald-200 block">فصيلة الدم</span>
              <span className="font-bold font-mono text-white">{user.bloodType}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/10 flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
            <div>
              <span className="text-[10px] text-emerald-200 block">طوارئ الأقارب</span>
              <span className="font-bold font-mono text-white text-[11px]">
                {user.emergencyContact.phone}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/10 flex items-center gap-2 col-span-2 sm:col-span-1">
            <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] text-emerald-200 block">حالة الأهلية</span>
              <span className="font-bold text-white text-[11px]">مستحق لكافة المزايا</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section Navigation Bar */}
      <div className="flex rounded-2xl bg-slate-200/80 p-1.5 border border-slate-300 shadow-2xs gap-1 overflow-x-auto scrollbar-none">
        <button
          id="profile-tab-info-btn"
          type="button"
          onClick={() => handleSelectSubTab('info')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'info'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>المعلومات الشخصية</span>
        </button>

        <button
          id="profile-tab-wallet-btn"
          type="button"
          onClick={() => handleSelectSubTab('wallet')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'wallet'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>المحفظة الرقمية</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeSubTab === 'wallet' ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'
            }`}
          >
            {documents?.length || 0}
          </span>
        </button>

        <button
          id="profile-tab-reminders-btn"
          type="button"
          onClick={() => handleSelectSubTab('reminders')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'reminders'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>المنبه والمواعيد</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeSubTab === 'reminders' ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'
            }`}
          >
            {reminders.filter((r) => !r.completed).length}
          </span>
        </button>

        <button
          id="profile-tab-settings-btn"
          type="button"
          onClick={() => handleSelectSubTab('settings')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'settings'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>الإعدادات</span>
        </button>

        <button
          id="profile-tab-all-btn"
          type="button"
          onClick={() => handleSelectSubTab('all')}
          className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
            activeSubTab === 'all'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>عرض الكل</span>
        </button>
      </div>

      {/* 1. Personal Information & Needs */}
      {(activeSubTab === 'info' || activeSubTab === 'all') && (
        <div className="space-y-4 animate-fade-in">
          {activeSubTab === 'all' && (
            <div className="flex items-center gap-2 px-1 pt-1">
              <User className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-extrabold text-slate-900">المعلومات الشخصية والاحتياجات</h2>
            </div>
          )}

          {/* Needs, Assistive Devices & Accommodations */}
          <section className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Accessibility className="w-4 h-4 text-emerald-700" />
                <span>الاحتياجات والأجهزة المساعدة المعتمدة</span>
              </h2>
            </div>

            {/* Assistive Devices */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                الأجهزة المساعدة المستخدمة:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(user.assistiveDevices || ['كرسي متحرك كهربائي', 'سيارة مجهزة بتحكم يدوي']).map((device, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
                  >
                    {device}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobility Needs */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                الاحتياجات الحركية والبيئية:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(user.mobilityNeeds || ['منحدرات ومسارات ممهدة', 'مصاعد واسعة للأدوار المتعددة', 'مواقف سيارات واسعة']).map((need, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold"
                  >
                    {need}
                  </span>
                ))}
              </div>
            </div>

            {/* Approved Accommodations */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                الترتيبات التيسيرية المعتمدة في بيئة العمل:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(user.approvedAccommodations || ['مرونة في ساعات الحضور', 'مكتب عمل مهيأ هندسياً', 'مواقف خاصة بالقرب من المدخل']).map((acc, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Access to Digital Wallet */}
          <div
            onClick={() => handleSelectSubTab('wallet')}
            className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/10 via-indigo-900/5 to-transparent border border-purple-200/80 hover:border-purple-400 shadow-2xs hover:shadow-sm cursor-pointer transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <span>المحفظة الرقمية الموحدة</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                    {documents?.length || 0} بطاقات ومستندات
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  بطاقات التسهيلات المرورية، تخفيض الإركاب، تصريح المواقف والتقارير المعتمدة
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-purple-700 shrink-0 group-hover:translate-x-[-3px] transition-transform">
              <span>استعراض المحفظة</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Quick Access to Smart Reminders */}
          <div
            onClick={() => handleSelectSubTab('reminders')}
            className="p-4 rounded-3xl bg-gradient-to-r from-emerald-900/10 via-teal-900/5 to-transparent border border-emerald-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-sm cursor-pointer transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <span>المنبه الذكي والمواعيد</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {reminders.filter((r) => !r.completed).length} نشط
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  تذكيرات آلية بالمواعيد الطبية، المستشفيات وتجديد الوثائق
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 shrink-0 group-hover:translate-x-[-3px] transition-transform">
              <span>استعراض المواعيد</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* 2. Digital Wallet Section */}
      {(activeSubTab === 'wallet' || activeSubTab === 'all') && (
        <section id="profile-digital-wallet-section" className="space-y-4 animate-fade-in">
          {activeSubTab === 'all' && (
            <div className="flex items-center justify-between px-1 pt-3 border-t border-slate-200">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-purple-700" />
                <span>المحفظة الرقمية والبطاقات المعتمدة</span>
              </h2>
            </div>
          )}
          <DigitalWalletView
            documents={documents}
            onAddDocument={onAddDocument || (() => {})}
            embedded={true}
          />
        </section>
      )}

      {/* 3. Smart Notifications & Appointment Scheduler */}
      {(activeSubTab === 'reminders' || activeSubTab === 'all') && (
        <section id="profile-reminders-section" className="space-y-3 animate-fade-in">
          {activeSubTab === 'all' && (
            <div className="pt-3 border-t border-slate-200" />
          )}
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-emerald-600" />
                <span>المنبه الذكي والتنبيهات المجدولة</span>
              </h2>
              <p className="text-xs text-slate-500">
                تذكيرات آلية بالمواعيد الطبية وتجديد الوثائق الرسمية
              </p>
            </div>

            <button
              id="open-add-reminder-modal-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة موعد</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                onClick={() => onToggleReminder(rem.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  rem.completed
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : rem.dueInDays <= 3
                    ? 'bg-amber-50/70 border-amber-300 shadow-2xs'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    type="button"
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                      rem.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {rem.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="min-w-0">
                    <h4
                      className={`font-black text-sm text-slate-900 ${
                        rem.completed ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {rem.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {rem.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{rem.targetDate}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-left">
                  <span
                    className={`text-[11px] font-black px-2.5 py-1 rounded-full ${
                      rem.completed
                        ? 'bg-slate-200 text-slate-600'
                        : rem.dueInDays <= 3
                        ? 'bg-amber-200 text-amber-900 animate-pulse'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {rem.completed ? 'مكتمل' : `خلال ${rem.dueInDays} يوم`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. AI Personalization & Privacy Controls */}
      {(activeSubTab === 'settings' || activeSubTab === 'all') && (
        <div className="space-y-4 animate-fade-in">
          {activeSubTab === 'all' && (
            <div className="pt-3 border-t border-slate-200" />
          )}
          <section id="profile-privacy-section" className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-600" />
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                    خصوصية المستشار الذكي وتخصيص الحلول
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    تحكم في البيانات التي يمكن للذكاء الاصطناعي استخدامها لتقديم إجابات موجهة
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 block">
                    السماح بمعرفة نوع الإعاقة لتخصيص الحقوق والأنظمة
                  </span>
                  <span className="text-[10px] text-slate-500">
                    يضمن الحصول على الإعفاءات واللوائح المخصصة لحالتك مباشرة
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={aiSettings.allowDisabilityType}
                  onChange={() => handleToggleAISetting('allowDisabilityType')}
                  className="w-4 h-4 rounded-sm text-emerald-700 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 block">
                    السماح بمعرفة الأجهزة المساعدة لتوجيه التنقل
                  </span>
                  <span className="text-[10px] text-slate-500">
                    يقدم نصائح متوافقة مع نوع الكرسي والوسائل المساعدة
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={aiSettings.allowAssistiveDevices}
                  onChange={() => handleToggleAISetting('allowAssistiveDevices')}
                  className="w-4 h-4 rounded-sm text-emerald-700 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 block">
                    السماح بمعرفة الاحتياجات الحركية لاقتراح الوظائف
                  </span>
                  <span className="text-[10px] text-slate-500">
                    يفلتر الوظائف بناءً على جاهزية المنشأة اللوجستية
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={aiSettings.allowMobilityNeeds}
                  onChange={() => handleToggleAISetting('allowMobilityNeeds')}
                  className="w-4 h-4 rounded-sm text-emerald-700 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 block">
                    السماح بمعرفة الترتيبات التيسيرية المعتمدة
                  </span>
                  <span className="text-[10px] text-slate-500">
                    يساعدك في صياغة خطابات طلب التهيئة لجهات العمل
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={aiSettings.allowAccommodations}
                  onChange={() => handleToggleAISetting('allowAccommodations')}
                  className="w-4 h-4 rounded-sm text-emerald-700 focus:ring-emerald-500"
                />
              </label>
            </div>
          </section>

          {/* Accessibility & Account Settings Trigger */}
          <section id="profile-accessibility-section" className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">
              تخصيص التجربة والوصول
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-800 block">
                    لوحة إعدادات سهولة الوصول
                  </span>
                  <span className="text-[11px] text-slate-500">
                    حجم الخط، تباين الألوان، قراءة النصوص
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenAccessibility}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
              >
                تخصيص
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Add Reminder Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">
                إضافة تنبيه أو موعد جديد
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  عنوان الموعد أو التنبيه:
                </label>
                <input
                  type="text"
                  placeholder="مثال: جلسة علاج طبيعي، موعد فحص دوري..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  الجهة أو المستشفى:
                </label>
                <input
                  type="text"
                  placeholder="مثال: مدينة الملك فهد الطبية"
                  value={newSub}
                  onChange={(e) => setNewSub(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    الموعد بعد (أيام):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={newDueDays}
                    onChange={(e) => setNewDueDays(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    فئة التنبيه:
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-bold bg-white"
                  >
                    <option value="medical">موعد طبي</option>
                    <option value="renewal">تجديد بطاقة أو وثيقة</option>
                    <option value="system">ملاحظة نظامية</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-2xl text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-emerald-700 text-white font-bold"
                >
                  حفظ التذكير
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

