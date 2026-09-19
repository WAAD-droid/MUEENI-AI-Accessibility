import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  horizontal?: boolean;
  lang?: 'ar' | 'en';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = true,
  className = '',
  horizontal = false,
  lang = 'ar',
}) => {
  const sizeMap = {
    sm: { icon: 36, title: 'text-lg', sub: 'text-[10px]' },
    md: { icon: 54, title: 'text-2xl', sub: 'text-xs' },
    lg: { icon: 84, title: 'text-3xl', sub: 'text-sm' },
    xl: { icon: 110, title: 'text-4xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      id="mueeni-brand-logo"
      className={`inline-flex items-center justify-center ${
        horizontal ? 'flex-row gap-3' : 'flex-col gap-2'
      } ${className}`}
    >
      <div
        className="relative flex items-center justify-center transition-transform hover:scale-105 duration-300"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <svg
          viewBox="0 0 200 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Primary 'M' body gradient (Deep Blue to Vivid Cyan) */}
            <linearGradient id="mGradient" x1="20" y1="50" x2="160" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="50%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>

            {/* Supportive Hand gradient (Deep Teal to Bright Emerald Green) */}
            <linearGradient id="handGradient" x1="60" y1="130" x2="185" y2="185" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0052D4" />
              <stop offset="40%" stopColor="#00A86B" />
              <stop offset="100%" stopColor="#00E676" />
            </linearGradient>

            {/* Human Head Dot (Vibrant Purple/Magenta) */}
            <linearGradient id="headGradient" x1="85" y1="5" x2="115" y2="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C026D3" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Tech Nodes Glow/Gradient */}
            <linearGradient id="nodeGradient" x1="0" y1="80" x2="50" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>
          </defs>

          {/* Top Human Head Purple Dot */}
          <circle cx="100" cy="22" r="16" fill="url(#headGradient)" />

          {/* Left Tech Circuit Lines & Nodes */}
          {/* Node 1 (Top) */}
          <path d="M 45 80 L 18 80" stroke="url(#nodeGradient)" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="14" cy="80" r="7" fill="none" stroke="url(#nodeGradient)" strokeWidth="4.5" />
          <circle cx="14" cy="80" r="2.5" fill="#00A3FF" />

          {/* Node 2 (Middle) */}
          <path d="M 45 112 L 12 112" stroke="url(#nodeGradient)" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="8" cy="112" r="7" fill="none" stroke="url(#nodeGradient)" strokeWidth="4.5" />
          <circle cx="8" cy="112" r="2.5" fill="#00A3FF" />

          {/* Node 3 (Bottom) */}
          <path d="M 45 144 L 18 144" stroke="url(#nodeGradient)" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="14" cy="144" r="7" fill="none" stroke="url(#nodeGradient)" strokeWidth="4.5" />
          <circle cx="14" cy="144" r="2.5" fill="#00A3FF" />

          {/* Main 'M' Structure (Human figure / Gateway / Foundation) */}
          <path
            d="M 52 165
               V 78
               C 52 52 74 46 98 62
               C 100 64 100 64 102 62
               C 126 46 148 52 148 78
               V 135
               C 148 142 144 148 136 148
               C 128 148 124 142 124 135
               V 82
               C 124 72 114 68 100 78
               C 86 68 76 72 76 82
               V 165
               C 76 172 70 178 64 178
               C 58 178 52 172 52 165 Z"
            fill="url(#mGradient)"
          />

          {/* Bottom Supportive Palm/Hand Embracing (Empowerment & Inclusion) */}
          <path
            d="M 76 172
               C 85 160 100 152 118 152
               C 134 152 148 158 160 148
               C 172 136 182 120 188 102
               C 188 102 186 118 178 134
               C 166 158 142 174 116 176
               C 92 178 80 174 76 172 Z"
            fill="url(#handGradient)"
          />
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col ${horizontal ? 'items-start' : 'items-center'} text-center`}>
          <div className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className={`${currentSize.title} font-black text-slate-900 leading-none`}>
              {lang === 'en' ? 'MUEENI' : 'مُعِيني'}
            </span>
            <span className={`${currentSize.title} font-black text-emerald-600 leading-none`}>
              AI
            </span>
          </div>

          {showSubtitle && (
            <span className={`${currentSize.sub} font-semibold text-slate-500 tracking-wide mt-0.5`}>
              {lang === 'en' ? 'Smart Disability Empowerment' : 'تمكين المجتمع الذكي'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
