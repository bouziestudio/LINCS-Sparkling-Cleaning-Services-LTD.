import React, { useState } from 'react';
import { PageId, ServiceItem } from '../types';
import { SERVICES } from '../data/cleaningData';
import { ServiceVisual } from '../components/ServiceVisual';
import {
  Sparkles,
  Check,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#0D140D] to-neutral-950 border-b border-neutral-800 py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2719] border border-[#9fe81d]/30 text-xs font-semibold text-[#bef264] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#9fe81d]" />
              <span>Full Commercial &amp; Specialist Service Catalog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
              SPARKLING CLEANING <span className="text-[#9fe81d]">SERVICES LIST</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              Every service is delivered by our own vetted, DBS-checked, and COSHH-certified specialists. Operating throughout Chertsey, Surrey, and surrounding regions.
            </p>
          </div>

          {/* Interactive Filter Pills/Buttons */}
          <div className="mt-10 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'commercial', label: 'Office & Commercial' },
              { id: 'hospitality', label: 'Restaurant & Hospitality' },
              { id: 'industrial', label: 'Industrial & Factory' },
              { id: 'specialist', label: 'Specialist Deep Cleans' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#9fe81d] text-neutral-950 shadow-md scale-105'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-[#9fe81d]/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Visual Header */}
                <div className="h-64 w-full bg-neutral-950 relative">
                  <ServiceVisual
                    serviceId={service.id}
                    className="w-full h-full"
                    badgeLabel={service.title.toUpperCase()}
                  />
                  {service.flyerMatch && (
                    <div className="absolute top-3 left-3 bg-[#9fe81d] text-neutral-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow">
                      FEATURED ON FLYER
                    </div>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <h2 className="text-2xl font-black font-display text-white">
                      {service.title}
                    </h2>
                    <p className="text-xs text-[#9fe81d] font-semibold mt-1">
                      Recommended: {service.frequency}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Checklist */}
                  <div className="pt-3 border-t border-neutral-800">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                      Included in this service:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                      {service.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#9fe81d] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-500">Ideal for:</span>
                    {service.idealFor.map((item, i) => (
                      <span
                        key={i}
                        className="bg-neutral-800 text-neutral-300 px-2.5 py-0.5 rounded-full text-[11px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-neutral-800/60 mt-4">
                <button
                  onClick={() => setSelectedServiceForModal(service)}
                  className="text-xs font-bold text-neutral-400 hover:text-white underline underline-offset-2"
                >
                  View Full Scope Specs
                </button>

                <button
                  onClick={() => onOpenQuote(service.id)}
                  className="px-6 py-2.5 rounded-xl bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book {service.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scope Detail Modal */}
      {selectedServiceForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedServiceForModal(null)}
        >
          <div
            className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full p-6 text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-display font-bold text-xl">{selectedServiceForModal.title}</h3>
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-neutral-300">{selectedServiceForModal.fullDesc}</p>
            <div>
              <p className="text-xs font-bold uppercase text-[#9fe81d] mb-2">Scope Checklist:</p>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {selectedServiceForModal.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#9fe81d] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = selectedServiceForModal.id;
                  setSelectedServiceForModal(null);
                  onOpenQuote(id);
                }}
                className="px-5 py-2 rounded-lg bg-[#9fe81d] text-neutral-950 font-bold text-xs uppercase"
              >
                Request Quote For This
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
