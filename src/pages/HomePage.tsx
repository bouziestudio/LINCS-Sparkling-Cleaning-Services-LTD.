import React, { useState } from 'react';
import { PageId } from '../types';
import { SERVICES, COMPANY_INFO, TESTIMONIALS } from '../data/cleaningData';
import { ServiceVisual } from '../components/ServiceVisual';
import { Logo } from '../components/Logo';
import {
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  ExternalLink,
  Clock,
  Send,
  Check,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (serviceId?: string) => void;
  onOpenSocialModal: (platform: 'instagram' | 'tiktok') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuote,
  onOpenSocialModal,
}) => {
  // Direct quick inquiry form state matching the reference flyer
  const [quickForm, setQuickForm] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
  });
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickTicketId, setQuickTicketId] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.email) return;

    const id = `FLYER-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuickTicketId(id);

    const existing = JSON.parse(localStorage.getItem('lincs_quick_inquiries') || '[]');
    existing.push({
      ...quickForm,
      id,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('lincs_quick_inquiries', JSON.stringify(existing));

    setQuickSubmitted(true);
  };

  const flyerServices = SERVICES.filter((s) => s.flyerMatch);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* 1. HERO SECTION - With Hero Image as Full Background */}
      <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center border-b border-neutral-800">
        {/* Full-bleed Background Hero Image with Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/full-shot-man-pushing-elevator-button.jpg"
            alt="LINCS Commercial Cleaning Specialist with professional service cart in corporate facility"
            className="w-full h-full object-cover object-[65%_center] lg:object-[68%_center]"
          />
          {/* Deep dark gradient overlay with brand tint for optimal readability while showing cleaner */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F0B] via-[#0B0F0B]/85 md:via-[#0B0F0B]/70 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40" />
          {/* Subtle brand lime ambient glow */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#9fe81d]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
          <div className="max-w-3xl space-y-6">
            {/* The Iconic Flyer Heading */}
            <div className="space-y-2">
              <div className="mb-3">
                <Logo theme="dark" size="lg" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight uppercase leading-[0.92] text-white drop-shadow-md">
                PROFESSIONAL{' '}
                <span className="block text-[#9fe81d] drop-shadow-[0_2px_20px_rgba(159,232,29,0.4)]">
                  CLEANING
                </span>
                SERVICES
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl drop-shadow">
              Uncompromising sparkle, hygiene, and reliability for offices, restaurants, industrial facilities, and carpets across Chertsey, Surrey, and Greater London.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="px-8 py-4 rounded-xl bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-sm uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(159,232,29,0.35)] hover:shadow-[0_6px_30px_rgba(159,232,29,0.5)] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Free Site Survey</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="px-7 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 backdrop-blur-md border border-neutral-600 hover:border-neutral-400 text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#9fe81d]" />
              </button>
            </div>

            {/* Call-to-action quick telephone banner */}
            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Phone className="w-3.5 h-3.5 text-[#9fe81d]" />
                <span>Direct hotline:</span>
              </span>
              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                className="font-mono text-sm text-[#9fe81d] font-bold hover:underline"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR SERVICES SECTION - Direct 4-card grid from reference flyer */}
      <section className="py-20 bg-neutral-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#9fe81d] mb-1">
                Specialist Solutions
              </p>
              {/* Title styled with bold lime green matching "OUR SERVICES:" from flyer */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-white">
                OUR <span className="text-[#9fe81d]">SERVICES:</span>
              </h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-md">
              Tailored commercial and deep cleaning packages executed by thoroughly vetted, insured professionals using industrial equipment.
            </p>
          </div>

          {/* The 4 Iconic Cards matching flyer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flyerServices.map((service) => (
              <div
                key={service.id}
                className="group relative bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-[#9fe81d]/60 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Visual container with rounded corners and badge */}
                  <div className="h-56 w-full overflow-hidden bg-neutral-950 relative">
                    <ServiceVisual
                      serviceId={service.id}
                      className="w-full h-full"
                      badgeLabel={service.title.toUpperCase()}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-display font-black text-lg text-white group-hover:text-[#9fe81d] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                      {service.checklist.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#9fe81d] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenQuote(service.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-[#9fe81d] text-white hover:text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View all services prompt */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Explore All 6 Services (Including End of Tenancy &amp; Windows)</span>
              <ArrowRight className="w-4 h-4 text-[#9fe81d]" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE LINCS - Value Proposition & Rigor */}
      <section className="py-20 bg-neutral-950 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9fe81d]">
              The LINCS Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mt-1">
              Built on Standards, Driven by Sparkle
            </h2>
            <p className="text-neutral-400 text-sm mt-3">
              We understand that clean premises directly affect staff productivity, guest reviews, and health inspection scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-7 relative hover:border-neutral-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1e2e1a] border border-[#9fe81d]/40 flex items-center justify-center text-[#9fe81d] mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white mb-2">
                Fully Vetted &amp; Insured
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Every team member undergoes enhanced DBS background screening and comprehensive COSHH health and safety training. Backed by £5,000,000 in public liability protection.
              </p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-7 relative hover:border-neutral-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1e2e1a] border border-[#9fe81d]/40 flex items-center justify-center text-[#9fe81d] mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white mb-2">
                100% Sparkle Guarantee
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We work to strict 40-point quality checklists. If any corner or surface falls short of your expectations, we will return within 24 hours to re-clean at no charge.
              </p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-7 relative hover:border-neutral-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1e2e1a] border border-[#9fe81d]/40 flex items-center justify-center text-[#9fe81d] mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-white mb-2">
                Flexible Commercial Schedules
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Early morning, late night, or weekend shifts engineered to prevent any interruption to your staff or diners. Key-holding and alarm code trained supervisors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SIGNATURE FLYER CONTACT SECTION (Bottom half of reference flyer replica) */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-950 relative overflow-hidden">
        {/* Soft background tint */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#9fe81d]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: The signature rounded soft-sage container with Name, Email, Request inputs from flyer */}
            <div className="lg:col-span-6">
              <div className="rounded-[40px] border-2 border-[#9fe81d]/40 p-6 sm:p-10 bg-neutral-900/80 backdrop-blur-md shadow-2xl relative">
                {/* Visual badge */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                      Quick Request
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Fill out the form below for an immediate callback
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#9fe81d] flex items-center justify-center text-neutral-950 font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                {quickSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#1e2e1a] border-2 border-[#9fe81d] text-[#9fe81d] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-xl font-bold text-white">
                      Inquiry Sent!
                    </h4>
                    <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                      Thank you, <span className="font-bold text-[#9fe81d]">{quickForm.name}</span>. Your ticket <span className="font-mono text-white">#{quickTicketId}</span> has been assigned to our Chertsey team.
                    </p>
                    <button
                      onClick={() => {
                        setQuickSubmitted(false);
                        setQuickForm({ name: '', email: '', phone: '', request: '' });
                      }}
                      className="px-6 py-2 rounded-lg bg-[#9fe81d] text-neutral-950 font-bold text-xs uppercase tracking-wider"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-5">
                    {/* NAME Input - Styled with the soft flyer pill container style */}
                    <div>
                      <div className="rounded-full bg-[#d5e0a8] px-6 py-3 flex items-center shadow-inner">
                        <label className="text-xs font-black uppercase tracking-wider text-neutral-800 w-24 shrink-0 font-display">
                          NAME:
                        </label>
                        <input
                          type="text"
                          required
                          value={quickForm.name}
                          onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full bg-transparent text-neutral-950 font-medium text-sm outline-none placeholder:text-neutral-600"
                        />
                      </div>
                    </div>

                    {/* EMAIL Input - Styled with soft flyer pill container style */}
                    <div>
                      <div className="rounded-full bg-[#d5e0a8] px-6 py-3 flex items-center shadow-inner">
                        <label className="text-xs font-black uppercase tracking-wider text-neutral-800 w-24 shrink-0 font-display">
                          EMAIL:
                        </label>
                        <input
                          type="email"
                          required
                          value={quickForm.email}
                          onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full bg-transparent text-neutral-950 font-medium text-sm outline-none placeholder:text-neutral-600"
                        />
                      </div>
                    </div>

                    {/* PHONE Input */}
                    <div>
                      <div className="rounded-full bg-[#d5e0a8] px-6 py-3 flex items-center shadow-inner">
                        <label className="text-xs font-black uppercase tracking-wider text-neutral-800 w-24 shrink-0 font-display">
                          PHONE:
                        </label>
                        <input
                          type="tel"
                          value={quickForm.phone}
                          onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                          placeholder="e.g. 07490 705078"
                          className="w-full bg-transparent text-neutral-950 font-medium text-sm outline-none placeholder:text-neutral-600 font-mono"
                        />
                      </div>
                    </div>

                    {/* REQUEST Input - Rounded pill container style */}
                    <div>
                      <div className="rounded-3xl bg-[#d5e0a8] px-6 py-4 shadow-inner">
                        <label className="block text-xs font-black uppercase tracking-wider text-neutral-800 mb-2 font-display">
                          REQUEST:
                        </label>
                        <textarea
                          rows={3}
                          value={quickForm.request}
                          onChange={(e) => setQuickForm({ ...quickForm, request: e.target.value })}
                          placeholder="Describe the cleaning needed (office, restaurant, carpets, factory, etc.)..."
                          className="w-full bg-transparent text-neutral-950 font-medium text-sm outline-none placeholder:text-neutral-600 resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-sm uppercase tracking-wider shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Fast Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Contact Details and Official Social Buttons from the Flyer */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white mb-6">
                  CONTACT US TODAY:
                </h3>

                <div className="space-y-5">
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#9fe81d] text-neutral-950 flex items-center justify-center shrink-0 shadow-md">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <a
                        href={`tel:${COMPANY_INFO.phoneTel}`}
                        className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white hover:text-[#9fe81d] transition-colors"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                      <p className="text-xs text-neutral-400">Available 7:00 AM – 7:00 PM</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#9fe81d] text-neutral-950 flex items-center justify-center shrink-0 shadow-md">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-xl sm:text-2xl font-bold font-mono text-white hover:text-[#9fe81d] transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                      <p className="text-xs text-neutral-400">Official bookings &amp; tender requests</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#9fe81d] text-neutral-950 flex items-center justify-center shrink-0 shadow-md mt-1">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                        {COMPANY_INFO.address}
                      </p>
                      <p className="text-xs text-neutral-400">
                        Chertsey, Surrey · Serving entire Surrey &amp; surrounding areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The EXACT Instagram & TikTok Buttons from the Flyer */}
              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Follow Our Socials
                </p>

                {/* Instagram Gradient Button from Flyer */}
                <div className="relative group">
                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-xl hover:shadow-[0_4px_25px_rgba(221,42,123,0.4)] transition-all active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4">
                      {/* IG Camera Icon */}
                      <div className="w-10 h-10 rounded-xl border-2 border-white flex items-center justify-center p-1">
                        <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-white" />
                        </div>
                      </div>
                      <div className="text-left">
                        <span className="block text-[11px] font-semibold text-white/80 uppercase tracking-widest">
                          Follow on IG:
                        </span>
                        <span className="block text-xl sm:text-2xl font-black font-display tracking-wider uppercase">
                          {COMPANY_INFO.instagram}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => onOpenSocialModal('instagram')}
                    className="mt-1 text-xs text-neutral-400 hover:text-[#9fe81d] flex items-center gap-1 pl-2 transition-colors"
                  >
                    <span>Click to view recent video reels on this site</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* TikTok Black Button with Logo from Flyer */}
                <div className="relative group">
                  <a
                    href={COMPANY_INFO.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-black border-2 border-neutral-700 hover:border-[#9fe81d] text-white shadow-xl hover:shadow-[0_4px_25px_rgba(159,232,29,0.2)] transition-all active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4">
                      {/* TikTok Icon glyph */}
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-lg font-black">
                        <span className="text-[#00f2fe] drop-shadow-[1px_1px_0px_#fe2c55]">
                          ♪
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
                          Follow on TikTok:
                        </span>
                        <span className="block text-xl sm:text-2xl font-black font-display tracking-wider uppercase text-white">
                          {COMPANY_INFO.tiktok}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => onOpenSocialModal('tiktok')}
                    className="mt-1 text-xs text-neutral-400 hover:text-[#9fe81d] flex items-center gap-1 pl-2 transition-colors"
                  >
                    <span>Click to preview viral transformation clips</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LOCAL SURREY TESTIMONIALS */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9fe81d]">
              Real Client Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mt-1">
              Loved by Surrey Businesses
            </h2>
            <p className="text-neutral-400 text-sm mt-2">
              From corporate offices in Chertsey to bistros in Weybridge and warehouses in Staines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-neutral-400">{t.role}, {t.company}</p>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-500">
                    <span className="text-[#9fe81d] font-semibold">{t.serviceType}</span>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
