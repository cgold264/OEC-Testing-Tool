import React from 'react';
import { DiscoveredVitals, ScenarioCard } from '../../types/oec';
import { ClipboardList, ChevronDown, ChevronUp, Heart, Activity, Wind, Droplets, User, Mountain, Snowflake } from 'lucide-react';

interface PatrolClipboardProps {
  scenario: ScenarioCard;
  vitals: DiscoveredVitals;
  isOpen: boolean;
  onToggle: () => void;
}

export const PatrolClipboard: React.FC<PatrolClipboardProps> = ({
  scenario,
  vitals,
  isOpen,
  onToggle
}) => {
  return (
    <div className="frost-card rounded-2xl shadow-md overflow-hidden mb-4 transition-all border border-sky-200">
      {/* Header Toggle with Ski Patrol Emblem */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 bg-gradient-to-r from-[#040e1d] via-[#081b36] to-[#040e1d] text-white flex items-center justify-between text-left border-b border-sky-500/20"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-red-600 flex items-center justify-center font-bold text-white text-xs ring-1 ring-white/60 shadow-sm">
            +
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-sky-400" />
            Patrol Run Form & Vitals Telemetry
          </span>
          <span className="text-[10px] bg-red-600/40 text-red-200 border border-red-500/40 px-2 py-0.5 rounded-full font-bold">
            {scenario.patientProfile.age}yo {scenario.patientProfile.gender}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sky-300 text-xs font-semibold">
          <span>{isOpen ? 'Collapse' : 'Expand Form'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-4 bg-sky-50/30 space-y-4 text-xs sm:text-sm">
          {/* Dispatch & Environment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-white/95 p-3 rounded-xl border border-sky-200 shadow-sm">
              <span className="text-sky-700 font-bold block text-[10px] uppercase tracking-wider flex items-center gap-1 mb-0.5">
                <Mountain className="w-3 h-3 text-sky-500" /> Location & Position
              </span>
              <span className="text-slate-800 font-semibold block">{scenario.location}</span>
              {scenario.patientProfile.position && (
                <span className="text-slate-600 block text-[11px] mt-1 font-normal">{scenario.patientProfile.position}</span>
              )}
            </div>
            <div className="bg-white/95 p-3 rounded-xl border border-sky-200 shadow-sm">
              <span className="text-sky-700 font-bold block text-[10px] uppercase tracking-wider flex items-center gap-1 mb-0.5">
                <Snowflake className="w-3 h-3 text-sky-500" /> Weather Condition
              </span>
              <span className="text-slate-800 font-medium">{scenario.weather}</span>
            </div>
          </div>

          {/* Vitals Grid */}
          <div>
            <h4 className="font-bold text-sky-900 text-xs mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-red-600" /> Discovered Patient Vitals
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div className="bg-white/95 p-2.5 rounded-xl border border-sky-200 text-center shadow-sm">
                <span className="text-[10px] text-sky-700 font-bold uppercase block flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-red-500" /> Pulse (HR)
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  {vitals.hr ? `${vitals.hr} bpm` : '--'}
                </span>
              </div>

              <div className="bg-white/95 p-2.5 rounded-xl border border-sky-200 text-center shadow-sm">
                <span className="text-[10px] text-sky-700 font-bold uppercase block flex items-center justify-center gap-1">
                  <Activity className="w-3 h-3 text-sky-600" /> BP
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">{vitals.bp || '--/--'}</span>
              </div>

              <div className="bg-white/95 p-2.5 rounded-xl border border-sky-200 text-center shadow-sm">
                <span className="text-[10px] text-sky-700 font-bold uppercase block flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3 text-teal-600" /> Resp (RR)
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  {vitals.rr ? `${vitals.rr} /min` : '--'}
                </span>
              </div>

              <div className="bg-white/95 p-2.5 rounded-xl border border-sky-200 text-center shadow-sm">
                <span className="text-[10px] text-sky-700 font-bold uppercase block flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-600" /> SpO2
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">{vitals.spo2 || '--%'}</span>
              </div>

              <div className="bg-white/95 p-2.5 rounded-xl border border-sky-200 text-center col-span-2 sm:col-span-1 shadow-sm">
                <span className="text-[10px] text-sky-700 font-bold uppercase block flex items-center justify-center gap-1">
                  <User className="w-3 h-3 text-amber-600" /> LOC (AVPU)
                </span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">{vitals.loc || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
