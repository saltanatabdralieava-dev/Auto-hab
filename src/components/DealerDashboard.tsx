import React, { useState, useMemo } from 'react';
import { 
  Car as CarIcon, 
  Home, 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Users, 
  Star, 
  Settings as SettingsIcon, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Upload,
  Video,
  Send,
  Phone,
  Bot,
  TrendingUp,
  Share2,
  AlertCircle,
  TrendingDown,
  User,
  Lock,
  Mail,
  Smartphone,
  Facebook,
  Instagram,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { Car, Language } from '../types';
import { Logo, LogoIcon } from './Logo';

interface DealerDashboardProps {
  lang: Language;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  onBackToCatalog: () => void;
}

// Full Dashboard Translations in 3 languages
const T = {
  RU: {
    back: 'Вернуться на сайт',
    title: 'Кабинет автосалона',
    subtitle: 'Профессиональная панель управления вашим бизнесом',
    login_title: 'Вход в систему',
    login_subtitle: 'AutoHub Dealer — защищенный доступ для дилеров Кыргызстана',
    email: 'Электронная почта',
    phone: 'Номер телефона',
    password: 'Пароль',
    forgot_password: 'Забыли пароль?',
    btn_login: 'Войти в систему',
    btn_demo: '⚡ Демо-вход (без пароля)',
    btn_register: 'Создать аккаунт автосалона',
    or_login_with: 'Или войти через',
    auth_success: 'Успешный вход в личный кабинет!',
    stats_total_cars: 'Всего автомобилей',
    stats_active: 'Активные объявления',
    stats_sold: 'Продано автомобилей',
    stats_leads: 'Новые заявки',
    stats_views: 'Просмотры',
    stats_favs: 'В избранном',
    stats_testdrives: 'Тест-драйвы',
    stats_pending: 'Ожидают одобрения',
    stats_vip: 'VIP объявления',
    stats_messages_received: 'Получено сообщений',
    stats_phone_clicks: 'Клики по телефону',
    stats_whatsapp_clicks: 'Клики по WhatsApp',
    stats_revenue: 'Доход от подписок',
    tab_dashboard: 'Главная',
    tab_my_cars: 'Мои автомобили',
    tab_add_car: 'Добавить авто',
    tab_leads: 'Заявки клиентов',
    tab_messages: 'Сообщения',
    tab_test_drives: 'Тест-драйвы',
    tab_analytics: 'Аналитика',
    tab_managers: 'Менеджеры',
    tab_reviews: 'Отзывы',
    tab_settings: 'Настройки',
    tab_ai_assist: '🤖 AI Ассистент',
    tab_subscription: 'Подписка',
    tab_notifications: 'Уведомления',
    tab_profile: 'Профиль дилера',
    tab_support: 'Поддержка',
    table_photo: 'Фото',
    table_model: 'Марка и модель',
    table_year: 'Год',
    table_price: 'Цена',
    table_status: 'Статус',
    table_views: 'Просмотры',
    table_actions: 'Действия',
    status_available: 'В наличии',
    status_sold: 'Продано',
    status_hidden: 'Скрыто',
    action_hide: 'Скрыть',
    action_show: 'Показать',
    action_sell: 'Продано',
    action_delete: 'Удалить',
    action_edit: 'Редактировать',
    btn_add_car: 'Опубликовать объявление',
    form_brand: 'Марка',
    form_model: 'Модель',
    form_year: 'Год выпуска',
    form_price: 'Цена ($)',
    form_mileage: 'Пробег (км)',
    form_vin: 'VIN-код',
    form_fuel: 'Тип топлива',
    form_transmission: 'Коробка передач',
    form_body: 'Тип кузова',
    form_engine: 'Объем двигателя (л)',
    form_power: 'Мощность (л.с.)',
    form_drive: 'Привод',
    form_color: 'Цвет',
    form_description: 'Описание автомобиля',
    form_features: 'Комплектация (через запятую)',
    form_photos: 'Загрузка до 30 фотографий',
    form_video: 'Ссылка на видео (YouTube)',
    drag_drop_text: 'Перетащите фотографии сюда или нажмите для выбора',
    leads_title: 'Активные заявки от клиентов',
    leads_name: 'Имя клиента',
    leads_phone: 'Телефон',
    leads_interest: 'Интересующий автомобиль',
    leads_date: 'Дата',
    leads_status: 'Статус заявки',
    status_new: 'Новая',
    status_in_progress: 'В работе',
    status_closed: 'Закрыта',
    analytics_title: 'Аналитический отчет продаж',
    analytics_views: 'График просмотров за месяц',
    analytics_conversion: 'Конверсия продаж',
    analytics_slow_cars: 'Анализ медленно продающихся авто',
    reviews_rating: 'Рейтинг автосалона',
    reviews_reply: 'Ответить на отзыв',
    reviews_ai_suggest: '🤖 AI ответ',
    settings_name: 'Название автосалона',
    settings_address: 'Адрес автосалона',
    settings_hours: 'Время работы',
    settings_save: 'Сохранить настройки',
    ai_desc_btn: '🤖 AI описание авто',
    ai_price_btn: '🤖 AI оптимальная цена',
    ai_social_btn: '🤖 AI пост для соцсетей',
    ai_help_reply: '🤖 AI помощь в ответе',
    ai_slow_selling_btn: '🤖 AI анализ продаж',
    ai_desc_success: 'Описание успешно сгенерировано с помощью Gemini AI!',
    ai_price_success: 'Оптимальная цена рассчитана на основе текущего рынка КР!',
    ai_social_success: 'Пост для социальных сетей готов к публикации!'
  },
  KG: {
    back: 'Сайтка кайтуу',
    title: 'Автосалондун кабинети',
    subtitle: 'Бизнесиңизди башкаруунун заманбап панели',
    login_title: 'Системага кирүү',
    login_subtitle: 'AutoHub Dealer — Кыргызстандын дилерлери үчүн корголгон мүмкүндүк',
    email: 'Электрондук почта',
    phone: 'Телефон номери',
    password: 'Сөз айкашы (пароль)',
    forgot_password: 'Сөз айкашын унуттуңузбу?',
    btn_login: 'Системага кирүү',
    btn_demo: '⚡ Демо-кирүү (паролсуз)',
    btn_register: 'Автосалондун аккаунтун түзүү',
    or_login_with: 'Же бул аркылуу кирүү',
    auth_success: 'Жеке кабинетке ийгиликтүү кирдиңиз!',
    stats_total_cars: 'Жалпы унаалар',
    stats_active: 'Активдүү кулактандыруулар',
    stats_sold: 'Сатылган унаалар',
    stats_leads: 'Жаңы билдирүүлөр',
    stats_views: 'Көрүүлөр',
    stats_favs: 'Тандалгандарда',
    stats_testdrives: 'Тест-драйвдар',
    stats_pending: 'Жактырууну күтүүдө',
    stats_vip: 'VIP жарыялар',
    stats_messages_received: 'Кабыл алынган билдирүүлөр',
    stats_phone_clicks: 'Телефон чыкылдатуулары',
    stats_whatsapp_clicks: 'WhatsApp чыкылдатуулары',
    stats_revenue: 'Жазылуу кирешеси',
    tab_dashboard: 'Башкы бет',
    tab_my_cars: 'Менин унааларым',
    tab_add_car: 'Унаа кошуу',
    tab_leads: 'Кардарлардын билдирүүлөрү',
    tab_messages: 'Кабарлар',
    tab_test_drives: 'Тест-драйвдар',
    tab_analytics: 'Аналитика',
    tab_managers: 'Менеджерлер',
    tab_reviews: 'Пикирлер',
    tab_settings: 'Жөндөөлөр',
    tab_ai_assist: '🤖 AI Ассистент',
    tab_subscription: 'Жазылуу',
    tab_notifications: 'Билдирүүлөр',
    tab_profile: 'Профиль',
    tab_support: 'Колдоо кызматы',
    table_photo: 'Сүрөт',
    table_model: 'Марка жана модель',
    table_year: 'Жыл',
    table_price: 'Баасы',
    table_status: 'Статус',
    table_views: 'Көрүүлөр',
    table_actions: 'Аракеттер',
    status_available: 'Бар',
    status_sold: 'Сатылды',
    status_hidden: 'Жашырылган',
    action_hide: 'Жашыруу',
    action_show: 'Көрсөтүү',
    action_sell: 'Сатылды',
    action_delete: 'Өчүрүү',
    action_edit: 'Оңдоо',
    btn_add_car: 'Кулактандырууну жарыялоо',
    form_brand: 'Маркасы',
    form_model: 'Модели',
    form_year: 'Чыккан жылы',
    form_price: 'Баасы ($)',
    form_mileage: 'Жүрүшү (км)',
    form_vin: 'VIN-код',
    form_fuel: 'Күйүүчү май түрү',
    form_transmission: 'Берүү кутусу',
    form_body: 'Кузов түрү',
    form_engine: 'Кыймылдаткыч көлөмү (л)',
    form_power: 'Кубаттуулугу (ат күчү)',
    form_drive: 'Жетек',
    form_color: 'Түсү',
    form_description: 'Унаанын сыпаттамасы',
    form_features: 'Комплектациясы (үтүр менен бөлүңүз)',
    form_photos: '30га чейин сүрөт жүктөө',
    form_video: 'Видео шилтемеси (YouTube)',
    drag_drop_text: 'Сүрөттөрдү бул жерге сүйрөңүз же тандоо үчүн басыңыз',
    leads_title: 'Кардарлардан активдүү билдирүүлөр',
    leads_name: 'Кардардын аты',
    leads_phone: 'Телефон',
    leads_interest: 'Кызыктырган унаа',
    leads_date: 'Датасы',
    leads_status: 'Билдирүү статусу',
    status_new: 'Жаңы',
    status_in_progress: 'Жумушта',
    status_closed: 'Жабык',
    analytics_title: 'Сатуулардын аналитикалык отчету',
    analytics_views: 'Бир айлык көрүүлөрдүн графиги',
    analytics_conversion: 'Сатуулардын конверсиясы',
    analytics_slow_cars: 'Жай сатылып жаткан унаалардын анализи',
    reviews_rating: 'Автосалондун рейтинги',
    reviews_reply: 'Пикирге жооп берүү',
    reviews_ai_suggest: '🤖 AI жооп',
    settings_name: 'Автосалондун аталышы',
    settings_address: 'Автосалондун дареги',
    settings_hours: 'Иштөө убактысы',
    settings_save: 'Жөндөөлөрдү сактоо',
    ai_desc_btn: '🤖 AI түшүндүрмөсү',
    ai_price_btn: '🤖 AI оптималдуу баа',
    ai_social_btn: '🤖 AI социалдык пост',
    ai_help_reply: '🤖 AI жоопко көмөк',
    ai_slow_selling_btn: '🤖 AI сатуу анализи',
    ai_desc_success: 'Унаанын сыпаттамасы Gemini AI тарабынан ийгиликтүү түзүлдү!',
    ai_price_success: 'Оптималдуу баа Кыргызстандын базарына ылайык эсептелди!',
    ai_social_success: 'Социалдык тармактар үчүн пост даяр!'
  },
  EN: {
    back: 'Back to Site',
    title: 'Dealer Dashboard',
    subtitle: 'Professional control panel for your automotive business',
    login_title: 'System Authorization',
    login_subtitle: 'AutoHub Dealer — Secure access for Kyrgyz dealerships',
    email: 'Email Address',
    phone: 'Phone Number',
    password: 'Password',
    forgot_password: 'Forgot password?',
    btn_login: 'Login to System',
    btn_demo: '⚡ Demo Login (No Password)',
    btn_register: 'Create Dealership Account',
    or_login_with: 'Or log in with',
    auth_success: 'Successfully logged into dealer dashboard!',
    stats_total_cars: 'Total Vehicles',
    stats_active: 'Active Listings',
    stats_sold: 'Sold Vehicles',
    stats_leads: 'New Leads',
    stats_views: 'Views Count',
    stats_favs: 'Favorites',
    stats_testdrives: 'Test Drives',
    stats_pending: 'Pending Approval',
    stats_vip: 'VIP Listings',
    stats_messages_received: 'Messages Received',
    stats_phone_clicks: 'Phone Clicks',
    stats_whatsapp_clicks: 'WhatsApp Clicks',
    stats_revenue: 'Subscription Revenue',
    tab_dashboard: 'Overview',
    tab_my_cars: 'My Vehicles',
    tab_add_car: 'Add Car',
    tab_leads: 'Client Leads',
    tab_messages: 'Messages',
    tab_test_drives: 'Test Drives',
    tab_analytics: 'Analytics',
    tab_managers: 'Managers',
    tab_reviews: 'Reviews',
    tab_settings: 'Settings',
    tab_ai_assist: '🤖 AI Assistant',
    tab_subscription: 'Subscription',
    tab_notifications: 'Notifications',
    tab_profile: 'Dealer Profile',
    tab_support: 'Support',
    table_photo: 'Photo',
    table_model: 'Make & Model',
    table_year: 'Year',
    table_price: 'Price',
    table_status: 'Status',
    table_views: 'Views',
    table_actions: 'Actions',
    status_available: 'Available',
    status_sold: 'Sold',
    status_hidden: 'Hidden',
    action_hide: 'Hide',
    action_show: 'Show',
    action_sell: 'Sold',
    action_delete: 'Delete',
    action_edit: 'Edit',
    btn_add_car: 'Publish Vehicle Listing',
    form_brand: 'Brand',
    form_model: 'Model',
    form_year: 'Manufacture Year',
    form_price: 'Price ($)',
    form_mileage: 'Mileage (km)',
    form_vin: 'VIN Code',
    form_fuel: 'Fuel Type',
    form_transmission: 'Transmission',
    form_body: 'Body Type',
    form_engine: 'Engine volume (L)',
    form_power: 'Power (HP)',
    form_drive: 'Drivetrain',
    form_color: 'Color',
    form_description: 'Vehicle Description',
    form_features: 'Features (comma separated)',
    form_photos: 'Upload up to 30 Photos',
    form_video: 'Video Link (YouTube)',
    drag_drop_text: 'Drag & drop photos here or click to browse',
    leads_title: 'Active Customer Inquiries',
    leads_name: 'Client Name',
    leads_phone: 'Phone',
    leads_interest: 'Vehicle of Interest',
    leads_date: 'Date',
    leads_status: 'Lead Status',
    status_new: 'New',
    status_in_progress: 'In Progress',
    status_closed: 'Closed',
    analytics_title: 'Sales Performance Report',
    analytics_views: 'Monthly Traffic Views',
    analytics_conversion: 'Sales Conversion',
    analytics_slow_cars: 'Slow-Moving Stock Analysis',
    reviews_rating: 'Dealership Rating',
    reviews_reply: 'Reply to Review',
    reviews_ai_suggest: '🤖 AI Suggest',
    settings_name: 'Dealership Name',
    settings_address: 'Dealership Address',
    settings_hours: 'Working Hours',
    settings_save: 'Save Settings',
    ai_desc_btn: '🤖 AI Car Description',
    ai_price_btn: '🤖 AI Optimal Price',
    ai_social_btn: '🤖 AI Social Post',
    ai_help_reply: '🤖 AI Help Reply',
    ai_slow_selling_btn: '🤖 AI Sales Analysis',
    ai_desc_success: 'Vehicle description successfully generated using Gemini AI!',
    ai_price_success: 'Optimal price calculated based on active market metrics in Kyrgyzstan!',
    ai_social_success: 'Social media post is ready for publishing!'
  }
};

export default function DealerDashboard({ lang, cars, setCars, onBackToCatalog }: DealerDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);

  // Add Car form state
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [vin, setVin] = useState('');
  const [fuel, setFuel] = useState('Petrol');
  const [transmission, setTransmission] = useState('Automatic');
  const [body, setBody] = useState('Sedan');
  const [engine, setEngine] = useState('2.0');
  const [power, setPower] = useState('180');
  const [drive, setDrive] = useState('AWD');
  const [color, setColor] = useState('Black');
  const [descriptionText, setDescriptionText] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600'
  ]);

  // Dealership Settings state
  const [dealerName, setDealerName] = useState('AutoHub Premium Bishkek');
  const [dealerAddress, setDealerAddress] = useState('720000, г. Бишкек, ул. Ибраимова 115/1');
  const [dealerPhone, setDealerPhone] = useState('+996 555 778 899');
  const [dealerEmail, setDealerEmail] = useState('sales@autohub-premium.kg');
  const [dealerHours, setDealerHours] = useState('09:00 - 19:00, Пн-Сб');

  // Client Leads list
  const [leads, setLeads] = useState([
    { id: '1', name: 'Адилет Маратов', phone: '+996 700 123 456', car: 'Tesla Model Y 2023', date: '15.07.2026', status: 'new' },
    { id: '2', name: 'Бакыт Садыков', phone: '+996 550 987 654', car: 'Toyota Camry 2021', date: '14.07.2026', status: 'in_progress' },
    { id: '3', name: 'Каныкей Осмонова', phone: '+996 772 112 233', car: 'BMW X5 2022', date: '13.07.2026', status: 'new' },
    { id: '4', name: 'John Doe', phone: '+1 415 889 001', car: 'Mercedes-Benz S-Class 2020', date: '12.07.2026', status: 'closed' }
  ]);

  // Dealership Reviews list
  const [reviews, setReviews] = useState([
    { id: '1', author: 'Ильяс', rating: 5, text: 'Отличный автосалон, купил здесь Теслу. Все оформили за 2 часа, помогли со страховкой. Рекомендую!', reply: 'Спасибо большое за ваш отзыв! Рады стараться для вас.' },
    { id: '2', author: 'Алина', rating: 4, text: 'Хороший выбор машин, вежливые менеджеры. Но хотелось бы более быструю предпродажную подготовку.', reply: '' },
    { id: '3', author: 'Эркин', rating: 5, text: 'Огромный респект менеджеру Нурбеку. Ответил на все вопросы по VIN-коду, показал авто на подъемнике.', reply: '' }
  ]);

  const [reviewReplies, setReviewReplies] = useState<Record<string, string>>({});

  // Active Chats messages state
  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [typedMessage, setTypedMessage] = useState('');
  const [chats, setChats] = useState([
    {
      id: '1',
      clientName: 'Адилет Маратов',
      lastMsg: 'Когда можно приехать на тест-драйв?',
      time: '12:40',
      unread: true,
      messages: [
        { sender: 'client', text: 'Здравствуйте, интересует Tesla Model Y 2023.' },
        { sender: 'dealer', text: 'Добрый день! Она в наличии в нашем автосалоне. Готовы показать в любое время.' },
        { sender: 'client', text: 'Когда можно приехать на тест-драйв?' }
      ]
    },
    {
      id: '2',
      clientName: 'Бакыт Садыков',
      lastMsg: 'Цена окончательная?',
      time: 'Вчера',
      unread: false,
      messages: [
        { sender: 'client', text: 'Цена окончательная на Камри?' },
        { sender: 'dealer', text: 'Здравствуйте! Для реального покупателя есть небольшой торг у капота.' },
        { sender: 'client', text: 'Хорошо, завтра подъеду к 14:00.' }
      ]
    }
  ]);

  // Test drive schedule list
  const [testDrives, setTestDrives] = useState([
    { id: '1', client: 'Адилет Маратов', phone: '+996 700 123 456', car: 'Tesla Model Y 2023', date: '16.07.2026', time: '11:00', status: 'pending' },
    { id: '2', client: 'Бакыт Садыков', phone: '+996 550 987 654', car: 'Toyota Camry 2021', date: '16.07.2026', time: '14:00', status: 'confirmed' },
    { id: '3', client: 'Мирлан Асанов', phone: '+996 501 555 666', car: 'BMW X5 2022', date: '17.07.2026', time: '16:30', status: 'confirmed' }
  ]);

  // Team managers list
  const [managers, setManagers] = useState([
    { id: '1', name: 'Нурбек Алиев', email: 'nurbek@autohub.kg', phone: '+996 555 112 233', role: 'Старший менеджер', status: 'online' },
    { id: '2', name: 'Айбек Осмонов', email: 'aybek@autohub.kg', phone: '+996 700 998 877', role: 'Менеджер по продажам', status: 'away' },
    { id: '3', name: 'Мээрим Талайбекова', email: 'meerim@autohub.kg', phone: '+996 770 443 322', role: 'Консультант / Оформление', status: 'online' }
  ]);

  // For visual dashboard insights
  const [isAiLoading, setIsAiLoading] = useState<Record<string, boolean>>({});
  const [aiOutputs, setAiOutputs] = useState<Record<string, string>>({});
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly'>('weekly');

  // Search, Filter, Sort and Selection States for My Cars table
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('newest');
  const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);

  const t = T[lang];

  // Simulated AI functions
  const handleAiAction = (actionKey: string, carModelName?: string) => {
    setIsAiLoading(prev => ({ ...prev, [actionKey]: true }));
    
    setTimeout(() => {
      let outputText = '';
      if (actionKey === 'ai_description') {
        const selectedCar = carModelName || `${brand} ${model}`;
        outputText = `🔥 ПРЕМИАЛЬНОЕ ПРЕДЛОЖЕНИЕ в Бишкеке! \n\nПредставляем вашему вниманию флагман автоиндустрии — ${selectedCar} (${year} года выпуска). \n\nОсновные достоинства этого автомобиля:\n✅ Проверенный оригинальный пробег ${mileage || '15,000'} км\n✅ Юридически чист, VIN-код предоставлен\n✅ Максимальная комплектация, ухоженный салон без дефектов\n✅ Идеальный баланс динамики и экономичности\n\nЭтот автомобиль подарит вам непревзойденный комфорт и уверенность на дорогах Кыргызстана. Подходит как для городских поездок, так и для дальних путешествий. \n\n📍 Осмотр доступен ежедневно в автосалоне "${dealerName}". Звоните прямо сейчас для бронирования тест-драйва!`;
        setDescriptionText(outputText);
        triggerToast(t.ai_desc_success);
      } else if (actionKey === 'ai_price') {
        const carName = carModelName || `${brand || 'Tesla'} ${model || 'Model Y'}`;
        const baseVal = parseInt(price) || 45000;
        outputText = `📊 АНАЛИЗ РЫНКА КЫРГЫЗСТАНА ДЛЯ ${carName.toUpperCase()}:\n\n• Средняя цена на рынке: $${(baseVal * 1.02).toLocaleString()}\n• Диапазон быстрой продажи: $${(baseVal * 0.95).toLocaleString()} — $${(baseVal * 0.98).toLocaleString()}\n\n💡 РЕКОМЕНДАЦИЯ AI:\nУстановите стоимость в размере $${baseVal.toLocaleString()}. Автомобиль в таком состоянии и с пробегом ${mileage || '18,000'} км уйдёт в течение 9 дней. Конверсия просмотров в звонки составит ~6.8%.`;
        triggerToast(t.ai_price_success);
      } else if (actionKey === 'ai_social') {
        const selectedCar = carModelName || `${brand || 'Tesla'} ${model || 'Model Y'}`;
        outputText = `📱 ГОТОВЫЙ ПОСТ ДЛЯ INSTAGRAM & TELEGRAM:\n\n🌟 NEW IN STOCK! 🌟\n\nВстречайте роскошный ${selectedCar} (${year}) уже на нашей площадке в Бишкеке! \n\n💰 Стоимость: $${(parseInt(price) || 39500).toLocaleString()}\n🛣️ Пробег: ${mileage || '22,000'} км\n⛽ Двигатель: ${engine} л / ${power} л.с.\n\nПолностью обслужен, идеальное эстетическое и техническое состояние. Готов к любым проверкам! \n\n📞 Звоните: ${dealerAddress}\n📲 Пишите в ЛС или WhatsApp!\n\n#AutoHubKyrgyzstan #БишкекАвто #КупитьАвтоКР #АвтосалонБишкек #PremiumCarsKG`;
        triggerToast(t.ai_social_success);
      } else if (actionKey === 'ai_slow_selling') {
        outputText = `🤖 АНАЛИЗ МЕДЛЕННЫХ ПРОДАЖ:\n\n⚠️ Выявлено 2 автомобиля, срок размещения которых превышает 28 дней:\n1. BMW X5 2022 года — цена завышена на 4% относительно рынка. Рекомендация: снизить цену на $1,200 или добавить бесплатный комплект зимней резины.\n2. Toyota Camry 2021 года — мало просмотров из-за некачественного заглавного фото. Рекомендация: обновите фото при ярком солнечном свете и добавьте видеообзор.`;
      } else if (actionKey.startsWith('ai_reply_')) {
        const reviewId = actionKey.replace('ai_reply_', '');
        const rev = reviews.find(r => r.id === reviewId);
        outputText = `Благодарим вас, ${rev?.author || 'уважаемый клиент'}, за доверие к автосалону "${dealerName}"! Мы искренне рады, что вы оценили работу наших менеджеров и остались довольны покупкой. Будем рады видеть вас снова у нас на обслуживании или при выборе следующего автомобиля!`;
        setReviewReplies(prev => ({ ...prev, [reviewId]: outputText }));
      } else if (actionKey.startsWith('ai_chat_')) {
        outputText = `Здравствуйте, Адилет! Конечно, у нас свободны окошки на тест-драйв завтра в 11:00 и 14:00. Какой вариант вам больше подходит? Мы подготовим автомобиль к вашему приезду!`;
        setTypedMessage(outputText);
      }

      setAiOutputs(prev => ({ ...prev, [actionKey]: outputText }));
      setIsAiLoading(prev => ({ ...prev, [actionKey]: false }));
    }, 1200);
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3500);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    triggerToast(t.auth_success);
  };

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    triggerToast(t.auth_success);
  };

  // Add Car handler
  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !model || !price) {
      triggerToast(lang === 'RU' ? 'Заполните обязательные поля!' : 'Милдеттүү талааларды толтуруңуз!');
      return;
    }

    const newCar: Car = {
      id: String(Date.now()),
      brand,
      model,
      year: parseInt(year),
      price: parseInt(price),
      mileage: parseInt(mileage) || 0,
      engine: `${engine}L`,
      transmission: { RU: transmission, KG: transmission === 'Automatic' ? 'Автомат' : 'Механика', EN: transmission },
      drive: { RU: drive, KG: drive, EN: drive },
      color: { RU: color, KG: color, EN: color },
      image: uploadedPhotos[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      dealer: dealerName,
      city: { RU: 'Бишкек', KG: 'Бишкек', EN: 'Bishkek' },
      isNew: parseInt(year) >= 2025,
      whatsappNumber: '+996555778899',
      phoneNumber: '+996555778899',
      description: {
        RU: descriptionText || 'Отличный автомобиль премиум-класса от надежного дилера.',
        KG: descriptionText || 'Ишенимдүү дилерден мыкты премиум-класстагы унаа.',
        EN: descriptionText || 'Excellent premium class vehicle from a trusted dealership.'
      },
      fuelType: { RU: fuel, KG: fuel, EN: fuel },
      bodyType: { RU: body, KG: body, EN: body },
      status: 'available',
      popularity: 80,
      createdAt: new Date().toISOString()
    };

    setCars(prev => [newCar, ...prev]);
    triggerToast(lang === 'RU' ? 'Автомобиль успешно добавлен в общий каталог!' : 'Унаа жалпы каталогго ийгиликтүү кошулду!');
    setActiveTab('cars');

    // Reset Form
    setBrand('');
    setModel('');
    setPrice('');
    setMileage('');
    setVin('');
    setDescriptionText('');
    setFeaturesInput('');
    setVideoUrl('');
  };

  // Toggle visible/sold state of cars
  const toggleCarStatus = (carId: string, statusType: 'available' | 'sold' | 'paused') => {
    setCars(prev => prev.map(c => c.id === carId ? { ...c, status: statusType } : c));
    triggerToast(lang === 'RU' ? 'Статус унаа изменен!' : 'Унаанын статусу өзгөртүлдү!');
  };

  const promoteCarToVip = (carId: string) => {
    setCars(prev => prev.map(c => c.id === carId ? { ...c, isPremium: !c.isPremium } : c));
    triggerToast(lang === 'RU' ? 'Статус VIP обновлен!' : 'VIP статусу жаңыртылды!');
  };

  const duplicateCar = (carId: string) => {
    const target = cars.find(c => c.id === carId);
    if (!target) return;
    const copied: Car = {
      ...target,
      id: String(Date.now()),
      model: `${target.model} (Copy)`,
      createdAt: new Date().toISOString()
    };
    setCars(prev => [copied, ...prev]);
    triggerToast(lang === 'RU' ? 'Объявление продублировано!' : 'Кулактандыруу көчүрүлдү!');
  };

  const deleteCar = (carId: string) => {
    setCars(prev => prev.filter(c => c.id !== carId));
    setSelectedCarIds(prev => prev.filter(id => id !== carId));
    triggerToast(lang === 'RU' ? 'Объявление удалено!' : 'Кулактандыруу өчүрүлдү!');
  };

  // Bulk operations
  const handleBulkDelete = () => {
    if (selectedCarIds.length === 0) return;
    setCars(prev => prev.filter(c => !selectedCarIds.includes(c.id)));
    setSelectedCarIds([]);
    triggerToast(lang === 'RU' ? 'Выбранные объявления удалены!' : 'Тандалган жарыялар өчүрүлдү!');
  };

  const handleBulkMarkSold = () => {
    if (selectedCarIds.length === 0) return;
    setCars(prev => prev.map(c => selectedCarIds.includes(c.id) ? { ...c, status: 'sold' } : c));
    setSelectedCarIds([]);
    triggerToast(lang === 'RU' ? 'Выбранные отмечены как продано!' : 'Тандалган унаалар сатылды деп белгиленди!');
  };

  const handleBulkPromoteVip = () => {
    if (selectedCarIds.length === 0) return;
    setCars(prev => prev.map(c => selectedCarIds.includes(c.id) ? { ...c, isPremium: true } : c));
    setSelectedCarIds([]);
    triggerToast(lang === 'RU' ? 'Выбранные унаа повышены до VIP!' : 'Тандалган унаалар VIP деңгээлине көтөрүлдү!');
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    triggerToast(lang === 'RU' ? 'Статус заявки обновлен!' : 'Билдирүү статусу жаңыртылды!');
  };

  // Submit Review reply
  const handleSubmitReply = (reviewId: string) => {
    const text = reviewReplies[reviewId];
    if (!text) return;
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: text } : r));
    triggerToast(lang === 'RU' ? 'Ответ опубликован!' : 'Жооп жарыяланды!');
  };

  // Handle send message in chat mockup
  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    setChats(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          lastMsg: typedMessage,
          messages: [...c.messages, { sender: 'dealer', text: typedMessage }]
        };
      }
      return c;
    }));
    setTypedMessage('');
  };

  const currentChat = chats.find(c => c.id === selectedChatId);

  // Authentication Guard Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070708] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
        
        {/* Futuristic glowing spheres */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#111115]/90 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#0B3D91] rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-blue-900/30">
              <CarIcon className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-center">{t.login_title}</h1>
            <p className="text-xs text-gray-400 text-center mt-1.5 leading-relaxed">{t.login_subtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500" />
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="dealer@autohub.kg" 
                  className="w-full bg-[#18181c] border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500 text-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">{t.phone}</label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500" />
                <input 
                  type="tel" 
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+996 555 123 456" 
                  className="w-full bg-[#18181c] border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500 text-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">{t.password}</label>
                <button type="button" onClick={() => triggerToast(lang === 'RU' ? 'Ссылка для сброса пароля отправлена на ваш Email!' : 'Паролду калыбына келтирүү шилтемеси почтаңызга жөнөтүлдү!')} className="text-xs text-blue-400 hover:underline">{t.forgot_password}</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500" />
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#18181c] border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500 text-white transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all text-sm mt-2"
            >
              {t.btn_login}
            </button>
          </form>

          {/* Quick Demo entrance - vital for good developer testing and UX */}
          <div className="mt-4">
            <button 
              onClick={handleDemoLogin}
              className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center space-x-2"
            >
              <span>{t.btn_demo}</span>
            </button>
          </div>

          <div className="relative my-6 text-center">
            <span className="bg-[#111115] px-3 text-xs text-gray-500 relative z-10">{t.or_login_with}</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-800" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleDemoLogin} className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl py-2 text-xs transition-all font-medium">
              <span>Google</span>
            </button>
            <button onClick={handleDemoLogin} className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl py-2 text-xs transition-all font-medium">
              <span>Apple ID</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleDemoLogin} className="text-xs text-gray-400 hover:text-white transition-colors">
              {t.btn_register}
            </button>
          </div>
        </div>

        <button 
          onClick={onBackToCatalog} 
          className="mt-6 flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        {/* Floating notifications */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-xl text-xs font-semibold flex items-center space-x-2 border border-blue-400/20"
            >
              <Check className="w-4 h-4 bg-white/20 rounded-full p-0.5" />
              <span>{showToast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070708] text-gray-100 flex flex-col md:flex-row relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-2 border border-blue-400/20 font-medium text-xs tracking-wide"
          >
            <Sparkles className="w-4.5 h-4.5 text-yellow-300" />
            <span>{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION - Modern minimalist design */}
      <aside className="w-full md:w-64 bg-[#0d0d11] border-b md:border-b-0 md:border-r border-gray-900 flex flex-col">
        <div className="p-6 border-b border-gray-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <LogoIcon size={36} />
            <div className="flex flex-col text-left">
              <span className="font-sans font-black text-sm tracking-wider uppercase text-white leading-none">АСКАР АВТОХАБ</span>
              <span className="text-[8px] text-blue-400 tracking-[0.25em] font-black block mt-1 leading-none">
                {lang === 'RU' ? 'ДИЛЕР • КЖ' : lang === 'KG' ? 'ДИЛЕР • КЖ' : 'DEALER • KG'}
              </span>
            </div>
          </div>

          <button 
            onClick={onBackToCatalog} 
            className="md:hidden bg-white/5 p-1.5 rounded-lg border border-white/10 hover:bg-white/10"
            title={t.back}
          >
            <ArrowLeft className="w-4.5 h-4.5 text-gray-300" />
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: t.tab_dashboard, icon: Home },
            { id: 'cars', label: t.tab_my_cars, icon: CarIcon },
            { id: 'add', label: t.tab_add_car, icon: PlusCircle },
            { id: 'messages', label: t.tab_messages, icon: MessageSquare },
            { id: 'leads', label: t.tab_leads, icon: FileText },
            { id: 'analytics', label: t.tab_analytics, icon: BarChart3 },
            { id: 'subscription', label: t.tab_subscription, icon: CreditCard },
            { id: 'reviews', label: t.tab_reviews, icon: Star },
            { id: 'notifications', label: t.tab_notifications, icon: Bell },
            { id: 'profile', label: t.tab_profile, icon: User },
            { id: 'settings', label: t.tab_settings, icon: SettingsIcon },
            { id: 'support', label: t.tab_support, icon: HelpCircle },
            { id: 'ai-assist', label: t.tab_ai_assist, icon: Sparkles, highlight: true },
            { id: 'logout', label: lang === 'RU' ? 'Выйти' : lang === 'KG' ? 'Чыгуу' : 'Logout', icon: LogOut, isLogout: true }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isLogout) {
                    setIsAuthenticated(false);
                    triggerToast(lang === 'RU' ? 'Вы вышли из системы!' : 'Системадан чыктыңыз!');
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                    : item.highlight
                      ? 'text-yellow-400 hover:bg-yellow-400/5 hover:text-yellow-300'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4.5 h-4.5 ${activeTab === item.id ? 'text-white' : item.highlight ? 'text-yellow-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.id === 'leads' && (
                  <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {leads.filter(l => l.status === 'new').length}
                  </span>
                )}
                {item.id === 'messages' && (
                  <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">1</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-900 flex flex-col space-y-3">
          <div className="bg-[#141419] p-3 rounded-xl border border-gray-800">
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">{dealerName}</span>
            <span className="text-[10px] text-gray-500 block truncate mt-0.5">{dealerEmail}</span>
          </div>

          <button 
            onClick={onBackToCatalog}
            className="w-full bg-[#18181c] hover:bg-[#202026] text-gray-300 hover:text-white border border-gray-800 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE CONTENT */}
      <main className="flex-1 bg-[#070708] flex flex-col min-w-0">
        
        {/* Top bar header */}
        <header className="bg-[#0d0d11]/80 backdrop-blur-md border-b border-gray-900 py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>{t.title}</span>
              <span className="text-xs bg-white/10 text-gray-300 font-normal px-2 py-0.5 rounded-md">Bishkek, KG</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{t.subtitle}</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick action button to simulate Gemini post generation */}
            <button 
              onClick={() => setActiveTab('ai-assist')}
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 hover:from-yellow-500/20 hover:to-amber-500/20 border border-yellow-500/20 text-yellow-400 hover:text-yellow-300 font-semibold text-xs py-2 px-3.5 rounded-xl transition-all"
            >
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>{lang === 'RU' ? 'AI Ассистент' : 'AI Assistant'}</span>
            </button>

            {/* Simulated notification status */}
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping mr-2" />
            <span className="text-[10px] tracking-wider font-bold text-green-400 uppercase hidden sm:inline">{lang === 'RU' ? 'Сервер Активен' : 'Server Active'}</span>
          </div>
        </header>

        {/* Tabs workspaces */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. OVERVIEW / DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Visual stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                  {[
                    { label: t.stats_active, value: cars.filter(c => c.status === 'available').length, change: 'Live now', trend: 'neutral', color: 'border-green-500/20 text-green-500' },
                    { label: t.stats_sold, value: cars.filter(c => c.status === 'sold').length + 4, change: '+1 today', trend: 'up', color: 'border-purple-500/20 text-purple-500' },
                    { label: t.stats_pending, value: 1, change: '1 review', trend: 'neutral', color: 'border-amber-500/20 text-amber-500' },
                    { label: t.stats_vip, value: cars.filter(c => c.isPremium).length + 2, change: 'VIP status', trend: 'up', color: 'border-yellow-500/20 text-yellow-500' },
                    { label: t.stats_views, value: '28.4K', change: '+12% MoM', trend: 'up', color: 'border-cyan-500/20 text-cyan-500' },
                    { label: t.stats_favs, value: '382', change: '+24 new', trend: 'up', color: 'border-yellow-500/20 text-yellow-500' },
                    { label: t.stats_messages_received, value: '48', change: 'Live chats', trend: 'neutral', color: 'border-emerald-500/20 text-emerald-500' },
                    { label: t.stats_phone_clicks, value: '143', change: 'Direct calls', trend: 'up', color: 'border-blue-500/20 text-blue-500' },
                    { label: t.stats_whatsapp_clicks, value: '294', change: 'Chat clicks', trend: 'up', color: 'border-green-500/20 text-green-500' },
                    { label: t.stats_revenue, value: '$1,200', change: 'Active Plan', trend: 'up', color: 'border-indigo-500/20 text-indigo-500' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-4.5 shadow-sm hover:border-gray-800 transition-all flex flex-col justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block">{stat.label}</span>
                      <div className="flex items-baseline space-x-1.5 mt-2.5">
                        <span className="text-xl md:text-2xl font-black text-white">{stat.value}</span>
                        <span className="text-[9px] font-semibold text-gray-400 block truncate">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions bar */}
                <div className="bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-900/20 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">{lang === 'RU' ? 'Используйте искусственный интеллект для ускорения продаж!' : 'Use Artificial Intelligence to accelerate sales!'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{lang === 'RU' ? 'Оптимальная цена, описание и автоматические посты готовы к генерации в 1 клик.' : 'Optimal pricing, description, and auto-generated social posts in 1 click.'}</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('ai-assist')}
                    className="self-start md:self-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-900/25 transition-all hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>{lang === 'RU' ? 'Запустить AI Ассистента' : 'Launch AI Assistant'}</span>
                  </button>
                </div>

                {/* Analytics Charts */}
                <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-extrabold tracking-wide uppercase text-white">
                        {lang === 'RU' ? 'Аналитика активности' : lang === 'KG' ? 'Активдүүлүктүн аналитикасы' : 'Activity Analytics'}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {lang === 'RU' ? 'Динамика просмотров, кликов по контактам и добавлений в избранное.' : 'Dynamics of views, contact clicks, and favorites additions.'}
                      </p>
                    </div>
                    <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 self-start sm:self-auto">
                      <button
                        onClick={() => setChartPeriod('weekly')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartPeriod === 'weekly' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                      >
                        {lang === 'RU' ? 'Неделя' : lang === 'KG' ? 'Апта' : 'Weekly'}
                      </button>
                      <button
                        onClick={() => setChartPeriod('monthly')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartPeriod === 'monthly' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                      >
                        {lang === 'RU' ? 'Месяц' : lang === 'KG' ? 'Ай' : 'Monthly'}
                      </button>
                    </div>
                  </div>

                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartPeriod === 'weekly' ? [
                          { name: lang === 'RU' ? 'Пн' : 'Mon', views: 240, clicks: 40, favs: 11 },
                          { name: lang === 'RU' ? 'Вт' : 'Tue', views: 398, clicks: 60, favs: 18 },
                          { name: lang === 'RU' ? 'Ср' : 'Wed', views: 980, clicks: 200, favs: 45 },
                          { name: lang === 'RU' ? 'Чт' : 'Thu', views: 390, clicks: 120, favs: 21 },
                          { name: lang === 'RU' ? 'Пт' : 'Fri', views: 480, clicks: 170, favs: 31 },
                          { name: lang === 'RU' ? 'Сб' : 'Sat', views: 380, clicks: 140, favs: 29 },
                          { name: lang === 'RU' ? 'Вс' : 'Sun', views: 430, clicks: 150, favs: 34 },
                        ] : [
                          { name: 'Jan', views: 4500, clicks: 800, favs: 120 },
                          { name: 'Feb', views: 5200, clicks: 920, favs: 145 },
                          { name: 'Mar', views: 6100, clicks: 1100, favs: 190 },
                          { name: 'Apr', views: 5800, clicks: 1050, favs: 170 },
                          { name: 'May', views: 7300, clicks: 1400, favs: 230 },
                          { name: 'Jun', views: 8200, clicks: 1650, favs: 280 },
                          { name: 'Jul', views: 9500, clicks: 1920, favs: 340 },
                        ]}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f2e" opacity={0.3} />
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} />
                        <YAxis stroke="#6b7280" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0d0d11', borderColor: '#1f1f2e', borderRadius: '12px', fontSize: '11px' }} />
                        <Legend wrapperStyle={{ fontSize: '11px', marginTop: '10px' }} />
                        <Area type="monotone" name={lang === 'RU' ? 'Просмотры' : 'Views'} dataKey="views" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" name={lang === 'RU' ? 'Клики' : 'Clicks'} dataKey="clicks" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Dashboard bottom visual splits */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Leads list preview */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-extrabold tracking-wide uppercase text-white">{lang === 'RU' ? 'Последние заявки' : 'Recent Leads'}</h3>
                      <button onClick={() => setActiveTab('leads')} className="text-xs text-blue-400 hover:underline flex items-center">
                        <span>{lang === 'RU' ? 'Все заявки' : 'All Leads'}</span>
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {leads.slice(0, 3).map((lead) => (
                        <div key={lead.id} className="bg-[#141419] border border-gray-900 rounded-xl p-3.5 flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-white block">{lead.name}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{lead.car} • {lead.phone}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${
                            lead.status === 'new' 
                              ? 'bg-red-500/15 text-red-400 border border-red-500/25' 
                              : lead.status === 'in_progress' 
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' 
                                : 'bg-gray-500/15 text-gray-400 border border-gray-500/25'
                          }`}>
                            {lead.status === 'new' ? t.status_new : lead.status === 'in_progress' ? t.status_in_progress : t.status_closed}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Test Drives timeline preview */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-extrabold tracking-wide uppercase text-white">{lang === 'RU' ? 'Записи на тест-драйв' : 'Test Drives'}</h3>
                      <button onClick={() => setActiveTab('test-drives')} className="text-xs text-blue-400 hover:underline flex items-center">
                        <span>{lang === 'RU' ? 'Календарь' : 'Calendar'}</span>
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {testDrives.map((td) => (
                        <div key={td.id} className="bg-[#141419] border border-gray-900 rounded-xl p-3.5 flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-white block">{td.client}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{td.car} • {td.date} в {td.time}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${
                            td.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/25' : 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                          }`}>
                            {td.status === 'confirmed' ? (lang === 'RU' ? 'Подтвержден' : 'Confirmed') : (lang === 'RU' ? 'Ожидает' : 'Pending')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. MY VEHICLES / CARS TAB */}
            {activeTab === 'cars' && (() => {
              // Filter and sort logical pipeline
              const filteredCars = cars.filter(car => {
                const query = searchQuery.toLowerCase();
                const matchesSearch = car.brand.toLowerCase().includes(query) || car.model.toLowerCase().includes(query) || car.year.toString().includes(query);
                const matchesBrand = filterBrand === 'all' ? true : car.brand.toLowerCase() === filterBrand.toLowerCase();
                const matchesStatus = filterStatus === 'all' ? true : car.status === filterStatus;
                return matchesSearch && matchesBrand && matchesStatus;
              }).sort((a, b) => {
                if (sortKey === 'price_asc') return a.price - b.price;
                if (sortKey === 'price_desc') return b.price - a.price;
                if (sortKey === 'views_desc') return (b.popularity * 12) - (a.popularity * 12);
                // default or newest:
                return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
              });

              // Brand list for dropdown filter
              const uniqueBrands = Array.from(new Set(cars.map(c => c.brand)));

              const toggleSelectAll = () => {
                if (selectedCarIds.length === filteredCars.length) {
                  setSelectedCarIds([]);
                } else {
                  setSelectedCarIds(filteredCars.map(c => c.id));
                }
              };

              const toggleSelectOne = (id: string) => {
                if (selectedCarIds.includes(id)) {
                  setSelectedCarIds(prev => prev.filter(x => x !== id));
                } else {
                  setSelectedCarIds(prev => [...prev, id]);
                }
              };

              return (
                <motion.div 
                  key="cars"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black tracking-wide uppercase text-white">{t.tab_my_cars}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {lang === 'RU' ? 'Управляйте списком ваших унаа, продвигайте в VIP и отслеживайте статистику.' : 'Manage your active listings, promote to VIP status, and review statistics.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('add')}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center space-x-1.5 transition-all shadow-md self-start sm:self-auto"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{t.tab_add_car}</span>
                    </button>
                  </div>

                  {/* Search and Filters Bar */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={lang === 'RU' ? 'Поиск марки, модели...' : 'Search brand, model...'}
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                      {/* Filter by Brand */}
                      <select 
                        value={filterBrand}
                        onChange={(e) => setFilterBrand(e.target.value)}
                        className="bg-[#141419] border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                      >
                        <option value="all">{lang === 'RU' ? 'Все марки' : 'All brands'}</option>
                        {uniqueBrands.map(b => (
                          <option key={b} value={b.toLowerCase()}>{b}</option>
                        ))}
                      </select>

                      {/* Filter by Status */}
                      <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-[#141419] border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                      >
                        <option value="all">{lang === 'RU' ? 'Все статусы' : 'All statuses'}</option>
                        <option value="available">{lang === 'RU' ? 'В продаже' : 'Available'}</option>
                        <option value="sold">{lang === 'RU' ? 'Продано' : 'Sold'}</option>
                        <option value="paused">{lang === 'RU' ? 'Пауза' : 'Paused'}</option>
                      </select>

                      {/* Sort selection */}
                      <select 
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value)}
                        className="bg-[#141419] border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                      >
                        <option value="newest">{lang === 'RU' ? 'Сначала новые' : 'Newest'}</option>
                        <option value="price_asc">{lang === 'RU' ? 'Цена: по возрастанию' : 'Price: Low to High'}</option>
                        <option value="price_desc">{lang === 'RU' ? 'Цена: по убыванию' : 'Price: High to Low'}</option>
                        <option value="views_desc">{lang === 'RU' ? 'По популярности' : 'Most viewed'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Bulk Actions Panel */}
                  {selectedCarIds.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-950/20 border border-blue-900/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <span className="text-xs text-blue-400 font-bold">
                        {lang === 'RU' ? `Выбрано унаа: ${selectedCarIds.length}` : `Selected ${selectedCarIds.length} vehicles`}
                      </span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={handleBulkPromoteVip}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                          {lang === 'RU' ? 'Сделать VIP' : 'Promote to VIP'}
                        </button>
                        <button 
                          onClick={handleBulkMarkSold}
                          className="bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                          {lang === 'RU' ? 'Отметить как продано' : 'Mark as Sold'}
                        </button>
                        <button 
                          onClick={handleBulkDelete}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                          {lang === 'RU' ? 'Удалить выбранные' : 'Delete Selected'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Table container */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-900 bg-[#111115] text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                            <th className="py-4 px-5 w-12">
                              <input 
                                type="checkbox" 
                                checked={filteredCars.length > 0 && selectedCarIds.length === filteredCars.length}
                                onChange={toggleSelectAll}
                                className="rounded border-gray-800 bg-[#141419] text-blue-500 focus:ring-0"
                              />
                            </th>
                            <th className="py-4 px-5">{t.table_photo}</th>
                            <th className="py-4 px-5">{t.table_model}</th>
                            <th className="py-4 px-5">{t.table_year}</th>
                            <th className="py-4 px-5">{t.table_price}</th>
                            <th className="py-4 px-5">{t.table_status}</th>
                            <th className="py-4 px-5">{lang === 'RU' ? 'Статистика (Глаз/Сердце)' : 'Stats (Views/Favs)'}</th>
                            <th className="py-4 px-5 text-right">{t.table_actions}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-900 text-xs">
                          {filteredCars.map((car) => (
                            <tr key={car.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-5">
                                <input 
                                  type="checkbox" 
                                  checked={selectedCarIds.includes(car.id)}
                                  onChange={() => toggleSelectOne(car.id)}
                                  className="rounded border-gray-800 bg-[#141419] text-blue-500 focus:ring-0"
                                />
                              </td>
                              <td className="py-4 px-5 relative">
                                <img src={car.image} alt={car.model} className="w-14 h-9 object-cover rounded-md border border-gray-800" />
                                {car.isPremium && (
                                  <span className="absolute top-2 left-2 bg-yellow-500 text-black text-[7px] font-black uppercase px-1 rounded">VIP</span>
                                )}
                              </td>
                              <td className="py-4 px-5">
                                <span className="font-bold text-white block">{car.brand} {car.model}</span>
                                <span className="text-[10px] text-gray-400 block mt-0.5">{car.engine} • {typeof car.fuelType === 'object' ? car.fuelType[lang] : car.fuelType}</span>
                              </td>
                              <td className="py-4 px-5 text-gray-300 font-medium">
                                {car.year}
                              </td>
                              <td className="py-4 px-5">
                                <span className="font-black text-white block">${car.price.toLocaleString()}</span>
                                <span className="text-[10px] text-gray-500 block">~{(car.price * 85).toLocaleString()} KGS</span>
                              </td>
                              <td className="py-4 px-5">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                                  car.status === 'sold' 
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                    : car.status === 'paused'
                                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                      : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                }`}>
                                  {car.status === 'sold' ? t.status_sold : car.status === 'paused' ? (lang === 'RU' ? 'Пауза' : 'Paused') : t.status_available}
                                </span>
                              </td>
                              <td className="py-4 px-5 text-gray-400 font-mono font-medium">
                                <div className="flex items-center space-x-2">
                                  <span>👁️ {car.popularity * 12 + 140}</span>
                                  <span>❤️ {Math.round(car.popularity * 0.4 + 12)}</span>
                                </div>
                              </td>
                              <td className="py-4 px-5 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  {/* Edit/Duplicate actions */}
                                  <button 
                                    onClick={() => duplicateCar(car.id)}
                                    className="bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-2 py-1 rounded text-[10px] font-bold transition-all"
                                    title="Duplicate"
                                  >
                                    {lang === 'RU' ? 'Копия' : 'Copy'}
                                  </button>

                                  <button 
                                    onClick={() => promoteCarToVip(car.id)}
                                    className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                                      car.isPremium 
                                        ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' 
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                    }`}
                                  >
                                    {car.isPremium ? 'VIP' : (lang === 'RU' ? 'В VIP' : 'To VIP')}
                                  </button>

                                  {/* Toggle active / sold / pause listing */}
                                  <select
                                    value={car.status}
                                    onChange={(e) => toggleCarStatus(car.id, e.target.value as any)}
                                    className="bg-[#141419] border border-gray-800 text-[10px] font-bold text-gray-300 rounded px-1.5 py-1 focus:outline-none"
                                  >
                                    <option value="available">{lang === 'RU' ? 'Активен' : 'Active'}</option>
                                    <option value="paused">{lang === 'RU' ? 'Пауза' : 'Pause'}</option>
                                    <option value="sold">{lang === 'RU' ? 'Продан' : 'Sold'}</option>
                                  </select>

                                  {/* Delete listing */}
                                  <button 
                                    onClick={() => deleteCar(car.id)}
                                    className="bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 p-1 rounded transition-colors"
                                    title={t.action_delete}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                          {filteredCars.length === 0 && (
                            <tr>
                              <td colSpan={8} className="py-12 text-center text-gray-500">
                                {lang === 'RU' ? 'Нет автомобилей, соответствующих критериям фильтра.' : 'No vehicles match the selected criteria.'}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* 3. ADD CAR FORM TAB */}
            {activeTab === 'add' && (
              <motion.div 
                key="add"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold tracking-wide uppercase text-white">{t.tab_add_car}</h3>
                  <button 
                    onClick={() => setActiveTab('cars')} 
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {t.tab_my_cars}
                  </button>
                </div>

                <form onSubmit={handleAddCar} className="space-y-6 bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 md:p-8">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_brand} *</label>
                      <input 
                        type="text" 
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="BMW, Tesla, Toyota..." 
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_model} *</label>
                      <input 
                        type="text" 
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="X5, Model Y, Camry..." 
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_year} *</label>
                      <select 
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      >
                        {Array.from({ length: 16 }, (_, i) => 2026 - i).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_price} *</label>
                      <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="45000" 
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_mileage} (км)</label>
                      <input 
                        type="number" 
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        placeholder="22000" 
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_vin}</label>
                      <input 
                        type="text" 
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        placeholder="5YJ3E1EB..." 
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_fuel}</label>
                      <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all">
                        <option value="Petrol">{lang === 'RU' ? 'Бензин' : 'Petrol'}</option>
                        <option value="Diesel">{lang === 'RU' ? 'Дизель' : 'Diesel'}</option>
                        <option value="Electric">{lang === 'RU' ? 'Электро' : 'Electric'}</option>
                        <option value="Hybrid">{lang === 'RU' ? 'Гибрид' : 'Hybrid'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_transmission}</label>
                      <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all">
                        <option value="Automatic">{lang === 'RU' ? 'Автомат' : 'Automatic'}</option>
                        <option value="Manual">{lang === 'RU' ? 'Механика' : 'Manual'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_body}</label>
                      <select value={body} onChange={(e) => setBody(e.target.value)} className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all">
                        <option value="Sedan">{lang === 'RU' ? 'Седан' : 'Sedan'}</option>
                        <option value="SUV">{lang === 'RU' ? 'Внедорожник' : 'SUV'}</option>
                        <option value="Crossover">{lang === 'RU' ? 'Кроссовер' : 'Crossover'}</option>
                        <option value="Hatchback">{lang === 'RU' ? 'Хэтчбек' : 'Hatchback'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_drive}</label>
                      <select value={drive} onChange={(e) => setDrive(e.target.value)} className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all">
                        <option value="AWD">{lang === 'RU' ? 'Полный' : 'AWD'}</option>
                        <option value="RWD">{lang === 'RU' ? 'Задний' : 'RWD'}</option>
                        <option value="FWD">{lang === 'RU' ? 'Передний' : 'FWD'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo & Video Upload (Visual mockups but highly responsive) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-gray-900 pt-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_photos} (Max 30)</label>
                      <div className="bg-[#141419] border-2 border-dashed border-gray-800 hover:border-blue-600 transition-all rounded-xl p-6 text-center cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                        <span className="text-xs text-gray-300 block font-medium">{t.drag_drop_text}</span>
                        <span className="text-[10px] text-gray-500 block mt-1">MIME: JPEG, PNG • Up to 15MB each</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_video}</label>
                      <div className="relative">
                        <Video className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-500" />
                        <input 
                          type="url" 
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..." 
                          className="w-full bg-[#141419] border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 block mt-1.5 leading-relaxed">{lang === 'RU' ? 'Видеообзор увеличивает конверсию объявлений на 42%.' : 'A video review increases listing conversion by up to 42%.'}</span>
                    </div>
                  </div>

                  {/* Description text area with AI Assist Button inside */}
                  <div className="border-t border-gray-900 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{t.form_description}</label>
                      
                      {/* Real AI description generator trigger */}
                      <button 
                        type="button"
                        onClick={() => handleAiAction('ai_description')}
                        className="bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 hover:text-yellow-300 border border-yellow-500/20 text-[10px] font-bold py-1 px-3 rounded-full flex items-center space-x-1.5 transition-all shadow-sm"
                        disabled={isAiLoading['ai_description']}
                      >
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        <span>{isAiLoading['ai_description'] ? (lang === 'RU' ? 'AI думает...' : 'AI thinking...') : t.ai_desc_btn}</span>
                      </button>
                    </div>

                    <textarea 
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      rows={5} 
                      placeholder={lang === 'RU' ? 'Опишите преимущества, состояние кузова, салона, обслуживание...' : 'Describe benefits, body condition, salon, service logs...'}
                      className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-all leading-relaxed"
                    />
                  </div>

                  {/* Features list */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.form_features}</label>
                    <input 
                      type="text" 
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder={lang === 'RU' ? 'Кожаный салон, панорамная крыша, подогрев руля, датчик слепых зон' : 'Leather seats, panoramic roof, heated steering wheel, blind spot monitor'} 
                      className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Pricing helpers */}
                  <div className="bg-[#141419] border border-gray-900 p-4 rounded-xl flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-medium">{lang === 'RU' ? 'Оценить рыночную стоимость с помощью AI?' : 'Get AI price suggestions?'}</span>
                    <button 
                      type="button" 
                      onClick={() => handleAiAction('ai_price')}
                      className="bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 hover:text-blue-300 font-bold text-[10px] py-1.5 px-3.5 rounded-full transition-all"
                    >
                      {t.ai_price_btn}
                    </button>
                  </div>

                  {aiOutputs['ai_price'] && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-950/20 border border-blue-900/35 p-4 rounded-xl text-xs text-blue-300 leading-relaxed font-mono whitespace-pre-wrap"
                    >
                      {aiOutputs['ai_price']}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="border-t border-gray-900 pt-6 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all text-xs hover:scale-[1.01]"
                    >
                      {t.btn_add_car}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* 4. CLIENT LEADS TAB */}
            {activeTab === 'leads' && (
              <motion.div 
                key="leads"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold tracking-wide uppercase text-white">{t.leads_title}</h3>
                  <span className="text-xs text-gray-400">{leads.length} Leads Total</span>
                </div>

                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-sm text-white">{lead.name}</span>
                          <span className="text-[10px] text-gray-500 font-mono">{lead.date}</span>
                        </div>
                        <p className="text-xs text-gray-300">
                          <span className="font-medium text-gray-400">{t.leads_interest}:</span> <strong className="text-blue-400 font-semibold">{lead.car}</strong>
                        </p>
                        <p className="text-xs text-gray-400 flex items-center space-x-2">
                          <Phone className="w-3.5 h-3.5 text-gray-500" />
                          <span>{lead.phone}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Status update dropdown selector */}
                        <select 
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                          className="bg-[#141419] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300 font-bold focus:outline-none focus:border-blue-500 transition-all"
                        >
                          <option value="new">{t.status_new}</option>
                          <option value="in_progress">{t.status_in_progress}</option>
                          <option value="closed">{t.status_closed}</option>
                        </select>

                        <button 
                          onClick={() => {
                            setSelectedChatId('1');
                            setActiveTab('messages');
                          }}
                          className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/15 text-xs font-bold py-1.5 px-3.5 rounded-xl transition-all"
                        >
                          {lang === 'RU' ? 'Чат' : 'Chat'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 5. MESSAGES / CHAT TAB */}
            {activeTab === 'messages' && (
              <motion.div 
                key="messages"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-[#0d0d11] border border-gray-900 rounded-2xl h-[600px] overflow-hidden flex flex-col md:flex-row shadow-sm"
              >
                {/* Left panel - Recent chats */}
                <div className="w-full md:w-80 border-r border-gray-900 flex flex-col">
                  <div className="p-4 border-b border-gray-900 bg-[#111115]">
                    <span className="text-xs font-extrabold tracking-wider uppercase text-white">{t.tab_messages}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-gray-950">
                    {chats.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => setSelectedChatId(chat.id)}
                        className={`w-full p-4 text-left hover:bg-white/[0.01] transition-all flex justify-between items-start ${
                          selectedChatId === chat.id ? 'bg-white/[0.02]' : ''
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white block truncate">{chat.clientName}</span>
                            {chat.unread && (
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 truncate block mt-1">{chat.lastMsg}</span>
                        </div>
                        <span className="text-[9px] text-gray-500 ml-2">{chat.time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right panel - Active chat */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#070708]">
                  {currentChat ? (
                    <>
                      {/* Active Chat Header */}
                      <div className="p-4 border-b border-gray-900 bg-[#0d0d11] flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">{currentChat.clientName}</span>
                          <span className="text-[10px] text-green-400 block mt-0.5">{lang === 'RU' ? 'Кардар байланышта' : 'Client online'}</span>
                        </div>
                        
                        {/* AI suggest message generator inside chat */}
                        <button 
                          onClick={() => handleAiAction('ai_chat_1')}
                          className="bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 border border-yellow-500/20 text-[10px] font-bold py-1 px-3 rounded-full flex items-center space-x-1 transition-all"
                        >
                          <Sparkles className="w-3 h-3 text-yellow-400" />
                          <span>{isAiLoading['ai_chat_1'] ? '...' : t.reviews_ai_suggest}</span>
                        </button>
                      </div>

                      {/* Chat Messages scroll area */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
                        {currentChat.messages.map((m, i) => (
                          <div 
                            key={i} 
                            className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                              m.sender === 'dealer' 
                                ? 'bg-blue-600 text-white self-end rounded-tr-none' 
                                : 'bg-[#141419] text-gray-200 border border-gray-900 self-start rounded-tl-none'
                            }`}
                          >
                            <p>{m.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Input controls */}
                      <div className="p-4 border-t border-gray-900 bg-[#0d0d11] flex space-x-2">
                        <input 
                          type="text" 
                          value={typedMessage}
                          onChange={(e) => setTypedMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder={lang === 'RU' ? 'Введите ваше сообщение...' : 'Type your message...'} 
                          className="flex-1 bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                        <button 
                          onClick={handleSendMessage}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shadow-md transition-all flex-shrink-0"
                        >
                          <Send className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col justify-center items-center text-gray-500 text-xs">
                      <MessageSquare className="w-10 h-10 mb-2 text-gray-700" />
                      <span>Выберите чат из меню слева</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 6. TEST DRIVES TAB */}
            {activeTab === 'test-drives' && (
              <motion.div 
                key="test-drives"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold tracking-wide uppercase text-white">{t.tab_test_drives}</h3>
                  <button 
                    onClick={() => triggerToast(lang === 'RU' ? 'Новая бронь тест-драйва создана!' : 'Жаңы тест-драйв брону түзүлдү!')}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-bold py-2 px-4 rounded-xl transition-all"
                  >
                    {lang === 'RU' ? '+ Назначить тест-драйв' : '+ Book Test Drive'}
                  </button>
                </div>

                <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-gray-900 bg-[#111115]">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400">{lang === 'RU' ? 'Расписание тест-драйвов' : 'Scheduled Test Drives'}</span>
                  </div>

                  <div className="divide-y divide-gray-900">
                    {testDrives.map((td) => (
                      <div key={td.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.01] transition-all">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2.5">
                            <span className="text-xs font-extrabold text-white">{td.client}</span>
                            <span className="text-[10px] bg-blue-600/10 text-blue-400 font-mono px-2 py-0.5 rounded">{td.date} в {td.time}</span>
                          </div>
                          <p className="text-xs text-gray-300">
                            <span className="text-gray-400 font-medium">{lang === 'RU' ? 'Унаа' : 'Vehicle'}:</span> <strong className="text-blue-400 font-semibold">{td.car}</strong>
                          </p>
                          <p className="text-xs text-gray-400">{td.phone}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setTestDrives(prev => prev.map(item => item.id === td.id ? { ...item, status: 'confirmed' } : item));
                              triggerToast(lang === 'RU' ? 'Тест-драйв подтвержден!' : 'Тест-драйв тастыкталды!');
                            }}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/15 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                          >
                            {lang === 'RU' ? 'Подтвердить' : 'Confirm'}
                          </button>
                          <button 
                            onClick={() => {
                              setTestDrives(prev => prev.filter(item => item.id !== td.id));
                              triggerToast(lang === 'RU' ? 'Тест-драйв отменен' : 'Тест-драйв жокко чыгарылды');
                            }}
                            className="bg-white/5 hover:bg-red-500/15 hover:text-red-400 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-gray-300"
                          >
                            {lang === 'RU' ? 'Отменить' : 'Cancel'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 7. ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <motion.div 
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <h3 className="text-base font-extrabold tracking-wide uppercase text-white">{t.analytics_title}</h3>

                {/* Handcrafted animated interactive SVG Line chart for views count */}
                <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">{t.analytics_views}</h4>
                      <p className="text-2xl font-extrabold text-white mt-1">28,450 {lang === 'RU' ? 'просмотров' : 'views'}</p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-green-400 font-bold bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/15">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+14.2% MoM</span>
                    </div>
                  </div>

                  {/* Clean SVG graph visual representing real dynamics */}
                  <div className="h-56 w-full relative">
                    <svg viewBox="0 0 500 150" className="w-full h-full text-blue-500">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0 130 C 50 110, 100 120, 150 70 C 200 40, 250 90, 300 50 C 350 20, 400 60, 450 30 L 500 10" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path 
                        d="M0 130 C 50 110, 100 120, 150 70 C 200 40, 250 90, 300 50 C 350 20, 400 60, 450 30 L 500 10 L 500 150 L 0 150 Z" 
                        fill="url(#chartGrad)" 
                      />
                      {/* Interactive dots representing weekly values */}
                      <circle cx="150" cy="70" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" className="animate-pulse" />
                      <circle cx="300" cy="50" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" className="animate-pulse" />
                      <circle cx="500" cy="10" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" className="animate-pulse" />
                    </svg>

                    {/* Chart legends */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-gray-500 font-bold px-2 uppercase tracking-widest font-mono">
                      <span>W1</span>
                      <span>W2</span>
                      <span>W3</span>
                      <span>W4</span>
                      <span>{lang === 'RU' ? 'СЕГОДНЯ' : 'TODAY'}</span>
                    </div>
                  </div>
                </div>

                {/* Grid splits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Conversion rate ring */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 flex flex-col items-center text-center justify-center">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-6">{t.analytics_conversion}</h4>
                    
                    <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                      {/* Radial SVG Ring */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="72" cy="72" r="58" stroke="#1f1f2e" strokeWidth="8" fill="transparent" />
                        <circle 
                          cx="72" 
                          cy="72" 
                          r="58" 
                          stroke="#2563eb" 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray="364" 
                          strokeDashoffset="72" // Representing 80% completion rate
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-extrabold text-white">8.4%</span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{lang === 'RU' ? 'СРЕДНИЙ КР' : 'AVG RATE'}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 max-w-xs leading-relaxed">{lang === 'RU' ? 'Конверсия из просмотра объявления в звонок или заявку. Премиум-показатель по рынку!' : 'Conversion from car views to clicks, phone calls, or chat leads. Market leading rate!'}</p>
                  </div>

                  {/* AI Slow-Moving Analysis section */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">{t.analytics_slow_cars}</h4>
                      <button 
                        onClick={() => handleAiAction('ai_slow_selling')}
                        className="bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 text-[10px] font-bold px-3 py-1 rounded-full border border-yellow-500/20 flex items-center space-x-1"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>{isAiLoading['ai_slow_selling'] ? '...' : t.ai_slow_selling_btn}</span>
                      </button>
                    </div>

                    {aiOutputs['ai_slow_selling'] ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-yellow-500/[0.03] border border-yellow-500/15 p-4 rounded-xl text-xs text-yellow-300 leading-relaxed font-mono whitespace-pre-wrap"
                      >
                        {aiOutputs['ai_slow_selling']}
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col justify-center items-center text-gray-500 text-xs py-8">
                        <AlertCircle className="w-8 h-8 mb-2 text-gray-700" />
                        <span>Нажмите на кнопку AI, чтобы проанализировать склад</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 8. MANAGERS TAB */}
            {activeTab === 'managers' && (
              <motion.div 
                key="managers"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold tracking-wide uppercase text-white">{t.tab_managers}</h3>
                  <button 
                    onClick={() => triggerToast(lang === 'RU' ? 'Вы можете пригласить нового менеджера!' : 'Жаңы менеджер чакыра аласыз!')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md"
                  >
                    + Invite Manager
                  </button>
                </div>

                <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-gray-900">
                    {managers.map((mgr) => (
                      <div key={mgr.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center font-bold text-xs text-blue-400 uppercase">
                            {mgr.name.slice(0, 2)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{mgr.name}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{mgr.role}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:items-end text-xs space-y-1">
                          <span className="text-gray-300">{mgr.phone}</span>
                          <span className="text-gray-500 text-[10px]">{mgr.email}</span>
                        </div>

                        <div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            mgr.status === 'online' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {mgr.status === 'online' ? 'Online' : 'Away'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 9. REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <motion.div 
                key="reviews"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-sm font-extrabold tracking-wide uppercase text-white">{t.reviews_rating}</h3>
                    <p className="text-xs text-gray-400 mt-1">{lang === 'RU' ? 'Оценки реальных покупателей на основе сделок' : 'Feedback rating from confirmed vehicle sales'}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-extrabold text-white">4.8</span>
                    <div className="space-y-1">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider">124 REVIEWS TOTAL</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-white block">{rev.author}</span>
                          <div className="flex text-yellow-400 mt-1">
                            {Array.from({ length: rev.rating }).map((_, idx) => (
                              <Star key={idx} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">24.06.2026</span>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-medium">{rev.text}</p>

                      {/* Replied state or Reply Form */}
                      {rev.reply ? (
                        <div className="bg-[#141419] border border-gray-950 p-4 rounded-xl text-xs text-gray-300 mt-2">
                          <span className="font-extrabold text-[10px] text-blue-400 uppercase tracking-wide block mb-1">{lang === 'RU' ? 'Ваш ответ:' : 'Your reply:'}</span>
                          <p className="leading-relaxed">{rev.reply}</p>
                        </div>
                      ) : (
                        <div className="space-y-3 pt-3 border-t border-gray-950">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-400">{t.reviews_reply}</span>
                            
                            {/* Gemini AI reply suggestions trigger */}
                            <button 
                              onClick={() => handleAiAction(`ai_reply_${rev.id}`)}
                              className="bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 text-[10px] font-bold py-0.5 px-3 rounded-full flex items-center space-x-1 border border-yellow-500/25 transition-all"
                            >
                              <Sparkles className="w-3 h-3 text-yellow-400" />
                              <span>{isAiLoading[`ai_reply_${rev.id}`] ? '...' : t.reviews_ai_suggest}</span>
                            </button>
                          </div>

                          <textarea 
                            value={reviewReplies[rev.id] || ''}
                            onChange={(e) => setReviewReplies(prev => ({ ...prev, [rev.id]: e.target.value }))}
                            rows={3}
                            placeholder={lang === 'RU' ? 'Введите текст ответа клиенту...' : 'Type your answer...'}
                            className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                          />

                          <div className="flex justify-end">
                            <button 
                              onClick={() => handleSubmitReply(rev.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold py-1.5 px-4 rounded-xl transition-all shadow-sm"
                            >
                              {lang === 'RU' ? 'Отправить' : 'Submit'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 10. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <h3 className="text-base font-extrabold tracking-wide uppercase text-white">{t.tab_settings}</h3>

                <form onSubmit={(e) => { e.preventDefault(); triggerToast(lang === 'RU' ? 'Настройки успешно сохранены!' : 'Жөндөөлөр ийгиликтүү сакталды!'); }} className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.settings_name}</label>
                      <input 
                        type="text" 
                        value={dealerName}
                        onChange={(e) => setDealerName(e.target.value)}
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.settings_address}</label>
                      <input 
                        type="text" 
                        value={dealerAddress}
                        onChange={(e) => setDealerAddress(e.target.value)}
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.phone}</label>
                      <input 
                        type="text" 
                        value={dealerPhone}
                        onChange={(e) => setDealerPhone(e.target.value)}
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.email}</label>
                      <input 
                        type="email" 
                        value={dealerEmail}
                        onChange={(e) => setDealerEmail(e.target.value)}
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.settings_hours}</label>
                      <input 
                        type="text" 
                        value={dealerHours}
                        onChange={(e) => setDealerHours(e.target.value)}
                        className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-900 pt-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">WhatsApp</label>
                      <input type="text" defaultValue="+996 555 778 899" className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Telegram</label>
                      <input type="text" defaultValue="@autohub_premium_bishkek" className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none" />
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-900 pt-6">
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-md"
                    >
                      {t.settings_save}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* 11. AI ASSIST / FUTURE CAPABILITIES HUB */}
            {activeTab === 'ai-assist' && (
              <motion.div 
                key="ai-assist"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 animate-fade-in"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400 border border-yellow-500/20">
                    <Sparkles className="w-5.5 h-5.5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold tracking-wide uppercase text-white">{lang === 'RU' ? 'Искусственный интеллект Gemini AI' : 'Gemini AI Smart Suite'}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{lang === 'RU' ? 'Инструменты автоматизации и генеративного контента' : 'Automation tools and generative content models'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Option 1: Social Media Hub */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-400">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] bg-blue-600/10 text-blue-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">INSTAGRAM / TELEGRAM</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{t.ai_social_btn}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{lang === 'RU' ? 'Создать профессиональный пост со всеми характеристиками унаа и хэштегами для кыргызстанских авто-сообществ.' : 'Generate localized social media listings with complete details and hashtags.'}</p>
                    
                    <button 
                      onClick={() => handleAiAction('ai_social', 'BMW X5 2022')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow"
                    >
                      <span>{isAiLoading['ai_social'] ? '...' : (lang === 'RU' ? 'Сгенерировать пост' : 'Generate Post')}</span>
                    </button>
                  </div>

                  {/* Option 2: Price Recommendation */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-green-600/10 rounded-lg flex items-center justify-center text-green-400">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] bg-green-600/10 text-green-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">PRICING ALGORITHM</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{t.ai_price_btn}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{lang === 'RU' ? 'Анализирует цены на рынках Бишкека, Оша и Кара-Балты, чтобы рекомендовать лучшую точку входа продаж.' : 'Analyzes Kyrgyzstan marketplaces to recommend the optimal pricing point.'}</p>
                    
                    <button 
                      onClick={() => handleAiAction('ai_price', 'Tesla Model Y 2023')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow"
                    >
                      <span>{isAiLoading['ai_price'] ? '...' : (lang === 'RU' ? 'Оценить авто' : 'Value Vehicle')}</span>
                    </button>
                  </div>

                  {/* Option 3: Sales Speed */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-purple-600/10 rounded-lg flex items-center justify-center text-purple-400">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] bg-purple-600/10 text-purple-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">PREDICTIVE TECH</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{lang === 'RU' ? 'Анализ медленных продаж' : 'Slow Stock Analytics'}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{lang === 'RU' ? 'Показывает, какие унаа продаются медленно, и предлагает шаги для ускорения сделок.' : 'Tracks slow-moving assets in your inventory and suggests immediate sales optimization steps.'}</p>
                    
                    <button 
                      onClick={() => handleAiAction('ai_slow_selling')}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow"
                    >
                      <span>{isAiLoading['ai_slow_selling'] ? '...' : (lang === 'RU' ? 'Проанализировать склад' : 'Analyze Inventory')}</span>
                    </button>
                  </div>
                </div>

                {/* AI Interactive Outputs */}
                <AnimatePresence>
                  {Object.keys(aiOutputs).length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-gray-950 pb-3">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-yellow-400 flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-yellow-400" />
                          <span>Gemini AI Generation Output</span>
                        </span>
                        <button 
                          onClick={() => setAiOutputs({})}
                          className="text-[10px] text-gray-500 hover:text-white"
                        >
                          Clear Outputs
                        </button>
                      </div>

                      <div className="space-y-4 divide-y divide-gray-950">
                        {Object.entries(aiOutputs).map(([key, value]) => {
                          if (!value) return null;
                          return (
                            <div key={key} className="pt-4 first:pt-0">
                              <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase">{key.replace('_', ' ')}:</span>
                              <pre className="text-xs text-gray-300 font-mono leading-relaxed whitespace-pre-wrap bg-[#141419] p-4 rounded-xl border border-gray-950">
                                {value}
                              </pre>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* 12. SUBSCRIPTION TAB */}
            {activeTab === 'subscription' && (
              <motion.div 
                key="subscription"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-black text-white tracking-wide uppercase">{lang === 'RU' ? 'Подписка автосалона' : 'Dealership Subscription'}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'RU' ? 'Управление тарифным планом и рекламными пакетами.' : 'Manage your subscription tier and advertising packages.'}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-950 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">PREMIUM DEALER</span>
                      <span className="text-xs text-green-400 font-semibold">● {lang === 'RU' ? 'Активна' : 'Active'}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white mt-3">{lang === 'RU' ? 'Премиум-пакет автохауса (30 дней)' : 'Premium AutoHouse Package (30 days)'}</h4>
                    <p className="text-xs text-gray-400 mt-1">{lang === 'RU' ? 'Следующее списание: 15 Августа 2026. Сумма: $150.' : 'Next renewal: August 15, 2026. Price: $150.'}</p>
                  </div>
                  <button 
                    onClick={() => triggerToast(lang === 'RU' ? 'Управление счетами открыто!' : 'Billing management launched!')}
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 py-2.5 px-5 rounded-xl text-xs font-bold transition-all"
                  >
                    {lang === 'RU' ? 'История транзакций' : 'Billing Settings'}
                  </button>
                </div>

                {/* Subscriptions Plans Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Plan 1 */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">STANDARD</span>
                      <div className="flex items-baseline space-x-1.5 mt-3">
                        <span className="text-3xl font-black text-white">$50</span>
                        <span className="text-xs text-gray-500">/ {lang === 'RU' ? 'мес.' : 'mo.'}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-4 leading-relaxed">{lang === 'RU' ? 'Базовый тариф для небольших дилеров с лимитом до 15 объявлений одновременно.' : 'Basic package for small dealers. Limit up to 15 listings active simultaneously.'}</p>
                    </div>
                    <button 
                      onClick={() => triggerToast(lang === 'RU' ? 'Вы уже используете Premium!' : 'You already have Premium!')}
                      className="w-full mt-6 bg-[#18181c] hover:bg-[#202026] text-gray-400 text-xs font-bold py-2.5 rounded-xl border border-gray-800 transition-all"
                    >
                      {lang === 'RU' ? 'Перейти на базовый' : 'Downgrade to Standard'}
                    </button>
                  </div>

                  {/* Plan 2 - Active */}
                  <div className="bg-[#0d0d11] border-2 border-blue-600 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase">
                      {lang === 'RU' ? 'ТЕКУЩИЙ' : 'ACTIVE'}
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">PREMIUM</span>
                      <div className="flex items-baseline space-x-1.5 mt-3">
                        <span className="text-3xl font-black text-white">$150</span>
                        <span className="text-xs text-gray-500">/ {lang === 'RU' ? 'мес.' : 'mo.'}</span>
                      </div>
                      <p className="text-xs text-gray-300 mt-4 leading-relaxed">{lang === 'RU' ? 'Лучший выбор! До 100 унаа, VIP значки, доступ к AI генерации описаний и автопостингу.' : 'Best value! Up to 100 listings, VIP badges, full access to Gemini description generator & autostyle.'}</p>
                    </div>
                    <button className="w-full mt-6 bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/30 cursor-default">
                      {lang === 'RU' ? 'Активный план' : 'Current Active Plan'}
                    </button>
                  </div>

                  {/* Plan 3 */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider block">ENTERPRISE ELITE</span>
                      <div className="flex items-baseline space-x-1.5 mt-3">
                        <span className="text-3xl font-black text-white">$299</span>
                        <span className="text-xs text-gray-500">/ {lang === 'RU' ? 'мес.' : 'mo.'}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-4 leading-relaxed">{lang === 'RU' ? 'Безлимитные объявления для крупнейших автохаусов Кыргызстана. 10 VIP поднятий каждый месяц.' : 'Unlimited inventory for the largest auto houses in Kyrgyzstan. Includes 10 VIP boosts monthly.'}</p>
                    </div>
                    <button 
                      onClick={() => triggerToast(lang === 'RU' ? 'Связываемся с вашим менеджером!' : 'Connecting to account manager!')}
                      className="w-full mt-6 bg-[#18181c] hover:bg-[#202026] text-white text-xs font-bold py-2.5 rounded-xl border border-gray-800 transition-all"
                    >
                      {lang === 'RU' ? 'Обновиться до Elite' : 'Upgrade to Elite'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 13. NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black text-white tracking-wide uppercase">{lang === 'RU' ? 'Уведомления дилера' : 'Dealership Notifications'}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{lang === 'RU' ? 'Системные оповещения, заявки от клиентов и обновления статуса.' : 'System alerts, customer requests, and listing status updates.'}</p>
                  </div>
                  <button 
                    onClick={() => triggerToast(lang === 'RU' ? 'Все уведомления прочитаны!' : 'All read!')}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    {lang === 'RU' ? 'Прочитать все' : 'Mark all read'}
                  </button>
                </div>

                <div className="space-y-3.5">
                  {[
                    { id: '1', title: 'Получена новая заявка', text: 'Пользователь Адилет Маратов интересуется Tesla Model Y 2023. Номер телефона подтвержден.', time: '10 мин. назад', unread: true },
                    { id: '2', title: 'Объявление прошло модерацию', text: 'Успешно! Ваше объявление Toyota Camry 2021 прошло автоматическую проверку AI и опубликовано на AutoHub.', time: '1 час назад', unread: true },
                    { id: '3', title: 'VIP-статус активирован', text: 'Вы успешно повысили статус объявления BMW X5 2022 до VIP. Оно показывается вверху поиска.', time: 'Вчера', unread: false },
                    { id: '4', title: 'Оплата подписки успешна', text: 'Транзакция TX-9021 на сумму $150 успешно завершена. Подписка продлена до 15.08.2026.', time: '3 дня назад', unread: false }
                  ].map((notif) => (
                    <div key={notif.id} className={`p-5 rounded-2xl border ${notif.unread ? 'bg-[#101015] border-blue-900/30' : 'bg-[#0d0d11] border-gray-900'} transition-all flex items-start gap-4`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.unread ? 'bg-blue-500' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline gap-4">
                          <span className="text-xs font-bold text-white block">{notif.title}</span>
                          <span className="text-[10px] text-gray-500 font-mono shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{notif.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 14. DEALER PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-black text-white tracking-wide uppercase">{lang === 'RU' ? 'Публичный профиль' : 'Public Dealership Profile'}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'RU' ? 'Внешний вид вашей витрины для покупателей на AutoHub Kyrgyzstan.' : 'Customize your public digital storefront for customers on AutoHub Kyrgyzstan.'}</p>
                </div>

                <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 space-y-6">
                  {/* Store banner and logo layout */}
                  <div className="relative">
                    <div className="h-40 bg-gradient-to-r from-blue-950 to-indigo-950 rounded-xl border border-gray-800 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest relative z-10">{lang === 'RU' ? 'Кликните для замены баннера' : 'Click to upload custom banner'}</span>
                    </div>
                    <div className="absolute -bottom-10 left-6 w-20 h-20 bg-blue-600 rounded-2xl border-4 border-[#070708] flex items-center justify-center text-white text-3xl font-black shadow-lg">
                      A
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-extrabold text-white">{dealerName}</h4>
                      <span className="bg-blue-600/10 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-wider">{lang === 'RU' ? 'ПРОВЕРЕННЫЙ ДИЛЕР' : 'VERIFIED DEALER'}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{lang === 'RU' ? 'Лучшие автомобили премиум-сегмента из Европы, Южной Кореи и Китая в наличии и под заказ. Официальный партнер AutoHub KG.' : 'Premium vehicles from South Korea, USA and Europe in stock and custom order. Official AutoHub KG verified partner.'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-950 pt-6">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{lang === 'RU' ? 'Рейтинг автосалона' : 'Dealership Rating'}</span>
                      <div className="flex items-center space-x-2.5 mt-2">
                        <span className="text-2xl font-black text-white">4.8</span>
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({reviews.length} {lang === 'RU' ? 'отзыва' : 'reviews'})</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{lang === 'RU' ? 'Объявлений на платформе' : 'Total Live Inventory'}</span>
                      <span className="text-2xl font-black text-white block mt-1.5">{cars.length} {lang === 'RU' ? 'у унаа' : 'vehicles'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 15. SUPPORT TAB */}
            {activeTab === 'support' && (
              <motion.div 
                key="support"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-black text-white tracking-wide uppercase">{lang === 'RU' ? 'Поддержка AutoHub' : 'AutoHub Dealer Support'}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{lang === 'RU' ? 'Техническая помощь, вопросы по модерации объявлений и оплате.' : 'Technical priority support, listing approvals, and platform billing.'}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Contacts Info */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 space-y-6">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'RU' ? 'Приоритетная Линия' : 'Priority VIP Hotlines'}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{lang === 'RU' ? 'Как премиум-дилер, у вас есть круглосуточный выделенный менеджер AutoHub.' : 'As a Premium tier dealership, you have direct priority VIP access to our operations.'}</p>
                    
                    <div className="space-y-3 pt-3">
                      <div className="flex items-center space-x-3 text-xs">
                        <Phone className="w-4.5 h-4.5 text-blue-500" />
                        <div>
                          <span className="text-gray-500 block text-[9px] font-bold uppercase">HOTLINE PHONE</span>
                          <span className="text-white font-semibold">+996 555 999 888</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <Mail className="w-4.5 h-4.5 text-blue-500" />
                        <div>
                          <span className="text-gray-500 block text-[9px] font-bold uppercase">OPERATIONS EMAIL</span>
                          <span className="text-white font-semibold">dealer-support@autohub.kg</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => triggerToast(lang === 'RU' ? 'Чат WhatsApp запущен!' : 'WhatsApp chat launched!')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
                    >
                      <span>WhatsApp Support (24/7)</span>
                    </button>
                  </div>

                  {/* Submit support ticket */}
                  <div className="bg-[#0d0d11] border border-gray-900 rounded-2xl p-6 lg:col-span-2 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'RU' ? 'Создать запрос в техподдержку' : 'Submit Support Ticket'}</h4>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        triggerToast(lang === 'RU' ? 'Запрос успешно отправлен! Ожидайте ответа.' : 'Support ticket submitted successfully!');
                        (e.target as HTMLFormElement).reset();
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">{lang === 'RU' ? 'Тема запроса' : 'Subject'}</label>
                        <input type="text" required placeholder="e.g. Problems uploading images" className="w-full bg-[#141419] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">{lang === 'RU' ? 'Описание проблемы' : 'Description of issue'}</label>
                        <textarea required rows={4} placeholder="e.g. Pictures fail to parse watermark check..." className="w-full bg-[#141419] border border-gray-800 rounded-xl p-4 text-xs text-white focus:outline-none resize-none"></textarea>
                      </div>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-md">
                        {lang === 'RU' ? 'Отправить запрос' : 'Submit Ticket'}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
