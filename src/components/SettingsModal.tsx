import React, { useState, useEffect } from 'react';
import { X, Key, Download, Upload, Check } from 'lucide-react';
import { Storage } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(Storage.getCustomApiKey());
      setSaveStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    Storage.setCustomApiKey(apiKey);
    setSaveStatus('API Key saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleExportData = () => {
    const data = Storage.exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oec-study-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text && Storage.importData(text)) {
        setSaveStatus('Data restored successfully! Refreshing...');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setSaveStatus('Failed to parse backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-lg">Settings & API Setup</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Groq API Key */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1">
              Groq API Key (100% Free &bull; No Credit Card Required)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Powers the Mountain Scene Simulator with Groq AI (<code className="bg-slate-100 px-1 py-0.5 rounded text-red-600">openai/gpt-oss-120b</code>). If deployed on Cloudflare Pages or locally, you can also configure <code className="bg-slate-100 px-1 py-0.5 rounded text-red-600">GROQ_API_KEY</code> in <code className="bg-slate-100 px-1 py-0.5 rounded">.dev.vars</code>.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
              >
                Save
              </button>
            </div>
            {saveStatus && (
              <p className="mt-2 text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" /> {saveStatus}
              </p>
            )}
            <p className="mt-2 text-[11px] text-slate-500">
              Get your free key in 30 seconds (no billing needed) at{' '}
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="text-red-600 underline font-medium"
              >
                console.groq.com/keys
              </a>
              .
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Backup & Restore */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-1">Study Progress Backup</h4>
            <p className="text-xs text-slate-500 mb-3">
              Export your flashcard mastery and practice exam score records to a JSON file.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Export Backup
              </button>
              <label className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" />
                Import Backup
                <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
