import React, { useState } from 'react';
import {
  Flame,
  Plus,
  Calendar,
  MapPin,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowLeft,
  X,
  Eye,
  Send,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ProviderCampaignItem {
  id: string;
  name: string;
  description: string;
  purpose: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'active' | 'upcoming' | 'completed';
  participantsCount: number;
  featuredOffersCount: number;
}

const initialProviderCampaigns: ProviderCampaignItem[] = [
  {
    id: 'camp-1',
    name: 'مبادرة السبت البنفسجي السنوية 2024',
    description: 'المشاركة كشريك استراتيجي في الحدث الوطني الأكبر لدعم وتمكين الأشخاص ذوي الإعاقة عبر تقديم عروض حصرية وتخفيضات 50% على الأجهزة والباقات.',
    purpose: 'تعزيز جودة الحياة، وتوسيع الشمولية الرقمية، ومساندة العائلات من خلال تخفيض الأعباء المالية وتقديم أحدث الأجهزة الذكية الميسرة.',
    targetAudience: 'حاملو بطاقات التسهيلات المرورية وبطاقات مُعِيني الرقمية وذوو الإعاقة وأسرهم',
    startDate: '2024/07/01',
    endDate: '2024/07/31',
    location: 'جميع الفروع في كافة مناطق المملكة وعبر المتجر الإلكتروني',
    status: 'active',
    participantsCount: 2140,
    featuredOffersCount: 8,
  },
  {
    id: 'camp-2',
    name: 'حملة اليوم الوطني السعودي 94 للوصول الشامل',
    description: 'إطلاق حزمة متكاملة من الخدمات التسهيلية والفعاليات الميدانية في الفروع المجهزة، مع توزيع 1000 جهاز لوحي ذكي للطلاب المتميزين من ذوي الإعاقة.',
    purpose: 'الاحتفاء باليوم الوطني من خلال ترسيخ مبادئ التكافل والمواطنة الشاملة وتمكين الطلاب في مستهل العام الدراسي الجديد.',
    targetAudience: 'الطلاب الجامعيون والمهنيون من ذوي الإعاقة الحركية والسمعية والبصرية',
    startDate: '2024/09/20',
    endDate: '2024/09/26',
    location: 'الرياض، جدة، الدمام، وعبر البوابة الوطنية',
    status: 'upcoming',
    participantsCount: 1280,
    featuredOffersCount: 5,
  },
  {
    id: 'camp-3',
    name: 'ملتقى التوظيف الشامل ومواءمة بيئات العمل',
    description: 'معرض وورش عمل تفاعلية موجهة لربط الكفاءات الوطنية من ذوي الإعاقة بالوظائف التقنية والإدارية المواءمة والمجهزة لوجستياً بالكامل.',
    purpose: 'تفعيل الاستدامة الوظيفية وتحقيق مستهدفات كود البناء السعودي للوصول الشامل وشهادة مواءمة في مقرات العمل.',
    targetAudience: 'الباحثون عن عمل والخريجون الجدد من الأشخاص ذوي الإعاقة',
    startDate: '2024/05/10',
    endDate: '2024/05/14',
    location: 'مركز الملك عبد الله المالي (KAFD) - الرياض وعبر البث الافتراضي',
    status: 'completed',
    participantsCount: 890,
    featuredOffersCount: 12,
  }
];

interface ProviderCampaignsViewProps {
  onNavigate?: (tab: string) => void;
}

export const ProviderCampaignsView: React.FC<ProviderCampaignsViewProps> = ({ onNavigate }) => {
  const [campaigns, setCampaigns] = useState<ProviderCampaignItem[]>(initialProviderCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<ProviderCampaignItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Campaign Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const newCampaign: ProviderCampaignItem = {
      id: `camp-${Date.now()}`,
      name,
      description,
      purpose: purpose || 'مبادرة تمكينية لدعم الأشخاص ذوي الإعاقة وتعزيز الاندماج الاجتماعي.',
      targetAudience: targetAudience || 'جميع فئات الأشخاص ذوي الإعاقة وأسرهم',
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || '2025/12/31',
      location: location || 'الفروع وعبر المنصة الرقمية',
      status: 'active',
      participantsCount: 0,
      featuredOffersCount: 1,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsCreateModalOpen(false);
    confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });

    // Reset Form
    setName('');
    setDescription('');
    setPurpose('');
    setTargetAudience('');
    setStartDate('');
    setEndDate('');
    setLocation('');
  };

  return (
    <div id="mueeni-provider-campaigns-screen" className="space-y-6 pb-20 animate-fade-in text-right" dir="rtl">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-purple-500/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-purple-300" />
                <span>إدارة الحملات والمبادرات الوطنية</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              حملات ومبادرات المنشأة
            </h1>
            <p className="text-xs text-purple-100 mt-1 max-w-lg leading-relaxed">
              إطلاق ورعاية الحملات التمكينية وتتبع أثر المشاركة في السبت البنفسجي والمناسبات الوطنية
            </p>
          </div>

          <button
            id="btn-create-campaign-modal"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء حملة جديدة</span>
          </button>
        </div>
      </section>

      {/* Campaigns Summary Cards */}
      <section className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[11px] font-bold text-slate-500 block">الحملات النشطة</span>
          <span className="text-2xl font-black text-purple-900 font-mono mt-1 block">
            {campaigns.filter((c) => c.status === 'active').length}
          </span>
          <span className="text-[10px] text-purple-600 font-bold mt-0.5 block">تستقبل المستفيدين</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[11px] font-bold text-slate-500 block">المستفيدون المشاركون</span>
          <span className="text-2xl font-black text-indigo-900 font-mono mt-1 block">4,310+</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">عبر البطاقات الرقمية</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[11px] font-bold text-slate-500 block">إجمالي الحملات</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{campaigns.length}</span>
          <span className="text-[10px] text-slate-500 font-bold mt-0.5 block">مبادرات معتمدة</span>
        </div>
      </section>

      {/* Campaign List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-slate-900">
            قائمة الحملات والمبادرات
          </h2>
          <span className="text-xs text-slate-500 font-bold">
            {campaigns.length} مبادرة
          </span>
        </div>

        <div className="space-y-4">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-3"
            >
              {/* Top Row: Name, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {camp.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1 ${
                      camp.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : camp.status === 'upcoming'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {camp.status === 'active'
                        ? 'نشطة حالياً'
                        : camp.status === 'upcoming'
                        ? 'قادمة قريباً'
                        : 'مكتملة'}
                    </span>
                  </span>

                  <button
                    onClick={() => setSelectedCampaign(camp)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>عرض التفاصيل</span>
                  </button>
                </div>
              </div>

              {/* Description & Purpose */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {camp.description}
              </p>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <div className="flex items-start gap-1.5">
                  <Target className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">الهدف من الحملة: </strong>
                    <span className="text-slate-600">{camp.purpose}</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 pt-1">
                  <Users className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">الفئة المستهدفة: </strong>
                    <span className="text-slate-600">{camp.targetAudience}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Meta Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    <strong>الفترة: </strong> {camp.startDate} - {camp.endDate}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    <strong>المقر: </strong> {camp.location}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-purple-800 font-bold">
                  <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>
                    <strong>المستفيدون المشاركون: </strong> {camp.participantsCount} مستفيد
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-purple-700" />
                <span>تفاصيل الحملة والمبادرة</span>
              </h3>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-500 block">اسم الحملة</span>
                <p className="text-sm font-black text-slate-900 mt-0.5">{selectedCampaign.name}</p>
              </div>

              <div>
                <span className="font-bold text-slate-500 block">الوصف التفصيلي</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedCampaign.description}</p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
                <div>
                  <span className="font-bold text-purple-900 block">الهدف والغايات</span>
                  <p className="text-purple-950 mt-0.5 leading-relaxed">{selectedCampaign.purpose}</p>
                </div>
                <div>
                  <span className="font-bold text-purple-900 block">الفئات المستهدفة</span>
                  <p className="text-purple-950 mt-0.5">{selectedCampaign.targetAudience}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-500 block">تاريخ البدء</span>
                  <span className="font-bold text-slate-900">{selectedCampaign.startDate}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-500 block">تاريخ الانتهاء</span>
                  <span className="font-bold text-slate-900">{selectedCampaign.endDate}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-500 block">نطاق الإقامة والموقع</span>
                <p className="text-slate-700 mt-0.5">{selectedCampaign.location}</p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-900 block">إجمالي المستفيدين المخدومين</span>
                  <span className="text-xs text-emerald-700">تفاعل مؤكد عبر البوابة</span>
                </div>
                <span className="text-xl font-black text-emerald-800 font-mono">
                  {selectedCampaign.participantsCount}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-700" />
                <span>إطلاق حملة ومبادرة جديدة</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم الحملة / المبادرة *</label>
                <input
                  type="text"
                  placeholder="مثال: مبادرة التمكين الشامل في موسم الرياض..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الوصف التفصيلي *</label>
                <textarea
                  rows={2}
                  placeholder="شرح أهداف وأنشطة الحملة..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الغرض والهدف من الحملة</label>
                <input
                  type="text"
                  placeholder="تعزيز الوصول والشمولية وتوفير تسهيلات حصرية..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الفئة المستهدفة</label>
                <input
                  type="text"
                  placeholder="ذوو الإعاقة الحركية، السمعية، البصرية، والمرافقون..."
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">تاريخ البدء</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">تاريخ الانتهاء</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الموقع / النطاق</label>
                <input
                  type="text"
                  placeholder="المقرات الرئيسية، الفروع، أو عبر الإنترنت..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إطلاق الحملة الآن</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
