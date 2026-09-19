import React from 'react';
import {
  AccessibilitySettings
} from '../../types';
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

interface AccessibilityModalEnProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onReset?: () => void;
}

export const AccessibilityModalEn: React.FC<AccessibilityModalEnProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReset,
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

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      onUpdateSettings({
        textSize: 'normal',
        highContrast: false,
        darkMode: false,
        reducedMotion: false,
        dyslexiaFont: false,
        largeTouchTargets: true,
        largeTouch: true,
        screenReader: false,
        screenReaderEnabled: false,
      });
    }
  };

  return (
    <div
      id="accessibility-modal-backdrop-en"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-modal-title-en"
    >
      <div
        id="accessibility-modal-container-en"
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
              <h2 id="accessibility-modal-title-en" className="text-xl font-bold text-slate-900">
                Accessibility & Universal Design
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Customize the interface to suit all motor, visual, and cognitive needs
              </p>
            </div>
          </div>
          <button
            id="close-accessibility-modal-btn-en"
            onClick={onClose}
            aria-label="Close accessibility settings"
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
                <span className="font-bold text-slate-800 text-sm">Font Size & Typography</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {Math.round(currentScale * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="text-size-decrease-btn-en"
                onClick={() => {
                  const nextVal = Math.max(0.85, Number((currentScale - 0.1).toFixed(2)));
                  onUpdateSettings({ textSize: nextVal });
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Decrease text size"
              >
                A-
              </button>
              <input
                id="text-size-range-slider-en"
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
                aria-label="Font size level"
              />
              <button
                id="text-size-increase-btn-en"
                onClick={() => {
                  const nextVal = Math.min(1.35, Number((currentScale + 0.1).toFixed(2)));
                  onUpdateSettings({ textSize: nextVal });
                }}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Increase text size"
              >
                A+
              </button>
            </div>
          </div>

          {/* Quick Toggle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Screen Reader Voice Toggle */}
            <div
              onClick={() => {
                const nextState = !(settings.screenReader || settings.screenReaderEnabled);
                onUpdateSettings({ screenReader: nextState, screenReaderEnabled: nextState });
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.screenReader || settings.screenReaderEnabled
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.screenReader || settings.screenReaderEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {settings.screenReader || settings.screenReaderEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Voice Screen Reader</p>
                  <p className="text-[11px] text-slate-500">Read screen elements aloud</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.screenReader || settings.screenReaderEnabled ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {(settings.screenReader || settings.screenReaderEnabled) && <Check className="w-3.5 h-3.5" />}
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
                  <p className="font-bold text-sm text-slate-900">High Contrast</p>
                  <p className="text-[11px] text-slate-500">Enhanced borders and contrast</p>
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
              onClick={() => {
                const nextState = !(settings.largeTouchTargets || settings.largeTouch);
                onUpdateSettings({ largeTouchTargets: nextState, largeTouch: nextState });
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                settings.largeTouchTargets || settings.largeTouch
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    settings.largeTouchTargets || settings.largeTouch ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Large Touch Targets</p>
                  <p className="text-[11px] text-slate-500">Expanded click areas for motor ease</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  settings.largeTouchTargets || settings.largeTouch ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}
              >
                {(settings.largeTouchTargets || settings.largeTouch) && <Check className="w-3.5 h-3.5" />}
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
                  <p className="font-bold text-sm text-slate-900">Reduced Motion</p>
                  <p className="text-[11px] text-slate-500">Minimize animations and transitions</p>
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
                  <p className="font-bold text-sm text-slate-900">Comfort Dark Mode</p>
                  <p className="text-[11px] text-slate-500">Reduce glare and eye strain</p>
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
                  <p className="font-bold text-sm text-slate-900">Dyslexia-Friendly Font</p>
                  <p className="text-[11px] text-slate-500">Spaced typography for easier reading</p>
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
            id="reset-accessibility-btn-en"
            onClick={handleReset}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors py-2 px-3 rounded-xl hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button
            id="save-accessibility-btn-en"
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl shadow-sm transition-all focus:ring-2 focus:ring-emerald-500"
          >
            Save & Apply
          </button>
        </div>
      </div>
    </div>
  );
};
