import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { FlashcardDeck } from './components/flashcards/FlashcardDeck';
import { ExamSimulator } from './components/exam/ExamSimulator';
import { SceneSimulator } from './components/scene/SceneSimulator';
import { SettingsModal } from './components/SettingsModal';
import { Mountain, Snowflake, Compass } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('flashcards');
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen winter-bg flex flex-col font-sans text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
        {activeTab === 'flashcards' && <FlashcardDeck />}
        {activeTab === 'exam' && <ExamSimulator />}
        {activeTab === 'scenarios' && (
          <SceneSimulator onOpenSettings={() => setSettingsOpen(true)} />
        )}
      </main>

      {/* Footer with Ski Patrol / Mountain Motif */}
      <footer className="mt-auto border-t border-sky-200/50 bg-white/70 backdrop-blur-sm text-slate-500 py-4 px-6 text-xs text-center hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-slate-600">
            <Mountain className="w-4 h-4 text-sky-600" />
            <span>Outdoor Emergency Care 6th Edition Study Companion</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-sky-400" />
              Mountain Coherence AI Simulator
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              National Ski Patrol Curriculum
            </span>
          </div>
        </div>
      </footer>

      {/* Settings & API Key Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default App;
