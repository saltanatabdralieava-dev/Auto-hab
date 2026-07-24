import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, Bot, MessageSquare, Send, CheckCircle2, AlertTriangle, 
  HelpCircle, Trash2, Sliders, DollarSign, Users, Award, 
  MapPin, Settings, Info, ShoppingCart, RefreshCw, Star, 
  TrendingUp, Fuel, Zap, Clock, ShieldCheck, Heart, Share2, 
  Plus, X, BarChart3, MessageCircle, FileText, Compass, ChevronDown, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiAdvisorPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onNavigateToCalculator?: (tab?: string) => void;
  onNavigateToVinCheck?: (vin?: string) => void;
  onNavigateToOrderCar?: (carData?: any) => void;
}

interface VehicleRecommendation {
  id: string;
  brand: string;
  model: string;
  year: number;
  photo: string;
  country: string;
  countryKG: string;
  countryEN: string;
  auctionSource: string;
  auctionPriceUSD: number;
  deliveryUSD: number;
  customsUSD: number;
  totalPriceUSD: number;
  monthlyPaymentUSD: number;
  reliabilityScore: number; // 1-100
  fuelEconomy: string;
  fuelEconomyKG: string;
  fuelEconomyEN: string;
  maintenanceCost: string;
  maintenanceCostKG: string;
  maintenanceCostEN: string;
  resaleValue: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  resaleValueKG: string;
  resaleValueEN: string;
  availabilityScore: number; // 1-100
  aiExplanation: {
    whyRecommended: string;
    whyRecommendedKG: string;
    whyRecommendedEN: string;
    advantages: string[];
    advantagesKG: string[];
    advantagesEN: string[];
    disadvantages: string[];
    disadvantagesKG: string[];
    disadvantagesEN: string[];
    bestFor: string;
    bestForKG: string;
    bestForEN: string;
  };
  confidenceScore: number;
}

