import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mailtoLink, setMailtoLink] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success, error

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

    // Retrieve Web3Forms key from environment variables (or fall back to mailto if empty)
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

  const services = [
    {
      title: "Android Apps",
      desc: "Modern Android applications with premium UI and scalable architecture.",
      icon: "📱",
    },
    {
      title: "AI Products",
      desc: "AI tools, automation systems, smart workflows, and intelligent products.",
      icon: "🤖",
    },
    {
      title: "Business Platforms",
      desc: "Custom dashboards, management systems, and business automation.",
      icon: "📊",
    },
    {
      title: "UI / UX Design",
      desc: "Beautiful cinematic interfaces inspired by modern startup products.",
      icon: "✨",
    },
  ];

  const projects = [
    {
      title: "RentFlow",
      category: "Property Management",
      gradient: "from-cyan-500 to-blue-700",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.yourcompany.rentflow",
      privacyUrl: "privacy-policy.html",
      logo: "rentflow_logo.png",
      demoUrl: "/rentflow/",
      description: "A premium, cloud-based property management platform designed for modern landlords and property managers. RentFlow streamlines rent collection, lease agreements, tenant onboarding, maintenance requests, and financial reporting with a cinematic, highly interactive dashboard.",
      features: [
        "Interactive Dashboard",
        "Rent Collection & Tracking",
        "Property Portfolio Management",
        "Tenant Portal & Communication",
        "Maintenance Ticket Tracking",
        "Lease & Contract Management",
        "Financial Reports & Analytics",
        "Settings & Notifications"
      ],
    },
    {
      title: "SafePass",
      category: "Security Platform",
      gradient: "from-purple-500 to-pink-700",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.appsmiths.safepass",
      privacyUrl: "safepass-privacy.html",
      logo: "safepass/logo.png",
      description: "A fully offline, zero-knowledge password manager featuring AES-256 encryption, Biometric authentication, and seamless encrypted backups. Built with a cinematic, modern dark UI inspired by leading security platforms. SafePass operates entirely locally with no internet permission required, no sign-ups, and auto-clearing clipboard features ensuring your data never leaves your device.",
      features: [
        "Secure Master Lock", 
        "AES-256 Encryption", 
        "100% Offline Vault", 
        "Encrypted Backups", 
        "Biometric Unlock",
        "Password Generator",
        "Auto-Clear Clipboard",
        "No Account Required"
      ],
      screenshots: [
        "safepass/phone/1.jpg",
        "safepass/phone/2.jpg",
        "safepass/phone/3.jpg",
        "safepass/phone/4.jpg",
        "safepass/phone/5.jpg",
        "safepass/phone/6.jpg",
        "safepass/phone/7.jpg",
        "safepass/phone/8.jpg"
      ]
    },
    {
      title: "Local Business OS",
      category: "Business Automation",
      gradient: "from-orange-500 to-red-700",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.yourcompany.businessos",
      privacyUrl: "privacy-policy.html",
    },
  ];

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/30 blur-[120px] rounded-full"
        />

        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-purple-500/30 blur-[120px] rounded-full"
        />

        {/* Rotating Ring */}
        <motion.div
          initial={{ x: "-50%", y: "-50%", rotate: 0 }}
          animate={{ x: "-50%", y: "-50%", rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 w-[900px] h-[900px] rounded-full border border-cyan-500/10 border-t-cyan-500/50 border-r-cyan-500/30"
        />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Stars */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      {/* Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 z-30">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full left-[30%] top-[20%] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen text-white overflow-hidden relative"
      >
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight">
            The <span className="text-cyan-400">Appsmiths</span>
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <a href="#services" className="hover:text-white transition">
              Services
            </a>

            <a href="#projects" className="hover:text-white transition">
              Projects
            </a>

            <a href="#about" className="hover:text-white transition">
              About
            </a>

            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </div>

          <motion.a
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            whileHover={{
              scale: 1.08,
              y: -6,
            }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-5 py-2 rounded-full bg-white text-black font-semibold"
          >
            Hire Us
          </motion.a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Building next-generation digital products
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-8"
            >
              We Build
              <br />

              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Beautiful Apps
              </span>

              <br />
              That Feel Alive.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 1,
              }}
              className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
            >
              Premium Android apps, AI products, automation systems,
              futuristic websites, and cinematic digital experiences.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-2xl shadow-cyan-500/30"
              >
                Start Your Project
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#projects"
                className="px-7 py-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition"
              >
                View Projects
              </motion.a>
            </div>
          </div>

          {/* Hero Card */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            whileHover={{
              rotateX: 10,
              rotateY: -10,
              scale: 1.03,
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-[3rem]" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              <div className="p-8 space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 p-8">
                  <div className="text-black text-sm font-semibold mb-2">
                    Featured Experience
                  </div>

                  <h2 className="text-4xl font-black text-black leading-tight">
                    Future-Ready
                    <br />
                    App Development
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-black/40 border border-white/10 p-5">
                    <div className="text-3xl mb-3">⚡</div>

                    <div className="font-bold mb-1">
                      Fast Delivery
                    </div>

                    <div className="text-sm text-zinc-400">
                      Rapid workflows & premium quality.
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/40 border border-white/10 p-5">
                    <div className="text-3xl mb-3">🎨</div>

                    <div className="font-bold mb-1">
                      Premium Design
                    </div>

                    <div className="text-sm text-zinc-400">
                      Cinematic modern interfaces.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Development CTA Callout Banner */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[2.5rem] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 animate-fade-in">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[80px] rounded-full -z-10" />
            <div className="space-y-3 max-w-3xl text-left">
              <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase bg-cyan-400/10 px-3 py-1 rounded-full">Custom Development</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mt-2">
                Need a custom Android or Web App for your business?
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                The Appsmiths builds tailor-made mobile apps, interactive dashboards, automation systems, and SaaS platforms that grow your revenue.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-lg shadow-cyan-500/20 text-center text-sm"
              >
                Book a Free Consultation
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors text-center text-sm"
              >
                Request a Custom Quote
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <div className="text-cyan-400 font-semibold mb-4">
              SERVICES
            </div>

            <h2 className="text-4xl md:text-6xl font-black">
              What We Build
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                }}
                className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-400/40 transition duration-500 shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="text-5xl mb-6">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {service.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <div className="text-cyan-400 font-semibold mb-4">
              FEATURED WORK
            </div>

            <h2 className="text-4xl md:text-6xl font-black">
              Selected Projects
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{
                  y: -20,
                  rotateX: 8,
                  rotateY: 8,
                  scale: 1.02,
                }}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400/30 transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedProject(project)}
              >
                <div
                  className={`h-80 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}
                >
                  {project.logo && (
                    <img 
                      src={project.logo} 
                      alt={`${project.title} logo`}
                      className="w-28 h-28 object-contain opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/10" />

                  <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-sm">
                    {project.category}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-4xl font-black mb-3">
                      {project.title}
                    </h3>

                    <p className="text-white/80 leading-relaxed mb-4">
                      Premium scalable product designed with futuristic UI
                      and cinematic interactions.
                    </p>

                    <div className="flex gap-4">
                      {project.playStoreUrl && (
                        <a 
                          href={project.playStoreUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                          className="text-sm font-semibold text-white hover:text-cyan-400 transition flex items-center gap-1"
                        >
                          View App ↗
                        </a>
                      )}
                      
                      {project.privacyUrl && (
                        <a 
                          href={project.privacyUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                          className="text-sm font-semibold text-zinc-400 hover:text-cyan-400 transition flex items-center gap-1"
                        >
                          Privacy Policy
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-24 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-cyan-400 font-semibold mb-4">
            WHY THE APPSMITHS
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Not Just Developers.
            <br />
            Digital Craftsmen.
          </h2>

          <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl mx-auto">
            We create cinematic digital experiences with modern visuals,
            intelligent systems, smooth interactions, and futuristic product
            design.
          </p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto rounded-[3rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-2xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Pitch & Trust Signals */}
            <div className="space-y-8 text-left">
              <div>
                <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase bg-cyan-400/10 px-3 py-1 rounded-full">Get In Touch</span>
                <h2 className="text-4xl md:text-5xl font-black leading-tight mt-4 text-white">
                  Let’s Build Something Incredible.
                </h2>
              </div>
              
              <p className="text-zinc-300 text-lg leading-relaxed">
                Have a project in mind? Looking to automate your business operations, launch an Android application, or build a bespoke SaaS product? We translate your business needs into high-performance custom software.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="font-bold text-white text-lg">Why choose The Appsmiths?</h3>
                <ul className="space-y-3 text-zinc-400 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400 text-lg">✓</span> Fully custom code, tailormade to your specific business requirements
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400 text-lg">✓</span> Beautiful cinematic user interfaces built for high retention
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400 text-lg">✓</span> Scalable Android apps, responsive web apps, and automated workflows
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
                  <h3 className="text-2xl font-black text-white">Quote Request Prepared!</h3>
                  <p className="text-zinc-300 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you! We have compiled your requirements. If your email application didn't open automatically, please click below to send us your request.
                  </p>
                  <a 
                    href={mailtoLink}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
                  >
                    Send Email Directly
                  </a>
                  <button 
                    onClick={() => setFormSubmitted(false)}
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
                      rows="4"
                      placeholder="Describe your requirements (e.g. custom Android app for logistics, rental booking website, etc.)"
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
                        <span className="w-4.5 h-4.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
      </section>
            {/* Footer */}
      <footer className="relative border-t border-white/10 py-16 px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <motion.h2
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-black mb-4"
              >
                The <span className="text-cyan-400">Appsmiths</span>
              </motion.h2>

              <p className="text-zinc-400 max-w-lg leading-relaxed mb-6">
                We craft futuristic digital experiences, premium apps,
                AI-powered systems, and modern business platforms that
                feel alive.
              </p>

              <div className="flex gap-4">
                <motion.a
                  whileHover={{ y: -5 }}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400/40 transition"
                >
                  ✉️
                </motion.a>

                <motion.a
                  whileHover={{ y: -5 }}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400/40 transition"
                >
                  💼
                </motion.a>

                <motion.a
                  whileHover={{ y: -5 }}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400/40 transition"
                >
                  📸
                </motion.a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg font-bold mb-5">
                Navigation
              </h3>

              <div className="flex flex-col gap-3 text-zinc-400">
                <a href="#services" className="hover:text-white transition">
                  Services
                </a>

                <a href="#projects" className="hover:text-white transition">
                  Projects
                </a>

                <a href="#about" className="hover:text-white transition">
                  About
                </a>

                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-5">
                Legal
              </h3>

              <div className="flex flex-col gap-3 text-zinc-400">
  <a
    href="privacy-policy.html"
    className="hover:text-white transition"
  >
    Privacy Policy
  </a>

  <a
    href="terms-and-conditions.html"
    className="hover:text-white transition"
  >
    Terms & Conditions
  </a>

  <a
    href="refund-policy.html"
    className="hover:text-white transition"
  >
    Refund Policy
  </a>

  <a
    href="mailto:nmp2667@gmail.com"
    className="hover:text-cyan-400 transition mt-4"
  >
    Contact Us →
    <br />
    nmp2667@gmail.com
  </a>
</div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">
              © 2026 The Appsmiths. All rights reserved.
            </p>

            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="text-sm text-cyan-400"
            >
              Crafted with futuristic design ✨
            </motion.div>
          </div>
        </div>
      </footer>
    </motion.div>

    {/* Project Details Modal */}
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0B0F1A] border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition z-20"
            >
              ✕
            </button>

            {/* Header Section */}
            <div className={`p-8 md:p-12 bg-gradient-to-br ${selectedProject.gradient} relative overflow-hidden flex items-end min-h-[250px]`}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-end w-full">
                {selectedProject.logo && (
                  <img 
                    src={selectedProject.logo} 
                    alt={`${selectedProject.title} logo`} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-2xl object-cover bg-black/20 border border-white/10"
                  />
                )}
                <div className="flex-1">
                  <div className="text-white/80 font-semibold mb-2 tracking-wider text-sm uppercase">
                    {selectedProject.category}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 space-y-10">
              {/* Description & Features */}
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-2xl font-bold text-white">About the Project</h3>
                  <p className="text-zinc-300 leading-relaxed text-lg">
                    {selectedProject.description || "Premium scalable product designed with futuristic UI and cinematic interactions."}
                  </p>

                  {selectedProject.title === "RentFlow" && (
                    <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3 text-left">
                      <h4 className="text-lg font-bold text-cyan-400">Built by The Appsmiths</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        RentFlow is a modern property management platform designed to simplify tenant management, rent tracking, and maintenance requests.
                      </p>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        <strong>Looking for software tailored to your business?</strong> The Appsmiths builds custom Android apps, web applications, business management systems, and automation tools for businesses of all sizes.
                      </p>
                      <a 
                        href="#contact" 
                        onClick={() => setSelectedProject(null)} 
                        className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:text-cyan-400 transition font-semibold"
                      >
                        Request a custom version for your business →
                      </a>
                    </div>
                  )}

                  <div className="pt-4 flex flex-wrap gap-4">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
                      >
                        View Live Demo ↗
                      </a>
                    )}
                    {selectedProject.playStoreUrl && (
                      <a
                        href={selectedProject.playStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 ${
                          selectedProject.demoUrl
                            ? "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                            : "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/20"
                        }`}
                      >
                        View on Play Store ↗
                      </a>
                    )}
                    {selectedProject.privacyUrl && (
                      <a
                        href={selectedProject.privacyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                      >
                        Privacy Policy
                      </a>
                    )}
                  </div>
                </div>

                {selectedProject.features && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Key Features</h3>
                    <ul className="flex flex-wrap gap-2">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Screenshots */}
              {selectedProject.screenshots && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Screenshots</h3>
                  <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {selectedProject.screenshots.map((src, i) => (
                      <img 
                        key={i} 
                        src={src} 
                        alt={`Screenshot ${i + 1}`} 
                        className="h-[400px] w-auto rounded-[2rem] border border-white/10 snap-center shadow-xl object-contain bg-black/20"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
