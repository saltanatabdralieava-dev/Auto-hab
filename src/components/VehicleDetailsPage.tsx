import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ShieldCheck, 
  Star, 
  Eye, 
  Heart, 
  Share2, 
  Calendar, 
  Gauge, 
  Droplet, 
  Settings, 
  Compass, 
  Award, 
  Palette, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Calculator, 
  Wrench, 
  Navigation, 
  Sparkles, 
  DollarSign, 
  Check, 
  Zap, 
  Clock,
  Send,
  Shield,
  HelpCircle,
  Smile,
  CheckCircle2,
  ArrowRight,
  Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Language } from '../types';

interface VehicleDetailsPageProps {
  car: Car;
  allCars: Car[];
  lang: Language;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onClose: () => void;
  onSelectCar: (car: Car) => void;
  isAdminDark: boolean;
}

// Translations specific to the Vehicle Details Page
const DETAIL_T = {
  RU: {
    back: 'Назад',
    vin_verified: 'VIN Проверен',
    vip_badge: 'VIP Предложение',
    dealer_verified: 'Проверенный дилер',
    views: 'просмотров',
    favorites: 'в избранном',
    share: 'Поделиться',
    specs_title: 'Характеристики',
    desc_title: 'Описание автомобиля',
    read_more: 'Читать далее',
    read_less: 'Свернуть',
    equipment_title: 'Комплектация и Оборудование',
    dealer_card_title: 'Информация о продавце',
    dealer_verified_label: 'Официальный дилер AutoHub',
    years_on_platform: 'года на платформе',
    total_cars: 'автомобилей в наличии',
    btn_call: 'Позвонить',
    btn_whatsapp: 'Написать в WhatsApp',
    btn_telegram: 'Telegram',
    btn_chat: 'Чат на AutoHub',
    btn_dealer_profile: 'Профиль автосалона',
    location_title: 'Местоположение автомобиля',
    btn_route: 'Проложить маршрут',
    nearby_services: 'Рядом с автосалоном',
    calc_title: 'Финансовый калькулятор',
    down_payment: 'Первоначальный взнос',
    loan_term: 'Срок кредита',
    months: 'мес.',
    monthly_payment: 'Ежемесячный платеж',
    interest_rate: 'Процентная ставка',
    btn_apply_loan: 'Подать заявку на автокредит',
    similar_title: 'Похожие автомобили',
    safety_title: 'Гарантия безопасности AutoHub',
    safety_desc: 'Мы провели комплексную юридическую и техническую проверку данного автомобиля.',
    vin_checked: 'VIN-код проверен в базах ГРС',
    docs_checked: 'Документы и залоги проверены',
    seller_verified: 'Личность продавца подтверждена',
    no_fees: 'Без скрытых комиссий платформы',
    customs_yes: 'Растаможен в КР',
    customs_no: 'Не растаможен',
    steering_left: 'Левый',
    steering_right: 'Правый',
    cond_excellent: 'Отличное',
    owners_count: 'Владельцев по ПТС',
    steering_wheel: 'Руль',
    customs: 'Таможня',
    condition: 'Состояние',
    owners: 'Владельцы',
    share_toast: 'Ссылка скопирована в буфер обмена!',
    nearby_gas: 'АЗС Red Petroleum (200м)',
    nearby_wash: 'Детейлинг-мойка AutoSpa (450м)',
    nearby_service: 'Автосервис AutoHub-STO (800м)',
    ai_advisor_btn: '🤖 Спросить AI-ассистента об авто',
    ai_advisor_p1: 'AI-анализ: Цена ниже рыночной на 4%. Ликвидность высокая.',
    credit_success_toast: 'Заявка на кредит успешно отправлена на рассмотрение в банк-партнер!',
    route_success_toast: 'Маршрут построен в вашем навигаторе!'
  },
  KG: {
    back: 'Артка',
    vin_verified: 'VIN Текшерилген',
    vip_badge: 'VIP Сунуш',
    dealer_verified: 'Ишенимдүү дилер',
    views: 'көрүүлөр',
    favorites: 'тандоолордо',
    share: 'Бөлүшүү',
    specs_title: 'Мүнөздөмөсү',
    desc_title: 'Унаанын баяндамасы',
    read_more: 'Кененирээк окуу',
    read_less: 'Кыскартуу',
    equipment_title: 'Комплектация жана Жабдуулар',
    dealer_card_title: 'Сатуучу жөнүндө маалымат',
    dealer_verified_label: 'AutoHub расмий дилери',
    years_on_platform: 'платформадагы жылдары',
    total_cars: 'унаалар сатыкта бар',
    btn_call: 'Чалуу',
    btn_whatsapp: 'WhatsApp\'тан жазуу',
    btn_telegram: 'Telegram',
    btn_chat: 'AutoHub чаты',
    btn_dealer_profile: 'Автосалондун профили',
    location_title: 'Унаанын турган орду',
    btn_route: 'Маршрут куруу',
    nearby_services: 'Автосалонго жакын жерлер',
    calc_title: 'Финансылык калькулятор',
    down_payment: 'Баштапкы төлөм',
    loan_term: 'Кредит мөөнөтү',
    months: 'ай',
    monthly_payment: 'Айлык төлөм',
    interest_rate: 'Пайыздык чен',
    btn_apply_loan: 'Автокредитке билдирме берүү',
    similar_title: 'Окшош унаалар',
    safety_title: 'AutoHub коопсуздук кепилдиги',
    safety_desc: 'Биз бул унааны комплекстүү юридикалык жана техникалык текшерүүдөн өткөрдүк.',
    vin_checked: 'VIN-код Мамлекеттик каттоо кызматында текшерилди',
    docs_checked: 'Документтер жана күрөөлөр текшерилди',
    seller_verified: 'Сатуучунун өздүгү тастыкталды',
    no_fees: 'Платформада жашыруун комиссиялар жок',
    customs_yes: 'КРда бажыдан өткөн',
    customs_no: 'Бажыдан өтпөгөн',
    steering_left: 'Сол',
    steering_right: 'Оң',
    cond_excellent: 'Абдан жакшы',
    owners_count: 'Ээлеринин саны',
    steering_wheel: 'Рул',
    customs: 'Бажы',
    condition: 'Абалы',
    owners: 'Ээлери',
    share_toast: 'Шилтеме алмашуу буферине көчүрүлдү!',
    nearby_gas: 'Red Petroleum май куюучу жайы (200м)',
    nearby_wash: 'AutoSpa унаа жуучу жайы (450м)',
    nearby_service: 'AutoHub-STO автосервиси (800м)',
    ai_advisor_btn: '🤖 AI-жардамчыдан унаа тууралуу суроо',
    ai_advisor_p1: 'AI-анализ: Баасы базардагыдан 4% төмөн. Ликвиддүүлүк жогору.',
    credit_success_toast: 'Кредитке билдирме өнөктөш банкка ийгиликтүү жөнөтүлдү!',
    route_success_toast: 'Маршрут навигаторуңузда курулду!'
  },
  EN: {
    back: 'Back',
    vin_verified: 'VIN Verified',
    vip_badge: 'VIP Listing',
    dealer_verified: 'Verified Dealer',
    views: 'views',
    favorites: 'in favorites',
    share: 'Share',
    specs_title: 'Specifications',
    desc_title: 'Vehicle Description',
    read_more: 'Read More',
    read_less: 'Read Less',
    equipment_title: 'Equipment & Features',
    dealer_card_title: 'Seller Information',
    dealer_verified_label: 'Official AutoHub Dealer',
    years_on_platform: 'years on platform',
    total_cars: 'cars in stock',
    btn_call: 'Call',
    btn_whatsapp: 'Write on WhatsApp',
    btn_telegram: 'Telegram',
    btn_chat: 'AutoHub Live Chat',
    btn_dealer_profile: 'Dealer Profile',
    location_title: 'Vehicle Location',
    btn_route: 'Calculate Route',
    nearby_services: 'Nearby Services',
    calc_title: 'Financing Calculator',
    down_payment: 'Down Payment',
    loan_term: 'Loan Term',
    months: 'months',
    monthly_payment: 'Monthly Payment',
    interest_rate: 'Interest Rate',
    btn_apply_loan: 'Apply for Auto Loan',
    similar_title: 'Similar Vehicles',
    safety_title: 'AutoHub Safety Guarantee',
    safety_desc: 'We have conducted a thorough legal and technical inspection of this vehicle.',
    vin_checked: 'VIN-code cross-checked via State Registry',
    docs_checked: 'Documents and pledges verified',
    seller_verified: 'Seller identity verified',
    no_fees: 'No hidden platform fees',
    customs_yes: 'Customs cleared in KG',
    customs_no: 'Not cleared',
    steering_left: 'Left',
    steering_right: 'Right',
    cond_excellent: 'Excellent',
    owners_count: 'Owners count',
    steering_wheel: 'Steering Wheel',
    customs: 'Customs Cleared',
    condition: 'Condition',
    owners: 'Owners',
    share_toast: 'Link copied to clipboard!',
    nearby_gas: 'Gas station Red Petroleum (200m)',
    nearby_wash: 'Detailing Wash AutoSpa (450m)',
    nearby_service: 'Repair shop AutoHub-STO (800m)',
    ai_advisor_btn: '🤖 Ask AI Assistant about this vehicle',
    ai_advisor_p1: 'AI Analysis: Price is 4% below market average. High market liquidity.',
    credit_success_toast: 'Loan application submitted successfully to our partner bank!',
    route_success_toast: 'Route calculated and opened in your navigation app!'
  }
};

