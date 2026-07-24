import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Target, 
  Sparkles, 
  Percent, 
  TrendingUp, 
  Award, 
  DollarSign, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  Printer, 
  Plus, 
  UserCheck, 
  Briefcase, 
  Building, 
  ArrowUpRight, 
  ChevronRight, 
  RefreshCw, 
  AlertCircle, 
  TrendingDown, 
  ShieldAlert, 
  Activity, 
  Search,
  Filter,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';

// Data types
interface Lead {
  id: string;
  name: string;
  phone: string;
  status: 'new' | 'hot' | 'warm' | 'cold' | 'vip' | 'lost';
  score: number;
  preferredCar: string;
  budget: number;
  expectedDate: string;
  source: string;
  probability: 'High' | 'Medium' | 'Low';
  probabilityValue: number; // e.g. 85 for 85%
  dealValue: number;
  recommendations: {
    bestVehicle: string;
    alternatives: string[];
    financing: string;
    tradeIn: string;
    vipOffer: string;
  };
  followUp: {
    date: string;
    callPoints: string[];
    whatsapp: string;
    sms: string;
    email: string;
  };
  negotiation: {
    discountRecommend: string;
    strategy: string;
    suggestedPrice: number;
    minAcceptablePrice: number;
    closingTips: string[];
  };
}

