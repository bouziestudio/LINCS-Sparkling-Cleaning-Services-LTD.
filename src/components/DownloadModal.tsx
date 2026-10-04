/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Download, FileArchive, Check, Terminal, ExternalLink, Globe, Code2, Sparkles } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npm install && npm run dev');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#9fe81d]/10 border border-[#9fe81d]/30 flex items-center justify-center text-[#9fe81d]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
                Download Website Package
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#9fe81d] text-neutral-950 uppercase">
                  ZIP
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Export and download the complete LINCS Commercial Cleaning website files
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Download Options Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Option 1: Complete Source Code */}
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#9fe81d]/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded">
                    ~900 KB
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-[#9fe81d] transition-colors">
                  Complete Source Code
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Full React 19, TypeScript, Tailwind CSS v4, and Vite project. Ready for local editing and development.
                </p>
                <ul className="text-[11px] text-neutral-400 space-y-1 mb-4">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9fe81d]" />
                    <span>All pages, components &amp; types</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9fe81d]" />
                    <span>High-res assets &amp; images</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9fe81d]" />
                    <span>README setup guide included</span>
                  </li>
                </ul>
              </div>

              <a
                href="/lincs-cleaning-website.zip"
                download="lincs-cleaning-website.zip"
                className="w-full py-2.5 px-4 rounded-lg bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Source ZIP</span>
              </a>
            </div>

            {/* Option 2: Ready-to-Deploy Static Site */}
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#9fe81d]/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded">
                    ~990 KB
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-[#9fe81d] transition-colors">
                  Production Static Build
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Pre-compiled HTML, minified JS/CSS bundle, and assets. Zero build step required.
                </p>
                <ul className="text-[11px] text-neutral-400 space-y-1 mb-4">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9fe81d]" />
                    <span>Drag &amp; drop to Netlify Drop</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9fe81d]" />
                    <span>Ready for cPanel / Apache / Nginx</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9fe81d]" />
                    <span>Deployable on Vercel or GitHub Pages</span>
                  </li>
                </ul>
              </div>

              <a
                href="/lincs-cleaning-website-dist.zip"
                download="lincs-cleaning-website-dist.zip"
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white hover:text-[#bef264] border border-neutral-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm"
              >
                <FileArchive className="w-4 h-4" />
                <span>Download Static Build ZIP</span>
              </a>
            </div>
          </div>

          {/* Quick instructions box */}
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#9fe81d]" />
                How to run source code locally:
              </span>
              <button
                onClick={handleCopyCmd}
                className="text-[11px] text-neutral-400 hover:text-[#9fe81d] flex items-center gap-1 font-mono transition-colors"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3 h-3 text-[#9fe81d]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <span>Copy command</span>
                )}
              </button>
            </div>
            <div className="bg-neutral-900 px-3 py-2 rounded-lg font-mono text-xs text-[#bef264] border border-neutral-800 select-all overflow-x-auto">
              unzip lincs-cleaning-website.zip && cd lincs-cleaning-website && npm install && npm run dev
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-950/80 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>LINCS Commercial Cleaning Website Files</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
