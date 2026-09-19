import React, { useState } from 'react';
import {
  WalletDocument
} from '../types';
import {
  Wallet,
  Car,
  Bus,
  Plane,
  ShieldCheck,
  FileHeart,
  QrCode,
  Plus,
  X,
  CheckCircle2,
  Share2,
  Download,
  Calendar,
  Lock,
  ChevronLeft,
  Sparkles,
  FileText,
  UploadCloud,
  Check,
  Bot,
  AlertCircle,
  Eye,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DigitalWalletViewProps {
  documents: WalletDocument[];
  onAddDocument: (doc: WalletDocument) => void;
  embedded?: boolean;
}

export const DigitalWalletView: React.FC<DigitalWalletViewProps> = ({
  documents,
  onAddDocument,
  embedded = false,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<'verified' | 'my_documents'>('verified');
  const [selectedDoc, setSelectedDoc] = useState<WalletDocument | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Document Upload State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'medical_file' | 'certificate' | 'report'>('medical_file');
  const [uploadAllowAI, setUploadAllowAI] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>('تقرير_تأهيل_طبي_2024.pdf');
  const [uploadFileSize, setUploadFileSize] = useState('1.8 MB (PDF)');

  const verifiedDocs = documents.filter((d) => d.category !== 'my_documents');
  const myDocs = documents.filter((d) => d.category === 'my_documents');

  const getDocIcon = (name: string, type?: string) => {
    if (type === 'certificate') return Award;
    if (type === 'medical_file' || name === 'FileHeart') return FileHeart;
    switch (name) {
      case 'Car':
        return Car;
      case 'Bus':
        return Bus;
      case 'Plane':
        return Plane;
      case 'Award':
        return Award;
      default:
        return ShieldCheck;
    }
  };

  const getColorClasses = (scheme: string) => {
    switch (scheme) {
      case 'green':
        return {
          bg: 'from-[#00875a] to-[#015e3e]',
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          accent: 'text-emerald-700',
        };
      case 'blue':
        return {
          bg: 'from-[#026aa7] to-[#014a75]',
          badge: 'bg-blue-100 text-blue-900 border-blue-300',
          accent: 'text-blue-700',
        };
      case 'purple':
        return {
          bg: 'from-[#5e35b1] to-[#3f1d82]',
          badge: 'bg-purple-100 text-purple-900 border-purple-300',
          accent: 'text-purple-700',
        };
      case 'teal':
        return {
          bg: 'from-[#00796b] to-[#004d40]',
          badge: 'bg-teal-100 text-teal-900 border-teal-300',
          accent: 'text-teal-700',
        };
      case 'indigo':
      default:
        return {
          bg: 'from-[#283593] to-[#1a237e]',
          badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          accent: 'text-indigo-700',
        };
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newDoc: WalletDocument = {
      id: `doc-${Date.now()}`,
      title: uploadTitle,
      category: 'my_documents',
      type: uploadCategory,
      issuer: 'تم رفعه بواسطة المستخدم',
      code: `USER-DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      expiryDate: 'غير محدد',
      iconName: uploadCategory === 'certificate' ? 'Award' : 'FileHeart',
      colorScheme: uploadCategory === 'certificate' ? 'slate' : 'indigo',
      fileSize: uploadFileSize,
      isVerified: false,
      allowAI: uploadAllowAI,
      fileUrl: '#',
      details: {
        'اسم الملف': uploadedFileName || 'مستند_مرفوع.pdf',
        'حجم الملف': uploadFileSize,
        'المصدر': 'تم رفعه يدوياً بواسطة المستفيد',
        'إذن الذكاء الاصطناعي': uploadAllowAI ? 'مفعل (يتم الاستفادة منه في التوجيه والتخصيص)' : 'معطل',
      },
    };

    onAddDocument(newDoc);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
    setIsAddModalOpen(false);
    setUploadTitle('');
    setActiveCategoryTab('my_documents');
  };

  return (
    <div id="mueeni-wallet-screen" className={`space-y-5 ${embedded ? '' : 'pb-28'} animate-fade-in`}>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 shadow-md border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-700 text-white">
              Digital Wallet & Passes
            </span>
            <h1 className="text-2xl font-black text-white mt-1">
              المحفظة الرقمية
            </h1>
            <p className="text-xs text-purple-100 mt-1 max-w-md leading-relaxed">
              بطاقاتك وتصاريحك الموثقة ومستنداتك الشخصية في مكان واحد آمن وسهل الإبراز.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-purple-200 border border-white/20">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Two Main Category Switcher Tabs */}
      <div className="flex rounded-2xl bg-slate-200/80 p-1.5 border border-slate-300 shadow-2xs">
        <button
          id="wallet-tab-verified-btn"
          onClick={() => setActiveCategoryTab('verified')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeCategoryTab === 'verified'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>البطاقات والمستندات الموثقة ({verifiedDocs.length})</span>
        </button>

        <button
          id="wallet-tab-my-docs-btn"
          onClick={() => setActiveCategoryTab('my_documents')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeCategoryTab === 'my_documents'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>مستنداتي الشخصية ({myDocs.length})</span>
        </button>
      </div>

      {/* Section A: Verified & Connected Documents */}
      {activeCategoryTab === 'verified' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                البطاقات الرسمية المربوطة إلكترونياً
              </h3>
              <p className="text-[11px] text-slate-500">
                موثقة ومحدثة آلياً عبر نفاذ والجهات الحكومية
              </p>
            </div>
            <span className="text-[11px] text-emerald-800 bg-emerald-100 font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
              <Check className="w-3.5 h-3.5" />
              <span>ربط نشط</span>
            </span>
          </div>

          <div className="space-y-3">
            {verifiedDocs.map((doc) => {
              const Icon = getDocIcon(doc.iconName, doc.type);
              const color = getColorClasses(doc.colorScheme);

              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color.bg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full shrink-0 flex items-center gap-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>موثقة ومربوطة</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold truncate mt-0.5">
                        {doc.issuer}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span>الرقم: {doc.code}</span>
                        {doc.expiryDate && <span>• الصلاحية: {doc.expiryDate}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section B: My Personal Documents */}
      {activeCategoryTab === 'my_documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                المستندات والتقارير المرفوعة
              </h3>
              <p className="text-[11px] text-slate-500">
                الملفات والشهادات والتقارير الطبية الخاصة بك
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة مستند</span>
            </button>
          </div>

          <div className="space-y-3">
            {myDocs.map((doc) => {
              const Icon = getDocIcon(doc.iconName, doc.type);

              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.2 rounded-full shrink-0">
                          {doc.fileSize || 'PDF'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        المصدر: تم رفعه بواسطة المستخدم • تاريخ الرفع: {doc.issueDate}
                      </p>
                      
                      {/* AI Access Indicator */}
                      <div className="mt-1 flex items-center gap-1.5">
                        {doc.allowAI ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Bot className="w-3 h-3 text-emerald-600" />
                            <span>متاح للذكاء الاصطناعي للتوجيه</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Lock className="w-3 h-3 text-slate-400" />
                            <span>خاص (محجوب عن المساعد)</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="عرض المستند"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New Document Primary Action */}
      <div className="pt-2">
        <button
          id="add-new-document-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>+ إضافة مستند أو تقرير شخصي جديد</span>
        </button>
      </div>

      {/* Single Document Full Verifiable Modal with Full Details & Clean Security QR */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Digital Card Pass Header */}
            <div
              className={`p-6 bg-gradient-to-br ${
                getColorClasses(selectedDoc.colorScheme).bg
              } text-white relative overflow-hidden`}
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/25">
                    {React.createElement(getDocIcon(selectedDoc.iconName, selectedDoc.type), {
                      className: 'w-5 h-5',
                    })}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                      {selectedDoc.category === 'verified'
                        ? 'وثيقة وطنية رقمية موثقة'
                        : 'مستند شخصي للمستفيد'}
                    </span>
                    <h2 className="text-lg font-black text-white">
                      {selectedDoc.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDoc(null)}
                  className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/90">
                <span>{selectedDoc.issuer}</span>
                <span className="font-mono">{selectedDoc.code}</span>
              </div>
            </div>

            {/* Content & Verification */}
            <div className="p-6 overflow-y-auto space-y-4 text-center">
              {selectedDoc.category === 'verified' ? (
                <div className="inline-block p-4 rounded-3xl bg-slate-50 border-2 border-dashed border-emerald-500/50 shadow-inner">
                  {/* Clean SVG QR */}
                  <div className="w-40 h-40 mx-auto bg-white p-2 rounded-2xl shadow-xs flex flex-col items-center justify-center relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                      <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
                      <rect x="12" y="12" width="11" height="11" fill="currentColor" />
                      <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
                      <rect x="77" y="12" width="11" height="11" fill="currentColor" />
                      <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5" />
                      <rect x="12" y="77" width="11" height="11" fill="currentColor" />
                      <rect x="36" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="48" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="40" y="20" width="6" height="6" fill="currentColor" />
                      <rect x="52" y="20" width="6" height="6" fill="currentColor" />
                      <rect x="8" y="40" width="6" height="6" fill="currentColor" />
                      <rect x="20" y="40" width="6" height="6" fill="currentColor" />
                      <rect x="36" y="36" width="28" height="28" fill="#00875a" rx="4" />
                      <circle cx="50" cy="50" r="7" fill="white" />
                      <circle cx="50" cy="50" r="3.5" fill="#00875a" />
                      <rect x="70" y="40" width="6" height="6" fill="currentColor" />
                      <rect x="85" y="40" width="6" height="6" fill="currentColor" />
                      <rect x="40" y="70" width="6" height="6" fill="currentColor" />
                      <rect x="75" y="75" width="15" height="15" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold mt-2 block">
                    الرمز المشفر: {selectedDoc.qrData || selectedDoc.code}
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <FileText className="w-10 h-10 text-indigo-600 mx-auto" />
                  <h4 className="font-bold text-slate-800 text-sm">{selectedDoc.title}</h4>
                  <p className="text-xs text-slate-500">
                    ملف رقمي مؤمن ومحفوظ في سحابة مُعِيني الخاصة
                  </p>
                </div>
              )}

              {/* Document Details Table */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">تاريخ الإصدار / الرفع:</span>
                  <span className="font-bold text-slate-800">{selectedDoc.issueDate}</span>
                </div>
                {selectedDoc.expiryDate && (
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">تاريخ الصلاحية:</span>
                    <span className="font-bold text-emerald-700">{selectedDoc.expiryDate}</span>
                  </div>
                )}
                {Object.entries(selectedDoc.details).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">{key}:</span>
                    <span className="font-bold text-slate-800">{val}</span>
                  </div>
                ))}
              </div>

              {/* Verification Stamp */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {selectedDoc.category === 'verified'
                    ? 'تم التحقق إلكترونياً ومطابق للمعايير الوطنية'
                    : 'محفوظ ومتاح للاستخدام في خدمات التمكين'}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  alert('تم تنزيل الوثيقة الرقمية بنجاح.');
                }}
                className="px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل نسخة</span>
              </button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="px-6 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Add Document Modal with AI Permission Toggle */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  إضافة مستند شخصي للمحفظة
                </h2>
                <p className="text-[11px] text-slate-500">
                  ارفع تقاريرك الطبية أو شهاداتك للوصول السريع
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              {/* Step 1: File Upload Area */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  اختر الملف (PDF أو صورة):
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-400 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-emerald-700 mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-xs">
                    {uploadedFileName || 'اضغط هنا لاختيار ملف من جهازك'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    PDF, JPG, PNG حتى 15 ميجابايت
                  </span>
                </div>
              </div>

              {/* Step 2: Document Title */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  اسم المستند:
                </label>
                <input
                  type="text"
                  placeholder="مثال: تقرير التأهيل الشامل 2024..."
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-medium focus:border-emerald-600 outline-hidden"
                  required
                />
              </div>

              {/* Step 3: Category */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  فئة المستند:
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-slate-900 font-bold bg-white focus:border-emerald-600 outline-hidden"
                >
                  <option value="medical_file">تقرير طبي أو تأهيلي</option>
                  <option value="certificate">شهادة تدريب أو دورة</option>
                  <option value="report">وثيقة توظيف أو عقد عمل</option>
                </select>
              </div>

              {/* Step 4: AI Reading Permission Setting */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 space-y-1.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uploadAllowAI}
                    onChange={(e) => setUploadAllowAI(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded-sm text-emerald-700 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">
                      السماح للذكاء الاصطناعي بقراءة هذا المستند لتقديم التوجيه
                    </span>
                    <p className="text-[10.5px] text-slate-600 leading-relaxed mt-0.5">
                      يساعد المستشار الذكي على تخصيص الإجابات واقتراح الفرص الوظيفية والتأهيلية المتوافقة تماماً مع احتياجك.
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-xs"
                >
                  حفظ المستند في المحفظة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

