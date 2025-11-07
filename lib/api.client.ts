// Custom API client for the backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface SiteSettings {
  id: number;
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string | null;
  company_name: string;
  company_description: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

interface HeroSection {
  id: number;
  heading: string;
  subheading: string;
  primary_button_text: string;
  secondary_button_text: string;
  badge1: string | null;
  badge2: string | null;
}

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  display_order: number;
  show_in_footer: number;
}

interface PricingPlan {
  id: number;
  name: string;
  monthly_price: number;
  yearly_price: number;
  period: string;
  description: string;
  button_text: string;
  is_popular: number;
  is_coming_soon: number;
  display_order: number;
  features: string[];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await fetch(`${API_URL}/site-settings`, {
      cache: 'no-store' // Always get fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const response = await fetch(`${API_URL}/hero-section`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_URL}/services`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getFooterServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_URL}/services/footer`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching footer services:', error);
    return [];
  }
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const response = await fetch(`${API_URL}/pricing-plans`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return [];
  }
}
