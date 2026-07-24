import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Coins, 
  Percent, 
  Calendar, 
  DollarSign, 
  Truck, 
  Shield, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  MapPin,
  FileText
} from 'lucide-react';
import { Language } from '../types';

interface CalculatorPageProps {
  lang: Language;
}

type TabType = 'loan' | 'installment' | 'customs' | 'delivery';

export default function CalculatorPage({ lang }: CalculatorPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const stored = localStorage.getItem('calculator_initial_tab');
    if (stored === 'loan' || stored === 'installment' || stored === 'customs' || stored === 'delivery') {
      localStorage.removeItem('calculator_initial_tab');
      return stored;
    }
    return 'loan';
  });

  // Translations specifically for the Calculator page
  const calcT = {
    RU: {
      title: "Автомобильные калькуляторы",
      subtitle: "Рассчитайте кредит, рассрочку, таможенные пошлины и стоимость доставки в несколько кликов.",
      tab_loan: "Автокредит",
      tab_installment: "Рассрочка",
      tab_customs: "Растаможка КР",
      tab_delivery: "Доставка авто",
      
      // Loan Calculator
      loan_price: "Стоимость автомобиля ($)",
      loan_downpayment: "Первоначальный взнос ($)",
      loan_term: "Срок кредита (месяцев)",
      loan_rate: "Процентная ставка (% годовых)",
      loan_calc_btn: "Рассчитать кредит",
      loan_result_title: "Результаты расчета кредита",
      loan_monthly: "Ежемесячный платеж",
      loan_total: "Общая сумма выплат",
      loan_overpayment: "Переплата по кредиту",
      loan_principal: "Тело кредита",
      
      // Installment Calculator
      inst_price: "Стоимость автомобиля ($)",
      inst_downpayment: "Первоначальный взнос ($)",
      inst_term: "Срок рассрочки (месяцев)",
      inst_fee: "Разовая комиссия за рассрочку (%)",
      inst_calc_btn: "Рассчитать рассрочку",
      inst_result_title: "Результаты рассрочки",
      inst_monthly: "Ежемесячный платеж",
      inst_total: "Итоговая стоимость авто",
      inst_overpayment: "Сумма наценки/комиссии",
      inst_min_warn: "Рекомендуемый первоначальный взнос — от 30%",

      // Customs Calculator
      cust_price: "Стоимость авто по инвойсу ($)",
      cust_volume: "Объем двигателя (куб. см)",
      cust_year: "Год выпуска автомобиля",
      cust_engine: "Тип двигателя",
      cust_engine_petrol: "Бензиновый",
      cust_engine_diesel: "Дизельный",
      cust_engine_hybrid: "Гибридный",
      cust_engine_electric: "Электромобиль",
      cust_calc_btn: "Рассчитать растаможку",
      cust_result_title: "Расчет таможенных пошлин КР",
      cust_duty: "Таможенная пошлина",
      cust_vat: "НДС (12%)",
      cust_fee: "Таможенный сбор за оформление",
      cust_total: "Итого стоимость растаможки",
      cust_info_electric: "В Кыргызстане для электромобилей действует льготная ставка пошлины 0%! Оплачивается только минимальный сбор.",
      cust_info_hybrid: "Для гибридных автомобилей применяются льготные коэффициенты в зависимости от года выпуска.",

      // Delivery Calculator
      del_origin: "Страна отправления / Порт",
      del_type: "Способ транспортировки",
      del_insurance: "Дополнительное страхование (1% от стоимости авто)",
      del_car_price: "Стоимость автомобиля для страховки ($)",
      del_calc_btn: "Рассчитать доставку",
      del_result_title: "Расчет стоимости доставки в Бишкек",
      del_base: "Базовая стоимость доставки",
      del_ins_cost: "Стоимость страхования",
      del_time: "Ориентировочный срок доставки",
      del_total: "Итого стоимость доставки",
      del_route_usa: "США (Контейнер через Клайпеду/Поти)",
      del_route_china: "Китай (Автовоз через Урумчи)",
      del_route_uae: "ОАЭ (Контейнер через Бандар-Аббас)",
      del_route_korea: "Южная Корея (Контейнер по морю + ж/д)",
      del_route_europe: "Европа (Автовоз/Трал из Германии)",
      del_type_standard: "Стандартный контейнер / Трал",
      del_type_express: "Экспресс-авиадоставка",

      // Generic
      calculate: "Рассчитать",
      results: "Результаты расчета",
      currency_usd: "$",
      days: "дней",
      months: "мес."
    },
    KG: {
      title: "Унаа калькуляторлору",
      subtitle: "Бир нече чыкылдатуу менен кредитти, бөлүп төлөөнү, бажы төлөмдөрүн жана жеткирүү баасын эсептеңиз.",
      tab_loan: "Автокредит",
      tab_installment: "Бөлүп төлөө",
      tab_customs: "Бажы төлөмү КР",
      tab_delivery: "Унаа жеткирүү",

      // Loan Calculator
      loan_price: "Унаанын баасы ($)",
      loan_downpayment: "Баштапкы төлөм ($)",
      loan_term: "Кредиттин мөөнөтү (ай)",
      loan_rate: "Пайыздык чен (% жылдык)",
      loan_calc_btn: "Кредитти эсептөө",
      loan_result_title: "Кредитти эсептөө жыйынтыгы",
      loan_monthly: "Ай сайын төлөнүүчү төлөм",
      loan_total: "Төлөмдөрдүн жалпы суммасы",
      loan_overpayment: "Кредит боюнча ашыкча төлөм",
      loan_principal: "Кредиттин негизги суммасы",

      // Installment Calculator
      inst_price: "Унаанын баасы ($)",
      inst_downpayment: "Баштапкы төлөм ($)",
      inst_term: "Бөлүп төлөө мөөнөтү (ай)",
      inst_fee: "Бөлүп төлөө үчүн бир жолку комиссия (%)",
      inst_calc_btn: "Бөлүп төлөөнү эсептөө",
      inst_result_title: "Бөлүп төлөө жыйынтыгы",
      inst_monthly: "Ай сайын төлөнүүчү төлөм",
      inst_total: "Унаанын акыркы баасы",
      inst_overpayment: "Комиссиянын/кошумча баанын суммасы",
      inst_min_warn: "Сунушталган баштапкы төлөм — 30% баштап",

      // Customs Calculator
      cust_price: "Унаанын инвойс баасы ($)",
      cust_volume: "Кыймылдаткычтын көлөмү (куб. см)",
      cust_year: "Унаанын чыгарылган жылы",
      cust_engine: "Кыймылдаткычтын түрү",
      cust_engine_petrol: "Бензин",
      cust_engine_diesel: "Дизель",
      cust_engine_hybrid: "Гибрид",
      cust_engine_electric: "Электромобиль",
      cust_calc_btn: "Бажы төлөмүн эсептөө",
      cust_result_title: "КР бажы төлөмдөрүн эсептөө",
      cust_duty: "Бажы алымы",
      cust_vat: "КНС (12%)",
      cust_fee: "Бажы тариздөө акысы",
      cust_total: "Жалпы бажы тариздөө баасы",
      cust_info_electric: "Кыргызстанда электромобилдер үчүн бажы алымы 0%! Болгону минималдуу каттоо акысы төлөнөт.",
      cust_info_hybrid: "Гибриддик унаалар үчүн чыгарылган жылына жараша жеңилдетилген коэффициенттер колдонулат.",

      // Delivery Calculator
      del_origin: "Жөнөтүүчү өлкө / Порт",
      del_type: "Жеткирүү ыкмасы",
      del_insurance: "Кошумча камсыздандыруу (унаа баасынын 1%)",
      del_car_price: "Камсыздандыруу үчүн унаанын баасы ($)",
      del_calc_btn: "Жеткирүүнү эсептөө",
      del_result_title: "Бишкекке жеткирүү баасын эсептөө",
      del_base: "Жеткирүүнүн негизги баасы",
      del_ins_cost: "Камсыздандыруу баасы",
      del_time: "Болжолдуу жеткирүү мөөнөтү",
      del_total: "Жалпы жеткирүү баасы",
      del_route_usa: "АКШ (Клайпеда/Поти аркылуу контейнер)",
      del_route_china: "Кытай (Үрүмчү аркылуу автовоз)",
      del_route_uae: "БАЭ (Бандар-Аббас аркылуу контейнер)",
      del_route_korea: "Түштүк Корея (Контейнер деңиз + т/ж аркылуу)",
      del_route_europe: "Европа (Германиядан автовоз/трал)",
      del_type_standard: "Стандарттык контейнер / Трал",
      del_type_express: "Экспресс авиажеткирүү",

      // Generic
      calculate: "Эсептөө",
      results: "Эсептөө жыйынтыгы",
      currency_usd: "$",
      days: "күн",
      months: "ай"
    },
    EN: {
      title: "Automotive Calculators",
      subtitle: "Calculate auto loans, installments, Kyrgyzstan customs duties, and delivery rates in a few clicks.",
      tab_loan: "Auto Loan",
      tab_installment: "Installment",
      tab_customs: "KG Customs",
      tab_delivery: "Shipping Cost",

      // Loan Calculator
      loan_price: "Vehicle Price ($)",
      loan_downpayment: "Down Payment ($)",
      loan_term: "Loan Term (months)",
      loan_rate: "Interest Rate (% APR)",
      loan_calc_btn: "Calculate Loan",
      loan_result_title: "Loan Calculation Results",
      loan_monthly: "Monthly Payment",
      loan_total: "Total Repayments",
      loan_overpayment: "Total Interest Paid",
      loan_principal: "Principal Loan Amount",

      // Installment Calculator
      inst_price: "Vehicle Price ($)",
      inst_downpayment: "Down Payment ($)",
      inst_term: "Installment Term (months)",
      inst_fee: "One-time Installment Fee (%)",
      inst_calc_btn: "Calculate Installment",
      inst_result_title: "Installment Results",
      inst_monthly: "Monthly Installment",
      inst_total: "Total Vehicle Cost",
      inst_overpayment: "Total Markup/Fee Amount",
      inst_min_warn: "Recommended down payment is 30% or more",

      // Customs Calculator
      cust_price: "Invoice Car Price ($)",
      cust_volume: "Engine Displacement (cc)",
      cust_year: "Year of Manufacture",
      cust_engine: "Engine Type",
      cust_engine_petrol: "Petrol",
      cust_engine_diesel: "Diesel",
      cust_engine_hybrid: "Hybrid",
      cust_engine_electric: "Electric Vehicle",
      cust_calc_btn: "Calculate Customs",
      cust_result_title: "KG Customs Clearance Calculation",
      cust_duty: "Customs Duty",
      cust_vat: "VAT (12%)",
      cust_fee: "Customs Processing Fee",
      cust_total: "Total Customs Cost",
      cust_info_electric: "In Kyrgyzstan, electric vehicles qualify for 0% customs duty! Only a minimum processing fee is charged.",
      cust_info_hybrid: "Hybrid vehicles enjoy discounted custom multipliers depending on the year of production.",

      // Delivery Calculator
      del_origin: "Origin Country / Port",
      del_type: "Shipping Method",
      del_insurance: "Add Shipping Insurance (1% of car value)",
      del_car_price: "Car Value for Insurance ($)",
      del_calc_btn: "Calculate Shipping",
      del_result_title: "Shipping Cost to Bishkek",
      del_base: "Base Shipping Rate",
      del_ins_cost: "Insurance Cost",
      del_time: "Estimated Delivery Time",
      del_total: "Total Delivery Cost",
      del_route_usa: "USA (Container via Klaipeda/Poti)",
      del_route_china: "China (Autocarrier via Urumqi)",
      del_route_uae: "UAE (Container via Bandar-Abbas)",
      del_route_korea: "South Korea (Container ocean + rail)",
      del_route_europe: "Europe (Autocarrier from Germany)",
      del_type_standard: "Standard Container / Autocarrier",
      del_type_express: "Express Air Delivery",

      // Generic
      calculate: "Calculate",
      results: "Calculation Results",
      currency_usd: "$",
      days: "days",
      months: "mo."
    }
  };

  const t = calcT[lang];

  // 1. LOAN STATE
  const [loanPrice, setLoanPrice] = useState<number>(45000);
  const [loanDown, setLoanDown] = useState<number>(15000);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [loanRate, setLoanRate] = useState<number>(12);
  const [loanResults, setLoanResults] = useState<{
    monthly: number;
    total: number;
    interest: number;
    principal: number;
  } | null>({
    monthly: 996,
    total: 35871,
    interest: 5871,
    principal: 30000
  });

  const handleCalculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = Math.max(0, loanPrice - loanDown);
    if (principal <= 0) {
      setLoanResults({ monthly: 0, total: 0, interest: 0, principal: 0 });
      return;
    }
    const monthlyRate = loanRate / 12 / 100;
    let monthly = 0;
    if (monthlyRate === 0) {
      monthly = principal / loanTerm;
    } else {
      monthly = (monthlyRate * principal) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
    }
    const total = monthly * loanTerm;
    const interest = total - principal;

    setLoanResults({
      monthly: Math.round(monthly),
      total: Math.round(total + loanDown),
      interest: Math.round(interest),
      principal: principal
    });
  };

  // 2. INSTALLMENT STATE
  const [instPrice, setInstPrice] = useState<number>(38000);
  const [instDown, setInstDown] = useState<number>(19000);
  const [instTerm, setInstTerm] = useState<number>(12);
  const [instFee, setInstFee] = useState<number>(4);
  const [instResults, setInstResults] = useState<{
    monthly: number;
    total: number;
    markup: number;
    remaining: number;
  } | null>({
    monthly: 1647,
    total: 38760,
    markup: 760,
    remaining: 19000
  });

  const handleCalculateInstallment = (e: React.FormEvent) => {
    e.preventDefault();
    const remaining = Math.max(0, instPrice - instDown);
    const markup = remaining * (instFee / 100);
    const totalRemaining = remaining + markup;
    const monthly = instTerm > 0 ? totalRemaining / instTerm : 0;
    const totalCost = instDown + totalRemaining;

    setInstResults({
      monthly: Math.round(monthly),
      total: Math.round(totalCost),
      markup: Math.round(markup),
      remaining: remaining
    });
  };

  // 3. CUSTOMS STATE
  const [custPrice, setCustPrice] = useState<number>(22000);
  const [custVolume, setCustVolume] = useState<number>(2500);
  const [custYear, setCustYear] = useState<number>(2021);
  const [custEngine, setCustEngine] = useState<'petrol' | 'diesel' | 'hybrid' | 'electric'>('petrol');
  const [custResults, setCustResults] = useState<{
    duty: number;
    vat: number;
    fee: number;
    total: number;
  } | null>({
    duty: 3000,
    vat: 2640,
    fee: 150,
    total: 5790
  });

  const handleCalculateCustoms = (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = 2026;
    const carAge = Math.max(0, currentYear - custYear);
    
    let dutyRatePerCc = 1.5; // Default rate per cc
    let hasVat = true;
    let baseFee = 150;

    if (custEngine === 'electric') {
      // Electric vehicles have 0% duty & 0% VAT in KG currently
      setCustResults({
        duty: 0,
        vat: 0,
        fee: 150,
        total: 150
      });
      return;
    }

    // Customs logic depending on age and fuel
    if (custEngine === 'hybrid') {
      if (carAge <= 3) {
        dutyRatePerCc = 0.6;
      } else if (carAge <= 5) {
        dutyRatePerCc = 0.8;
      } else if (carAge <= 7) {
        dutyRatePerCc = 1.2;
      } else {
        dutyRatePerCc = 2.2;
      }
    } else {
      // Petrol / Diesel
      if (carAge <= 3) {
        dutyRatePerCc = 1.7;
      } else if (carAge <= 5) {
        dutyRatePerCc = 1.4;
      } else if (carAge <= 7) {
        dutyRatePerCc = 2.0;
      } else {
        dutyRatePerCc = 3.5; // High rate to discourage old vehicles
      }
    }

    const calculatedDuty = custVolume * dutyRatePerCc;
    const vatAmount = hasVat ? custPrice * 0.12 : 0;
    const totalCustoms = calculatedDuty + vatAmount + baseFee;

    setCustResults({
      duty: Math.round(calculatedDuty),
      vat: Math.round(vatAmount),
      fee: baseFee,
      total: Math.round(totalCustoms)
    });
  };

  // 4. DELIVERY STATE
  const [delOrigin, setDelOrigin] = useState<'usa' | 'china' | 'uae' | 'korea' | 'europe'>('china');
  const [delType, setDelType] = useState<'standard' | 'express'>('standard');
  const [delInsure, setDelInsure] = useState<boolean>(true);
  const [delCarVal, setDelCarVal] = useState<number>(35000);
  const [delResults, setDelResults] = useState<{
    baseRate: number;
    insurance: number;
    timeDays: string;
    total: number;
  } | null>({
    baseRate: 1500,
    insurance: 350,
    timeDays: "12 - 18",
    total: 1850
  });

  const handleCalculateDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    let base = 1500;
    let daysRange = "10 - 20";

    switch (delOrigin) {
      case 'usa':
        base = 3800;
        daysRange = "60 - 90";
        break;
      case 'china':
        base = 1400;
        daysRange = "10 - 20";
        break;
      case 'uae':
        base = 2400;
        daysRange = "20 - 35";
        break;
      case 'korea':
        base = 2700;
        daysRange = "25 - 40";
        break;
      case 'europe':
        base = 3200;
        daysRange = "15 - 30";
        break;
    }

    if (delType === 'express') {
      base += 6500; // Expensive air delivery
      daysRange = Math.max(3, Math.round(parseInt(daysRange) / 4)) + " - 7";
    }

    const insCost = delInsure ? delCarVal * 0.01 : 0;
    const total = base + insCost;

    setDelResults({
      baseRate: base,
      insurance: Math.round(insCost),
      timeDays: daysRange,
      total: Math.round(total)
    });
  };

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-slate-50 to-white min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100"
          >
            <Calculator className="w-4 h-4 text-[#0B3D91]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B3D91]">
              AutoHub Finance & Logistics
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl font-black tracking-tight text-gray-900"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-500 font-light"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Calculator Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {([
            { id: 'loan', label: t.tab_loan, icon: Coins },
            { id: 'installment', label: t.tab_installment, icon: Percent },
            { id: 'customs', label: t.tab_customs, icon: FileText },
            { id: 'delivery', label: t.tab_delivery, icon: Truck }
          ] as const).map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2.5 px-5 sm:px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm ${
                  isSelected 
                    ? 'bg-[#0B3D91] text-white shadow-[#0B3D91]/25 shadow-lg scale-[1.02]' 
                    : 'bg-white hover:bg-slate-50 text-gray-700 hover:text-gray-900 border border-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content area */}
        <div className="max-w-5xl mx-auto">
          
          {/* 1. LOAN CALCULATOR TAB */}
          {activeTab === 'loan' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
            >
              {/* Form Side */}
              <div className="md:col-span-7 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#0B3D91]" />
                    {t.tab_loan}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {lang === 'RU' ? 'Введите параметры кредита для расчета платежей' : lang === 'KG' ? 'Төлөмдөрдү эсептөө үчүн кредиттин параметрлерин киргизиңиз' : 'Enter loan configurations to see detailed metrics'}
                  </p>
                </div>

                <form onSubmit={handleCalculateLoan} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.loan_price}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">$</span>
                        <input
                          type="number"
                          value={loanPrice}
                          onChange={(e) => setLoanPrice(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.loan_downpayment}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">$</span>
                        <input
                          type="number"
                          value={loanDown}
                          onChange={(e) => setLoanDown(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                          max={loanPrice}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.loan_term}</label>
                      <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      >
                        <option value="12">12 {lang === 'RU' ? 'месяцев (1 год)' : lang === 'KG' ? 'ай (1 жыл)' : 'months (1 year)'}</option>
                        <option value="24">24 {lang === 'RU' ? 'месяца (2 года)' : lang === 'KG' ? 'ай (2 жыл)' : 'months (2 years)'}</option>
                        <option value="36">36 {lang === 'RU' ? 'месяцев (3 года)' : lang === 'KG' ? 'ай (3 жыл)' : 'months (3 years)'}</option>
                        <option value="48">48 {lang === 'RU' ? 'месяцев (4 года)' : lang === 'KG' ? 'ай (4 жыл)' : 'months (4 years)'}</option>
                        <option value="60">60 {lang === 'RU' ? 'месяцев (5 лет)' : lang === 'KG' ? 'ай (5 жыл)' : 'months (5 years)'}</option>
                        <option value="72">72 {lang === 'RU' ? 'месяца (6 лет)' : lang === 'KG' ? 'ай (6 жыл)' : 'months (6 years)'}</option>
                        <option value="84">84 {lang === 'RU' ? 'месяца (7 лет)' : lang === 'KG' ? 'ай (7 жыл)' : 'months (7 years)'}</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.loan_rate}</label>
                      <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">%</span>
                        <input
                          type="number"
                          step="0.1"
                          value={loanRate}
                          onChange={(e) => setLoanRate(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-4 pr-8 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {t.loan_calc_btn}
                  </button>
                </form>
              </div>

              {/* Results Side */}
              <div className="md:col-span-5 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="space-y-6 text-left">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0B3D91] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    {t.results}
                  </h4>

                  {loanResults && (
                    <div className="space-y-5">
                      <div className="bg-[#0B3D91] text-white rounded-xl p-5 shadow-inner">
                        <span className="text-[10px] uppercase font-bold text-blue-200 block tracking-wider">{t.loan_monthly}</span>
                        <span className="text-3xl font-black tracking-tight mt-1 block">
                          ${loanResults.monthly.toLocaleString()}
                          <span className="text-xs font-normal text-blue-200 ml-1">/{lang === 'RU' ? 'мес.' : lang === 'KG' ? 'ай' : 'mo.'}</span>
                        </span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.loan_principal}</span>
                          <span className="text-gray-800 font-bold">${loanResults.principal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.loan_overpayment}</span>
                          <span className="text-rose-600 font-bold">+ ${loanResults.interest.toLocaleString()}</span>
                        </div>
                        <hr className="border-slate-200" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-900 font-bold">{t.loan_total}</span>
                          <span className="text-[#0B3D91] font-black">${loanResults.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-start space-x-2 bg-blue-50/50 rounded-xl p-3 border border-blue-100/50 text-[10px] text-gray-500 leading-normal text-left">
                  <Info className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'RU' ? 'Данный расчет является предварительным. Точные условия кредитования запрашивайте у банков-партнеров AutoHub.' : lang === 'KG' ? 'Бул эсептөө болжолдуу болуп саналат. Кредиттөөнүн так шарттарын AutoHub өнөктөш банктарынан сураңыз.' : 'This calculation is illustrative. Exact lending parameters depend on AutoHub financial partners.'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. INSTALLMENT CALCULATOR TAB */}
          {activeTab === 'installment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
            >
              {/* Form Side */}
              <div className="md:col-span-7 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-[#0B3D91]" />
                    {t.tab_installment}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {lang === 'RU' ? 'Беспроцентная рассрочка или под минимальную комиссию' : lang === 'KG' ? 'Пайызсыз же минималдуу комиссия менен бөлүп төлөө' : 'Direct zero-interest or minimal commission dealer installment plans'}
                  </p>
                </div>

                <form onSubmit={handleCalculateInstallment} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.inst_price}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">$</span>
                        <input
                          type="number"
                          value={instPrice}
                          onChange={(e) => setInstPrice(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.inst_downpayment}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">$</span>
                        <input
                          type="number"
                          value={instDown}
                          onChange={(e) => setInstDown(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                          max={instPrice}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.inst_term}</label>
                      <select
                        value={instTerm}
                        onChange={(e) => setInstTerm(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                      >
                        <option value="3">3 {lang === 'RU' ? 'месяца' : lang === 'KG' ? 'ай' : 'months'}</option>
                        <option value="6">6 {lang === 'RU' ? 'месяцев' : lang === 'KG' ? 'ай' : 'months'}</option>
                        <option value="12">12 {lang === 'RU' ? 'месяцев (1 год)' : lang === 'KG' ? 'ай' : 'months'}</option>
                        <option value="18">18 {lang === 'RU' ? 'месяцев' : lang === 'KG' ? 'ай' : 'months'}</option>
                        <option value="24">24 {lang === 'RU' ? 'месяца (2 года)' : lang === 'KG' ? 'ай' : 'months'}</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.inst_fee}</label>
                      <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">%</span>
                        <input
                          type="number"
                          value={instFee}
                          onChange={(e) => setInstFee(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-4 pr-8 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {instDown < instPrice * 0.3 && (
                    <div className="bg-amber-50 text-amber-800 text-[11px] p-3 rounded-xl border border-amber-200 flex items-center space-x-2 text-left">
                      <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{t.inst_min_warn} (${Math.round(instPrice * 0.3).toLocaleString()}).</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {t.inst_calc_btn}
                  </button>
                </form>
              </div>

              {/* Results Side */}
              <div className="md:col-span-5 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="space-y-6 text-left">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0B3D91] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    {t.results}
                  </h4>

                  {instResults && (
                    <div className="space-y-5">
                      <div className="bg-emerald-600 text-white rounded-xl p-5 shadow-inner">
                        <span className="text-[10px] uppercase font-bold text-emerald-100 block tracking-wider">{t.inst_monthly}</span>
                        <span className="text-3xl font-black tracking-tight mt-1 block">
                          ${instResults.monthly.toLocaleString()}
                          <span className="text-xs font-normal text-emerald-100 ml-1">/{lang === 'RU' ? 'мес.' : lang === 'KG' ? 'ай' : 'mo.'}</span>
                        </span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{lang === 'RU' ? 'Остаток к рассрочке' : 'Калган сумма'}</span>
                          <span className="text-gray-800 font-bold">${instResults.remaining.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.inst_overpayment}</span>
                          <span className="text-rose-600 font-bold">+ ${instResults.markup.toLocaleString()}</span>
                        </div>
                        <hr className="border-slate-200" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-900 font-bold">{t.inst_total}</span>
                          <span className="text-[#0B3D91] font-black">${instResults.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-start space-x-2 bg-blue-50/50 rounded-xl p-3 border border-blue-100/50 text-[10px] text-gray-500 leading-normal text-left">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'RU' ? 'Рассрочка оформляется напрямую через авторизованные автосалоны AutoHub без посредничества банков.' : lang === 'KG' ? 'Бөлүп төлөө банктардын катышуусуз, түздөн-түз AutoHub ыйгарым укуктуу автосалондору аркылуу таризделет.' : 'Installments are arranged directly via AutoHub licensed salons without bank mediation.'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. CUSTOMS CALCULATOR TAB */}
          {activeTab === 'customs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
            >
              {/* Form Side */}
              <div className="md:col-span-7 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0B3D91]" />
                    {t.tab_customs}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {lang === 'RU' ? 'Таможенный расчет для ввоза в Кыргызстан' : lang === 'KG' ? 'Кыргызстанга алып кирүү үчүн бажылык эсептөө' : 'Official customs duty simulation inside the KR border control scheme'}
                  </p>
                </div>

                <form onSubmit={handleCalculateCustoms} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.cust_price}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">$</span>
                        <input
                          type="number"
                          value={custPrice}
                          onChange={(e) => setCustPrice(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.cust_volume}</label>
                      <div className="relative">
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">cm³</span>
                        <input
                          type="number"
                          value={custVolume}
                          onChange={(e) => setCustVolume(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-4 pr-12 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.cust_year}</label>
                      <input
                        type="number"
                        value={custYear}
                        onChange={(e) => setCustYear(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                        required
                        min="1990"
                        max="2027"
                      />
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.cust_engine}</label>
                      <select
                        value={custEngine}
                        onChange={(e) => setCustEngine(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all cursor-pointer"
                      >
                        <option value="petrol">{t.cust_engine_petrol}</option>
                        <option value="diesel">{t.cust_engine_diesel}</option>
                        <option value="hybrid">{t.cust_engine_hybrid}</option>
                        <option value="electric">{t.cust_engine_electric}</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {t.cust_calc_btn}
                  </button>
                </form>
              </div>

              {/* Results Side */}
              <div className="md:col-span-5 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="space-y-6 text-left">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0B3D91] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    {t.results}
                  </h4>

                  {custResults && (
                    <div className="space-y-5">
                      <div className="bg-[#0B3D91] text-white rounded-xl p-5 shadow-inner">
                        <span className="text-[10px] uppercase font-bold text-blue-200 block tracking-wider">{t.cust_total}</span>
                        <span className="text-3xl font-black tracking-tight mt-1 block">
                          ${custResults.total.toLocaleString()}
                        </span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.cust_duty}</span>
                          <span className="text-gray-800 font-bold">${custResults.duty.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.cust_vat}</span>
                          <span className="text-gray-800 font-bold">${custResults.vat.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.cust_fee}</span>
                          <span className="text-gray-800 font-bold">${custResults.fee.toLocaleString()}</span>
                        </div>
                        <hr className="border-slate-200" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-start space-x-2 bg-emerald-50/70 rounded-xl p-3 border border-emerald-100/50 text-[10px] text-gray-500 leading-normal text-left">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {custEngine === 'electric' ? t.cust_info_electric : custEngine === 'hybrid' ? t.cust_info_hybrid : (lang === 'RU' ? 'Базовый тариф рассчитывается в соответствии с ЕТТ ЕАЭС на момент таможенного оформления.' : 'The general customs rate relies on EEU common tariffs.')}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. DELIVERY CALCULATOR TAB */}
          {activeTab === 'delivery' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
            >
              {/* Form Side */}
              <div className="md:col-span-7 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#0B3D91]" />
                    {t.tab_delivery}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {lang === 'RU' ? 'Расчет стоимости транспортировки в Кыргызстан (Бишкек)' : lang === 'KG' ? 'Кыргызстанга (Бишкекке) жеткирүү баасын эсептөө' : 'Simulate transport rates, logistics nodes, and shipping time lines to Bishkek'}
                  </p>
                </div>

                <form onSubmit={handleCalculateDelivery} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.del_origin}</label>
                      <select
                        value={delOrigin}
                        onChange={(e) => setDelOrigin(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all cursor-pointer"
                      >
                        <option value="china">{t.del_route_china}</option>
                        <option value="usa">{t.del_route_usa}</option>
                        <option value="uae">{t.del_route_uae}</option>
                        <option value="korea">{t.del_route_korea}</option>
                        <option value="europe">{t.del_route_europe}</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{t.del_type}</label>
                      <select
                        value={delType}
                        onChange={(e) => setDelType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all cursor-pointer"
                      >
                        <option value="standard">{t.del_type_standard}</option>
                        <option value="express">{t.del_type_express}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-3 text-left">
                      <input
                        type="checkbox"
                        id="delInsure"
                        checked={delInsure}
                        onChange={(e) => setDelInsure(e.target.checked)}
                        className="w-4 h-4 text-[#0B3D91] border-slate-300 rounded focus:ring-[#0B3D91]"
                      />
                      <label htmlFor="delInsure" className="text-xs font-bold text-gray-700 cursor-pointer">
                        {t.del_insurance}
                      </label>
                    </div>

                    {delInsure && (
                      <div className="space-y-2 text-left pl-7">
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.del_car_price}</label>
                        <div className="relative max-w-xs">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">$</span>
                          <input
                            type="number"
                            value={delCarVal}
                            onChange={(e) => setDelCarVal(Number(e.target.value))}
                            className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-8 pr-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B3D91] transition-all"
                            min="0"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B3D91] hover:bg-[#072a66] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {t.del_calc_btn}
                  </button>
                </form>
              </div>

              {/* Results Side */}
              <div className="md:col-span-5 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="space-y-6 text-left">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0B3D91] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    {t.results}
                  </h4>

                  {delResults && (
                    <div className="space-y-5">
                      <div className="bg-[#0B3D91] text-white rounded-xl p-5 shadow-inner">
                        <span className="text-[10px] uppercase font-bold text-blue-200 block tracking-wider">{t.del_total}</span>
                        <span className="text-3xl font-black tracking-tight mt-1 block">
                          ${delResults.total.toLocaleString()}
                        </span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.del_base}</span>
                          <span className="text-gray-800 font-bold">${delResults.baseRate.toLocaleString()}</span>
                        </div>
                        {delInsure && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-medium">{t.del_ins_cost}</span>
                            <span className="text-gray-800 font-bold">${delResults.insurance.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">{t.del_time}</span>
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {delResults.timeDays} {lang === 'RU' ? 'дней' : lang === 'KG' ? 'күн' : 'days'}
                          </span>
                        </div>
                        <hr className="border-slate-200" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-start space-x-2 bg-blue-50/50 rounded-xl p-3 border border-blue-100/50 text-[10px] text-gray-500 leading-normal text-left">
                  <MapPin className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'RU' ? 'Доставка осуществляется в партнерстве с ведущими логистическими компаниями Евразии напрямую на терминалы г. Бишкек.' : lang === 'KG' ? 'Жеткирүү Евразиянын алдыңкы логистикалык компаниялары менен өнөктөштүктө түздөн-түз Бишкек шаарынын терминалдарына ишке ашырылат.' : 'All shipping containers dock directly at Bishkek customs hubs in association with Eurasia logistics networks.'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
