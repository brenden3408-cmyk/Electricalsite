import React, { useState, useEffect } from 'react';
import { 
  Phone, Star, ShieldCheck, Zap, Wrench, BatteryCharging, 
  Lightbulb, Clock, CheckCircle2, ChevronDown, Menu, X, 
  MapPin, Mail, Facebook, Instagram, Twitter, AlertTriangle,
  ArrowRight, Award, ThumbsUp, HardHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

function Button({ 
  children, className, variant = 'primary', size = 'md', ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'danger',
  size?: 'sm' | 'md' | 'lg'
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[var(--color-brand-yellow)] text-navy-950 hover:bg-[var(--color-brand-yellow-hover)] focus:ring-[var(--color-brand-yellow)]",
    secondary: "bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-900",
    outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-50 focus:ring-navy-900",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)} 
      {...props}
    >
      {children}
    </button>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-navy-950/95 backdrop-blur-sm py-5 text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg", isScrolled ? "bg-navy-900 text-[var(--color-brand-yellow)]" : "bg-[var(--color-brand-yellow)] text-navy-950")}>
              <Zap size={24} className="fill-current" />
            </div>
            <span className={cn("text-2xl font-bold font-display tracking-tight", isScrolled ? "text-navy-950" : "text-white")}>
              SparkRight
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--color-brand-yellow)]",
                  isScrolled ? "text-navy-700" : "text-navy-100"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a href="tel:555-0198" className="hidden sm:flex items-center gap-2 font-bold text-lg group">
              <div className={cn("p-2 rounded-full transition-colors", isScrolled ? "bg-navy-100 group-hover:bg-navy-200" : "bg-navy-800 group-hover:bg-navy-700")}>
                <Phone size={18} className={isScrolled ? "text-navy-900" : "text-[var(--color-brand-yellow)]"} />
              </div>
              <span className={isScrolled ? "text-navy-950" : "text-white"}>(555) 0198-ELEC</span>
            </a>
            
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} className={isScrolled ? "text-navy-900" : "text-white"} />
              ) : (
                <Menu size={24} className={isScrolled ? "text-navy-900" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-navy-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-navy-900 border-b border-navy-50 hover:bg-navy-50 hover:text-[var(--color-brand-yellow)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-3">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Phone size={18} />
                  Call (555) 0198-ELEC
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop" 
          alt="Professional electrician working on a modern breaker panel" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-navy-950/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Star Rating Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <div className="flex text-[var(--color-brand-yellow)]">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
            </div>
            <span className="text-white text-sm font-medium">4.9/5 Average Rating from 500+ Locals</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 font-display"
          >
            Safe. Reliable. <br/>
            <span className="text-[var(--color-brand-yellow)]">Done Right</span> the First Time.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-navy-100 mb-10 max-w-2xl leading-relaxed"
          >
            From emergency repairs to full home rewiring, our master electricians deliver professional-grade installations with transparent, flat-rate pricing.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="text-lg group">
              Get Your Free Estimate
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">
              View Our Services
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: "Licensed, Bonded & Insured", desc: "Full coverage for your peace of mind" },
    { icon: Award, title: "Master Electrician", desc: "License #ME-8472910" },
    { icon: ThumbsUp, title: "A+ BBB Accredited", desc: "Commitment to excellence" },
    { icon: HardHat, title: "Safety First", desc: "OSHA Certified Technicians" },
  ];

  return (
    <section className="bg-white py-12 border-b border-navy-100 relative z-20 -mt-8 mx-4 sm:mx-6 lg:mx-8 rounded-xl shadow-xl max-w-7xl xl:mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center text-navy-600">
                <badge.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-navy-900">{badge.title}</h3>
                <p className="text-sm text-navy-500">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmergencySection() {
  return (
    <section className="bg-red-600 py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-full flex-shrink-0 animate-pulse">
              <AlertTriangle size={48} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-2">
                Sparks? No Power? Smell Burning?
              </h2>
              <p className="text-red-100 text-lg max-w-2xl">
                Electrical emergencies are dangerous. Don't wait. Our rapid-response team is available 24/7 to secure your home and restore power safely.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Button variant="primary" size="lg" className="w-full lg:w-auto text-xl py-5 px-8 shadow-xl hover:scale-105 transition-transform bg-white text-red-600 hover:bg-gray-50">
              <Phone size={24} className="mr-3 animate-bounce" />
              Call Us Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Zap,
      title: "Panel Upgrades",
      desc: "Modernize your home's electrical heart. Essential for older homes or when adding major appliances.",
      price: "Starting at $1,200"
    },
    {
      icon: Wrench,
      title: "Home Rewiring",
      desc: "Replace dangerous knob-and-tube or aluminum wiring with safe, modern copper circuits.",
      price: "Custom Quote"
    },
    {
      icon: BatteryCharging,
      title: "EV Charger Installation",
      desc: "Level 2 charging stations installed safely and to code for any electric vehicle make.",
      price: "Starting at $450"
    },
    {
      icon: Lightbulb,
      title: "Lighting Design & Install",
      desc: "Recessed lighting, chandeliers, landscape lighting, and smart home integration.",
      price: "Starting at $150/fixture"
    },
    {
      icon: Zap,
      title: "Generator Hookups",
      desc: "Keep the lights on during outages with manual transfer switches or standby generators.",
      price: "Starting at $800"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Repairs",
      desc: "24/7 rapid response for sparking outlets, dead circuits, and storm damage.",
      price: "$150 Dispatch Fee"
    }
  ];

  return (
    <section id="services" className="py-24 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-navy-950 font-display mb-4">Expert Electrical Services</h2>
          <p className="text-lg text-navy-600">
            We provide comprehensive electrical solutions with transparent, flat-rate pricing. No surprises, just quality work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-navy-100 group">
              <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--color-brand-yellow)] group-hover:text-navy-950 transition-colors text-navy-600">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{service.title}</h3>
              <p className="text-navy-600 mb-6 min-h-[48px]">{service.desc}</p>
              <div className="pt-4 border-t border-navy-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-navy-500 uppercase tracking-wider">Pricing</span>
                <span className="font-bold text-navy-900">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      num: "01",
      title: "Call & Schedule",
      desc: "Contact our 24/7 dispatch. We'll find an appointment time that works for your schedule."
    },
    {
      num: "02",
      title: "Diagnose & Quote",
      desc: "Our master electrician inspects the issue and provides a flat-rate, transparent quote before any work begins."
    },
    {
      num: "03",
      title: "Fix & Guarantee",
      desc: "We complete the work safely and to code, backed by our 100% satisfaction guarantee."
    }
  ];

  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-navy-950 font-display mb-6">Simple, Stress-Free Process</h2>
            <p className="text-lg text-navy-600 mb-10">
              We know electrical issues can be stressful. That's why we've designed our process to remove all anxiety around the unknown. You'll always know what we're doing and exactly what it costs.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center border-2 border-[var(--color-brand-yellow)]">
                    <span className="text-2xl font-bold text-navy-900 font-display">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
                    <p className="text-navy-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2574&auto=format&fit=crop" 
                alt="Electrician explaining quote to homeowner" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-navy-50 max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-2">
                <CheckCircle2 size={32} className="text-green-500" />
                <h4 className="font-bold text-navy-900">Upfront Pricing</h4>
              </div>
              <p className="text-sm text-navy-600">No hidden fees. The price we quote is the price you pay.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const projects = [
    { img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2669&auto=format&fit=crop", title: "Panel Upgrade", type: "Before & After" },
    { img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5e89?q=80&w=2670&auto=format&fit=crop", title: "EV Charger Install", type: "Residential" },
    { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop", title: "Kitchen Lighting", type: "Remodel" },
    { img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?q=80&w=2574&auto=format&fit=crop", title: "Smart Home Setup", type: "Integration" },
  ];

  return (
    <section id="gallery" className="py-24 bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold font-display mb-4">Our Work Speaks for Itself</h2>
            <p className="text-navy-200 text-lg">
              Browse our gallery of recent projects. We take pride in clean, organized, and safe electrical installations.
            </p>
          </div>
          <Button variant="outline" className="border-navy-600 text-white hover:bg-navy-800">
            View Full Gallery
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-xl bg-navy-900">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[var(--color-brand-yellow)] text-sm font-bold tracking-wider uppercase mb-1">{project.type}</span>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      location: "Oakridge Neighborhood",
      text: "SparkRight saved us when half our house lost power on a Sunday. The technician arrived in 45 minutes, found the burnt wire, and fixed it safely. Worth every penny.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
    },
    {
      name: "Michael Chen",
      location: "Downtown",
      text: "Had them install a Level 2 EV charger in my garage. The quote was transparent, the work was incredibly neat (they even swept up!), and it passed city inspection perfectly.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
    },
    {
      name: "David & Emma Thompson",
      location: "Westside",
      text: "Upgraded our 100-amp panel to 200-amp. The crew was professional, handled all the permits, and coordinated with the utility company seamlessly. Highly recommend.",
      img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=2634&auto=format&fit=crop"
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center text-[var(--color-brand-yellow)] mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} className="fill-current" />)}
          </div>
          <h2 className="text-4xl font-bold text-navy-950 font-display mb-4">Trusted by Your Neighbors</h2>
          <p className="text-lg text-navy-600">
            Don't just take our word for it. See what homeowners in your area have to say about our service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-navy-100 relative">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img src={review.img} alt={review.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="mt-6 mb-4 flex text-[var(--color-brand-yellow)]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
              </div>
              <p className="text-navy-700 italic mb-6">"{review.text}"</p>
              <div>
                <h4 className="font-bold text-navy-900">{review.name}</h4>
                <p className="text-sm text-navy-500 flex items-center gap-1">
                  <MapPin size={14} /> {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Do you offer free estimates?",
      a: "Yes, we offer free, no-obligation estimates for all planned projects like panel upgrades, rewiring, and installations. For emergency troubleshooting, we charge a standard dispatch fee."
    },
    {
      q: "Are your electricians licensed and insured?",
      a: "Absolutely. Every technician we send is a licensed electrician, and our company carries comprehensive liability insurance and workers' compensation for your protection."
    },
    {
      q: "How quickly can you respond to an emergency?",
      a: "For true electrical emergencies (sparking, smoking, complete power loss), we guarantee a response time of under 2 hours, 24/7/365."
    },
    {
      q: "Do you handle the permits for major work?",
      a: "Yes. For any work requiring a city or county permit (like panel upgrades or EV chargers), we handle the entire permitting and inspection process for you."
    },
    {
      q: "What areas do you service?",
      a: "We service the entire metro area and surrounding suburbs within a 30-mile radius. Check our service areas page for a specific list of neighborhoods."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy-950 font-display mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-navy-600">
            Everything you need to know before giving us a call.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-navy-100 rounded-xl overflow-hidden transition-colors hover:border-navy-300"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-navy-900 pr-8">{faq.q}</span>
                <span className="text-navy-400 flex-shrink-0">
                  {openIndex === index ? <ChevronDown size={20} className="transform rotate-180 transition-transform" /> : <ChevronDown size={20} className="transition-transform" />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-navy-600 border-t border-navy-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200 pt-20 pb-10 border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[var(--color-brand-yellow)] text-navy-950">
                <Zap size={24} className="fill-current" />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight text-white">
                SparkRight
              </span>
            </div>
            <p className="mb-6">
              Safe, reliable, and professional electrical services for residential and commercial properties. Done right the first time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center hover:bg-[var(--color-brand-yellow)] hover:text-navy-950 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center hover:bg-[var(--color-brand-yellow)] hover:text-navy-950 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center hover:bg-[var(--color-brand-yellow)] hover:text-navy-950 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-[var(--color-brand-yellow)] transition-colors">Our Services</a></li>
              <li><a href="#process" className="hover:text-[var(--color-brand-yellow)] transition-colors">How We Work</a></li>
              <li><a href="#gallery" className="hover:text-[var(--color-brand-yellow)] transition-colors">Project Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[var(--color-brand-yellow)] transition-colors">Customer Reviews</a></li>
              <li><a href="#faq" className="hover:text-[var(--color-brand-yellow)] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-[var(--color-brand-yellow)] transition-colors">Panel Upgrades</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-yellow)] transition-colors">Home Rewiring</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-yellow)] transition-colors">EV Charger Install</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-yellow)] transition-colors">Lighting Design</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-yellow)] transition-colors">Emergency Repairs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--color-brand-yellow)] flex-shrink-0 mt-1" />
                <span>1234 Electric Ave, Suite 100<br/>Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[var(--color-brand-yellow)] flex-shrink-0" />
                <span className="text-lg font-bold text-white">(555) 0198-ELEC</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[var(--color-brand-yellow)] flex-shrink-0" />
                <span>service@sparkright.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-[var(--color-brand-yellow)] flex-shrink-0" />
                <span>24/7 Emergency Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} SparkRight Electrical. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">License #ME-8472910</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[var(--color-brand-yellow)] selection:text-navy-950">
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <Services />
        <EmergencySection />
        <Process />
        <Gallery />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
