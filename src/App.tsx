import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import profImage from './image/prof.jpeg';
import polinaImage from './image/polina.jpeg';
import yanaImage from './image/yana.jpeg';
import nataImage from './image/nata.jpeg';

// Константы ссылок
const DIKIDI_LINK = "https://dikidi.net/1641837";
const VK_LINK = "https://vk.com/touch2018";
const WHATSAPP_LINK = "https://wa.me/79517783196";

const MASTERS = [
  {
    name: "Полина Локосова",
    role: "Founder & Art Director",
    bio: "Идейный вдохновитель TOUCH Beauty Studio и практикующий топ-колорист. Более 14 лет непрерывной практики и свыше 25 пройденных обучений у ведущих экспертов индустрии. Специализируется на колористике высшей сложности: от деликатного выхода из черного до создания многогранных авторских оттенков и безупречного блонда.",
    photo: polinaImage,
  },
  {
    name: "Яна",
    role: "Brow Architect",
    bio: "Мастер-бровист. Владеет современными техниками ламинирования, коррекции и архитектуры бровей. Непрерывно совершенствует навыки, чтобы предлагать гостям студии только актуальные, безопасные и эстетичные решения",
    photo: yanaImage,
  },
  {
    name: "Наталья",
    role: "Body Therapist",
    bio: "Дипломированный специалист с медицинским бэкграундом. Гарантирует абсолютную безопасность и эффективность каждого сеанса. Владеет широким спектром ручных практик и аппаратных методик. Фокус в работе — комплексное оздоровление, грамотная коррекция фигуры и забота о физическом комфорте клиента",
    photo: nataImage,
  }
];

const BRANDS = [
  { name: 'Matrix', sub: 'Professional Color & Care' },
  { name: 'L\'Oréal', sub: 'Professionnel Paris' },
  { name: 'Kebren', sub: 'Hair Treatment' },
  { name: 'Gera', sub: 'Premium Line' },
];

