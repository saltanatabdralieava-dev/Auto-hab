import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Calendar, Clock, MapPin, Truck, Ship, Anchor, ShieldAlert, CheckCircle, 
  ChevronRight, Compass, Settings, User, FileText, Share2, MessageCircle, 
  Plus, Edit3, Trash2, Send, ChevronDown, Check, Camera, RefreshCw, Eye, BellRing,
  Award, FileSpreadsheet, Package, AlertCircle, HelpCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderTrackingPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onNavigateToCalculator?: (tab?: string) => void;
  onNavigateToVinCheck?: (vin?: string) => void;
  onNavigateToOrderCar?: (carData?: any) => void;
}

// 14 Tracking stages interface
interface TrackingStage {
  id: number;
  name: string;
  nameKG: string;
  nameEN: string;
  status: 'completed' | 'current' | 'pending';
  date: string;
  time: string;
  responsibleDept: string;
  responsibleDeptKG: string;
  responsibleDeptEN: string;
  progressPercent: number;
  notes: string;
  notesKG: string;
  notesEN: string;
  photoUrl?: string;
}

interface OrderData {
  orderId: string;
  vin: string;
  phoneNumber: string;
  customerName: string;
  customerNameKG: string;
  customerNameEN: string;
  vehicleName: string;
  vehiclePhoto: string;
  paymentStatus: 'paid' | 'partial' | 'pending';
  paymentStatusKG: string;
  paymentStatusEN: string;
  estArrivalDate: string;
  remainingDays: number;
  shippingCompany: string;
  containerNumber: string;
  vesselName: string;
  departurePort: string;
  departurePortKG: string;
  departurePortEN: string;
  currentLocation: string;
  currentLocationKG: string;
  currentLocationEN: string;
  destinationCity: string;
  destinationCityKG: string;
  destinationCityEN: string;
  managerName: string;
  managerPhone: string;
  managerEmail: string;
  managerPhoto: string;
  stages: TrackingStage[];
  notifications: {
    id: string;
    title: string;
    titleKG: string;
    titleEN: string;
    message: string;
    messageKG: string;
    messageEN: string;
    timestamp: string;
    read: boolean;
  }[];
}

const DEFAULT_STAGES: TrackingStage[] = [
  {
    id: 1,
    name: 'Заказ принят',
    nameKG: 'Буйрутма кабыл алынды',
    nameEN: 'Order Received',
    status: 'completed',
    date: '2026-06-10',
    time: '10:30',
    responsibleDept: 'Департамент продаж',
    responsibleDeptKG: 'Сатуу бөлүмү',
    responsibleDeptEN: 'Sales Department',
    progressPercent: 5,
    notes: 'Договор подписан, предоплата получена. Подготовка к поиску автомобиля.',
    notesKG: 'Келишимге кол коюлду, алдын ала төлөм алынды. Унаа издөөгө даярдык.',
    notesEN: 'Contract signed, deposit received. Pre-requisite audit finished, transitioning to search phase.'
  },
  {
    id: 2,
    name: 'Поиск автомобиля начат',
    nameKG: 'Унааны издөө башталды',
    nameEN: 'Vehicle Search Started',
    status: 'completed',
    date: '2026-06-12',
    time: '09:00',
    responsibleDept: 'Брокерский отдел',
    responsibleDeptKG: 'Брокердик бөлүм',
    responsibleDeptEN: 'Brokerage Department',
    progressPercent: 10,
    notes: 'Мониторинг аукционов США, Кореи и Китая под требования клиента.',
    notesKG: 'Кардардын талаптарына ылайык АКШ, Корея жана Кытайдагы аукциондорго мониторинг жүргүзүү.',
    notesEN: 'Scouting Copart, USS Japan, and Korean domestic platforms based on budget.'
  },
  {
    id: 3,
    name: 'Аукцион выигран',
    nameKG: 'Аукцион утулду',
    nameEN: 'Auction Won',
    status: 'completed',
    date: '2026-06-15',
    time: '15:45',
    responsibleDept: 'Отдел закупок',
    responsibleDeptKG: 'Сатып алуу бөлүмү',
    responsibleDeptEN: 'Procurement Division',
    progressPercent: 18,
    notes: 'Выигран лот на аукционе Copart. Отчет о повреждениях проверен.',
    notesKG: 'Copart аукционунда лот утуп алынды. Унаанын абалы текшерилди.',
    notesEN: 'Successfully secured winning bid on Copart lot. Damage reports verified.'
  },
  {
    id: 4,
    name: 'Оплата подтверждена',
    nameKG: 'Төлөм тастыкталды',
    nameEN: 'Payment Confirmed',
    status: 'completed',
    date: '2026-06-17',
    time: '11:15',
    responsibleDept: 'Финансовый отдел',
    responsibleDeptKG: 'Финансы бөлүмү',
    responsibleDeptEN: 'Finance Department',
    progressPercent: 25,
    notes: 'Swift-перевод прошел успешно. Подтверждение оплаты отправлено аукциону.',
    notesKG: 'Swift-которуу ийгиликтүү өттү. Төлөм тастыктамасы аукционго жөнөтүлдү.',
    notesEN: 'SWIFT wire transfer finalized. Official payment invoice released by the auction.'
  },
  {
    id: 5,
    name: 'Забран у продавца',
    nameKG: 'Сатуучудан алынды',
    nameEN: 'Picked Up From Seller',
    status: 'completed',
    date: '2026-06-20',
    time: '16:00',
    responsibleDept: 'Логистика (США)',
    responsibleDeptKG: 'Логистика (АКШ)',
    responsibleDeptEN: 'Internal Freight (USA)',
    progressPercent: 32,
    notes: 'Автомобиль погружен на автовоз для транспортировки в порт отправления.',
    notesKG: 'Унаа портко жөнөтүү үчүн автовозго жүктөлдү.',
    notesEN: 'Vehicle loaded onto domestic carrier for transport to shipping port terminal.'
  },
  {
    id: 6,
    name: 'Прибыл в экспортный порт',
    nameKG: 'Экспорттук портко келди',
    nameEN: 'Arrived At Export Port',
    status: 'completed',
    date: '2026-06-26',
    time: '14:20',
    responsibleDept: 'Экспортный терминал',
    responsibleDeptKG: 'Экспорттук терминал',
    responsibleDeptEN: 'Export Terminal',
    progressPercent: 40,
    notes: 'Успешно доставлен в порт Саванна, Джорджия. Проходит оформление документов.',
    notesKG: 'Саванна портуна (Джорджия) ийгиликтүү жеткирилди. Документтер толтурулууда.',
    notesEN: 'Safely received at Savannah Port Terminal, GA. Customs paperwork queued.'
  },
  {
    id: 7,
    name: 'Загружен в контейнер',
    nameKG: 'Контейнерге жүктөлдү',
    nameEN: 'Loaded Into Container',
    status: 'completed',
    date: '2026-06-29',
    time: '10:00',
    responsibleDept: 'Портовые службы',
    responsibleDeptKG: 'Порт кызматтары',
    responsibleDeptEN: 'Port Stevedores',
    progressPercent: 48,
    notes: 'Унаа надежно закреплен в 40-футовом контейнере. Фотоотчет сформирован.',
    notesKG: 'Унаа 40-футтук контейнерге бекем орнотулду. Фотоотчет түзүлдү.',
    notesEN: 'Secured inside heavy-duty 40ft ocean container. Photo evidence archived.',
    photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 8,
    name: 'Судно отплыло',
    nameKG: 'Кеме жөнөп кетти',
    nameEN: 'Ship Departed',
    status: 'completed',
    date: '2026-07-02',
    time: '18:30',
    responsibleDept: 'Линия Maersk',
    responsibleDeptKG: 'Maersk линиясы',
    responsibleDeptEN: 'Maersk Ocean Line',
    progressPercent: 55,
    notes: 'Контейнер на борту судна "Maersk Karlskrona". Начало морского пути.',
    notesKG: 'Контейнер "Maersk Karlskrona" кемесине жүктөлүп, жолго чыкты.',
    notesEN: 'Ocean carrier "Maersk Karlskrona" departed. Voyage commenced eastward.'
  },
  {
    id: 9,
    name: 'В пути',
    nameKG: 'Жолдо баратат',
    nameEN: 'In Transit',
    status: 'current',
    date: '2026-07-19',
    time: '11:00',
    responsibleDept: 'Морской перевозчик',
    responsibleDeptKG: 'Деңиз ташуучусу',
    responsibleDeptEN: 'Transit Authority',
    progressPercent: 70,
    notes: 'Контейнер проходит транзит через Суэцкий канал. Движение по расписанию.',
    notesKG: 'Суэц каналы аркылуу транзиттен өтүүдө. Убактысы боюнча бара жатат.',
    notesEN: 'Vessel transiting through Suez Canal region. All parameters on-schedule.'
  },
  {
    id: 10,
    name: 'Прибыл в Кыргызстан',
    nameKG: 'Кыргызстанга келди',
    nameEN: 'Arrived In Kyrgyzstan',
    status: 'pending',
    date: '—',
    time: '—',
    responsibleDept: 'Логистика КР',
    responsibleDeptKG: 'КР Логистика',
    responsibleDeptEN: 'KG Logistics Hub',
    progressPercent: 80,
    notes: 'Ожидается прибытие на ж/д терминал Аламедин в Бишкеке.',
    notesKG: 'Бишкек шаарындагы Аламедин темир жол терминалына келүүсү күтүлүүдө.',
    notesEN: 'Estimated arrival at Alamedin railway terminal station in Bishkek.'
  },
  {
    id: 11,
    name: 'Таможенная очистка',
    nameKG: 'Бажыдан өткөрүү',
    nameEN: 'Customs Clearance',
    status: 'pending',
    date: '—',
    time: '—',
    responsibleDept: 'Таможенный брокер',
    responsibleDeptKG: 'Бажы брокери',
    responsibleDeptEN: 'Customs Brokerage',
    progressPercent: 88,
    notes: 'Подготовка пакета документов для быстрой таможенной очистки.',
    notesKG: 'Тез бажыдан өткөрүү үчүн документтердин топтомун даярдоо.',
    notesEN: 'Declaration compilation for fast track national import tax settlement.'
  },
  {
    id: 12,
    name: 'Инспекция автомобиля',
    nameKG: 'Унааны текшерүү',
    nameEN: 'Vehicle Inspection',
    status: 'pending',
    date: '—',
    time: '—',
    responsibleDept: 'Технический контроль',
    responsibleDeptKG: 'Техникалык көзөмөл',
    responsibleDeptEN: 'AutoHub Tech Crew',
    progressPercent: 92,
    notes: 'Полная проверка систем, компьютерная диагностика, мойка и химчистка.',
    notesKG: 'Системаларды толук текшерүү, компьютердик диагностика, унааны жууп-тазалоо.',
    notesEN: 'Full detailed engine check, diagnostic log clearing, and premium interior detailing.'
  },
  {
    id: 13,
    name: 'Готов к выдаче',
    nameKG: 'Берүүгө даяр',
    nameEN: 'Ready For Delivery',
    status: 'pending',
    date: '—',
    time: '—',
    responsibleDept: 'Шоурум Бишкек',
    responsibleDeptKG: 'Бишкек шоуруму',
    responsibleDeptEN: 'Bishkek Showroom',
    progressPercent: 97,
    notes: 'Автомобиль будет ждать вас в нашем главном шоуруме или доставлен к вашему дому.',
    notesKG: 'Унаа башкы шоурумда сизди күтөт же үйүңүзгө чейин жеткирилет.',
    notesEN: 'Vehicle sparkling polished, ready for pick up at the main showroom with red bow.'
  },
  {
    id: 14,
    name: 'Доставлен клиенту',
    nameKG: 'Кардарга жеткирилди',
    nameEN: 'Delivered To Customer',
    status: 'pending',
    date: '—',
    time: '—',
    responsibleDept: 'Клиентский сервис',
    responsibleDeptKG: 'Кардарларды тейлөө',
    responsibleDeptEN: 'Client Relations',
    progressPercent: 100,
    notes: 'Торжественная передача ключей, подписание акта приема-передачи.',
    notesKG: 'Ачкычтарды салтанаттуу тапшыруу, кабыл алуу актысына кол коюу.',
    notesEN: 'Joyous ceremonial key handover, final legal title sign-off.'
  }
];

