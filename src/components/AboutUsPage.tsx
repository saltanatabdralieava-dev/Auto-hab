import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Car, 
  Shield, 
  Award, 
  Users, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  MessageSquare, 
  ArrowLeft, 
  Briefcase, 
  Heart, 
  Zap, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface TeamMember {
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

interface AboutUsPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onBackToCatalog: () => void;
  onNavigateToView?: (view: string) => void;
  teamMembers: TeamMember[];
}

export function AboutUsPage({ lang, onBackToCatalog, onNavigateToView, teamMembers }: AboutUsPageProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'exec' | 'tech' | 'sales'>('all');

  const t = {
    title: {
      RU: 'О компании AutoHub',
      KG: 'AutoHub компаниясы жөнүндө',
      EN: 'About AutoHub Kyrgyzstan'
    },
    subtitle: {
      RU: 'Лидер цифрового автоимпорта и стандартов качества в Кыргызской Республике',
      KG: 'Кыргыз Республикасындагы санариптик автоимпорттун жана сапат стандарттарынын лидери',
      EN: 'The leader in digital vehicle import and quality standards in the Kyrgyz Republic'
    },
    directorTitle: {
      RU: 'Генеральный директор',
      KG: 'Башкы директор',
      EN: 'General Director'
    },
    directorQuote: {
      RU: '«Мы строим не просто автопортал. Мы создаем прозрачную, безопасную и высокотехнологичную экосистему в Кыргызстане, основанную на доверии, искусственном интеллекте и бескомпромиссном качестве каждого импортированного автомобиля.»',
      KG: '«Биз жөн гана унаа порталын курбайбыз. Биз Кыргызстанда ишенимге, жасалма интеллектке жана ар бир импорттолгон унаанын кынтыксыз сапатына негизделген ачык-айкын, коопсуз жана жогорку технологиялык экосистеманы түзүп жатабыз.»',
      EN: '"We are building more than just an auto portal. We are creating a transparent, secure, and highly technological ecosystem in Kyrgyzstan, founded on trust, artificial intelligence, and the uncompromising quality of every imported vehicle."'
    },
    mission: {
      RU: 'Наша миссия',
      KG: 'Биздин миссия',
      EN: 'Our Mission'
    },
    missionText: {
      RU: 'Сделать процесс выбора, проверки и покупки автомобиля из любой точки мира максимально простым, технологичным и защищенным для каждого жителя Кыргызстана.',
      KG: 'Ар бир Кыргызстандын жашоочусу үчүн дүйнөнүн каалаган булуң-бурчунан унаа тандоо, текшерүү жана сатып алуу процессин мүмкүн болушунча жөнөкөй, технологиялык жана коопсуз кылуу.',
      EN: 'To make the process of choosing, verifying, and purchasing a car from anywhere in the world as simple, tech-enabled, and secure as possible for every resident of Kyrgyzstan.'
    },
    vision: {
      RU: 'Наше видение',
      KG: 'Биздин көрүнүш',
      EN: 'Our Vision'
    },
    visionText: {
      RU: 'Трансформировать автомобильный рынок Средней Азии через внедрение передовых AI-советников, прозрачную логистику и комплексную техническую экспертизу.',
      KG: 'Өнүккөн жасалма интеллект кеңешчилерин, ачык логистиканы жана комплекстүү техникалык экспертизаны киргизүү аркылуу Орто Азиянын автоунаа рыногун өзгөртүү.',
      EN: 'To transform the Central Asian automotive market through the integration of advanced AI advisors, transparent logistics, and comprehensive technical inspection.'
    },
    values: {
      RU: 'Наши ценности',
      KG: 'Биздин баалуулуктар',
      EN: 'Our Core Values'
    },
    teamTitle: {
      RU: 'Наша команда экспертов',
      KG: 'Биздин эксперттердин командасы',
      EN: 'Our Team of Experts'
    },
    teamSubtitle: {
      RU: 'Профессионалы, обеспечивающие бескомпромиссное качество услуг на каждом этапе — от инспекции до выдачи ключей.',
      KG: 'Ар бир этапта — текшерүүдөн баштап ачкычты тапшырууга чейин кынтыксыз сапатты камсыз кылган адистер.',
      EN: 'Professionals delivering uncompromising service quality at every step — from inspection to handing over the keys.'
    },
    btnBack: {
      RU: 'Назад в каталог',
      KG: 'Каталогго кайтуу',
      EN: 'Back to Catalog'
    },
    allCats: {
      RU: 'Все специалисты',
      KG: 'Бардык адистер',
      EN: 'All Specialists'
    },
    execCat: {
      RU: 'Руководство',
      KG: 'Жетекчилик',
      EN: 'Management'
    },
    techCat: {
      RU: 'Технический контроль',
      KG: 'Техникалык көзөмөл',
      EN: 'Technical Audit'
    },
    salesCat: {
      RU: 'Продажи и клиентский сервис',
      KG: 'Сатуу жана кардарларды тейлөө',
      EN: 'Sales & Service'
    },
    experience: {
      RU: 'Опыт работы:',
      KG: 'Иш тажрыйбасы:',
      EN: 'Experience:'
    },
    portfolio: {
      RU: 'Ключевые достижения:',
      KG: 'Негизги жетишкендиктери:',
      EN: 'Key Achievements:'
    },
    skills: {
      RU: 'Навыки & Компетенции:',
      KG: 'Көндүмдөр & Компетенциялар:',
      EN: 'Skills & Competencies:'
    },
    contactBtn: {
      RU: 'Связаться напрямую',
      KG: 'Түз байланышуу',
      EN: 'Contact Directly'
    },
    journeyTitle: {
      RU: 'Наш путь к лидерству',
      KG: 'Лидерликке болгон жолубуз',
      EN: 'Our Journey to Leadership'
    },
    infrastructureTitle: {
      RU: 'Глобальная цепочка поставок',
      KG: 'Глобалдык жеткирүү чынжырчасы',
      EN: 'Global Supply Chain'
    }
  };

  const statCards = [
    {
      value: '5,000+',
      label: { RU: 'Импортированных авто', KG: 'Импорттолгон унаалар', EN: 'Cars Imported' },
      icon: <Car className="w-6 h-6 text-blue-400" />,
      desc: { RU: 'Доставлено в Кыргызстан в идеальном состоянии', KG: 'Кыргызстанга эң сонун абалда жеткирилди', EN: 'Delivered in pristine condition to KG' }
    },
    {
      value: '100%',
      label: { RU: 'Юридическая чистота', KG: 'Юридикалык тазалык', EN: 'Legal Guarantee' },
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      desc: { RU: 'Полная проверка истории по VIN базам США/Японии/Кореи', KG: 'АКШ/Япония/Корея VIN маалымат базасынан толук текшерүү', EN: 'Comprehensive history report and VIN check' }
    },
    {
      value: '24/7',
      label: { RU: 'Цифровой трекинг', KG: 'Санариптик трекинг', EN: 'Digital Tracking' },
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      desc: { RU: 'Отслеживание судна и авто на каждом этапе пути', KG: 'Ар бир этапта кемени жана унааны көзөмөлдөө', EN: 'Real-time vessel and container monitoring' }
    },
    {
      value: '150+',
      label: { RU: 'Дилеров-партнеров', KG: 'Өнөктөш дилерлер', EN: 'Dealer Partners' },
      icon: <Users className="w-6 h-6 text-purple-400" />,
      desc: { RU: 'Доверяют нашей B2B платформе автоматизации импорта', KG: 'Импортту автоматташтыруу үчүн B2B платформабызга ишенишет', EN: 'Trust our specialized B2B CRM and logistics engine' }
    }
  ];

  const valuePoints = [
    {
      title: { RU: 'Безупречная Репутация', KG: 'Кынтыксыз Репутация', EN: 'Impeccable Reputation' },
      desc: { RU: 'Каждый договор имеет абсолютную юридическую силу с гарантией сроков и конечной стоимости авто.', KG: 'Ар бир келишим мөөнөттөрдүн жана акыркы баанын кепилдиги менен юридикалык күчкө ээ.', EN: 'Every contract is legally binding with solid delivery timelines and fixed final costs.' },
      icon: <Award className="w-5 h-5 text-amber-400" />
    },
    {
      title: { RU: 'Инновации и ИИ', KG: 'Инновациялар жана ЖИ', EN: 'Innovation & AI' },
      desc: { RU: 'Использование AI-советников и интеллектуальной системы подбора автомобилей снижает риск ошибок до нуля.', KG: 'Унаа тандоодо жасалма интеллектти колдонуу каталардын тобокелдигин нөлгө түшүрөт.', EN: 'AI Advisors and smart diagnostics algorithms eliminate vehicle acquisition errors.' },
      icon: <Zap className="w-5 h-5 text-blue-400" />
    },
    {
      title: { RU: 'Глобальный Охват', KG: 'Глобалдык Камтуу', EN: 'Global Reach' },
      desc: { RU: 'Официальный доступ к закрытым аукционам США, Кореи, Китая, Японии и Европы без посредников.', KG: 'АКШ, Корея, Кытай, Япония жана Европанын жабык аукциондоруна ортомчусуз расмий кирүү мүмкүнчүлүгү.', EN: 'Direct connection to exclusive dealer networks and auto actions worldwide.' },
      icon: <Globe className="w-5 h-5 text-teal-400" />
    }
  ];

  const timelineSteps = [
    {
      year: '2019',
      title: { RU: 'Основание компании', KG: 'Компаниянын негизделиши', EN: 'Foundation' },
      desc: { RU: 'Аскар открывает первый офис AutoHub в Бишкеке с командой из 3 человек. Первые поставки из Кореи и Японии.', KG: 'Аскар Бишкекте 3 кишиден турган команда менен алгачкы офисин ачат. Корея жана Япониядан биринчи унааларды импорттоо.', EN: 'Askar opens the first AutoHub office in Bishkek with 3 employees. Initial imports from Japan and South Korea.' }
    },
    {
      year: '2021',
      title: { RU: 'Масштабирование и диджитализация', KG: 'Масштабдоо жана санариптештирүү', EN: 'Digital Transformation' },
      desc: { RU: 'Интеграция систем VIN-проверки и запуск прямого трекинга логистики. Объем импорта превышает 1,500 машин.', KG: 'Унааларды VIN аркылуу текшерүүнү интеграциялоо жана логистика трекингин ишке киргизүү. Импорт 1,500дөн ашат.', EN: 'Integration of real-time VIN verification databases and logistics tracking systems. Annual imports exceed 1,500 cars.' }
    },
    {
      year: '2023',
      title: { RU: 'B2B CRM Платформа и ИИ', KG: 'B2B CRM Платформасы жана ЖИ', EN: 'B2B Portal & AI Integration' },
      desc: { RU: 'Запуск интеллектуального модуля "AutoHub для Дилеров", внедрение AI-экспертов и автоматизации продаж.', KG: 'Өнөктөш дилерлер үчүн атайын системаны ишке киргизүү жана жасалма интеллект инструменттерин кошуу.', EN: 'Deployment of the "For Dealers" B2B suite, introducing AI core diagnostics and automated dealership sales modules.' }
    },
    {
      year: '2026',
      title: { RU: 'Абсолютное лидерство в КР', KG: 'КРдагы толук лидерлик', EN: 'Ecosystem Primacy' },
      desc: { RU: 'AutoHub — это технологическая экосистема №1 в Кыргызстане с штатом из 40+ специалистов и 5,000+ довольных владельцев.', KG: 'AutoHub — Кыргызстандагы 40тан ашык адис жана 5000ден ашык кардар ишенген №1 технологиялык экосистема.', EN: 'AutoHub stands as Kyrgyzstan’s premier tech-enabled automotive ecosystem with 40+ staff and 5,000+ clients.' }
    }
  ];

  const filterTeam = (member: TeamMember) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'exec') return member.id === 1 || member.id === 6; // Askar, Aizhan
    if (activeCategory === 'tech') return member.id === 2 || member.id === 3 || member.id === 4; // Nurlan, Azamat, Bekzat
    if (activeCategory === 'sales') return member.id === 5 || member.id === 7 || member.id === 8; // Aybek, Daniyar, Timur
    return true;
  };

  const filteredTeam = teamMembers.filter(filterTeam);

  return (
    <div className="bg-[#05070f] text-white min-h-screen selection:bg-blue-500 selection:text-white pb-24 overflow-hidden relative">
      {/* Background neon ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-[30%] right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] -z-10" />

      {/* HEADER CONTROLS (Floating glass bar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToCatalog}
            className="group flex items-center space-x-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 px-4.5 rounded-full border border-white/10 transition-all shadow-lg hover:scale-[1.02]"
            id="about-us-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>{t.btnBack[lang]}</span>
          </button>

          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue-400 font-bold bg-blue-500/5 px-4.5 py-1.5 rounded-full border border-blue-500/10">
            AUTOHUB • ABOUT COMPANY
          </span>
        </div>
      </div>

      {/* HERO SECTION — GENERAL DIRECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Large Premium Portrait of Askar */}
          <div className="lg:col-span-5 relative group">
            {/* Ambient gold-silver outline glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-500 rounded-3xl blur opacity-25 group-hover:opacity-45 transition duration-1000" />
            
            <div className="relative bg-[#0b0e1b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Aspect-ratio box with background skeleton */}
              <div className="aspect-[3/4] w-full relative">
                <img 
                  src="/src/assets/images/askar_portrait_1784628079290.jpg" 
                  alt="Askar - General Director of AutoHub Kyrgyzstan" 
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Frame Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent z-10" />
                
                {/* Director Name Tag Bottom Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-lg text-left">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                    {lang === 'RU' ? 'Аскар' : lang === 'KG' ? 'Аскар' : 'Askar'}
                  </h3>
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-1">
                    {t.directorTitle[lang]}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1.5 font-mono">
                    AutoHub Kyrgyzstan Founder • 15+ Yrs Exp
                  </p>
                </div>

                {/* Status Indicator Top Corner */}
                <div className="absolute top-4 right-4 z-20 bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-blue-400/30 flex items-center space-x-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  <span>{lang === 'RU' ? 'В ОФИСЕ' : lang === 'KG' ? 'ОФИСТЕ' : 'IN OFFICE'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Executive Manifesto */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-black tracking-[0.25em] uppercase text-blue-500">
                {lang === 'RU' ? 'ПОСЛАНИЕ РУКОВОДИТЕЛЯ' : lang === 'KG' ? 'ЖЕТЕКЧИНИН КАЙРЫЛУУСУ' : 'DIRECTOR’S MANIFESTO'}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
                {lang === 'RU' ? 'Эра Доверия и Инноваций' : lang === 'KG' ? 'Ишеним жана Инновация Эрасы' : 'The Era of Trust and Tech'}
              </h1>
              <p className="text-sm text-gray-300 font-light max-w-xl">
                {t.subtitle[lang]}
              </p>
            </div>

            {/* General Director quote block */}
            <div className="relative pl-6 border-l-2 border-gradient-to-b border-blue-500 py-2">
              <p className="text-base md:text-lg text-gray-100 font-medium italic leading-relaxed font-sans">
                {t.directorQuote[lang]}
              </p>
              
              {/* Askar Signature simulation */}
              <div className="mt-4 flex items-center space-x-3">
                <div className="w-8 h-[1px] bg-blue-500/40" />
                <span className="font-mono text-xs tracking-widest uppercase text-gray-400">
                  Askar, CEO & Founder
                </span>
              </div>
            </div>

            {/* Three key manifesto checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="p-1 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {lang === 'RU' ? 'Безопасность сделок' : lang === 'KG' ? 'Бүтүмдөрдүн коопсуздугу' : 'Secure Transactions'}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">
                    {lang === 'RU' ? 'Финансовые и юридические гарантии на каждом этапе.' : lang === 'KG' ? 'Ар бир этапта каржылык жана юридикалык кепилдиктер.' : 'Full financial and legal warranties on every transaction.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="p-1 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {lang === 'RU' ? 'Искусственный интеллект' : lang === 'KG' ? 'Жасалма интеллект' : 'AI-Driven Ecosystem'}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">
                    {lang === 'RU' ? 'Умная оценка, моментальный авто-диагноз и экспертный AI-советник.' : lang === 'KG' ? 'Жасалма интеллект сунуштоо жана заматта компьютердик баалоо.' : 'Instant auto-diagnostics and high-tech AI advisors.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions block */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onBackToCatalog}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02]"
              >
                {lang === 'RU' ? 'Посмотреть авто в наличии' : lang === 'KG' ? 'Унааларды көрүү' : 'View Available Cars'}
              </button>

              <a
                href="#contacts-section"
                onClick={(e) => {
                  e.preventDefault();
                  onBackToCatalog();
                  setTimeout(() => {
                    document.getElementById('contacts-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3.5 px-7 rounded-xl border border-white/10 transition-all hover:scale-[1.02]"
              >
                {lang === 'RU' ? 'Контакты офиса' : lang === 'KG' ? 'Байланыш даректери' : 'Office Contacts'}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* NUMERICAL MILESTONES (STATS GRID) */}
      <section className="bg-slate-950 border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statCards.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-left space-y-4 hover:border-blue-500/40 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-3xl font-black text-white leading-none">
                    {stat.value}
                  </h3>
                  <span className="text-xs font-bold text-gray-200 block">
                    {stat.label[lang]}
                  </span>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    {stat.desc[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION, VISION & VALUES (Bento Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Mission Box */}
          <div className="lg:col-span-6 bg-gradient-to-br from-blue-950/20 to-slate-950/50 p-8 sm:p-10 rounded-3xl border border-blue-500/15 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-600/20 transition-colors duration-500" />
            <div className="space-y-4">
              <span className="text-xs font-black tracking-widest uppercase text-blue-400 font-mono">01 / BRAND PURPOSE</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                {t.mission[lang]}
              </h2>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {t.missionText[lang]}
              </p>
            </div>
          </div>

          {/* Vision Box */}
          <div className="lg:col-span-6 bg-gradient-to-br from-indigo-950/20 to-slate-950/50 p-8 sm:p-10 rounded-3xl border border-indigo-500/15 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-600/20 transition-colors duration-500" />
            <div className="space-y-4">
              <span className="text-xs font-black tracking-widest uppercase text-indigo-400 font-mono">02 / FUTURISTIC SIGHT</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                {t.vision[lang]}
              </h2>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {t.visionText[lang]}
              </p>
            </div>
          </div>

          {/* Core Values Bento Row */}
          <div className="lg:col-span-12 bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-10 text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">
              {t.values[lang]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valuePoints.map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-display text-base font-bold text-white">
                    {item.title[lang]}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {item.desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TIMELINE: OUR ROAD TO LEADERSHIP */}
      <section className="bg-slate-950/80 border-t border-white/5 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-3 mb-16 text-center">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-blue-500 font-mono">
              {lang === 'RU' ? 'КАК МЫ РОСЛИ' : lang === 'KG' ? 'КАНТИП ӨСТҮК' : 'CHRONICLES OF GROWTH'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white">
              {t.journeyTitle[lang]}
            </h2>
          </div>

          {/* Timeline Node Chain */}
          <div className="relative mt-12">
            {/* Horizontal Line on Desktop / Vertical on Mobile */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 hidden lg:block z-0" />
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-white/10 lg:hidden z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative flex flex-col items-start lg:items-center text-left lg:text-center pl-12 lg:pl-0"
                >
                  {/* Pin Node */}
                  <div className="absolute left-4 lg:left-1/2 top-1 lg:-top-6 w-5 h-5 bg-blue-600 rounded-full border-4 border-slate-950 -translate-x-1/2 z-20 shadow-md shadow-blue-500/50" />
                  
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-full hover:border-blue-500/20 transition-all">
                    <span className="font-mono text-2xl font-black text-blue-400 block mb-2">
                      {step.year}
                    </span>
                    <h4 className="font-display text-sm font-bold text-white mb-2">
                      {step.title[lang]}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                      {step.desc[lang]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION (WITH DEPARTMENTS & INTERACTIVE POPUPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="space-y-4 mb-12 text-center">
          <span className="text-xs font-black tracking-[0.2em] uppercase text-blue-500 font-mono">
            {lang === 'RU' ? 'ЛЮДИ И ЭКСПЕРТИЗА' : lang === 'KG' ? 'АДИСТЕР ЖАНА ТАЖРЫЙБА' : 'ELITE HUMAN CAPITAL'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            {t.teamTitle[lang]}
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            {t.teamSubtitle[lang]}
          </p>

          {/* Department filter tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: 'all', label: t.allCats[lang] },
              { id: 'exec', label: t.execCat[lang] },
              { id: 'tech', label: t.techCat[lang] },
              { id: 'sales', label: t.salesCat[lang] }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setSelectedMember(null);
                }}
                className={`text-xs font-bold px-5 py-2.5 rounded-full border transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeam.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-[#0b0e1b] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-blue-500/40 transition-colors text-left"
              onClick={() => setSelectedMember(member)}
            >
              {/* Profile Image aspect-ratio */}
              <div className="aspect-square relative overflow-hidden bg-slate-900">
                <img 
                  src={member.image} 
                  alt={member.name[lang]} 
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.04] transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                
                {/* Float experience indicator */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[10px] text-blue-400 font-bold px-2.5 py-1 rounded-md border border-white/10">
                  {member.experience[lang]}
                </div>

                {/* Overlaid details summary on mobile/hover */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="font-display text-base font-bold tracking-tight">
                    {member.name[lang]}
                  </h3>
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block mt-0.5">
                    {member.position[lang]}
                  </span>
                </div>
              </div>

              {/* Skills miniatures */}
              <div className="p-4 space-y-3 bg-white/2">
                <div className="flex flex-wrap gap-1.5">
                  {member.skills[lang].slice(0, 3).map((skill, si) => (
                    <span key={si} className="text-[9px] font-mono font-bold bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-gray-300">
                      {skill}
                    </span>
                  ))}
                  {member.skills[lang].length > 3 && (
                    <span className="text-[9px] font-mono font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md">
                      +{member.skills[lang].length - 3}
                    </span>
                  )}
                </div>
                
                <span className="text-[10px] text-blue-400 font-bold group-hover:underline flex items-center space-x-1 justify-end">
                  <span>{lang === 'RU' ? 'Подробнее' : lang === 'KG' ? 'Кененирээк' : 'View Profile'}</span>
                  <span>→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DETAILED MEMBER DIALOG MODAL */}
        {selectedMember && (
          <div className="fixed inset-0 z-[1000] overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#0b0e1b] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-white/15 z-[1001] text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Column 1: Portrait Cover */}
                <div className="md:col-span-5 relative bg-slate-900 aspect-square md:aspect-auto md:min-h-[420px]">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name[lang]} 
                    className="w-full h-full object-cover object-center absolute inset-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0b0e1b] via-transparent to-transparent" />
                </div>

                {/* Column 2: Detailed Stats & Bio */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                        {selectedMember.position[lang]}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white mt-1">
                        {selectedMember.name[lang]}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {t.experience[lang]} <span className="text-white font-bold">{selectedMember.experience[lang]}</span>
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                      {selectedMember.bio[lang]}
                    </p>

                    {/* Portfolio / Milestones */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        {t.portfolio[lang]}
                      </span>
                      <ul className="space-y-1.5">
                        {selectedMember.portfolio[lang].map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-gray-200">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Full skills */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        {t.skills[lang]}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMember.skills[lang].map((skill, si) => (
                          <span key={si} className="text-[10px] font-mono font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="border-t border-white/10 pt-6 mt-6 flex items-center justify-between gap-4">
                    <span className="text-[10px] text-gray-400 font-mono">
                      ID: AH-{selectedMember.id.toString().padStart(3, '0')}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {selectedMember.linkedin && (
                        <a 
                          href={selectedMember.linkedin} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-9 h-9 bg-white/5 border border-white/10 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      
                      <a 
                        href={`https://wa.me/${selectedMember.whatsapp}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center space-x-1.5 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>

              {/* Close Button absolute */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-1.5 rounded-full border border-white/10 transition-colors z-20"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </section>

      {/* SUPPLY CHAIN / PARTNERS SECTION */}
      <section className="bg-slate-950 border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 mb-16">
            <span className="text-xs font-black tracking-[0.2em] uppercase text-blue-500 font-mono">
              {lang === 'RU' ? 'ГЛОБАЛЬНАЯ ЛОГИСТИКА' : 'ГЛОБАЛДЫК ТАШЫМАЛ'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
              {t.infrastructureTitle[lang]}
            </h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
              {lang === 'RU' ? 'Прямая связь с крупнейшими мировыми хабами позволяет нам поставлять автомобили быстрее и дешевле конкурентов.' 
                            : lang === 'KG' ? 'Биз дүйнөлүк ири хабдар менен түздөн-түз иштешебиз.' 
                            : 'Direct pipelines to global auto logistics networks and auctions allow fast transit.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { country: { RU: 'США', KG: 'АКШ', EN: 'USA' }, ports: 'New York / Texas / California', auctions: 'Copart / IAAI', glow: 'from-blue-600/10' },
              { country: { RU: 'Южная Корея', KG: 'Түштүк Корея', EN: 'South Korea' }, ports: 'Incheon / Busan', auctions: 'Encar / Glovis', glow: 'from-emerald-600/10' },
              { country: { RU: 'Япония', KG: 'Япония', EN: 'Japan' }, ports: 'Yokohama / Toyama', auctions: 'USS Auctions / CAA', glow: 'from-amber-600/10' },
              { country: { RU: 'Китай', KG: 'Кытай', EN: 'China' }, ports: 'Shenzhen / Urumqi', auctions: 'Official BYD & Geely', glow: 'from-red-600/10' }
            ].map((hub, hi) => (
              <div key={hi} className={`bg-[#0b0e1b] rounded-2xl p-6 border border-white/10 text-left space-y-3 hover:border-blue-500/20 transition-all bg-gradient-to-br ${hub.glow} to-transparent`}>
                <span className="text-xs font-bold text-white uppercase tracking-widest block">
                  {hub.country[lang]}
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-mono">LOGISTICS PORTS:</span>
                  <p className="text-xs text-gray-200 font-semibold">{hub.ports}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-mono">AUCTIONS / SOURCES:</span>
                  <p className="text-xs text-blue-400 font-bold">{hub.auctions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION B2B / B2C */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#0B3D91]/40 via-[#071E4A]/30 to-slate-950 rounded-3xl p-8 sm:p-12 border border-blue-500/25 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {lang === 'RU' ? 'Готовы начать сотрудничество?' : lang === 'KG' ? 'Кызматташууга даярсызбы?' : 'Ready to Start Cooperation?'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              {lang === 'RU' ? 'Свяжитесь с нами сегодня для получения бесплатного индивидуального расчета стоимости авто с доставкой в Бишкек или партнерства для дилеров.' 
                            : lang === 'KG' ? 'Бишкекке чейин унаа жеткирүүнүн баасын акысыз эсептөө үчүн биз менен байланышыңыз.' 
                            : 'Get a free premium quote for vehicle imports directly to Bishkek, or register for our B2B dealer automation suite.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <a
              href="#contacts-section"
              onClick={(e) => {
                e.preventDefault();
                onBackToCatalog();
                setTimeout(() => {
                  document.getElementById('contacts-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="bg-white text-[#0B3D91] hover:bg-gray-100 text-xs font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:scale-[1.02]"
            >
              {lang === 'RU' ? 'Заказать консультацию' : lang === 'KG' ? 'Кеңеш алуу' : 'Request Consultation'}
            </a>
            
            {onNavigateToView && (
              <button
                onClick={() => onNavigateToView('dealers')}
                className="bg-transparent hover:bg-white/5 text-white text-xs font-bold py-3.5 px-6 rounded-xl border border-white/20 transition-all hover:scale-[1.02]"
              >
                {lang === 'RU' ? 'Кабинет Дилерам' : lang === 'KG' ? 'Дилерлер бөлүмү' : 'Dealers Area'}
              </button>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
