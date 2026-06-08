export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  budget: number; // in USD
  additionalNotes?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

export type DesignStyle = 'Modern Luxury' | 'Minimalist Gold' | 'Imperial Gold' | 'Creative Studio';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office';
  style: DesignStyle;
  image: string;
  features: string[];
}

export interface MoodboardItem {
  id: string;
  name: string;
  category: 'furniture' | 'decor' | 'flooring' | 'lighting';
  icon: string;
  src?: string;
  color: string;
}

export interface PlacedElement {
  id: string;
  item: MoodboardItem;
  x: number;
  y: number;
  scale: number;
  rotation: number; // degrees
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface DesignAdviceResponse {
  advice: string;
  colorPalette: {
    name: string;
    hex: string;
    description: string;
  }[];
  shoppingList: {
    item: string;
    estimatedCost: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
  suggestedBookingService: string;
}
