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
  const limeColor = '#c4ea24';

  const sizeConfig = {
    sm: { height: 38 },
    md: { height: 52 },
    lg: { height: 76 },
    xl: { height: 104 },
  };

  const currentSize = sizeConfig[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox={showSubtitle ? '0 0 560 320' : '0 0 560 250'}
        style={{ height: `${currentSize.height}px`, width: 'auto' }}
        className="h-auto max-w-full drop-shadow-sm transition-all"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="LINCS Sparkling Cleaning Services Ltd Logo"
      >
        <defs>
          <style>{`
            .lincs-logo-font {
              font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              font-weight: 900;
            }
          `}</style>
        </defs>

        {/* Broom Handle (Forms the angled 'I' in LINCS) */}
        <path
          d="M 98 227 L 188 72 C 190 68, 196 68, 198 72 L 204 76 C 206 80, 204 84, 200 88 L 110 238 Z"
          fill={textColor}
        />

        {/* Sweeping Broom Bristles (Vibrant Lime Green) */}
        <path
          d="M 102 224 C 126 226, 162 236, 172 254 C 178 266, 174 278, 160 285 C 148 290, 142 276, 136 270 C 132 278, 126 292, 112 295 C 102 297, 98 284, 92 276 C 86 284, 76 295, 58 292 C 44 288, 34 282, 34 274 C 34 266, 52 260, 68 252 C 82 244, 94 234, 102 224 Z"
          fill={limeColor}
        />

        {/* Sparkle 1 (Topmost Sparkle Star) */}
        <path
          d="M 210.5 49.2 Q 189.3 49.0 180.8 68.5 Q 181.0 47.3 161.6 38.8 Q 182.7 39.0 191.2 19.6 Q 191.0 40.7 210.5 49.2 Z"
          fill={limeColor}
        />

        {/* Sparkle 2 (Middle Left Sparkle Star - Main) */}
        <path
          d="M 202.6 108.7 Q 166.8 121.6 164.3 159.6 Q 151.4 123.8 113.4 121.3 Q 149.2 108.4 151.7 70.4 Q 164.6 106.2 202.6 108.7 Z"
          fill={limeColor}
        />

        {/* Sparkle 3 (Lower Right Sparkle Star) */}
        <path
          d="M 272.6 167.9 Q 242.4 165.9 228.1 192.6 Q 230.1 162.4 203.4 148.1 Q 233.6 150.1 247.9 123.4 Q 245.9 153.6 272.6 167.9 Z"
          fill={limeColor}
        />

        {/* Letter L */}
        <text
          x="32"
          y="210"
          fill={textColor}
          fontSize="124"
          className="lincs-logo-font"
          letterSpacing="-0.02em"
        >
          L
        </text>

        {/* Letters NCS */}
        <text
          x="188"
          y="210"
          fill={textColor}
          fontSize="124"
          className="lincs-logo-font"
          letterSpacing="-0.02em"
        >
          NCS
        </text>

        {/* Subtitle: SPARKLING CLEANING SERVICES LTD */}
        {showSubtitle && (
          <text
            x="180"
            y="280"
            fill={limeColor}
            fontSize="18.5"
            className="lincs-logo-font"
            fontWeight="900"
            letterSpacing="0.14em"
          >
            SPARKLING CLEANING SERVICES LTD
          </text>
        )}
      </svg>
    </div>
  );
};
export default Logo;
