import React, { useState, useEffect, useRef } from 'react';
import {
  MOUNTAIN_COHERENCE_MATRIX,
  getRandomScenarioSkeleton
} from '../../data/coherenceMatrix';
import { ScenarioCard, ChatMessage, DiscoveredVitals } from '../../types/oec';
import { PatrolClipboard } from './PatrolClipboard';
import { QuickActionChips } from './QuickActionChips';
import { ScenarioDebriefModal } from './ScenarioDebriefModal';
import { Storage } from '../../utils/storage';
import {
  Send,
  RotateCcw,
  Mountain,
  Loader2,
  PackageCheck,
  ShieldAlert,
  Key,
  X,
  Snowflake
} from 'lucide-react';

export const SceneSimulator: React.FC<{ onOpenSettings: () => void }> = ({ onOpenSettings }) => {
  const [selectedSettingId, setSelectedSettingId] = useState<string>('random');
  const [scenario, setScenario] = useState<ScenarioCard | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [discoveredVitals, setDiscoveredVitals] = useState<DiscoveredVitals>({
    revealedNotes: []
  });
  const [clipboardOpen, setClipboardOpen] = useState(true);
  const [debriefText, setDebriefText] = useState<string | null>(null);
  const [showDebriefModal, setShowDebriefModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Generate a new scenario using coherence matrix + Gemini (with local fallback)
  const generateNewScenario = async (settingId: string) => {
    setIsGenerating(true);
    setErrorMessage(null);
    setDebriefText(null);
    setShowDebriefModal(false);

    let skeleton;
    if (settingId === 'random') {
      skeleton = getRandomScenarioSkeleton();
    } else {
      const foundSetting = MOUNTAIN_COHERENCE_MATRIX.find((s) => s.id === settingId)!;
      const pathology = foundSetting.compatiblePathologies[0];
      const arch = foundSetting.patientArchetypes[0];
      skeleton = {
        setting: foundSetting,
        pathology,
        patient: {
          age: arch.ageRange[0] + 5,
          gender: arch.genders[0],
          activity: arch.activities[0],
          demeanor: arch.demeanors[0]
        },
        mechanism: foundSetting.compatibleMechanisms[0]
      };
    }

    const payload = {
      locationName: skeleton.setting.locationName,
      defaultWeather: skeleton.setting.defaultWeather,
      logistics: skeleton.setting.logistics,
      patient: skeleton.patient,
      mechanism: skeleton.mechanism,
      pathology: skeleton.pathology
    };

    const apiKey = Storage.getCustomApiKey();

    try {
      const res = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-groq-key': apiKey, 'x-api-key': apiKey, 'x-gemini-key': apiKey } : {})
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.scenarioCard) {
          initializeScenarioWithCard(data.scenarioCard);
          setIsGenerating(false);
          return;
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        const rawErr = errData.error || `Failed to generate scenario (${res.status})`;
        setErrorMessage(rawErr);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('API scenario generation failed:', e);
      setErrorMessage(`Network Error: ${msg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Offline deterministic builder for testing without API keys
  const initializeOfflineScenario = (skeleton: ReturnType<typeof getRandomScenarioSkeleton>) => {
    const card: ScenarioCard = {
      id: `local-scen-${Date.now()}`,
      title: skeleton.pathology.title,
      difficulty: skeleton.pathology.difficulty,
      location: skeleton.setting.locationName,
      weather: skeleton.setting.defaultWeather,
      logistics: skeleton.setting.logistics,
      dispatchCall: `Dispatch to Patroller: Respond to ${skeleton.setting.locationName}. Bystander reports a ${skeleton.patient.age}-year-old ${skeleton.patient.activity} down following a ${skeleton.mechanism.toLowerCase()}.`,
      patientProfile: {
        age: skeleton.patient.age,
        gender: skeleton.patient.gender,
        activity: skeleton.patient.activity,
        demeanor: skeleton.patient.demeanor,
        position: 'lying supine on the snowpack, motionless with skis released'
      },
      hiddenPathology: {
        primary: skeleton.pathology.primary,
        secondary: skeleton.pathology.secondary,
        initialVitals: {
          hr: 124,
          bp: '96/60',
          rr: 26,
          spo2: '90%',
          skin: 'Pale, cool, clammy',
          loc: 'Responds to Verbal / Pain'
        },
        physicalExam: {
          headNeck: 'C-spine tenderness present upon palpation; no tracheal deviation',
          chest: 'Unequal chest rise; diminished breath sounds on right side with crepitus',
          abdomen: 'Soft, non-distended, non-tender to light palpation',
          pelvis: 'Stable to gentle inward-downward compression',
          extremities: 'Deformity noted matching mechanism; distal pulses intact x 4',
          backSpine: 'No palpable deformities or step-offs'
        },
        sampleHistory: {
          signsSymptoms: 'Severe localized pain, dyspnea, nausea',
          allergies: 'No known drug allergies (NKDA)',
          medications: 'None',
          pastHistory: 'Healthy, no prior cardiopulmonary history',
          lastOralIntake: 'Energy bar and water 2 hours ago',
          eventsLeading: skeleton.mechanism
        }
      },
      scoringRubric: {
        mustDo: skeleton.pathology.mustDo,
        criticalFails: skeleton.pathology.criticalFails
      }
    };
    initializeScenarioWithCard(card);
  };

  const initializeScenarioWithCard = (card: ScenarioCard) => {
    setScenario(card);
    setDiscoveredVitals({ revealedNotes: [] });
    const positionText = card.patientProfile.position
      ? `The patient is found ${card.patientProfile.position}.`
      : 'The patient is found down on the snow.';

    setMessages([
      {
        id: 'msg-0',
        role: 'system',
        content: `🏔️ SCENARIO INITIALIZED\n${card.dispatchCall}\n\nArrival: You arrive at ${card.location}. ${positionText}\n\nThe candidate drives the evaluation.`,
        timestamp: Date.now()
      }
    ]);
  };

  // Start initial scenario on load
  useEffect(() => {
    generateNewScenario('random');
  }, []);

  // Parse discovered vitals from LLM assistant text
  const parseDiscoveredVitals = (text: string) => {
    setDiscoveredVitals((prev) => {
      const updated = { ...prev };
      // Look for pulse/HR
      const hrMatch = text.match(/(?:pulse|hr|heart rate)\s*(?:is|of|:)?\s*(\d{2,3})\s*(?:bpm)?/i);
      if (hrMatch) updated.hr = parseInt(hrMatch[1], 10);

      // Look for BP
      const bpMatch = text.match(/(?:bp|blood pressure)\s*(?:is|of|:)?\s*(\d{2,3}\s*\/\s*\d{2,3})/i);
      if (bpMatch) updated.bp = bpMatch[1].replace(/\s+/g, '');

      // Look for RR
      const rrMatch = text.match(/(?:respirations|resp|rr)\s*(?:is|of|:)?\s*(\d{1,2})\s*(?:\/min)?/i);
      if (rrMatch) updated.rr = parseInt(rrMatch[1], 10);

      // Look for SpO2
      const spo2Match = text.match(/(?:spo2|pulse ox|o2 saturation)\s*(?:is|of|:)?\s*(\d{2,3}%)/i);
      if (spo2Match) updated.spo2 = spo2Match[1];

      // Look for LOC / AVPU
      if (/alert/i.test(text)) updated.loc = 'Alert';
      else if (/verbal/i.test(text)) updated.loc = 'Verbal';
      else if (/pain/i.test(text)) updated.loc = 'Pain';
      else if (/unresponsive/i.test(text)) updated.loc = 'Unresponsive';

      return updated;
    });
  };

  const handleSendMessage = async (textToSend?: string, isConcluding: boolean = false) => {
    const text = textToSend || inputText;
    if (!text.trim() || !scenario || isLoading) return;

    setInputText('');
    setErrorMessage(null);

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    const apiKey = Storage.getCustomApiKey();

    try {
      const res = await fetch('/api/scenario-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-groq-key': apiKey, 'x-api-key': apiKey, 'x-gemini-key': apiKey } : {})
        },
        body: JSON.stringify({
          scenarioCard: scenario,
          messages: newHistory
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map((m) => ({ role: m.role, content: m.content })),
          isEvaluating: isConcluding
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply;

        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          role: isConcluding ? 'evaluator' : 'assistant',
          content: replyText,
          timestamp: Date.now()
        };

        setMessages((prev) => [...prev, assistantMsg]);
        parseDiscoveredVitals(replyText);

        if (isConcluding) {
          setDebriefText(replyText);
          setShowDebriefModal(true);
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        const rawErr = errData.error || `Server error ${res.status}: ${res.statusText}`;
        setErrorMessage(rawErr);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('Request failed:', e);
      setErrorMessage(`Network Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 flex flex-col h-[calc(100vh-5rem)]">
      {/* Top Bar / Category Selector */}
      <div className="flex items-center justify-between gap-3 mb-3 pb-2 sm:mb-4 sm:pb-3 border-b border-sky-200">
        <div>
          <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 bg-sky-100/90 border border-sky-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Snowflake className="w-3 h-3 text-sky-600" />
              Ski Patrol Incident Dispatch
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
            <Mountain className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            Mountain Scene Simulator
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            Reactive proctor & patient actor with deterministic mountain coherence guardrails
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSettingId}
            onChange={(e) => {
              setSelectedSettingId(e.target.value);
              generateNewScenario(e.target.value);
            }}
            disabled={isGenerating}
            className="hidden sm:block text-xs py-2 px-3 bg-white/95 border border-sky-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-slate-700"
          >
            <option value="random">🎲 Random Mountain Incident</option>
            {MOUNTAIN_COHERENCE_MATRIX.map((s) => (
              <option key={s.id} value={s.id}>
                {s.locationName.slice(0, 32)}...
              </option>
            ))}
          </select>

          <button
            onClick={() => generateNewScenario(selectedSettingId)}
            disabled={isGenerating}
            title="Generate New Scenario"
            className="flex items-center gap-1 px-3 sm:px-3.5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl text-xs font-bold shadow-md hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 shrink-0"
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RotateCcw className="w-3.5 h-3.5" />
            )}
            <span>New Case</span>
          </button>
        </div>
      </div>

      {/* Prominent API / Error Banner */}
      {errorMessage && (
        <div className="p-3.5 mb-3 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-900 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2 pr-2">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <span className="font-medium break-all">{errorMessage}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSettings}
              className="px-3 py-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-xs shadow-sm flex items-center gap-1"
            >
              <Key className="w-3.5 h-3.5" />
              Configure Groq Key
            </button>
            <button
              onClick={() => setErrorMessage(null)}
              className="p-1 text-red-400 hover:text-red-700 rounded transition"
              title="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Loading state when generating scenario */}
      {isGenerating && (
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-3" />
          <h3 className="text-base font-semibold text-slate-800">Generating OEC Mountain Scenario...</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Contacting Groq (openai/gpt-oss-120b) to design a clinically coherent ski patrol simulation case.
          </p>
        </div>
      )}

      {/* Empty / Error setup card when no scenario is loaded */}
      {!scenario && !isGenerating && (
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm space-y-4">
          <div className="w-14 h-14 bg-red-50 text-red-600 border border-red-200 rounded-2xl flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {errorMessage ? 'Simulation Error' : 'Mountain Scene Simulator Ready'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1">
              {errorMessage ||
                'To simulate realistic ski patrol field evaluations with dynamic proctoring, connect your free Groq API key.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center pt-2">
            <button
              onClick={onOpenSettings}
              className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-red-700 transition flex items-center gap-1.5 shadow"
            >
              <Key className="w-4 h-4" />
              Configure Groq API Key
            </button>
            <button
              onClick={() => generateNewScenario(selectedSettingId)}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Generation
            </button>
            <button
              onClick={() => {
                setErrorMessage(null);
                initializeOfflineScenario(getRandomScenarioSkeleton());
              }}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium hover:bg-slate-200 transition"
            >
              Play Offline Practice Case
            </button>
          </div>
        </div>
      )}

      {/* Active Scenario Content */}
      {scenario && !isGenerating && (
        <>
          {/* Patrol Clipboard (Hidden on mobile to save vertical space) */}
          <div className="hidden sm:block">
            <PatrolClipboard
              scenario={scenario}
              vitals={discoveredVitals}
              isOpen={clipboardOpen}
              onToggle={() => setClipboardOpen((p) => !p)}
            />
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 frost-card rounded-3xl p-4 sm:p-6 shadow-md overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const isSystem = msg.role === 'system';
              const isEvaluator = msg.role === 'evaluator';

              if (isSystem) {
                return (
                  <div
                    key={msg.id}
                    className="bg-gradient-to-r from-[#040e1d] to-[#081a33] border border-sky-500/40 text-sky-100 rounded-2xl p-4 text-xs sm:text-sm font-mono whitespace-pre-line leading-relaxed shadow-lg ring-1 ring-white/10"
                  >
                    <div className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px] mb-2 uppercase tracking-widest border-b border-sky-800/60 pb-1.5">
                      <Snowflake className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                      Ski Patrol VHF Radio Dispatch & Coherence Matrix
                    </div>
                    {msg.content}
                  </div>
                );
              }

              if (isEvaluator) {
                return (
                  <div
                    key={msg.id}
                    className="alpine-night-card rounded-2xl p-5 text-xs sm:text-sm whitespace-pre-line leading-relaxed shadow-xl text-white"
                  >
                    <div className="font-extrabold text-red-400 uppercase tracking-widest text-xs mb-2 flex items-center gap-1.5 pb-2 border-b border-sky-900/50">
                      <PackageCheck className="w-4 h-4 text-red-500" />
                      Official OEC Evaluator Debrief & Scoring Rubric
                    </div>
                    <div className="text-sky-50 font-normal leading-relaxed">{msg.content}</div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-bold text-sky-800 mb-1 px-1 tracking-wider uppercase">
                    {isUser ? 'Patroller (You)' : 'Facilitator & Patient'}
                  </span>
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-none shadow-md ring-1 ring-white/20'
                        : 'bg-white/95 text-slate-800 rounded-bl-none border border-sky-200 shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                <span>Facilitator is assessing clinical response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="mb-2">
            <QuickActionChips
              onSelectAction={(text) => handleSendMessage(text)}
              disabled={isLoading || isGenerating}
            />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: I check pupils with penlight, palpate c-spine, and ask SAMPLE..."
              disabled={isLoading || isGenerating}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white/95 border border-sky-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-slate-50 font-medium"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading || isGenerating}
              className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-md hover:from-red-700 hover:to-red-800 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() =>
                handleSendMessage(
                  'I initiate full packaging, secure patient in toboggan, and request urgent transport intercept.',
                  true
                )
              }
              title="Conclude scenario and receive evaluator debrief"
              disabled={isLoading || isGenerating}
              className="px-4 py-3 bg-gradient-to-r from-[#040e1d] to-[#091b35] text-white rounded-2xl text-xs font-bold shadow-md hover:from-slate-900 hover:to-slate-800 transition flex items-center gap-1.5 shrink-0 border border-sky-400/20"
            >
              <PackageCheck className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Conclude & Debrief</span>
            </button>
          </form>
        </>
      )}

      {/* Debrief Modal */}
      {showDebriefModal && scenario && debriefText && (
        <ScenarioDebriefModal
          scenario={scenario}
          debriefText={debriefText}
          onRestart={() => generateNewScenario(selectedSettingId)}
          onClose={() => setShowDebriefModal(false)}
        />
      )}
    </div>
  );
};
