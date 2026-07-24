import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Printer, 
  Plus, 
  Calendar, 
  Gauge, 
  User, 
  Activity, 
  Wrench, 
  Search, 
  Clock, 
  Car as CarIcon, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  Info,
  Layers,
  Sparkles,
  RefreshCw,
  MapPin,
  Trash2,
  Lock,
  ArrowRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Definitions for Types
interface VehicleEvent {
  id: string;
  date: string;
  mileage: number;
  type: 'manufacturing' | 'import' | 'customs' | 'registration' | 'ownership' | 'service' | 'accident' | 'insurance' | 'inspection';
  title: string;
  description: string;
  location: string;
  operator: string;
  cost?: string;
  severity?: 'low' | 'medium' | 'high'; // For accidents
}

interface HealthItem {
  name: string;
  lastDone: string;
  nextDue: string;
  status: 'excellent' | 'warning' | 'critical';
  mileageLast: number;
}

interface DemoVehicle {
  vin: string;
  make: string;
  model: string;
  year: number;
  engine: string;
  fuel: string;
  transmission: string;
  drive: string;
  color: string;
  importedFrom: string;
  importDate: string;
  trustScore: number;
  recommendationType: 'highly_recommended' | 'recommended_with_inspection' | 'needs_verification' | 'high_risk';
  recommendationReason: string;
  ownersCount: number;
  avgOwnershipYears: number;
  usageType: 'Private' | 'Dealer' | 'Fleet';
  fraudAlerts: {
    type: string;
    description: string;
    risk: 'low' | 'medium' | 'high';
  }[];
  timeline: VehicleEvent[];
  health: HealthItem[];
}

