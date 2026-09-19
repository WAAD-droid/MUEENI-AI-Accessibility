import React from 'react';
import { Logo } from '../Logo';
import {
  Sliders,
  ArrowLeft,
  Building2,
  User,
  Volume2,
  VolumeX,
  Languages
} from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderEnProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenAccessibility: () => void;
  unreadAlertsCount?: number;
  userRole: UserRole;
  onToggleRole?: () => void;
  screenReaderActive?: boolean;
  onToggleScreenReader?: () => void;
  activeTab?: string;
  onNavigateTab?: (tab: string) => void;
  onOpenProfile?: () => void;
  onToggleLanguage?: () => void;
}

export const HeaderEn: React.FC<HeaderEnProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  onOpenAccessibility,
  unreadAlertsCount = 2,
  userRole,
  onToggleRole,
  screenReaderActive,
  onToggleScreenReader,
  onNavigateTab,
  onOpenProfile,
  onToggleLanguage,
}) => {
  return (
    <header
      id="app-main-header-en"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-3.5 py-2.5 sm:px-6 transition-all"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left in LTR (Start): Back button or Main Logo */}
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack ? (
            <button
              id="header-back-btn-en"
              onClick={onBack}
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all focus:ring-2 focus:ring-emerald-500 shrink-0"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
          ) : (
            <div
              className="cursor-pointer shrink-0"
              onClick={() => onNavigateTab && onNavigateTab('assistant')}
            >
              <Logo size="sm" horizontal showSubtitle={false} lang="en" />
            </div>
          )}

          {title && (
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <span className="text-[10.5px] text-slate-500 font-medium font-sans truncate hidden sm:block">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right in LTR (End): Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switcher to Arabic */}
          {onToggleLanguage && (
            <button
              id="header-language-toggle-en"
              onClick={onToggleLanguage}
              title="التبديل إلى اللغة العربية"
              aria-label="Switch to Arabic language"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold transition-all border border-slate-200 hover:border-emerald-300"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-['Cairo',sans-serif]">العربية</span>
            </button>
          )}

          {/* Quick Voice Narration Toggle */}
          {onToggleScreenReader && (
            <button
              id="header-quick-voice-btn-en"
              onClick={onToggleScreenReader}
              title={screenReaderActive ? 'Mute voice reader' : 'Turn on voice reader'}
              aria-label="Toggle voice reader"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center transition-all ${
                screenReaderActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {screenReaderActive ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Portal Switch (Beneficiary / Provider) */}
          {onToggleRole && (
            <button
              id="header-switch-portal-btn-en"
              onClick={onToggleRole}
              aria-label="Toggle portal between Beneficiary and Service Provider"
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl text-xs font-bold transition-all border ${
                userRole === 'provider'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {userRole === 'provider' ? (
                <>
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Enterprise Portal</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5" />
                  <span>Beneficiary Portal</span>
                </>
              )}
            </button>
          )}

          {/* Accessibility Controls Button */}
          <button
            id="header-accessibility-btn-en"
            onClick={onOpenAccessibility}
            aria-label="Open accessibility settings panel"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-all focus:ring-2 focus:ring-emerald-400"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Accessibility</span>
          </button>

          {/* Dedicated Profile Button */}
          <button
            id="header-my-profile-btn-en"
            onClick={() => {
              if (onOpenProfile) {
                onOpenProfile();
              } else if (onNavigateTab) {
                onNavigateTab('profile');
              }
            }}
            aria-label="Navigate to my personal profile"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 font-black text-xs transition-all shadow-2xs active:scale-95"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
              A
            </div>
            <span className="whitespace-nowrap">My Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};