// Initial Preset Leads mapping Kyrgyz market context
const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Алибек Мамбетов",
    phone: "+996 (555) 12-34-56",
    status: "hot",
    score: 92,
    preferredCar: "BYD Song Plus EV Champion 2024",
    budget: 28500,
    expectedDate: "2026-07-24",
    source: "Instagram AD",
    probability: "High",
    probabilityValue: 88,
    dealValue: 27900,
    recommendations: {
      bestVehicle: "BYD Song Plus EV Champion Edition (White)",
      alternatives: ["Zeekr X Me Edition 2023", "Hyundai Tucson PHEV 2022"],
      financing: "Optima Bank Electric-Auto Leasing - 13.5% APR, 30% Down Payment",
      tradeIn: "Wants to trade-in Toyota Camry 2015 (Est. Value: $14,000, Trade-in bonus applied)",
      vipOffer: "Free 7kW wallbox charger + free registration at 'Unaa' agency"
    },
    followUp: {
      date: "2026-07-22",
      callPoints: [
        "Mention that the White BYD Song Plus EV is currently in our Bishkek showroom and ready for a test drive.",
        "Highlight the free wallbox charger promo ending this week.",
        "Provide Optima Bank leasing approval response (95% pre-approved)."
      ],
      whatsapp: "Саламатсызбы, Алибек! Бул AutoHub компаниясынан. Сиз сураган ак түстөгү BYD Song Plus EV унаасы Бишкек шорумубузда даяр турат. Качан келип тест-драйв кылып көрөсүз? Акысыз заряддоочу түзүлүш белекке берилет!",
      sms: "AutoHub: Alibek, vash BYD Song Plus EV v shorume Bishkeka! Test-drive segodnya. Podarok: zaryadka 7kVt. Tel: 0555123456",
      email: "Уважаемый Алибек,\n\nРады сообщить, что выбранный вами электромобиль BYD Song Plus EV Champion Edition 2024 года прибыл на нашу площадку в Бишкеке. Мы подготовили для вас персональное предложение по лизингу от Оптима Банка со ставкой 13.5%.\n\nЖдем вас на тест-драйв в любое удобное время.\n\nС уважением, AutoHub Kyrgyzstan."
    },
    negotiation: {
      discountRecommend: "Up to 3% ($800) discount permitted or free custom EVA mats + ceramic body coating.",
      strategy: "Emphasize low operating costs in Kyrgyzstan (cheap electricity vs petrol) and zero customs tax on EVs.",
      suggestedPrice: 27900,
      minAcceptablePrice: 27100,
      closingTips: [
        "Focus on immediate availability — no 30-day transit wait.",
        "Offer to do a live trade-in evaluation of his 2015 Camry within 15 minutes."
      ]
    }
  },
  {
    id: "lead-2",
    name: "Айсулуу Кенжебаева",
    phone: "+996 (770) 98-76-54",
    status: "new",
    score: 74,
    preferredCar: "Lexus RX 350h Hybrid 2021",
    budget: 45000,
    expectedDate: "2026-08-05",
    source: "Referral (VIP client)",
    probability: "Medium",
    probabilityValue: 65,
    dealValue: 43500,
    recommendations: {
      bestVehicle: "Lexus RX 350h Luxury Edition (Pearl Gray)",
      alternatives: ["Toyota Highlander Hybrid 2020", "BMW X5 xDrive40e 2019"],
      financing: "Demir Bank VIP Car Loan - 14% APR in USD or 18% in KGS",
      tradeIn: "No trade-in. Direct payment.",
      vipOffer: "Free 1-year premium roadside assistance across Kyrgyzstan + VIP Lounge service"
    },
    followUp: {
      date: "2026-07-23",
      callPoints: [
        "Acknowledge her referral source (Asan-aka, VIP club member).",
        "Explain that this RX 350h has a certified 120-point diagnostic rating and clean USA timeline history.",
        "Discuss VIP custom clearance options if she prefers to order via South Korea or USA."
      ],
      whatsapp: "Айсулуу, саламатсызбы! Асан ака сизди сунуштаган эле. Сиз издеген Lexus RX 350h унаасы боюнча VIP шарттарды даярдап койдук. Качан таанышып чыгууга ыңгайлуу болот?",
      sms: "AutoHub VIP: Aisuluu, predlozhenie po Lexus RX 350h dlya vas gotov. Tel: 0770987654",
      email: "Здравствуйте, Айсулуу!\n\nПо рекомендации нашего VIP-клиента Асана, мы подготовили эксклюзивное предложение на гибридный кроссовер Lexus RX 350h Luxury Edition. Автомобиль отличается непревзойденной надежностью и экономичностью в городских условиях Бишкека.\n\nДля вас доступна персональная VIP-программа кредитования от Демир Банка.\n\nС наилучшими пожеланиями,\nAutoHub Kyrgyzstan."
    },
    negotiation: {
      discountRecommend: "Max discount $1,200. Focus on complementary services rather than direct cash discount.",
      strategy: "Highlight long-term premium resale value of Lexus hybrids in the local Kyrgyz market.",
      suggestedPrice: 43500,
      minAcceptablePrice: 42300,
      closingTips: [
        "Emphasize the impeccable USA title record of this premium SUV.",
        "Provide a written guarantee of hybrid battery health."
      ]
    }
  },
  {
    id: "lead-3",
    name: "Нурбек Осмонов (ОсОО 'АзияТранс')",
    phone: "+996 (500) 44-55-66",
    status: "vip",
    score: 95,
    preferredCar: "3x Toyota Hilux Double Cab 2022",
    budget: 110000,
    expectedDate: "2026-07-30",
    source: "B2B Website",
    probability: "High",
    probabilityValue: 90,
    dealValue: 105000,
    recommendations: {
      bestVehicle: "3x Toyota Hilux 2.8L Diesel MT (White)",
      alternatives: ["3x Mitsubishi L200 Triton 2022", "3x Isuzu D-Max 2023"],
      financing: "B2B Leasing via Bakai Bank - 12.5% in USD, company balance sheet registration",
      tradeIn: "N/A",
      vipOffer: "Free corporate logo branding decals + free winter tires for all 3 pickups"
    },
    followUp: {
      date: "2026-07-21",
      callPoints: [
        "Confirm commercial invoice and contract drafts have been emailed.",
        "Highlight heavy-duty chassis and factory fuel system adaptation to local diesel standards.",
        "Propose delivery of pickups directly to their headquarters in Osh/Bishkek."
      ],
      whatsapp: "Саламатсызбы, Нурбек мырза! Ишканаңыз үчүн Toyota Hilux унаалары боюнча келишимдин долбоору Бакай Банк тарабынан жактырылды. Бүгүн кол коюп, унааларды алып кетүүгө даярдайлыбы?",
      sms: "AutoHub B2B: Nurbek, contract po 3 Hilux gotov i odobren Bakai Bankom. Jdem vas. Tel: 0500445566",
      email: "Уважаемый Нурбек Осмонович,\n\nМы рады сотрудничеству с ОсОО 'АзияТранс'. Сообщаем, что 3 пикапа Toyota Hilux прошли полную предпродажную подготовку, включая антикоррозийную защиту днища для эксплуатации в горных регионах Кыргызстана.\n\nВсе необходимые документы отправлены вашему юристу.\n\nС уважением, B2B Департамент AutoHub."
    },
    negotiation: {
      discountRecommend: "Corporate volume discount applied: 4% off the bundle ($4,200 total concession).",
      strategy: "Present Hilux as the ultimate reliable asset with lowest depreciation for mining/geological transport in Issyk-Kul and Naryn.",
      suggestedPrice: 105000,
      minAcceptablePrice: 102500,
      closingTips: [
        "Offer to schedule a personal meeting with their CFO today.",
        "Mention the pick-ups are custom-fitted with heavy-duty engine bash plates."
      ]
    }
  },
  {
    id: "lead-4",
    name: "Эмил Кадыров",
    phone: "+996 (705) 33-88-11",
    status: "warm",
    score: 61,
    preferredCar: "Hyundai Elantra 2020",
    budget: 16500,
    expectedDate: "2026-08-15",
    source: "Facebook Market",
    probability: "Medium",
    probabilityValue: 50,
    dealValue: 15800,
    recommendations: {
      bestVehicle: "Hyundai Elantra 1.6L Smart (Silver)",
      alternatives: ["Kia Cerato 2020", "Toyota Corolla 2018"],
      financing: "Microfinance Organization auto-loan - 22% in KGS, no income verification required",
      tradeIn: "Offering Daewoo Gentra 2013 (Est. value: $4,500)",
      vipOffer: "Free engine diagnostic warranty for 6 months"
    },
    followUp: {
      date: "2026-07-25",
      callPoints: [
        "Follow up on his Daewoo Gentra trade-in valuation.",
        "Provide budget calculation showing that monthly payment will be around 18,000 KGS.",
        "Suggest a weekend test-drive at our Osh showroom."
      ],
      whatsapp: "Эмил, кандайсыз! Сиз тандаган Hyundai Elantra унаасын көрүүгө келе аласызбы? Daewoo Gentra унааңызды баалоо үчүн биздин адистер даяр турат.",
      sms: "AutoHub: Emil, Elantra gotova k testu. Gentra trade-in baaloo 15 minut alat. Osh shorumu.",
      email: "Приветствуем, Эмиль!\n\nМы сделали детальный расчет обмена вашего автомобиля Daewoo Gentra на современный седан Hyundai Elantra 2020 года. Ежемесячный платеж по кредиту составит всего 18,300 сомов.\n\nБудем рады видеть вас в автосалоне AutoHub в городе Ош.\n\nС уважением, AutoHub."
    },
    negotiation: {
      discountRecommend: "Maximum direct discount $300. Push on higher evaluation price of his Daewoo Gentra to make him feel rewarded.",
      strategy: "Highlight excellent fuel economy in city traffic (6.5L/100km) and availability of cheap aftermarket parts in Dordoi market.",
      suggestedPrice: 15800,
      minAcceptablePrice: 15400,
      closingTips: [
        "Suggest that the Elantra's value will remain stable in Kyrgyzstan.",
        "Offer free registration plate change."
      ]
    }
  },
  {
    id: "lead-5",
    name: "Бакыт Токтосунов",
    phone: "+996 (222) 77-66-55",
    status: "cold",
    score: 35,
    preferredCar: "Mercedes-Benz G550 2017",
    budget: 68000,
    expectedDate: "2026-09-30",
    source: "Lalafo Premium",
    probability: "Low",
    probabilityValue: 25,
    dealValue: 66000,
    recommendations: {
      bestVehicle: "Mercedes-Benz G550 AMG Line 4.0L BiTurbo",
      alternatives: ["Lexus LX 570 2016", "Range Rover Sport 2018"],
      financing: "Private installment plan with 50% upfront payment, 0% interest for 6 months",
      tradeIn: "N/A",
      vipOffer: "Free elite custom detailing + premium tinting wrap"
    },
    followUp: {
      date: "2026-08-01",
      callPoints: [
        "Check if he has secured the required 50% deposit ($34,000) for the G-Class.",
        "Inform him about new stock arrivals from Europe and UAE.",
        "No pressure, build relationship, keep in touch via monthly updates."
      ],
      whatsapp: "Бакыт, саламатсызбы! Жаңы келген Mercedes-Benz унааларынын тизмеси чыкты. Көрүүгө убактыңыз болобу? Шашылыш жок, жөн гана маалымат үчүн жиберип жатам.",
      sms: "AutoHub: Bakyt, novye SUV premium klassa pribyli v Bishkek. Katalog v WhatsApp.",
      email: "Уважаемый Бакыт,\n\nМы пополнили коллекцию внедорожников премиум-класса в нашем филиале AutoHub в Бишкеке. Помимо культового G550, у нас появились свежие варианты Lexus LX 570 из Дубая с чистой историей.\n\nБудем рады ответить на ваши вопросы.\n\nС уважением, AutoHub."
    },
    negotiation: {
      discountRecommend: "No discount on G-Class due to highly volatile demand. Frame it as collector-grade item.",
      strategy: "Focus on prestige, pure sound of the AMG exhaust, and commanding presence in Bishkek center.",
      suggestedPrice: 66000,
      minAcceptablePrice: 65000,
      closingTips: [
        "Do not offer aggressive discounts. High-end buyers value exclusivity and firm terms.",
        "Suggest checking out our secure luxury vault parking."
      ]
    }
  },
  {
    id: "lead-6",
    name: "Медер Кулматов",
    phone: "+996 (550) 11-22-33",
    status: "lost",
    score: 12,
    preferredCar: "Subaru Outback 2018",
    budget: 18000,
    expectedDate: "Expired",
    source: "Kolesa.kg",
    probability: "Low",
    probabilityValue: 5,
    dealValue: 17500,
    recommendations: {
      bestVehicle: "Subaru Outback 2.5i Touring",
      alternatives: ["Toyota RAV4 2016", "Honda CR-V 2017"],
      financing: "Standard bank auto-loan - 20% APR",
      tradeIn: "None",
      vipOffer: "N/A"
    },
    followUp: {
      date: "2026-07-10",
      callPoints: [
        "He purchased another vehicle privately on Lalafo. Keep him on the newsletter mailing list.",
        "Check if he needs insurance or diagnostic servicing at AutoHub for his newly bought Subaru.",
        "Ask for feedback on why he didn't buy from us."
      ],
      whatsapp: "Медер, куттуктайбыз! Жаңы унааңыз кут болсун! Эгерде унааны текшерүү же майын алмаштыруу керек болсо, AutoHub сервиске келиңиз, сизге 15% арзандатуу беребиз.",
      sms: "AutoHub: Meder, pozdravlyaem s pokupkoy! Servis i maslo dlya vas s discountom 15%.",
      email: "Здравствуйте, Медер!\n\nПоздравляем вас с приобретением автомобиля! Несмотря на то, что вы выбрали другой вариант, мы всегда рады видеть вас в числе клиентов нашего сервисного центра AutoHub Service в Бишкеке.\n\nЖелаем вам ровных дорог и безопасных поездок.\n\nС уважением, AutoHub."
    },
    negotiation: {
      discountRecommend: "N/A - deal lost.",
      strategy: "Maintain brand loyalty. Convert lost vehicle buyer into active high-value service center customer.",
      suggestedPrice: 17500,
      minAcceptablePrice: 17200,
      closingTips: ["Offer customer satisfaction feedback survey."]
    }
  }
];

