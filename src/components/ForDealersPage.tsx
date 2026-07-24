import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Users, 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight, 
  Check, 
  Phone, 
  Mail, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Percent, 
  Award, 
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Cpu,
  MessageSquare,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ForDealersPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onBackToCatalog: () => void;
  onNavigateToView: (view: string) => void;
}

export function ForDealersPage({ lang, onBackToCatalog, onNavigateToView }: ForDealersPageProps) {
  // Application form state
  const [companyName, setCompanyName] = useState('');
  const [dealerName, setDealerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [businessType, setBusinessType] = useState('Official Dealer');
  const [numVehicles, setNumVehicles] = useState('10-50');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Success toast state
  const [showToast, setShowToast] = useState(false);

  // Localized Content Dictionary
  const content = {
    RU: {
      hero_title: "Масштабируйте автосалон с помощью ИИ",
      hero_subtitle: "Управляйте складом, клиентами, маркетингом и продажами на одной интеллектуальной платформе нового поколения.",
      btn_start: "Начать партнерство",
      btn_demo: "Забронировать демо",
      btn_become: "Стать партнером",
      crm_title: "Интеллектуальная CRM для Дилеров",
      crm_subtitle: "Интегрированная система управления бизнес-процессами автосалона.",
      btn_open_crm: "Открыть CRM",
      ai_title: "Бизнес-инструменты на базе ИИ",
      ai_subtitle: "Уникальные нейросетевые алгоритмы, автоматизирующие рутину и повышающие маржинальность.",
      btn_open_ai: "Открыть AI Платформу",
      benefits_title: "Премиальные преимущества партнерства",
      benefits_subtitle: "Эксклюзивные инструменты и приоритетный статус в экосистеме Askar AutoHub.",
      stats_title: "Бизнес в цифрах",
      stats_subtitle: "Нам доверяют лидеры автомобильного рынка Кыргызстана.",
      form_title: "Стать партнером Askar AutoHub",
      form_subtitle: "Заполните форму ниже, и наш B2B-эксперт свяжется с вами для проведения презентации и подключения.",
      form_comp: "Название автосалона / компании",
      form_rep: "Имя представителя",
      form_phone: "Номер телефона",
      form_email: "Электронная почта",
      form_city: "Город присутствия",
      form_type: "Тип бизнеса",
      form_type_1: "Официальный дилер",
      form_type_2: "Независимый мультибрендовый салон",
      form_type_3: "Импортер / Агент по подбору",
      form_type_4: "Логистическая компания",
      form_stock: "Количество автомобилей на складе",
      form_submit: "Отправить заявку",
      form_success_title: "Заявка успешно отправлена!",
      form_success_desc: "Наши B2B-менеджеры рассмотрят ваше обращение и свяжутся с вами в течение 30 минут через WhatsApp или по телефону.",
      faq_title: "Часто задаваемые вопросы",
      faq_subtitle: "Всё, что вам нужно знать о подключении и возможностях интеграции.",
      cta_title: "Присоединяйтесь к будущему автобизнеса",
      cta_subtitle: "Подключите ваш автосалон к Askar AutoHub сегодня и получите бесплатный тестовый период 30 дней со всеми ИИ-модулями.",
      btn_contact_sales: "Отдел продаж (WA)",
      toast_text: "Заявка на демонстрацию успешно зарегистрирована!",
      back_catalog: "Назад в каталог",
    },
    KG: {
      hero_title: "Автосалонду ИИ жардамы менен өстүрүңүз",
      hero_subtitle: "Жаңы муундагы бирдиктной интеллектуалдык платформадан складды, кардарларды, маркетингди жана сатууларды башкарыңыз.",
      btn_start: "Өнөктөштүктү баштоо",
      btn_demo: "Демо көрүү",
      btn_become: "Өнөктөш болуу",
      crm_title: "Дилерлер үчүн интеллектуалдык CRM",
      crm_subtitle: "Автосалондун бизнес-процесстерин башкаруунун комплекстүү системасы.",
      btn_open_crm: "CRMди ачуу",
      ai_title: "Жасалма интеллект куралдары",
      ai_subtitle: "Күнүмдүк жумуштарды автоматташтыруучу жана кирешени өстүрүүчү нейротүйүндөр.",
      btn_open_ai: "AI Платформаны ачуу",
      benefits_title: "Өнөктөштүктүн премиум артыкчылыктары",
      benefits_subtitle: "Askar AutoHub экосистемасындагы өзгөчө инструменттер жана артыкчылыктуу статус.",
      stats_title: "Бизнес сандарда",
      stats_subtitle: "Кыргызстандын унаа рыногунун лидерлери бизге ишенишет.",
      form_title: "Askar AutoHub өнөктөшү болуңуз",
      form_subtitle: "Төмөндөгү форманы толтуруңуз, биздин B2B адисибиз сизге кызматтарды тааныштыруу үчүн байланышат.",
      form_comp: "Автосалондун / компаниянын аталышы",
      form_rep: "Өкүлдүн аты-жөнү",
      form_phone: "Телефон номери",
      form_email: "Электрондук почта",
      form_city: "Шаар",
      form_type: "Бизнес түрү",
      form_type_1: "Расмий дилер",
      form_type_2: "Мультибренддүү көз карандысыз салон",
      form_type_3: "Импорттоочу / Тандоо агенти",
      form_type_4: "Логистикалык компания",
      form_stock: "Кампасындагы унаалардын саны",
      form_submit: "Арызды жөнөтүү",
      form_success_title: "Арыз ийгиликтүү жөнөтүлдү!",
      form_success_desc: "Биздин B2B менеджерлер арызыңызды карап чыгып, 30 мүнөттүн ичинде WhatsApp же телефон аркылуу байланышат.",
      faq_title: "Көп берилүүчү суроолор",
      faq_subtitle: "Туташуу жана интеграция мүмкүнчүлүктөрү тууралуу бардык маалыматтар.",
      cta_title: "Автобизнестин келечегине кошулуңуз",
      cta_subtitle: "Бүгүн автосалонуңузду Askar AutoHubга туташтырыңыз жана бардык ИИ функциялары менен 30 күндүк акысыз мөөнөттү алыңыз.",
      btn_contact_sales: "Сатуу бөлүмү (WA)",
      toast_text: "Демонстрацияга жазылуу ийгиликтүү катталды!",
      back_catalog: "Каталогко кайтуу",
    },
    EN: {
      hero_title: "Grow Your Dealership with AI",
      hero_subtitle: "Manage inventory, customers, marketing and sales from one intelligent enterprise cloud platform.",
      btn_start: "Start Partnership",
      btn_demo: "Book Demo",
      btn_become: "Become Partner",
      crm_title: "Enterprise Dealer CRM Suite",
      crm_subtitle: "A unified operational hub managing physical inventory and client lifecycles.",
      btn_open_crm: "Open CRM",
      ai_title: "AI Business Intelligence Tools",
      ai_subtitle: "Machine learning layers configured to auto-generate marketing collateral and optimize lead conversion.",
      btn_open_ai: "Open AI Platform",
      benefits_title: "Premium Dealership Benefits",
      benefits_subtitle: "Scale your reach with priority placements and verified merchant credentials.",
      stats_title: "Key Business Metrics",
      stats_subtitle: "Empowering leading automotive merchants across Kyrgyzstan.",
      form_title: "Become an Askar AutoHub Partner",
      form_subtitle: "Submit your dealership registration parameters below to establish developer API credentials and partner login.",
      form_comp: "Dealership / Company Name",
      form_rep: "Representative Full Name",
      form_phone: "Direct Phone Number",
      form_email: "Corporate Email Address",
      form_city: "Operating City",
      form_type: "Business Entity Type",
      form_type_1: "Official Franchise Dealer",
      form_type_2: "Independent Multi-brand Showroom",
      form_type_3: "Sourcing Agent / Importer",
      form_type_4: "Logistics / Freight Enterprise",
      form_stock: "Active Inventory Size",
      form_submit: "Submit Application",
      form_success_title: "Application Succeeded!",
      form_success_desc: "Our B2B integration desk has received your records. An onboarding manager will reach out via Phone/WhatsApp within 30 minutes.",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Find answers regarding billing tiers, API setups, and machine learning models.",
      cta_title: "Join the Future of Automotive Business",
      cta_subtitle: "Integrate your catalog today to lock in a complimentary 30-day premium sandbox trial with all core AI modules unlocked.",
      btn_contact_sales: "Contact Sales (WA)",
      toast_text: "Live interactive demo invitation has been booked!",
      back_catalog: "Back to Catalog",
    }
  };

  const t = content[lang] || content.EN;

  // CRM Features list
  const crmFeatures = [
    {
      title: { RU: "Управление клиентами", KG: "Кардарларды башкаруу", EN: "Customer Management" },
      desc: { 
        RU: "Интеллектуальный сбор лидов со всех каналов и ведение истории сделок.", 
        KG: "Бардык булактардан кардарларды топтоо жана бүтүмдөрдүн тарыхын жүргүзүү.", 
        EN: "Consolidate cold, warm and hot leads from all channels with continuous communication logs." 
      },
      icon: <Users className="w-5 h-5 text-blue-400" />
    },
    {
      title: { RU: "Управление складом унаа", KG: "Кампаны башкаруу", EN: "Inventory Management" },
      desc: { 
        RU: "Удобная сетка учета автомобилей в наличии, транзите и резерве с авто-обновлением.", 
        KG: "Даяр унааларды, жолдогу жана брондолгон унааларды автоматтык түрдө эсепке алуу.", 
        EN: "Real-time ledger tracking active showroom listings, upcoming imports, and customer reserves." 
      },
      icon: <Layers className="w-5 h-5 text-teal-400" />
    },
    {
      title: { RU: "Импорт автомобилей", KG: "Унаа импортун башкаруу", EN: "Vehicle Import Management" },
      desc: { 
        RU: "Мониторинг логистических этапов и растаможки заказываемых транспортных средств.", 
        KG: "Буйрутма берилген транспортторду жеткирүү жана бажы баскычтарын көзөмөлдөө.", 
        EN: "Operational tracker for ocean freight, customs declarations, and local transit clearance." 
      },
      icon: <Building2 className="w-5 h-5 text-indigo-400" />
    },
    {
      title: { RU: "Панель продаж", KG: "Сатуулардын панели", EN: "Sales Dashboard" },
      desc: { 
        RU: "Визуальные графики выручки, среднего чека и конверсии воронки в реальном времени.", 
        KG: "Кирешенин, орточо баанын жана сатуу воронкасынын визуалдык графиктер.", 
        EN: "High-density charts monitoring gross revenue, dealership commissions, and active deal status." 
      },
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />
    },
    {
      title: { RU: "Эффективность сотрудников", KG: "Кызматкерлердин натыйжалуулугу", EN: "Employee Performance" },
      desc: { 
        RU: "Контроль KPI менеджеров, процента закрытых сделок и скорости ответа клиентам.", 
        KG: "Менеджерлердин KPI көрсөткүчтөрүн, сатылган унааларын жана ылдамдыгын көзөмөлдөө.", 
        EN: "Detailed performance matrix indexing representatives' response velocities and close rates." 
      },
      icon: <Award className="w-5 h-5 text-amber-400" />
    }
  ];

  // AI tools features list
  const aiFeatures = [
    {
      title: { RU: "Маркетинг ИИ (Генерация рекламы)", KG: "Маркетинг ИИ (Жарнама жаратуу)", EN: "Marketing AI" },
      desc: { 
        RU: "Мгновенное создание продающих объявлений для Instagram, WhatsApp и досок объявлений.", 
        KG: "Instagram, WhatsApp жана жарнама такталары үчүн сатуучу тексттерди тез жаратуу.", 
        EN: "Automate ad copy generation and generate social media promotional cards in seconds." 
      },
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
      action: 'marketing_ai'
    },
    {
      title: { RU: "ИИ Менеджер продаж", KG: "ИИ Сатуу менеджери", EN: "AI Sales Manager" },
      desc: { 
        RU: "Автоматический скоринг лидов, подбор аргументов и умная отправка сообщений дожима.", 
        KG: "Лиддерди автоматтык баалоо, сатуу аргументтерин тандоо жана билдирүүлөр куралы.", 
        EN: "Predict probability of win, recommend customer objection counter-arguments, and draft WhatsApp pitches." 
      },
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      action: 'sales_manager'
    },
    {
      title: { RU: "CEO ИИ Аналитика", KG: "CEO ИИ Аналитикасы", EN: "CEO AI Dashboard" },
      desc: { 
        RU: "Машинное прогнозирование спроса, цен и сезонности на рынке КР.", 
        KG: "КР рыногундагы суроо-талапты, бааларды жана сезондуулукту машиналык божомолдоо.", 
        EN: "Interactive executive board forecasting national demand shifts and regional pricing trends." 
      },
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
      action: 'ceo_dashboard'
    },
    {
      title: { RU: "Интеллектуальная аналитика рынка", KG: "Интеллектуалдык рынок талдоосу", EN: "AI Analytics" },
      desc: { 
        RU: "Автоматический подбор цен выкупа на основе миллионов прошлых сделок.", 
        KG: "Мурдагы миллиондогон бүтүмдөрдүн негизинде унаа баасын автоматтык түрдө тандоо.", 
        EN: "Predict optimal bidding limits for Copart, USS Japan or South Korean Encar on historic datasets." 
      },
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      action: 'ceo_dashboard'
    },
    {
      title: { RU: "Автоматические бизнес-отчеты", KG: "Автоматтык бизнес-отчеттор", EN: "Business Reports" },
      desc: { 
        RU: "Экспорт профессиональных PDF-отчетов по прибыли, расходам и налогам в 1 клик.", 
        KG: "Пайда, чыгаша жана салыктар боюнча профессионалдык PDF-отчетторду 1 чыкылдатуу менен жүктөө.", 
        EN: "Instantly compile fiscal reporting ledger sheets and export comprehensive PDF status packages." 
      },
      icon: <FileText className="w-5 h-5 text-sky-400" />,
      action: 'crm'
    }
  ];

  // Benefits checklist
  const benefitsList = [
    { text: { RU: "Безлимитное размещение автомобилей", KG: "Чектөөсүз унаа жарыялоо", EN: "Unlimited vehicle listings" } },
    { text: { RU: "Продажи на базе искусственного интеллекта", KG: "ИИ негизиндеги сатуулар", EN: "AI powered sales" } },
    { text: { RU: "Умное управление клиентами", KG: "Кардарлар менен акылдуу иштөө", EN: "Smart customer management" } },
    { text: { RU: "Автоматические отчеты одним кликом", KG: "Автоматтык отчеттор бир чыкылдатуу менен", EN: "Automatic reports" } },
    { text: { RU: "Маркетинговая автоматизация текстов", KG: "Маркетингди автоматташтыруу", EN: "Marketing automation" } },
    { text: { RU: "Глубокая дилерская аналитика рынка", KG: "Терең дилердик аналитика", EN: "Dealer analytics" } },
    { text: { RU: "Панель генерального директора", KG: "Жетекчинин панели", EN: "Executive dashboard" } },
    { text: { RU: "Мгновенная верификация автомобилей по базам", KG: "Унааларды базалардан тез текшерүү", EN: "Vehicle verification" } }
  ];

  // Animated counts statistics block
  const statsList = [
    {
      label: { RU: "Дилеров-партнеров", KG: "Өнөктөш дилерлер", EN: "Dealer Partners" },
      value: "45+"
    },
    {
      label: { RU: "Продано унаа", KG: "Сатылган унаалар", EN: "Vehicles Sold" },
      value: "1,200+"
    },
    {
      label: { RU: "Успешных импортов", KG: "Ийгиликтүү импорттор", EN: "Successful Imports" },
      value: "850+"
    },
    {
      label: { RU: "Удовлетворенность", KG: "Канааттануу көрсөткүчү", EN: "Customer Satisfaction" },
      value: "98.7%"
    },
    {
      label: { RU: "Точность ИИ алгоритмов", KG: "ИИ тактыгы", EN: "AI Accuracy" },
      value: "99.2%"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: {
        RU: "Как стать партнером?",
        KG: "Кантип өнөктөш болууга болот?",
        EN: "How to become a partner?"
      },
      a: {
        RU: "Для начала заполните форму ниже или оставьте заявку в WhatsApp. Наш куратор свяжется с вами для верификации автосалона и выдачи доступов в течение 30 минут.",
        KG: "Төмөндөгү форманы толтуруңуз же WhatsApp аркылуу бизге жазыңыз. Биздин адис сиз менен 30 мүнөттүн ичинде байланышып, унаа кабинетин түзүп берет.",
        EN: "Fill out the registration parameters on this page or initiate a live WhatsApp dialogue. An onboarding specialist will verify your business and issue enterprise logins within 30 minutes."
      }
    },
    {
      q: {
        RU: "Какова стоимость подписки и комиссия?",
        KG: "Жазылуу баасы жана комиссия канча турат?",
        EN: "What is the cost of the subscription?"
      },
      a: {
        RU: "Мы предлагаем гибкие тарифные планы в зависимости от объема вашего активного склада. Базовый старт полностью бесплатен для новых салонов на первые 30 дней, чтобы вы могли оценить все преимущества.",
        KG: "Сиздин активдүү унаа кампаңыздын көлөмүнө жараша ыңгайлуу тарифтерибиз бар. Алгачкы 30 күн жаңы дилерлер үчүн толугу менен акысыз берилет.",
        EN: "We structure operational billing based on active catalog dimensions. The initial baseline trial is 100% free for new dealerships during the first 30 days, with zero hidden setup costs."
      }
    },
    {
      q: {
        RU: "Предоставляется ли техподдержка?",
        KG: "Техникалык колдоо көрсөтүлөбү?",
        EN: "Do you provide technical support?"
      },
      a: {
        RU: "Да, за каждым зарегистрированным автосалоном закрепляется персональный менеджер поддержки 24/7. Мы также помогаем перенести ваш текущий склад автомобилей с других платформ абсолютно бесплатно.",
        KG: "Ооба, ар бир өнөктөшкө 24/7 колдоо көрсөтүүчү жеке менеджер дайындалат. Ошондой эле биз сиздин унааларыңызды башка платформалардан акысыз көчүрүүгө жардам беребиз.",
        EN: "Yes, every corporate partner has direct access to a dedicated integration engineer on call 24/7. We also provide free automated tooling to scrape and import your active listings from alternative databases."
      }
    },
    {
      q: {
        RU: "Нужно ли устанавливать CRM отдельно?",
        KG: "CRMди өзүнчө орнотуу керекпи?",
        EN: "Do we need to install CRM separately?"
      },
      a: {
        RU: "Нет. CRM является полностью облачной (SaaS), работает прямо в браузере с компьютера, планшета или мобильного телефона. Никакого сложного софта или серверов настраивать не нужно.",
        KG: "Жок. CRM толугу менен булуттук негизде (SaaS) иштейт жана компьютерден, планшеттен же телефондон каалаган убакта браузер аркылуу жеткиликтүү болот.",
        EN: "No. Our CRM operates on a fully containerized, secure cloud architecture. Users access dashboards instantly via any modern web browser or mobile client with no local installation required."
      }
    },
    {
      q: {
        RU: "Как работают ИИ-модули на практике?",
        KG: "ИИ-модулдары практикада кантип иштейт?",
        EN: "How do the AI modules work?"
      },
      a: {
        RU: "Наши нейросети анализируют покупательский спрос, автоматически генерируют рекламные заголовки, прогнозируют вероятность закрытия лидов и оценивают окупаемость выкупа автомобилей на аукционах США, Японии и Кореи.",
        KG: "Биздин нейротүйүндөр кардарлардын суроо-талабын талдайт, жарнамалык тексттерди жаратат жана чет өлкөлүк аукциондордогу унаалардын реалдуу баасын автоматтык эсептейт.",
        EN: "Our machine learning models continuously parse regional demand logs, draft localized WhatsApp response templates, automate marketing ad copy, and evaluate real-time resale margin ratios."
      }
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !dealerName || !phone) return;
    setIsSubmitted(true);
    triggerSuccessToast();
  };

  const triggerSuccessToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleBookDemo = () => {
    triggerSuccessToast();
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('become-partner-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white font-sans antialiased relative overflow-hidden">
      
      {/* Absolute futuristic ambient background lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-10 w-[400px] h-[400px] bg-indigo-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-5 w-[600px] h-[600px] bg-slate-900/30 rounded-full blur-[130px] pointer-events-none" />

      {/* FIXED BACK BUTTON HEADER BAR */}
      <div className="sticky top-0 z-[45] bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBackToCatalog}
            className="flex items-center space-x-2.5 text-gray-400 hover:text-white transition-all group py-1 px-3.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t.back_catalog}</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-blue-400 font-extrabold uppercase">
              🏢 PARTNER B2B ENTERPRISE
            </span>
          </div>
        </div>
      </div>

      {/* Floating Success Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -80, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -40, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[100] bg-gradient-to-r from-blue-700 to-blue-950 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-blue-400/30 backdrop-blur-xl w-[90%] max-w-md"
          >
            <div className="p-2 bg-white/10 rounded-xl">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h5 className="text-sm font-bold">{lang === 'RU' ? 'Запрос отправлен' : lang === 'KG' ? 'Суроо-талап жөнөтүлдү' : 'Request Transmitted'}</h5>
              <p className="text-xs text-gray-300 mt-0.5">{t.toast_text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-36 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            {/* Left text block */}
            <div className="lg:col-span-7 space-y-8">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2.5 bg-blue-500/10 border border-blue-500/20 px-4.5 py-2 rounded-full shadow-lg shadow-blue-500/5"
              >
                <Sparkles className="w-4 h-4 text-blue-400 animate-spin-slow" />
                <span className="text-xs font-black tracking-widest text-blue-400 uppercase font-mono">
                  Askar AutoHub Business AI
                </span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]"
                >
                  {t.hero_title}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl"
                >
                  {t.hero_subtitle}
                </motion.p>
              </div>

              {/* Responsive Hero buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
              >
                <button 
                  onClick={handleScrollToForm}
                  className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white text-sm font-black py-4.5 px-8 rounded-2xl shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  {t.btn_start}
                </button>
                <button 
                  onClick={handleBookDemo}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-sm font-bold py-4.5 px-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  {t.btn_demo}
                </button>
                <button 
                  onClick={handleScrollToForm}
                  className="bg-transparent hover:text-blue-400 text-gray-300 text-sm font-semibold py-4 px-6 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{t.btn_become}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

            </div>

            {/* Right decorative visual mockup */}
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative bg-gradient-to-b from-[#11162d] to-[#0a0d1d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Radial gradient backing */}
                <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent opacity-50" />
                
                {/* Visual Glassmorphic CRM Mockup Interface */}
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold">
                        AA
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white tracking-wide">Askar AutoHub CRM Pro</div>
                        <div className="text-[9px] text-emerald-400 font-mono flex items-center space-x-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>ECOSYSTEM ENCRYPTED</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-400 font-mono">
                      v4.2.1
                    </span>
                  </div>

                  {/* Active Deal value */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">MONTHLY PIPELINE</span>
                      <span className="text-2xl font-black text-white mt-1 block">$485,200</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-400 font-bold font-mono">+18.4%</span>
                      <span className="text-[9px] text-gray-400 block mt-0.5">vs last month</span>
                    </div>
                  </div>

                  {/* Tiny progress bars representing team activity */}
                  <div className="space-y-3.5">
                    <div className="text-[10px] font-extrabold uppercase text-gray-400 tracking-widest block">DEALERSHIP ACTIVITY</div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-gray-300">Active Listings</span>
                        <span className="text-white">142 / 150</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-gray-300">Leads Converted</span>
                        <span className="text-white">87%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: '87%' }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-gray-300">Imports in Transit</span>
                        <span className="text-white">12 Vehicles</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: DEALER CRM */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0c1b]/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-extrabold text-[#5D9CEC] uppercase tracking-widest block">B2B SUITE</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.crm_title}
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
              {t.crm_subtitle}
            </p>
          </div>

          {/* CRM Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crmFeatures.map((feat, index) => (
              <motion.div
                key={feat.title.EN}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.3)' }}
                className="bg-[#0b0e1e]/80 border border-white/5 rounded-2xl p-6.5 transition-all text-left group hover:shadow-2xl hover:shadow-blue-900/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 group-hover:text-blue-300 transition-all">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                  {feat.title[lang] || feat.title.EN}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {feat.desc[lang] || feat.desc.EN}
                </p>
              </motion.div>
            ))}

            {/* Direct Open CRM Trigger Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-gradient-to-br from-blue-950/40 to-[#0e122b]/80 border border-blue-500/20 rounded-2xl p-6.5 flex flex-col justify-between text-left group relative overflow-hidden md:col-span-2 lg:col-span-1 shadow-xl shadow-blue-900/5"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-radial-gradient from-blue-500/15 to-transparent pointer-events-none" />
              <div>
                <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest block font-bold">READY TO DEPLOY</span>
                <h3 className="text-xl font-extrabold text-white tracking-tight mt-1.5 mb-2.5">
                  {lang === 'RU' ? 'Получите полный доступ к Askar AutoHub CRM Pro' : lang === 'KG' ? 'Askar AutoHub CRM Pro укугун толук алыңыз' : 'Deploy CRM Platform Sandbox'}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {lang === 'RU' ? 'Профессиональный инструмент учета и управления, разработанный специально для автомобильного бизнеса в Кыргызстане.' 
                                : lang === 'KG' ? 'Кыргызстандагы унаа бизнеси үчүн атайын иштелип чыккан профессионалдык башкаруу куралы.' 
                                : 'Advanced operational software customized specifically for automotive dealerships in Bishkek and Central Asia.'}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigateToView('crm')}
                  className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white text-xs font-bold py-3.5 px-5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-950/40"
                >
                  <span>{t.btn_open_crm}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 2: AI BUSINESS TOOLS */}
      <section className="py-24 bg-[#080a15] border-t border-white/5 relative">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-500/5 to-transparent rounded-tr-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block">NEURAL WORKSPACE</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.ai_title}
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
              {t.ai_subtitle}
            </p>
          </div>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feat, index) => (
              <motion.div
                key={feat.title.EN}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, borderColor: 'rgba(245, 158, 11, 0.3)' }}
                className="bg-[#0b0e1e]/80 border border-white/5 rounded-2xl p-6.5 transition-all text-left group hover:shadow-2xl hover:shadow-amber-900/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-600/10 group-hover:border-amber-500/20 group-hover:text-amber-300 transition-all">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-amber-400 transition-colors">
                  {feat.title[lang] || feat.title.EN}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  {feat.desc[lang] || feat.desc.EN}
                </p>

                {/* Direct quick jump */}
                <button 
                  onClick={() => onNavigateToView(feat.action)}
                  className="inline-flex items-center space-x-1 text-xs text-amber-400 hover:text-white font-semibold transition-all group/btn"
                >
                  <span>{lang === 'RU' ? 'Запустить модуль' : lang === 'KG' ? 'Модулду баштоо' : 'Launch Module'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}

            {/* Direct Open AI Platform Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-gradient-to-br from-amber-950/20 to-[#0e122b]/80 border border-amber-500/10 rounded-2xl p-6.5 flex flex-col justify-between text-left group relative overflow-hidden md:col-span-2 lg:col-span-1 shadow-xl shadow-amber-900/5"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-radial-gradient from-amber-500/10 to-transparent pointer-events-none" />
              <div>
                <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest block font-bold">COGNITIVE INTEGRATION</span>
                <h3 className="text-xl font-extrabold text-white tracking-tight mt-1.5 mb-2.5">
                  {lang === 'RU' ? 'Единая экосистема искусственного интеллекта' : lang === 'KG' ? 'Жасалма интеллекттин бирдиктүү тутуму' : 'Consolidated Cognitive Platform'}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {lang === 'RU' ? 'Объединенный нейросетевой хаб, автоматизирующий продажи, копирайтинг рекламы и сквозную аналитику.' 
                                : lang === 'KG' ? 'Сатууларды, жарнама куралын жана аналитиканы автоматташтыруучу нейротүйүндөр.' 
                                : 'Multi-agent neural network stack configured to assist physical car dealerships and sales representatives.'}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigateToView('ai-advisor')}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-slate-950 text-xs font-black py-3.5 px-5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-950/30"
                >
                  <span>{t.btn_open_ai}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 3: DEALER BENEFITS */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0c1b]/40 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold text-[#5D9CEC] uppercase tracking-widest block">EXECUTIVE BENEFITS</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.benefits_title}
            </h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mt-4" />
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed pt-2">
              {t.benefits_subtitle}
            </p>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsList.map((item, index) => (
              <motion.div
                key={item.text.EN}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#0b0f24]/70 border border-white/10 rounded-2xl p-6 text-left relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-blue-800" />
                
                <div className="mb-4">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                
                <h4 className="text-sm font-black text-white leading-relaxed tracking-tight">
                  {item.text[lang] || item.text.EN}
                </h4>
                
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  ✔ Premium
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: BUSINESS STATISTICS */}
      <section className="py-20 bg-[#070914] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-extrabold text-[#5D9CEC] uppercase tracking-widest block">TRUST & TRANSPARENCY</span>
            <h2 className="font-display text-3xl font-extrabold text-white">
              {t.stats_title}
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              {t.stats_subtitle}
            </p>
          </div>

          {/* Counters layout */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {statsList.map((stat, idx) => (
              <motion.div
                key={stat.label.EN}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/5 border border-white/5 rounded-2xl p-5.5 text-center flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white font-mono">
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2.5 leading-tight">
                  {stat.label[lang] || stat.label.EN}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: BECOME A PARTNER (APPLICATION FORM) */}
      <section id="become-partner-form-section" className="py-24 bg-gradient-to-b from-[#070914] to-[#0d1024] relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Information Pillar */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-xs font-extrabold text-[#5D9CEC] uppercase tracking-widest block">PARTNERSHIP REGISTER</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.form_title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                {t.form_subtitle}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-gray-400">
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-500/10 rounded-lg text-blue-400">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <span>{lang === 'RU' ? 'Подключение автосалона в течение 24 часов' : lang === 'KG' ? 'Автосалонду 24 саатта кошуу' : 'Full API integration setup in 24 hours'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-500/10 rounded-lg text-blue-400">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <span>{lang === 'RU' ? 'Персональный аккаунт-менеджер 24/7' : lang === 'KG' ? 'Жеке аккаунт-менеджер 24/7' : '24/7 dedicated partner supervisor'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-500/10 rounded-lg text-blue-400">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <span>{lang === 'RU' ? 'Бесплатный тестовый период 30 дней со всеми ИИ-модулями' : lang === 'KG' ? 'Бардык ИИ куралдары менен 30 күн акысыз мөөнөт' : '30-day sandbox testing period with full AI unlocked'}</span>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0b0e1e]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* Company Name */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                            {t.form_comp} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full bg-[#070914] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/20 transition-all"
                            placeholder="Lexus Center Bishkek"
                          />
                        </div>

                        {/* Dealer Representative Name */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                            {t.form_rep} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={dealerName}
                            onChange={(e) => setDealerName(e.target.value)}
                            className="w-full bg-[#070914] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/20 transition-all"
                            placeholder={lang === 'RU' ? 'Алексей / Нурбек' : 'Full Name'}
                          />
                        </div>

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                            {t.form_phone} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#070914] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/20 transition-all"
                            placeholder="+996 555 123-456"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                            {t.form_email}
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#070914] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/20 transition-all"
                            placeholder="partner@dealership.kg"
                          />
                        </div>

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* City */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                            {t.form_city}
                          </label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#070914] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/20 transition-all"
                            placeholder={lang === 'RU' ? 'Бишкек / Ош' : 'Bishkek'}
                          />
                        </div>

                        {/* Business Entity Type */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                            {t.form_type}
                          </label>
                          <select
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full bg-[#070914] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-900/20 transition-all cursor-pointer"
                          >
                            <option value="Official Dealer">{t.form_type_1}</option>
                            <option value="Independent Showroom">{t.form_type_2}</option>
                            <option value="Sourcing Agent">{t.form_type_3}</option>
                            <option value="Logistics Enterprise">{t.form_type_4}</option>
                          </select>
                        </div>

                      </div>

                      {/* Number of vehicles */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                          {t.form_stock}
                        </label>
                        <div className="grid grid-cols-4 gap-2.5">
                          {['< 10', '10-50', '50-100', '100+'].map((range) => {
                            const isSel = numVehicles === range;
                            return (
                              <button
                                type="button"
                                key={range}
                                onClick={() => setNumVehicles(range)}
                                className={`py-3 rounded-xl text-xs font-bold transition-all border text-center ${
                                  isSel
                                    ? 'bg-[#0B3D91] border-blue-500 text-white shadow-md'
                                    : 'bg-[#070914] border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                {range}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white text-xs font-black py-4.5 px-6 rounded-2xl shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center space-x-2"
                        >
                          <Building2 className="w-4 h-4" />
                          <span>{t.form_submit}</span>
                        </button>
                      </div>

                    </form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                        <Check className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-extrabold text-white">
                          {t.form_success_title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
                          {t.form_success_desc}
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setIsSubmitted(false);
                            setCompanyName('');
                            setDealerName('');
                            setPhone('');
                          }}
                          className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 transition-all"
                        >
                          {lang === 'RU' ? 'Отправить ещё одну заявку' : lang === 'KG' ? 'Жаңы арыз жөнөтүү' : 'Send Another Application'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="py-24 bg-[#070914] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold text-[#5D9CEC] uppercase tracking-widest block">PARTNER KNOWLEDGE BASE</span>
            <h2 className="font-display text-3xl font-extrabold text-white">
              {t.faq_title}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.faq_subtitle}
            </p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-[#0b0e1e]/60 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left text-sm font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q[lang] || faq.q.EN}</span>
                    <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-white/5 text-xs text-gray-400 leading-relaxed">
                          {faq.a[lang] || faq.a.EN}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 bg-gradient-to-t from-slate-950 to-[#070914] border-t border-white/5 relative overflow-hidden">
        {/* Subtle backing grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block">JOIN THE LEADER</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {t.cta_title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
              {t.cta_subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleScrollToForm}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white text-xs font-black py-4 px-8 rounded-xl shadow-xl transition-all hover:scale-[1.02]"
            >
              {t.btn_become}
            </button>
            <a
              href="https://wa.me/996555123456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/30 text-xs font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center space-x-1.5 hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{t.btn_contact_sales}</span>
            </a>
            <button
              onClick={handleBookDemo}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-xs font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02]"
            >
              {t.btn_demo}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
