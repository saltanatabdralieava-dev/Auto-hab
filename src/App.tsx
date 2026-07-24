import React, { useState, useMemo, useEffect } from 'react';
import { 
  Car as CarIcon, 
  Search, 
  MapPin, 
  Calendar, 
  Gauge, 
  Activity, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Globe, 
  User, 
  X, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Calculator, 
  DollarSign, 
  Percent, 
  Clock, 
  MessageCircle, 
  Plus, 
  Menu, 
  ArrowUpRight,
  ArrowRight,
  Shield,
  ThumbsUp,
  SlidersHorizontal,
  Info,
  Check,
  Heart,
  Share2,
  FileDown,
  Layers,
  Trash2,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Language, FilterState } from './types';
import { CARS_DATA, BRANDS, TRANSLATIONS } from './data';
import DealerDashboard from './components/DealerDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import { CrmDashboardPage } from './components/CrmDashboardPage';
import { MarketingAiPage } from './components/MarketingAiPage';
import { CeoDashboardPage } from './components/CeoDashboardPage';
import { VehicleTimelinePage } from './components/VehicleTimelinePage';
import { AISalesManagerPage } from './components/AISalesManagerPage';
import { ServicesPage } from './components/ServicesPage';
import { ForDealersPage } from './components/ForDealersPage';
import VehicleDetailsPage from './components/VehicleDetailsPage';
import CalculatorPage from './components/CalculatorPage';
import { AuctionsPage } from './components/AuctionsPage';
import { OrderCarPage } from './components/OrderCarPage';
import { VinCheckPage } from './components/VinCheckPage';
import { AiAdvisorPage } from './components/AiAdvisorPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { Logo, LogoIcon } from './components/Logo';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { PremiumFooter } from './components/PremiumFooter';

export interface TeamMember {
  id: number;
  name: { RU: string; KG: string; EN: string };
  position: { RU: string; KG: string; EN: string };
  experience: { RU: string; KG: string; EN: string };
  portfolio: { RU: string[]; KG: string[]; EN: string[] };
  bio: { RU: string; KG: string; EN: string };
  skills: { RU: string[]; KG: string[]; EN: string[] };
  image: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  email: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: { RU: "Аскар", KG: "Аскар", EN: "Askar" },
    position: { 
      RU: "Генеральный директор (CEO & Founder)", 
      KG: "Башкы директор (CEO & Founder)", 
      EN: "Chief Executive Officer (CEO & Founder)" 
    },
    experience: { RU: "15+ лет", KG: "15+ жыл", EN: "15+ years" },
    portfolio: {
      RU: [
        "Основатель Askar AutoHub Kyrgyzstan",
        "Эксперт автомобильного рынка Кыргызстана",
        "Руководитель компании",
        "Стратегическое развитие",
        "Контроль качества",
        "Партнерство с автосалонами",
        "Более 500 довольных клиентов"
      ],
      KG: [
        "Askar AutoHub Kyrgyzstan негиздөөчүсү",
        "Кыргызстандын автоунаа рыногунун эксперти",
        "Компаниянын жетекчиси",
        "Стратегиялык өнүгүү",
        "Сапатты көзөмөлдөө",
        "Автосалондор менен өнөктөштүк",
        "500дөн ашык канааттанган кардарлар"
      ],
      EN: [
        "Founder of Askar AutoHub Kyrgyzstan",
        "Kyrgyzstan automotive market expert",
        "Company lead",
        "Strategic development",
        "Quality control",
        "Dealership partnerships",
        "Over 500 satisfied clients"
      ]
    },
    bio: {
      RU: "Аскар руководит стратегическим развитием и контролирует качество сервиса Askar AutoHub, создавая безопасный авторынок нового поколения в Кыргызстане.",
      KG: "Аскар стратегиялык өнүгүүнү жетектейт жана унаа рыногунда коопсуз шарттарды түзүү менен кызмат көрсөтүүнүн сапатын көзөмөлдөйт.",
      EN: "Askar leads strategic development and oversees service quality at Askar AutoHub, creating a new generation of secure automotive ecosystem in Kyrgyzstan."
    },
    skills: {
      RU: ["Бизнес-стратегия", "Управление", "Авто-экспертиза", "Переговоры", "Инвестиции"],
      KG: ["Бизнес стратегия", "Башкаруу", "Авто-экспертиза", "Сүйлөшүүлөр", "Инвестициялар"],
      EN: ["Business Strategy", "Leadership", "Car Expertise", "Negotiations", "Investments"]
    },
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555888888",
    whatsapp: "996555888888",
    linkedin: "https://linkedin.com/in/askar-autohub",
    email: "askar@autohub.kg"
  },
  {
    id: 2,
    name: { RU: "Нурлан", KG: "Нурлан", EN: "Nurlan" },
    position: { 
      RU: "Главный автомеханик", 
      KG: "Башкы автомеханик", 
      EN: "Chief Auto Mechanic" 
    },
    experience: { RU: "18 лет", KG: "18 жыл", EN: "18 years" },
    portfolio: {
      RU: [
        "Диагностика двигателя",
        "Капитальный ремонт",
        "Проверка технического состояния автомобиля",
        "Предпродажная инспекция"
      ],
      KG: [
        "Кыймылдаткычты диагностикалоо",
        "Капиталдык оңдоо",
        "Унаанын техникалык абалын текшерүү",
        "Сатуу алдындагы инспекция"
      ],
      EN: [
        "Engine diagnostics",
        "Overhaul repair",
        "Vehicle condition check",
        "Pre-sale inspection"
      ]
    },
    bio: {
      RU: "Нурлан отвечает за техническую экспертизу автомобилей, гарантируя, что каждая машина на платформе проходит строжайший механический аудит.",
      KG: "Нурлан унаалардын терең техникалык экспертизасы үчүн жооптуу, ар бир тетиктин оңчулугуна кепилдик берет.",
      EN: "Nurlan is responsible for in-depth technical vehicle inspection, ensuring the reliability of every system."
    },
    skills: {
      RU: ["Двигатели", "Коробки передач", "Капремонт", "Ходовая часть", "Инспекция"],
      KG: ["Кыймылдаткычтар", "Берүү кутулары", "Капремонт", "Текшерүү", "Диагностика"],
      EN: ["Engines", "Gearboxes", "Overhauls", "Inspections", "Diagnostics"]
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555777001",
    whatsapp: "996555777001",
    linkedin: "https://linkedin.com/in/nurlan-autohub",
    email: "nurlan@autohub.kg"
  },
  {
    id: 3,
    name: { RU: "Азамат", KG: "Азамат", EN: "Azamat" },
    position: { 
      RU: "Компьютерный диагност", 
      KG: "Компьютердик диагност", 
      EN: "Computer Diagnostics Specialist" 
    },
    experience: { RU: "12 лет", KG: "12 жыл", EN: "12 years" },
    portfolio: {
      RU: [
        "Компьютерная диагностика всех марок",
        "Сканирование ошибок",
        "Электронные системы автомобиля",
        "Программирование блоков управления"
      ],
      KG: [
        "Бардык маркадагы компьютердик диагностика",
        "Каталарды сканерлөө",
        "Унаанын электрондук системалары",
        "Башкаруу блокторун программалоо"
      ],
      EN: [
        "All-make computer diagnostics",
        "Error scanning & analysis",
        "Vehicle electronic systems",
        "ECU programming"
      ]
    },
    bio: {
      RU: "Азамат использует передовое дилерское оборудование для выявления скрытых неисправностей в электронных модулях автомобилей.",
      KG: "Азамат дилердик жабдуулар аркылуу унаанын электрондук модулдарын сканерлеп, жашыруун программалык каталарды аныктайт.",
      EN: "Azamat scans automotive electronic control units using specialized dealer equipment to uncover hidden faults."
    },
    skills: {
      RU: ["OBD2 сканеры", "Электроника", "Кодирование", "Прошивка", "EV/Гибриды"],
      KG: ["OBD2 сканерлери", "Электроника", "Коддоо", "Прошивка", "EV/Гибриддер"],
      EN: ["OBD2 Scanners", "Electronics", "Coding", "Flashing", "EV/Hybrids"]
    },
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555777002",
    whatsapp: "996555777002",
    linkedin: "https://linkedin.com/in/azamat-autohub",
    email: "azamat@autohub.kg"
  },
  {
    id: 4,
    name: { RU: "Бекзат", KG: "Бекзат", EN: "Bekzat" },
    position: { 
      RU: "Автоэлектрик", 
      KG: "Автоэлектрик", 
      EN: "Auto Electrician" 
    },
    experience: { RU: "14 лет", KG: "14 жыл", EN: "14 years" },
    portfolio: {
      RU: [
        "Электрооборудование",
        "Стартеры и генераторы",
        "Проводка",
        "Освещение",
        "Установка дополнительного оборудования"
      ],
      KG: [
        "Электр жабдуулары",
        "Стартерлер жана генераторлор",
        "Зымдар",
        "Жарыктандыруу",
        "Кошумча жабдууларды орнотуу"
      ],
      EN: [
        "Electrical hardware",
        "Starters & generators",
        "Wiring harnesses",
        "Lighting setups",
        "Add-on hardware installation"
      ]
    },
    bio: {
      RU: "Бекзат – эксперт по устранению любых проблем с проводкой, установке охранных систем премиум-класса и мультимедиа.",
      KG: "Бекзат татаал чынжырлардын үзүлүшүн таап оңдойт, генераторлорду калыбына келтирет жана коопсуздук тутумдарын орнотот.",
      EN: "Bekzat identifies complex electrical failures, restores generators, and integrates high-end security systems."
    },
    skills: {
      RU: ["Проводка", "Генераторы", "Сигнализации", "LED оптика", "Мультимедиа"],
      KG: ["Зымдар", "Генераторлор", "Сигнализация", "LED оптика", "Мультимедиа"],
      EN: ["Wiring", "Generators", "Alarms", "LED Optics", "Multimedia"]
    },
    image: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555777003",
    whatsapp: "996555777003",
    linkedin: "https://linkedin.com/in/bekzat-autohub",
    email: "bekzat@autohub.kg"
  },
  {
    id: 5,
    name: { RU: "Айбек", KG: "Айбек", EN: "Aybek" },
    position: { 
      RU: "Эксперт по подбору автомобилей", 
      KG: "Унаа тандоо боюнча эксперт", 
      EN: "Car Selection Expert" 
    },
    experience: { RU: "10 лет", KG: "10 жыл", EN: "10 years" },
    portfolio: {
      RU: [
        "Подбор авто под бюджет клиента",
        "Проверка истории автомобиля",
        "Переговоры с продавцами",
        "Сопровождение сделки"
      ],
      KG: [
        "Кардардын бюджетине ылайык унаа тандоо",
        "Унаанын тарыхын текшерүү",
        "Сатуучулар менен сүйлөшүүлөр",
        "Бүтүмдү коштоо"
      ],
      EN: [
        "Budget-based car matching",
        "Vehicle history screening",
        "Seller negotiations",
        "Deal accompaniment"
      ]
    },
    bio: {
      RU: "Айбек подбирает лучшие варианты на рынке, тщательно тестирует кузов и торгуется до максимальной выгоды.",
      KG: "Айбек рыноктогу эң мыкты варианттарды тандап, кузовду кылдат текшерет жана максималдуу пайдага соодалашат.",
      EN: "Aybek screens the market for prime matches, runs detailed bodywork tests, and negotiates the optimal purchase price."
    },
    skills: {
      RU: ["Толщиномер", "Торг", "Юридическая проверка", "Оценка кузова", "Тест-драйв"],
      KG: ["Толщиномер", "Соодалашуу", "Юридикалык текшерүү", "Кузовду баалоо", "Тест-драйв"],
      EN: ["Paint gauge", "Negotiation", "Legal Screenings", "Body Evaluation", "Test Drives"]
    },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555777004",
    whatsapp: "996555777004",
    linkedin: "https://linkedin.com/in/aybek-autohub",
    email: "aybek@autohub.kg"
  },
  {
    id: 6,
    name: { RU: "Айжан", KG: "Айжан", EN: "Aizhan" },
    position: { 
      RU: "Главный бухгалтер", 
      KG: "Башкы бухгалтер", 
      EN: "Chief Accountant" 
    },
    experience: { RU: "13 лет", KG: "13 жыл", EN: "13 years" },
    portfolio: {
      RU: [
        "Финансовый учет",
        "Документооборот",
        "Налоги",
        "Контроль платежей"
      ],
      KG: [
        "Финансылык эсеп",
        "Иш кагаздарын жүргүзүү",
        "Салыктар",
        "Төлөмдөрдү көзөмөлдөө"
      ],
      EN: [
        "Financial accounting",
        "Document workflows",
        "Tax compliance",
        "Payment oversight"
      ]
    },
    bio: {
      RU: "Айжан обеспечивает полную финансовую прозрачность, юридическое оформление сделок и точный учет всех операций.",
      KG: "Айжан холдингдин финансысын башкарат, сатып алуу-сатуу келишимдерин тариздейт жана салыктарга жооп берет.",
      EN: "Aizhan manages corporate finances, coordinates vehicle bills of sale, and maintains absolute tax compliance."
    },
    skills: {
      RU: ["1С:Бухгалтерия", "Налоговый учет", "Финансовый аудит", "Договоры", "Бюджетирование"],
      KG: ["1С:Бухгалтерия", "Салыктар", "Финансылык аудит", "Келишимдер", "Аналитика"],
      EN: ["1C Accounting", "Taxes", "Financial Auditing", "Contracts", "Analytics"]
    },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555777005",
    whatsapp: "996555777005",
    linkedin: "https://linkedin.com/in/aizhan-autohub",
    email: "aizhan@autohub.kg"
  },
  {
    id: 7,
    name: { RU: "Данияр", KG: "Данияр", EN: "Daniyar" },
    position: { 
      RU: "Менеджер по работе с клиентами", 
      KG: "Кардарлар менен иштөө менеджери", 
      EN: "Customer Relations Manager" 
    },
    experience: { RU: "8 лет", KG: "8 жыл", EN: "8 years" },
    portfolio: {
      RU: [
        "Поддержка клиентов 24/7",
        "Работа с объявлениями",
        "Контроль качества сервиса",
        "Решение спорных вопросов"
      ],
      KG: [
        "Кардарларды колдоо 24/7",
        "Жарнамалар менен иштөө",
        "Кызматтын сапатын көзөмөлдөө",
        "Талаш маселелерди чечүү"
      ],
      EN: [
        "24/7 Client support",
        "Listing management",
        "Service quality audit",
        "Dispute resolution"
      ]
    },
    bio: {
      RU: "Данияр курирует службу поддержки, оперативно одобряет объявления и обеспечивает комфорт клиентов.",
      KG: "Данияр колдоо кызматын жетектейт, жарнамаларды тез арада модерациялайт жана кардарлардын ыңгайлуулугун камсыздайт.",
      EN: "Daniyar coordinates our support hotline, moderates active listings, and ensures superb client satisfaction."
    },
    skills: {
      RU: ["CRM", "Клиентский сервис", "Конфликтология", "Модерация", "Поддержка 24/7"],
      KG: ["CRM", "Кардарларды тейлөө", "Модерация", "Конфликтология", "Байланыш"],
      EN: ["CRM Suites", "Customer Care", "Moderation", "Conflict Resolution", "Relations"]
    },
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555777006",
    whatsapp: "996555777006",
    linkedin: "https://linkedin.com/in/daniyar-autohub",
    email: "daniyar@autohub.kg"
  },
  {
    id: 8,
    name: { RU: "Тимур", KG: "Тимур", EN: "Timur" },
    position: { 
      RU: "Специалист по продажам и маркетингу", 
      KG: "Сатуу жана маркетинг боюнча адис", 
      EN: "Sales & Marketing Specialist" 
    },
    experience: { RU: "9 лет", KG: "9 жыл", EN: "9 years" },
    portfolio: {
      RU: [
        "Продвижение автомобилей",
        "Digital Marketing",
        "Работа с автосалонами",
        "Реклама и аналитика"
      ],
      KG: [
        "Унааларды жылдыруу",
        "Санариптик маркетинг",
        "Автосалондор менен иштөө",
        "Жарнама жана аналитика"
      ],
      EN: [
        "Vehicle promotion",
        "Digital Marketing",
        "B2B Dealership relations",
        "Ad optimization & analytics"
      ]
    },
    bio: {
      RU: "Тимур настраивает рекламу и привлекает тысячи горячих покупателей на новые объявления на Askar AutoHub ежедневно.",
      KG: "Тимур жарнаманы жөндөп, күн сайын Askar AutoHub-тагы жаңы жарнамаларга миңдеген кардарларды тартат.",
      EN: "Timur runs targeted marketing campaigns to drive thousands of ready buyers to listings on Askar AutoHub daily."
    },
    skills: {
      RU: ["SMM", "Targeted Ads", "Google Ads", "Аналитика", "PR & Brand"],
      KG: ["SMM", "Targeted Ads", "Google Ads", "Аналитика", "PR & Brand"],
      EN: ["SMM", "Targeted Ads", "Google Ads", "Analytics", "PR & Brand"]
    },
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    phone: "+996555777007",
    whatsapp: "996555777007",
    linkedin: "https://linkedin.com/in/timur-autohub",
    email: "timur@autohub.kg"
  }
];

