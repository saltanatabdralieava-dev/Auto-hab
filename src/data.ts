import { Car } from './types';

export const BRANDS = [
  { name: 'Toyota', logoText: 'T', count: 184 },
  { name: 'Lexus', logoText: 'L', count: 92 },
  { name: 'BMW', logoText: 'M', count: 120 },
  { name: 'Mercedes-Benz', logoText: 'MB', count: 142 },
  { name: 'Hyundai', logoText: 'H', count: 110 },
  { name: 'Kia', logoText: 'K', count: 85 },
  { name: 'Honda', logoText: 'H', count: 74 },
  { name: 'Nissan', logoText: 'N', count: 53 }
];

export const CARS_DATA: Car[] = [
  {
    id: '1',
    brand: 'Lexus',
    model: 'LX 600',
    generation: 'IV',
    year: 2023,
    price: 135000,
    mileage: 15000,
    engine: '3.5L Twin-Turbo V6 (415 л.с.)',
    transmission: {
      RU: 'Автомат',
      KG: 'Автомат',
      EN: 'Automatic'
    },
    drive: {
      RU: 'Полный (4WD)',
      KG: 'Толук жетектүү (4WD)',
      EN: 'All-Wheel Drive (4WD)'
    },
    color: {
      RU: 'Черный металлик',
      KG: 'Кара металл',
      EN: 'Black Metallic'
    },
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
    dealer: 'Lexus Center Bishkek',
    city: {
      RU: 'Бишкек',
      KG: 'Бишкек',
      EN: 'Bishkek'
    },
    isNew: true,
    featured: true,
    whatsappNumber: '+996555123456',
    phoneNumber: '+996555123456',
    description: {
      RU: 'Идеальное состояние, один владелец в КР. Куплен у официального дилера. Максимальная VIP комплектация, 4 отдельных массажных кресла, задняя мультимедийная система, пневмоподвеска.',
      KG: 'Абдан сонун абалда, КРдеги бир гана ээси болгон. Расмий дилерден сатылып алынган. Максималдуу VIP комплектациясы, 4 өзүнчө массаж жасоочу отургучтар, арткы мультимедиа системасы, пневматикалык асма.',
      EN: 'Perfect condition, single owner in KG. Purchased from an official dealer. Top-tier VIP package featuring 4 individual massage seats, rear seat entertainment, and adaptive air suspension.'
    },
    fuelType: {
      RU: 'Бензин',
      KG: 'Бензин',
      EN: 'Petrol'
    },
    bodyType: {
      RU: 'Внедорожник',
      KG: 'Внедорожник',
      EN: 'SUV'
    },
    status: 'available',
    popularity: 98,
    createdAt: '2026-07-10T12:00:00Z'
  },
  {
    id: '2',
    brand: 'Toyota',
    model: 'Land Cruiser 300',
    generation: 'GR-Sport',
    year: 2022,
    price: 110000,
    mileage: 28000,
    engine: '3.3L Twin-Turbo Diesel (306 л.с.)',
    transmission: {
      RU: 'Автомат',
      KG: 'Автомат',
      EN: 'Automatic'
    },
    drive: {
      RU: 'Полный (4WD)',
      KG: 'Толук жетектүү (4WD)',
      EN: 'All-Wheel Drive (4WD)'
    },
    color: {
      RU: 'Белый перламутр',
      KG: 'Ак бермет',
      EN: 'White Pearl'
    },
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    dealer: 'Toyota Center Kyrgyzstan',
    city: {
      RU: 'Бишкек',
      KG: 'Бишкек',
      EN: 'Bishkek'
    },
    isNew: false,
    featured: true,
    whatsappNumber: '+996707888999',
    phoneNumber: '+996707888999',
    description: {
      RU: 'Эксклюзивная версия GR-Sport. Полная шумоизоляция премиум-класса, передняя часть автомобиля в бронепленке. Обслуживание строго у официального дилера, на гарантии.',
      KG: 'Эксклюзивдүү GR-Sport версиясы. Премиум-класстагы толук ызы-чуудан изоляциялоо жасалган, унаанын алдыңкы бөлүгү коргоочу пленкада. Тейлөө расмий дилерде гана жүргүзүлгөн, кепилдикте.',
      EN: 'Exclusive GR-Sport package. Premium full soundproofing, front end wrapped in defensive paint protection film. Serviced strictly at the official dealer, under active warranty.'
    },
    fuelType: {
      RU: 'Дизель',
      KG: 'Дизель',
      EN: 'Diesel'
    },
    bodyType: {
      RU: 'Внедорожник',
      KG: 'Внедорожник',
      EN: 'SUV'
    },
    status: 'available',
    popularity: 95,
    createdAt: '2026-07-08T15:30:00Z'
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'M5 Competition',
    generation: 'F90 LCI',
    year: 2021,
    price: 95000,
    mileage: 35000,
    engine: '4.4L TwinPower Turbo V8 (625 л.с.)',
    transmission: {
      RU: 'Стептроник',
      KG: 'Стептроник',
      EN: 'Steptronic Automatic'
    },
    drive: {
      RU: 'Полный (M xDrive)',
      KG: 'Толук (M xDrive)',
      EN: 'AWD (M xDrive)'
    },
    color: {
      RU: 'Серый матовый (Nardo)',
      KG: 'Боз күңүрт (Nardo)',
      EN: 'Matte Grey (Nardo)'
    },
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    dealer: 'Estoril Auto House',
    city: {
      RU: 'Ош',
      KG: 'Ош',
      EN: 'Osh'
    },
    isNew: false,
    featured: true,
    whatsappNumber: '+996770222111',
    phoneNumber: '+996770222111',
    description: {
      RU: 'Заводской окрас, карбон-керамические тормоза M Carbon. Спортивный выхлоп M Performance, лазерные фары BMW Laserlight, проекционный дисплей.',
      KG: 'Заводдук боёк, карбон-керамикалык M Carbon тормоздору. M Performance спорттук газ чыгаруусу, BMW Laserlight лазердик фаралары, проекциялык дисплей.',
      EN: 'Factory original paint, high-performance M Carbon Ceramic brakes. M Performance sport exhaust, BMW Laserlight laser headlights, and full colored Head-Up Display.'
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
    popularity: 92,
    createdAt: '2026-07-12T09:15:00Z'
  },
  {
    id: '4',
    brand: 'Mercedes-Benz',
    model: 'G 63 AMG',
    generation: 'W463A',
    year: 2020,
    price: 165000,
    mileage: 42000,
    engine: '4.0L BiTurbo V8 (585 л.с.)',
    transmission: {
      RU: '9G-TRONIC',
      KG: '9G-TRONIC',
      EN: '9G-TRONIC Automatic'
    },
    drive: {
      RU: 'Полный (4WD)',
      KG: 'Толук жетектүү (4WD)',
      EN: 'All-Wheel Drive (4WD)'
    },
    color: {
      RU: 'Черный матовый (Obsidian)',
      KG: 'Кара күңүрт (Obsidian)',
      EN: 'Matte Black (Obsidian)'
    },
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?auto=format&fit=crop&q=80&w=1200',
    dealer: 'Premium Auto Osh',
    city: {
      RU: 'Ош',
      KG: 'Ош',
      EN: 'Osh'
    },
    isNew: false,
    featured: false,
    whatsappNumber: '+996505333444',
    phoneNumber: '+996505333444',
    description: {
      RU: 'Оригинальный обвес AMG Night Package, выхлопная система Akrapovic. Аудиосистема Burmester 3D Surround. Эксклюзивная кожа Nappa с ромбовидной прострочкой.',
      KG: 'Оригиналдуу AMG Night Package обвеси, Akrapovic газ чыгаруу системасы. Burmester 3D Surround аудиосистемасы. Алмаз сымал тигилген өзгөчө Nappa булгаарысы.',
      EN: 'Original AMG Night Package styling, premium Akrapovic exhaust system. Burmester 3D Surround audio. Exclusive diamond-stitched design Nappa leather interior.'
    },
    fuelType: {
      RU: 'Бензин',
      KG: 'Бензин',
      EN: 'Petrol'
    },
    bodyType: {
      RU: 'Внедорожник',
      KG: 'Внедорожник',
      EN: 'SUV'
    },
    status: 'available',
    popularity: 96,
    createdAt: '2026-07-05T18:40:00Z'
  },
  {
    id: '5',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    generation: 'EV AWD',
    year: 2022,
    price: 38000,
    mileage: 19000,
    engine: 'Электро (72.6 кВт/ч, 305 л.с.)',
    transmission: {
      RU: 'Редуктор',
      KG: 'Редуктор',
      EN: 'Single-Speed Reducer'
    },
    drive: {
      RU: 'Полный (AWD)',
      KG: 'Толук жетектүү (AWD)',
      EN: 'All-Wheel Drive (AWD)'
    },
    color: {
      RU: 'Серебристый кибер',
      KG: 'Күмүш кибер',
      EN: 'Cyber Silver'
    },
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200',
    dealer: 'GreenDrive Электрохаус',
    city: {
      RU: 'Бишкек',
      KG: 'Бишкек',
      EN: 'Bishkek'
    },
    isNew: true,
    featured: false,
    whatsappNumber: '+996772777111',
    phoneNumber: '+996772777111',
    description: {
      RU: 'Абсолютно экологичный, футуристичный дизайн. Реальный запас хода на одном заряде до 460 км по горным дорогам КР. Панорамная крыша, сидения-оттоманки с вентиляцией.',
      KG: 'Толугу менен экологиялык таза, футуристтик дизайн. КРдин тоолуу жолдорунда бир кубаттоо менен 460 км жүрөт. Панорамалык чатыр, желдетилүүчү отургучтар.',
      EN: 'Fully electric with a unique futuristic look. Features a real-world range of up to 460 km even on Kyrgyzstan high-altitude routes. Panoramic glass roof and executive ventilating relaxation seats.'
    },
    fuelType: {
      RU: 'Электро',
      KG: 'Электро',
      EN: 'Electric'
    },
    bodyType: {
      RU: 'Хэтчбек',
      KG: 'Хэтчбек',
      EN: 'Hatchback'
    },
    status: 'available',
    popularity: 89,
    createdAt: '2026-07-14T11:20:00Z'
  },
  {
    id: '6',
    brand: 'Kia',
    model: 'K5 Signature',
    generation: 'DL3 LCI',
    year: 2021,
    price: 26500,
    mileage: 45000,
    engine: '2.5L GDI Smartstream (194 л.с.)',
    transmission: {
      RU: '8-ступ. автомат',
      KG: '8 баскычтуу автомат',
      EN: '8-Speed Automatic'
    },
    drive: {
      RU: 'Передний (FWD)',
      KG: 'Алдыңкы жетектүү (FWD)',
      EN: 'Front-Wheel Drive (FWD)'
    },
    color: {
      RU: 'Темно-серый металлик',
      KG: 'Кара боз металл',
      EN: 'Dark Grey Metallic'
    },
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    dealer: 'Kia Center Bishkek',
    city: {
      RU: 'Джалал-Абад',
      KG: 'Жалал-Абад',
      EN: 'Jalal-Abad'
    },
    isNew: false,
    featured: false,
    whatsappNumber: '+996551999222',
    phoneNumber: '+996551999222',
    description: {
      RU: 'Премиальная комплектация Signature. Кожаный салон цвета терракот, аудиосистема Bose с сабвуфером, камеры кругового обзора 360°, интеллектуальный круиз-контроль.',
      KG: 'Премиум Signature комплектациясы. Терракот түстөгү булгаары салон, Bose аудиосистемасы, 360° тегерекче көрүү камералары, интеллектуалдык круиз-контроль.',
      EN: 'Premium Signature edition. High-end terracotta-colored leather interior, premium Bose acoustic system, 360-degree surrounding cameras, and smart adaptive cruise control.'
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
    status: 'sold',
    popularity: 85,
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: '7',
    brand: 'Toyota',
    model: 'Camry 70',
    generation: 'XV70 LCI',
    year: 2021,
    price: 28500,
    mileage: 56000,
    engine: '2.5L Dynamic Force (203 л.с.)',
    transmission: {
      RU: '8-ступ. автомат',
      KG: '8 баскычтуу автомат',
      EN: '8-Speed Automatic'
    },
    drive: {
      RU: 'Передний (FWD)',
      KG: 'Алдыңкы жетектүү (FWD)',
      EN: 'Front-Wheel Drive (FWD)'
    },
    color: {
      RU: 'Белый перламутр',
      KG: 'Ак бермет',
      EN: 'White Pearl'
    },
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=1200',
    dealer: 'Toyota Center Kyrgyzstan',
    city: {
      RU: 'Бишкек',
      KG: 'Бишкек',
      EN: 'Bishkek'
    },
    isNew: false,
    featured: false,
    whatsappNumber: '+996707888999',
    phoneNumber: '+996707888999',
    description: {
      RU: 'Популярный седан в КР. Комплектация Престиж, бесключевой доступ, подогрев всех сидений, зимний пакет, в идеальном состоянии, без ДТП.',
      KG: 'КРдеги популярдуу седан. Престиж комплектациясы, ачкычсыз кирүү, бардык отургучтарды жылытуу, кышкы пакет, сонун абалда, кырсыкка учураган эмес.',
      EN: 'Highly popular sedan in Kyrgyzstan. Prestige package, keyless entry, all heated seats, winter pack, mint condition, 100% accident-free.'
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
    popularity: 97,
    createdAt: '2026-07-13T14:50:00Z'
  },
  {
    id: '8',
    brand: 'Lexus',
    model: 'RX 450h',
    generation: 'IV LCI',
    year: 2020,
    price: 49000,
    mileage: 62000,
    engine: '3.5L V6 Hybrid (313 л.с.)',
    transmission: {
      RU: 'Вариатор (e-CVT)',
      KG: 'Вариатор (e-CVT)',
      EN: 'e-CVT Variator'
    },
    drive: {
      RU: 'Полный (E-Four)',
      KG: 'Толук жетектүү (E-Four)',
      EN: 'All-Wheel Drive (E-Four)'
    },
    color: {
      RU: 'Темно-синий перламутр',
      KG: 'Кара көк бермет',
      EN: 'Dark Blue Pearl'
    },
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
    dealer: 'Lexus Center Bishkek',
    city: {
      RU: 'Бишкек',
      KG: 'Бишкек',
      EN: 'Bishkek'
    },
    isNew: false,
    featured: false,
    whatsappNumber: '+996555123456',
    phoneNumber: '+996555123456',
    description: {
      RU: 'Экономичный и надежный гибридный кроссовер. Панорамная крыша, аудиосистема Mark Levinson, вентиляция и подогрев сидений, система контроля слепых зон BSM.',
      KG: 'Үнөмдүү жана ишенимдүү гибриддик кроссовер. Панорамалык чатыр, Mark Levinson аудиосистемасы, отургучтарды желдетүү жана жылытуу, сокур зоналарды көзөмөлдөө системасы BSM.',
      EN: 'Highly efficient and reliable hybrid luxury SUV. Features panoramic glass roof, premium Mark Levinson audio, ventilated & heated power seats, and Blind Spot Monitor (BSM).'
    },
    fuelType: {
      RU: 'Гибрид',
      KG: 'Гибрид',
      EN: 'Hybrid'
    },
    bodyType: {
      RU: 'Внедорожник',
      KG: 'Внедорожник',
      EN: 'SUV'
    },
    status: 'available',
    popularity: 91,
    createdAt: '2026-07-09T08:00:00Z'
  },
  {
    id: '9',
    brand: 'Nissan',
    model: 'Leaf',
    generation: 'II',
    year: 2019,
    price: 15500,
    mileage: 72000,
    engine: 'Электро (40 кВт/ч, 150 л.с.)',
    transmission: {
      RU: 'Редуктор',
      KG: 'Редуктор',
      EN: 'Single-Speed Reducer'
    },
    drive: {
      RU: 'Передний (FWD)',
      KG: 'Алдыңкы жетектүү (FWD)',
      EN: 'Front-Wheel Drive (FWD)'
    },
    color: {
      RU: 'Серый металлик',
      KG: 'Боз металл',
      EN: 'Grey Metallic'
    },
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200',
    dealer: 'GreenDrive Электрохаус',
    city: {
      RU: 'Ош',
      KG: 'Ош',
      EN: 'Osh'
    },
    isNew: false,
    featured: false,
    whatsappNumber: '+996772777111',
    phoneNumber: '+996772777111',
    description: {
      RU: 'Идеальный городской электромобиль, батарея в отличном состоянии (11 делений из 12). Запас хода до 240 км. Камера заднего вида, климат-контроль.',
      KG: 'Мыкты шаардык электромобиль, батареясы абдан сонун абалда (12ден 11 деңгээл). Басып өтүүчү жолу 240 км чейин. Арткы көрүү камерасы, климат-контроль.',
      EN: 'Perfect urban electric vehicle with high-health battery (11/12 bars remaining). Delivers up to 240 km of range. Rear-view camera, heated steering wheel & climate control.'
    },
    fuelType: {
      RU: 'Электро',
      KG: 'Электро',
      EN: 'Electric'
    },
    bodyType: {
      RU: 'Хэтчбек',
      KG: 'Хэтчбек',
      EN: 'Hatchback'
    },
    status: 'sold',
    popularity: 80,
    createdAt: '2026-06-25T11:00:00Z'
  }
];


export const TRANSLATIONS = {
  RU: {
    nav_home: "Главная",
    nav_services: "Услуги",
    nav_cars: "Автомобили",
    nav_auctions: "Аукционы",
    nav_order_car: "Заказать авто",
    nav_vin_check: "Проверка VIN",
    nav_ai_advisor: "AI Советник",
    nav_order_tracking: "Статус заказа",
    nav_crm: "CRM",
    nav_marketing_ai: "Маркетинг AI",
    nav_ceo_dashboard: "CEO AI Панель",
    nav_vehicle_timeline: "История авто & Траст-балл",
    nav_sales_manager: "AI Менеджер продаж",
    nav_dealers: "Автосалоны",
    nav_calculators: "Калькуляторы",
    nav_about: "О нас",
    nav_contacts: "Контакты",
    btn_login: "Войти",
    btn_search: "Найти автомобиль",
    hero_title: "Askar AutoHub Kyrgyzstan",
    hero_subtitle: "Премиальная цифровая AI-платформа автомобильного рынка Кыргызстана. Инновационный подбор, умная аналитика и полная безопасность.",
    filter_brand: "Марка",
    filter_model: "Модель",
    filter_price: "Цена до ($)",
    filter_year: "Год от",
    all_brands: "Все марки",
    all_models: "Все модели",
    brands_title: "Популярные бренды",
    new_arrivals: "Новые поступления",
    why_autohub: "Почему Askar AutoHub?",
    verified_dealers: "Проверенные автосалоны",
    verified_dealers_desc: "Сотрудничаем только с надежными и сертифицированными дилерами по всей стране.",
    wide_selection: "Большой выбор автомобилей",
    wide_selection_desc: "Тысячи предложений от новых электромобилей до проверенной классики.",
    smart_search: "Удобный поиск",
    smart_search_desc: "Интеллектуальные фильтры помогут найти идеальный вариант в пару кликов.",
    secure_deals: "Безопасные сделки",
    secure_deals_desc: "Полная юридическая проверка каждого автомобиля и безопасность расчетов.",
    currency: "$",
    mileage_unit: "км",
    details: "Подробнее",
    contacts: "Контакты",
    about_text: "Askar AutoHub Kyrgyzstan — премиальная международная экосистема, объединяющая весь авторынок Кыргызстана. Наша миссия — сделать процесс покупки и продажи автомобилей прозрачным, безопасным и комфортным для каждого гражданина.",
    privacy: "Политика конфиденциальности",
    rights: "Все права защищены",
    any: "Любой",
    search_placeholder: "Поиск по модели, марке или дилеру...",
    found_count: "Найдено автомобилей",
    no_results: "К сожалению, автомобили не найдены по вашему запросу. Попробуйте сбросить фильтры.",
    reset_filters: "Сбросить фильтры",
    dealer_label: "Дилер",
    specs: "Характеристики",
    engine: "Двигатель",
    transmission: "Коробка",
    drive: "Привод",
    color: "Цвет",
    contact_seller: "Связаться с продавцом",
    call_btn: "Позвонить",
    chat_btn: "Написать в WhatsApp",
    back_to_catalog: "Назад к каталогу",
    add_listing: "Подать объявление",
    login_title: "Вход в систему",
    login_subtitle: "Доступ к личному кабинету Askar AutoHub",
    phone_label: "Номер телефона",
    password_label: "Пароль",
    remember_me: "Запомнить меня",
    forgot_password: "Забыли пароль?",
    dont_have_account: "Нет аккаунта?",
    register_now: "Зарегистрироваться",
    close: "Закрыть",
    address: "Кыргызстан, г. Бишкек, ул. Абдрахманова 105",
    phone_number: "+996 (555) 12-34-56",
    email_address: "info@autohub.kg",
    city_label: "Город",
    years_ago: "лет",
    mileage_label: "Пробег",
    add_car_title: "Добавить автомобиль на продажу",
    form_brand: "Марка автомобиля",
    form_model: "Модель",
    form_year: "Год выпуска",
    form_price: "Стоимость ($)",
    form_mileage: "Пробег (км)",
    form_engine: "Двигатель (например, 2.5L Hybrid)",
    form_submit: "Опубликовать объявление",
    success_toast: "Объявление успешно отправлено на модерацию!",
    about_desc_1: "Askar AutoHub Kyrgyzstan — ведущая инновационная автомобильная технология в Центральной Азии. Мы объединяем более 50 сертифицированных автосалонов и тысяч индивидуальных продавцов в единую экосистему.",
    about_desc_2: "Мы применяем передовые технологии верификации автомобилей, чтобы обеспечить безопасность сделок и исключить мошенничество. С нами покупка авто становится простой и быстрой, как заказ смартфона."
  },
  KG: {
    nav_home: "Башкы бет",
    nav_services: "Кызматтар",
    nav_cars: "Унаалар",
    nav_auctions: "Аукциондор",
    nav_order_car: "Заказ авто",
    nav_vin_check: "VIN текшерүү",
    nav_ai_advisor: "AI Кеңешчи",
    nav_order_tracking: "Буйрутманы көзөмөлдөө",
    nav_crm: "CRM",
    nav_marketing_ai: "Маркетинг AI",
    nav_ceo_dashboard: "CEO AI Панели",
    nav_vehicle_timeline: "Унаа тарыхы & Траст-балл",
    nav_sales_manager: "AI Сатуу менеджери",
    nav_dealers: "Автосалондор",
    nav_calculators: "Калькуляторлор",
    nav_about: "Биз жөнүндө",
    nav_contacts: "Байланыш",
    btn_login: "Кирүү",
    btn_search: "Унаа издөө",
    hero_title: "Askar AutoHub Kyrgyzstan",
    hero_subtitle: "Кыргызстандын унаа рыногундагы премиум санариптик AI платформасы. Инновациялык тандоо, акылдуу аналитика жана толук коопсуздук.",
    filter_brand: "Маркасы",
    filter_model: "Модели",
    filter_price: "Баасы чейин ($)",
    filter_year: "Жылы баштап",
    all_brands: "Бардык маркалар",
    all_models: "Бардык моделдер",
    brands_title: "Популярдуу бренддер",
    new_arrivals: "Жаңы келгендер",
    why_autohub: "Эмне үчүн Askar AutoHub?",
    verified_dealers: "Текшерилген автосалондор",
    verified_dealers_desc: "Өлкө боюнча ишенимдүү жана тастыкталган дилерлер менен гана кызматташабыз.",
    wide_selection: "Унаалардын чоң тандоосу",
    wide_selection_desc: "Жаңы электромобилдерден тартып текшерилген классикага чейин миңдеген сунуштар.",
    smart_search: "Ыңгайлуу издөө",
    smart_search_desc: "Интеллектуалдык чыпкалар идеалдуу вариантты эки чыкылдатуу менен табууга жардам берет.",
    secure_deals: "Коопсуз бүтүмдөр",
    secure_deals_desc: "Ар бир унааны толук юридикалык текшерүү жана эсептешүүлөрдүн коопсуздугу.",
    currency: "$",
    mileage_unit: "км",
    details: "Кененирээк",
    contacts: "Байланышуу",
    about_text: "Askar AutoHub Kyrgyzstan — Кыргызстандын бүткүл унаа рыногун бириктирген премиум эл аралык санариптик экосистема. Биздин максат — унаа сатып алуу жана сатуу процессин ар бир жаран үчүн ачык, коопсуз жана ыңгайлуу кылуу.",
    privacy: "Купуялык саясаты",
    rights: "Бардык укуктар корголгон",
    any: "Каалаган",
    search_placeholder: "Модели, маркасы же дилери боюнча издөө...",
    found_count: "Табылган унаалар",
    no_results: "Тилекке каршы, сиздин сурооңуз боюнча унаа табылган жок. Чыпкаларды баштапкы абалга келтирип көрүңүз.",
    reset_filters: "Чыпкаларды тазалоо",
    dealer_label: "Дилер",
    specs: "Мүнөздөмөсү",
    engine: "Кыймылдаткыч",
    transmission: "КПП",
    drive: "Жетек",
    color: "Түсү",
    contact_seller: "Сатуучу менен байланышуу",
    call_btn: "Чалуу",
    chat_btn: "WhatsApp аркылуу жазуу",
    back_to_catalog: "Каталогко кайтуу",
    add_listing: "Жарнама берүү",
    login_title: "Системага кирүү",
    login_subtitle: "Askar AutoHub өздүк кабинетине кирүү",
    phone_label: "Телефон номери",
    password_label: "Сыр сөз",
    remember_me: "Мени эстеп кал",
    forgot_password: "Сыр сөздү унуттуңузбу?",
    dont_have_account: "Аккаунтуңуз жокпу?",
    register_now: "Катталуу",
    close: "Жабуу",
    address: "Кыргызстан, Бишкек ш., Абдрахманов көчөсү 105",
    phone_number: "+996 (555) 12-34-56",
    email_address: "info@autohub.kg",
    city_label: "Шаар",
    years_ago: "жыл",
    mileage_label: "Пробег",
    add_car_title: "Сатуу үчүн унаа кошуу",
    form_brand: "Унаанын маркасы",
    form_model: "Модели",
    form_year: "Жылы",
    form_price: "Баасы ($)",
    form_mileage: "Басып өткөн жолу (км)",
    form_engine: "Кыймылдаткыч (мисалы, 2.5L Hybrid)",
    form_submit: "Жарнаманы жарыялоо",
    success_toast: "Кулактандыруу модерацияга ийгиликтүү жөнөтүлдү!",
    about_desc_1: "Askar AutoHub Kyrgyzstan — Борбордук Азиядагы алдыңкы инновациялык унаа технологиясы. Биз өлкө боюнча 50дөн ашык сертификацияланган автосалондорду жана миңдеген жеке сатуучуларды бирдиктүү экосистемага бириктиребиз.",
    about_desc_2: "Бүтүмдөрдүн коопсуздугун камсыз кылуу жана алдамчылыкты жоюу үчүн биз алдыңкы автоунааларды текшерүү технологияларын колдонобуз. Биз менен унаа сатып алуу смартфонго заказ бергендей оңой жана тез болот."
  },
  EN: {
    nav_home: "Home",
    nav_services: "Services",
    nav_cars: "Cars",
    nav_auctions: "Auctions",
    nav_order_car: "Order Car",
    nav_vin_check: "VIN Check",
    nav_ai_advisor: "AI Advisor",
    nav_order_tracking: "Order Tracking",
    nav_crm: "CRM",
    nav_marketing_ai: "Marketing AI",
    nav_ceo_dashboard: "CEO AI Dashboard",
    nav_vehicle_timeline: "Vehicle Timeline",
    nav_sales_manager: "AI Sales Manager",
    nav_dealers: "Dealerships",
    nav_calculators: "Calculators",
    nav_about: "About Us",
    nav_contacts: "Contacts",
    btn_login: "Sign In",
    btn_search: "Find Car",
    hero_title: "Askar AutoHub Kyrgyzstan",
    hero_subtitle: "Premium digital AI automotive platform of Kyrgyzstan. Innovative matchmaking, smart telemetry, and unparalleled transaction safety.",
    filter_brand: "Make",
    filter_model: "Model",
    filter_price: "Max Price ($)",
    filter_year: "Min Year",
    all_brands: "All Makes",
    all_models: "All Models",
    brands_title: "Popular Brands",
    new_arrivals: "New Arrivals",
    why_autohub: "Why Askar AutoHub?",
    verified_dealers: "Verified Dealerships",
    verified_dealers_desc: "We cooperate only with reliable and certified dealers across the country.",
    wide_selection: "Wide Car Selection",
    wide_selection_desc: "Thousands of listings from brand new EVs to time-tested classics.",
    smart_search: "Smart Search",
    smart_search_desc: "Intelligent filters help you find the perfect match in just a few clicks.",
    secure_deals: "Secure Transactions",
    secure_deals_desc: "Complete legal verification of every vehicle and secure settlement methods.",
    currency: "$",
    mileage_unit: "km",
    details: "Details",
    contacts: "Contacts",
    about_text: "Askar AutoHub Kyrgyzstan is the premium international digital ecosystem unifying the entire automotive market of Kyrgyzstan. Our mission is to make car buying and selling transparent, secure, and convenient for everyone.",
    privacy: "Privacy Policy",
    rights: "All Rights Reserved",
    any: "Any",
    search_placeholder: "Search by model, brand, or dealer...",
    found_count: "Cars found",
    no_results: "Unfortunately, no cars match your search. Try resetting filters.",
    reset_filters: "Reset Filters",
    dealer_label: "Dealer",
    specs: "Specifications",
    engine: "Engine",
    transmission: "Transmission",
    drive: "Drivetrain",
    color: "Color",
    contact_seller: "Contact Seller",
    call_btn: "Call Now",
    chat_btn: "Chat on WhatsApp",
    back_to_catalog: "Back to Catalog",
    add_listing: "Post Listing",
    login_title: "Sign In",
    login_subtitle: "Access your Askar AutoHub account",
    phone_label: "Phone Number",
    password_label: "Password",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    dont_have_account: "Don't have an account?",
    register_now: "Sign Up",
    close: "Close",
    address: "Kyrgyzstan, Bishkek, 105 Abdrakhmanov Str.",
    phone_number: "+996 (555) 12-34-56",
    email_address: "info@autohub.kg",
    city_label: "City",
    years_ago: "yrs",
    mileage_label: "Mileage",
    add_car_title: "List your car for sale",
    form_brand: "Car brand",
    form_model: "Model",
    form_year: "Year of manufacture",
    form_price: "Price ($)",
    form_mileage: "Mileage (km)",
    form_engine: "Engine (e.g. 2.5L Hybrid)",
    form_submit: "Publish listing",
    success_toast: "Listing successfully submitted for review!",
    about_desc_1: "Askar AutoHub Kyrgyzstan is the leading innovative automotive technology in Central Asia. We connect more than 50 certified dealerships and thousands of individual sellers into a single ecosystem.",
    about_desc_2: "We use advanced vehicle inspection and certification technologies to ensure the safety of transactions and eliminate fraud. With us, buying a car is as simple and fast as ordering a smartphone."
  }
};
