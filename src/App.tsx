/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { 
  Hammer, 
  DoorClosed, 
  Square, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Wrench,
  Construction,
  CheckCircle2,
  X,
  ArrowRight,
  Menu,
  Calculator,
  Moon,
  Sun,
  LayoutGrid,
  Sparkles,
  Send,
  User,
  Box,
  Star,
  Eye
} from "lucide-react";
import { orderService } from './services/orderService';

const SERVICES = [
  {
    id: "welding",
    title: "Welding & Steel Works",
    titleSw: "Vyuma na Mageti Makubwa",
    description: "Tupo hapa kukupa geti ambalo ni imara, halishiki kutu, na linapendezesha mtaa wako.",
    fullDescription: "Geti ni sura ya nyumba yako. Hapa Nyamongo, tunakuundia mageti ya kila aina—ya kusogeza (Sliding) au ya kufungua kawaida. Tunatumia chuma kizito na 'Anti-rust' ya uhakika ili jua na mvua visitie doa kazi yetu. Ufundi wetu haujawahi kumuacha mtu na majonzi.",
    expertTip: "Siri ya Fundi: Ukiona geti linaanza kupiga kelele au kuwa nzito, usisubiri! Paka mafuta (grease) kwenye track au bawaba mara moja kuzuia chuma kuliwa.",
    icon: <Hammer className="w-8 h-8" />,
    items: [
      "Mageti ya kisasa (Sliding & Swing)",
      "Grill za madirisha (Standard & Decorative)",
      "Reli za ngazi (Railings)",
      "Stand za matangi ya maji"
    ],
    tags: ["chuma", "iron", "welding", "gate", "geti", "grill"],
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"]
  },
  {
    id: "aluminium",
    title: "Aluminium & Glass",
    titleSw: "Aluminium na Vioo Safi",
    description: "Windows na milango ya kisasa kwa ajili ya nuru na muonekano wa 'Executive' nyumbani kwako.",
    fullDescription: "Usiweke mbao zinazoliwa na mchwa. Njoo tukufungie Aluminium na vioo vya rangi (Tinted) ambavyo watu wa nje hawaoni ndani. Tunatumia material imara ambazo hazipotezi rangi na ni rahisi kusafisha. Nyumba inapata hadhi mara moja.",
    expertTip: "Siri ya Fundi: Kamwe usisafishe kioo cha Aluminium kwa kutumia sabuni kali ya unga. Tumia maji safi na kitambaa laini ili kuzuia 'scratches' zinazofanya dirisha lionekane kuukuu.",
    icon: <Wrench className="w-8 h-8" />,
    items: [
      "Madirisha ya Aluminium (Sliding & Casement)",
      "Milango ya vioo kwa duka na ofisi",
      "Vioo vya rangi (Tinted & Blue Glass)",
      "Partitions za ofisini"
    ],
    tags: ["aluminium", "dirisha", "window", "door", "glass"],
    images: ["https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=1200"]
  },
  {
    id: "furniture",
    title: "Metal Furniture",
    titleSw: "Samani za Chuma Imara",
    description: "Vitanda na meza zisizoyumba. Tunajenga kwa ajili ya kudumu karne nzima.",
    fullDescription: "Kwanini ununue kitanda cha mbao kinachopiga kelele? Sisi tunatengeneza vitanda vya chuma vizito ambavyo havivunjiki. Pia tunaunda madawati ya shule na viti vya kanisani kwa bei ambayo hutaipata kwingine hapa Nyamongo.",
    expertTip: "Siri ya Fundi: Vitanda vyetu vimeungwa kwa 'Double Welding'. Hata watoto wakicheza na kuruka juu ya kitanda, haking'oki wala kupiga kelele. Ni uwekezaji wa maisha.",
    icon: <Box className="w-8 h-8" />,
    items: [
      "Vitanda vya chuma (Double & Single)",
      "Madawati na viti vya shule",
      "Siti za makanisani na mabaa",
      "Mikokoteni ya mizigo"
    ],
    tags: ["kitanda", "furniture", "meza", "shule"],
    images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200"]
  },
  {
    id: "repair",
    title: "Maintenance & Repairs",
    titleSw: "Matengenezo ya Haraka",
    description: "Geti likisumbua au kioo kikipasuka, tunakuja hadi mlangoni kwako kurekebisha.",
    fullDescription: "Usisubiri mpaka kitu kivunjike kabisa. Tunafanya marekebisho ya bawaba, kubadilisha vioo, na kulehemu sehemu zilizopeleka. Tunakuja haraka na hatuchaji bei ya 'kuumiza'.",
    expertTip: "Siri ya Fundi: Madirisha ya Aluminium yakianza kuwa magumu kufungua, mara nyingi ni vumbi limejaa kwenye lock au track. Usilazimishe! Safisha kwanza kuzuia kuvunja 'handle'.",
    icon: <Construction className="w-8 h-8" />,
    items: [
      "Kurekebisha mageti yanayosuguana",
      "Kuziba matangi ya chuma",
      "Kubadilisha vioo vilivyopasuka",
      "Kupaka rangi upya (Repainting)"
    ],
    tags: ["fundi", "repair", "service", "matengenezo"],
    images: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200"]
  }
];

