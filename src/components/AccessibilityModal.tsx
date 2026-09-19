import React from 'react';
import {
  AccessibilitySettings
} from '../types';
import {
  Sliders,
  SunMedium,
  Moon,
  Volume2,
  VolumeX,
  Sparkles,
  MousePointerClick,
  Type,
  X,
  RotateCcw,
  Check
} from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onReset?: () => void;
  onToggleLanguage?: () => void;
  currentLanguage?: 'ar' | 'en';
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReset,
  onToggleLanguage,
  currentLanguage = 'ar',
}) => {
  if (!isOpen) return null;

  const currentScale =
    typeof settings?.textSize === 'number' && !isNaN(settings.textSize)
      ? settings.textSize
      : settings?.textSize === 'small'
      ? 0.9
      : settings?.textSize === 'large'
      ? 1.15
      : settings?.textSize === 'xlarge'
      ? 1.3
      : 1.0;

  return (
    <div
      id="accessibility-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-modal-title"
    >
      <div
        id="accessibility-modal-container"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 id="accessibility-modal-title" className="text-xl font-bold text-slate-900">
                إعدادات سهولة الوصول والشمولية
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                تخصيص الواجهة لتلائم كافة الاحتياجات الحركية والبصرية
              </p>
            </div>
          </div>
          <button
            id="close-accessibility-modal-btn"
            onClick={onClose}
            aria-label="إغلاق نافذة سهولة الوصول"
            className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors focus:ring-2 focus:ring-emerald-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Text Size Control */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-slate-800 text-sm">حجم الخط والنصوص</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {Math.round(currentScale * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="text-size-decrease-btn"
                onClick={() => {
                  const nextVal = Math.max(0.85, Number((currentScale - 0.1).toFixed(2)));
                  onUpdateSettings({ textSize: nextVal });
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="تصغير الخط"
              >
                A-
              </button>
              <input
                id="text-size-range-slider"
                type="range"
                min="0.85"
                max="1.35"
                step="0.05"
                value={currentScale}
                onChange={(e) => {
                  const parsed = parseFloat(e.target.value);
                  onUpdateSettings({ textSize: isNaN(parsed) ? 1.0 : parsed });
                }}
                className="flex-1 accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                aria-label="مستوى حجم الخط"
              />
              <button
                id="text-size-increase-btn"
                onClick={() => {
                  const nextVal = Math.min(1.35, Number((currentScale + 0.1).toFixed(2)));
                  onUpdateSettings({ textSize: nextVal });
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="تكبير الخط"
              >
                A+
              </button>
            </div>
          </div>

          {/* Quick Toggle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Screen Reader Voice Toggle */}
            <div
              onClick={() => onUpdateSettings({ screenReaderEnabled: !settings.screenReaderEnabled })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.screenReaderEnabled
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.screenReaderEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {settings.screenReaderEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">القارئ الصوتي التلقائي</p>
                  <p className="text-[11px] text-slate-500">نطق النصوص والعناصر بصوت مسموع</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.screenReaderEnabled ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {settings.screenReaderEnabled && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* High Contrast */}
            <div
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.highContrast
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.highContrast ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <SunMedium className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">تباين عالي (High Contrast)</p>
                  <p className="text-[11px] text-slate-500">وضوح فائق للنصوص والحدود</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.highContrast ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {settings.highContrast && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Large Touch Targets */}
            <div
              onClick={() => onUpdateSettings({ largeTouch: !settings.largeTouch })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.largeTouch
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.largeTouch ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">أزرار لمس كبيرة</p>
                  <p className="text-[11px] text-slate-500">توسيع مساحات النقر للتحكم الحركي</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.largeTouch ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {settings.largeTouch && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Reduced Motion */}
            <div
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.reducedMotion
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.reducedMotion ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">تقليل الحركة والانتقالات</p>
                  <p className="text-[11px] text-slate-500">إيقاف المؤثرات الحركية السريعة</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.reducedMotion ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {settings.reducedMotion && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Dark Mode */}
            <div
              onClick={() => onUpdateSettings({ darkMode: !settings.darkMode })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.darkMode
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.darkMode ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">النمط الداكن المريح</p>
                  <p className="text-[11px] text-slate-500">حماية العين وتقليل الوهج</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.darkMode ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {settings.darkMode && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            {/* Dyslexia / Extra Readable Font */}
            <div
              onClick={() => onUpdateSettings({ dyslexiaFont: !settings.dyslexiaFont })}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.dyslexiaFont
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.dyslexiaFont ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Type className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">خط القراءة الميسرة</p>
                  <p className="text-[11px] text-slate-500">مسافات متباعدة لتسهيل القراءة</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.dyslexiaFont ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {settings.dyslexiaFont && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            id="reset-accessibility-btn"
            onClick={
              onReset ||
              (() =>
                onUpdateSettings({
                  textSize: 'normal',
                  highContrast: false,
                  darkMode: false,
                  screenReader: false,
                  reducedMotion: false,
                  dyslexiaFont: false,
                  largeTouchTargets: true,
                }))
            }
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors py-2 px-3 rounded-xl hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4" />
            استعادة الإعدادات الافتراضية
          </button>
          <button
            id="save-accessibility-btn"
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl shadow-sm transition-all focus:ring-2 focus:ring-emerald-500"
          >
            حفظ وتطبيق
          </button>
        </div>
      </div>
    </div>
  );
};
