import React from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/cleaningData';
import { Phone, Mail, MapPin, ShieldCheck, Clock, CheckCircle2, ExternalLink, Download, FileArchive } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenSocialModal: (platform: 'instagram' | 'tiktok') => void;
  onOpenDownload?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSocialModal, onOpenDownload }) => {
  return (
    <footer className="bg-[#0B0F0B] text-neutral-300 border-t border-neutral-800">
      {/* Lime accent bar */}
      <div className="h-1 bg-[#9fe81d] w-full" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none"
              aria-label="LINCS Home"
            >
              <Logo theme="dark" size="md" />
            </button>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Surrey&apos;s premier commercial, office, carpet, and industrial cleaning company. Delighting businesses and property managers with sparkling, reliable, and insured cleaning standards.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 text-[#9fe81d]">
                <ShieldCheck className="w-4 h-4" />
                <span>{COMPANY_INFO.insurance}</span>
              </span>
              <span>·</span>
              <span>DBS Vetted</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-4 text-[#9fe81d]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Services List &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About LINCS Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us &amp; Booking
                </button>
              </li>
            </ul>

            <h4 className="text-white font-display font-bold text-xs tracking-wider uppercase mt-6 mb-3 text-neutral-400">
              Key Services
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-neutral-400">
              <span>Office Cleaning</span>
              <span>Restaurant Scrub</span>
              <span>Carpet Extraction</span>
              <span>Factory Cleaning</span>
              <span>End of Tenancy</span>
              <span>Window Cleaning</span>
            </div>
          </div>

          {/* Col 3: Contact & Hours */}
          <div>
            <h4 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-4 text-[#9fe81d]">
              Contact Details
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#9fe81d] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="hover:text-white font-mono font-bold tracking-tight text-neutral-100"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-xs text-neutral-500">Direct phone &amp; quote line</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#9fe81d] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="hover:text-white font-mono text-neutral-100"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-xs text-neutral-500">24-hour response SLA</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9fe81d] shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-100 uppercase font-semibold text-xs leading-tight">
                    {COMPANY_INFO.address}
                  </p>
                  <p className="text-xs text-neutral-500">Serving Surrey &amp; surrounding areas</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#9fe81d] shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-400 leading-tight">
                  {COMPANY_INFO.hours}
                </p>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Channels from the reference flyer */}
          <div>
            <h4 className="text-white font-display font-bold text-sm tracking-wider uppercase mb-4 text-[#9fe81d]">
              Connect On Social
            </h4>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Watch our satisfying before &amp; after transformations and daily cleaning tips on Instagram and TikTok.
            </p>

            <div className="space-y-3">
              {/* Instagram Button matching flyer */}
              <div className="flex flex-col gap-1">
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5">
                    {/* IG Camera Icon */}
                    <div className="w-6 h-6 rounded-lg border-2 border-white flex items-center justify-center p-0.5">
                      <div className="w-2.5 h-2.5 rounded-full border border-white" />
                    </div>
                    <span>Follow On IG: {COMPANY_INFO.instagram}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <button
                  onClick={() => onOpenSocialModal('instagram')}
                  className="text-[11px] text-neutral-400 hover:text-[#9fe81d] text-left pl-2 underline underline-offset-2 transition-colors"
                >
                  Preview recent reels &amp; transformations
                </button>
              </div>

              {/* TikTok Button matching flyer */}
              <div className="flex flex-col gap-1">
                <a
                  href={COMPANY_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-4 py-2.5 rounded-xl bg-black border border-neutral-700 text-white font-bold text-xs uppercase tracking-wider hover:border-[#9fe81d] shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5">
                    {/* TikTok musical note glyph */}
                    <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center text-xs font-black">
                      <span className="text-[#00f2fe]">♪</span>
                    </div>
                    <span>Follow On TikTok: {COMPANY_INFO.tiktok}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <button
                  onClick={() => onOpenSocialModal('tiktok')}
                  className="text-[11px] text-neutral-400 hover:text-[#9fe81d] text-left pl-2 underline underline-offset-2 transition-colors"
                >
                  Preview viral ASMR cleaning clips
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Download Website Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-[#111710] border border-[#9fe81d]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#9fe81d]/10 border border-[#9fe81d]/30 flex items-center justify-center text-[#9fe81d] shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base flex items-center gap-2">
                Download Website Package
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#9fe81d] text-neutral-950 uppercase">
                  ZIP Archive
                </span>
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                Download the complete codebase or pre-built static distribution. Ready for local development, customization, or instant deployment to any web host.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="/lincs-cleaning-website.zip"
              download="lincs-cleaning-website.zip"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Source Code (.ZIP)</span>
            </a>
            <a
              href="/lincs-cleaning-website-dist.zip"
              download="lincs-cleaning-website-dist.zip"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white hover:text-[#bef264] border border-neutral-700 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 whitespace-nowrap"
            >
              <FileArchive className="w-4 h-4" />
              <span>Static Build (.ZIP)</span>
            </a>
            {onOpenDownload && (
              <button
                onClick={onOpenDownload}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs font-semibold underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>View Options</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Clay Corner, Chertsey Surrey KT16 8PW</span>
            <span aria-hidden="true">·</span>
            <span>Commercial &amp; Residential Specialists</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
