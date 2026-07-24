import React, { useState, useMemo } from 'react';
import { 
  Calendar, Gauge, Zap, Sparkles, MapPin, Truck, FileText, 
  CheckCircle2, MessageCircle, Search, SlidersHorizontal, ArrowUpDown, 
  X, Info, Phone, Compass, Landmark, RefreshCw, Layers
} from 'lucide-react';

interface AuctionsPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onNavigateToCalculator?: (tab?: string) => void;
}

interface AuctionCar {
  id: string;
  countryId: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  engineVolume: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Automatic' | 'Manual' | 'Robotic';
  bodyType: 'Sedan' | 'SUV' | 'Crossover' | 'Coupe' | 'Hatchback' | 'Minivan';
  auctionGrade: string;
  auctionPrice: number;
  deliveryCost: number;
  customsCost: number;
  totalCost: number;
  image: string;
  gallery: string[];
}

const COUNTRIES = [
  { id: 'kr', name: { RU: 'Южная Корея', KG: 'Түштүк Корея', EN: 'South Korea' }, flag: '🇰🇷', shippingCost: 2500, transitDays: '25-35', route: { RU: 'Инчхон ➔ Бишкек (через КНР)', KG: 'Инчхон ➔ Бишкек (КЭР аркылуу)', EN: 'Incheon ➔ Bishkek (via China)' } },
  { id: 'jp', name: { RU: 'Япония', KG: 'Япония', EN: 'Japan' }, flag: '🇯🇵', shippingCost: 3200, transitDays: '35-45', route: { RU: 'Кобе/Йокогама ➔ Бишкек', KG: 'Кобе/Йокогама ➔ Бишкек', EN: 'Kobe/Yokohama ➔ Bishkek' } },
  { id: 'us', name: { RU: 'США', KG: 'АКШ', EN: 'USA' }, flag: '🇺🇸', shippingCost: 3800, transitDays: '55-70', route: { RU: 'Техас/Калифорния ➔ Литва ➔ Бишкек', KG: 'Техас/Калифорния ➔ Литва ➔ Бишкек', EN: 'Texas/California ➔ Lithuania ➔ Bishkek' } },
  { id: 'ae', name: { RU: 'ОАЭ / Дубай', KG: 'БАЭ / Дубай', EN: 'UAE / Dubai' }, flag: '🇦🇪', shippingCost: 2200, transitDays: '20-30', route: { RU: 'Дубай (Джебель-Али) ➔ Бишкек', KG: 'Дубай (Жебел-Али) ➔ Бишкек', EN: 'Dubai (Jebel Ali) ➔ Bishkek' } },
  { id: 'de', name: { RU: 'Германия', KG: 'Германия', EN: 'Germany' }, flag: '🇩🇪', shippingCost: 3000, transitDays: '15-25', route: { RU: 'Франкфурт ➔ Литва ➔ Бишкек', KG: 'Франкфурт ➔ Литва ➔ Бишкек', EN: 'Frankfurt ➔ Lithuania ➔ Bishkek' } },
  { id: 'fr', name: { RU: 'Франция', KG: 'Франция', EN: 'France' }, flag: '🇫🇷', shippingCost: 3100, transitDays: '18-28', route: { RU: 'Париж ➔ Литва ➔ Бишкек', KG: 'Париж ➔ Литва ➔ Бишкек', EN: 'Paris ➔ Lithuania ➔ Bishkek' } },
  { id: 'it', name: { RU: 'Италия', KG: 'Италия', EN: 'Italy' }, flag: '🇮🇹', shippingCost: 3300, transitDays: '20-30', route: { RU: 'Милан ➔ Литва ➔ Бишкек', KG: 'Милан ➔ Литва ➔ Бишкек', EN: 'Milan ➔ Lithuania ➔ Bishkek' } },
  { id: 'cn', name: { RU: 'Китай', KG: 'Кытай', EN: 'China' }, flag: '🇨🇳', shippingCost: 1400, transitDays: '10-15', route: { RU: 'Урумчи/Кашгар ➔ Торугарт ➔ Бишкек', KG: 'Урумчи/Кашгар ➔ Торугарт ➔ Бишкек', EN: 'Urumqi/Kashgar ➔ Torugart ➔ Bishkek' } },
];

// Helper to calculate realistic customs cost in KG
function getCustomsCost(price: number, cc: number, year: number, fuel: string): number {
  if (fuel === 'Electric') {
    return 150; // Duty free in KG for EV, only minimal local registration fee
  }
  const age = Math.max(0, 2026 - year);
  let ratePerCc = 1.5;
  if (fuel === 'Hybrid') {
    if (age <= 3) ratePerCc = 0.5;
    else if (age <= 5) ratePerCc = 0.8;
    else if (age <= 7) ratePerCc = 1.2;
    else ratePerCc = 2.0;
  } else {
    if (age <= 3) ratePerCc = 1.6;
    else if (age <= 5) ratePerCc = 1.2;
    else if (age <= 7) ratePerCc = 1.8;
    else ratePerCc = 3.2;
  }
  const duty = cc * ratePerCc;
  const vat = price * 0.12; // 12% approximate VAT
  return Math.round(duty + vat + 200);
}

