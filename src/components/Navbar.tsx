import React from 'react';
import { Layers, CheckSquare, MessageSquareText, Settings, Snowflake, FileText } from 'lucide-react';

export type ActiveTab = 'flashcards' | 'exam' | 'scenarios';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenSettings }) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#040e1d] via-[#081b36] to-[#040e1d] border-b border-sky-500/25 text-white shadow-xl shadow-sky-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Ski Patrol Emblem */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onSelectTab('flashcards')}
          >
            <div className="relative">
              {/* Ski Patrol Cross Badge */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-black text-white shadow-md shadow-red-900/50 ring-2 ring-white/90 group-hover:scale-105 transition-transform">
                <span className="text-2xl leading-none font-bold text-white drop-shadow-sm">+</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-sky-400 border-2 border-slate-950 flex items-center justify-center">
                <Snowflake className="w-2.5 h-2.5 text-slate-950" />
              </div>
            </div>

            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2 text-white">
                OEC Prep
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-600 text-white font-black shadow-sm ring-1 ring-red-400/40">
                  SKI PATROL
                </span>
              </span>
              <p className="text-[11px] text-sky-200/70 hidden sm:block font-medium">
                Outdoor Emergency Care Study & Realistic Scene Simulation
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-sky-400/20 backdrop-blur-md shadow-inner">
            <button
              onClick={() => onSelectTab('flashcards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-950/40 ring-1 ring-white/20'
                  : 'text-sky-100 hover:text-white hover:bg-sky-950/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              Flashcards
            </button>

            <button
              onClick={() => onSelectTab('exam')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'exam'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-950/40 ring-1 ring-white/20'
                  : 'text-sky-100 hover:text-white hover:bg-sky-950/60'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              100-Q Exam
            </button>

            <button
              onClick={() => onSelectTab('scenarios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'scenarios'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-950/40 ring-1 ring-white/20'
                  : 'text-sky-100 hover:text-white hover:bg-sky-950/60'
              }`}
            >
              <MessageSquareText className="w-4 h-4" />
              Mountain Sim
            </button>
          </nav>

          {/* Right actions: Files & Settings */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => {
                const el = document.getElementById('files-dropdown');
                if (el) el.classList.toggle('hidden');
              }}
              className="p-2.5 rounded-xl text-sky-200 hover:text-white hover:bg-sky-950/80 border border-sky-400/10 hover:border-sky-400/30 transition-all shadow-sm"
              title="Download Resources"
            >
              <FileText className="w-5 h-5" />
            </button>
            
            <div id="files-dropdown" className="hidden absolute top-full right-12 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="p-2">
                <h4 className="text-xs font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">Resources</h4>
                <a 
                  href="/Patient Assessment.pdf" 
                  download 
                  className="block px-3 py-2 mt-1 text-sm text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                >
                  Patient Assessment PDF
                </a>
                <a 
                  href="/BoCo-Protocols_Oct-2025_Spinal.pdf" 
                  download 
                  className="block px-3 py-2 mt-1 text-sm text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                >
                  BoCo Spinal Protocols
                </a>
              </div>
            </div>

            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl text-sky-200 hover:text-white hover:bg-sky-950/80 border border-sky-400/10 hover:border-sky-400/30 transition-all shadow-sm"
              title="Settings & API Key"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#040e1d]/95 backdrop-blur-md border-t border-sky-400/25 py-2 px-4 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onSelectTab('flashcards')}
            className={`flex flex-col items-center py-1.5 px-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'flashcards'
                ? 'text-white bg-red-600 shadow-md shadow-red-950/50'
                : 'text-sky-300/80 hover:text-white'
            }`}
          >
            <Layers className="w-5 h-5 mb-1" />
            Flashcards
          </button>
          <button
            onClick={() => onSelectTab('exam')}
            className={`flex flex-col items-center py-1.5 px-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'exam'
                ? 'text-white bg-red-600 shadow-md shadow-red-950/50'
                : 'text-sky-300/80 hover:text-white'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-1" />
            100-Q Exam
          </button>
          <button
            onClick={() => onSelectTab('scenarios')}
            className={`flex flex-col items-center py-1.5 px-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'scenarios'
                ? 'text-white bg-red-600 shadow-md shadow-red-950/50'
                : 'text-sky-300/80 hover:text-white'
            }`}
          >
            <MessageSquareText className="w-5 h-5 mb-1" />
            Mountain Sim
          </button>
        </div>
      </div>
    </header>
  );
};
