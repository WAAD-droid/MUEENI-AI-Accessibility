import React, { useState, useEffect } from 'react';
import {
  AccessibilitySettings,
  UserProfile,
  UserRole,
  JobOpportunity,
  ReportItem,
  WalletDocument,
  SmartReminder,
  OfferItem,
  SeasonalCampaign
} from './types';

// Arabic Mock Data
import {
  initialUserProfile,
  initialJobs,
  initialReports,
  initialWalletDocs,
  initialReminders,
  initialOffers,
  purpleSaturdayCampaign
} from './data/mockData';

// English Mock Data
import {
  initialUserProfileEn,
  initialJobsEn,
  initialReportsEn,
  initialWalletDocsEn,
  initialRemindersEn,
  initialOffersEn,
  purpleSaturdayCampaignEn
} from './data/mockDataEn';

// Arabic Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AccessibilityModal } from './components/AccessibilityModal';
import { LoginView } from './views/LoginView';
import { HomeView } from './views/HomeView';
import { AIAssistantView } from './views/AIAssistantView';
import { JobsTrainingView } from './views/JobsTrainingView';
import { ReportingView } from './views/ReportingView';
import { OffersView } from './views/OffersView';
import { ProfileSchedulerView } from './views/ProfileSchedulerView';
import { SeasonalCampaignsView } from './views/SeasonalCampaignsView';
import { ProviderHomeView } from './views/ProviderHomeView';
import { ProviderProfileView } from './views/ProviderProfileView';
import { ProviderServicesView } from './views/ProviderServicesView';
import { ProviderCampaignsView } from './views/ProviderCampaignsView';
import { ProviderAnalyticsView } from './views/ProviderAnalyticsView';
import { ProviderPortalView } from './views/ProviderPortalView';
import { SupportFeaturesView } from './views/SupportFeaturesView';

// English Components
import { HeaderEn } from './components/en/HeaderEn';
import { BottomNavEn } from './components/en/BottomNavEn';
import { AccessibilityModalEn } from './components/en/AccessibilityModalEn';
import { LoginViewEn } from './views/en/LoginViewEn';
import { HomeViewEn } from './views/en/HomeViewEn';
import { AIAssistantViewEn } from './views/en/AIAssistantViewEn';
import { JobsTrainingViewEn } from './views/en/JobsTrainingViewEn';
import { ReportingViewEn } from './views/en/ReportingViewEn';
import { OffersViewEn } from './views/en/OffersViewEn';
import { ProfileSchedulerViewEn } from './views/en/ProfileSchedulerViewEn';
import { SeasonalCampaignsViewEn } from './views/en/SeasonalCampaignsViewEn';
import { ProviderHomeViewEn } from './views/en/ProviderHomeViewEn';
import { ProviderProfileViewEn } from './views/en/ProviderProfileViewEn';
import { ProviderServicesViewEn } from './views/en/ProviderServicesViewEn';
import { ProviderCampaignsViewEn } from './views/en/ProviderCampaignsViewEn';
import { ProviderAnalyticsViewEn } from './views/en/ProviderAnalyticsViewEn';
import { ProviderPortalViewEn } from './views/en/ProviderPortalViewEn';
import { SupportFeaturesViewEn } from './views/en/SupportFeaturesViewEn';

// Narrator utilities
import { speakArabic, speakEnglish, stopSpeaking } from './utils/narrator';

