import React from 'react';
import { COMPANY_INFO, SOCIAL_POSTS } from '../data/cleaningData';
import { X, ExternalLink, Heart, MessageCircle, Share2, Sparkles, Music } from 'lucide-react';

interface SocialModalProps {
  isOpen: boolean;
  platform: 'instagram' | 'tiktok' | null;
  onClose: () => void;
}

export const SocialModal: React.FC<SocialModalProps> = ({
  isOpen,
  platform,
  onClose,
}) => {
  if (!isOpen || !platform) return null;

  const isIg = platform === 'instagram';
  const posts = isIg ? SOCIAL_POSTS.instagram : SOCIAL_POSTS.tiktok;
  const targetUrl = isIg ? COMPANY_INFO.instagramUrl : COMPANY_INFO.tiktokUrl;
  const handleName = isIg ? `@${COMPANY_INFO.instagram}` : `@${COMPANY_INFO.tiktok}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 flex items-center justify-between text-white ${
            isIg
              ? 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]'
              : 'bg-neutral-950 border-b border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg">
              {isIg ? '📸' : '🎵'}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight flex items-center gap-2">
                <span>{isIg ? 'Instagram Reels & Stories' : 'TikTok Viral Cleaning'}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-sans font-normal">
                  {handleName}
                </span>
              </h3>
              <p className="text-xs text-white/80">
                Official social channel of LINCS Sparkling Cleaning Services
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close social preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Latest Content Feed
              </p>
              <p className="text-sm font-bold text-white">
                Follow {handleName} for satisfying daily transformations
              </p>
            </div>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow transition-all ${
                isIg
                  ? 'bg-gradient-to-r from-[#F58529] to-[#DD2A7B] hover:opacity-90'
                  : 'bg-[#9fe81d] text-neutral-950 hover:bg-[#8cd412]'
              }`}
            >
              <span>Open in App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-800/80 border border-neutral-700 rounded-xl p-4 flex flex-col justify-between hover:border-neutral-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#9fe81d]/20 text-[#9fe81d]">
                      {item.badge}
                    </span>
                    <span className="text-xs text-neutral-400 tabular-nums">
                      {item.views}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-700/60 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5 text-rose-400">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="tabular-nums font-mono">{item.likes}</span>
                  </div>
                  {'sound' in item && (
                    <div className="flex items-center gap-1 text-[11px] truncate max-w-[120px]">
                      <Music className="w-3 h-3 text-[#9fe81d]" />
                      <span className="truncate">{item.sound}</span>
                    </div>
                  )}
                  {'tag' in item && (
                    <span className="text-[11px] text-[#9fe81d] truncate">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#182315] border border-[#9fe81d]/40 flex items-center justify-center text-[#9fe81d]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Want your business featured in our next transformation?
                </p>
                <p className="text-xs text-neutral-400">
                  We offer a 10% discount for businesses that allow us to film clean-with-me content!
                </p>
              </div>
            </div>

            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
            >
              Follow {handleName}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
