import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, Phone, Mail, MapPin, Globe, Car, Calendar, DollarSign, 
  Settings, Sliders, CheckCircle2, MessageCircle, AlertCircle, 
  Upload, Trash2, ChevronRight, HelpCircle, FileText, Search, 
  ExternalLink, Filter, Plus, ArrowRight, RefreshCw, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderCarPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onNavigateToCalculator?: (tab?: string) => void;
}

interface CustomRequest {
  id: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  city: string;
  country: string;
  brand: string;
  model: string;
  year: number;
  budget: number;
  currency: 'USD' | 'EUR' | 'KGS';
  bodyType: string;
  fuelType: string;
  transmission: string;
  engineSize: string;
  extColor: string;
  intColor: string;
  maxMileage: number;
  steering: 'Left' | 'Right';
  isHybridOrElectric: string;
  options: string[];
  comment: string;
  photos: string[]; // Base64 or object URLs for demo
  status: 'New' | 'Contacted' | 'Searching' | 'Vehicle Found' | 'Purchased' | 'Shipping' | 'Customs' | 'Delivered';
  date: string;
}

const COUNTRIES = [
  { id: 'kr', name: { RU: 'Южная Корея', KG: 'Түштүк Корея', EN: 'South Korea' }, flag: '🇰🇷' },
  { id: 'jp', name: { RU: 'Япония', KG: 'Япония', EN: 'Japan' }, flag: '🇯🇵' },
  { id: 'ae', name: { RU: 'ОАЭ (Дубай)', KG: 'БАЭ (Дубай)', EN: 'UAE (Dubai)' }, flag: '🇦🇪' },
  { id: 'us', name: { RU: 'США', KG: 'АКШ', EN: 'USA' }, flag: '🇺🇸' },
  { id: 'de', name: { RU: 'Германия', KG: 'Германия', EN: 'Germany' }, flag: '🇩🇪' },
  { id: 'fr', name: { RU: 'Франция', KG: 'Франция', EN: 'France' }, flag: '🇫🇷' },
  { id: 'it', name: { RU: 'Италия', KG: 'Италия', EN: 'Italy' }, flag: '🇮🇹' },
  { id: 'cn', name: { RU: 'Китай', KG: 'Кытай', EN: 'China' }, flag: '🇨🇳' },
];

const BODY_TYPES = [
  { id: 'Sedan', name: { RU: 'Седан', KG: 'Седан', EN: 'Sedan' } },
  { id: 'SUV', name: { RU: 'Внедорожник', KG: 'Жол тандабас', EN: 'SUV' } },
  { id: 'Crossover', name: { RU: 'Кроссовер', KG: 'Кроссовер', EN: 'Crossover' } },
  { id: 'Coupe', name: { RU: 'Купе', KG: 'Купе', EN: 'Coupe' } },
  { id: 'Hatchback', name: { RU: 'Хэтчбек', KG: 'Хэтчбек', EN: 'Hatchback' } },
  { id: 'Minivan', name: { RU: 'Минивэн', KG: 'Минивэн', EN: 'Minivan' } },
  { id: 'Wagon', name: { RU: 'Универсал', KG: 'Универсал', EN: 'Wagon' } },
  { id: 'Pickup', name: { RU: 'Пикап', KG: 'Пикап', EN: 'Pickup' } },
];

const FUEL_TYPES = [
  { id: 'Petrol', name: { RU: 'Бензин', KG: 'Бензин', EN: 'Petrol' } },
  { id: 'Diesel', name: { RU: 'Дизель', KG: 'Дизель', EN: 'Diesel' } },
  { id: 'Hybrid', name: { RU: 'Гибрид', KG: 'Гибрид', EN: 'Hybrid' } },
  { id: 'Electric', name: { RU: 'Электро', KG: 'Электро', EN: 'Electric' } },
];

const TRANSMISSIONS = [
  { id: 'Automatic', name: { RU: 'Автомат', KG: 'Автомат', EN: 'Automatic' } },
  { id: 'Manual', name: { RU: 'Механика', KG: 'Механика', EN: 'Manual' } },
  { id: 'Robotic', name: { RU: 'Робот', KG: 'Робот', EN: 'Robotic' } },
  { id: 'Variator', name: { RU: 'Вариатор', KG: 'Вариатор', EN: 'Variator' } },
];

const DEFAULT_REQUESTS: CustomRequest[] = [
  {
    id: 'AH-2026-X491',
    fullName: 'Аскар Беков',
    phone: '+996 700 123 456',
    whatsapp: '+996 700 123 456',
    email: 'askar.b@gmail.com',
    city: 'Бишкек',
    country: 'South Korea',
    brand: 'Hyundai',
    model: 'Palisade Calligraphy',
    year: 2022,
    budget: 32000,
    currency: 'USD',
    bodyType: 'SUV',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineSize: '2.2',
    extColor: 'Черный металлик',
    intColor: 'Коричневая кожа Nappa',
    maxMileage: 45000,
    steering: 'Left',
    isHybridOrElectric: 'Diesel',
    options: ['Sunroof', 'Leather interior', '360 camera', 'Heated seats', 'Ventilated seats'],
    comment: 'Нужна максимальная комплектация Calligraphy, в идеальном состоянии, без окрасов по кузову. Доставка в Бишкек.',
    photos: ['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=300'],
    status: 'Searching',
    date: '19.07.2026'
  },
  {
    id: 'AH-2026-X812',
    fullName: 'Нурбек уулу Талант',
    phone: '+996 555 987 654',
    whatsapp: '+996 555 987 654',
    email: 'talant.n@mail.ru',
    city: 'Ош',
    country: 'Japan',
    brand: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2021,
    budget: 36500,
    currency: 'USD',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineSize: '2.7',
    extColor: 'Белый жемчуг',
    intColor: 'Черный велюр/кожа',
    maxMileage: 35000,
    steering: 'Right',
    isHybridOrElectric: 'Petrol',
    options: ['Sunroof', 'Leather interior', 'Heated seats'],
    comment: 'Обязательно строгий аукционный лист, оценка не ниже 4.5 баллов. Правый руль.',
    photos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=300'],
    status: 'Vehicle Found',
    date: '18.07.2026'
  },
  {
    id: 'AH-2026-X114',
    fullName: 'Айсулуу Асанова',
    phone: '+996 777 500 500',
    whatsapp: '+996 777 500 500',
    email: 'aisuluu@gmail.com',
    city: 'Бишкек',
    country: 'China',
    brand: 'Zeekr',
    model: '001 YOU Edition',
    year: 2023,
    budget: 41000,
    currency: 'USD',
    bodyType: 'Hatchback',
    fuelType: 'Electric',
    transmission: 'Automatic',
    engineSize: '0',
    extColor: 'Серый матовый',
    intColor: 'Светлая алькантара',
    maxMileage: 15000,
    steering: 'Left',
    isHybridOrElectric: 'Electric',
    options: ['Sunroof', 'Leather interior', '360 camera', 'Adaptive cruise control', 'Heated seats', 'Ventilated seats'],
    comment: 'Комплектация YOU, пневмоподвеска, батарея 100 кВт/ч.',
    photos: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=300'],
    status: 'Shipping',
    date: '15.07.2026'
  }
];