// Pool of highly realistic recommended vehicles
const VEHICLES_POOL: VehicleRecommendation[] = [
  {
    id: 'toyota-rav4-2022',
    brand: 'Toyota',
    model: 'RAV4 Hybrid XLE',
    year: 2022,
    photo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600',
    country: 'США',
    countryKG: 'АКШ',
    countryEN: 'USA',
    auctionSource: 'Copart / IAAI',
    auctionPriceUSD: 16500,
    deliveryUSD: 3400,
    customsUSD: 4600,
    totalPriceUSD: 24500,
    monthlyPaymentUSD: 380,
    reliabilityScore: 96,
    fuelEconomy: '5.2 л / 100 км',
    fuelEconomyKG: '5.2 л / 100 км',
    fuelEconomyEN: '5.2 L / 100 km',
    maintenanceCost: 'Низкая ($150-250/год)',
    maintenanceCostKG: 'Төмөн ($150-250/жыл)',
    maintenanceCostEN: 'Low ($150-250/year)',
    resaleValue: 'Excellent',
    resaleValueKG: 'Эң сонун',
    resaleValueEN: 'Excellent',
    availabilityScore: 92,
    aiExplanation: {
      whyRecommended: 'Идеальный выбор по экономичности, легендарной надежности и высокому спросу на вторичном рынке Кыргызстана. Подходит для любых дорожных условий.',
      whyRecommendedKG: 'Үнөмдүүлүк, легендарлуу ишенимдүүлүк жана Кыргызстандын экинчилик базарындагы жогорку суроо-талап боюнча идеалдуу тандоо.',
      whyRecommendedEN: 'A perfect balanced choice featuring legendary Toyota reliability, superb fuel economy, and outstanding resale value in the Kyrgyz market.',
      advantages: [
        'Очень низкий расход топлива благодаря гибридной установке Synergy Drive',
        'Высокий клиренс (190 мм) для загородных поездок',
        'Ликвидность на рынке — минимальная потеря стоимости со временем',
        'Просторный салон и багажное отделение для семьи'
      ],
      advantagesKG: [
        'Synergy Drive гибриддик системасынын аркасында абдан төмөн күйүүчү май керектөө',
        'Айыл жерлери үчүн жогорку клиренс (190 мм)',
        'Базардагы ликвиддүүлүк — убакыттын өтүшү менен минималдуу баасын жоготот',
        'Үй-бүлө үчүн кенен салон жана багаж'
      ],
      advantagesEN: [
        'Extremely low fuel consumption via Synergy Drive hybrid powertrain',
        'High ground clearance (190mm) ideal for diverse road conditions',
        'Industry leading resale value retention',
        'Spacious cabin and storage capacity for active families'
      ],
      disadvantages: [
        'Шумоизоляция колесных арок могла бы быть лучше',
        'Высокая стоимость первоначальной покупки на аукционе'
      ],
      disadvantagesKG: [
        'Дөңгөлөк аркаларынын ызы-чуу изоляциясы начарыраак',
        'Аукциондо баштапкы сатып алуу баасынын жогорулугу'
      ],
      disadvantagesEN: [
        'Road and cabin wind noise at highway speeds is average',
        'Higher initial purchase price premium at global auctions'
      ],
      bestFor: 'Активных семей, городских поездок с регулярными выездами в горы и тех, кто ценит экономию и надежность.',
      bestForKG: 'Үй-бүлөлөр үчүн, шаар ичинде жана тоого бат-баттан чыгып тургандарга, үнөмдүүлүктү жана ишенимдүүлүктү баалагандарга.',
      bestForEN: 'Active families, urban commuters who take weekend trips to mountainous areas, and long-term owners looking to maximize holding value.'
    },
    confidenceScore: 95
  },
  {
    id: 'hyundai-sonata-2021',
    brand: 'Hyundai',
    model: 'Sonata LPI Signature',
    year: 2021,
    photo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    country: 'Южная Корея',
    countryKG: 'Түштүк Корея',
    countryEN: 'South Korea',
    auctionSource: 'Lotte Auto Auction',
    auctionPriceUSD: 11200,
    deliveryUSD: 2800,
    customsUSD: 2800,
    totalPriceUSD: 16800,
    monthlyPaymentUSD: 260,
    reliabilityScore: 93,
    fuelEconomy: '9.8 л газа / 100 км (очень дешево)',
    fuelEconomyKG: '9.8 л газ / 100 км (абдан арзан)',
    fuelEconomyEN: '9.8 L LPG / 100 km (highly cost-effective)',
    maintenanceCost: 'Минимальная ($100-180/год)',
    maintenanceCostKG: 'Абдан төмөн ($100-180/жыл)',
    maintenanceCostEN: 'Minimal ($100-180/year)',
    resaleValue: 'Good',
    resaleValueKG: 'Жакшы',
    resaleValueEN: 'Good',
    availabilityScore: 95,
    aiExplanation: {
      whyRecommended: 'Заводской газ LPI обеспечивает колоссальную экономию на топливе в Кыргызстане. Проверенная временем трансмиссия и двигатель с огромным ресурсом работы делают ее лидером для коммерческого использования и такси.',
      whyRecommendedKG: 'Заводдук LPI газы Кыргызстанда күйүүчү майга ири үнөмдөөнү камсыз кылат. Чоң ресурска ээ болгон кыймылдаткыч жана автомат такси үчүн эң мыкты вариант кылат.',
      whyRecommendedEN: 'Factory-installed LPI (liquid propane injection) system delivers industry-leading fuel economy in KG. Exceptional longevity and low service overhead make it perfect for city transport and high-mileage users.',
      advantages: [
        'Стоимость езды на газе в 2 раза ниже бензина или дизеля',
        'Проверенная временем классическая 6-ступенчатая коробка автомат',
        'Просторный премиальный салон и отличные опции комплектации Signature',
        'Крайне недорогие запасные части и высокая ремонтопригодность'
      ],
      advantagesKG: [
        'Газ менен жүрүү баасы бензин же дизелге караганда 2 эсе арзан',
        'Убакыт сыноосунан өткөн классикалык 6 баскычтуу автомат кутусу',
        'Премиум кенен салон жана Signature комплектациясынын мыкты параметрлери',
        'Абдан арзан тетиктер жана оңой оңдолушу'
      ],
      advantagesEN: [
        'LPG fuel cost is roughly 50% cheaper compared to standard petrol',
        'Heavy-duty classical 6-speed torque converter automatic',
        'High-spec Signature interior loaded with advanced digital clusters',
        'Widespread availability of affordable spare parts and local expert mechanics'
      ],
      disadvantages: [
        'Баллон с газом в багажнике сокращает его полезный объем на 20%',
        'Запуск в экстремальные морозы ниже -30°C требует качественного газа'
      ],
      disadvantagesKG: [
        'Багажниктеги газ баллону анын көлөмүн 20% кыскартат',
        '-30°C төмөн катуу суукта сапаттуу газды талап кылат'
      ],
      disadvantagesEN: [
        'Trunk-mounted LPG tank reduces cargo volume by roughly 20%',
        'Cold winter starts below -30C require high-purity winter LPG grade'
      ],
      bestFor: 'Водителей такси, торговых представителей и всех, кто проезжает более 50-100 км в день по городу.',
      bestForKG: 'Такси айдоочулары, соода өкүлдөрү жана күнүнө шаар ичинде 50-100 кмден ашык жол жүргөндөр үчүн.',
      bestForEN: 'Taxi operators, business fleets, and smart daily commuters driving over 50-100km per day who prioritize minimal running costs.'
    },
    confidenceScore: 98
  },
  {
    id: 'lexus-rx450h-2020',
    brand: 'Lexus',
    model: 'RX 450h AWD Luxury',
    year: 2020,
    photo: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
    country: 'Япония / США',
    countryKG: 'Япония / АКШ',
    countryEN: 'Japan / USA',
    auctionSource: 'TAA Japan / Copart',
    auctionPriceUSD: 24500,
    deliveryUSD: 4200,
    customsUSD: 9300,
    totalPriceUSD: 38000,
    monthlyPaymentUSD: 590,
    reliabilityScore: 98,
    fuelEconomy: '6.4 л / 100 км',
    fuelEconomyKG: '6.4 л / 100 км',
    fuelEconomyEN: '6.4 L / 100 km',
    maintenanceCost: 'Средняя ($300-450/год)',
    maintenanceCostKG: 'Орточо ($300-450/жыл)',
    maintenanceCostEN: 'Moderate ($300-450/year)',
    resaleValue: 'Excellent',
    resaleValueKG: 'Эң сонун',
    resaleValueEN: 'Excellent',
    availabilityScore: 89,
    aiExplanation: {
      whyRecommended: 'Премиальный кроссовер повышенной комфортности. Идеальное сочетание роскошных материалов отделки, надежнейшего 3.5 V6 мотора с гибридной установкой и высочайшего статуса в КР.',
      whyRecommendedKG: 'Жогорку деңгээлдеги премиум кроссовер. Кымбат баалуу материалдар, ишенимдүү 3.5 V6 гибрид мотору жана Кыргызстандагы жогорку кадыр-барктын айкалышы.',
      whyRecommendedEN: 'A premier midsize luxury SUV. Outfitted with stellar materials, legendary 3.5L V6 self-charging hybrid power unit, and unmatched executive status in Bishkek.',
      advantages: [
        'Исключительная плавность хода и шумоизоляция премиум-класса',
        'Невероятная долговечность узлов — один из самых надежных кроссоверов в мире',
        'Богатая комплектация Luxury: вентиляция сидений, аудиосистема Mark Levinson',
        'Максимальная остаточная стоимость на рынке КР'
      ],
      advantagesKG: [
        'Өзгөчө жумшак жүрүшү жана премиум класстагы ызы-чуудан коргоо',
        'Теттиктердин укмуштуудай узактыгы — дүйнөдөгү эң ишенимдүү унаалардын бири',
        'Бай комплектация Luxury: сиденье желдетүүсү, Mark Levinson аудиосистемасы',
        'Кыргызстандын рыногунда баасын максималдуу сакташы'
      ],
      advantagesEN: [
        'Whisper-quiet cabin with superior double-glazed acoustic glass insulation',
        'Unrivaled reliability ratings across luxury segment categories',
        'Premium Luxury spec: ventilated semi-aniline seats, Mark Levinson reference audio',
        'Extremely resilient asset retention with rapid resale speed'
      ],
      disadvantages: [
        'Высокая таможенная пошлина из-за объема двигателя 3.5 литра',
        'Мультимедийная система с трекпадом требует привыкания'
      ],
      disadvantagesKG: [
        '3.5 литрлик кыймылдаткычтын көлөмүнө байланыштуу бажы төлөмүнүн жогорулугу',
        'Трекпад менен башкарылган мультимедиа системасы үйрөнүүнү талап кылат'
      ],
      disadvantagesEN: [
        'Elevated customs clearance duty driven by the 3.5L engine volume',
        'Infotainment trackpad controller setup is polarizing for some users'
      ],
      bestFor: 'Бизнесменов, руководителей и семей, ищущих абсолютный комфорт, надежность и презентабельный вид без компромиссов.',
      bestForKG: 'Бизнесмендерге, жетекчилерге жана үй-бүлөсүнө толук ыңгайлуулук, коопсуздук жана жогорку кадыр-барк каалагандар үчүн.',
      bestForEN: 'Executives, business professionals, and upscale families wanting uncompromised security, dynamic comfort, and flawless luxury prestige.'
    },
    confidenceScore: 94
  },
  {
    id: 'byd-song-2023',
    brand: 'BYD',
    model: 'Song Plus DM-i Flagship',
    year: 2023,
    photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    country: 'Китай',
    countryKG: 'Кытай',
    countryEN: 'China',
    auctionSource: 'Китай (Заводы / Дилеры)',
    auctionPriceUSD: 16800,
    deliveryUSD: 1800,
    customsUSD: 3400,
    totalPriceUSD: 22000,
    monthlyPaymentUSD: 340,
    reliabilityScore: 90,
    fuelEconomy: '4.5 л / 100 км или 0л в режиме электро',
    fuelEconomyKG: '4.5 л / 100 км же электро режиминде 0л',
    fuelEconomyEN: '4.5 L / 100 km (or 0L in pure EV mode)',
    maintenanceCost: 'Низкая ($120-200/год)',
    maintenanceCostKG: 'Төмөн ($120-200/жыл)',
    maintenanceCostEN: 'Low ($120-200/year)',
    resaleValue: 'Good',
    resaleValueKG: 'Жакшы',
    resaleValueEN: 'Good',
    availabilityScore: 97,
    aiExplanation: {
      whyRecommended: 'Лидер продаж среди гибридов в КР. Инновационная плагин-гибридная система DM-i позволяет проезжать до 110 км исключительно на электричестве, а при разряде батареи подключает бензиновый генератор, убирая "страх разряда".',
      whyRecommendedKG: 'Кыргызстандагы гибриддердин сатуу лидери. DM-i инновациялык плагин-гибрид системасы электр менен гана 110 кмге чейин жүрүүгө мүмкүндүк берет.',
      whyRecommendedEN: 'The absolute best-selling plugin hybrid (PHEV) crossover. Features BYD advanced DM-i technology, allowing up to 110km of pure electric silent range and seamless petrol assist.',
      advantages: [
        'Запас хода в смешанном режиме до 1100 км',
        'Современнейший салон с поворотным экраном и голосовым управлением',
        'Мягкая, тихая подвеска и превосходная динамика разгона',
        'Отсутствие пошлин на электрокомпоненты, низкая цена доставки из Китая'
      ],
      advantagesKG: [
        'Аралаш режимде 1100 кмге чейин жүрүү мүмкүнчүлүгү',
        'Бурулуучу экраны жана үн менен башкаруусу бар эң заманбап салон',
        'Жумшак, тынч жүрүшү жана тез ылдамдашы',
        'Кытайдан жеткирүүнүн төмөн баасы жана жеңилдетилген бажы төлөмү'
      ],
      advantagesEN: [
        'Combined hybrid range of up to 1,100 km with full tank and battery',
        'Highly advanced futuristic cockpit with rotating tablet display',
        'Instant electric acceleration with robust torque and whisper-quiet operation',
        'Optimized logistic routes from China for extremely fast delivery'
      ],
      disadvantages: [
        'Требует установки домашней зарядной станции для максимальной выгоды',
        'Программное обеспечение часто требует русификации'
      ],
      disadvantagesKG: [
        'Максималдуу пайда алуу үчүн үйдө кубаттоочу станция орнотуу керек',
        'Программалык камсыздоосу кыргыз же орус тилине которууну талап кылат'
      ],
      disadvantagesEN: [
        'Maximum economic savings require home overnight charging box setup',
        'Infotainment software often needs localized Russian/English translations flash'
      ],
      bestFor: 'Технологичных автолюбителей, жителей частных домов с возможностью ночной зарядки, желающих получить максимум опций за умеренный бюджет.',
      bestForKG: 'Заманбап технологияларды баалагандар, үйүндө кубаттоо мүмкүнчүлүгү барлар жана орточо бюджет менен жогорку сапат каалагандар үчүн.',
      bestForEN: 'Tech-savvy city drivers, suburban owners with easy overnight garage charging setups, and buyers seeking executive crossover feel at a budget.'
    },
    confidenceScore: 91
  },
  {
    id: 'honda-fit-2020',
    brand: 'Honda',
    model: 'Fit Hybrid e:HEV Ness',
    year: 2020,
    photo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600',
    country: 'Япония',
    countryKG: 'Япония',
    countryEN: 'Japan',
    auctionSource: 'USS Yokohama',
    auctionPriceUSD: 6900,
    deliveryUSD: 2600,
    customsUSD: 2000,
    totalPriceUSD: 11500,
    monthlyPaymentUSD: 180,
    reliabilityScore: 97,
    fuelEconomy: '3.6 л / 100 км (рекордсмен)',
    fuelEconomyKG: '3.6 л / 100 км (рекордчу)',
    fuelEconomyEN: '3.6 L / 100 km (class leading)',
    maintenanceCost: 'Крайне низкая ($80-130/год)',
    maintenanceCostKG: 'Абдан арзан ($80-130/жыл)',
    maintenanceCostEN: 'Ultra Low ($80-130/year)',
    resaleValue: 'Excellent',
    resaleValueKG: 'Эң сонун',
    resaleValueEN: 'Excellent',
    availabilityScore: 94,
    aiExplanation: {
      whyRecommended: 'Один из лучших хэтчбеков для городской суеты. Умная гибридная установка e:HEV дает рекордный расход в 3.6 литра. Внутри гораздо больше места, чем кажется снаружи, благодаря системе трансформации сидений Magic Seats.',
      whyRecommendedKG: 'Шаар ичинде жүрүү үчүн эң мыкты хэтчбектердин бири. e:HEV акылдуу гибрид системасы 3.6 литр гана күйүүчү май сарптайт. Салон ичи абдан кенен трансформацияланат.',
      whyRecommendedEN: 'The definitive urban commuter hatchback. Intelligent e:HEV hybrid system achieves an incredible fuel economy rating. Unmatched interior volume utilization with Honda signature Magic Seats config.',
      advantages: [
        'Рекордная экономичность — бака хватает почти на 1000 км в городе',
        'Трансформация салона Magic Seats (задний ряд складывается вертикально)',
        'Высокая японская надежность двигателя e:HEV',
        'Легко парковаться в тесных дворах Бишкека'
      ],
      advantagesKG: [
        'Рекорддук үнөмдүүлүк — бир бак шаар ичинде 1000 кмге жетет',
        'Magic Seats салонунун трансформациясы (арткы сиденье өйдө көтөрүлөт)',
        'Япониянын e:HEV кыймылдаткычынын жогорку ишенимдүүлүгү',
        'Бишкектин тар короолорунда парковка кылууга абдан ыңгайлуу'
      ],
      advantagesEN: [
        'Record-shattering fuel economy - up to 1,000km on a single small tank',
        'Innovative Magic Seats layout allowing vertical and fully flat loading',
        'Renowned Japanese precision engineering and minimal drivetrain wear',
        'Extremely agile footprint makes parking in downtown Bishkek effortless'
      ],
      disadvantages: [
        'Правый руль (может потребоваться привыкание для новичков)',
        'Низкий клиренс (135 мм) — требует аккуратности на грунтовых дорогах'
      ],
      disadvantagesKG: [
        'Оң руль (айрымдарга көнүү керек болот)',
        'Төмөн клиренс (135 мм) — тоо-ташта этият болууну талап кылат'
      ],
      disadvantagesEN: [
        'Right-hand drive layout (standard JDM configuration)',
        'Low ground clearance (135mm) requiring careful navigation over potholes'
      ],
      bestFor: 'Доставки, курьерских служб, начинающих водителей и всех, кто ищет максимально дешевый и беспроблемный транспорт на каждый день.',
      bestForKG: 'Жеткирүү кызматтарына, жаңы баштаган айдоочуларга жана күнүмдүк жумушка эң арзан, ишенимдүү унаа издегендер үчүн.',
      bestForEN: 'Delivery operators, solo commuters, student drivers, and buyers searching for the absolute cheapest cost-per-kilometer transit available.'
    },
    confidenceScore: 93
  }
];

