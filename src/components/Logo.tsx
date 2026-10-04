import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  theme = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0B0F0B';
  const limeColor = '#9fe81d';

  const scaleMap = {
    sm: { height: 32, textScale: 'text-lg', subScale: 'text-[7px]' },
    md: { height: 42, textScale: 'text-2xl', subScale: 'text-[9px]' },
    lg: { height: 56, textScale: 'text-3xl', subScale: 'text-[11px]' },
    xl: { height: 72, textScale: 'text-4xl', subScale: 'text-[13px]' },
  };

  const currentScale = scaleMap[size];

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-0.5 tracking-tight font-black leading-none">
        {/* Letter L */}
        <span
          style={{ color: textColor }}
          className={`${currentScale.textScale} font-black font-display tracking-tight`}
        >
          L
        </span>

        {/* Stylized Broom & Sparkles for the "I" */}
        <div className="relative inline-flex items-center justify-center mx-0.5">
          <svg
            width={size === 'sm' ? '18' : size === 'md' ? '24' : size === 'lg' ? '30' : '38'}
            height={size === 'sm' ? '24' : size === 'md' ? '32' : size === 'lg' ? '40' : '50'}
            viewBox="0 0 36 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Sparkle Star 1 (Top Left) */}
            <path
              d="M 6 12 Q 10 12 10 8 Q 10 12 14 12 Q 10 12 10 16 Q 10 12 6 12 Z"
              fill={limeColor}
            />
            {/* Sparkle Star 2 (Small higher) */}
            <path
              d="M 17 5 Q 19 5 19 3 Q 19 5 21 5 Q 19 5 19 7 Q 19 5 17 5 Z"
              fill={limeColor}
            />
            {/* Sparkle Star 3 (Mid right) */}
            <path
              d="M 2 24 Q 5 24 5 21 Q 5 24 8 24 Q 5 24 5 27 Q 5 24 2 24 Z"
              fill={limeColor}
            />

            {/* Broom Handle - angled stick */}
            <path
              d="M 12 10 L 22 28"
              stroke={textColor}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Broom connector cap */}
            <rect
              x="19"
              y="27"
              width="9"
              height="4"
              rx="1"
              transform="rotate(28 19 27)"
              fill={textColor}
            />

            {/* Broom Bristles / Brush Fan in Lime Green */}
            <path
              d="M 17 31 C 15 36, 12 43, 9 46 C 18 48, 28 47, 34 38 C 29 36, 23 31, 20 29 Z"
              fill={limeColor}
            />
            {/* Bristle texture lines */}
            <path
              d="M 13 44 L 19 33 M 18 45 L 22 32 M 24 44 L 25 31 M 29 41 L 27 31"
              stroke={isDark ? '#0e140d' : '#ffffff'}
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Letters NCS */}
        <span
          style={{ color: textColor }}
          className={`${currentScale.textScale} font-black font-display tracking-tight`}
        >
          NCS
        </span>
      </div>

      {showSubtitle && (
        <span
          style={{ color: limeColor }}
          className={`font-semibold tracking-[0.2em] uppercase font-sans mt-0.5 ${currentScale.subScale}`}
        >
          Sparkling Cleaning Services Ltd
        </span>
      )}
    </div>
  );
};
