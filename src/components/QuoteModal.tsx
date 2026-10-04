import React, { useState } from 'react';
import { SERVICES, COMPANY_INFO } from '../data/cleaningData';
import { QuoteFormData } from '../types';
import { X, CheckCircle2, Sparkles, Send, Phone, Calendar } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    serviceId: preselectedServiceId || 'office-cleaning',
    frequency: 'weekly',
    propertyType: 'office',
    propertySize: 'Medium (1,000 - 3,000 sq ft)',
    postcode: 'KT16 8PW',
    message: '',
    preferredTime: 'Morning (07:00 - 11:00)',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `LINCS-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);

    // Save submission to localStorage
    const existing = JSON.parse(localStorage.getItem('lincs_quotes') || '[]');
    existing.push({
      ...formData,
      id,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });
    localStorage.setItem('lincs_quotes', JSON.stringify(existing));

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#121c11] border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9fe81d] text-neutral-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Request a Free Cleaning Quote
              </h3>
              <p className="text-xs text-[#9fe81d]">
                Zero-obligation · 24-hour turnaround · Surrey &amp; London
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1e2e1a] border-2 border-[#9fe81d] text-[#9fe81d] mx-auto flex items-center justify-center animate-bounce-short">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">
                Quote Request Received!
              </h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. We have generated your inquiry ticket:
              </p>
              <div className="inline-block bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 font-mono text-sm text-[#9fe81d] font-bold">
                Ticket #{ticketId}
              </div>
              <p className="text-xs text-neutral-400">
                A LINCS supervisor will review your specifications and contact you at{' '}
                <span className="text-white font-mono">{formData.phone || formData.email}</span> within 24 hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9fe81d]" />
                  <span>Call Us Directly</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-[#9fe81d] text-neutral-950 hover:bg-[#8cd412] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-3.5 py-2 rounded-lg text-sm transition-colors outline-none"
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
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-3.5 py-2 rounded-lg text-sm transition-colors outline-none font-mono"
                  />
                </div>
              </div>

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
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-3.5 py-2 rounded-lg text-sm transition-colors outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Postcode / Location
                  </label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="e.g. KT16 8PW"
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-3.5 py-2 rounded-lg text-sm transition-colors outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-3 py-2 rounded-lg text-sm transition-colors outline-none"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white px-3 py-2 rounded-lg text-sm transition-colors outline-none"
                  >
                    <option value="one-off">One-Off Deep Clean</option>
                    <option value="daily">Daily Commercial Shifts</option>
                    <option value="weekly">Weekly Regular Clean</option>
                    <option value="bi-weekly">Fortnightly Service</option>
                    <option value="monthly">Monthly Periodic Clean</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Property Notes / Specific Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the property (e.g. number of desks, carpet square meters, kitchen hood condition, parking access)..."
                  className="w-full bg-neutral-800 border border-neutral-700 focus:border-[#9fe81d] focus:ring-1 focus:ring-[#9fe81d] text-white p-3 rounded-lg text-sm transition-colors outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-[#9fe81d]" />
                  <span>DBS Checked Crew · Fully Insured</span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Quote Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
