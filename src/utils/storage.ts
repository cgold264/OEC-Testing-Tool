import { ExamSessionState } from '../types/oec';

const STORAGE_KEYS = {
  FLASHCARD_MASTERY: 'oec_flashcard_mastery',
  EXAM_HISTORY: 'oec_exam_history',
  ACTIVE_EXAM: 'oec_active_exam',
  API_KEY: 'oec_groq_api_key',
  LEGACY_API_KEY: 'oec_gemini_api_key',
  SCENARIO_SETTINGS: 'oec_scenario_settings'
};

export interface FlashcardProgress {
  masteredIds: string[];
  reviewIds: string[];
}

export interface StoredExamResult {
  id: string;
  date: string;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  passed: boolean;
  domainBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
}

export const Storage = {
  getFlashcardProgress(): FlashcardProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FLASHCARD_MASTERY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load flashcard progress:', e);
    }
    return { masteredIds: [], reviewIds: [] };
  },

  saveFlashcardProgress(progress: FlashcardProgress): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FLASHCARD_MASTERY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save flashcard progress:', e);
    }
  },

  markFlashcard(cardId: string, status: 'mastered' | 'review'): FlashcardProgress {
    const progress = this.getFlashcardProgress();
    const mastered = new Set(progress.masteredIds);
    const review = new Set(progress.reviewIds);

    if (status === 'mastered') {
      mastered.add(cardId);
      review.delete(cardId);
    } else {
      review.add(cardId);
      mastered.delete(cardId);
    }

    const updated = {
      masteredIds: Array.from(mastered),
      reviewIds: Array.from(review)
    };
    this.saveFlashcardProgress(updated);
    return updated;
  },

  resetFlashcardProgress(): void {
    localStorage.removeItem(STORAGE_KEYS.FLASHCARD_MASTERY);
  },

  getExamHistory(): StoredExamResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load exam history:', e);
    }
    return [];
  },

  saveExamResult(result: StoredExamResult): void {
    try {
      const history = this.getExamHistory();
      history.unshift(result);
      // keep latest 20 exams
      localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(history.slice(0, 20)));
    } catch (e) {
      console.error('Failed to save exam result:', e);
    }
  },

  getActiveExam(): ExamSessionState | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_EXAM);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load active exam:', e);
    }
    return null;
  },

  saveActiveExam(session: ExamSessionState | null): void {
    if (!session) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(session));
    }
  },

  getCustomApiKey(): string {
    return (
      localStorage.getItem(STORAGE_KEYS.API_KEY) ||
      localStorage.getItem(STORAGE_KEYS.LEGACY_API_KEY) ||
      ''
    );
  },

  setCustomApiKey(key: string): void {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
      localStorage.removeItem(STORAGE_KEYS.LEGACY_API_KEY);
    }
  },

  exportAllData(): string {
    const backup = {
      flashcards: this.getFlashcardProgress(),
      examHistory: this.getExamHistory(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.flashcards) this.saveFlashcardProgress(parsed.flashcards);
      if (parsed.examHistory) localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(parsed.examHistory));
      return true;
    } catch (e) {
      console.error('Failed to import backup data:', e);
      return false;
    }
  }
};
