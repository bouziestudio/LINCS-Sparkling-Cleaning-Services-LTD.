import React, { useState } from 'react';
import { PageId, QuoteFormData } from '../types';
import { COMPANY_INFO, SERVICES } from '../data/cleaningData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenSocialModal: (platform: 'instagram' | 'tiktok') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenSocialModal,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    serviceId: 'office-cleaning',
    frequency: 'one-off',
    propertyType: 'office',
    propertySize: 'Medium (1,000 - 3,000 sq ft)',
    postcode: 'KT16 8PW',
    message: '',
    preferredTime: 'Morning (07:00 - 11:00)',
  });

  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'whatsapp'>('phone');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `LINCS-CT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);

    const existing = JSON.parse(localStorage.getItem('lincs_contacts') || '[]');
    existing.push({
      ...formData,
      contactMethod,
      id,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });
    localStorage.setItem('lincs_contacts', JSON.stringify(existing));

    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do you bring your own cleaning equipment and eco-detergents?',
      a: 'Yes, absolutely. Our mobile units arrive fully stocked with professional-grade hot water extraction wands, HEPA vacuum cleaners, ride-on floor scrubbers, and COSHH-compliant biodegradable chemicals. You do not need to provide anything.',
    },
    {
      q: 'Can LINCS clean during our business off-hours or weekends?',
      a: 'Yes! Over 60% of our commercial and restaurant clients operate on evening, overnight (e.g. 10 PM - 5 AM), or early morning schedules. Our supervisors are key-holding and alarm code trained.',
    },
    {
      q: 'What is your public liability insurance coverage?',
      a: 'We hold £5,000,000 in comprehensive public liability insurance, ensuring full indemnity for commercial fixtures, machinery, and properties across Surrey and London.',
    },
    {
      q: 'How fast can you provide a written quote or attend an emergency?',
      a: 'For urgent requirements in Chertsey, Weybridge, or Woking, we can often dispatch an on-site supervisor the same day. Standard written quotes are returned within 24 hours of inquiry.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#0D140D] to-neutral-950 border-b border-neutral-800 py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2719] border border-[#9fe81d]/30 text-xs font-semibold text-[#bef264] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#9fe81d]" />
              <span>Chertsey &amp; Surrey Service Desk</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
              GET IN TOUCH <span className="text-[#9fe81d]">WITH LINCS</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              Book a free site consultation, request a custom quote, or message our team directly. We are ready to make your premises sparkle.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Cards & Prominent Social Links */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Info */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold font-display uppercase tracking-tight text-white flex items-center gap-2">
                <span>Direct Contact Details</span>
                <span className="w-2 h-2 rounded-full bg-[#9fe81d]" />
              </h2>

              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#9fe81d] text-neutral-950 flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Phone / Quote Hotline
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="text-xl font-black font-mono text-white hover:text-[#9fe81d] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <p className="text-xs text-neutral-400 mt-0.5">Direct line to our Chertsey dispatch</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#9fe81d] text-neutral-950 flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-base font-bold font-mono text-white hover:text-[#9fe81d] transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <p className="text-xs text-neutral-400 mt-0.5">24h turnaround for quotes &amp; tenders</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#9fe81d] text-neutral-950 flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Registered Address
                    </span>
                    <p className="text-sm font-bold text-white uppercase leading-snug">
                      {COMPANY_INFO.address}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">Chertsey, Surrey, KT16 8PW</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#1e2e1a] text-[#9fe81d] border border-[#9fe81d]/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Operating Hours
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {COMPANY_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prominent Social Media Cards matching flyer */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
              <div>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white">
                  Follow Us On Social Media
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  See real video proof of our commercial cleans, kitchen degreasing, and carpet extraction in Surrey.
                </p>
              </div>

              {/* Instagram Card & Button */}
              <div className="space-y-2">
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg hover:opacity-95 transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl border-2 border-white flex items-center justify-center p-0.5">
                      <div className="w-4 h-4 rounded-full border-2 border-white" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-white/80">
                        Follow on Instagram
                      </span>
                      <span className="block text-base sm:text-lg font-black font-display uppercase">
                        {COMPANY_INFO.instagram}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => onOpenSocialModal('instagram')}
                  className="w-full text-center text-xs text-neutral-400 hover:text-[#9fe81d] transition-colors py-1 cursor-pointer"
                >
                  Click to preview recent Instagram reels here
                </button>
              </div>

              {/* TikTok Card & Button */}
              <div className="space-y-2 pt-1">
                <a
                  href={COMPANY_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-black border-2 border-neutral-700 hover:border-[#9fe81d] text-white shadow-lg transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sm font-black">
                      <span className="text-[#00f2fe] drop-shadow-[1px_1px_0px_#fe2c55]">♪</span>
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Follow on TikTok
                      </span>
                      <span className="block text-base sm:text-lg font-black font-display uppercase text-white">
                        {COMPANY_INFO.tiktok}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => onOpenSocialModal('tiktok')}
                  className="w-full text-center text-xs text-neutral-400 hover:text-[#9fe81d] transition-colors py-1 cursor-pointer"
                >
                  Click to preview viral satisfying TikTok transformations
                </button>
              </div>
            </div>

            {/* Service Radius Indicator */}
            <div className="bg-[#121c11] border border-[#9fe81d]/30 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#bef264]">
                <ShieldCheck className="w-4 h-4 text-[#9fe81d]" />
                <span>15-Mile Primary Service Radius from KT16</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Chertsey · Addlestone · Weybridge · Woking · Staines · Egham · Shepperton · Walton-on-Thames · Cobham · Greater London on request.
              </p>
            </div>
          </div>

          {/* Right Column: Comprehensive Contact & Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9fe81d]">
                  Inquiry &amp; Booking Form
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white mt-1">
                  Send Your Cleaning Request
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  We reply within 24 business hours with an itemised specification and fixed quotation.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 space-y-5 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-[#1e2e1a] border-2 border-[#9fe81d] text-[#9fe81d] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    Request Received Successfully!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry reference number is:
                  </p>
                  <div className="inline-block bg-neutral-950 border border-neutral-700 px-6 py-3 rounded-xl font-mono text-base font-bold text-[#9fe81d]">
                    #{ticketId}
                  </div>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    A LINCS operations manager will review your property requirements and contact you via{' '}
                    <span className="font-semibold text-white capitalize">{contactMethod}</span> at{' '}
                    <span className="font-mono text-white">{formData.phone || formData.email}</span>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#9fe81d]" />
                      <span>Need Urgent Service? Call {COMPANY_INFO.phone}</span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          serviceId: 'office-cleaning',
                          frequency: 'one-off',
                          propertyType: 'office',
                          propertySize: 'Medium',
                          postcode: 'KT16 8PW',
                          message: '',
                          preferredTime: 'Morning',
                        });
                      }}
                      className="px-6 py-3 rounded-xl bg-[#9fe81d] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-[#8cd412]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcus Sterling"
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-4 py-3 rounded-xl text-sm transition-colors outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 07490 705078"
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-4 py-3 rounded-xl text-sm transition-colors outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Email & Postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. info@company.co.uk"
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-4 py-3 rounded-xl text-sm transition-colors outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Property Postcode / Town *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        placeholder="e.g. KT16 8PW (Chertsey)"
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-4 py-3 rounded-xl text-sm transition-colors outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Service & Frequency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#9fe81d] text-white px-4 py-3 rounded-xl text-sm transition-colors outline-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                        <option value="custom">Other / Custom Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Cleaning Frequency
                      </label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#9fe81d] text-white px-4 py-3 rounded-xl text-sm transition-colors outline-none"
                      >
                        <option value="one-off">One-Off Deep Clean</option>
                        <option value="daily">Daily Commercial (Mon-Fri)</option>
                        <option value="weekly">Weekly Regular Clean</option>
                        <option value="bi-weekly">Fortnightly Clean</option>
                        <option value="monthly">Monthly Periodic Clean</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred contact channel */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Preferred Callback Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'phone', label: 'Phone Call' },
                        { id: 'whatsapp', label: 'WhatsApp' },
                        { id: 'email', label: 'Email' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setContactMethod(item.id as 'phone' | 'email' | 'whatsapp')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                            contactMethod === item.id
                              ? 'bg-[#1e2e1a] border-[#9fe81d] text-white'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Request Details &amp; Property Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share any helpful details (e.g. number of floors, square footage, whether carpets need extraction, kitchen grease levels, preferred shift time)..."
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white p-4 rounded-xl text-sm transition-colors outline-none resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <ShieldCheck className="w-4 h-4 text-[#9fe81d]" />
                      <span>Data protected · No spam guaranteed</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Cleaning Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions Accordion */}
      <section className="py-16 bg-neutral-900/60 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9fe81d]">
              Got Questions?
            </span>
            <h2 className="text-3xl font-black font-display uppercase tracking-tight text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-colors hover:border-neutral-700"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#9fe81d] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
