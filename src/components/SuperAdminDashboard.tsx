import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Users, 
  Building2, 
  Car as CarIcon, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Star, 
  BarChart3, 
  CreditCard, 
  Bell, 
  Settings as SettingsIcon, 
  Search, 
  Filter, 
  Trash2, 
  Lock, 
  Mail, 
  Phone, 
  Globe, 
  Check, 
  Sparkles, 
  Sun, 
  Moon, 
  Languages, 
  ArrowLeft, 
  MapPin, 
  ArrowUpRight, 
  CloudLightning, 
  Cpu, 
  Eye, 
  RefreshCw,
  Wallet,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Language } from '../types';
import { LogoIcon } from './Logo';

interface SuperAdminDashboardProps {
  lang: Language;
  setLang: (lang: Language) => void;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  onBackToCatalog: () => void;
}

// Translations for Admin Panel
const ADMIN_T = {
  RU: {
    back: 'Вернуться на сайт',
    title: 'Super Admin',
    subtitle: 'Национальная автомобильная платформа Кыргызстана',
    login_title: 'Панель управления суперадминистратора',
    login_subtitle: 'Безопасный доступ к ядру AutoHub Kyrgyzstan',
    email_label: 'Email Администратора',
    password_label: 'Пароль',
    tfa_label: 'Код двухфакторной аутентификации (2FA)',
    tfa_placeholder: 'Введите 6-значный код из Google Authenticator',
    btn_login: 'Авторизоваться',
    btn_demo: '⚡ Быстрый демо-вход',
    forgot_password: 'Восстановить доступ',
    auth_success: 'Администратор успешно авторизован!',
    theme_dark: 'Темная тема',
    theme_light: 'Светлая тема',
    stats_cars: 'Всего автомобилей',
    stats_dealers: 'Автосалоны',
    stats_users: 'Пользователи',
    stats_active: 'Активно объявлений',
    stats_sold: 'Проданные авто',
    stats_leads: 'Заявки за сегодня',
    stats_revenue: 'Доход платформы',
    stats_new_users: 'Новые регистрации',
    tab_dashboard: 'Панель управления',
    tab_vehicles: 'Автомобили',
    tab_dealers: 'Автосалоны',
    tab_users: 'Пользователи',
    tab_listings: 'Объявления',
    tab_leads: 'Заявки',
    tab_messages: 'Сообщения',
    tab_reviews: 'Отзывы',
    tab_analytics: 'Аналитика',
    tab_subscriptions: 'Подписки',
    tab_payments: 'Платежи',
    tab_notifications: 'Уведомления',
    tab_settings: 'Настройки',
    tab_ai_core: '🤖 AI Ядро',
    map_title: 'Интерактивная карта активности AutoHub KG',
    map_subtitle: 'Кликните на регион для детального анализа',
    region_chuy: 'Чуйская область (Бишкек)',
    region_issykkul: 'Иссык-Кульская область',
    region_osh: 'Ошская область',
    region_jalalabad: 'Джалал-Абадская область',
    region_naryn: 'Нарынская область',
    region_talas: 'Таласская область',
    region_batken: 'Баткенская область',
    btn_approve: 'Одобрить',
    btn_decline: 'Отклонить',
    btn_block: 'Заблокировать',
    btn_unblock: 'Разблокировать',
    btn_delete: 'Удалить',
    btn_edit: 'Редактировать',
    btn_verify: 'Верифицировать',
    status_verified: 'Проверен',
    status_pending: 'Ожидает проверки',
    status_blocked: 'Заблокирован',
    status_active: 'Активен',
    search_placeholder: 'Поиск по марке, названию или почте...',
    toast_settings_saved: 'Настройки платформы успешно сохранены!',
    settings_save: 'Сохранить настройки',
    ai_mod_title: '🤖 AI Автомодерация',
    ai_mod_desc: 'Автоматический анализ объявлений, распознавание водяных знаков и цензура на фото.',
    ai_photo_scan_running: 'AI сканирует изображение...',
    ai_photo_scan_success: 'Изображение успешно прошло проверку модерации!',
    ai_pred_title: '🤖 AI Прогноз продаж',
    ai_pred_desc: 'Интеллектуальное прогнозирование спроса на автомобили в КР.',
    credit_title: '🏦 Модуль Автокредитования',
    insurance_title: '🛡 Модуль Автострахования',
    calc_credit_btn: 'Рассчитать кредит',
    calc_insurance_btn: 'Оформить полис'
  },
  KG: {
    back: 'Сайтка кайтуу',
    title: 'Super Admin',
    subtitle: 'Кыргызстандын улуттук санарип авто платформасы',
    login_title: 'Суперадминистратордун башкаруу панели',
    login_subtitle: 'AutoHub Kyrgyzstan өзөгүнө коопсуз кирүү',
    email_label: 'Администратордун электрондук почтасы',
    password_label: 'Сөз айкашы (пароль)',
    tfa_label: 'Эки факторлуу аутентификация коду (2FA)',
    tfa_placeholder: 'Google Authenticator\'дон 6 орундуу кодду киргизиңиз',
    btn_login: 'Кирүү',
    btn_demo: '⚡ Тез демо-кирүү',
    forgot_password: 'Кирүүнү калыбына келтирүү',
    auth_success: 'Администратор ийгиликтүү кирди!',
    theme_dark: 'Караңгы тема',
    theme_light: 'Жарык тема',
    stats_cars: 'Жалпы унаалар',
    stats_dealers: 'Автосалондор',
    stats_users: 'Колдонуучулар',
    stats_active: 'Активдүү кулактандыруулар',
    stats_sold: 'Сатылган унаалар',
    stats_leads: 'Бүгүнкү билдирүүлөр',
    stats_revenue: 'Платформа кирешеси',
    stats_new_users: 'Жаңы катталгандар',
    tab_dashboard: 'Башкаруу панели',
    tab_vehicles: 'Унаалар',
    tab_dealers: 'Автосалондор',
    tab_users: 'Колдонуучулар',
    tab_listings: 'Кулактандыруулар',
    tab_leads: 'Билдирмелер',
    tab_messages: 'Кабарлар',
    tab_reviews: 'Пикирлер',
    tab_analytics: 'Аналитика',
    tab_subscriptions: 'Жазылуулар',
    tab_payments: 'Төлөмдөр',
    tab_notifications: 'Билдирүүлөр',
    tab_settings: 'Жөндөөлөр',
    tab_ai_core: '🤖 AI Өзөгү',
    map_title: 'AutoHub KG активдүүлүгүнүн интерактивдүү картасы',
    map_subtitle: 'Кененирээк маалымат алуу үчүн аймакты басыңыз',
    region_chuy: 'Чүй облусу (Бишкек)',
    region_issykkul: 'Ысык-Көл облусу',
    region_osh: 'Ош облусу',
    region_jalalabad: 'Жалал-Абад облусу',
    region_naryn: 'Нарын облусу',
    region_talas: 'Талас облусу',
    region_batken: 'Баткен облусу',
    btn_approve: 'Уруксат берүү',
    btn_decline: 'Тетке кагуу',
    btn_block: 'Бөгөттөө',
    btn_unblock: 'Бөгөттөн чыгаруу',
    btn_delete: 'Өчүрүү',
    btn_edit: 'Өзгөртүү',
    btn_verify: 'Верификациялоо',
    status_verified: 'Текшерилди',
    status_pending: 'Текшерүү күтүлүүдө',
    status_blocked: 'Бөгөттөлдү',
    status_active: 'Активдүү',
    search_placeholder: 'Маркасы, аталышы же почтасы боюнча издөө...',
    toast_settings_saved: 'Платформа жөндөөлөрү ийгиликтүү сакталды!',
    settings_save: 'Жөндөөлөрдү сактоо',
    ai_mod_title: '🤖 AI Автомодерация',
    ai_mod_desc: 'Кулактандырууларды автоматтык түрдө талдоо, фотодогу логотиптерди таануу жана цензура.',
    ai_photo_scan_running: 'AI сүрөттү сканерлеп жатат...',
    ai_photo_scan_success: 'Сүрөт модерациядан ийгиликтүү өттү!',
    ai_pred_title: '🤖 AI Сатуу болжолдоосу',
    ai_pred_desc: 'Кыргызстандагы унааларга болгон суроо-талапты акылдуу болжолдоо.',
    credit_title: '🏦 Автокредиттөө модулу',
    insurance_title: '🛡 Автокамсыздандыруу модулу',
    calc_credit_btn: 'Кредитти эсептөө',
    calc_insurance_btn: 'Полис алуу'
  },
  EN: {
    back: 'Back to Site',
    title: 'Super Admin',
    subtitle: 'National Digital Automotive Platform of Kyrgyzstan',
    login_title: 'Super Admin Control Panel',
    login_subtitle: 'Secure Access to AutoHub Kyrgyzstan Core',
    email_label: 'Administrator Email',
    password_label: 'Password',
    tfa_label: 'Two-Factor Authentication (2FA) Code',
    tfa_placeholder: 'Enter 6-digit code from Google Authenticator',
    btn_login: 'Authorize',
    btn_demo: '⚡ Quick Demo Login',
    forgot_password: 'Recover Access',
    auth_success: 'Super Administrator successfully authorized!',
    theme_dark: 'Dark Theme',
    theme_light: 'Light Theme',
    stats_cars: 'Total Vehicles',
    stats_dealers: 'Dealerships',
    stats_users: 'Users Count',
    stats_active: 'Active Ads',
    stats_sold: 'Sold Cars',
    stats_leads: 'Leads Today',
    stats_revenue: 'Platform Revenue',
    stats_new_users: 'New Registrations',
    tab_dashboard: 'Overview',
    tab_vehicles: 'Vehicles',
    tab_dealers: 'Dealerships',
    tab_users: 'Users',
    tab_listings: 'Listings',
    tab_leads: 'Leads',
    tab_messages: 'Messages',
    tab_reviews: 'Reviews',
    tab_analytics: 'Analytics',
    tab_subscriptions: 'Subscriptions',
    tab_payments: 'Payments',
    tab_notifications: 'Notifications',
    tab_settings: 'Settings',
    tab_ai_core: '🤖 AI Core Portal',
    map_title: 'AutoHub KG Interactive Activity Map',
    map_subtitle: 'Click on a region for detailed metrics analysis',
    region_chuy: 'Chuy Region (Bishkek)',
    region_issykkul: 'Issyk-Kul Region',
    region_osh: 'Osh Region',
    region_jalalabad: 'Jalal-Abad Region',
    region_naryn: 'Naryn Region',
    region_talas: 'Talas Region',
    region_batken: 'Batken Region',
    btn_approve: 'Approve',
    btn_decline: 'Decline',
    btn_block: 'Block',
    btn_unblock: 'Unblock',
    btn_delete: 'Delete',
    btn_edit: 'Edit',
    btn_verify: 'Verify',
    status_verified: 'Verified',
    status_pending: 'Pending Approval',
    status_blocked: 'Blocked',
    status_active: 'Active',
    search_placeholder: 'Search by make, brand name, or email...',
    toast_settings_saved: 'Platform settings saved successfully!',
    settings_save: 'Save Settings',
    ai_mod_title: '🤖 AI Auto-Moderation',
    ai_mod_desc: 'Automated description check, plate recognition, watermark defense & safety filters.',
    ai_photo_scan_running: 'AI is scanning image...',
    ai_photo_scan_success: 'Image passed moderation audit successfully!',
    ai_pred_title: '🤖 AI Sales Forecasting',
    ai_pred_desc: 'Smart predictive algorithm of automobile demand trends across Kyrgyzstan.',
    credit_title: '🏦 Auto Loan Engine',
    insurance_title: '🛡 Auto Insurance Engine',
    calc_credit_btn: 'Calculate Loan',
    calc_insurance_btn: 'Get Policy'
  }
};

