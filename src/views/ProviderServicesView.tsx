import React, { useState } from 'react';
import {
  Tag,
  Building2,
  CheckCircle2,
  Edit3,
  Plus,
  Eye,
  Sliders,
  Sparkles,
  MapPin,
  Clock,
  X,
  Save,
  Globe,
  Check,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ProviderServiceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  accessibilityFeatures: string[];
  availability: string;
  status: 'active' | 'draft' | 'under_review';
  beneficiariesCount: number;
}

const initialServices: ProviderServiceItem[] = [
  {
    id: 'srv-1',
    name: 'باقة تمكين للاتصالات والبيانات الميسرة',
    description: 'تخفيض 50% دائم على جميع باقات المفوتر ومسبق الدفع وحزم الإنترنت فائق السرعة، مع دقائق وبيانات لا محدودة للتطبيقات الحكومية والتعليمية.',
    category: 'اتصالات وبيانات',
    accessibilityFeatures: [
      'خدمة عملاء مرئية بلغة الإشارة 24/7',
      'فواتير صوتية وإلكترونية متوافقة مع قارئات الشاشة',
      'إعفاء كامل من رسوم التأسيس والتوصيل المنزلي'
    ],
    availability: 'متاح في جميع الفروع وعبر تطبيق mystc الرقمي',
    status: 'active',
    beneficiariesCount: 1840,
  },
  {
    id: 'srv-2',
    name: 'خدمة العملاء المرئية الفورية بلغة الإشارة',
    description: 'اتصال مرئي مباشر وفوري مع موظفي خدمة عملاء ومترجمين معتمدين للغة الإشارة لإنهاء المعاملات، تفعيل الخدمات، والاستفسارات التقنية دون الحاجة لزيارة الفرع.',
    category: 'خدمة عملاء ودعم ميسر',
    accessibilityFeatures: [
      'فيديو عالي الدقة يدعم قراءة الشفاه ولغة الإشارة',
      'مترجمون معتمدون من الجمعية السعودية للإعاقة السمعية',
      'سرعة استجابة فورية خلال أقل من دقيقة'
    ],
    availability: 'متاح عبر التطبيق وعلى مدار الساعة طوال أيام الأسبوع',
    status: 'active',
    beneficiariesCount: 920,
  },
  {
    id: 'srv-3',
    name: 'الدعم الفني والصيانة المنزلية المخصصة',
    description: 'زيارة فنية مجانية لمقر سكن المستفيد لتركيب أجهزة الراوتر، تمديد الألياف الضوئية، وصيانة الأعطال مع مراعاة كاملة لاحتياجات الوصول للمستفيد.',
    category: 'صيانة ودعم فني ميداني',
    accessibilityFeatures: [
      'فنيون مدربون على بروتوكولات التعامل مع ذوي الإعاقة',
      'أولوية حجز المواعيد المنزلية وتأكيد عبر الرسائل النصية',
      'تركيب أجهزة ملحقة لتقوية الإشارة في أرجاء المنزل'
    ],
    availability: 'تغطية شاملة لكافة مدن ومحافظات المملكة',
    status: 'active',
    beneficiariesCount: 460,
  },
  {
    id: 'srv-4',
    name: 'برنامج الأجهزة الذكية والملحقات التقنية المساعدة',
    description: 'توفير هواتف ذكية وأجهزة لوحية داعمة للملحقات الصوتية وشاشات برايل الإلكترونية بتسهيلات دفع خاصة وأقساط ميسرة بدون فوائد لحاملي بطاقات مُعِيني.',
    category: 'أجهزة وتقنيات مساعدة',
    accessibilityFeatures: [
      'أجهزة مسبقة الضبط مع قارئات الشاشة ومكبرات النصوص',
      'ضمان شامل للأجهزة مع استبدال فوري عند الصيانة',
      'جلسة إرشادية مجانية لشرح مميزات سهولة الاستخدام'
    ],
    availability: 'متوفر في 45 فرعاً رئيسياً مجهزاً للوصول الشامل',
    status: 'active',
    beneficiariesCount: 680,
  }
];

interface ProviderServicesViewProps {
  onNavigate?: (tab: string) => void;
}