export default function VehicleDetailsPage({ 
  car, 
  allCars, 
  lang, 
  favorites, 
  toggleFavorite, 
  onClose, 
  onSelectCar,
  isAdminDark 
}: VehicleDetailsPageProps) {
  const t = DETAIL_T[lang];

  // Images state
  const carImages = useMemo(() => {
    // Generate 5 premium related images based on the main image to simulate a complete gallery
    return [
      car.image,
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1200', // Premium action details
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200', // Luxurious interior dashboard
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200', // Modern details / steering wheel
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200'  // Glossy tail light
    ];
  }, [car.image]);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [aiAnalysisOpen, setAiAnalysisOpen] = useState(false);

  // Financing states
  const [downPayment, setDownPayment] = useState<number>(Math.round(car.price * 0.2));
  const [loanTerm, setLoanTerm] = useState<number>(36); // months
  const interestRate = 12.5; // Annual rate in %

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImgIdx(0);
    setDescExpanded(false);
    setAiAnalysisOpen(false);
  }, [car]);

  // Swipe gesture simulation variables
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left - next image
      setActiveImgIdx(prev => (prev + 1) % carImages.length);
    }
    if (touchEndX - touchStartX > 50) {
      // Swipe right - previous image
      setActiveImgIdx(prev => (prev - 1 + carImages.length) % carImages.length);
    }
  };

  // Monthly Loan Calculation
  const monthlyPaymentAmount = useMemo(() => {
    const loanAmount = car.price - downPayment;
    if (loanAmount <= 0) return 0;
    const monthlyRate = (interestRate / 100) / 12;
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    return isNaN(payment) ? 0 : Math.round(payment);
  }, [car.price, downPayment, loanTerm]);

  // Total Interest Calculation
  const totalInterestAmount = useMemo(() => {
    const loanAmount = car.price - downPayment;
    if (loanAmount <= 0) return 0;
    return Math.round((monthlyPaymentAmount * loanTerm) - loanAmount);
  }, [car.price, downPayment, loanTerm, monthlyPaymentAmount]);

  // Price Conversions (KGS Rate is hardcoded to 89.5 som per 1 USD)
  const priceKGS = useMemo(() => {
    return car.price * 89.5;
  }, [car.price]);

  // Share action
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(t.share_toast);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Toast helper
  const triggerToastMessage = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Similar Cars
  const similarCars = useMemo(() => {
    return allCars
      .filter(c => c.id !== car.id && (c.brand === car.brand || Math.abs(c.price - car.price) < 15000))
      .slice(0, 6);
  }, [allCars, car]);

  // Features by category
  const equipmentCategories = useMemo(() => {
    return [
      {
        title: lang === 'RU' ? 'Безопасность' : lang === 'KG' ? 'Коопсуздук' : 'Safety',
        items: [
          'ABS (Антиблокировочная система)',
          'ESP (Система курсовой устойчивости)',
          '12 Airbags (Подушек безопасности)',
          'Крепления детских сидений ISOFIX',
          'Система мониторинга слепых зон',
          'Датчик контроля давления в шинах'
        ]
      },
      {
        title: lang === 'RU' ? 'Комфорт' : lang === 'KG' ? 'Ыңгайлуулук' : 'Comfort',
        items: [
          'Круиз-контроль (Adaptive Cruise)',
          'Климат-контроль (4-зонный)',
          'Бесключевой доступ Keyless-Go',
          'Обогрев и вентиляция всех сидений',
          'Панорамная крыша с люком',
          'Электропривод багажника с сенсором'
        ]
      },
      {
        title: lang === 'RU' ? 'Мультимедиа' : lang === 'KG' ? 'Мультимедиа' : 'Multimedia',
        items: [
          'Премиальный звук Bose Sound System',
          'Беспроводной Apple CarPlay & Android Auto',
          'Сенсорный дисплей 15" с навигацией',
          'Беспроводная зарядка для смартфонов',
          'Голосовой помощник с AI',
          'Bluetooth, 4 порта USB-C'
        ]
      },
      {
        title: lang === 'RU' ? 'Интерьер' : lang === 'KG' ? 'Интерьер' : 'Interior',
        items: [
          'Кожаный салон из кожи Nappa',
          'Атермальное остекление',
          'Амбиентная контурная подсветка (64 цвета)',
          'Мультифункциональное рулевое колесо',
          'Отделка натуральным деревом/карбоном',
          'Память настроек водительского сиденья'
        ]
      },
      {
        title: lang === 'RU' ? 'Экстерьер' : lang === 'KG' ? 'Экстерьер' : 'Exterior',
        items: [
          'Светодиодные фары Matrix LED',
          'Легкосплавные диски R20 Sport',
          'Тонированные задние стекла',
          'Складывающиеся боковые зеркала с подогревом',
          'Аэродинамический спортивный обвес',
          'Противотуманные фары'
        ]
      },
      {
        title: lang === 'RU' ? 'Ассистенты водителя' : lang === 'KG' ? 'Айдоочуга жардам' : 'Driver Assistance',
        items: [
          'Камера 360 градусов с 3D видом',
          'Парктроники передние и задние',
          'Проекция на лобовое стекло (HUD)',
          'Система удержания в полосе движения',
          'Автоматическое экстренное торможение',
          'Ассистент движения в пробках'
        ]
      }
    ];
  }, [lang]);

  const isFavorite = favorites.includes(car.id);

  return (
    <div className={`min-h-screen py-6 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-200 ${isAdminDark ? 'bg-[#0A0A0C] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Toast message wrapper */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-6 py-3.5 rounded-full shadow-2xl border border-blue-400/25 font-bold text-xs flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-800/10 pb-4">
        <button 
          onClick={onClose}
          className={`flex items-center space-x-2 text-sm font-bold tracking-wide py-2 px-4 rounded-xl border transition-all ${
            isAdminDark 
              ? 'bg-[#121216] border-gray-800 text-gray-300 hover:text-white hover:border-gray-700' 
              : 'bg-white border-gray-200 text-gray-700 hover:text-black hover:border-gray-300'
          }`}
          id="btn-back-to-catalog"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </button>

        <div className="flex items-center space-x-2">
          {car.featured && (
            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{t.vip_badge}</span>
            </span>
          )}
          <span className="bg-blue-600/10 text-blue-400 border border-blue-600/20 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.vin_verified}</span>
          </span>
        </div>
      </div>

      {/* Grid container layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Gallery, Specs, Description, Equipment, Map */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Large Premium Image Gallery */}
          <div className="relative group rounded-3xl overflow-hidden shadow-xl border border-gray-800/10 bg-black/5">
            
            {/* Main Image Container with zoom on hover */}
            <div 
              className="relative h-64 sm:h-96 md:h-[480px] overflow-hidden cursor-zoom-in"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={() => setIsFullscreen(true)}
            >
              <img 
                src={carImages[activeImgIdx]} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Navigation Arrows inside gallery */}
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => (prev - 1 + carImages.length) % carImages.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setActiveImgIdx(prev => (prev + 1) % carImages.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Maximize Icon */}
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
                className="absolute right-4 bottom-4 bg-black/55 hover:bg-black/75 text-white p-2.5 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center gap-1.5 text-xs font-bold"
              >
                <Maximize2 className="w-4 h-4" />
                <span>{lang === 'RU' ? 'Развернуть' : 'Fullscreen'}</span>
              </button>

              {/* Swipe guidance on mobile */}
              <div className="absolute left-4 bottom-4 bg-black/30 text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-lg backdrop-blur-md md:hidden pointer-events-none">
                ← Swipe to explore →
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className={`p-4 flex gap-3 overflow-x-auto select-none ${isAdminDark ? 'bg-[#111115]' : 'bg-white'}`}>
              {carImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImgIdx(index)}
                  className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                    activeImgIdx === index ? 'border-blue-500 scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

          </div>

          {/* 2. Vehicle Header & Main Title Block */}
          <div className="text-left space-y-4">
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{car.brand}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  <span className="text-xs text-gray-400 font-semibold">{car.generation || 'Generation V'}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
                  {car.brand} {car.model}
                </h1>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    <span>{car.year} {lang === 'RU' ? 'год выпуска' : 'жылы'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    <span>{184 + (car.popularity * 4)} {t.views}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>{24 + Math.round(car.popularity / 2)} {t.favorites}</span>
                  </span>
                </p>
              </div>

              {/* Pricing section - Large and dual-currency KGS and USD */}
              <div className={`p-5 rounded-2xl border text-right min-w-[200px] ${
                isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
              }`}>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{lang === 'RU' ? 'Итоговая цена' : 'Баасы'}</span>
                <div className="font-display text-3xl font-black text-blue-500">
                  ${car.price.toLocaleString()}
                </div>
                <div className="text-xs font-extrabold text-emerald-500 mt-1">
                  ≈ {Math.round(priceKGS).toLocaleString()} KGS (сом)
                </div>
                <span className="text-[9px] text-gray-400 block mt-1.5">1 USD = 89.50 KGS • ЦБ КР</span>
              </div>
            </div>

            {/* Quick action triggers: Favorite, Share */}
            <div className="flex flex-wrap gap-3 pt-2">
              
              <button 
                onClick={() => toggleFavorite(car.id)}
                className={`flex items-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
                  isFavorite 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                    : isAdminDark 
                      ? 'bg-[#111115] border-gray-800 text-gray-300 hover:text-white hover:border-gray-700' 
                      : 'bg-white border-gray-200 text-gray-700 hover:text-black hover:border-gray-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? (lang === 'RU' ? 'В избранном' : 'Тандоолордо') : (lang === 'RU' ? 'Добавить в избранное' : 'Тандоо')}</span>
              </button>

              <button 
                onClick={handleShare}
                className={`flex items-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
                  isAdminDark 
                    ? 'bg-[#111115] border-gray-800 text-gray-300 hover:text-white hover:border-gray-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:text-black hover:border-gray-300'
                }`}
              >
                <Share2 className="w-4 h-4 text-blue-400" />
                <span>{t.share}</span>
              </button>

              {/* Verified badge flags */}
              <div className="flex items-center gap-1.5 ml-auto text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                <span>Юридически чист</span>
              </div>

            </div>

          </div>

          {/* AI Advisor Assistant block */}
          <div className="bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-500/20 rounded-2xl p-5 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.ai_advisor_btn}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">AutoHub AI-Copilot Core Analytics Engine</p>
                </div>
              </div>
              <button 
                onClick={() => setAiAnalysisOpen(!aiAnalysisOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3.5 rounded-lg transition-all"
              >
                {aiAnalysisOpen ? 'Close' : 'Analyze'}
              </button>
            </div>
            {aiAnalysisOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-blue-500/10 text-xs text-gray-300 space-y-2 leading-relaxed"
              >
                <p>📍 <strong>{t.ai_advisor_p1}</strong></p>
                <p>📊 <strong>Рыночный анализ:</strong> Средняя цена аналогичных моделей {car.brand} {car.model} {car.year} в КР составляет ${{ ...car }.price + 1400}. Данное предложение выгоднее среднерыночного.</p>
                <p>⚙️ <strong>Проверка фото:</strong> AI подтверждает подлинность снимков на 99.8%. Водяные знаки сторонних ресурсов не обнаружены.</p>
              </motion.div>
            )}
          </div>

          {/* 3. Quick Specifications Grid (12 beautiful cards) */}
          <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold tracking-tight">{t.specs_title}</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { label: lang === 'RU' ? 'Год выпуска' : 'Жылы', value: car.year, icon: Calendar, color: 'text-blue-500' },
                { label: lang === 'RU' ? 'Пробег' : 'Пробег', value: `${car.mileage.toLocaleString()} км`, icon: Gauge, color: 'text-emerald-500' },
                { label: lang === 'RU' ? 'Топливо' : 'Күйүүчү май', value: car.fuelType[lang], icon: Droplet, color: 'text-red-500' },
                { label: lang === 'RU' ? 'Объем двигателя' : 'Кыймылдаткыч', value: car.engine, icon: Zap, color: 'text-yellow-500' },
                { label: lang === 'RU' ? 'Трансмиссия' : 'Коробка', value: car.transmission[lang], icon: Settings, color: 'text-purple-500' },
                { label: lang === 'RU' ? 'Привод' : 'Тартуусу', value: car.drive[lang], icon: Compass, color: 'text-teal-500' },
                { label: lang === 'RU' ? 'Кузов' : 'Кузов', value: car.bodyType[lang], icon: Award, color: 'text-cyan-500' },
                { label: lang === 'RU' ? 'Цвет' : 'Түсү', value: car.color[lang], icon: Palette, color: 'text-indigo-500' },
                { label: t.steering_wheel, value: car.id.charCodeAt(0) % 2 === 0 ? t.steering_left : t.steering_right, icon: Navigation, color: 'text-orange-500' },
                { label: t.customs, value: t.customs_yes, icon: ShieldCheck, color: 'text-emerald-400' },
                { label: t.condition, value: t.cond_excellent, icon: Smile, color: 'text-pink-500' },
                { label: t.owners, value: `${(car.id.charCodeAt(0) % 2) + 1} владелец`, icon: User, color: 'text-indigo-400' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between transition-all hover:scale-[1.01] ${
                    isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</span>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className="text-sm font-extrabold">{item.value}</span>
                </div>
              ))}
            </div>

          </div>

          {/* 4. Vehicle Description Card */}
          <div className={`p-6 rounded-3xl border text-left ${
            isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-lg font-bold tracking-tight mb-3">{t.desc_title}</h3>
            
            <div className="text-xs text-gray-400 leading-relaxed font-medium space-y-2">
              <p className={descExpanded ? '' : 'line-clamp-3'}>
                {car.description[lang]}
              </p>
              {!descExpanded && (
                <p className="opacity-90">
                  {lang === 'RU' ? 'Автомобиль прошел полный цикл предпродажной подготовки. Техническое состояние идеальное, ходовая часть без нареканий, двигатель работает ровно. Салон чистый, не прокуренный, кожа без трещин. Один аккуратный владелец в КР.'
                                : 'Унаа толук даярдыктан өттү. Техникалык абалы эң сонун, кыймылдаткычы бир калыпта иштейт. Салону таза, булгаарысы бузулган эмес. КРда бир гана ээси болгон.'}
                </p>
              )}
            </div>

            <button 
              onClick={() => setDescExpanded(!descExpanded)}
              className="mt-3.5 text-blue-500 text-xs font-extrabold hover:underline flex items-center space-x-1"
            >
              <span>{descExpanded ? t.read_less : t.read_more}</span>
              <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${descExpanded ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>

          {/* 5. Equipment & Features by category */}
          <div className="text-left space-y-4">
            <h3 className="text-lg font-bold tracking-tight">{t.equipment_title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipmentCategories.map((cat, idx) => (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border ${
                    isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
                  }`}
                >
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-blue-500 mb-3 pb-1 border-b border-gray-800/10">
                    {cat.title}
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center space-x-2.5 text-gray-400 font-medium">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className={`${isAdminDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

          {/* 7. Location Section (Simulated 2GIS Map) */}
          <div className="text-left space-y-4">
            <h3 className="text-lg font-bold tracking-tight">{t.location_title}</h3>

            <div className={`p-6 rounded-3xl border ${
              isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-gray-400">{car.city[lang]}, Кыргызстан</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">
                    {car.city[lang] === 'Бишкек' || car.city[lang] === 'Bishkek' 
                      ? 'ул. Ибраимова 115 / ул. Токтогула' 
                      : car.city[lang] === 'Ош' || car.city[lang] === 'Osh' 
                        ? 'ул. Ленина 42' 
                        : 'ул. Манаса 7'}
                  </h4>
                </div>

                <button 
                  onClick={() => triggerToastMessage(t.route_success_toast)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center space-x-2 self-start sm:self-auto"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t.btn_route}</span>
                </button>
              </div>

              {/* Vector representation of 2GIS map */}
              <div className="h-60 rounded-2xl bg-[#18181F] relative overflow-hidden border border-gray-800 flex items-center justify-center">
                
                {/* Simulated Grid / Map markings */}
                <div className="absolute inset-0 bg-[radial-gradient(#222533_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                
                {/* Simulated streets lines */}
                <div className="absolute top-1/2 left-0 right-0 h-10 bg-[#1e1e24] -translate-y-1/2" />
                <div className="absolute left-1/3 top-0 bottom-0 w-10 bg-[#1e1e24]" />
                
                {/* Simulated 2GIS Map Details */}
                <div className="absolute top-1/3 left-10 bg-blue-600/15 text-blue-400 px-3 py-1 border border-blue-600/30 rounded text-[9px] font-bold">
                  БЦ "Авангард"
                </div>

                <div className="absolute bottom-12 right-12 bg-gray-800/60 text-gray-300 px-2.5 py-1 rounded text-[8px]">
                  Red Petroleum АЗС
                </div>

                {/* Animated Destination Pin */}
                <div className="absolute top-1/2 left-1/3 -translate-y-5 -translate-x-3 text-center flex flex-col items-center">
                  <div className="bg-red-600 text-white p-2.5 rounded-full shadow-lg border border-white animate-bounce">
                    <Map className="w-4.5 h-4.5" />
                  </div>
                  <span className="bg-black/80 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-md mt-1 border border-gray-800">
                    AutoHub AutoHouse
                  </span>
                </div>

                {/* Watermark 2GIS label */}
                <div className="absolute bottom-3 left-3 bg-[#00A13A] text-white font-extrabold text-[10px] py-1 px-2.5 rounded-lg">
                  2GIS MAPS
                </div>
              </div>

              {/* Nearby list services */}
              <div className="mt-4 pt-4 border-t border-gray-800/10">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">{t.nearby_services}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center space-x-2 text-gray-400 font-semibold bg-gray-50/5 p-2.5 rounded-xl border border-gray-800/10">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>{t.nearby_gas}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 font-semibold bg-gray-50/5 p-2.5 rounded-xl border border-gray-800/10">
                    <Wrench className="w-4 h-4 text-blue-500" />
                    <span>{t.nearby_wash}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 font-semibold bg-gray-50/5 p-2.5 rounded-xl border border-gray-800/10">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{t.nearby_service}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* 10. Safety Section */}
          <div className={`p-6 rounded-3xl border text-left ${
            isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-extrabold tracking-tight">{t.safety_title}</h3>
                <p className="text-xs text-gray-400 mt-1">{t.safety_desc}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 text-xs">
                  {[
                    { label: t.vin_checked, desc: 'KG • Verification code validated' },
                    { label: t.docs_checked, desc: 'No financial limits, active lien or arrest' },
                    { label: t.seller_verified, desc: 'AutoHub authenticated dealership or user' },
                    { label: t.no_fees, desc: 'We never impose stealth commissions or charges' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">{item.label}</span>
                        <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Price box, Dealer Card, Calculator */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 6. Dealer Information Card */}
          <div className={`p-6 rounded-3xl border text-left space-y-5 shadow-sm ${
            isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t.dealer_card_title}</span>
              <span className="text-[10px] bg-blue-600/10 text-blue-400 border border-blue-600/20 font-black uppercase px-2 py-1 rounded-md">
                Verified Dealership
              </span>
            </div>

            <div className="flex items-center space-x-3.5">
              {/* Dealer Logo */}
              <div className="w-14 h-14 bg-[#0B3D91] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {car.dealer.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-extrabold">{car.dealer}</h4>
                <div className="flex items-center space-x-1.5 mt-1">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-black ml-0.5">4.9</span>
                  </div>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-xs text-gray-400 font-bold">142 reviews</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs border-t border-b border-gray-800/10 py-3.5 my-1 font-semibold text-gray-400">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Experience</span>
                <span className="text-white font-extrabold mt-0.5 block">3 {t.years_on_platform}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase block">Active fleet</span>
                <span className="text-white font-extrabold mt-0.5 block">18 {t.total_cars}</span>
              </div>
            </div>

            {/* Dealer Communication Actions */}
            <div className="space-y-2.5">
              
              <a 
                href={`tel:${car.phoneNumber}`}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-blue-900/15"
              >
                <Phone className="w-4.5 h-4.5" />
                <span>{t.btn_call} ({car.phoneNumber})</span>
              </a>

              <a 
                href={`https://wa.me/${car.whatsappNumber.replace(/\+/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all"
              >
                <MessageSquare className="w-4.5 h-4.5 fill-current" />
                <span>{t.btn_whatsapp}</span>
              </a>

              <a 
                href="https://t.me/autohub_kg"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all"
              >
                <Send className="w-4.5 h-4.5" />
                <span>{t.btn_telegram}</span>
              </a>

              <button 
                onClick={() => triggerToastMessage(lang === 'RU' ? 'Чат временно недоступен. Напишите в WhatsApp!' : 'Чат убактылуу иштебейт. WhatsApp аркылуу жазыңыз!')}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 font-bold py-3 px-4 rounded-xl text-xs transition-all"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span>{t.btn_chat}</span>
              </button>

              <button 
                onClick={() => triggerToastMessage(lang === 'RU' ? 'Переход на страницу дилера...' : 'Дилердин баракчасына өтүү...')}
                className="w-full text-center text-xs text-blue-500 font-bold hover:underline block pt-2"
              >
                {t.btn_dealer_profile}
              </button>
            </div>

          </div>

          {/* 8. Financing Loan Calculator Card */}
          <div className={`p-6 rounded-3xl border text-left space-y-4 shadow-sm ${
            isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-blue-500">
                <Calculator className="w-5 h-5" />
                <h4 className="text-sm font-bold uppercase tracking-wider">{t.calc_title}</h4>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">12.5% p.a.</span>
            </div>

            {/* Downpayment Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-gray-400">
                <span>{t.down_payment}</span>
                <span className="text-white font-black">${downPayment.toLocaleString()}</span>
              </div>
              <input 
                type="range"
                min={0}
                max={car.price}
                step={500}
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Term Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-gray-400">
                <span>{t.loan_term}</span>
                <span className="text-white font-black">{loanTerm} {t.months}</span>
              </div>
              <input 
                type="range"
                min={12}
                max={84}
                step={12}
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>12 {t.months}</span>
                <span>48 {t.months}</span>
                <span>84 {t.months}</span>
              </div>
            </div>

            {/* Outcome Computations info */}
            <div className="bg-[#181822] rounded-2xl p-4 space-y-3 border border-gray-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-semibold">{t.monthly_payment}</span>
                <span className="text-base font-black text-blue-500">${monthlyPaymentAmount.toLocaleString()}/{lang === 'RU' ? 'мес' : 'ай'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-semibold">{t.interest_rate}</span>
                <span className="text-white font-bold">{interestRate}%</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-800">
                <span className="text-gray-500 font-semibold">Начисленные проценты</span>
                <span className="text-emerald-500 font-bold">${totalInterestAmount.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => triggerToastMessage(t.credit_success_toast)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-lg shadow-blue-900/15"
            >
              {t.btn_apply_loan}
            </button>

          </div>

        </div>

      </div>

      {/* 9. Similar Cars Section (Horizontal carousel) */}
      {similarCars.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-800/10 text-left space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold tracking-tight">{t.similar_title}</h3>
              <p className="text-xs text-gray-400 mt-1">Based on brand premium matching criteria</p>
            </div>
            
            <div className="flex space-x-2">
              <span className="text-xs font-bold text-gray-500">AutoHub Match Engine</span>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-800">
            {similarCars.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectCar(item)}
                className={`w-64 shrink-0 rounded-2xl border overflow-hidden cursor-pointer transition-all hover:scale-[1.01] hover:border-blue-500/30 ${
                  isAdminDark ? 'bg-[#111116] border-gray-800' : 'bg-white border-gray-200'
                }`}
              >
                <div className="h-36 relative">
                  <img src={item.image} alt={item.brand} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-2.5 right-2.5 bg-black/60 text-white text-[9px] font-black uppercase px-2 py-1 rounded">
                    ${item.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h4 className="font-bold text-xs truncate">{item.brand} {item.model}</h4>
                  <p className="text-[10px] text-gray-400 mt-1 font-semibold">
                    {item.year} • {item.mileage.toLocaleString()} км • {item.city[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Gallery View Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-[110] bg-black flex flex-col justify-between p-4">
            {/* Upper control header */}
            <div className="flex justify-between items-center text-white">
              <span className="text-xs font-bold font-mono">
                {activeImgIdx + 1} / {carImages.length}
              </span>

              <button 
                onClick={() => setIsFullscreen(false)}
                className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-md transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Giant fullscreen image */}
            <div className="relative flex-1 flex items-center justify-center">
              
              <button 
                onClick={() => setActiveImgIdx(prev => (prev - 1 + carImages.length) % carImages.length)}
                className="absolute left-4 w-12 h-12 bg-white/5 hover:bg-white/15 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/5"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <img 
                src={carImages[activeImgIdx]} 
                alt="Fullscreen vehicle view" 
                className="max-h-[80vh] max-w-full object-contain"
                referrerPolicy="no-referrer"
              />

              <button 
                onClick={() => setActiveImgIdx(prev => (prev + 1) % carImages.length)}
                className="absolute right-4 w-12 h-12 bg-white/5 hover:bg-white/15 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/5"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

            </div>

            {/* Bottom thumbnail row inside fullscreen */}
            <div className="flex justify-center gap-2 pb-6 overflow-x-auto max-w-lg mx-auto">
              {carImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImgIdx(index)}
                  className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 ${
                    activeImgIdx === index ? 'border-blue-500' : 'border-transparent opacity-55'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
