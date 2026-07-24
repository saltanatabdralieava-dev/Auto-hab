import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, TrendingUp, Sparkles, Users, Target, LineChart as LucideLineChart, Megaphone, 
  Percent, Award, Shield, Activity, FileText, Layers, Globe, Languages, Coins, 
  Clock, ArrowLeft, Check, CheckCircle, Download, Share2, Smartphone, Search, 
  Eye, MousePointerClick, Compass, BookOpen, ArrowUpRight, BarChart3, PieChart as LucidePieChart, 
  Plus, Send, Calendar, ChevronRight, MessageSquare, AlertCircle, RefreshCw, Trash2
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface MarketingAiPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onBackToCatalog: () => void;
}

// Sub-Tab types
type MainTab = 'dashboard' | 'ad_generator' | 'target_audience' | 'campaign_planner' | 'customer_insights' | 'promotion_center' | 'content_studio' | 'competitor_analysis';

export function MarketingAiPage({ lang, onBackToCatalog }: MarketingAiPageProps) {
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [toast, setToast] = useState<string | null>(null);

  // Trigger brief Toast messages
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Translation dictionaries inside the studio
  const s = useMemo(() => {
    return {
      RU: {
        title: "AI Маркетинг & Таргет Студия",
        subtitle: "Интеллектуальная экосистема продвижения для AutoHub Kyrgyzstan",
        back: "Назад в Каталог",
        dashboard: "Аналитика & KPI",
        ad_generator: "Генератор рекламы",
        target_audience: "Целевая аудитория",
        campaign_planner: "Планировщик кампаний",
        customer_insights: "Инсайты клиентов",
        promotion_center: "Центр Промо-акций",
        content_studio: "Студия контента",
        competitor_analysis: "Анализ конкурентов",
        generating: "AI анализирует и генерирует...",
        generate_btn: "Сгенерировать решение",
        reset: "Сбросить",
        copy: "Скопировать",
        copied: "Скопировано в буфер!",
        score: "Маркетинговый Скоринг",
        active_campaigns: "Активные Кампании",
        total_roi: "Средний ROI",
        conv_rate: "Конверсия продаж",
        best_platform: "Лучшая Платформа",
        growth: "Прирост клиентов"
      },
      KG: {
        title: "AI Маркетинг & Таргет Студиясы",
        subtitle: "AutoHub Kyrgyzstan үчүн интеллектуалдык илгерилетүү экосистемасы",
        back: "Каталогго кайтуу",
        dashboard: "Аналитика жана KPI",
        ad_generator: "Реклама генератору",
        target_audience: "Максаттуу аудитория",
        campaign_planner: "Кампания пландоочу",
        customer_insights: "Кардарлардын инсайттары",
        promotion_center: "Промо-акция борбору",
        content_studio: "Контент студиясы",
        competitor_analysis: "Атаандаштарды талдоо",
        generating: "AI талдап жана генерациялоодо...",
        generate_btn: "Чечимди генерациялоо",
        reset: "Калыбына келтирүү",
        copy: "Көчүрүү",
        copied: "Көчүрүлдү!",
        score: "Маркетингдик Скоринг",
        active_campaigns: "Активдүү Кампаниялар",
        total_roi: "Орточо ROI",
        conv_rate: "Сатуу конверсиясы",
        best_platform: "Эң мыкты платформа",
        growth: "Кардарлардын өсүшү"
      },
      EN: {
        title: "AI Marketing & Target Studio",
        subtitle: "Intelligent promotion ecosystem for AutoHub Kyrgyzstan",
        back: "Back to Catalog",
        dashboard: "Analytics & KPI",
        ad_generator: "Ad Generator",
        target_audience: "Target Audience",
        campaign_planner: "Campaign Planner",
        customer_insights: "Customer Insights",
        promotion_center: "Promotion Center",
        content_studio: "Content Studio",
        competitor_analysis: "Competitor Analysis",
        generating: "AI analyzing & generating...",
        generate_btn: "Generate AI Solution",
        reset: "Reset",
        copy: "Copy Content",
        copied: "Copied to clipboard!",
        score: "Marketing Score",
        active_campaigns: "Active Campaigns",
        total_roi: "Average ROI",
        conv_rate: "Sales Conversion",
        best_platform: "Best Platform",
        growth: "Customer Growth"
      }
    }[lang];
  }, [lang]);

  // Demo state variables for saved contents
  const [savedAds, setSavedAds] = useState<any[]>(() => {
    const saved = localStorage.getItem('autohub_saved_ads');
    return saved ? JSON.parse(saved) : [
      { id: '1', vehicle: 'Lexus LX 600', platform: 'Instagram', tone: 'Luxury', text: '⭐ НОВЫЙ СТАНДАРТ РОСКОШИ В БИШКЕКЕ! \n\nВстречайте флагманский внедорожник Lexus LX 600 в AutoHub Kyrgyzstan. Безупречное сочетание мощности V6 Twin-Turbo, премиальной кожи Nappa и легендарной надежности.\n\n🔥 Специальные условия рассрочки до конца месяца!\n📍 Bishkek, Kyrgyzstan\n\n👉 Напишите нам в Direct для записи на эксклюзивный тест-драйв!' }
    ];
  });

  const [savedCampaigns, setSavedCampaigns] = useState<any[]>(() => {
    const saved = localStorage.getItem('autohub_saved_campaigns');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Летний Драйв Hyundai', objective: 'Тест-драйвы', budget: 1500, reach: 45000, conv: 3.8, status: 'Активна' },
      { id: '2', name: 'Премиум Импорт Lexus', objective: 'Продажи / Лиды', budget: 3200, reach: 98000, conv: 5.1, status: 'Активна' }
    ];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('autohub_saved_ads', JSON.stringify(savedAds));
  }, [savedAds]);

  useEffect(() => {
    localStorage.setItem('autohub_saved_campaigns', JSON.stringify(savedCampaigns));
  }, [savedCampaigns]);

  // MODULE 1: AI AD GENERATOR STATE
  const [adVehicle, setAdVehicle] = useState('Lexus LX 600');
  const [adPromotion, setAdPromotion] = useState('Скидка 5% / 5% Discount');
  const [adCountry, setAdCountry] = useState('Кыргызстан (KG)');
  const [adLanguage, setAdLanguage] = useState(lang === 'KG' ? 'KG' : lang === 'RU' ? 'RU' : 'EN');
  const [adTone, setAdTone] = useState('Luxury');
  const [adPlatform, setAdPlatform] = useState('Instagram');
  const [generatedAd, setGeneratedAd] = useState<any | null>(null);
  const [generatingAd, setGeneratingAd] = useState(false);

  // MODULE 2: AI TARGET AUDIENCE STATE
  const [targetVehicle, setTargetVehicle] = useState('Toyota Land Cruiser 300');
  const [targetBudget, setTargetBudget] = useState('Premium ($80k+)');
  const [generatedAudience, setGeneratedAudience] = useState<any | null>(null);
  const [generatingAudience, setGeneratingAudience] = useState(false);

  // MODULE 3: AI CAMPAIGN PLANNER STATE
  const [campName, setCampName] = useState('Bishkek Electric Spark');
  const [campObjective, setCampObjective] = useState('Lead Generation');
  const [campBudget, setCampBudget] = useState('2000');
  const [campVehicle, setCampVehicle] = useState('Zeekr 001');
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  // MODULE 5: AI PROMOTION CENTER STATE
  const [promoType, setPromoType] = useState('Holiday Campaign');
  const [promoVehicle, setPromoVehicle] = useState('Kia Sportage');
  const [generatedPromo, setGeneratedPromo] = useState<any | null>(null);
  const [generatingPromo, setGeneratingPromo] = useState(false);

  // MODULE 6: AI CONTENT STUDIO STATE
  const [contentType, setContentType] = useState('Instagram Post');
  const [contentKeyword, setContentKeyword] = useState('Электромобили в Бишкеке / Electromobility');
  const [generatedContent, setGeneratedContent] = useState<any | null>(null);
  const [generatingContent, setGeneratingContent] = useState(false);

  // Beautiful Dark Demo Analytics Data
  const analyticsData = {
    dailySales: [
      { name: 'Mon', sales: 4, revenue: 145000 },
      { name: 'Tue', sales: 6, revenue: 210000 },
      { name: 'Wed', sales: 5, revenue: 195000 },
      { name: 'Thu', sales: 8, revenue: 310000 },
      { name: 'Fri', sales: 11, revenue: 490000 },
      { name: 'Sat', sales: 9, revenue: 360000 },
      { name: 'Sun', sales: 7, revenue: 275000 }
    ],
    weeklySales: [
      { name: 'Week 1', sales: 12, revenue: 520000 },
      { name: 'Week 2', sales: 18, revenue: 780000 },
      { name: 'Week 3', sales: 15, revenue: 640000 },
      { name: 'Week 4', sales: 24, revenue: 1150000 }
    ],
    monthlySales: [
      { name: 'Jan', revenue: 1200000, campaigns: 31000 },
      { name: 'Feb', revenue: 1450000, campaigns: 42000 },
      { name: 'Mar', revenue: 1900000, campaigns: 55000 },
      { name: 'Apr', revenue: 2400000, campaigns: 68000 },
      { name: 'May', revenue: 3100000, campaigns: 92000 },
      { name: 'Jun', revenue: 4200000, campaigns: 115000 },
      { name: 'Jul', revenue: 5600000, campaigns: 145000 }
    ],
    bestBrands: [
      { name: 'Lexus', value: 38, color: '#0B3D91' },
      { name: 'Toyota', value: 27, color: '#1E40AF' },
      { name: 'BMW', value: 18, color: '#3B82F6' },
      { name: 'Hyundai', value: 11, color: '#60A5FA' },
      { name: 'BYD / Zeekr', value: 6, color: '#93C5FD' }
    ],
    campaignPerformance: [
      { name: 'Premium Import', reach: 98000, ROI: 4.8, cpl: 12 },
      { name: 'VIP Lexus Club', reach: 64000, ROI: 5.6, cpl: 18 },
      { name: 'Summer Hyundai', reach: 45000, ROI: 3.2, cpl: 8 },
      { name: 'EV Revolution', reach: 110000, ROI: 6.1, cpl: 6 },
      { name: 'Osh Region Promo', reach: 35000, ROI: 2.9, cpl: 14 }
    ],
    competitorData: [
      { subject: 'Brand Awareness', AutoHub: 94, Comp1: 72, Comp2: 60 },
      { subject: 'Lead Quality', AutoHub: 89, Comp1: 65, Comp2: 70 },
      { subject: 'Ad Spend Efficiency', AutoHub: 95, Comp1: 58, Comp2: 64 },
      { subject: 'AI Personalization', AutoHub: 98, Comp1: 20, Comp2: 15 },
      { subject: 'Social Engagement', AutoHub: 91, Comp1: 68, Comp2: 55 },
      { subject: 'Sales Conversion', AutoHub: 88, Comp1: 71, Comp2: 62 }
    ]
  };

  // AI DEMO GENERATORS (Rule-Based Dynamic Intelligence Engine)
  const generateAdText = () => {
    setGeneratingAd(true);
    setTimeout(() => {
      let title = "";
      let hook = "";
      let mainText = "";
      let cta = "";
      let audSuggest = "";

      if (adTone === 'Luxury') {
        title = `👑 ЭКСКЛЮЗИВНОЕ ПРЕДЛОЖЕНИЕ ДЛЯ ИСТИННЫХ ЦЕНИТЕЛЕЙ: ${adVehicle.toUpperCase()}!`;
        hook = "Почувствуйте ультимативный комфорт и премиальное доминирование на дорогах Бишкека.";
        mainText = `В рамках программы "${adPromotion}" AutoHub Kyrgyzstan предлагает особые условия импорта и индивидуального обслуживания.\n\n• Двигатель нового поколения\n• Усовершенствованная система полного привода\n• Интерьер ручной работы`;
        cta = "📩 Напишите нам в ЛС прямо сейчас, чтобы получить закрытый VIP-прайс и забронировать индивидуальную презентацию.";
        audSuggest = "Предприниматели, Топ-менеджеры, Возраст 35-60 лет, интересы: Роскошь, Бизнес, Инвестиции.";
      } else if (adTone === 'Premium') {
        title = `⚡ ПРЕВОСХОДСТВО В КАЖДОЙ ДЕТАЛИ: ${adVehicle}!`;
        hook = "Объединение передовых технологий, невероятной динамики и изысканного стиля.";
        mainText = `Спецпредложение года: "${adPromotion}". Получите профессиональную консультацию, таможенное оформление «под ключ» в Кыргызстане и гарантированную юридическую чистоту от лучшего автопортала.`;
        cta = "📞 Звоните по номеру +996 (555) 10-20-30 или жмите «Узнать больше» для моментального расчета стоимости.";
        audSuggest = "Профессионалы, Автолюбители, Возраст 28-50 лет, интересы: Новые авто, Технологии, Комфорт.";
      } else if (adTone === 'Business') {
        title = `📈 НАДЕЖНЫЙ АКТИВ ДЛЯ ВАШЕГО БИЗНЕСА: ${adVehicle}`;
        hook = "Оптимизируйте представительские расходы с максимальной выгодой.";
        mainText = `AutoHub представляет ${adVehicle}. Специальное предложение "${adPromotion}" позволяет совершить покупку на исключительно гибких финансовых условиях. Полный пакет НДС, таможня, быстрая доставка.`;
        cta = "💼 Оставьте заявку на корпоративный лизинг и получите расчет платежей за 15 минут.";
        audSuggest = "Владельцы бизнеса, Финансовые директора, интересы: Коммерческий транспорт, Лизинг, Оптимизация налогов.";
      } else {
        title = `🎉 ВАШ НОВЫЙ СЕМЕЙНЫЙ ДРУГ: ${adVehicle}!`;
        hook = "Надежные поездки всей семьей по красивейшим уголкам Кыргызстана!";
        mainText = `Ищете практичный и современный кроссовер? Акция "${adPromotion}" действует на весь модельный ряд! Просторный багажник, высокий клиренс и ультрасовременная система безопасности.`;
        cta = "🚗 Приезжайте на тест-драйв всей семьей и получите приятный бонус при покупке!";
        audSuggest = "Семьи, Любители путешествий, Возраст 25-45 лет, интересы: Активный отдых, Безопасность детей.";
      }

      // Convert based on selected platform features
      if (adPlatform === 'TikTok') {
        title = `🔥 ТРЕНД 2026: Почему все говорят о ${adVehicle}? 👇`;
        hook = "[0:00-0:05] Динамичный кадр проезда авто по дорогам Бишкека. Текст на экране: «Такого ты точно не ожидал!»";
        mainText = `[0:05-0:20] Крупный план дисков, салона и панорамной крыши. Голос за кадром: «Шок! ${adVehicle} теперь доступен в AutoHub по акции: ${adPromotion}!»`;
        cta = "👉 Кликай по ссылке в шапке профиля, пока цены не улетели!";
      } else if (adPlatform === 'Telegram') {
        title = `📣 **Официальный импорт: ${adVehicle}**`;
        mainText = `Уважаемые подписчики, в AutoHub Kyrgyzstan поступила новая партия авто.\n\n🏷 **Акция**: ${adPromotion}\n🇰🇬 **Регион**: ${adCountry}\n\nПреимущества покупки у нас:\n- Полное сопровождение на таможне\n- Доставка от 7 дней\n- Проверенный пробег и состояние.`;
        cta = "🔗 Связаться с менеджером: @autohub_kg_bot";
      }

      // Handle translation
      if (adLanguage === 'KG') {
        title = "🇰🇬 " + title.replace("ПРЕДЛОЖЕНИЕ", "СУНУШУ").replace("НОВЫЙ", "ЖАҢЫ");
        mainText = mainText.replace("акция", "акциясы").replace("Кыргызстан", "Кыргызстанда");
        cta = "📩 Бөлүмгө жазыңыз же байланыш номерине чалыңыз!";
      } else if (adLanguage === 'EN') {
        title = `✨ EXCLUSIVE AI OFFER: THE ALL-NEW ${adVehicle}!`;
        mainText = `Get the best deal with "${adPromotion}" from AutoHub Kyrgyzstan. Custom configurations, fast import, full documentation support.`;
        cta = "👉 Click Learn More or DM us to unlock your private discount!";
      }

      setGeneratedAd({
        platform: adPlatform,
        vehicle: adVehicle,
        tone: adTone,
        language: adLanguage,
        headline: title,
        body: `${hook}\n\n${mainText}`,
        cta: cta,
        audience: audSuggest,
        budget: adPlatform === 'Google Ads' ? '$15/day (Search campaigns)' : '$8/day (Social campaigns)'
      });
      setGeneratingAd(false);
      triggerToast(lang === 'RU' ? 'Реклама успешно сгенерирована!' : 'Жарнак ийгиликтүү түзүлдү!');
    }, 1500);
  };

  const generateAudienceSuggest = () => {
    setGeneratingAudience(true);
    setTimeout(() => {
      let age = "28-45";
      let gender = lang === 'RU' ? "Мужчины (65%), Женщины (35%)" : "Эркектер (65%), Аялдар (35%)";
      let interests = ["Кроссоверы", "Путешествия", "Безопасность", "Семейные поездки", "Каталог авто"];
      let location = "Бишкек, Ош, Джалал-Абад";
      let budgetSuggest = "$3,000 - $6,000 / месяц";
      let recs = "Рекомендуется запускать рекламу в Instagram Stories и Facebook Feed с акцентом на надежность и систему трейд-ин.";

      if (targetVehicle.includes('Lexus') || targetVehicle.includes('BMW') || targetBudget.includes('Premium')) {
        age = "33-55";
        gender = lang === 'RU' ? "Мужчины (75%), Женщины (25%)" : "Эркектер (75%), Аялдар (25%)";
        interests = ["Премиум бренды", "Бизнес класс", "Инвестиции", "VIP Логистика", "Дорогие часы", "Гольф"];
        location = "Бишкек (центр), Ош, Чолпон-Ата";
        budgetSuggest = "$12,000 - $25,000 / месяц";
        recs = "Ориентируйтесь на платежеспособную аудиторию. В креативах используйте глубокие синие или черные тона, делайте упор на статусность, эксклюзивные комплектации и персонального менеджера.";
      } else if (targetVehicle.includes('Zeekr') || targetVehicle.includes('BYD')) {
        age = "24-40";
        gender = "Мужчины (50%), Женщины (50%)";
        interests = ["Электрокары", "Инновации", "Гаджеты", "Экология", "Зарядные станции в Бишкеке", "Криптовалюта"];
        location = "Бишкек, Чуйская область";
        budgetSuggest = "$4,000 - $8,000 / месяц";
        recs = "Для продвижения электромобилей лучше всего подходит TikTok Ads с динамичной распаковкой и тест-драйвом функций автопилота.";
      }

      setGeneratedAudience({
        vehicle: targetVehicle,
        age,
        gender,
        interests,
        location,
        budget: budgetSuggest,
        recommendation: recs
      });
      setGeneratingAudience(false);
      triggerToast(lang === 'RU' ? 'Аудитория рассчитана!' : 'Аудитория эсептелди!');
    }, 1200);
  };

  const generateCampaignPlan = () => {
    setGeneratingPlan(true);
    setTimeout(() => {
      const budgetNum = parseFloat(campBudget) || 1000;
      const reach = Math.round(budgetNum * 32);
      const conv = campObjective === 'Lead Generation' ? 4.2 : 5.8;
      const duration = budgetNum > 3000 ? "30 дней" : "14 дней";

      setGeneratedPlan({
        name: campName,
        vehicle: campVehicle,
        objective: campObjective,
        budget: `$${budgetNum}`,
        reach: reach.toLocaleString(),
        conversions: Math.round(reach * (conv / 100)),
        duration,
        strategy: `Запустить кросс-платформенную воронку: 1) Вирусный охватный ролик в TikTok. 2) Ретаргетинг в Instagram на всех, кто досмотрел до середины. 3) Конверсионный лид-форма для моментальной записи на тест-драйв в Бишкеке.`
      });
      setGeneratingPlan(false);
      triggerToast(lang === 'RU' ? 'Медиаплан сформирован!' : 'Медиаплан түзүлдү!');
    }, 1500);
  };

  const generatePromoCampaign = () => {
    setGeneratingPromo(true);
    setTimeout(() => {
      let title = "🔥 ГОРЯЧЕЕ ПРЕДЛОЖЕНИЕ: Выгода до $2,500!";
      let desc = "Только на этой неделе, при бронировании авто из Кореи, мы дарим бесплатное годовое сервисное обслуживание и полис КАСКО!";
      let promoCode = "AUTOHUB_VIP_2026";
      let condition = "Применяется при первоначальном взносе от 20% на любой внедорожник.";

      if (promoType === 'VIP promotions') {
        title = "💎 ЗАКРЫТЫЙ VIP CLUB AUTOHUB";
        desc = "Персональный статус, приоритетная доставка электрокаров класса Люкс, сниженная комиссия байера и бесплатный эвакуатор 24/7 по всему Кыргызстану.";
        promoCode = "AUTOHUB_PRESTIGE";
        condition = "Доступно клиентам при покупке автомобилей стоимостью от $90,000.";
      } else if (promoType === 'Holiday campaigns') {
        title = "❄️ НОВОГОДНЕЕ ЧУДО ОТ AUTOHUB!";
        desc = "Скидки на все зимние комплектации, комплект премиальной зимней резины Michelin в подарок и бесплатная доставка до дверей вашего дома!";
        promoCode = "NEWYEAR_2027";
        condition = "Срок действия акции ограничен с 15 декабря по 15 января.";
      }

      setGeneratedPromo({
        type: promoType,
        vehicle: promoVehicle,
        title,
        description: desc,
        code: promoCode,
        condition
      });
      setGeneratingPromo(false);
      triggerToast(lang === 'RU' ? 'Промо-акция создана!' : 'Промо-акция түзүлдү!');
    }, 1200);
  };

  const generateContentStudioText = () => {
    setGeneratingContent(true);
    setTimeout(() => {
      let result = "";
      let seoTitle = "";
      let seoDesc = "";

      if (contentType === 'Instagram Post') {
        result = `📸 НОВЫЙ ТРЕНД В КЫРГЫЗСТАНЕ!\n\nТема: ${contentKeyword}\n\nЭкологично, невероятно тихо и безумно быстро! Сегодня мы подробно разбираем, почему пересаживаться на новые технологии выгоднее именно сейчас.\n\n✔️ Запас хода до 620 км\n✔️ Нулевой налог в КР\n✔️ Дешевая зарядка по ночному тарифу!\n\n💬 Пишите свои мысли в комментариях!\n\n#AutoHub #Kyrgyzstan #Bishkek #ElectroCar #Zeekr`;
        seoTitle = "Купить электромобили в Бишкеке | Цены, Доставка | AutoHub";
        seoDesc = "Широкий выбор современных электромобилей в Кыргызстане. Выгодные условия лизинга, рассрочки и страхования.";
      } else if (contentType === 'TikTok scripts') {
        result = `🎥 ТИКТОК СЦЕНАРИЙ (30 секунд)\n\n[0:00 - 0:03] Спикер эффектно закрывает дверь авто. Текст: «Забудь про бензин навсегда!»\n[0:03 - 0:15] Нарезка умной приборной панели, автопарковки и разгона. Голос: «В Бишкеке электромобили взрывают рынок! Расходы на 100 км — всего 50 сомов!»\n[0:15 - 0:30] Спикер улыбается у логотипа AutoHub. Голос: «Жми кнопку внизу, и мы привезем твою мечту!»`;
        seoTitle = "Трендовые видео об автомобилях Кыргызстана | AutoHub";
        seoDesc = "Смотрите вирусные обзоры, тест-драйвы и честные отзывы владельцев авто.";
      } else {
        result = `📝 СТАТЬЯ ДЛЯ БЛОГА\n\nЗаголовок: Будущее уже тут: Особенности эксплуатации в Кыргызстане\n\nИнфраструктура зарядных станций развивается с огромной скоростью не только в Бишкеке, но и на трассе вокруг Иссык-Куля. В этой статье эксперты AutoHub подробно рассказывают о плюсах и минусах покупки современных авто в 2026 году, таможенных пошлинах и секретах сохранения емкости батареи зимой...`;
        seoTitle = "Блог об автомобилях в Кыргызстане - AutoHub";
        seoDesc = "Полезные статьи, гайды по выбору автомобилей, таможне и обслуживанию в КР.";
      }

      setGeneratedContent({
        type: contentType,
        text: result,
        seoTitle,
        seoDesc
      });
      setGeneratingContent(false);
      triggerToast(lang === 'RU' ? 'Контент подготовлен!' : 'Контент даярдалды!');
    }, 1300);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(s.copied);
  };

  const handleSaveAd = () => {
    if (!generatedAd) return;
    const newAd = {
      id: Date.now().toString(),
      vehicle: generatedAd.vehicle,
      platform: generatedAd.platform,
      tone: generatedAd.tone,
      text: `${generatedAd.headline}\n\n${generatedAd.body}\n\n${generatedAd.cta}`
    };
    setSavedAds([newAd, ...savedAds]);
    triggerToast(lang === 'RU' ? 'Объявление сохранено!' : 'Жарнак сакталды!');
  };

  const handleSaveCampaign = () => {
    if (!generatedPlan) return;
    const newCamp = {
      id: Date.now().toString(),
      name: generatedPlan.name,
      objective: generatedPlan.objective,
      budget: parseFloat(generatedPlan.budget.replace('$', '')) || 1000,
      reach: parseInt(generatedPlan.reach.replace(/,/g, '')) || 50000,
      conv: 4.5,
      status: 'Активна'
    };
    setSavedCampaigns([newCamp, ...savedCampaigns]);
    triggerToast(lang === 'RU' ? 'Кампания добавлена в список!' : 'Кампания тизмеге кошулду!');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 font-sans antialiased selection:bg-[#0B3D91] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] bg-gradient-to-r from-[#0B3D91] to-blue-600 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(11,61,145,0.4)] flex items-center space-x-2 border border-blue-400/20"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Brand Banner */}
      <header className="border-b border-white/[0.06] bg-[#070913]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBackToCatalog}
              className="flex items-center space-x-2 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all duration-200 border border-white/[0.05]"
              id="marketing-back-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{s.back}</span>
            </button>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <h1 className="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400 tracking-tight font-display">
                AutoHub Marketing AI
              </h1>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            {lang === 'RU' ? 'Режим Демо' : lang === 'KG' ? 'Демо Режими' : 'Demo Mode'}
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title and Intro */}
        <div className="mb-8 text-center sm:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display"
          >
            {s.title}
          </motion.h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            {s.subtitle}
          </p>
        </div>

        {/* Tab Selection Row (Horizontal Scroll on Mobile) */}
        <div className="flex space-x-1.5 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-white/10 border-b border-white/[0.04]">
          {[
            { id: 'dashboard', label: s.dashboard, icon: LucideLineChart },
            { id: 'ad_generator', label: s.ad_generator, icon: Megaphone },
            { id: 'target_audience', label: s.target_audience, icon: Target },
            { id: 'campaign_planner', label: s.campaign_planner, icon: Calendar },
            { id: 'customer_insights', label: s.customer_insights, icon: Users },
            { id: 'promotion_center', label: s.promotion_center, icon: Percent },
            { id: 'content_studio', label: s.content_studio, icon: Sparkles },
            { id: 'competitor_analysis', label: s.competitor_analysis, icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as MainTab)}
                className={`flex items-center space-x-2 text-xs font-semibold py-2.5 px-4 rounded-xl whitespace-nowrap transition-all duration-200 shrink-0 ${
                  active 
                    ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]' 
                    : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTENT PANELS */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* TAB 1: ANALYTICS & KPI DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Premium Dark Glass KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  { title: s.score, value: "96 / 100", change: "+4%", icon: Sparkles, color: "text-amber-400" },
                  { title: s.active_campaigns, value: `${savedCampaigns.length} Active`, change: "+1", icon: Megaphone, color: "text-blue-400" },
                  { title: s.total_roi, value: "4.8x ROI", change: "+12%", icon: TrendingUp, color: "text-green-400" },
                  { title: s.conv_rate, value: "5.1%", change: "+0.8%", icon: Activity, color: "text-cyan-400" },
                  { title: s.best_platform, value: "TikTok Ads", change: "Best CPA", icon: Smartphone, color: "text-pink-400" },
                  { title: s.growth, value: "+342", change: "This Month", icon: Users, color: "text-purple-400" }
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 flex flex-col justify-between backdrop-blur-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase truncate">{kpi.title}</span>
                        <Icon className={`w-4 h-4 ${kpi.color}`} />
                      </div>
                      <div>
                        <div className="text-lg font-black text-white">{kpi.value}</div>
                        <div className="text-[10px] text-green-400 font-bold mt-1 flex items-center">
                          <ArrowUpRight className="w-3 h-3 mr-0.5" />
                          <span>{kpi.change}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Chart 1: Revenue & Marketing Ad Spend */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        {lang === 'RU' ? 'Эффективность инвестиций' : 'Инвестициялардын натыйжалуулугу'}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-1">Отношение рекламного бюджета к выручке салона (2026)</p>
                    </div>
                    <LucideLineChart className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData.monthlySales}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0B3D91" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#0B3D91" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.03} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={10} />
                        <YAxis stroke="#888888" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#070913', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#0B3D91" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
                        <Area type="monotone" dataKey="campaigns" stroke="#3B82F6" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSpend)" name="Ad Budget ($)" />
                        <Legend wrapperStyle={{ fontSize: 10, pt: 10 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Campaign Reach vs ROI */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        {lang === 'RU' ? 'Сравнение Кампаний' : 'Кампанияларды салыштыруу'}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-1">Охват аудитории против эффективности возврата (ROI)</p>
                    </div>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData.campaignPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.03} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={10} />
                        <YAxis stroke="#888888" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#070913', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                        <Bar dataKey="ROI" fill="#0B3D91" radius={[4, 4, 0, 0]} name="ROI Multiplier (x)">
                          {analyticsData.campaignPerformance.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={idx === 3 ? '#3B82F6' : '#0B3D91'} />
                          ))}
                        </Bar>
                        <Legend wrapperStyle={{ fontSize: 10, pt: 10 }} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Row 3: Pie Chart and Saved Active Ads */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Chart 3: Best Selling Brands Share */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                    {lang === 'RU' ? 'Доля Продаж Брендов' : 'Бренддердин сатуу үлүшү'}
                  </h3>
                  <div className="h-56 flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.bestBrands}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {analyticsData.bestBrands.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#070913', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xs text-gray-400 uppercase tracking-widest">{lang === 'RU' ? 'Лидер' : 'Лидер'}</span>
                      <span className="text-lg font-black text-white">Lexus (38%)</span>
                    </div>
                  </div>
                  {/* Legend indicator list */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
                    {analyticsData.bestBrands.map((b, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: b.color }} />
                        <span className="text-gray-400 truncate">{b.name} ({b.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaign Dashboard Controls & List */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {lang === 'RU' ? 'Менеджер Рекламных Бюджетов' : 'Жарнак бюджеттерин башкаруу'}
                    </h3>
                    <button 
                      onClick={() => setActiveTab('campaign_planner')}
                      className="text-xs text-blue-400 hover:text-white flex items-center space-x-1.5 font-bold transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'RU' ? 'Создать Кампанию' : 'Кампания түзүү'}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-400 pb-2">
                          <th className="py-2.5 font-semibold">Кампания</th>
                          <th className="py-2.5 font-semibold">Цель</th>
                          <th className="py-2.5 font-semibold">Бюджет</th>
                          <th className="py-2.5 font-semibold">Охват</th>
                          <th className="py-2.5 font-semibold">Статус</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {savedCampaigns.map((camp) => (
                          <tr key={camp.id} className="text-gray-300">
                            <td className="py-3 font-bold text-white">{camp.name}</td>
                            <td className="py-3 text-gray-400">{camp.objective}</td>
                            <td className="py-3 text-blue-400 font-bold">${camp.budget}</td>
                            <td className="py-3">{camp.reach.toLocaleString()}</td>
                            <td className="py-3">
                              <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                {camp.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: AI ADVERTISEMENT GENERATOR */}
          {activeTab === 'ad_generator' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Form inputs panel */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Генератор рекламы (AI)</h3>
                  <p className="text-xs text-gray-400">Настройте параметры модели для моментального написания премиальных офферов</p>
                </div>

                <div className="space-y-4">
                  {/* Vehicle selection */}
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Автомобиль / Vehicle</label>
                    <select 
                      value={adVehicle}
                      onChange={(e) => setAdVehicle(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Lexus LX 600">Lexus LX 600</option>
                      <option value="Toyota Land Cruiser 300">Toyota Land Cruiser 300</option>
                      <option value="BMW X5 M">BMW X5 M</option>
                      <option value="Hyundai Santa Fe">Hyundai Santa Fe</option>
                      <option value="Zeekr 001">Zeekr 001</option>
                      <option value="Kia Sportage">Kia Sportage</option>
                    </select>
                  </div>

                  {/* Promotion choice */}
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Оффер / Promotion</label>
                    <select 
                      value={adPromotion}
                      onChange={(e) => setAdPromotion(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Скидка 5% / 5% Discount">Скидка 5% / 5% Discount</option>
                      <option value="Бесплатное КАСКО и ТО">Бесплатное КАСКО и ТО</option>
                      <option value="Выгода до $3,000">Выгода до $3,000</option>
                      <option value="Рассрочка 0% / 0% Installment">Рассрочка 0% / 0% Installment</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Язык рекламы / Language</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['KG', 'RU', 'EN'].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setAdLanguage(l)}
                          className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                            adLanguage === l 
                              ? 'bg-blue-600/20 border-blue-500 text-white' 
                              : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tone of Voice */}
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Тон общения / Tone</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Luxury', 'Premium', 'Business', 'Friendly'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setAdTone(t)}
                          className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                            adTone === t 
                              ? 'bg-blue-600/20 border-blue-500 text-white' 
                              : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ad Platform target */}
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Платформа рекламы / Platform</label>
                    <select 
                      value={adPlatform}
                      onChange={(e) => setAdPlatform(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Instagram">Instagram (Stories & Feed)</option>
                      <option value="Facebook">Facebook Feed Ads</option>
                      <option value="TikTok">TikTok Smart Promo script</option>
                      <option value="Telegram">Telegram Channel Ads</option>
                      <option value="WhatsApp">WhatsApp broadcast message</option>
                      <option value="Google Ads">Google Ads Search (Responsive)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generateAdText}
                  disabled={generatingAd}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {generatingAd ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{s.generating}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{s.generate_btn}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Dynamic generated output preview */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">
                        {adPlatform} {lang === 'RU' ? 'Превью' : 'Превью'}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">AutoHub AI Engine v4.2</span>
                    </div>

                    {generatedAd ? (
                      <div className="space-y-4 text-xs">
                        <div>
                          <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Заголовок / Headline:</span>
                          <p className="text-sm font-extrabold text-white bg-white/[0.03] p-3 rounded-xl border border-white/10">{generatedAd.headline}</p>
                        </div>

                        <div>
                          <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Текст поста / Ad Copy:</span>
                          <pre className="whitespace-pre-wrap font-sans text-gray-300 bg-white/[0.03] p-4 rounded-xl border border-white/10 leading-relaxed">
                            {generatedAd.body}
                          </pre>
                        </div>

                        <div>
                          <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Призыв к действию / CTA:</span>
                          <p className="text-gray-300 bg-blue-900/10 p-3 rounded-xl border border-blue-500/20 font-medium italic">{generatedAd.cta}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                          <div>
                            <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Таргетинг по интересам:</span>
                            <p className="text-gray-400 italic text-[11px]">{generatedAd.audience}</p>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Реком. бюджет:</span>
                            <p className="text-blue-400 font-bold text-[11px]">{generatedAd.budget}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
                        <Megaphone className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-xs">Нажмите «Сгенерировать решение», чтобы запустить искусственный интеллект для автомобиля {adVehicle}.</p>
                      </div>
                    )}
                  </div>

                  {generatedAd && (
                    <div className="flex items-center space-x-3 pt-6 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`${generatedAd.headline}\n\n${generatedAd.body}\n\n${generatedAd.cta}`)}
                        className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all border border-white/10"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{s.copy}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveAd}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'RU' ? 'Сохранить Оффер' : 'Сактоо'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Saved list preview */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Сохраненные креативы ({savedAds.length})</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {savedAds.map((ad: any) => (
                      <div key={ad.id} className="bg-white/[0.03] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                        <div className="truncate pr-4">
                          <span className="font-bold text-white block">{ad.vehicle} ({ad.platform})</span>
                          <span className="text-[10px] text-gray-400 block truncate">{ad.text}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 shrink-0">
                          <button 
                            type="button"
                            onClick={() => copyToClipboard(ad.text)} 
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => {
                              setSavedAds(savedAds.filter(item => item.id !== ad.id));
                              triggerToast(lang === 'RU' ? 'Удалено!' : 'Өчүрүлдү!');
                            }} 
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: AI TARGET AUDIENCE RECOMMENDATIONS */}
          {activeTab === 'target_audience' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Настройка целевой аудитории</h3>
                  <p className="text-xs text-gray-400">Выберите модель автомобиля для автоматического AI-профилирования покупателей в КР</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Автомобиль</label>
                    <select 
                      value={targetVehicle}
                      onChange={(e) => setTargetVehicle(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Toyota Land Cruiser 300">Toyota Land Cruiser 300</option>
                      <option value="Lexus LX 600">Lexus LX 600</option>
                      <option value="Zeekr 001 / FR">Zeekr 001</option>
                      <option value="BMW X5 M">BMW X5 M</option>
                      <option value="Hyundai Tucson">Hyundai Tucson</option>
                      <option value="Chevrolet Cobalt">Chevrolet Cobalt</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Ценовой Сегмент покупателя</label>
                    <select 
                      value={targetBudget}
                      onChange={(e) => setAdPromotion(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Premium ($80k+)">Премиум ($80k+)</option>
                      <option value="Medium ($30k - $80k)">Средний ($30k - $80k)</option>
                      <option value="Budget (under $30k)">Бюджетный (до $30k)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generateAudienceSuggest}
                  disabled={generatingAudience}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {generatingAudience ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{s.generating}</span>
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 text-red-400" />
                      <span>Рассчитать аудиторию</span>
                    </>
                  )}
                </button>
              </div>

              {/* Target audience recommendations report view */}
              <div className="lg:col-span-7">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-white/10 flex items-center justify-between">
                      <span>Рекомендации по таргетингу</span>
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-md">Live AI</span>
                    </h4>

                    {generatedAudience ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300">
                        <div className="space-y-4">
                          <div>
                            <span className="text-gray-400 block font-bold text-[10px] uppercase">Рекомендуемый возраст:</span>
                            <span className="text-lg font-black text-white">{generatedAudience.age} лет</span>
                          </div>

                          <div>
                            <span className="text-gray-400 block font-bold text-[10px] uppercase">Распределение по полу:</span>
                            <span className="text-sm font-bold text-white">{generatedAudience.gender}</span>
                          </div>

                          <div>
                            <span className="text-gray-400 block font-bold text-[10px] uppercase">Географический таргетинг:</span>
                            <span className="text-sm font-bold text-white">{generatedAudience.location}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-gray-400 block font-bold text-[10px] uppercase">Интересы (Facebook/Instagram/TikTok):</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {generatedAudience.interests.map((interest: string, i: number) => (
                                <span key={i} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-400 block font-bold text-[10px] uppercase">Оценочный бюджет клиента:</span>
                            <span className="text-sm font-bold text-blue-400">{generatedAudience.budget}</span>
                          </div>
                        </div>

                        <div className="md:col-span-2 pt-4 border-t border-white/5 space-y-1.5">
                          <span className="text-gray-400 block font-bold text-[10px] uppercase">Стратегия запуска рекламы в Бишкеке:</span>
                          <p className="text-[11px] leading-relaxed text-gray-300 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                            {generatedAudience.recommendation}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
                        <Target className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-xs">Запустите AI профилирование целевого портрета.</p>
                      </div>
                    )}
                  </div>

                  {generatedAudience && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`Аудитория для: ${generatedAudience.vehicle}\nВозраст: ${generatedAudience.age}\nГео: ${generatedAudience.location}\nИнтересы: ${generatedAudience.interests.join(', ')}`)}
                      className="mt-6 w-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all border border-white/10"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Экспортировать портрет аудитории</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: AI CAMPAIGN PLANNER */}
          {activeTab === 'campaign_planner' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Планировщик Маркетинговых Кампаний</h3>
                  <p className="text-xs text-gray-400">Формирование комплексного медиаплана продвижения в КР</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Название кампании</label>
                    <input 
                      type="text" 
                      value={campName}
                      onChange={(e) => setCampName(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Целевой Автомобиль</label>
                    <select 
                      value={campVehicle}
                      onChange={(e) => setCampVehicle(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Zeekr 001">Zeekr 001</option>
                      <option value="Lexus LX 600">Lexus LX 600</option>
                      <option value="Hyundai Santa Fe">Hyundai Santa Fe</option>
                      <option value="Toyota Camry">Toyota Camry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Главная Цель Кампании</label>
                    <select 
                      value={campObjective}
                      onChange={(e) => setCampObjective(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Lead Generation">Сбор лидов / Запись на тест-драйв</option>
                      <option value="Brand Awareness">Охват & Узнаваемость бренда в Бишкеке</option>
                      <option value="Direct Sales">Прямые продажи по спецпредложению</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Выделенный Бюджет ($)</label>
                    <input 
                      type="number" 
                      value={campBudget}
                      onChange={(e) => setCampBudget(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generateCampaignPlan}
                  disabled={generatingPlan}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {generatingPlan ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{s.generating}</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span>Создать Медиаплан</span>
                    </>
                  )}
                </button>
              </div>

              {/* Plan output */}
              <div className="lg:col-span-7">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-white/10 flex items-center justify-between">
                      <span>Сводный медиаплан AutoHub AI</span>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">Медиаплан</span>
                    </h4>

                    {generatedPlan ? (
                      <div className="space-y-6 text-xs text-gray-300">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                            <span className="text-gray-400 block text-[9px] uppercase font-bold">Охват (Reach)</span>
                            <span className="text-base font-black text-white">{generatedPlan.reach}</span>
                          </div>
                          <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                            <span className="text-gray-400 block text-[9px] uppercase font-bold">Оценка Лидов</span>
                            <span className="text-base font-black text-green-400">~{generatedPlan.conversions}</span>
                          </div>
                          <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                            <span className="text-gray-400 block text-[9px] uppercase font-bold">Оптим. Срок</span>
                            <span className="text-base font-black text-white">{generatedPlan.duration}</span>
                          </div>
                          <div className="bg-white/[0.03] p-3 rounded-xl border border-white/5">
                            <span className="text-gray-400 block text-[9px] uppercase font-bold">Целевой Бюджет</span>
                            <span className="text-base font-black text-blue-400">{generatedPlan.budget}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-white font-bold text-xs uppercase block">Кампания: {generatedPlan.name}</span>
                          <span className="text-gray-400 block font-bold text-[10px] uppercase">Автомобиль: {generatedPlan.vehicle}</span>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-1.5">
                          <span className="text-gray-400 block font-bold text-[10px] uppercase">Рекомендуемая Воронка / Стратегия:</span>
                          <p className="text-[11px] leading-relaxed text-gray-300 bg-blue-900/10 p-4 rounded-xl border border-blue-500/10">
                            {generatedPlan.strategy}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
                        <Calendar className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-xs">Заполните поля слева для расчета бюджета и прогноза охватов.</p>
                      </div>
                    )}
                  </div>

                  {generatedPlan && (
                    <div className="flex space-x-3 pt-6 border-t border-white/10">
                      <button
                        type="button"
                        onClick={handleSaveCampaign}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Добавить в активные кампании</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: AI CUSTOMER INSIGHTS */}
          {activeTab === 'customer_insights' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Популярные Бренды (KG)", desc: "Самые просматриваемые марки авто за последний месяц.", items: ["Lexus LX / RX (42%)", "Toyota Land Cruiser (28%)", "Zeekr 001 (18%)", "Hyundai Santa Fe (12%)"] },
                  { title: "Ценовые Диапазоны", desc: "Где зафиксирована максимальная активность лидов в КР.", items: ["Премиум $70,000+ (45%)", "Средний $25,000-$50,000 (35%)", "Бюджетный до $25,000 (20%)"] },
                  { title: "Поведение Покупателей", desc: "Как пользователи взаимодействуют с консультантами.", items: ["Запрос обратного звонка (55%)", "Использование AI Советника (30%)", "Расчет растаможки в КР (15%)"] }
                ].map((insight, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md">
                    <h4 className="text-sm font-bold text-white mb-2">{insight.title}</h4>
                    <p className="text-[11px] text-gray-400 mb-4">{insight.desc}</p>
                    <ul className="space-y-2">
                      {insight.items.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2 text-xs text-gray-300 bg-white/[0.02] px-3 py-2 rounded-xl border border-white/5">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Dynamic Insights Analysis Text */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Анализ Сезонного Спроса в Кыргызстане (AI Аналитика)</h4>
                <p className="text-xs text-gray-300 leading-relaxed space-y-4">
                  📈 <strong>Летний сезон (Май - Сентябрь):</strong> Наблюдается резкий скачок поисковых запросов на полноприводные рамные внедорожники (Lexus LX/GX, Toyota Sequoia) для поездок на Иссык-Куль и горные перевалы. Электромобили демонстрируют стабильный охват благодаря отсутствию проблем с емкостью батарей в теплое время суток.
                  <br /><br />
                  ❄️ <strong>Зимний сезон (Октябрь - Февраль):</strong> Рост интереса к бюджетным седанам с передним приводом и кроссоверам корейского производства. Рекомендуется фокусировать маркетинг на рекламных кампаниях «Зимний пакет» (бесплатная премиальная резина, подогрев батарей электрокаров).
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 6: AI PROMOTION CENTER */}
          {activeTab === 'promotion_center' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Генератор Промо-акций</h3>
                  <p className="text-xs text-gray-400">Создавайте уникальные предложения для клиентов AutoHub за пару кликов</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Тип Акции</label>
                    <select 
                      value={promoType}
                      onChange={(e) => setPromoType(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Holiday campaigns">Новогодняя / Праздничная распродажа</option>
                      <option value="Limited-time campaigns">Срочное предложение (только 48 часов!)</option>
                      <option value="VIP promotions">VIP привилегии и закрытый клуб</option>
                      <option value="Discounts">Прямая скидка на бренд</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Автомобиль</label>
                    <select 
                      value={promoVehicle}
                      onChange={(e) => setPromoVehicle(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Kia Sportage">Kia Sportage</option>
                      <option value="BYD Song Plus EV">BYD Song Plus EV</option>
                      <option value="Lexus RX 350">Lexus RX 350</option>
                      <option value="Toyota Land Cruiser Prado">Toyota Land Cruiser Prado</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generatePromoCampaign}
                  disabled={generatingPromo}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {generatingPromo ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{s.generating}</span>
                    </>
                  ) : (
                    <>
                      <Percent className="w-4 h-4 text-yellow-400" />
                      <span>Создать промо-оффер</span>
                    </>
                  )}
                </button>
              </div>

              {/* Promo outputs view */}
              <div className="lg:col-span-7">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-white/10 flex items-center justify-between">
                      <span>Сгенерированное спецпредложение</span>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-md">PROMO AI</span>
                    </h4>

                    {generatedPromo ? (
                      <div className="space-y-4 text-xs text-gray-300">
                        <div>
                          <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Заголовок промо-акции:</span>
                          <p className="text-sm font-extrabold text-white bg-white/[0.03] p-3 rounded-xl border border-white/10">{generatedPromo.title}</p>
                        </div>

                        <div>
                          <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Условия и описание:</span>
                          <p className="text-gray-300 bg-white/[0.03] p-4 rounded-xl border border-white/10 leading-relaxed">
                            {generatedPromo.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Уникальный промокод:</span>
                            <p className="text-sm font-mono font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg text-center uppercase tracking-wider">
                              {generatedPromo.code}
                            </p>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Ограничения:</span>
                            <p className="text-gray-400 italic text-[11px]">{generatedPromo.condition}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
                        <Percent className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-xs">Выберите параметры промо-акции и нажмите «Создать промо-оффер».</p>
                      </div>
                    )}
                  </div>

                  {generatedPromo && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`Акция: ${generatedPromo.title}\n\nУсловия: ${generatedPromo.description}\nПромокод: ${generatedPromo.code}`)}
                      className="mt-6 w-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all border border-white/10"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{s.copy}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: AI CONTENT STUDIO */}
          {activeTab === 'content_studio' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">AI Content Studio</h3>
                  <p className="text-xs text-gray-400">Генерация постов, SEO-текстов и вирусных сценариев</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Тип Контента</label>
                    <select 
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Instagram Post">Instagram пост с хэштегами</option>
                      <option value="TikTok scripts">Сценарий вирусного Reels / TikTok (30 сек)</option>
                      <option value="Blog articles">Полезная статья в блог автосалона</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 font-bold mb-1.5">Ключевая тема / Ключевые слова</label>
                    <input 
                      type="text" 
                      value={contentKeyword}
                      onChange={(e) => setContentKeyword(e.target.value)}
                      placeholder="Напр., Выбор гибридов в Бишкеке"
                      className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generateContentStudioText}
                  disabled={generatingContent}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
                >
                  {generatingContent ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{s.generating}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Подготовить контент</span>
                    </>
                  )}
                </button>
              </div>

              {/* Studio content outputs */}
              <div className="lg:col-span-7">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-white/10 flex items-center justify-between">
                      <span>Результат студии контента</span>
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded-md">STUDIO AI</span>
                    </h4>

                    {generatedContent ? (
                      <div className="space-y-4 text-xs text-gray-300">
                        <div>
                          <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Сгенерированный текст:</span>
                          <pre className="whitespace-pre-wrap font-sans text-gray-300 bg-white/[0.03] p-4 rounded-xl border border-white/10 leading-relaxed">
                            {generatedContent.text}
                          </pre>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                          <div>
                            <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">SEO Title Tag:</span>
                            <p className="text-white italic text-[11px] bg-white/[0.02] p-2 rounded-lg border border-white/5">{generatedContent.seoTitle}</p>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">SEO Meta Description:</span>
                            <p className="text-gray-400 italic text-[11px] bg-white/[0.02] p-2 rounded-lg border border-white/5">{generatedContent.seoDesc}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
                        <BookOpen className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-xs">Запустите AI генератор контента для создания постов или статей.</p>
                      </div>
                    )}
                  </div>

                  {generatedContent && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedContent.text)}
                      className="mt-6 w-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all border border-white/10"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{s.copy}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: AI COMPETITOR ANALYSIS */}
          {activeTab === 'competitor_analysis' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Radar Performance comparison chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-7">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {lang === 'RU' ? 'Сравнение Эффективности Маркетинга' : 'Маркетинг натыйжалуулугун салыштыруу'}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">Оценка AutoHub в сравнении с конкурентами по Бишкеку (2026)</p>
                  </div>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={analyticsData.competitorData}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis dataKey="subject" stroke="#888888" fontSize={10} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#444444" fontSize={8} />
                        <Radar name="AutoHub Kyrgyzstan" dataKey="AutoHub" stroke="#0B3D91" fill="#0B3D91" fillOpacity={0.3} />
                        <Radar name="Competitor A" dataKey="Comp1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.05} />
                        <Radar name="Competitor B" dataKey="Comp2" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.02} />
                        <Tooltip contentStyle={{ backgroundColor: '#070913', borderColor: 'rgba(255,255,255,0.1)' }} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* SWOT panel analysis */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">SWOT Анализ & Возможности (AI Сводка)</h3>
                    <p className="text-xs text-gray-400">Автоматически обновляемые инсайты на основе рыночных показателей конкурентов в Бишкеке</p>
                  </div>

                  <div className="space-y-4 text-xs text-gray-300">
                    <div className="bg-[#0e2a1b]/10 border border-green-500/20 p-3 rounded-2xl">
                      <span className="text-green-400 font-bold block mb-1">💪 Сильные стороны (Strengths):</span>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Абсолютное лидерство в СНГ по внедрению ИИ-советников и персонализированных умных предложений. Сниженный CPA (стоимость привлечения клиента) на 35%.
                      </p>
                    </div>

                    <div className="bg-[#2e1d0c]/10 border border-amber-500/20 p-3 rounded-2xl">
                      <span className="text-amber-400 font-bold block mb-1">🎯 Возможности (Opportunities):</span>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Запуск гео-таргетированной рекламы на Иссык-Кульскую область в курортный период, а также продвижение лизинга электрокаров корпоративным клиентам.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
