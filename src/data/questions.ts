import { ExamQuestion } from '../types/oec';

// Fallback baseline questions
export const BASELINE_SAMPLE_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q-01',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    question: 'You arrive at the scene of a skier who crashed into a trail marker. Which of the following is your absolute first priority?',
    options: [
      'Perform a rapid secondary trauma assessment',
      'Ensure scene safety and apply body substance isolation (BSI)',
      'Check for a responsive carotid pulse',
      'Assess distal circulation, sensation, and motor function'
    ],
    correctIndex: 1,
    explanation: 'Scene safety and BSI precautions are always the first priority before making patient contact to prevent the rescuer from becoming a second patient.'
  },
  {
    id: 'q-02',
    chapter: 5,
    domain: 'Domain 1: Foundations & Assessment',
    question: 'During your primary assessment of an unresponsive snowboarder, you find the airway obstructed by blood and emesis. What is the most appropriate initial action?',
    options: [
      'Immediately log-roll the patient onto their side and suction the airway',
      'Insert an oropharyngeal airway without suctioning',
      'Perform 30 chest compressions',
      'Apply a non-rebreather mask at 15 LPM'
    ],
    correctIndex: 0,
    explanation: 'An obstructed airway must be cleared immediately. Log-rolling while maintaining cervical spine precautions allows gravity and suctioning to clear vomit and blood.'
  },
  {
    id: 'q-03',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    question: 'A 45-year-old skier reports sudden crushing retrosternal chest pain. When asking "Does the pain travel to your shoulder, jaw, or arm?", which component of OPQRST are you assessing?',
    options: [
      'Onset',
      'Provocation',
      'Radiation',
      'Severity'
    ],
    correctIndex: 2,
    explanation: 'Radiation evaluates whether pain or discomfort moves from its origin to other areas, common in cardiac ischemia.'
  },
  {
    id: 'q-04',
    chapter: 6,
    domain: 'Domain 1: Foundations & Assessment',
    question: 'Which of the following vital sign combinations is most concerning for decompensating hemorrhagic shock in an adult trauma patient?',
    options: [
      'Heart rate 72 bpm, BP 122/78 mmHg, RR 16',
      'Heart rate 136 bpm, BP 84/52 mmHg, RR 28 shallow',
      'Heart rate 56 bpm, BP 178/90 mmHg, RR 12 irregular',
      'Heart rate 92 bpm, BP 130/84 mmHg, RR 20'
    ],
    correctIndex: 1,
    explanation: 'Marked tachycardia combined with hypotension (systolic BP < 90 mmHg) and tachypnea indicates late decompensated hypovolemic shock.'
  },
  {
    id: 'q-05',
    chapter: 14,
    domain: 'Domain 2: Trauma & Shock',
    question: 'A skier hits a lift tower and presents with severe shortness of breath, absent breath sounds on the left, cyanosis, and distended neck veins. What life-threatening condition is suspected?',
    options: [
      'Simple pneumothorax',
      'Tension pneumothorax',
      'Pericardial effusion',
      'Traumatic asphyxia'
    ],
    correctIndex: 1,
    explanation: 'Absent unilateral breath sounds combined with JVD, cyanosis, and progressive shock are classic signs of tension pneumothorax requiring urgent evacuation.'
  }
];

// Clean boilerplate text artifacts from LMS (e.g. "* Required", "award up to 1 point")
function cleanQuestionText(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .replace(/\s*Some features of this page are not accessible.*$/i, '')
    .replace(/\s*award up to \d+ points?.*$/i, '')
    .replace(/\s*\(\d+\s*points?\).*$/i, '')
    .replace(/^\*?\s*(required|mandatory)\s*/i, '')
    .trim();
}

// Dynamically load all module JSON files from src/data using Vite's import.meta.glob
const moduleFiles = import.meta.glob<Record<string, unknown>>('./oec-topclass-questions-*.json', {
  eager: true
});

function loadAllTopclassQuestions(): ExamQuestion[] {
  const loadedQuestions: ExamQuestion[] = [];

  // Sort file keys to maintain module order (module-1, module-2, ..., module-10, module-11)
  const sortedFileKeys = Object.keys(moduleFiles).sort((a, b) => {
    const numA = parseInt(a.match(/module-(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(b.match(/module-(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  });

  sortedFileKeys.forEach((path) => {
    const moduleMatch = path.match(/module-(\d+)/);
    const moduleNum = moduleMatch ? parseInt(moduleMatch[1], 10) : undefined;
    const rawData = moduleFiles[path] as unknown;

    const list = Array.isArray(rawData)
      ? rawData
      : (rawData as { default?: unknown[] })?.default || [];

    if (Array.isArray(list)) {
      list.forEach((item: Partial<ExamQuestion>, index: number) => {
        if (item.question && Array.isArray(item.options) && item.options.length >= 2) {
          const cleanedText = cleanQuestionText(item.question);
          loadedQuestions.push({
            id: item.id || `module-${moduleNum || 0}-q-${index + 1}`,
            chapter: item.chapter || (moduleNum ? moduleNum * 3 : 5),
            domain: moduleNum ? `Module ${moduleNum}` : (item.domain || 'General OEC'),
            question: cleanedText || item.question,
            options: item.options.map((opt) => cleanQuestionText(opt)),
            correctIndex: typeof item.correctIndex === 'number' ? item.correctIndex : 0,
            explanation: item.explanation || 'Official National Ski Patrol / OEC curriculum question.',
            moduleNumber: moduleNum
          });
        }
      });
    }
  });

  return loadedQuestions;
}

export const TOPCLASS_QUESTIONS: ExamQuestion[] = loadAllTopclassQuestions();

// Master list of all questions available
export const ALL_QUESTIONS: ExamQuestion[] =
  TOPCLASS_QUESTIONS.length > 0 ? TOPCLASS_QUESTIONS : BASELINE_SAMPLE_QUESTIONS;

export const SAMPLE_QUESTIONS = ALL_QUESTIONS;

// Get available module numbers from loaded questions
export function getAvailableModules(): number[] {
  const modules = new Set<number>();
  ALL_QUESTIONS.forEach((q) => {
    if (q.moduleNumber) modules.add(q.moduleNumber);
  });
  return Array.from(modules).sort((a, b) => a - b);
}

// Fisher-Yates Shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export type ExamMode = '100-random' | '20-random' | 'all-shuffled' | 'module';

export function getExamQuestions(mode: ExamMode, targetModule?: number): ExamQuestion[] {
  if (mode === 'module' && targetModule !== undefined) {
    const moduleQs = ALL_QUESTIONS.filter((q) => q.moduleNumber === targetModule);
    return shuffleArray(moduleQs);
  }

  const shuffledAll = shuffleArray(ALL_QUESTIONS);

  if (mode === '20-random') {
    return shuffledAll.slice(0, Math.min(20, shuffledAll.length));
  }

  if (mode === '100-random') {
    return shuffledAll.slice(0, Math.min(100, shuffledAll.length));
  }

  // 'all-shuffled': Full bank in randomized order so user sees 100% of all questions
  return shuffledAll;
}
