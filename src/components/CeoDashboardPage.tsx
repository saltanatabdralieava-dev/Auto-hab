import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Sparkles, Users, Target, LineChart as LucideLineChart, 
  Percent, Award, Shield, Activity, FileText, Layers, Globe, Clock, 
  ArrowLeft, CheckCircle, Download, Smartphone, Eye, ArrowUpRight, 
  BarChart3, PieChart as LucidePieChart, Plus, Send, Calendar, ChevronRight, 
  MessageSquare, AlertCircle, RefreshCw, Trash2, Landmark, Wallet, 
  Coins, ArrowDownRight, Truck, UserCheck, Briefcase, Building, Sparkle,
  Zap, ArrowRight, Check, Search, Filter, MapPin
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface CeoDashboardPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onBackToCatalog: () => void;
}

export function CeoDashboardPage({ lang, onBackToCatalog }: CeoDashboardPageProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Bishkek' | 'Osh' | 'Jalal-Abad'>('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiScore, setAiScore] = useState(94);
  const [aiTipIndex, setAiTipIndex] = useState(0);

  // Trigger quick message notification
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Translations
  const t = useMemo(() => {
    return {
      RU: {
        title: "CEO AI Стратегический Офис",
        subtitle: "Центральная панель управления Генерального Директора | AutoHub Kyrgyzstan",
        back: "Назад в Каталог",
        revenue_today: "Выручка сегодня",
        revenue_monthly: "Выручка за месяц",
        total_profit: "Валовая прибыль",
        expenses: "Расходы",
        net_profit: "Чистая прибыль",
        sold_today: "Продано сегодня",
        in_transit: "В пути / Доставка",
        pending_payments: "Ожидают оплаты",
        active_customers: "Активные клиенты",
        new_customers: "Новые клиенты",
        best_employee: "Лучший сотрудник",
        best_dealership: "Лучший автосалон",
        best_campaign: "Лучшая кампания",
        marketing_roi: "Маркетинговый ROI",
        ai_business_score: "AI Индекс Бизнеса",
        ai_growth_pred: "AI Прогноз Роста (Q3-Q4)",
        recommendations: "AI Рекомендации по увеличению продаж",
        revenue_forecast: "Прогноз выручки",
        expenses_forecast: "Прогноз расходов",
        demo_mode: "Режим Генерального Директора",
        refresh: "Обновить данные",
        copied: "Скопировано в буфер!",
        score_desc: "Рассчитано на основе активности рынка, конверсии лидов и скорости доставки",
        region: "Регион",
        currency: "USD",
        transit_desc: "Автомобили в логистической цепочке из Кореи, Китая, ОАЭ и США",
        search_placeholder: "Поиск по операциям...",
        regenerate_recommendation: "Сгенерировать новые рекомендации",
        kpi_title: "Ключевые показатели эффективности (KPI)"
      },
      KG: {
        title: "CEO AI Стратегиялык Офиси",
        subtitle: "Башкы директордун борбордук башкаруу панели | AutoHub Kyrgyzstan",
        back: "Каталогго кайтуу",
        revenue_today: "Бүгүнкү киреше",
        revenue_monthly: "Айлык киреше",
        total_profit: "Жалпы пайда",
        expenses: "Чыгымдар",
        net_profit: "Таза пайда",
        sold_today: "Бүгүн сатылды",
        in_transit: "Жолдо / Жеткирүү",
        pending_payments: "Төлөм күтүлүүдө",
        active_customers: "Активдүү кардарлар",
        new_customers: "Жаңы кардарлар",
        best_employee: "Мыкты кызматкер",
        best_dealership: "Мыкты автосалон",
        best_campaign: "Мыкты кампания",
        marketing_roi: "Маркетингдик ROI",
        ai_business_score: "AI Бизнес Индекси",
        ai_growth_pred: "AI Өсүү Прогнозу (Q3-Q4)",
        recommendations: "Сатууну көбөйтүү боюнча AI сунуштары",
        revenue_forecast: "Киреше прогнозу",
        expenses_forecast: "Чыгымдар прогнозу",
        demo_mode: "Башкы Директордун Режими",
        refresh: "Маалыматтарды жаңылоо",
        copied: "Көчүрүлдү!",
        score_desc: "Рыноктун активдүүлүгү, лид конверсиясы жана жеткирүү ылдамдыгынын негизинде эсептелген",
        region: "Аймак",
        currency: "USD",
        transit_desc: "Корея, Кытай, БАЭ жана АКШдан келген логистикалык чынжырдагы унаалар",
        search_placeholder: "Операциялар боюнча издөө...",
        regenerate_recommendation: "Жаңы сунуштарды генерациялоо",
        kpi_title: "Негизги натыйжалуулук көрсөткүчтөрү (KPI)"
      },
      EN: {
        title: "CEO AI Strategic Suite",
        subtitle: "General Director's Central Control Suite | AutoHub Kyrgyzstan",
        back: "Back to Catalog",
        revenue_today: "Today's Revenue",
        revenue_monthly: "Monthly Revenue",
        total_profit: "Gross Profit",
        expenses: "Expenses",
        net_profit: "Net Profit",
        sold_today: "Sold Today",
        in_transit: "In Transit / Shipping",
        pending_payments: "Pending Payments",
        active_customers: "Active Customers",
        new_customers: "New Customers",
        best_employee: "Best Employee",
        best_dealership: "Best Dealership",
        best_campaign: "Best Campaign",
        marketing_roi: "Marketing ROI",
        ai_business_score: "AI Business Score",
        ai_growth_pred: "AI Growth Forecast (Q3-Q4)",
        recommendations: "AI Recommendations for Increasing Sales",
        revenue_forecast: "Revenue Forecast",
        expenses_forecast: "Expense Forecast",
        demo_mode: "CEO Master Mode",
        refresh: "Refresh Intelligence",
        copied: "Copied to clipboard!",
        score_desc: "Calculated based on market activity, lead conversions, and shipping turnaround",
        region: "Region",
        currency: "USD",
        transit_desc: "Vehicles in transit route from Korea, China, UAE, and USA",
        search_placeholder: "Search operations...",
        regenerate_recommendation: "Regenerate Recommendations",
        kpi_title: "Key Performance Indicators (KPI)"
      }
    }[lang];
  }, [lang]);

  // CEO Demo Data structured with high visual appeal
  const currentMetrics = useMemo(() => {
    const mult = selectedRegion === 'Bishkek' ? 0.65 : selectedRegion === 'Osh' ? 0.25 : selectedRegion === 'Jalal-Abad' ? 0.10 : 1.0;
    
    return {
      revenueToday: Math.round(185000 * mult),
      revenueMonthly: Math.round(4250000 * mult),
      totalProfit: Math.round(890000 * mult),
      expenses: Math.round(410000 * mult),
      netProfit: Math.round(480000 * mult),
      carsSoldToday: Math.max(1, Math.round(14 * mult)),
      carsInTransit: Math.max(2, Math.round(76 * mult)),
      pendingPayments: Math.round(320000 * mult),
      activeCustomers: Math.round(1240 * mult),
      newCustomers: Math.round(185 * mult),
      bestEmployee: selectedRegion === 'Osh' ? "Адилет Мамытов (Osh Branch)" : "Тимур Садыков (Bishkek)",
      bestDealership: selectedRegion === 'All' ? "AutoHub Bishkek Prime" : `AutoHub ${selectedRegion}`,
      bestCampaign: "Zeekr EV Revolution (TikTok)",
      marketingRoi: "5.4x ROI"
    };
  }, [selectedRegion]);

  // AI recommendations lists
  const aiRecommendations = useMemo(() => {
    return [
      {
        id: 1,
        category: "Sales Expansion",
        title: lang === 'RU' ? "Стимулирование продаж электромобилей в Оше" : "Оштогу электромобиль сатууну стимулдаштыруу",
        impact: "High Impact (+18% Revenue)",
        desc: lang === 'RU' 
          ? "Анализ запросов показывает всплеск интереса к кроссоверам BYD и Zeekr в южном регионе на 42%. Рекомендуется перенаправить 15% маркетингового бюджета из Бишкека в Ошскую область и запустить таргетированную кампанию с акцентом на бесплатную установку домашних зарядных станций."
          : "Талдоо түштүк аймакта BYD жана Zeekr кроссоверлерине болгон кызыгуунун 42% өскөнүн көрсөтүүдө. Маркетингдик бюджеттин 15% Бишкектен Ош облусуна багыттоо жана үйгө акысыз заряддоо станцияларын орнотуу акциясын баштоо сунушталат.",
        action: "Launch Target Campaign"
      },
      {
        id: 2,
        category: "Logistics Optimization",
        title: lang === 'RU' ? "Перераспределение цепочки поставок из Китая" : "Кытайдан келүүчү жеткирүү чынжырын оптималдаштыруу",
        impact: "Medium Impact (-12% Delivery Cost)",
        desc: lang === 'RU'
          ? "Логистический ИИ зафиксировал задержки на Хоргосе. Альтернативный маршрут через Кашгар сократит время транзита на 4 дня и сэкономит в среднем $350 на каждом контейнере. Измените приоритет маршрутов для следующих 25 заказанных электромобилей в транзите."
          : "Логистикалык ИИ Хоргос бажысында кармалууларды аныктады. Кашгар аркылуу альтернативдүү каттам транзит убактысын 4 күнгө кыскартып, ар бир контейнерден орточо $350 үнөмдөйт.",
        action: "Re-route Shipments"
      },
      {
        id: 3,
        category: "Financial Efficiency",
        title: lang === 'RU' ? "Минимизация дебиторской задолженности" : "Дебитордук карызды минималдаштыруу",
        impact: "High Impact (+$120k Liquid Cash)",
        desc: lang === 'RU'
          ? "Зафиксировано зависание траншей на сумму $320,000. Внедрение автоматического напоминания через WhatsApp и предоставление скидки 0.5% за моментальную оплату в течение 24 часов ускорит оборачиваемость капитала на 35%."
          : "320,000 доллар өлчөмүндөгү кечиктирилген төлөмдөр аныкталды. WhatsApp аркылуу автоматтык билдирүүлөрдү киргизүү жана 24 сааттын ичинде төлөгөндөргө 0.5% арзандатуу берүү капиталдын айланышын 35% тездетет.",
        action: "Enable Smart Reminders"
      },
      {
        id: 4,
        category: "Customer Satisfaction",
        title: lang === 'RU' ? "Повышение лояльности владельцев Premium SUV" : "Premium SUV ээлеринин лоялдуулугун жогорулатуу",
        impact: "Medium Impact (+25% Referral Sales)",
        desc: lang === 'RU'
          ? "Покупатели Lexus LX 600 и Toyota LC 300 показывают высокий NPS (92%), но низкую частоту повторных обращений. Запуск закрытого клуба лояльности 'AutoHub Prestige Club' с бесплатным сезонным шиномонтажом и детейлингом сгенерирует до 15 рекомендаций в месяц."
          : "Lexus LX 600 жана Toyota LC 300 сатып алуучулары жогорку NPSти (92%) көрсөтүүдө, бирок кайталап кайрылуусу аз. Акысыз сезондук шиналарды алмаштыруу жана детейлинг камтылган жабык клубду ачуу сунушталат.",
        action: "Initiate Loyalty Program"
      }
    ];
  }, [lang]);

  // Dynamic AI trigger for recommendations
  const triggerRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiScore(Math.floor(Math.random() * 5) + 95); // 95-99
      setAiTipIndex((prev) => (prev + 1) % aiRecommendations.length);
      triggerToast(lang === 'RU' ? 'Рекомендации успешно обновлены ИИ!' : 'Сунуштар ИИ тарабынан ийгиликтүү жаңыртылды!');
    }, 1500);
  };

  // Forecast charts data (Revenue vs Expense Forecast)
  const forecastData = useMemo(() => {
    return [
      { month: 'Jul 26', Revenue: 4250000, Expenses: 3100000, Prediction: 4250000 },
      { month: 'Aug 26', Revenue: 4410000, Expenses: 3150000, Prediction: 4500000 },
      { month: 'Sep 26', Revenue: 4650000, Expenses: 3200000, Prediction: 4850000 },
      { month: 'Oct 26', Revenue: 4800000, Expenses: 3250000, Prediction: 5100000 },
      { month: 'Nov 26', Revenue: 5100000, Expenses: 3300000, Prediction: 5500000 },
      { month: 'Dec 26', Revenue: 5600000, Expenses: 3400000, Prediction: 6100000 },
    ];
  }, []);

  // Performance by Dealership
  const dealershipData = [
    { name: 'Bishkek Prime', sales: 48, revenue: 2150000, satisfaction: '96%', employees: 14 },
    { name: 'Osh Premium', sales: 18, revenue: 890000, satisfaction: '94%', employees: 8 },
    { name: 'Jalal-Abad Auto', sales: 11, revenue: 520000, satisfaction: '91%', employees: 5 },
    { name: 'Karakol Center', sales: 6, revenue: 290000, satisfaction: '93%', employees: 3 }
  ];

  // In Transit tracking simulation
  const transitCars = [
    { id: 'T-1092', model: 'BMW X5 M Competition', from: 'Germany (Munich)', currentStatus: 'Customs Kyrgyzstan', progress: 90, eta: '2 days' },
    { id: 'T-1093', model: 'Zeekr 001 FR', from: 'China (Ningbo)', currentStatus: 'In Transit Osh', progress: 75, eta: '4 days' },
    { id: 'T-1094', model: 'Lexus LX 600 VIP', from: 'UAE (Dubai Port)', currentStatus: 'Shipping to Bishkek', progress: 45, eta: '11 days' },
    { id: 'T-1095', model: 'Tesla Model Y Performance', from: 'USA (Seattle)', currentStatus: 'In Transit Europe', progress: 30, eta: '18 days' }
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 font-sans antialiased selection:bg-[#0B3D91] selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] bg-gradient-to-r from-[#0B3D91] to-cyan-600 text-white px-6 py-3 rounded-full shadow-[0_0_30px_rgba(11,61,145,0.5)] flex items-center space-x-2 border border-blue-400/20"
          >
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold tracking-wide">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Sticky Top Header */}
      <header className="border-b border-white/[0.06] bg-[#070913]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button 
              onClick={onBackToCatalog}
              className="flex items-center space-x-2 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200 border border-white/[0.05]"
              id="ceo-back-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.back}</span>
            </button>
            <div className="h-6 w-[1px] bg-white/10"></div>
            <div className="flex items-center space-x-2">
              <Landmark className="w-4.5 h-4.5 text-blue-400" />
              <h1 className="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400 tracking-tight font-display">
                AutoHub CEO Portal
              </h1>
            </div>
          </div>

          {/* Region filter controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className="flex items-center space-x-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
              {(['All', 'Bishkek', 'Osh', 'Jalal-Abad'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setSelectedRegion(r);
                    triggerToast(lang === 'RU' ? `Данные отфильтрованы по: ${r}` : `Аймак тандалды: ${r}`);
                  }}
                  className={`text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                    selectedRegion === r 
                      ? 'bg-[#0B3D91] text-white shadow-md' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {r === 'All' ? (lang === 'RU' ? 'Все филиалы' : 'Баардыгы') : r}
                </button>
              ))}
            </div>

            {/* Quick Refresh */}
            <button
              onClick={triggerRegenerate}
              disabled={isGenerating}
              className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] p-2.5 rounded-xl transition-all text-gray-300 hover:text-white disabled:opacity-40"
              title={t.refresh}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-blue-400' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* CEO Welcome Hero Area */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0c1024] to-[#070913] p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>AI EXECUTIVE ASSISTANT ACTIVE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
                {t.subtitle}
              </p>
            </div>

            {/* Business Score Circle Widget */}
            <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl flex items-center space-x-4 backdrop-blur-md self-stretch md:self-auto justify-between">
              <div className="relative flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="28" 
                    stroke="#0B3D91" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={175} 
                    strokeDashoffset={175 - (175 * aiScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-sm font-black text-white">{aiScore}%</div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide uppercase">{t.ai_business_score}</h4>
                <p className="text-[10px] text-gray-400 max-w-[200px] mt-0.5 leading-snug">{t.score_desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE KPI CARDS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>{t.kpi_title}</span>
            </h3>
            <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/10 uppercase">
              {selectedRegion === 'All' ? (lang === 'RU' ? 'Все автосалоны' : 'Баардык филиалдар') : selectedRegion}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Today's Revenue */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">{t.revenue_today}</span>
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <Coins className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-black text-white">${currentMetrics.revenueToday.toLocaleString()}</div>
                <div className="text-[10px] text-emerald-400 font-bold mt-1.5 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  <span>+14.2% vs yesterday</span>
                </div>
              </div>
            </div>

            {/* Metric 2: Monthly Revenue */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">{t.revenue_monthly}</span>
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <Landmark className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-black text-white">${currentMetrics.revenueMonthly.toLocaleString()}</div>
                <div className="text-[10px] text-blue-400 font-bold mt-1.5 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  <span>+8.4% vs last month</span>
                </div>
              </div>
            </div>

            {/* Metric 3: Profit & Margin */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">{t.net_profit} / Margin</span>
                <div className="p-2 bg-purple-500/10 rounded-xl">
                  <Wallet className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-black text-white">${currentMetrics.netProfit.toLocaleString()}</div>
                <div className="text-[10px] text-purple-400 font-bold mt-1.5 flex items-center">
                  <span className="bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20 text-[9px] uppercase font-black">
                    Margin: {selectedRegion === 'All' ? '11.3%' : '12.1%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 4: Total Expenses */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">{t.expenses}</span>
                <div className="p-2 bg-red-500/10 rounded-xl">
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-black text-white">${currentMetrics.expenses.toLocaleString()}</div>
                <div className="text-[10px] text-red-400 font-bold mt-1.5 flex items-center">
                  <span>-3.1% optimized overheads</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECOND GRID: SECONDARY EXECUTIVE KPIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Cars Sold Today */}
          <div className="bg-[#0b0e20]/60 border border-white/[0.04] rounded-2xl p-4 flex items-center space-x-4">
            <div className="p-3 bg-amber-500/10 rounded-xl shrink-0">
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t.sold_today}</div>
              <div className="text-xl font-black text-white mt-0.5">{currentMetrics.carsSoldToday} {lang === 'RU' ? 'авто' : 'унаа'}</div>
              <div className="text-[9px] text-green-400 font-bold mt-0.5">Active delivery team</div>
            </div>
          </div>

          {/* Cars in Transit */}
          <div className="bg-[#0b0e20]/60 border border-white/[0.04] rounded-2xl p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-xl shrink-0">
              <Truck className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t.in_transit}</div>
              <div className="text-xl font-black text-white mt-0.5">{currentMetrics.carsInTransit} {lang === 'RU' ? 'в пути' : 'жолдо'}</div>
              <div className="text-[9px] text-blue-400 font-bold mt-0.5 truncate">{t.transit_desc}</div>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-[#0b0e20]/60 border border-white/[0.04] rounded-2xl p-4 flex items-center space-x-4">
            <div className="p-3 bg-rose-500/10 rounded-xl shrink-0">
              <Coins className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t.pending_payments}</div>
              <div className="text-xl font-black text-white mt-0.5">${currentMetrics.pendingPayments.toLocaleString()}</div>
              <div className="text-[9px] text-rose-400 font-bold mt-0.5">3 deals in processing</div>
            </div>
          </div>

          {/* Customer growth */}
          <div className="bg-[#0b0e20]/60 border border-white/[0.04] rounded-2xl p-4 flex items-center space-x-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl shrink-0">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{t.new_customers} / {t.active_customers}</div>
              <div className="text-xl font-black text-white mt-0.5">+{currentMetrics.newCustomers} / {currentMetrics.activeCustomers}</div>
              <div className="text-[9px] text-cyan-400 font-bold mt-0.5">Customer retention: 91%</div>
            </div>
          </div>

        </div>

        {/* SECTION 2: AI STRATEGIC RECOMMENDATIONS PANEL (LUXURY INTERACTIVE INTERFACE) */}
        <div className="bg-gradient-to-r from-[#0c112b] to-[#070914] border border-white/[0.06] rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>{t.recommendations}</span>
              </h3>
              <p className="text-xs text-gray-400">
                {lang === 'RU' ? 'Персонализированный план действий, сформированный искусственным интеллектом для генерального директора' : 'Башкы директор үчүн жасалма интеллект тарабынан даярдалган иш-аракеттер планы'}
              </p>
            </div>
            <button 
              onClick={triggerRegenerate}
              className="bg-[#0B3D91] hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg transition-all flex items-center space-x-2 border border-blue-400/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.regenerate_recommendation}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiRecommendations.map((rec) => {
              const isSelected = aiRecommendations[aiTipIndex].id === rec.id;
              return (
                <div 
                  key={rec.id} 
                  className={`border rounded-2xl p-5 transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-blue-500/5 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                      : 'bg-white/[0.02] border-white/[0.05] hover:border-white/10'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase font-black text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md">
                        {rec.category}
                      </span>
                      <span className="text-[10px] font-black text-amber-400">
                        {rec.impact}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">{rec.title}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">{rec.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    <button 
                      onClick={() => triggerToast(lang === 'RU' ? `Рекомендация запущена в исполнение: ${rec.title}` : `Сунуш аткарууга жөнөтүлдү: ${rec.title}`)}
                      className="text-[10px] text-blue-400 hover:text-white font-black uppercase flex items-center space-x-1"
                    >
                      <span>{rec.action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: CHARTS & PREDICTIONS FOR GENERAL DIRECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Revenue Forecast Area & Expense Area */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.ai_growth_pred}</h3>
                <p className="text-[10px] text-gray-400">Прогнозирование финансовых потоков и бюджета расходов до конца 2026 года</p>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] text-green-400 font-bold bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/10">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Growth confidence: 94.5%</span>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ceoRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B3D91" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0B3D91" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ceoExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ceoPredictionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.03} />
                  <XAxis dataKey="month" stroke="#888888" fontSize={10} />
                  <YAxis stroke="#888888" fontSize={10} tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip 
                    formatter={(value: any) => [`$${value.toLocaleString()}`, undefined]}
                    contentStyle={{ backgroundColor: '#070913', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} 
                  />
                  <Area type="monotone" dataKey="Revenue" stroke="#0B3D91" strokeWidth={2.5} fillOpacity={1} fill="url(#ceoRevenueGrad)" name={t.revenue_forecast} />
                  <Area type="monotone" dataKey="Expenses" stroke="#ef4444" strokeWidth={1.5} fillOpacity={1} fill="url(#ceoExpenseGrad)" name={t.expenses_forecast} />
                  <Area type="monotone" dataKey="Prediction" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#ceoPredictionGrad)" name="AI Target Success Trend" />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dealership Rank & Performance */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'RU' ? 'Рейтинг автосалонов' : 'Автосалондордун рейтинги'}</h3>
                <Building className="w-4 h-4 text-blue-400" />
              </div>
              
              <div className="space-y-4">
                {dealershipData.map((dlr, idx) => (
                  <div key={idx} className="bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-black text-blue-400 bg-blue-500/10 w-6 h-6 rounded-lg flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{dlr.name}</h4>
                        <p className="text-[10px] text-gray-400">{dlr.employees} сотрудников / NPS {dlr.satisfaction}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-white">${dlr.revenue.toLocaleString()}</span>
                      <p className="text-[9px] text-gray-400 font-bold">{dlr.sales} {lang === 'RU' ? 'сделок' : 'сатуу'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action info */}
            <div className="mt-6 pt-4 border-t border-white/[0.05] bg-blue-500/5 p-3 rounded-xl text-[10px] text-gray-300 leading-snug">
              💡 <strong>ИИ Инсайт:</strong> Филиал <strong className="text-white">Bishkek Prime</strong> перевыполнил план на <strong className="text-green-400">+12%</strong> за счет внедрения мгновенных расчетов растаможки.
            </div>
          </div>

        </div>

        {/* SECTION 4: CARS IN TRANSIT & PENDING PAYMENTS (OPERATIONAL INSIGHTS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tracking Vehicles in Transit */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'RU' ? 'Импорт авто в КР (Статус)' : 'Импорт унаалардын статусу'}</h3>
                <p className="text-[10px] text-gray-400">Транзит грузов по таможенным зонам и границам</p>
              </div>
              <Truck className="w-4 h-4 text-blue-400 animate-bounce" />
            </div>

            <div className="space-y-4">
              {transitCars.map((car, idx) => (
                <div key={idx} className="space-y-1 bg-white/[0.01] border border-white/[0.03] p-3.5 rounded-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{car.model}</span>
                    <span className="text-blue-400 font-black">{car.eta} Left</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span>From: {car.from}</span>
                    <span className="text-amber-400 font-medium">{car.currentStatus}</span>
                  </div>
                  
                  {/* Custom Progress Bar */}
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                    <div 
                      className="bg-gradient-to-r from-[#0B3D91] to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${car.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Best Performing Details & High Value Leads */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'RU' ? 'Лидеры Эффективности' : 'Жыйынтык лидерлери'}</h3>
                <Award className="w-4 h-4 text-amber-400" />
              </div>

              <div className="divide-y divide-white/[0.05] text-xs">
                
                {/* Row 1 */}
                <div className="py-3 flex items-center justify-between">
                  <span className="text-gray-400 flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-green-400" />
                    <span>{t.best_employee}</span>
                  </span>
                  <span className="font-bold text-white">{currentMetrics.bestEmployee}</span>
                </div>

                {/* Row 2 */}
                <div className="py-3 flex items-center justify-between">
                  <span className="text-gray-400 flex items-center space-x-2">
                    <Building className="w-4 h-4 text-blue-400" />
                    <span>{t.best_dealership}</span>
                  </span>
                  <span className="font-bold text-white">{currentMetrics.bestDealership}</span>
                </div>

                {/* Row 3 */}
                <div className="py-3 flex items-center justify-between">
                  <span className="text-gray-400 flex items-center space-x-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span>{t.best_campaign}</span>
                  </span>
                  <span className="font-bold text-white">{currentMetrics.bestCampaign}</span>
                </div>

                {/* Row 4 */}
                <div className="py-3 flex items-center justify-between">
                  <span className="text-gray-400 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>{t.marketing_roi}</span>
                  </span>
                  <span className="font-bold text-white">{currentMetrics.marketingRoi}</span>
                </div>

                {/* Row 5 */}
                <div className="py-3 flex items-center justify-between">
                  <span className="text-gray-400 flex items-center space-x-2">
                    <Landmark className="w-4 h-4 text-cyan-400" />
                    <span>Active Bank Integration</span>
                  </span>
                  <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-md text-[10px]">Demir Bank Secure</span>
                </div>

              </div>
            </div>

            {/* Simulated PDF download report button */}
            <button
              onClick={() => {
                triggerToast(lang === 'RU' ? 'Генерация финансового отчета PDF...' : 'Финансылык PDF отчет генерацияланууда...');
                setTimeout(() => {
                  triggerToast(lang === 'RU' ? 'PDF отчет успешно скачан!' : 'PDF отчет ийгиликтүү жүктөлдү!');
                }, 2000);
              }}
              className="mt-6 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'RU' ? 'Экспорт квартального PDF отчета' : 'Кварталдык PDF отчетту жүктөө'}</span>
            </button>

          </div>

        </div>

      </main>

      {/* Elegant Footer */}
      <footer className="border-t border-white/[0.05] bg-[#070913]/40 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          <p>© 2026 AutoHub Kyrgyzstan. Built with high-end executive strategic planning tools. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