export function OrderCarPage({ lang, onNavigateToCalculator }: OrderCarPageProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard'>('form');
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('South Korea');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2022);
  const [budget, setBudget] = useState<number>(25000);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'KGS'>('USD');
  const [bodyType, setBodyType] = useState('Sedan');
  const [fuelType, setFuelType] = useState('Petrol');
  const [transmission, setTransmission] = useState('Automatic');
  const [engineSize, setEngineSize] = useState('2.0');
  const [extColor, setExtColor] = useState('');
  const [intColor, setIntColor] = useState('');
  const [maxMileage, setMaxMileage] = useState<number>(60000);
  
  // Options State
  const [steering, setSteering] = useState<'Left' | 'Right'>('Left');
  const [isHybridOrElectric, setIsHybridOrElectric] = useState('Petrol');
  const [options, setOptions] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  
  // Page Control State
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Dashboard Filters & Searches
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [countryFilter, setCountryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'budget'>('date');

  // Load / Initialize Requests
  useEffect(() => {
    const stored = localStorage.getItem('askar_auto_custom_requests');
    if (stored) {
      try {
        setRequests(JSON.parse(stored));
      } catch (e) {
        setRequests(DEFAULT_REQUESTS);
      }
    } else {
      localStorage.setItem('askar_auto_custom_requests', JSON.stringify(DEFAULT_REQUESTS));
      setRequests(DEFAULT_REQUESTS);
    }
  }, []);

  const saveRequests = (newRequests: CustomRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem('askar_auto_custom_requests', JSON.stringify(newRequests));
  };

  // Translations Map
  const t = {
    RU: {
      title: 'Заказать автомобиль',
      subtitle: 'Подбор и оперативная доставка проверенных авто напрямую с аукционов Южной Кореи, Японии, ОАЭ, Китая, Европы и США.',
      tab_order: '📋 Оформить заказ',
      tab_dashboard: '💼 Кабинет дилера (Демо)',
      personal_title: '1. Контактная информация',
      fullName: 'ФИО клиента',
      fullName_p: 'Введите ваше имя и фамилию',
      phone: 'Номер телефона',
      phone_p: 'Например: +996 700 123 456',
      whatsapp: 'Номер WhatsApp',
      whatsapp_p: 'Для связи и отправки вариантов авто',
      email: 'Электронная почта (необязательно)',
      email_p: 'yourname@example.com',
      city: 'Город доставки в Кыргызстане',
      city_p: 'Например: Бишкек, Ош, Джалал-Абад',
      vehicle_title: '2. Параметры желаемого автомобиля',
      country: 'Страна импорта автомобиля',
      brand: 'Марка автомобиля',
      brand_p: 'Например: Toyota, Hyundai, Zeekr',
      model: 'Модель автомобиля',
      model_p: 'Например: Camry, Santa Fe, 001',
      year: 'Год выпуска (минимальный)',
      budget: 'Максимальный бюджет',
      currency: 'Валюта бюджета',
      bodyType: 'Тип кузова',
      fuelType: 'Тип двигателя / топлива',
      transmission: 'Коробка передач',
      engineSize: 'Объем двигателя (литры)',
      engineSize_p: 'Например: 2.0, 2.5 или 0 для электро',
      extColor: 'Цвет кузова (желаемый)',
      extColor_p: 'Например: Белый перламутр, Черный',
      intColor: 'Цвет и материал салона',
      intColor_p: 'Например: Светлая кожа, Черный велюр',
      maxMileage: 'Максимальный пробег (км)',
      options_title: '3. Дополнительные требования и комплектация',
      steering: 'Расположение руля',
      steering_left: 'Левый руль',
      steering_right: 'Правый руль',
      propulsion: 'Тип силовой установки',
      option_sunroof: 'Люк / Панорамная крыша',
      option_leather: 'Кожаный салон',
      option_camera: 'Камера 360°',
      option_cruise: 'Адаптивный круиз-контроль (дистроник)',
      option_heated: 'Подогрев сидений',
      option_ventilated: 'Вентиляция сидений',
      comment: 'Ваш подробный комментарий или пожелания',
      comment_p: 'Укажите важные детали: конкретную комплектацию, состояние дисков, желаемую оценку аукциона или прочие требования...',
      upload_title: '4. Загрузка фото-референсов (необязательно)',
      upload_drag: 'Перетащите изображения сюда или нажмите для выбора',
      upload_info: 'Поддерживаются форматы JPEG, PNG. Максимум 5 файлов. Поможет менеджеру точнее понять ваши ожидания.',
      submit_btn: 'Отправить заявку менеджеру',
      whatsapp_btn: 'Консультация в WhatsApp',
      delivery_btn: 'Калькулятор доставки',
      success_title: 'Заявка успешно принята!',
      success_subtitle: 'Ваш запрос зарегистрирован в нашей системе под уникальным номером. Персональный менеджер Askar AutoHub KG свяжется с вами в течение 15 минут для детальной консультации.',
      success_id: 'Номер вашей заявки:',
      success_back: 'Оформить новый заказ',
      dashboard_title: 'Панель управления заказами дилера',
      dashboard_subtitle: 'Обработка и статус-трекинг входящих заявок на индивидуальный подбор автомобилей',
      search_placeholder: 'Поиск по ФИО, модели унаа или ID заявки...',
      all_statuses: 'Все статусы',
      all_countries: 'Все страны',
      sort_date: 'По дате (сначала новые)',
      sort_budget: 'По бюджету (высокий сначала)',
      req_id: 'ID Заявки',
      req_customer: 'Клиент',
      req_vehicle: 'Автомобиль',
      req_budget: 'Бюджет',
      req_country: 'Импорт',
      req_status: 'Статус',
      req_date: 'Дата',
      req_actions: 'Действия',
      status_new: 'Новый',
      status_contacted: 'Связались',
      status_searching: 'В поиске',
      status_found: 'Авто найден',
      status_purchased: 'Выкуплен',
      status_shipping: 'В пути (доставка)',
      status_customs: 'Растаможка',
      status_delivered: 'Доставлен клиенту',
      manager_alert: 'Менеджер свяжется с вами в ближайшее время.',
      delete_all_btn: 'Сбросить к исходным демо-данным',
      add_demo_btn: 'Сгенерировать случайную заявку'
    },
    KG: {
      title: 'Унаага заказ берүү',
      subtitle: 'Түштүк Корея, Япония, БАЭ, Кытай, Европа жана АКШ аукциондорунан түздөн-түз текшерилген унааларды тандоо жана тез жеткирүү.',
      tab_order: '📋 Заказ толтуруу',
      tab_dashboard: '💼 Дилердин кабинети (Демо)',
      personal_title: '1. Кардардын байланыш маалыматы',
      fullName: 'Кардардын ФИОсу',
      fullName_p: 'Атыңызды жана фамилияңызды жазыңыз',
      phone: 'Телефон номери',
      phone_p: 'Мисалы: +996 700 123 456',
      whatsapp: 'WhatsApp номери',
      whatsapp_p: 'Байланышуу жана унаа варианттарын жөнөтүү үчүн',
      email: 'Электрондук почта (милдеттүү эмес)',
      email_p: 'yourname@example.com',
      city: 'Кыргызстандагы жеткирүү шаары',
      city_p: 'Мисалы: Бишкек, Ош, Жалал-Абад',
      vehicle_title: '2. Каалаган унаанын параметрлери',
      country: 'Унаа импорттолуучу өлкө',
      brand: 'Унаанын маркасы',
      brand_p: 'Мисалы: Toyota, Hyundai, Zeekr',
      model: 'Унаанын модели',
      model_p: 'Мисалы: Camry, Santa Fe, 001',
      year: 'Чыккан жылы (минималдуу)',
      budget: 'Максималдуу бюджет',
      currency: 'Бюджеттин валютасы',
      bodyType: 'Кузовдун тиби',
      fuelType: 'Кыймылдаткыч / күйүүчү май тиби',
      transmission: 'Берүү кутусу (Коробка)',
      engineSize: 'Кыймылдаткычтын көлөмү (литр)',
      engineSize_p: 'Мисалы: 2.0, 2.5 же электро үчүн 0',
      extColor: 'Кузовдун түсү (каалаган)',
      extColor_p: 'Мисалы: Ак бермет, Кара',
      intColor: 'Салондун түсү жана материалы',
      intColor_p: 'Мисалы: Ачык булгаары, Кара велюр',
      maxMileage: 'Максималдуу жүргөнү (км)',
      options_title: '3. Кошумча талаптар жана топтомдор',
      steering: 'Рульдун жайгашуусу',
      steering_left: 'Сол руль',
      steering_right: 'Оң руль',
      propulsion: 'Кыймылдаткычтын тиби',
      option_sunroof: 'Люк / Панорамалык чатыр',
      option_leather: 'Булгаары салон',
      option_camera: '360° Камера',
      option_cruise: 'Адаптивдүү круиз-контроль (дистроник)',
      option_heated: 'Отургучтарды жылытуу',
      option_ventilated: 'Отургучтарды желдетүү',
      comment: 'Сиздин толук комментарийиңиз же каалооңуз',
      comment_p: 'Маанилүү деталдарды көрсөтүңүз: конкреттүү топтомдор, дисктердин абалы, аукциондун баасы же башка талаптар...',
      upload_title: '4. Фото-референстерди жүктөө (милдеттүү эмес)',
      upload_drag: 'Сүрөттөрдү бул жерге сүйрөп келиңиз же тандоо үчүн басыңыз',
      upload_info: 'JPEG, PNG форматтары колдоого алынат. Максимум 5 файл. Менеджерге сиздин каалооңузду так түшүнүүгө жардам берет.',
      submit_btn: 'Билдирмени жөнөтүү',
      whatsapp_btn: 'WhatsApp аркылуу кеңеш алуу',
      delivery_btn: 'Жеткирүү калькулятору',
      success_title: 'Билдирме ийгиликтүү кабыл алынды!',
      success_subtitle: 'Сиздин сурооңуз биздин системада уникалдуу номер менен катталды. Askar AutoHub KG жеке менеджери сиз менен 15 мүнөттүн ичинде толук маалымат алуу үчүн байланышат.',
      success_id: 'Билдирменин номери:',
      success_back: 'Жаңы заказ толтуруу',
      dashboard_title: 'Дилердин заказдарды башкаруу панели',
      dashboard_subtitle: 'Автоунааларды жекече тандоо боюнча келген билдирмелерди иштеп чыгуу жана көзөмөлдөө',
      search_placeholder: 'ФИО, унаа модели же билдирме ID боюнча издөө...',
      all_statuses: 'Бардык статус',
      all_countries: 'Бардык өлкөлөр',
      sort_date: 'Датасы боюнча (жаңылар биринчи)',
      sort_budget: 'Бюджет боюнча (жогору биринчи)',
      req_id: 'Билдирме ID',
      req_customer: 'Кардар',
      req_vehicle: 'Унаа',
      req_budget: 'Бюджет',
      req_country: 'Импорт',
      req_status: 'Статус',
      req_date: 'Датасы',
      req_actions: 'Аракеттер',
      status_new: 'Жаңы',
      status_contacted: 'Байланыштык',
      status_searching: 'Издөөдө',
      status_found: 'Унаа табылды',
      status_purchased: 'Сатып алынды',
      status_shipping: 'Жолдо (жеткирүү)',
      status_customs: 'Бажыдан өтүүдө',
      status_delivered: 'Жеткирилди',
      manager_alert: 'Менеджер жакында сиз менен байланышат.',
      delete_all_btn: 'Демо-маалыматтарды баштапкы абалга кайтаруу',
      add_demo_btn: 'Кокусунан билдирме түзүү'
    },
    EN: {
      title: 'Order a Car Customly',
      subtitle: 'Individual selection and worldwide shipping of thoroughly inspected vehicles from Korea, Japan, UAE, China, Europe, and the USA.',
      tab_order: '📋 Place Order',
      tab_dashboard: '💼 Dealer Cabinet (Demo)',
      personal_title: '1. Contact Information',
      fullName: 'Customer Full Name',
      fullName_p: 'Enter your full name',
      phone: 'Phone Number',
      phone_p: 'e.g. +996 700 123 456',
      whatsapp: 'WhatsApp Number',
      whatsapp_p: 'For communication and sending car options',
      email: 'Email (optional)',
      email_p: 'yourname@example.com',
      city: 'Delivery City in Kyrgyzstan',
      city_p: 'e.g. Bishkek, Osh, Jalal-Abad',
      vehicle_title: '2. Vehicle Requirements',
      country: 'Import Country of Origin',
      brand: 'Vehicle Brand',
      brand_p: 'e.g. Toyota, Hyundai, Zeekr',
      model: 'Vehicle Model',
      model_p: 'e.g. Camry, Santa Fe, 001',
      year: 'Production Year (minimum)',
      budget: 'Maximum Budget Limit',
      currency: 'Budget Currency',
      bodyType: 'Body Type',
      fuelType: 'Engine / Fuel Type',
      transmission: 'Transmission',
      engineSize: 'Engine Size (Liters)',
      engineSize_p: 'e.g. 2.0, 2.5 or 0 for Electric',
      extColor: 'Exterior Color (desired)',
      extColor_p: 'e.g. Pearl White, Jet Black',
      intColor: 'Interior Color & Material',
      intColor_p: 'e.g. Beige Leather, Black Velour',
      maxMileage: 'Maximum Mileage (km)',
      options_title: '3. Additional Options & Equipment',
      steering: 'Steering Wheel Position',
      steering_left: 'Left-hand drive',
      steering_right: 'Right-hand drive',
      propulsion: 'Propulsion Type',
      option_sunroof: 'Sunroof / Panoramic Roof',
      option_leather: 'Leather Interior',
      option_camera: '360° Surround Camera',
      option_cruise: 'Adaptive Cruise Control',
      option_heated: 'Heated Seats',
      option_ventilated: 'Ventilated Seats',
      comment: 'Detailed Order Comments',
      comment_p: 'Specify important options, custom wheel preferences, desired auction grade, or any other requirements...',
      upload_title: '4. Upload Photo References (optional)',
      upload_drag: 'Drag and drop photos here or click to select',
      upload_info: 'Supports JPEG, PNG. Max 5 files. Helps our manager perfectly match your aesthetic expectation.',
      submit_btn: 'Submit Request to Manager',
      whatsapp_btn: 'Consult via WhatsApp',
      delivery_btn: 'Delivery Calculator',
      success_title: 'Request Successfully Submitted!',
      success_subtitle: 'Your custom order has been registered in our system. A personal vehicle agent from Askar AutoHub KG will contact you via phone or WhatsApp within 15 minutes to coordinate details.',
      success_id: 'Your Request ID Number:',
      success_back: 'Create another order',
      dashboard_title: 'Dealer Custom Request Dashboard',
      dashboard_subtitle: 'Reviewing and updating individual vehicle matching orders from Kyrgyzstan clients',
      search_placeholder: 'Search by client name, car model, or Request ID...',
      all_statuses: 'All Statuses',
      all_countries: 'All Countries',
      sort_date: 'Date (newest first)',
      sort_budget: 'Budget (highest first)',
      req_id: 'Request ID',
      req_customer: 'Customer',
      req_vehicle: 'Vehicle',
      req_budget: 'Budget',
      req_country: 'Import',
      req_status: 'Status',
      req_date: 'Date',
      req_actions: 'Actions',
      status_new: 'New',
      status_contacted: 'Contacted',
      status_searching: 'Searching',
      status_found: 'Vehicle Found',
      status_purchased: 'Purchased',
      status_shipping: 'In Transit (Shipping)',
      status_customs: 'Customs Clearing',
      status_delivered: 'Delivered to Client',
      manager_alert: 'Our manager will contact you shortly.',
      delete_all_btn: 'Reset to Default Demo Data',
      add_demo_btn: 'Generate Random Request'
    }
  }[lang];

  // Map database status to display translations
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'New': return t.status_new;
      case 'Contacted': return t.status_contacted;
      case 'Searching': return t.status_searching;
      case 'Vehicle Found': return t.status_found;
      case 'Purchased': return t.status_purchased;
      case 'Shipping': return t.status_shipping;
      case 'Customs': return t.status_customs;
      case 'Delivered': return t.status_delivered;
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      case 'Contacted': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'Searching': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
      case 'Vehicle Found': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'Purchased': return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
      case 'Shipping': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'Customs': return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    }
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !whatsapp || !city || !brand || !model) {
      alert(lang === 'RU' ? 'Пожалуйста, заполните обязательные поля: ФИО, телефон, WhatsApp, город, марка и модель!' : 'Please fill all mandatory fields!');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reqId = `AH-2026-X${randomSuffix}`;

    const newRequest: CustomRequest = {
      id: reqId,
      fullName,
      phone,
      whatsapp,
      email,
      city,
      country,
      brand,
      model,
      year,
      budget,
      currency,
      bodyType,
      fuelType,
      transmission,
      engineSize,
      extColor: extColor || (lang === 'RU' ? 'Любой' : 'Any'),
      intColor: intColor || (lang === 'RU' ? 'Любой' : 'Any'),
      maxMileage,
      steering,
      isHybridOrElectric,
      options,
      comment,
      photos: uploadedPhotos.length > 0 ? uploadedPhotos : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=300'],
      status: 'New',
      date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    const updatedRequests = [newRequest, ...requests];
    saveRequests(updatedRequests);

    setGeneratedId(reqId);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulated File Upload Handling
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileList = Array.from(files);
    // Support up to 5 photos for demo
    const sliced = fileList.slice(0, 5 - uploadedPhotos.length);
    
    sliced.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploadedPhotos(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const toggleOption = (optName: string) => {
    if (options.includes(optName)) {
      setOptions(prev => prev.filter(o => o !== optName));
    } else {
      setOptions(prev => [...prev, optName]);
    }
  };

  // Dashboard Status Updates
  const handleStatusChange = (id: string, newStatus: CustomRequest['status']) => {
    const updated = requests.map(req => {
      if (req.id === id) {
        return { ...req, status: newStatus };
      }
      return req;
    });
    saveRequests(updated);
  };

  const handleDeleteRequest = (id: string) => {
    if (confirm(lang === 'RU' ? 'Удалить эту заявку?' : 'Delete this request?')) {
      const updated = requests.filter(req => req.id !== id);
      saveRequests(updated);
    }
  };

  const resetToDefault = () => {
    if (confirm(lang === 'RU' ? 'Сбросить все изменения к начальным демо-данным?' : 'Reset to default data?')) {
      saveRequests(DEFAULT_REQUESTS);
    }
  };

  const generateRandomRequest = () => {
    const brandsList = ['BMW', 'Lexus', 'Porsche', 'Audi', 'BYD', 'Tesla', 'Kia', 'Toyota'];
    const modelsList = {
      BMW: ['X5 xDrive40i', '530i M Sport', 'i7 xDrive60'],
      Lexus: ['RX 350', 'LX 600 VIP', 'ES 250'],
      Porsche: ['Cayenne Coupe', 'Taycan GTS', 'Panamera 4S'],
      Audi: ['Q7 Quattro', 'A6 S-line', 'e-tron Sportback'],
      BYD: ['Han EV', 'Tang EV', 'Song Plus EV'],
      Tesla: ['Model Y Long Range', 'Model S Plaid'],
      Kia: ['Sportage Signature', 'K5 GT-line'],
      Toyota: ['Camry 75', 'Alphard Executive']
    };

    const b = brandsList[Math.floor(Math.random() * brandsList.length)];
    const m = modelsList[b as keyof typeof modelsList][Math.floor(Math.random() * modelsList[b as keyof typeof modelsList].length)];
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reqId = `AH-2026-X${randomSuffix}`;
    const countriesList = ['South Korea', 'Japan', 'UAE (Dubai)', 'USA', 'Germany', 'China'];
    const bodies = ['SUV', 'Sedan', 'Crossover', 'Coupe'];
    const fuels = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
    const names = ['Нурсултан Исмаилов', 'Алена Колесникова', 'Марат Султанов', 'Динара Усенова', 'Игорь Смирнов', 'Эркин Кадыров'];
    const citiesList = ['Бишкек', 'Ош', 'Каракол', 'Джалал-Абад'];

    const newReq: CustomRequest = {
      id: reqId,
      fullName: names[Math.floor(Math.random() * names.length)],
      phone: `+996 70${Math.floor(Math.random() * 9)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
      whatsapp: `+996 70${Math.floor(Math.random() * 9)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
      email: 'demo-client@autohub.kg',
      city: citiesList[Math.floor(Math.random() * citiesList.length)],
      country: countriesList[Math.floor(Math.random() * countriesList.length)],
      brand: b,
      model: m,
      year: Math.floor(2019 + Math.random() * 7),
      budget: Math.floor(15000 + Math.random() * 60000),
      currency: 'USD',
      bodyType: bodies[Math.floor(Math.random() * bodies.length)],
      fuelType: fuels[Math.floor(Math.random() * fuels.length)],
      transmission: 'Automatic',
      engineSize: (1.5 + Math.random() * 2.5).toFixed(1),
      extColor: 'Серый металлик',
      intColor: 'Черная кожа',
      maxMileage: Math.floor(10000 + Math.random() * 80000),
      steering: Math.random() > 0.85 ? 'Right' : 'Left',
      isHybridOrElectric: 'Petrol',
      options: ['Sunroof', 'Leather interior', '360 camera'],
      comment: 'Интересует срочный подбор в отличном состоянии. Жду вариантов.',
      photos: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=300'],
      status: 'New',
      date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    saveRequests([newReq, ...requests]);
  };

  // Filter & Sorted Requests
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchSearch = 
        req.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.model.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'All' || req.status === statusFilter;
      const matchCountry = countryFilter === 'All' || req.country.toLowerCase().includes(countryFilter.toLowerCase());

      return matchSearch && matchStatus && matchCountry;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        // Simple string date split comparing
        const parseDate = (dStr: string) => {
          const parts = dStr.split('.');
          return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0])).getTime();
        };
        return parseDate(b.date) - parseDate(a.date);
      } else {
        return b.budget - a.budget;
      }
    });
  }, [requests, searchQuery, statusFilter, countryFilter, sortBy]);

  // Reset form to place another order
  const resetForm = () => {
    setFullName('');
    setPhone('');
    setWhatsapp('');
    setEmail('');
    setCity('');
    setBrand('');
    setModel('');
    setYear(2022);
    setBudget(25000);
    setExtColor('');
    setIntColor('');
    setMaxMileage(60000);
    setOptions([]);
    setComment('');
    setUploadedPhotos([]);
    setIsSuccess(false);
    setGeneratedId('');
  };

  return (
    <div id="order-car" className="min-h-screen bg-black text-white font-sans selection:bg-[#0B3D91] selection:text-white">
      
      {/* Premium Hero Banner */}
      <div className="relative py-16 sm:py-24 bg-gradient-to-b from-[#0B3D91]/15 to-black border-b border-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0B3D91]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0B3D91]/10 border border-[#0B3D91]/30 rounded-full text-[#5893F7] text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span>💎 Askar AutoHub Custom Select</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed font-normal"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Sub-Navigation & Tab Switcher */}
      <div className="bg-[#0a0a0f] border-b border-gray-900 sticky top-[73px] z-20 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => { setActiveTab('form'); setIsSuccess(false); }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'form' 
                    ? 'bg-[#0B3D91] text-white shadow-lg shadow-[#0B3D91]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                }`}
              >
                <span>{t.tab_order}</span>
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'dashboard' 
                    ? 'bg-[#0B3D91] text-white shadow-lg shadow-[#0B3D91]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                }`}
              >
                <span>{t.tab_dashboard}</span>
                <span className="bg-blue-900/40 text-blue-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono">DEMO</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => {
                  if (onNavigateToCalculator) {
                    onNavigateToCalculator('delivery');
                  }
                }}
                className="text-xs text-[#5893F7] hover:text-white hover:underline flex items-center space-x-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.delivery_btn}</span>
              </button>
              <a 
                href="https://wa.me/996700123456" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="text-xs text-emerald-400 hover:text-white flex items-center space-x-1 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{t.whatsapp_btn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {/* TAB 1: VEHICLE REQUEST FORM */}
          {activeTab === 'form' && (
            <motion.div
              key="order-form-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {isSuccess ? (
                /* Success screen */
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-2xl mx-auto bg-gradient-to-b from-[#0F1C3F] to-[#050B1A] border border-[#0B3D91]/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900/80 border border-blue-500 rounded-full p-4 shadow-xl">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-6 mb-4">{t.success_title}</h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">{t.success_subtitle}</p>

                  <div className="bg-[#030712] border border-gray-900 rounded-2xl p-6 mb-8 inline-block max-w-full">
                    <span className="text-xs text-gray-400 uppercase tracking-widest block mb-2">{t.success_id}</span>
                    <strong className="text-xl sm:text-2xl font-mono text-[#5893F7] tracking-wider">{generatedId}</strong>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 text-sm font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                      <span>{t.success_back}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full sm:w-auto bg-[#0B3D91] hover:bg-[#0B3D91]/80 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#0B3D91]/20"
                    >
                      <span>{lang === 'RU' ? 'Посмотреть в Кабинете' : 'View in Dealer Dashboard'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* The custom vehicle request form */
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
                  
                  {/* Step 1: Customer Info */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3 flex items-center space-x-2">
                      <span className="text-[#5893F7]">1.</span>
                      <span>{t.personal_title}</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.fullName} <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder={t.fullName_p}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.city} <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={t.city_p}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.phone} <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t.phone_p}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.whatsapp} <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <MessageCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-500" />
                          <input 
                            type="text" 
                            required
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            placeholder={t.whatsapp_p}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.email}</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.email_p}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Vehicle Specs */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3 flex items-center space-x-2">
                      <span className="text-[#5893F7]">2.</span>
                      <span>{t.vehicle_title}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Country Select */}
                      <div className="space-y-2 md:col-span-3">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.country}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {COUNTRIES.map(c => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setCountry(c.name.EN)}
                              className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                country === c.name.EN 
                                  ? 'bg-[#0B3D91]/20 border-[#0B3D91] text-white shadow-md shadow-[#0B3D91]/10' 
                                  : 'bg-[#111116] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                              }`}
                            >
                              <span className="text-lg">{c.flag}</span>
                              <span className="truncate">{c.name[lang]}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Brand */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.brand} <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            required
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            placeholder={t.brand_p}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>

                      {/* Model */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.model} <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            required
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            placeholder={t.model_p}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>

                      {/* Production Year */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.year}</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <select
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#0B3D91] transition-all"
                          >
                            {Array.from({ length: 15 }, (_, i) => 2026 - i).map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.budget}</label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#5893F7]" />
                            <input 
                              type="number" 
                              value={budget}
                              onChange={(e) => setBudget(Number(e.target.value))}
                              className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#0B3D91] transition-all"
                            />
                          </div>
                          
                          {/* Currency selection */}
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as any)}
                            className="bg-[#111116] border border-gray-800 rounded-xl px-4 py-3 text-sm text-[#5893F7] font-bold focus:outline-none focus:border-[#0B3D91] transition-all"
                          >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="KGS">KGS (сом)</option>
                          </select>
                        </div>
                      </div>

                      {/* Max Mileage */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.maxMileage}</label>
                        <div className="relative">
                          <Sliders className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                          <input 
                            type="number" 
                            value={maxMileage}
                            onChange={(e) => setMaxMileage(Number(e.target.value))}
                            className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#0B3D91] transition-all"
                          />
                        </div>
                      </div>

                      {/* Body Type */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.bodyType}</label>
                        <select
                          value={bodyType}
                          onChange={(e) => setBodyType(e.target.value)}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#0B3D91] transition-all"
                        >
                          {BODY_TYPES.map(b => (
                            <option key={b.id} value={b.id}>{b.name[lang]}</option>
                          ))}
                        </select>
                      </div>

                      {/* Fuel Type */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.fuelType}</label>
                        <select
                          value={fuelType}
                          onChange={(e) => setFuelType(e.target.value)}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#0B3D91] transition-all"
                        >
                          {FUEL_TYPES.map(f => (
                            <option key={f.id} value={f.id}>{f.name[lang]}</option>
                          ))}
                        </select>
                      </div>

                      {/* Transmission */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.transmission}</label>
                        <select
                          value={transmission}
                          onChange={(e) => setTransmission(e.target.value)}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#0B3D91] transition-all"
                        >
                          {TRANSMISSIONS.map(tOption => (
                            <option key={tOption.id} value={tOption.id}>{tOption.name[lang]}</option>
                          ))}
                        </select>
                      </div>

                      {/* Engine Size */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.engineSize}</label>
                        <input 
                          type="text" 
                          value={engineSize}
                          onChange={(e) => setEngineSize(e.target.value)}
                          placeholder={t.engineSize_p}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] transition-all"
                        />
                      </div>

                      {/* Ext Color */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.extColor}</label>
                        <input 
                          type="text" 
                          value={extColor}
                          onChange={(e) => setExtColor(e.target.value)}
                          placeholder={t.extColor_p}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] transition-all"
                        />
                      </div>

                      {/* Int Color */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.intColor}</label>
                        <input 
                          type="text" 
                          value={intColor}
                          onChange={(e) => setIntColor(e.target.value)}
                          placeholder={t.intColor_p}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] transition-all"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Step 3: Options */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3 flex items-center space-x-2">
                      <span className="text-[#5893F7]">3.</span>
                      <span>{t.options_title}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Steering */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.steering}</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSteering('Left')}
                            className={`flex-1 py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                              steering === 'Left'
                                ? 'bg-[#0B3D91]/20 border-[#0B3D91] text-white'
                                : 'bg-[#111116] border-gray-800 text-gray-400 hover:text-white'
                            }`}
                          >
                            {t.steering_left}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSteering('Right')}
                            className={`flex-1 py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                              steering === 'Right'
                                ? 'bg-[#0B3D91]/20 border-[#0B3D91] text-white'
                                : 'bg-[#111116] border-gray-800 text-gray-400 hover:text-white'
                            }`}
                          >
                            {t.steering_right}
                          </button>
                        </div>
                      </div>

                      {/* Hybrid/EV propulsion */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.propulsion}</label>
                        <select
                          value={isHybridOrElectric}
                          onChange={(e) => {
                            setIsHybridOrElectric(e.target.value);
                            // sync fuel type too
                            if (['Hybrid', 'Electric', 'Petrol', 'Diesel'].includes(e.target.value)) {
                              setFuelType(e.target.value);
                            }
                          }}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#0B3D91] transition-all"
                        >
                          <option value="Petrol">{lang === 'RU' ? 'Чистый бензин' : lang === 'KG' ? 'Бензин' : 'Petrol Only'}</option>
                          <option value="Diesel">{lang === 'RU' ? 'Дизель' : lang === 'KG' ? 'Дизель' : 'Diesel Only'}</option>
                          <option value="Hybrid">{lang === 'RU' ? 'Гибридная установка' : lang === 'KG' ? 'Гибрид унаа' : 'Hybrid System'}</option>
                          <option value="Electric">{lang === 'RU' ? 'Электрический (EV)' : lang === 'KG' ? 'Электромобиль' : 'Electric Vehicle (EV)'}</option>
                        </select>
                      </div>

                      {/* Checklist Options */}
                      <div className="sm:col-span-2 space-y-3">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{lang === 'RU' ? 'Дополнительное оснащение' : 'Desired Equipment Checklist'}</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { key: 'Sunroof', label: t.option_sunroof },
                            { key: 'Leather interior', label: t.option_leather },
                            { key: '360 camera', label: t.option_camera },
                            { key: 'Adaptive cruise control', label: t.option_cruise },
                            { key: 'Heated seats', label: t.option_heated },
                            { key: 'Ventilated seats', label: t.option_ventilated },
                          ].map(item => (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => toggleOption(item.key)}
                              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl border text-xs font-medium text-left transition-all ${
                                options.includes(item.key)
                                  ? 'bg-blue-900/10 border-blue-500/40 text-white font-semibold'
                                  : 'bg-[#111116] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                                options.includes(item.key) 
                                  ? 'bg-[#0B3D91] border-[#0B3D91] text-white' 
                                  : 'border-gray-700'
                              }`}>
                                {options.includes(item.key) && <CheckCircle2 className="w-3 h-3 text-white fill-white" />}
                              </div>
                              <span className="leading-tight">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Comment */}
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">{t.comment}</label>
                        <textarea
                          rows={4}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder={t.comment_p}
                          className="w-full bg-[#111116] border border-gray-800 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0B3D91] focus:ring-1 focus:ring-[#0B3D91] transition-all resize-y"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Step 4: Photo Upload References */}
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white border-b border-gray-900 pb-3 flex items-center space-x-2">
                      <span className="text-[#5893F7]">4.</span>
                      <span>{t.upload_title}</span>
                    </h3>

                    {/* Drag & Drop Canvas */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                        dragActive 
                          ? 'border-[#0B3D91] bg-[#0B3D91]/5' 
                          : 'border-gray-800 bg-[#111116]/50 hover:bg-[#111116] hover:border-gray-700'
                      }`}
                    >
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleFileInput}
                        id="photo-upload-input"
                        className="hidden" 
                      />
                      <label htmlFor="photo-upload-input" className="cursor-pointer space-y-3 block">
                        <div className="mx-auto w-12 h-12 rounded-full bg-blue-900/10 border border-blue-500/20 flex items-center justify-center text-[#5893F7]">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-white">{t.upload_drag}</p>
                        <p className="text-[11px] text-gray-500 max-w-md mx-auto leading-normal">{t.upload_info}</p>
                      </label>
                    </div>

                    {/* Previews */}
                    {uploadedPhotos.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
                        {uploadedPhotos.map((p, idx) => (
                          <div key={idx} className="relative group aspect-square bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                            <img 
                              src={p} 
                              alt="Reference" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-600 rounded-lg text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0B3D91] to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center space-x-2 cursor-pointer transform active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{t.submit_btn}</span>
                    </button>

                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateToCalculator) {
                            onNavigateToCalculator('delivery');
                          }
                        }}
                        className="flex-1 sm:flex-initial px-5 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white text-xs font-semibold rounded-xl transition-all text-center"
                      >
                        {t.delivery_btn}
                      </button>

                      <a
                        href="https://wa.me/996700123456"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="flex-1 sm:flex-initial px-5 py-4 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-xl transition-all text-center flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-emerald-400/20" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                </form>
              )}
            </motion.div>
          )}

          {/* TAB 2: DEALER REQUESTS DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dealer-requests-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              
              {/* Header Box */}
              <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5893F7] animate-pulse" />
                    <span>{t.dashboard_title}</span>
                  </h3>
                  <p className="text-xs text-gray-400">{t.dashboard_subtitle}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={generateRandomRequest}
                    className="px-3.5 py-2 bg-blue-900/15 hover:bg-blue-900/30 border border-blue-500/20 text-[#5893F7] text-xs font-semibold rounded-xl transition-all flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.add_demo_btn}</span>
                  </button>

                  <button
                    onClick={resetToDefault}
                    className="px-3.5 py-2 bg-red-950/15 hover:bg-red-950/30 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl transition-all"
                  >
                    {t.delete_all_btn}
                  </button>
                </div>
              </div>

              {/* Advanced Search and Filter Bar */}
              <div className="bg-[#07070b] border border-gray-900 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.search_placeholder}
                    className="w-full bg-[#111116] border border-gray-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0B3D91] transition-all"
                  />
                </div>

                {/* Country Filter */}
                <div className="relative">
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="w-full bg-[#111116] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#0B3D91] transition-all"
                  >
                    <option value="All">{t.all_countries}</option>
                    <option value="South Korea">🇰🇷 South Korea</option>
                    <option value="Japan">🇯🇵 Japan</option>
                    <option value="UAE">🇦🇪 UAE (Dubai)</option>
                    <option value="USA">🇺🇸 USA</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="China">🇨🇳 China</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-[#111116] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#0B3D91] transition-all"
                  >
                    <option value="All">{t.all_statuses}</option>
                    <option value="New">{t.status_new}</option>
                    <option value="Contacted">{t.status_contacted}</option>
                    <option value="Searching">{t.status_searching}</option>
                    <option value="Vehicle Found">{t.status_found}</option>
                    <option value="Purchased">{t.status_purchased}</option>
                    <option value="Shipping">{t.status_shipping}</option>
                    <option value="Customs">{t.status_customs}</option>
                    <option value="Delivered">{t.status_delivered}</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-[#111116] border border-gray-800 rounded-xl py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#0B3D91] transition-all"
                  >
                    <option value="date">{t.sort_date}</option>
                    <option value="budget">{t.sort_budget}</option>
                  </select>
                </div>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.length === 0 ? (
                  <div className="bg-[#07070b] border border-gray-900 rounded-2xl py-12 text-center text-gray-500">
                    <AlertCircle className="w-8 h-8 text-gray-600 mx-auto mb-2 animate-bounce" />
                    <p className="text-xs">{lang === 'RU' ? 'Заявки не найдены по заданным критериям' : 'No requests matching filters.'}</p>
                  </div>
                ) : (
                  filteredRequests.map((req) => (
                    <motion.div
                      layout
                      key={req.id}
                      className="bg-[#07070b] border border-gray-900 rounded-2xl p-5 sm:p-6 hover:border-[#0B3D91]/40 transition-all space-y-4"
                    >
                      {/* Top bar with ID, Date, and Status Selector */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-900 pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono text-[#5893F7] font-bold">{req.id}</span>
                          <span className="text-[10px] text-gray-500 font-mono">{req.date}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-900 text-gray-400 rounded border border-gray-800">{req.city}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{t.req_status}:</span>
                          <select
                            value={req.status}
                            onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg focus:outline-none transition-all ${getStatusColor(req.status)} bg-black`}
                          >
                            <option value="New">{t.status_new}</option>
                            <option value="Contacted">{t.status_contacted}</option>
                            <option value="Searching">{t.status_searching}</option>
                            <option value="Vehicle Found">{t.status_found}</option>
                            <option value="Purchased">{t.status_purchased}</option>
                            <option value="Shipping">{t.status_shipping}</option>
                            <option value="Customs">{t.status_customs}</option>
                            <option value="Delivered">{t.status_delivered}</option>
                          </select>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        
                        {/* Reference Thumbnail Photo */}
                        <div className="md:col-span-2 aspect-square rounded-xl overflow-hidden border border-gray-900 relative">
                          <img 
                            src={req.photos[0]} 
                            alt="Ref" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {req.photos.length > 1 && (
                            <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] px-1 rounded text-white font-mono font-bold">
                              +{req.photos.length - 1}
                            </span>
                          )}
                        </div>

                        {/* Customer & Primary Specs */}
                        <div className="md:col-span-6 space-y-1">
                          <h4 className="font-extrabold text-sm text-white flex items-center space-x-2">
                            <span>{req.fullName}</span>
                          </h4>
                          <p className="text-xs text-gray-400 flex flex-wrap items-center gap-1.5 font-normal">
                            <span>{t.req_vehicle}:</span>
                            <strong className="text-white font-semibold">{req.brand} {req.model}</strong>
                            <span className="text-gray-600">•</span>
                            <span>{req.year} г.</span>
                            <span className="text-gray-600">•</span>
                            <span>{req.steering === 'Left' ? t.steering_left : t.steering_right}</span>
                          </p>
                          <p className="text-xs text-gray-400 flex flex-wrap items-center gap-1.5 font-normal">
                            <span>{lang === 'RU' ? 'Характеристики:' : 'Specs:'}</span>
                            <span className="text-gray-200">{req.bodyType}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-200">{req.fuelType}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-200">{req.transmission}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-200">{req.engineSize}L</span>
                            {req.maxMileage > 0 && (
                              <>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-200">до {req.maxMileage.toLocaleString()} км</span>
                              </>
                            )}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center space-x-2 pt-1 font-normal">
                            <span>{t.req_country}:</span>
                            <span className="text-[#5893F7] font-semibold">{req.country}</span>
                          </p>

                          {/* Extra Checked Options */}
                          {req.options.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1.5">
                              {req.options.map(opt => (
                                <span key={opt} className="text-[9px] font-bold bg-blue-950/40 text-blue-300 border border-blue-900/30 px-1.5 py-0.5 rounded">
                                  {opt === 'Sunroof' ? t.option_sunroof :
                                   opt === 'Leather interior' ? t.option_leather :
                                   opt === '360 camera' ? t.option_camera :
                                   opt === 'Adaptive cruise control' ? t.option_cruise :
                                   opt === 'Heated seats' ? t.option_heated :
                                   opt === 'Ventilated seats' ? t.option_ventilated : opt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Financials & Comments */}
                        <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end space-y-2 text-left md:text-right">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider block">{t.req_budget}</span>
                            <strong className="text-lg font-mono text-[#5893F7] block leading-none">
                              {req.budget.toLocaleString()} {req.currency}
                            </strong>
                          </div>

                          {/* Action Contact buttons */}
                          <div className="flex flex-wrap gap-1.5 w-full md:justify-end pt-2">
                            <a 
                              href={`tel:${req.phone}`}
                              className="px-2.5 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white text-[11px] font-bold rounded-lg transition-all flex items-center space-x-1"
                            >
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span>{req.phone}</span>
                            </a>

                            <a 
                              href={`https://wa.me/${req.whatsapp.replace(/\D/g, '')}`} 
                              target="_blank" 
                              referrerPolicy="no-referrer"
                              className="px-2.5 py-1.5 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-900/30 text-emerald-400 text-[11px] font-bold rounded-lg transition-all flex items-center space-x-1"
                            >
                              <MessageCircle className="w-3 h-3 fill-emerald-400/10" />
                              <span>WhatsApp</span>
                            </a>

                            <button
                              onClick={() => handleDeleteRequest(req.id)}
                              className="p-1.5 bg-red-950/20 hover:bg-red-600 border border-red-950 text-red-400 hover:text-white rounded-lg transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Manager's Comment Box if exist */}
                      {req.comment && (
                        <div className="bg-[#030712] border border-gray-950 rounded-xl p-3.5 text-xs text-gray-300 leading-relaxed">
                          <strong className="text-gray-400 block mb-1 font-bold">{lang === 'RU' ? 'Комментарий клиента:' : 'Customer Comment:'}</strong>
                          <span className="font-normal">{req.comment}</span>
                        </div>
                      )}

                    </motion.div>
                  ))
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