// Mock chatbot Q&A database for intelligent demo replies
const BOT_RESPONSES = [
  {
    keywords: ['25000', '25,000', '25 тыс', '25000$', '25k'],
    RU: 'С бюджетом в $25,000 вы находитесь в "сладкой точке"! Я настоятельно рекомендую рассмотреть **Toyota RAV4 Hybrid (2022)** из США (под ключ выйдет около $24,500) или **BYD Song Plus DM-i (2023)** из Китая (около $22,000). Оба варианта кроссоверов современные, экономичные и имеют отличную ликвидность на рынке Кыргызстана. Какой тип привода для вас предпочтительнее?',
    KG: 'Сиздин $25,000 бюджетиңиз үчүн эң сонун варианттар бар! Мен АКШдан **Toyota RAV4 Hybrid (2022)** (баардык чыгымдары менен $24,500 тегереги болот) же Кытайдан **BYD Song Plus DM-i (2023)** ($22,000 тегереги) сунуштайм. Эки кроссовер тең заманбап жана үнөмдүү. Сизге кайсынысы жакыныраак?',
    EN: 'With a budget of $25,000, you are in the perfect sweet spot! I highly recommend checking out a **Toyota RAV4 Hybrid (2022)** imported from Copart USA (est. $24,500 total) or a plug-in hybrid **BYD Song Plus DM-i (2023)** from China (est. $22,000 total). Both of these SUVs are incredibly fuel-efficient and hold their resale value perfectly in Kyrgyzstan. Do you prefer a petrol hybrid or plug-in EV setup?'
  },
  {
    keywords: ['family', 'семейный', 'семья', 'үй-бүлө', 'үй бүлө'],
    RU: 'Для большой семьи у нас есть два великолепных лидера: **Lexus RX 450h AWD (2020)** за $38,000 (высокий статус, комфортная подвеска и безопасность) или **Toyota RAV4 Hybrid (2022)** за $24,500 (надежный, вместительный багажник и дешевое обслуживание). Если семья очень большая, мы также можем привезти под ключ минивэн **Kia Carnival** из Южной Кореи. Сколько человек обычно путешествуют с вами?',
    KG: 'Үй-бүлө үчүн бизде эки мыкты унаа бар: **Lexus RX 450h AWD (2020)** баасы $38,000 (бийик статус, жумшак жана коопсуз) же **Toyota RAV4 Hybrid (2022)** баасы $24,500 (ишенимдүү, кенен багаж жана арзан тейлөө). Эгер үй-бүлө чоң болсо, Кореядан **Kia Carnival** минивэнин алып келе алабыз. Сизде канча орундуу унаа керек?',
    EN: 'For excellent family comfort, we recommend two top choices: the prestigious **Lexus RX 450h AWD (2020)** at $38,000 total (ultra plush suspension, AWD safety, luxury leather interior) or the highly versatile **Toyota RAV4 Hybrid (2022)** at $24,500 total (spacious back row, massive boot capacity). For extra-large families, we can also import a premium **Kia Carnival** MPV from Korea. How many seats do you need?'
  },
  {
    keywords: ['100 km', '100 км', 'пробег каждый день', 'күн сайын', 'drive every day'],
    RU: 'Дневной пробег в 100 км означает, что вы тратите огромные деньги на бензин! Ваше спасение — **Hyundai Sonata LPI (2021)** на заводском газе из Кореи. Газ в Бишкеке стоит дешево, и ваши траты снизятся более чем на 55%. Также идеален **BYD Song Plus DM-i** (плагин-гибрид), на котором первые 100 км можно проезжать полностью бесплатно на электричестве при наличии домашней зарядки. Рассчитать для вас годовую экономию?',
    KG: 'Күнүнө 100 км жүрсөңүз, бензинге абдан көп акча коротосуз! Сиз үчүн эң мыкты чечим — Кореядан заводдук газ LPI менен чыккан **Hyundai Sonata LPI (2021)**. Бишкекте газ абдан арзан жана чыгымыңыз 55% азайат. Же болбосо Кытайдан **BYD Song Plus DM-i** плагин-гибридин тандасаңыз болот. Сизге кайсы унаа кызыктуураак?',
    EN: 'Driving 100 km daily means fuel efficiency should be your absolute top priority! Your best financial move is the **Hyundai Sonata LPI (2021)** fueled by factory liquid propane gas from Korea. LPG fuel in Bishkek is highly economical, cutting your fuel bills by over 55%. Alternatively, the plug-in **BYD Song Plus DM-i** is stellar because you can cover those 100 km entirely on cheap home electricity. Shall we estimate your annual cash savings?'
  },
  {
    keywords: ['reliable toyota', 'надежная тойота', 'ишенимдүү тойота', 'самая надежная'],
    RU: 'Если вы ищете эталон абсолютной надежности, то это однозначно **Lexus RX 450h (2020)** с атмосферным 3.5 V6 мотором или легендарный кроссовер **Toyota RAV4 Hybrid (2022)**. Моторы Тойоты ходят без капремонта до 400-500 тыс. км, а гибридная батарея служит более 10 лет. Каков ваш ориентировочный бюджет, чтобы я подобрал лучший год выпуска?',
    KG: 'Эгер сиз абсолюттук ишенимдүүлүктү издесеңиз, анда бул 3.5 V6 мотору бар **Lexus RX 450h (2020)** же легендарлуу кроссовер **Toyota RAV4 Hybrid (2022)**. Тойотанын кыймылдаткычтары 400-500 миң кмге чейин кынтыксыз иштейт. Сиздин бюджетиңиз канча?',
    EN: 'If you want the ultimate, indestructible Toyota product, your gold standard options are the high-end **Lexus RX 450h (2020)** featuring the bulletproof 3.5L V6 atmospheric engine, or the classic **Toyota RAV4 Hybrid (2022)**. Both drivetrains regularly surpass 400,000km with basic fluid service. What is your preferred budget range so I can find the best condition lot?'
  }
];