// Sales Performance metrics
const PERFORMANCE_DATA = {
  dailySales: 86400,
  weeklySales: 542000,
  monthlySales: 2180000,
  salesTarget: 2500000,
  targetAchievement: 87.2,
  bestSalesperson: { name: "Нурлан Садыков", deals: 18, revenue: 382000 },
  bestDealership: "Bishkek Prime AutoHub",
  customerSatisfaction: 4.85,
  avgClosingTimeDays: 7.2
};

// Sales Forecast data
const MONTHLY_FORECAST = [
  { month: "May 2026", actual: 1850000, predicted: 1800000 },
  { month: "Jun 2026", actual: 2180000, predicted: 2100000 },
  { month: "Jul 2026", actual: 2350000, predicted: 2300000 }, // Current
  { month: "Aug 2026", predicted: 2600000 }, // Forecast
  { month: "Sep 2026", predicted: 2850000 },
  { month: "Oct 2026", predicted: 2900000 }
];

const POPULAR_BRANDS_SHARE = [
  { name: "BYD EV", value: 38, color: "#3b82f6" },
  { name: "Toyota", value: 25, color: "#10b981" },
  { name: "Lexus", value: 18, color: "#f59e0b" },
  { name: "Hyundai/Kia", value: 12, color: "#ec4899" },
  { name: "Zeekr & Others", value: 7, color: "#8b5cf6" }
];

const POPULAR_MODELS = [
  { model: "BYD Song Plus EV", sales: 42, growth: "+18%" },
  { model: "Toyota Camry (70/80)", sales: 31, growth: "+8%" },
  { model: "Lexus RX 350 (Hybrid)", sales: 24, growth: "+12%" },
  { model: "Zeekr 001/X", sales: 19, growth: "+25%" },
  { model: "Hyundai Sonata LPI", sales: 15, growth: "-4%" }
];

