import React from 'react';
import { Shield, Heart, Activity, Stethoscope, UserCheck, PackageCheck, AlertCircle } from 'lucide-react';

interface QuickActionChipsProps {
  onSelectAction: (text: string) => void;
  disabled?: boolean;
}

export const QuickActionChips: React.FC<QuickActionChipsProps> = ({ onSelectAction, disabled }) => {
  const actions = [
    { label: 'BSI & Scene Safety', text: 'BSI, is my scene safe and what is the mechanism of injury?', icon: Shield },
    { label: 'C-Spine & AVPU', text: 'I hold manual c-spine, check responsiveness (AVPU), and assess airway.', icon: UserCheck },
    { label: 'Full Vitals Check', text: 'I take a full set of vitals: pulse rate/quality, blood pressure, respirations, SpO2, and skin signs.', icon: Activity },
    { label: 'Expose & Chest Exam', text: 'I expose and inspect the chest, palpating for DCAP-BTLS and auscultating breath sounds.', icon: Stethoscope },
    { label: 'SAMPLE History', text: 'I ask the patient for their SAMPLE history (Signs/Symptoms, Allergies, Meds, Pertinent history, Last intake, Events).', icon: Heart },
    { label: 'Check Distal CSM x 4', text: 'I check circulation, sensation, and motor function (CSM) in all four extremities.', icon: AlertCircle },
    { label: 'Package & Call Transport', text: 'I initiate spinal motion restriction, package the patient in a vacuum mattress/toboggan, and request urgent ALS transport.', icon: PackageCheck }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
      {actions.map((act, idx) => {
        const Icon = act.icon;
        return (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectAction(act.text)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-sky-50 hover:text-red-700 hover:border-red-300 border border-sky-200 text-xs font-bold text-slate-700 whitespace-nowrap transition active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <Icon className="w-3.5 h-3.5 text-red-600" />
            {act.label}
          </button>
        );
      })}
    </div>
  );
};
