import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const TRACK = {
  title: "The System Unveiled",
  artist: "IkigAI",
};

const BAR_COUNT = 5;
const WAVE_BARS = 40;

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const Equalizer = ({ playing }: { playing: boolean }) => (
  <div className="flex items-end gap-[3px] h-6">
    {Array.from({ length: BAR_COUNT }).map((_, i) => (
      <motion.span
        key={i}
        className="w-[3px] rounded-full bg-gradient-to-t from-[hsl(var(--glow-violet))] to-[hsl(var(--glow-cyan))]"
        animate={
          playing
            ? {
                height: ["6px", `${14 + Math.random() * 10}px`, "8px", `${12 + Math.random() * 12}px`, "6px"],
              }
            : { height: "6px" }
        }
        transition={
          playing
            ? {
                duration: 0.8 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.3 }
        }
      />
    ))}
  </div>
);

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [duration] = useState(217); // placeholder 3:37
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Simulate playback progress
  useEffect(() => {
    if (playing) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            setPlaying(false);
            return 0;
          }
          return prev + 0.25;
        });
      }, 250);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [playing, duration]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setProgress(ratio * duration);
    },
    [duration]
  );

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.8 }}
      className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t border-border bg-card/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center gap-4 px-4 sm:gap-6 sm:px-6">
        {/* Track info + equalizer */}
        <div className="flex items-center gap-3 min-w-0 w-44 shrink-0">
          <Equalizer playing={playing} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{TRACK.title}</p>
            <p className="truncate text-xs text-muted-foreground">{TRACK.artist}</p>
          </div>
        </div>

        {/* Center controls */}
        <div className="flex flex-1 flex-col items-center gap-1.5">
          {/* Play button */}
          <button
            onClick={() => setPlaying((p) => !p)}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--glow-violet))] to-[hsl(var(--glow-cyan))] text-background shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.span key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                  <Pause size={18} fill="currentColor" />
                </motion.span>
              ) : (
                <motion.span key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Progress bar */}
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="w-10 text-right text-[11px] tabular-nums text-muted-foreground">{formatTime(progress)}</span>
            <div
              ref={progressBarRef}
              onClick={handleProgressClick}
              className="group relative flex-1 cursor-pointer py-1"
            >
              {/* Waveform bars */}
              <div className="flex h-3 items-end gap-px">
                {Array.from({ length: WAVE_BARS }).map((_, i) => {
                  const barPct = (i / WAVE_BARS) * 100;
                  const h = 4 + Math.sin(i * 0.7) * 4 + Math.cos(i * 1.3) * 3;
                  const filled = barPct < pct;
                  return (
                    <span
                      key={i}
                      className="flex-1 rounded-sm transition-colors duration-150"
                      style={{
                        height: `${h}px`,
                        background: filled
                          ? "linear-gradient(to top, hsl(var(--glow-violet)), hsl(var(--glow-cyan)))"
                          : "hsl(var(--muted))",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <span className="w-10 text-[11px] tabular-nums text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden items-center gap-2 sm:flex w-32 shrink-0 justify-end">
          <button onClick={() => setMuted((m) => !m)} className="text-muted-foreground transition-colors hover:text-foreground">
            {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setMuted(false);
            }}
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-muted accent-[hsl(var(--glow-violet))] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--glow-violet))]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
