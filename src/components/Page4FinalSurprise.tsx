import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RotateCcw, Eye, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMagicArpeggio, playChimeNote } from '../utils/audioSynth';

interface Page4FinalSurpriseProps {
  recipientName: string;
  isRevealed: boolean;
  onRevealSketch: () => void;
  heartCount: number;
  onSendHeart: () => void;
  onRestart: () => void;
}

export const Page4FinalSurprise: React.FC<Page4FinalSurpriseProps> = ({
  recipientName,
  isRevealed,
  onRevealSketch,
  heartCount,
  onSendHeart,
  onRestart,
}) => {
  const [heartsList, setHeartsList] = useState<{ id: number; x: number }[]>([]);

  const handleReveal = () => {
    if (!isRevealed) {
      onRevealSketch();
    }
    playMagicArpeggio();

    try {
      const count = 220;
      const defaults = {
        origin: { y: 0.65 },
        colors: ['#F2C4CE', '#D8A4B1', '#EADCCF', '#FAF5EF', '#C28493'],
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  };

  const handleHeartClick = () => {
    onSendHeart();
    playChimeNote(600 + Math.random() * 300, 'sine', 0.3, 0.2);

    const newHeart = {
      id: Date.now(),
      x: (Math.random() - 0.5) * 120,
    };
    setHeartsList((prev) => [...prev.slice(-12), newHeart]);
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto min-h-[75vh] flex flex-col items-center justify-center px-4 py-8 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Neumorphic Central Container */}
      <div className="w-full neu-flat-blush rounded-[2.5rem] p-6 sm:p-10 text-center relative border border-white/80 shadow-2xl overflow-hidden">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full neu-pressed-blush text-xs font-semibold text-[#A86374] mb-4">
          <PartyPopper className="w-4 h-4 text-[#C28493]" />
          <span>The Gallery Exhibition</span>
        </div>

        <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#5C4247] mb-2">
          Your Special Portrait
        </h2>

        <p className="font-sans-body text-xs sm:text-sm text-[#8C6D73] mb-8">
          A delicate portrait crafted for <span className="font-semibold text-[#A86374]">{recipientName}</span>
        </p>

        {/* Gallery Wall Spotlight & Rectangular Frame Container */}
        <div className="relative max-w-sm mx-auto mb-8">
          
          {/* Gallery Top Spotlight Beam Effect */}
          {/* <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-white/90 via-white/30 to-transparent blur-md pointer-events-none z-10" /> */}

          {/* Sharp Gallery Rectangular Frame with custom drop shadow (x=5, y=7, 25% gray opacity) & inner shadow */}
          <div 
            className="rounded-none bg-white p-3 sm:p-5 border-[12px] sm:border-[16px] border-white relative overflow-hidden ring-1 ring-[#EADCCF] group"
            style={{
              boxShadow: '5px 7px 12px 0px rgba(128, 128, 128, 0.50), inset 5px 7px 12px 0px rgba(128, 128, 128, 0.25)',
            }}
          >
            
            <div 
              className="relative rounded-none overflow-hidden aspect-3/4 bg-[#FAF5EF] border border-[#EADCCF]/60"
              style={{
                boxShadow: 'inset 5px 7px 10px 0px rgba(128, 128, 128, 0.25)',
              }}
            >
              {/* The Sketch Image */}
              <motion.img
                src="/src/assets/images/Siya.jpg"
                alt="Personal sketch artwork"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1000"
                style={{
                  filter: isRevealed ? 'blur(0px)' : 'blur(22px)',
                  opacity: isRevealed ? 1 : 0.45,
                  transform: isRevealed ? 'scale(1)' : 'scale(1.08)',
                }}
              />

              {/* Curtain Overlay when Hidden */}
              <AnimatePresence>
                {!isRevealed && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-[#FCEFEF]/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="w-14 h-14 rounded-full neu-button-blush flex items-center justify-center text-[#C28493] mb-4 animate-bounce shadow-md">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    
                    {/* <p className="font-serif-heading text-lg font-bold text-[#5C4247] mb-4">
                      A Memory Preserved...
                    </p> */}

                    <button
                      onClick={handleReveal}
                      className="px-6 py-3 rounded-full neu-button-blush text-xs sm:text-sm font-semibold text-[#A86374] hover:text-[#5C4247] flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#C28493]" />
                      <span>Click to reveal</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gallery Plaque / Artist Signature Label when revealed */}
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-xs text-[10px] font-serif-heading italic text-[#7C525B] shadow-xs border border-[#EADCCF]"
                >
                  Portrait for {recipientName} ♡
                </motion.div>
              )}
            </div>

          </div>

          {/* Frame Hanging Cord / Gallery Wall Accent */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-6 border-b-2 border-x-2 border-[#D8A4B1]/40 rounded-b-xl pointer-events-none" />
        </div>

        {/* Message Below the Sketch */}
        <div className="min-h-[60px] flex items-center justify-center mb-8">
          {isRevealed ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="neu-pressed-blush p-4 sm:p-5 rounded-2xl max-w-md mx-auto"
            >
              <p className="font-sans-body text-sm sm:text-base text-[#5C4247] font-medium leading-relaxed">
                "I may not be able to buy an expensive gift, but I wanted to give you something made especially for you. I hope you like it."
              </p>
            </motion.div>
          ) : (
            <p className="text-xs text-[#8C6D73] font-serif-heading italic">
              Tap above to unveil your birthday sketch
            </p>
          )}
        </div>

        {/* Interactive Love Counter & Replay Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#D8A4B1]/30">
          
          {/* Send Love Floating Hearts Button */}
          <div className="relative">
            <button
              onClick={handleHeartClick}
              className="neu-button-blush px-5 py-2.5 rounded-full text-xs font-semibold text-[#A86374] flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
            >
              <Heart className="w-4 h-4 fill-[#D8A4B1] text-[#C28493]" />
              <span>Send Love ({heartCount})</span>
            </button>

            {/* Floating Heart Animations */}
            {heartsList.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, y: 0, scale: 0.8, x: h.x }}
                animate={{ opacity: 0, y: -70, scale: 1.4 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute top-0 left-1/2 pointer-events-none text-[#C28493]"
              >
                ❤️
              </motion.div>
            ))}
          </div>

          {/* Replay Wish Experience */}
          <button
            onClick={() => {
              playChimeNote(440, 'sine', 0.4, 0.15);
              //onRestart();
               setTimeout(() => {
      window.location.reload();
    }, 150);
            }}
            className="neu-button-blush px-5 py-2.5 rounded-full text-xs font-medium text-[#7C525B] hover:text-[#5C4247] flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8C6D73]" />
            <span>Replay Surprise</span>
          </button>

        </div>

      </div>
    </motion.div>
  );
};