const DEFAULT_BOT_REPLIES = {
  RU: [
    "Отличный вопрос! Чтобы дать точную рекомендацию, заполните, пожалуйста, форму профиля клиента слева. Наша нейросеть сопоставит ваши потребности с текущими лотами на аукционах США, Кореи и Китая.",
    "Вы можете сравнить выбранные автомобили в нашей таблице сравнения ниже, чтобы увидеть разницу в таможенных пошлинах и стоимости доставки в Кыргызстан.",
    "Мы в Askar AutoHub обеспечиваем полное сопровождение под ключ: от выкупа на аукционе до таможенной очистки в Бишкеке. Напишите нам в WhatsApp для моментального контакта с брокером!"
  ],
  KG: [
    "Эң сонун суроо! Сизге так кеңеш берүү үчүн, сол тараптагы кардардын профилин толтуруңуз. Биздин нейротармак сиздин талаптарыңызды аукцион лоттору менен салыштырат.",
    "Төмөнкү салыштыруу таблицасынан тандалган унааларды салыштырып, бажы төлөмдөрү менен жеткирүү чыгымдарын көрө аласыз.",
    "Биз Askar AutoHub унааны аукциондон сатып алуудан баштап, Бишкекте бажыдан өткөрүүгө чейин толук жардам беребиз. Брокер менен байланышуу үчүн WhatsApp аркылуу жазыңыз!"
  ],
  EN: [
    "That is a wonderful question! To give you a hyper-tailored advice, please adjust your Customer Profile parameters on the left. Our AI model will scour live auction inventory from USA, Korea, and China.",
    "You can easily activate Comparison Mode below to visually analyze differences in local customs duties and freight shipping costs to Bishkek.",
    "At Askar AutoHub, we deliver a seamless turn-key experience from physical auction checkout to local registration plate setup. Tap the WhatsApp icon to speak directly to an import specialist!"
  ]
};