const PRICE_LIST = [
  {
    category: 'Стрижка и укладка',
    icon: '✂️',
    items: [
      { name: 'Женская стрижка', price: 'от 1 200 ₽' },
      { name: 'Мужская стрижка', price: 'от 700 ₽' },
      { name: 'Укладка', price: 'от 800 ₽' },
      { name: 'Вечерняя / свадебная', price: 'от 1 500 ₽' },
    ]
  },
  {
    category: 'Окрашивание',
    icon: '🎨',
    items: [
      { name: 'Окрашивание в тон', price: 'от 2 800 ₽' },
      { name: 'Выход из чёрного', price: 'от 5 000 ₽' },
      { name: 'Тотал блонд', price: 'от 5 000 ₽' },
      { name: 'Креатив / многотоновое', price: 'от 5 000 ₽' },
      { name: 'Балаяж / омбре', price: 'от 4 000 ₽' },
    ]
  },
  {
    category: 'Уход за волосами',
    icon: '✨',
    items: [
      { name: 'Ботокс для волос', price: 'от 2 500 ₽' },
      { name: 'Кератиновое выпрямление', price: 'от 3 500 ₽' },
      { name: 'Восстанавливающий уход', price: 'от 1 500 ₽' },
    ]
  },
  {
    category: 'Брови',
    icon: '🌿',
    items: [
      { name: 'Коррекция и архитектура', price: 'от 800 ₽' },
      { name: 'Окрашивание бровей', price: 'от 400 ₽' },
      { name: 'Ламинирование бровей', price: 'от 1 200 ₽' },
    ]
  },
  {
    category: 'Массаж',
    icon: '💆',
    items: [
      { name: 'Аппаратный массаж', price: 'от 1 000 ₽' },
      { name: 'Ручной массаж', price: 'от 1 000 ₽' },
    ]
  },
];

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('[onclick]') || target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-paper rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-[38px] h-[38px] border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        animate={{ 
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'rgba(184, 169, 138, 1)' : 'rgba(255, 250, 236, 0.28)'
        }}
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  );
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openPriceIdx, setOpenPriceIdx] = useState<number | null>(0);
  const [isHeroColored, setIsHeroColored] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    
    // Авто-окрашивание на мобильных через 3.5 секунды
    const timer = setTimeout(() => {
      if (window.innerWidth < 1024) {
        setIsHeroColored(true);
      }
    }, 3500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-ink text-paper selection:bg-gold selection:text-ink font-sans">
      <CustomCursor />

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-[200] flex justify-between items-center transition-all duration-400 px-8 lg:px-[72px] py-[18px] bg-ink/90 backdrop-blur-xl border-b border-line">
        <a href="#" className="flex flex-col gap-[1px] group">
          <span className="text-[7px] tracking-[0.55em] uppercase text-gold font-light">beauty studio</span>
          <span className="font-serif text-[22px] tracking-[0.12em] leading-none text-paper uppercase">TOUCH</span>
          <span className="text-[7px] tracking-[0.55em] uppercase text-gold font-light">by Polina Lokosova</span>
        </a>

        <div className="hidden lg:flex items-center gap-11">
          <ul className="flex gap-11 text-[10px] uppercase tracking-[0.22em] font-normal text-paper/50">
            <li><a href="#services" className="hover:text-paper transition-colors">Услуги</a></li>
            <li><a href="#price" className="hover:text-paper transition-colors">Прайс</a></li>
            <li><a href="#masters" className="hover:text-paper transition-colors">Мастера</a></li>
            <li><a href="#contacts" className="hover:text-paper transition-colors">Контакты</a></li>
          </ul>
          <a 
            href="tel:+79517783196"
            className="bg-paper text-ink px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-colors"
          >
            Записаться
          </a>
        </div>

        <button className="lg:hidden text-paper" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={isMobileMenuOpen ? { x: 0 } : { x: '100%' }}
        className="fixed inset-0 bg-ink z-[999] flex flex-col justify-center items-center gap-10 lg:hidden"
      >
        <div className="flex flex-col gap-[1px] items-center mb-12">
            <span className="text-[8px] tracking-[0.55em] uppercase text-gold font-light">beauty studio</span>
            <span className="font-serif text-3xl tracking-[0.12em] leading-none text-paper uppercase">TOUCH</span>
            <span className="text-[8px] tracking-[0.55em] uppercase text-gold font-light">by Polina Lokosova</span>
        </div>
        {['Услуги', 'Прайс', 'Мастера', 'Контакты'].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-4xl font-serif text-paper hover:text-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <a href="tel:+79517783196" className="mt-8 bg-paper text-ink px-12 py-4 font-bold uppercase tracking-widest text-sm">
          Записаться
        </a>
      </motion.div>

      {/* Hero */}
      <section id="home" className="min-h-screen grid grid-cols-1 lg:grid-cols-[52%_48%] relative overflow-hidden">
        <div className="flex flex-col justify-start lg:justify-center items-center lg:items-start px-8 lg:px-[72px] pt-[140px] lg:pt-20 pb-20 lg:pb-0 relative z-10 hero-l">
          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 text-[9px] uppercase tracking-[0.5em] text-gold mb-7"
          >
            <div className="hidden lg:block w-9 h-[1px] bg-gold" /> Студия красоты · Челябинск
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-bebas text-[clamp(64px,10vw,160px)] leading-[0.9] tracking-[0.03em] mr-[-0.03em] flex items-center justify-center lg:justify-start"
          >
            <span>T</span>
            <span className="relative inline-flex items-center justify-center">
              O
              <span className="absolute text-[0.3em] text-gold mt-[0.05em] drop-shadow-[0_0_8px_rgba(184,169,138,0.5)]">✦</span>
            </span>
            <span>UCH</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-serif italic font-normal text-[clamp(20px,3.5vw,42px)] text-gold tracking-[0.01em] leading-none mt-3 text-center lg:text-left"
          >
            by Polina Lokosova
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center lg:justify-start gap-11 mt-10"
          >
            <div className="flex flex-col gap-[5px] items-center lg:items-start">
               <span className="font-serif text-[26px] leading-none text-paper">2018</span>
               <span className="text-[7px] uppercase tracking-[0.3em] text-silver font-sans">Основана</span>
            </div>
            <div className="w-px h-9 bg-line" />
            <div className="flex flex-col gap-[5px] items-center lg:items-start">
               <span className="font-serif text-[26px] leading-none text-paper">25+</span>
               <span className="text-[7px] uppercase tracking-[0.3em] text-silver font-sans">Обучений</span>
            </div>
            <div className="w-px h-9 bg-line" />
            <div className="flex flex-col gap-[5px] items-center lg:items-start">
               <span className="font-serif text-[26px] leading-none text-paper">5.0</span>
               <span className="text-[7px] uppercase tracking-[0.3em] text-silver font-sans">Рейтинг</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-8 mt-12 justify-center lg:justify-start"
          >
            <a href="tel:+79517783196" className="hidden lg:inline-block bg-paper text-ink px-11 py-[15px] text-[10px] uppercase tracking-[0.22em] font-medium transition-transform hover:-translate-y-0.5 hover:bg-gold">
              Записаться
            </a>
            <a href="#services" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-paper/40 hover:text-paper group transition-all">
              Наши услуги <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div 
          className="relative bg-[#0e0e0e] overflow-hidden lg:h-full h-[60vw] min-h-[320px] cursor-crosshair group/hero"
          onMouseEnter={() => setIsHeroColored(true)}
          onMouseLeave={() => window.innerWidth >= 1024 && setIsHeroColored(false)}
        >
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              filter: isHeroColored ? 'grayscale(60%) contrast(1.05) brightness(0.95)' : 'grayscale(100%) contrast(1.08) brightness(0.92)' 
            }}
            transition={{ 
              opacity: { delay: 0.3, duration: 1.4 },
              filter: { duration: 1.2, ease: "easeInOut" }
            }}
            src={profImage} 
            alt="Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
          <div className="absolute bottom-[-16px] left-[-8px] font-bebas text-[180px] leading-none tracking-[0.05em] text-white/[0.035] pointer-events-none whitespace-nowrap select-none">
            TOUCH
          </div>
          <div className="absolute top-9 right-9 w-24 h-24 border border-white/15 rounded-full flex flex-col items-center justify-center text-center opacity-0 animate-[fi_1s_1.4s_forwards]">
             <span className="font-serif text-xl text-gold">★ 5.0</span>
             <span className="text-[7px] uppercase tracking-[0.28em] text-paper/40 leading-[1.5]">ВКонтакте</span>
          </div>
          <div className="absolute bottom-11 right-11 hidden lg:flex items-center gap-[14px] vertical-text text-[8px] uppercase tracking-[0.4em] text-paper/[0.18]">
            <div className="w-px h-[50px] bg-white/[0.1] relative overflow-hidden">
               <motion.div 
                 animate={{ y: [-50, 100] }}
                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                 className="absolute top-0 left-0 w-full h-5 bg-gold"
               />
            </div>
            Листайте
          </div>
        </div>
      </section>

      {/* Бегущая строка */}
      <div className="bg-paper py-[18px] overflow-hidden whitespace-nowrap border-y border-white/5">
        <div className="inline-flex animate-marquee">
          {Array(8).fill(['ТЕХНИКА', 'БРОВИ', 'СТРИЖКА', 'СЛОЖНОЕ ОКРАШИВАНИЕ', 'ТОТАЛ БЛОНД', 'ВЫХОД ИЗ ЧЁРНОГО', 'КРЕАТИВ']).flat().map((item, i) => (
            <span key={i} className="font-bebas text-[13px] tracking-[0.18em] text-ink px-8 flex items-center gap-[10px]">
              {item} <span className="text-gold text-sm font-serif">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Услуги */}
      <section id="services" className="py-[120px] bg-ink scroll-mt-[90px]">
        <div className="flex flex-col lg:flex-row justify-between items-end px-8 lg:px-[72px] mb-[72px] gap-10">
          <Reveal>
            <div className="flex items-center gap-[14px] text-[9px] uppercase tracking-[0.45em] text-gold mb-4">
              <div className="w-7 h-[1px] bg-gold" /> Что мы делаем
            </div>
            <h2 className="font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-[1.05]">
              Наши <em className="italic text-gold not-italic">услуги</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-[300px] text-[13px] leading-[1.9] text-paper/[0.35] font-light">
              Авторские техники, профессиональный подход и внимание к каждой детали — от классики до самых смелых трансформаций.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-line">
          <div className="p-8 lg:p-[72px] border-r border-line relative overflow-hidden group hover:bg-white/[0.02] transition-all cursor-pointer">
            <Reveal>
              <h3 className="font-serif text-3xl lg:text-4xl text-paper mb-[14px] leading-[1.1]">Сложное окрашивание: выход из чёрного, тотал блонд, креатив</h3>
              <p className="text-[12px] leading-[1.9] text-paper/[0.32] font-light max-w-[380px] mb-9">
                Специализация студии. Полина работает со сложнейшими случаями: поэтапное осветление, коррекция тона, авторские многотоновые решения с использованием Matrix, L'Oréal и Kebren.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col">
            <div className="p-11 lg:p-[44px_56px] border-b border-line relative overflow-hidden group hover:bg-white/[0.02] transition-all flex-1 cursor-pointer">
              <Reveal delay={0.1}>
                <h3 className="font-serif text-[22px] text-paper mb-[10px] leading-[1.1]">Женская & мужская стрижка</h3>
                <p className="text-[12px] leading-[1.9] text-paper/[0.32] font-light mb-[14px]">
                  Авторские стрижки с учётом типа лица, волос и образа жизни.
                </p>
              </Reveal>
            </div>
            <div className="p-11 lg:p-[44px_56px] relative overflow-hidden group hover:bg-white/[0.02] transition-all flex-1 cursor-pointer">
              <Reveal delay={0.2}>
                <h3 className="font-serif text-[22px] text-paper mb-[10px] leading-[1.1]">Брови</h3>
                <p className="text-[12px] leading-[1.9] text-paper/[0.32] font-light mb-[14px]">
                  Архитектура, коррекция, окрашивание, ламинирование.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-line">
           {[
             { idx: '04', name: 'Массаж', desc: 'Аппаратный и ручной. Мед. образование.', price: 'от 1 000 ₽' },
             { idx: '05', name: 'Уход', desc: 'Ботокс, кератин, восстановление.', price: 'от 2 000 ₽' },
             { idx: '06', name: 'Укладка', desc: 'Вечерняя, свадебная, повседневная.', price: 'от 800 ₽' },
             { idx: '07', name: 'Окрашивание в тон', desc: 'Равномерное окрашивание, корни, глосс.', price: 'от 2 800 ₽' },
           ].map((item, idx) => (
             <div key={idx} className={`p-10 lg:p-[40px_36px] relative overflow-hidden group hover:bg-white/[0.02] transition-all border-r last:border-r-0 border-line cursor-pointer`}>
               <Reveal delay={0.1 * idx}>
                 <h3 className="font-serif text-[18px] text-paper mb-[8px] leading-[1.1]">{item.name}</h3>
                 <p className="text-[11px] leading-[1.9] text-paper/[0.32] font-light mb-[12px]">{item.desc}</p>
               </Reveal>
             </div>
           ))}
        </div>
      </section>

      {/* Бренды */}
      <section id="brands" className="bg-paper py-[100px] px-8 lg:px-[72px] text-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[60px] lg:gap-[100px] items-center">
          <Reveal>
            <div className="flex items-center gap-[14px] text-[9px] uppercase tracking-[0.45em] mb-4 text-[#7a6a52]">
              <div className="w-7 h-[1px] bg-[#7a6a52]" /> Профессиональная косметика
            </div>
            <h2 className="font-serif text-[clamp(34px,4.5vw,56px)] font-normal leading-[1.05]">
              Работаем<br />с <em className="italic text-gold not-italic">лучшим</em>
            </h2>
            <p className="max-w-[380px] text-[13px] leading-[1.9] text-ink/45 font-light mt-[18px]">
              Только профессиональные бренды — для безупречного результата и максимальной заботы о ваших волосах.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
            {BRANDS.map((brand, idx) => (
              <Reveal key={idx} delay={0.1 * idx}>
                <div className="bg-paper p-[44px_40px] flex flex-col gap-2 hover:bg-[#e6e2dc] transition-colors h-full cursor-pointer">
                  <div className="font-serif text-2xl text-ink tracking-[0.04em]">{brand.name}</div>
                  <div className="text-[8px] tracking-[0.35em] uppercase text-[#8a7a62]">{brand.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Прайс-лист */}
      <section id="price" className="bg-mid scroll-mt-[90px]">
         <div className="grid grid-cols-1 lg:grid-cols-2 p-8 lg:p-[100px_72px_56px] gap-10 lg:gap-20 border-b border-line">
            <div>
               <Reveal>
                 <div className="flex items-center gap-[14px] text-[9px] uppercase tracking-[0.45em] text-gold mb-4">
                   <div className="w-7 h-[1px] bg-gold" /> Стоимость услуг
                 </div>
                 <h2 className="font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-[1.05]">Прайс-<em className="italic text-gold not-italic">лист</em></h2>
                 <p className="text-[13px] leading-[1.9] text-paper/40 font-light mt-[18px]">Точная стоимость — после консультации. Зависит от длины, состояния волос и сложности работы. Без скрытых доплат.</p>
               </Reveal>
            </div>
            <Reveal delay={0.3}>
               <div className="bg-white/[0.03] border border-line border-l-gold p-[32px_36px] self-center italic font-light text-[12px] leading-[1.8] text-paper/40">
                  Запись по телефону или WhatsApp.<br />Мастер подберёт оптимальный вариант под ваш запрос и бюджет.
               </div>
            </Reveal>
         </div>

         <div className="flex flex-col">
            {PRICE_LIST.map((category, catIdx) => (
              <div key={catIdx} className="border-b border-line overflow-hidden">
                 <div 
                   className={`flex justify-between items-center p-8 lg:p-[30px_72px] cursor-pointer hover:bg-white/[0.025] transition-colors ${openPriceIdx === catIdx ? 'bg-white/[0.03]' : ''}`}
                   onClick={() => setOpenPriceIdx(openPriceIdx === catIdx ? null : catIdx)}
                 >
                    <div className="font-serif text-2xl lg:text-[26px] font-normal flex items-center gap-[18px]">
                       <span className="text-lg">{category.icon}</span> {category.category} <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-silver ml-0.5">{category.items.length} услуг</span>
                    </div>
                    <div className={`text-xl text-gold transition-transform duration-500 font-light ${openPriceIdx === catIdx ? 'rotate-45' : ''}`}>+</div>
                 </div>
                 <motion.div 
                   initial={false}
                   animate={{ height: openPriceIdx === catIdx ? 'auto' : 0 }}
                   transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                   className="overflow-hidden"
                 >
                    <div className="grid grid-cols-1 md:grid-cols-2 p-6 lg:p-[4px_72px_36px]">
                       {category.items.map((item, itemIdx) => (
                         <div key={itemIdx} className={`flex items-baseline gap-[10px] py-[13px] border-b border-white/[0.04] ${itemIdx % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:border-l md:border-white/[0.04]'}`}>
                            <span className="text-[12px] font-light text-paper/60 flex-1">{item.name}</span>
                            <div className="flex-1 border-b border-dotted border-gold/[0.18] relative top-[-3px]" />
                            <span className="font-serif text-base text-gold whitespace-nowrap">{item.price}</span>
                         </div>
                       ))}
                    </div>
                 </motion.div>
              </div>
            ))}
         </div>
      </section>

      {/* Мастера */}
      <section id="masters" className="bg-ink py-[120px] scroll-mt-[90px]">
        <div className="px-8 lg:px-[72px] mb-[72px]">
          <Reveal>
            <div className="flex items-center gap-[14px] text-[9px] uppercase tracking-[0.45em] text-gold mb-4">
              <div className="w-7 h-[1px] bg-gold" /> Команда
            </div>
            <h2 className="font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-[1.05]">Наши <em className="italic text-gold not-italic">мастера</em></h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line border-y border-line">
           {MASTERS.map((master, idx) => (
             <div key={idx} className="bg-ink flex flex-col group overflow-hidden">
                <div className="relative aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-[#111]">
                   <motion.img 
                    src={master.photo} 
                    alt={master.name} 
                    animate={{ 
                      filter: isHeroColored ? 'grayscale(60%) contrast(1.05) brightness(0.95)' : 'grayscale(100%) contrast(1.1) brightness(0.9)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      filter: 'grayscale(60%) contrast(1.05) brightness(0.95)'
                    }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover object-top"
                   />
                   <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink/90 to-transparent pointer-events-none" />
                </div>
                <div className="p-10 lg:p-[30px_40px_44px] border-t border-line">
                   <div className="text-[8px] uppercase tracking-[0.44em] text-gold mb-[9px] opacity-85">{master.role}</div>
                   <h3 className="font-serif text-3xl lg:text-[26px] font-normal leading-[1.1] mb-[13px]">{master.name}</h3>
                   <p className="text-[11px] leading-[1.85] text-paper/[0.35] font-light">{master.bio}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Запись */}
      <section id="booking" className="bg-paper py-[140px] px-8 lg:px-[72px] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[clamp(150px,25vw,280px)] leading-none tracking-[0.05em] text-black/[0.04] pointer-events-none whitespace-nowrap select-none">
          TOUCH
        </div>
        <div className="relative z-10 max-w-[680px] mx-auto">
           <Reveal>
             <div className="flex items-center justify-center gap-[14px] text-[9px] uppercase tracking-[0.45em] text-[#7a6a52] mb-4">
              <div className="w-7 h-[1px] bg-[#7a6a52]" /> Запись
            </div>
             <h2 className="font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-[1.05] text-ink mb-[18px]">
                Запишитесь<br /><em className="italic text-[#7a6a52] not-italic">к нам</em>
             </h2>
             <p className="text-[13px] leading-[1.9] text-ink/42 font-light mb-[52px]">
                Позвоните или напишите — выберем удобное время и подберём идеального мастера специально для вас.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-10 lg:gap-15 mb-11">
                <a href="tel:+79517783196" className="font-serif text-[clamp(24px,2.8vw,32px)] text-ink no-underline tracking-[0.03em] flex flex-col items-center gap-1.5 transition-colors group hover:text-[#4a3a22]">
                   <span className="font-sans text-[8px] uppercase tracking-[0.32em] text-[#8a7a62]">Основной</span>+7 951 778-31-96
                </a>
                <a href="tel:+79936583196" className="font-serif text-[clamp(24px,2.8vw,32px)] text-ink no-underline tracking-[0.03em] flex flex-col items-center gap-1.5 transition-colors group hover:text-[#4a3a22]">
                   <span className="font-sans text-[8px] uppercase tracking-[0.32em] text-[#8a7a62]">Дополнительный</span>+7 993 658-31-96
                </a>
             </div>
             <div className="flex justify-center gap-3 flex-wrap">
                <a href={WHATSAPP_LINK} className="bg-ink text-paper px-11 py-[15px] text-[10px] uppercase tracking-[0.22em] font-medium transition-colors hover:bg-[#2a2a2a]">
                  WhatsApp
                </a>
                <a href={VK_LINK} target="_blank" className="border border-ink/25 text-ink px-11 py-[14px] text-[10px] uppercase tracking-[0.22em] font-medium hover:border-ink transition-colors">
                  ВКонтакте
                </a>
                <a href="tel:+79517783196" className="border border-ink/25 text-ink px-11 py-[14px] text-[10px] uppercase tracking-[0.22em] font-medium hover:border-ink transition-colors">
                  Позвонить
                </a>
             </div>
           </Reveal>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="bg-smoke py-[100px] scroll-mt-[90px]">
        <div className="px-8 lg:px-[72px] mb-[60px]">
          <Reveal>
            <div className="flex items-center gap-[14px] text-[9px] uppercase tracking-[0.45em] text-gold/60 mb-4 after:content-[''] after:w-7 after:h-[1px] after:bg-gold/60">
              Где нас найти
            </div>
            <h2 className="font-serif text-[clamp(40px,5.5vw,68px)] font-normal leading-[1.05]">Контакты</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-line">
           <div className="p-10 lg:p-[52px] border-b lg:border-b-0 lg:border-r border-line hover:bg-white/[0.03] transition-colors cursor-pointer group">
              <Reveal>
                <div className="text-[8px] uppercase tracking-[0.4em] text-gold/65 mb-[18px]">Адрес</div>
                <a href="https://yandex.ru/maps/-/CDT7v-y1" target="_blank" className="font-serif text-2xl lg:text-xl font-normal text-paper block leading-[1.4] group-hover:text-gold transition-colors">
                  г. Челябинск,<br />ул. Сони Кривой, 37а
                </a>
                <p className="text-[10px] text-silver font-light mt-[10px] leading-[1.6]">Работаем строго по записи</p>
              </Reveal>
           </div>
           <div className="p-10 lg:p-[52px] border-b lg:border-b-0 lg:border-r border-line hover:bg-white/[0.03] transition-colors cursor-pointer group">
              <Reveal delay={0.1}>
                <div className="text-[8px] uppercase tracking-[0.4em] text-gold/65 mb-[18px]">Телефон</div>
                <a href="tel:+79517783196" className="font-serif text-2xl lg:text-xl font-normal text-paper block leading-[1.4] group-hover:text-gold transition-colors">+7 951 778-31-96</a>
                <a href="tel:+79936583196" className="font-serif text-[18px] lg:text-[15px] font-normal text-paper/40 block mt-[6px] group-hover:text-gold transition-colors">+7 993 658-31-96</a>
                <p className="text-[10px] text-silver font-light mt-[10px] leading-[1.6]">Звонки · WhatsApp</p>
              </Reveal>
           </div>
           <div className="p-10 lg:p-[52px] hover:bg-white/[0.03] transition-colors cursor-pointer group">
              <Reveal delay={0.2}>
                <div className="text-[8px] uppercase tracking-[0.4em] text-gold/65 mb-[18px]">Соцсети</div>
                <a href={VK_LINK} target="_blank" className="font-serif text-2xl lg:text-xl font-normal text-paper block leading-[1.4] group-hover:text-gold transition-colors">ВКонтакте</a>
                <p className="text-[10px] text-silver font-light mt-[10px] leading-[1.6]">Портфолио, отзывы, акции</p>
              </Reveal>
           </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-ink py-[56px] pb-[120px] lg:pb-[56px] px-8 lg:px-[72px] border-t border-line flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-6 text-paper/40">
        <a href="#" className="flex flex-col gap-[1px] items-center lg:items-start group">
          <span className="text-[7px] tracking-[0.55em] uppercase text-gold font-light">beauty studio</span>
          <span className="font-serif text-[22px] tracking-[0.12em] leading-none text-paper uppercase">TOUCH</span>
          <span className="text-[7px] tracking-[0.55em] uppercase text-gold font-light">by Polina Lokosova</span>
        </a>
        <p className="text-[10px] text-paper/[0.16] font-light text-center lg:text-left max-w-xs lg:max-w-none">
          © 2018–2026 TOUCH Beauty Studio · авторская студия Полины Локосовой · Челябинск
        </p>
        <div className="flex gap-8 flex-wrap justify-center font-sans text-[9px] uppercase tracking-[0.24em] text-paper/[0.26]">
          <a href="#services" className="hover:text-gold transition-colors">Услуги</a>
          <a href="#price" className="hover:text-gold transition-colors">Прайс</a>
          <a href="#masters" className="hover:text-gold transition-colors">Мастера</a>
          <a href={VK_LINK} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">ВКонтакте</a>
        </div>
      </footer>

      {/* Fixed Mobile Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[200] lg:hidden bg-gold border-t border-ink/10 safe-area-bottom">
        <a 
          href={DIKIDI_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-5 px-8 text-ink text-[11px] uppercase tracking-[0.3em] font-black"
        >
          Записаться онлайн
        </a>
      </div>
    </div>
  );
}