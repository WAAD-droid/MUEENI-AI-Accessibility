import React, { useState } from 'react';
import {
  Building2,
  Tag,
  Briefcase,
  Plus,
  Eye,
  CheckCircle2,
  TrendingUp,
  Sliders,
  Car,
  Sun,
  Laptop,
  Users,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { JobOpportunity, OfferItem } from '../types';
import confetti from 'canvas-confetti';

interface ProviderPortalViewProps {
  initialOffers: OfferItem[];
  initialJobs: JobOpportunity[];
  onAddNewOffer: (offer: OfferItem) => void;
  onAddNewJob: (job: JobOpportunity) => void;
}

export const ProviderPortalView: React.FC<ProviderPortalViewProps> = ({
  initialOffers,
  initialJobs,
  onAddNewOffer,
  onAddNewJob,
}) => {
  const [activeTab, setActiveTab] = useState<'offers' | 'careers'>('offers');
  const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

  // New Offer Form State
  const [offerTitle, setOfferTitle] = useState('');
  const [offerCompany, setOfferCompany] = useState('مقهى النخبة الرياض');
  const [offerDiscount, setOfferDiscount] = useState('20%');
  const [offerPromo, setOfferPromo] = useState('MUEENI20');
  const [offerCategory, setOfferCategory] = useState<OfferItem['category']>('cafes');
  const [offerDesc, setOfferDesc] = useState('');

  // New Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('شركة التقنية المتقدمة');
  const [jobLocation, setJobLocation] = useState('الرياض (هجين)');
  const [jobCategory, setJobCategory] = useState<'jobs' | 'training'>('jobs');
  const [jobDesc, setJobDesc] = useState('');
  const [jobSalary, setJobSalary] = useState('9,000 ريال');
  const [matrixRamps, setMatrixRamps] = useState(true);
  const [matrixParking, setMatrixParking] = useState(true);
  const [matrixPaths, setMatrixPaths] = useState(true);
  const [matrixLighting, setMatrixLighting] = useState(true);
  const [matrixTech, setMatrixTech] = useState(true);

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTitle.trim()) return;

    const newOffer: OfferItem = {
      id: `off-${Date.now()}`,
      title: offerTitle,
      company: offerCompany,
      category: offerCategory,
      categoryLabel: offerCategory === 'cafes' ? 'مطاعم وكافيهات' : 'خدمات عامة',
      discount: offerDiscount,
      promoCode: offerPromo,
      validUntil: '2025/12/31',
      description: offerDesc || 'خصم خاص لحاملي بطاقات منصة مُعِيني AI.',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80',
    };

    onAddNewOffer(newOffer);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setIsAddOfferModalOpen(false);
    setOfferTitle('');
    setOfferDesc('');
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    const newJob: JobOpportunity = {
      id: `job-${Date.now()}`,
      title: jobTitle,
      company: jobCompany,
      category: jobCategory,
      type: 'دوام كامل',
      location: jobLocation,
      postedAt: 'الآن',
      salary: jobSalary,
      description: jobDesc || 'فرصة عمل مميزة ضمن بيئة عمل مجهزة ومعتمدة للوصول الشامل.',
      requirements: ['إجادة استخدام الحاسب الآلي', 'الرغبة في التطور المهني'],
      accessibilityMatrix: {
        ramps: matrixRamps,
        reservedParking: matrixParking,
        visualPaths: matrixPaths,
        lighting: matrixLighting,
        assistiveTech: matrixTech,
      },
    };

    onAddNewJob(newJob);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setIsAddJobModalOpen(false);
    setJobTitle('');
    setJobDesc('');
  };

  return (
    <div id="mueeni-provider-screen" className="space-y-5 pb-24 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-md border border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-700 text-white">
              Service Provider Portal
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              بوابة مقدم الخدمة والمنشآت
            </h1>
            <p className="text-xs text-indigo-100 mt-1 max-w-md leading-relaxed">
              إدارة العروض الحصرية، طرح الفرص الوظيفية المواءمة، وتحديث مصفوفة التهيئة اللوجستية.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-200 border border-white/20">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Switcher Tabs */}
      <div className="flex rounded-2xl bg-slate-200/80 p-1.5 border border-slate-300 shadow-2xs">
        <button
          id="provider-tab-offers-btn"
          onClick={() => setActiveTab('offers')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'offers'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>لوحة إدارة العروض والخصومات</span>
        </button>

        <button
          id="provider-tab-careers-btn"
          onClick={() => setActiveTab('careers')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'careers'
              ? 'bg-indigo-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>بوابة طرح الفرص والتهيئة</span>
        </button>
      </div>

      {/* View 1: Manage Offers */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          {/* Dashboard Stats matching prototype */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-3xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">الفئات المتاحة</span>
              <span className="text-xl font-black text-indigo-900 font-mono">12</span>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">المشاهدات</span>
              <span className="text-xl font-black text-emerald-700 font-mono">1,248</span>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">العروض النشطة</span>
              <span className="text-xl font-black text-indigo-900 font-mono">
                {initialOffers.length}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              قائمة العروض والخصومات الخاصة بمنشأتك
            </h3>
            <button
              id="open-add-offer-btn"
              onClick={() => setIsAddOfferModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة عرض جديد</span>
            </button>
          </div>

          {/* Offers list */}
          <div className="space-y-3">
            {initialOffers.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-3xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs font-black text-rose-600 font-mono">
                        {item.discount}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1 truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      الكود: {item.promoCode} • ينتهي: {item.validUntil}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black shrink-0">
                  نشط
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Manage Careers & Logistics Readiness */}
      {activeTab === 'careers' && (
        <div className="space-y-4">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-3xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">الفرص النشطة</span>
              <span className="text-xl font-black text-indigo-900 font-mono">
                {initialJobs.length}
              </span>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">طلبات التوظيف</span>
              <span className="text-xl font-black text-emerald-700 font-mono">89</span>
            </div>
            <div className="p-4 rounded-3xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">التدريب التعاوني</span>
              <span className="text-xl font-black text-indigo-900 font-mono">4</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-sm text-slate-900">
              الفرص الوظيفية والتدريبية المطروحة
            </h3>
            <button
              id="open-add-job-btn"
              onClick={() => setIsAddJobModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>طرح فرصة جديدة</span>
            </button>
          </div>

          {/* Jobs list */}
          <div className="space-y-3">
            {initialJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {job.type} • {job.location}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                      {job.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {job.salary || 'مكافأة معتمدة'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1 border-t border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>التهيئة اللوجستية: تم اعتماد المنحدرات والمصاعد والمواقف المخصصة</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Offer Modal */}
      {isAddOfferModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">
                إضافة عرض وخصم تجاري جديد
              </h2>
              <button
                onClick={() => setIsAddOfferModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  عنوان العرض:
                </label>
                <input
                  type="text"
                  placeholder="مثال: خصم 20% على المأكولات والمشروبات..."
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    نسبة الخصم:
                  </label>
                  <input
                    type="text"
                    value={offerDiscount}
                    onChange={(e) => setOfferDiscount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    كود الخصم الترويجي:
                  </label>
                  <input
                    type="text"
                    value={offerPromo}
                    onChange={(e) => setOfferPromo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  فئة النشاط:
                </label>
                <select
                  value={offerCategory}
                  onChange={(e) => setOfferCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-bold bg-white"
                >
                  <option value="cafes">مطاعم وكافيهات</option>
                  <option value="hotels">فنادق وإقامة</option>
                  <option value="shopping">قسائم وتسوق</option>
                  <option value="health">صحة وعناية</option>
                  <option value="travel">طيران ومواصلات</option>
                </select>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddOfferModalOpen(false)}
                  className="px-4 py-2 rounded-2xl text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-indigo-700 text-white font-bold"
                >
                  نشر العرض فورياً
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Job Opportunity Modal with Logistics Accessibility Matrix Builder */}
      {isAddJobModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-indigo-50/70">
              <h2 className="text-base font-black text-slate-900">
                طرح فرصة وظيفية أو تدريبية مواءمة
              </h2>
              <button
                onClick={() => setIsAddJobModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  المسمى الوظيفي:
                </label>
                <input
                  type="text"
                  placeholder="مثال: مطور ويب، مسؤول علاقات عملاء..."
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    النوع:
                  </label>
                  <select
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-bold bg-white"
                  >
                    <option value="jobs">وظيفة رسمية</option>
                    <option value="training">تدريب تعاوني</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    الراتب / المكافأة:
                  </label>
                  <input
                    type="text"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-bold"
                  />
                </div>
              </div>

              {/* Logistics Matrix Checkboxes */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-extrabold text-slate-900 block">
                  مصفوفة التهيئة اللوجستية لمقر العمل:
                </span>
                <p className="text-[11px] text-slate-500">
                  حدد التجهيزات المتوفرة في منشأتك لتسهيل مواءمة المتقدمين:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={matrixRamps}
                      onChange={(e) => setMatrixRamps(e.target.checked)}
                      className="rounded-sm text-indigo-600"
                    />
                    <span>منحدرات حركة ومصاعد</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={matrixParking}
                      onChange={(e) => setMatrixParking(e.target.checked)}
                      className="rounded-sm text-indigo-600"
                    />
                    <span>مواقف مخصصة قريبة</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={matrixPaths}
                      onChange={(e) => setMatrixPaths(e.target.checked)}
                      className="rounded-sm text-indigo-600"
                    />
                    <span>مسارات بصرية وإرشادية</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={matrixTech}
                      onChange={(e) => setMatrixTech(e.target.checked)}
                      className="rounded-sm text-indigo-600"
                    />
                    <span>تكنولوجيا وبرمجيات مساعدة</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddJobModalOpen(false)}
                  className="px-4 py-2 rounded-2xl text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-indigo-700 text-white font-bold"
                >
                  طرح الفرصة في البوابة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