export function App() {
  // Language State: 'ar' (Arabic) or 'en' (English)
  const [language, setLanguage] = useState<'ar' | 'en'>(() => {
    try {
      const stored = localStorage.getItem('mueeni_language');
      if (stored === 'en' || stored === 'ar') return stored;
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('lang') === 'en' || window.location.pathname.startsWith('/en')) {
        return 'en';
      }
    } catch {
      // fallback
    }
    return 'ar';
  });

  // Authentication & Role (Starts at unauthenticated role selection)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('beneficiary');

  // Arabic Profile & States
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialUserProfile);
  const [jobs, setJobs] = useState<JobOpportunity[]>(initialJobs);
  const [reports, setReports] = useState<ReportItem[]>(initialReports);
  const [walletDocs, setWalletDocs] = useState<WalletDocument[]>(initialWalletDocs);
  const [reminders, setReminders] = useState<SmartReminder[]>(initialReminders);
  const [offers, setOffers] = useState<OfferItem[]>(initialOffers);
  const [campaign, setCampaign] = useState<SeasonalCampaign>(purpleSaturdayCampaign);

  // English Profile & States
  const [currentUserEn, setCurrentUserEn] = useState<UserProfile>(initialUserProfileEn);
  const [jobsEn, setJobsEn] = useState<JobOpportunity[]>(initialJobsEn);
  const [reportsEn, setReportsEn] = useState<ReportItem[]>(initialReportsEn);
  const [walletDocsEn, setWalletDocsEn] = useState<WalletDocument[]>(initialWalletDocsEn);
  const [remindersEn, setRemindersEn] = useState<SmartReminder[]>(initialRemindersEn);
  const [offersEn, setOffersEn] = useState<OfferItem[]>(initialOffersEn);
  const [campaignEn, setCampaignEn] = useState<SeasonalCampaign>(purpleSaturdayCampaignEn);

  // Navigation State (Exact 5-section: assistant, jobs, reports, offers, profile)
  const [activeTab, setActiveTab] = useState<string>('assistant');
  const [tabHistory, setTabHistory] = useState<string[]>(['assistant']);
  const [profileSubTab, setProfileSubTab] = useState<'info' | 'wallet' | 'reminders' | 'settings' | 'all'>('info');

  // Accessibility Settings State
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    textSize: 'normal',
    highContrast: false,
    colorBlindMode: 'none',
    largeTouchTargets: true,
    dyslexiaFont: false,
    reducedMotion: false,
    screenReader: false,
    darkMode: false,
  });

  // Apply Language & Direction dynamically to <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'en' ? 'ltr' : 'rtl');
    try {
      localStorage.setItem('mueeni_language', language);
    } catch {
      // storage unavailable
    }
  }, [language]);

  // Apply Accessibility Classes dynamically to <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // High Contrast
    if (accessibility.highContrast) {
      root.classList.add('theme-high-contrast');
    } else {
      root.classList.remove('theme-high-contrast');
    }

    // Dark Mode
    if (accessibility.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Large Targets
    if (accessibility.largeTouchTargets) {
      body.classList.add('large-targets');
    } else {
      body.classList.remove('large-targets');
    }

    // Dyslexia Font
    if (accessibility.dyslexiaFont) {
      body.classList.add('font-dyslexic');
    } else {
      body.classList.remove('font-dyslexic');
    }

    // Reduced Motion
    if (accessibility.reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }

    // Text Size
    root.classList.remove('text-size-small', 'text-size-normal', 'text-size-large', 'text-size-xlarge');
    if (typeof accessibility.textSize === 'number' && !isNaN(accessibility.textSize)) {
      root.style.setProperty('--text-scale', `${accessibility.textSize}`);
    } else {
      const scaleMap: Record<string, string> = {
        small: '0.9',
        normal: '1',
        large: '1.15',
        xlarge: '1.3',
      };
      root.style.setProperty('--text-scale', scaleMap[String(accessibility.textSize)] || '1');
      root.classList.add(`text-size-${accessibility.textSize}`);
    }
  }, [accessibility]);

  // Voice narration helper when screen reader is on
  const handleToggleScreenReader = () => {
    const nextVal = !accessibility.screenReader;
    setAccessibility((prev) => ({ ...prev, screenReader: nextVal }));
    if (nextVal) {
      if (language === 'en') {
        speakEnglish('Screen reader enabled for MUEENI smart accessibility platform.');
      } else {
        speakArabic('تم تفعيل القارئ الصوتي لمنصة مُعِيني الذكية.');
      }
    } else {
      stopSpeaking();
    }
  };

  // Switch between Arabic and English
  const handleToggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
    if (accessibility.screenReader) {
      if (nextLang === 'en') {
        speakEnglish('Switched to English interface.');
      } else {
        speakArabic('تم التبديل إلى الواجهة العربية.');
      }
    }
  };

  // Navigation handlers
  const handleNavigate = (tab: string) => {
    let targetTab = tab;
    if (targetTab === 'wallet') {
      setProfileSubTab('wallet');
      targetTab = 'profile';
    }

    if (targetTab === activeTab) return;
    setTabHistory((prev) => [...prev, targetTab]);
    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (accessibility.screenReader) {
      if (language === 'en') {
        const titlesEn: Record<string, string> = {
          home: 'Home',
          assistant: 'Smart Advisor',
          jobs: 'Jobs and Training',
          reports: 'Smart Reports and Voice Heard',
          offers: 'Services and Discounts',
          profile: 'Personal Profile and Digital Wallet',
          campaigns: 'Seasonal Campaigns Center and Purple Saturday',
          provider: 'Service Provider Portal',
          provider_home: 'Service Provider Home',
          provider_profile: 'Service Provider Profile',
          provider_services: 'Service Provider Services',
          provider_campaigns: 'Service Provider Campaigns',
          provider_analytics: 'Service Provider Analytics',
          support: 'Direct Support and Platform Features',
        };
        if (titlesEn[targetTab]) {
          speakEnglish(`You are now on ${titlesEn[targetTab]}`);
        }
      } else {
        const titlesAr: Record<string, string> = {
          home: 'الرئيسية',
          assistant: 'المستشار الذكي',
          jobs: 'الوظائف والتدريب',
          reports: 'البلاغات الذكية وصوتك مسموع',
          offers: 'الخدمات والخصومات',
          profile: 'الملف الشخصي والمحفظة الرقمية والمنبه',
          campaigns: 'مركز المشاركة الموسمية والسبت البنفسجي',
          provider: 'بوابة مقدم الخدمة',
          provider_home: 'الرئيسية لمقدم الخدمة',
          provider_profile: 'الملف التعريفي لمقدم الخدمة',
          provider_services: 'خدمات وعروض مقدم الخدمة',
          provider_campaigns: 'حملات ومبادرات مقدم الخدمة',
          provider_analytics: 'إحصائيات وتحليلات مقدم الخدمة',
          support: 'الدعم المباشر ومميزات المنصة',
        };
        if (titlesAr[targetTab]) {
          speakArabic(`أنت الآن في ${titlesAr[targetTab]}`);
        }
      }
    }
  };

  const handleBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop();
      const prevTab = newHistory[newHistory.length - 1];
      setTabHistory(newHistory);
      setActiveTab(prevTab);
    } else {
      setActiveTab(userRole === 'provider' ? 'provider_home' : 'home');
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'provider') {
      setActiveTab('provider_home');
      setTabHistory(['provider_home']);
    } else {
      setActiveTab('home');
      setTabHistory(['home']);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleToggleRole = () => {
    const newRole = userRole === 'beneficiary' ? 'provider' : 'beneficiary';
    setUserRole(newRole);
    if (newRole === 'provider') {
      handleNavigate('provider_home');
    } else {
      handleNavigate('home');
    }
  };

  // Data Actions - Arabic
  const handleApplyJob = (jobId: string) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, applied: true } : j)));
  };
  const handleCreateReport = (newReport: ReportItem) => {
    setReports((prev) => [newReport, ...prev]);
  };
  const handleAddWalletDoc = (newDoc: WalletDocument) => {
    setWalletDocs((prev) => [newDoc, ...prev]);
  };
  const handleToggleReminder = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)));
  };
  const handleAddReminder = (newReminder: SmartReminder) => {
    setReminders((prev) => [newReminder, ...prev]);
  };
  const handleAddNewOffer = (newOffer: OfferItem) => {
    setOffers((prev) => [newOffer, ...prev]);
  };
  const handleAddNewJob = (newJob: JobOpportunity) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  // Data Actions - English
  const handleApplyJobEn = (jobId: string) => {
    setJobsEn((prev) => prev.map((j) => (j.id === jobId ? { ...j, applied: true } : j)));
  };
  const handleCreateReportEn = (newReport: ReportItem) => {
    setReportsEn((prev) => [newReport, ...prev]);
  };
  const handleAddWalletDocEn = (newDoc: WalletDocument) => {
    setWalletDocsEn((prev) => [newDoc, ...prev]);
  };
  const handleToggleReminderEn = (id: string) => {
    setRemindersEn((prev) => prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)));
  };
  const handleAddReminderEn = (newReminder: SmartReminder) => {
    setRemindersEn((prev) => [newReminder, ...prev]);
  };
  const handleAddNewOfferEn = (newOffer: OfferItem) => {
    setOffersEn((prev) => [newOffer, ...prev]);
  };
  const handleAddNewJobEn = (newJob: JobOpportunity) => {
    setJobsEn((prev) => [newJob, ...prev]);
  };

  // Header Titles - Arabic
  const getHeaderInfoAr = () => {
    switch (activeTab) {
      case 'home':
        return { title: 'الرئيسية', subtitle: 'منصة مُعِيني لتمكين وتيسير الوصول', showBack: false };
      case 'assistant':
        return { title: 'المستشار الذكي', subtitle: 'إجابات فورية وتوجيه ذكي', showBack: false };
      case 'jobs':
        return { title: 'الوظائف والتدريب', subtitle: 'بوابة التمكين ومستقبلي', showBack: true };
      case 'reports':
        return { title: 'البلاغات الذكية', subtitle: 'رصد عوائق الوصول الشامل', showBack: true };
      case 'offers':
        return { title: 'الخدمات والخصومات', subtitle: 'مزايا وتخفيضات الشركاء', showBack: true };
      case 'profile':
      case 'wallet':
        return { title: 'الملف الشخصي', subtitle: 'المحفظة الرقمية والمنبه والمواعيد', showBack: true };
      case 'campaigns':
        return { title: 'مركز المشاركة الموسمية', subtitle: 'السبت البنفسجي 💜', showBack: true };
      case 'provider_home':
        return { title: 'الرئيسية', subtitle: 'بوابة مقدم الخدمة والمنشآت', showBack: false };
      case 'provider_profile':
        return { title: 'الملف التعريفي', subtitle: 'بيانات المنشأة والاعتمادات', showBack: true };
      case 'provider_services':
      case 'provider':
        return { title: 'الخدمات والعروض', subtitle: 'إدارة وتخصيص الخدمات الميسرة', showBack: true };
      case 'provider_campaigns':
        return { title: 'الحملات والمبادرات', subtitle: 'السبت البنفسجي والمبادرات الوطنية', showBack: true };
      case 'provider_analytics':
        return { title: 'الإحصائيات والتقارير', subtitle: 'مؤشرات الأداء والأثر الميداني', showBack: true };
      case 'support':
        return { title: 'المميزات والدعم', subtitle: 'خدمات المنظومة الشاملة', showBack: true };
      default:
        return { title: 'مُعِيني AI', subtitle: '', showBack: false };
    }
  };

  // Header Titles - English
  const getHeaderInfoEn = () => {
    switch (activeTab) {
      case 'home':
        return { title: 'Home', subtitle: 'Mu\'ini Disability Inclusion Platform', showBack: false };
      case 'assistant':
        return { title: 'Smart Advisor', subtitle: 'Instant answers & legal guidance', showBack: false };
      case 'jobs':
        return { title: 'Jobs & Training', subtitle: 'Inclusive empowerment portal', showBack: true };
      case 'reports':
        return { title: 'Smart Reports', subtitle: 'Voice Heard & barrier tracking', showBack: true };
      case 'offers':
        return { title: 'Services & Discounts', subtitle: 'Partner perks & privileges', showBack: true };
      case 'profile':
      case 'wallet':
        return { title: 'Personal Profile', subtitle: 'Digital Wallet, reminders & appointments', showBack: true };
      case 'campaigns':
        return { title: 'Seasonal Campaigns', subtitle: 'Purple Saturday Initiative 💜', showBack: true };
      case 'provider_home':
        return { title: 'Home', subtitle: 'Service Provider & Enterprise Portal', showBack: false };
      case 'provider_profile':
        return { title: 'Provider Profile', subtitle: 'Enterprise Info & Accreditations', showBack: true };
      case 'provider_services':
      case 'provider':
        return { title: 'Services & Offers', subtitle: 'Manage & customize accessible services', showBack: true };
      case 'provider_campaigns':
        return { title: 'Campaigns & Initiatives', subtitle: 'Purple Saturday & National Campaigns', showBack: true };
      case 'provider_analytics':
        return { title: 'Analytics & Insights', subtitle: 'Reach, impact & engagement metrics', showBack: true };
      case 'support':
        return { title: 'Features & Support', subtitle: 'Platform ecosystem services', showBack: true };
      default:
        return { title: 'MUEENI AI', subtitle: '', showBack: false };
    }
  };

  const headerInfo = language === 'en' ? getHeaderInfoEn() : getHeaderInfoAr();
  const currentReminders = language === 'en' ? remindersEn : reminders;
  const unreadAlerts = currentReminders.filter((r) => !r.completed && r.dueInDays <= 7).length;

  // Unauthenticated View
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-emerald-200 ${language === 'en' ? 'text-left' : 'text-right'}`}>
        {language === 'en' ? (
          <>
            <LoginViewEn
              onLogin={handleLogin}
              onOpenAccessibility={() => setIsAccessibilityOpen(true)}
              onToggleLanguage={handleToggleLanguage}
            />
            <AccessibilityModalEn
              isOpen={isAccessibilityOpen}
              onClose={() => setIsAccessibilityOpen(false)}
              settings={accessibility}
              onUpdateSettings={setAccessibility}
              onToggleLanguage={handleToggleLanguage}
              currentLanguage={language}
            />
          </>
        ) : (
          <>
            <LoginView
              onLogin={handleLogin}
              onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            />
            <AccessibilityModal
              isOpen={isAccessibilityOpen}
              onClose={() => setIsAccessibilityOpen(false)}
              settings={accessibility}
              onUpdateSettings={setAccessibility}
              onToggleLanguage={handleToggleLanguage}
              currentLanguage={language}
            />
          </>
        )}
      </div>
    );
  }

  // ==========================================
  // ENGLISH APPLICATION VIEW
  // ==========================================
  if (language === 'en') {
    return (
      <div
        id="mueeni-app-root-en"
        className="min-h-screen bg-[#f7faf9] text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-emerald-200 text-left"
        dir="ltr"
      >
        {/* Top Main Navigation Header (English) */}
        <HeaderEn
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          showBack={headerInfo.showBack}
          onBack={handleBack}
          onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          unreadAlertsCount={unreadAlerts}
          userRole={userRole}
          onToggleRole={handleToggleRole}
          screenReaderActive={accessibility.screenReader}
          onToggleScreenReader={handleToggleScreenReader}
          activeTab={activeTab}
          onNavigateTab={handleNavigate}
          onOpenProfile={() => handleNavigate('profile')}
          onToggleLanguage={handleToggleLanguage}
        />

        {/* Main Content Area (English) */}
        <main className="flex-1 w-full max-w-2xl mx-auto p-4 sm:p-6 transition-all">
          {activeTab === 'home' && (
            <HomeViewEn
              user={currentUserEn}
              reminders={remindersEn}
              featuredOffers={offersEn}
              onNavigate={handleNavigate}
              onOpenCampaign={() => handleNavigate('campaigns')}
              onOpenSupport={() => handleNavigate('support')}
            />
          )}

          {activeTab === 'assistant' && (
            <AIAssistantViewEn
              userProfile={currentUserEn}
              onNavigateTab={handleNavigate}
            />
          )}

          {activeTab === 'jobs' && (
            <JobsTrainingViewEn
              opportunities={jobsEn}
              onApplyJob={handleApplyJobEn}
            />
          )}

          {activeTab === 'reports' && (
            <ReportingViewEn
              reports={reportsEn}
              onCreateReport={handleCreateReportEn}
            />
          )}

          {activeTab === 'offers' && (
            <OffersViewEn
              offers={offersEn}
              onOpenCampaign={() => handleNavigate('campaigns')}
            />
          )}

          {(activeTab === 'profile' || activeTab === 'wallet') && (
            <ProfileSchedulerViewEn
              user={currentUserEn}
              reminders={remindersEn}
              onToggleReminder={handleToggleReminderEn}
              onAddReminder={handleAddReminderEn}
              onOpenAccessibility={() => setIsAccessibilityOpen(true)}
              onLogout={handleLogout}
              onUpdateUser={setCurrentUserEn}
              documents={walletDocsEn}
              onAddDocument={handleAddWalletDocEn}
              initialSubTab={profileSubTab}
              onSubTabChange={setProfileSubTab}
            />
          )}

          {activeTab === 'campaigns' && (
            <SeasonalCampaignsViewEn
              campaign={campaignEn}
              onNavigateTab={handleNavigate}
            />
          )}

          {activeTab === 'provider_home' && (
            <ProviderHomeViewEn
              onNavigate={handleNavigate}
              activeOffersCount={offersEn.length}
              activeJobsCount={jobsEn.length}
            />
          )}

          {activeTab === 'provider_profile' && (
            <ProviderProfileViewEn
              onNavigate={handleNavigate}
            />
          )}

          {(activeTab === 'provider_services' || activeTab === 'provider') && (
            <ProviderServicesViewEn
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'provider_campaigns' && (
            <ProviderCampaignsViewEn
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'provider_analytics' && (
            <ProviderAnalyticsViewEn
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'provider_jobs' && (
            <ProviderPortalViewEn
              initialOffers={offersEn}
              initialJobs={jobsEn}
              onAddNewOffer={handleAddNewOfferEn}
              onAddNewJob={handleAddNewJobEn}
            />
          )}

          {activeTab === 'support' && (
            <SupportFeaturesViewEn
              onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            />
          )}
        </main>

        {/* Persistent 5-Section Bottom Navigation Bar (English) */}
        <BottomNavEn
          activeTab={activeTab}
          onSelectTab={handleNavigate}
          userRole={userRole}
        />

        {/* Accessibility Floating Modal (English) */}
        <AccessibilityModalEn
          isOpen={isAccessibilityOpen}
          onClose={() => setIsAccessibilityOpen(false)}
          settings={accessibility}
          onUpdateSettings={setAccessibility}
          onToggleLanguage={handleToggleLanguage}
          currentLanguage={language}
        />
      </div>
    );
  }

  // ==========================================
  // ARABIC APPLICATION VIEW (Unmodified original)
  // ==========================================
  return (
    <div
      id="mueeni-app-root"
      className="min-h-screen bg-[#f7faf9] text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-emerald-200 text-right"
      dir="rtl"
    >
      {/* Top Main Navigation Header (Arabic) */}
      <Header
        title={headerInfo.title}
        subtitle={headerInfo.subtitle}
        showBack={headerInfo.showBack}
        onBack={handleBack}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        unreadAlertsCount={unreadAlerts}
        userRole={userRole}
        onToggleRole={handleToggleRole}
        screenReaderActive={accessibility.screenReader}
        onToggleScreenReader={handleToggleScreenReader}
        activeTab={activeTab}
        onNavigateTab={handleNavigate}
        onOpenProfile={() => handleNavigate('profile')}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Area (Arabic) */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-4 sm:p-6 transition-all">
        {activeTab === 'home' && (
          <HomeView
            user={currentUser}
            reminders={reminders}
            featuredOffers={offers}
            onNavigate={handleNavigate}
            onOpenCampaign={() => handleNavigate('campaigns')}
            onOpenSupport={() => handleNavigate('support')}
          />
        )}

        {activeTab === 'assistant' && (
          <AIAssistantView onNavigateTab={handleNavigate} />
        )}

        {activeTab === 'jobs' && (
          <JobsTrainingView
            opportunities={jobs}
            onApplyJob={handleApplyJob}
          />
        )}

        {activeTab === 'reports' && (
          <ReportingView
            reports={reports}
            onCreateReport={handleCreateReport}
          />
        )}

        {activeTab === 'offers' && (
          <OffersView
            offers={offers}
            onOpenCampaign={() => handleNavigate('campaigns')}
          />
        )}

        {(activeTab === 'profile' || activeTab === 'wallet') && (
          <ProfileSchedulerView
            user={currentUser}
            reminders={reminders}
            onToggleReminder={handleToggleReminder}
            onAddReminder={handleAddReminder}
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            onLogout={handleLogout}
            onUpdateUser={setCurrentUser}
            documents={walletDocs}
            onAddDocument={handleAddWalletDoc}
            initialSubTab={profileSubTab}
            onSubTabChange={setProfileSubTab}
          />
        )}

        {activeTab === 'campaigns' && (
          <SeasonalCampaignsView
            campaign={campaign}
            onNavigateTab={handleNavigate}
          />
        )}

        {activeTab === 'provider_home' && (
          <ProviderHomeView
            onNavigate={handleNavigate}
            activeOffersCount={offers.length}
            activeJobsCount={jobs.length}
          />
        )}

        {activeTab === 'provider_profile' && (
          <ProviderProfileView
            onNavigate={handleNavigate}
          />
        )}

        {(activeTab === 'provider_services' || activeTab === 'provider') && (
          <ProviderServicesView
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'provider_campaigns' && (
          <ProviderCampaignsView
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'provider_analytics' && (
          <ProviderAnalyticsView
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'provider_jobs' && (
          <ProviderPortalView
            initialOffers={offers}
            initialJobs={jobs}
            onAddNewOffer={handleAddNewOffer}
            onAddNewJob={handleAddNewJob}
          />
        )}

        {activeTab === 'support' && (
          <SupportFeaturesView
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          />
        )}
      </main>

      {/* Persistent 5-Section Bottom Navigation Bar (Arabic) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        userRole={userRole}
      />

      {/* Accessibility Floating Modal (Arabic) */}
      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibility}
        onUpdateSettings={setAccessibility}
        onToggleLanguage={handleToggleLanguage}
        currentLanguage={language}
      />
    </div>
  );
}

export default App;
