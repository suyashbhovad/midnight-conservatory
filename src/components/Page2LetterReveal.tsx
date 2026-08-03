import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMagicArpeggio, playChimeNote } from '../utils/audioSynth';

interface Page2LetterRevealProps {
  recipientName: string;
  isOpened: boolean;
  onOpenLetter: () => void;
  onNext: () => void;
}

export const Page2LetterReveal: React.FC<Page2LetterRevealProps> = ({
  recipientName,
  isOpened,
  onOpenLetter,
  onNext,
}) => {
  const [showLetter, setShowLetter] = useState<boolean>(isOpened);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      onOpenLetter();
    }
    setShowLetter(true);

    playMagicArpeggio();
    try {
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F2C4CE', '#EADCCF', '#D8A4B1', '#FAF5EF', '#FFFFFF'],
      });
    } catch (e) {
      console.warn('Confetti fail:', e);
    }
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto min-h-[82vh] flex items-center justify-center px-2 sm:px-4 py-4 relative z-10"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Soft White Surface Flatlay Canvas */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-[2.5rem] p-4 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(218,180,185,0.35)] border border-white/90 relative overflow-hidden">
        
        {/* Soft Decorative Ambient Top Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F2C4CE]/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[#FAF5EF] text-[#C28493] shadow-xs">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#5C4247]">
                Happy Birthday ❤️
              </h2>
              <p className="text-xs text-[#8C6D73]">
                A special greeting for <span className="font-semibold text-[#A86374]">{recipientName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Screen-Fit Soft White Surface Image & Letter Container */}
        <div className="relative w-full rounded-[2rem] bg-[#FAF5EF] p-2 sm:p-4 shadow-inner border border-white flex flex-col lg:flex-row gap-6 items-stretch min-h-[440px]">
          
          {/* Main Flatlay Photo (Full Fit & Surface Effect with single Envelope Trigger) */}
          <div 
            onClick={handleEnvelopeClick}
            className="relative flex-1 rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-md bg-white border border-white/80 min-h-[210px] sm:min-h-[400px]"
          >
            <img
              src="/src/assets/images/envelope_bouquet_1784805631870.jpg"
              alt="Khaki beige envelope and soft tulip bouquet on white surface"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Hidden/Subtle Interactive Envelope Trigger directly over the Envelope on Image */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#5C4247]/40 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 text-white pointer-events-none">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnvelopeClick();
                }}
                className="pointer-events-auto self-center sm:self-center bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#5C4247] flex items-center gap-2 shadow-2xl border border-white cursor-pointer hover:bg-white"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 text-[#C28493]" />
                <span>{showLetter ? 'Letter Opened ✨' : 'Click envelope to unseal letter'}</span>
              </motion.button>
            </div> */}
          </div>

          {/* Secret Letter Reveal Sheet (Appears on click on the white surface) */}
          <div className="flex-1 flex flex-col justify-between p-2 sm:p-4">
            <AnimatePresence mode="wait">
              {showLetter ? (
                <motion.div
                  key="opened-letter"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full bg-white rounded-[1.8rem] p-6 sm:p-8 shadow-lg border border-[#F2C4CE]/50 flex flex-col justify-between relative"
                >
                  {/* Decorative Stamp */}
                  <div className="absolute top-6 right-6 w-10 h-12 border-2 border-dashed border-[#D8A4B1]/60 rounded-md p-1 flex items-center justify-center bg-[#FCEFEF]/50">
                    <Heart className="w-5 h-5 text-[#C28493] fill-[#D8A4B1]/40" />
                  </div>

                  <div>
                    {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCEFEF] text-[11px] font-semibold text-[#A86374] mb-3">
                      <Sparkles className="w-3 h-3 text-[#C28493]" />
                      <span>Unfolded Secret Message</span>
                    </div> */}

                    <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#5C4247] mb-2">
                      Hi {recipientName},
                    </h3>

                    {/* <p className="font-sans-body text-xs sm:text-sm text-[#7C525B] leading-relaxed mb-4">
                      On this special day, I wanted to write a letter that stays with you forever. 
                      You bring so much gentle warmth and quiet joy into the lives of everyone around you.
                    </p> */}

                    {/* <div className="font-handwriting text-xl sm:text-2xl text-[#5C4247] leading-relaxed p-4 rounded-2xl bg-[#FAF5EF] border border-[#EADCCF] my-2">
                      "May your year ahead be as soft as morning sunlight, as sweet as fresh tulips.
                      There are some things that are easier to feel than to put into words, and maybe this is one of them.

Talking to you has become one of those little moments I genuinely look forward to. Somehow, even a short conversation with you never feels short. Time just seems to pass differently, and before I realize it, those moments have become some of my favorites.

I've also really enjoyed drawing and painting with you. Even though we've only done it through our screens, it's always felt special. Maybe someday we'll get to sit together with our sketchbooks and colors, creating something side by side. I think that would be a lovely memory to make."
                    </div> */}

                    <div className="font-handwriting text-lg sm:text-xl md:text-2xl text-[#5C4247] leading-[1.55] sm:leading-[1.65] p-5 sm:p-6 rounded-2xl bg-[#FAF5EF] border border-[#EADCCF] my-2">
  <p className="mb-4">
    There are some things that are easier to feel than to put into words, and maybe this is one of them.
  </p>

  <p className="mb-4">
    Talking to you has become one of those little moments I genuinely look forward to. Somehow, even a short conversation with you never feels short. Time just seems to pass differently, and before I realize it, those moments have become some of my favorites.
  </p>

  <p>
    I've also really enjoyed drawing and painting with you. Even though we've only done it through our screens, it's always felt special. Maybe someday we'll get to sit together with our sketchbooks and colors, creating something side by side. I think that would be a lovely memory to make.
  </p>
</div>

                  </div>

                  <div className="pt-4 border-t border-[#F2C4CE]/40 flex items-center justify-between">
                    <span className="font-serif-heading italic text-xs text-[#A86374]">
                      Forever & Always, with love ❤️
                    </span>

                    <button
                      onClick={() => {
                        playChimeNote(783.99, 'sine', 0.4, 0.2);
                        onNext();
                      }}
                      className="px-5 py-2.5 rounded-full neu-button-blush text-xs font-semibold text-[#A86374] flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Go to Wish Card</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="unopened-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-white/60 rounded-[1.8rem] p-6 sm:p-8 border border-white/80 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="p-4 rounded-full neu-flat-blush text-[#C28493]">
                    <Mail className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif-heading text-2xl font-bold text-[#5C4247]">
                    The Envelope is Sealed
                  </h3>

                  <p className="font-sans-body text-xs sm:text-sm text-[#8C6D73] max-w-xs leading-relaxed">
                     Click on the envelope on the image to open it!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
