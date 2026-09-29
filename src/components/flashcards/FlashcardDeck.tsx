import React, { useState, useEffect, useMemo } from 'react';
import { SAMPLE_FLASHCARDS } from '../../data/flashcards';
import { OEC_DOMAINS } from '../../data/chapters';
import { FlashcardCard } from './FlashcardCard';
import { Storage, FlashcardProgress } from '../../utils/storage';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  Filter,
  Trophy,
  Layers,
  Mountain,
  Snowflake
} from 'lucide-react';

export const FlashcardDeck: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<FlashcardProgress>(Storage.getFlashcardProgress());

  // Filter deck based on selected domain
  const filteredCards = useMemo(() => {
    let pool = SAMPLE_FLASHCARDS;

    // Filter by domain or review-only
    if (selectedDomain === 'review-only') {
      return pool.filter((c) => progress.reviewIds.includes(c.id));
    }
    if (selectedDomain !== 'all') {
      return pool.filter((c) => c.domain === selectedDomain);
    }

    return pool;
  }, [selectedDomain, progress.reviewIds]);

  const activeCard = filteredCards[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedDomain]);

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleMark = (status: 'mastered' | 'review') => {
    if (!activeCard) return;
    const updated = Storage.markFlashcard(activeCard.id, status);
    setProgress(updated);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleResetMastery = () => {
    if (confirm('Reset all flashcard mastery progress for this device?')) {
      Storage.resetFlashcardProgress();
      setProgress({ masteredIds: [], reviewIds: [] });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '1') {
        handleMark('review');
      } else if (e.key === '2') {
        handleMark('mastered');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredCards.length, activeCard]);

  const pct = filteredCards.length > 0 ? Math.round(((currentIndex + 1) / filteredCards.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 pb-24 md:pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 border border-sky-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Snowflake className="w-3 h-3 text-sky-600" />
              Alpine Study Division
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-red-600" />
            OEC Flashcard Deck
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            End-of-chapter key terms and core patroller concepts (53 cards)
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-600" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white/95 border border-sky-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-slate-700"
            >
              <option value="all">All OEC Domains</option>
              {OEC_DOMAINS.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
              <option value="review-only">Flagged for Review ({progress.reviewIds.length})</option>
            </select>
          </div>

          <button
            onClick={handleResetMastery}
            title="Reset Flashcard Mastery"
            className="p-2 border border-sky-200 rounded-xl hover:bg-sky-50 text-slate-600 transition shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Counters (Winter Themed) */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="frost-card rounded-2xl p-3.5 text-center">
          <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
            Deck Total
          </span>
          <p className="text-xl font-black text-slate-800 mt-0.5">{filteredCards.length}</p>
        </div>
        <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3.5 text-center shadow-sm">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
            Mastered
          </span>
          <p className="text-xl font-black text-emerald-700 mt-0.5">{progress.masteredIds.length}</p>
        </div>
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 text-center shadow-sm">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
            Review Needed
          </span>
          <p className="text-xl font-black text-amber-700 mt-0.5">{progress.reviewIds.length}</p>
        </div>
      </div>

      {/* Mountain Ascent Progress Bar */}
      {filteredCards.length > 0 && (
        <div className="mb-6 bg-white/80 border border-sky-200/80 rounded-2xl p-3 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 font-bold text-sky-900">
              <Mountain className="w-4 h-4 text-sky-600" />
              Mountain Ascent: Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="text-sky-700 font-bold">{pct}% Elevation</span>
          </div>
          <div className="w-full h-2.5 bg-sky-100 rounded-full overflow-hidden p-0.5 border border-sky-200">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-sky-600 to-red-600 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {filteredCards.length === 0 ? (
        <div className="frost-card rounded-3xl p-12 text-center shadow-md">
          <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No cards in this filter</h3>
          <p className="text-sm text-slate-500 mb-4">
            {selectedDomain === 'review-only'
              ? 'Great job! You have no cards marked for review in this category.'
              : 'Try selecting a different domain from the dropdown above.'}
          </p>
          <button
            onClick={() => {
              setSelectedDomain('all');
            }}
            className="px-5 py-2.5 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-red-700 transition shadow"
          >
            Show All Cards
          </button>
        </div>
      ) : (
        <>
          {/* Card Carousel */}
          <div className="mb-6">
            <FlashcardCard
              card={activeCard}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((prev) => !prev)}
              isMastered={progress.masteredIds.includes(activeCard.id)}
              needsReview={progress.reviewIds.includes(activeCard.id)}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 max-w-xl mx-auto w-full">
            {/* Quick Assessment Buttons */}
            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto order-1 sm:order-2">
              <button
                onClick={() => handleMark('review')}
                className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition active:scale-95 shadow-sm"
              >
                <X className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Need Review</span>
              </button>
              <button
                onClick={() => handleMark('mastered')}
                className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:from-emerald-700 hover:to-emerald-800 transition active:scale-95"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>Mastered</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:contents gap-2 order-2 sm:order-none">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border border-sky-200 rounded-xl bg-white shadow-sm text-slate-700 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition sm:order-1"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span>Prev</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredCards.length - 1}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border border-sky-200 rounded-xl bg-white shadow-sm text-slate-700 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition sm:order-3"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>

          {/* Keyboard tip */}
          <p className="text-center text-xs text-sky-800/60 mt-6 hidden sm:block font-medium">
            Keyboard shortcuts: <kbd className="px-1.5 py-0.5 bg-white border border-sky-200 rounded text-slate-700 font-mono">Space</kbd> Flip &bull; <kbd className="px-1.5 py-0.5 bg-white border border-sky-200 rounded text-slate-700 font-mono">&larr;</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-sky-200 rounded text-slate-700 font-mono">&rarr;</kbd> Navigate &bull; <kbd className="px-1.5 py-0.5 bg-white border border-sky-200 rounded text-slate-700 font-mono">1</kbd> Review &bull; <kbd className="px-1.5 py-0.5 bg-white border border-sky-200 rounded text-slate-700 font-mono">2</kbd> Mastered
          </p>
        </>
      )}
    </div>
  );
};
