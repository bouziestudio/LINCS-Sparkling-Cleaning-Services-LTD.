import React, { useState } from 'react';

interface ServiceVisualProps {
  serviceId: string;
  className?: string;
  badgeLabel?: string;
  customImageUrl?: string;
}

// Curated high-resolution photography specifically representing each cleaning service
const SERVICE_PHOTOS: Record<string, { url: string; alt: string }> = {
  'office-cleaning': {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    alt: 'Pristine modern corporate office workspace with sanitized desks and glass partitions',
  },
  'restaurant-cleaning': {
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    alt: 'Sparkling sanitized commercial restaurant kitchen and dining facility',
  },
  'carpet-rug-cleaning': {
    url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    alt: 'Professional carpet hot water steam extraction and textile deep cleaning',
  },
  'factory-cleaning': {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    alt: 'Heavy duty industrial factory floor scrubbed and sanitized',
  },
  'end-of-tenancy': {
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    alt: 'Spotless deep cleaned tenancy property ready for handover inspection',
  },
  'window-cleaning': {
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    alt: 'Commercial pure water streak-free window and glass partition cleaning',
  },
};

export const ServiceVisual: React.FC<ServiceVisualProps> = ({
  serviceId,
  className = '',
  badgeLabel,
  customImageUrl,
}) => {
  const [imageError, setImageError] = useState(false);
  const photo = SERVICE_PHOTOS[serviceId] || SERVICE_PHOTOS['office-cleaning'];
  const src = customImageUrl || photo.url;

  return (
    <div className={`relative overflow-hidden group select-none bg-neutral-900 ${className}`}>
      {!imageError ? (
        <img
          src={src}
          alt={photo.alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      ) : (
        /* Styled fallback container */
        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center p-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#1e2e1a] border border-[#9fe81d]/40 mx-auto flex items-center justify-center text-[#9fe81d] text-lg font-bold">
              ✨
            </div>
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              {badgeLabel || serviceId.replace('-', ' ')}
            </p>
          </div>
        </div>
      )}

      {/* Subtle vignette gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* Signature White Badge Pill with Dark Bold Text matching the exact flyer */}
      {badgeLabel && (
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm text-neutral-950 font-black text-xs sm:text-sm tracking-wider uppercase px-3 py-1.5 rounded-md shadow-md border border-neutral-200">
            {badgeLabel}
          </div>
        </div>
      )}
    </div>
  );
};
