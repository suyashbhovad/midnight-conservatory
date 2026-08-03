import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, HeartHandshake, Quote } from 'lucide-react';
import { playChimeNote } from '../utils/audioSynth';

interface Page3WishCardProps {
  recipientName: string;
  onNext: () => void;
}

export const Page3WishCard: React.FC<Page3WishCardProps> = ({
  recipientName,
  onNext,
}) => {
  const handleProceed = () => {
    playChimeNote(783.99, 'sine', 0.5, 0.2);
    onNext();
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto min-h-[75vh] flex items-center justify-center px-4 py-8 relative z-10"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cream Pastel Background Card Container */}
      <div className="w-full neu-flat-cream rounded-[2.5rem] p-8 sm:p-12 text-center relative border border-white/80 shadow-2xl">
        
        {/* Top Decorative Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full neu-button-cream mb-6 text-[#C28493]">
          <HeartHandshake className="w-7 h-7 text-[#C28493]" />
        </div>

        {/* Small Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full neu-pressed-cream text-xs font-medium text-[#A86374] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C28493]" />
          <span>A Little Note for You</span>
        </div>

        {/* Card Title */}
        <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#5C4247] mb-6">
          For You, {recipientName}
        </h2>

        {/* Neumorphic Inset Handwritten Wishing Letter */}
        {/* <div className="neu-inset-panel rounded-3xl p-6 sm:p-8 mb-8 text-left relative overflow-hidden">
          <Quote className="w-8 h-8 text-[#D8A4B1]/30 absolute top-4 left-4 -scale-x-100 pointer-events-none" />
          
          <div className="font-handwriting text-2xl sm:text-3xl text-[#5C4247] leading-relaxed relative z-10 space-y-4">
            <p>
              Today is all about celebrating you...
            </p>
            <p className="text-[#7C525B]">
              your smile, your kindness, and all the little things that make you so deeply special to everyone around you.
            </p>
            <p className="text-[#8C6D73]">
              I hope this coming year wraps you in endless joy, cozy laughter, warm coffee mornings, and all the quiet magical moments you deserve.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D8A4B1]/30 flex justify-between items-center text-xs font-serif-heading italic text-[#A86374]">
            <span>✨ Wishing you the happiest birthday</span>
            <span>Made with love 💗</span>
          </div>
        </div> */}

        {/* <div className="neu-inset-panel rounded-3xl p-8 sm:p-10 mb-8 text-left relative overflow-hidden">
  <Quote className="w-8 h-8 text-[#D8A4B1]/30 absolute top-5 left-5 -scale-x-100 pointer-events-none" />

  <div className="font-handwriting text-[1.35rem] sm:text-[1.55rem] text-[#5C4247] leading-[1.8] relative z-10 space-y-6">
    <p>
      On your birthday, I wish you a year filled with happiness, good health, and countless little moments that make you smile.
    </p>

    <p className="text-[#7C525B]">
      I hope all your hard work for becoming a Chartered Accountant pays off and that you achieve everything you've been working towards. I also hope your dream of opening a cozy little bakery becomes a beautiful reality, filled with delicious treats and happy memories.
    </p>

    <p className="text-[#8C6D73]">
      May you always find time for the things you love—painting, reading, music, and cooking. I hope your creativity continues to grow and brings you as much joy as it brings to others.
    </p>

    <p className="text-[#7C525B]">
      Most importantly, I wish you a life filled with peace, kindness, wonderful people, and moments that make your heart truly happy.
    </p>

    <p className="text-[#8C6D73]">
      And one question... when do I finally get to taste your recipes? 😄 I'm especially waiting for those Ukadiche Modak! Hopefully, I'll get to try them someday.

Happy Birthday once again! Wishing you all the happiness and success you deserve.
    </p>
  </div>

  <div className="mt-8 pt-5 border-t border-[#D8A4B1]/30 flex justify-between items-center text-xs font-serif-heading italic text-[#A86374]">
    <span>✨ Wishing you the happiest birthday</span>
    <span>Made with love 💗</span>
  </div>
        </div> */}

        <div className="neu-inset-panel rounded-3xl px-5 py-5 sm:px-8 sm:py-8 mb-6 text-left relative overflow-hidden">
  <Quote className="w-7 h-7 text-[#D8A4B1]/25 absolute top-4 left-4 -scale-x-100 pointer-events-none" />

  <div className="font-handwriting text-[1.08rem] sm:text-[1.45rem] text-[#5C4247] leading-[1.6] relative z-10 space-y-3">
    <p>
      On your birthday, I wish you a year filled with happiness, good health, and countless little moments that make you smile.
    </p>

    <p className="text-[#7C525B]">
      I hope all your hard work for becoming a Chartered Accountant pays off and that you achieve everything you've been working towards. I also hope your dream of opening a cozy little bakery becomes a beautiful reality, filled with delicious treats and happy memories.
    </p>

    <p className="text-[#8C6D73]">
      May you always find time for the things you love—painting, reading, music, and cooking. I hope your creativity continues to grow and brings you as much joy as it brings to others.
    </p>

    <p className="text-[#7C525B]">
      Most importantly, I wish you a life filled with peace, kindness, wonderful people, and moments that make your heart truly happy.
    </p>

    <p className="text-[#8C6D73]">
      And one question... when do I finally get to taste your recipes? 😄 I'm especially waiting for those <span className="font-semibold">Ukadiche Modak!</span> Hopefully, I'll get to try them someday.
    </p>

    <p className="text-[#A86374]">
      Happy Birthday once again! Wishing you all the happiness and success you deserve. 💖
    </p>
  </div>

  <div className="mt-5 pt-3 border-t border-[#D8A4B1]/30 flex justify-between items-center text-[11px] sm:text-xs font-serif-heading italic text-[#A86374]">
    <span> Wishing you the happiest birthday</span>
    <span> 💗</span>
  </div>
</div>



        {/* Bottom Call to Action Section */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="font-serif-heading text-base sm:text-lg text-[#7C525B] font-medium">
            To see your surprise, click here
          </p>

          {/* Circular Neumorphic Button with Arrow */}
          <motion.button
            onClick={handleProceed}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Proceed to final surprise reveal"
            className="w-16 h-16 rounded-full neu-button-cream flex items-center justify-center text-[#A86374] hover:text-[#5C4247] shadow-xl group cursor-pointer border border-white"
          >
            <ArrowRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};