// Generate the 48 cars programmatically using base seeds to avoid code bloating
const BASE_CARS_CONFIG: Record<string, Array<{
  brand: string;
  model: string;
  year: number;
  mileage: number;
  engineVolume: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Automatic' | 'Manual' | 'Robotic';
  bodyType: 'Sedan' | 'SUV' | 'Crossover' | 'Coupe' | 'Hatchback' | 'Minivan';
  auctionGrade: string;
  auctionPrice: number;
  image: string;
}>> = {
  kr: [
    { brand: 'Hyundai', model: 'Palisade Calligraphy', year: 2022, mileage: 34000, engineVolume: 2200, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'A / 4.5', auctionPrice: 24200, image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Genesis', model: 'GV80 AWD', year: 2023, mileage: 19000, engineVolume: 2500, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'S / 5.0', auctionPrice: 39500, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Kia', model: 'Sorento Signature', year: 2021, mileage: 48000, engineVolume: 2200, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'A+ / 4.5', auctionPrice: 19800, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Hyundai', model: 'Sonata N-Line', year: 2022, mileage: 28000, engineVolume: 2000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'A / 4.0', auctionPrice: 14500, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Kia', model: 'Carnival Noblesse', year: 2023, mileage: 15000, engineVolume: 3500, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Minivan', auctionGrade: 'S / 5.0', auctionPrice: 26800, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Hyundai', model: 'Grandeur Executive', year: 2024, mileage: 8500, engineVolume: 2500, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'S / Pristine', auctionPrice: 22400, image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600' }
  ],
  jp: [
    { brand: 'Toyota', model: 'Land Cruiser Prado', year: 2021, mileage: 41000, engineVolume: 2700, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: '4.5 / B', auctionPrice: 28500, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Lexus', model: 'RX 450h F-Sport', year: 2022, mileage: 26000, engineVolume: 3500, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: '5.0 / A', auctionPrice: 36000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Toyota', model: 'RAV4 Hybrid', year: 2023, mileage: 14000, engineVolume: 2500, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'Crossover', auctionGrade: '4.5 / A', auctionPrice: 19500, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Honda', model: 'Fit e:HEV', year: 2021, mileage: 52000, engineVolume: 1500, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'Hatchback', auctionGrade: '4.0 / B', auctionPrice: 8900, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Subaru', model: 'Outback Touring', year: 2022, mileage: 32000, engineVolume: 2500, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Crossover', auctionGrade: '4.5 / B', auctionPrice: 17200, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Nissan', model: 'X-Trail e-Power', year: 2023, mileage: 18000, engineVolume: 1500, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'Crossover', auctionGrade: '4.5 / A', auctionPrice: 16400, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' }
  ],
  us: [
    { brand: 'Tesla', model: 'Model 3 Dual Motor', year: 2022, mileage: 21000, engineVolume: 0, fuelType: 'Electric', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'Clean Title', auctionPrice: 22000, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Ford', model: 'Mustang GT Premium', year: 2021, mileage: 33000, engineVolume: 5000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Coupe', auctionGrade: 'Clean Title', auctionPrice: 24500, image: 'https://images.unsplash.com/photo-1611245801314-e0a5db90c744?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Jeep', model: 'Grand Cherokee L', year: 2023, mileage: 17000, engineVolume: 3600, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Clean Title', auctionPrice: 28900, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Chevrolet', model: 'Camaro RS LT1', year: 2022, mileage: 26000, engineVolume: 2000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Coupe', auctionGrade: 'Clean Title', auctionPrice: 18500, image: 'https://images.unsplash.com/photo-1611245801314-e0a5db90c744?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Dodge', model: 'Challenger SXT Plus', year: 2021, mileage: 42000, engineVolume: 3600, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Coupe', auctionGrade: 'Clean Title', auctionPrice: 17800, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Ford', model: 'Explorer Limited', year: 2023, mileage: 16000, engineVolume: 2300, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Clean Title', auctionPrice: 23000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' }
  ],
  ae: [
    { brand: 'Nissan', model: 'Patrol V6 Titanium', year: 2022, mileage: 31000, engineVolume: 4000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade A', auctionPrice: 33500, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Lexus', model: 'LX 570 Signature', year: 2021, mileage: 51000, engineVolume: 5700, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade A', auctionPrice: 49500, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Toyota', model: 'Land Cruiser 300 VXR', year: 2023, mileage: 12000, engineVolume: 3500, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade S', auctionPrice: 56000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Mercedes-Benz', model: 'G63 AMG Carbon', year: 2022, mileage: 25000, engineVolume: 4000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade A', auctionPrice: 87000, image: 'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Porsche', model: 'Cayenne S Platinum', year: 2023, mileage: 15000, engineVolume: 3000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade S', auctionPrice: 43500, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Land Rover', model: 'Range Rover Sport', year: 2022, mileage: 28000, engineVolume: 3000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade A', auctionPrice: 39800, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' }
  ],
  de: [
    { brand: 'BMW', model: 'X5 xDrive40i M Sport', year: 2022, mileage: 25000, engineVolume: 3000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Excellent', auctionPrice: 31800, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Mercedes-Benz', model: 'E-Class E300 Premium', year: 2023, mileage: 16000, engineVolume: 2000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'Perfect', auctionPrice: 28900, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Audi', model: 'Q7 50 TDI S-Line', year: 2021, mileage: 56000, engineVolume: 3000, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Very Good', auctionPrice: 24900, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Porsche', model: '911 Carrera S PDK', year: 2022, mileage: 10000, engineVolume: 3000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Coupe', auctionGrade: 'Pristine', auctionPrice: 67000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Volkswagen', model: 'Touareg 3.0 V6 TDI', year: 2023, mileage: 23000, engineVolume: 3000, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Excellent', auctionPrice: 27900, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' },
    { brand: 'BMW', model: '5 Series 530d M Tech', year: 2021, mileage: 48000, engineVolume: 3000, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'Very Good', auctionPrice: 21500, image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600' }
  ],
  fr: [
    { brand: 'Peugeot', model: '3008 GT Line', year: 2022, mileage: 39000, engineVolume: 1500, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'Crossover', auctionGrade: 'Excellent', auctionPrice: 12800, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Renault', model: 'Koleos Initiale Paris', year: 2021, mileage: 46000, engineVolume: 2000, fuelType: 'Diesel', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Very Good', auctionPrice: 14950, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Citroen', model: 'C5 Aircross Hybrid', year: 2023, mileage: 18000, engineVolume: 1600, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'Crossover', auctionGrade: 'Excellent', auctionPrice: 15900, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Peugeot', model: '508 Fastback GT', year: 2022, mileage: 27000, engineVolume: 1600, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'Pristine', auctionPrice: 14600, image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Renault', model: 'Megane E-Tech EV60', year: 2023, mileage: 13000, engineVolume: 0, fuelType: 'Electric', transmission: 'Automatic', bodyType: 'Hatchback', auctionGrade: 'Excellent', auctionPrice: 19900, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Peugeot', model: '2008 Active PureTech', year: 2023, mileage: 15000, engineVolume: 1200, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Crossover', auctionGrade: 'Excellent', auctionPrice: 11500, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' }
  ],
  it: [
    { brand: 'Alfa Romeo', model: 'Stelvio Veloce AWD', year: 2022, mileage: 28000, engineVolume: 2000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Crossover', auctionGrade: 'Excellent', auctionPrice: 19800, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Maserati', model: 'Levante GranSport', year: 2021, mileage: 45000, engineVolume: 3000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Very Good', auctionPrice: 32500, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Fiat', model: '500X Lounge Turbo', year: 2022, mileage: 32000, engineVolume: 1300, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Hatchback', auctionGrade: 'Very Good', auctionPrice: 9900, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Alfa Romeo', model: 'Giulia Super Sport', year: 2023, mileage: 15000, engineVolume: 2000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'Pristine', auctionPrice: 17500, image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Maserati', model: 'Ghibli S Q4 GranLusso', year: 2022, mileage: 28000, engineVolume: 3000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'Excellent', auctionPrice: 26900, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Fiat', model: 'Tipo Life Multijet', year: 2023, mileage: 19000, engineVolume: 1600, fuelType: 'Diesel', transmission: 'Manual', bodyType: 'Sedan', auctionGrade: 'Good', auctionPrice: 8400, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' }
  ],
  cn: [
    { brand: 'BYD', model: 'Han EV Flagship', year: 2023, mileage: 11000, engineVolume: 0, fuelType: 'Electric', transmission: 'Automatic', bodyType: 'Sedan', auctionGrade: 'S / Pristine', auctionPrice: 23500, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Zeekr', model: '001 AWD You Edition', year: 2024, mileage: 6000, engineVolume: 0, fuelType: 'Electric', transmission: 'Automatic', bodyType: 'Hatchback', auctionGrade: 'S / Pristine', auctionPrice: 31500, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Li Auto', model: 'L9 Max Premium', year: 2023, mileage: 13000, engineVolume: 1500, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'S / New-like', auctionPrice: 39900, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Geely', model: 'Monjaro Flagship', year: 2023, mileage: 16000, engineVolume: 2000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade A', auctionPrice: 19800, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' },
    { brand: 'Changan', model: 'UNI-K Tech Jet', year: 2022, mileage: 29000, engineVolume: 2000, fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'Grade A', auctionPrice: 17950, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
    { brand: 'BYD', model: 'Song Plus DM-i 110KM', year: 2023, mileage: 15000, engineVolume: 1500, fuelType: 'Hybrid', transmission: 'Automatic', bodyType: 'SUV', auctionGrade: 'S / Pristine', auctionPrice: 19100, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600' }
  ]
};

// Compile fully calculated car instances
const ALL_AUCTION_CARS: AuctionCar[] = Object.keys(BASE_CARS_CONFIG).flatMap(countryId => {
  const country = COUNTRIES.find(c => c.id === countryId)!;
  return BASE_CARS_CONFIG[countryId].map((car, idx) => {
    const delivery = country.shippingCost;
    const customs = getCustomsCost(car.auctionPrice, car.engineVolume, car.year, car.fuelType);
    const total = car.auctionPrice + delivery + customs;
    
    // Create robust realistic gallery
    const placeholderGallery = [
      car.image,
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=600'
    ];

    return {
      ...car,
      id: `${countryId}_car_${idx + 1}`,
      countryId,
      deliveryCost: delivery,
      customsCost: customs,
      totalCost: total,
      gallery: placeholderGallery
    };
  });
});

export const AuctionsPage: React.FC<AuctionsPageProps> = ({ lang, onNavigateToCalculator }) => {
  // Filters state
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchModel, setSearchModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedBodyType, setSelectedBodyType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(100000); // Max total cost filter
  
  // Sorting state
  const [sortBy, setSortBy] = useState<string>('default'); // 'cheap', 'expensive', 'newest', 'mileage'

  // Modal control
  const [activeDetailCar, setActiveDetailCar] = useState<AuctionCar | null>(null);
  const [activeOrderCar, setActiveOrderCar] = useState<AuctionCar | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  
  // Order submission
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderComment, setOrderComment] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Translations
  const t = {
    title: lang === 'RU' ? 'Международные Автоаукционы' : lang === 'KG' ? 'Эл аралык Унаа Аукциондору' : 'International Car Auctions',
    subtitle: lang === 'RU' ? 'Прямой импорт проверенных автомобилей со всего мира по лучшим ценам.' : lang === 'KG' ? 'Эң жакшы баада дүйнө жүзү боюнча текшерилген унааларды түз импорттоо.' : 'Direct import of verified vehicles from around the globe at optimal prices.',
    badge: lang === 'RU' ? 'ДЕМО-АУКЦИОН' : lang === 'KG' ? 'ДЕМО-АУКЦИОН' : 'DEMO AUCTION',
    filter_all: lang === 'RU' ? 'Все страны' : lang === 'KG' ? 'Бардык өлкөлөр' : 'All Countries',
    label_brand: lang === 'RU' ? 'Марка' : lang === 'KG' ? 'Маркасы' : 'Brand',
    label_model: lang === 'RU' ? 'Модель' : lang === 'KG' ? 'Модели' : 'Model',
    label_year: lang === 'RU' ? 'Год выпуска' : lang === 'KG' ? 'Чыккан жылы' : 'Year',
    label_fuel: lang === 'RU' ? 'Тип топлива' : lang === 'KG' ? 'Күйүүчү май' : 'Fuel Type',
    label_transmission: lang === 'RU' ? 'Трансмиссия' : lang === 'KG' ? 'КПП' : 'Transmission',
    label_body: lang === 'RU' ? 'Тип кузова' : lang === 'KG' ? 'Кузовдун түрү' : 'Body Type',
    label_max_price: lang === 'RU' ? 'Макс. цена под ключ в КР' : lang === 'KG' ? 'Кыргызстандагы макс. толук баасы' : 'Max total cost in KG',
    label_search: lang === 'RU' ? 'Поиск модели...' : lang === 'KG' ? 'Моделди издөө...' : 'Search model...',
    
    sort_title: lang === 'RU' ? 'Сортировка' : lang === 'KG' ? 'Иреттөө' : 'Sorting',
    sort_default: lang === 'RU' ? 'По умолчанию' : lang === 'KG' ? 'Баштапкы' : 'Default',
    sort_cheap: lang === 'RU' ? 'Сначала дешевле' : lang === 'KG' ? 'Алгач арзандар' : 'Cheapest first',
    sort_expensive: lang === 'RU' ? 'Сначала дороже' : lang === 'KG' ? 'Алгач кымбаттар' : 'Most expensive first',
    sort_newest: lang === 'RU' ? 'Сначала новые' : lang === 'KG' ? 'Алгач жаңылар' : 'Newest cars',
    sort_mileage: lang === 'RU' ? 'С минимальным пробегом' : lang === 'KG' ? 'Минималдуу пробег менен' : 'Lowest mileage',

    stats_grade: lang === 'RU' ? 'Оценка аукциона' : lang === 'KG' ? 'Аукциондук баа' : 'Auction Grade',
    stats_mileage: lang === 'RU' ? 'Пробег' : lang === 'KG' ? 'Пробеги' : 'Mileage',
    stats_engine: lang === 'RU' ? 'Объем двигателя' : lang === 'KG' ? 'Кыймылдаткыч көлөмү' : 'Engine cc',
    stats_fuel: lang === 'RU' ? 'Топливо' : lang === 'KG' ? 'Күйүүчү май' : 'Fuel',
    stats_transmission: lang === 'RU' ? 'Коробка' : lang === 'KG' ? 'КПП' : 'Transmission',
    stats_price: lang === 'RU' ? 'Ставка на аукционе' : lang === 'KG' ? 'Аукциондогу баасы' : 'Auction Bid',
    stats_delivery: lang === 'RU' ? 'Доставка до Бишкека' : lang === 'KG' ? 'Бишкекке чейин жеткирүү' : 'Shipping to Bishkek',
    stats_customs: lang === 'RU' ? 'Растаможка КР (примерно)' : lang === 'KG' ? 'Бажы төлөмү (болжол менен)' : 'Customs in KG (est)',
    stats_total: lang === 'RU' ? 'Итого под ключ в КР' : lang === 'KG' ? 'Толук баасы КРда' : 'Total cost in KG',

    btn_details: lang === 'RU' ? 'Подробнее' : lang === 'KG' ? 'Кененирээк' : 'Details',
    btn_order: lang === 'RU' ? 'Заказать авто' : lang === 'KG' ? 'Унаага заказ берүү' : 'Order Car',
    btn_calc_delivery: lang === 'RU' ? 'Рассчитать доставку' : lang === 'KG' ? 'Жеткирүүнү эсептөө' : 'Calculate Shipping',
    btn_clear: lang === 'RU' ? 'Сбросить' : lang === 'KG' ? 'Тазалоо' : 'Clear Filters',
    
    modal_specs: lang === 'RU' ? 'Характеристики автомобиля' : lang === 'KG' ? 'Унаанын мүнөздөмөлөрү' : 'Vehicle Specifications',
    modal_report: lang === 'RU' ? 'Аукционный лист и Состояние' : lang === 'KG' ? 'Аукциондук баракча жана Абалы' : 'Auction Sheet & Condition',
    modal_timeline: lang === 'RU' ? 'Логистический маршрут и Сроки' : lang === 'KG' ? 'Логистикалык багыт жана Мөөнөттөр' : 'Logistics Route & Timeline',
    modal_price_breakdown: lang === 'RU' ? 'Расшифровка цены под ключ' : lang === 'KG' ? 'Толук баанын эсептелиши' : 'Total Cost Breakdown',
    modal_disclaimer: lang === 'RU' ? '* Все расчеты таможенных пошлин являются приблизительными и носят справочный характер.' : lang === 'KG' ? '* Бажы төлөмдөрүнүн бардык эсептөөлөрү болжолдуу жана маалымат катары берилет.' : '* All customs calculations are approximate and strictly for information purposes.',
    modal_contact_whatsapp: lang === 'RU' ? 'Консультация в WhatsApp' : lang === 'KG' ? 'WhatsApp аркылуу суроо' : 'WhatsApp Consultation',
    modal_calc_customs_btn: lang === 'RU' ? 'Открыть таможенный калькулятор' : lang === 'KG' ? 'Бажы калькуляторун ачуу' : 'Open Customs Calculator',
    
    order_title: lang === 'RU' ? 'Заявка на импорт автомобиля' : lang === 'KG' ? 'Унааны импорттоого табыштама' : 'Vehicle Import Request',
    order_subtitle: lang === 'RU' ? 'Оставьте ваши контакты. Наш менеджер подготовит официальный договор и сделает детальный расчет.' : lang === 'KG' ? 'Байланыш маалыматыңызды калтырыңыз. Менеджерибиз расмий келишим жана так эсептөө даярдайт.' : 'Leave your contact info. Our manager will prepare an official agreement and a detailed calculation.',
    order_name_placeholder: lang === 'RU' ? 'Ваше имя' : lang === 'KG' ? 'Атыңыз' : 'Your name',
    order_phone_placeholder: lang === 'RU' ? 'Номер телефона (например, 0555...)' : lang === 'KG' ? 'Телефон номериңиз (мисалы, 0555...)' : 'Phone number',
    order_comment_placeholder: lang === 'RU' ? 'Ваши пожелания (цвет, комплектация, бюджет...)' : lang === 'KG' ? 'Каалоолоруңуз (түсү, комплектациясы, бюджет...) ' : 'Your preferences (color, packages, budget...)',
    order_submit_btn: lang === 'RU' ? 'Отправить заявку менеджеру' : lang === 'KG' ? 'Табыштаманы жөнөтүү' : 'Send Request',
    order_success: lang === 'RU' ? 'Заявка успешно отправлена!' : lang === 'KG' ? 'Табыштама ийгиликтүү жөнөтүлдү!' : 'Request sent successfully!',
    order_success_desc: lang === 'RU' ? 'Мы получили ваш запрос. Наш ведущий специалист свяжется с вами по указанному номеру телефона в течение 10 минут!' : lang === 'KG' ? 'Биз сиздин сурооңузду алдык. Биздин башкы адис сиз менен 10 мүнөттүн ичинде байланышат!' : 'We received your request. Our leading manager will contact you within 10 minutes!'
  };

  // Get unique brands for filters
  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    ALL_AUCTION_CARS.forEach(c => brands.add(c.brand));
    return Array.from(brands).sort();
  }, []);

  // Filter and Sort implementation
  const filteredCars = useMemo(() => {
    return ALL_AUCTION_CARS.filter(car => {
      if (selectedCountry !== 'all' && car.countryId !== selectedCountry) return false;
      if (selectedBrand !== 'all' && car.brand !== selectedBrand) return false;
      if (searchModel && !car.model.toLowerCase().includes(searchModel.toLowerCase())) return false;
      if (selectedYear !== 'all' && car.year.toString() !== selectedYear) return false;
      if (selectedFuel !== 'all' && car.fuelType !== selectedFuel) return false;
      if (selectedTransmission !== 'all' && car.transmission !== selectedTransmission) return false;
      if (selectedBodyType !== 'all' && car.bodyType !== selectedBodyType) return false;
      if (car.totalCost > priceRange) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheap') return a.totalCost - b.totalCost;
      if (sortBy === 'expensive') return b.totalCost - a.totalCost;
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'mileage') return a.mileage - b.mileage;
      return 0; // Default or unsorted
    });
  }, [selectedCountry, selectedBrand, searchModel, selectedYear, selectedFuel, selectedTransmission, selectedBodyType, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCountry('all');
    setSelectedBrand('all');
    setSearchModel('');
    setSelectedYear('all');
    setSelectedFuel('all');
    setSelectedTransmission('all');
    setSelectedBodyType('all');
    setPriceRange(100000);
    setSortBy('default');
  };

  const handleOrderSubmit = (e: React.FormEvent, car: AuctionCar) => {
    e.preventDefault();
    if (!orderName || !orderPhone) return;
    setOrderSubmitted(true);
    
    // Simulate high-end action notification
    setTimeout(() => {
      // Clear values after brief timeout
      setOrderName('');
      setOrderPhone('');
      setOrderComment('');
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 pt-24" id="auctions-page">
      {/* Dynamic Ambient Header Hero Section */}
      <div className="bg-[#0B3D91] text-white py-16 relative overflow-hidden" id="auctions-hero">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-md mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          
          <h1 className="font-sans text-4xl sm:text-5xl font-black tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/90 max-w-3xl">
            {t.subtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: lang === 'RU' ? 'Комиссия от $300' : lang === 'KG' ? 'Комиссия $300-дон' : 'Agency fee from $300', desc: lang === 'RU' ? 'Фиксированная по договору' : lang === 'KG' ? 'Келишим боюнча бекитилген' : 'Fixed by official contract' },
              { label: lang === 'RU' ? '100% Страхование' : lang === 'KG' ? '100% Камсыздандыруу' : '100% Insured Delivery', desc: lang === 'RU' ? 'Полная компенсация рисков' : lang === 'KG' ? 'Бардык тобокелдиктерди жабуу' : 'Full compensation of damage' },
              { label: lang === 'RU' ? 'Юридическая чистота' : lang === 'KG' ? 'Юридикалык кепилдик' : 'Legal Verification', desc: lang === 'RU' ? 'Проверка истории автомобиля' : lang === 'KG' ? 'Тарыхын толук текшерүү' : 'Verification of history logs' },
              { label: lang === 'RU' ? 'Транзит 10-60 дней' : lang === 'KG' ? 'Жеткирүү 10-60 күн' : 'Delivery 10-60 Days', desc: lang === 'RU' ? 'Прямые логистические пути' : lang === 'KG' ? 'Түз логистикалык багыттар' : 'Direct express routes' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300">
                <p className="text-sm font-bold text-yellow-300">{stat.label}</p>
                <p className="text-xs text-white/70 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country Tabs Marketplace Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" id="auctions-marketplace">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 mb-10">
          
          <div className="flex flex-col space-y-6">
            {/* Horizontal Country Tabs */}
            <div className="border-b border-gray-100 pb-2">
              <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-none snap-x" id="country-tabs">
                <button
                  onClick={() => setSelectedCountry('all')}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-bold tracking-wide transition-all whitespace-nowrap snap-center cursor-pointer ${
                    selectedCountry === 'all'
                      ? 'bg-[#0B3D91] text-white shadow-lg shadow-blue-500/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>{t.filter_all}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCountry === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {ALL_AUCTION_CARS.length}
                  </span>
                </button>

                {COUNTRIES.map(country => {
                  const count = ALL_AUCTION_CARS.filter(c => c.countryId === country.id).length;
                  return (
                    <button
                      key={country.id}
                      onClick={() => setSelectedCountry(country.id)}
                      className={`flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-bold tracking-wide transition-all whitespace-nowrap snap-center cursor-pointer ${
                        selectedCountry === country.id
                          ? 'bg-[#0B3D91] text-white shadow-lg shadow-blue-500/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.name[lang]}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCountry === country.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Smart Interactive Advanced Filter Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" id="advanced-filters">
              
              {/* Search input */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.label_model}</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                    placeholder={t.label_search}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Brand Select */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.label_brand}</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                >
                  <option value="all">{lang === 'RU' ? 'Все марки' : lang === 'KG' ? 'Бардык маркалар' : 'All Brands'}</option>
                  {uniqueBrands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Year Select */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.label_year}</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                >
                  <option value="all">{lang === 'RU' ? 'Все годы' : lang === 'KG' ? 'Бардык жылдар' : 'All Years'}</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.label_fuel}</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                >
                  <option value="all">{lang === 'RU' ? 'Любое топливо' : lang === 'KG' ? 'Күйүүчү майдын баары' : 'Any Fuel'}</option>
                  <option value="Petrol">{lang === 'RU' ? 'Бензин' : lang === 'KG' ? 'Бензин' : 'Petrol'}</option>
                  <option value="Diesel">{lang === 'RU' ? 'Дизель' : lang === 'KG' ? 'Дизель' : 'Diesel'}</option>
                  <option value="Hybrid">{lang === 'RU' ? 'Гибрид' : lang === 'KG' ? 'Гибрид' : 'Hybrid'}</option>
                  <option value="Electric">{lang === 'RU' ? 'Электро' : lang === 'KG' ? 'Электро' : 'Electric'}</option>
                </select>
              </div>

              {/* Body Type */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.label_body}</label>
                <select
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                >
                  <option value="all">{lang === 'RU' ? 'Любой кузов' : lang === 'KG' ? 'Кузовдун баары' : 'Any Body'}</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Crossover">Crossover</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Minivan">Minivan</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.label_transmission}</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                >
                  <option value="all">{lang === 'RU' ? 'Все коробки' : lang === 'KG' ? 'Коробка баары' : 'Any Gearbox'}</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.label_max_price}</label>
                  <span className="text-xs font-black text-[#0B3D91] bg-blue-50 px-2 py-0.5 rounded-full">
                    ${priceRange.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#0B3D91] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>

            </div>

            {/* Controls actions, Sorting, Clear Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 gap-4">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <SlidersHorizontal className="w-4 h-4 text-[#0B3D91]" />
                <span className="text-xs text-gray-500 font-bold">
                  {lang === 'RU' ? `Найдено авто: ${filteredCars.length}` : lang === 'KG' ? `Табылган унаалар: ${filteredCars.length}` : `Vehicles found: ${filteredCars.length}`}
                </span>
                <button 
                  onClick={handleClearFilters}
                  className="text-xs font-black text-red-500 hover:text-red-700 underline transition-colors cursor-pointer"
                >
                  {t.btn_clear}
                </button>
              </div>

              {/* Sorting options */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-bold whitespace-nowrap">{t.sort_title}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3D91] font-bold"
                >
                  <option value="default">{t.sort_default}</option>
                  <option value="cheap">{t.sort_cheap}</option>
                  <option value="expensive">{t.sort_expensive}</option>
                  <option value="newest">{t.sort_newest}</option>
                  <option value="mileage">{t.sort_mileage}</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Demo Warning Sign */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center space-x-3 text-amber-800 mb-8 shadow-sm">
          <Info className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="text-xs font-semibold leading-relaxed">
            {lang === 'RU' 
              ? 'Данный раздел работает в демонстрационном режиме «Демо-аукцион». Все автомобили, цены, лоты и сроки доставки носят ознакомительный характер на основе реальной рыночной аналитики. Оформление заказа отправляет запрос менеджеру для подбора автомобиля.'
              : lang === 'KG'
              ? 'Бул бөлүм «Демо-аукцион» демо режиминде иштейт. Бардык унаалар, баалар жана мөөнөттөр таанышуу максатында гана берилген. Заказ берүү менеджерге реалдуу унааны таап берүү үчүн табыштама жөнөтөт.'
              : 'This section runs in the "Demo Auction" mode. All listed cars, prices, and shipping logistics are realistic mock values for illustration based on market trends. Ordering a car contacts a manager to assist you.'}
          </div>
        </div>

        {/* Cars Catalog Grid */}
        {filteredCars.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center text-gray-500 shadow-md">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-black text-gray-700">{lang === 'RU' ? 'Ничего не найдено' : lang === 'KG' ? 'Эч нерсе табылган жок' : 'No vehicles match filters'}</h3>
            <p className="text-sm text-gray-400 mt-1">{lang === 'RU' ? 'Попробуйте изменить параметры фильтрации или сбросить их.' : lang === 'KG' ? 'Башка параметрлерди тандап көрүңүз же баарын өчүрүңүз.' : 'Try relaxing some criteria or click Clear.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="auctions-cars-grid">
            {filteredCars.map((car) => {
              const country = COUNTRIES.find(c => c.id === car.countryId)!;
              return (
                <div 
                  key={car.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container with Floating Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={car.image} 
                      alt={`${car.brand} ${car.model}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Country Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-md px-2.5 py-1.5 rounded-full flex items-center space-x-1.5 text-xs font-black text-slate-800">
                      <span>{country.flag}</span>
                      <span>{country.name[lang]}</span>
                    </div>

                    {/* Floating Auction Grade */}
                    <div className="absolute top-3 right-3 bg-yellow-400 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-1.5 rounded-lg shadow-sm">
                      {car.auctionGrade}
                    </div>

                    {/* Floating Car info model in gradient */}
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <p className="text-xs font-bold text-yellow-300 tracking-wide uppercase">
                        {car.year} • {car.bodyType}
                      </p>
                      <h3 className="text-lg font-black text-white leading-tight">
                        {car.brand} {car.model}
                      </h3>
                    </div>
                  </div>

                  {/* Core Vehicle Specifications Grid */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div className="grid grid-cols-2 gap-3.5 border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Gauge className="w-4 h-4 text-[#0B3D91] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{t.stats_mileage}</p>
                          <p className="text-xs font-black text-slate-800">{car.mileage.toLocaleString()} km</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Zap className="w-4 h-4 text-[#0B3D91] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{t.stats_engine}</p>
                          <p className="text-xs font-black text-slate-800">
                            {car.engineVolume > 0 ? `${(car.engineVolume / 1000).toFixed(1)}L` : 'Electric'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Layers className="w-4 h-4 text-[#0B3D91] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{t.stats_transmission}</p>
                          <p className="text-xs font-black text-slate-800">{car.transmission}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Compass className="w-4 h-4 text-[#0B3D91] shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{t.stats_fuel}</p>
                          <p className="text-xs font-black text-slate-800">{car.fuelType}</p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Pricing breakdown Card box */}
                    <div className="bg-slate-50 rounded-xl p-3.5 mb-5 space-y-1.5 border border-slate-100">
                      <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                        <span>{t.stats_price}:</span>
                        <span className="font-bold text-slate-800">${car.auctionPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                        <span>{t.stats_delivery}:</span>
                        <span className="font-bold text-slate-800">${car.deliveryCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                        <span>{t.stats_customs}:</span>
                        <span className="font-bold text-slate-800">${car.customsCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-1.5 border-t border-dashed border-gray-200 font-bold text-[#0B3D91]">
                        <span>{t.stats_total}:</span>
                        <span className="text-sm font-black">${car.totalCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Buttons CTA Grid */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => {
                            setActiveDetailCar(car);
                            setActiveGalleryIndex(0);
                          }}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer"
                        >
                          {t.btn_details}
                        </button>
                        <button 
                          onClick={() => {
                            setActiveOrderCar(car);
                            setOrderSubmitted(false);
                          }}
                          className="w-full bg-[#0B3D91] hover:bg-blue-800 text-white py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          {t.btn_order}
                        </button>
                      </div>

                      <button 
                        onClick={() => {
                          if (onNavigateToCalculator) {
                            onNavigateToCalculator('delivery');
                          }
                        }}
                        className="w-full flex items-center justify-center space-x-1.5 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200/60 text-yellow-800 py-2 rounded-lg text-[11px] font-black tracking-wide uppercase transition-all cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>{t.btn_calc_delivery}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL 1: PREMIUM VEHICLE DETAILS PAGE */}
      {activeDetailCar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden border border-slate-100 relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#0B3D91] text-white">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{COUNTRIES.find(c => c.id === activeDetailCar.countryId)?.flag}</span>
                <span className="text-xs font-black tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">
                  {COUNTRIES.find(c => c.id === activeDetailCar.countryId)?.name[lang]}
                </span>
                <span className="text-sm font-bold text-yellow-300">| {activeDetailCar.auctionGrade} Grade</span>
              </div>
              <button 
                onClick={() => setActiveDetailCar(null)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto flex-1 p-6 space-y-8 text-left">
              
              {/* Image Gallery Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-3">
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md relative">
                    <img 
                      src={activeDetailCar.gallery[activeGalleryIndex]} 
                      alt="Gallery active"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-bold">
                      {activeGalleryIndex + 1} / {activeDetailCar.gallery.length}
                    </div>
                  </div>
                  
                  {/* Thumbnails list */}
                  <div className="flex space-x-2 overflow-x-auto pb-1">
                    {activeDetailCar.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGalleryIndex(i)}
                        className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          activeGalleryIndex === i ? 'border-[#0B3D91] scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">
                      {activeDetailCar.brand} {activeDetailCar.model}
                    </h2>
                    <p className="text-sm text-gray-400 font-bold tracking-wide uppercase mt-1">
                      {activeDetailCar.year} • {activeDetailCar.bodyType}
                    </p>
                    
                    <div className="mt-4 inline-flex items-center space-x-2 bg-blue-50 text-[#0B3D91] px-3 py-1.5 rounded-lg">
                      <FileText className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-wider">
                        {lang === 'RU' ? 'Проверен Askar AutoHub' : lang === 'KG' ? 'Askar AutoHub текшерген' : 'Verified by Askar AutoHub'}
                      </span>
                    </div>
                  </div>

                  {/* Pricing Overview in modal */}
                  <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.stats_total}</p>
                    <p className="text-3xl font-black text-[#0B3D91] mt-1">
                      ${activeDetailCar.totalCost.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-400 font-semibold leading-relaxed mt-2">
                      {lang === 'RU' ? 'Включает стоимость авто на аукционе, страхование, доставку до г.Бишкек и таможенные сборы.' : lang === 'KG' ? 'Аукциондогу баасын, жеткирүүнү жана бардык бажы жыйымдарын камтыйт.' : 'Includes auction cost, insurance, shipment to Bishkek, and customs duty.'}
                    </p>
                  </div>

                  {/* Direct Contact triggers */}
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <button 
                      onClick={() => {
                        setActiveOrderCar(activeDetailCar);
                        setOrderSubmitted(false);
                      }}
                      className="bg-[#0B3D91] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>{t.btn_order}</span>
                    </button>
                    
                    <a 
                      href={`https://wa.me/996555123456?text=${encodeURIComponent(
                        lang === 'RU' 
                          ? `Здравствуйте! Меня интересует автомобиль с аукциона: ${activeDetailCar.brand} ${activeDetailCar.model} (${activeDetailCar.year}г., Оценка: ${activeDetailCar.auctionGrade}, Итого: $${activeDetailCar.totalCost.toLocaleString()}). Подскажите детали заказа.`
                          : `Саламатсызбы! Мага аукциондогу бул унаа кызыктуу: ${activeDetailCar.brand} ${activeDetailCar.model} (${activeDetailCar.year}-ж., Баасы: ${activeDetailCar.auctionGrade}). Сураныч, кененирээк маалымат бериңиз.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all text-center flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0" />
                      <span>{t.modal_contact_whatsapp}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Technical specifications and Auction report details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Vehicle specifications list */}
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#0B3D91]" />
                    <span>{t.modal_specs}</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: lang === 'RU' ? 'Год производства' : lang === 'KG' ? 'Жылы' : 'Production Year', val: activeDetailCar.year },
                      { label: lang === 'RU' ? 'Пробег' : lang === 'KG' ? 'Пробеги' : 'Mileage', val: `${activeDetailCar.mileage.toLocaleString()} km` },
                      { label: lang === 'RU' ? 'Объем мотора' : lang === 'KG' ? 'Мотор көлөмү' : 'Engine Volume', val: activeDetailCar.engineVolume > 0 ? `${activeDetailCar.engineVolume} cc` : 'EV (0 cc)' },
                      { label: lang === 'RU' ? 'Вид топлива' : lang === 'KG' ? 'Май куюу' : 'Fuel Type', val: activeDetailCar.fuelType },
                      { label: lang === 'RU' ? 'Трансмиссия' : lang === 'KG' ? 'КПП' : 'Transmission', val: activeDetailCar.transmission },
                      { label: lang === 'RU' ? 'Кузов' : lang === 'KG' ? 'Кузову' : 'Body Type', val: activeDetailCar.bodyType },
                      { label: lang === 'RU' ? 'Тип привода' : lang === 'KG' ? 'Тартуусу' : 'Drive Type', val: '4WD / AWD' },
                      { label: lang === 'RU' ? 'Цвет' : lang === 'KG' ? 'Түсү' : 'Color', val: lang === 'RU' ? 'Белый перламутр' : lang === 'KG' ? 'Ак бермет' : 'White Pearl' }
                    ].map((spec, i) => (
                      <div key={i} className="bg-slate-50 p-2.5 rounded-xl">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{spec.label}</p>
                        <p className="text-xs font-black text-slate-800 mt-0.5">{spec.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Auction condition sheet & Inspection log */}
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3D91]" />
                    <span>{t.modal_report}</span>
                  </h3>
                  
                  <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200 space-y-3.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold">{lang === 'RU' ? 'Двигатель и Трансмиссия' : lang === 'KG' ? 'Мотор жана КПП' : 'Engine & Transmission'}:</span>
                      <span className="text-green-600 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> <span>{lang === 'RU' ? 'Абсолютно чисто' : lang === 'KG' ? 'Таза' : 'Excellent'}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold">{lang === 'RU' ? 'Кузов и ЛКП' : lang === 'KG' ? 'Кузовдун абалы' : 'Paint & Body'}:</span>
                      <span className="text-yellow-600 font-bold flex items-center space-x-1">
                        <Info className="w-3.5 h-3.5" /> <span>{lang === 'RU' ? 'Мелкие сколы (A1)' : lang === 'KG' ? 'Майда чийиктер' : 'Minor chips (A1)'}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold">{lang === 'RU' ? 'Салон и Электрика' : lang === 'KG' ? 'Салон жана электроника' : 'Interior & Electronics'}:</span>
                      <span className="text-green-600 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> <span>{lang === 'RU' ? 'Состояние нового' : lang === 'KG' ? 'Жаңыдай' : 'Like New'}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold">{lang === 'RU' ? 'История владения' : lang === 'KG' ? 'Ээлеринин тарыхы' : 'Ownership logs'}:</span>
                      <span className="text-[#0B3D91] font-bold">1 {lang === 'RU' ? 'владелец' : lang === 'KG' ? 'ээси' : 'owner'}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'RU' ? 'Оценка инспектора' : lang === 'KG' ? 'Инспектордун корутундусу' : 'Inspector comments'}:</p>
                      <p className="text-xs text-slate-600 leading-relaxed italic mt-1 font-medium">
                        {lang === 'RU' 
                          ? '«Автомобиль в великолепном состоянии. Оригинальный пробег подтвержден базой данных. Дефекты кузова отсутствуют, ЛКП заводское. Салон чистый, без посторонних запахов. Рекомендуется к покупке.»'
                          : lang === 'KG'
                          ? '«Унаа мыкты абалда. Оригиналдуу пробеги тастыкталды. Салон таза, кузовунда кемчиликтер жок. Сатып алууга сунушталат.»'
                          : '"Vehicle is in magnificent condition. Genuine mileage is fully verified in historical logs. Paint is factory original. Interior is highly sterile. Strongly recommended."'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Delivery and Pricing details card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Logistics path details */}
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-[#0B3D91]" />
                    <span>{t.modal_timeline}</span>
                  </h3>

                  <div className="bg-slate-50 rounded-2xl p-4 space-y-4 border border-slate-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-semibold">{lang === 'RU' ? 'Ориентировочный срок' : lang === 'KG' ? 'Жеткирүү мөөнөтү' : 'Estimated transit'}:</span>
                      <span className="text-[#0B3D91] font-black">{COUNTRIES.find(c => c.id === activeDetailCar.countryId)?.transitDays} дней</span>
                    </div>

                    <div className="flex items-start space-x-3 text-xs">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">{lang === 'RU' ? 'Логистический путь' : lang === 'KG' ? 'Жеткирүү багыты' : 'Shipping Path'}</p>
                        <p className="text-slate-500 mt-1 font-semibold">{COUNTRIES.find(c => c.id === activeDetailCar.countryId)?.route[lang]}</p>
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                      {lang === 'RU' ? '* В доставку включено таможенное сопровождение, экспедирование в портах, страховка на всем пути транспортировки.' : lang === 'KG' ? '* Жеткирүүгө жолдогу бардык камсыздандыруу жана бажы документтерин коштоп жүрүү кирет.' : '* Delivery includes full marine insurance, broker operations, and custom tracking.'}
                    </div>
                  </div>
                </div>

                {/* Price breakdown and Calculator links */}
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-800 border-b border-gray-100 pb-2 flex items-center space-x-2">
                    <Landmark className="w-4 h-4 text-[#0B3D91]" />
                    <span>{t.modal_price_breakdown}</span>
                  </h3>

                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-500">{lang === 'RU' ? 'Стоимость на аукционе' : lang === 'KG' ? 'Аукциондук наркы' : 'Car auction bid'}:</span>
                      <span className="font-bold text-slate-800">${activeDetailCar.auctionPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-500">{lang === 'RU' ? 'Экспортные документы и доставка' : lang === 'KG' ? 'Экспорттук документтер жана жеткирүү' : 'Freight & Export docs'}:</span>
                      <span className="font-bold text-slate-800">${activeDetailCar.deliveryCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-500">{lang === 'RU' ? 'Пошлина КР и брокерские услуги' : lang === 'KG' ? 'Бажы төлөмдөрү' : 'Customs & brokerage'}:</span>
                      <span className="font-bold text-slate-800">${activeDetailCar.customsCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-500">{lang === 'RU' ? 'Агентская комиссия AutoHub' : lang === 'KG' ? 'AutoHub агенттик комиссиясы' : 'AutoHub Agency Fee'}:</span>
                      <span className="font-bold text-green-600">{lang === 'RU' ? 'Включено ($300)' : lang === 'KG' ? 'Кирет ($300)' : 'Included ($300)'}</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-2.5 flex justify-between font-black text-[#0B3D91] text-sm">
                      <span>{lang === 'RU' ? 'Итого' : lang === 'KG' ? 'Жалпы' : 'Total'}:</span>
                      <span>${activeDetailCar.totalCost.toLocaleString()}</span>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setActiveDetailCar(null);
                          if (onNavigateToCalculator) {
                            onNavigateToCalculator('customs');
                          }
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-100 hover:bg-blue-200 text-[#0B3D91] font-bold py-2 px-3 rounded-lg text-[11px] tracking-wider uppercase transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                        <span>{t.modal_calc_customs_btn}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="text-[10px] text-gray-400 font-bold text-center pt-4">
                {t.modal_disclaimer}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ORDER CAR FORM MODAL */}
      {activeOrderCar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 relative">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-[#0B3D91] text-white flex justify-between items-center">
              <h3 className="font-sans text-lg font-black tracking-wide">{t.order_title}</h3>
              <button 
                onClick={() => {
                  setActiveOrderCar(null);
                  setOrderSubmitted(false);
                }}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-left">
              {!orderSubmitted ? (
                <form onSubmit={(e) => handleOrderSubmit(e, activeOrderCar)} className="space-y-4">
                  
                  {/* Selected car quick info */}
                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex items-center space-x-3.5">
                    <img 
                      src={activeOrderCar.image} 
                      alt={activeOrderCar.model} 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover shrink-0" 
                    />
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        {COUNTRIES.find(c => c.id === activeOrderCar.countryId)?.flag} {activeOrderCar.year}
                      </span>
                      <h4 className="font-black text-slate-800 text-sm leading-tight">{activeOrderCar.brand} {activeOrderCar.model}</h4>
                      <p className="text-xs font-black text-[#0B3D91] mt-0.5">${activeOrderCar.totalCost.toLocaleString()} под ключ</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    {t.order_subtitle}
                  </p>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">{lang === 'RU' ? 'Ваше имя' : lang === 'KG' ? 'Атыңыз' : 'Your name'}</label>
                    <input
                      type="text"
                      required
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      placeholder={t.order_name_placeholder}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">{lang === 'RU' ? 'Номер телефона' : lang === 'KG' ? 'Телефон номериңиз' : 'Phone number'}</label>
                    <input
                      type="tel"
                      required
                      value={orderPhone}
                      onChange={(e) => setOrderPhone(e.target.value)}
                      placeholder={t.order_phone_placeholder}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold"
                    />
                  </div>

                  {/* Comments field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">{lang === 'RU' ? 'Комментарий (необязательно)' : lang === 'KG' ? 'Кошумча маалымат' : 'Comments (optional)'}</label>
                    <textarea
                      value={orderComment}
                      onChange={(e) => setOrderComment(e.target.value)}
                      placeholder={t.order_comment_placeholder}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-[#0B3D91] transition-all font-semibold resize-none"
                    />
                  </div>

                  {/* CTA submit */}
                  <button
                    type="submit"
                    className="w-full bg-[#0B3D91] hover:bg-blue-800 text-white font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-blue-500/10"
                  >
                    <span>{t.order_submit_btn}</span>
                  </button>

                </form>
              ) : (
                /* Interactive Success view with confetti style */
                <div className="py-8 px-4 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 text-green-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800">{t.order_success}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                    {t.order_success_desc}
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 inline-block">
                    <p className="font-bold text-slate-800">{lang === 'RU' ? 'Сведения о лоте' : lang === 'KG' ? 'Лоттун маалыматтары' : 'Lot Details'}:</p>
                    <p className="mt-1 font-semibold">{activeOrderCar.brand} {activeOrderCar.model} ({activeOrderCar.year})</p>
                    <p className="text-[#0B3D91] font-black mt-1">${activeOrderCar.totalCost.toLocaleString()}</p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setActiveOrderCar(null);
                        setOrderSubmitted(false);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-6 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      {lang === 'RU' ? 'Закрыть окно' : lang === 'KG' ? 'Жабуу' : 'Close'}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