const CONTACT_INFO = {
  phone: "+255785718836",
  location: "Nyamongo zero-zero mkoroshoni, Nearby MBAINER HARDWARE",
  socials: [
    { name: "TikTok", user: "Fanuel Workshop", link: "https://www.tiktok.com/@sir.J.Fanuel1", icon: <ExternalLink className="w-5 h-5" /> },
    { name: "Facebook", user: "Fanuel Workshop", link: "https://www.facebook.com/FanuelWorkshop", icon: <Facebook className="w-5 h-5" /> },
    { name: "Instagram", user: "Fanuel Workshop", link: "https://www.instagram.com/sir.Jfanuel", icon: <Instagram className="w-5 h-5" /> },
  ]
};

export default function App() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Price Estimator state
  const [estimatorType, setEstimatorType] = useState("aluminium");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [estResult, setEstResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Order Tracker state
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  // Chat/AI State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Karibu! Mimi ni msaidizi wa Fanuel Workshop. Una swali kuhusu Aluminium au Vyuma?' }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const filteredServices = useMemo(() => {
    if (!searchQuery) return SERVICES;
    const query = searchQuery.toLowerCase();
    return SERVICES.filter(s => 
      s.titleSw.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query) ||
      s.tags.some(tag => tag.includes(query))
    );
  }, [searchQuery]);

  const handleOrderSubmit = async () => {
    if (!customerName || !phone) {
      alert("Tafadhali jaza jina na namba ya simu.");
      return;
    }

    setIsSubmitting(true);
    try {
      await orderService.submitInquiry({
        customer_name: customerName,
        phone_number: phone,
        service_type: estimatorType,
        width: width,
        height: height,
        status: 'pending'
      });
      setSubmitSuccess(true);
    } catch (err) {
      alert("Imeshindikana kutuma. Hakikisha utaunganisha Supabase Keys kwenye Settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-orange selection:text-white pb-24 lg:pb-0 transition-colors duration-500 ${isDarkMode ? 'bg-surface-dark text-white' : 'bg-surface-light text-zinc-900'}`}>
      {/* Theme Toggle Floating Button */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-24 right-6 z-[40] w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-zinc-900/80 backdrop-blur-md border-b border-white/5' : 'glass-nav'}`}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center font-black text-white text-2xl group-hover:bg-brand-orange transition-all duration-500 shadow-xl">F</div>
            <div className="flex flex-col">
              <span className={`font-display font-black text-2xl tracking-tighter uppercase leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>FANUEL</span>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-1">ALUMINIUM & WELDING</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {['home', 'services', 'estimator', 'order', 'contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)} 
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {item === 'home' ? 'Mwanzo' : item === 'services' ? 'Huduma' : item === 'estimator' ? 'Kikokotoo' : item === 'order' ? 'Fuatilia' : 'Mawasiliano'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${CONTACT_INFO.phone.replace('+', '').replace(/\s/g, '')}`}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors shadow-lg ${isDarkMode ? 'bg-white text-zinc-900 hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/10'}`}
            >
              Agiza Kazi
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a] flex flex-col items-center justify-center gap-10"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 p-2 text-zinc-400"><X className="w-8 h-8" /></button>
            <button onClick={() => scrollToSection('home')} className="text-4xl font-black uppercase font-display tracking-tight hover:text-orange-500 transition-colors">Nyumbani</button>
            <button onClick={() => scrollToSection('services')} className="text-4xl font-black uppercase font-display tracking-tight hover:text-orange-500 transition-colors">Huduma</button>
            <button onClick={() => scrollToSection('contact')} className="text-4xl font-black uppercase font-display tracking-tight hover:text-orange-500 transition-colors">Mawasiliano</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950' : 'bg-surface-light'}`}>
        {/* Technical Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-10 w-[1px] h-1/2 bg-zinc-400" />
          <div className="absolute bottom-1/4 right-10 w-[1px] h-1/2 bg-zinc-400" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-400" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] mb-8"
              >
                Karakana ya Kisasa Nyamongo
              </motion.span>

              <h1 className={`text-6xl md:text-[9rem] font-black tracking-tighter mb-8 leading-[0.85] font-display transition-colors uppercase ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>
                FANUEL ALUMINIUM <br />
                <span className="text-brand-orange">AND WELDING</span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-10 mb-16">
                {['Precious', 'Strength', 'Durability'].map((word, i) => (
                  <div key={word} className="flex items-center gap-10">
                    <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-sm md:text-lg">{word}</span>
                    {i < 2 && <div className="hidden sm:block w-2 h-2 rounded-full bg-brand-orange/30" />}
                  </div>
                ))}
              </div>

              <div className="max-w-3xl mx-auto bg-zinc-900 text-zinc-100 p-10 md:p-16 rounded-[3rem] mb-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[80px] -z-10" />
                <p className="text-xl md:text-3xl leading-tight font-medium relative tracking-tight">
                  <span className="text-brand-orange font-black block mb-6 uppercase tracking-[0.5em] text-[10px]">Ukarimu wa Kweli</span>
                  Sisi ni wenyeji wako hapa Nyamongo kwa Mageti imara na Aluminium za kisasa. 
                  Tunajali kila senti yako kwa ufundi wa uaminifu.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button onClick={() => scrollToSection('services')} className="btn-primary">Tazama Huduma</button>
                <button onClick={() => scrollToSection('estimator')} className="btn-accent">Fanya Makadirio</button>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t pointer-events-none ${isDarkMode ? 'from-zinc-950 to-transparent' : 'from-surface-light to-transparent'}`} />
      </section>

      <div className="technical-line" />

      {/* Founder Section */}
      <section id="about" className={`py-32 transition-colors duration-500 border-y ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-surface-light border-zinc-200'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className={`relative aspect-[3/4] max-w-md mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 group ${isDarkMode ? 'border-zinc-800' : 'border-white'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Aluminium Window Installation" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              {/* Floating Badge */}
              <div className={`absolute -bottom-8 -right-4 p-8 rounded-[2rem] shadow-xl border z-10 max-w-[200px] ${isDarkMode ? 'bg-zinc-800 border-white/5' : 'bg-white border-zinc-100'}`}>
                 <p className={`font-black text-lg tracking-tighter uppercase mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Sabato J.</p>
                 <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Mkurugenzi & Fundi Mkuu</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-[1.5] text-left"
            >
              <h2 className={`text-6xl md:text-9xl font-black mb-8 leading-[0.8] font-display uppercase tracking-[-0.04em] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                UBUNIFU UNAOTOKANA <br />
                <span className={isDarkMode ? 'text-zinc-800' : 'text-zinc-200'}>NA UZOEFU WA KWELI.</span>
              </h2>
              <div className={`space-y-6 font-medium leading-relaxed text-lg max-w-2xl ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                <p>
                  "Mimi huwaambii wateja wangu kuwa mimi ni fundi bora, huwaambia njoo uone kazi yangu. Hapa FAW, hatuchezi na kioo wala chuma. Tunajua unatumia pesa uliyotolea jasho, hivyo lazima upate kitu kitakachodumu maisha yako yote."
                </p>
                <div className="p-8 bg-zinc-100 dark:bg-zinc-800 rounded-3xl border-l-8 border-brand-orange">
                  <p className="italic font-bold">
                    - Sabato J. (Mkurugenzi & Fundi Mkuu)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-32 transition-colors duration-500 border-t ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-zinc-200'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl text-left">
              <h2 className={`text-5xl md:text-7xl font-black tracking-tighter font-display leading-[0.9] uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                HUDUMA ZETU <br /> <span className={isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}>KWA UFINYASHI</span>
              </h2>
            </div>
          </div>          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {filteredServices.length > 0 ? filteredServices.map((service, idx) => (
              <motion.div
                key={idx}
                layoutId={service.id}
                onClick={() => setSelectedService(service)}
                className="group card-industrial cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img 
                    src={service.images[0]} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Floating Icon Tag */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-brand-orange shadow-2xl group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                </div>

                <div className="p-12">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-4xl font-black font-display tracking-tight transition-colors uppercase ${isDarkMode ? 'text-white' : 'text-zinc-950'}`}>{service.titleSw}</h3>
                    <ArrowRight className="w-8 h-8 text-brand-orange transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                  <p className={`mb-8 text-lg leading-snug font-medium transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{service.description}</p>
                  
                  <div className={`h-[1px] w-full transition-all duration-700 group-hover:bg-brand-orange ${isDarkMode ? 'bg-white/10' : 'bg-zinc-200'}`} />
                </div>
              </motion.div>
            )) : (
              <div className={`col-span-full py-32 text-center italic border-4 border-dashed rounded-[3.5rem] ${isDarkMode ? 'border-zinc-800 text-zinc-700' : 'border-zinc-100 text-zinc-300'}`}>
                <p className="text-2xl font-black uppercase tracking-widest">Huduma haijapatikana</p>
                <p className="text-sm mt-2 font-medium">Jaribu kutafuta neno lingine...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Long Page Service Detail Overlay */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] overflow-y-auto custom-scrollbar transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}
          >
            <div className="min-h-screen flex flex-col">
              {/* Header Visual */}
              <div className="relative h-[65vh] w-full overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  src={selectedService.images[0]} 
                  className="w-full h-full object-cover" 
                  alt={selectedService.title} 
                />
                <div className={`absolute inset-0 bg-gradient-to-b via-transparent to-transparent ${isDarkMode ? 'from-black/80' : 'from-black/60'}`} />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent ${isDarkMode ? 'from-zinc-950' : 'from-white'}`} />
                
                <button 
                  onClick={() => setSelectedService(null)}
                  className={`absolute top-10 left-10 w-14 h-14 backdrop-blur-md rounded-full flex items-center justify-center transition-all z-20 ${isDarkMode ? 'bg-white/10 text-white hover:bg-white hover:text-zinc-900' : 'bg-black/20 text-white hover:bg-zinc-900'}`}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-20 left-10 right-10">
                  <div className="container mx-auto px-6 text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-4xl"
                    >
              <h2 className={`text-5xl md:text-[8rem] font-black font-display leading-[0.8] mb-4 uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {selectedService.titleSw.split(' (')[0]} <br />
                        <span className="text-brand-orange">{selectedService.titleSw.split(' (')[1]?.replace(')', '') || ''}</span>
                      </h2>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                  <div className="text-left space-y-12">
                    <div>
                      <h3 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] mb-6">Maelezo ya Kazi</h3>
                      <p className={`text-2xl font-medium leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {selectedService.fullDescription}
                      </p>
                    </div>

                    {selectedService.expertTip && (
                      <div className="bg-orange-600/10 border-l-4 border-orange-600 p-8 rounded-2xl">
                        <h4 className="flex items-center gap-3 text-orange-600 font-bold uppercase tracking-widest text-sm mb-4">
                          <Sparkles className="w-5 h-5" /> 
                          Siri ya Fundi Fanuel
                        </h4>
                        <p className={`text-xl italic ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                           "{selectedService.expertTip}"
                        </p>
                      </div>
                    )}

                    <div className="space-y-6">
                      <h3 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] mb-6">Tunachoshughulikia</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedService.items.map((item, i) => (
                          <div key={i} className={`flex items-center gap-4 p-5 border rounded-[1.5rem] group hover:shadow-xl transition-all ${isDarkMode ? 'bg-zinc-900 border-white/5 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-100 hover:bg-white'}`}>
                             <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                             <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-10 bg-zinc-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 blur-[60px]" />
                      <h3 className="text-2xl font-black mb-4 uppercase font-display">Agiza Kazi Hii</h3>
                      <p className="text-zinc-400 mb-8 font-medium">Bofya hapa chini kutuma oda yako kupitia WhatsApp. Kumbuka: Bei zetu zote ni kwa <span className="text-white font-black">MAELEWANO</span> kulingana na mahitaji yako.</p>
                      <a 
                        href={`https://wa.me/${CONTACT_INFO.phone.replace('+', '')}?text=Habari, Nahitaji kuongea nawe kuhusu oda ya ${selectedService.titleSw}. Maelewano ya bei tafadhali...`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-accent inline-flex items-center gap-3 w-full justify-center"
                      >
                        <MessageCircle className="w-6 h-6" />
                        <span>Agiza (Bei ya Maelewano)</span>
                      </a>
                    </div>
                  </div>

                  {/* Gallery Column */}
                  <div className="space-y-12">
                    <h3 className="text-sm font-black text-zinc-400 uppercase tracking-[0.4em] mb-6 text-left font-display">MIKAKATI NA PICHA HALISI</h3>
                    <div className="grid grid-cols-1 gap-10">
                       {selectedService.images.map((img, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, scale: 0.95 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           className={`rounded-[3rem] overflow-hidden shadow-2xl border-8 ${isDarkMode ? 'border-zinc-900' : 'border-zinc-50'}`}
                         >
                           <img src={img} alt="Work Example" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                         </motion.div>
                       ))}
                    </div>
                    
                    <div className={`py-16 text-center border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
                      <button onClick={() => setSelectedService(null)} className={`font-black uppercase text-xs tracking-widest border-b-2 transition-all pb-1 ${isDarkMode ? 'text-white border-white hover:text-brand-orange hover:border-brand-orange' : 'text-zinc-900 border-zinc-900 hover:text-brand-orange hover:border-brand-orange'}`}>Tazama Huduma Nyingine</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price Estimator Section */}
      <section id="estimator" className={`py-32 transition-colors duration-500 ${isDarkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-black mb-6 font-display leading-tight uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Kikokotoo cha <br /> <span className="text-brand-orange">Makadirio (Estimate)</span></h2>
              <p className="text-zinc-500 font-medium tracking-wide">Ingiza vipimo hapa chini kujuana bei kulingana na mahitaji yako.</p>
            </div>

            <div className={`p-10 rounded-[4rem] shadow-2xl border ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-white border-zinc-100 shadow-zinc-900/5'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-50">Jina Lako</label>
                  <input 
                    type="text" 
                    placeholder="Weka Jina Kamili"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full p-6 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`} 
                  />
                </div>
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-50">Namba ya Simu</label>
                  <input 
                    type="tel" 
                    placeholder="EX: 0712 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full p-6 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-50">Aina ya Kazi</label>
                  <select 
                    value={estimatorType}
                    onChange={(e) => setEstimatorType(e.target.value)}
                    className={`w-full p-6 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}
                  >
                    <option value="aluminium">Dirisha la Aluminium</option>
                    <option value="gate">Geti la Kuslide</option>
                    <option value="bed">Kitanda cha Chuma</option>
                    <option value="grill">Grill ya Dirisha</option>
                  </select>
                </div>
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-50">Upana (Feet)</label>
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className={`w-full p-6 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`} 
                  />
                </div>
                <div className="text-left">
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-50">Urefu (Feet)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className={`w-full p-6 rounded-2xl border font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`} 
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-zinc-800/10">
                <div className="text-left">
                  <p className="text-sm font-bold opacity-40 uppercase tracking-widest mb-1">Makadirio ya Eneo:</p>
                  <p className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                    {width * height} <span className="text-lg">SQ FT</span>
                  </p>
                </div>

                {!submitSuccess ? (
                  <button 
                    onClick={handleOrderSubmit}
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto px-16 py-6 text-lg flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-6 h-6" />
                    )}
                    {isSubmitting ? 'Inatuma...' : 'Tuma Oda yangu'}
                  </button>
                ) : (
                  <div className="flex items-center gap-4 text-green-600 bg-green-500/10 px-8 py-5 rounded-3xl border border-green-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                    <p className="font-black uppercase tracking-tight text-xl">Oda Imetumwa Vizuri!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Order Tracker Section */}
      <section id="order" className={`py-40 border-y transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-zinc-100 border-zinc-200'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 text-left">
              <h2 className={`text-4xl md:text-6xl font-black mb-8 leading-tight font-display tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>FUATILIA MZIGO <br /> <span className="text-brand-orange">WAKO LIVE</span></h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed mb-10">Ingiza namba ya oda uliyopewa ujue mzigo wako upo hatua gani.</p>
              
              <div className="relative group max-w-md">
                <input 
                  type="text" 
                  placeholder="EX: #F5529" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className={`w-full p-6 pr-20 rounded-[2rem] border-2 font-black transition-all outline-none text-xl ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white focus:border-brand-orange' : 'bg-white border-zinc-200 text-zinc-900 focus:border-brand-orange shadow-lg shadow-zinc-900/5'}`}
                />
                <button 
                  onClick={() => setOrderStatus(orderId ? "Inachomewa (Welding Phase)" : null)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-900 text-white dark:bg-brand-orange rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className={`flex-1 w-full max-w-xl p-10 rounded-[3rem] border transition-all ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-100 shadow-2xl shadow-zinc-900/5'}`}>
              <div className="space-y-10">
                {[
                  { label: "Oda Imepokelewa", status: "Done", done: true },
                  { label: "Kukata Vifaa", status: "Done", done: true },
                  { label: "Ufundi (Work Phase)", status: "In Progress", active: true },
                  { label: "Rangi & Maridadi", status: "Pending", next: true },
                  { label: "Kufunga / Kukabidhi", status: "Pending", next: true }
                ].map((step, i) => (
                  <div key={i} className={`flex items-start gap-6 transition-opacity ${step.next ? 'opacity-30' : 'opacity-100'}`}>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step.done ? 'bg-brand-orange border-brand-orange text-white' : step.active ? 'bg-white border-brand-orange text-brand-orange animate-pulse' : 'bg-transparent border-zinc-500'}`}>
                        {step.done && <CheckCircle2 className="w-5 h-5 font-black" />}
                      </div>
                      {i < 4 && <div className={`w-[2px] h-12 my-2 ${step.done ? 'bg-brand-orange' : 'bg-zinc-800'}`} />}
                    </div>
                    <div>
                      <h4 className={`font-black uppercase tracking-tight ${step.active ? 'text-brand-orange text-xl' : isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{step.label}</h4>
                      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{step.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Overlay Style */}
      <section id="contact" className={`py-40 transition-colors duration-500 overflow-hidden ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className={`max-w-6xl mx-auto rounded-[3.5rem] overflow-hidden transition-all duration-500 shadow-2xl ${isDarkMode ? 'bg-zinc-900 border border-white/5' : 'bg-zinc-900'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-24 text-left relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-orange/10 blur-[100px]" />
                <span className="text-brand-orange font-black text-xs uppercase tracking-[0.4em] mb-8 block">Tufuate & Wasiliana Nasi</span>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-16 uppercase tracking-tight leading-[0.85] font-display">
                  TUANZISHE <br /> MRADI WAKO
                </h2>
                
                <div className="space-y-12 mb-20">
                  {[
                    { icon: <MapPin />, label: "Ofisi Yetu", value: CONTACT_INFO.location, color: "orange" },
                    { icon: <Phone />, label: "Piga Simu / SMS", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`, color: "orange" },
                    { icon: <MessageCircle />, label: "WhatsApp", value: "Chat Mara Moja", href: `https://wa.me/${CONTACT_INFO.phone.replace('+', '').replace(/\s/g, '')}?text=Habari Fanuel Workshop, Nahitaji maelewano ya bei kuhusu...`, color: "green" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-8 group">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${item.color === 'green' ? 'bg-green-600/10 text-green-500' : 'bg-orange-600/10 text-orange-500'} border border-white/5 group-hover:bg-brand-orange group-hover:text-white`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-zinc-500 font-black uppercase text-[10px] tracking-widest mb-2">{item.label}</h4>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith('http') ? "_blank" : undefined} rel="noreferrer" className="text-white font-black text-xl md:text-2xl hover:text-brand-orange transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white font-black text-xl md:text-2xl leading-tight">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  {CONTACT_INFO.socials.map((social, i) => (
                    <a 
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-14 h-14 bg-zinc-800 hover:bg-brand-orange transition-all duration-500 rounded-2xl flex items-center justify-center text-white border border-white/5"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative h-96 lg:h-auto bg-zinc-800 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="Gate Background" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-20">
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
                    <MapPin className="w-10 h-10 text-brand-orange animate-bounce" />
                  </div>
                  <p className="text-white font-black uppercase tracking-[0.4em] text-3xl font-display">Nyamongo</p>
                  <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.5em] mt-3">Zero-Zero Mkoroshoni</p>
                  <div className="mt-12 px-8 py-4 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Mara, Tanzania</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-32 transition-colors duration-500 border-t ${isDarkMode ? 'bg-zinc-950 border-white/5' : 'bg-zinc-950 border-zinc-900'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center font-black text-2xl text-white">F</div>
                <p className="text-white font-black text-3xl tracking-tighter uppercase font-display">FAW Workshop</p>
              </div>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">Fanuel's Aluminium & Welding</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="text-center md:text-right">
                <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-3">Mwasiliano ya Simu</p>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-white text-2xl font-black hover:text-brand-orange transition-colors">{CONTACT_INFO.phone}</a>
              </div>
              <div className="hidden md:block h-16 w-[2px] bg-zinc-900" />
              <div className="text-center md:text-left">
                <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-3">Tufuate Kijamii</p>
                <div className="flex gap-6">
                  {CONTACT_INFO.socials.map((s, i) => (
                    <a key={i} href={s.link} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">{s.name}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">© {new Date().getFullYear()} FAW | Fanuel Workshop. Karibu sana Nyamongo.</p>
            <div className="flex gap-10 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition-colors">Maelezo Kamili</span>
              <span className="hover:text-white cursor-pointer transition-colors">Sheria</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
      {/* Mobile Bottom Navigation */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 transition-all duration-500 pointer-events-none`}>
        <div className={`max-w-md mx-auto h-20 rounded-[2.5rem] shadow-2xl flex items-center justify-between px-8 border backdrop-blur-xl pointer-events-auto transition-colors duration-500 ${isDarkMode ? 'bg-zinc-900/95 border-white/10' : 'bg-white/95 border-zinc-200'}`}>
          {[
            { id: 'services', icon: <LayoutGrid className="w-6 h-6" />, label: "Huduma" },
            { id: 'estimator', icon: <Calculator className="w-6 h-6" />, label: "Bei" },
            { id: 'home', icon: <span className="w-10 h-10 bg-brand-orange text-white rounded-2xl flex items-center justify-center font-black">F</span>, label: "Home", center: true },
            { id: 'order', icon: <CheckCircle2 className="w-6 h-6" />, label: "Oda" },
            { id: 'contact', icon: <MessageCircle className="w-6 h-6" />, label: "Chat" },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${item.center ? '-mt-10' : isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'}`}
            >
              <div className="transition-transform active:scale-95">{item.icon}</div>
              {!item.center && <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* AI Chat Button & Overlay */}
      <motion.div className="fixed bottom-28 right-6 z-[90] lg:bottom-10 lg:right-10 overflow-visible text-left">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className={`absolute bottom-20 right-0 w-80 md:w-96 h-[500px] rounded-[2.5rem] shadow-2xl border flex flex-col overflow-hidden transition-colors ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-200'}`}
            >
              <div className="bg-brand-orange p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Sparkles className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-tighter">FAW Bot</h3>
                    <p className="text-[8px] font-bold uppercase opacity-80">Msaidizi wa Fanuel Workshop</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium ${msg.role === 'user' ? 'bg-brand-orange text-white rounded-tr-none' : isDarkMode ? 'bg-zinc-800 text-white rounded-tl-none' : 'bg-zinc-100 text-zinc-900 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-zinc-100 dark:border-white/5 flex gap-2">
                <input 
                  type="text" 
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Uliza chochote..." 
                  className={`flex-1 p-3 px-6 rounded-full border text-sm outline-none focus:border-brand-orange transition-all ${isDarkMode ? 'bg-zinc-800 border-white/5 text-white' : 'bg-white border-zinc-200'}`}
                />
                <button 
                  onClick={() => {
                    if(!inputMsg) return;
                    setChatMessages([...chatMessages, { role: 'user', text: inputMsg }]);
                    setInputMsg("");
                    setTimeout(() => setChatMessages(prev => [...prev, { role: 'ai', text: 'Nitakuunganisha na fundi mkuu kukuambia bei ya maelewano hivi punde!' }]), 1000);
                  }}
                  className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center"
                ><Send className="w-5 h-5" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-zinc-900 text-white dark:bg-brand-orange rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
        </button>
      </motion.div>
    </div>
  );
}