export const ProviderServicesView: React.FC<ProviderServicesViewProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<ProviderServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<ProviderServiceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('اتصالات وبيانات');
  const [newServiceAvailability, setNewServiceAvailability] = useState('متاح في الفروع وعبر التطبيق');
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [newFeaturesList, setNewFeaturesList] = useState<string[]>([
    'متوافق مع معايير الوصول الشامل',
    'أولوية خدمة لحاملي بطاقات مُعِيني'
  ]);

  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setNewFeaturesList([...newFeaturesList, newFeatureInput.trim()]);
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setNewFeaturesList(newFeaturesList.filter((_, i) => i !== index));
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServiceDesc.trim()) return;

    const newService: ProviderServiceItem = {
      id: `srv-${Date.now()}`,
      name: newServiceName,
      description: newServiceDesc,
      category: newServiceCategory,
      accessibilityFeatures: newFeaturesList.length > 0 ? newFeaturesList : ['خدمة ميسرة ومعتمدة'],
      availability: newServiceAvailability,
      status: 'active',
      beneficiariesCount: 0,
    };

    setServices([newService, ...services]);
    setIsAddModalOpen(false);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });

    // Reset Form
    setNewServiceName('');
    setNewServiceDesc('');
    setNewFeaturesList(['متوافق مع معايير الوصول الشامل']);
  };

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServices(services.map((s) => (s.id === editingService.id ? editingService : s)));
    setEditingService(null);
  };

  return (
    <div id="provider-services-screen" className="space-y-6 pb-20 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                لوحة إدارة الخدمات الميسرة
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                استعراض، تعديل وطرح الخدمات المصممة خصيصاً لدعم الأشخاص ذوي الإعاقة
              </p>
            </div>
          </div>
        </div>

        <button
          id="btn-add-new-service"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </section>

      {/* Summary Metrics */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">إجمالي الخدمات المعتمدة</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{services.length}</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">جميعها نشطة ومتاحة</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">المستفيدون المخدومون</span>
          <span className="text-2xl font-black text-indigo-900 font-mono mt-1 block">3,900+</span>
          <span className="text-[10px] text-indigo-600 font-bold mt-0.5 block">عبر البطاقات الرقمية</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">ميزات الوصول المعتمدة</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">14 ميزة</span>
          <span className="text-[10px] text-slate-500 font-bold mt-0.5 block">وفق كود الوصول الشامل</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 block">نسبة رضا المستفيدين</span>
          <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">98.2%</span>
          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">تقييم ممتاز ★★★★★</span>
        </div>
      </section>

      {/* Services List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-slate-900">
            قائمة الخدمات الحالية للمنشأة
          </h2>
          <span className="text-xs text-slate-500 font-bold">
            {services.length} خدمات مفعّلة
          </span>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-4"
            >
              {/* Top Meta: Category, Status, Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {service.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{service.status === 'active' ? 'نشط ومفعل' : 'مسودة'}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    {service.beneficiariesCount} مستفيد نشط
                  </span>
                  {/* Edit / Manage Button */}
                  <button
                    onClick={() => setEditingService(service)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل / إدارة</span>
                  </button>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  {service.description}
                </p>
              </div>

              {/* Accessibility Features */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 block">
                  ميزات وتسهيلات الوصول الشامل:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.accessibilityFeatures.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium">
                  <strong>نطاق الإتاحة:</strong> {service.availability}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit / Manage Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-700" />
                <span>إدارة وتعديل الخدمة</span>
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateService} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم الخدمة</label>
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">وصف الخدمة</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">التصنيف</label>
                  <input
                    type="text"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">حالة الخدمة</label>
                  <select
                    value={editingService.status}
                    onChange={(e) => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="active">نشط ومفعل</option>
                    <option value="draft">مسودة</option>
                    <option value="under_review">قيد المراجعة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الإتاحة ونطاق التقديم</label>
                <input
                  type="text"
                  value={editingService.availability}
                  onChange={(e) => setEditingService({ ...editingService, availability: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-700" />
                <span>طرح خدمة جديدة للمستفيدين</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم الخدمة *</label>
                <input
                  type="text"
                  placeholder="مثال: باقة النفاذ الرقمي الشامل..."
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">وصف الخدمة والمزايا المقدمة *</label>
                <textarea
                  rows={3}
                  placeholder="شرح تفصيلي لما تقدمه الخدمة وكيفية استفادة ذوي الإعاقة منها..."
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">التصنيف</label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                  >
                    <option value="اتصالات وبيانات">اتصالات وبيانات</option>
                    <option value="خدمة عملاء ودعم ميسر">خدمة عملاء ودعم ميسر</option>
                    <option value="صيانة ودعم فني ميداني">صيانة ودعم فني ميداني</option>
                    <option value="أجهزة وتقنيات مساعدة">أجهزة وتقنيات مساعدة</option>
                    <option value="تخفيضات تجارية">تخفيضات تجارية</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">الإتاحة</label>
                  <input
                    type="text"
                    placeholder="الفروع والتطبيق..."
                    value={newServiceAvailability}
                    onChange={(e) => setNewServiceAvailability(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              {/* Accessibility Features Adder */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">ميزات وتسهيلات الوصول</label>
                <div className="flex gap-1.5 mb-2">
                  <input
                    type="text"
                    placeholder="مثال: لغة الإشارة، قارئ الشاشة..."
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold"
                  >
                    إضافة
                  </button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {newFeaturesList.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>نشر الخدمة الآن</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
