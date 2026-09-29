export interface Flashcard {
  id: string;
  chapter: number;
  domain: string;
  front: string;
  back: string;
  tags?: string[];
}

export interface ExamQuestion {
  id: string;
  chapter: number;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  moduleNumber?: number;
}

export interface OECDomain {
  id: string;
  name: string;
  chapters: number[];
  description: string;
}

export interface ExamSessionState {
  examId: string;
  questions: ExamQuestion[];
  userAnswers: Record<string, number>; // questionId -> optionIndex
  flaggedQuestionIds: string[];
  timeRemainingSeconds: number;
  isTimed: boolean;
  isCompleted: boolean;
  score?: {
    totalQuestions: number;
    correctCount: number;
    percentage: number;
    passed: boolean;
    domainBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
  };
}

export interface ScenarioPatientProfile {
  age: number;
  gender: string;
  activity: string;
  demeanor: string;
  position?: string;
}

export interface ScenarioInitialVitals {
  hr: number;
  bp: string;
  rr: number;
  spo2: string;
  skin: string;
  loc: string; // AVPU
}

export interface ScenarioPhysicalExam {
  headNeck: string;
  chest: string;
  abdomen: string;
  pelvis: string;
  extremities: string;
  backSpine: string;
}

export interface ScenarioSAMPLE {
  signsSymptoms: string;
  allergies: string;
  medications: string;
  pastHistory: string;
  lastOralIntake: string;
  eventsLeading: string;
}

export interface ScenarioHiddenPathology {
  primary: string;
  secondary?: string;
  initialVitals: ScenarioInitialVitals;
  physicalExam: ScenarioPhysicalExam;
  sampleHistory: ScenarioSAMPLE;
}

export interface ScenarioRubric {
  mustDo: string[];
  criticalFails: string[];
}

export interface ScenarioCard {
  id: string;
  title: string;
  difficulty: 'Standard' | 'Challenging' | 'Critical';
  location: string;
  weather: string;
  logistics: string;
  dispatchCall: string;
  patientProfile: ScenarioPatientProfile;
  hiddenPathology: ScenarioHiddenPathology;
  scoringRubric: ScenarioRubric;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'evaluator';
  content: string;
  timestamp: number;
}

export interface DiscoveredVitals {
  hr?: number;
  bp?: string;
  rr?: number;
  spo2?: string;
  skin?: string;
  loc?: string;
  revealedNotes: string[];
}

export interface ScenarioSession {
  scenario: ScenarioCard;
  messages: ChatMessage[];
  discoveredVitals: DiscoveredVitals;
  isConcluded: boolean;
  evaluatorDebrief?: string;
}