// Initial Preset vehicles for high-fidelity Kyrgyz market demonstration
const PRESET_VEHICLES: DemoVehicle[] = [
  {
    vin: "JTDKB20U5G3119802",
    make: "Lexus",
    model: "RX 350 F-Sport",
    year: 2020,
    engine: "3.5L V6",
    fuel: "Petrol",
    transmission: "Automatic 8-Speed",
    drive: "AWD",
    color: "Pearl White Metallic",
    importedFrom: "USA (Texas)",
    importDate: "2023-04-12",
    trustScore: 96,
    recommendationType: "highly_recommended",
    recommendationReason: "This Lexus RX 350 has a pristine record. It shows continuous single-owner local service history in Bishkek, verified USA import mileage without gaps, clean customs clearance, and zero registered accidents. An exemplary premium vehicle.",
    ownersCount: 1,
    avgOwnershipYears: 3,
    usageType: "Private",
    fraudAlerts: [],
    health: [
      { name: "Oil Change (Liqui Moly 5W-30)", lastDone: "2026-05-10", nextDue: "2026-11-10", status: "excellent", mileageLast: 72000 },
      { name: "Front & Rear Brakes", lastDone: "2025-09-14", nextDue: "2027-02-14", status: "excellent", mileageLast: 60000 },
      { name: "AGM Battery Replacement", lastDone: "2024-11-15", nextDue: "2028-11-15", status: "excellent", mileageLast: 48000 },
      { name: "Michelin Pilot Sport 4 Tires", lastDone: "2025-04-20", nextDue: "2029-04-20", status: "excellent", mileageLast: 55000 },
      { name: "Suspension Silent Blocks & Bushings", lastDone: "2026-03-01", nextDue: "2028-03-01", status: "excellent", mileageLast: 68000 },
      { name: "Spark Plugs & Valve Cover Gaskets", lastDone: "2025-06-12", nextDue: "2027-06-12", status: "excellent", mileageLast: 58000 }
    ],
    timeline: [
      { id: "e1-1", date: "2020-03-10", mileage: 12, type: 'manufacturing', title: "Vehicle Manufactured", description: "Lexus Motor Corp., Japan. Shipped to distributor in Houston, USA.", location: "Kyushu, Japan", operator: "Lexus Japan Manufacturing" },
      { id: "e1-2", date: "2020-05-20", mileage: 45, type: 'registration', title: "First Registration (USA)", description: "Registered to first private owner. Clean title issued.", location: "Houston, TX, USA", operator: "Texas DMV" },
      { id: "e1-3", date: "2022-12-15", mileage: 38200, type: 'service', title: "Scheduled Maintenance", description: "30,000 miles service completed. Fluids flushed, tires rotated.", location: "Houston Lexus Dealership", operator: "Authorized Lexus Service" },
      { id: "e1-4", date: "2023-01-20", mileage: 40500, type: 'ownership', title: "Export Sales Record", description: "Exported via Galveston Port to Central Asia (Kyrgyzstan). Clean condition report.", location: "Galveston, USA", operator: "Global Export Logistics" },
      { id: "e1-5", date: "2023-04-12", mileage: 40900, type: 'customs', title: "Customs Clearance & Importation", description: "Customs duty paid fully in Kyrgyzstan. Cleared at North Customs Terminal, Bishkek.", location: "Bishkek, Kyrgyzstan", operator: "State Customs Service of KR" },
      { id: "e1-6", date: "2023-04-25", mileage: 41000, type: 'registration', title: "Kyrgyz Registration & Tech-Passport", description: "First local registration in Kyrgyzstan. Custom plates 01KG555AAA issued.", location: "Bishkek, Unaa Agency", operator: "Unaa State Agency" },
      { id: "e1-7", date: "2024-05-18", mileage: 52000, type: 'inspection', title: "Annual Safety & Emission Inspection", description: "Passed with zero faults. Brake performance and CO2 emissions within legal luxury limits.", location: "Bishkek Center №1", operator: "EcoInspection KR" },
      { id: "e1-8", date: "2025-04-20", mileage: 61200, type: 'service', title: "Comprehensive Spring Service", description: "Replaced tires (Michelin), completed wheel alignment, changed spark plugs.", location: "Bishkek AutoHub Service", operator: "AutoHub Elite Service Center" },
      { id: "e1-9", date: "2026-05-10", mileage: 72000, type: 'service', title: "Routine Engine Service", description: "Engine oil change (Liqui Moly 5W-30) and all filter replacements.", location: "Bishkek AutoHub Service", operator: "AutoHub Elite Service Center" }
    ]
  },
  {
    vin: "JTDKN3DU9J0166245",
    make: "Toyota",
    model: "Prius Prime (Plug-In)",
    year: 2018,
    engine: "1.8L Hybrid Engine",
    fuel: "Plug-In Hybrid (PHEV)",
    transmission: "e-CVT Transmission",
    drive: "FWD",
    color: "Slate Gray Metallic",
    importedFrom: "Georgia (Ex-USA)",
    importDate: "2022-09-05",
    trustScore: 81,
    recommendationType: "recommended_with_inspection",
    recommendationReason: "A solid Toyota Prius Prime showing moderate usage. It was imported via Georgia in 2022 with a minor non-structural body repair (rear bumper repaint) registered in customs database. Local diagnostic records are extensive and the hybrid battery capacity is tested at 89%. Highly recommended, but advise checking suspension prior to purchasing.",
    ownersCount: 2,
    avgOwnershipYears: 2.5,
    usageType: "Private",
    fraudAlerts: [
      { type: "Cosmetic Damage Restored", description: "Minor body repairs noted at import (rear bumper cover replacement). Not structural.", risk: "low" }
    ],
    health: [
      { name: "Engine Oil Change (Toyota 0W-20)", lastDone: "2026-04-02", nextDue: "2026-10-02", status: "excellent", mileageLast: 112000 },
      { name: "Front Brake Pads & Brake Fluid", lastDone: "2024-08-11", nextDue: "2026-08-11", status: "warning", mileageLast: 90000 },
      { name: "12V Auxiliary Battery", lastDone: "2022-10-01", nextDue: "2026-10-01", status: "warning", mileageLast: 75000 },
      { name: "Bridgestone Ecopia Tires", lastDone: "2025-05-15", nextDue: "2029-05-15", status: "excellent", mileageLast: 101000 },
      { name: "Hybrid Cooling Fan Service", lastDone: "2025-09-12", nextDue: "2027-09-12", status: "excellent", mileageLast: 105000 },
      { name: "Inverter Coolant Flush", lastDone: "2022-09-10", nextDue: "2027-09-10", status: "excellent", mileageLast: 74200 }
    ],
    timeline: [
      { id: "e2-1", date: "2018-02-14", mileage: 10, type: 'manufacturing', title: "Vehicle Manufactured", description: "Toyota Tsutsumi Plant, Japan. Delivered to port.", location: "Aichi, Japan", operator: "Toyota Motor Corp" },
      { id: "e2-2", date: "2018-05-01", mileage: 120, type: 'registration', title: "First Registration (USA)", description: "Registered to primary private owner for family commute.", location: "San Jose, CA, USA", operator: "California DMV" },
      { id: "e2-3", date: "2020-11-18", mileage: 45000, type: 'accident', title: "Minor Parking Collision", description: "Bumper scrapes and rear light housing cracked. Deemed cosmetic minor repair.", location: "San Jose, CA", operator: "State Farm Insurance" },
      { id: "e2-4", date: "2022-07-02", mileage: 71000, type: 'ownership', title: "Insurance Auction Sale", description: "Sold due to insurance turnover. Transited to Poti Port, Georgia.", location: "Copart Auctions, USA", operator: "Copart Logistics" },
      { id: "e2-5", date: "2022-09-05", mileage: 74000, type: 'customs', title: "Customs & Repair in Georgia", description: "Repaired with certified OEM components. Export clearance to KR.", location: "Poti Port, Georgia", operator: "Caucasus Auto Import" },
      { id: "e2-6", date: "2022-10-01", mileage: 74500, type: 'registration', title: "Kyrgyz Registration", description: "First local registration. Plate 01KG981ABX. Owner 1 (Bishkek resident).", location: "Bishkek, Unaa", operator: "Unaa State Agency" },
      { id: "e2-7", date: "2024-02-28", mileage: 92000, type: 'ownership', title: "Second Ownership Registration", description: "Transferred ownership to present private owner. Kept Bishkek registration.", location: "Bishkek, Unaa", operator: "Unaa State Agency" },
      { id: "e2-8", date: "2025-09-12", mileage: 105000, type: 'service', title: "Hybrid Diagnostics & Cleaning", description: "Hybrid cooling fan cleaned, battery state of health checked: 89% capacity remaining.", location: "Bishkek Hybrid Tech", operator: "Hybrid Master Center" },
      { id: "e2-9", date: "2026-04-02", mileage: 112000, type: 'service', title: "Spring Oil & Filters Check", description: "Replaced motor oil 0W-20, spark plug cleanup, and cabin charcoal filter replacement.", location: "AutoHub Service Bishkek", operator: "AutoHub Service Center" }
    ]
  },
  {
    vin: "5UXKR6C59G0E12449",
    make: "BMW",
    model: "X5 xDrive35i (F15)",
    year: 2016,
    engine: "3.0L L6 Turbo TwinPower",
    fuel: "Petrol",
    transmission: "ZF 8-Speed Automatic",
    drive: "AWD (xDrive)",
    color: "Midnight Black Metallic",
    importedFrom: "Georgia (Ex-USA Salvage)",
    importDate: "2021-11-20",
    trustScore: 39,
    recommendationType: "high_risk",
    recommendationReason: "CRITICAL: Multiple high-risk alerts! Data cross-referencing indicates an ODOMETER ROLLBACK. The import mileage in 2021 was registered at 145,000 km, but local Kyrgyz technical inspection registered only 92,000 km in 2022. Additionally, the vehicle suffered a severe front-end impact in USA (salvage title) and has shown frequent, repeated suspension and steering gear replacements. Purchase is highly discouraged without extreme technical diagnosis.",
    ownersCount: 4,
    avgOwnershipYears: 1.2,
    usageType: "Fleet",
    fraudAlerts: [
      { type: "Odometer Rollback Warning", description: "Mileage went backwards. Registered 145,000 km during Georgia export, but 92,000 km during first registration in KR.", risk: "high" },
      { type: "Ex-Salvage Title History", description: "Severe front impact detected in USA. Airbag deployment record found in salvage log.", risk: "high" },
      { type: "Unusual Rapid Ownership Flip", description: "Passed through 3 owners in less than 24 months, indicating potential chronic mechanical dissatisfaction.", risk: "medium" }
    ],
    health: [
      { name: "Engine Oil (Castrol Edge 5W-40)", lastDone: "2025-11-12", nextDue: "2026-05-12", status: "critical", mileageLast: 115000 },
      { name: "Brake Discs & Pads", lastDone: "2023-08-01", nextDue: "2025-08-01", status: "critical", mileageLast: 95000 },
      { name: "Starter & Alternator Belt", lastDone: "2022-04-12", nextDue: "2025-04-12", status: "critical", mileageLast: 92000 },
      { name: "Winter/Summer Runflat Tires", lastDone: "2021-12-15", nextDue: "2025-12-15", status: "critical", mileageLast: 91500 },
      { name: "Turbocharger Gasket & Oil Line", lastDone: "2024-03-22", nextDue: "2026-03-22", status: "warning", mileageLast: 104000 },
      { name: "Pneumatic Rear Suspension Airbag", lastDone: "2025-02-14", nextDue: "2026-02-14", status: "warning", mileageLast: 110000 }
    ],
    timeline: [
      { id: "e3-1", date: "2016-04-15", mileage: 8, type: 'manufacturing', title: "Vehicle Manufactured", description: "BMW Spartanburg Plant, South Carolina, USA.", location: "Spartanburg, USA", operator: "BMW US Manufacturing" },
      { id: "e3-2", date: "2016-06-10", mileage: 300, type: 'registration', title: "First Registration (USA)", description: "Registered as commercial luxury lease vehicle.", location: "New York, USA", operator: "New York DMV" },
      { id: "e3-3", date: "2019-10-05", mileage: 72000, type: 'service', title: "Engine Diagnostics & Spark Plugs", description: "Routine engine tune-up, coils replaced, oil leak repaired under warranty.", location: "Manhattan BMW Center", operator: "BMW Authorized Dealer" },
      { id: "e3-4", date: "2021-02-28", mileage: 121000, type: 'accident', title: "Severe Frontal Impact Collision", description: "Structural frame damage, radiator crush, front airbags deployed. Declared Total Loss.", location: "Queens, NY, USA", operator: "Geico Claims Department" },
      { id: "e3-5", date: "2021-06-12", mileage: 145000, type: 'ownership', title: "Salvage Yard Sale & Export", description: "Acquired by rebuilders. Exported via Savannah Port to Georgia.", location: "Savannah Port, USA", operator: "Global Auto Shippers" },
      { id: "e3-6", date: "2021-11-20", mileage: 145200, type: 'customs', title: "Importation & Repairs (Georgia)", description: "Body rebuild completed. Odometer tamper suspected at this stage.", location: "Rustavi Auto Market, Georgia", operator: "Caucasus Car Rebuilders" },
      { id: "e3-7", date: "2022-04-12", mileage: 92000, type: 'registration', title: "First Kyrgyz Registration (Suspicious Odometer)", description: "First local registration in Kyrgyzstan. Plate 01KG123ABS. Odometer registered at 92,000 km (145K export km hidden).", location: "Bishkek, Unaa", operator: "Unaa State Agency" },
      { id: "e3-8", date: "2023-11-05", mileage: 101000, type: 'ownership', title: "Ownership Flip (Owner 2)", description: "Ownership changed quickly after 1.5 years. Plate renewed 01KG444BDD.", location: "Bishkek, Unaa", operator: "Unaa State Agency" },
      { id: "e3-9", date: "2024-12-18", mileage: 110000, type: 'accident', title: "Minor Parking Collision in Bishkek", description: "Fender scrape, suspension lower arm bent. Replaced with aftermarket parts.", location: "Bishkek, Gorky St", operator: "Local Insurance Agency" },
      { id: "e3-10", date: "2025-11-12", mileage: 115000, type: 'service', title: "Engine Noise Inspection", description: "Diagnosed turbo actuator play and valve cover oil leak. Left unrepaired.", location: "Bishkek Motor Repair", operator: "Bishkek Garage Tech" }
    ]
  }
];

