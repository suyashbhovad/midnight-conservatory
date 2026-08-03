import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { playPlayfulPop, playChimeNote } from '../utils/audioSynth';

interface Page1WelcomeProps {
  recipientName: string;
  onNext: () => void;
}

const TEASING_MESSAGES = [
  "Hehe, too fast! 🙈",
  "Almost got me! 💕",
  "Okay, okay... one more!💕 ",
  "You win! Click now 💖",
];

export const Page1Welcome: React.FC<Page1WelcomeProps> = ({
  recipientName,
  onNext,
}) => {
  // Number of dodge attempts so far (0 to 3 means dodge, 4 means frozen and ready)
  const [attempts, setAttempts] = useState<number>(0);
  const [buttonPos, setButtonPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lastTease, setLastTease] = useState<string>('');

  // Handle dodge interaction on attempt < 3
  const handleAttempt = () => {
    if (attempts < 3) {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);

      // Play cute pop sound
      playPlayfulPop(nextAttempt);

      // Generate soft random offsets relative to current position
      // Keep within comfortable boundary bounds (-90px to +90px on X and Y)
      const randomX = (Math.random() - 0.5) * 180;
      const randomY = (Math.random() - 0.5) * 120;
      setButtonPos({ x: randomX, y: randomY });

      // Set teasing message
      setLastTease(TEASING_MESSAGES[nextAttempt - 1]);
    } else if (attempts === 3) {
      // 4th attempt! Now button freezes and stays still
      setAttempts(4);
      setButtonPos({ x: 0, y: 0 });
      setLastTease(TEASING_MESSAGES[3]);
      playChimeNote(880, 'sine', 0.5, 0.2);
    } else {
      // Final successful click on 4th attempt!
      playChimeNote(1046.5, 'sine', 0.8, 0.25);
      onNext();
    }
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 relative z-10"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Neumorphic Central Card */}
      <div className="w-full neu-flat-blush rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-xs border border-white/60">
        
        {/* Top Floating Heart Icon Accent */}
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full neu-button-blush mb-6 text-[#C28493]"
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Heart className="w-8 h-8 fill-[#D8A4B1]/30 text-[#C28493]" />
        </motion.div>

        {/* Heading */}
        <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#5C4247] mb-3 leading-tight tracking-tight">
          It's your special day...
        </h1>

        {/* Personalized Subtitle */}
        <p className="font-serif-heading text-lg sm:text-xl italic text-[#8C6D73] mb-6">
          Dear <span className="font-semibold text-[#A86374]">{recipientName}</span> 
        </p>

        {/* Subtext */}
        <p className="font-sans-body text-sm sm:text-base text-[#7C525B] leading-relaxed max-w-xs sm:max-w-sm mx-auto mb-8 font-normal">
          I made something small and special just for you.
          <br className="hidden sm:inline" /> Ready to see what I made?
        </p>

        {/* Teasing feedback bubble */}
        <div className="h-8 mb-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {lastTease && (
              <motion.span
                key={lastTease + attempts}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-[#A86374] neu-pressed-blush"
              >
                <Sparkles className="w-3 h-3 text-[#C28493]" />
                {lastTease}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Dodging / Interactive Neumorphic Button */}
        <div className="relative min-h-[80px] flex items-center justify-center">
          <motion.button
            onClick={handleAttempt}
            onMouseEnter={() => {
              if (attempts < 3) {
                // On desktop hover, trigger dodging playfully
                handleAttempt();
              }
            }}
            animate={{
              x: buttonPos.x,
              y: buttonPos.y,
              scale: attempts === 4 ? 1.05 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 22,
            }}
            className={`px-8 py-3.5 rounded-full font-sans-body font-semibold text-base sm:text-lg flex items-center gap-2 select-none cursor-pointer ${
              attempts === 4
                ? 'neu-button-blush text-[#A86374] ring-2 ring-[#C28493]/60 shadow-xl scale-105 animate-pulse'
                : 'neu-button-blush text-[#7C525B] hover:text-[#A86374]'
            }`}
          >
            <span>Yes 💗</span>
            {/* {attempts === 4 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#F2C4CE] text-[#A86374] font-bold shadow-xs">
                Click me! ✨
              </span>
            )} */}
          </motion.button>
        </div>

        {/* Playful hint at bottom */}
        <p className="mt-8 text-xs text-[#A86374]/70 font-sans-body">
          {attempts === 0 && ' (Give the button a try! 💕)'}
          {attempts > 0 && attempts < 4 && `Attempt ${attempts} of 4 🌸`}
          {attempts === 4 && '💕 You caught it! Go right ahead 💕'}
        </p>

      </div>
    </motion.div>
  );
};
