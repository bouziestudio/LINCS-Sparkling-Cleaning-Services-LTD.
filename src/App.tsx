/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { QuoteModal } from './components/QuoteModal';
import { SocialModal } from './components/SocialModal';
import { COMPANY_INFO } from './data/cleaningData';
import { Phone, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteServiceId, setQuoteServiceId] = useState<string | undefined>(undefined);
  const [socialModalPlatform, setSocialModalPlatform] = useState<'instagram' | 'tiktok' | null>(null);

  // Sync hash if present or default to home
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'services', 'about', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceId?: string) => {
    setQuoteServiceId(serviceId);
    setIsQuoteOpen(true);
  };

  const handleOpenSocial = (platform: 'instagram' | 'tiktok') => {
    setSocialModalPlatform(platform);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans selection:bg-[#9fe81d] selection:text-neutral-950">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
            onOpenSocialModal={handleOpenSocial}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenSocialModal={handleOpenSocial}
          />
        )}
      </main>

      {/* Floating Action Pill for Mobile & Quick Dial */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <a
          href={`tel:${COMPANY_INFO.phoneTel}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900/95 backdrop-blur-md border border-[#9fe81d]/50 text-white font-mono font-bold text-xs shadow-2xl hover:border-[#9fe81d] transition-all"
          aria-label="Call LINCS Phone line"
        >
          <div className="w-2 h-2 rounded-full bg-[#9fe81d] animate-pulse" />
          <Phone className="w-3.5 h-3.5 text-[#9fe81d]" />
          <span className="hidden sm:inline">{COMPANY_INFO.phone}</span>
          <span className="sm:hidden">Call</span>
        </a>

        <button
          onClick={() => handleOpenQuote()}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-xs uppercase tracking-wider shadow-2xl active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quote</span>
        </button>
      </div>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSocialModal={handleOpenSocial}
      />

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedServiceId={quoteServiceId}
      />

      <SocialModal
        isOpen={!!socialModalPlatform}
        platform={socialModalPlatform}
        onClose={() => setSocialModalPlatform(null)}
      />
    </div>
  );
}