// Helper to determine recommend info
const REC_MAP = {
  highly_recommended: {
    label: { RU: "Отличное состояние (Рекомендуется)", KG: "Мыкты абалда (Сунушталат)", EN: "Highly Recommended" },
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    icon: ShieldCheck,
    badgeColor: "bg-emerald-500"
  },
  recommended_with_inspection: {
    label: { RU: "Рекомендуется с диагностикой", KG: "Диагностика менен сунушталат", EN: "Recommended with Inspection" },
    color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    icon: Info,
    badgeColor: "bg-amber-500"
  },
  needs_verification: {
    label: { RU: "Требуется дополнительная проверка", KG: "Кошумча текшерүү керек", EN: "Needs Further Verification" },
    color: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    icon: AlertTriangle,
    badgeColor: "bg-orange-500"
  },
  high_risk: {
    label: { RU: "Высокий риск покупки!", KG: "Сатып алуу кооптуу!", EN: "High Risk Purchase" },
    color: "text-red-400 bg-red-500/10 border-red-500/30",
    icon: AlertTriangle,
    badgeColor: "bg-red-500"
  }
};

export const VehicleTimelinePage: React.FC<{ lang: string; onBackToCatalog: () => void }> = ({ lang, onBackToCatalog }) => {
  const [vehicles, setVehicles] = useState<DemoVehicle[]>(PRESET_VEHICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVin, setSelectedVin] = useState(PRESET_VEHICLES[0].vin);
  const [filterType, setFilterType] = useState<string>('all');
  
  // Custom Generation state
  const [customVin, setCustomVin] = useState('');
  const [customMake, setCustomMake] = useState('Toyota');
  const [customModel, setCustomModel] = useState('Camry');
  const [customYear, setCustomYear] = useState(2019);
  
  // New Event form state
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: new Date().toISOString().split('T')[0],
    mileage: '',
    type: 'service' as VehicleEvent['type'],
    title: '',
    description: '',
    location: 'Bishkek, Kyrgyzstan',
    operator: 'AutoHub Certified Station',
    cost: '',
    severity: 'low' as 'low' | 'medium' | 'high'
  });

  // active vehicle lookup
  const currentVehicle = useMemo(() => {
    return vehicles.find(v => v.vin === selectedVin) || vehicles[0];
  }, [vehicles, selectedVin]);

  // Handle Search Input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search if matching presets
    const cleanQuery = searchQuery.trim().toUpperCase();
    const found = vehicles.find(v => v.vin.toUpperCase().includes(cleanQuery) || v.model.toUpperCase().includes(cleanQuery));
    
    if (found) {
      setSelectedVin(found.vin);
      return;
    }

    // Otherwise, dynamically generate a premium vehicle data structure deterministically for the demo search!
    const generatedVin = cleanQuery.length >= 10 ? cleanQuery : `EX${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const randNum = generatedVin.charCodeAt(0) % 3;
    
    let generatedVehicle: DemoVehicle;

    if (randNum === 0) {
      // Generate standard decent car
      generatedVehicle = {
        vin: generatedVin,
        make: "Hyundai",
        model: "Sonata Premium",
        year: 2019,
        engine: "2.0 LPI Gas",
        fuel: "Liquid Gas (LPG)",
        transmission: "Automatic 6-Speed",
        drive: "FWD",
        color: "Carbon Gray Metallic",
        importedFrom: "South Korea",
        importDate: "2022-03-15",
        trustScore: 89,
        recommendationType: "highly_recommended",
        recommendationReason: "Dynamically analyzed Hyundai Sonata from South Korea. No rollback issues found. Regular servicing registered at Bishkek Korean Auto Service. Highly recommended choice.",
        ownersCount: 2,
        avgOwnershipYears: 2,
        usageType: "Private",
        fraudAlerts: [],
        health: [
          { name: "Gas Filter replacement", lastDone: "2026-02-15", nextDue: "2027-02-15", status: "excellent", mileageLast: 95000 },
          { name: "Engine oil change (Kixx 5W-30)", lastDone: "2026-06-01", nextDue: "2026-12-01", status: "excellent", mileageLast: 102000 }
        ],
        timeline: [
          { id: "gen-1", date: "2019-05-12", mileage: 25, type: 'manufacturing', title: "Manufactured in South Korea", description: "Hyundai Asan plant.", location: "Asan, South Korea", operator: "Hyundai Motors" },
          { id: "gen-2", date: "2022-03-15", mileage: 65000, type: 'customs', title: "Import & Customs Clearance", description: "Cleared in Southern Customs Terminal, Osh.", location: "Osh, Kyrgyzstan", operator: "KR Customs" },
          { id: "gen-3", date: "2026-06-01", mileage: 102000, type: 'service', title: "Routine Fluid Service", description: "High-grade engine oil & filter replacements.", location: "Bishkek Korean-Car Hub", operator: "AutoHub Partner Clinic" }
        ]
      };
    } else if (randNum === 1) {
      // Generate moderate taxi vehicle
      generatedVehicle = {
        vin: generatedVin,
        make: "Toyota",
        model: "Camry 70 Elegance",
        year: 2019,
        engine: "2.5L Hybrid",
        fuel: "Hybrid (Gasoline/Electric)",
        transmission: "E-CVT",
        drive: "FWD",
        color: "Classic Pearl White",
        importedFrom: "Russia",
        importDate: "2021-08-10",
        trustScore: 68,
        recommendationType: "recommended_with_inspection",
        recommendationReason: "Dynamically generated Toyota Camry 70. Record suggests dual-use history (possible private ride-hailing app usage in Bishkek due to elevated annual mileage). No severe crashes, but suspension showing tear.",
        ownersCount: 3,
        avgOwnershipYears: 1.6,
        usageType: "Fleet",
        fraudAlerts: [
          { type: "Potential Commercial Usage", description: "Vehicle logged high mileage in short timeframe, indicating possible ride-sharing or taxi operations.", risk: "medium" }
        ],
        health: [
          { name: "Synthetic Oil 0W-20", lastDone: "2026-04-12", nextDue: "2026-10-12", status: "excellent", mileageLast: 154000 },
          { name: "Brake Pads and Rotors", lastDone: "2024-03-10", nextDue: "2025-03-10", status: "critical", mileageLast: 110000 }
        ],
        timeline: [
          { id: "gen-1", date: "2019-02-20", mileage: 15, type: 'manufacturing', title: "Vehicle Manufactured", description: "Toyota St. Petersburg Plant, Russia.", location: "St. Petersburg, Russia", operator: "Toyota Motor Corp" },
          { id: "gen-2", date: "2021-08-10", mileage: 56000, type: 'customs', title: "Import and Customs Clearance", description: "Imported fully certified.", location: "Bishkek, KR", operator: "Customs KR" },
          { id: "gen-3", date: "2023-11-20", mileage: 112000, type: 'service', title: "Local Hybrid Batteries Safety Check", description: "Passed diagnostics. Coolant level optimal.", location: "Bishkek AutoHub", operator: "TechAuto Lab" }
        ]
      };
    } else {
      // Generate riskier vehicle
      generatedVehicle = {
        vin: generatedVin,
        make: "Kia",
        model: "K5 Noblesse",
        year: 2018,
        engine: "2.0 LPI",
        fuel: "Liquid Gas",
        transmission: "Automatic",
        drive: "FWD",
        color: "Bright Silver",
        importedFrom: "South Korea (Ex-Taxi)",
        importDate: "2021-05-18",
        trustScore: 48,
        recommendationType: "high_risk",
        recommendationReason: "CRITICAL ALERT: Odometer tamper detected. Export database records 240,000 km in Incheon port, while Kyrgyz registration tech passport states 120,000 km. Severe safety risk.",
        ownersCount: 4,
        avgOwnershipYears: 1.1,
        usageType: "Fleet",
        fraudAlerts: [
          { type: "Odometer Rollback", description: "Export log recorded 240,000 km, local registry claims only 120,000 km.", risk: "high" }
        ],
        health: [
          { name: "LPG Injector Cleaning", lastDone: "2022-04-11", nextDue: "2023-04-11", status: "critical", mileageLast: 125000 }
        ],
        timeline: [
          { id: "gen-1", date: "2018-01-10", mileage: 50, type: 'manufacturing', title: "Manufactured", description: "Kia Motors Korea.", location: "Gwangju, South Korea", operator: "Kia Corp" },
          { id: "gen-2", date: "2021-05-18", mileage: 240000, type: 'customs', title: "Export to Kyrgyzstan", description: "Registered high mileage as commercial rental.", location: "Incheon, South Korea", operator: "Export Shipping" }
        ]
      };
    }

    // Add generated vehicle to set
    setVehicles(prev => [generatedVehicle, ...prev]);
    setSelectedVin(generatedVin);
    setSearchQuery('');
  };

  // Quick select presets
  const handleSelectPreset = (vin: string) => {
    setSelectedVin(vin);
  };

  // Filter timeline events
  const filteredEvents = useMemo(() => {
    if (filterType === 'all') return currentVehicle.timeline;
    return currentVehicle.timeline.filter(e => e.type === filterType);
  }, [currentVehicle, filterType]);

  // Recalculate trust score if timeline changes
  const recalculatedVehicle = useMemo(() => {
    // Dynamic real-time calculated score based on timeline alerts, accidents and events
    let baseScore = 100;
    
    // Ownership penalty
    if (currentVehicle.ownersCount > 3) baseScore -= 15;
    else if (currentVehicle.ownersCount > 1) baseScore -= 5;

    // Accidents penalty
    const accidents = currentVehicle.timeline.filter(e => e.type === 'accident');
    accidents.forEach(acc => {
      if (acc.severity === 'high') baseScore -= 35;
      else if (acc.severity === 'medium') baseScore -= 20;
      else baseScore -= 10;
    });

    // Fraud alerts penalty
    const highRisks = currentVehicle.fraudAlerts.filter(a => a.risk === 'high');
    const medRisks = currentVehicle.fraudAlerts.filter(a => a.risk === 'medium');
    baseScore -= (highRisks.length * 25);
    baseScore -= (medRisks.length * 10);

    // Ensure range [10, 100]
    const finalScore = Math.max(15, Math.min(100, baseScore));

    // Dynamic recommendation calculation based on finalScore
    let finalRec: DemoVehicle['recommendationType'] = 'highly_recommended';
    let finalReason = '';
    
    if (finalScore >= 90) {
      finalRec = 'highly_recommended';
      finalReason = lang === 'RU' 
        ? "Данный автомобиль прошел всесторонний AI-анализ истории и заслужил высочайшую рекомендацию. Чистый ПТС, подтвержденный оригинальный пробег, регулярное ТО и отсутствие ДТП."
        : lang === 'KG'
        ? "Бул унаа бардык AI тарыхын талдоодон өттү жана эң жогорку сунушту алды. Таза ПТС, тастыкталган баштапкы жүрүшү, үзгүлтүксүз ТӨ жана Кырсыктын жоктугу."
        : "This vehicle has passed an extensive AI history analysis and earned our highest recommendation. Clean title, verified original mileage, consistent service records, and zero accidents.";
    } else if (finalScore >= 70) {
      finalRec = 'recommended_with_inspection';
      finalReason = lang === 'RU'
        ? "Автомобиль в хорошем состоянии, однако рекомендуется провести стандартную техническую диагностику ходовой части и кузова перед покупкой. Имеются небольшие замечания в истории."
        : lang === 'KG'
        ? "Унаа жакшы абалда, бирок сатып алардан мурун жүрүүчү бөлүгүн жана кузовду стандарттык техникалык диагностикадан өткөрүү сунушталат. Тарыхында бир аз эскертүүлөр бар."
        : "The vehicle is in good condition, however, a standard technical diagnosis of the chassis and body is recommended before purchase. There are minor historical notes.";
    } else if (finalScore >= 50) {
      finalRec = 'needs_verification';
      finalReason = lang === 'RU'
        ? "Внимание: Требуется углубленная юридическая и техническая проверка. Выявлены подозрительные интервалы в истории владения или отсутствие записей о регулярном обслуживании."
        : lang === 'KG'
        ? "Көңүл буруңуз: Терең юридикалык жана техникалык текшерүү талап кылынат. Ээлик кылуу тарыхында шектүү аралыктар же үзгүлтүксүз тейлөө жазууларынын жоктугу аныкталган."
        : "Attention: Deep legal and technical validation required. Identified suspicious gaps in ownership history or missing periodic maintenance records.";
    } else {
      finalRec = 'high_risk';
      finalReason = lang === 'RU'
        ? "ВЫСОКИЙ РИСК: Выявлены критические проблемы (скрученный пробег, сильное ДТП, кузовной ремонт после утилизации или частая смена владельцев). Покупка настоятельно не рекомендуется."
        : lang === 'KG'
        ? "ЖОГОРКУ КОРКУНУЧ: Критикалык көйгөйлөр аныкталды (кыскартылган пробег, катуу кырсык, утилизациядан кийинки кузовду оңдоо же ээлеринин тез алмашуусу). Сатып алуу сунушталбайт."
        : "HIGH RISK: Critical issues detected (odometer tampering, severe collision history, salvage rebuild, or frequent owner flipping). Purchasing this vehicle is strongly discouraged.";
    }

    return {
      ...currentVehicle,
      trustScore: finalScore,
      recommendationType: finalRec,
      recommendationReason: finalReason
    };
  }, [currentVehicle, lang]);

  // Handle adding custom event
  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title) return;

    const parsedMileage = parseInt(newEvent.mileage) || (recalculatedVehicle.timeline[recalculatedVehicle.timeline.length - 1]?.mileage + 5000) || 80000;

    const eventToAdd: VehicleEvent = {
      id: `custom-event-${Date.now()}`,
      date: newEvent.date,
      mileage: parsedMileage,
      type: newEvent.type,
      title: newEvent.title,
      description: newEvent.description || "Simulated manually added event",
      location: newEvent.location,
      operator: newEvent.operator,
      cost: newEvent.cost ? `$${newEvent.cost}` : undefined,
      severity: newEvent.type === 'accident' ? newEvent.severity : undefined
    };

    // Update vehicle's timeline
    setVehicles(prev => prev.map(v => {
      if (v.vin === currentVehicle.vin) {
        // Create copies of timeline
        const updatedTimeline = [...v.timeline, eventToAdd].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        // Add new potential fraud alerts if mileage rollback is created manually!
        const alerts = [...v.fraudAlerts];
        
        // Simple logic to detect if user added a lower mileage for a future date
        let hasRollback = false;
        for (let i = 1; i < updatedTimeline.length; i++) {
          if (updatedTimeline[i].mileage < updatedTimeline[i - 1].mileage) {
            hasRollback = true;
            break;
          }
        }

        if (hasRollback && !alerts.some(a => a.type.includes("Odometer"))) {
          alerts.push({
            type: "Simulated Odometer Rollback",
            description: "A newly simulated event reports mileage lower than previous records.",
            risk: "high"
          });
        }

        // Adjust ownersCount if type is ownership
        let newOwners = v.ownersCount;
        if (newEvent.type === 'ownership') {
          newOwners += 1;
        }

        return {
          ...v,
          ownersCount: newOwners,
          fraudAlerts: alerts,
          timeline: updatedTimeline
        };
      }
      return v;
    }));

    // Reset Form
    setNewEvent({
      date: new Date().toISOString().split('T')[0],
      mileage: '',
      type: 'service',
      title: '',
      description: '',
      location: 'Bishkek, Kyrgyzstan',
      operator: 'AutoHub Certified Station',
      cost: '',
      severity: 'low'
    });
    setShowAddEvent(false);
  };

  // Get localized labels
  const getRecInfo = (type: DemoVehicle['recommendationType']) => {
    return REC_MAP[type] || REC_MAP.needs_verification;
  };

  const recInfo = getRecInfo(recalculatedVehicle.recommendationType);
  const RecIcon = recInfo.icon;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white font-sans antialiased selection:bg-[#0B3D91] selection:text-white pb-24 pt-28 px-4 sm:px-6 lg:px-8">
      {/* Background elegant stars/radial ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(11,61,145,0.15),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0B3D91]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Outer Layout Container */}
      <div className="max-w-7xl mx-auto space-y-8 relative">
        
        {/* Header Breadcrumb / Intro */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center space-x-2.5 text-[#5D9CEC] text-sm font-semibold tracking-wider uppercase mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AutoHub AI Intelligence</span>
            </div>
            <h1 id="vehicle-intelligence-title" className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#5D9CEC] bg-clip-text text-transparent">
              {lang === 'RU' ? 'AI Интеллект-Центр Истории и Траста' : lang === 'KG' ? 'AI Траст жана Тарых Интеллект Борбору' : 'AI Vehicle Intelligence & Trust Center'}
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
              {lang === 'RU' 
                ? 'Мгновенная нейросетевая проверка VIN, детекция скрученного пробега, калькуляция траст-балла и генерация экспертного отчета.' 
                : lang === 'KG' 
                ? 'VIN кодун заматта нейрондук тармак аркылуу текшерүү, жасалма пробегди аныктоо, траст-баллды эсептөө жана эксперттик отчетту түзүү.'
                : 'Instant neural network-based VIN verification, odometer rollback detection, live vehicle reliability scoring, and full-history analytical reporting.'}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <button 
              onClick={onBackToCatalog}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-medium transition-all flex items-center space-x-2"
              id="back-to-catalog"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>{lang === 'RU' ? 'В каталог' : lang === 'KG' ? 'Каталогко кайтуу' : 'To Catalog'}</span>
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all flex items-center space-x-2 shadow-lg shadow-blue-600/20"
              id="print-full-report"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'RU' ? 'Печать отчета' : lang === 'KG' ? 'Басып чыгаруу' : 'Print Report'}</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE PRESETS & SEARCH BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* SEARCH BAR CARD */}
          <div className="lg:col-span-7 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold">
                  {lang === 'RU' ? 'Введите VIN или Выберите Модель' : lang === 'KG' ? 'VIN Кодун Жазыңыз же Унааны Тандаңыз' : 'Enter VIN or Select Demo Car'}
                </h3>
              </div>

              {/* Input field */}
              <form onSubmit={handleSearch} className="relative mb-5">
                <input 
                  type="text"
                  placeholder={lang === 'RU' ? 'Введите 17-значный VIN (например, JTDKB...)' : lang === 'KG' ? '17 орундуу VIN кодун жазыңыз...' : 'Enter 17-digit VIN (e.g. JTDKB...)'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-24 py-3.5 bg-black/40 border border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-white text-sm tracking-wider font-mono uppercase transition-all"
                  id="vin-search-input"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <CarIcon className="w-5 h-5" />
                </div>
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                  id="search-vin-btn"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{lang === 'RU' ? 'Поиск' : lang === 'KG' ? 'Издөө' : 'Search'}</span>
                </button>
              </form>
            </div>

            {/* Presets Grid */}
            <div>
              <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wider">
                {lang === 'RU' ? 'Демонстрационные Экспресс-Пресеты' : lang === 'KG' ? 'Демонстрациялык Пресеттер' : 'High-Fidelity Demo Presets'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {vehicles.slice(0, 3).map((vehicle) => {
                  const scoreColor = vehicle.trustScore >= 90 ? 'text-emerald-400' : vehicle.trustScore >= 70 ? 'text-amber-400' : 'text-red-400';
                  const active = selectedVin === vehicle.vin;
                  return (
                    <button
                      key={vehicle.vin}
                      onClick={() => handleSelectPreset(vehicle.vin)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all relative ${
                        active 
                          ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/5' 
                          : 'bg-black/30 border-white/5 hover:border-white/15'
                      }`}
                      id={`preset-btn-${vehicle.vin}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-slate-100">{vehicle.make} {vehicle.model}</span>
                        <span className={`font-mono font-bold ${scoreColor}`}>★{vehicle.trustScore}</span>
                      </div>
                      <div className="text-slate-400 text-[10px] font-mono mt-1.5 flex items-center justify-between">
                        <span>{vehicle.year}</span>
                        <span className="bg-white/5 px-1.5 py-0.5 rounded text-[9px] uppercase font-semibold">{vehicle.importedFrom.split(' ')[0]}</span>
                      </div>
                      {active && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* VEHICLE QUICK METADATA & SPECS */}
          <div className="lg:col-span-5 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {recalculatedVehicle.make} {recalculatedVehicle.model}
                  </h3>
                  <span className="text-xs text-[#5D9CEC] font-mono select-all mt-1 block">
                    VIN: {recalculatedVehicle.vin}
                  </span>
                </div>
                <span className="text-2xl font-bold text-white bg-white/5 px-3 py-1 rounded-lg">
                  {recalculatedVehicle.year}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">{lang === 'RU' ? 'Двигатель' : lang === 'KG' ? 'Кыймылдаткыч' : 'Engine'}</span>
                  <span className="font-semibold text-slate-200">{recalculatedVehicle.engine}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">{lang === 'RU' ? 'Тип топлива' : lang === 'KG' ? 'Күйүүчү май' : 'Fuel Type'}</span>
                  <span className="font-semibold text-slate-200">{recalculatedVehicle.fuel}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">{lang === 'RU' ? 'Трансмиссия' : lang === 'KG' ? 'Өткөргүч куту' : 'Transmission'}</span>
                  <span className="font-semibold text-slate-200">{recalculatedVehicle.transmission}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">{lang === 'RU' ? 'Привод' : lang === 'KG' ? 'Жетек' : 'Drive'}</span>
                  <span className="font-semibold text-slate-200">{recalculatedVehicle.drive}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">{lang === 'RU' ? 'Импортирован из' : lang === 'KG' ? 'Импорттолгон өлкө' : 'Imported From'}</span>
                  <span className="font-semibold text-blue-400 flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-blue-400" />
                    <span>{recalculatedVehicle.importedFrom}</span>
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">{lang === 'RU' ? 'Дата ввоза' : lang === 'KG' ? 'Алып келинген күнү' : 'Import Date'}</span>
                  <span className="font-semibold text-slate-200">{recalculatedVehicle.importDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'RU' ? 'База данных: Актуальна' : lang === 'KG' ? 'Маалымат базасы: Жаңы' : 'Local DB Status: Live'}</span>
              </span>
              <span className="font-mono text-[10px]">
                UTC: 2026-07-21
              </span>
            </div>
          </div>
        </div>

        {/* TRUST SCORE & RECOMMENDATIONS & FRAUD DETECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. TRUST SCORE GAUGE CARD */}
          <div className="lg:col-span-4 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Glowing circle back */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-[#0B3D91]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-200 flex items-center space-x-2">
                  <Gauge className="w-5 h-5 text-blue-400" />
                  <span>{lang === 'RU' ? 'AI Траст-Балл' : lang === 'KG' ? 'AI Траст Баасы' : 'AI Trust Score'}</span>
                </h3>
                <span className="text-xs bg-blue-500/10 text-[#5D9CEC] border border-blue-500/20 px-2 py-0.5 rounded font-mono font-semibold">
                  {lang === 'RU' ? 'Реноме' : lang === 'KG' ? 'Кадыр-барк' : 'Reputation Index'}
                </span>
              </div>

              {/* Circular Gauge visualization */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  
                  {/* Gauge Background ring */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="#1e293b" 
                      strokeWidth="8" 
                      fill="transparent" 
                    />
                    {/* Gauge Active ring */}
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke={recalculatedVehicle.trustScore >= 90 ? "#10b981" : recalculatedVehicle.trustScore >= 70 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray={251.2}
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (251.2 * recalculatedVehicle.trustScore) / 100 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Center Score */}
                  <div className="absolute text-center">
                    <motion.span 
                      className="text-4xl font-extrabold tracking-tight block"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={recalculatedVehicle.trustScore}
                    >
                      {recalculatedVehicle.trustScore}
                    </motion.span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                      {lang === 'RU' ? 'из 100' : lang === 'KG' ? '100дөн' : 'of 100'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-6 text-xs mt-4 text-center">
                  <div>
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block mr-1.5" />
                    <span className="text-emerald-400 font-semibold">{lang === 'RU' ? 'Отлично' : lang === 'KG' ? 'Мыкты' : 'Green'}</span>
                  </div>
                  <div>
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block mr-1.5" />
                    <span className="text-amber-400 font-semibold">{lang === 'RU' ? 'Норма' : lang === 'KG' ? 'Орто' : 'Yellow'}</span>
                  </div>
                  <div>
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block mr-1.5" />
                    <span className="text-red-400 font-semibold">{lang === 'RU' ? 'Риск' : lang === 'KG' ? 'Коркунуч' : 'Red'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Breakdown info */}
            <div className="border-t border-white/5 pt-3.5 text-xs text-gray-400">
              <div className="flex justify-between items-center mb-1">
                <span>{lang === 'RU' ? 'Юридическая чистота' : lang === 'KG' ? 'Юридикалык тазалык' : 'Legal Integrity'}</span>
                <span className="font-bold text-slate-200">
                  {recalculatedVehicle.trustScore >= 70 ? "99%" : "65%"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>{lang === 'RU' ? 'Пробег подтвержден' : lang === 'KG' ? 'Миля тастыкталды' : 'Odometer Verification'}</span>
                <span className={`font-bold ${recalculatedVehicle.fraudAlerts.some(a => a.type.includes("Odometer")) ? "text-red-400" : "text-emerald-400"}`}>
                  {recalculatedVehicle.fraudAlerts.some(a => a.type.includes("Odometer")) ? "No / Не совпадает" : "Yes / Да"}
                </span>
              </div>
            </div>
          </div>

          {/* 2. BUYER RECOMMENDATION CARD */}
          <div className="lg:col-span-4 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-200 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span>{lang === 'RU' ? 'AI Рекомендация Покупка' : lang === 'KG' ? 'AI Сатып Алуу Сунушу' : 'AI Buyer Recommendation'}</span>
                </h3>
              </div>

              {/* Recommendation Type Badge */}
              <div className={`p-4 rounded-xl border flex items-start space-x-3.5 ${recInfo.color} mb-4`}>
                <RecIcon className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">
                    {recInfo.label[lang as keyof typeof recInfo.label] || recInfo.label.EN}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                    {recalculatedVehicle.recommendationReason}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/30 p-3 rounded-xl text-xs text-gray-400 border border-white/5 flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {lang === 'RU' 
                  ? 'Вывод сгенерирован алгоритмом AutoHub на основе 32 параметров.' 
                  : lang === 'KG' 
                  ? 'Жыйынтык AutoHub алгоритми тарабынан 32 параметрдин негизинде түзүлгөн.' 
                  : 'Conclusion compiled by AutoHub AI Engine considering 32 historical vectors.'}
              </span>
            </div>
          </div>

          {/* 3. FRAUD DETECTION ALERT MODULE */}
          <div className="lg:col-span-4 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-200 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>{lang === 'RU' ? 'Детектор Мошенничества' : lang === 'KG' ? 'Алдамчылыкты Аныктоо' : 'AI Fraud Detection'}</span>
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  recalculatedVehicle.fraudAlerts.length === 0 
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                    : recalculatedVehicle.fraudAlerts.some(a => a.risk === 'high') 
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse' 
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  {recalculatedVehicle.fraudAlerts.length === 0 
                    ? (lang === 'RU' ? 'Чисто' : lang === 'KG' ? 'Таза' : 'Clean') 
                    : `${recalculatedVehicle.fraudAlerts.length} ${lang === 'RU' ? 'сигнал(ов)' : lang === 'KG' ? 'сигнал' : 'alert(s)'}`}
                </span>
              </div>

              {/* Fraud alerts stack */}
              <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
                {recalculatedVehicle.fraudAlerts.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-xl bg-black/10 text-center p-4">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
                    <p className="text-xs font-semibold text-emerald-400">
                      {lang === 'RU' ? 'Критических аномалий не найдено' : lang === 'KG' ? 'Аномалиялар табылган жок' : 'No Critical Anomalies Found'}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {lang === 'RU' ? 'Сверка баз данных экспорта и локального ТО подтверждает надежность.' : lang === 'KG' ? 'Экспорттук базалар менен ТӨ маалыматы дал келет.' : 'Cross-referencing import export catalogs confirms integrity.'}
                    </p>
                  </div>
                ) : (
                  recalculatedVehicle.fraudAlerts.map((alert, index) => {
                    const bgStyle = alert.risk === 'high' ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20';
                    const textStyle = alert.risk === 'high' ? 'text-red-400' : 'text-amber-400';
                    return (
                      <div key={index} className={`p-3 rounded-xl border text-xs ${bgStyle}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold ${textStyle}`}>{alert.type}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold ${
                            alert.risk === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {alert.risk.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                          {alert.description}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] text-slate-400 flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>
                {lang === 'RU' ? 'Записи защищены криптографическим реестром AutoHub.' : lang === 'KG' ? 'Жазуулар AutoHub криптографиялык реестри менен корголгон.' : 'Records hash-locked with AutoHub private cryptographic ledger.'}
              </span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE TIMELINE SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* TIMELINE VISUAL MODULE */}
          <div className="lg:col-span-8 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>{lang === 'RU' ? 'Интерактивная Хроника Авто' : lang === 'KG' ? 'Унаанын Хроникалык Тарыхы' : 'AI VIN Timeline Ledger'}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {lang === 'RU' ? 'Фильтруйте события для детального аудита каждой вехи.' : lang === 'KG' ? 'Ар бир убакыт аралыгын деталдуу текшерүү үчүн чыпкалаңыз.' : 'Filter events for a deep regulatory audit of each major milestone.'}
                </p>
              </div>

              {/* TIMELINE CATEGORY SELECTOR */}
              <div className="flex flex-wrap gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 text-xs">
                {[
                  { id: 'all', label: lang === 'RU' ? 'Все' : lang === 'KG' ? 'Баары' : 'All' },
                  { id: 'service', label: lang === 'RU' ? 'ТО' : lang === 'KG' ? 'Тейлөө' : 'Service' },
                  { id: 'accident', label: lang === 'RU' ? 'ДТП' : lang === 'KG' ? 'Кырсык' : 'Crash' },
                  { id: 'registration', label: lang === 'RU' ? 'Учёт' : lang === 'KG' ? 'Каттоо' : 'Registry' },
                  { id: 'ownership', label: lang === 'RU' ? 'Смена владельцев' : lang === 'KG' ? 'Ээси' : 'Owner' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setFilterType(item.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      filterType === item.id 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TIMELINE LIST */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 max-h-[600px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, index) => {
                  
                  // Color codes based on type
                  let typeColor = 'bg-blue-600';
                  let borderStyle = 'border-blue-500/20';
                  let textBadge = 'text-blue-400 bg-blue-500/10';

                  if (event.type === 'accident') {
                    typeColor = 'bg-red-500 animate-pulse';
                    borderStyle = 'border-red-500/30 bg-red-950/20';
                    textBadge = 'text-red-400 bg-red-500/10';
                  } else if (event.type === 'service') {
                    typeColor = 'bg-emerald-500';
                    borderStyle = 'border-emerald-500/20';
                    textBadge = 'text-emerald-400 bg-emerald-500/10';
                  } else if (event.type === 'customs') {
                    typeColor = 'bg-purple-500';
                    borderStyle = 'border-purple-500/20';
                    textBadge = 'text-purple-400 bg-purple-500/10';
                  } else if (event.type === 'ownership') {
                    typeColor = 'bg-amber-500';
                    borderStyle = 'border-amber-500/20';
                    textBadge = 'text-amber-400 bg-amber-500/10';
                  }

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`relative p-4 rounded-xl border ${borderStyle} transition-all hover:scale-[1.01] hover:bg-white/2`}
                    >
                      {/* Timeline dot */}
                      <div className={`absolute -left-[23px] top-5 w-3 h-3 rounded-full ring-4 ring-[#0d1222] ${typeColor}`} />

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${textBadge}`}>
                            {event.type}
                          </span>
                          <h4 className="font-bold text-sm text-slate-100">{event.title}</h4>
                        </div>
                        <span className="text-xs text-gray-400 font-mono flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{event.date}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/5 text-[11px] text-gray-400 font-mono">
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase">{lang === 'RU' ? 'Пробег' : lang === 'KG' ? 'Жүрүшү' : 'Odometer'}</span>
                          <span className="text-slate-300 font-bold">{event.mileage.toLocaleString()} km</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase">{lang === 'RU' ? 'Локация' : lang === 'KG' ? 'Жайгашкан жери' : 'Location'}</span>
                          <span className="text-slate-300 font-semibold">{event.location}</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="block text-[10px] text-gray-500 uppercase">{lang === 'RU' ? 'Оператор' : lang === 'KG' ? 'Каттоочу' : 'Operator'}</span>
                          <span className="text-slate-300 font-semibold truncate block">{event.operator}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* ACTION TO LAUNCH EVENT INJECTOR FORM */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs text-gray-400 italic">
                {lang === 'RU' ? 'Хотите симулировать прохождение ТО или ДТП?' : lang === 'KG' ? 'Кошумча тейлөө же кырсык тарыхын кошкуңуз келеби?' : 'Want to simulate a service visit or crash?'}
              </span>
              <button
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="px-4 py-2 rounded-lg bg-blue-600/15 text-[#5D9CEC] border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold flex items-center space-x-1.5"
                id="toggle-sim-form-btn"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'RU' ? 'Добавить событие' : lang === 'KG' ? 'Окуя кошуу' : 'Simulate Event'}</span>
              </button>
            </div>

            {/* SIMULATED EVENT FORM POPUP */}
            <AnimatePresence>
              {showAddEvent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/30 border border-white/10 rounded-xl p-5 overflow-hidden"
                >
                  <form onSubmit={handleAddEventSubmit} className="space-y-4">
                    <h4 className="text-xs font-bold text-[#5D9CEC] uppercase tracking-widest mb-2 flex items-center space-x-1.5">
                      <Wrench className="w-4 h-4 text-amber-500" />
                      <span>{lang === 'RU' ? 'Панель Симуляции Записей (Без API)' : lang === 'KG' ? 'Окуяларды Симуляциялоо Панели' : 'Local Sandbox Timeline Injector'}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">{lang === 'RU' ? 'Тип события' : lang === 'KG' ? 'Окуя тиби' : 'Event Type'}</label>
                        <select
                          value={newEvent.type}
                          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as VehicleEvent['type'] })}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 text-white"
                        >
                          <option value="service">🔧 Service / Техническое обслуживание</option>
                          <option value="accident">💥 Accident / ДТП (Incidents)</option>
                          <option value="ownership">👤 Ownership / Смена владельца</option>
                          <option value="inspection">📋 Inspection / Технический контроль</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">{lang === 'RU' ? 'Дата' : lang === 'KG' ? 'Күнү' : 'Event Date'}</label>
                        <input
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">
                          {lang === 'RU' ? 'Показания одометра (км)' : lang === 'KG' ? 'Одометр (км)' : 'Odometer (km)'}
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 115000"
                          value={newEvent.mileage}
                          onChange={(e) => setNewEvent({ ...newEvent, mileage: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">{lang === 'RU' ? 'Заголовок события' : lang === 'KG' ? 'Окуя аталышы' : 'Event Title'}</label>
                        <input
                          type="text"
                          required
                          placeholder={lang === 'RU' ? 'Например, Замена рулевой рейки' : lang === 'KG' ? 'Аталышы...' : 'e.g., Replacement of steering joints'}
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">{lang === 'RU' ? 'Исполнитель / СТО' : lang === 'KG' ? 'Иткаруучу / СТО' : 'Operator / Station'}</label>
                        <input
                          type="text"
                          placeholder="e.g. AutoHub Premium Service"
                          value={newEvent.operator}
                          onChange={(e) => setNewEvent({ ...newEvent, operator: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase mb-1">{lang === 'RU' ? 'Описание события' : lang === 'KG' ? 'Түшүндүрмөсү' : 'Event Description'}</label>
                      <textarea
                        rows={2}
                        placeholder={lang === 'RU' ? 'Укажите детали работ или повреждений...' : lang === 'KG' ? 'Толук маалымат...' : 'Provide details of repairs or accident report...'}
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-500 text-white"
                      />
                    </div>

                    {newEvent.type === 'accident' && (
                      <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                        <label className="block text-[10px] text-red-400 font-bold uppercase mb-1">
                          {lang === 'RU' ? 'Серьезность ДТП (Влияет на Траст-Балл)' : lang === 'KG' ? 'Кырсыктын деңгээли' : 'Accident Severity Level (Decreases Trust Score)'}
                        </label>
                        <div className="flex space-x-4 mt-1.5">
                          {[
                            { value: 'low', label: lang === 'RU' ? 'Низкая (Косметика -10)' : lang === 'KG' ? 'Төмөн' : 'Low (-10)' },
                            { value: 'medium', label: lang === 'RU' ? 'Средняя (Ремонт -20)' : lang === 'KG' ? 'Орто' : 'Medium (-20)' },
                            { value: 'high', label: lang === 'RU' ? 'Высокая (Геометрия/Рама -35)' : lang === 'KG' ? 'Жогорку' : 'High (-35)' }
                          ].map(opt => (
                            <label key={opt.value} className="flex items-center space-x-1.5 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name="severity"
                                value={opt.value}
                                checked={newEvent.severity === opt.value}
                                onChange={() => setNewEvent({ ...newEvent, severity: opt.value as 'low' | 'medium' | 'high' })}
                                className="text-red-600 focus:ring-0 bg-slate-900 border-white/10"
                              />
                              <span>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddEvent(false)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold"
                      >
                        {lang === 'RU' ? 'Отмена' : lang === 'KG' ? 'Жокко чыгаруу' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                      >
                        {lang === 'RU' ? 'Внедрить событие' : lang === 'KG' ? 'Окуяны кошуу' : 'Inject Event'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: HEALTH CHECKS, OWNERSHIP ANALYSIS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* AI OWNERSHIP ANALYSIS */}
            <div className="bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-400" />
                <span>{lang === 'RU' ? 'AI Анализ Владельцев' : lang === 'KG' ? 'AI Ээлик кылуу талдоосу' : 'AI Ownership Analysis'}</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 text-center">
                  <span className="text-2xl font-extrabold text-blue-400 block">
                    {recalculatedVehicle.ownersCount}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-1">
                    {lang === 'RU' ? 'Кол-во Владельцев' : lang === 'KG' ? 'Ээлеринин саны' : 'Total Owners'}
                  </span>
                </div>

                <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 text-center">
                  <span className="text-2xl font-extrabold text-blue-400 block">
                    {recalculatedVehicle.avgOwnershipYears} {lang === 'RU' ? 'г.' : lang === 'KG' ? 'жыл' : 'yrs'}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-1">
                    {lang === 'RU' ? 'Средний срок' : lang === 'KG' ? 'Орточо мөөнөт' : 'Avg Period'}
                  </span>
                </div>
              </div>

              {/* Ownership Type bar */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{lang === 'RU' ? 'Тип использования' : lang === 'KG' ? 'Колдонуу тиби' : 'Usage Profile'}</span>
                  <span className="font-bold text-slate-200 uppercase tracking-wider text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
                    {recalculatedVehicle.usageType}
                  </span>
                </div>

                {/* Progress-like visual usage breakdown */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>{lang === 'RU' ? 'Личное' : 'Private'}</span>
                    <span>{lang === 'RU' ? 'Коммерческое' : 'Commercial'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-blue-500 h-full" 
                      style={{ width: recalculatedVehicle.usageType === 'Private' ? '90%' : recalculatedVehicle.usageType === 'Dealer' ? '60%' : '20%' }} 
                    />
                    <div 
                      className="bg-amber-500 h-full" 
                      style={{ width: recalculatedVehicle.usageType === 'Private' ? '10%' : recalculatedVehicle.usageType === 'Dealer' ? '40%' : '80%' }} 
                    />
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                  {lang === 'RU' 
                    ? 'Смена владельцев происходила стабильно без признаков искусственного завышения цен или скрытого лизинга.' 
                    : lang === 'KG'
                    ? 'Бааларды жасалма көтөрүү же жашыруун лизинг белгилери байкалган жок.'
                    : 'Ownership transitions align with typical consumer retention curves. No rapid auction flip patterns.'}
                </p>
              </div>
            </div>

            {/* AI HEALTH & LIFESPAN CHECKLIST */}
            <div className="bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span>{lang === 'RU' ? 'Анализ Узлов и Срока Эксплуатации' : lang === 'KG' ? 'Техникалык Абалы жана Срогу' : 'Vehicle Health Lifespan'}</span>
                </h3>
              </div>

              {/* Health Grid items */}
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {recalculatedVehicle.health.map((item, index) => {
                  let statusBadge = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
                  if (item.status === 'warning') statusBadge = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                  if (item.status === 'critical') statusBadge = 'text-red-400 bg-red-500/10 border-red-500/20';

                  return (
                    <div key={index} className="p-3 bg-black/20 rounded-xl border border-white/5 text-xs flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{item.name}</span>
                        <span className={`px-2 py-0.2 rounded text-[9px] uppercase font-bold border ${statusBadge}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400 font-mono">
                        <div>
                          <span>{lang === 'RU' ? 'Заменено на:' : lang === 'KG' ? 'Жасалды:' : 'Last Service:'}</span>
                          <span className="block text-slate-300 font-semibold">{item.mileageLast.toLocaleString()} km ({item.lastDone})</span>
                        </div>
                        <div className="text-right">
                          <span>{lang === 'RU' ? 'Рекомендовано:' : lang === 'KG' ? 'Кийинки ТӨ:' : 'Next Inspection:'}</span>
                          <span className="block text-slate-300 font-semibold">{item.nextDue}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* PRINT ONLY SECRET SMART REPORT */}
        <div className="hidden print:block bg-white text-black p-8 space-y-6 text-sm" id="printable-report">
          <div className="flex justify-between items-center border-b-2 border-black pb-4">
            <div>
              <h1 className="text-2xl font-extrabold uppercase">AutoHub Kyrgyzstan - AI Vehicle Intelligence Report</h1>
              <p className="text-xs text-gray-600">Generated on: 2026-07-21 | System Status: Verified Official</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold">{recalculatedVehicle.make} {recalculatedVehicle.model} ({recalculatedVehicle.year})</h2>
              <p className="font-mono text-xs text-gray-600">VIN: {recalculatedVehicle.vin}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b pb-4">
            <div>
              <h3 className="font-bold uppercase text-xs text-gray-600">AI Trust Score</h3>
              <p className="text-3xl font-extrabold">{recalculatedVehicle.trustScore} / 100</p>
            </div>
            <div>
              <h3 className="font-bold uppercase text-xs text-gray-600">Recommendation</h3>
              <p className="font-bold text-sm">{recalculatedVehicle.recommendationType.replace('_', ' ').toUpperCase()}</p>
            </div>
            <div>
              <h3 className="font-bold uppercase text-xs text-gray-600">Fraud Risk Alerts</h3>
              <p className="font-bold text-sm">
                {recalculatedVehicle.fraudAlerts.length === 0 ? "LOW / CLEAN" : `${recalculatedVehicle.fraudAlerts.length} ALERTS FOUND`}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase text-xs text-gray-600 mb-2">AI Expert Evaluation Summary</h3>
            <p className="italic text-gray-800">{recalculatedVehicle.recommendationReason}</p>
          </div>

          <div>
            <h3 className="font-bold uppercase text-xs text-gray-600 mb-2">Timeline Milestones Ledger</h3>
            <div className="space-y-3">
              {recalculatedVehicle.timeline.map((event) => (
                <div key={event.id} className="border-b pb-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>{event.date} - {event.title}</span>
                    <span className="font-mono">{event.mileage.toLocaleString()} km</span>
                  </div>
                  <p className="text-gray-700 mt-1">{event.description}</p>
                  <p className="text-[10px] text-gray-500">Location: {event.location} | Operator: {event.operator}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 border-t text-[10px] text-gray-400">
            AutoHub KR cryptographic ledger verification check: SUCCESS. This printout is valid for 30 days from generation.
          </div>
        </div>

      </div>
    </div>
  );
};
