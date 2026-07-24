import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, AlertOctagon, HelpCircle, ArrowRight, CheckCircle, 
  Printer, Share2, Bookmark, BookmarkCheck, PhoneCall, ExternalLink, Calendar, 
  MapPin, DollarSign, Eye, Compass, Info, FileText, Check, Copy, RefreshCw, Star, 
  Activity, Zap, Landmark, Truck, ShieldAlert, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VinCheckPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onNavigateToCalculator?: (tab?: string) => void;
}

interface DamagePart {
  part: string;
  partKG: string;
  partEN: string;
  status: 'none' | 'minor' | 'moderate' | 'major';
  description: string;
  descriptionKG: string;
  descriptionEN: string;
}

interface VinRecord {
  vin: string;
  brand: string;
  model: string;
  year: number;
  countryOfOrigin: string;
  countryOfOriginKG: string;
  countryOfOriginEN: string;
  engine: string;
  transmission: string;
  transmissionKG: string;
  transmissionEN: string;
  fuelType: string;
  fuelTypeKG: string;
  fuelTypeEN: string;
  bodyType: string;
  bodyTypeKG: string;
  bodyTypeEN: string;
  color: string;
  colorKG: string;
  colorEN: string;
  
  // Auction details
  auctionCountry: string;
  auctionDate: string;
  auctionName: string;
  auctionLot: string;
  auctionPrice: string;
  auctionImage: string;

  // Mileage
  currentMileage: number;
  prevMileage: number;
  mileageConsistency: 'consistent' | 'inconsistent';
  mileageNotes: string;
  mileageNotesKG: string;
  mileageNotesEN: string;

  // Damages
  damageMap: DamagePart[];

  // Accidents
  accidentsCount: number;
  claimsCount: number;
  repairHistory: string[];
  repairHistoryKG: string[];
  repairHistoryEN: string[];

  // Special Statuses
  isFlood: boolean;
  isFire: boolean;
  isTheft: boolean;
  isSalvage: boolean;

  // Import / Owners
  importHistory: string[];
  importHistoryKG: string[];
  importHistoryEN: string[];
  previousOwnersCount: number;

  // Scores
  score: number; // 1-100
  scoreGrade: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  recommendation: 'Recommended' | 'Caution' | 'NotRecommended';
  recommendationReason: string;
  recommendationReasonKG: string;
  recommendationReasonEN: string;
}