export function AISalesManagerPage({ lang, onBackToCatalog }: { lang: 'RU' | 'KG' | 'EN'; onBackToCatalog: () => void }) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(INITIAL_LEADS[0].id);
  const [leadFilter, setLeadFilter] = useState<'all' | 'new' | 'hot' | 'warm' | 'cold' | 'vip' | 'lost'>('all');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Bishkek' | 'Osh' | 'Jalal-Abad'>('All');
  
  // Custom lead creation form state
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    status: 'new' as Lead['status'],
    preferredCar: '',
    budget: '',
    source: 'Direct Walk-in'
  });

  // Search lead
  const [leadSearchText, setLeadSearchText] = useState('');

  // Toast status
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${type} template copied to clipboard!`);
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchFilter = leadFilter === 'all' || l.status === leadFilter;
      const matchSearch = l.name.toLowerCase().includes(leadSearchText.toLowerCase()) || 
                          l.preferredCar.toLowerCase().includes(leadSearchText.toLowerCase()) ||
                          l.phone.includes(leadSearchText);
      return matchFilter && matchSearch;
    });
  }, [leads, leadFilter, leadSearchText]);

  // Selected active lead details
  const activeLead = useMemo(() => {
    return leads.find(l => l.id === selectedLeadId) || leads[0];
  }, [leads, selectedLeadId]);

  // Handle adding custom lead
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.preferredCar || !newLeadForm.budget) {
      showToast("Please fill all required fields");
      return;
    }

    const budgetVal = parseInt(newLeadForm.budget) || 15000;
    
    // Deterministic lead score generation based on status & source
    let score = 50;
    if (newLeadForm.status === 'hot') score = 85 + Math.floor(Math.random() * 10);
    else if (newLeadForm.status === 'vip') score = 90 + Math.floor(Math.random() * 9);
    else if (newLeadForm.status === 'warm') score = 65 + Math.floor(Math.random() * 15);
    else if (newLeadForm.status === 'cold') score = 30 + Math.floor(Math.random() * 15);
    else if (newLeadForm.status === 'lost') score = 10 + Math.floor(Math.random() * 10);
    else score = 45 + Math.floor(Math.random() * 20);

    const probMap: Record<Lead['status'], { prob: Lead['probability']; val: number }> = {
      new: { prob: 'Medium', val: 55 },
      hot: { prob: 'High', val: 85 },
      warm: { prob: 'Medium', val: 60 },
      cold: { prob: 'Low', val: 30 },
      vip: { prob: 'High', val: 92 },
      lost: { prob: 'Low', val: 5 }
    };

    const statusProb = probMap[newLeadForm.status];

    // Build the dynamic lead structure
    const newCreatedLead: Lead = {
      id: `lead-custom-${Date.now()}`,
      name: newLeadForm.name,
      phone: newLeadForm.phone || "+996 (555) 00-11-22",
      status: newLeadForm.status,
      score: score,
      preferredCar: newLeadForm.preferredCar,
      budget: budgetVal,
      expectedDate: newLeadForm.status === 'lost' ? 'Expired' : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      source: newLeadForm.source,
      probability: statusProb.prob,
      probabilityValue: statusProb.val,
      dealValue: budgetVal,
      recommendations: {
        bestVehicle: `${newLeadForm.preferredCar} Luxury Edition`,
        alternatives: ["Toyota Camry Hybrid 2021", "BYD Song Plus EV 2023"],
        financing: "Bishkek AutoHub Partnership Bank Scheme - 14.5% APR",
        tradeIn: "Standard Evaluation offered with free diagnostics",
        vipOffer: "Free ceramic polymer protective spray and premium rubber mats"
      },
      followUp: {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        callPoints: [
          `Confirm customer interest in the ${newLeadForm.preferredCar}.`,
          `Discuss budget of $${budgetVal.toLocaleString()} and check credit eligibility.`,
          `Offer a personalized demonstration in our primary Bishkek Hub.`
        ],
        whatsapp: `Саламатсызбы, ${newLeadForm.name}! Биз Сиз тандаган ${newLeadForm.preferredCar} унаасы боюнча маалыматтарды даярдап койдук. AutoHub менеджери байланышта. Качан тест-драйв кылалы?`,
        sms: `AutoHub: ${newLeadForm.name}, predlozhenie po ${newLeadForm.preferredCar} dlya vas gotovo. Tel: +996555001122`,
        email: `Здравствуйте, ${newLeadForm.name}!\n\nСпасибо за ваш интерес к автосалону AutoHub Kyrgyzstan. Мы рады предложить вам великолепный вариант ${newLeadForm.preferredCar}, соответствующий вашему бюджету в $${budgetVal.toLocaleString()}.\n\nНаш кредитный инспектор готов провести экспресс-одобрение за 10 минут.\n\nС уважением,\nОтдел продаж AutoHub.`
      },
      negotiation: {
        discountRecommend: `Permit up to 2.5% discount ($${Math.floor(budgetVal * 0.025).toLocaleString()}) to facilitate closing.`,
        strategy: "Focus on vehicle rarity, pristine imported condition, and full warranty coverage options.",
        suggestedPrice: budgetVal,
        minAcceptablePrice: Math.floor(budgetVal * 0.95),
        closingTips: [
          "Urge booking a test drive immediately to secure the stock.",
          "Present trade-in convenience as a time-saving solution."
        ]
      }
    };

    setLeads(prev => [newCreatedLead, ...prev]);
    setSelectedLeadId(newCreatedLead.id);
    setShowAddLeadModal(false);
    // Reset Form
    setNewLeadForm({
      name: '',
      phone: '',
      status: 'new',
      preferredCar: '',
      budget: '',
      source: 'Direct Walk-in'
    });
    showToast("New Lead successfully added & evaluated by AutoHub AI!");
  };

  // Switch region modifier for KPI cards
  const regionalMetrics = useMemo(() => {
    let multiplier = 1;
    if (selectedRegion === 'Bishkek') multiplier = 0.65;
    else if (selectedRegion === 'Osh') multiplier = 0.25;
    else if (selectedRegion === 'Jalal-Abad') multiplier = 0.10;

    return {
      dailySales: Math.floor(PERFORMANCE_DATA.dailySales * multiplier),
      weeklySales: Math.floor(PERFORMANCE_DATA.weeklySales * multiplier),
      monthlySales: Math.floor(PERFORMANCE_DATA.monthlySales * multiplier),
      salesTarget: Math.floor(PERFORMANCE_DATA.salesTarget * multiplier),
      achievement: selectedRegion === 'All' ? PERFORMANCE_DATA.targetAchievement : Math.min(100, Math.floor(PERFORMANCE_DATA.targetAchievement * (0.9 + Math.random() * 0.2)))
    };
  }, [selectedRegion]);

  const handlePrintReport = () => {
    window.print();
  };

  // Translations Map
  const t = useMemo(() => {
    return {
      RU: {
        title: "AI Менеджер Продаж",
        subtitle: "Интеллектуальная панель управления продажами и лидами | AutoHub Kyrgyzstan",
        add_lead: "Добавить лид",
        lead_list: "Список лидов",
        new_leads: "Новые",
        hot_leads: "Горячие",
        warm_leads: "Теплые",
        cold_leads: "Холодные",
        vip_leads: "VIP",
        lost_leads: "Утерянные",
        lead_score: "AI Скоринг лида",
        closing_prob: "Вероятность сделки",
        purchase_intent: "Намерение купить",
        expected_date: "Ожидаемая дата",
        deal_val: "Сумма сделки",
        recommendation: "AI Рекомендации для клиента",
        best_car: "Рекомендуемый авто",
        alt_car: "Альтернативы",
        financing: "Лизинг / Кредит",
        trade_in: "Рекомендация Trade-In",
        vip_offer: "Персональное VIP-предложение",
        follow_up: "AI Ассистент сопровождения",
        copy_wa: "Копировать WhatsApp",
        copy_sms: "Копировать SMS",
        copy_email: "Копировать Email",
        negotiation: "AI Переговоры и Скидки",
        discount: "Рекомендуемая скидка",
        strategy: "Стратегия убеждения",
        suggested_price: "Рекомендованная цена",
        min_price: "Минимальный порог",
        closing_tips: "Советы для закрытия сделки",
        performance: "AI Показатели Продаж дилерского центра",
        sales_forecast: "AI Прогноз продаж на следующий период",
        expected_revenue: "Ожидаемая выручка",
        popular_brands: "Популярность брендов",
        popular_models: "Лидеры спроса",
        market_opp: "Рыночные возможности",
        executive_report: "Эксклюзивный AI-Отчет",
        print: "Печать отчета",
        region: "Регион",
        target_achieved: "Выполнение плана",
        best_agent: "Лучший продавец",
        best_hub: "Флагманский хаб",
        cust_sat: "Индекс удовлетворенности",
        avg_days: "Средний цикл сделки",
        days: "дн.",
        back: "В каталог"
      },
      KG: {
        title: "AI Сатуу менеджери",
        subtitle: "Сатууну жана кардарларды интеллектуалдык башкаруу панели | AutoHub Kyrgyzstan",
        add_lead: "Жаңы кардар кошуу",
        lead_list: "Кардарлардын тизмеси",
        new_leads: "Жаңы",
        hot_leads: "Жигердүү",
        warm_leads: "Жылуу",
        cold_leads: "Муздак",
        vip_leads: "VIP",
        lost_leads: "Жоготулган",
        lead_score: "AI Кардардын скоринги",
        closing_prob: "Сатуу ыктымалдыгы",
        purchase_intent: "Сатып алуу ниети",
        expected_date: "Болжолдуу күнү",
        deal_val: "Келишим баасы",
        recommendation: "Кардар үчүн AI сунуштары",
        best_car: "Сунушталган унаа",
        alt_car: "Башка унаалар",
        financing: "Лизинг / Насыя",
        trade_in: "Trade-In сунушу",
        vip_offer: "Персоналдык VIP-сунуш",
        follow_up: "AI Байланыш жардамчысы",
        copy_wa: "WhatsApp көчүрүү",
        copy_sms: "SMS көчүрүү",
        copy_email: "Email көчүрүү",
        negotiation: "AI Сүйлөшүү жана Арзандатуулар",
        discount: "Сунушталган арзандатуу",
        strategy: "Ынандыруу стратегиясы",
        suggested_price: "Сунушталган баа",
        min_price: "Минималдуу баа",
        closing_tips: "Келишимди бүтүрүү кеңештери",
        performance: "Дилердик борбордун AI сатуу көрсөткүчтөрү",
        sales_forecast: "Кийинки мезгилге AI сатуу божомолу",
        expected_revenue: "Болжолдуу киреше",
        popular_brands: "Бренддердин популярдуулугу",
        popular_models: "Эң көп суралган моделдер",
        market_opp: "Рыноктук мүмкүнчүлүктөр",
        executive_report: "Эксклюзивдүү AI-Отчет",
        print: "Басып чыгаруу",
        region: "Аймак",
        target_achieved: "Планды аткаруу",
        best_agent: "Мыкты сатуучу",
        best_hub: "Флагмандык хаб",
        cust_sat: "Кардарлардын канааттануусу",
        avg_days: "Орточо келишим убактысы",
        days: "күн",
        back: "Каталогко"
      },
      EN: {
        title: "AI Sales Manager",
        subtitle: "Executive Sales & Lead Intelligence Dashboard | AutoHub Kyrgyzstan",
        add_lead: "Add Lead",
        lead_list: "Lead Directory",
        new_leads: "New",
        hot_leads: "Hot",
        warm_leads: "Warm",
        cold_leads: "Cold",
        vip_leads: "VIP",
        lost_leads: "Lost",
        lead_score: "AI Lead Score",
        closing_prob: "Closing Probability",
        purchase_intent: "Purchase Intention",
        expected_date: "Expected Date",
        deal_val: "Deal Value",
        recommendation: "AI Customer Recommendations",
        best_car: "Best Vehicle",
        alt_car: "Alternatives",
        financing: "Financing Options",
        trade_in: "Trade-In Advice",
        vip_offer: "Personalized VIP Offer",
        follow_up: "AI Follow-Up Assistant",
        copy_wa: "Copy WhatsApp",
        copy_sms: "Copy SMS",
        copy_email: "Copy Email",
        negotiation: "AI Negotiation & Pricing",
        discount: "Recommended Discount",
        strategy: "Negotiation Strategy",
        suggested_price: "Suggested Price",
        min_price: "Floor Price",
        closing_tips: "Closing Tips",
        performance: "Dealership AI Sales Metrics",
        sales_forecast: "AI Sales Forecasting",
        expected_revenue: "Expected Revenue",
        popular_brands: "Brand Market Share",
        popular_models: "High-Demand Models",
        market_opp: "Market Opportunities",
        executive_report: "AI Executive Report",
        print: "Print Report",
        region: "Region",
        target_achieved: "Quota Achieved",
        best_agent: "Top Performer",
        best_hub: "Flagship Hub",
        cust_sat: "Customer Satisfaction",
        avg_days: "Avg Days to Close",
        days: "days",
        back: "To Catalog"
      }
    }[lang];
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#070a13] text-white font-sans antialiased selection:bg-[#0B3D91] selection:text-white pb-24 pt-28 px-4 sm:px-6 lg:px-8">
      {/* Visual Ambient Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(11,61,145,0.14),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#0B3D91]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Outer Layout */}
      <div className="max-w-7xl mx-auto space-y-8 relative">
        
        {/* Dynamic Notification Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-blue-600 border border-blue-400 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center space-x-2.5 text-[#5D9CEC] text-sm font-semibold tracking-wider uppercase mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AutoHub Executive CRM Suite</span>
            </div>
            <h1 id="executive-crm-title" className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#5D9CEC] bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
              {t.subtitle}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <button 
              onClick={onBackToCatalog}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-sm font-medium transition-all flex items-center space-x-2"
              id="crm-back-to-catalog"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>{t.back}</span>
            </button>
            <button 
              onClick={handlePrintReport}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white text-sm font-semibold transition-all flex items-center space-x-2 shadow-lg shadow-blue-600/20 border border-blue-500/20"
              id="print-crm-executive-report"
            >
              <Printer className="w-4 h-4" />
              <span>{t.print}</span>
            </button>
          </div>
        </div>

        {/* REGIONAL FILTER CONTROLLER & QUICK METRIC HIGHLIGHTS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#0d1222] border border-white/10 p-4 rounded-2xl">
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-[#5D9CEC]" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t.region}:</span>
            <div className="flex bg-black/40 rounded-xl p-1 gap-1 border border-white/5">
              {(['All', 'Bishkek', 'Osh', 'Jalal-Abad'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    setSelectedRegion(reg);
                    showToast(`Switched executive viewing region to: ${reg}`);
                  }}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                    selectedRegion === reg 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {reg === 'All' ? (lang === 'RU' ? 'Все' : lang === 'KG' ? 'Баары' : 'All') : reg}
                </button>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-gray-400 flex items-center space-x-2 font-mono">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span>AI ENGINE LOCAL MODE ACTIVE • NO EXTERNAL APIS • 2026</span>
          </div>
        </div>

        {/* METRICS ROW (6. AI Sales Performance) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-b from-[#11162d] to-[#0d1222] border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-[#5D9CEC]/30 transition-all shadow-xl">
            <div className="absolute right-3 top-3 p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
              {lang === 'RU' ? 'Выручка за месяц' : lang === 'KG' ? 'Айлык киреше' : 'Monthly Sales'}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2 block">
              ${regionalMetrics.monthlySales.toLocaleString()}
            </span>
            <div className="mt-2.5 flex items-center text-[11px] text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
              <span>+14.2% {lang === 'RU' ? 'к прошл. месяцу' : lang === 'KG' ? 'өткөн айга салышт.' : 'vs last month'}</span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#11162d] to-[#0d1222] border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-xl">
            <div className="absolute right-3 top-3 p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
              {t.target_achieved}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2 block">
              {regionalMetrics.achievement}%
            </span>
            <div className="mt-2.5 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000" 
                style={{ width: `${regionalMetrics.achievement}%` }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#11162d] to-[#0d1222] border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all shadow-xl">
            <div className="absolute right-3 top-3 p-1.5 bg-amber-500/10 rounded-lg text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
              {t.best_agent}
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight mt-2 block truncate">
              {PERFORMANCE_DATA.bestSalesperson.name}
            </span>
            <div className="mt-1 flex items-center justify-between text-[11px] text-gray-400">
              <span>{PERFORMANCE_DATA.bestSalesperson.deals} {lang === 'RU' ? 'сделок' : lang === 'KG' ? 'келишим' : 'deals'}</span>
              <span className="text-amber-400 font-semibold">${PERFORMANCE_DATA.bestSalesperson.revenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#11162d] to-[#0d1222] border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all shadow-xl">
            <div className="absolute right-3 top-3 p-1.5 bg-purple-500/10 rounded-lg text-purple-400">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
              {t.best_hub}
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight mt-2 block truncate">
              {PERFORMANCE_DATA.bestDealership}
            </span>
            <div className="mt-1 flex items-center justify-between text-[11px] text-purple-300 font-semibold">
              <span>★ {PERFORMANCE_DATA.customerSatisfaction} / 5.0 CSAT</span>
              <span>{PERFORMANCE_DATA.avgClosingTimeDays} {t.days}</span>
            </div>
          </div>
        </div>

        {/* CORE INTERACTIVE WORKSPACE: TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: 1. LEAD LIST & DIRECTORY (Col Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0d1222] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold tracking-tight">{t.lead_list}</h3>
                </div>
                <button 
                  onClick={() => setShowAddLeadModal(true)}
                  className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center space-x-1 shadow-md shadow-blue-500/15"
                  id="btn-add-lead-modal-trigger"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'RU' ? 'Добавить' : lang === 'KG' ? 'Кошуу' : 'Add'}</span>
                </button>
              </div>

              {/* SEARCH MINI */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={lang === 'RU' ? 'Поиск кардар...' : lang === 'KG' ? 'Кардар издөө...' : 'Search leads...'} 
                  value={leadSearchText}
                  onChange={(e) => setLeadSearchText(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:border-blue-500 focus:outline-none transition-all text-white font-medium"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* Lead filters */}
              <div className="flex flex-wrap gap-1 border-b border-white/5 pb-2">
                {(['all', 'new', 'hot', 'warm', 'cold', 'vip', 'lost'] as const).map((filter) => {
                  const isActive = leadFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setLeadFilter(filter)}
                      className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-all uppercase tracking-wider ${
                        isActive 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {filter === 'all' 
                        ? (lang === 'RU' ? 'Все' : lang === 'KG' ? 'Баары' : 'All') 
                        : filter}
                    </button>
                  );
                })}
              </div>

              {/* Directory Listing */}
              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-xs">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                    <span>No leads matched criteria</span>
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = lead.id === selectedLeadId;
                    const statusColorMap = {
                      new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                      hot: 'bg-red-500/10 text-red-400 border-red-500/20',
                      warm: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                      cold: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
                      vip: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                      lost: 'bg-white/5 text-gray-500 border-white/5'
                    };

                    return (
                      <button
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between relative ${
                          isSelected 
                            ? 'bg-gradient-to-r from-blue-950/40 to-blue-900/10 border-blue-500/60 shadow-lg shadow-blue-500/5' 
                            : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/5'
                        }`}
                        id={`lead-item-${lead.id}`}
                      >
                        <div className="space-y-1.5 max-w-[70%]">
                          <span className="font-bold text-xs block text-slate-100 truncate">{lead.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono block">{lead.preferredCar}</span>
                          <span className="text-[10px] text-blue-400 font-bold block">${lead.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-end space-y-1.5">
                          <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${statusColorMap[lead.status]}`}>
                            {lead.status}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500">★ {lead.score}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* QUICK INFORMATION PANEL ABOUT SALES STRATEGY */}
            <div className="bg-gradient-to-r from-blue-950/20 to-black/20 border border-white/5 rounded-2xl p-4 text-xs text-gray-400 space-y-2.5">
              <div className="flex items-center space-x-2 text-slate-200 font-bold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AutoHub AI Advisor Tips</span>
              </div>
              <p>
                {lang === 'RU' 
                  ? 'Электромобили BYD занимают более 38% запросов в Кыргызстане благодаря льготным таможенным пошлинам и дешевому электричеству.' 
                  : lang === 'KG' 
                  ? 'Электромобилдер бажы төлөмдөрү жана арзан электр энергиясынан улам Кыргызстанда суроо-талаптын 38% ашыгын түзөт.'
                  : 'BYD Electric vehicles occupy over 38% of luxury/mid-tier buyer inquiries in Kyrgyzstan due to friendly customs policies and low local utility costs.'}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: LEAD INTELLIGENCE PANELS (Col Span 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* MAIN ACTIVE LEAD DETAIL HEADER */}
            <div className="bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-5">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <h2 className="text-2xl font-extrabold text-white">{activeLead.name}</h2>
                    <span className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400 font-semibold font-mono">
                      {activeLead.source}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1 flex items-center space-x-4">
                    <span>{activeLead.phone}</span>
                    <span>•</span>
                    <span>{lang === 'RU' ? 'Интересует' : lang === 'KG' ? 'Кызыгуусу' : 'Interested in'}: <strong className="text-slate-200">{activeLead.preferredCar}</strong></span>
                  </div>
                </div>

                {/* Score visualization circular badge */}
                <div className="flex items-center space-x-3 bg-black/30 px-4 py-2 rounded-xl border border-white/5">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-widest">{t.lead_score}</span>
                    <span className="text-xs text-emerald-400 font-bold">
                      {activeLead.score >= 80 ? (lang === 'RU' ? 'Отличный лид' : lang === 'KG' ? 'Мыкты' : 'High Quality') : (lang === 'RU' ? 'Теплый лид' : lang === 'KG' ? 'Орто' : 'Standard')}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center font-bold text-sm text-emerald-400 bg-emerald-500/5 font-mono">
                    {activeLead.score}
                  </div>
                </div>
              </div>

              {/* 2. AI SALES PROBABILITY & DEAL SUMMARY METRICS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
                <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-gray-400 uppercase tracking-wider text-[10px] block">{t.closing_prob}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-extrabold text-white">{activeLead.probabilityValue}%</span>
                    <span className={`text-[9px] font-bold px-1 rounded ${
                      activeLead.probability === 'High' ? 'bg-emerald-500/10 text-emerald-400' :
                      activeLead.probability === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {activeLead.probability}
                    </span>
                  </div>
                </div>

                <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-gray-400 uppercase tracking-wider text-[10px] block">{t.purchase_intent}</span>
                  <span className="text-base font-extrabold text-[#5D9CEC] block">{activeLead.probability} Intention</span>
                </div>

                <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-gray-400 uppercase tracking-wider text-[10px] block">{t.expected_date}</span>
                  <span className="text-base font-extrabold text-slate-200 block font-mono">{activeLead.expectedDate}</span>
                </div>

                <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-gray-400 uppercase tracking-wider text-[10px] block">{t.deal_val}</span>
                  <span className="text-base font-extrabold text-emerald-400 block font-mono">${activeLead.dealValue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 3. AI CUSTOMER RECOMMENDATION MODULE */}
            <div className="bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-slate-200">
                <Sparkles className="w-5 h-5 text-[#5D9CEC]" />
                <h3 className="text-base font-bold tracking-tight">{t.recommendation}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-3">
                  <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[#5D9CEC] font-bold block">{t.best_car}</span>
                    <span className="text-sm font-bold text-slate-200">{activeLead.recommendations.bestVehicle}</span>
                  </div>

                  <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-gray-400 font-semibold block">{t.alt_car}</span>
                    <div className="flex flex-col gap-1">
                      {activeLead.recommendations.alternatives.map((alt, idx) => (
                        <span key={idx} className="text-slate-300 font-medium flex items-center">
                          <ChevronRight className="w-3 h-3 text-blue-500 mr-1" />
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-emerald-400 font-semibold block">{t.financing}</span>
                    <span className="text-slate-300">{activeLead.recommendations.financing}</span>
                  </div>

                  <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-amber-400 font-semibold block">{t.trade_in}</span>
                    <span className="text-slate-300">{activeLead.recommendations.tradeIn}</span>
                  </div>

                  <div className="bg-black/20 p-3.5 rounded-xl border border-[#5D9CEC]/15 space-y-1">
                    <span className="text-purple-400 font-semibold block">{t.vip_offer}</span>
                    <span className="text-slate-300 font-medium italic">{activeLead.recommendations.vipOffer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. AI FOLLOW-UP ASSISTANT MODULE */}
            <div className="bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-200">
                  <PhoneCall className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold tracking-tight">{t.follow_up}</h3>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-mono">
                  <span>{lang === 'RU' ? 'След. контакт' : lang === 'KG' ? 'Кийинки байланыш' : 'Next Follow-up'}:</span>
                  <span className="bg-blue-600/15 text-blue-400 px-2 py-0.5 rounded font-bold">{activeLead.followUp.date}</span>
                </div>
              </div>

              {/* Call reminders / talking points */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-2 text-xs">
                <span className="text-[#5D9CEC] font-bold block">{lang === 'RU' ? 'План телефонного звонка' : lang === 'KG' ? 'Чалуу планы' : 'Phone Call Talking Points'}</span>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  {activeLead.followUp.callPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Copyable Message templates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center">
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        WhatsApp
                      </span>
                      <button 
                        onClick={() => copyToClipboard(activeLead.followUp.whatsapp, "WhatsApp")}
                        className="text-gray-400 hover:text-white p-1 rounded"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-3 select-all font-mono leading-relaxed bg-black/20 p-2 rounded">
                      {activeLead.followUp.whatsapp}
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Simulated sending WhatsApp via local CRM client!")}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider transition-all"
                  >
                    {lang === 'RU' ? 'Отправить в WA' : lang === 'KG' ? 'WA жиберүү' : 'Send WhatsApp'}
                  </button>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5D9CEC] flex items-center">
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        SMS Template
                      </span>
                      <button 
                        onClick={() => copyToClipboard(activeLead.followUp.sms, "SMS")}
                        className="text-gray-400 hover:text-white p-1 rounded"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-3 select-all font-mono leading-relaxed bg-black/20 p-2 rounded">
                      {activeLead.followUp.sms}
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Simulated sending SMS template!")}
                    className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider transition-all"
                  >
                    {lang === 'RU' ? 'Отправить SMS' : lang === 'KG' ? 'SMS жиберүү' : 'Send SMS'}
                  </button>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1" />
                        Email Draft
                      </span>
                      <button 
                        onClick={() => copyToClipboard(activeLead.followUp.email, "Email")}
                        className="text-gray-400 hover:text-white p-1 rounded"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-3 select-all font-mono leading-relaxed bg-black/20 p-2 rounded">
                      {activeLead.followUp.email}
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Simulated sending Email draft!")}
                    className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider transition-all"
                  >
                    {lang === 'RU' ? 'Отправить Email' : lang === 'KG' ? 'Email жиберүү' : 'Send Email'}
                  </button>
                </div>
              </div>
            </div>

            {/* 5. AI NEGOTIATION ASSISTANT */}
            <div className="bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-slate-200">
                <Percent className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold tracking-tight">{t.negotiation}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                
                {/* Pricing constraints */}
                <div className="md:col-span-5 bg-black/20 p-4 rounded-xl border border-white/5 space-y-3.5">
                  <div>
                    <span className="text-gray-400 block mb-0.5">{t.discount}</span>
                    <span className="font-bold text-amber-400">{activeLead.negotiation.discountRecommend}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                    <div>
                      <span className="text-gray-400 block mb-0.5">{t.suggested_price}</span>
                      <span className="font-mono font-bold text-slate-200">${activeLead.negotiation.suggestedPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-0.5">{t.min_price}</span>
                      <span className="font-mono font-bold text-red-400">${activeLead.negotiation.minAcceptablePrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Negotiation and closing tips */}
                <div className="md:col-span-7 space-y-3.5">
                  <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                    <span className="text-[#5D9CEC] font-bold block mb-1">{t.strategy}</span>
                    <p className="text-slate-300 font-medium leading-relaxed">{activeLead.negotiation.strategy}</p>
                  </div>

                  <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                    <span className="text-emerald-400 font-bold block mb-1">{t.closing_tips}</span>
                    <ul className="space-y-1 text-slate-300">
                      {activeLead.negotiation.closingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 7. AI SALES FORECAST & MARKET ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Forecast Area Chart (Col Span 7) */}
          <div className="lg:col-span-7 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#5D9CEC]" />
                <h3 className="text-base font-bold tracking-tight">{t.sales_forecast}</h3>
              </div>
              <span className="text-xs text-gray-400 font-mono">Q3/Q4 Predictions</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={MONTHLY_FORECAST}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d1222', borderColor: '#334155', color: '#fff' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="actual" name={lang === 'RU' ? 'Факт ($)' : lang === 'KG' ? 'Чыныгы сатуу ($)' : 'Actual Sales ($)'} stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
                  <Area type="monotone" dataKey="predicted" name={lang === 'RU' ? 'AI Прогноз ($)' : lang === 'KG' ? 'AI Болжолдоо ($)' : 'AI Prediction ($)'} stroke="#8b5cf6" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Micro Seasonal Note */}
            <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 text-xs text-gray-400 leading-relaxed">
              <strong className="text-slate-200 block mb-0.5">Seasonal & Market Trend Alert:</strong>
              {lang === 'RU' 
                ? 'Ожидается пиковый спрос на полноприводные кроссоверы в сентябре-октябре перед наступлением зимнего сезона. Рекомендуется увеличить квоту импорта Toyota RAV4 и Lexus RX из Дубая на 15%.' 
                : lang === 'KG' 
                ? 'Кышкы сезондун алдында сентябрь-октябрь айларында толук жетектүү кроссоверлерге суроо-талаптын туу чокусу күтүлүүдө. Дубайдан Toyota RAV4 жана Lexus RX импорттоонун квотасын 15% га көбөйтүү сунушталат.'
                : 'A surge in 4WD SUV demand is forecasted for September-October prior to mountain winter conditions. Sales division is advised to increase Lexus LX and Toyota RAV4 import quotas by 15% immediately.'}
            </div>
          </div>

          {/* Popular brands share & demand models (Col Span 5) */}
          <div className="lg:col-span-5 bg-[#0d1222] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold tracking-tight">{t.popular_brands}</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-white/5 pb-4">
              {/* Pie Chart */}
              <div className="w-28 h-28 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={POPULAR_BRANDS_SHARE}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={45}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {POPULAR_BRANDS_SHARE.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legends details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] w-full">
                {POPULAR_BRANDS_SHARE.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center text-gray-400">
                      <span className="w-2 h-2 rounded-full inline-block mr-1.5" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-mono font-bold text-slate-100">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular models high-demand */}
            <div className="space-y-3">
              <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">{t.popular_models}</span>
              
              <div className="space-y-2">
                {POPULAR_MODELS.map((item, idx) => (
                  <div key={idx} className="bg-black/20 px-3.5 py-2 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200 block">{item.model}</span>
                      <span className="text-[10px] text-gray-500 font-medium">Monthly Active Demand</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold block text-[#5D9CEC]">{item.sales} sold</span>
                      <span className="text-[9px] text-emerald-400 font-bold block">{item.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 8. AI EXECUTIVE EXECUTIVE REPORT (FULLY PRINTABLE DESIGN INTEGRATED) */}
        <div className="bg-gradient-to-r from-blue-950/30 to-slate-900/40 border-2 border-dashed border-[#5D9CEC]/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#0B3D91]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-[#5D9CEC] text-[10px] font-extrabold uppercase tracking-widest">
                <Award className="w-3 h-3 text-amber-400 animate-bounce" />
                <span>Executive Ready</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">{t.executive_report}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {lang === 'RU'
                  ? 'Сгенерируйте и распечатайте комплексный стратегический бизнес-отчет по лидам, прогнозной аналитике продаж и рыночным трендам дилерского центра. Документ оптимизирован под книжный формат A4.'
                  : lang === 'KG'
                  ? 'Кардарлар боюнча стратегиялык бизнес-отчетту, сатууну болжолдоону жана рыноктук тренддерди түзүп, басып чыгарыңыз. Документ А4 форматына толугу менен ылайыкташтырылган.'
                  : 'Compile and download a comprehensive high-level performance report detailing corporate dealership leads, closing velocities, revenue forecasts, and AI recommendations. Styled perfectly for executive C-suite meetings.'}
              </p>
            </div>

            <button 
              onClick={handlePrintReport}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 border border-blue-400/20"
              id="btn-print-executive-pdf"
            >
              <Printer className="w-4 h-4" />
              <span>{t.print}</span>
            </button>
          </div>
        </div>

      </div>

      {/* DETAILED PRINTABLE STYLES OVERLAY FOR SCREEN/A4 EXPORT */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .min-h-screen, .max-w-7xl, #executive-crm-title, .bg-gradient-to-r, .bg-[#0d1222], .bg-[#070a13] {
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          button, header, footer, nav, .absolute, .toast, #btn-add-lead-modal-trigger, #crm-back-to-catalog, #print-crm-executive-report, #btn-print-executive-pdf {
            display: none !important;
          }
          .custom-scrollbar {
            max-height: none !important;
            overflow: visible !important;
          }
          h1, h2, h3, span, p, div, li, strong {
            color: black !important;
          }
          .border {
            border: 1px solid #ddd !important;
          }
        }
      `}</style>

      {/* ADD LEAD MODAL DIALOG */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0d1222] border border-white/15 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>{lang === 'RU' ? 'Добавить нового клиента' : lang === 'KG' ? 'Жаңы кардар кошуу' : 'Add New Client Prospect'}</span>
              </h3>
              <button 
                onClick={() => setShowAddLeadModal(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">{lang === 'RU' ? 'ФИО Клиента *' : lang === 'KG' ? 'Аты-жөнү *' : 'Client Full Name *'}</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Аскар Салиев"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  id="modal-input-name"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">{lang === 'RU' ? 'Номер телефона' : lang === 'KG' ? 'Телефон номери' : 'Phone Number'}</label>
                <input 
                  type="text" 
                  placeholder="e.g. +996 (550) 12-34-56"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  id="modal-input-phone"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">{lang === 'RU' ? 'Статус лида *' : lang === 'KG' ? 'Кардардын статусу *' : 'Lead Status *'}</label>
                  <select 
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm(prev => ({ ...prev, status: e.target.value as Lead['status'] }))}
                    className="w-full bg-[#0d1222] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    id="modal-select-status"
                  >
                    <option value="new">New</option>
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">{lang === 'RU' ? 'Источник лида' : lang === 'KG' ? 'Каяктан келди' : 'Lead Source'}</label>
                  <input 
                    type="text" 
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    id="modal-input-source"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">{lang === 'RU' ? 'Интересует модель *' : lang === 'KG' ? 'Кызыккан модели *' : 'Preferred Model *'}</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Toyota RAV4 Hybrid 2021"
                  value={newLeadForm.preferredCar}
                  onChange={(e) => setNewLeadForm(prev => ({ ...prev, preferredCar: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  id="modal-input-car"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">{lang === 'RU' ? 'Бюджет в долларах ($) *' : lang === 'KG' ? 'Унаа бюджети ($) *' : 'Budget in USD ($) *'}</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 24000"
                  value={newLeadForm.budget}
                  onChange={(e) => setNewLeadForm(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  id="modal-input-budget"
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 font-bold transition-all"
                >
                  {lang === 'RU' ? 'Отмена' : lang === 'KG' ? 'Жокко чыгаруу' : 'Cancel'}
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/15"
                  id="btn-modal-add-lead-submit"
                >
                  {lang === 'RU' ? 'Оценить и Добавить' : lang === 'KG' ? 'Баалоо жана Кошуу' : 'Evaluate & Add'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