export default function SuperAdminDashboard({ lang, setLang, cars, setCars, onBackToCatalog }: SuperAdminDashboardProps) {
  // Authentication State
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isAdminDark, setIsAdminDark] = useState(true);

  // Forms login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tfa, setTfa] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);

  // Kyrgyzstan Map state
  const [selectedRegion, setSelectedRegion] = useState<string>('chuy');

  // AI Moderation playground state
  const [aiScanStatus, setAiScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scannedImage, setScannedImage] = useState<string>('https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600');

  // Interactive state lists for admin curation
  const [dealerships, setDealerships] = useState([
    { id: '1', name: 'Bishkek Motors', logo: '🏢', address: 'г. Бишкек, ул. Ибраимова 115', phone: '+996 555 111 222', cars: 12, status: 'verified', premium: true },
    { id: '2', name: 'Osh Elite Auto', logo: '🚗', address: 'г. Ош, ул. Ленина 42', phone: '+996 700 333 444', cars: 8, status: 'pending', premium: false },
    { id: '3', name: 'Karakol AutoHouse', logo: '🏔️', address: 'г. Каракол, ул. Токтогула 99', phone: '+996 772 555 666', cars: 5, status: 'verified', premium: false },
    { id: '4', name: 'Batken Transit', logo: '🚚', address: 'г. Баткен, ул. Нургазиева 12', phone: '+996 501 888 999', cars: 3, status: 'blocked', premium: false },
    { id: '5', name: 'Ala-Too Cars', logo: '⚡', address: 'г. Джалал-Абад, ул. Манаса 7', phone: '+996 550 444 333', cars: 15, status: 'verified', premium: true }
  ]);

  const [platformUsers, setPlatformUsers] = useState([
    { id: '1', name: 'Нурбек Саматов', email: 'nurbek.s@gmail.com', phone: '+996 705 123 456', role: 'Дилер / Менеджер', regDate: '12.05.2026', status: 'active' },
    { id: '2', name: 'Асель Осмонова', email: 'asel.osmon@mail.ru', phone: '+996 551 987 654', role: 'Частное лицо', regDate: '18.05.2026', status: 'active' },
    { id: '3', name: 'Иван Петров', email: 'ivan.p@yandex.ru', phone: '+996 770 445 566', role: 'Частное лицо', regDate: '01.06.2026', status: 'blocked' },
    { id: '4', name: 'Чынгыз Айтматов', email: 'chyngyz.dev@gmail.com', phone: '+996 502 333 444', role: 'Дилер / Владелец', regDate: '15.06.2026', status: 'active' },
    { id: '5', name: 'Айзада Бекбоева', email: 'aizada.b@autohub.kg', phone: '+996 559 111 000', role: 'Модератор', regDate: '29.06.2026', status: 'active' }
  ]);

  const [adminReviews, setAdminReviews] = useState([
    { id: '1', author: 'Бакыт', target: 'Bishkek Motors', rating: 5, text: 'Отличный сервис! Машина прошла полную проверку, оформили в тот же день.', status: 'approved' },
    { id: '2', author: 'Мария', target: 'Частное объявление', rating: 1, text: 'Мошенник! Просит предоплату на карту за просмотр машины. Заблокируйте!', status: 'pending' },
    { id: '3', author: 'Улан', target: 'Karakol AutoHouse', rating: 4, text: 'Хороший выбор, но цены немного выше средних по рынку.', status: 'approved' },
    { id: '4', author: 'Гость', target: 'Osh Elite Auto', rating: 2, text: 'Не отвечают на звонки, машина давно продана, а объявление висит.', status: 'pending' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: '1', type: 'dealer', message: 'Новый автосалон "Osh Elite Auto" зарегистрирован в системе.', time: '10 мин. назад', unread: true },
    { id: '2', type: 'listing', message: 'Новое объявление "Tesla Model 3 2024" ожидает модерации.', time: '25 мин. назад', unread: true },
    { id: '3', type: 'payment', message: 'Автосалон "Bishkek Motors" оплатил подписку Premium за Июль.', time: '1 час назад', unread: false },
    { id: '4', type: 'user', message: 'Жалоба на пользователя Иван Петров (подозрение на спам).', time: '3 часа назад', unread: false }
  ]);

  const [payments, setPayments] = useState([
    { id: 'TX-9021', dealer: 'Bishkek Motors', type: 'Подписка Premium (30 дней)', amount: 150, date: '14.07.2026', status: 'completed' },
    { id: 'TX-9022', dealer: 'Ala-Too Cars', type: 'Подписка Premium (90 дней)', amount: 400, date: '12.07.2026', status: 'completed' },
    { id: 'TX-9023', dealer: 'Osh Elite Auto', type: 'Поднятие в ТОП-10 (Tesla Y)', amount: 25, date: '11.07.2026', status: 'completed' },
    { id: 'TX-9024', dealer: 'Karakol AutoHouse', type: 'Пакет "Турбо-Продажи" x5', amount: 80, date: '10.07.2026', status: 'failed' }
  ]);

  // Fintech / Insurtech calculations
  const [creditPrice, setCreditPrice] = useState('25000');
  const [creditTerm, setCreditTerm] = useState('36');
  const [creditDownpayment, setCreditDownpayment] = useState('5000');
  const [creditResult, setCreditResult] = useState<number | null>(null);

  const [insuranceCarAge, setInsuranceCarAge] = useState('2018');
  const [insuranceEngine, setInsuranceEngine] = useState('2.5');
  const [insuranceResult, setInsuranceResult] = useState<number | null>(null);

  // Settings State
  const [platformName, setPlatformName] = useState('AutoHub Kyrgyzstan');
  const [seoTitle, setSeoTitle] = useState('Купить авто в Кыргызстане | Самый современный автопортал AutoHub.kg');
  const [seoDescription, setSeoDescription] = useState('Поиск и продажа автомобилей в Бишкеке, Оше и по всему Кыргызстану. Самый быстрый и безопасный сервис.');
  const [supportPhone, setSupportPhone] = useState('+996 555 999 888');

  // Translation key shortcut
  const t = ADMIN_T[lang];

  // Helper Toast
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Auth Submit
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminAuth(true);
    triggerToast(t.auth_success);
  };

  const handleDemoAuth = () => {
    setIsAdminAuth(true);
    triggerToast(t.auth_success);
  };

  // Interactive KG regions mapping metrics
  const REGION_METRICS: Record<string, { title: string, dealers: number, listings: number, services: number, avgPrice: string }> = {
    chuy: { title: lang === 'RU' ? 'Чуйская область & Бишкек' : lang === 'KG' ? 'Чүй облусу & Бишкек' : 'Chuy Region & Bishkek', dealers: 18, listings: 1420, services: 45, avgPrice: '$18,500' },
    issykkul: { title: lang === 'RU' ? 'Иссык-Кульская область' : lang === 'KG' ? 'Ысык-Көл облусу' : 'Issyk-Kul Region', dealers: 4, listings: 280, services: 12, avgPrice: '$11,200' },
    osh: { title: lang === 'RU' ? 'Ошская область & Ош' : lang === 'KG' ? 'Ош облусу & Ош' : 'Osh Region & Osh', dealers: 9, listings: 680, services: 22, avgPrice: '$14,900' },
    jalalabad: { title: lang === 'RU' ? 'Джалал-Абадская область' : lang === 'KG' ? 'Жалал-Абад облусу' : 'Jalal-Abad Region', dealers: 6, listings: 410, services: 15, avgPrice: '$13,400' },
    naryn: { title: lang === 'RU' ? 'Нарынская область' : lang === 'KG' ? 'Нарын облусу' : 'Naryn Region', dealers: 2, listings: 110, services: 4, avgPrice: '$8,900' },
    talas: { title: lang === 'RU' ? 'Талассская область' : lang === 'KG' ? 'Талас облусу' : 'Talas Region', dealers: 1, listings: 95, services: 3, avgPrice: '$9,300' },
    batken: { title: lang === 'RU' ? 'Баткенская область' : lang === 'KG' ? 'Баткен облусу' : 'Batken Region', dealers: 2, listings: 125, services: 5, avgPrice: '$10,100' }
  };

  // Status Modifiers
  const updateDealerStatus = (id: string, newStatus: string) => {
    setDealerships(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    triggerToast(lang === 'RU' ? 'Статус автосалона обновлен!' : 'Автосалондун статусу жаңыртылды!');
  };

  const deleteDealer = (id: string) => {
    setDealerships(prev => prev.filter(d => d.id !== id));
    triggerToast(lang === 'RU' ? 'Автосалон удален!' : 'Автосалон өчүрүлдү!');
  };

  const updateReviewStatus = (id: string, newStatus: string) => {
    setAdminReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    triggerToast(lang === 'RU' ? 'Статус отзыва изменен!' : 'Пикирдин статусу өзгөртүлдү!');
  };

  const deleteReview = (id: string) => {
    setAdminReviews(prev => prev.filter(r => r.id !== id));
    triggerToast(lang === 'RU' ? 'Отзыв удален из базы.' : 'Пикир өчүрүлдү.');
  };

  const updateUserStatus = (id: string, newStatus: string) => {
    setPlatformUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    triggerToast(lang === 'RU' ? 'Статус пользователя изменен!' : 'Колдонуучунун статусу өзгөрдү!');
  };

  // AI photo moderation simulation
  const startAiPhotoAnalysis = () => {
    setAiScanStatus('scanning');
    setTimeout(() => {
      setAiScanStatus('success');
      triggerToast(t.ai_photo_scan_success);
    }, 2000);
  };

  // Calculation formulas
  const calculateCredit = () => {
    const P = parseFloat(creditPrice) - parseFloat(creditDownpayment);
    const months = parseInt(creditTerm);
    if (isNaN(P) || P <= 0) {
      setCreditResult(0);
      return;
    }
    // Simple 14% annual auto credit rate
    const r = 0.14 / 12;
    const monthlyPayment = (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    setCreditResult(Math.round(monthlyPayment));
  };

  const calculateInsurance = () => {
    // Basic insurance estimate in Som/USD based on engine and age
    const base = 80; // Basic $80 annually
    const ageFactor = (2026 - parseInt(insuranceCarAge)) > 10 ? 1.5 : 1.0;
    const engineFactor = parseFloat(insuranceEngine) > 3.0 ? 1.4 : 1.0;
    setInsuranceResult(Math.round(base * ageFactor * engineFactor));
  };

  // Auto Moderation / Mass listing controls
  const handleBulkApproveListings = () => {
    setCars(prev => prev.map(c => ({ ...c, status: 'available' })));
    triggerToast(lang === 'RU' ? 'Все ожидающие объявления успешно одобрены AI модератором!' : 'Бардык күтүүдөгү жарыялар ийгиликтүү жактырылды!');
  };

  const handleBulkDeclineListings = () => {
    triggerToast(lang === 'RU' ? 'Подозрительные объявления отклонены.' : 'Шектүү кулактандыруулар четке кагылды.');
  };

  // Filter listings based on search
  const filteredCars = useMemo(() => {
    return cars.filter(c => 
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (c.dealer && c.dealer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [cars, searchQuery]);

  // Car list moderators
  const toggleCarStatus = (id: string, newStatus: 'available' | 'sold') => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    triggerToast(lang === 'RU' ? 'Статус объявления изменен!' : 'Жарыянын статусу өзгөртүлдү!');
  };

  const deleteCar = (id: string) => {
    setCars(prev => prev.filter(c => c.id !== id));
    triggerToast(lang === 'RU' ? 'Объявление удалено!' : 'Жарыя өчүрүлдү!');
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-200 ${isAdminDark ? 'bg-[#070708] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Toast notifications */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0B3D91] text-white px-6 py-3.5 rounded-full shadow-2xl border border-blue-400/20 font-bold text-xs flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN PORTAL (IF NOT AUTHENTICATED) */}
      {!isAdminAuth ? (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-[#070708]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-md bg-[#111115]/95 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10 text-white">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-[#0B3D91] rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-blue-900/30">
                <Shield className="w-9 h-9" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-center">{t.title} Kyrgyzstan</h1>
              <p className="text-xs text-gray-400 text-center mt-1.5 leading-relaxed">{t.login_subtitle}</p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">{t.email_label}</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@autohub.kg" 
                    className="w-full bg-[#18181c] border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500 text-white transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">{t.password_label}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-[#18181c] border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500 text-white transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">{t.tfa_label}</label>
                <input 
                  type="text" 
                  value={tfa}
                  onChange={(e) => setTfa(e.target.value)}
                  placeholder="e.g. 882 145" 
                  maxLength={7}
                  className="w-full bg-[#18181c] border border-gray-800 rounded-xl py-2.5 px-4 text-sm text-center font-mono focus:outline-none focus:border-blue-500 text-white transition-all tracking-widest"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-sm mt-4"
              >
                {t.btn_login}
              </button>
            </form>

            <div className="mt-4">
              <button 
                onClick={handleDemoAuth}
                className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center space-x-2"
              >
                <span>{t.btn_demo}</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <button onClick={() => triggerToast(lang === 'RU' ? 'Код восстановления отправлен суперадминистраторам!' : 'Калыбына келтирүү коду суперадминистраторго жөнөтүлдү!')} className="text-xs text-gray-400 hover:text-white transition-colors">
                {t.forgot_password}
              </button>
            </div>
          </div>

          <button 
            onClick={onBackToCatalog} 
            className="mt-8 flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>
        </div>
      ) : (
        /* SUPER ADMIN WORKSPACE */
        <div className="min-h-screen flex flex-col md:flex-row">
          
          {/* SIDEBAR FOR CODES */}
          <aside className={`w-full md:w-64 border-b md:border-b-0 md:border-r flex flex-col shrink-0 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
            <div className="p-6 border-b flex items-center justify-between border-inherit">
              <div className="flex items-center space-x-2.5">
                <LogoIcon size={36} />
                <div className="flex flex-col text-left">
                  <span className="font-sans font-black text-sm tracking-wider uppercase text-white leading-none">АСКАР АВТОХАБ</span>
                  <span className={`text-[8px] tracking-[0.25em] font-black block mt-1 leading-none ${isAdminDark ? 'text-red-400' : 'text-red-500'}`}>
                    SUPER ADMIN
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {[
                { id: 'dashboard', label: t.tab_dashboard, icon: Shield },
                { id: 'vehicles', label: t.tab_vehicles, icon: CarIcon },
                { id: 'dealers', label: t.tab_dealers, icon: Building2 },
                { id: 'users', label: t.tab_users, icon: Users },
                { id: 'reviews', label: t.tab_reviews, icon: Star },
                { id: 'analytics', label: t.tab_analytics, icon: BarChart3 },
                { id: 'payments', label: t.tab_payments, icon: Wallet },
                { id: 'notifications', label: t.tab_notifications, icon: Bell },
                { id: 'ai-core', label: t.tab_ai_core, icon: Sparkles, highlight: true },
                { id: 'settings', label: t.tab_settings, icon: SettingsIcon }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      isActive 
                        ? 'bg-red-600 text-white shadow-md shadow-red-900/20' 
                        : item.highlight
                          ? 'text-yellow-400 hover:bg-yellow-400/5 hover:text-yellow-300'
                          : isAdminDark 
                            ? 'text-gray-400 hover:bg-white/5 hover:text-white' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : item.highlight ? 'text-yellow-400' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Quick config settings inside sidebar */}
            <div className="p-4 border-t border-inherit space-y-3">
              <div className="flex items-center justify-between bg-inherit p-1 rounded-xl">
                <button 
                  onClick={() => setIsAdminDark(!isAdminDark)}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${isAdminDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}
                >
                  {isAdminDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>

              {/* Language switcher */}
              <div className="flex justify-between items-center gap-1 bg-inherit border border-inherit rounded-xl p-1">
                {(['KG', 'RU', 'EN'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 text-[10px] py-1 rounded-lg font-bold transition-all ${lang === l ? 'bg-[#0B3D91] text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button 
                onClick={onBackToCatalog}
                className="w-full bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </button>
            </div>
          </aside>

          {/* MAIN SPACE AREA */}
          <main className="flex-1 flex flex-col min-w-0">
            
            {/* Header top status */}
            <header className={`py-4 px-6 md:px-8 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between sticky top-0 z-20 ${isAdminDark ? 'bg-[#0d0d11]/80 border-gray-900 text-white' : 'bg-white/85 border-gray-200 text-gray-900'} backdrop-blur-md`}>
              <div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4.5 h-4.5 text-red-500" />
                  <h2 className="text-base font-extrabold tracking-tight uppercase">Super Admin Portal</h2>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{t.subtitle}</p>
              </div>

              <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                <div className="flex items-center space-x-2 bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full border border-red-500/20 text-xs font-bold">
                  <CloudLightning className="w-3.5 h-3.5" />
                  <span>National Core v3.0</span>
                </div>
              </div>
            </header>

            {/* TAB CONTAINER BODY */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                
                {/* 1. DASHBOARD OVERVIEW TAB */}
                {activeTab === 'dashboard' && (
                  <motion.div 
                    key="dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {/* STATS MATRIX */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      {[
                        { label: t.stats_cars, value: cars.length + 182, detail: '+24 today', icon: CarIcon, color: 'text-blue-500 bg-blue-500/10' },
                        { label: t.stats_dealers, value: dealerships.length, detail: '2 pending', icon: Building2, color: 'text-purple-500 bg-purple-500/10' },
                        { label: t.stats_users, value: platformUsers.length + 1402, detail: '+12 new today', icon: Users, color: 'text-emerald-500 bg-emerald-500/10' },
                        { label: t.stats_active, value: cars.filter(c => c.status === 'available').length + 80, detail: '80% verified', icon: Shield, color: 'text-cyan-500 bg-cyan-500/10' },
                        { label: t.stats_sold, value: cars.filter(c => c.status === 'sold').length + 42, detail: '18% rate', icon: CheckCircle, color: 'text-green-500 bg-green-500/10' },
                        { label: t.stats_leads, value: 45, detail: 'Average response: 3.2m', icon: MessageSquare, color: 'text-yellow-500 bg-yellow-500/10' },
                        { label: t.stats_revenue, value: '$4,280', detail: '+14% MoM', icon: DollarSign, color: 'text-teal-500 bg-teal-500/10' },
                        { label: t.stats_new_users, value: '29', detail: 'This week', icon: UserCheck, color: 'text-indigo-500 bg-indigo-500/10' },
                      ].map((card, idx) => (
                        <div 
                          key={idx} 
                          className={`border rounded-2xl p-5 shadow-sm transition-all hover:scale-[1.01] ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">{card.label}</span>
                            <div className={`p-2 rounded-xl ${card.color}`}>
                              <card.icon className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className={`text-2xl md:text-3xl font-extrabold ${isAdminDark ? 'text-white' : 'text-gray-900'}`}>{card.value}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{card.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* INTERACTIVE KYRGYZSTAN VECTOR GRID REGIONS */}
                    <div className={`border rounded-2xl p-6 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                        <div>
                          <h3 className={`text-base font-bold tracking-tight ${isAdminDark ? 'text-white' : 'text-gray-900'}`}>{t.map_title}</h3>
                          <p className="text-xs text-gray-400 mt-1">{t.map_subtitle}</p>
                        </div>

                        {/* Summary for chosen region */}
                        <div className="mt-4 lg:mt-0 flex items-center space-x-2 bg-blue-600/10 text-blue-400 px-4 py-2 border border-blue-600/20 rounded-xl text-xs font-bold">
                          <MapPin className="w-4 h-4 animate-bounce" />
                          <span>{REGION_METRICS[selectedRegion].title}</span>
                        </div>
                      </div>

                      {/* Vector Map Simulator */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Custom visual schematic representation of Kyrgyzstan regions (Clickable grid) */}
                        <div className="lg:col-span-2 bg-[#050507] rounded-xl p-4 border border-gray-900/50 flex flex-col justify-center min-h-[300px]">
                          <span className="text-[9px] font-bold text-gray-600 uppercase mb-4 tracking-wider text-center block">Упрощенная топологическая схема областей КР</span>
                          
                          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto w-full">
                            {/* Talas */}
                            <button 
                              onClick={() => setSelectedRegion('talas')}
                              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                                selectedRegion === 'talas' 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-[#121217] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-black">TALAS</span>
                              <span className="text-[10px] opacity-80 mt-1">95 авто</span>
                            </button>

                            {/* Chuy */}
                            <button 
                              onClick={() => setSelectedRegion('chuy')}
                              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                                selectedRegion === 'chuy' 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-[#121217] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-black">CHUY / FRU</span>
                              <span className="text-[10px] opacity-80 mt-1">1,420 авто</span>
                            </button>

                            {/* Issyk-Kul */}
                            <button 
                              onClick={() => setSelectedRegion('issykkul')}
                              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                                selectedRegion === 'issykkul' 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-[#121217] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-black">ISSYK-KUL</span>
                              <span className="text-[10px] opacity-80 mt-1">280 авто</span>
                            </button>

                            {/* Jalal-Abad */}
                            <button 
                              onClick={() => setSelectedRegion('jalalabad')}
                              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center col-span-2 ${
                                selectedRegion === 'jalalabad' 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-[#121217] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-black">JALAL-ABAD</span>
                              <span className="text-[10px] opacity-80 mt-1">410 авто</span>
                            </button>

                            {/* Naryn */}
                            <button 
                              onClick={() => setSelectedRegion('naryn')}
                              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                                selectedRegion === 'naryn' 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-[#121217] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-black">NARYN</span>
                              <span className="text-[10px] opacity-80 mt-1">110 авто</span>
                            </button>

                            {/* Batken */}
                            <button 
                              onClick={() => setSelectedRegion('batken')}
                              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                                selectedRegion === 'batken' 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-[#121217] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-black">BATKEN</span>
                              <span className="text-[10px] opacity-80 mt-1">125 авто</span>
                            </button>

                            {/* Osh */}
                            <button 
                              onClick={() => setSelectedRegion('osh')}
                              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center col-span-2 ${
                                selectedRegion === 'osh' 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                  : 'bg-[#121217] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-black">OSH REGION</span>
                              <span className="text-[10px] opacity-80 mt-1">680 авто</span>
                            </button>
                          </div>
                        </div>

                        {/* Region metrics readout panel */}
                        <div className="bg-[#121216] border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center space-x-2 border-b border-gray-800 pb-3 mb-4">
                              <MapPin className="w-5 h-5 text-red-500" />
                              <span className="text-sm font-bold text-white">{REGION_METRICS[selectedRegion].title}</span>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">{lang === 'RU' ? 'Активные автосалоны' : 'Active Dealerships'}</span>
                                <span className="font-extrabold text-white">{REGION_METRICS[selectedRegion].dealers}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">{lang === 'RU' ? 'Объявления' : 'Listings Count'}</span>
                                <span className="font-extrabold text-white">{REGION_METRICS[selectedRegion].listings}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">{lang === 'RU' ? 'СТО & Сервисные центры' : 'Services'}</span>
                                <span className="font-extrabold text-white">{REGION_METRICS[selectedRegion].services}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">{lang === 'RU' ? 'Средняя стоимость авто' : 'Avg Car Price'}</span>
                                <span className="font-extrabold text-green-400">{REGION_METRICS[selectedRegion].avgPrice}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-800">
                            <span className="text-[10px] text-gray-500 block leading-relaxed">
                              {lang === 'RU' ? 'Статистика обновляется в реальном времени на основе IP-адресов и геолокации объявлений.' : 'Data generated instantly on active geolocations from IP submissions.'}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* AI ASSISTANT / DECISION ENGINE */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left: AI MODERATION CHECKER */}
                      <div className={`border rounded-2xl p-6 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center space-x-2 mb-4">
                          <Cpu className="w-5 h-5 text-yellow-400" />
                          <h3 className={`text-sm font-bold tracking-tight ${isAdminDark ? 'text-white' : 'text-gray-900'}`}>{t.ai_mod_title}</h3>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">{t.ai_mod_desc}</p>

                        <div className="bg-[#050507] rounded-xl p-4 border border-gray-800/60 flex flex-col items-center">
                          <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden group">
                            <img 
                              src={scannedImage} 
                              alt="Car check" 
                              className="w-full h-full object-cover rounded-xl"
                            />
                            {aiScanStatus === 'scanning' && (
                              <>
                                <div className="absolute inset-x-0 h-1 bg-red-500 animate-bounce top-1/2 shadow-lg shadow-red-500/50" />
                                <div className="absolute inset-0 bg-red-500/10 backdrop-blur-xs flex items-center justify-center text-xs text-white font-bold">
                                  {t.ai_photo_scan_running}
                                </div>
                              </>
                            )}
                            {aiScanStatus === 'success' && (
                              <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-xs text-white font-bold">
                                <CheckCircle className="w-8 h-8 text-emerald-400 mb-1" />
                                <span>Passed OK</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex gap-2 w-full max-w-xs">
                            <button 
                              onClick={() => {
                                setScannedImage('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600');
                                setAiScanStatus('idle');
                              }}
                              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-lg text-xs transition-all"
                            >
                              Change Photo
                            </button>
                            <button 
                              onClick={startAiPhotoAnalysis}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs transition-all"
                            >
                              Scan Image
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: PREDICTIVE METRIC GROWTH TREND */}
                      <div className={`border rounded-2xl p-6 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center space-x-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                          <h3 className={`text-sm font-bold tracking-tight ${isAdminDark ? 'text-white' : 'text-gray-900'}`}>{t.ai_pred_title}</h3>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">{t.ai_pred_desc}</p>

                        {/* Pure Tailwind Graphic */}
                        <div className="bg-[#050507] rounded-xl p-4 border border-gray-800/60 h-40 flex flex-col justify-between relative overflow-hidden">
                          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                          
                          <div className="flex justify-between text-[10px] text-gray-500">
                            <span>May 2026</span>
                            <span>June 2026</span>
                            <span>July 2026 (Pred.)</span>
                          </div>

                          {/* SVG simulated line graph */}
                          <div className="h-20 w-full relative">
                            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                              <path 
                                d="M 0 60 Q 50 50 100 45 T 200 25 T 300 10" 
                                fill="none" 
                                stroke="#10b981" 
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                              <circle cx="100" cy="45" r="4" fill="#10b981" />
                              <circle cx="200" cy="25" r="4" fill="#10b981" />
                              <circle cx="300" cy="10" r="4" fill="#34d399" />
                            </svg>
                          </div>

                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Predicted Listings Growth:</span>
                            <span className="text-emerald-400 font-extrabold">+28.5% YoY</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* 2. VEHICLES MODERATION TAB */}
                {activeTab === 'vehicles' && (
                  <motion.div 
                    key="vehicles"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Filter & Mass actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500" />
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={t.search_placeholder}
                          className={`w-full py-2.5 pl-11 pr-4 text-xs rounded-xl focus:outline-none transition-all ${
                            isAdminDark 
                              ? 'bg-[#121217] border border-gray-800 text-white focus:border-red-500' 
                              : 'bg-white border border-gray-300 text-gray-900 focus:border-blue-500'
                          }`}
                        />
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button 
                          onClick={handleBulkApproveListings}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>AI Approve All</span>
                        </button>
                        <button 
                          onClick={handleBulkDeclineListings}
                          className="bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                        >
                          Decline Flagged
                        </button>
                      </div>
                    </div>

                    {/* Listings Table */}
                    <div className={`border rounded-2xl overflow-hidden ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={`border-b text-[10px] font-extrabold uppercase tracking-wider text-gray-500 ${isAdminDark ? 'border-gray-900 bg-gray-950/20' : 'border-gray-200 bg-gray-100/50'}`}>
                              <th className="py-4.5 px-6">{lang === 'RU' ? 'Фото' : 'Photo'}</th>
                              <th className="py-4.5 px-6">{lang === 'RU' ? 'Марка / Модель' : 'Vehicle'}</th>
                              <th className="py-4.5 px-6">{lang === 'RU' ? 'Регион / Дилер' : 'Source'}</th>
                              <th className="py-4.5 px-6">{lang === 'RU' ? 'Цена' : 'Price'}</th>
                              <th className="py-4.5 px-6">{lang === 'RU' ? 'Статус' : 'Status'}</th>
                              <th className="py-4.5 px-6 text-right">{lang === 'RU' ? 'Модерация' : 'Moderation'}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-inherit border-inherit">
                            {filteredCars.map((car) => (
                              <tr key={car.id} className="text-xs hover:bg-white/2 transition-colors">
                                <td className="py-4.5 px-6">
                                  <img 
                                    src={car.image} 
                                    alt={car.brand} 
                                    className="w-12 h-10 object-cover rounded-lg border border-gray-800"
                                  />
                                </td>
                                <td className="py-4.5 px-6">
                                  <span className="font-extrabold text-white block">{car.brand} {car.model}</span>
                                  <span className="text-[10px] text-gray-400 block mt-0.5">{car.year} | {car.mileage.toLocaleString()} км</span>
                                </td>
                                <td className="py-4.5 px-6">
                                  <span className="font-bold block text-gray-300">{car.dealer || 'Частное лицо'}</span>
                                  <span className="text-[10px] text-gray-400 block mt-0.5">{car.city?.[lang] || 'Бишкек'}</span>
                                </td>
                                <td className="py-4.5 px-6 font-extrabold text-white">
                                  ${car.price.toLocaleString()}
                                </td>
                                <td className="py-4.5 px-6">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    car.status === 'available' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  }`}>
                                    {car.status === 'available' ? t.status_active : 'Sold'}
                                  </span>
                                </td>
                                <td className="py-4.5 px-6 text-right space-x-2">
                                  <button 
                                    onClick={() => toggleCarStatus(car.id, 'available')} 
                                    className="text-emerald-400 hover:text-emerald-300 p-1 bg-emerald-500/10 rounded-lg"
                                    title="Одобрить"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => deleteCar(car.id)} 
                                    className="text-red-400 hover:text-red-300 p-1 bg-red-500/10 rounded-lg"
                                    title="Удалить"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. DEALERSHIPS MANAGEMENT TAB */}
                {activeTab === 'dealers' && (
                  <motion.div 
                    key="dealers"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className={`border rounded-2xl overflow-hidden ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={`border-b text-[10px] font-extrabold uppercase tracking-wider text-gray-500 ${isAdminDark ? 'border-gray-900 bg-gray-950/20' : 'border-gray-200 bg-gray-100/50'}`}>
                              <th className="py-4.5 px-6">Автосалон</th>
                              <th className="py-4.5 px-6">Контакты</th>
                              <th className="py-4.5 px-6">Кол-во автомобилей</th>
                              <th className="py-4.5 px-6">Статус</th>
                              <th className="py-4.5 px-6 text-right">Действия</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-inherit border-inherit">
                            {dealerships.map((dl) => (
                              <tr key={dl.id} className="text-xs hover:bg-white/2 transition-colors">
                                <td className="py-4.5 px-6 flex items-center space-x-3">
                                  <span className="text-2xl p-2 bg-gray-800 rounded-xl">{dl.logo}</span>
                                  <div>
                                    <div className="flex items-center space-x-1.5">
                                      <span className="font-extrabold text-white">{dl.name}</span>
                                      {dl.premium && (
                                        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">PREMIUM</span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-gray-400 block mt-0.5">{dl.address}</span>
                                  </div>
                                </td>
                                <td className="py-4.5 px-6 text-gray-300">
                                  <span>{dl.phone}</span>
                                </td>
                                <td className="py-4.5 px-6 font-bold text-white">
                                  {dl.cars} авто
                                </td>
                                <td className="py-4.5 px-6">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    dl.status === 'verified' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : dl.status === 'pending'
                                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  }`}>
                                    {dl.status === 'verified' ? t.status_verified : dl.status === 'pending' ? t.status_pending : t.status_blocked}
                                  </span>
                                </td>
                                <td className="py-4.5 px-6 text-right space-x-2">
                                  <button 
                                    onClick={() => updateDealerStatus(dl.id, 'verified')} 
                                    className="bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                  >
                                    Verify
                                  </button>
                                  <button 
                                    onClick={() => updateDealerStatus(dl.id, 'blocked')} 
                                    className="bg-red-500/15 text-red-400 hover:bg-red-500/25 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                  >
                                    Block
                                  </button>
                                  <button 
                                    onClick={() => deleteDealer(dl.id)} 
                                    className="text-gray-400 hover:text-red-500 p-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. PLATFORM USERS TAB */}
                {activeTab === 'users' && (
                  <motion.div 
                    key="users"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className={`border rounded-2xl overflow-hidden ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={`border-b text-[10px] font-extrabold uppercase tracking-wider text-gray-500 ${isAdminDark ? 'border-gray-900 bg-gray-950/20' : 'border-gray-200 bg-gray-100/50'}`}>
                              <th className="py-4.5 px-6">Пользователь</th>
                              <th className="py-4.5 px-6">Контакты</th>
                              <th className="py-4.5 px-6">Роль</th>
                              <th className="py-4.5 px-6">Дата регистрации</th>
                              <th className="py-4.5 px-6">Статус</th>
                              <th className="py-4.5 px-6 text-right">Действия</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-inherit border-inherit">
                            {platformUsers.map((u) => (
                              <tr key={u.id} className="text-xs hover:bg-white/2 transition-colors">
                                <td className="py-4.5 px-6 font-extrabold text-white">
                                  {u.name}
                                </td>
                                <td className="py-4.5 px-6 text-gray-300">
                                  <span className="block">{u.email}</span>
                                  <span className="text-[10px] text-gray-400 block mt-0.5">{u.phone}</span>
                                </td>
                                <td className="py-4.5 px-6 text-gray-400 font-bold">
                                  {u.role}
                                </td>
                                <td className="py-4.5 px-6 text-gray-500">
                                  {u.regDate}
                                </td>
                                <td className="py-4.5 px-6">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    u.status === 'active' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  }`}>
                                    {u.status === 'active' ? t.status_active : t.status_blocked}
                                  </span>
                                </td>
                                <td className="py-4.5 px-6 text-right space-x-2">
                                  <button 
                                    onClick={() => updateUserStatus(u.id, u.status === 'active' ? 'blocked' : 'active')} 
                                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                      u.status === 'active' 
                                        ? 'bg-red-500/15 text-red-400 hover:bg-red-500/25' 
                                        : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                                    }`}
                                  >
                                    {u.status === 'active' ? 'Block' : 'Unblock'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. REVIEWS MODERATION TAB */}
                {activeTab === 'reviews' && (
                  <motion.div 
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {adminReviews.map((rev) => (
                        <div key={rev.id} className={`border rounded-2xl p-5 space-y-4 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-extrabold text-white block">{rev.author}</span>
                              <span className="text-[10px] text-gray-400 block mt-0.5">Кому: {rev.target}</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-yellow-500/10 text-yellow-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-yellow-500/20">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              <span>{rev.rating}</span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-300 italic">"{rev.text}"</p>

                          <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                              rev.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {rev.status}
                            </span>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => updateReviewStatus(rev.id, 'approved')}
                                className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-bold transition-all"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => updateReviewStatus(rev.id, 'hidden')}
                                className="bg-white/5 hover:bg-white/10 text-gray-400 px-3 py-1 rounded-lg text-[10px] font-bold transition-all"
                              >
                                Hide
                              </button>
                              <button 
                                onClick={() => deleteReview(rev.id)}
                                className="text-red-400 hover:text-red-300 p-1.5"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 6. PAYMENTS & SUBSCRIPTIONS TAB */}
                {activeTab === 'payments' && (
                  <motion.div 
                    key="payments"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className={`border rounded-2xl p-5 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Обороты за Месяц</span>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-3xl font-black text-white">$14,290</span>
                          <span className="text-xs text-green-400 font-bold">+18.4%</span>
                        </div>
                      </div>
                      <div className={`border rounded-2xl p-5 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Активные подписки</span>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-3xl font-black text-white">42 салона</span>
                          <span className="text-xs text-gray-400">86% удержание</span>
                        </div>
                      </div>
                      <div className={`border rounded-2xl p-5 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Средний чек дилера</span>
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-3xl font-black text-white">$115</span>
                          <span className="text-xs text-green-400 font-bold">+$12</span>
                        </div>
                      </div>
                    </div>

                    <div className={`border rounded-2xl overflow-hidden ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={`border-b text-[10px] font-extrabold uppercase tracking-wider text-gray-500 ${isAdminDark ? 'border-gray-900 bg-gray-950/20' : 'border-gray-200 bg-gray-100/50'}`}>
                              <th className="py-4.5 px-6">ID транзакции</th>
                              <th className="py-4.5 px-6">Автосалон</th>
                              <th className="py-4.5 px-6">Тариф / Услуга</th>
                              <th className="py-4.5 px-6">Сумма</th>
                              <th className="py-4.5 px-6">Дата</th>
                              <th className="py-4.5 px-6 text-right">Статус</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-inherit border-inherit">
                            {payments.map((p) => (
                              <tr key={p.id} className="text-xs hover:bg-white/2 transition-colors">
                                <td className="py-4.5 px-6 font-mono text-gray-400">
                                  {p.id}
                                </td>
                                <td className="py-4.5 px-6 font-extrabold text-white">
                                  {p.dealer}
                                </td>
                                <td className="py-4.5 px-6 text-gray-300">
                                  {p.type}
                                </td>
                                <td className="py-4.5 px-6 font-extrabold text-white">
                                  ${p.amount}
                                </td>
                                <td className="py-4.5 px-6 text-gray-400">
                                  {p.date}
                                </td>
                                <td className="py-4.5 px-6 text-right">
                                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                    p.status === 'completed' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  }`}>
                                    {p.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 7. SYSTEM NOTIFICATIONS TAB */}
                {activeTab === 'notifications' && (
                  <motion.div 
                    key="notifications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 max-w-2xl"
                  >
                    {notifications.map((n) => (
                      <div key={n.id} className={`border rounded-xl p-4.5 flex items-start space-x-3.5 transition-all ${
                        n.unread 
                          ? 'border-blue-500/20 bg-blue-500/5' 
                          : isAdminDark ? 'border-gray-900 bg-[#0d0d11]' : 'border-gray-200 bg-white'
                      }`}>
                        <div className={`p-2 rounded-lg ${
                          n.type === 'dealer' ? 'bg-purple-500/10 text-purple-400' :
                          n.type === 'listing' ? 'bg-blue-500/10 text-blue-400' :
                          n.type === 'payment' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          <Bell className="w-4.5 h-4.5" />
                        </div>

                        <div className="flex-1">
                          <p className="text-xs text-white leading-relaxed">{n.message}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="text-[10px] text-gray-500">{n.time}</span>
                            {n.unread && (
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* 8. ANALYTICS & GRAPH DETAILS */}
                {activeTab === 'analytics' && (
                  <motion.div 
                    key="analytics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Brand Popularity */}
                      <div className={`border rounded-2xl p-6 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <h3 className="text-sm font-bold text-white mb-4">Самые популярные марки в КР (Поисковые запросы)</h3>
                        
                        <div className="space-y-4">
                          {[
                            { name: 'Toyota', percentage: 85, color: 'bg-red-500', count: '14.2K' },
                            { name: 'Lexus', percentage: 70, color: 'bg-amber-500', count: '11.8K' },
                            { name: 'Hyundai', percentage: 65, color: 'bg-blue-500', count: '9.4K' },
                            { name: 'Tesla', percentage: 48, color: 'bg-teal-500', count: '6.2K' },
                            { name: 'BMW', percentage: 42, color: 'bg-indigo-500', count: '5.1K' }
                          ].map((b, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="font-bold text-white">{b.name}</span>
                                <span className="text-gray-400">{b.count} запросов</span>
                              </div>
                              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Financial Revenue visual */}
                      <div className={`border rounded-2xl p-6 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <h3 className="text-sm font-bold text-white mb-4">Рост дохода платформы (USD)</h3>
                        
                        <div className="space-y-4">
                          {[
                            { month: 'Апрель 2026', amount: '$2,800', percentage: 50 },
                            { month: 'Май 2026', amount: '$3,400', percentage: 75 },
                            { month: 'Июнь 2026', amount: '$4,100', percentage: 90 },
                            { month: 'Июль 2026 (Текущий)', amount: '$4,280', percentage: 100 }
                          ].map((r, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="font-bold text-white">{r.month}</span>
                                <span className="text-green-400 font-extrabold">{r.amount}</span>
                              </div>
                              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-green-500" style={{ width: `${r.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 9. AI CORE PLAYGROUND */}
                {activeTab === 'ai-core' && (
                  <motion.div 
                    key="ai-core"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* CREDIT SIMULATOR */}
                      <div className={`border rounded-2xl p-6 space-y-4 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center space-x-2">
                          <Wallet className="w-5 h-5 text-blue-400" />
                          <h3 className="text-sm font-bold text-white">{t.credit_title}</h3>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Стоимость автомобиля ($)</label>
                            <input 
                              type="number" 
                              value={creditPrice}
                              onChange={(e) => setCreditPrice(e.target.value)}
                              className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Первоначальный взнос ($)</label>
                            <input 
                              type="number" 
                              value={creditDownpayment}
                              onChange={(e) => setCreditDownpayment(e.target.value)}
                              className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Срок кредита (Месяцев)</label>
                            <select 
                              value={creditTerm}
                              onChange={(e) => setCreditTerm(e.target.value)}
                              className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
                            >
                              <option value="12">12 месяцев</option>
                              <option value="24">24 месяца</option>
                              <option value="36">36 месяцев</option>
                              <option value="48">48 месяцев</option>
                              <option value="60">60 месяцев</option>
                            </select>
                          </div>

                          <button 
                            onClick={calculateCredit}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
                          >
                            {t.calc_credit_btn}
                          </button>

                          {creditResult !== null && (
                            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
                              <span className="text-[10px] text-gray-400 uppercase block">Ежемесячный платеж</span>
                              <span className="text-xl font-black text-white">${creditResult} / мес.</span>
                              <span className="text-[9px] text-gray-500 block mt-1">Основано на ставке 14% годовых КР</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* INSURANCE CALCULATOR */}
                      <div className={`border rounded-2xl p-6 space-y-4 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <h3 className="text-sm font-bold text-white">{t.insurance_title}</h3>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Год выпуска автомобиля</label>
                            <input 
                              type="number" 
                              value={insuranceCarAge}
                              onChange={(e) => setInsuranceCarAge(e.target.value)}
                              className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Объем двигателя (литров)</label>
                            <input 
                              type="text" 
                              value={insuranceEngine}
                              onChange={(e) => setInsuranceEngine(e.target.value)}
                              className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                            />
                          </div>

                          <button 
                            onClick={calculateInsurance}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
                          >
                            {t.calc_insurance_btn}
                          </button>

                          {insuranceResult !== null && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
                              <span className="text-[10px] text-gray-400 uppercase block">Оценочная стоимость ОСАГО / КАСКО</span>
                              <span className="text-xl font-black text-white">${insuranceResult} / год</span>
                              <span className="text-[9px] text-gray-500 block mt-1">Рассчитано согласно нормам автострахования КР</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 10. PLATFORM SETTINGS TAB */}
                {activeTab === 'settings' && (
                  <motion.div 
                    key="settings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 max-w-xl"
                  >
                    <div className={`border rounded-2xl p-6 space-y-4 ${isAdminDark ? 'bg-[#0d0d11] border-gray-900' : 'bg-white border-gray-200'}`}>
                      <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3">Системные настройки AutoHub KG</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Название платформы</label>
                          <input 
                            type="text" 
                            value={platformName}
                            onChange={(e) => setPlatformName(e.target.value)}
                            className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2.5 px-3.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">SEO Заголовок (Title)</label>
                          <input 
                            type="text" 
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2.5 px-3.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">SEO Описание (Meta Description)</label>
                          <textarea 
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Телефон службы поддержки</label>
                          <input 
                            type="text" 
                            value={supportPhone}
                            onChange={(e) => setSupportPhone(e.target.value)}
                            className="w-full bg-[#121217] border border-gray-800 rounded-xl py-2.5 px-3.5 text-xs text-white"
                          />
                        </div>

                        <button 
                          onClick={() => triggerToast(t.toast_settings_saved)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-red-900/20"
                        >
                          {t.settings_save}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </main>
        </div>
      )}

    </div>
  );
}
