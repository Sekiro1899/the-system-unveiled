import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import headphonesIcon from "@/assets/headphones-icon.png";
import heroBg from "@/assets/hero-bg.jpg";
import microphoneBg from "@/assets/microphone-bg.png";
import AudioPlayer from "@/components/AudioPlayer";

const SocialIcon = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <motion.a
    href="#"
    aria-label={label}
    className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
    whileHover={{ scale: 1.15, y: -4 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-muted-foreground transition-colors group-hover:text-foreground">{children}</span>
  </motion.a>
);

const SpotifyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Floating words data
const floatingWords = [
  "Post Truth Era",
  "Mass Unemployment",
  "Job Replacement",
  "AI Adoption",
  "Enterprise Grade AI",
  "Enhanced Productivity",
  "Governance & Ethics",
  "Tech Geopolitics",
  "The End of Expertise",
  "Death of Privacy",
  "Digital Dystopia",
  "Epistemic Crisis",
  "Energy & Compute Wars",
  "Transhumanism",
  "AI & Religion",
  "Post-Work Society",
  "Degrowth vs Techno-optimism",
  "Techno-feudalism",
  "Digital Divide",
  "Open Source vs Closed AI",
  "Attention Economy",
  "Cognitive Warfare",
  "Surveillance Capitalism",
  "Late Stage Capitalism",
  "Tech Regulation",
  "Technology Updates",
  "Technocracy",
  "Digital Sovereignty",
];

const FloatingWord = ({ word, index }: { word: string; index: number }) => {
  const [dimensions, setDimensions] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  // Distribute words across the viewport
  const startX = index % 2 === 0 ? -300 : dimensions.w + 100;
  const yPos = 80 + ((index * 137) % 700);
  const duration = 18 + (index % 5) * 4;
  const delay = index * 1.2;

  return (
    <motion.span
      className="pointer-events-none absolute whitespace-nowrap font-display text-lg font-semibold tracking-wide text-primary/[0.18] sm:text-2xl md:text-3xl"
      style={{ top: yPos }}
      initial={{ x: startX, opacity: 0 }}
      animate={{
        x: index % 2 === 0 ? [startX, dimensions.w + 200] : [startX, -400],
        opacity: [0, 0.7, 0.7, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {word}
    </motion.span>
  );
};

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Concrete / béton ciré texture overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(30_3%_10%/0.7)_100%)]" />
      </div>

      {/* Microphone background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={microphoneBg} alt="" className="h-[85%] w-auto object-contain opacity-[0.15]" />
      </div>

      {/* Floating words */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingWords.map((word, i) => (
          <FloatingWord key={word} word={word} index={i} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Tagline chip */}

        {/* Tagline chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-secondary px-5 py-2 font-body text-sm tracking-widest uppercase text-primary">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
            Bientôt disponible
          </span>
        </motion.div>

        {/* Title — Ikig slides from left, AI drops from top */}
        <div className="overflow-hidden">
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-primary sm:text-7xl md:text-8xl">
            <motion.span
              className="inline-flex items-baseline"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.7 }}
            >
              <span className="relative inline-flex items-center">
                <img src={headphonesIcon} alt="" className="absolute -top-8 left-1/2 -translate-x-1/2 h-12 w-12 sm:-top-12 sm:h-16 sm:w-16 md:-top-14 md:h-20 md:w-20 [filter:invert(30%)_sepia(80%)_saturate(500%)_hue-rotate(240deg)_brightness(90%)]" />
                I
              </span>
              kig
            </motion.span>
            <motion.span
              className="inline-block text-[hsl(var(--glow-violet))]"
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                delay: 1.0,
              }}
            >
              AI
            </motion.span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-6 max-w-lg font-body text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Tech. Société. L'avenir du système.
          <br />
          <span className="text-foreground font-semibold">Des conversations qui questionnent tout.</span>
        </motion.p>

        {/* Email signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Entrez votre email pour un accès anticipé"
            className="flex-1 rounded-full border border-border bg-secondary px-5 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
          <button className="rounded-full bg-primary px-6 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95">
            Me notifier
          </button>
        </motion.div>

        {/* Social platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-16"
        >
          <p className="mb-5 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Disponible sur
          </p>
          <div className="flex items-center gap-5">
            <SocialIcon label="Spotify"><SpotifyIcon /></SocialIcon>
            <SocialIcon label="X (Twitter)"><XIcon /></SocialIcon>
            <SocialIcon label="Instagram"><InstagramIcon /></SocialIcon>
            <SocialIcon label="YouTube"><YoutubeIcon /></SocialIcon>
          </div>
        </motion.div>

        {/* Topic hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.4 }}
          className="mt-20 flex flex-wrap justify-center gap-3"
        >
          {["IA & Éthique", "Souveraineté Numérique", "Ère Post-Vérité", "Décentralisation", "Capitalisme de Surveillance"].map((topic, i) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.6 + i * 0.15 }}
              className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 font-body text-xs text-muted-foreground"
            >
              {topic}
            </motion.span>
          ))}
        </motion.div>
      </div>
      {/* Audio Player */}
      <AudioPlayer />
    </div>
  );
};

export default Index;
