import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  ShieldCheck,
  Edit3,
  Sparkles,
  Accessibility,
  Tag,
  Save,
  X
} from 'lucide-react';

interface ProviderProfileData {
  companyName: string;
  serviceType: string;
  about: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  branchesCount: string;
  servicesProvided: string[];
  accessibilityFeatures: string[];
  verificationStatus: string;
  verificationBadge: string;
}

interface ProviderProfileViewProps {
  onNavigate?: (tab: string) => void;
}

export const ProviderProfileView: React.FC<ProviderProfileViewProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProviderProfileData>({
    companyName: 'شركة الاتصالات السعودية (STC)',
    serviceType: 'اتصالات وتقنية المعلومات وحلول التحول الرقمي',
    about: 'الممكّن الرقمي الرائد في المملكة العربية السعودية، نسعى لتقديم أرقى خدمات الاتصالات والحلول التقنية الميسرة، مع الالتزام التام بتمكين الأشخاص ذوي الإعاقة وتوفير بيئة رقمية وميدانية شاملة تلبي احتياجاتهم بأعلى المعايير.',
    phone: '900 / 0114555555',
    email: 'inclusion@stc.com.sa',
    website: 'https://www.stc.com.sa',
    location: 'الرياض - مجمع الملك عبد العزيز للاتصالات، حي النخيل',
    branchesCount: '140 فرعاً مجهزاً بالكامل في كافة مناطق المملكة',
    servicesProvided: [
      'باقات اتصالات وبيانات ميسرة بتخفيض 50% للمستفيدين المعتمدين',
      'خدمة العملاء المرئية الفورية بلغة الإشارة (فيديو كول مباشر)',
      'توفير هواتف ذكية وأجهزة لوحية داعمة للملحقات والمساعدات الصوتية',
      'شرائح مجانية للمستفيدين المسجلين في الضمان والتأهيل الشامل',
      'خدمة الصيانة والدعم الفني المنزلي لكبار السن وذوي الإعاقة الحركية'
    ],
    accessibilityFeatures: [
      'شهادة مواءمة الذهبية الصادرة من وزارة الموارد البشرية (98%)',
      'مداخل مجهزة بمنحدرات آلية متوافقة مع كود البناء السعودي للوصول الشامل',
      'مواقف سيارات خاصة واسعة ومحمية بالقرب من البوابات الرئيسية',
      'مسارات أرضية حسية (Braille tactile paving) وتوافق كامل لقارئات الشاشة',
      'مكاتب خدمة منخفضة ومناسبة لمستخدمي الكراسي المتحركة'
    ],
    verificationStatus: 'شريك استراتيجي موثق ومعتمد رسمياً',
    verificationBadge: 'موثق عبر هيئة رعاية الأشخاص ذوي الإعاقة (APD)'
  });

  const [editForm, setEditForm] = useState<ProviderProfileData>(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div id="mueeni-provider-profile-screen" className="space-y-6 pb-20 animate-fade-in">
      {/* Header Profile Card */}
      <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Logo / Profile Image */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-indigo-200 shrink-0">
              STC
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {profile.companyName}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{profile.verificationStatus}</span>
                </span>
              </div>
              <p className="text-xs font-bold text-indigo-700 mt-1">
                {profile.serviceType}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {profile.verificationBadge}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            id="btn-edit-provider-profile"
            onClick={() => {
              setEditForm(profile);
              setIsEditing(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <Edit3 className="w-4 h-4" />
            <span>تعديل الملف التعريفي</span>
          </button>
        </div>
      </section>

      {/* Edit Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-700" />
                <span>تعديل بيانات مقدم الخدمة</span>
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم المنشأة / مقدم الخدمة</label>
                <input
                  type="text"
                  value={editForm.companyName}
                  onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">نوع الخدمة / المجال</label>
                <input
                  type="text"
                  value={editForm.serviceType}
                  onChange={(e) => setEditForm({ ...editForm, serviceType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">نبذة عن مقدم الخدمة</label>
                <textarea
                  rows={3}
                  value={editForm.about}
                  onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 font-medium leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">رقم التواصل</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 font-medium text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 font-medium text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الموقع / العنوان</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الموقع الإلكتروني</label>
                <input
                  type="text"
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-indigo-600 font-medium text-left"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About & Contact Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* About Card */}
        <div className="md:col-span-2 bg-white rounded-3xl p-5 shadow-xs border border-slate-200/90 space-y-3">
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-700" />
            <span>نبذة عن مقدم الخدمة</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {profile.about}
          </p>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/90 space-y-3">
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-indigo-700" />
            <span>معلومات التواصل</span>
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-mono text-left" dir="ltr">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-mono text-left truncate" dir="ltr">{profile.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline truncate">
                {profile.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <section className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/90 space-y-3">
        <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-700" />
          <span>المقر والفروع</span>
        </h2>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-700 shrink-0" />
            <span className="font-bold text-slate-800">{profile.location}</span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 w-fit">
            {profile.branchesCount}
          </span>
        </div>
      </section>

      {/* Services Provided */}
      <section className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-700" />
            <span>الخدمات المقدمة للأشخاص ذوي الإعاقة</span>
          </h2>
          <span className="text-[11px] font-bold text-indigo-700">
            {profile.servicesProvided.length} خدمات مخصصة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {profile.servicesProvided.map((service, index) => (
            <div
              key={index}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5 text-xs text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility Information & Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Accessibility Information */}
        <section className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/90 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-teal-700" />
              <span>معلومات وتجهيزات الوصول الشامل</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              معتمد
            </span>
          </div>

          <div className="space-y-2">
            {profile.accessibilityFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-2 text-xs text-teal-950 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Verification & Compliance Status */}
        <section className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/90 space-y-3">
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-700" />
            <span>حالة التحقق والتوثيق الرسمي</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900">شهادة التوثيق الحكومي</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  سارية المفعول
                </span>
              </div>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                موثقة رسمياً عبر الربط مع هيئة رعاية الأشخاص ذوي الإعاقة (APD) ووزارة الموارد البشرية.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">السجل التجاري والترخيص المهني</span>
                <span className="text-[11px] text-slate-500 font-mono">CR-1010038290</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                مفعل 100%
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">مستوى الامتثال لمعايير مواءمة</span>
                <span className="text-[11px] text-slate-500">الفئة الذهبية للبيئات الميسرة</span>
              </div>
              <span className="text-xs font-extrabold text-indigo-700">98%</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
