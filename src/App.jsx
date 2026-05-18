/**
 * Mayankraj Mishra — Premium Developer Portfolio
 * Stack: React + Tailwind (CDN) + Framer Motion + React Icons
 *
 * Since this runs as a self-contained artifact, all components
 * live in this single file. For a real project, split each
 * component into its own file under src/components/.
 *
 * Profile image: place your photo at src/assets/mayank.jpg
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FiGithub, FiMail, FiPhone, FiMapPin, FiArrowUp,
  FiExternalLink, FiCode, FiSend, FiMenu, FiX,
  FiLinkedin, FiDownload
} from "react-icons/fi";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiMongodb, SiPython, SiBootstrap, SiGit, SiNodedotjs
} from "react-icons/si";
import { BsDatabaseFill, BsCpuFill, BsRobot } from "react-icons/bs";
import { TbPrompt } from "react-icons/tb";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Education", "Contact"];

const SKILLS = [
  { name: "HTML5",             icon: SiHtml5,        color: "#E34F26" },
  { name: "CSS3",              icon: SiCss3,         color: "#1572B6" },
  { name: "JavaScript",        icon: SiJavascript,   color: "#F7DF1E" },
  { name: "React",             icon: SiReact,        color: "#61DAFB" },
  { name: "Tailwind CSS",      icon: SiTailwindcss,  color: "#38B2AC" },
  { name: "Node.js",           icon: SiNodedotjs,    color: "#68A063" },
  { name: "MongoDB",           icon: SiMongodb,      color: "#47A248" },
  { name: "Python",            icon: SiPython,       color: "#3776AB" },
  { name: "Bootstrap",         icon: SiBootstrap,    color: "#7952B3" },
  { name: "SQL",               icon: BsDatabaseFill, color: "#F29111" },
  { name: "Git",               icon: SiGit,          color: "#F05032" },
  { name: "IoT",               icon: BsCpuFill,      color: "#00D4FF" },
  { name: "AI / ML Basics",    icon: BsRobot,        color: "#A855F7" },
  { name: "Prompt Engineering",icon: TbPrompt,       color: "#EC4899" },
];

const PROJECTS = [
  {
    title: "Fitness Freak",
    year: "2025",
    org: "Medicaps University",
    description:
      "An online platform that automates gym membership registration, session booking, and payment management. Features real-time scheduling, class availability tracking, and digital subscription renewal with secure payment integration.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-purple-500/20",
    accent: "#06B6D4",
    github: "https://github.com/mayankrajmishra",
  },
  {
    title: "Traffic Management System",
    year: "2024",
    org: "Makhanlal Chaturvedi University",
    description:
      "An IoT-based system that monitors and manages real-time traffic flow using connected sensors and devices. Features a centralized platform for traffic data collection, visualization, and automated congestion management.",
    tech: ["IoT", "Python", "MongoDB", "Web Technologies"],
    gradient: "from-purple-500/20 via-pink-500/10 to-orange-500/20",
    accent: "#A855F7",
    github: "https://github.com/mayankrajmishra",
  },
];

const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Medicaps University",
    year: "2024 – 2026",
    status: "Ongoing",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Makhanlal Chaturvedi University, Bhopal",
    year: "2021 – 2024",
    status: "Completed",
    icon: "📘",
  },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useActiveSection() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(n => document.getElementById(n));
      const scrollY = window.scrollY + 120;
      sections.forEach(s => {
        if (s && s.offsetTop <= scrollY && s.offsetTop + s.offsetHeight > scrollY) {
          setActive(s.id);
        }
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

// ─── REUSABLE: Section wrapper ────────────────────────────────────────────────

function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id={id} ref={ref} className={`py-24 px-4 sm:px-8 ${className}`}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── REUSABLE: Section heading ────────────────────────────────────────────────

function SectionHeading({ title, subtitle }) {
  return (
    <motion.div variants={fadeUp} className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-slate-400 text-lg max-w-xl mx-auto">{subtitle}</p>
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
    </motion.div>
  );
}

// ─── COMPONENT: Animated blobs background ────────────────────────────────────

function Blobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary cyan blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #06B6D4, transparent 70%)",
          top: "-10%",
          left: "-10%",
          animation: "blob1 18s ease-in-out infinite alternate",
        }}
      />
      {/* Blue blob */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #3B82F6, transparent 70%)",
          top: "40%",
          right: "-8%",
          animation: "blob2 22s ease-in-out infinite alternate",
        }}
      />
      {/* Purple blob */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #A855F7, transparent 70%)",
          bottom: "5%",
          left: "30%",
          animation: "blob3 26s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes blob1 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(60px,40px) scale(1.15); }
        }
        @keyframes blob2 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-50px,60px) scale(1.1); }
        }
        @keyframes blob3 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(40px,-50px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// ─── COMPONENT: Floating particles ───────────────────────────────────────────

function Particles() {
  const dots = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    dur: Math.random() * 14 + 8,
    delay: Math.random() * -10,
  }));
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {dots.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full bg-cyan-400/30"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            animation: `floatDot ${d.dur}s ${d.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatDot {
          0%   { transform: translateY(0px); opacity: 0.3; }
          100% { transform: translateY(-24px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// ─── COMPONENT: Custom scrollbar styles ──────────────────────────────────────

function GlobalStyles() {
  return (
    <style>{`
      * { scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #0f172a; }
      ::-webkit-scrollbar-thumb { background: #06B6D4; border-radius: 9999px; }
      ::-webkit-scrollbar-thumb:hover { background: #3B82F6; }
      html { scroll-behavior: smooth; }

      .glass {
        background: rgba(15,23,42,0.55);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border: 1px solid rgba(6,182,212,0.12);
      }
      .glow-cyan { box-shadow: 0 0 30px rgba(6,182,212,0.25), 0 0 60px rgba(6,182,212,0.1); }
      .glow-btn  { box-shadow: 0 0 20px rgba(6,182,212,0.35); }
      .glow-btn:hover { box-shadow: 0 0 35px rgba(6,182,212,0.55); }
      .text-glow { text-shadow: 0 0 40px rgba(6,182,212,0.6); }

      .skill-card:hover .skill-icon { transform: scale(1.2) rotate(-5deg); }
      .skill-icon { transition: transform 0.3s ease; }

      .typing-cursor::after {
        content: '|';
        animation: blink 1s step-end infinite;
        color: #06B6D4;
      }
      @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    `}</style>
  );
}

// ─── COMPONENT: Loading screen ───────────────────────────────────────────────

function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glowing ring */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-blue-500 border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-3 rounded-full bg-slate-950 flex items-center justify-center">
          <FiCode className="text-cyan-400 text-xl" />
        </div>
      </div>
      <motion.p
        className="text-cyan-400 text-sm tracking-[0.3em] uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        Loading Portfolio…
      </motion.p>
    </motion.div>
  );
}

// ─── COMPONENT: Navbar ────────────────────────────────────────────────────────

function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-cyan-500/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scroll("Home")} className="text-xl font-bold">
          <span className="text-white">Mayank</span>
          <span className="text-cyan-400">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button
                onClick={() => scroll(link)}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  active === link ? "text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {link}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${
                  active === link ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:mayankrajmishra0@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 glow-btn"
        >
          <FiMail size={14} /> Hire Me
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass border-t border-cyan-500/10"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <li key={link}>
                  <button
                    onClick={() => scroll(link)}
                    className={`text-sm font-medium w-full text-left ${
                      active === link ? "text-cyan-400" : "text-slate-300"
                    }`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── COMPONENT: Typing animation ──────────────────────────────────────────────

function TypingText({ phrases }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = phrases[idx];
    let timeout;
    if (!deleting) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
      } else {
        setDeleting(false);
        setIdx(i => (i + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, phrases]);

  return (
    <span className="text-cyan-400 font-semibold typing-cursor">{displayed}</span>
  );
}

// ─── SECTION: Hero ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="Home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/5 mb-6"
          >
            👋 Welcome to my Portfolio
          </motion.span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
            <span className="text-white">Mayankraj</span>
            <br />
            <span
              className="text-glow"
              style={{
                background: "linear-gradient(90deg,#06B6D4,#3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mishra
            </span>
          </h1>

          <div className="text-xl sm:text-2xl text-slate-300 mb-5 font-light min-h-[2rem]">
            <TypingText phrases={[
              "Frontend Developer",
              "MCA Student",
              "AI Enthusiast",
              "React Developer",
              "UI/UX Craftsman",
            ]} />
          </div>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
            Building modern responsive web applications and intelligent digital experiences.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-full font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 glow-btn"
            >
              View Projects
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:mayankrajmishra0@gmail.com"
              className="px-7 py-3 rounded-full font-semibold text-cyan-400 border border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-200"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex gap-8 mt-12 justify-center lg:justify-start"
          >
            {[["2+", "Projects Built"], ["14+", "Skills Mastered"], ["3+", "Years Learning"]].map(([num, label]) => (
              <div key={label} className="text-center lg:text-left">
                <p className="text-2xl font-bold text-cyan-400">{num}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-shrink-0 relative"
        >
          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-400/20"
          />
          {/* Glow halo */}
          <div className="absolute -inset-6 rounded-full bg-cyan-400/10 blur-2xl" />
          <div className="absolute -inset-3 rounded-full bg-blue-500/10 blur-xl" />

          {/* Photo */}
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full glow-cyan overflow-hidden border-2 border-cyan-400/40">
            <img
              src="/src/assets/mayank.jpg"
              alt="Mayankraj Mishra"
              className="w-full h-full object-cover"
              onError={e => {
                // Graceful fallback: initials avatar
                e.target.style.display = "none";
                e.target.parentElement.classList.add("flex","items-center","justify-center","bg-slate-800");
                const span = document.createElement("span");
                span.textContent = "MM";
                span.className = "text-4xl font-bold text-cyan-400";
                e.target.parentElement.appendChild(span);
              }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 glow-cyan"
          >
            <p className="text-xs text-slate-400">Open to</p>
            <p className="text-sm font-semibold text-cyan-400">Opportunities</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── SECTION: About ───────────────────────────────────────────────────────────

function About() {
  return (
    <Section id="About" className="bg-slate-950/40">
      <SectionHeading title="About Me" subtitle="A glimpse into who I am and what drives me." />

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Card */}
        <motion.div variants={fadeUp} className="glass rounded-3xl p-8 glow-cyan">
          <h3 className="text-2xl font-bold text-white mb-4">
            Hi, I'm <span className="text-cyan-400">Mayankraj Mishra</span> 👋
          </h3>
          <p className="text-slate-300 leading-relaxed mb-5">
            I am an MCA student passionate about frontend development, AI-powered applications,
            and modern UI/UX design. I enjoy building responsive and visually appealing web
            applications using modern technologies.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            I continuously improve my problem-solving and development skills, combining clean
            code with beautiful interfaces to create meaningful digital experiences.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              ["📍", "Gwalior, India"],
              ["📧", "mayankrajmishra0@gmail.com"],
              ["📞", "9589422828"],
            ].map(([icon, text]) => (
              <span
                key={text}
                className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50"
              >
                {icon} {text}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-5">
          {[
            { emoji: "⚡", title: "Fast Learner", desc: "Quickly picks up new tools and frameworks." },
            { emoji: "🎨", title: "UI Focused", desc: "Obsessed with pixel-perfect, beautiful interfaces." },
            { emoji: "🤖", title: "AI Curious", desc: "Exploring the intersection of AI and the web." },
            { emoji: "🔧", title: "Problem Solver", desc: "Loves breaking down complex challenges." },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              custom={i * 0.5}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-5 cursor-default"
            >
              <div className="text-3xl mb-3">{card.emoji}</div>
              <h4 className="text-white font-semibold mb-1">{card.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// ─── SECTION: Skills ──────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="Skills">
      <SectionHeading title="Skills & Tech" subtitle="Technologies I work with daily." />
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
      >
        {SKILLS.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              custom={i * 0.05}
              whileHover={{ y: -8, scale: 1.05 }}
              className="skill-card glass rounded-2xl p-4 flex flex-col items-center gap-3 cursor-default group"
              style={{ borderColor: `${skill.color}22` }}
            >
              <div
                className="skill-icon w-10 h-10 flex items-center justify-center rounded-xl"
                style={{ background: `${skill.color}18` }}
              >
                <Icon style={{ color: skill.color, fontSize: "1.4rem" }} />
              </div>
              <span className="text-slate-300 text-xs font-medium text-center leading-tight">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

// ─── SECTION: Projects ────────────────────────────────────────────────────────

function Projects() {
  return (
    <Section id="Projects" className="bg-slate-950/40">
      <SectionHeading title="Projects" subtitle="Things I have built with passion and purpose." />

      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl overflow-hidden group"
          >
            {/* Mockup placeholder */}
            <div
              className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
            >
              {/* Browser chrome mockup */}
              <div className="w-4/5 h-36 bg-slate-900/80 rounded-xl shadow-2xl overflow-hidden border border-white/10">
                {/* Address bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  <div className="flex-1 ml-2 bg-slate-700/60 rounded-md h-4 flex items-center px-2">
                    <span className="text-slate-500 text-[9px]">localhost:3000</span>
                  </div>
                </div>
                {/* Body */}
                <div className="p-3 space-y-1.5">
                  <div className="h-3 rounded bg-slate-700/60 w-3/4" />
                  <div className="h-2 rounded bg-slate-700/40 w-full" />
                  <div className="h-2 rounded bg-slate-700/40 w-5/6" />
                  <div className="h-2 rounded bg-slate-700/30 w-4/6" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-6 w-16 rounded bg-cyan-500/30" />
                    <div className="h-6 w-16 rounded bg-blue-500/20" />
                  </div>
                </div>
              </div>
              {/* Glow dot */}
              <div
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: project.accent }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className="text-xs text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/40">
                  {project.year}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{project.org}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: `${project.accent}18`,
                      color: project.accent,
                      border: `1px solid ${project.accent}30`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-200"
                >
                  <FiGithub size={15} /> GitHub
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-900 transition-all duration-200"
                  style={{ background: `linear-gradient(90deg, ${project.accent}, #3B82F6)` }}
                >
                  <FiExternalLink size={15} /> Live Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── SECTION: Education ───────────────────────────────────────────────────────

function Education() {
  return (
    <Section id="Education">
      <SectionHeading title="Education" subtitle="My academic journey and institutions." />

      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-transparent" />

        <div className="space-y-10">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.degree}
              variants={fadeUp}
              custom={i}
              className="relative flex gap-8 pl-16"
            >
              {/* Dot */}
              <div className="absolute left-0 top-5 w-12 h-12 rounded-full glass border border-cyan-400/30 flex items-center justify-center text-2xl glow-cyan">
                {edu.icon}
              </div>

              {/* Card */}
              <div className="flex-1 glass rounded-2xl p-6 group hover:border-cyan-400/30 transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold text-white leading-snug">{edu.degree}</h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
                      edu.status === "Ongoing"
                        ? "bg-cyan-400/15 text-cyan-400 border border-cyan-400/30"
                        : "bg-green-400/15 text-green-400 border border-green-400/30"
                    }`}
                  >
                    {edu.status}
                  </span>
                </div>
                <p className="text-cyan-400/80 text-sm font-medium mb-1">{edu.institution}</p>
                <p className="text-slate-500 text-sm">{edu.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── SECTION: Contact ─────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const mailto = `mailto:mayankrajmishra0@gmail.com?subject=Portfolio Contact from ${name}&body=${message}%0A%0AFrom: ${email}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Section id="Contact" className="bg-slate-950/40">
      <SectionHeading title="Get In Touch" subtitle="Have a project in mind? Let's build something great together." />

      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">

        {/* Info */}
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">
            I'm currently open to freelance projects, internships, and exciting collaborations.
            Feel free to reach out — I'd love to connect!
          </p>

          <div className="space-y-4">
            {[
              { Icon: FiMail,   label: "Email",    value: "mayankrajmishra0@gmail.com", href: "mailto:mayankrajmishra0@gmail.com" },
              { Icon: FiPhone,  label: "Phone",    value: "+91 9589422828",              href: "tel:+919589422828" },
              { Icon: FiMapPin, label: "Location", value: "Gwalior, India",              href: "#" },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 glass rounded-2xl px-5 py-4 group hover:border-cyan-400/30 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                  <Icon className="text-cyan-400" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{label}</p>
                  <p className="text-slate-200 text-sm font-medium">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              href="https://github.com/mayankrajmishra"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full glass border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-200"
            >
              <FiGithub size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              href="mailto:mayankrajmishra0@gmail.com"
              className="w-11 h-11 rounded-full glass border border-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-200"
            >
              <FiMail size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div variants={fadeUp} custom={1}>
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5">
            {[
              { id: "name",    label: "Your Name",    type: "text",  placeholder: "Mayankraj Mishra" },
              { id: "email",   label: "Your Email",   type: "email", placeholder: "you@example.com" },
            ].map(field => (
              <div key={field.id}>
                <label className="block text-sm text-slate-400 mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                  required
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200 resize-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 glow-btn"
            >
              {sent ? "✅ Message Sent!" : <><FiSend size={16} /> Send Message</>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── COMPONENT: Footer ────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-8 px-6 text-center">
      <p className="text-slate-500 text-sm">
        Designed & built by{" "}
        <span className="text-cyan-400 font-medium">Mayankraj Mishra</span>
        {" "}· {new Date().getFullYear()}
      </p>
      <p className="text-slate-700 text-xs mt-1">
        React · Tailwind CSS · Framer Motion
      </p>
    </footer>
  );
}

// ─── COMPONENT: Back to top ───────────────────────────────────────────────────

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 shadow-lg glow-btn"
          aria-label="Back to top"
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-400/30 selection:text-cyan-200">
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onDone={() => setLoading(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Blobs />
            <Particles />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Contact />
            </main>
            <Footer />
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
