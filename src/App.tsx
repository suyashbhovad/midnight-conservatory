/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PageId, AppState } from './types';
import { NavigationHeader } from './components/NavigationHeader';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Page1Welcome } from './components/Page1Welcome';
import { Page2LetterReveal } from './components/Page2LetterReveal';
import { Page3WishCard } from './components/Page3WishCard';
import { Page4FinalSurprise } from './components/Page4FinalSurprise';

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 1,
    recipientName: 'Siya',
    isMusicPlaying: true,
    letterOpenedPage2: false,
    sketchRevealedPage4: false,
    heartCountPage4: 0,
  });

  const handlePageChange = (page: PageId) => {
    setAppState((prev) => ({ ...prev, currentPage: page }));
  };

  const handleUpdateName = (name: string) => {
    setAppState((prev) => ({ ...prev, recipientName: name }));
  };

  const handleToggleMusic = () => {
    setAppState((prev) => ({ ...prev, isMusicPlaying: !prev.isMusicPlaying }));
  };

  const handleOpenLetterPage2 = () => {
    setAppState((prev) => ({ ...prev, letterOpenedPage2: true }));
  };

  const handleRevealSketchPage4 = () => {
    setAppState((prev) => ({ ...prev, sketchRevealedPage4: true }));
  };

  const handleSendHeartPage4 = () => {
    setAppState((prev) => ({ ...prev, heartCountPage4: prev.heartCountPage4 + 1 }));
  };

  const handleRestart = () => {
    setAppState((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-1000 relative flex flex-col justify-between selection:bg-[#F2C4CE] selection:text-[#5C4247] ${
      // appState.currentPage === 3 ? 'bg-[#FAF5EF]' : 'bg-[#FCEFEF]'
      appState.currentPage === 3 ? 'bg-[#F4EEE6]' : 'bg-[#F8E7E9]'

    }`}>
      {/* Floating Particles and Ambient Glows */}
      <BackgroundEffects page={appState.currentPage} />

      {/* Top Header Navigation & Settings */}
      <NavigationHeader
        currentPage={appState.currentPage}
        recipientName={appState.recipientName}
        isMusicPlaying={appState.isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Interactive Screen Carousel */}
      <main className="flex-1 flex items-center justify-center py-4 relative z-10 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {appState.currentPage === 1 && (
            <Page1Welcome
              key="page-1"
              recipientName={appState.recipientName}
              onNext={() => handlePageChange(2)}
            />
          )}

          {appState.currentPage === 2 && (
            <Page2LetterReveal
              key="page-2"
              recipientName={appState.recipientName}
              isOpened={appState.letterOpenedPage2}
              onOpenLetter={handleOpenLetterPage2}
              onNext={() => handlePageChange(3)}
            />
          )}

          {appState.currentPage === 3 && (
            <Page3WishCard
              key="page-3"
              recipientName={appState.recipientName}
              onNext={() => handlePageChange(4)}
            />
          )}

          {appState.currentPage === 4 && (
            <Page4FinalSurprise
              key="page-4"
              recipientName={appState.recipientName}
              isRevealed={appState.sketchRevealedPage4}
              onRevealSketch={handleRevealSketchPage4}
              heartCount={appState.heartCountPage4}
              onSendHeart={handleSendHeartPage4}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Footer */}
      <footer className="py-4 text-center text-xs font-serif-heading italic text-[#8C6D73]/60 relative z-10">
        Created with soft warmth & affection ♡ Happy Birthday
      </footer>
    </div>
  );
}
