src/components/Benefits.jsx

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

//


src/App.jsx

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

//

