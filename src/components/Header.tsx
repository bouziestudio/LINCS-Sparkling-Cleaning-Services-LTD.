import React, { useState } from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/cleaningData';
import { Phone, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F0B] text-white shadow-xl">
      {/* Top Accent Line matching the reference flyer */}
      <div className="h-1 bg-[#9fe81d] w-full" />

      {/* Main Top Bar matching Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single Brand element */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fe81d] rounded-lg p-1 text-left transition-opacity hover:opacity-90"
            aria-label="LINCS Sparkling Cleaning Home"
          >
            <Logo theme="dark" size="md" />
          </button>

          {/* Zone 2: Clean 4 nav links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link, idx) => {
              const isActive = currentPage === link.id;
              return (
                <React.Fragment key={link.id}>
                  {idx > 0 && (
                    <span className="text-neutral-600 select-none px-1 text-xs">|</span>
                  )}
                  <button
                    onClick={() => handleNav(link.id)}
                    className={`px-3 py-2 text-sm font-semibold tracking-wider uppercase transition-colors whitespace-nowrap rounded-md relative ${
                      isActive
                        ? 'text-[#9fe81d]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#9fe81d] rounded-full" />
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="hidden lg:flex items-center space-x-3">

            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="flex items-center gap-2 text-sm font-bold text-neutral-200 hover:text-[#9fe81d] transition-colors whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-full bg-[#182315] border border-[#9fe81d]/30 flex items-center justify-center text-[#9fe81d]">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="tabular-nums font-mono text-sm tracking-tight">
                {COMPANY_INFO.phone}
              </span>
            </a>

            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider text-black bg-[#9fe81d] hover:bg-[#8cd412] active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="p-2 text-[#9fe81d] bg-[#182315] rounded-lg border border-[#9fe81d]/30"
              aria-label="Call LINCS"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fe81d]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111710] border-t border-neutral-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-[#1e2b19] text-[#9fe81d]'
                    : 'text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && <div className="w-2 h-2 rounded-full bg-[#9fe81d]" />}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">

            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-sm"
            >
              <Phone className="w-4 h-4 text-[#9fe81d]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#9fe81d] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <span>Get Free Instant Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