export default function App() {
  // Application initial loading screen state
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // View state: 'catalog' | 'dashboard' | 'admin' | 'calculator' | 'auctions' | 'order-car' | 'vin-check' | 'ai-advisor' | 'order-tracking' | 'crm' | 'marketing_ai' | 'ceo_dashboard' | 'dealers' | 'about-us' | 'contact-us'
  const [currentView, setCurrentView] = useState<'catalog' | 'dashboard' | 'admin' | 'calculator' | 'auctions' | 'order-car' | 'vin-check' | 'ai-advisor' | 'order-tracking' | 'crm' | 'marketing_ai' | 'ceo_dashboard' | 'dealers' | 'about-us' | 'contact-us'>('catalog');

  // Application Language state
  const [lang, setLang] = useState<Language>('RU');
  
  // Cars data state (so user can dynamically append their own custom listed cars)
  const [cars, setCars] = useState<Car[]>(CARS_DATA);

  // Search and Filter states
  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    maxMileage: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    color: '',
    drive: '',
    condition: 'all'
  });

  // Sorting state
  const [sortBy, setSortBy] = useState<string>('popularity');

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);

  // Compare state
  const [compareList, setCompareList] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Comparison modal open state
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
  // Text search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Selected car for modal view
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Sign In modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Add Listing modal state
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [newCarBrand, setNewCarBrand] = useState('');
  const [newCarModel, setNewCarModel] = useState('');
  const [newCarYear, setNewCarYear] = useState('2024');
  const [newCarPrice, setNewCarPrice] = useState('');
  const [newCarMileage, setNewCarMileage] = useState('');
  const [newCarEngine, setNewCarEngine] = useState('');
  const [newCarCity, setNewCarCity] = useState('Bishkek');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Loan calculator states
  const [calcDownPayment, setCalcDownPayment] = useState<number>(30000);
  const [calcTerm, setCalcTerm] = useState<number>(36); // months
  const [calcInterestRate, setCalcInterestRate] = useState<number>(12); // annual %

  // Sticky header class state
  const [scrolled, setScrolled] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show customized toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (currentView !== 'catalog') {
      setCurrentView('catalog');
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const t = TRANSLATIONS[lang];

  // Derive unique models list based on selected brand in filter
  const modelsForSelectedBrand = useMemo(() => {
    if (!filters.brand) return [];
    const filtered = cars.filter(c => c.brand.toLowerCase() === filters.brand.toLowerCase());
    const models = filtered.map(c => c.model);
    return Array.from(new Set(models));
  }, [filters.brand, cars]);

  // Reset models filter if brand changes
  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brand,
      model: '' // reset model
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      brand: '',
      model: '',
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      maxMileage: '',
      fuelType: '',
      transmission: '',
      bodyType: '',
      color: '',
      drive: '',
      condition: 'all'
    });
    setSearchQuery('');
    setSortBy('popularity');
    triggerToast(lang === 'RU' ? 'Фильтры сброшены' : lang === 'KG' ? 'Чыпкалар баштапкы абалга келтирилди' : 'Filters reset');
  };

  // Filter and Sort cars based on extensive filters + text query + sortBy state
  const filteredAndSortedCars = useMemo(() => {
    const result = cars.filter(car => {
      // Brand filter
      if (filters.brand && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
      // Model filter
      if (filters.model && car.model.toLowerCase() !== filters.model.toLowerCase()) {
        return false;
      }
      // Min price filter
      if (filters.minPrice && car.price < parseFloat(filters.minPrice)) {
        return false;
      }
      // Max price filter
      if (filters.maxPrice && car.price > parseFloat(filters.maxPrice)) {
        return false;
      }
      // Min year filter
      if (filters.minYear && car.year < parseInt(filters.minYear)) {
        return false;
      }
      // Max year filter
      if (filters.maxYear && car.year > parseInt(filters.maxYear)) {
        return false;
      }
      // Max mileage filter
      if (filters.maxMileage && car.mileage > parseFloat(filters.maxMileage)) {
        return false;
      }
      // Fuel Type filter
      if (filters.fuelType) {
        const selFuel = filters.fuelType.toLowerCase();
        const fuelRU = (car.fuelType?.RU || '').toLowerCase();
        const fuelKG = (car.fuelType?.KG || '').toLowerCase();
        const fuelEN = (car.fuelType?.EN || '').toLowerCase();
        if (!fuelRU.includes(selFuel) && !fuelKG.includes(selFuel) && !fuelEN.includes(selFuel)) {
          return false;
        }
      }
      // Transmission filter
      if (filters.transmission) {
        const selTrans = filters.transmission.toLowerCase();
        const transRU = (car.transmission?.RU || '').toLowerCase();
        const transKG = (car.transmission?.KG || '').toLowerCase();
        const transEN = (car.transmission?.EN || '').toLowerCase();
        if (!transRU.includes(selTrans) && !transKG.includes(selTrans) && !transEN.includes(selTrans)) {
          return false;
        }
      }
      // Body Type filter
      if (filters.bodyType) {
        const selBody = filters.bodyType.toLowerCase();
        const bodyRU = (car.bodyType?.RU || '').toLowerCase();
        const bodyKG = (car.bodyType?.KG || '').toLowerCase();
        const bodyEN = (car.bodyType?.EN || '').toLowerCase();
        if (!bodyRU.includes(selBody) && !bodyKG.includes(selBody) && !bodyEN.includes(selBody)) {
          return false;
        }
      }
      // Color filter
      if (filters.color) {
        const selColor = filters.color.toLowerCase();
        const colorRU = (car.color?.RU || '').toLowerCase();
        const colorKG = (car.color?.KG || '').toLowerCase();
        const colorEN = (car.color?.EN || '').toLowerCase();
        if (!colorRU.includes(selColor) && !colorKG.includes(selColor) && !colorEN.includes(selColor)) {
          return false;
        }
      }
      // Drive filter
      if (filters.drive) {
        const selDrive = filters.drive.toLowerCase();
        const driveRU = (car.drive?.RU || '').toLowerCase();
        const driveKG = (car.drive?.KG || '').toLowerCase();
        const driveEN = (car.drive?.EN || '').toLowerCase();
        if (!driveRU.includes(selDrive) && !driveKG.includes(selDrive) && !driveEN.includes(selDrive)) {
          return false;
        }
      }
      // Condition filter
      if (filters.condition !== 'all') {
        const expectNew = filters.condition === 'new';
        if (!!car.isNew !== expectNew) {
          return false;
        }
      }
      // Global text query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesModel = car.model.toLowerCase().includes(query);
        const matchesDealer = car.dealer.toLowerCase().includes(query);
        const matchesEngine = car.engine.toLowerCase().includes(query);
        const matchesCity = car.city[lang].toLowerCase().includes(query);
        if (!matchesBrand && !matchesModel && !matchesDealer && !matchesEngine && !matchesCity) {
          return false;
        }
      }
      return true;
    });

    // Apply sorting
    const sorted = [...result];
    if (sortBy === 'price_asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'year_desc') {
      sorted.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'mileage_asc') {
      sorted.sort((a, b) => a.mileage - b.mileage);
    } else if (sortBy === 'popularity') {
      sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    }
    return sorted;
  }, [filters, searchQuery, sortBy, cars, lang]);

  const filteredCars = filteredAndSortedCars;

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Reset to first page whenever filter parameters alter
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, sortBy]);

  // Handle Quick Brand Click from Popular Brands
  const handleBrandQuickClick = (brandName: string) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand === brandName ? '' : brandName, // toggle
      model: ''
    }));
    // Scroll smoothly to New Arrivals / Catalog
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle Find Car Button from Hero Section
  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    triggerToast(lang === 'RU' ? 'Фильтры применены' : lang === 'KG' ? 'Чыпкалар колдонулду' : 'Filters applied');
  };

  // Monthly Loan Payment Calculation
  const monthlyPayment = useMemo(() => {
    if (!selectedCar) return 0;
    const principal = Math.max(0, selectedCar.price - calcDownPayment);
    if (principal <= 0) return 0;
    const monthlyRate = (calcInterestRate / 100) / 12;
    if (monthlyRate === 0) return principal / calcTerm;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, calcTerm)) / (Math.pow(1 + monthlyRate, calcTerm) - 1);
    return Math.round(payment);
  }, [selectedCar, calcDownPayment, calcTerm, calcInterestRate]);

  // Initialize Calculator Downpayment when car selected
  useEffect(() => {
    if (selectedCar) {
      setCalcDownPayment(Math.round(selectedCar.price * 0.3)); // 30% default downpayment
    }
  }, [selectedCar]);

  // Handle Listing Creation
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarBrand || !newCarModel || !newCarPrice) {
      alert(lang === 'RU' ? 'Заполните обязательные поля' : 'Милдеттүү талааларды толтуруңуз');
      return;
    }

    const priceNum = parseFloat(newCarPrice) || 20000;
    const yearNum = parseInt(newCarYear) || 2022;
    const mileageNum = parseFloat(newCarMileage) || 10000;

    const customCar: Car = {
      id: String(cars.length + 1),
      brand: newCarBrand,
      model: newCarModel,
      generation: 'LCI',
      year: yearNum,
      price: priceNum,
      mileage: mileageNum,
      engine: newCarEngine || '2.0L Hybrid',
      transmission: {
        RU: 'Автомат',
        KG: 'Автомат',
        EN: 'Automatic'
      },
      drive: {
        RU: 'Полный (4WD)',
        KG: 'Толук (4WD)',
        EN: 'All-Wheel Drive (4WD)'
      },
      color: {
        RU: 'Черный',
        KG: 'Кара',
        EN: 'Black'
      },
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200', // standard premium fallback car
      dealer: lang === 'RU' ? 'Частное лицо' : lang === 'KG' ? 'Жеке жак' : 'Private Seller',
      city: {
        RU: newCarCity === 'Bishkek' ? 'Бишкек' : newCarCity === 'Osh' ? 'Ош' : 'Джалал-Абад',
        KG: newCarCity === 'Bishkek' ? 'Бишкек' : newCarCity === 'Osh' ? 'Ош' : 'Жалал-Абад',
        EN: newCarCity
      },
      isNew: true,
      whatsappNumber: '+996555112233',
      phoneNumber: '+996555112233',
      description: {
        RU: 'Объявление добавлено пользователем Askar AutoHub. Отличное состояние, все опции в рабочем состоянии.',
        KG: 'Жарнама Askar AutoHub колдонуучусу тарабынан кошулду. Жакшы абалда, бардык функциялары иштейт.',
        EN: 'Listing added by Askar AutoHub user. Great condition, all features fully operational.'
      },
      fuelType: {
        RU: 'Бензин',
        KG: 'Бензин',
        EN: 'Petrol'
      },
      bodyType: {
        RU: 'Седан',
        KG: 'Седан',
        EN: 'Sedan'
      },
      status: 'available',
      popularity: 50,
      createdAt: new Date().toISOString()
    };

    setCars(prev => [customCar, ...prev]);
    setIsAddListingOpen(false);
    
    // Clear form
    setNewCarBrand('');
    setNewCarModel('');
    setNewCarPrice('');
    setNewCarMileage('');
    setNewCarEngine('');

    triggerToast(t.success_toast);

    // Scroll to catalog section to show new car
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  // Contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    setContactSubmitted(true);
    triggerToast(lang === 'RU' ? 'Ваш запрос отправлен!' : 'Сиздин билдирүүңүз жөнөтүлдү!');
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactPhone('');
    }, 3000);
  };

  // Handle simulated login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSuccess(true);
    triggerToast(lang === 'RU' ? 'Успешный вход в систему!' : 'Системага ийгиликтүү кирдиңиз!');
    setTimeout(() => {
      setIsLoginModalOpen(false);
      setLoginSuccess(false);
    }, 1500);
  };

  if (appLoading) {
    return (
      <div className="fixed inset-0 bg-[#071E4A] z-[9999] flex flex-col items-center justify-center text-white select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8 max-w-sm px-6"
        >
          {/* Logo large icon in center with pulse */}
          <div className="relative flex justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.06, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5,
                ease: "easeInOut"
              }}
            >
              <LogoIcon size={120} />
            </motion.div>
            
            {/* Spinning orbital glow */}
            <div className="absolute inset-0 -m-6 border border-dashed border-blue-400/20 rounded-[36px] animate-spin" style={{ animationDuration: '20s' }} />
          </div>

          <div className="space-y-2">
            <h1 className="font-sans text-3xl font-black tracking-wider uppercase text-white">
              АСКАР АВТОХАБ
            </h1>
            <p className="text-[10px] tracking-[0.3em] uppercase text-blue-400 font-bold">
              КЫРГЫЗСТАН • КЖ
            </p>
          </div>

          {/* Premium Loading Progress indicator */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto relative">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
          
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            {lang === 'RU' ? 'Загрузка премиум автопортала...' : lang === 'KG' ? 'Премиум автопортал жүктөлүүдө...' : 'Loading premium auto portal...'}
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <DealerDashboard 
        lang={lang}
        cars={cars}
        setCars={setCars}
        onBackToCatalog={() => setCurrentView('catalog')}
      />
    );
  }

  if (currentView === 'admin') {
    return (
      <SuperAdminDashboard 
        lang={lang}
        setLang={setLang}
        cars={cars}
        setCars={setCars}
        onBackToCatalog={() => setCurrentView('catalog')}
      />
    );
  }

  if (currentView === 'crm') {
    return (
      <CrmDashboardPage 
        lang={lang}
        onBackToCatalog={() => setCurrentView('catalog')}
      />
    );
  }

  if (currentView === 'marketing_ai') {
    return (
      <MarketingAiPage 
        lang={lang}
        onBackToCatalog={() => setCurrentView('catalog')}
      />
    );
  }

  if (currentView === 'ceo_dashboard') {
    return (
      <CeoDashboardPage 
        lang={lang}
        onBackToCatalog={() => setCurrentView('catalog')}
      />
    );
  }

  if (currentView === 'vehicle_timeline') {
    return (
      <VehicleTimelinePage 
        lang={lang}
        onBackToCatalog={() => setCurrentView('catalog')}
      />
    );
  }

  if (currentView === 'sales_manager') {
    return (
      <AISalesManagerPage 
        lang={lang}
        onBackToCatalog={() => setCurrentView('catalog')}
      />
    );
  }

  if (currentView === 'services') {
    return (
      <ServicesPage 
        lang={lang}
        onBackToCatalog={() => setCurrentView('catalog')}
        onNavigateToView={(view: string) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  if (currentView === 'dealers') {
    return (
      <ForDealersPage 
        lang={lang}
        onBackToCatalog={() => {
          setCurrentView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToView={(view: any) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  if (currentView === 'about-us') {
    return (
      <AboutUsPage 
        lang={lang}
        onBackToCatalog={() => {
          setCurrentView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToView={(view: any) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        teamMembers={TEAM_MEMBERS}
      />
    );
  }

  if (currentView === 'contact-us') {
    return (
      <ContactUsPage 
        lang={lang}
        onBackToCatalog={() => {
          setCurrentView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToView={(view: any) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased selection:bg-[#0B3D91] selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-[#0B3D91] text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 border border-blue-400/20 backdrop-blur-md"
            id="toast-notification"
          >
            <Check className="w-5 h-5 text-green-400 bg-white/10 rounded-full p-0.5" />
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <header 
        id="header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-4 border-b border-gray-100' 
            : 'bg-black/30 backdrop-blur-sm py-5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center space-x-12 lg:space-x-16">
              {/* Logo */}
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className="-ml-1 sm:-ml-2 md:-ml-4 flex items-center group"
                id="header-logo"
              >
                <Logo theme={scrolled ? 'light' : 'dark'} iconSize={42} />
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8 lg:space-x-10" id="desktop-nav">
                <a 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, 'home')}
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1.5 px-1 group ${
                    scrolled 
                      ? 'text-gray-800 hover:text-[#0B3D91]' 
                      : 'text-white/95 hover:text-white drop-shadow-sm'
                  }`}
                >
                  <span className="flex items-center space-x-1.5 whitespace-nowrap">
                    <span>🏠</span>
                    <span>{t.nav_home}</span>
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B3D91] transition-all duration-300 group-hover:w-full ${!scrolled && 'group-hover:bg-white'}`} />
                </a>
                
                <a 
                  href="#catalog-section"
                  onClick={(e) => handleNavClick(e, 'catalog-section')} 
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1.5 px-1 group ${
                    scrolled 
                      ? 'text-gray-800 hover:text-[#0B3D91]' 
                      : 'text-white/95 hover:text-white drop-shadow-sm'
                  }`}
                >
                  <span className="flex items-center space-x-1.5 whitespace-nowrap">
                    <span>🚗</span>
                    <span>{t.nav_cars}</span>
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B3D91] transition-all duration-300 group-hover:w-full ${!scrolled && 'group-hover:bg-white'}`} />
                </a>

                <a 
                  href="#about-section"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView('about-us');
                    triggerToast(lang === 'RU' ? 'Переход к странице о нас...' : lang === 'KG' ? 'Биз жөнүндө баракчага өтүү...' : 'Opening About Us page...');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1.5 px-1 group ${
                    currentView === 'about-us'
                      ? scrolled ? 'text-[#0B3D91] border-b border-[#0B3D91] pb-1 font-bold' : 'text-white border-b border-white pb-1 font-bold'
                      : scrolled 
                        ? 'text-gray-800 hover:text-[#0B3D91]' 
                        : 'text-white/95 hover:text-white drop-shadow-sm'
                  }`}
                >
                  <span className="flex items-center space-x-1.5 whitespace-nowrap">
                    <span>👤</span>
                    <span>{t.nav_about}</span>
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B3D91] transition-all duration-300 group-hover:w-full ${!scrolled && 'group-hover:bg-white'}`} />
                </a>

                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView('services');
                    triggerToast(lang === 'RU' ? 'Переход к каталогу услуг...' : lang === 'KG' ? 'Кызматтар каталогуна өтүү...' : 'Opening Services directory...');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1.5 px-1 group ${
                    currentView === 'services'
                      ? scrolled ? 'text-[#0B3D91] border-b border-[#0B3D91] pb-1 font-bold' : 'text-white border-b border-white pb-1 font-bold'
                      : scrolled 
                        ? 'text-gray-800 hover:text-[#0B3D91]' 
                        : 'text-white/95 hover:text-white drop-shadow-sm'
                  }`}
                >
                  <span className="flex items-center space-x-1.5 whitespace-nowrap">
                    <span>🛠️</span>
                    <span>{t.nav_services}</span>
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B3D91] transition-all duration-300 group-hover:w-full ${!scrolled && 'group-hover:bg-white'}`} />
                </a>

                <a 
                  href="#dealers"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView('dealers');
                    triggerToast(lang === 'RU' ? 'Переход к разделу для дилеров...' : lang === 'KG' ? 'Дилерлер бөлүмүнө өтүү...' : 'Opening Dealers hub...');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1.5 px-1 group ${
                    currentView === 'dealers'
                      ? scrolled ? 'text-blue-600 border-b border-blue-600 pb-1 font-bold' : 'text-blue-400 border-b border-blue-400 pb-1 font-bold'
                      : scrolled 
                        ? 'text-gray-800 hover:text-blue-600' 
                        : 'text-white/95 hover:text-white drop-shadow-sm'
                  }`}
                >
                  <span className="flex items-center space-x-1.5 whitespace-nowrap">
                    <span>🏢</span>
                    <span className="font-extrabold text-blue-500 hover:text-blue-400">{lang === 'RU' ? 'ДИЛЕРАМ' : lang === 'KG' ? 'ДИЛЕРЛЕРГЕ' : 'FOR DEALERS'}</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                </a>

                <a 
                  href="#contacts-section"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView('contact-us');
                    triggerToast(lang === 'RU' ? 'Переход к странице контактов...' : lang === 'KG' ? 'Байланыш баракчасына өтүү...' : 'Opening Contacts page...');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1.5 px-1 group ${
                    currentView === 'contact-us'
                      ? scrolled ? 'text-[#0B3D91] border-b border-[#0B3D91] pb-1 font-bold' : 'text-white border-b border-white pb-1 font-bold'
                      : scrolled 
                        ? 'text-gray-800 hover:text-[#0B3D91]' 
                        : 'text-white/95 hover:text-white drop-shadow-sm'
                  }`}
                >
                  <span className="flex items-center space-x-1.5 whitespace-nowrap">
                    <span>📞</span>
                    <span>{t.nav_contacts}</span>
                  </span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B3D91] transition-all duration-300 group-hover:w-full ${!scrolled && 'group-hover:bg-white'}`} />
                </a>
              </nav>
            </div>

            {/* Language & Actions */}
            <div className="hidden md:flex items-center space-x-6" id="header-actions">
              
              {/* Language Switcher */}
              <div className={`p-1 rounded-full flex items-center space-x-1 border transition-all duration-300 ${
                scrolled 
                  ? 'bg-gray-100 border-gray-200' 
                  : 'bg-white/10 border-white/10'
              }`}>
                {(['KG', 'RU', 'EN'] as Language[]).map((lng) => (
                  <button
                    key={lng}
                    onClick={() => {
                      setLang(lng);
                      triggerToast(lng === 'RU' ? 'Язык изменен на Русский' : lng === 'KG' ? 'Тил кыргызчага өзгөртүлдү' : 'Language changed to English');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider transition-all ${
                      lang === lng 
                        ? 'bg-[#0B3D91] text-white shadow-md' 
                        : scrolled 
                          ? 'text-gray-600 hover:text-black' 
                          : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {lng}
                  </button>
                ))}
              </div>

              {/* Add Announcement */}
              <button
                onClick={() => setIsAddListingOpen(true)}
                className={`flex items-center space-x-1 text-xs font-bold py-2.5 px-4 rounded-xl transition-all border ${
                  scrolled 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 hover:border-gray-300' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20'
                }`}
                id="btn-add-listing"
              >
                <Plus className="w-4 h-4" />
                <span>{t.add_listing}</span>
              </button>

              {/* Login Button */}
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`flex items-center space-x-2 text-xs font-bold py-2.5 px-5 rounded-xl transition-all border ${
                  scrolled 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 hover:border-gray-300' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20'
                }`}
                id="btn-login-desktop"
              >
                <User className="w-4 h-4" />
                <span>{t.btn_login}</span>
              </button>

              {/* Dealer Dashboard */}
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  triggerToast(lang === 'RU' ? 'Переход в кабинет дилера...' : lang === 'KG' ? 'Дилер кабинетине өтүү...' : 'Opening Dealer Cabinet...');
                }}
                className={`flex items-center space-x-2 text-xs font-bold py-2.5 px-5 rounded-xl transition-all border ${
                  scrolled 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 hover:border-gray-300' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20'
                }`}
                id="btn-dealer-dashboard-trigger"
              >
                <Layers className="w-4 h-4" />
                <span>{lang === 'RU' ? 'Кабинет дилера' : lang === 'KG' ? 'Дилер кабинети' : 'Dealer Cabinet'}</span>
              </button>

              {/* Admin Panel */}
              <button
                onClick={() => {
                  setCurrentView('admin');
                  triggerToast(lang === 'RU' ? 'Вход в панель суперадминистратора...' : lang === 'KG' ? 'Суперадминистратордун панелине кирүү...' : 'Opening Super Admin Panel...');
                }}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-red-950/25 transition-all hover:scale-[1.02]"
                id="btn-super-admin-trigger"
              >
                <Shield className="w-4 h-4" />
                <span>{lang === 'RU' ? 'Админ-панель' : lang === 'KG' ? 'Админ панели' : 'Admin Panel'}</span>
              </button>

            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Add Announcement Mobile Shortcut */}
              <button
                onClick={() => setIsAddListingOpen(true)}
                className={`p-2.5 rounded-xl border transition-all ${
                  scrolled 
                    ? 'bg-gray-100 border-gray-200 text-gray-800' 
                    : 'bg-white/10 border-white/10 text-white'
                }`}
                aria-label="Add Listing"
              >
                <Plus className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 rounded-xl shadow-md transition-all ${
                  scrolled 
                    ? 'bg-[#0B3D91] text-white' 
                    : 'bg-white text-[#0B3D91]'
                }`}
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl z-40 overflow-hidden"
            id="mobile-nav-drawer"
          >
            <div className="px-4 py-6 space-y-4">
              <Logo theme="light" iconSize={36} className="mb-4 pb-4 border-b border-gray-100" />
              <a 
                href="#home" 
                onClick={() => {
                  setCurrentView('catalog');
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="block text-base font-bold text-gray-800 py-3 border-b border-gray-100 transition-all hover:pl-2 hover:text-[#0B3D91]"
              >
                🏠 {t.nav_home}
              </a>
              <a 
                href="#catalog-section"
                onClick={() => {
                  setCurrentView('catalog');
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="block text-base font-bold text-gray-800 py-3 border-b border-gray-100 transition-all hover:pl-2 hover:text-[#0B3D91]"
              >
                🚗 {t.nav_cars}
              </a>
              <a 
                href="#about-section"
                onClick={() => {
                  setCurrentView('about-us');
                  setMobileMenuOpen(false);
                  triggerToast(lang === 'RU' ? 'Переход к странице о нас...' : lang === 'KG' ? 'Биз жөнүндө баракчага өтүү...' : 'Opening About Us page...');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }} 
                className={`block text-base font-bold py-3 border-b border-gray-100 transition-all hover:pl-2 ${
                  currentView === 'about-us' ? 'text-blue-600 pl-2 font-black' : 'text-gray-800 hover:text-[#0B3D91]'
                }`}
              >
                👤 {t.nav_about}
              </a>
              <a 
                href="#services" 
                onClick={() => {
                  setCurrentView('services');
                  setMobileMenuOpen(false);
                  triggerToast(lang === 'RU' ? 'Переход к каталогу услуг...' : lang === 'KG' ? 'Кызматтар каталогуна өтүү...' : 'Opening Services directory...');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="block text-base font-bold text-gray-800 py-3 border-b border-gray-100 transition-all hover:pl-2 hover:text-[#0B3D91]"
              >
                🛠️ {t.nav_services}
              </a>
              <a 
                href="#dealers" 
                onClick={() => {
                  setCurrentView('dealers');
                  setMobileMenuOpen(false);
                  triggerToast(lang === 'RU' ? 'Переход к разделу для дилеров...' : lang === 'KG' ? 'Дилерлер бөлүмүнө өтүү...' : 'Opening Dealers hub...');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="block text-base font-bold text-blue-600 py-3 border-b border-gray-100 transition-all hover:pl-2"
              >
                🏢 {lang === 'RU' ? 'ДИЛЕРАМ' : lang === 'KG' ? 'ДИЛЕРЛЕРГЕ' : 'FOR DEALERS'}
              </a>

              <a 
                href="#contacts-section"
                onClick={() => {
                  setCurrentView('contact-us');
                  setMobileMenuOpen(false);
                  triggerToast(lang === 'RU' ? 'Переход к странице контактов...' : lang === 'KG' ? 'Байланыш баракчасына өтүү...' : 'Opening Contacts page...');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }} 
                className={`block text-base font-bold py-3 border-b border-gray-100 transition-all hover:pl-2 ${
                  currentView === 'contact-us' ? 'text-blue-600 pl-2 font-black' : 'text-gray-800 hover:text-[#0B3D91]'
                }`}
              >
                📞 {t.nav_contacts}
              </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('dashboard');
                    triggerToast(lang === 'RU' ? 'Переход в кабинет дилера...' : lang === 'KG' ? 'Дилер кабинетине өтүү...' : 'Opening Dealer Cabinet...');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-800"
                >
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'RU' ? 'Кабинет дилера' : lang === 'KG' ? 'Дилер кабинети' : 'Dealer Cabinet'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('crm');
                    triggerToast(lang === 'RU' ? 'Переход в AutoHub CRM PRO...' : lang === 'KG' ? 'AutoHub CRM PRO өтүү...' : 'Opening AutoHub CRM PRO...');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 py-3 rounded-xl text-sm font-black text-slate-900 shadow-md shadow-amber-950/20"
                >
                  <Layers className="w-4 h-4 text-slate-900" />
                  <span>AutoHub CRM PRO</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('admin');
                    triggerToast(lang === 'RU' ? 'Вход в панель суперадминистратора...' : lang === 'KG' ? 'Суперадминистратордун панелине кирүү...' : 'Opening Super Admin Panel...');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-red-950/25 hover:bg-red-700 transition-all"
                >
                  <Shield className="w-4 h-4" />
                  <span>{lang === 'RU' ? 'Админ-панель' : lang === 'KG' ? 'Админ панели' : 'Admin Panel'}</span>
                </button>

              {/* Language mobile picker */}
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                  {lang === 'RU' ? 'Выберите язык' : lang === 'KG' ? 'Тилди тандаңыз' : 'Choose Language'}
                </span>
                <div className="bg-gray-100 p-1 rounded-xl flex items-center space-x-1 max-w-[200px]">
                  {(['KG', 'RU', 'EN'] as Language[]).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => {
                        setLang(lng);
                        setMobileMenuOpen(false);
                        triggerToast(lng === 'RU' ? 'Русский язык' : lng === 'KG' ? 'Кыргыз тили' : 'English language');
                      }}
                      className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all ${
                        lang === lng 
                          ? 'bg-[#0B3D91] text-white shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      {lng}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions mobile */}
              <div className="pt-4 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAddListingOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-800"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.add_listing}</span>
                </button>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-800"
                >
                  <User className="w-4 h-4" />
                  <span>{t.btn_login}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('dashboard');
                    triggerToast(lang === 'RU' ? 'Переход в кабинет дилера...' : lang === 'KG' ? 'Дилер кабинетине өтүү...' : 'Opening Dealer Cabinet...');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 border border-gray-200 py-3 rounded-xl text-sm font-bold text-gray-800"
                >
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'RU' ? 'Кабинет дилера' : lang === 'KG' ? 'Дилер кабинети' : 'Dealer Cabinet'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('admin');
                    triggerToast(lang === 'RU' ? 'Вход в панель суперадминистратора...' : lang === 'KG' ? 'Суперадминистратордун панелине кирүү...' : 'Opening Super Admin Panel...');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-red-950/25 hover:bg-red-700 transition-all"
                >
                  <Shield className="w-4 h-4" />
                  <span>{lang === 'RU' ? 'Админ-панель' : lang === 'KG' ? 'Админ панели' : 'Admin Panel'}</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentView === 'catalog' ? (
        <>
          {/* HERO SECTION */}
          <section 
            id="home" 
            className="relative min-h-[90vh] md:min-h-[95vh] lg:min-h-screen flex items-center pt-24 overflow-hidden bg-slate-950"
          >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/lexus_lx570_premium_askar_hero_1784449269187.jpg"
            alt="AutoHub Kyrgyzstan Luxury Lexus LX570 ASKAR" 
            className="w-full h-full object-cover object-center scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
          
          {/* Left Side Content */}
          <div className="w-full md:w-[50%] text-left space-y-6 sm:space-y-8 flex flex-col justify-center">
            
            {/* Kyrgyzstan National Badge Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 w-fit shadow-lg shadow-black/10"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-gray-200">
                {lang === 'RU' ? 'Главная автомобильная платформа КР' : lang === 'KG' ? 'КР башкы автоунаа платформасы' : 'KG Main Automotive Hub'}
              </span>
            </motion.div>

            {/* Headline and Subtitle */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]"
                id="hero-title"
              >
                {t.hero_title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-lg font-light leading-relaxed"
                id="hero-subtitle"
              >
                {t.hero_subtitle}
              </motion.p>
            </div>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center space-x-2 bg-[#0B3D91] hover:bg-[#072a66] text-white text-sm font-extrabold py-4 px-8 rounded-2xl shadow-xl shadow-blue-900/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{lang === 'RU' ? 'Смотреть автомобили' : lang === 'KG' ? 'Унааларды көрүү' : 'View Vehicles'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAddListingOpen(true)}
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-sm font-extrabold py-4 px-8 rounded-2xl border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>{t.add_listing}</span>
              </button>
            </motion.div>

          </div>

          {/* Right Side - Empty space to reveal beautiful white Lexus LX570 on right */}
          <div className="hidden md:block md:w-[50%] h-48" />

        </div>

        {/* Elegant bottom section curve transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* QUICK SEARCH SECTION (Positioned with beautiful spacing below Hero) */}
      <section id="search-section" className="relative z-30 pt-16 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-10"
            id="hero-filter-console"
          >
            <form onSubmit={handleHeroSearchSubmit} className="space-y-6">
              
              {/* Heading inside search card */}
              <div className="border-b border-gray-100 pb-4 mb-2">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  {lang === 'RU' ? 'Быстрый подбор автомобиля' : lang === 'KG' ? 'Тез унаа тандоо' : 'Quick Vehicle Finder'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {lang === 'RU' ? 'Используйте фильтры или интеллектуальный поиск по ключевым словам' : lang === 'KG' ? 'Чыпкаларды же негизги сөздөр боюнча акылдуу издөөнү колдонуңуз' : 'Use filters or smart keyword search'}
                </p>
              </div>

              {/* Text Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.search_placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91] focus:ring-2 focus:ring-blue-100 transition-all text-gray-800 shadow-inner"
                />
              </div>

              {/* Grid of Select Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
                
                {/* Brand Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400">
                    {t.filter_brand}
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all cursor-pointer hover:bg-gray-100/50"
                  >
                    <option value="">{t.all_brands}</option>
                    {Array.from(new Set(cars.map(c => c.brand))).map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Model Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400">
                    {t.filter_model}
                  </label>
                  <select
                    value={filters.model}
                    onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                    disabled={!filters.brand}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all disabled:opacity-50 cursor-pointer hover:bg-gray-100/50"
                  >
                    <option value="">{t.all_models}</option>
                    {modelsForSelectedBrand.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Price Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400">
                    {t.filter_price}
                  </label>
                  <select
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all cursor-pointer hover:bg-gray-100/50"
                  >
                    <option value="">{t.any}</option>
                    <option value="30000">до $30 000</option>
                    <option value="50000">до $50 000</option>
                    <option value="100000">до $100 000</option>
                    <option value="150000">до $150 000</option>
                  </select>
                </div>

                {/* Year Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-gray-400">
                    {t.filter_year}
                  </label>
                  <select
                    value={filters.minYear}
                    onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all cursor-pointer hover:bg-gray-100/50"
                  >
                    <option value="">{t.any}</option>
                    <option value="2020">от 2020 г.</option>
                    <option value="2021">от 2021 г.</option>
                    <option value="2022">от 2022 г.</option>
                    <option value="2023">от 2023 г.</option>
                  </select>
                </div>

              </div>

              {/* Submitting Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium flex items-center space-x-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#0B3D91]" />
                  <span>{t.found_count}: <strong className="text-gray-900 font-bold">{filteredCars.length}</strong></span>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  {(filters.brand || filters.model || filters.maxPrice || filters.minYear || searchQuery) && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="flex-1 sm:flex-none text-xs font-bold text-gray-500 hover:text-black py-3 px-5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      {t.reset_filters}
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-[#0B3D91] hover:bg-[#072a66] text-white text-sm font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.01]"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t.btn_search}</span>
                  </button>
                </div>
              </div>

            </form>
          </motion.div>

        </div>
      </section>

      {/* POPULAR BRANDS SECTION */}
      <section id="brands-section" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4" id="brands-title">
              {t.brands_title}
            </h2>
            <div className="w-16 h-1 bg-[#0B3D91] mx-auto rounded-full" />
          </div>

          {/* Grid of brand items */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4" id="brands-grid">
            {BRANDS.map((br, index) => {
              const isSelected = filters.brand.toLowerCase() === br.name.toLowerCase();
              return (
                <motion.button
                  key={br.name}
                  onClick={() => handleBrandQuickClick(br.name)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all cursor-pointer border ${
                    isSelected 
                      ? 'bg-blue-50/70 border-[#0B3D91] shadow-lg shadow-blue-900/5' 
                      : 'bg-[#F5F5F5]/60 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50'
                  }`}
                  id={`brand-${br.name.toLowerCase()}`}
                >
                  {/* Brand Monogram Badge */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display text-lg font-black mb-3.5 transition-colors ${
                    isSelected 
                      ? 'bg-[#0B3D91] text-white' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                  }`}>
                    {br.logoText}
                  </div>
                  <span className="text-sm font-bold text-gray-800 tracking-wide block">
                    {br.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-1">
                    {br.count} {lang === 'RU' ? 'объяв.' : lang === 'KG' ? 'жарн.' : 'listings'}
                  </span>
                </motion.button>
              );
            })}
          </div>

        </div>
      </section>

      {/* NEW CARS (CATALOG) SECTION */}
      <section id="catalog-section" className="py-24 bg-[#F5F5F5]/60 border-y border-gray-100 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Localized Labels dictionary */}
          {(() => {
            const catLang = {
              RU: {
                title: "Каталог автомобилей",
                subtitle: "Выберите автомобиль, который подходит именно вам.",
                find: "Найти",
                reset: "Сбросить фильтры",
                brand: "Марка автомобиля",
                model: "Модель",
                yearFrom: "Год выпуска (от)",
                yearTo: "Год выпуска (до)",
                priceFrom: "Цена от ($)",
                priceTo: "Цена до ($)",
                mileageMax: "Пробег до (км)",
                fuelType: "Тип топлива",
                transmission: "Коробка передач",
                bodyType: "Тип кузова",
                color: "Цвет кузова",
                drive: "Привод",
                condition: "Состояние",
                cond_all: "Все автомобили",
                cond_new: "Новые",
                cond_used: "С пробегом",
                
                sort_by: "Сортировка",
                sort_popularity: "По популярности",
                sort_price_asc: "По цене (дешевле)",
                sort_price_desc: "По цене (дороже)",
                sort_year: "По году выпуска",
                sort_mileage: "По пробегу",
                sort_newest: "Новые объявления",
                
                in_stock: "В наличии",
                sold: "Продано",
                details: "Подробнее",
                fav_add: "В избранное",
                fav_added: "В избранном",
                call: "Позвонить",
                whatsapp: "WhatsApp",
                
                compare_add: "Сравнить",
                compare_added: "В сравнении",
                share: "Поделиться",
                pdf: "Скачать PDF",
                
                page: "Страница",
                prev: "Назад",
                next: "Вперед",
                
                no_results: "По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.",
                showing_count: "Показано {start} - {end} из {total} предложений",
                advanced_filters: "Дополнительные параметры",
                hide_advanced_filters: "Скрыть доп. параметры",
                compare_drawer_title: "Сравнение автомобилей ({count}/3)",
                compare_clear: "Очистить все",
                compare_now_btn: "Сравнить характеристики",
                compare_dialog_title: "Сравнение характеристик",
                all_brands: "Все марки",
                all_models: "Все модели",
                all_fuels: "Любое топливо",
                all_transmissions: "Любая КПП",
                all_bodies: "Любой кузов",
                all_colors: "Любой цвет",
                all_drives: "Любой привод"
              },
              KG: {
                title: "Унаалардын каталогу",
                subtitle: "Өзүңүзгө ылайыктуу унааны тандаңыз.",
                find: "Издөө",
                reset: "Чыпкаларды тазалоо",
                brand: "Унаа маркасы",
                model: "Модели",
                yearFrom: "Чыккан жылы (баштап)",
                yearTo: "Чыккан жылы (чейин)",
                priceFrom: "Баасы баштап ($)",
                priceTo: "Баасы чейин ($)",
                mileageMax: "Пробеги чейин (км)",
                fuelType: "Күйүүчү май түрү",
                transmission: "Берүү кутусу (КПП)",
                bodyType: "Кузов түрү",
                color: "Түсү",
                drive: "Жетектөөсү (Привод)",
                condition: "Абалы",
                cond_all: "Бардык унаалар",
                cond_new: "Жаңы унаалар",
                cond_used: "Айдалган (колдонулган)",
                
                sort_by: "Сорттоо",
                sort_popularity: "Популярдуулугу боюнча",
                sort_price_asc: "Арзаныраак",
                sort_price_desc: "Кымбатыраак",
                sort_year: "Жылы боюнча",
                sort_mileage: "Пробеги боюнча",
                sort_newest: "Жаңы жарыялар",
                
                in_stock: "Даяр бар",
                sold: "Сатылды",
                details: "Кененирээк",
                fav_add: "Тандалгандарга",
                fav_added: "Тандалган",
                call: "Чалуу",
                whatsapp: "WhatsApp",
                
                compare_add: "Салыштыруу",
                compare_added: "Салыштырууда",
                share: "Бөлүшүү",
                pdf: "PDF жүктөө",
                
                page: "Барак",
                prev: "Мурунку",
                next: "Кийинки",
                
                no_results: "Сиздин сурооңуз боюнча эч нерсе табылган жок. Издөө параметрлерин өзгөртүп көрүңүз.",
                showing_count: "{total} сунуштун ичинен {start} - {end} көрсөтүлүүдө",
                advanced_filters: "Кошумча чыпкалар",
                hide_advanced_filters: "Жашыруу",
                compare_drawer_title: "Унааларды салыштыруу ({count}/3)",
                compare_clear: "Баарын тазалоо",
                compare_now_btn: "Спецификацияларды салыштыруу",
                compare_dialog_title: "Салыштыруу таблицасы",
                all_brands: "Бардык маркалар",
                all_models: "Бардык моделдер",
                all_fuels: "Күйүүчү майдын баары",
                all_transmissions: "КПП баары",
                all_bodies: "Кузов баары",
                all_colors: "Түстөр баары",
                all_drives: "Привод баары"
              },
              EN: {
                title: "Car Catalog",
                subtitle: "Choose the vehicle that fits you perfectly.",
                find: "Search",
                reset: "Reset Filters",
                brand: "Vehicle Brand",
                model: "Model",
                yearFrom: "Year from",
                yearTo: "Year to",
                priceFrom: "Price from ($)",
                priceTo: "Price to ($)",
                mileageMax: "Max Mileage (km)",
                fuelType: "Fuel Type",
                transmission: "Transmission",
                bodyType: "Body Type",
                color: "Exterior Color",
                drive: "Drivetrain",
                condition: "Condition",
                cond_all: "All Vehicles",
                cond_new: "New Only",
                cond_used: "Pre-Owned",
                
                sort_by: "Sort By",
                sort_popularity: "Popularity",
                sort_price_asc: "Price: Low to High",
                sort_price_desc: "Price: High to Low",
                sort_year: "Year of Manufacture",
                sort_mileage: "Mileage",
                sort_newest: "Newest Listings",
                
                in_stock: "In Stock",
                sold: "Sold",
                details: "Details",
                fav_add: "Favorite",
                fav_added: "Favorited",
                call: "Call Dealer",
                whatsapp: "WhatsApp",
                
                compare_add: "Compare",
                compare_added: "Compared",
                share: "Share",
                pdf: "Download PDF",
                
                page: "Page",
                prev: "Prev",
                next: "Next",
                
                no_results: "No results matched your search. Please try adjusting your filters.",
                showing_count: "Showing {start} - {end} of {total} vehicles",
                advanced_filters: "Advanced Filters",
                hide_advanced_filters: "Hide Filters",
                compare_drawer_title: "Compare Vehicles ({count}/3)",
                compare_clear: "Clear All",
                compare_now_btn: "Compare Specifications",
                compare_dialog_title: "Vehicle Comparison",
                all_brands: "All Brands",
                all_models: "All Models",
                all_fuels: "Any Fuel",
                all_transmissions: "Any Transmission",
                all_bodies: "Any Body Type",
                all_colors: "Any Color",
                all_drives: "Any Drivetrain"
              }
            }[lang];

            // Pagination calculation helper
            const totalItems = filteredCars.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
            const currentCarsPage = filteredCars.slice(startIndex, endIndex);

            // Handler functions
            const handleDownloadPDF = (car: Car) => {
              const specText = `
==================================================
AUTOHUB KYRGYZSTAN - VEHICLE SPECIFICATION
==================================================
Vehicle: ${car.brand} ${car.model} ${car.generation || ''}
Year: ${car.year}
Price: $${car.price.toLocaleString()}
Mileage: ${car.mileage.toLocaleString()} km
Engine capacity: ${car.engine}
Transmission: ${car.transmission[lang]}
Drivetrain: ${car.drive[lang]}
Exterior Color: ${car.color[lang]}
Dealer: ${car.dealer}
City: ${car.city[lang]}
Status: ${car.status === 'sold' ? catLang.sold : catLang.in_stock}
==================================================
Generated on AutoHub Kyrgyzstan digital platform.
Thank you for choosing AutoHub.
==================================================
              `;
              const blob = new Blob([specText], { type: 'text/plain;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `autohub_${car.brand.toLowerCase()}_${car.model.toLowerCase().replace(/\s+/g, '_')}.txt`;
              link.click();
              URL.revokeObjectURL(url);
              triggerToast(lang === 'RU' ? 'Спецификация сохранена!' : 'Мүнөздөмөлөрү сакталды!');
            };

            const handleShareCar = (car: Car) => {
              const url = `${window.location.origin}/?car=${car.id}`;
              navigator.clipboard.writeText(url);
              triggerToast(lang === 'RU' ? 'Ссылка скопирована в буфер обмена!' : 'Унаанын шилтемеси көчүрүлдү!');
            };

            const handleToggleCompare = (car: Car) => {
              if (compareList.includes(car.id)) {
                setCompareList(prev => prev.filter(id => id !== car.id));
                triggerToast(lang === 'RU' ? 'Удалено из сравнения' : 'Салыштыруудан өчүрүлдү');
              } else {
                if (compareList.length >= 3) {
                  triggerToast(lang === 'RU' ? 'Можно сравнить максимум 3 автомобиля!' : 'Эң көп 3 унааны салыштырса болот!');
                  return;
                }
                setCompareList(prev => [...prev, car.id]);
                triggerToast(lang === 'RU' ? 'Добавлено в сравнение' : 'Салыштырууга кошулду');
              }
            };

            const handleToggleFavorite = (carId: string) => {
              if (favorites.includes(carId)) {
                setFavorites(prev => prev.filter(id => id !== carId));
                triggerToast(lang === 'RU' ? 'Удалено из избранного' : 'Тандалгандардан өчүрүлдү');
              } else {
                setFavorites(prev => [...prev, carId]);
                triggerToast(lang === 'RU' ? 'Добавлено в избранное' : 'Тандалгандарга кошулду');
              }
            };

            const handlePageChange = (pageNum: number) => {
              setCurrentPage(pageNum);
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };

            return (
              <div className="space-y-12">
                
                {/* 1. UPPER SECTION */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-[10px] bg-[#0B3D91]/10 text-[#0B3D91] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full inline-block">
                    {lang === 'RU' ? 'Цифровой Салон' : lang === 'KG' ? 'Санариптик Салон' : 'Digital Showroom'}
                  </span>
                  <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#111111] uppercase">
                    {catLang.title}
                  </h1>
                  <p className="text-sm text-gray-500 font-medium max-w-xl mx-auto">
                    {catLang.subtitle}
                  </p>
                  <div className="w-16 h-1 bg-[#0B3D91] mx-auto rounded-full pt-0.5" />
                </div>

                {/* 2. COMPREHENSIVE SEARCH FILTERS PANEL */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 max-w-6xl mx-auto">
                  
                  {/* Row 1: Condition Tabs (NEW / USED / ALL) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                        {catLang.condition}:
                      </span>
                      <div className="bg-gray-100 p-1 rounded-xl flex items-center space-x-1 border border-gray-200">
                        {[
                          { key: 'all', label: catLang.cond_all },
                          { key: 'new', label: catLang.cond_new },
                          { key: 'used', label: catLang.cond_used }
                        ].map(cond => (
                          <button
                            key={cond.key}
                            type="button"
                            onClick={() => setFilters(prev => ({ ...prev, condition: cond.key }))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                              filters.condition === cond.key
                                ? 'bg-white text-[#0B3D91] shadow-sm font-extrabold'
                                : 'text-gray-500 hover:text-black'
                            }`}
                          >
                            {cond.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Simple live count indicator */}
                    <div className="text-xs text-gray-500 font-medium flex items-center space-x-1">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>{lang === 'RU' ? 'Найдено автомобилей' : 'Табылган унаалар'}: <strong className="text-gray-900 font-bold">{totalItems}</strong></span>
                    </div>
                  </div>

                  {/* Core Filters Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-left">
                    
                    {/* Brand Select */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {catLang.brand}
                      </label>
                      <select
                        value={filters.brand}
                        onChange={(e) => handleBrandChange(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      >
                        <option value="">{catLang.all_brands}</option>
                        {Array.from(new Set(cars.map(c => c.brand))).map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* Model Select */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {catLang.model}
                      </label>
                      <select
                        value={filters.model}
                        onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                        disabled={!filters.brand}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all disabled:opacity-40"
                      >
                        <option value="">{catLang.all_models}</option>
                        {modelsForSelectedBrand.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price From */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {catLang.priceFrom}
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 10000"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      />
                    </div>

                    {/* Price To */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {catLang.priceTo}
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 150000"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      />
                    </div>

                    {/* Year From */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {catLang.yearFrom}
                      </label>
                      <select
                        value={filters.minYear}
                        onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      >
                        <option value="">{catLang.cond_all}</option>
                        {Array.from({ length: 15 }, (_, i) => String(2026 - i)).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year To */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {catLang.yearTo}
                      </label>
                      <select
                        value={filters.maxYear}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxYear: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      >
                        <option value="">{catLang.cond_all}</option>
                        {Array.from({ length: 15 }, (_, i) => String(2026 - i)).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    {/* Max Mileage */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        {catLang.mileageMax}
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 50000"
                        value={filters.maxMileage}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxMileage: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      />
                    </div>

                    {/* Active Toggle for extra specs */}
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="w-full flex items-center justify-center space-x-2 border border-gray-200 hover:border-black hover:bg-gray-50 font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer text-gray-700"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#0B3D91]" />
                        <span>{showAdvancedFilters ? catLang.hide_advanced_filters : catLang.advanced_filters}</span>
                      </button>
                    </div>

                  </div>

                  {/* Collapsible Motion Advanced Filters panel */}
                  <AnimatePresence>
                    {showAdvancedFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-5 pt-5 border-t border-gray-100"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 text-left">
                          
                          {/* Fuel Type */}
                          <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                              {catLang.fuelType}
                            </label>
                            <select
                              value={filters.fuelType}
                              onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                            >
                              <option value="">{catLang.all_fuels}</option>
                              <option value="бензин">Бензин (Petrol)</option>
                              <option value="дизель">Дизель (Diesel)</option>
                              <option value="гибрид">Гибрид (Hybrid)</option>
                              <option value="электро">Электро (Electric)</option>
                            </select>
                          </div>

                          {/* Transmission */}
                          <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                              {catLang.transmission}
                            </label>
                            <select
                              value={filters.transmission}
                              onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                            >
                              <option value="">{catLang.all_transmissions}</option>
                              <option value="автомат">Автомат (Automatic)</option>
                              <option value="стептроник">Стептроник (Steptronic)</option>
                              <option value="робот">Робот (DSG/Robotic)</option>
                              <option value="механика">Механика (Manual)</option>
                            </select>
                          </div>

                          {/* Body Type */}
                          <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                              {catLang.bodyType}
                            </label>
                            <select
                              value={filters.bodyType}
                              onChange={(e) => setFilters(prev => ({ ...prev, bodyType: e.target.value }))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                            >
                              <option value="">{catLang.all_bodies}</option>
                              <option value="седан">Седан (Sedan)</option>
                              <option value="внедорожник">Внедорожник (SUV)</option>
                              <option value="кроссовер">Кроссовер (Crossover)</option>
                              <option value="купе">Купе (Coupe)</option>
                              <option value="хэтчбек">Хэтчбек (Hatchback)</option>
                            </select>
                          </div>

                          {/* Color */}
                          <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                              {catLang.color}
                            </label>
                            <select
                              value={filters.color}
                              onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                            >
                              <option value="">{catLang.all_colors}</option>
                              <option value="черный">Черный (Black)</option>
                              <option value="белый">Белый (White)</option>
                              <option value="серый">Серый (Grey)</option>
                              <option value="красный">Красный (Red)</option>
                              <option value="синий">Синий (Blue)</option>
                            </select>
                          </div>

                          {/* Drive */}
                          <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                              {catLang.drive}
                            </label>
                            <select
                              value={filters.drive}
                              onChange={(e) => setFilters(prev => ({ ...prev, drive: e.target.value }))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                            >
                              <option value="">{catLang.all_drives}</option>
                              <option value="полный">Полный (AWD/4WD)</option>
                              <option value="задний">Задний (RWD)</option>
                              <option value="передний">Передний (FWD)</option>
                            </select>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Filter CTAs */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-gray-100 pt-6 mt-6">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="w-full sm:w-auto text-xs font-bold text-gray-500 hover:text-black py-3 px-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      {catLang.reset}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('catalog-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        triggerToast(lang === 'RU' ? 'Параметры поиска обновлены!' : 'Издөө параметрлери жаңыланды!');
                      }}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-extrabold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-900/20 transition-all cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>{catLang.find}</span>
                    </button>
                  </div>

                </div>

                {/* 3. SORTING PANEL & RESULTS COUNT INFO */}
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-gray-100 shadow-sm text-left">
                  <span className="text-xs font-bold text-gray-600">
                    {catLang.showing_count
                      .replace('{start}', String(totalItems > 0 ? startIndex + 1 : 0))
                      .replace('{end}', String(endIndex))
                      .replace('{total}', String(totalItems))}
                  </span>

                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                    <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider shrink-0">
                      {catLang.sort_by}:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all cursor-pointer"
                    >
                      <option value="popularity">{catLang.sort_popularity}</option>
                      <option value="price_asc">{catLang.sort_price_asc}</option>
                      <option value="price_desc">{catLang.sort_price_desc}</option>
                      <option value="year_desc">{catLang.sort_year}</option>
                      <option value="mileage_asc">{catLang.sort_mileage}</option>
                      <option value="newest">{catLang.sort_newest}</option>
                    </select>
                  </div>
                </div>

                {/* 4. CAR CARDS GRID */}
                {totalItems > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" id="cars-grid">
                    {currentCarsPage.map((car, idx) => {
                      const isFavorited = favorites.includes(car.id);
                      const isCompared = compareList.includes(car.id);
                      const isSold = car.status === 'sold';

                      return (
                        <motion.div
                          key={car.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                          whileHover={{ y: -6 }}
                          className="bg-white rounded-3xl shadow-lg shadow-gray-200/30 border border-gray-100 overflow-hidden flex flex-col group relative text-left"
                          id={`car-card-${car.id}`}
                        >
                          {/* Image area */}
                          <div className="relative h-64 overflow-hidden bg-gray-100">
                            <img
                              src={car.image}
                              alt={`${car.brand} ${car.model}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Dark shadow edge for text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                            {/* Status badge & New tag */}
                            <div className="absolute top-4 left-4 flex flex-col space-y-2 items-start">
                              <span className={`text-[9px] font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md ${
                                isSold 
                                  ? 'bg-gray-400 text-white' 
                                  : 'bg-emerald-500 text-white flex items-center space-x-1'
                              }`}>
                                {isSold ? catLang.sold : `✔ ${catLang.in_stock}`}
                              </span>
                              
                              {car.isNew && !isSold && (
                                <span className="bg-[#0B3D91] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md">
                                  NEW
                                </span>
                              )}
                            </div>

                            {/* Location Badge */}
                            <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 text-white text-xs font-bold bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/15 shadow-sm">
                              <MapPin className="w-3.5 h-3.5 text-red-400" />
                              <span>{car.city[lang]}</span>
                            </div>

                            {/* Absolute action button tray on image */}
                            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                              {/* Favorite toggler */}
                              <button
                                type="button"
                                onClick={() => handleToggleFavorite(car.id)}
                                className={`p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all ${
                                  isFavorited 
                                    ? 'bg-red-500 border-red-500 text-white scale-105' 
                                    : 'bg-white/90 hover:bg-white border-gray-100 text-gray-700 hover:text-red-500'
                                }`}
                                title={catLang.fav_add}
                              >
                                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                              </button>
                            </div>

                          </div>

                          {/* Details & Specs content */}
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            
                            <div className="space-y-3">
                              
                              {/* Brand name and dynamic actions */}
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-[#0B3D91] uppercase tracking-widest block">
                                  {car.brand}
                                </span>
                                {car.generation && (
                                  <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider block">
                                    {car.generation}
                                  </span>
                                )}
                              </div>

                              {/* Title */}
                              <h3 className="font-display text-xl font-bold text-[#111111] group-hover:text-[#0B3D91] transition-colors line-clamp-1">
                                {car.brand} {car.model}
                              </h3>

                              {/* Spec parameters grid */}
                              <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-y border-gray-100 py-4 text-xs font-medium text-gray-600">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                                  <span><strong className="text-gray-900 font-bold">{car.year}</strong> г.</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Gauge className="w-4 h-4 text-gray-400 shrink-0" />
                                  <span><strong className="text-gray-900 font-bold">{car.mileage.toLocaleString()}</strong> км</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Activity className="w-4 h-4 text-gray-400 shrink-0" />
                                  <span className="truncate">{car.engine}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                                  <span className="truncate">{(car.fuelType?.[lang]) || 'Бензин'}</span>
                                </div>
                                <div className="flex items-center space-x-2 col-span-2 border-t border-gray-50/50 pt-2">
                                  <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                                  <span className="truncate">{(car.transmission?.[lang]) || 'Автомат'} • {(car.drive?.[lang]) || 'Полный привод'}</span>
                                </div>
                              </div>

                            </div>

                            {/* Pricing & Fast Actions list */}
                            <div className="space-y-4 pt-4">
                              
                              {/* Price block and quick action icon tags */}
                              <div className="flex items-center justify-between">
                                <div className="text-left">
                                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">
                                    {lang === 'RU' ? 'Итоговая цена' : 'Жалпы баасы'}
                                  </span>
                                  <span className="font-display text-2xl font-black text-[#111111]">
                                    ${car.price.toLocaleString()}
                                  </span>
                                </div>

                                {/* Fast Actions Strip */}
                                <div className="flex items-center space-x-2">
                                  {/* Compare */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleCompare(car)}
                                    className={`p-2 rounded-xl transition-all border shrink-0 ${
                                      isCompared 
                                        ? 'bg-blue-50 border-blue-200 text-[#0B3D91]' 
                                        : 'bg-gray-50 border-gray-100 hover:border-gray-300 text-gray-500 hover:text-black'
                                    }`}
                                    title={catLang.compare_add}
                                  >
                                    <Layers className="w-3.5 h-3.5" />
                                  </button>
                                  
                                  {/* Share */}
                                  <button
                                    type="button"
                                    onClick={() => handleShareCar(car)}
                                    className="p-2 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-300 text-gray-500 hover:text-black transition-all shrink-0"
                                    title={catLang.share}
                                  >
                                    <Share2 className="w-3.5 h-3.5" />
                                  </button>
                                  
                                  {/* PDF Sheet Download */}
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadPDF(car)}
                                    className="p-2 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-300 text-gray-500 hover:text-black transition-all shrink-0"
                                    title={catLang.pdf}
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Primary Action Buttons */}
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => setSelectedCar(car)}
                                  className="flex items-center justify-center space-x-1 bg-[#0B3D91] text-white hover:bg-[#072a66] text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-900/10"
                                >
                                  <span>{catLang.details}</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                                <a
                                  href={`https://wa.me/${car.whatsappNumber.replace(/\+/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-center space-x-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-500/10 transition-all"
                                >
                                  <MessageCircle className="w-4 h-4 fill-current" />
                                  <span>{catLang.whatsapp}</span>
                                </a>
                              </div>

                              {/* Instant Direct Phone Call */}
                              <a
                                href={`tel:${car.phoneNumber}`}
                                className="w-full flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-black font-bold py-2 px-4 rounded-xl text-[11px] transition-all border border-gray-100"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#0B3D91]" />
                                <span>{catLang.call}: {car.phoneNumber}</span>
                              </a>

                            </div>

                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto space-y-6"
                    id="empty-results"
                  >
                    <div className="w-20 h-20 bg-blue-50 text-[#0B3D91] rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Search className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-bold text-gray-900">
                        {lang === 'RU' ? 'Ничего не найдено' : lang === 'KG' ? 'Эч нерсе табылган жок' : 'No Listings Found'}
                      </h3>
                      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                        {catLang.no_results}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-900/10 transition-all cursor-pointer inline-block"
                    >
                      {catLang.reset}
                    </button>
                  </motion.div>

                )}

                {/* 6. PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 pt-8" id="pagination-panel">
                    
                    {/* Previous button */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer"
                      title={catLang.prev}
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-800" />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-[#0B3D91] text-white shadow-md'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Next button */}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer"
                      title={catLang.next}
                    >
                      <ChevronRight className="w-4 h-4 text-gray-800" />
                    </button>

                  </div>
                )}

                {/* 7. BOTTOM FLOATING COMPARISON OVERLAY DRAWER */}
                <AnimatePresence>
                  {compareList.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 100 }}
                      className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-40 bg-white shadow-2xl rounded-2xl border border-gray-100 p-4 max-w-2xl w-full flex flex-col md:flex-row md:items-center justify-between gap-4"
                      id="compare-drawer"
                    >
                      <div className="flex items-center space-x-3 text-left">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0B3D91]">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">
                            {catLang.compare_drawer_title.replace('{count}', String(compareList.length))}
                          </span>
                          <span className="text-[10px] text-gray-400 block font-semibold">
                            {lang === 'RU' ? 'Выберите до 3 машин для наглядного сравнения' : 'Иш жүзүндө салыштыруу үчүн 3 унаага чейин тандаңыз'}
                          </span>
                        </div>
                      </div>

                      {/* Side-by-side thumbnails list */}
                      <div className="flex items-center space-x-2 overflow-x-auto">
                        {compareList.map(carId => {
                          const c = cars.find(item => item.id === carId);
                          if (!c) return null;
                          return (
                            <div key={c.id} className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                              <img src={c.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => setCompareList(prev => prev.filter(id => id !== c.id))}
                                className="absolute top-0 right-0 bg-black/60 hover:bg-red-500 text-white p-0.5 rounded-bl"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 md:ml-4">
                        <button
                          type="button"
                          onClick={() => setCompareList([])}
                          className="text-[11px] font-bold text-gray-400 hover:text-black hover:underline px-2.5 py-2 cursor-pointer"
                        >
                          {catLang.compare_clear}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsCompareModalOpen(true)}
                          className="bg-[#0B3D91] hover:bg-[#072a66] text-white text-[11px] font-black py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                        >
                          {catLang.compare_now_btn}
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 8. COMPARISON SPECS MATRIX MODAL OVERLAY */}
                <AnimatePresence>
                  {isCompareModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" id="compare-matrix-modal">
                      {/* Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCompareModalOpen(false)}
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                      />

                      {/* Modal Body */}
                      <div className="flex min-h-full items-center justify-center p-4 relative">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 30 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 20 }}
                          className="relative bg-white w-full max-w-5xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col space-y-6 text-left"
                        >
                          
                          {/* Close header */}
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center space-x-2.5 text-[#0B3D91]">
                              <Layers className="w-6 h-6" />
                              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                                {catLang.compare_dialog_title}
                              </h3>
                            </div>
                            <button
                              onClick={() => setIsCompareModalOpen(false)}
                              className="text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Responsive Side by Side Comparison Grid */}
                          <div className="overflow-x-auto pb-4 scrollbar-thin">
                            <table className="w-full table-fixed min-w-[650px] text-xs">
                              
                              {/* Header row: Photos */}
                              <thead>
                                <tr className="border-b border-gray-100">
                                  <th className="w-1/4 pb-4 font-bold text-gray-400 uppercase tracking-wider">{catLang.brand} / {catLang.model}</th>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    if (!c) return <th key={carId} className="w-1/4 pb-4"></th>;
                                    return (
                                      <th key={c.id} className="w-1/4 pb-4 px-4 text-center">
                                        <div className="space-y-3">
                                          <div className="h-24 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm relative">
                                            <img src={c.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            <button
                                              type="button"
                                              onClick={() => setCompareList(prev => prev.filter(id => id !== c.id))}
                                              className="absolute top-1.5 right-1.5 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full transition-all"
                                              title={lang === 'RU' ? 'Удалить' : 'Өчүрүү'}
                                            >
                                              <X className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                          <span className="font-display text-sm font-black text-gray-900 block line-clamp-1">
                                            {c.brand} {c.model}
                                          </span>
                                        </div>
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>

                              {/* Spec Rows */}
                              <tbody>
                                
                                {/* Price */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{lang === 'RU' ? 'Стоимость' : 'Баасы'}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-black text-[#0B3D91] text-sm">
                                        {c ? `$${c.price.toLocaleString()}` : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Year */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{lang === 'RU' ? 'Год выпуска' : 'Чыккан жылы'}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-extrabold text-gray-800">
                                        {c ? `${c.year} г.` : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Mileage */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{lang === 'RU' ? 'Пробег' : 'Пробеги'}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-extrabold text-gray-800">
                                        {c ? `${c.mileage.toLocaleString()} км` : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Engine Capacity */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{lang === 'RU' ? 'Двигатель' : 'Кыймылдаткыч'}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-semibold text-gray-700">
                                        {c ? c.engine : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Fuel Type */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{catLang.fuelType}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-semibold text-gray-700">
                                        {c ? (c.fuelType?.[lang] || 'Бензин') : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Transmission */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{catLang.transmission}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-semibold text-gray-700">
                                        {c ? c.transmission[lang] : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Drivetrain */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{catLang.drive}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-semibold text-gray-700">
                                        {c ? c.drive[lang] : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Body Type */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{catLang.bodyType}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-semibold text-gray-700">
                                        {c ? (c.bodyType?.[lang] || 'Седан') : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* Exterior Color */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{catLang.color}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-semibold text-gray-700">
                                        {c ? c.color[lang] : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                                {/* City */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                  <td className="py-3 font-bold text-gray-500">{lang === 'RU' ? 'Город' : 'Шаар'}</td>
                                  {compareList.map(carId => {
                                    const c = cars.find(item => item.id === carId);
                                    return (
                                      <td key={carId} className="py-3 px-4 text-center font-semibold text-gray-700">
                                        {c ? c.city[lang] : '-'}
                                      </td>
                                    );
                                  })}
                                </tr>

                              </tbody>
                            </table>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end pt-2 border-t border-gray-100">
                            <button
                              type="button"
                              onClick={() => setIsCompareModalOpen(false)}
                              className="bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all cursor-pointer"
                            >
                              {lang === 'RU' ? 'Закрыть' : 'Жабуу'}
                            </button>
                          </div>

                        </motion.div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

              </div>
            );
          })()}

        </div>
      </section>

      {/* WHY AUTOHUB (BENEFITS) */}
      <section className="py-24 bg-white overflow-hidden" id="benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4" id="why-autohub-title">
              {t.why_autohub}
            </h2>
            <p className="text-sm text-gray-500 font-semibold max-w-xl mx-auto">
              {lang === 'RU' ? 'Мы создаем максимально прозрачный и технологичный автомобильный рынок в Кыргызстане' : lang === 'KG' ? 'Биз Кыргызстанда эң ачык-айкын жана технологиялык унаа рыногун түзүп жатабыз' : 'We are creating the most transparent and advanced auto marketplace in Kyrgyzstan'}
            </p>
            <div className="w-16 h-1 bg-[#0B3D91] mx-auto rounded-full mt-6" />
          </div>

          {/* 4 Premium Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="benefits-grid">
            
            {/* Benefit 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#F5F5F5]/60 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100/60 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#0B3D91] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B3D91] group-hover:text-white transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">
                {t.verified_dealers}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t.verified_dealers_desc}
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#F5F5F5]/60 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100/60 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#0B3D91] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B3D91] group-hover:text-white transition-colors">
                <CarIcon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">
                {t.wide_selection}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t.wide_selection_desc}
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#F5F5F5]/60 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100/60 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#0B3D91] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B3D91] group-hover:text-white transition-colors">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">
                {t.smart_search}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t.smart_search_desc}
              </p>
            </motion.div>

            {/* Benefit 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#F5F5F5]/60 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-100/60 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#0B3D91] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B3D91] group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-3">
                {t.secure_deals}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t.secure_deals_desc}
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ABOUT US (O HAC) BENTO GRID SECTION */}
      <section className="py-24 bg-slate-50 border-t border-b border-gray-100" id="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B3D91] bg-blue-50 px-4 py-2 rounded-full inline-block">
              {lang === 'RU' ? 'Наша команда' : lang === 'KG' ? 'Биздин команда' : 'Our Team'}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-gray-900" id="about-title">
              {lang === 'RU' ? 'Наша команда' : lang === 'KG' ? 'Биздин Команда' : 'Our Team'}
            </h2>
            <div className="w-16 h-1 bg-[#0B3D91] mx-auto rounded-full mb-4" />
            <p className="text-base sm:text-lg text-gray-550 font-light leading-relaxed">
              {lang === 'RU' ? 'Команда профессионалов, которая помогает покупать и продавать автомобили безопасно, честно и быстро.' 
               : lang === 'KG' ? 'Команда профессионалдардын, алар жардам берет сатып алууга жана сатууга унааларды коопсуз, чынчыл жана тез.' 
               : 'A team of professionals helping you buy and sell vehicles safely, honestly, and quickly.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: ((member.id - 1) % 4) * 0.1 }}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-md rounded-[20px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(11,61,145,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                {/* Image Container with experience overlay */}
                <div className="relative w-full h-[280px] overflow-hidden rounded-t-[20px]">
                  <img
                    src={member.image}
                    alt={member.name[lang]}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Premium overlay shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 bg-[#0B3D91] text-white text-[10px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20 z-10">
                    {lang === 'RU' ? 'Опыт: ' : lang === 'KG' ? 'Тажрыйба: ' : 'Exp: '} {member.experience[lang]}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                  {/* Name and Position */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-[#0B3D91] transition-colors leading-tight">
                      {member.name[lang]}
                    </h3>
                    <p className="text-xs font-bold text-[#0B3D91] uppercase tracking-widest mt-1.5 min-h-[32px] flex items-center">
                      {member.position[lang]}
                    </p>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Short biography */}
                  <p className="text-xs text-gray-500 italic leading-relaxed min-h-[48px]">
                    &ldquo;{member.bio[lang]}&rdquo;
                  </p>

                  {/* Portfolio list */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">
                      {lang === 'RU' ? 'Специализация:' : lang === 'KG' ? 'Багыты:' : 'Specialization:'}
                    </span>
                    <ul className="space-y-1.5 min-h-[140px]">
                      {member.portfolio[lang].map((bullet, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start space-x-1.5 leading-snug">
                          <span className="text-[#0B3D91] font-bold text-sm leading-none mt-0.5 shrink-0">&bull;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {member.skills[lang].map((skill, i) => (
                      <span
                        key={i}
                        className="text-[9px] bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded border border-slate-200/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex-grow" />

                  {/* Action row */}
                  <div className="space-y-2 pt-4">
                    {/* Primary Contact button */}
                    <a
                      href={`tel:${member.phone}`}
                      className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-extrabold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-blue-900/20 active:scale-98"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lang === 'RU' ? 'Позвонить' : lang === 'KG' ? 'Чалуу' : 'Call Member'}</span>
                    </a>

                    {/* Social icons row */}
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/${member.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] py-2.5 px-3 rounded-xl flex items-center justify-center transition-all border border-[#25D366]/10 hover:scale-[1.02] active:scale-[0.98]"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] py-2.5 px-3 rounded-xl flex items-center justify-center transition-all border border-[#0077B5]/10 hover:scale-[1.02] active:scale-[0.98]"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4 fill-current" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 py-2.5 px-3 rounded-xl flex items-center justify-center transition-all border border-rose-500/10 hover:scale-[1.02] active:scale-[0.98]"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT FORM & MAP SECTION (КОНТАКТЫ) */}
      <section id="contacts-section" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contacts Information */}
            <div className="text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B3D91] block mb-2">
                {t.contacts}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
                {lang === 'RU' ? 'Остались вопросы? Свяжитесь с нами' : lang === 'KG' ? 'Суроолоруңуз калдыбы? Биз менен байланышыңыз' : 'Have Questions? Get in Touch'}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-lg">
                {lang === 'RU' ? 'Наши менеджеры всегда готовы помочь вам с выбором, оформлением сделки или интеграцией вашего автосалона в платформу AutoHub.' 
                              : lang === 'KG' ? 'Биздин менеджерлер сизге тандоо, бүтүмдү каттоого же автосалонуңузду AutoHub платформасына кошууга жардам берүүгө дайым даяр.' 
                              : 'Our representatives are always available to assist with vehicle search, deal paperwork, or dealership integrations.'}
              </p>

              {/* Contacts lines */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#0B3D91] rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">{lang === 'RU' ? 'Адрес офиса' : lang === 'KG' ? 'Офис дареги' : 'Office address'}</span>
                    <span className="text-sm font-semibold text-[#111111]">{t.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#0B3D91] rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">{lang === 'RU' ? 'Телефон поддержки' : lang === 'KG' ? 'Колдоо телефону' : 'Support hotline'}</span>
                    <a href={`tel:${t.phone_number}`} className="text-sm font-bold text-gray-900 hover:text-[#0B3D91] transition-colors">{t.phone_number}</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#0B3D91] rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Email</span>
                    <a href={`mailto:${t.email_address}`} className="text-sm font-semibold text-gray-900 hover:text-[#0B3D91] transition-colors">{t.email_address}</a>
                  </div>
                </div>
              </div>

              {/* Mini Interactive map placeholder */}
              <div className="bg-gray-100 rounded-2xl h-48 border border-gray-200 relative overflow-hidden shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                <div className="relative text-center p-6">
                  <MapPin className="w-8 h-8 text-[#0B3D91] mx-auto mb-2 animate-bounce" />
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-widest block">BISHKEK HQ</span>
                  <span className="text-[10px] text-gray-400 font-mono">COORD: 42.8746° N, 74.5698° E</span>
                </div>
              </div>

            </div>

            {/* Direct message Form */}
            <div className="bg-[#F5F5F5]/60 rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/30">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                {lang === 'RU' ? 'Отправить быстрое сообщение' : lang === 'KG' ? 'Ыкчам билдирүү жөнөтүү' : 'Send Fast Message'}
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {lang === 'RU' ? 'Ваше имя' : 'Сиздин атыңыз'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#0B3D91]"
                    placeholder="Алексей / Нурбек"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {t.phone_label}
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#0B3D91]"
                    placeholder="+996 555 123-456"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {lang === 'RU' ? 'Ваше сообщение (необязательно)' : 'Билдирүү (милдеттүү эмес)'}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#0B3D91]"
                    placeholder={lang === 'RU' ? 'Я хочу проконсультироваться насчет покупки Lexus LX...' : 'Мага кеңеш керек...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitted}
                  className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-bold py-4 px-6 rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  {contactSubmitted ? (lang === 'RU' ? 'Отправлено!' : 'Жөнөтүлдү!') : (lang === 'RU' ? 'Отправить сообщение' : 'Билдирүүнү жөнөтүү')}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>
        </>
      ) : currentView === 'calculator' ? (
        <CalculatorPage lang={lang} />
      ) : currentView === 'auctions' ? (
        <AuctionsPage 
          lang={lang} 
          onNavigateToCalculator={(tab) => {
            setCurrentView('calculator');
            if (tab) {
              localStorage.setItem('calculator_initial_tab', tab);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : currentView === 'order-car' ? (
        <OrderCarPage 
          lang={lang} 
          onNavigateToCalculator={(tab) => {
            setCurrentView('calculator');
            if (tab) {
              localStorage.setItem('calculator_initial_tab', tab);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : currentView === 'vin-check' ? (
        <VinCheckPage 
          lang={lang}
          onNavigateToCalculator={(tab) => {
            setCurrentView('calculator');
            if (tab) {
              localStorage.setItem('calculator_initial_tab', tab);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : currentView === 'ai-advisor' ? (
        <AiAdvisorPage 
          lang={lang}
          onNavigateToCalculator={(tab) => {
            setCurrentView('calculator');
            if (tab) {
              localStorage.setItem('calculator_initial_tab', tab);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToVinCheck={() => {
            setCurrentView('vin-check');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToOrderCar={() => {
            setCurrentView('order-car');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : currentView === 'order-tracking' ? (
        <OrderTrackingPage 
          lang={lang}
          onNavigateToCalculator={(tab) => {
            setCurrentView('calculator');
            if (tab) {
              localStorage.setItem('calculator_initial_tab', tab);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToVinCheck={() => {
            setCurrentView('vin-check');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToOrderCar={() => {
            setCurrentView('order-car');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : null}

      {/* FOOTER SECTION */}
      <PremiumFooter lang={lang} setCurrentView={setCurrentView} triggerToast={triggerToast} />

      {/* CAR DETAILS PREVIEW */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md" id="car-details-modal">
            <div className="min-h-screen bg-[#070708] py-8">
              <VehicleDetailsPage 
                car={selectedCar}
                allCars={cars}
                lang={lang}
                favorites={favorites}
                toggleFavorite={(id) => {
                  setFavorites(prev => 
                    prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
                  );
                }}
                onClose={() => setSelectedCar(null)}
                onSelectCar={(newCar) => setSelectedCar(newCar)}
                isAdminDark={true}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* SIGN IN (LOGIN) MODAL */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="login-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl border border-gray-100 text-left"
              >
                {/* Close absolute */}
                <button
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black p-1.5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header info */}
                <div className="mb-6">
                  <Logo theme="light" iconSize={48} className="mb-4" />
                  <h3 className="font-display text-2xl font-bold text-gray-900">
                    {t.login_title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.login_subtitle}
                  </p>
                </div>

                {loginSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <span className="text-sm font-bold text-gray-800 block">
                      {lang === 'RU' ? 'Успешная авторизация!' : 'Ийгиликтүү кирдиңиз!'}
                    </span>
                    <span className="text-xs text-gray-500 block mt-1">
                      {lang === 'RU' ? 'Личный кабинет загружается...' : 'Өздүк кабинет жүктөлүүдө...'}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.phone_label}
                      </label>
                      <input
                        type="tel"
                        required
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="+996 (___) ___-___"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.password_label}
                      </label>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold py-1">
                      <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                        <input type="checkbox" className="rounded-md accent-[#0B3D91]" />
                        <span>{t.remember_me}</span>
                      </label>
                      <a href="#forgot" className="text-[#0B3D91] hover:underline">
                        {t.forgot_password}
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all"
                    >
                      {t.btn_login}
                    </button>

                    <div className="border-t border-gray-100 pt-4 mt-6 text-center text-xs text-gray-500">
                      <span>{t.dont_have_account} </span>
                      <a href="#register" className="text-[#0B3D91] font-bold hover:underline">
                        {t.register_now}
                      </a>
                    </div>
                  </form>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD CAR LISTING MODAL */}
      <AnimatePresence>
        {isAddListingOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="add-listing-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddListingOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-lg p-8 relative shadow-2xl border border-gray-100 text-left"
              >
                {/* Close button absolute */}
                <button
                  onClick={() => setIsAddListingOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black p-1.5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-[#0B3D91] rounded-xl flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900">
                    {t.add_car_title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'RU' ? 'Заполните форму, и мы добавим автомобиль в наш локальный каталог для демонстрации.' 
                                  : lang === 'KG' ? 'Каталогко кошуу үчүн ушул форманы толтуруңуз.' 
                                  : 'Fill the form to append a test vehicle to the local demonstration list.'}
                  </p>
                </div>

                <form onSubmit={handleCreateListing} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.form_brand} *
                      </label>
                      <input
                        type="text"
                        required
                        value={newCarBrand}
                        onChange={(e) => setNewCarBrand(e.target.value)}
                        placeholder="Toyota / BMW"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.form_model} *
                      </label>
                      <input
                        type="text"
                        required
                        value={newCarModel}
                        onChange={(e) => setNewCarModel(e.target.value)}
                        placeholder="Camry / X5"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.form_year}
                      </label>
                      <select
                        value={newCarYear}
                        onChange={(e) => setNewCarYear(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      >
                        {Array.from({ length: 10 }, (_, i) => String(2026 - i)).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.city_label}
                      </label>
                      <select
                        value={newCarCity}
                        onChange={(e) => setNewCarCity(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      >
                        <option value="Bishkek">Бишкек (Bishkek)</option>
                        <option value="Osh">Ош (Osh)</option>
                        <option value="Jalal-Abad">Джалал-Абад (Jalal-Abad)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.form_price} *
                      </label>
                      <input
                        type="number"
                        required
                        value={newCarPrice}
                        onChange={(e) => setNewCarPrice(e.target.value)}
                        placeholder="e.g. 25000"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        {t.form_mileage}
                      </label>
                      <input
                        type="number"
                        value={newCarMileage}
                        onChange={(e) => setNewCarMileage(e.target.value)}
                        placeholder="e.g. 40000"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      {t.form_engine}
                    </label>
                    <input
                      type="text"
                      value={newCarEngine}
                      onChange={(e) => setNewCarEngine(e.target.value)}
                      placeholder="e.g. 2.5L Hybrid"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#0B3D91]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-bold py-4 px-4 rounded-xl shadow-lg transition-all mt-4"
                  >
                    {t.form_submit}
                  </button>

                </form>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
