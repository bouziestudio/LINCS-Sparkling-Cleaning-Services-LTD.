import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/cleaningData';
import { DirectorPortrait } from '../components/DirectorPortrait';
import {
  Sparkles,
  MapPin,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-b from-[#0D140D] to-neutral-950 border-b border-neutral-800 py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2719] border border-[#9fe81d]/30 text-xs font-semibold text-[#bef264] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#9fe81d]" />
              <span>About LINCS Sparkling Cleaning Services Ltd</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
              COMMITTED TO <span className="text-[#9fe81d]">SURREY&apos;S CLEANEST</span> WORKSPACES
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
              Based at Clay Corner in Chertsey, LINCS was founded to eliminate the common headaches of commercial cleaning: unreliable crews, missed corners, and lack of accountability.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Company Story & Brand Vision + Managing Director */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e2e1a] border border-[#9fe81d]/40 text-xs font-bold text-[#bef264]">
              <Sparkles className="w-3.5 h-3.5 text-[#9fe81d]" />
              <span>Leadership &amp; Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
              A Local Surrey Partner You Can Count On
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              At <strong className="text-white">LINCS Sparkling Cleaning Services Ltd</strong>, we believe that clean, hygienic workspaces and dining environments are not a luxury—they are the bedrock of operational excellence, staff wellness, and customer trust.
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Whether preparing an office building in Chertsey for Monday morning, degreasing a high-volume commercial kitchen in Weybridge to pass strict Food Standards inspections, or extracting deep ground grime from factory floors, our uniform-clad specialists execute every job with military discipline.
            </p>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1e2e1a] border border-[#9fe81d]/40 flex items-center justify-center text-[#9fe81d]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Local Chertsey Headquarters</h4>
                  <p className="text-xs text-neutral-400">{COMPANY_INFO.address}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400">
                Being locally based means our mobile supervisor teams can reach any Surrey client within 30 minutes for urgent deep cleans or immediate quality check-ins.
              </p>
            </div>
          </div>

          {/* Managing Director Lincoln Christian Image & Profile */}
          <div className="lg:col-span-6">
            <DirectorPortrait />
          </div>
        </div>
      </section>

      {/* 3. Service Areas Across Surrey */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-800/80">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9fe81d]">
            Geographic Coverage
          </span>
          <h2 className="text-3xl font-black font-display uppercase tracking-tight text-white mt-1">
            Where We Operate in Surrey &amp; Beyond
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Headquartered in Clay Corner, Chertsey, our mobile cleaning fleet serves commercial clients throughout Surrey, Middlesex, and the M25 western corridor.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICE_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#9fe81d] text-xs font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{area.distance}</span>
                </div>
                <h4 className="font-bold text-sm text-white">{area.town}</h4>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 mt-2">
                {area.postcode}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="py-16 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-white">
            Experience the LINCS Sparkle on Your Next Shift
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto">
            Book a complimentary on-site visit in Chertsey, Weybridge, Woking, or across Surrey. We will assess your space, outline a tailored cleaning schedule, and provide a fixed rate quotation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenQuote}
              className="px-8 py-3.5 rounded-xl bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              Request Free Site Survey
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Our Chertsey Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
