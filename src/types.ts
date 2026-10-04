export type PageId = 'home' | 'services' | 'about' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'commercial' | 'hospitality' | 'industrial' | 'specialist';
  shortDesc: string;
  fullDesc: string;
  flyerMatch: boolean;
  idealFor: string[];
  checklist: string[];
  estimatedStartingPrice: string;
  frequency: string;
  iconName: string;
  badge?: string;
  bgGradient: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  frequency: string;
  propertyType: 'office' | 'restaurant' | 'industrial' | 'residential' | 'other';
  propertySize: string;
  postcode: string;
  message: string;
  preferredTime: string;
}

export interface ContactSubmission extends QuoteFormData {
  id: string;
  createdAt: string;
  status: 'pending' | 'responded';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  rating: number;
  serviceType: string;
  date: string;
}
