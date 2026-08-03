import React from 'react';
import { PageId } from '../types';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { playChimeNote } from '../utils/audioSynth';

interface NavigationHeaderProps {
  currentPage: PageId;
  recipientName: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentPage,
  recipientName,
  isMusicPlaying,
  onToggleMusic,
}) => {
  return (
    <header className="relative z-20 pt-4 pb-2 px-4 max-w-4xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-sans-body">
      {/* Left: Simple Recipient Tag */}
      <div className="flex items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full neu-flat-blush flex items-center gap-2 text-[#7C525B] shadow-xs">
          <Heart className="w-3.5 h-3.5 text-[#C28493] fill-[#D8A4B1]/40" />
          <span className="font-medium text-[#5C4247]">For <strong className="font-serif-heading font-bold text-sm tracking-wide text-[#7C525B]">{recipientName}</strong></span>
        </div>
      </div>

      {/* Right: Sound & Music Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onToggleMusic();
            playChimeNote(587.33, 'sine', 0.4, 0.15);
          }}
          aria-label={isMusicPlaying ? "Mute audio chimes" : "Unmute audio chimes"}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            isMusicPlaying ? 'neu-pressed-blush text-[#A86374]' : 'neu-button-blush text-[#8C6D73]'
          }`}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#C28493]" />
              <span className="inline">Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#8C6D73]" />
              <span className="inline">Muted</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

