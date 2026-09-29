import React, { useState, useEffect } from 'react';
import {
  ALL_QUESTIONS,
  getExamQuestions,
  getAvailableModules,
  ExamMode
} from '../../data/questions';
import { ExamQuestion } from '../../types/oec';
import { ExamQuestionCard } from './ExamQuestionCard';
import { ExamScoreReport } from './ExamScoreReport';
import { Storage } from '../../utils/storage';
import {
  Timer,
  Grid,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Shuffle,
  Zap,
  BookOpen,
  Filter,
  Mountain,
  Snowflake
} from 'lucide-react';

export const ExamSimulator: React.FC = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [isTimed, setIsTimed] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [showGridModal, setShowGridModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [currentMode, setCurrentMode] = useState<ExamMode>('100-random');
  const [selectedModule, setSelectedModule] = useState<number>(1);

  const availableModules = getAvailableModules();

  // Initialize or start an exam with chosen mode
  const startExam = (mode: ExamMode, moduleNum?: number) => {
    setCurrentMode(mode);
    const selected = getExamQuestions(mode, moduleNum);

    setExamQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedIds(new Set());

    // Set reasonable timer based on length
    if (mode === '20-random' || (mode === 'module' && selected.length <= 25)) {
      setTimeLeft(25 * 60); // 25 mins
    } else if (mode === '100-random') {
      setTimeLeft(120 * 60); // 2 hours
    } else {
      setTimeLeft(Math.max(60, Math.round(selected.length * 1.2)) * 60); // ~1.2 mins per question
    }

    setExamStarted(true);
    setExamFinished(false);
  };

  // Timer countdown
  useEffect(() => {
    if (!examStarted || examFinished || !isTimed) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examStarted, examFinished, isTimed]);

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const finishExam = () => {
    setExamFinished(true);
    setShowSubmitModal(false);
    setShowGridModal(false);

    // Calculate score & record to storage
    let correct = 0;
    const domainBreakdown: Record<string, { total: number; correct: number; percentage: number }> =
      {};

    for (const q of examQuestions) {
      if (!domainBreakdown[q.domain]) {
        domainBreakdown[q.domain] = { total: 0, correct: 0, percentage: 0 };
      }
      domainBreakdown[q.domain].total += 1;

      if (userAnswers[q.id] === q.correctIndex) {
        correct += 1;
        domainBreakdown[q.domain].correct += 1;
      }
    }

    Object.keys(domainBreakdown).forEach((d) => {
      const entry = domainBreakdown[d];
      entry.percentage = entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : 0;
    });

    const percentage =
      examQuestions.length > 0 ? Math.round((correct / examQuestions.length) * 100) : 0;

    Storage.saveExamResult({
      id: `exam-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      totalQuestions: examQuestions.length,
      correctCount: correct,
      percentage,
      passed: percentage >= 80,
      domainBreakdown
    });
  };

  const handleRetakeMissed = () => {
    const missed = examQuestions.filter((q) => userAnswers[q.id] !== q.correctIndex);
    if (missed.length === 0) return;
    setExamQuestions(missed);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedIds(new Set());
    setExamStarted(true);
    setExamFinished(false);
  };

  const formatTimer = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQ = examQuestions[currentIndex];

  // Screen 1: Start Menu (Alpine Winter Theme)
  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
        {/* Ski Patrol Mountain Division Emblem */}
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center mx-auto shadow-xl shadow-red-900/40 ring-4 ring-white/90">
            <span className="text-3xl font-black leading-none">+</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-sky-400 border-2 border-white flex items-center justify-center">
            <Snowflake className="w-3.5 h-3.5 text-slate-950" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-300 text-sky-800 text-xs font-bold mb-3">
          <Mountain className="w-3.5 h-3.5 text-sky-600" />
          Ski Patrol OEC Cognitive Qualification
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
          OEC Practice Examination
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
          Simulate official Outdoor Emergency Care exams using authenticated National Ski Patrol and TopClass question pools.
        </p>

        {/* Question Bank Stats Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-sky-200 text-sky-900 text-xs font-semibold mb-8 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>{ALL_QUESTIONS.length} Questions in Bank</span>
          <span className="text-sky-300">&bull;</span>
          <span>{availableModules.length} Modules Available</span>
          <span className="text-sky-300">&bull;</span>
          <span className="text-emerald-700 font-bold">80% Passing Standard</span>
        </div>

        {/* 3 Main Exam Modes with Trail Ratings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 text-left">
          {/* Option 1: 100 Random Questions */}
          <div className="frost-card border-2 border-red-500/80 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-900/30">
                  <Shuffle className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                  100 Questions &bull; 2h
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">Random 100</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Full-length qualification exam. 100 randomized questions with official 2-hour countdown timer.
              </p>
            </div>
            <button
              onClick={() => startExam('100-random')}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:from-red-700 hover:to-red-800 transition active:scale-95"
            >
              Start 100 Questions
            </button>
          </div>

          {/* Option 2: 20 Random Questions */}
          <div className="frost-card rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/30">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  20 Questions &bull; 25m
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">Random 20</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Quick warm-up run. 20 randomly drawn questions ideal for mobile review and rapid test drills.
              </p>
            </div>
            <button
              onClick={() => startExam('20-random')}
              className="w-full py-3 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:bg-slate-800 transition active:scale-95"
            >
              Start 20 Questions
            </button>
          </div>

          {/* Option 3: All Questions Shuffled */}
          <div className="frost-card rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-900/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  All Questions &bull; Shuffled
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-1">All {ALL_QUESTIONS.length} Shuffled</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Complete coverage terrain drill. Every question in the bank in randomized order.
              </p>
            </div>
            <button
              onClick={() => startExam('all-shuffled')}
              className="w-full py-3 bg-gradient-to-r from-sky-600 to-sky-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:from-sky-700 hover:to-sky-800 transition active:scale-95"
            >
              Start Full Pool ({ALL_QUESTIONS.length})
            </button>
          </div>
        </div>

        {/* Specific Module Drill */}
        {availableModules.length > 0 && (
          <div className="frost-card rounded-3xl p-6 shadow-md text-left mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-red-600" />
                Target Specific Module
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice only the questions from a specific OEC TopClass module.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(parseInt(e.target.value, 10))}
                className="flex-1 sm:w-48 py-2.5 px-3 text-xs sm:text-sm bg-white border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
              >
                {availableModules.map((m) => (
                  <option key={m} value={m}>
                    Module {m} Questions
                  </option>
                ))}
              </select>

              <button
                onClick={() => startExam('module', selectedModule)}
                className="py-2.5 px-4 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow hover:bg-red-700 transition"
              >
                Drill Module
              </button>
            </div>
          </div>
        )}

        {/* Timer Config */}
        <div className="bg-white/80 border border-sky-200/80 rounded-2xl p-4 shadow-sm text-left flex items-center justify-between max-w-md mx-auto backdrop-blur-sm">
          <div>
            <span className="font-bold text-slate-800 text-sm block">Timed Exam Mode</span>
            <span className="text-xs text-slate-500">Includes countdown timer with time warnings</span>
          </div>
          <input
            type="checkbox"
            checked={isTimed}
            onChange={(e) => setIsTimed(e.target.checked)}
            className="w-5 h-5 accent-red-600 rounded cursor-pointer"
          />
        </div>
      </div>
    );
  }

  // Screen 3: Score Report
  if (examFinished) {
    return (
      <ExamScoreReport
        questions={examQuestions}
        userAnswers={userAnswers}
        onRetakeAll={() => startExam(currentMode, selectedModule)}
        onRetakeMissed={handleRetakeMissed}
      />
    );
  }

  // Screen 2: Active Exam Session
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12">
      {/* Top Test Header (Alpine Glassmorphism) */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md p-3 sm:px-4 sm:py-3 mb-6 rounded-2xl border border-sky-200 shadow-md">
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2">
          {/* Question Counter */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 min-w-0">
            <Mountain className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="truncate">
              Q <span className="font-extrabold">{currentIndex + 1}</span>
              <span className="text-slate-400 font-normal"> / {examQuestions.length}</span>
            </span>
            <span className="hidden sm:inline text-sky-700 text-xs font-medium ml-2">
              ({answeredCount} answered)
            </span>
          </div>

          {/* Right Controls: Timer + Grid + Submit */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Alpine Chronograph Timer */}
            {isTimed && (
              <div className="flex items-center gap-1 bg-[#051124] text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold shadow-sm border border-sky-400/30">
                <Timer className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="tracking-wide">{formatTimer(timeLeft)}</span>
              </div>
            )}

            {/* Grid Jump */}
            <button
              onClick={() => setShowGridModal(true)}
              className="p-1.5 sm:p-2 border border-sky-200 rounded-xl bg-white hover:bg-sky-50 text-slate-700 transition shadow-sm"
              title="Question Navigator"
            >
              <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Finish/Submit button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:from-red-700 hover:to-red-800 transition active:scale-95"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Full-width Progress Bar */}
        <div className="w-full bg-sky-100 h-1.5 sm:h-2 rounded-full overflow-hidden p-0.5 border border-sky-200">
          <div
            className="bg-gradient-to-r from-sky-500 via-sky-600 to-red-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Question Card */}
      {currentQ && (
        <div className="mb-6">
          <ExamQuestionCard
            question={currentQ}
            questionIndex={currentIndex}
            totalQuestions={examQuestions.length}
            selectedOptionIndex={userAnswers[currentQ.id]}
            onSelectOption={handleSelectOption}
            isFlagged={flaggedIds.has(currentQ.id)}
            onToggleFlag={handleToggleFlag}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-2.5 sm:gap-4 w-full">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-bold border border-sky-200 rounded-xl bg-white text-slate-700 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 shrink-0" />
          <span>Previous</span>
        </button>

        {currentIndex === examQuestions.length - 1 ? (
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:from-red-700 hover:to-red-800 transition active:scale-95"
          >
            <span>Submit Exam</span>
            <span className="hidden sm:inline">& View Score</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 sm:px-5 py-2.5 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:bg-slate-800 transition active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        )}
      </div>

      {/* Question Grid Modal */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 border border-sky-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-sky-100 mb-4">
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <Mountain className="w-5 h-5 text-sky-600" />
                Question Trail Grid
              </h3>
              <button
                onClick={() => setShowGridModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs mb-4 text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Flagged
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-sky-100 border border-sky-300 inline-block" /> Unanswered
              </span>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-5 sm:grid-cols-10 gap-2 p-1">
              {examQuestions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isFlagged = flaggedIds.has(q.id);
                const isCurrent = idx === currentIndex;

                let bgClass = 'bg-sky-50 text-slate-700 border-sky-200 hover:bg-sky-100';
                if (isFlagged) {
                  bgClass = 'bg-amber-400 text-amber-950 font-bold border-amber-500';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-600 text-white font-bold border-emerald-700';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowGridModal(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-semibold border flex items-center justify-center transition ${bgClass} ${
                      isCurrent ? 'ring-2 ring-red-500 ring-offset-2' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-sky-100 mt-4 flex justify-end">
              <button
                onClick={() => setShowGridModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-sky-200 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">Submit Examination?</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              You have answered <span className="font-bold text-slate-900">{answeredCount}</span> of{' '}
              <span className="font-bold text-slate-900">{examQuestions.length}</span> questions.
              {answeredCount < examQuestions.length && (
                <span className="text-red-600 block mt-1 font-semibold">
                  You have {examQuestions.length - answeredCount} unanswered questions remaining.
                </span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center w-full">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl order-2 sm:order-1 transition"
              >
                Continue Exam
              </button>
              <button
                onClick={finishExam}
                className="w-full sm:w-auto px-5 py-2.5 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:bg-red-700 transition order-1 sm:order-2 active:scale-95"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
