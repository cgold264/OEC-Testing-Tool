import React from 'react';
import { ExamQuestion } from '../../types/oec';
import { Flag, Snowflake } from 'lucide-react';

interface ExamQuestionCardProps {
  question: ExamQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedOptionIndex?: number;
  onSelectOption: (optionIndex: number) => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

export const ExamQuestionCard: React.FC<ExamQuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedOptionIndex,
  onSelectOption,
  isFlagged,
  onToggleFlag
}) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="frost-card rounded-3xl p-6 sm:p-8 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-sky-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white shadow-sm ring-1 ring-sky-400/30">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs font-semibold text-sky-800 hidden sm:inline flex items-center gap-1">
            <Snowflake className="w-3 h-3 text-sky-500" />
            Chapter {question.chapter} &bull; {question.domain}
          </span>
        </div>

        <button
          onClick={onToggleFlag}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
            isFlagged
              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-700 hover:bg-sky-50 border border-transparent'
          }`}
        >
          <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-600' : ''}`} />
          {isFlagged ? 'Flagged for Review' : 'Flag Question'}
        </button>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-red-50 to-sky-50/50 border-red-500 text-slate-950 shadow-md ring-2 ring-red-500/20'
                  : 'bg-white/80 border-sky-200/70 hover:border-sky-300 hover:bg-sky-50/40 text-slate-800'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm ring-1 ring-red-300'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {optionLabels[idx]}
              </span>
              <span className="text-sm sm:text-base leading-snug pt-0.5 font-medium">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
