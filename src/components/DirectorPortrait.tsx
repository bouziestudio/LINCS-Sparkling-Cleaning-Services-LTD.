import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Award, Phone, Mail, Sparkles, Upload, Camera, RefreshCw } from 'lucide-react';
import { COMPANY_INFO } from '../data/cleaningData';

interface DirectorPortraitProps {
  className?: string;
  showDetails?: boolean;
}

export const DirectorPortrait: React.FC<DirectorPortraitProps> = ({
  className = '',
  showDetails = true,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted photo from localStorage if previously uploaded
  useEffect(() => {
    const saved = localStorage.getItem('lincs_director_photo');
    if (saved) {
      setPhotoUrl(saved);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoUrl(result);
          localStorage.setItem('lincs_director_photo', result);
          setImgError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoUrl(result);
          localStorage.setItem('lincs_director_photo', result);
          setImgError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetPhoto = () => {
    localStorage.removeItem('lincs_director_photo');
    setPhotoUrl(null);
    setImgError(false);
  };

  const currentSrc = photoUrl || '/090788d2-de50-4b86-8631-689eb5188961.png';

  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group ${className}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Hidden File Input for Direct Local Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Photo Frame Container */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-950">
        {!imgError ? (
          <img
            src={currentSrc}
            alt="Lincoln Christian - Managing Director, LINCS Sparkling Cleaning Services Ltd"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={() => {
              if (!photoUrl) {
                setImgError(true);
              }
            }}
          />
        ) : (
          /* SVG Portrait matching Lincoln Christian in High-Vis Vest */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950">
            {/* Visual Portrait */}
            <svg
              viewBox="0 0 600 700"
              className="w-full h-full max-h-[380px] object-contain drop-shadow-xl"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Portrait of Lincoln Christian, Managing Director"
            >
              <defs>
                <radialGradient id="faceGrad" cx="50%" cy="38%" r="48%">
                  <stop offset="0%" stopColor="#9a5f4d" />
                  <stop offset="60%" stopColor="#784434" />
                  <stop offset="100%" stopColor="#552c20" />
                </radialGradient>
                <linearGradient id="vestNeon" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c8f542" />
                  <stop offset="50%" stopColor="#a3e635" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
                <linearGradient id="silverStripes" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>

              {/* Head Silhouette Base */}
              <circle cx="300" cy="270" r="160" fill="url(#faceGrad)" />
              {/* Hair / Short Fade */}
              <path d="M 160 250 C 150 140, 200 90, 300 90 C 400 90, 450 140, 440 250 C 420 120, 380 110, 300 110 C 220 110, 180 120, 160 250 Z" fill="#09090b" />
              {/* Ears */}
              <ellipse cx="150" cy="270" rx="14" ry="24" fill="#6b3a2a" />
              <ellipse cx="450" cy="270" rx="14" ry="24" fill="#6b3a2a" />
              {/* Eyes */}
              <ellipse cx="245" cy="245" rx="16" ry="10" fill="#ffffff" opacity="0.9" />
              <circle cx="245" cy="245" r="7" fill="#18181b" />
              <circle cx="243" cy="243" r="2.5" fill="#ffffff" />
              <ellipse cx="355" cy="245" rx="16" ry="10" fill="#ffffff" opacity="0.9" />
              <circle cx="355" cy="245" r="7" fill="#18181b" />
              <circle cx="353" cy="243" r="2.5" fill="#ffffff" />
              {/* Eyebrows */}
              <path d="M 210 220 Q 245 210 275 224" stroke="#09090b" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M 390 220 Q 355 210 325 224" stroke="#09090b" strokeWidth="8" strokeLinecap="round" fill="none" />
              {/* Nose */}
              <path d="M 300 230 L 296 295 Q 275 312 300 315 Q 325 312 304 295 Z" fill="#5a2f23" />
              {/* Prominent Full Beard & Mustache */}
              <path d="M 170 270 C 170 410, 200 480, 300 480 C 400 480, 430 410, 430 270 C 410 350, 370 400, 300 410 C 230 400, 190 350, 170 270 Z" fill="#09090b" />
              <path d="M 250 345 C 275 335, 300 340, 300 342 C 300 340, 325 335, 350 345 C 330 365, 270 365, 250 345 Z" fill="#09090b" />
              <path d="M 270 362 Q 300 356 330 362 Q 300 380 270 362 Z" fill="#9d5b54" />
              {/* Shoulders & High-Vis Safety Vest */}
              <path d="M 50 700 L 95 490 C 120 440, 180 430, 230 435 L 260 540 L 340 540 L 370 435 C 420 430, 480 440, 505 490 L 550 700 Z" fill="url(#vestNeon)" />
              {/* Black T-Shirt Collar */}
              <path d="M 220 430 C 220 500, 380 500, 380 430 C 350 455, 250 455, 220 430 Z" fill="#18181b" />
              {/* Reflective Stripes */}
              <polygon points="120,700 170,700 195,440 160,445" fill="url(#silverStripes)" stroke="#64748b" strokeWidth="1" />
              <polygon points="430,700 480,700 440,445 405,440" fill="url(#silverStripes)" stroke="#64748b" strokeWidth="1" />
              <line x1="300" y1="540" x2="300" y2="700" stroke="#09090b" strokeWidth="6" />
            </svg>

            {/* Quick Upload Action if Image Not Local */}
            <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-3 rounded-2xl bg-[#9fe81d] hover:bg-[#8fd815] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Lincoln&apos;s Photo</span>
              </button>
              <p className="text-[11px] text-neutral-300 mt-2">
                Click or drag &amp; drop to set Lincoln&apos;s photo
              </p>
            </div>
          </div>
        )}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

        {/* Top Badges & Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-[#9fe81d]/40 text-[11px] font-bold tracking-wider uppercase text-[#bef264]">
            <Sparkles className="w-3 h-3 text-[#9fe81d]" />
            Leadership
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Change / Upload Photo"
              className="p-1.5 rounded-full bg-black/75 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            {photoUrl && (
              <button
                type="button"
                onClick={resetPhoto}
                title="Reset to default"
                className="p-1.5 rounded-full bg-black/75 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-neutral-700 text-[11px] font-semibold text-neutral-200">
              <ShieldCheck className="w-3 h-3 text-[#9fe81d]" />
              DBS Vetted
            </span>
          </div>
        </div>

        {/* Bottom Overlay Label */}
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight uppercase">
                Lincoln Christian
              </h3>
              <p className="text-xs font-semibold text-[#9fe81d] uppercase tracking-wide">
                Managing Director
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#1e2e1a] border border-[#9fe81d]/40 flex items-center justify-center text-[#9fe81d] shrink-0">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Details Box below photo */}
      {showDetails && (
        <div className="p-6 space-y-4 bg-neutral-900 border-t border-neutral-800">
          <p className="text-sm text-neutral-300 leading-relaxed italic">
            &ldquo;Every premises we touch in Surrey reflects our name. I lead our teams on the ground so every commercial client receives clinical, immaculate standards.&rdquo;
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <div className="w-2 h-2 rounded-full bg-[#9fe81d]" />
              <span>Direct Site Oversight</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <div className="w-2 h-2 rounded-full bg-[#9fe81d]" />
              <span>COSHH Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <div className="w-2 h-2 rounded-full bg-[#9fe81d]" />
              <span>Chertsey &amp; Surrey Native</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <div className="w-2 h-2 rounded-full bg-[#9fe81d]" />
              <span>£5M Insured Guarantee</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#9fe81d] hover:bg-[#8fd815] text-neutral-950 font-bold text-xs uppercase tracking-wide transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Lincoln Direct</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>Email Office</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