const INITIAL_ORDERS: OrderData[] = [
  {
    orderId: 'AH-8291-KG',
    vin: '1FM5K8GC8LGA10394',
    phoneNumber: '+996555123456',
    customerName: 'Адилет Султанов',
    customerNameKG: 'Адилет Султанов',
    customerNameEN: 'Adilet Sultanov',
    vehicleName: 'Toyota RAV4 Hybrid 2022',
    vehiclePhoto: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600',
    paymentStatus: 'partial',
    paymentStatusKG: 'Жарым-жартылай',
    paymentStatusEN: 'Partially Paid (Deposit Received)',
    estArrivalDate: '2026-08-15',
    remainingDays: 27,
    shippingCompany: 'Maersk Shipping Lines',
    containerNumber: 'MSKU-930419-4',
    vesselName: 'Maersk Karlskrona (v.2604)',
    departurePort: 'Саванна, Джорджия (США)',
    departurePortKG: 'Саванна, Джорджия (АКШ)',
    departurePortEN: 'Savannah Port, Georgia (USA)',
    currentLocation: 'Суэцкий Канал (Красное Море)',
    currentLocationKG: 'Суэц каналы (Кызыл деңиз)',
    currentLocationEN: 'Suez Canal Area (Red Sea Transit)',
    destinationCity: 'Бишкек, Кыргызстан',
    destinationCityKG: 'Бишкек, Кыргызстан',
    destinationCityEN: 'Bishkek, Kyrgyzstan',
    managerName: 'Аскарбек Мамытов',
    managerPhone: '+996777112233',
    managerEmail: 'mamytoff@autohub.kg',
    managerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    stages: [...DEFAULT_STAGES],
    notifications: [
      {
        id: 'n-1',
        title: 'Унаа ийгиликтүү сатылып алынды',
        titleKG: 'Унаа ийгиликтүү сатылып алынды',
        titleEN: 'Vehicle Auction Won',
        message: 'Ваша Toyota RAV4 успешно выкуплена на аукционе Copart! Ожидайте выставления Swift-счета.',
        messageKG: 'Сиздин Toyota RAV4 унааңыз Copart аукционунда утулду! Свифт эсеп күтүлүүдө.',
        messageEN: 'Your Toyota RAV4 won at Copart USA. Swift invoice requested.',
        timestamp: '2026-06-15 15:50',
        read: true
      },
      {
        id: 'n-2',
        title: 'Контейнерге жүктөө аяктады',
        titleKG: 'Контейнерге жүктөө аяктады',
        titleEN: 'Containerization Finished',
        message: 'Унаа контейнерге MSKU-930419-4 загружен и надежно закреплен. Добавлены официальные фото.',
        messageKG: 'Унаа MSKU-930419-4 контейнерине жүктөлдү. Сүрөттөр тиркелди.',
        messageEN: 'Your vehicle has been secured in container MSKU-930419-4. Cargo photos attached.',
        timestamp: '2026-06-29 10:30',
        read: false
      }
    ]
  },
  {
    orderId: 'AH-4720-KG',
    vin: 'KNAGM4A56M5219483',
    phoneNumber: '+996707333444',
    customerName: 'Эрлан Бакиров',
    customerNameKG: 'Эрлан Бакиров',
    customerNameEN: 'Erlan Bakirov',
    vehicleName: 'Hyundai Sonata LPI 2021',
    vehiclePhoto: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    paymentStatus: 'paid',
    paymentStatusKG: 'Толук төлөндү',
    paymentStatusEN: 'Fully Paid',
    estArrivalDate: '2026-08-01',
    remainingDays: 13,
    shippingCompany: 'Giga Shipping Co.',
    containerNumber: 'GIGU-482013-1',
    vesselName: 'Asian Integrity (v.085)',
    departurePort: 'Порт Инчхон (Южная Корея)',
    departurePortKG: 'Инчхон порту (Түштүк Корея)',
    departurePortEN: 'Incheon Port (South Korea)',
    currentLocation: 'Хоргос, Граница Китая/Казахстана',
    currentLocationKG: 'Хоргос, Кытай/Казакстан чек арасы',
    currentLocationEN: 'Khorgos Rail Terminal (CN/KZ Border)',
    destinationCity: 'Бишкек, Кыргызстан',
    destinationCityKG: 'Бишкек, Кыргызстан',
    destinationCityEN: 'Bishkek, Kyrgyzstan',
    managerName: 'Нурбек Осмонов',
    managerPhone: '+996500555777',
    managerEmail: 'osmonov@autohub.kg',
    managerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    stages: DEFAULT_STAGES.map(s => {
      if (s.id <= 9) {
        return { ...s, status: 'completed' as const, date: '2026-06-25', time: '12:00' };
      }
      if (s.id === 10) {
        return { ...s, status: 'current' as const, date: '2026-07-19', time: '14:00', notes: 'Контейнер на перегрузке в Хоргосе. Скоро отправка ж/д платформой в Бишкек.', notesKG: 'Контейнер Хоргосто кайра жүктөөдө. Бишкекке темир жол менен жөнөтүлүү алдында.', notesEN: 'Border custom transit in progress. Scheduled to depart on rail platform to Bishkek.' };
      }
      return { ...s, status: 'pending' as const };
    }),
    notifications: [
      {
        id: 'n-1',
        title: 'Судно отплыло',
        titleKG: 'Кеме жөнөп кетти',
        titleEN: 'Vessel Departed Incheon',
        message: 'Судно Asian Integrity покинуло порт Кореи с вашим автомобилем Hyundai Sonata.',
        messageKG: 'Кореянын портунан Asian Integrity кемеси унааңыз менен Бишкекке карай жөнөп кетти.',
        messageEN: 'Container has officially set sail on Asian Integrity vessel from South Korea.',
        timestamp: '2026-06-25 12:30',
        read: true
      }
    ]
  }
];

