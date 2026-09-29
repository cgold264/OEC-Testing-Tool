import React from 'react';
import { Flashcard } from '../../types/oec';
import { RotateCw, CheckCircle2, Bookmark, Mountain, Snowflake } from 'lucide-react';

interface FlashcardCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  isMastered: boolean;
  needsReview: boolean;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  isFlipped,
  onFlip,
  isMastered,
  needsReview
}) => {
  return (
    <div
      onClick={onFlip}
      className="perspective-1000 w-full max-w-xl h-80 sm:h-96 cursor-pointer select-none mx-auto"
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT: Frosted Alpine Daylight */}
        <div className="absolute inset-0 backface-hidden frost-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group">
          {/* Subtle Mountain Watermark */}
          <div className="absolute top-4 right-6 opacity-5 pointer-events-none">
            <Mountain className="w-32 h-32 text-sky-900" />
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white shadow-sm ring-1 ring-red-400/50">
                Chapter {card.chapter}
              </span>

              <div className="flex items-center gap-1.5">
                {isMastered && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3" /> Mastered
                  </span>
                )}
                {needsReview && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
                    <Bookmark className="w-3 h-3" /> Review
                  </span>
                )}
              </div>
            </div>

            <p className="text-[11px] font-bold text-sky-700 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Snowflake className="w-3 h-3 text-sky-500" />
              {card.domain}
            </p>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 leading-snug">
              {card.front}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-sky-100 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-sky-700 font-semibold group-hover:text-red-600 transition-colors">
              <RotateCw className="w-3.5 h-3.5 text-red-600" /> Tap card to reveal protocol
            </span>
            {card.tags && card.tags.length > 0 && (
              <div className="flex gap-1">
                {card.tags.slice(0, 2).map((t) => (
                  <span key={t} className="bg-sky-50 text-sky-800 border border-sky-200/60 px-2 py-0.5 rounded-lg text-[10px] font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BACK: Alpine Twilight Protocol Mode */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 alpine-night-card text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-600 text-white shadow-sm ring-1 ring-white/30">
                OEC Clinical Protocol
              </span>
              <span className="text-xs text-sky-300 font-mono">Chapter {card.chapter}</span>
            </div>
            <div className="text-sm sm:text-base text-sky-50 whitespace-pre-line leading-relaxed font-normal pt-1">
              {card.back}
            </div>
          </div>

          <div className="pt-4 border-t border-sky-900/60 text-xs text-sky-300/80 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-300">
              <RotateCw className="w-3.5 h-3.5 text-sky-400" /> Tap to flip back
            </span>
            <span className="text-[11px] text-sky-400 font-medium tracking-wide">
              Ski Patrol Standard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