export function AiAdvisorPage({ lang, onNavigateToCalculator, onNavigateToVinCheck, onNavigateToOrderCar }: AiAdvisorPageProps) {
  // Customer Profile state
  const [budget, setBudget] = useState<number>(25000);
  const [currency, setCurrency] = useState<'USD' | 'KGS' | 'EUR'>('USD');
  const [familySize, setFamilySize] = useState<number>(4);
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [dailyDistance, setDailyDistance] = useState<number>(40);
  const [mainPurpose, setMainPurpose] = useState<string>('City');
  
  // Preferred Specs
  const [importCountry, setImportCountry] = useState<string>('Any');
  const [preferredBrand, setPreferredBrand] = useState<string>('Any');
  const [preferredModel, setPreferredModel] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('Any');
  const [transmission, setTransmission] = useState<string>('Any');
  const [bodyType, setBodyType] = useState<string>('Any');
  const [minYear, setMinYear] = useState<number>(2020);
  const [maxMileage, setMaxMileage] = useState<number>(100000);

  // Priority
  const [priority, setPriority] = useState<string>('Lowest price');

  // UI state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [recommendations, setRecommendations] = useState<VehicleRecommendation[]>([]);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [comparisonModeActive, setComparisonModeActive] = useState(false);
  const [savedVehicles, setSavedVehicles] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; timestamp: Date }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Load saved advisor selections & initial chat history
  useEffect(() => {
    const storedSaved = localStorage.getItem('askar_advisor_saved_cars');
    if (storedSaved) {
      try { setSavedVehicles(JSON.parse(storedSaved)); } catch (e) {}
    }

    const storedChat = localStorage.getItem('askar_advisor_chat_v2');
    if (storedChat) {
      try {
        const parsed = JSON.parse(storedChat);
        setChatMessages(parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
      } catch (e) {}
    } else {
      // Initial greeting
      const greetings = {
        RU: 'Здравствуйте! Я ваш интеллектуальный AI советник в Askar AutoHub. Задайте мне любой вопрос о покупке авто или настройте фильтры слева, чтобы я подобрал для вас 5 лучших унаа с мировых аукционов!',
        KG: 'Саламатсызбы! Мен сиздин интеллектуалдык AI кеңешчиңизмин. Мага унаа сатып алуу боюнча каалаган сурооңузду бериңиз же сол тараптагы чыпкаларды тууралаңыз, мен сизге 5 эң сонун унааны таап берем!',
        EN: 'Hello there! I am your AI Auto Advisor. Ask me anything about importing vehicles, or adjust your Customer Profile on the left to receive our elite Top-5 recommended vehicle matrix from global auctions!'
      };
      setChatMessages([{ sender: 'bot', text: greetings[lang], timestamp: new Date() }]);
    }
  }, [lang]);

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Profile submission handler
  const handleFindPerfectCar = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setRecommendations([]);

    // Staggered calculation simulation
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 400);

    setTimeout(() => {
      // Logic to rank/adjust recommendations from our pool based on budget and priorities
      let budgetLimitUSD = budget;
      if (currency === 'KGS') budgetLimitUSD = budget / 87.5;
      if (currency === 'EUR') budgetLimitUSD = budget * 1.08;

      // Filter or sort recommendations
      let filtered = [...VEHICLES_POOL];
      
      // Calculate scores customized on priority or budget
      const scoredList = filtered.map(car => {
        let scoreModifier = 0;
        
        // Budget score match
        if (car.totalPriceUSD <= budgetLimitUSD) {
          scoreModifier += 15;
        } else if (car.totalPriceUSD <= budgetLimitUSD * 1.2) {
          scoreModifier += 5; // close enough
        } else {
          scoreModifier -= 15; // over budget
        }

        // Priority matching
        if (priority === 'Lowest price' && car.totalPriceUSD < 15000) scoreModifier += 20;
        if (priority === 'Best reliability' && car.reliabilityScore > 95) scoreModifier += 20;
        if (priority === 'Lowest fuel consumption' && car.fuelEconomy.includes('3.6') || car.fuelEconomy.includes('4.5') || car.fuelEconomy.includes('5.2')) scoreModifier += 20;
        if (priority === 'Luxury' && car.id.includes('lexus')) scoreModifier += 25;
        if (priority === 'Easy maintenance' && car.maintenanceCost.toLowerCase().includes('низк') || car.maintenanceCost.toLowerCase().includes('low')) scoreModifier += 20;
        if (priority === 'Highest resale value' && car.resaleValue === 'Excellent') scoreModifier += 20;

        // Purpose matching
        if (mainPurpose === 'Family' && (car.id.includes('rav4') || car.id.includes('lexus'))) scoreModifier += 15;
        if (mainPurpose === 'Taxi' && car.id.includes('sonata')) scoreModifier += 25;
        if (mainPurpose === 'City' && car.id.includes('fit')) scoreModifier += 15;

        const baseConfidence = car.confidenceScore;
        const finalConfidence = Math.min(100, Math.max(70, baseConfidence + scoreModifier));

        return {
          ...car,
          confidenceScore: Math.round(finalConfidence)
        };
      });

      // Sort by customized confidence score descending
      scoredList.sort((a, b) => b.confidenceScore - a.confidenceScore);
      
      setRecommendations(scoredList);
      setIsAnalyzing(false);
      showToast(lang === 'RU' ? 'Рекомендации успешно сгенерированы!' : lang === 'KG' ? 'Кеңештер ийгиликтүү түзүлдү!' : 'Top recommended vehicles computed successfully!');
      
      // Auto scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('ai-advisor-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    }, 2000);
  };

  // Save / Bookmark car
  const handleSaveCar = (carId: string) => {
    let updated = [...savedVehicles];
    if (updated.includes(carId)) {
      updated = updated.filter(id => id !== carId);
      showToast(lang === 'RU' ? 'Удалено из закладок' : lang === 'KG' ? 'Сакталгандардан өчүрүлдү' : 'Removed from bookmarks');
    } else {
      updated.push(carId);
      showToast(lang === 'RU' ? 'Добавлено в закладки' : lang === 'KG' ? 'Сакталгандарга кошулду' : 'Added to bookmarks');
    }
    setSavedVehicles(updated);
    localStorage.setItem('askar_advisor_saved_cars', JSON.stringify(updated));
  };

  // Compare selection toggle
  const handleToggleCompare = (carId: string) => {
    if (selectedForComparison.includes(carId)) {
      setSelectedForComparison(prev => prev.filter(id => id !== carId));
    } else {
      if (selectedForComparison.length >= 3) {
        showToast(lang === 'RU' ? 'Максимум 3 автомобиля для сравнения' : lang === 'KG' ? 'Слыштыруу үчүн эң көп 3 унаа' : 'Maximum 3 cars for comparison');
        return;
      }
      setSelectedForComparison(prev => [...prev, carId]);
    }
  };

  // Send chatbot message
  const handleSendChat = (textToSend?: string) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim()) return;

    const userMsg = { sender: 'user' as const, text: messageText, timestamp: new Date() };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    localStorage.setItem('askar_advisor_chat_v2', JSON.stringify(updatedMessages));
    if (!textToSend) setChatInput('');

    setIsBotTyping(true);

    // AI dynamic demo responder logic
    setTimeout(() => {
      const normalizedText = messageText.toLowerCase();
      let responseText = '';

      const matchedResponse = BOT_RESPONSES.find(res => 
        res.keywords.some(kw => normalizedText.includes(kw))
      );

      if (matchedResponse) {
        responseText = matchedResponse[lang];
      } else {
        // Fallback random smart replies
        const fallbacks = DEFAULT_BOT_REPLIES[lang];
        responseText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      const botMsg = { sender: 'bot' as const, text: responseText, timestamp: new Date() };
      const finalizedMessages = [...updatedMessages, botMsg];
      setChatMessages(finalizedMessages);
      localStorage.setItem('askar_advisor_chat_v2', JSON.stringify(finalizedMessages));
      setIsBotTyping(false);
    }, 1200);
  };

  // Clear chat logs
  const handleClearChat = () => {
    localStorage.removeItem('askar_advisor_chat_v2');
    const greetings = {
      RU: 'Здравствуйте! Чат очищен. Задайте мне любой вопрос о подборе автомобиля из Кореи, Китая, США и Японии.',
      KG: 'Саламатсызбы! Маек тазаланды. Мага каалаган сурооңузду бериңиз.',
      EN: 'Hello! Your advisor chat history has been reset. Ask me any question regarding custom imports.'
    };
    setChatMessages([{ sender: 'bot', text: greetings[lang], timestamp: new Date() }]);
    showToast(lang === 'RU' ? 'История чата очищена' : lang === 'KG' ? 'Чат тарыхы тазаланды' : 'Chat history reset');
  };

  // Share link simulation
  const handleShareResult = (carModel: string) => {
    navigator.clipboard.writeText(window.location.href);
    showToast(`${lang === 'RU' ? 'Ссылка для' : lang === 'KG' ? 'Шилтеме' : 'Link for'} ${carModel} ${lang === 'RU' ? 'скопирована в буфер!' : lang === 'KG' ? 'буферге көчүрүлдү!' : 'copied to clipboard!'}`);
  };

  // Compare list objects
  const comparedCarsObjects = useMemo(() => {
    return VEHICLES_POOL.filter(car => selectedForComparison.includes(car.id));
  }, [selectedForComparison]);

  const trans = {
    RU: {
      advisor_title: 'AI Авто-Советник',
      advisor_badge: 'Интеллектуальный поиск',
      profile_header: 'Параметры Вашего Идеального Унаа',
      budget_lbl: 'Максимальный бюджет покупки под ключ',
      purpose_lbl: 'Основная цель использования',
      purpose_opts: {
        Family: 'Семейный автомобиль',
        Business: 'Представительский / Бизнес',
        Taxi: 'Для такси / Коммерции',
        'Off-road': 'Внедорожник / Горы',
        Luxury: 'Люкс статус',
        City: 'Городской хэтчбек/седан',
        'Long trips': 'Дальние путешествия'
      },
      priority_lbl: 'Что для вас в приоритете?',
      priority_opts: [
        'Lowest price',
        'Best reliability',
        'Lowest fuel consumption',
        'Luxury',
        'Fast delivery',
        'Easy maintenance',
        'Highest resale value'
      ],
      priority_labels_ru: {
        'Lowest price': 'Минимальная стоимость покупки',
        'Best reliability': 'Максимальная надежность агрегатов',
        'Lowest fuel consumption': 'Экономия на топливе (гибрид/электро)',
        Luxury: 'Премиум комфорт и материалы',
        'Fast delivery': 'Быстрая логистика до Бишкека',
        'Easy maintenance': 'Дешевые запчасти и простой ремонт',
        'Highest resale value': 'Высокая остаточная стоимость (ликвидность)'
      },
      btn_submit: 'Найти идеальное авто',
      specs_header: 'Желаемые характеристики (опционально)',
      country_lbl: 'Страна импорта',
      brand_lbl: 'Марка автомобиля',
      model_lbl: 'Конкретная модель (если есть)',
      fuel_lbl: 'Тип топлива',
      trans_lbl: 'Коробка передач',
      body_lbl: 'Тип кузова',
      min_year_lbl: 'Минимальный год выпуска',
      max_mileage_lbl: 'Максимальный пробег (км)',
      analyzing: 'Запуск интеллектуального AI анализа...',
      any_val: 'Любая / Все',
      results_header: 'Топ-5 Рекомендованных Автомобилей для Вас',
      confidence_badge: 'AI Совпадение',
      delivery_lbl: 'Доставка до Бишкека',
      customs_lbl: 'Таможенная пошлина КР',
      total_price_lbl: 'Итоговая стоимость под ключ',
      loan_est: 'Ориентировочный кредит',
      per_month: '/ мес',
      rel_score: 'Рейтинг надежности',
      avail_score: 'Доступность на аукционах',
      maintenance_lbl: 'Стоимость обслуживания',
      resale_lbl: 'Перепродажа',
      ai_explanation_lbl: 'Аналитический разбор от AI:',
      advantages_lbl: 'Преимущества:',
      disadvantages_lbl: 'Недостатки на КР рынке:',
      best_for_lbl: 'Для кого идеально подойдет:',
      chat_header: 'Интеллектуальный Консультант Брокер',
      chat_placeholder: 'Задайте вопрос, например: "Нужен экономичный кроссовер за 15000 долларов..."',
      comparison_title: 'Сравнение Выбранных Моделей',
      compare_btn: 'Перейти к сравнению',
      clear_selection: 'Очистить выбор',
      price_tag: 'Цена под ключ',
      fuel_eco: 'Расход топлива',
      contact_lead: 'Оставить заявку на привоз этого авто',
      whatsapp_lead: 'Написать брокеру по этой машине'
    },
    KG: {
      advisor_title: 'AI Унаа-Кеңешчи',
      advisor_badge: 'Интеллектуалдык издөө',
      profile_header: 'Сиздин Идеалдуу Унааңыздын Параметрлери',
      budget_lbl: 'Максималдуу бюджет (баардык чыгымдары менен)',
      purpose_lbl: 'Унааны колдонуунун негизги максаты',
      purpose_opts: {
        Family: 'Үй-бүлөлүк унаа',
        Business: 'Бизнес / Өкүлчүлүк унаа',
        Taxi: 'Такси же Коммерция үчүн',
        'Off-road': 'Жолсуз жерлер / Тоо унаасы',
        Luxury: 'Люкс статус',
        City: 'Шаардык хэтчбек/седан',
        'Long trips': 'Алыс жолго чыгуу'
      },
      priority_lbl: 'Сиз үчүн эмне биринчи кезекте маанилүү?',
      priority_opts: [
        'Lowest price',
        'Best reliability',
        'Lowest fuel consumption',
        'Luxury',
        'Fast delivery',
        'Easy maintenance',
        'Highest resale value'
      ],
      priority_labels_ru: {
        'Lowest price': 'Минималдуу сатып алуу баасы',
        'Best reliability': 'Максималдуу ишенимдүүлүк',
        'Lowest fuel consumption': 'Күйүүчү майды үнөмдөө (гибрид/электро)',
        Luxury: 'Премиум комфорт жана сапат',
        'Fast delivery': 'Бишкекке эң тез жеткирүү',
        'Easy maintenance': 'Арзан тетиктер жана оңой оңдоо',
        'Highest resale value': 'Базардагы баасын жоготпоо (ликвиддүүлүк)'
      },
      btn_submit: 'Идеалдуу унааны табуу',
      specs_header: 'Кошумча каалоолор (милдеттүү эмес)',
      country_lbl: 'Чыккан өлкөсү',
      brand_lbl: 'Унаа маркасы',
      model_lbl: 'Атайын модель (эгер бар болсо)',
      fuel_lbl: 'Күйүүчү майдын түрү',
      trans_lbl: 'Коробка передач',
      body_lbl: 'Кузов тиби',
      min_year_lbl: 'Минималдуу жылы',
      max_mileage_lbl: 'Максималдуу пробег (км)',
      analyzing: 'Интеллектуалдык AI талдоо жүрүүдө...',
      any_val: 'Каалаган / Бардыгы',
      results_header: 'Сиз үчүн Топ-5 Сунушталган Унаалар',
      confidence_badge: 'AI Ылайыктуулук',
      delivery_lbl: 'Бишкекке чейин жеткирүү',
      customs_lbl: 'КР бажы төлөмү',
      total_price_lbl: 'Жалпы баасы (Бишкекте)',
      loan_est: 'Болжолдуу кредит',
      per_month: '/ айына',
      rel_score: 'Ишенимдүүлүк рейтинги',
      avail_score: 'Аукциондордогу саны',
      maintenance_lbl: 'Тейлөө баасы',
      resale_lbl: 'Кайра сатуу баасы',
      ai_explanation_lbl: 'AI аналитикалык корутундусу:',
      advantages_lbl: 'Артыкчылыктары:',
      disadvantages_lbl: 'Кыргызстан рыногундагы кемчиликтери:',
      best_for_lbl: 'Кимге идеалдуу келет:',
      chat_header: 'Интеллектуалдык Кеңешчи Брокер чаты',
      chat_placeholder: 'Сурооңузду жазыңыз, мисалы: "15000 долларга кроссовер керек..."',
      comparison_title: 'Тандалган Моделдерди Салыштыруу',
      compare_btn: 'Салыштырууга өтүү',
      clear_selection: 'Тандоону тазалоо',
      price_tag: 'Бишкекке жеткирилген баасы',
      fuel_eco: 'Май сарптоосу',
      contact_lead: 'Бул унааны алып келүүгө билдирме калтыруу',
      whatsapp_lead: 'Бул унаа боюнча брокерге жазуу'
    },
    EN: {
      advisor_title: 'AI Auto Advisor Center',
      advisor_badge: 'Intelligent Matchmaking',
      profile_header: 'Your Ultimate Customer Profile Parameters',
      budget_lbl: 'Maximum overall purchase budget',
      purpose_lbl: 'Primary utilization purpose',
      purpose_opts: {
        Family: 'Family commute',
        Business: 'Executive / Corporate transport',
        Taxi: 'Taxi fleet / Commercial duty',
        'Off-road': 'Mountain terrain / Off-road travel',
        Luxury: 'High prestige status',
        City: 'Urban agile hatchback/sedan',
        'Long trips': 'Cross-country adventure'
      },
      priority_lbl: 'What is your core priority?',
      priority_opts: [
        'Lowest price',
        'Best reliability',
        'Lowest fuel consumption',
        'Luxury',
        'Fast delivery',
        'Easy maintenance',
        'Highest resale value'
      ],
      priority_labels_ru: {
        'Lowest price': 'Lowest purchase price tag',
        'Best reliability': 'Bulletproof reliability index',
        'Lowest fuel consumption': 'Top fuel economy (hybrid/electric)',
        Luxury: 'Executive interior trim & materials',
        'Fast delivery': 'Rapid freight transit timeline',
        'Easy maintenance': 'Budget replacement parts availability',
        'Highest resale value': 'Maximum residual resale value'
      },
      btn_submit: 'Find My Perfect Match',
      specs_header: 'Desired Mechanical Specs (Optional)',
      country_lbl: 'Import Country Preference',
      brand_lbl: 'Vehicle Brand',
      model_lbl: 'Specific model (if applicable)',
      fuel_lbl: 'Engine / Fuel Type',
      trans_lbl: 'Transmission Type',
      body_lbl: 'Body Configuration',
      min_year_lbl: 'Minimum Production Year',
      max_mileage_lbl: 'Maximum Mileage (km)',
      analyzing: 'Spawning intelligent neural parsing engine...',
      any_val: 'Any / No Preference',
      results_header: 'Top 5 Tailored AI Match Recommendations',
      confidence_badge: 'AI Confidence Match',
      delivery_lbl: 'Ocean & Land Freight to Bishkek',
      customs_lbl: 'KG Custom Duties / Taxes',
      total_price_lbl: 'Total Turn-Key Bishkek Price',
      loan_est: 'Estimated Monthly Payment',
      per_month: '/ mo',
      rel_score: 'Reliability Index',
      avail_score: 'Auction Availability Lot Rate',
      maintenance_lbl: 'Estimated Service Costs',
      resale_lbl: 'Resale Retentivity',
      ai_explanation_lbl: 'Comprehensive AI Decision Summary:',
      advantages_lbl: 'Advantages:',
      disadvantages_lbl: 'KG Market Constraints / Drawbacks:',
      best_for_lbl: 'Target Demographic:',
      chat_header: 'Askar AutoHub AI Chat Consultant',
      chat_placeholder: 'Ask me anything, e.g. "I have a budget of $25,000, show me reliable SUVs..."',
      comparison_title: 'Interactive Comparison Matrix',
      compare_btn: 'Compare Selected',
      clear_selection: 'Clear Matrix Selection',
      price_tag: 'Turn-Key Price',
      fuel_eco: 'Fuel Economy',
      contact_lead: 'Request Import Quote for this Vehicle',
      whatsapp_lead: 'Chat with Live Agent'
    }
  }[lang];

  return (
    <div id="ai-advisor-page-container" className="bg-[#050B14] text-gray-100 min-h-screen py-10 px-4 md:px-8 font-sans">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#0B3D91]/30 border border-[#0B3D91] px-4 py-1.5 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-[#3A86FF] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-[#3A86FF] uppercase">{trans.advisor_badge}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          {trans.advisor_title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-white font-mono">ASKA</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          {lang === 'RU' 
            ? 'Прорывной AI-инструмент подбора унаа с мировых рынков. Ответьте на несколько вопросов, и наш алгоритм подберет лучшие лоты с Copart, Lotte и USS.' 
            : lang === 'KG' 
            ? 'Дүйнөлүк базарлардан унаа тандап алуучу алдыңкы технологиялык программа. Суроолорго жооп бериңиз, алгоритм сизге эң ылайыктуу варианттарды сунуштайт.' 
            : 'Unlocking elite artificial intelligence tool to analyze thousands of international auctions. Fill your profile specs and generate top matched cars under minutes.'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* LEFT COLUMN: CUSTOMER PROFILE FORM */}
        <div className="lg:col-span-7 bg-[#0E1524] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Bot className="w-32 h-32 text-white" />
          </div>

          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gray-800 pb-4">
            <Sliders className="w-5 h-5 text-[#3A86FF]" />
            {trans.profile_header}
          </h2>

          <form onSubmit={handleFindPerfectCar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BUDGET CONTAINER */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex justify-between">
                  <span>{trans.budget_lbl}</span>
                  <span className="text-[#3A86FF] text-sm">{budget.toLocaleString()} {currency}</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono font-bold">$</span>
                    <input 
                      type="number" 
                      value={budget}
                      onChange={(e) => setBudget(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full pl-8 pr-4 py-2.5 bg-[#070D19] border border-gray-800 rounded-lg text-white font-mono focus:border-[#3A86FF] focus:outline-none" 
                    />
                  </div>
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="bg-[#070D19] border border-gray-800 rounded-lg text-white px-3 font-bold focus:border-[#3A86FF] focus:outline-none"
                  >
                    <option value="USD">USD</option>
                    <option value="KGS">KGS</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* PURPOSE CONTAINER */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {trans.purpose_lbl}
                </label>
                <select
                  value={mainPurpose}
                  onChange={(e) => setMainPurpose(e.target.value)}
                  className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-white px-4 py-2.5 focus:border-[#3A86FF] focus:outline-none"
                >
                  <option value="Family">{trans.purpose_opts.Family}</option>
                  <option value="Business">{trans.purpose_opts.Business}</option>
                  <option value="Taxi">{trans.purpose_opts.Taxi}</option>
                  <option value="Off-road">{trans.purpose_opts['Off-road']}</option>
                  <option value="Luxury">{trans.purpose_opts.Luxury}</option>
                  <option value="City">{trans.purpose_opts.City}</option>
                  <option value="Long trips">{trans.purpose_opts['Long trips']}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FAMILY SIZE */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {lang === 'RU' ? 'Пассажирских мест' : lang === 'KG' ? 'Орундардын саны' : 'Passenger Capacity'}
                </label>
                <select
                  value={familySize}
                  onChange={(e) => setFamilySize(parseInt(e.target.value))}
                  className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-white px-4 py-2.5 focus:border-[#3A86FF] focus:outline-none font-mono"
                >
                  <option value={2}>2</option>
                  <option value={4}>4-5</option>
                  <option value={7}>7-8</option>
                </select>
              </div>

              {/* ESTIMATED MONTHLY INCOME (OPTIONAL) */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {lang === 'RU' ? 'Месячный доход (опц)' : lang === 'KG' ? 'Айлык киреше (милдеттүү эмес)' : 'Monthly Income (opt)'}
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. $1,500" 
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-white px-4 py-2.5 focus:border-[#3A86FF] focus:outline-none"
                />
              </div>

              {/* DAILY DISTANCE */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {lang === 'RU' ? 'Дневной пробег (км)' : lang === 'KG' ? 'Күнүмдүк жүргөн жолу (км)' : 'Daily Distance (km)'}
                </label>
                <input 
                  type="number" 
                  value={dailyDistance}
                  onChange={(e) => setDailyDistance(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-white px-4 py-2.5 focus:border-[#3A86FF] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* PRIORITY SELECTOR */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {trans.priority_lbl}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trans.priority_opts.map((opt: string) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPriority(opt)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                      priority === opt 
                        ? 'border-[#3A86FF] bg-[#3A86FF]/10 text-white shadow-lg' 
                        : 'border-gray-800 bg-[#070D19] text-gray-400 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      priority === opt ? 'border-[#3A86FF]' : 'border-gray-600'
                    }`}>
                      {priority === opt && <div className="w-2 h-2 bg-[#3A86FF] rounded-full" />}
                    </div>
                    <span className="text-xs font-medium">
                      {trans.priority_labels_ru[opt] || opt}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* COLLAPSIBLE SECTION FOR DETAILED SPECS */}
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>{trans.specs_header}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{trans.country_lbl}</label>
                  <select 
                    value={importCountry} 
                    onChange={(e) => setImportCountry(e.target.value)}
                    className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-xs text-white px-3 py-2 focus:border-[#3A86FF] focus:outline-none"
                  >
                    <option value="Any">{trans.any_val}</option>
                    <option value="USA">USA / Copart</option>
                    <option value="Korea">Korea / Lotte</option>
                    <option value="Japan">Japan / JDM</option>
                    <option value="China">China / Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">{trans.brand_lbl}</label>
                  <select 
                    value={preferredBrand} 
                    onChange={(e) => setPreferredBrand(e.target.value)}
                    className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-xs text-white px-3 py-2 focus:border-[#3A86FF] focus:outline-none"
                  >
                    <option value="Any">{trans.any_val}</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Hyundai">Hyundai / Kia</option>
                    <option value="BYD">BYD</option>
                    <option value="Honda">Honda</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">{trans.fuel_lbl}</label>
                  <select 
                    value={fuelType} 
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-xs text-white px-3 py-2 focus:border-[#3A86FF] focus:outline-none"
                  >
                    <option value="Any">{trans.any_val}</option>
                    <option value="Hybrid">Hybrid / HEV</option>
                    <option value="Gas">LPG Gas (заводской)</option>
                    <option value="Petrol">Petrol / Бензин</option>
                    <option value="Electric">Electric / EV</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{trans.trans_lbl}</label>
                  <select 
                    value={transmission} 
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-xs text-white px-3 py-2 focus:border-[#3A86FF] focus:outline-none"
                  >
                    <option value="Any">{trans.any_val}</option>
                    <option value="Automatic">Automatic (АКПП)</option>
                    <option value="CVT">CVT / Вариатор</option>
                    <option value="Manual">Manual (МКПП)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">{trans.min_year_lbl}</label>
                  <select 
                    value={minYear} 
                    onChange={(e) => setMinYear(parseInt(e.target.value))}
                    className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-xs text-white px-3 py-2 focus:border-[#3A86FF] focus:outline-none font-mono"
                  >
                    <option value={2018}>2018+</option>
                    <option value={2020}>2020+</option>
                    <option value={2022}>2022+</option>
                    <option value={2024}>2024+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">{trans.max_mileage_lbl}</label>
                  <select 
                    value={maxMileage} 
                    onChange={(e) => setMaxMileage(parseInt(e.target.value))}
                    className="w-full bg-[#070D19] border border-gray-800 rounded-lg text-xs text-white px-3 py-2 focus:border-[#3A86FF] focus:outline-none font-mono"
                  >
                    <option value={50000}>&lt; 50,000 km</option>
                    <option value={100000}>&lt; 100,000 km</option>
                    <option value={150000}>&lt; 150,000 km</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FIND MY PERFECT MATCH BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-[#0B3D91] to-[#3A86FF] hover:from-[#0c4ca8] hover:to-[#4e94ff] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-[#3A86FF]/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{trans.analyzing} ({analysisProgress}%)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{trans.btn_submit}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: CHATBOT CONTAINER */}
        <div className="lg:col-span-5 bg-[#0A0F1A] border border-gray-800 rounded-2xl h-[650px] flex flex-col overflow-hidden shadow-2xl">
          {/* BOT HEADER */}
          <div className="bg-[#0E1626] border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0B3D91]/30 border border-[#0B3D91] rounded-xl">
                <Bot className="w-5 h-5 text-[#3A86FF]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{trans.chat_header}</h3>
                <span className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online Expert System
                </span>
              </div>
            </div>
            <button 
              onClick={handleClearChat}
              title="Clear chat logs"
              className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* CHAT MESSAGES PANEL */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {msg.sender === 'bot' ? (
                  <div className="w-7 h-7 rounded-lg bg-[#0B3D91]/20 border border-[#0B3D91] flex items-center justify-center shrink-0 text-xs font-bold text-[#3A86FF]">
                    AI
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-[#3A86FF]/20 border border-[#3A86FF] flex items-center justify-center shrink-0 text-xs font-bold text-[#3A86FF]">
                    U
                  </div>
                )}
                <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[#3A86FF] text-white rounded-tr-none' 
                    : 'bg-[#0E1524] text-gray-300 border border-gray-800 rounded-tl-none'
                }`}>
                  {msg.text}
                  <span className="block text-[8px] text-gray-500 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isBotTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-7 h-7 rounded-lg bg-[#0B3D91]/20 border border-[#0B3D91] flex items-center justify-center shrink-0 text-xs font-bold text-[#3A86FF]">
                  AI
                </div>
                <div className="p-3.5 bg-[#0E1524] border border-gray-800 rounded-xl rounded-tl-none text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* QUICK SUGGESTIONS CARDS */}
          <div className="p-3 bg-[#0E1626]/40 border-t border-gray-800/60 overflow-x-auto flex gap-2 shrink-0 scrollbar-none">
            <button 
              onClick={() => handleSendChat("I have $25,000.")}
              className="shrink-0 bg-[#070C15] border border-gray-800 hover:border-[#3A86FF]/50 hover:bg-[#3A86FF]/5 text-gray-400 hover:text-white px-3 py-1.5 rounded-full text-[10px] font-medium transition-colors"
            >
              💰 &quot;I have $25,000.&quot;
            </button>
            <button 
              onClick={() => handleSendChat("I need a family SUV.")}
              className="shrink-0 bg-[#070C15] border border-gray-800 hover:border-[#3A86FF]/50 hover:bg-[#3A86FF]/5 text-gray-400 hover:text-white px-3 py-1.5 rounded-full text-[10px] font-medium transition-colors"
            >
              👨‍👩‍👧 &quot;I need a family SUV.&quot;
            </button>
            <button 
              onClick={() => handleSendChat("I drive 100 km every day.")}
              className="shrink-0 bg-[#070C15] border border-gray-800 hover:border-[#3A86FF]/50 hover:bg-[#3A86FF]/5 text-gray-400 hover:text-white px-3 py-1.5 rounded-full text-[10px] font-medium transition-colors"
            >
              ⚡ &quot;I drive 100 km every day.&quot;
            </button>
            <button 
              onClick={() => handleSendChat("I want the most reliable Toyota.")}
              className="shrink-0 bg-[#070C15] border border-gray-800 hover:border-[#3A86FF]/50 hover:bg-[#3A86FF]/5 text-gray-400 hover:text-white px-3 py-1.5 rounded-full text-[10px] font-medium transition-colors"
            >
              🇯🇵 &quot;Most reliable Toyota?&quot;
            </button>
          </div>

          {/* CHAT ENTRY BOX */}
          <div className="p-3 bg-[#0E1524] border-t border-gray-800 flex gap-2">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder={trans.chat_placeholder}
              className="flex-1 bg-[#070D19] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3A86FF]"
            />
            <button 
              onClick={() => handleSendChat()}
              className="p-3.5 bg-gradient-to-r from-[#0B3D91] to-[#3A86FF] text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RECONSTRUCTED RECOMMENDATIONS SECTION */}
      <AnimatePresence>
        {recommendations.length > 0 && (
          <div id="ai-advisor-results" className="max-w-7xl mx-auto border-t border-gray-800 pt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#3A86FF]" />
                  {trans.results_header}
                </h2>
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                  {lang === 'RU' 
                    ? 'Ранжировано на основе вашего профиля, бюджетных ограничений и приоритетов' 
                    : lang === 'KG' 
                    ? 'Сиздин бюджетиңизге жана талаптарыңызга ылайыкталып тандалды' 
                    : 'Sorted based on your personalized profile metrics and constraints'}
                </p>
              </div>

              {/* ACTION COMPARE BUTTON BANNER */}
              {selectedForComparison.length > 0 && (
                <div className="flex items-center gap-3 bg-[#0E1524] border border-gray-800 px-4 py-2 rounded-xl">
                  <span className="text-xs text-gray-400">
                    {lang === 'RU' ? 'Выбрано для сравнения:' : lang === 'KG' ? 'Салыштырууга тандалды:' : 'Selected for comparison:'} <strong>{selectedForComparison.length} / 3</strong>
                  </span>
                  <button
                    onClick={() => {
                      setComparisonModeActive(true);
                      setTimeout(() => {
                        const compEl = document.getElementById('comparison-matrix-section');
                        if (compEl) compEl.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="bg-[#3A86FF] hover:bg-[#3A86FF]/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    {trans.compare_btn}
                  </button>
                  <button 
                    onClick={() => setSelectedForComparison([])}
                    className="text-gray-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* RECOMMENDATIONS GRID */}
            <div className="space-y-12">
              {recommendations.slice(0, 5).map((car, idx) => {
                const isSaved = savedVehicles.includes(car.id);
                const isSelectedToCompare = selectedForComparison.includes(car.id);

                return (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-[#0E1524] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative grid grid-cols-1 lg:grid-cols-12"
                  >
                    {/* CONFIDENCE RATING TOP CORNER */}
                    <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md border border-[#3A86FF] px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#3A86FF]" />
                      <span className="text-[10px] font-bold text-white tracking-wide">
                        {trans.confidence_badge}: {car.confidenceScore}%
                      </span>
                    </div>

                    {/* VEHICLE PICTURE COLUMN */}
                    <div className="lg:col-span-4 relative min-h-[250px] lg:min-h-full">
                      <img 
                        src={car.photo} 
                        alt={`${car.brand} ${car.model}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                      
                      {/* STATS OVERLAY IN PIC */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-xs bg-[#0B3D91] px-2 py-1 rounded font-bold font-mono">
                          {car.auctionSource}
                        </span>
                        <h3 className="text-xl font-extrabold tracking-tight mt-2 text-white">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-xs text-gray-300 font-mono">
                          {car.year} | {lang === 'RU' ? car.country : lang === 'KG' ? car.countryKG : car.countryEN}
                        </p>
                      </div>
                    </div>

                    {/* VEHICLE PRICING & LOGISTICS MODULE */}
                    <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-gray-800/80">
                      <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4 border-b border-gray-800 pb-2">
                        {lang === 'RU' ? 'Финансовая детализация' : lang === 'KG' ? 'Каржылык маалымат' : 'Financial breakdown'}
                      </h4>

                      <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>{lang === 'RU' ? 'Стоимость лота' : lang === 'KG' ? 'Лоттун баасы' : 'Hammer price'}</span>
                          <span className="text-white">${car.auctionPriceUSD.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>{trans.delivery_lbl}</span>
                          <span className="text-white">${car.deliveryUSD.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>{trans.customs_lbl}</span>
                          <span className="text-white">${car.customsUSD.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-gray-800/80 pt-2 flex justify-between font-bold text-sm text-green-400">
                          <span className="font-sans">{trans.total_price_lbl}</span>
                          <span>${car.totalPriceUSD.toLocaleString()}</span>
                        </div>
                        {currency === 'KGS' && (
                          <div className="flex justify-end text-[10px] text-gray-500 font-semibold">
                            ≈ {(car.totalPriceUSD * 87.5).toLocaleString()} KGS
                          </div>
                        )}
                        {currency === 'EUR' && (
                          <div className="flex justify-end text-[10px] text-gray-500 font-semibold">
                            ≈ {(car.totalPriceUSD * 0.92).toLocaleString()} EUR
                          </div>
                        )}
                      </div>

                      <div className="mt-4 bg-[#070D19] border border-gray-800/80 p-3 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{trans.loan_est}</span>
                          <div className="text-white font-bold font-mono text-sm">${car.monthlyPaymentUSD} <span className="text-xs text-gray-400 font-normal">{trans.per_month}</span></div>
                        </div>
                        <button
                          onClick={() => onNavigateToCalculator?.('loan')}
                          className="text-[10px] text-[#3A86FF] hover:underline font-bold"
                        >
                          {lang === 'RU' ? 'Рассчитать' : lang === 'KG' ? 'Эсептөө' : 'Calculate'} &rarr;
                        </button>
                      </div>

                      {/* OTHER SCORES */}
                      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-[#070D19] p-2 rounded border border-gray-800/60">
                          <span className="text-gray-500 block mb-1">{trans.rel_score}</span>
                          <span className="font-bold font-mono text-white text-xs">{car.reliabilityScore} / 100</span>
                        </div>
                        <div className="bg-[#070D19] p-2 rounded border border-gray-800/60">
                          <span className="text-gray-500 block mb-1">{trans.avail_score}</span>
                          <span className="font-bold font-mono text-white text-xs">{car.availabilityScore}%</span>
                        </div>
                      </div>
                    </div>

                    {/* VEHICLE EXPLANATION COLUMN */}
                    <div className="lg:col-span-4 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                          {trans.ai_explanation_lbl}
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed mb-4">
                          {lang === 'RU' ? car.aiExplanation.whyRecommended : lang === 'KG' ? car.aiExplanation.whyRecommendedKG : car.aiExplanation.whyRecommendedEN}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-[10px] font-bold text-green-400 block mb-1 uppercase tracking-wider">{trans.advantages_lbl}</span>
                            <ul className="text-[11px] text-gray-400 space-y-1 pl-3.5 list-disc">
                              {(lang === 'RU' ? car.aiExplanation.advantages : lang === 'KG' ? car.aiExplanation.advantagesKG : car.aiExplanation.advantagesEN).map((adv, aIdx) => (
                                <li key={aIdx}>{adv}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-red-400 block mb-1 uppercase tracking-wider">{trans.disadvantages_lbl}</span>
                            <ul className="text-[11px] text-gray-400 space-y-1 pl-3.5 list-disc">
                              {(lang === 'RU' ? car.aiExplanation.disadvantages : lang === 'KG' ? car.aiExplanation.disadvantagesKG : car.aiExplanation.disadvantagesEN).map((dis, dIdx) => (
                                <li key={dIdx}>{dis}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* QUICK UTILITY CONTROLS BAR */}
                      <div className="border-t border-gray-800/80 pt-4 space-y-2">
                        {/* COMPARISON SELECTION */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleCompare(car.id)}
                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                              isSelectedToCompare 
                                ? 'bg-red-500/10 border border-red-500 text-red-400' 
                                : 'bg-[#070D19] border border-gray-800 text-gray-400 hover:border-[#3A86FF]/50 hover:text-white'
                            }`}
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                            {isSelectedToCompare ? (lang === 'RU' ? 'Убрать' : lang === 'KG' ? 'Алып салуу' : 'Remove') : (lang === 'RU' ? 'Сравнить' : lang === 'KG' ? 'Салыштыруу' : 'Compare')}
                          </button>

                          <button
                            onClick={() => handleSaveCar(car.id)}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all border ${
                              isSaved 
                                ? 'bg-[#3A86FF]/10 border-[#3A86FF] text-[#3A86FF]' 
                                : 'bg-[#070D19] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#3A86FF]' : ''}`} />
                          </button>

                          <button
                            onClick={() => handleShareResult(`${car.brand} ${car.model}`)}
                            className="bg-[#070D19] border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white py-1.5 px-3 rounded-lg"
                            title={lang === 'RU' ? 'Поделиться' : lang === 'KG' ? 'Бөлүшүү' : 'Share'}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* ORDER NOW BUTTONS */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onNavigateToOrderCar?.({ brand: car.brand, model: car.model, year: car.year, budget: car.totalPriceUSD })}
                            className="w-full bg-[#0B3D91] hover:bg-[#0B3D91]/80 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            {lang === 'RU' ? 'Заказать унаа' : lang === 'KG' ? 'Заказ кылуу' : 'Order Now'}
                          </button>

                          <button
                            onClick={() => onNavigateToVinCheck?.('KNDPM81C7N7124098')}
                            className="w-full bg-[#0E1524] border border-gray-800 hover:border-gray-700 text-gray-300 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {lang === 'RU' ? 'Проверить VIN' : lang === 'KG' ? 'VIN текшерүү' : 'VIN Check'}
                          </button>
                        </div>

                        {/* WHATSAPP ACTION BUTTON */}
                        <a
                          href="https://wa.me/996555123456"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-600/10 border border-green-600/30 text-green-400 hover:bg-green-600 hover:text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {trans.whatsapp_lead}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPARISON MODAL / MATRIX VIEW */}
      {comparisonModeActive && comparedCarsObjects.length > 0 && (
        <div id="comparison-matrix-section" className="max-w-7xl mx-auto border-t border-gray-800 pt-16 mt-16">
          <div className="bg-[#0E1524] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <button 
              onClick={() => setComparisonModeActive(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-[#3A86FF]" />
              {trans.comparison_title}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-gray-300 border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 pr-4 font-sans text-xs text-gray-500 uppercase font-bold tracking-wider">Parameters</th>
                    {comparedCarsObjects.map(car => (
                      <th key={car.id} className="py-4 px-4 font-sans text-sm font-bold text-white min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <img src={car.photo} alt={car.model} className="w-10 h-10 rounded object-cover" />
                          <div>
                            <div className="text-white font-extrabold">{car.brand}</div>
                            <div className="text-xs text-gray-400">{car.model} ({car.year})</div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="py-4 pr-4 font-sans font-bold text-gray-400">{trans.price_tag}</td>
                    {comparedCarsObjects.map(car => (
                      <td key={car.id} className="py-4 px-4 font-bold text-green-400 text-sm">
                        ${car.totalPriceUSD.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-sans font-bold text-gray-400">{trans.delivery_lbl}</td>
                    {comparedCarsObjects.map(car => (
                      <td key={car.id} className="py-4 px-4">
                        ${car.deliveryUSD.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-sans font-bold text-gray-400">{trans.customs_lbl}</td>
                    {comparedCarsObjects.map(car => (
                      <td key={car.id} className="py-4 px-4">
                        ${car.customsUSD.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-sans font-bold text-gray-400">{trans.fuel_eco}</td>
                    {comparedCarsObjects.map(car => (
                      <td key={car.id} className="py-4 px-4">
                        {lang === 'RU' ? car.fuelEconomy : lang === 'KG' ? car.fuelEconomyKG : car.fuelEconomyEN}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-sans font-bold text-gray-400">{trans.maintenance_lbl}</td>
                    {comparedCarsObjects.map(car => (
                      <td key={car.id} className="py-4 px-4">
                        {lang === 'RU' ? car.maintenanceCost : lang === 'KG' ? car.maintenanceCostKG : car.maintenanceCostEN}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-sans font-bold text-gray-400">{trans.rel_score}</td>
                    {comparedCarsObjects.map(car => (
                      <td key={car.id} className="py-4 px-4 font-bold">
                        <span className="text-[#3A86FF]">{car.reliabilityScore} / 100</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-sans font-bold text-gray-400">{trans.resale_lbl}</td>
                    {comparedCarsObjects.map(car => (
                      <td key={car.id} className="py-4 px-4">
                        {lang === 'RU' ? car.resaleValueKG : lang === 'KG' ? car.resaleValueKG : car.resaleValueEN}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INFO GRAPHICS BANNER */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="bg-[#0E1524] border border-gray-800 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-[#0B3D91]/20 border border-[#0B3D91] rounded-xl text-[#3A86FF]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">Global Auction Scraper</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              We compile historic bidding information and catalog photos from Lotte, USS, and Copart registries.
            </p>
          </div>
        </div>

        <div className="bg-[#0E1524] border border-gray-800 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">Resale Projection</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our models predict holding costs and secondary market depreciation indexes in Bishkek.
            </p>
          </div>
        </div>

        <div className="bg-[#0E1524] border border-gray-800 p-6 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-[#3A86FF]/10 border border-[#3A86FF]/30 rounded-xl text-[#3A86FF]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">Smart Dialog Broker</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our conversation model gives real-time financial consultation regarding customs clearing taxes.
            </p>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION CONTAINER */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0E1524] border border-[#3A86FF] text-white text-xs font-semibold py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