export function OrderTrackingPage({ lang, onNavigateToCalculator, onNavigateToVinCheck, onNavigateToOrderCar }: OrderTrackingPageProps) {
  // Global orders state stored locally
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<OrderData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mode: 'customer' (standard tracking lookup) or 'manager' (internal dashboard)
  const [dashboardView, setDashboardView] = useState<'customer' | 'manager'>('customer');

  // Manager state variables
  const [selectedOrderToEdit, setSelectedOrderToEdit] = useState<string>('AH-8291-KG');
  const [managerNoteInput, setManagerNoteInput] = useState('');
  const [managerStageIndexToUpdate, setManagerStageIndexToUpdate] = useState<number>(8); // In Transit (index 8, stage 9)
  const [managerStageStatus, setManagerStageStatus] = useState<'completed' | 'current' | 'pending'>('completed');
  const [managerPhotoSimulatedUrl, setManagerPhotoSimulatedUrl] = useState('');

  // Toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Seed / read local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('askar_autohub_tracking_orders_v1');
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        setOrders(INITIAL_ORDERS);
      }
    } else {
      setOrders(INITIAL_ORDERS);
      localStorage.setItem('askar_autohub_tracking_orders_v1', JSON.stringify(INITIAL_ORDERS));
    }
  }, []);

  // Sync state helper to write back
  const syncAndSaveOrders = (updatedOrders: OrderData[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('askar_autohub_tracking_orders_v1', JSON.stringify(updatedOrders));
  };

  // Handle customer search submission
  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      showToast(lang === 'RU' ? 'Введите поисковый запрос!' : lang === 'KG' ? 'Издөө суроосун киргизиңиз!' : 'Please fill in a query!');
      return;
    }

    const cleanQuery = searchQuery.trim().toLowerCase();
    const found = orders.find(order => 
      order.orderId.toLowerCase() === cleanQuery || 
      order.vin.toLowerCase() === cleanQuery || 
      order.phoneNumber.replace(/[\s\+\(\)-]/g, '').includes(cleanQuery.replace(/[\s\+\(\)-]/g, ''))
    );

    if (found) {
      setActiveOrder(found);
      showToast(lang === 'RU' ? 'Заказ успешно найден!' : lang === 'KG' ? 'Буйрутма ийгиликтүү табылды!' : 'Order found!');
    } else {
      showToast(lang === 'RU' ? 'Заказ не найден. Проверьте номер или ID.' : lang === 'KG' ? 'Мындай буйрутма табылган жок. Маалыматтарды текшериңиз.' : 'Order not found. Check parameters.');
    }
  };

  // Handle direct demo click
  const selectQuickDemoOrder = (id: string) => {
    const found = orders.find(o => o.orderId === id);
    if (found) {
      setActiveOrder(found);
      setSearchQuery(found.orderId);
      showToast(lang === 'RU' ? `Загружен демо-заказ ${id}` : lang === 'KG' ? `Демо-буйрутма жүктөлдү ${id}` : `Loaded demo order ${id}`);
    }
  };

  // Manager action: Update a specific stage in the selected order
  const handleUpdateStageByManager = () => {
    const targetOrder = orders.find(o => o.orderId === selectedOrderToEdit);
    if (!targetOrder) return;

    const updatedOrders = orders.map(order => {
      if (order.orderId === selectedOrderToEdit) {
        const updatedStages = order.stages.map((stage, index) => {
          if (index === managerStageIndexToUpdate) {
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            const timeStr = today.toTimeString().split(' ')[0].substring(0, 5);

            return {
              ...stage,
              status: managerStageStatus,
              date: managerStageStatus !== 'pending' ? dateStr : '—',
              time: managerStageStatus !== 'pending' ? timeStr : '—',
              notes: managerNoteInput.trim() ? managerNoteInput : stage.notes,
              notesKG: managerNoteInput.trim() ? managerNoteInput : stage.notesKG,
              notesEN: managerNoteInput.trim() ? managerNoteInput : stage.notesEN,
              photoUrl: managerPhotoSimulatedUrl ? managerPhotoSimulatedUrl : stage.photoUrl
            };
          }
          return stage;
        });

        // Auto-recalculate progress bar based on highest completed stage
        const highestCompletedIndex = updatedStages.reduce((acc, stage, idx) => {
          return stage.status === 'completed' || stage.status === 'current' ? Math.max(acc, idx) : acc;
        }, 0);

        const progressPercent = updatedStages[highestCompletedIndex]?.progressPercent || 5;

        // Auto notification injection
        const customNotification = {
          id: 'n-' + Date.now(),
          title: `Этап обновлен: ${updatedStages[managerStageIndexToUpdate].name}`,
          titleKG: `Этап жаңыртылды: ${updatedStages[managerStageIndexToUpdate].nameKG}`,
          titleEN: `Status Updated: ${updatedStages[managerStageIndexToUpdate].nameEN}`,
          message: `Статус вашего автомобиля изменен на "${updatedStages[managerStageIndexToUpdate].name}". Примечание: ${managerNoteInput || 'Все системы в штатном режиме'}`,
          messageKG: `Унааңыздын абалы жаңыртылды: "${updatedStages[managerStageIndexToUpdate].nameKG}". Кошумча: ${managerNoteInput || 'Баары жайында'}`,
          messageEN: `Your order status was updated to "${updatedStages[managerStageIndexToUpdate].nameEN}". Remarks: ${managerNoteInput || 'Processing in order'}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          read: false
        };

        return {
          ...order,
          stages: updatedStages,
          notifications: [customNotification, ...order.notifications]
        };
      }
      return order;
    });

    syncAndSaveOrders(updatedOrders);
    
    // Update active view if it is showing this edited order
    const updatedActive = updatedOrders.find(o => o.orderId === selectedOrderToEdit);
    if (updatedActive && activeOrder?.orderId === selectedOrderToEdit) {
      setActiveOrder(updatedActive);
    }

    setManagerNoteInput('');
    setManagerPhotoSimulatedUrl('');
    showToast(lang === 'RU' ? 'Логистический статус успешно обновлен!' : lang === 'KG' ? 'Логистикалык статус ийгиликтүү жаңыртылды!' : 'Logistics milestones synchronized successfully!');
  };

  // Manager Action: Quick trigger preset notifications
  const handleTriggerPresetNotification = (title: string, message: string) => {
    const updated = orders.map(order => {
      if (order.orderId === selectedOrderToEdit) {
        const newNotif = {
          id: 'n-preset-' + Date.now(),
          title,
          titleKG: title,
          titleEN: title,
          message,
          messageKG: message,
          messageEN: message,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          read: false
        };
        return {
          ...order,
          notifications: [newNotif, ...order.notifications]
        };
      }
      return order;
    });
    syncAndSaveOrders(updated);
    
    const updatedActive = updated.find(o => o.orderId === selectedOrderToEdit);
    if (updatedActive && activeOrder?.orderId === selectedOrderToEdit) {
      setActiveOrder(updatedActive);
    }

    showToast(lang === 'RU' ? 'Уведомление отправлено клиенту!' : lang === 'KG' ? 'Билдирүү кардарга жөнөтүлдү!' : 'Instant notification sent to customer!');
  };

  // Manager action: mark delivery fully complete
  const handleMarkDeliveryComplete = () => {
    const updated = orders.map(order => {
      if (order.orderId === selectedOrderToEdit) {
        const finalizedStages = order.stages.map(stage => ({
          ...stage,
          status: 'completed' as const,
          date: stage.date === '—' ? new Date().toISOString().split('T')[0] : stage.date,
          time: stage.time === '—' ? '12:00' : stage.time
        }));
        return {
          ...order,
          remainingDays: 0,
          currentLocation: 'Доставлен. Бишкек',
          currentLocationKG: 'Жеткирилди. Бишкек',
          currentLocationEN: 'Delivered to recipient. Bishkek',
          stages: finalizedStages,
          notifications: [
            {
              id: 'n-fin-' + Date.now(),
              title: 'Доставка завершена! 🍾',
              titleKG: 'Жеткирүү аяктады! 🍾',
              titleEN: 'Delivery Complete! 🍾',
              message: 'Поздравляем с приобретением! Автомобиль успешно передан владельцу. Спасибо за доверие к Askar AutoHub!',
              messageKG: 'Куттуктайбыз! Унаа ийгиликтүү ээсине тапшырылды. Ишенимиңиз үчүн чоң рахмат!',
              messageEN: 'Congratulations on your new ride! The vehicle was successfully delivered to the customer. Thank you for choosing Askar AutoHub!',
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              read: false
            },
            ...order.notifications
          ]
        };
      }
      return order;
    });
    syncAndSaveOrders(updated);

    const updatedActive = updated.find(o => o.orderId === selectedOrderToEdit);
    if (updatedActive && activeOrder?.orderId === selectedOrderToEdit) {
      setActiveOrder(updatedActive);
    }
    showToast(lang === 'RU' ? 'Заказ успешно завершен! Клиент уведомлен.' : lang === 'KG' ? 'Буйрутма ийгиликтүү аяктады! Билдирүү жөнөтүлдү.' : 'Order marked as completely delivered!');
  };

  // Simulate PDF tracking download
  const handleDownloadPDF = () => {
    if (!activeOrder) return;
    showToast(lang === 'RU' ? 'Генерация PDF отчета... Файл скачан в загрузки.' : lang === 'KG' ? 'PDF отчет түзүлүүдө... Файл жүктөлдү.' : 'Assembling PDF Shipment Dossier... Check your downloads.');
  };

  // Simulate copy tracking link
  const handleCopyTrackingLink = () => {
    if (!activeOrder) return;
    navigator.clipboard.writeText(`${window.location.origin}/#tracking?id=${activeOrder.orderId}`);
    showToast(lang === 'RU' ? 'Ссылка для отслеживания скопирована!' : lang === 'KG' ? 'Көзөмөлдөө шилтемеси көчүрүлдү!' : 'Direct tracking link copied to clipboard!');
  };

  // Count unread notifications
  const unreadCount = useMemo(() => {
    if (!activeOrder) return 0;
    return activeOrder.notifications.filter(n => !n.read).length;
  }, [activeOrder]);

  const markNotificationsAsRead = () => {
    if (!activeOrder) return;
    const updated = orders.map(order => {
      if (order.orderId === activeOrder.orderId) {
        return {
          ...order,
          notifications: order.notifications.map(n => ({ ...n, read: true }))
        };
      }
      return order;
    });
    syncAndSaveOrders(updated);
    const updatedActive = updated.find(o => o.orderId === activeOrder.orderId);
    if (updatedActive) {
      setActiveOrder(updatedActive);
    }
  };

  // Locate current progress stage index to show in summary
  const currentStageInfo = useMemo(() => {
    if (!activeOrder) return null;
    const current = activeOrder.stages.find(s => s.status === 'current');
    if (current) return current;
    // fallback to highest completed
    const completed = [...activeOrder.stages].reverse().find(s => s.status === 'completed');
    return completed || activeOrder.stages[0];
  }, [activeOrder]);

  const trans = {
    RU: {
      tracking_title: 'Центр Отслеживания Поставок',
      tracking_desc: 'Премиальный логистический хаб Askar AutoHub. Контролируйте каждый этап импорта вашего автомобиля из США, Южной Кореи, Китая или Японии в реальном времени.',
      search_placeholder: 'Введите ID заказа (например, AH-8291-KG), VIN-номер или номер телефона',
      btn_track: 'Отследить унаа',
      demo_subtitle: 'Быстрый тест (кликните для демонстрации):',
      customer_dashboard_lbl: 'Кабинет покупателя',
      manager_dashboard_lbl: 'Панель Брокера / Менеджера',
      est_delivery: 'Ориентировочная дата прибытия',
      rem_days: 'Осталось дней',
      shipping_line: 'Транспортная компания',
      container_no: 'Номер контейнера',
      vessel_lbl: 'Судно / Рейс',
      port_depart: 'Порт отправления',
      cur_loc: 'Текущее гео-положение',
      dest_city: 'Пункт назначения',
      manager_card: 'Ваш персональный куратор',
      contact_mgr: 'Связаться с менеджером',
      whatsapp_mgr: 'Написать на WhatsApp',
      download_doc: 'Скачать PDF-отчет',
      share_link: 'Поделиться ссылкой',
      tracking_timeline_title: 'Подробная хронология доставки (14 этапов)',
      stage_lbl: 'Этап',
      dept_lbl: 'Ответственное звено',
      notes_lbl: 'Служебные примечания',
      payment_status_lbl: 'Статус оплаты:',
      notif_center: 'Центр мгновенных уведомлений',
      no_notifs: 'Уведомлений пока нет',
      route_map_title: 'Интерактивная карта следования (Демо-режим)',
      manager_panel_title: 'Управление логистическими вехами',
      mgr_select_order: 'Выберите заказ для администрирования:',
      mgr_select_stage: 'Выберите этап для обновления:',
      mgr_status_lbl: 'Установить статус этапа:',
      mgr_note_lbl: 'Добавить примечание / обновление:',
      mgr_photo_lbl: 'Прикрепить ссылку на новое фото (имитация):',
      mgr_btn_update: 'Применить логистическое обновление',
      mgr_btn_complete: 'Завершить весь цикл и доставить',
      mgr_presets_lbl: 'Отправить быстрое уведомление клиенту:',
      mgr_preset_1: 'Автомобиль успешно погружен',
      mgr_preset_2: 'Контейнер прибыл на таможню КР',
      status_completed: 'Выполнено',
      status_current: 'В процессе',
      status_pending: 'Ожидается'
    },
    KG: {
      tracking_title: 'Жеткирүүлөрдү Көзөмөлдөө Борбору',
      tracking_desc: 'Askar AutoHub премиум логистикалык борбору. АКШ, Түштүк Корея, Кытай же Япониядан унааңыздын импортунун ар бир кадамын реалдуу убакыт режиминде текшериңиз.',
      search_placeholder: 'Буйрутма ID (мисалы, AH-8291-KG), VIN же телефон номерин жазыңыз',
      btn_track: 'Унааны көзөмөлдөө',
      demo_subtitle: 'Тез текшерүү (көрүү үчүн басыңыз):',
      customer_dashboard_lbl: 'Сатып алуучунун кабинети',
      manager_dashboard_lbl: 'Брокер / Менеджер панели',
      est_delivery: 'Божомолдуу келүү күнү',
      rem_days: 'Калган күндөр',
      shipping_line: 'Транспорттук компания',
      container_no: 'Контейнер номери',
      vessel_lbl: 'Кеме / Рейс',
      port_depart: 'Жөнөтүлгөн порт',
      cur_loc: 'Учурдагы гео-жайгашуусу',
      dest_city: 'Жетүү пункту',
      manager_card: 'Жеке кураторуңуз',
      contact_mgr: 'Менеджер менен байланышуу',
      whatsapp_mgr: 'WhatsApp аркылуу жазуу',
      download_doc: 'PDF-отчетту жүктөө',
      share_link: 'Шилтеме менен бөлүшүү',
      tracking_timeline_title: 'Жеткирүүнүн толук хронологиясы (14 этап)',
      stage_lbl: 'Этап',
      dept_lbl: 'Жооптуу бөлүм',
      notes_lbl: 'Кызматтык белгилер',
      payment_status_lbl: 'Төлөм статусу:',
      notif_center: 'Ыкчам билдирүүлөр борбору',
      no_notifs: 'Азырынча билдирүүлөр жок',
      route_map_title: 'Интерактивдүү багыт картасы (Демо-режим)',
      manager_panel_title: 'Логистикалык баскычтарды башкаруу',
      mgr_select_order: 'Башкаруу үчүн буйрутманы тандаңыз:',
      mgr_select_stage: 'Жаңыртуу үчүн этапты тандаңыз:',
      mgr_status_lbl: 'Этаптын статусун коюу:',
      mgr_note_lbl: 'Кошумча маалымат / эскертүү жазуу:',
      mgr_photo_lbl: 'Жаңы сүрөттүн шилтемесин тиркөө (имитация):',
      mgr_btn_update: 'Логистикалык жаңыртууну колдонуу',
      mgr_btn_complete: 'Циклди бүтүрүү жана унааны тапшыруу',
      mgr_presets_lbl: 'Кардарга тез билдирүү жөнөтүү:',
      mgr_preset_1: 'Унаа ийгиликтүү жүктөлдү',
      mgr_preset_2: 'Контейнер КР бажысына келди',
      status_completed: 'Аткарылды',
      status_current: 'Учурда аткарылууда',
      status_pending: 'Күтүлүүдө'
    },
    EN: {
      tracking_title: 'Shipment Tracking Center',
      tracking_desc: 'Elite Logistics Portal by Askar AutoHub. Supervise every operational milestone of your vehicle import from USA, Korea, China, or Japan directly to Bishkek.',
      search_placeholder: 'Enter Order ID (e.g., AH-8291-KG), VIN number, or customer phone number',
      btn_track: 'Track Order',
      demo_subtitle: 'Quick Test Dashboard (click to display):',
      customer_dashboard_lbl: 'Customer Hub',
      manager_dashboard_lbl: 'Brokerage & Management Desk',
      est_delivery: 'Estimated Port Clearance Date',
      rem_days: 'Remaining Transit Days',
      shipping_line: 'Freight Forwarding Partner',
      container_no: 'Ocean Container ID',
      vessel_lbl: 'Vessel Cargo / Voyage ID',
      port_depart: 'Origin Shipping Terminal',
      cur_loc: 'Live GPS Coordinates',
      dest_city: 'Final Delivery Destination',
      manager_card: 'Assigned Logistics Manager',
      contact_mgr: 'Dial Logistics Desk',
      whatsapp_mgr: 'Direct WhatsApp Line',
      download_doc: 'Export PDF Track Sheet',
      share_link: 'Copy Tracker Link',
      tracking_timeline_title: 'Detailed Milestones Timeline (14 Stages)',
      stage_lbl: 'Stage',
      dept_lbl: 'Department in Charge',
      notes_lbl: 'Milestone Logs',
      payment_status_lbl: 'Payment Status:',
      notif_center: 'Instant Dispatch Alerts',
      no_notifs: 'No notification records found',
      route_map_title: 'Geographic Transit Route (Demo Vector Projection)',
      manager_panel_title: 'Brokerage Administration Terminal',
      mgr_select_order: 'Select Target Client Record:',
      mgr_select_stage: 'Choose Milestone Event Step:',
      mgr_status_lbl: 'Milestone Execution Status:',
      mgr_note_lbl: 'Add Progress Notes / Remarks:',
      mgr_photo_lbl: 'Attach Status Photo URL (Simulated):',
      mgr_btn_update: 'Publish Milestone Synchronization',
      mgr_btn_complete: 'Finalize Handover & Deliver Vehicle',
      mgr_presets_lbl: 'Dispatch Instant Alerts to Client UI:',
      mgr_preset_1: 'Ocean Carrier Departed USA Port',
      mgr_preset_2: 'Customs Tax Valuation Finalized',
      status_completed: 'Completed',
      status_current: 'In Progress',
      status_pending: 'Pending'
    }
  };

  const t = trans[lang];

  return (
    <div className="bg-[#050B14] min-h-screen text-gray-200 pt-28 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            Askar AutoHub Logistics
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.tracking_title}
          </h1>
          <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t.tracking_desc}
          </p>
        </div>

        {/* TOAST FEEDBACK */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0B3D91] text-white font-semibold text-sm py-3 px-6 rounded-xl shadow-xl flex items-center gap-2 border border-blue-400/20"
            >
              <RefreshCw className="w-4 h-4 animate-spin text-blue-300" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* DASHBOARD MODE SWITCHER */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setDashboardView('customer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
              dashboardView === 'customer'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-[#0E1726] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <User className="w-4 h-4" />
            {t.customer_dashboard_lbl}
          </button>
          <button
            onClick={() => setDashboardView('manager')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
              dashboardView === 'manager'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-[#0E1726] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Settings className="w-4 h-4 text-blue-400" />
            {t.manager_dashboard_lbl}
          </button>
        </div>

        {/* SEARCH AND DEMO QUICK BAR */}
        <div className="bg-[#0E1726] border border-gray-800 rounded-2xl p-6 mb-8 shadow-2xl">
          <form onSubmit={handleSearchTracking} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#070D19] border border-gray-800 focus:border-blue-500 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
            >
              <Truck className="w-5 h-5" />
              {t.btn_track}
            </button>
          </form>

          {/* Quick tester presets */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-800/60 pt-4">
            <span className="text-xs text-gray-500 font-mono font-medium">{t.demo_subtitle}</span>
            <button
              onClick={() => selectQuickDemoOrder('AH-8291-KG')}
              className="text-xs bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 rounded-lg px-3 py-1.5 transition-colors font-mono"
            >
              AH-8291-KG (Toyota RAV4 Hybrid)
            </button>
            <button
              onClick={() => selectQuickDemoOrder('AH-4720-KG')}
              className="text-xs bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 rounded-lg px-3 py-1.5 transition-colors font-mono"
            >
              AH-4720-KG (Hyundai Sonata Gas)
            </button>
          </div>
        </div>

        {/* CUSTOMER TRACKING PORTAL VIEW */}
        {dashboardView === 'customer' && (
          <div>
            {activeOrder ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                
                {/* COLUMN 1: CLIENT AND CAR SUMMARY PANEL */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* VEHICLE MAIN CARD */}
                  <div className="bg-[#0E1726] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="relative h-48 w-full bg-gray-900">
                      <img 
                        src={activeOrder.vehiclePhoto} 
                        alt={activeOrder.vehicleName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-md shadow-lg">
                        {activeOrder.orderId}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-md border border-white/10">
                        VIN: {activeOrder.vin}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-white mb-2">{activeOrder.vehicleName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 font-mono">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{lang === 'RU' ? activeOrder.customerName : lang === 'KG' ? activeOrder.customerNameKG : activeOrder.customerNameEN}</span>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-gray-800/80">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">{t.payment_status_lbl}</span>
                          <span className={`font-bold uppercase ${
                            activeOrder.paymentStatus === 'paid' ? 'text-green-400' : 'text-amber-400'
                          }`}>
                            {lang === 'RU' ? activeOrder.paymentStatus : lang === 'KG' ? activeOrder.paymentStatusKG : activeOrder.paymentStatusEN}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">{t.est_delivery}:</span>
                          <span className="text-white font-semibold font-mono">{activeOrder.estArrivalDate}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">{t.rem_days}:</span>
                          <span className="text-blue-400 font-extrabold font-mono text-sm">{activeOrder.remainingDays} дней</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NOTIFICATION LOGS (IN-PAGE ALERT PANEL) */}
                  <div className="bg-[#0E1726] border border-gray-800 rounded-2xl p-5 shadow-xl">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
                      <div className="flex items-center gap-2">
                        <BellRing className="w-5 h-5 text-amber-400" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.notif_center}</h4>
                      </div>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markNotificationsAsRead}
                          className="text-[10px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-md px-2 py-1 transition-colors"
                        >
                          Прочитать ({unreadCount})
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
                      {activeOrder.notifications.length > 0 ? (
                        activeOrder.notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-3 rounded-xl border transition-all text-xs ${
                              notif.read ? 'bg-[#070D19]/40 border-gray-900/60' : 'bg-amber-500/5 border-amber-500/20'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1 gap-2">
                              <span className="font-bold text-gray-200">
                                {lang === 'RU' ? notif.title : lang === 'KG' ? notif.titleKG : notif.titleEN}
                              </span>
                              {!notif.read && (
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-gray-400 leading-normal mb-1.5">
                              {lang === 'RU' ? notif.message : lang === 'KG' ? notif.messageKG : notif.messageEN}
                            </p>
                            <span className="text-[10px] text-gray-500 font-mono block text-right">{notif.timestamp}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 text-center py-4">{t.no_notifs}</p>
                      )}
                    </div>
                  </div>

                  {/* LOGISTICS BROKER CARD */}
                  <div className="bg-[#0E1726] border border-gray-800 rounded-2xl p-5 shadow-xl">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-800">
                      {t.manager_card}
                    </h4>
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={activeOrder.managerPhoto} 
                        alt={activeOrder.managerName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="font-bold text-white text-sm">{activeOrder.managerName}</h5>
                        <p className="text-xs text-gray-400">Askar AutoHub Logistics Pro</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <a 
                        href={`tel:${activeOrder.managerPhone}`}
                        className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        <span>{activeOrder.managerPhone}</span>
                      </a>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                        <span>{activeOrder.managerEmail}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${activeOrder.managerPhone}`}
                        className="bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 font-bold text-xs py-2 px-3 rounded-lg text-center transition-colors"
                      >
                        {t.contact_mgr}
                      </a>
                      <a
                        href={`https://wa.me/${activeOrder.managerPhone.replace(/\+/g, '')}?text=Здравствуйте!%20Я%20по%20поводу%20заказа%20${activeOrder.orderId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 text-green-400 font-bold text-xs py-2 px-3 rounded-lg text-center transition-colors flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* DOCUMENT & DOSSIER BUTTONS */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleDownloadPDF}
                      className="bg-[#0E1726] border border-gray-800 hover:border-gray-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                      {t.download_doc}
                    </button>
                    <button
                      onClick={handleCopyTrackingLink}
                      className="bg-[#0E1726] border border-gray-800 hover:border-gray-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                    >
                      <Share2 className="w-4 h-4 text-blue-400" />
                      {t.share_link}
                    </button>
                  </div>

                </div>

                {/* COLUMN 2 & 3: MAIN TIMELINE & ROUTE MAP */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* LIVE PROGRESS RADAR BAR */}
                  <div className="bg-[#0E1726] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Текущий этап</span>
                        <h4 className="text-lg font-extrabold text-white flex items-center gap-2 mt-0.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                          {currentStageInfo ? (lang === 'RU' ? currentStageInfo.name : lang === 'KG' ? currentStageInfo.nameKG : currentStageInfo.nameEN) : 'В пути'}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Общий прогресс</span>
                        <div className="text-2xl font-black text-blue-400 font-mono mt-0.5">
                          {currentStageInfo ? currentStageInfo.progressPercent : 70}%
                        </div>
                      </div>
                    </div>

                    {/* Premium Progress Bar */}
                    <div className="w-full h-3.5 bg-gray-950 rounded-full overflow-hidden border border-gray-800 p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentStageInfo ? currentStageInfo.progressPercent : 70}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-800/60 text-xs">
                      <div>
                        <span className="text-gray-500 block mb-1">{t.shipping_line}</span>
                        <span className="text-gray-200 font-semibold">{activeOrder.shippingCompany}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">{t.container_no}</span>
                        <span className="text-gray-200 font-mono font-semibold">{activeOrder.containerNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">{t.vessel_lbl}</span>
                        <span className="text-gray-200 font-semibold">{activeOrder.vesselName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">{t.cur_loc}</span>
                        <span className="text-blue-400 font-semibold">
                          {lang === 'RU' ? activeOrder.currentLocation : lang === 'KG' ? activeOrder.currentLocationKG : activeOrder.currentLocationEN}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PREMIUM DEMO SHIPMENT MAP (Interactive SVG Route Projection) */}
                  <div className="bg-[#0E1726] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-blue-400 animate-spin-slow" />
                      {t.route_map_title}
                    </h3>

                    <div className="relative bg-[#070D19] border border-gray-900 rounded-xl h-64 overflow-hidden flex flex-col justify-between p-4">
                      
                      {/* Grid overlay for radar effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
                      
                      <div className="relative z-10 flex justify-between items-start">
                        <div className="bg-[#0E1726]/95 border border-gray-800 px-3 py-1.5 rounded-lg text-xs">
                          <span className="text-gray-500 block">Отплытие</span>
                          <span className="font-bold text-white">
                            {lang === 'RU' ? activeOrder.departurePort : lang === 'KG' ? activeOrder.departurePortKG : activeOrder.departurePortEN}
                          </span>
                        </div>

                        <div className="bg-[#0E1726]/95 border border-gray-800 px-3 py-1.5 rounded-lg text-xs text-right">
                          <span className="text-gray-500 block">Назначение</span>
                          <span className="font-bold text-white">
                            {lang === 'RU' ? activeOrder.destinationCity : lang === 'KG' ? activeOrder.destinationCityKG : activeOrder.destinationCityEN}
                          </span>
                        </div>
                      </div>

                      {/* Moving Vessel Path Projection */}
                      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-24 flex items-center">
                        <svg className="w-full h-full" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Route Path line */}
                          <path 
                            d="M 20 50 C 150 10, 300 90, 580 50" 
                            stroke="#1E293B" 
                            strokeWidth="3" 
                            strokeDasharray="6 6" 
                          />
                          
                          {/* Progress Line */}
                          <path 
                            d="M 20 50 C 150 10, 300 90, 580 50" 
                            stroke="url(#routeGrad)" 
                            strokeWidth="4" 
                            strokeDasharray="6 6"
                            strokeDashoffset="0"
                            className="animate-pulse"
                          />
                          
                          <defs>
                            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#2563EB" />
                              <stop offset="70%" stopColor="#06B6D4" />
                              <stop offset="100%" stopColor="#1E293B" />
                            </linearGradient>
                          </defs>

                          {/* Node Port Savannah */}
                          <circle cx="20" cy="50" r="6" fill="#2563EB" />
                          
                          {/* Ship Location indicator on curved spline */}
                          {/* We estimate the position on path using activeOrder progress percent */}
                          <g transform={`translate(${15 + (currentStageInfo?.progressPercent || 70) * 5.4}, ${30 + Math.sin((currentStageInfo?.progressPercent || 70) * 0.1) * 20})`}>
                            <circle cx="0" cy="0" r="10" fill="#2563EB" className="animate-ping opacity-40" />
                            <circle cx="0" cy="0" r="6" fill="#06B6D4" />
                            <foreignObject x="-10" y="-32" width="24" height="24">
                              <Ship className="w-5 h-5 text-blue-400 drop-shadow-lg" />
                            </foreignObject>
                          </g>

                          {/* Destination Node Bishkek */}
                          <circle cx="580" cy="50" r="6" fill="#10B981" />
                        </svg>
                      </div>

                      <div className="relative z-10 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] self-center border border-gray-800 flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
                        <span className="text-gray-400">Текущий транзитный регион:</span>
                        <strong className="text-white">
                          {lang === 'RU' ? activeOrder.currentLocation : lang === 'KG' ? activeOrder.currentLocationKG : activeOrder.currentLocationEN}
                        </strong>
                      </div>

                    </div>
                  </div>

                  {/* TIMELINE LIST SECTION */}
                  <div className="bg-[#0E1726] border border-gray-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-extrabold text-white mb-6 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-400" />
                      {t.tracking_timeline_title}
                    </h3>

                    <div className="relative border-l-2 border-gray-800 pl-6 ml-4 space-y-8">
                      {activeOrder.stages.map((stage, idx) => {
                        const isCompleted = stage.status === 'completed';
                        const isCurrent = stage.status === 'current';
                        const isPending = stage.status === 'pending';

                        return (
                          <div key={stage.id} className="relative">
                            
                            {/* Milestone Dot Indicator */}
                            <div className={`absolute -left-[35px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                              isCompleted 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : isCurrent 
                                  ? 'bg-[#0E1726] border-amber-400 text-amber-400 scale-110 shadow-lg shadow-amber-400/20' 
                                  : 'bg-[#070D19] border-gray-800 text-gray-600'
                            }`}>
                              {isCompleted ? (
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              ) : isCurrent ? (
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                              ) : (
                                <span className="text-[9px] font-mono font-bold">{stage.id}</span>
                              )}
                            </div>

                            {/* Milestone Body */}
                            <div className={`p-4 rounded-xl border transition-all ${
                              isCurrent 
                                ? 'bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/30' 
                                : isCompleted 
                                  ? 'bg-[#070D19]/40 border-gray-900' 
                                  : 'bg-transparent border-transparent'
                            }`}>
                              
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h4 className={`text-sm font-bold tracking-wide ${
                                  isCompleted ? 'text-gray-100' : isCurrent ? 'text-amber-400' : 'text-gray-500'
                                }`}>
                                  {stage.id}. {lang === 'RU' ? stage.name : lang === 'KG' ? stage.nameKG : stage.nameEN}
                                </h4>
                                
                                {stage.date !== '—' && (
                                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3.5 h-3.5" />
                                      {stage.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      {stage.time}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Department */}
                              <div className="text-[11px] text-blue-400 font-mono font-semibold mb-2 uppercase tracking-wider">
                                {t.dept_lbl}: {lang === 'RU' ? stage.responsibleDept : lang === 'KG' ? stage.responsibleDeptKG : stage.responsibleDeptEN}
                              </div>

                              {/* Notes */}
                              <p className={`text-xs leading-relaxed ${
                                isPending ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {lang === 'RU' ? stage.notes : lang === 'KG' ? stage.notesKG : stage.notesEN}
                              </p>

                              {/* Stage Attachment photo if exists */}
                              {stage.photoUrl && !isPending && (
                                <div className="mt-3">
                                  <span className="text-[10px] text-gray-500 block mb-1.5 uppercase font-mono">Прикрепленный снимок этапа:</span>
                                  <img 
                                    src={stage.photoUrl} 
                                    alt="Milestone Cargo Snap" 
                                    className="rounded-lg h-36 w-full md:w-72 object-cover border border-gray-800"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              )}

                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </motion.div>
            ) : (
              
              /* BLANK / NO QUERY SEARCH GREETING CARD */
              <div className="bg-[#0E1726] border border-gray-800 rounded-3xl p-12 text-center shadow-2xl max-w-2xl mx-auto">
                <Compass className="w-16 h-16 text-blue-500/80 mx-auto mb-6 animate-spin-slow" />
                <h3 className="text-xl font-extrabold text-white mb-2">Введите параметры для поиска вашего унаа</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
                  Для мгновенной визуализации статуса груза, времени прибытия и фотоотчета ведите номер телефона, VIN-код или ID заказа.
                </p>
                <div className="text-xs text-gray-500 border-t border-gray-800/80 pt-6">
                  <span>Вы также можете использовать один из двух готовых пресетов в верхней панели для мгновенного тестирования.</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BROKER / MANAGER CONTROL PANEL VIEW */}
        {dashboardView === 'manager' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0E1726] border border-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-6 mb-8 gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Settings className="w-6 h-6 text-blue-400 animate-spin-slow" />
                  {t.manager_panel_title}
                </h2>
                <p className="text-xs text-gray-400 mt-1">Осуществляйте внутреннее администрирование поставок, добавляйте примечания и фото.</p>
              </div>
              <div className="bg-blue-600/10 text-blue-400 px-4 py-2 rounded-xl text-xs font-bold border border-blue-500/20">
                Залогинен как: {orders.find(o => o.orderId === selectedOrderToEdit)?.managerName || 'Нурбек'}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* LEFT SIDE: CONTROL CONFIGURATOR */}
              <div className="space-y-6">
                
                {/* Selector 1: Choose active Client Order */}
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2">{t.mgr_select_order}</label>
                  <select
                    value={selectedOrderToEdit}
                    onChange={(e) => setSelectedOrderToEdit(e.target.value)}
                    className="w-full bg-[#070D19] border border-gray-800 focus:border-blue-500 text-white rounded-xl py-3 px-4 text-sm outline-none font-mono"
                  >
                    {orders.map(o => (
                      <option key={o.orderId} value={o.orderId}>
                        {o.orderId} — {o.vehicleName} ({o.customerName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector 2: Milestone Step selector */}
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2">{t.mgr_select_stage}</label>
                  <select
                    value={managerStageIndexToUpdate}
                    onChange={(e) => setManagerStageIndexToUpdate(Number(e.target.value))}
                    className="w-full bg-[#070D19] border border-gray-800 focus:border-blue-500 text-white rounded-xl py-3 px-4 text-sm outline-none"
                  >
                    {orders.find(o => o.orderId === selectedOrderToEdit)?.stages.map((stg, i) => (
                      <option key={stg.id} value={i}>
                        Этап {stg.id}: {lang === 'RU' ? stg.name : lang === 'KG' ? stg.nameKG : stg.nameEN} (Текущий статус: {stg.status})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector 3: Status state selector */}
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2">{t.mgr_status_lbl}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['completed', 'current', 'pending'] as const).map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setManagerStageStatus(status)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                          managerStageStatus === status 
                            ? 'bg-blue-600 border-blue-500 text-white' 
                            : 'bg-[#070D19] border-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {status === 'completed' && t.status_completed}
                        {status === 'current' && t.status_current}
                        {status === 'pending' && t.status_pending}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 4: Notes and Details */}
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2">{t.mgr_note_lbl}</label>
                  <textarea
                    rows={3}
                    placeholder="Например: Погрузка в контейнер завершена без нареканий, закреплен ремнями безопасности..."
                    value={managerNoteInput}
                    onChange={(e) => setManagerNoteInput(e.target.value)}
                    className="w-full bg-[#070D19] border border-gray-800 focus:border-blue-500 text-white rounded-xl p-4 text-xs outline-none resize-none"
                  />
                </div>

                {/* Input 5: Milestone photo mock link */}
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" />
                    {t.mgr_photo_lbl}
                  </label>
                  <select
                    value={managerPhotoSimulatedUrl}
                    onChange={(e) => setManagerPhotoSimulatedUrl(e.target.value)}
                    className="w-full bg-[#070D19] border border-gray-800 focus:border-blue-500 text-white rounded-xl py-3 px-4 text-xs outline-none"
                  >
                    <option value="">Без нового фото (оставить как есть)</option>
                    <option value="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600">Портовый контейнерный хаб</option>
                    <option value="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600">Погрузка автомобиля на автовоз</option>
                    <option value="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600">Таможенный досмотр груза</option>
                  </select>
                </div>

                {/* BUTTON ACTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={handleUpdateStageByManager}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {t.mgr_btn_update}
                  </button>
                  <button
                    onClick={handleMarkDeliveryComplete}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {t.mgr_btn_complete}
                  </button>
                </div>

              </div>

              {/* RIGHT SIDE: INSTANT CUSTOM NOTIFICATIONS DESK */}
              <div className="space-y-6 bg-[#070D19] border border-gray-900 rounded-2xl p-6">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-800 flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-amber-400" />
                  {t.mgr_presets_lbl}
                </h4>

                <div className="space-y-3">
                  <button
                    onClick={() => handleTriggerPresetNotification(
                      lang === 'RU' ? 'Судно отплыло из порта США 🚢' : 'Vessel Departed Origin Port 🚢',
                      lang === 'RU' ? 'Ваш автомобиль Toyota RAV4 покинул порт Джорджии на океанском экспрессе.' : 'Ocean container set sail safely on Maersk Express vessel.'
                    )}
                    className="w-full text-left bg-[#0E1726] border border-gray-800 hover:border-gray-700 p-4 rounded-xl text-xs hover:text-white transition-all flex justify-between items-center group"
                  >
                    <div>
                      <strong className="block text-gray-200 mb-1">Пресет #1: Выход судна в рейс</strong>
                      <span className="text-gray-500">Автоматический импортный морской статус</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </button>

                  <button
                    onClick={() => handleTriggerPresetNotification(
                      lang === 'RU' ? 'Таможенный ордер утвержден 📄' : 'Customs Valuation Ready 📄',
                      lang === 'RU' ? 'Документы успешно зарегистрированы брокером в таможне КР. Ждем сверку стоимости.' : 'Tax paperwork authorized by official customs representative.'
                    )}
                    className="w-full text-left bg-[#0E1726] border border-gray-800 hover:border-gray-700 p-4 rounded-xl text-xs hover:text-white transition-all flex justify-between items-center group"
                  >
                    <div>
                      <strong className="block text-gray-200 mb-1">Пресет #2: Таможенное согласование</strong>
                      <span className="text-gray-500">Уведомление о сверке стоимости КР</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </button>

                  <button
                    onClick={() => handleTriggerPresetNotification(
                      lang === 'RU' ? 'Автомобиль в Бишкеке! 🎉' : 'Vehicle in Bishkek! 🎉',
                      lang === 'RU' ? 'Контейнер прибыл на склад Аламедин. Приглашаем на торжественную разгрузку.' : 'Vessel cargo container unloaded at final Bishkek sorting terminal.'
                    )}
                    className="w-full text-left bg-[#0E1726] border border-gray-800 hover:border-gray-700 p-4 rounded-xl text-xs hover:text-white transition-all flex justify-between items-center group"
                  >
                    <div>
                      <strong className="block text-gray-200 mb-1">Пресет #3: Прибытие в пункт</strong>
                      <span className="text-gray-500">Торжественный привоз на терминал КР</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </button>
                </div>

                {/* CURRENT STATE MINI VISUALIZER FOR BROKER */}
                <div className="border-t border-gray-800/80 pt-6 mt-6">
                  <h5 className="text-[10px] text-gray-500 uppercase font-mono tracking-wider mb-3">Текущий оперативный статус выбранного заказа:</h5>
                  {orders.find(o => o.orderId === selectedOrderToEdit) && (
                    <div className="flex items-center gap-4 bg-[#0E1726] p-4 rounded-xl border border-gray-800/60">
                      <img 
                        src={orders.find(o => o.orderId === selectedOrderToEdit)?.vehiclePhoto} 
                        alt="car preview" 
                        className="w-12 h-12 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {orders.find(o => o.orderId === selectedOrderToEdit)?.vehicleName}
                        </span>
                        <span className="text-[10px] text-gray-400 block font-mono">
                          ID: {orders.find(o => o.orderId === selectedOrderToEdit)?.orderId} | Клиент: {orders.find(o => o.orderId === selectedOrderToEdit)?.customerName}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
