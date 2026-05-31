import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Monitor, Sparkles, Settings,
  CheckCircle2, Menu, X, Shield, Lock
} from 'lucide-react';
import Calculator from './components/Calculator';
import ParticleCanvas from './components/ParticleCanvas';
import TiltCard from './components/TiltCard';
import OrbitalSystem from './components/OrbitalSystem';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mailtoLink, setMailtoLink] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success, error
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Requirement text pre-filled by the cost calculator
  const [requirementText, setRequirementText] = useState('');

  const services = [
    {
      title: "Android Applications",
      desc: "Native Android apps engineered in Kotlin. Tailored for maximum device hardware integration, high-performance offline database capabilities, and native UI responsiveness.",
      icon: Smartphone,
      stack: ["Kotlin", "Jetpack Compose", "SQLite", "Biometrics"]
    },
    {
      title: "Full-Stack Web & SaaS",
      desc: "Responsive web systems, interactive customer portals, and bespoke SaaS platforms. Engineered with modern component-based frameworks and secure cloud databases.",
      icon: Monitor,
      stack: ["React", "Vite", "Node.js", "Tailwind CSS v4"]
    },
    {
      title: "Custom Business OS",
      desc: "Custom-tailored management dashboards, CRM tools, inventory systems, and business process automation platforms designed specifically to eliminate human errors.",
      icon: Settings,
      stack: ["PostgreSQL", "Express", "REST APIs", "Automation Engine"]
    },
    {
      title: "AI Integration & Agents",
      desc: "Infuse smart logic into your workflows. Integrate Gemini API, build custom automated AI agents for analysis, customer service routing, and automated document generation.",
      icon: Sparkles,
      stack: ["Gemini API", "Node.js", "AI Agents", "Automations"]
    }
  ];

  const projects = [
    {
      title: "RentFlow",
      category: "Property Management Dashboard",
      gradient: "from-cyan-500 to-blue-700",
      logo: "/rentflow_logo.png",
      demoUrl: "/rentflow/",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.yourcompany.rentflow",
      privacyUrl: "privacy-policy.html",
      description: "A premium, cloud-based property management platform designed for modern landlords and property managers. RentFlow streamlines rent collection, lease agreements, tenant onboarding, maintenance requests, and financial reporting with a highly polished, interactive dashboard.",
      features: [
        "Interactive Financial Dashboard",
        "Rent Collection & Overdue Invoices",
        "Property Portfolio Management",
        "Tenant Profiles & Communication",
        "Maintenance Ticket Tracking",
        "Lease & Contract Management",
        "Financial Reports & Analytics",
        "Settings & Notifications"
      ],
      highlights: "Saves landlords an average of 15 hours per month in administrative work."
    },
    {
      title: "SafePass",
      category: "Security Platform",
      gradient: "from-purple-500 to-pink-700",
      logo: "/safepass/logo.png",
      privacyUrl: "safepass-privacy.html",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.appsmiths.safepass",
      description: "A fully offline, zero-knowledge password manager featuring AES-256 encryption, Biometric authentication, and seamless encrypted backups. Built with a cinematic, modern dark UI inspired by leading security platforms. SafePass operates entirely locally with no internet permission required, no sign-ups, and auto-clearing clipboard features ensuring your data never leaves your device.",
      features: [
        "Secure Master Lock", 
        "AES-256 Local Encryption", 
        "100% Offline Vault", 
        "Encrypted Backups", 
        "Biometric Unlock",
        "Password Generator",
        "Auto-Clear Clipboard",
        "Zero-knowledge architecture"
      ],
      highlights: "Runs completely locally with 0 internet permissions required. Zero trust system."
    },
    {
      title: "Local Business OS",
      category: "Business Automation",
      gradient: "from-orange-500 to-red-700",
      description: "A customized business management platform designed to centralize client management, invoicing, project tracking, and employee workflows. Built from scratch to replace disjointed spreadsheet systems and streamline day-to-day operations.",
      features: [
        "Centralized CRM & Leads",
        "Automated PDF Invoicing",
        "Project Task Timelines",
        "Employee Time Logs",
        "Visual Revenue Metrics",
        "Role-Based Access Control"
      ],
      highlights: "Reduces data entering overhead by 40% and integrates invoicing directly."
    }
  ];

  const handleApplyEstimate = (estimateText) => {
    setRequirementText(estimateText);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerMailtoFallback = (name, email, whatsapp, businessName, requirement) => {
    const emailSubject = encodeURIComponent(`Project Consultation Request - ${businessName}`);
    const emailBody = encodeURIComponent(
      `Hello The Appsmiths,\n\n` +
      `I would like to request a consultation for custom software development.\n\n` +
      `--- Contact Details ---\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `WhatsApp/Phone: ${whatsapp}\n` +
      `Business: ${businessName}\n\n` +
      `--- Requirement ---\n` +
      `${requirement}\n\n` +
      `Please let me know when we can connect.\n\n` +
      `Regards,\n` +
      `${name}`
    );

    const link = `mailto:nmp2667@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    setMailtoLink(link);
    setSubmitStatus('success');
    setFormSubmitted(true);
    window.location.href = link;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const email = data.get('email');
    const whatsapp = data.get('whatsapp');
    const businessName = data.get('businessName') || 'N/A';
    const requirement = data.get('requirement');

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "";

    if (accessKey && accessKey !== "") {
      setSubmitStatus('sending');
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: name,
            email: email,
            subject: `New Request from ${businessName} (${name})`,
            message: `Requirements details:\n\nName: ${name}\nEmail: ${email}\nWhatsApp/Phone: ${whatsapp}\nBusiness: ${businessName}\n\nSoftware Requirements:\n${requirement}`,
            from_name: "The Appsmiths Portfolio"
          })
        });
        const result = await response.json();
        if (result.success) {
          setSubmitStatus('success');
          setFormSubmitted(true);
        } else {
          setSubmitStatus('error');
          triggerMailtoFallback(name, email, whatsapp, businessName, requirement);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitStatus('error');
        triggerMailtoFallback(name, email, whatsapp, businessName, requirement);
      }
    } else {
      triggerMailtoFallback(name, email, whatsapp, businessName, requirement);
    }
  };

  // Section entrance 3D transformation rules
  const section3D = {
    initial: { opacity: 0, y: 60, rotateX: 12 },
    whileInView: { opacity: 1, y: 0, rotateX: 0 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-brand-obsidian text-zinc-100 overflow-x-hidden font-sans relative selection:bg-cyan-400 selection:text-black">
      
      {/* 3D Cursor-Responsive Particle Grid Canvas Background */}
      <ParticleCanvas />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-brand-obsidian/40 border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <h1 className="text-2xl font-black tracking-tight text-white m-0">
              The <span className="text-cyan-400 transition-colors group-hover:text-cyan-300">Appsmiths</span>
            </h1>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#orbital-tech" className="hover:text-white transition-colors">Stack</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#calculator" className="hover:text-white transition-colors">Cost Estimator</a>
            <a href="#process" className="hover:text-white transition-colors">Our Process</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="hidden md:block">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm tracking-tight shadow-md hover:bg-zinc-100 transition-colors"
            >
              Hire The Appsmiths
            </motion.a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-brand-obsidian/95 px-6 py-6 space-y-4 text-left"
            >
              <div className="flex flex-col gap-4 text-zinc-300 font-semibold">
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Services</a>
                <a href="#orbital-tech" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Stack</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Projects</a>
                <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Cost Estimator</a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Our Process</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition">Contact</a>
              </div>
              <div className="pt-4 border-t border-white/5">
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-5 py-3 rounded-xl bg-white text-black font-bold text-sm"
                >
                  Hire The Appsmiths
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Custom Software Engineering Firm
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-white leading-[0.95] tracking-tight m-0"
            >
              We Architect
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Cinematic Code
              </span>
              <br />
              That Performs.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-300 text-lg sm:text-xl leading-relaxed max-w-2xl"
            >
              The Appsmiths designs and engineers high-polish Android applications, custom dashboards, process automation systems, and SaaS platforms that streamline workflows and drive client business growth.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#calculator"
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold shadow-lg shadow-cyan-500/20 text-center transition-all"
              >
                Estimate Project Cost
              </a>
              <a
                href="#contact"
                className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-center transition-all"
              >
                Book Consultation
              </a>
            </motion.div>
          </div>

          {/* Hero Branding Badge */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <TiltCard>
              <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Appsmiths Engine</div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block mb-1">Our Core Focus</span>
                    <h3 className="text-2xl font-black text-white m-0 leading-tight">Zero Templates.<br />100% Custom Code.</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-lg block mb-1">⚡</span>
                      <strong className="text-white block mb-0.5">High Performance</strong>
                      <span className="text-zinc-400 text-[10px]">Native execution, local caching.</span>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-lg block mb-1">🔒</span>
                      <strong className="text-white block mb-0.5">Security First</strong>
                      <span className="text-zinc-400 text-[10px]">AES-256 local-first options.</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section 
        id="services" 
        className="py-24 px-6 border-t border-white/5 style-3d"
        {...section3D}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase bg-cyan-400/10 px-3 py-1 rounded-full">CAPABILITIES</span>
            <h2 className="text-4xl md:text-5xl font-black text-white m-0">What We Build</h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">From native mobile apps to custom dashboards and automated AI tooling, we engineer solutions designed around your operations.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <TiltCard key={idx}>
                  <div className="glass-card p-8 md:p-10 rounded-[2.5rem] text-left flex flex-col justify-between group h-full">
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white m-0">{service.title}</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">{service.desc}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/5">
                      {service.stack.map((item, i) => (
                        <span key={i} className="text-[10px] font-semibold text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Tilted 3D Stack Solar System Section */}
      <motion.section 
        id="orbital-tech" 
        className="py-24 px-6 border-t border-white/5 style-3d"
        {...section3D}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 text-left space-y-6">
            <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase bg-cyan-400/10 px-3 py-1 rounded-full">OUR TOOLKIT</span>
            <h2 className="text-4xl md:text-5xl font-black text-white m-0 leading-tight">Our Technological Arsenal</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              We select robust, enterprise-ready technologies suited for scalable architectures. 
              Hover over the planetary orbits to inspect our core toolsets.
            </p>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>**Inner Orbit**: Front-end & Mobile application tools</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>**Middle Orbit**: Databases, Backend frameworks & Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>**Outer Orbit**: Cloud scaling & Google Gemini AI integrations</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <OrbitalSystem />
          </div>
        </div>
      </motion.section>

      {/* Cost Estimator Anchor */}
      <motion.section 
        id="calculator" 
        className="py-24 px-6 border-t border-white/5 bg-black/20 style-3d"
        {...section3D}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-blue-400 font-bold tracking-wider text-xs uppercase bg-blue-400/10 px-3 py-1 rounded-full">TRANSPARENT PRICING</span>
            <h2 className="text-4xl md:text-5xl font-black text-white m-0">Interactive Cost Calculator</h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">Configure your target platform and integrations to receive an instant timeline & ballpark budget estimate.</p>
          </div>

          <Calculator onApplyEstimate={handleApplyEstimate} />
        </div>
      </motion.section>

      {/* Projects Showcase */}
      <motion.section 
        id="projects" 
        className="py-24 px-6 border-t border-white/5 style-3d"
        {...section3D}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-purple-400 font-bold tracking-wider text-xs uppercase bg-purple-400/10 px-3 py-1 rounded-full">DEMOS & RELEASES</span>
            <h2 className="text-4xl md:text-5xl font-black text-white m-0">Selected Projects</h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">Click on any project to explore detailed specifications, code principles, and live interactive demos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <TiltCard key={idx}>
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div>
                    <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                      {project.logo && (
                        <img 
                          src={project.logo} 
                          alt={`${project.title} logo`}
                          className="w-20 h-20 object-contain opacity-20 group-hover:opacity-45 transition-all duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/10" />
                      <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/40 border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3 text-left">
                      <h3 className="text-2xl font-black text-white m-0 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-zinc-300 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-4 text-left">
                    {project.demoUrl && (
                      <span className="text-xs font-bold text-cyan-400 hover:underline">
                        Launch Demo ↗
                      </span>
                    )}
                    <span className="text-xs font-bold text-zinc-400 hover:text-white">
                      View Specs →
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        id="process" 
        className="py-24 px-6 border-t border-white/5 bg-black/10 style-3d"
        {...section3D}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-3">
            <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase bg-cyan-400/10 px-3 py-1 rounded-full">METHODOLOGY</span>
            <h2 className="text-4xl md:text-5xl font-black text-white m-0">How We Work</h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto">We follow a structured engineering workflow to deliver high-performance, polished, custom business software.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 relative">
            {[
              { num: "01", title: "Discovery", desc: "We translate your business goals and operational bottlenecks into a technical blueprint and spec sheet." },
              { num: "02", title: "UX Wireframing", desc: "Design interactive digital blueprints of the screen flows, validating layouts before coding." },
              { num: "03", title: "Custom Code", desc: "We write clean, documented custom React / Android codebase with modular components." },
              { num: "04", title: "Rigorous QA", desc: "Every flow is tested for bugs, security vulnerabilities, database performance, and styling errors." },
              { num: "05", title: "Deployment", desc: "Launch on production servers or App store, set up CI/CD, and provide monitoring." }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left relative flex flex-col justify-between gap-4">
                <span className="text-4xl font-black text-white/10 block leading-none">{step.num}</span>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white m-0">{step.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-24 px-6 border-t border-white/5 style-3d"
        {...section3D}
      >
        <div className="max-w-6xl mx-auto rounded-[3rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-2xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="space-y-8 text-left">
              <div>
                <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase bg-cyan-400/10 px-3 py-1 rounded-full">GET IN TOUCH</span>
                <h2 className="text-4xl md:text-5xl font-black leading-tight mt-4 text-white">Let’s Build Something Incredible.</h2>
              </div>
              
              <p className="text-zinc-300 text-lg leading-relaxed">
                Looking to automate workflows, build custom SaaS apps, or deploy custom Android platforms? Tell us your specifications, and we will architect the software from scratch.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="font-bold text-white text-lg">Why choose The Appsmiths?</h3>
                <ul className="space-y-3 text-zinc-400 text-sm list-none p-0 m-0">
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400 text-lg">✓</span> Fully custom code, tailormade to your specific business requirements
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400 text-lg">✓</span> Beautiful cinematic user interfaces built for high retention
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400 text-lg">✓</span> Dedicated support, clean architecture, and rapid deployment
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="mailto:nmp2667@gmail.com" className="text-sm font-semibold text-zinc-300 hover:text-cyan-400 transition flex items-center gap-2">
                  ✉️ nmp2667@gmail.com
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-black/40 border border-white/10 p-6 md:p-8 rounded-2xl text-left space-y-6">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center mx-auto text-3xl">
                    ✨
                  </div>
                  <h3 className="text-2xl font-black text-white">Consultation Request Prepared!</h3>
                  <p className="text-zinc-300 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you! We have compiled your requirements. If your email application did not open automatically, please click below to send us your request.
                  </p>
                  <a 
                    href={mailtoLink}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
                  >
                    Send Email Directly
                  </a>
                  <button 
                    onClick={() => { setFormSubmitted(false); setSubmitStatus('idle'); }}
                    className="block text-zinc-500 hover:text-white text-xs underline mx-auto pt-4"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">Request a Consultation</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all text-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">WhatsApp / Phone</label>
                      <input 
                        type="tel" 
                        name="whatsapp"
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Business Name</label>
                    <input 
                      type="text" 
                      name="businessName"
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">What software do you need?</label>
                    <textarea 
                      name="requirement"
                      required
                      value={requirementText}
                      onChange={(e) => setRequirementText(e.target.value)}
                      rows="4"
                      placeholder="Describe your requirements (e.g. custom Android app, rental dashboard, etc.)"
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all text-white text-sm resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitStatus === 'sending'}
                    className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending Request...
                      </span>
                    ) : (
                      "Request Free Consultation ↗"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-16 px-6 overflow-hidden bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-4 text-left">
              <h2 className="text-3xl font-black text-white m-0">The <span className="text-cyan-400">Appsmiths</span></h2>
              <p className="text-zinc-400 max-w-lg leading-relaxed text-sm">
                We craft futuristic digital experiences, premium native apps, AI-powered systems, and custom business platforms designed to scale.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Navigation</h3>
              <div className="flex flex-col gap-3 text-sm text-zinc-400">
                <a href="#services" className="hover:text-white transition">Services</a>
                <a href="#orbital-tech" className="hover:text-white transition">Stack</a>
                <a href="#projects" className="hover:text-white transition">Projects</a>
                <a href="#calculator" className="hover:text-white transition">Cost Estimator</a>
                <a href="#contact" className="hover:text-white transition">Contact</a>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Legal</h3>
              <div className="flex flex-col gap-3 text-sm text-zinc-400">
                <a href="privacy-policy.html" className="hover:text-white transition">Privacy Policy</a>
                <a href="terms-and-conditions.html" className="hover:text-white transition">Terms & Conditions</a>
                <a href="refund-policy.html" className="hover:text-white transition">Refund Policy</a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <p>© 2026 The Appsmiths. All rights reserved.</p>
            <div className="text-cyan-400 flex items-center gap-1.5">
              <span>Crafted for absolute scalability</span>
              <span>✨</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-obsidian border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-left"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition z-20 cursor-pointer"
              >
                ✕
              </button>

              <div className={`p-8 md:p-12 bg-gradient-to-br ${selectedProject.gradient} relative overflow-hidden flex items-end min-h-[220px]`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-end w-full">
                  {selectedProject.logo && (
                    <img 
                      src={selectedProject.logo} 
                      alt={`${selectedProject.title} logo`} 
                      className="w-20 h-20 rounded-2xl shadow-2xl object-cover bg-black/20 border border-white/10"
                    />
                  )}
                  <div className="flex-1">
                    <span className="text-white/80 font-bold mb-1.5 tracking-wider text-xs uppercase block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight m-0">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10 space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold text-white m-0">About the Project</h3>
                    <p className="text-zinc-300 leading-relaxed text-sm">
                      {selectedProject.description}
                    </p>
                    {selectedProject.highlights && (
                      <p className="text-cyan-400 text-xs font-semibold">
                        💡 Key Impact: {selectedProject.highlights}
                      </p>
                    )}

                    <div className="pt-4 flex flex-wrap gap-4">
                      {selectedProject.demoUrl && (
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs shadow-lg hover:scale-105 transition-transform"
                        >
                          Launch Live Demo ↗
                        </a>
                      )}
                      {selectedProject.playStoreUrl && (
                        <a
                          href={selectedProject.playStoreUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition"
                        >
                          View App Store ↗
                        </a>
                      )}
                      {selectedProject.privacyUrl && (
                        <a
                          href={selectedProject.privacyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-xs hover:text-white transition"
                        >
                          Privacy Policy
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white m-0">Key Features</h3>
                    <ul className="flex flex-col gap-2 p-0 m-0 list-none">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Built by Appsmiths Banner inside Modal */}
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
                  <h4 className="text-base font-bold text-cyan-400 m-0 flex items-center gap-2">
                    <Shield className="w-4.5 h-4.5" />
                    Built from scratch by The Appsmiths
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    This product represents our commitment to custom architecture, modular layout code, high-grade database performance, and polished cinematic visuals.
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <strong>Looking for custom software built for your business needs?</strong> We can build custom Android apps, customer dashboards, CRM software, and automated backend systems from the ground up.
                  </p>
                  <a 
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200 transition font-bold"
                  >
                    Discuss a custom build with us →
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