const DEMO_RECORDS: VinRecord[] = [
  {
    vin: 'KNDPM81C7N7124098',
    brand: 'Kia',
    model: 'K5 Signature',
    year: 2022,
    countryOfOrigin: 'Южная Корея',
    countryOfOriginKG: 'Түштүк Корея',
    countryOfOriginEN: 'South Korea',
    engine: '2.0 LPI',
    transmission: 'Автомат (6 ступеней)',
    transmissionKG: 'Автомат (6 баскычтуу)',
    transmissionEN: '6-Speed Automatic',
    fuelType: 'Газ (LPG)',
    fuelTypeKG: 'Газ (LPG)',
    fuelTypeEN: 'LPG Gas',
    bodyType: 'Седан',
    bodyTypeKG: 'Седан',
    bodyTypeEN: 'Sedan',
    color: 'Черный перламутр',
    colorKG: 'Кара бермет',
    colorEN: 'Jet Black Pearl',
    auctionCountry: 'Южная Корея (Incheon)',
    auctionDate: '12.04.2026',
    auctionName: 'Lotte Auto Auction',
    auctionLot: 'LOT #49102-K',
    auctionPrice: '$18,400 USD',
    auctionImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    currentMileage: 42350,
    prevMileage: 28100,
    mileageConsistency: 'consistent',
    mileageNotes: 'Пробег подтвержден оригинальными записями ТО и логами аукциона. Признаков скрутки не обнаружено.',
    mileageNotesKG: 'Жүргөн жолу ТӨ маалыматтары жана аукцион логдору менен тастыкталды. Өзгөртүү белгилери табылган жок.',
    mileageNotesEN: 'Mileage verified by official service records and auction logs. No odometer rollback detected.',
    damageMap: [
      { part: 'Капот', partKG: 'Капот', partEN: 'Hood', status: 'none', description: 'Заводской окрас, повреждений нет', descriptionKG: 'Заводдук боёк, зыян жок', descriptionEN: 'Factory paint, no damage' },
      { part: 'Передний бампер', partKG: 'Алдыңкы бампер', partEN: 'Front Bumper', status: 'minor', description: 'Мелкие сколы от гравия (косметика)', descriptionKG: 'Майда чийиктер бар', descriptionEN: 'Minor stone chips from highway driving' },
      { part: 'Левое крыло', partKG: 'Сол канат', partEN: 'Left Fender', status: 'none', description: 'Оригинальная деталь, без сколов', descriptionKG: 'Оригинал деталь, чийилген эмес', descriptionEN: 'Original panel, pristine condition' },
      { part: 'Правое крыло', partKG: 'Оң канат', partEN: 'Right Fender', status: 'none', description: 'Оригинальная деталь, без повреждений', descriptionKG: 'Оригинал деталь, зыян жок', descriptionEN: 'Original panel, no issues' },
      { part: 'Крыша', partKG: 'Чатыр', partEN: 'Roof', status: 'none', description: 'Без вмятин, оригинальное стекло люка', descriptionKG: 'Ийилген жерлери жок, панорама люгу бүтүн', descriptionEN: 'No dents, original sunroof glass' },
      { part: 'Багажник / Задняя часть', partKG: 'Багажник / Арткы бөлүк', partEN: 'Trunk / Rear', status: 'none', description: 'Состояние нового', descriptionKG: 'Жаңы унаадай абалда', descriptionEN: 'Like new condition' },
      { part: 'Двигатель', partKG: 'Кыймылдаткыч', partEN: 'Engine', status: 'none', description: 'Сухой, без подтеков, работает ровно', descriptionKG: 'Кургак, май аккан жерлери жок, түз иштейт', descriptionEN: 'No leaks, smooth idle, perfect health' },
      { part: 'Подушки безопасности', partKG: 'Коопсуздук жастыктары', partEN: 'Airbags', status: 'none', description: 'Заводские пиропатроны, не срабатывали', descriptionKG: 'Заводдук абалда, атылган эмес', descriptionEN: 'Factory original, never deployed' },
      { part: 'Шасси / Подвеска', partKG: 'Шасси / Подвеска', partEN: 'Chassis / Suspension', status: 'none', description: 'Люфты отсутствуют, амортизаторы сухие', descriptionKG: 'Бошогон жерлери жок, кургак', descriptionEN: 'Tight suspension, zero play, dry struts' }
    ],
    accidentsCount: 0,
    claimsCount: 0,
    repairHistory: ['Замена моторного масла (15 тыс. км)', 'Замена салонного фильтра (30 тыс. км)'],
    repairHistoryKG: ['Мотор майын алмаштыруу (15 миң км)', 'Салон фильтрин алмаштыруу (30 миң км)'],
    repairHistoryEN: ['Engine oil change (15k km)', 'Cabin air filter change (30k km)'],
    isFlood: false,
    isFire: false,
    isTheft: false,
    isSalvage: false,
    importHistory: ['12.04.2026 - Выкуплен на аукционе в Инчхоне', '20.04.2026 - Погрузка на судно в порту Инчхон'],
    importHistoryKG: ['12.04.2026 - Инчхондогу аукциондон сатылып алынды', '20.04.2026 - Инчхон портунан кемеге жүктөлдү'],
    importHistoryEN: ['12.04.2026 - Purchased at Incheon Auction', '20.04.2026 - Loaded on vessel in Incheon Port'],
    previousOwnersCount: 1,
    score: 94,
    scoreGrade: 'Excellent',
    recommendation: 'Recommended',
    recommendationReason: 'Автомобиль в превосходном техническом состоянии. Идеальная юридическая история, один владелец в Корее, полное отсутствие ДТП и окрасов. Рекомендуется к покупке без дополнительных проверок.',
    recommendationReasonKG: 'Унаа эң сонун техникалык абалда. Юридикалык тарыхы таза, Кореяда бир гана ээси болгон, Кырсыктар такыр болгон эмес. Кошумча текшерүүсүз сатып алуу сунушталат.',
    recommendationReasonEN: 'The vehicle is in superb technical condition. Clean history with single owner in Korea, zero accidents or repaint. Highly recommended to buy without any hesitation.'
  },
  {
    vin: 'JTDKN3DU1M5102984',
    brand: 'Toyota',
    model: 'Camry Hybrid XLE',
    year: 2021,
    countryOfOrigin: 'Япония',
    countryOfOriginKG: 'Япония',
    countryOfOriginEN: 'Japan',
    engine: '2.5 Hybrid',
    transmission: 'Вариатор (e-CVT)',
    transmissionKG: 'Вариатор (e-CVT)',
    transmissionEN: 'e-CVT Transmission',
    fuelType: 'Гибрид (Бензин/Электро)',
    fuelTypeKG: 'Гибрид (Бензин/Электро)',
    fuelTypeEN: 'Gasoline Hybrid',
    bodyType: 'Седан',
    bodyTypeKG: 'Седан',
    bodyTypeEN: 'Sedan',
    color: 'Белый жемчуг (Pearl White)',
    colorKG: 'Ак бермет',
    colorEN: 'Pearl White',
    auctionCountry: 'Япония (USS Tokyo)',
    auctionDate: '08.11.2025',
    auctionName: 'USS Tokyo Auction',
    auctionLot: 'LOT #10928',
    auctionPrice: '$21,900 USD',
    auctionImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=600',
    currentMileage: 68120,
    prevMileage: 49500,
    mileageConsistency: 'consistent',
    mileageNotes: 'Записи о пробеге последовательны. Подтверждено аукционным листом с оценкой 4.5 B.',
    mileageNotesKG: 'Жүргөн жолу ырааттуу. Оценкасы 4.5 B болгон аукцион барагы менен далилденген.',
    mileageNotesEN: 'Mileage entries are strictly sequential. Confirmed by auction sheet with 4.5 B grade.',
    damageMap: [
      { part: 'Капот', partKG: 'Капот', partEN: 'Hood', status: 'none', description: 'Заводской окрас, состояние отличное', descriptionKG: 'Заводдук боёк, абалы эң жакшы', descriptionEN: 'Factory paint, excellent shape' },
      { part: 'Передний бампер', partKG: 'Алдыңкы бампер', partEN: 'Front Bumper', status: 'minor', description: 'Локальный ремонт мелких царапин снизу', descriptionKG: 'Астындагы майда чийилген жерлери оңдолгон', descriptionEN: 'Local touch-up of minor scrapes underneath' },
      { part: 'Левое крыло', partKG: 'Сол канат', partEN: 'Left Fender', status: 'minor', description: 'Косметический окрас без шпатлевки', descriptionKG: 'Шпатлевкасыз косметикалык боёк', descriptionEN: 'Cosmetic repaint, no body filler' },
      { part: 'Правое крыло', partKG: 'Оң канат', partEN: 'Right Fender', status: 'none', description: 'Оригинальная краска', descriptionKG: 'Оригинал боёк', descriptionEN: 'Original paint, pristine' },
      { part: 'Крыша', partKG: 'Чатыр', partEN: 'Roof', status: 'none', description: 'Без повреждений', descriptionKG: 'Зыяны жок', descriptionEN: 'No issues' },
      { part: 'Багажник / Задняя часть', partKG: 'Багажник / Арткы бөлүк', partEN: 'Trunk / Rear', status: 'none', description: 'Оригинальный окрас', descriptionKG: 'Оригинал боёк', descriptionEN: 'Factory paint' },
      { part: 'Двигатель', partKG: 'Кыймылдаткыч', partEN: 'Engine', status: 'none', description: 'Гибридная система протестирована, батарея 92% здоровья', descriptionKG: 'Гибрид системасы текшерилди, батареянын абалы 92%', descriptionEN: 'Hybrid system healthy, high-voltage battery health at 92%' },
      { part: 'Подушки безопасности', partKG: 'Коопсуздук жастыктары', partEN: 'Airbags', status: 'none', description: 'Оригинал, не срабатывали', descriptionKG: 'Оригинал, атылган эмес', descriptionEN: 'Original, non-deployed' },
      { part: 'Шасси / Подвеска', partKG: 'Шасси / Подвеска', partEN: 'Chassis / Suspension', status: 'minor', description: 'Износ передних втулок стабилизатора (рекомендуется замена)', descriptionKG: 'Алдыңкы стабилизатор втулкалары эскирген', descriptionEN: 'Worn front sway bar bushings (recommended replacement soon)' }
    ],
    accidentsCount: 1,
    claimsCount: 1,
    repairHistory: ['Замена лобового стекла по гарантии (Япония)', 'Косметический окрас переднего левого крыла'],
    repairHistoryKG: ['Кепилдик боюнча алдыңкы айнегин алмаштыруу', 'Сол алдыңкы канаттын косметикалык боёлушу'],
    repairHistoryEN: ['Windshield replaced under warranty in Japan', 'Cosmetic paint on left front fender'],
    isFlood: false,
    isFire: false,
    isTheft: false,
    isSalvage: false,
    importHistory: ['08.11.2025 - Продан на аукционе USS Tokyo', '15.11.2025 - Прибытие в порт Майдзуру', '12.12.2025 - Таможенная очистка в КР'],
    importHistoryKG: ['08.11.2025 - USS Tokyo аукционунда сатылды', '15.11.2025 - Майдзуру портуна келди', '12.12.2025 - Кыргызстанда бажыдан өткөрүлдү'],
    importHistoryEN: ['08.11.2025 - Sold at USS Tokyo Auction', '15.11.2025 - Arrived at Maizuru Port', '12.12.2025 - Customs clearance completed in KG'],
    previousOwnersCount: 2,
    score: 86,
    scoreGrade: 'Good',
    recommendation: 'Caution',
    recommendationReason: 'Автомобиль в хорошем ухоженном состоянии. Имеет один косметический окрас переднего левого крыла, геометрия кузова не нарушена, безопасность на месте. Батарея гибрида имеет высокий остаточный ресурс. Рекомендуется к покупке с учетом косметического окраса.',
    recommendationReasonKG: 'Унаа жакшы абалда. Бир гана сол канаттын косметикалык боёлушу бар, геометриясы бузулган эмес. Батареянын ресурсу жогору. Косметикасын эске алып, сатып алуу сунушталат.',
    recommendationReasonEN: 'The car is in good, well-maintained condition. Features a cosmetic repaint on the front-left fender with zero structural damage. Airbags are original. Battery health is great. Recommend to proceed with caution on price bargaining.'
  },
  {
    vin: '1FA6P8CF9H5190432',
    brand: 'Ford',
    model: 'Mustang GT Premium',
    year: 2017,
    countryOfOrigin: 'США',
    countryOfOriginKG: 'АКШ',
    countryOfOriginEN: 'USA',
    engine: '5.0 V8 Coyote',
    transmission: 'Механика (6 ступеней)',
    transmissionKG: 'Механика (6 баскычтуу)',
    transmissionEN: '6-Speed Manual',
    fuelType: 'Бензин',
    fuelTypeKG: 'Бензин',
    fuelTypeEN: 'Gasoline',
    bodyType: 'Купе',
    bodyTypeKG: 'Купе',
    bodyTypeEN: 'Coupe',
    color: 'Ярко-красный (Ruby Red)',
    colorKG: 'Кызыл',
    colorEN: 'Ruby Red Metallic',
    auctionCountry: 'США (Copart Texas)',
    auctionDate: '04.03.2023',
    auctionName: 'Copart Salvage Auction',
    auctionLot: 'LOT #38910403',
    auctionPrice: '$9,200 USD',
    auctionImage: 'https://images.unsplash.com/photo-1611245801312-5134002a2477?auto=format&fit=crop&q=80&w=600',
    currentMileage: 112500,
    prevMileage: 110400,
    mileageConsistency: 'inconsistent',
    mileageNotes: 'Внимание! Обнаружено несоответствие истории пробега при экспорте. Одометр скручен или заменен в процессе восстановления.',
    mileageNotesKG: 'Көңүл буруңуз! Экспортто унаанын жүргөн жолунда дал келбестик табылган. Одометр өзгөртүлгөн.',
    mileageNotesEN: 'Warning! Mileage history discrepancy detected during export. Odometer rollback suspected during salvage reconstruction.',
    damageMap: [
      { part: 'Капот', partKG: 'Капот', partEN: 'Hood', status: 'major', description: 'Заменен неоригинальным алюминиевым капотом, зазоры нарушены', descriptionKG: 'Оригинал эмес капот менен алмаштырылган, тешиктери туура эмес', descriptionEN: 'Replaced with aftermarket aluminum hood, poor fitment panel gaps' },
      { part: 'Передний бампер', partKG: 'Алдыңкы бампер', partEN: 'Front Bumper', status: 'major', description: 'Полный перекрас, следы пайки пластика, сломаны крепления фар', descriptionKG: 'Толугу менен боёлгон, паяльниктин издери бар', descriptionEN: 'Fully repainted, visible plastic welds, broken headlight tabs' },
      { part: 'Левое крыло', partKG: 'Сол канат', partEN: 'Left Fender', status: 'moderate', description: 'Окрас со шпатлевкой более 800 мкм, деформация арки', descriptionKG: 'Шпатлевкасы менен боёлгон, 800 мкм ашык', descriptionEN: 'Repainted with body filler over 800 microns, fender arch distortion' },
      { part: 'Правое крыло', partKG: 'Оң канат', partEN: 'Right Fender', status: 'moderate', description: 'Рихтовка кузова, сильный наплыв лака', descriptionKG: 'Түздөө иштери жүргөн, боёкто мүчүлүштүктөр бар', descriptionEN: 'Heavy clear coat runs, signs of slide-hammer dent removal' },
      { part: 'Крыша', partKG: 'Чатыр', partEN: 'Roof', status: 'minor', description: 'Следы града, мелкие вмятины по ребрам жесткости', descriptionKG: 'Мөндүрдүн издери, майда ийилген жерлери бар', descriptionEN: 'Minor hail damage, soft ripples on the high structure lines' },
      { part: 'Багажник / Задняя часть', partKG: 'Багажник / Арткы бөлүк', partEN: 'Trunk / Rear', status: 'none', description: 'Заводской окрас, без дефектов', descriptionKG: 'Заводдук боёк, дефект жок', descriptionEN: 'Original paint, pristine rear structure' },
      { part: 'Двигатель', partKG: 'Кыймылдаткыч', partEN: 'Engine', status: 'moderate', description: 'Запотевание клапанных крышек, ошибки по фазорегуляторам OBD2', descriptionKG: 'Клапан капкагынан май сарыккан, OBD2 каталары бар', descriptionEN: 'Leaking valve cover gaskets, pending diagnostic trouble codes for phasers' },
      { part: 'Подушки безопасности', partKG: 'Коопсуздук жастыктары', partEN: 'Airbags', status: 'major', description: 'Срабатывали шторки и подушка водителя. Установлены заглушки ("обманки")!', descriptionKG: 'Аба жастыктары атылган. Калыбына келтирилбей, заглушкалар коюлган!', descriptionEN: 'Curtains and steering wheel airbags deployed. Resistors installed instead of active modules!' },
      { part: 'Шасси / Подвеска', partKG: 'Шасси / Подвеска', partEN: 'Chassis / Suspension', status: 'major', description: 'Погнут правый передний лонжерон кузова, нарушен развал колес', descriptionKG: 'Оң алдыңкы лонжерон ийилген, дөңгөлөктөрдүн развалы бузулган', descriptionEN: 'Bent right-front frame rail / apron, cannot achieve factory alignment specs' }
    ],
    accidentsCount: 3,
    claimsCount: 2,
    repairHistory: ['Замена переднего лонжерона и бампера (США)', 'Установка неоригинальных кузовных деталей (Литва)', 'Удаление катализаторов и чип-тюнинг'],
    repairHistoryKG: ['Алдыңкы лонжерон жана бампер алмаштыруу (АКШ)', 'Оригинал эмес кузов деталдарын орнотуу (Литва)', 'Катализаторлорду алып салуу'],
    repairHistoryEN: ['Frame rail pull and bumper structural swap in USA', 'Aftermarket panel rebuild in Lithuania', 'Catalytic converters delete and custom stage 1 tune'],
    isFlood: true,
    isFire: false,
    isTheft: false,
    isSalvage: true,
    importHistory: ['04.03.2023 - Списан страховой компанией в Техасе как утиль (Flood/Collision)', '10.05.2023 - Экспорт в Клайпеду (Литва) для ремонта', '15.09.2023 - Ввезен в Кыргызстан'],
    importHistoryKG: ['04.03.2023 - Техастагы камсыздандыруу компаниясы тарабынан утиль деп табылган', '10.05.2023 - Клайпедага (Литва) оңдоого жөнөтүлгөн', '15.09.2023 - Кыргызстанга алып келинген'],
    importHistoryEN: ['04.03.2023 - Declared Salvage / Water Flood Loss in Texas, USA', '10.05.2023 - Exported to Klaipeda, Lithuania for budget repair', '15.09.2023 - Imported and registered in Kyrgyzstan'],
    previousOwnersCount: 4,
    score: 42,
    scoreGrade: 'Poor',
    recommendation: 'NotRecommended',
    recommendationReason: 'Внимание! Автомобиль имеет критические дефекты безопасности: подушки безопасности не восстановлены (стоят заглушки), нарушена силовая структура кузова (погнут лонжерон), а также зафиксирован статус "Flood" (затопление в США). Крайне не рекомендуется к покупке.',
    recommendationReasonKG: 'Көңүл буруңуз! Унаада коопсуздуктун критикалык кемчиликтери бар: аба жастыктары жок (заглушкалар коюлган), лонжерон ийилген, АКШда сууга чөккөн (Flood). Сатып алуу сунушталбайт!',
    recommendationReasonEN: 'Severe warning! The car suffers from major structural frame damage (bent frame rail), passive safety components are completely missing (dummy bypass resistors fitted instead of real airbags), and it carries a Flood Salvage title in Texas. Buying is extremely hazardous.'
  }
];

