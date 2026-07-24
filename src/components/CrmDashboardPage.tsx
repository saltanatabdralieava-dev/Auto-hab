import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, UserCheck, Car, Truck, DollarSign, Layers, Plus, Calendar, Clock, 
  MessageSquare, FileText, CheckCircle, ChevronRight, BarChart3, TrendingUp, 
  Wallet, Award, Phone, ShieldAlert, Sparkles, Send, Bell, Settings, Search, 
  Check, X, FileCheck, ArrowRight, CornerDownRight, RotateCcw, Share2, Printer, Trash2
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';

interface CrmDashboardPageProps {
  lang: 'RU' | 'KG' | 'EN';
  onBackToCatalog: () => void;
}

// Compact types for modular CRM state
interface CRMLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleOfInterest: string;
  budget: number;
  stage: string;
  date: string;
  manager: string;
  notes: string;
}

interface CRMCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  carsBought: string[];
  favorites: string[];
  notes: string[];
  documents: { name: string; date: string; type: string }[];
}

interface CRMVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: 'available' | 'reserved' | 'sold' | 'transit' | 'auction';
  mileage: number;
  image: string;
}

interface CRMDeal {
  id: string;
  customerName: string;
  vehicle: string;
  price: number;
  paid: number;
  installments: boolean;
  installmentsMonths?: number;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface CRMStaff {
  id: string;
  name: string;
  role: string;
  carsSold: number;
  revenue: number;
  conversionRate: number;
  rating: number;
}

interface CRMTask {
  id: string;
  title: string;
  type: 'call' | 'meeting' | 'followup' | 'delivery';
  dueDate: string;
  manager: string;
  status: 'pending' | 'completed';
}

interface CRMNotification {
  id: string;
  title: string;
  time: string;
  type: 'lead' | 'order' | 'payment' | 'auction' | 'delivery';
  read: boolean;
}

interface CRMFinanceLog {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
}

// Initial Compact Demo Data
const INITIAL_LEADS: CRMLead[] = [
  { id: '1', name: 'Almaz Kadyrov', phone: '+996555102030', email: 'almaz.k@mail.ru', vehicleOfInterest: 'Lexus LX 600', budget: 135000, stage: 'New Lead', date: '2026-07-18', manager: 'Samat Toktobaev', notes: 'Interested in the VIP configuration.' },
  { id: '2', name: 'Nurbek Asanov', phone: '+996777203040', email: 'nurbek@gmail.com', vehicleOfInterest: 'Toyota Land Cruiser 300', budget: 110000, stage: 'Negotiation', date: '2026-07-15', manager: 'Samat Toktobaev', notes: 'Needs installment plan options.' },
  { id: '3', name: 'Meerim Isakova', phone: '+996500304050', email: 'meerim.is@mail.ru', vehicleOfInterest: 'Hyundai Santa Fe', budget: 35000, stage: 'Waiting', date: '2026-07-17', manager: 'Elena Petrova', notes: 'Waiting for custom check from Korea.' },
  { id: '4', name: 'Aibek Alykulov', phone: '+996705405060', email: 'aibek.a@gmail.com', vehicleOfInterest: 'BMW X5 M', budget: 95000, stage: 'Deposit Paid', date: '2026-07-12', manager: 'Adilet Bakytov', notes: 'Deposit of $5,000 received on July 13th.' },
  { id: '5', name: 'Saltanat Smanova', phone: '+996550506070', email: 'saltanat.sm@gmail.com', vehicleOfInterest: 'Kia K5 Signature', budget: 28000, stage: 'Delivered', date: '2026-07-01', manager: 'Elena Petrova', notes: 'Delivered successfully in Bishkek.' }
];

const INITIAL_CUSTOMERS: CRMCustomer[] = [
  { id: '1', name: 'Altynbek Sydykov', phone: '+996552909090', email: 'altyn.syd@mail.ru', carsBought: ['Lexus RX 350 (2020)'], favorites: ['Toyota Sequoia', 'BMW X7'], notes: ['Always prefers black vehicles.', 'VIP customer, family bought 3 cars from us.'], documents: [{ name: 'Purchase_Contract_Lexus.pdf', date: '2026-04-10', type: 'contract' }, { name: 'Passport_Scan.pdf', date: '2026-04-10', type: 'id' }] },
  { id: '2', name: 'Bektur Momunov', phone: '+996770808080', email: 'bektur.m@gmail.com', carsBought: ['Toyota Camry (2021)'], favorites: ['Lexus LX 570'], notes: ['Requested notification for high-grade 2022 SUVs.'], documents: [{ name: 'Invoice_Toyota_Camry.pdf', date: '2026-01-20', type: 'invoice' }] },
  { id: '3', name: 'Darika Ismoilova', phone: '+996501112233', email: 'darika.is@gmail.com', carsBought: [], favorites: ['Hyundai Tucson', 'Kia Sportage'], notes: ['Requires fuel-efficient compact SUV.'], documents: [] }
];

const INITIAL_INVENTORY: CRMVehicle[] = [
  { id: '1', brand: 'Lexus', model: 'LX 600', year: 2023, price: 135000, status: 'available', mileage: 15000, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' },
  { id: '2', brand: 'Toyota', model: 'Land Cruiser 300', year: 2022, price: 110000, status: 'reserved', mileage: 28000, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' },
  { id: '3', brand: 'BMW', model: 'X5 M50i', year: 2021, price: 85000, status: 'sold', mileage: 42000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600' },
  { id: '4', brand: 'Hyundai', model: 'Sonata', year: 2022, price: 235000, status: 'transit', mileage: 34000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600' },
  { id: '5', brand: 'Porsche', model: 'Cayenne Coupé', year: 2023, price: 125000, status: 'auction', mileage: 8000, image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600' }
];

const INITIAL_DEALS: CRMDeal[] = [
  { id: '1', customerName: 'Altynbek Sydykov', vehicle: 'Lexus RX 350', price: 54000, paid: 54000, installments: false, date: '2026-04-10', status: 'completed' },
  { id: '2', customerName: 'Bektur Momunov', vehicle: 'Toyota Camry', price: 28000, paid: 18000, installments: true, installmentsMonths: 12, date: '2026-01-20', status: 'active' },
  { id: '3', customerName: 'Aibek Alykulov', vehicle: 'BMW X5 M', price: 95000, paid: 5000, installments: true, installmentsMonths: 24, date: '2026-07-12', status: 'active' }
];

const INITIAL_STAFF: CRMStaff[] = [
  { id: '1', name: 'Samat Toktobaev', role: 'Sales Manager', carsSold: 14, revenue: 840000, conversionRate: 64, rating: 4.9 },
  { id: '2', name: 'Elena Petrova', role: 'Broker / Specialist', carsSold: 11, revenue: 520000, conversionRate: 58, rating: 4.8 },
  { id: '3', name: 'Adilet Bakytov', role: 'Auction Specialist', carsSold: 9, revenue: 480000, conversionRate: 52, rating: 4.7 },
  { id: '4', name: 'Daniyar Isaev', role: 'Logistics Lead', carsSold: 18, revenue: 920000, conversionRate: 72, rating: 4.95 },
  { id: '5', name: 'Kunduz Alieva', role: 'Finance Director', carsSold: 0, revenue: 0, conversionRate: 100, rating: 5.0 }
];

const INITIAL_TASKS: CRMTask[] = [
  { id: '1', title: 'Call Almaz Kadyrov re: Lexus LX 600 VIP spec', type: 'call', dueDate: '2026-07-20', manager: 'Samat Toktobaev', status: 'pending' },
  { id: '2', title: 'Meeting with Nurbek Asanov to sign Toyota Camry papers', type: 'meeting', dueDate: '2026-07-21', manager: 'Samat Toktobaev', status: 'pending' },
  { id: '3', title: 'Follow-up on Korea Transit status of Hyundai Santa Fe', type: 'followup', dueDate: '2026-07-20', manager: 'Elena Petrova', status: 'pending' },
  { id: '4', title: 'Remind logistics to deliver Kia K5 signature', type: 'delivery', dueDate: '2026-07-19', manager: 'Daniyar Isaev', status: 'completed' }
];

const INITIAL_NOTIFICATIONS: CRMNotification[] = [
  { id: '1', title: 'New lead "Almaz Kadyrov" submitted request for Lexus LX 600', time: '2 hours ago', type: 'lead', read: false },
  { id: '2', title: 'Payment of $5,000 received from Aibek Alykulov for BMW X5 M', time: '4 hours ago', type: 'payment', read: false },
  { id: '3', title: 'Auction Won: Lot #4123 (Porsche Cayenne 2023) won for $115,000', time: '1 day ago', type: 'auction', read: true },
  { id: '4', title: 'Vehicle Hyundai Santa Fe (Transit) departed from Incheon Port', time: '2 days ago', type: 'delivery', read: true }
];

const INITIAL_FINANCES: CRMFinanceLog[] = [
  { id: '1', type: 'income', category: 'Car Sale', amount: 54000, date: '2026-07-10', description: 'Lexus RX 350 sale' },
  { id: '2', type: 'income', category: 'Deposit', amount: 5000, date: '2026-07-12', description: 'BMW X5 M deposit' },
  { id: '3', type: 'expense', category: 'Auction Purchase', amount: 115000, date: '2026-07-13', description: 'Porsche Cayenne win' },
  { id: '4', type: 'expense', category: 'Logistics / Shipping', amount: 2500, date: '2026-07-14', description: 'Ocean freight from Korea' },
  { id: '5', type: 'income', category: 'Car Sale', amount: 28000, date: '2026-07-15', description: 'Toyota Camry sale full' }
];

const STAGES = [
  'New Lead',
  'Contacted',
  'Negotiation',
  'Waiting',
  'Deposit Paid',
  'Purchased',
  'Delivered',
  'Closed'
];

export function CrmDashboardPage({ lang, onBackToCatalog }: CrmDashboardPageProps) {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'customers' | 'inventory' | 'sales' | 'tasks' | 'reports' | 'finance' | 'staff' | 'notifications'>('dashboard');

  // Main local storage persistent states
  const [leads, setLeads] = useState<CRMLead[]>(() => {
    const saved = localStorage.getItem('crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [customers, setCustomers] = useState<CRMCustomer[]>(() => {
    const saved = localStorage.getItem('crm_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [inventory, setInventory] = useState<CRMVehicle[]>(() => {
    const saved = localStorage.getItem('crm_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [deals, setDeals] = useState<CRMDeal[]>(() => {
    const saved = localStorage.getItem('crm_deals');
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  const [staff, setStaff] = useState<CRMStaff[]>(() => {
    const saved = localStorage.getItem('crm_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [tasks, setTasks] = useState<CRMTask[]>(() => {
    const saved = localStorage.getItem('crm_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [notifications, setNotifications] = useState<CRMNotification[]>(() => {
    const saved = localStorage.getItem('crm_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [finances, setFinances] = useState<CRMFinanceLog[]>(() => {
    const saved = localStorage.getItem('crm_finances');
    return saved ? JSON.parse(saved) : INITIAL_FINANCES;
  });

  // Persist states to local storage
  useEffect(() => { localStorage.setItem('crm_leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('crm_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('crm_inventory', JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { localStorage.setItem('crm_deals', JSON.stringify(deals)); }, [deals]);
  useEffect(() => { localStorage.setItem('crm_staff', JSON.stringify(staff)); }, [staff]);
  useEffect(() => { localStorage.setItem('crm_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('crm_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('crm_finances', JSON.stringify(finances)); }, [finances]);

  // UI state variables
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('1');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceCustomer, setInvoiceCustomer] = useState('');
  const [invoiceVehicle, setInvoiceVehicle] = useState('');
  const [invoicePrice, setInvoicePrice] = useState('');
  const [invoiceInstallments, setInvoiceInstallments] = useState(false);
  const [invoiceMonths, setInvoiceMonths] = useState('12');

  // Input states for adding data
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadVehicle, setNewLeadVehicle] = useState('');
  const [newLeadBudget, setNewLeadBudget] = useState('');

  const [showAddCust, setShowAddCust] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehBrand, setNewVehBrand] = useState('');
  const [newVehModel, setNewVehModel] = useState('');
  const [newVehPrice, setNewVehPrice] = useState('');
  const [newVehStatus, setNewVehStatus] = useState<'available' | 'reserved' | 'sold' | 'transit' | 'auction'>('available');

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskType, setNewTaskType] = useState<'call' | 'meeting' | 'followup' | 'delivery'>('call');
  const [newTaskDue, setNewTaskDue] = useState('');

  const [newNoteText, setNewNoteText] = useState('');
  const [newDocName, setNewDocName] = useState('');

  const [simulatedLog, setSimulatedLog] = useState<string | null>(null);

  // Localization Dictionary
  const localText = {
    RU: {
      title: "Панель управления AutoHub CRM PRO",
      subtitle: "Премиум-решение для дилерского центра Askar AutoHub KG",
      overview: "Обзор CRM",
      leads: "Канбан Лидов",
      customers: "Клиенты",
      inventory: "Автопарк / Склад",
      sales: "Продажи и Счета",
      tasks: "Задачи / Календарь",
      reports: "Аналитика & Отчеты",
      finance: "Финансы",
      staff: "Персонал",
      notifications: "Уведомления",
      quickActions: "Быстрые действия",
      totalLeads: "Всего лидов",
      activeCust: "Активные клиенты",
      carsStock: "Авто в наличии",
      carsTransit: "Авто в транзите",
      deliveredCars: "Доставлено",
      revMonth: "Выручка за месяц",
      pendingPay: "Ожидают оплаты",
      activeAuctions: "Активные аукционы",
      teamPerf: "Рейтинг команды",
      whatsAppChat: "Написать в WhatsApp",
      call: "Позвонить",
      addNewLead: "Создать лид",
      addNewCustomer: "Добавить клиента",
      addNewVehicle: "Добавить авто",
      addNewTask: "Добавить задачу",
      generateInvoice: "Выписать счет",
      searchPlaceholder: "Поиск в CRM...",
      currencySymbol: "$"
    },
    KG: {
      title: "AutoHub CRM PRO Башкаруу Панели",
      subtitle: "Askar AutoHub KG дилердик борбору үчүн премиум-чечим",
      overview: "CRM Сереп",
      leads: "Лиддер Канбаны",
      customers: "Кардарлар",
      inventory: "Автопарк / Склад",
      sales: "Сатуу жана Эсептер",
      tasks: "Тапшырмалар / Календарь",
      reports: "Аналитика жана Отчеттор",
      finance: "Финансы",
      staff: "Кызматкерлер",
      notifications: "Билдирүүлөр",
      quickActions: "Тез аракеттер",
      totalLeads: "Жалпы лиддер",
      activeCust: "Активдүү кардарлар",
      carsStock: "Кампадагы унаалар",
      carsTransit: "Транзиттеги унаалар",
      deliveredCars: "Жеткирилди",
      revMonth: "Айлык киреше",
      pendingPay: "Төлөм күткөндөр",
      activeAuctions: "Активдүү аукциондор",
      teamPerf: "Команда рейтинги",
      whatsAppChat: "WhatsApp аркылуу жазуу",
      call: "Чалуу",
      addNewLead: "Лид кошуу",
      addNewCustomer: "Кардар кошуу",
      addNewVehicle: "Унаа кошуу",
      addNewTask: "Тапшырма кошуу",
      generateInvoice: "Эсеп-фактура түзүү",
      searchPlaceholder: "CRM издөө...",
      currencySymbol: "$"
    },
    EN: {
      title: "AutoHub CRM PRO Management",
      subtitle: "Enterprise Dealership CRM for Askar AutoHub KG",
      overview: "CRM Overview",
      leads: "Leads Board",
      customers: "Customers Directory",
      inventory: "Stock & Logistics",
      sales: "Sales & Invoicing",
      tasks: "Tasks & Agenda",
      reports: "Reports & Analytics",
      finance: "Treasury & Cash",
      staff: "Staff Performance",
      notifications: "Event Monitor",
      quickActions: "Quick Operations",
      totalLeads: "Total Leads",
      activeCust: "Active Clients",
      carsStock: "Vehicles in Stock",
      carsTransit: "Cars in Transit",
      deliveredCars: "Delivered",
      revMonth: "Monthly Revenue",
      pendingPay: "Pending Balances",
      activeAuctions: "Active Bids",
      teamPerf: "Sales Performance",
      whatsAppChat: "Open WhatsApp",
      call: "Direct Call",
      addNewLead: "Add Lead",
      addNewCustomer: "Register Client",
      addNewVehicle: "Intake Vehicle",
      addNewTask: "Create Task",
      generateInvoice: "Issue Invoice",
      searchPlaceholder: "Search CRM record...",
      currencySymbol: "$"
    }
  }[lang];

  // Calculated Stats
  const stats = useMemo(() => {
    const totalLeadsCount = leads.length;
    const activeCustomersCount = customers.length;
    const carsInStock = inventory.filter(c => c.status === 'available' || c.status === 'reserved').length;
    const carsInTransit = inventory.filter(c => c.status === 'transit').length;
    const deliveredCount = leads.filter(l => l.stage === 'Delivered').length;
    
    const monthlyRevenue = finances
      .filter(f => f.type === 'income' && f.category === 'Car Sale')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const pendingPayments = deals
      .filter(d => d.status === 'active')
      .reduce((acc, curr) => acc + (curr.price - curr.paid), 0);

    const activeAuctions = inventory.filter(c => c.status === 'auction').length;

    const avgTeamRating = (staff.reduce((acc, curr) => acc + curr.rating, 0) / staff.length).toFixed(2);

    return {
      totalLeadsCount,
      activeCustomersCount,
      carsInStock,
      carsInTransit,
      deliveredCount,
      monthlyRevenue,
      pendingPayments,
      activeAuctions,
      avgTeamRating
    };
  }, [leads, customers, inventory, finances, deals, staff]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;
    return leads.filter(l => 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      l.vehicleOfInterest.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const activeCustomerRecord = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId) || customers[0] || null;
  }, [customers, selectedCustomerId]);

  // Filtered Inventory
  const filteredInventory = useMemo(() => {
    if (!searchTerm) return inventory;
    return inventory.filter(c => 
      c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventory, searchTerm]);

  // Move Lead to next stage
  const handleMoveLead = (id: string, dir: 'next' | 'prev') => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        const currentIndex = STAGES.indexOf(lead.stage);
        let nextIndex = currentIndex;
        if (dir === 'next' && currentIndex < STAGES.length - 1) {
          nextIndex++;
        } else if (dir === 'prev' && currentIndex > 0) {
          nextIndex--;
        }
        
        // Post event notification if changed to "Purchased" or "Delivered"
        const nextStage = STAGES[nextIndex];
        if (nextStage !== lead.stage) {
          if (nextStage === 'Purchased') {
            triggerSimulatedNotification(`Lead ${lead.name} purchased ${lead.vehicleOfInterest}`, 'order');
          } else if (nextStage === 'Delivered') {
            triggerSimulatedNotification(`Vehicle ${lead.vehicleOfInterest} delivered to ${lead.name}`, 'delivery');
          }
        }

        return { ...lead, stage: nextStage };
      }
      return lead;
    }));
  };

  // Helper to push notifications dynamically
  const triggerSimulatedNotification = (title: string, type: 'lead' | 'order' | 'payment' | 'auction' | 'delivery') => {
    const newNotif: CRMNotification = {
      id: String(Date.now()),
      title,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setSimulatedLog(title);
    setTimeout(() => setSimulatedLog(null), 5000);
  };

  // Actions
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadBudget) return;
    const created: CRMLead = {
      id: String(Date.now()),
      name: newLeadName,
      phone: newLeadPhone || '+996555102030',
      email: `${newLeadName.toLowerCase().replace(' ', '')}@autohub.kg`,
      vehicleOfInterest: newLeadVehicle || 'Toyota Camry',
      budget: Number(newLeadBudget),
      stage: 'New Lead',
      date: new Date().toISOString().split('T')[0],
      manager: staff[Math.floor(Math.random() * staff.length)].name,
      notes: 'Acquired from CRM manual intake.'
    };
    setLeads(prev => [...prev, created]);
    triggerSimulatedNotification(`New manual Lead created: "${created.name}" for ${created.vehicleOfInterest}`, 'lead');
    
    // Auto register a customer draft if needed
    const existCust = customers.some(c => c.name.toLowerCase() === newLeadName.toLowerCase());
    if (!existCust) {
      const newCust: CRMCustomer = {
        id: String(Date.now() + 1),
        name: newLeadName,
        phone: newLeadPhone || '+996555102030',
        email: `${newLeadName.toLowerCase().replace(' ', '')}@autohub.kg`,
        carsBought: [],
        favorites: [newLeadVehicle],
        notes: ['Imported automatically from new leads intake.'],
        documents: []
      };
      setCustomers(prev => [...prev, newCust]);
    }

    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadVehicle('');
    setNewLeadBudget('');
    setShowAddLead(false);
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName) return;
    const created: CRMCustomer = {
      id: String(Date.now()),
      name: newCustName,
      phone: newCustPhone || '+996555000000',
      email: newCustEmail || `${newCustName.toLowerCase().replace(' ', '')}@mail.ru`,
      carsBought: [],
      favorites: [],
      notes: ['VIP Registered.'],
      documents: []
    };
    setCustomers(prev => [...prev, created]);
    setSelectedCustomerId(created.id);
    setNewCustName('');
    setNewCustPhone('');
    setNewCustEmail('');
    setShowAddCust(false);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehBrand || !newVehModel || !newVehPrice) return;
    const created: CRMVehicle = {
      id: String(Date.now()),
      brand: newVehBrand,
      model: newVehModel,
      year: 2023,
      price: Number(newVehPrice),
      status: newVehStatus,
      mileage: 5000,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400'
    };
    setInventory(prev => [...prev, created]);
    triggerSimulatedNotification(`New vehicle added to inventory: ${created.brand} ${created.model}`, 'delivery');
    setNewVehBrand('');
    setNewVehModel('');
    setNewVehPrice('');
    setShowAddVehicle(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskDue) return;
    const created: CRMTask = {
      id: String(Date.now()),
      title: newTaskTitle,
      type: newTaskType,
      dueDate: newTaskDue,
      manager: 'Samat Toktobaev',
      status: 'pending'
    };
    setTasks(prev => [...prev, created]);
    setNewTaskTitle('');
    setNewTaskDue('');
    setShowAddTask(false);
  };

  const handleAddNote = () => {
    if (!newNoteText || !selectedCustomerId) return;
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomerId) {
        return { ...c, notes: [...c.notes, newNoteText] };
      }
      return c;
    }));
    setNewNoteText('');
  };

  const handleAddDoc = () => {
    if (!newDocName || !selectedCustomerId) return;
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomerId) {
        return { 
          ...c, 
          documents: [...c.documents, { name: `${newDocName}.pdf`, date: new Date().toISOString().split('T')[0], type: 'contract' }] 
        };
      }
      return c;
    }));
    setNewDocName('');
  };

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceCustomer || !invoiceVehicle || !invoicePrice) return;
    const createdDeal: CRMDeal = {
      id: String(Date.now()),
      customerName: invoiceCustomer,
      vehicle: invoiceVehicle,
      price: Number(invoicePrice),
      paid: invoiceInstallments ? Math.round(Number(invoicePrice) * 0.3) : Number(invoicePrice),
      installments: invoiceInstallments,
      installmentsMonths: invoiceInstallments ? Number(invoiceMonths) : undefined,
      date: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setDeals(prev => [...prev, createdDeal]);

    // Financial ledger logging
    const newFin: CRMFinanceLog = {
      id: String(Date.now() + 1),
      type: 'income',
      category: 'Car Sale',
      amount: createdDeal.paid,
      date: new Date().toISOString().split('T')[0],
      description: `Payment received for ${createdDeal.vehicle}`
    };
    setFinances(prev => [...prev, newFin]);

    triggerSimulatedNotification(`Invoice issued for ${createdDeal.customerName} - ${createdDeal.vehicle}. Paid $${createdDeal.paid}`, 'payment');
    setIsInvoiceModalOpen(false);
    setInvoiceCustomer('');
    setInvoiceVehicle('');
    setInvoicePrice('');
    setInvoiceInstallments(false);
  };

  // Recharts Analytics mock data aggregates
  const reportsSalesData = useMemo(() => {
    return [
      { name: 'Jan', sales: 4, revenue: 160000 },
      { name: 'Feb', sales: 7, revenue: 320000 },
      { name: 'Mar', sales: 9, revenue: 410000 },
      { name: 'Apr', sales: 12, revenue: 590000 },
      { name: 'May', sales: 15, revenue: 720000 },
      { name: 'Jun', sales: 18, revenue: 940000 },
      { name: 'Jul', sales: 22, revenue: 1100000 }
    ];
  }, []);

  const brandsShareData = useMemo(() => {
    return [
      { name: 'Lexus', value: 45, color: '#0B3D91' },
      { name: 'Toyota', value: 30, color: '#D4AF37' },
      { name: 'BMW', value: 15, color: '#1E293B' },
      { name: 'Porsche', value: 10, color: '#EF4444' }
    ];
  }, []);

  const cashFlowTrendData = useMemo(() => {
    return [
      { name: '07/10', cash: 54000 },
      { name: '07/12', cash: 59000 },
      { name: '07/13', cash: -56000 },
      { name: '07/14', cash: -58500 },
      { name: '07/15', cash: -30500 }
    ];
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="autohub-crm-root">
      
      {/* Dynamic Simulated Event Alert */}
      <AnimatePresence>
        {simulatedLog && (
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[100] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-6 py-4 rounded-2xl shadow-2xl border border-amber-400 font-bold flex items-center space-x-3 text-sm"
          >
            <Bell className="w-5 h-5 animate-bounce" />
            <span>{simulatedLog}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRM Main Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-[#0B3D91] to-blue-600 p-2.5 rounded-xl shadow-inner text-amber-400 font-black tracking-tighter text-lg">
            AH
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black text-white tracking-tight uppercase">AutoHub CRM</span>
              <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                PRO ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-slate-400">{localText.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Action Trigger Buttons */}
          <button 
            onClick={() => {
              setInvoiceCustomer(customers[0]?.name || '');
              setInvoiceVehicle(inventory[0]?.brand + ' ' + inventory[0]?.model);
              setInvoicePrice('85000');
              setIsInvoiceModalOpen(true);
            }} 
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center space-x-1 shadow-md hover:scale-102"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{localText.generateInvoice}</span>
          </button>

          <button 
            onClick={() => setShowAddLead(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center space-x-1 shadow-md hover:scale-102"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{localText.addNewLead}</span>
          </button>

          {/* Return to portal */}
          <button 
            onClick={onBackToCatalog} 
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-all"
          >
            {lang === 'RU' ? 'Вернуться в каталог' : lang === 'KG' ? 'Каталогко кайтуу' : 'Catalog Home'}
          </button>
        </div>
      </div>

      {/* Primary Layout Block: Left Sidebar + Right Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase px-2">
              {lang === 'RU' ? 'МОДУЛИ УПРАВЛЕНИЯ' : lang === 'KG' ? 'БАШКАРУУ МОДУЛДОРУ' : 'MANAGEMENT MODULES'}
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: localText.overview, icon: Layers },
                { id: 'leads', label: localText.leads, icon: Users, badge: leads.filter(l => l.stage === 'New Lead').length },
                { id: 'customers', label: localText.customers, icon: UserCheck },
                { id: 'inventory', label: localText.inventory, icon: Car },
                { id: 'sales', label: localText.sales, icon: FileText },
                { id: 'tasks', label: localText.tasks, icon: Calendar, badge: tasks.filter(t => t.status === 'pending').length },
                { id: 'reports', label: localText.reports, icon: BarChart3 },
                { id: 'finance', label: localText.finance, icon: Wallet },
                { id: 'staff', label: localText.staff, icon: Award },
                { id: 'notifications', label: localText.notifications, icon: Bell, badge: notifications.filter(n => !n.read).length }
              ].map((m) => {
                const Icon = m.icon;
                const isActive = activeTab === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveTab(m.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-[#0B3D91]/25 text-white border-l-4 border-amber-400' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span>{m.label}</span>
                    </div>
                    {m.badge !== undefined && m.badge > 0 && (
                      <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                        {m.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Dealer Context card */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'RU' ? 'Подключение: Активно' : lang === 'KG' ? 'Байланыш: Активдүү' : 'Cloud DB: Connected'}
              </span>
            </div>
            <p className="text-[11px] font-bold text-white mt-1">Askar AutoHub Dealer</p>
            <p className="text-[9px] text-slate-500">Role: Supervisor / Manager</p>
          </div>
        </aside>

        {/* MAIN INTERACTIVE AREA */}
        <main className="flex-1 bg-slate-950 p-6 overflow-y-auto">
          
          {/* Top Search bar */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder={localText.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Server Time: <span className="text-amber-400">2026-07-19 13:38 UTC</span>
            </div>
          </div>

          {/* Render Tab Views Dynamically */}

          {/* VIEW 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* KPIs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                  { label: localText.totalLeads, val: stats.totalLeadsCount, diff: "+12% this wk", icon: Users, color: "text-blue-400" },
                  { label: localText.activeCust, val: stats.activeCustomersCount, diff: "+4 VIP", icon: UserCheck, color: "text-amber-400" },
                  { label: localText.carsStock, val: stats.carsInStock, diff: "Stock safe", icon: Car, color: "text-emerald-400" },
                  { label: localText.carsTransit, val: stats.carsTransit, diff: "3 from Korea", icon: Truck, color: "text-purple-400" },
                  { label: "Delivered Cars", val: stats.deliveredCount, diff: "100% rate", icon: CheckCircle, color: "text-teal-400" },
                  { label: localText.revMonth, val: `$${stats.monthlyRevenue.toLocaleString()}`, diff: "Target: $1.2M", icon: DollarSign, color: "text-green-400" },
                  { label: localText.pendingPay, val: `$${stats.pendingPayments.toLocaleString()}`, diff: "Active contracts", icon: Wallet, color: "text-rose-400" },
                  { label: localText.activeAuctions, val: stats.activeAuctions, diff: "Bidding Live", icon: Clock, color: "text-indigo-400" }
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-[#0B3D91] transition-all">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#0B3D91]/5 rounded-full blur-2xl group-hover:bg-[#0B3D91]/10 transition-all" />
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{kpi.label}</p>
                          <h4 className="text-2xl font-black text-white mt-1 tracking-tight">{kpi.val}</h4>
                        </div>
                        <div className={`p-2 rounded-xl bg-slate-950/60 border border-slate-800 ${kpi.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-slate-400 font-semibold">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span>{kpi.diff}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{localText.quickActions}</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <button onClick={() => setShowAddLead(true)} className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 text-center transition-all">
                    <Users className="w-5 h-5 mx-auto text-blue-400 mb-1" />
                    <span className="text-[10px] font-black block text-slate-300">Add Lead</span>
                  </button>
                  <button onClick={() => setShowAddCust(true)} className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 text-center transition-all">
                    <UserCheck className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                    <span className="text-[10px] font-black block text-slate-300">Add Customer</span>
                  </button>
                  <button onClick={() => setShowAddVehicle(true)} className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 text-center transition-all">
                    <Car className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                    <span className="text-[10px] font-black block text-slate-300">Add Vehicle</span>
                  </button>
                  <button onClick={() => {
                    setInvoiceCustomer('Almaz Kadyrov');
                    setInvoiceVehicle('Lexus LX 600');
                    setInvoicePrice('135000');
                    setIsInvoiceModalOpen(true);
                  }} className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 text-center transition-all">
                    <FileText className="w-5 h-5 mx-auto text-teal-400 mb-1" />
                    <span className="text-[10px] font-black block text-slate-300">Issue Invoice</span>
                  </button>
                  <button onClick={() => triggerSimulatedNotification("Started luxury SUV auction sweep on Korea Auctions portal", "auction")} className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 text-center transition-all">
                    <Clock className="w-5 h-5 mx-auto text-indigo-400 mb-1" />
                    <span className="text-[10px] font-black block text-slate-300">Start Auction</span>
                  </button>
                  <button onClick={() => window.open('https://wa.me/996555123456', '_blank')} className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 text-center transition-all">
                    <MessageSquare className="w-5 h-5 mx-auto text-green-400 mb-1" />
                    <span className="text-[10px] font-black block text-slate-300">WhatsApp CRM</span>
                  </button>
                </div>
              </div>

              {/* Charts & Lead Board Summary Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 lg:col-span-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Sales Performance & Revenue Trend</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={reportsSalesData}>
                        <defs>
                          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0B3D91" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#0B3D91" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }} />
                        <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#3b82f6" fillOpacity={1} fill="url(#revGrad)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pending Tasks Alert</h4>
                  <div className="space-y-3">
                    {tasks.slice(0, 4).map((t) => (
                      <div key={t.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-white">{t.title}</p>
                          <p className="text-[9px] text-slate-500 font-mono mt-1">Due: {t.dueDate} | {t.manager}</p>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${
                          t.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    ))}
                    <button onClick={() => setActiveTab('tasks')} className="w-full text-center text-xs font-bold text-amber-400 mt-2 block hover:underline">
                      View all tasks & calendar →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: LEADS PIPELINE (KANBAN BOARD) */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Active Deal Pipeline</h3>
                  <p className="text-xs text-slate-400">Total volume of active custom requests</p>
                </div>
                <button 
                  onClick={() => setShowAddLead(true)}
                  className="bg-[#0B3D91] hover:bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-xl transition-all flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{localText.addNewLead}</span>
                </button>
              </div>

              {/* Pipeline Kanban columns */}
              <div className="flex gap-4 overflow-x-auto pb-6">
                {STAGES.map((stage) => {
                  const stageLeads = filteredLeads.filter(l => l.stage === stage);
                  return (
                    <div key={stage} className="min-w-[280px] w-72 bg-slate-900/80 rounded-2xl border border-slate-800/80 p-3 flex flex-col space-y-3 shadow-xl">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-xs font-black text-slate-200 tracking-wide">{stage}</span>
                        <span className="bg-slate-950 text-slate-400 text-[10px] px-2 py-0.5 rounded-md font-bold">
                          {stageLeads.length}
                        </span>
                      </div>

                      <div className="flex-1 space-y-3 min-h-[350px]">
                        {stageLeads.length === 0 ? (
                          <div className="border border-dashed border-slate-800 rounded-xl p-4 text-center text-[11px] text-slate-500 font-semibold">
                            No leads in this stage
                          </div>
                        ) : (
                          stageLeads.map((lead) => (
                            <div key={lead.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-amber-400/50 transition-all shadow-md space-y-2.5">
                              <div className="flex justify-between items-start">
                                <p className="text-xs font-black text-white">{lead.name}</p>
                                <span className="text-[10px] text-amber-400 font-mono font-bold">${lead.budget.toLocaleString()}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 font-semibold">{lead.vehicleOfInterest}</p>
                              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-1.5 border-t border-slate-900">
                                <span>{lead.manager}</span>
                                <span>{lead.date}</span>
                              </div>

                              {/* Movement Quick buttons */}
                              <div className="flex justify-between space-x-1 pt-1.5">
                                <button 
                                  disabled={stage === STAGES[0]}
                                  onClick={() => handleMoveLead(lead.id, 'prev')}
                                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-[9px] font-bold py-1 rounded border border-slate-800 text-slate-400 disabled:opacity-40"
                                >
                                  ← Back
                                </button>
                                <button 
                                  disabled={stage === STAGES[STAGES.length - 1]}
                                  onClick={() => handleMoveLead(lead.id, 'next')}
                                  className="flex-1 bg-blue-900/30 hover:bg-blue-900/50 text-[9px] font-black py-1 rounded border border-blue-800/30 text-blue-400 disabled:opacity-40"
                                >
                                  Move Forward →
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: CUSTOMERS SECTION */}
          {activeTab === 'customers' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Customers Directory list */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 lg:col-span-1 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Customers List</h3>
                  <button onClick={() => setShowAddCust(true)} className="p-1.5 bg-[#0B3D91] hover:bg-blue-600 rounded-lg text-white">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {filteredCustomers.map((cust) => (
                    <button
                      key={cust.id}
                      onClick={() => setSelectedCustomerId(cust.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex justify-between items-center ${
                        selectedCustomerId === cust.id 
                          ? 'bg-[#0B3D91]/20 border-amber-400 text-white' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{cust.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{cust.phone}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Profile detail panel */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 lg:col-span-2 space-y-6">
                {activeCustomerRecord ? (
                  <>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">VIP CUSTOMER</span>
                        <h3 className="text-xl font-black text-white mt-1.5">{activeCustomerRecord.name}</h3>
                        <p className="text-xs text-slate-400 font-mono">{activeCustomerRecord.email}</p>
                      </div>

                      <div className="flex gap-2">
                        {/* WhatsApp real direct short shortcut */}
                        <a 
                          href={`https://wa.me/${activeCustomerRecord.phone.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a 
                          href={`tel:${activeCustomerRecord.phone}`}
                          className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-all flex items-center space-x-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: purchase history & favorites */}
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-2">PURCHASE HISTORY</h4>
                          {activeCustomerRecord.carsBought.length === 0 ? (
                            <p className="text-xs text-slate-400 italic">No cars purchased yet</p>
                          ) : (
                            <div className="space-y-2">
                              {activeCustomerRecord.carsBought.map((car, i) => (
                                <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2 text-xs font-bold">
                                  <Check className="w-4 h-4 text-emerald-400" />
                                  <span className="text-slate-200">{car}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-2">FAVORITE VEHICLES</h4>
                          {activeCustomerRecord.favorites.length === 0 ? (
                            <p className="text-xs text-slate-400 italic">No favorites starred</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {activeCustomerRecord.favorites.map((fav, i) => (
                                <span key={i} className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
                                  ⭐ {fav}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Notes editor & document upload */}
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase">NOTES & MEMOS</h4>
                            <button onClick={handleAddNote} className="text-[10px] font-bold text-amber-400 hover:underline">Add Note</button>
                          </div>
                          <textarea
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            placeholder="Write customer update..."
                            className="w-full bg-slate-950 p-2.5 text-xs text-slate-300 rounded-xl border border-slate-800 focus:outline-none"
                            rows={3}
                          />
                          <div className="mt-2 space-y-1.5 max-h-32 overflow-y-auto">
                            {activeCustomerRecord.notes.map((n, i) => (
                              <div key={i} className="text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-900 text-slate-400">
                                {n}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase">DOCUMENTS VAULT</h4>
                            <button onClick={handleAddDoc} className="text-[10px] font-bold text-amber-400 hover:underline">Add Doc</button>
                          </div>
                          <input
                            type="text"
                            placeholder="Invoice / Passport Scan name"
                            value={newDocName}
                            onChange={(e) => setNewDocName(e.target.value)}
                            className="w-full bg-slate-950 p-2 text-xs text-slate-300 rounded-xl border border-slate-800 focus:outline-none mb-2"
                          />
                          <div className="space-y-1.5">
                            {activeCustomerRecord.documents.map((doc, i) => (
                              <div key={i} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs font-medium">
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-4 h-4 text-amber-400" />
                                  <span className="text-slate-300">{doc.name}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">{doc.date}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </>
                ) : (
                  <p className="text-slate-400 italic text-center py-10">Select a customer profile</p>
                )}
              </div>

            </div>
          )}

          {/* VIEW 4: INVENTORY DATABASE */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Enterprise Inventory</h3>
                  <p className="text-xs text-slate-400">Total list of vehicle stock statuses</p>
                </div>
                <button 
                  onClick={() => setShowAddVehicle(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{localText.addNewVehicle}</span>
                </button>
              </div>

              {/* Inventory stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Available", val: inventory.filter(c => c.status === 'available').length, style: "border-emerald-500/20 text-emerald-400" },
                  { label: "Reserved", val: inventory.filter(c => c.status === 'reserved').length, style: "border-amber-500/20 text-amber-400" },
                  { label: "Transit", val: inventory.filter(c => c.status === 'transit').length, style: "border-purple-500/20 text-purple-400" },
                  { label: "Auction Search", val: inventory.filter(c => c.status === 'auction').length, style: "border-indigo-500/20 text-indigo-400" },
                  { label: "Sold out", val: inventory.filter(c => c.status === 'sold').length, style: "border-slate-800 text-slate-500" }
                ].map((stat, i) => (
                  <div key={i} className={`bg-slate-900 p-3 rounded-xl border text-center ${stat.style}`}>
                    <h5 className="text-[10px] uppercase font-bold text-slate-400">{stat.label}</h5>
                    <p className="text-lg font-black mt-1">{stat.val}</p>
                  </div>
                ))}
              </div>

              {/* Table list */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Year</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Mileage</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-center">Operation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredInventory.map((car) => (
                      <tr key={car.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-bold text-white flex items-center space-x-3">
                          <img src={car.image} alt="car" className="w-10 h-7 object-cover rounded-lg" referrerPolicy="no-referrer" />
                          <span>{car.brand} {car.model}</span>
                        </td>
                        <td className="p-4 text-slate-300 font-mono">{car.year}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            car.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                            car.status === 'reserved' ? 'bg-amber-500/20 text-amber-400' :
                            car.status === 'transit' ? 'bg-purple-500/20 text-purple-400' :
                            car.status === 'auction' ? 'bg-indigo-500/20 text-indigo-400' :
                            'bg-slate-800 text-slate-500'
                          }`}>
                            {car.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 font-mono">{car.mileage.toLocaleString()} km</td>
                        <td className="p-4 text-amber-400 font-mono font-bold">${car.price.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => {
                              setInventory(prev => prev.map(c => c.id === car.id ? { ...c, status: c.status === 'available' ? 'reserved' : 'available' } : c));
                              triggerSimulatedNotification(`Toggled status for ${car.brand} ${car.model}`, 'order');
                            }} 
                            className="bg-slate-950 hover:bg-slate-800 text-[10px] font-black px-3 py-1.5 rounded-lg text-slate-300 border border-slate-800"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 5: SALES MANAGEMENT & INVOICING */}
          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Deals & Contracts Portal</h3>
                  <p className="text-xs text-slate-400">Manage invoices, payments, and installment contracts</p>
                </div>
                <button 
                  onClick={() => {
                    setInvoiceCustomer('Darika Ismoilova');
                    setInvoiceVehicle('Kia Sportage');
                    setInvoicePrice('24000');
                    setIsInvoiceModalOpen(true);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>{localText.generateInvoice}</span>
                </button>
              </div>

              {/* Deal list table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Vehicle</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Paid Amount</th>
                      <th className="p-4">Remaining Balance</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-center">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {deals.map((deal) => {
                      const balance = deal.price - deal.paid;
                      return (
                        <tr key={deal.id} className="hover:bg-slate-800/40">
                          <td className="p-4 font-bold text-white">{deal.customerName}</td>
                          <td className="p-4 text-slate-300">{deal.vehicle}</td>
                          <td className="p-4 text-slate-200 font-mono font-bold">${deal.price.toLocaleString()}</td>
                          <td className="p-4 text-emerald-400 font-mono">${deal.paid.toLocaleString()}</td>
                          <td className="p-4 font-mono font-semibold text-rose-400">
                            ${balance.toLocaleString()} {deal.installments && <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1 py-0.2 rounded-full">Installments</span>}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              deal.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {deal.status}
                            </span>
                          </td>
                          <td className="p-4 text-slate-500 font-mono">{deal.date}</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => {
                                triggerSimulatedNotification(`Simulating printing contract for ${deal.customerName}...`, 'payment');
                              }} 
                              className="bg-slate-950 hover:bg-slate-800 p-2 rounded-lg text-slate-300 hover:text-white border border-slate-850"
                              title="Print Contract"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 6: STAFF PERFORMANCE BOARD */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Dealership Staff Performance</h3>
                <p className="text-xs text-slate-400">Track monthly cars sold, conversion rates, and client ratings</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {staff.map((employee) => (
                  <div key={employee.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-black text-white">{employee.name}</h4>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{employee.role}</p>
                      </div>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        ⭐ {employee.rating}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-500">Cars Sold</p>
                        <p className="text-sm font-black text-white mt-1">{employee.carsSold}</p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-500">Revenue</p>
                        <p className="text-sm font-black text-amber-400 mt-1">${(employee.revenue / 1000).toFixed(0)}k</p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-500">Conv. Rate</p>
                        <p className="text-sm font-black text-blue-400 mt-1">{employee.conversionRate}%</p>
                      </div>
                    </div>

                    {/* Progress Bar visual indicator */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
                        <span>Target Progress</span>
                        <span>{Math.round((employee.carsSold / 20) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-amber-400 h-full rounded-full" 
                          style={{ width: `${Math.min((employee.carsSold / 20) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 7: TASKS & AGENDA */}
          {activeTab === 'tasks' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 lg:col-span-1 space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Schedule Task</h3>
                <form onSubmit={handleAddTask} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Task Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Call Nurbek regarding lease paperwork"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full bg-slate-950 text-xs rounded-xl p-2.5 border border-slate-800 text-slate-200 mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Type</label>
                    <select 
                      value={newTaskType}
                      onChange={(e: any) => setNewTaskType(e.target.value)}
                      className="w-full bg-slate-950 text-xs rounded-xl p-2.5 border border-slate-800 text-slate-200 mt-1"
                    >
                      <option value="call">📞 Phone Call</option>
                      <option value="meeting">🤝 Meeting</option>
                      <option value="followup">⏰ Follow-up</option>
                      <option value="delivery">🚚 Delivery Reminder</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400">Due Date</label>
                    <input 
                      type="date" 
                      value={newTaskDue}
                      onChange={(e) => setNewTaskDue(e.target.value)}
                      className="w-full bg-slate-950 text-xs rounded-xl p-2.5 border border-slate-800 text-slate-200 mt-1"
                    />
                  </div>

                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition-all">
                    Schedule Task
                  </button>
                </form>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 lg:col-span-2 space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Tasks Agenda Timeline</h3>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center hover:border-[#0B3D91] transition-all">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-slate-900 ${
                          task.status === 'completed' ? 'text-slate-500' : 'text-amber-400'
                        }`}>
                          {task.type === 'call' && "📞"}
                          {task.type === 'meeting' && "🤝"}
                          {task.type === 'followup' && "⏰"}
                          {task.type === 'delivery' && "🚚"}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                            {task.title}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Due: {task.dueDate} | Assigned: {task.manager}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
                          triggerSimulatedNotification(`Completed task "${task.title}"`, 'payment');
                        }}
                        className={`text-[10px] font-black px-3 py-1.5 rounded-lg border transition-all ${
                          task.status === 'completed' 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {task.status === 'completed' ? 'Completed' : 'Complete'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEW 8: NOTIFICATION CENTER */}
          {activeTab === 'notifications' && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl max-w-3xl mx-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-md font-black text-white uppercase tracking-tight">Enterprise Event Monitor</h3>
                  <p className="text-xs text-slate-400 font-semibold">Real-time platform logs & triggers</p>
                </div>
                <button 
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                    triggerSimulatedNotification("All logs marked as read", 'payment');
                  }}
                  className="text-xs text-slate-400 hover:text-white hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              {/* Simulation triggers for testing */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase">Simulate Real-time Events (Click to Test Logs)</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button onClick={() => triggerSimulatedNotification("New online Lead 'Tilek Omurov' requested Mercedes S-Class", "lead")} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-black p-2 rounded border border-slate-800 text-slate-200">
                    Lead Received
                  </button>
                  <button onClick={() => triggerSimulatedNotification("Wire Transfer of $12,500 received for Toyota Sequoia", "payment")} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-black p-2 rounded border border-slate-800 text-slate-200">
                    Payment Received
                  </button>
                  <button onClick={() => triggerSimulatedNotification("Lexus LX 570 (2021) bid won at Yokohama Auction: JP Lot #9011", "auction")} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-black p-2 rounded border border-slate-800 text-slate-200">
                    Auction Won
                  </button>
                  <button onClick={() => triggerSimulatedNotification("Custom cargo cleared Bishkek North Custom Hub: Porsche Cayenne", "delivery")} className="bg-slate-900 hover:bg-slate-800 text-[10px] font-black p-2 rounded border border-slate-800 text-slate-200">
                    Vehicle Arrived
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 rounded-xl border flex justify-between items-center ${
                    n.read ? 'bg-slate-950/40 border-slate-850 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-900 rounded-lg">
                        {n.type === 'lead' && "👤"}
                        {n.type === 'order' && "📦"}
                        {n.type === 'payment' && "💳"}
                        {n.type === 'auction' && "⚖️"}
                        {n.type === 'delivery' && "🚚"}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${n.read ? 'text-slate-400' : 'text-white'}`}>{n.title}</p>
                        <p className="text-[9px] text-slate-500 font-mono mt-0.5">{n.time}</p>
                      </div>
                    </div>
                    
                    {!n.read && (
                      <span className="w-2.5 h-2.5 bg-amber-400 rounded-full shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 9: REPORTS & ANALYTICS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Business Intelligence Analytics</h3>
                <p className="text-xs text-slate-400">Monthly conversion statistics, growth and brand share</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Brand breakdown */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Revenue contribution by Brand</h4>
                  <div className="h-64 flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={brandsShareData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {brandsShareData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Growth indicator stats */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Monthly growth & stats Overview</h4>
                    <div className="space-y-4">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-500">Monthly Growth Rate</p>
                          <p className="text-xl font-black text-emerald-400 mt-1">+14.2% MoM</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-emerald-500 bg-emerald-500/10 p-1.5 rounded-xl" />
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-500">Customer Satisfaction</p>
                          <p className="text-xl font-black text-amber-400 mt-1">4.88 / 5.00 Rating</p>
                        </div>
                        <Award className="w-8 h-8 text-amber-400 bg-amber-400/10 p-1.5 rounded-xl" />
                      </div>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-500">Lead Conversion Rate</p>
                          <p className="text-xl font-black text-blue-400 mt-1">62.4% avg</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-500 bg-blue-500/10 p-1.5 rounded-xl" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 italic mt-4">
                    Data calculated across Askar AutoHub platform, Incheon Port Logistics, and local Kyrgyzstan sales channels.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* VIEW 10: FINANCE DASHBOARD */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Finance Management Panel</h3>
                <p className="text-xs text-slate-400">Inspect total cash logs, operating expenses, and net profitability</p>
              </div>

              {/* Finance KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Income logged</p>
                  <p className="text-xl font-black text-emerald-400 mt-1">
                    ${finances.filter(f => f.type === 'income').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Operating Expenses</p>
                  <p className="text-xl font-black text-rose-400 mt-1">
                    ${finances.filter(f => f.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Net Profit Margin</p>
                  <p className="text-xl font-black text-white mt-1">
                    ${(
                      finances.filter(f => f.type === 'income').reduce((acc, curr) => acc + curr.amount, 0) -
                      finances.filter(f => f.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Ledger entries list */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 lg:col-span-2 space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Financial Ledger</h4>
                  <div className="space-y-2">
                    {finances.map((log) => (
                      <div key={log.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-white">{log.description}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{log.date} | Category: {log.category}</p>
                        </div>
                        <span className={`font-mono font-bold ${
                          log.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {log.type === 'income' ? '+' : '-'}${log.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cash flow graph */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cash Flow Velocity</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cashFlowTrendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a' }} />
                          <Line type="monotone" dataKey="cash" name="Net Cash Flow" stroke="#f59e0b" strokeWidth={2.5} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 italic mt-4">
                    Graph represents active cash velocity across bank accounts and cash registers of Askar AutoHub KG.
                  </p>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER COOPERATIVE PANEL */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          &copy; 2026 Askar AutoHub KG. All rights reserved. Powered by <strong>AutoHub CRM PRO Enterprise Edition</strong>.
        </div>
        <div className="flex space-x-4">
          <span className="hover:text-slate-300 cursor-pointer">Security Protocol</span>
          <span className="hover:text-slate-300 cursor-pointer">Export Ledger</span>
          <span className="hover:text-slate-300 cursor-pointer">Audit Logs</span>
        </div>
      </footer>

      {/* INVOICE AND BILLING FORM MODAL */}
      <AnimatePresence>
        {isInvoiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-6 w-full max-w-lg space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
                  <FileCheck className="text-amber-400 w-5 h-5" />
                  <span>Issue New Invoice & Contract</span>
                </h4>
                <button onClick={() => setIsInvoiceModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4 text-xs text-slate-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Customer Name</label>
                  <input 
                    type="text" 
                    value={invoiceCustomer} 
                    onChange={(e) => setInvoiceCustomer(e.target.value)}
                    placeholder="Enter customer name" 
                    className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Vehicle of Interest</label>
                  <input 
                    type="text" 
                    value={invoiceVehicle} 
                    onChange={(e) => setInvoiceVehicle(e.target.value)}
                    placeholder="e.g. Lexus RX 350" 
                    className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Deal Price ($)</label>
                    <input 
                      type="number" 
                      value={invoicePrice} 
                      onChange={(e) => setInvoicePrice(e.target.value)}
                      placeholder="e.g. 54000" 
                      className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Payment Scheme</label>
                    <div className="flex items-center space-x-2 mt-2">
                      <input 
                        type="checkbox" 
                        id="invoiceInstallments"
                        checked={invoiceInstallments} 
                        onChange={(e) => setInvoiceInstallments(e.target.checked)}
                        className="w-4 h-4 bg-slate-950 rounded border-slate-800 text-amber-500 focus:ring-0"
                      />
                      <label htmlFor="invoiceInstallments" className="font-semibold text-slate-300">Installment Plan</label>
                    </div>
                  </div>
                </div>

                {invoiceInstallments && (
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Term (Months)</label>
                    <select 
                      value={invoiceMonths} 
                      onChange={(e) => setInvoiceMonths(e.target.value)}
                      className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:outline-none"
                    >
                      <option value="6">6 Months</option>
                      <option value="12">12 Months (1 year)</option>
                      <option value="24">24 Months (2 years)</option>
                      <option value="36">36 Months (3 years)</option>
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1">Requires 30% immediate down payment ($16,200 standard minimum for $54,000 spec).</p>
                  </div>
                )}

                <div className="pt-4 flex space-x-2 justify-end border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setIsInvoiceModalOpen(false)} 
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl shadow-lg"
                  >
                    Register Contract & Bill
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD LEAD POPUP FORM MODAL */}
      <AnimatePresence>
        {showAddLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-6 w-full max-w-md space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Register Lead Intake</h4>
                <button onClick={() => setShowAddLead(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLead} className="space-y-4 text-xs text-slate-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Lead Full Name</label>
                  <input type="text" value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)} placeholder="e.g. Rustam Osmonov" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Phone Contact</label>
                  <input type="text" value={newLeadPhone} onChange={(e) => setNewLeadPhone(e.target.value)} placeholder="+996555112233" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400">Vehicle</label>
                    <input type="text" value={newLeadVehicle} onChange={(e) => setNewLeadVehicle(e.target.value)} placeholder="BMW X5" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400">Budget ($)</label>
                    <input type="number" value={newLeadBudget} onChange={(e) => setNewLeadBudget(e.target.value)} placeholder="75000" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" required />
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg mt-2">
                  Create Lead Record
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD CUSTOMER POPUP FORM MODAL */}
      <AnimatePresence>
        {showAddCust && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-6 w-full max-w-md space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Register Client Profile</h4>
                <button onClick={() => setShowAddCust(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCustomer} className="space-y-4 text-xs text-slate-300">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Client Name</label>
                  <input type="text" value={newCustName} onChange={(e) => setNewCustName(e.target.value)} placeholder="Aida Bekova" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Phone</label>
                  <input type="text" value={newCustPhone} onChange={(e) => setNewCustPhone(e.target.value)} placeholder="+996770998877" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Email</label>
                  <input type="email" value={newCustEmail} onChange={(e) => setNewCustEmail(e.target.value)} placeholder="aida.bekova@gmail.com" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" />
                </div>

                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl shadow-lg mt-2">
                  Add Profile
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD VEHICLE POPUP FORM MODAL */}
      <AnimatePresence>
        {showAddVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-3xl border border-slate-800 p-6 w-full max-w-md space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Intake New Vehicle</h4>
                <button onClick={() => setShowAddVehicle(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddVehicle} className="space-y-4 text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400">Brand</label>
                    <input type="text" value={newVehBrand} onChange={(e) => setNewVehBrand(e.target.value)} placeholder="Toyota" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" required />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400">Model</label>
                    <input type="text" value={newVehModel} onChange={(e) => setNewVehModel(e.target.value)} placeholder="Sequoia" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Price ($)</label>
                  <input type="number" value={newVehPrice} onChange={(e) => setNewVehPrice(e.target.value)} placeholder="98000" className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1" required />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Status</label>
                  <select 
                    value={newVehStatus} 
                    onChange={(e: any) => setNewVehStatus(e.target.value)}
                    className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-1"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="transit">In Transit</option>
                    <option value="auction">Auction Search</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg mt-2">
                  Intake Stock
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
