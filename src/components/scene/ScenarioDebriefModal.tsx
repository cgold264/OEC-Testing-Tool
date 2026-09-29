import React from 'react';
import { ScenarioCard } from '../../types/oec';
import { Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ScenarioDebriefModalProps {
  scenario: ScenarioCard;
  debriefText: string;
  onRestart: () => void;
  onClose: () => void;
}

export const ScenarioDebriefModal: React.FC<ScenarioDebriefModalProps> = ({
  scenario,
  debriefText,
  onRestart,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" /> Official OEC Evaluation Debrief
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">{scenario.title}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {scenario.location} &bull; Difficulty: {scenario.difficulty}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Ground Truth Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Hidden Clinical Truth
            </h4>
            <div className="space-y-1 text-sm text-slate-800">
              <p>
                <strong className="text-slate-900">Primary Diagnosis:</strong>{' '}
                {scenario.hiddenPathology.primary}
              </p>
              {scenario.hiddenPathology.secondary && (
                <p>
                  <strong className="text-slate-900">Secondary Injury:</strong>{' '}
                  {scenario.hiddenPathology.secondary}
                </p>
              )}
            </div>
          </div>

          {/* Facilitator Debrief */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Evaluator Analysis & Feedback
            </h4>
            <div className="p-5 rounded-2xl bg-red-50/40 border border-red-100 text-slate-800 text-sm leading-relaxed whitespace-pre-line">
              {debriefText}
            </div>
          </div>

          {/* Rubric Criteria Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Master OEC Rubric Requirements
            </h4>
            <div className="space-y-2">
              {scenario.scoringRubric.mustDo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
              {scenario.scoringRubric.criticalFails.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-red-700 bg-red-50 p-2 rounded-xl border border-red-100">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>Critical Fail:</strong> {item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Review Conversation
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow hover:bg-red-700 transition"
          >
            <RotateCcw className="w-4 h-4" /> Next Scenario
          </button>
        </div>
      </div>
    </div>
  );
};
