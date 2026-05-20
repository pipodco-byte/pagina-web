## main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)


## App.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, HelpCircle } from 'lucide-react';
import { Button, Input, Card, CardBody, Accordion, AccordionItem, Divider, ButtonGroup, Spinner } from '@heroui/react';
import { useSEO } from './hooks/useSEO';
import { Header } from './components/Header';
import { FooterCTA } from './components/FooterCTA';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Benefits } from './components/Benefits';
import AboutPage from './AboutPage';
import PlanRetomaPage from './PlanRetomaPage';
import ContactanosPage from './ContactanosPage';
import BlogPage from './BlogPage';
import { STEPS, CHECKLIST, FAQS } from './data/constants';
import './styles/shimmer.css';

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { visible: { transition: { staggerChildren: 0.15 } } };
const slideInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const slideInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);



function Steps() {
  return (
    <section id="como-funciona" className="py-32 px-8" style={{ backgroundColor: '#FFFFFF', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-24 space-y-8">
          <h2 className="text-6xl md:text-7xl font-black tracking-tight" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} id="steps-heading">Tres pasos un nuevo equipo</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {STEPS.map((step, idx) => {
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.5 }} whileHover={{ y: -15 }} className="relative text-center group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 rounded">
                <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: 'spring', stiffness: 300 }} className="relative z-10 mx-auto mb-10">
                  <div className="text-6xl md:text-7xl font-black" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {step.number}
                  </div>
                </motion.div>
                <h3 className="text-4xl font-black mb-4" style={{ color: '#1F2937' }}>{step.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Checklist() {
  return (
    <section id="recomendaciones" className="py-32 px-8" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-24 space-y-8">
          <span className="text-[10px] uppercase font-black tracking-[0.4em]" style={{ color: '#9CA3AF' }}>RECOMENDACIONES</span>
          <h2 className="text-6xl md:text-7xl font-black tracking-tight" style={{ color: '#F9FAFB' }} id="checklist-heading">Antes de entregar tu equipo, asegúrate de</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CHECKLIST.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.4 }} whileHover={{ scale: 1.05, x: 5 }} className="flex items-start gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 rounded p-2">
              <motion.div whileHover={{ rotate: 12, scale: 1.2 }} animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="flex-shrink-0 mt-1">
                <item.icon style={{ color: '#0066CC' }} size={28} />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>{item.title}</h3>
                <p className="text-base" style={{ color: '#D1D5DB' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const leftFAQs = FAQS.slice(0, 6);
  const rightFAQs = FAQS.slice(6, 12);

  const FAQColumn = ({ faqs, startIdx }) => (
    <div className="space-y-4">
      <Accordion variant="splitted" selectionMode="multiple" hideIndicator>
        {faqs.map((faq, idx) => (
          <AccordionItem key={startIdx + idx} title={faq.q} className="text-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-2" style={{ color: '#1F2937' }} startContent={<HelpCircle size={20} style={{ color: '#0066CC' }} />}>
            <div className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{faq.a}</div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  return (
    <section id="faq" className="py-32 px-6" style={{ backgroundColor: '#FFFFFF', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block" style={{ color: '#9CA3AF' }}>Dudas</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4" style={{ color: '#1F2937' }} id="faq-heading">Preguntas Frecuentes</h2>
          <p className="text-base uppercase tracking-[0.2em]" style={{ color: '#6E6E6E' }}>Todo sobre el Plan Retoma</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <FAQColumn faqs={leftFAQs} startIdx={0} />
          <FAQColumn faqs={rightFAQs} startIdx={6} />
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const timeoutRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }
    setStatus('loading');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus('success');
      setEmail('');
      const successTimeout = setTimeout(() => setStatus('idle'), 3000);
      return () => clearTimeout(successTimeout);
    }, 1500);
  }, [email]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto px-6 text-center">
      <h3 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#FFFFFF' }}>Mantente Informado</h3>
      <p className="mb-10 text-base md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>Recibe ofertas exclusivas del Plan Retoma y novedades sobre dispositivos Apple.<br/><span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#9CA3AF' }}>Sin spam, solo valor</span></p>
      {status === 'success' ? (
        <div className="p-8 rounded-2xl shadow-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', fontSize: '1.125rem' }}>✓ ¡Gracias! Revisa tu correo.</div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl p-2 shadow-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <ButtonGroup className="w-full">
            <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
            <Input id="newsletter-email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'} className="flex-1 text-base focus-visible:outline-2 focus-visible:outline-offset-2" style={{ backgroundColor: 'transparent', color: '#FFFFFF' }} required />
            <Button type="submit" disabled={status === 'loading'} className="text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-70 shadow-lg hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gradient-to-r" style={{ backgroundColor: '#3B82F6', backgroundImage: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)' }}>
              {status === 'loading' ? (
                <><Spinner size="sm" className="mr-2" />Enviando...</>
              ) : (
                'Suscribirse'
              )}
            </Button>
          </ButtonGroup>
          {error && <p className="text-red-400 text-sm mt-2" role="alert">{error}</p>}
        </form>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: '#000000' }}>
      <div className="py-32">
        <Newsletter />
      </div>
    </footer>
  );
}

function PipodFooter() {
  return (
    <footer style={{ backgroundColor: '#000000' }} className="text-white">
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-bold mb-4">Soporte / Ayuda</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Contáctanos</a></li>
              <li><a href="#" className="hover:text-blue-400">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-blue-400">Política de Devoluciones</a></li>
              <li><a href="#" className="hover:text-blue-400">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-blue-400">Política de Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">PLAN RETOMA</a></li>
              <li><a href="#" className="hover:text-blue-400">NUEVOS</a></li>
              <li><a href="#" className="hover:text-blue-400">USADOS</a></li>
              <li><a href="#" className="hover:text-blue-400">ACCESORIOS</a></li>
              <li><a href="#" className="hover:text-blue-400">BLOG</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Servicio Técnico Apple</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">iPhones</a></li>
              <li><a href="#" className="hover:text-blue-400">iPads</a></li>
              <li><a href="#" className="hover:text-blue-400">iMacs</a></li>
              <li><a href="#" className="hover:text-blue-400">MacBooks</a></li>
              <li><a href="#" className="hover:text-blue-400">SmartWatch</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">SÍGUENOS</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" aria-label="Facebook" className="focus-visible:outline-2 focus-visible:outline-offset-2 rounded">
                <Facebook className="cursor-pointer transition-all hover:scale-125" style={{ color: '#FFFFFF' }} size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="focus-visible:outline-2 focus-visible:outline-offset-2 rounded">
                <Instagram className="cursor-pointer transition-all hover:scale-125" style={{ color: '#FFFFFF' }} size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="focus-visible:outline-2 focus-visible:outline-offset-2 rounded">
                <Twitter className="cursor-pointer transition-all hover:scale-125" style={{ color: '#FFFFFF' }} size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="focus-visible:outline-2 focus-visible:outline-offset-2 rounded">
                <Linkedin className="cursor-pointer transition-all hover:scale-125" style={{ color: '#FFFFFF' }} size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-500">© 2025 Pipod. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;

  const isNosotros = pathname === '/nosotros';
  const isPlanRetoma = pathname === '/plan-retoma';
  const isContactanos = pathname === '/contactanos';
  const isBlog = pathname === '/blog';

  useSEO({
    title: isNosotros ? 'Pipod - Nosotros' : isPlanRetoma ? 'Pipod - Plan Retoma' : isContactanos ? 'Pipod - Contáctanos' : isBlog ? 'Pipod - Blog' : 'Pipod - Plan Retoma de Dispositivos Apple',
    description: isNosotros ? 'Conoce la historia, visión, misión y valores de Pipod.' : isPlanRetoma ? 'Plan Retoma de Pipod - Entrega tu dispositivo usado y recibe crédito.' : isContactanos ? 'Contáctanos - Ponte en contacto con Pipod.' : isBlog ? 'Blog de Pipod - Artículos y noticias sobre Apple.' : 'Entrega tu dispositivo Apple usado (iPhone, MacBook, iMac, Apple Watch) y recibe crédito para comprar equipo nuevo o reacondicionado. Proceso transparente, sostenible y flexible.',
    keywords: isNosotros ? 'Pipod, nosotros, historia, visión, misión, valores' : isPlanRetoma ? 'plan retoma, dispositivos usados, crédito' : isContactanos ? 'contacto, contáctanos, Pipod' : isBlog ? 'blog, artículos, noticias, Apple' : 'retoma, iPhone, MacBook, Apple, dispositivos usados, crédito, descuento, Bogotá, Plan Retoma',
    ogImage: 'https://pipod.co/og-image.jpg',
    ogUrl: `https://pipod.co${pathname}`
  });

  return (
    <motion.div className="font-inter antialiased" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Header />
      {isNosotros ? (
        <AboutPage />
      ) : isPlanRetoma ? (
        <PlanRetomaPage />
      ) : isContactanos ? (
        <ContactanosPage />
      ) : isBlog ? (
        <BlogPage />
      ) : (
        <>
          <Hero />
          <Products />
          <Benefits />
          <Steps />
          <Checklist />
          <FAQ />
          <FooterCTA />
          <Footer />
          <PipodFooter />
        </>
      )}
    </motion.div>
  );
}



## Hero.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@heroui/react';
import { BUTTON_STYLES, BUTTON_COLORS } from '../styles/theme';

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { visible: { transition: { staggerChildren: 0.15 } } };

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden pt-20" style={{ background: 'linear-gradient(135deg, #F5F5F7 0%, #FFFFFF 100%)' }} onMouseMove={handleMouseMove}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-16 pt-0">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)' }} role="status" aria-label="Plan Retoma 2025">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} aria-hidden="true">
                <Sparkles size={16} style={{ color: '#06B6D4' }} />
              </motion.div>
              <span className="text-xs font-semibold tracking-wider" style={{ color: '#1D1D1F' }}>PLAN RETOMA 2025</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mt-0" style={{ background: 'linear-gradient(135deg, #0066CC 0%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }} animate={{ y: mousePosition.y * 0.5 }} transition={{ type: 'spring', stiffness: 100, damping: 30 }}>Renueva tu<br/>equipo</motion.h1>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-2xl" style={{ color: '#4B5563' }} animate={{ y: mousePosition.y * 0.3 }} transition={{ type: 'spring', stiffness: 100, damping: 30 }}>El Plan Retoma de Pipod te permite entregar tu dispositivo Apple usado (iPhone, Macbook, iMac, SmartWatch) y recibir un descuento por la compra de un equipo nuevo o reacondicionado. Aplicable para clientes particulares y empresas.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-8">
              <motion.div whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(0, 102, 204, 0.6)' }} whileTap={{ scale: 0.95 }}>
                <Button className={BUTTON_STYLES.primary} style={{ backgroundColor: BUTTON_COLORS.primary.bg }} aria-label="Agendar cita para Plan Retoma">
                  Agendar Cita
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }} whileTap={{ scale: 0.95 }}>
                <Button className={BUTTON_STYLES.secondary} style={{ borderColor: BUTTON_COLORS.secondary.border, color: BUTTON_COLORS.secondary.text }} aria-label="Ver proceso del Plan Retoma">
                  Ver proceso
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="video-container mt-0">
            <iframe src="https://player.vimeo.com/video/732211917" frameBorder="none" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowFullScreen sandbox="allow-same-origin allow-scripts allow-popups" style={{ border: 'none' }}></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



## Products.jsx. 


import { PRODUCTS } from '../data/constants';
import '../styles/shimmer.css';

export function Products() {
  return (
    <section className="py-16 px-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-16">
          {PRODUCTS.map((product, i) => (
            <div key={i} className="cursor-pointer px-4 md:px-6 py-8 md:py-12 text-center">
              <div 
                className="text-4xl md:text-5xl font-bold tracking-wide shimmer-word"
                style={{ 
                  '--delay': `${i * 0.4}s`,
                  '--duration': `${PRODUCTS.length * 0.4 + 2}s`
                }}
              >
                {product.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



## Benefits.jsx - CRÍTICO

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';
import { BENEFITS } from '../data/constants';
import '../styles/shimmer.css';

const slideInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

export function Benefits() {
  return (
    <section id="beneficios" className="py-40 px-6" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <span className="text-[10px] uppercase font-black tracking-[0.4em]" style={{ color: '#9CA3AF' }}>APROVECHA TU EQUIPO USADO</span>
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight shimmer-beneficios" 
              style={{ letterSpacing: "-0.03em", color: '#F9FAFB' }} 
              id="beneficios-heading"
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Beneficios
            </motion.h2>
            <p className="text-base leading-relaxed" style={{ color: '#9CA3AF' }}>El Plan Retoma de Pipod te permite renovar tu equipo con beneficios económicos y ambientales. Obtén el mejor valor por tu dispositivo usado y contribuye a un futuro más sostenible.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
            <div className="space-y-12">
              {BENEFITS.slice(0, 2).map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08, duration: 0.5 }} whileHover={{ y: -15, scale: 1.05, boxShadow: '0 20px 40px rgba(0, 102, 204, 0.2)' }} className="group">
                    <Card className="p-8 rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2" style={{ backgroundColor: '#121212', backdropFilter: 'blur(10px)', border: 'none' }}>
                      <CardBody className="flex flex-col items-center text-center" style={{ backgroundColor: '#121212', borderRadius: '1.5rem', border: 'none' }}>
                        <motion.div whileHover={{ rotate: 15, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }} className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shimmer-icon" style={{ backgroundColor: '#121212' }} data-icon-index={idx}>
                          <IconComponent size={40} className={`transition-colors ${item.hoverColor} icon-shimmer`} style={{ color: '#FFFFFF' }} />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-snug" style={{ color: '#FFFFFF' }}>{item.title}</h3>
                        <p className="text-base leading-relaxed" style={{ color: "#D1D5DB" }}>{item.desc}</p>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <div className="space-y-12 pt-0">
              {BENEFITS.slice(2, 4).map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div key={idx + 2} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (idx + 2) * 0.08, duration: 0.5 }} whileHover={{ y: -15, scale: 1.05 }} className="group">
                    <Card className="p-8 rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2" style={{ backgroundColor: '#121212', backdropFilter: 'blur(10px)', border: 'none' }}>
                      <CardBody className="flex flex-col items-center text-center" style={{ backgroundColor: '#121212', borderRadius: '1.5rem', border: 'none' }}>
                        <motion.div whileHover={{ rotate: 15, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }} className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shimmer-icon" style={{ backgroundColor: '#121212' }} data-icon-index={idx + 2}>
                          <IconComponent size={40} className={`transition-colors ${item.hoverColor} icon-shimmer`} style={{ color: '#FFFFFF' }} />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-snug" style={{ color: '#FFFFFF' }}>{item.title}</h3>
                        <p className="text-base leading-relaxed" style={{ color: "#D1D5DB" }}>{item.desc}</p>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



## constants.js - CRÍTICO

Contiene todos los datos: BENEFITS, STEPS, CHECKLIST, FAQS, PRODUCTS

Sin esto, no hay contenido


import { Lightbulb, Heart, Leaf, Send, HardDrive, Lock, Smartphone, Zap, FileText, HelpCircle } from 'lucide-react';

export const BENEFITS = [
  { icon: Lightbulb, title: 'Ahorro inmediato', desc: 'Tu dispositivo usado se valora y ese monto se convierte en crédito o descuento para el nuevo. Esto permite reducir el costo al momento de la compra.', hoverColor: 'group-hover:text-yellow-400' },
  { icon: Heart, title: 'Proceso transparente', desc: 'Revisamos tu equipo, te mostramos cómo llegamos al valor. Sabes lo que estás entregando, lo que vale y lo que recibirás.', hoverColor: 'group-hover:text-red-400' },
  { icon: Leaf, title: 'Sostenible', desc: 'Al dar tu equipo usado, se promueve su reutilización o reciclaje. Esto reduce residuos electrónicos y beneficia al medio ambiente.', hoverColor: 'group-hover:text-green-400' },
  { icon: Send, title: 'Decisión flexible', desc: 'El crédito que obtienes puede aplicarse a productos nuevos o reacondicionados (según tus reglas). Puedes elegir qué equipo comprar.', hoverColor: 'group-hover:text-blue-400' }
];

export const STEPS = [
  { number: '1', title: 'Diagnóstico', desc: 'Trae tu equipo a nuestra tienda y solicita un diagnóstico. También podemos programar una recogida.' },
  { number: '2', title: 'Evaluación', desc: 'Revisamos tu equipo: IMEI, batería, pantalla, puertos, sensores de humedad y funcionamiento general.' },
  { number: '3', title: 'Equipo Nuevo', desc: 'Aplicamos el crédito a la compra de un nuevo o reacondicionado. Te entregamos comprobante.' }
];

export const CHECKLIST = [
  { title: 'Respalda tu información', desc: 'Realizar un respaldo (backup) y, si lo prefieres, restablecerlo de fábrica.', icon: HardDrive },
  { title: 'Desvincula tu cuenta Apple', desc: 'Desactivar "Buscar mi iPhone" y eliminar tu cuenta de iCloud.', icon: Lock },
  { title: 'Cuida tus accesorios', desc: 'Retirar tarjetas SIM, fundas y accesorios personales.', icon: Smartphone },
  { title: 'Recuerda el cargador', desc: 'Incluir el cargador si hace parte de la oferta puede aumentar el valor final.', icon: Zap },
  { title: 'Documentación', desc: 'Traer factura, documento de propiedad o cajas de producto si lo tienes disponible.', icon: FileText },
  { title: '¿No sabes cómo hacerlo?', desc: 'No te preocupes — nuestro equipo en tienda puede ayudarte con el respaldo, restablecimiento y desactivación de iCloud.', icon: HelpCircle }
];

export const FAQS = [
  { q: '¿Cuánto tarda el proceso de valoración?', a: 'El diagnóstico inicial toma entre 30-60 minutos. La evaluación completa y oferta final se entrega el mismo día.' },
  { q: '¿Qué tipos de equipos reciben?', a: 'Aceptamos iPhone, MacBook, iMac, Apple Watch y otros dispositivos Apple. Evaluamos cada equipo según modelo, estado y funcionalidad.' },
  { q: '¿Aceptan equipos rotos o con pantalla partida?', a: 'Sí, evaluamos equipos con daños menores. El valor se ajusta según el estado real del dispositivo tras el diagnóstico.' },
  { q: '¿Puedo vender mi equipo en efectivo sin hacer retoma?', a: 'Sí, ofrecemos opciones de compra directa en efectivo. Contáctanos para conocer los detalles y condiciones.' },
  { q: '¿Qué garantía tiene el equipo reacondicionado que compre con mi crédito?', a: 'Los equipos reacondicionados incluyen garantía de 12 meses. Todos pasan por un proceso riguroso de revisión y certificación.' },
  { q: '¿Puedo pedir valoración sin llevar el equipo?', a: 'Puedes solicitar una valoración inicial por fotos o video. La oferta final se confirma después de la inspección física en tienda.' },
  { q: '¿Puedo usar el crédito en cualquier producto?', a: 'El crédito se puede aplicar a productos nuevos o reacondicionados según tus preferencias. Consulta disponibilidad de modelos.' },
  { q: '¿Qué pasa si mi dispositivo tiene datos?', a: 'Recomendamos respaldar y borrar todos tus datos antes de entregar el equipo. Nosotros realizamos un borrado seguro adicional.' },
  { q: '¿Qué pasa si no acepto la oferta?', a: 'Sin problema. Puedes rechazar la oferta sin compromiso. Tu equipo se devuelve en las mismas condiciones.' },
  { q: '¿El crédito se puede transferir a otra persona?', a: 'El crédito es personal y no transferible. Debe ser utilizado por quien realizó la retoma.' },
  { q: '¿Puedo entregar más de un equipo?', a: 'Sí, puedes entregar múltiples equipos. Cada uno se evalúa por separado y los créditos se suman.' },
  { q: '¿Cómo funciona el domicilio?', a: 'Ofrecemos servicio de recogida a domicilio en Bogotá. Coordina con nuestro equipo para agendar según disponibilidad de tu zona.' }
];

export const PRODUCTS = [
  { label: 'iPhone', img: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&h=200&fit=crop' },
  { label: 'MacBook', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop' },
  { label: 'iMac', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop' },
  { label: 'iPad', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop' },
  { label: 'Apple Watch', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' }
];



## index.css - CRÍTICO

Estilos globales con Tailwind

Configuración de animaciones y utilidades


@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-inter;
    margin: 0;
    padding: 0;
    background: transparent;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
}

@layer components {
  iframe {
    @apply w-full h-auto;
  }
}

@layer utilities {
  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@layer base {
  * {
    @apply scroll-smooth;
  }
}

@layer utilities {
  .video-container {
    @apply w-full h-screen;
    display: flex;
    align-items: flex-start;
  }
  
  .video-container iframe {
    @apply w-full h-full;
  }
}

## theme.js - CRÍTICO

Estilos de botones y colores globales

Usado en Hero.jsx

export const BUTTON_STYLES = {
  primary: 'text-white px-8 sm:px-14 py-4 sm:py-5 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
  secondary: 'px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold border-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2',
  disabled: 'px-8 py-4 rounded-2xl font-semibold cursor-not-allowed opacity-60'
};

export const BUTTON_COLORS = {
  primary: { bg: '#0066CC', text: '#FFFFFF' },
  secondary: { bg: 'transparent', text: '#06B6D4', border: '#06B6D4' },
  disabled: { bg: '#D1D5DB', text: '#9CA3AF' }
};


## shimmer.css - CRÍTICO

Animaciones shimmer para Products y Benefits

Efecto visual importante

@keyframes shimmerWord {
  0% {
    color: #1D1D1F;
  }
  20% {
    color: #0066CC;
  }
  50% {
    color: #0066CC;
  }
  80% {
    color: #1D1D1F;
  }
  100% {
    color: #1D1D1F;
  }
}

.shimmer-word {
  animation: shimmerWord var(--duration) ease-in-out forwards;
  animation-delay: var(--delay);
  color: #1D1D1F;
}

@keyframes shimmerBeneficios {
  0% {
    background: linear-gradient(90deg, #F9FAFB 0%, #F9FAFB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  15% {
    background: linear-gradient(90deg, #F9FAFB 0%, #3B82F6 20%, #F9FAFB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  50% {
    background: linear-gradient(90deg, #F9FAFB 0%, #3B82F6 50%, #F9FAFB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  85% {
    background: linear-gradient(90deg, #F9FAFB 0%, #3B82F6 80%, #F9FAFB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  100% {
    background: linear-gradient(90deg, #F9FAFB 0%, #F9FAFB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.shimmer-beneficios {
  animation: shimmerBeneficios 4s ease-in-out forwards;
}


## cartStore.js - IMPORTANTE

import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0)
  })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getItemCount: () => {
    return (state) => state.items.reduce((count, item) => count + item.quantity, 0);
  }
}));


## useSEO.js - IMPORTANTE

Hook para SEO dinámico

Usado en App.jsx

import { useEffect } from 'react';

export const useSEO = ({ title, description, keywords, ogImage, ogUrl }) => {
  useEffect(() => {
    document.title = title;
    
    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateOGMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateOGMeta('og:title', title);
    updateOGMeta('og:description', description);
    updateOGMeta('og:image', ogImage);
    updateOGMeta('og:url', ogUrl);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
  }, [title, description, keywords, ogImage, ogUrl]);
};


## package.json - CRÍTICO

Dependencias necesarias (React, Framer Motion, HeroUI, etc.)


{
  "name": "pipod-clone",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@heroui/react": "^2.8.5",
    "@mui/material": "^7.3.6",
    "@nextui-org/react": "^2.6.11",
    "framer-motion": "^12.23.25",
    "lucide-react": "^0.555.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.10.1",
    "zustand": "^5.0.9"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.22",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.18",
    "vite": "^7.2.4"
  }
}

