
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  serviceCount: number;
  imageUrl: string;
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  location: string;
  avatarUrl?: string;
  initials: string;
  rating: number;
  service: string;
  comment: string;
}

export interface Service {
  id: number;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  professional: {
    name: string;
    avatarUrl: string;
    experience: string;
  };
  rating: number;
  reviews: number;
  duration: string;
  location: string;
  availableNow?: boolean;
  verified?: boolean;
}