export function VinCheckPage({ lang, onNavigateToCalculator }: VinCheckPageProps) {
  const [vinInput, setVinInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [activeReport, setActiveReport] = useState<VinRecord | null>(null);
  const [savedVins, setSavedVins] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  
  // Inspection form
  const [inspectName, setInspectName] = useState('');
  const [inspectPhone, setInspectPhone] = useState('');
  const [inspectSuccess, setInspectSuccess] = useState(false);

  // Load saved checked VINs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('askar_autohub_saved_vins');
    if (stored) {
      try {
        setSavedVins(JSON.parse(stored));
      } catch (e) {
        setSavedVins([]);
      }
    }
  }, []);

  // Translations object
  const t = {
    RU: {
      title: 'Центр проверки истории VIN',
      subtitle: 'Мгновенный отчет об истории владения, скрытых повреждениях, ДТП, пробеге и юридической чистоте автомобиля из баз США, Кореи, Японии, ОАЭ и Европы.',
      placeholder: 'Введите 17-значный VIN-код...',
      btn_check: 'Проверить автомобиль',
      btn_example: 'Вставить демо-код премиум унаа',
      btn_example_damaged: 'Вставить демо-код унаа с дефектами',
      how_to_title: 'Где найти VIN-код автомобиля?',
      how_to_desc: 'VIN-код обычно расположен на ветровом стекле (внизу слева), под капотом возле двигателя, на стойке водительской двери или в техпаспорте унаа.',
      why_check_title: 'Почему проверка VIN необходима?',
      why_check_sub: 'Покупка импортированного автомобиля без проверки может повлечь серьезные скрытые затраты.',
      why_1: 'Корректировка одометра',
      why_1_desc: 'Более 30% импортируемых б/у авто имеют скрученный пробег. Мы сопоставляем логи техобслуживания.',
      why_2: 'Скрытые повреждения',
      why_2_desc: 'Маскировка сильных ударов под легкую косметику. Наша карта покажет реальное состояние кузова.',
      why_3: 'Статус "Утиль" и вода',
      why_3_desc: 'Автомобили-утопленники или признанные страховыми компаниями как не подлежащие восстановлению.',
      saving_loading_1: 'Подключение к международным базам аукционов...',
      saving_loading_2: 'Анализ истории пробегов и сверка показателей...',
      saving_loading_3: 'Поиск страховых записей об инцидентах и ДТП...',
      saving_loading_4: 'Расчет оценки безопасности и рекомендации AI...',
      report_title: 'Технический отчет истории автомобиля',
      sec_specs: 'Характеристики автомобиля',
      sec_auction: 'История аукционных торгов',
      sec_mileage: 'Показания одометра',
      sec_damage: 'Интерактивная карта повреждений кузова',
      sec_accidents: 'Реестр ДТП и страховых претензий',
      sec_alerts: 'Статусы критических рисков',
      sec_import: 'История перемещения и импорта',
      sec_score: 'AI Оценка состояния автомобиля',
      sec_rec: 'Итоговая рекомендация',
      brand: 'Марка',
      model: 'Модель',
      year: 'Год выпуска',
      origin: 'Страна происхождения',
      engine: 'Кыймылдаткыч / Объем',
      transmission: 'Трансмиссия',
      fuel: 'Тип топлива',
      body: 'Тип кузова',
      color: 'Цвет кузова',
      auction_name: 'Аукцион',
      auction_lot: 'Номер лота',
      auction_price: 'Финальная ставка',
      auction_date: 'Дата аукциона',
      current_mileage: 'Текущий зафиксированный пробег',
      prev_mileage: 'Предыдущий зафиксированный пробег',
      mileage_consistent: 'Пробег подтвержден и последователен',
      mileage_inconsistent: 'ОБНАРУЖЕНО НЕСООТВЕТСТВИЕ ПРОБЕГА!',
      damage_none: 'Без повреждений',
      damage_minor: 'Незначительное (Косметика/Царапины)',
      damage_mod: 'Умеренное (Требует ремонта)',
      damage_major: 'Критическое (Сильный удар/Замена детали)',
      acc_count: 'Зафиксировано аварий в базах',
      claims_count: 'Страховых выплат зафиксировано',
      repair_logs: 'Записи о ремонте / обслуживании',
      risk_flood: 'Затопление / Вода',
      risk_fire: 'Пожар / Сгорание',
      risk_theft: 'Угон / Розыск',
      risk_salvage: 'Списан страховой (Salvage)',
      status_clean: 'Чистый статус',
      status_alert: 'Критическая отметка!',
      owners: 'Количество владельцев',
      grade_exc: 'Превосходное',
      grade_good: 'Хорошее',
      grade_fair: 'Удовлетворительное',
      grade_poor: 'Критическое (Опасное)',
      rec_buy: 'Рекомендуется к покупке',
      rec_caution: 'Покупать с осторожностью',
      rec_no: 'Не рекомендуется к покупке!',
      saved_tab_title: 'Недавно проверенные авто:',
      act_print: 'Распечатать отчет',
      act_share: 'Поделиться отчетом',
      act_save: 'Сохранить VIN в закладки',
      act_saved: 'Сохранено',
      act_contact: 'Связаться с Askar AutoHub',
      act_whatsapp: 'Написать менеджеру в WhatsApp',
      act_inspect: 'Заказать выездной осмотр эксперта',
      inspect_modal_title: 'Заявка на выездную диагностику унаа',
      inspect_modal_subtitle: 'Наш квалифицированный автоэксперт проведет осмотр автомобиля, сделает замеры толщины ЛКП, компьютерную диагностику двигателя и предоставит вам подробный фото/видео отчет.',
      field_name: 'Ваше имя',
      field_phone: 'Номер телефона',
      inspect_submit: 'Заказать диагностику',
      inspect_success: 'Заявка на диагностику успешно отправлена! Эксперт свяжется с вами в течение получаса.'
    },
    KG: {
      title: 'VIN тарыхын текшерүү борбору',
      subtitle: 'АКШ, Корея, Япония, БАЭ жана Европа унаа маалымат базаларынан ээлик кылуу тарыхы, жашыруун кемчиликтер, кырсыктар жана жүргөн жолу (пробег) тууралуу заматта маалымат алуу.',
      placeholder: '17 орундуу VIN-кодду жазыңыз...',
      btn_check: 'Унааны текшерүү',
      btn_example: 'Премиум унаанын демо-кодун жүктөө',
      btn_example_damaged: 'Кемчилиги бар унаанын демо-кодун жүктөө',
      how_to_title: 'Унаанын VIN-коду кайда жайгашкан?',
      how_to_desc: 'VIN-код адатта алдыңкы айнектин төмөнкү сол бурчунда, капоттун алдында кыймылдаткычтын жанында, айдоочунун эшигинин ортосунда же техникалык паспортто жазылат.',
      why_check_title: 'Эмне үчүн VIN-кодду текшерүү маанилүү?',
      why_check_sub: 'Унааны текшерүүсүз сатып алуу кийинчерээк чоң күтүлбөгөн чыгымдарга алып келиши мүмкүн.',
      why_1: 'Одометрди өзгөртүү (пробег скрутка)',
      why_1_desc: 'Импорттолгон унаалардын 30% ашыгынын пробеги азайтылган болот. Биз ТӨ журналдарын салыштырабыз.',
      why_2: 'Жашыруун кемчиликтер',
      why_2_desc: 'Катуу соккуларды жөнөкөй косметика катары жашыруу. Биздин карта сизге кузовдун чыныгы абалын көрсөтөт.',
      why_3: '"Утиль" же суу алган унаалар',
      why_3_desc: 'Сууга чөккөн же камсыздандыруу компаниялары тарабынан жараксыз деп табылган унаалар.',
      saving_loading_1: 'Эл аралык аукцион базаларына туташуу...',
      saving_loading_2: 'Пробег тарыхын талдоо жана салыштыруу...',
      saving_loading_3: 'Камсыздандыруу жана кырсык тарыхын издөө...',
      saving_loading_4: 'Унаанын коопсуздук упайын жана AI сунушун эсептөө...',
      report_title: 'Унаа тарыхынын техникалык отчету',
      sec_specs: 'Унаанын мүнөздөмөлөрү',
      sec_auction: 'Аукцион тарыхы',
      sec_mileage: 'Одометр көрсөткүчтөрү',
      sec_damage: 'Кузовдун зыяндарын көрсөткөн интерактивдүү карта',
      sec_accidents: 'Жол кырсыктарынын реестри',
      sec_alerts: 'Кооптуу статус белгилери',
      sec_import: 'Импорттоо жана каттоо тарыхы',
      sec_score: 'Унаанын AI баалоосу',
      sec_rec: 'Жыйынтыктоочу сунуш',
      brand: 'Маркасы',
      model: 'Модели',
      year: 'Жылы',
      origin: 'Чыккан өлкөсү',
      engine: 'Кыймылдаткыч / Көлөмү',
      transmission: 'Трансмиссия',
      fuel: 'Күйүүчү май тиби',
      body: 'Кузовдун тиби',
      color: 'Кузовдун түсү',
      auction_name: 'Аукцион',
      auction_lot: 'Лоттун номери',
      auction_price: 'Акыркы баасы',
      auction_date: 'Аукцион күнү',
      current_mileage: 'Акыркы зафиксирленген пробег',
      prev_mileage: 'Мурунку зафиксирленген пробег',
      mileage_consistent: 'Пробег тастыкталды жана дал келет',
      mileage_inconsistent: 'ПРОБЕГДИН ТУУРА ЭМЕСТИГИ ТАБЫЛДЫ!',
      damage_none: 'Зыян жок',
      damage_minor: 'Майда зыян (Косметика/Чийилген)',
      damage_mod: 'Орточо зыян (Оңдоону талап кылат)',
      damage_major: 'Критикалык зыян (Катуу сокку/Алмаштыруу керек)',
      acc_count: 'Базада катталган кырсыктардын саны',
      claims_count: 'Камсыздандыруу төлөмдөрүнүн саны',
      repair_logs: 'Оңдоо жана тейлөө тарыхы',
      risk_flood: 'Суу алган / Чөккөн',
      risk_fire: 'Өрттөнгөн',
      risk_theft: 'Уурдалган / Издөөдө',
      risk_salvage: 'Жараксыз деп табылган (Salvage)',
      status_clean: 'Таза статус',
      status_alert: 'Критикалык белги!',
      owners: 'Мурунку ээлеринин саны',
      grade_exc: 'Эң сонун',
      grade_good: 'Жакшы',
      grade_fair: 'Орточо',
      grade_poor: 'Критикалык (Кооптуу)',
      rec_buy: 'Сатып алуу сунушталат',
      rec_caution: 'Этияттык менен сатып алуу керек',
      rec_no: 'Сатып алуу сунушталбайт!',
      saved_tab_title: 'Жакында текшерилген унаалар:',
      act_print: 'Отчетту басып чыгаруу',
      act_share: 'Бөлүшүү',
      act_save: 'VIN кодду сактоо',
      act_saved: 'Сакталды',
      act_contact: 'Askar AutoHub менен байланышуу',
      act_whatsapp: 'WhatsApp аркылуу жазуу',
      act_inspect: 'Экспорттун жеринде текшерүүсүнө заказ берүү',
      inspect_modal_title: 'Жеринде диагностикага билдирме',
      inspect_modal_subtitle: 'Биздин адис барып унааны толугу менен текшерет, боёгун ченейт, кыймылдаткычка диагностика жасап, сизге толук сүрөт/видео отчет жөнөтөт.',
      field_name: 'Сиздин атыңыз',
      field_phone: 'Телефон номери',
      inspect_submit: 'Диагностикага заказ берүү',
      inspect_success: 'Диагностикага билдирме жөнөтүлдү! Адис жарым сааттын ичинде байланышат.'
    },
    EN: {
      title: 'VIN History & Vehicle Verification Center',
      subtitle: 'Get an instant, comprehensive report on ownership history, hidden damages, accidents, odometer records, and salvage titles from USA, Korea, Japan, UAE, and European databases.',
      placeholder: 'Enter 17-character VIN code...',
      btn_check: 'Check History',
      btn_example: 'Insert premium vehicle demo code',
      btn_example_damaged: 'Insert damaged vehicle demo code',
      how_to_title: 'Where can you find the VIN code?',
      how_to_desc: 'The VIN is typically located on the driver side dashboard (viewable through windshield), inside the driver door jamb column, on the engine block, or in the car registration documents.',
      why_check_title: 'Why is a VIN Check critical?',
      why_check_sub: 'Buying an imported car without looking at its historic data poses highly expensive risks.',
      why_1: 'Odometer Rollbacks',
      why_1_desc: 'Over 30% of imported used vehicles feature tampered odometer readouts. We double-check historic service records.',
      why_2: 'Disguised Frame Damage',
      why_2_desc: 'Severe structural crashes masked behind clean cosmetic quick-repaints. Our heat map reveals actual damage.',
      why_3: 'Salvage or Flood History',
      why_3_desc: 'Vehicles that suffered catastrophic water flooding or were written-off completely by auto insurance.',
      saving_loading_1: 'Querying global vehicle registry & auction APIs...',
      saving_loading_2: 'Analyzing sequential odometer records for inconsistencies...',
      saving_loading_3: 'Scanning international insurance claim logs...',
      saving_loading_4: 'Formulating overall security condition score & AI advice...',
      report_title: 'Vehicle Technical History Report',
      sec_specs: 'Vehicle Specifications',
      sec_auction: 'Auction Transaction Log',
      sec_mileage: 'Odometer Historic Log',
      sec_damage: 'Interactive Exterior Damage Matrix',
      sec_accidents: 'Accidents & Collision Claims Registry',
      sec_alerts: 'Catastrophic Risk Assessments',
      sec_import: 'Transit & Customs Clearance Log',
      sec_score: 'AI Vehicle Quality Score',
      sec_rec: 'Consolidated Final Recommendation',
      brand: 'Brand',
      model: 'Model',
      year: 'Production Year',
      origin: 'Country of Origin',
      engine: 'Engine Specification',
      transmission: 'Transmission Type',
      fuel: 'Fuel Type',
      body: 'Body Layout',
      color: 'Paint Color',
      auction_name: 'Auction Venue',
      auction_lot: 'Auction Lot Number',
      auction_price: 'Final Hammer Bid',
      auction_date: 'Auction Sale Date',
      current_mileage: 'Current Documented Odometer',
      prev_mileage: 'Previously Recorded Odometer',
      mileage_consistent: 'Odometer history verified consistent',
      mileage_inconsistent: 'ODOMETER TAMPERING / DISCREPANCY DETECTED!',
      damage_none: 'Pristine (No damage)',
      damage_minor: 'Minor (Cosmetic paint/Light scratches)',
      damage_mod: 'Moderate (Requires body restoration)',
      damage_major: 'Major (Severe collision / Panel replacement)',
      acc_count: 'Documented Collisions',
      claims_count: 'Insurance Claims Lodged',
      repair_logs: 'Documented Service & Repair Logs',
      risk_flood: 'Water Flood Damage',
      risk_fire: 'Thermal Fire Damage',
      risk_theft: 'Theft / Stolen Police Record',
      risk_salvage: 'Insurance Total Loss (Salvage)',
      status_clean: 'Clean Record',
      status_alert: 'Critical Alert Tag!',
      owners: 'Number of Previous Owners',
      grade_exc: 'Excellent',
      grade_good: 'Good',
      grade_fair: 'Fair',
      grade_poor: 'Poor (Critical Danger)',
      rec_buy: 'Highly Recommended to Buy',
      rec_caution: 'Buy with Caution',
      rec_no: 'NOT RECOMMENDED TO BUY!',
      saved_tab_title: 'Recently checked VINs:',
      act_print: 'Print History Report',
      act_share: 'Share Report',
      act_save: 'Bookmark VIN Check',
      act_saved: 'Bookmarked',
      act_contact: 'Consult Askar AutoHub',
      act_whatsapp: 'Write to WhatsApp Agent',
      act_inspect: 'Book Professional Physical Inspection',
      inspect_modal_title: 'Order Physical Expert Inspection',
      inspect_modal_subtitle: 'Our qualified inspector will perform complete on-site paint thickness diagnostics, computer diagnostics, suspension check, and send you complete HD visual report.',
      field_name: 'Your Name',
      field_phone: 'Phone Number',
      inspect_submit: 'Request Inspection',
      inspect_success: 'Inspection request submitted successfully! Our lead diagnostic engineer will contact you in 30 minutes.'
    }
  }[lang];

  // Function to search and simulate checking VIN
  const handleCheckVin = (vin: string) => {
    const trimmed = vin.trim().toUpperCase();
    if (!trimmed) return;
    
    // Normalize and trigger loading simulation
    setIsSearching(true);
    setSearchStep(0);
    setActiveReport(null);

    // Simulated staggered loading steps
    const stepIntervals = [1000, 2000, 3000, 4200];
    stepIntervals.forEach((time, index) => {
      setTimeout(() => {
        setSearchStep(index + 1);
        if (index === stepIntervals.length - 1) {
          // Finalize search
          const found = DEMO_RECORDS.find(r => r.vin === trimmed);
          if (found) {
            setActiveReport(found);
            // Save to saved list
            if (!savedVins.includes(trimmed)) {
              const updated = [trimmed, ...savedVins].slice(0, 5);
              setSavedVins(updated);
              localStorage.setItem('askar_autohub_saved_vins', JSON.stringify(updated));
            }
          } else {
            // Generate a dynamic realistic clean dummy record if the VIN is random but 17 chars
            const randomSuffix = trimmed.slice(-6);
            const dynamicRecord: VinRecord = {
              vin: trimmed,
              brand: trimmed.startsWith('J') ? 'Toyota' : trimmed.startsWith('K') ? 'Hyundai' : 'BMW',
              model: trimmed.startsWith('J') ? 'Camry 75' : trimmed.startsWith('K') ? 'Sonata Sensuous' : '5-Series',
              year: 2021,
              countryOfOrigin: trimmed.startsWith('J') ? 'Япония' : trimmed.startsWith('K') ? 'Южная Корея' : 'Германия',
              countryOfOriginKG: trimmed.startsWith('J') ? 'Япония' : trimmed.startsWith('K') ? 'Түштүк Корея' : 'Германия',
              countryOfOriginEN: trimmed.startsWith('J') ? 'Japan' : trimmed.startsWith('K') ? 'South Korea' : 'Germany',
              engine: '2.5L Gas',
              transmission: 'Автомат',
              transmissionKG: 'Автомат',
              transmissionEN: 'Automatic',
              fuelType: 'Бензин',
              fuelTypeKG: 'Бензин',
              fuelTypeEN: 'Petrol',
              bodyType: 'Седан',
              bodyTypeKG: 'Седан',
              bodyTypeEN: 'Sedan',
              color: 'Серый металлик',
              colorKG: 'Боз металл',
              colorEN: 'Metallic Grey',
              auctionCountry: 'США / Корея / Япония',
              auctionDate: '15.03.2025',
              auctionName: 'Incheon Auto Hub',
              auctionLot: `LOT #${randomSuffix}`,
              auctionPrice: '$16,200 USD',
              auctionImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
              currentMileage: 53200,
              prevMileage: 41000,
              mileageConsistency: 'consistent',
              mileageNotes: 'Показатели одометра последовательны, расхождений не зафиксировано.',
              mileageNotesKG: 'Пробег дал келет, шектүү нерселер табылган жок.',
              mileageNotesEN: 'Odometer logs are sequential and verified as consistent.',
              damageMap: [
                { part: 'Капот', partKG: 'Капот', partEN: 'Hood', status: 'none', description: 'Заводской окрас', descriptionKG: 'Заводдук боёк', descriptionEN: 'Factory paint' },
                { part: 'Передний бампер', partKG: 'Алдыңкы бампер', partEN: 'Front Bumper', status: 'none', description: 'Заводской окрас', descriptionKG: 'Заводдук боёк', descriptionEN: 'Factory paint' },
                { part: 'Левое крыло', partKG: 'Сол канат', partEN: 'Left Fender', status: 'none', description: 'Заводской окрас', descriptionKG: 'Заводдук боёк', descriptionEN: 'Factory paint' },
                { part: 'Правое крыло', partKG: 'Оң канат', partEN: 'Right Fender', status: 'none', description: 'Заводской окрас', descriptionKG: 'Заводдук боёк', descriptionEN: 'Factory paint' },
                { part: 'Крыша', partKG: 'Чатыр', partEN: 'Roof', status: 'none', description: 'Заводской окрас', descriptionKG: 'Заводдук боёк', descriptionEN: 'Factory paint' },
                { part: 'Багажник / Задняя часть', partKG: 'Багажник / Арткы бөлүк', partEN: 'Trunk / Rear', status: 'none', description: 'Заводской окрас', descriptionKG: 'Заводдук боёк', descriptionEN: 'Factory paint' },
                { part: 'Двигатель', partKG: 'Кыймылдаткыч', partEN: 'Engine', status: 'none', description: 'Двигатель сухой, ошибок нет', descriptionKG: 'Кыймылдаткыч кургак, катасы жок', descriptionEN: 'Engine clean, dry, zero diagnostic codes' },
                { part: 'Подушки безопасности', partKG: 'Коопсуздук жастыктары', partEN: 'Airbags', status: 'none', description: 'Оригинал', descriptionKG: 'Оригинал', descriptionEN: 'Factory active' },
                { part: 'Шасси / Подвеска', partKG: 'Шасси / Подвеска', partEN: 'Chassis / Suspension', status: 'none', description: 'Состояние отличное', descriptionKG: 'Абалы эң жакшы', descriptionEN: 'Excellent health' }
              ],
              accidentsCount: 0,
              claimsCount: 0,
              repairHistory: ['Регулярное ТО у официального дилера'],
              repairHistoryKG: ['Техникалык тейлөө өз убагында өткөрүлгөн'],
              repairHistoryEN: ['Regular scheduled maintenance log'],
              isFlood: false,
              isFire: false,
              isTheft: false,
              isSalvage: false,
              importHistory: ['Импортирован в КР в 2025 году, оформлен растаможен.'],
              importHistoryKG: ['Кыргызстанга 2025-жылы алынып келинген, бажыдан өткөн.'],
              importHistoryEN: ['Imported to KG in 2025, customs fully cleared.'],
              previousOwnersCount: 1,
              score: 96,
              scoreGrade: 'Excellent',
              recommendation: 'Recommended',
              recommendationReason: 'Этот автомобиль имеет идеальную юридическую чистоту и полностью заводской кузов. Несоответствий или повреждений в международных реестрах не обнаружено. Рекомендуется к покупке.',
              recommendationReasonKG: 'Унаанын тарыхы абдан таза, кузову бүтүн. Эл аралык реестрлерде эч кандай жаман белги табылган жок. Сатып алуу сунушталат.',
              recommendationReasonEN: 'This vehicle has a spotless history report and original factory body. No collision or salvage alerts found in international databases. Highly recommended to buy.'
            };
            setActiveReport(dynamicRecord);
            if (!savedVins.includes(trimmed)) {
              const updated = [trimmed, ...savedVins].slice(0, 5);
              setSavedVins(updated);
              localStorage.setItem('askar_autohub_saved_vins', JSON.stringify(updated));
            }
          }
          setIsSearching(false);
        }
      }, time);
    });
  };

  const autofillVin = (presetVin: string) => {
    setVinInput(presetVin);
    handleCheckVin(presetVin);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBookmark = () => {
    if (!activeReport) return;
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectName || !inspectPhone) {
      alert(lang === 'RU' ? 'Пожалуйста, заполните все поля!' : 'Please fill all fields!');
      return;
    }
    setInspectSuccess(true);
    setTimeout(() => {
      setInspectSuccess(false);
      setShowInspectionModal(false);
      setInspectName('');
      setInspectPhone('');
    }, 4000);
  };

  return (
    <div id="vin-check" className="min-h-screen bg-black text-white font-sans selection:bg-[#0B3D91] selection:text-white pb-16">
      
      {/* Premium Hero Design */}
      <div className="relative py-20 sm:py-28 bg-gradient-to-b from-[#0B3D91]/20 to-black border-b border-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B3D91]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#0B3D91]/20 border border-[#0B3D91]/40 rounded-full text-[#5893F7] text-xs font-bold uppercase tracking-wider mb-6"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5893F7]" />
            <span>Askar AutoHub KG Safe Deal</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-none"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed font-normal"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-8 relative z-20">
        
        {/* main search box */}
        <div className="bg-[#07070b] border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  maxLength={17}
                  value={vinInput}
                  onChange={(e) => setVinInput(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, ''))}
                  placeholder={t.placeholder}
                  className="w-full bg-[#111116] border border-gray-700 rounded-2xl py-4 pl-5 pr-14 text-base sm:text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/30 font-mono tracking-widest transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded">
                  {vinInput.length}/17
                </span>
              </div>
              <button
                onClick={() => handleCheckVin(vinInput)}
                disabled={isSearching || vinInput.length !== 17}
                className="bg-[#0B3D91] hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#0B3D91]/20 active:scale-95"
              >
                {isSearching ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
                <span>{t.btn_check}</span>
              </button>
            </div>

            {/* Quick Demo Autofill Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-xs text-gray-500 mr-2">Примеры для демо:</span>
              <button
                type="button"
                onClick={() => autofillVin('KNDPM81C7N7124098')}
                className="text-xs bg-[#0B3D91]/10 hover:bg-[#0B3D91]/30 text-[#5893F7] border border-[#0B3D91]/30 px-3 py-1.5 rounded-full transition-all flex items-center space-x-1"
              >
                <Award className="w-3.5 h-3.5 text-yellow-400" />
                <span>Kia K5 (Идеальное)</span>
              </button>
              <button
                type="button"
                onClick={() => autofillVin('JTDKN3DU1M5102984')}
                className="text-xs bg-[#0B3D91]/10 hover:bg-[#0B3D91]/30 text-[#5893F7] border border-[#0B3D91]/30 px-3 py-1.5 rounded-full transition-all flex items-center space-x-1"
              >
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>Toyota Camry (Окрасы)</span>
              </button>
              <button
                type="button"
                onClick={() => autofillVin('1FA6P8CF9H5190432')}
                className="text-xs bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/40 px-3 py-1.5 rounded-full transition-all flex items-center space-x-1"
              >
                <AlertOctagon className="w-3.5 h-3.5 text-red-500" />
                <span>Ford Mustang (Утиль/Утопленник)</span>
              </button>
            </div>
          </div>

          {/* Recently checked list */}
          {savedVins.length > 0 && (
            <div className="border-t border-gray-900 pt-4 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span className="font-semibold text-gray-500">{t.saved_tab_title}</span>
              {savedVins.map((svin) => (
                <button
                  key={svin}
                  onClick={() => autofillVin(svin)}
                  className="bg-[#111116] hover:bg-gray-800 text-[#5893F7] px-2.5 py-1 rounded font-mono border border-gray-800 transition-all"
                >
                  {svin}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LOADING PROGRESS ANIMATION */}
        <AnimatePresence>
          {isSearching && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#050B1A] border border-[#0B3D91]/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl mb-10 overflow-hidden"
            >
              <div className="max-w-md mx-auto space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-900" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#5893F7] animate-spin" />
                  <Activity className="w-8 h-8 text-[#5893F7] absolute inset-0 m-auto animate-pulse" />
                </div>
                
                <h3 className="text-lg font-bold text-white">
                  {lang === 'RU' ? 'Идет комплексный анализ истории...' : lang === 'KG' ? 'Комплекстүү талдоо жүрүүдө...' : 'Comprehensive history analysis in progress...'}
                </h3>

                {/* Progress texts based on step */}
                <div className="text-sm text-gray-400 font-mono min-h-6">
                  {searchStep >= 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {searchStep === 1 && <span className="text-cyan-400">✓ {t.saving_loading_1}</span>}
                      {searchStep === 2 && <span className="text-yellow-400">✓ {t.saving_loading_2}</span>}
                      {searchStep === 3 && <span className="text-purple-400">✓ {t.saving_loading_3}</span>}
                      {searchStep === 4 && <span className="text-emerald-400">✓ {t.saving_loading_4}</span>}
                    </motion.div>
                  )}
                </div>

                {/* Simulated bar */}
                <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${searchStep * 25}%` }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DETAILED HISTORY REPORT CONTENT */}
        <AnimatePresence>
          {activeReport && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 print:bg-white print:text-black"
            >
              
              {/* Premium Report Header */}
              <div className="bg-gradient-to-r from-[#070D1F] via-black to-[#070D1F] border border-[#0B3D91]/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-[#0B3D91] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                      VERIFIED REPORT
                    </span>
                    <span className="text-xs text-gray-400 font-mono">ID: {activeReport.vin.slice(0, 5)}-{activeReport.year}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    {activeReport.brand} {activeReport.model} ({activeReport.year})
                  </h2>
                  <div className="mt-2 text-xs sm:text-sm text-gray-400 flex items-center gap-4 font-mono">
                    <span>VIN: <strong className="text-white font-bold select-all">{activeReport.vin}</strong></span>
                    <span className="hidden sm:inline">|</span>
                    <span>{t.owners}: <strong className="text-white font-bold">{activeReport.previousOwnersCount}</strong></span>
                  </div>
                </div>

                {/* Score Widget */}
                <div className="flex items-center space-x-4 bg-black/40 border border-gray-800 p-4 rounded-2xl">
                  <div className="relative w-16 h-16">
                    {/* SVG Circular path */}
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-gray-800"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={
                          activeReport.score >= 90 ? 'text-emerald-500' :
                          activeReport.score >= 75 ? 'text-blue-500' :
                          activeReport.score >= 50 ? 'text-orange-500' : 'text-red-500'
                        }
                        strokeDasharray={`${activeReport.score}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-base font-extrabold font-mono text-white leading-none">{activeReport.score}</span>
                      <span className="text-[7px] text-gray-500 font-bold uppercase">SCORE</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">{t.sec_score}</span>
                    <span className={`text-base font-extrabold ${
                      activeReport.scoreGrade === 'Excellent' ? 'text-emerald-400' :
                      activeReport.scoreGrade === 'Good' ? 'text-blue-400' :
                      activeReport.scoreGrade === 'Fair' ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {activeReport.scoreGrade === 'Excellent' ? t.grade_exc :
                       activeReport.scoreGrade === 'Good' ? t.grade_good :
                       activeReport.scoreGrade === 'Fair' ? t.grade_fair : t.grade_poor}
                    </span>
                  </div>
                </div>
              </div>

              {/* REPORT ACTION BAR */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-[#111116] hover:bg-gray-800 border border-gray-800 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Printer className="w-4 h-4 text-gray-400" />
                  <span>{t.act_print}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="bg-[#111116] hover:bg-gray-800 border border-gray-800 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span>{copiedLink ? (lang === 'RU' ? 'Ссылка скопирована!' : 'Copied!') : t.act_share}</span>
                </button>
                <button
                  onClick={handleBookmark}
                  className="bg-[#111116] hover:bg-gray-800 border border-gray-800 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  {savedSuccess ? (
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Bookmark className="w-4 h-4 text-gray-400" />
                  )}
                  <span>{savedSuccess ? t.act_saved : t.act_save}</span>
                </button>
                <a
                  href={`https://wa.me/996700123456?text=Здравствуйте,%20интересует%20автомобиль%20по%20VIN%20проверке:%20${activeReport.brand}%20${activeReport.model}%20(${activeReport.vin})`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-[#0B3D91]/15 hover:bg-[#0B3D91]/30 border border-[#0B3D91]/30 text-[#5893F7] text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t.act_whatsapp}</span>
                </a>
                <button
                  onClick={() => setShowInspectionModal(true)}
                  className="col-span-2 sm:col-span-1 bg-gradient-to-r from-emerald-950 to-green-900 hover:from-emerald-900 hover:to-green-800 border border-emerald-800 text-emerald-300 text-xs sm:text-sm font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{t.act_inspect}</span>
                </button>
                <button
                  onClick={() => {
                    if (onNavigateToCalculator) {
                      onNavigateToCalculator('customs');
                    }
                  }}
                  className="bg-[#111116] hover:bg-gray-800 border border-gray-800 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Compass className="w-4 h-4 text-gray-400" />
                  <span>Расчет пошлин</span>
                </button>
              </div>

              {/* TWO COLUMN GRID LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: SPECS, AUCTION LOGS, ALERTS */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* General Specifications Panel */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3 flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#5893F7]" />
                      <span>{t.sec_specs}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.brand}</span>
                        <span className="font-semibold text-white">{activeReport.brand}</span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.model}</span>
                        <span className="font-semibold text-white">{activeReport.model}</span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.year}</span>
                        <span className="font-semibold text-white font-mono">{activeReport.year}</span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.origin}</span>
                        <span className="font-semibold text-white">
                          {lang === 'RU' ? activeReport.countryOfOrigin :
                           lang === 'KG' ? activeReport.countryOfOriginKG : activeReport.countryOfOriginEN}
                        </span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.engine}</span>
                        <span className="font-semibold text-white font-mono">{activeReport.engine}</span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.transmission}</span>
                        <span className="font-semibold text-white">
                          {lang === 'RU' ? activeReport.transmission :
                           lang === 'KG' ? activeReport.transmissionKG : activeReport.transmissionEN}
                        </span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.fuel}</span>
                        <span className="font-semibold text-white">
                          {lang === 'RU' ? activeReport.fuelType :
                           lang === 'KG' ? activeReport.fuelTypeKG : activeReport.fuelTypeEN}
                        </span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-gray-900/60">
                        <span className="text-gray-500">{t.body}</span>
                        <span className="font-semibold text-white">
                          {lang === 'RU' ? activeReport.bodyType :
                           lang === 'KG' ? activeReport.bodyTypeKG : activeReport.bodyTypeEN}
                        </span>
                      </div>
                      <div className="flex justify-between py-2.5 sm:col-span-2">
                        <span className="text-gray-500">{t.color}</span>
                        <span className="font-semibold text-white">
                          {lang === 'RU' ? activeReport.color :
                           lang === 'KG' ? activeReport.colorKG : activeReport.colorEN}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE DAMAGE BODY MATRIX */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-900 pb-3">
                      <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <ShieldAlert className="w-5 h-5 text-yellow-400" />
                        <span>{t.sec_damage}</span>
                      </h3>

                      {/* Legend */}
                      <div className="flex flex-wrap gap-2.5 text-[10px]">
                        <span className="flex items-center space-x-1">
                          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                          <span className="text-gray-400">{t.damage_none}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                          <span className="text-gray-400">Minor</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                          <span className="text-gray-400">Mod</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                          <span className="text-gray-400">Major</span>
                        </span>
                      </div>
                    </div>

                    {/* Heatmap Grid Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {activeReport.damageMap.map((partItem, idx) => {
                        const statusColors = {
                          none: 'border-emerald-950 bg-emerald-950/10 text-emerald-400',
                          minor: 'border-yellow-600/30 bg-yellow-600/10 text-yellow-300',
                          moderate: 'border-orange-600/40 bg-orange-600/10 text-orange-400',
                          major: 'border-red-600/50 bg-red-600/10 text-red-400'
                        };

                        return (
                          <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            className={`border rounded-xl p-4 space-y-2 transition-all ${statusColors[partItem.status]}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs uppercase tracking-wide">
                                {lang === 'RU' ? partItem.part :
                                 lang === 'KG' ? partItem.partKG : partItem.partEN}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase font-black bg-black/40">
                                {partItem.status === 'none' ? 'Clean' : partItem.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 leading-snug">
                              {lang === 'RU' ? partItem.description :
                               lang === 'KG' ? partItem.descriptionKG : partItem.descriptionEN}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Auction History Card */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3 flex items-center space-x-2">
                      <Landmark className="w-5 h-5 text-[#5893F7]" />
                      <span>{t.sec_auction}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <div className="md:col-span-2 relative h-44 rounded-xl overflow-hidden group border border-gray-900">
                        <img 
                          src={activeReport.auctionImage} 
                          alt="Auction Lot" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[#5893F7] font-mono text-xs px-2 py-1 rounded">
                          {activeReport.auctionLot}
                        </span>
                      </div>

                      <div className="md:col-span-3 space-y-4 text-sm self-center">
                        <div className="grid grid-cols-2 gap-y-3">
                          <div className="text-gray-500">{t.auction_name}</div>
                          <div className="font-semibold text-white text-right">{activeReport.auctionName}</div>

                          <div className="text-gray-500">{t.auction_lot}</div>
                          <div className="font-semibold text-[#5893F7] text-right font-mono">{activeReport.auctionLot}</div>

                          <div className="text-gray-500">{t.auction_date}</div>
                          <div className="font-semibold text-white text-right font-mono">{activeReport.auctionDate}</div>

                          <div className="text-gray-500">{t.auction_price}</div>
                          <div className="font-black text-emerald-400 text-right text-lg font-mono">{activeReport.auctionPrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: REEESTR ДТП, MILAGE LOGS, ALERTS */}
                <div className="space-y-8">
                  
                  {/* AI Consolidated recommendation Statement */}
                  <div className={`border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl ${
                    activeReport.recommendation === 'Recommended' ? 'border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-black' :
                    activeReport.recommendation === 'Caution' ? 'border-yellow-500/20 bg-gradient-to-b from-yellow-950/10 to-black' :
                    'border-red-500/30 bg-gradient-to-b from-red-950/20 to-black'
                  }`}>
                    <div className="flex items-center space-x-3">
                      {activeReport.recommendation === 'Recommended' && <CheckCircle className="w-8 h-8 text-emerald-400" />}
                      {activeReport.recommendation === 'Caution' && <AlertTriangle className="w-8 h-8 text-yellow-400" />}
                      {activeReport.recommendation === 'NotRecommended' && <AlertOctagon className="w-8 h-8 text-red-500" />}
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">{t.sec_rec}</span>
                        <span className={`text-lg font-extrabold ${
                          activeReport.recommendation === 'Recommended' ? 'text-emerald-400' :
                          activeReport.recommendation === 'Caution' ? 'text-yellow-400' : 'text-red-500'
                        }`}>
                          {activeReport.recommendation === 'Recommended' ? t.rec_buy :
                           activeReport.recommendation === 'Caution' ? t.rec_caution : t.rec_no}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                      {lang === 'RU' ? activeReport.recommendationReason :
                       lang === 'KG' ? activeReport.recommendationReasonKG : activeReport.recommendationReasonEN}
                    </p>
                  </div>

                  {/* Mileage consistency and trend visualizer */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-900 pb-2">
                      {t.sec_mileage}
                    </h4>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">{t.current_mileage}</span>
                        <span className="font-mono font-bold text-white">{activeReport.currentMileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">{t.prev_mileage}</span>
                        <span className="font-mono font-bold text-white">{activeReport.prevMileage.toLocaleString()} km</span>
                      </div>

                      {/* Consistency indicator status pill */}
                      <div className={`p-3 rounded-xl flex items-start space-x-2 text-xs leading-relaxed ${
                        activeReport.mileageConsistency === 'consistent' 
                          ? 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-400' 
                          : 'bg-red-950/20 border border-red-900/40 text-red-400'
                      }`}>
                        {activeReport.mileageConsistency === 'consistent' ? (
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 animate-bounce" />
                        )}
                        <div>
                          <strong className="block font-bold">
                            {activeReport.mileageConsistency === 'consistent' ? t.mileage_consistent : t.mileage_inconsistent}
                          </strong>
                          <span className="text-gray-400 text-[11px] block mt-1">
                            {lang === 'RU' ? activeReport.mileageNotes :
                             lang === 'KG' ? activeReport.mileageNotesKG : activeReport.mileageNotesEN}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciden Collisons list and claim logs */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-900 pb-2 flex items-center justify-between">
                      <span>{t.sec_accidents}</span>
                      <span className="bg-[#0B3D91]/20 text-[#5893F7] font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                        {activeReport.accidentsCount}
                      </span>
                    </h4>

                    <div className="space-y-3.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-gray-900/40">
                        <span className="text-gray-500">{t.acc_count}</span>
                        <span className={`font-bold ${activeReport.accidentsCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {activeReport.accidentsCount}
                        </span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-gray-900/40">
                        <span className="text-gray-500">{t.claims_count}</span>
                        <span className={`font-bold ${activeReport.claimsCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {activeReport.claimsCount}
                        </span>
                      </div>

                      {/* list logs */}
                      <div className="space-y-2 pt-1">
                        <span className="text-gray-500 block font-bold mb-1.5">{t.repair_logs}:</span>
                        {activeReport.repairHistory.map((log, lIdx) => (
                          <div key={lIdx} className="bg-[#111116] border border-gray-800 p-2.5 rounded-lg text-gray-300 flex items-start space-x-2">
                            <span className="text-[#5893F7] font-mono">•</span>
                            <span>
                              {lang === 'RU' ? log :
                               lang === 'KG' ? activeReport.repairHistoryKG[lIdx] : activeReport.repairHistoryEN[lIdx]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Critical Status checks (Flood, Fire, Theft, Salvage) */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-900 pb-2">
                      {t.sec_alerts}
                    </h4>

                    <div className="space-y-3 text-xs">
                      {/* Flood */}
                      <div className="flex items-center justify-between py-2 border-b border-gray-900/40">
                        <span className="text-gray-400 flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${activeReport.isFlood ? 'bg-red-500' : 'bg-emerald-500'}`} />
                          <span>{t.risk_flood}</span>
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                          activeReport.isFlood ? 'bg-red-950/50 text-red-400' : 'bg-emerald-950/40 text-emerald-400'
                        }`}>
                          {activeReport.isFlood ? t.status_alert : t.status_clean}
                        </span>
                      </div>

                      {/* Fire */}
                      <div className="flex items-center justify-between py-2 border-b border-gray-900/40">
                        <span className="text-gray-400 flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${activeReport.isFire ? 'bg-red-500' : 'bg-emerald-500'}`} />
                          <span>{t.risk_fire}</span>
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                          activeReport.isFire ? 'bg-red-950/50 text-red-400' : 'bg-emerald-950/40 text-emerald-400'
                        }`}>
                          {activeReport.isFire ? t.status_alert : t.status_clean}
                        </span>
                      </div>

                      {/* Theft */}
                      <div className="flex items-center justify-between py-2 border-b border-gray-900/40">
                        <span className="text-gray-400 flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${activeReport.isTheft ? 'bg-red-500' : 'bg-emerald-500'}`} />
                          <span>{t.risk_theft}</span>
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                          activeReport.isTheft ? 'bg-red-950/50 text-red-400' : 'bg-emerald-950/40 text-emerald-400'
                        }`}>
                          {activeReport.isTheft ? t.status_alert : t.status_clean}
                        </span>
                      </div>

                      {/* Salvage */}
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-400 flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${activeReport.isSalvage ? 'bg-red-500' : 'bg-emerald-500'}`} />
                          <span>{t.risk_salvage}</span>
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                          activeReport.isSalvage ? 'bg-red-950/50 text-red-400' : 'bg-emerald-950/40 text-emerald-400'
                        }`}>
                          {activeReport.isSalvage ? t.status_alert : t.status_clean}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Import timeline history log */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-900 pb-2">
                      {t.sec_import}
                    </h4>

                    <div className="space-y-4 text-xs">
                      {activeReport.importHistory.map((step, sIdx) => (
                        <div key={sIdx} className="relative pl-5 border-l-2 border-[#0B3D91] space-y-1 py-1">
                          <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#5893F7]" />
                          <p className="text-gray-300 font-medium">
                            {lang === 'RU' ? step :
                             lang === 'KG' ? activeReport.importHistoryKG[sIdx] : activeReport.importHistoryEN[sIdx]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPREHENSIVE INFORMATION BLOCKS ABOUT WHY AND HOW */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-900 pt-16">
          <div className="bg-[#07070b] border border-gray-900 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-extrabold text-white flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#5893F7]" />
              <span>{t.how_to_title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {t.how_to_desc}
            </p>
            <div className="bg-black/40 border border-gray-900 p-4 rounded-2xl text-xs text-gray-400 flex items-center gap-3">
              <span className="text-yellow-400 text-lg">💡</span>
              <span><strong>Лайфхак:</strong> сфотографируйте штрих-код VIN на торце водительской двери, чтобы не ошибиться при вводе символов.</span>
            </div>
          </div>

          <div className="bg-[#07070b] border border-gray-900 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-extrabold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{t.why_check_title}</span>
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.why_check_sub}
            </p>
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start space-x-2.5 text-xs">
                <span className="w-1.5 h-1.5 bg-[#5893F7] rounded-full mt-1.5" />
                <div>
                  <strong className="text-white block">{t.why_1}</strong>
                  <span className="text-gray-500">{t.why_1_desc}</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5 text-xs">
                <span className="w-1.5 h-1.5 bg-[#5893F7] rounded-full mt-1.5" />
                <div>
                  <strong className="text-white block">{t.why_2}</strong>
                  <span className="text-gray-500">{t.why_2_desc}</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5 text-xs">
                <span className="w-1.5 h-1.5 bg-[#5893F7] rounded-full mt-1.5" />
                <div>
                  <strong className="text-white block">{t.why_3}</strong>
                  <span className="text-gray-500">{t.why_3_desc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: PHYSICAL DIAGNOSTICS APPOINTMENT */}
      <AnimatePresence>
        {showInspectionModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#07070b] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setShowInspectionModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold bg-gray-900/60 w-8 h-8 rounded-full flex items-center justify-center"
              >
                &times;
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 fill-emerald-400" />
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  {t.inspect_modal_title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {t.inspect_modal_subtitle}
                </p>
              </div>

              {inspectSuccess ? (
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-semibold text-white">
                    {t.inspect_success}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInspectionSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase tracking-wider block font-bold">{t.field_name}</label>
                    <input
                      type="text"
                      required
                      value={inspectName}
                      onChange={(e) => setInspectName(e.target.value)}
                      placeholder={lang === 'RU' ? 'Введите ваше имя' : 'Enter your name'}
                      className="w-full bg-[#111116] border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#0B3D91]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase tracking-wider block font-bold">{t.field_phone}</label>
                    <input
                      type="text"
                      required
                      value={inspectPhone}
                      onChange={(e) => setInspectPhone(e.target.value)}
                      placeholder="Например: +996 700 123 456"
                      className="w-full bg-[#111116] border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#0B3D91]"
                    />
                  </div>

                  {activeReport && (
                    <div className="bg-[#111116] border border-gray-900 p-3.5 rounded-xl text-xs text-gray-400 font-mono">
                      <span>Выбранное унаа: <strong>{activeReport.brand} {activeReport.model} ({activeReport.year})</strong></span>
                      <span className="block mt-1">VIN: {activeReport.vin}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#0B3D91] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#0B3D91]/20 uppercase text-xs tracking-wider"
                  >
                    {t.inspect_submit}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
