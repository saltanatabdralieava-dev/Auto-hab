export interface Car {
  id: string;
  brand: string;
  model: string;
  generation?: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  transmission: {
    RU: string;
    KG: string;
    EN: string;
  };
  drive: {
    RU: string;
    KG: string;
    EN: string;
  };
  color: {
    RU: string;
    KG: string;
    EN: string;
  };
  image: string;
  dealer: string;
  city: {
    RU: string;
    KG: string;
    EN: string;
  };
  isNew?: boolean;
  featured?: boolean;
  whatsappNumber: string;
  phoneNumber: string;
  description: {
    RU: string;
    KG: string;
    EN: string;
  };
  fuelType: {
    RU: string;
    KG: string;
    EN: string;
  };
  bodyType: {
    RU: string;
    KG: string;
    EN: string;
  };
  status: 'available' | 'sold' | 'paused';
  isPremium?: boolean;
  popularity: number;
  createdAt: string;
}

export type Language = 'RU' | 'KG' | 'EN';

export interface FilterState {
  brand: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  maxMileage: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  drive: string;
  condition: string; // 'all', 'new', 'used'
}

