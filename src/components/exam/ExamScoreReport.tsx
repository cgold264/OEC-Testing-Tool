import React, { useState } from 'react';
import { ExamQuestion } from '../../types/oec';
import { Award, CheckCircle2, XCircle, RotateCcw, Check, X, AlertTriangle } from 'lucide-react';

interface ExamScoreReportProps {
  questions: ExamQuestion[];
  userAnswers: Record<string, number>;
  onRetakeAll: () => void;
  onRetakeMissed?: () => void;
}

export const ExamScoreReport: React.FC<ExamScoreReportProps> = ({
  questions,
  userAnswers,
  onRetakeAll,
  onRetakeMissed
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'missed' | 'correct'>('all');

  const total = questions.length;
  let correctCount = 0;

  const domainStats: Record<string, { total: number; correct: number }> = {};

  questions.forEach((q) => {
    const isCorrect = userAnswers[q.id] === q.correctIndex;
    if (isCorrect) correctCount++;

    if (!domainStats[q.domain]) {
      domainStats[q.domain] = { total: 0, correct: 0 };
    }
    domainStats[q.domain].total++;
    if (isCorrect) domainStats[q.domain].correct++;
  });

  const percentage = Math.round((correctCount / total) * 100);
  const passed = percentage >= 80;

  const filteredQuestions = questions.filter((q) => {
    const isCorrect = userAnswers[q.id] === q.correctIndex;
    if (filterMode === 'missed') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Top Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl ${
          passed
            ? 'bg-gradient-to-br from-emerald-600 to-teal-800'
            : 'bg-gradient-to-br from-red-600 to-slate-900'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" /> OEC Practice Examination Result
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              {passed ? 'Exam Passed!' : 'Needs Review'}
            </h2>
            <p className="text-sm text-white/80 max-w-md">
              {passed
                ? 'Outstanding performance. You met the official 80% passing standard for Outdoor Emergency Care certification.'
                : 'Keep practicing! Review the rationales below and target your weaker domains before exam day.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center min-w-[140px] border border-white/20">
            <span className="text-4xl sm:text-5xl font-black block">{percentage}%</span>
            <span className="text-xs text-white/80 uppercase font-semibold">
              {correctCount} / {total} Correct
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-3">
          <button
            onClick={onRetakeAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow hover:bg-slate-100 transition"
          >
            <RotateCcw className="w-4 h-4" /> Retake Full Exam
          </button>
          {total - correctCount > 0 && onRetakeMissed && (
            <button
              onClick={onRetakeMissed}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-950/60 border border-white/30 text-white font-semibold text-sm hover:bg-red-900/60 transition"
            >
              <AlertTriangle className="w-4 h-4" /> Drill Missed Questions ({total - correctCount})
            </button>
          )}
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Domain Performance Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(domainStats).map(([domain, stats]) => {
            const domainPct = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={domain} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-700">
                  <span>{domain}</span>
                  <span>
                    {stats.correct} / {stats.total} ({domainPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      domainPct >= 80 ? 'bg-emerald-500' : domainPct >= 65 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${domainPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-slate-900">Question by Question Review</h3>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filterMode === 'all' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilterMode('missed')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filterMode === 'missed' ? 'bg-white shadow text-red-600' : 'text-slate-500'
              }`}
            >
              Missed ({total - correctCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                filterMode === 'correct' ? 'bg-white shadow text-emerald-600' : 'text-slate-500'
              }`}
            >
              Correct ({correctCount})
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border ${
                  isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-red-200 bg-red-50/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-500">
                      Chapter {q.chapter} &bull; {q.domain}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-semibold text-slate-800 mb-3">{q.question}</p>

                <div className="space-y-1.5 mb-3 text-xs sm:text-sm">
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = userAnswer === optIdx;
                    const isRightAnswer = q.correctIndex === optIdx;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl flex items-center justify-between ${
                          isRightAnswer
                            ? 'bg-emerald-100/70 text-emerald-900 font-semibold'
                            : isUserPick
                            ? 'bg-red-100/70 text-red-900 font-semibold'
                            : 'bg-white/50 text-slate-600'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xs font-bold w-5">
                            {['A', 'B', 'C', 'D'][optIdx]}.
                          </span>
                          {opt}
                        </span>
                        {isRightAnswer && <Check className="w-4 h-4 text-emerald-700" />}
                        {isUserPick && !isRightAnswer && <X className="w-4 h-4 text-red-700" />}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 block mb-0.5">Rationale:</span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
