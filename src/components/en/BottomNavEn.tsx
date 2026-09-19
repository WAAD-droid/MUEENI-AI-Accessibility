import React from 'react';
import {
  Tag,
  Briefcase,
  Sparkles,
  MessageSquareWarning,
  Flame,
  BarChart3,
  Building2,
  Home,
  User
} from 'lucide-react';
import { UserRole } from '../../types';

interface BottomNavEnProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  userRole?: UserRole;
}

export const BottomNavEn: React.FC<BottomNavEnProps> = ({
  activeTab,
  onSelectTab,
  userRole = 'beneficiary',
}) => {
  // 1. Beneficiary Navigation Items: Exactly 5 items in this exact order (AI Assistant, Jobs & Training, Home [Center], Smart Reports, Services & Discounts)
  const beneficiaryNavItems = [
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
    { id: 'jobs', label: 'Jobs & Training', icon: Briefcase },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reports', label: 'Smart Reports', icon: MessageSquareWarning },
    { id: 'offers', label: 'Services & Discounts', icon: Tag },
  ];

  // 2. Service Provider Navigation Items: Profile, Services, Home (Center), Campaigns, Analytics
  const providerNavItems = [
    { id: 'provider_profile', label: 'Profile', icon: User },
    { id: 'provider_services', label: 'Services', icon: Tag },
    { id: 'provider_home', label: 'Home', icon: Home },
    { id: 'provider_campaigns', label: 'Campaigns', icon: Flame },
    { id: 'provider_analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const currentNavItems = userRole === 'provider' ? providerNavItems : beneficiaryNavItems;

  return (
    <nav
      id="app-bottom-navigation-en"
      aria-label="Main Bottom Navigation Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-2 py-2 safe-area-pb"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {currentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (userRole === 'provider' && item.id === 'provider_services' && (activeTab === 'provider_services' || activeTab === 'provider'));

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}-en`}
              onClick={() => onSelectTab(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 min-w-[62px] ${
                isActive
                  ? userRole === 'provider'
                    ? 'text-indigo-700 font-black scale-105'
                    : 'text-emerald-700 font-black scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                  isActive
                    ? userRole === 'provider'
                      ? 'bg-indigo-100/90 text-indigo-700 shadow-xs'
                      : 'bg-emerald-100/90 text-emerald-700 shadow-xs'
                    : 'bg-transparent text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10.5px] mt-0.5 tracking-tight font-bold whitespace-nowrap">
                {item.label}
              </span>
              {isActive && (
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-0.5 animate-pulse ${
                    userRole === 'provider' ? 'bg-indigo-600' : 'bg-emerald-600'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
