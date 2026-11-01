import { PracticeSession } from '../types/question';

const STORAGE_KEY = 'toefl_select_sentence_session_v1';

export function getInitialSession(passageIds: number[], isRandom: boolean = false): PracticeSession {
  return {
    version: 1,
    currentPassageIndex: 0,
    passageOrder: passageIds,
    answers: {},
    isCompleted: false,
    isRandomOrder: isRandom,
    startedAt: Date.now(),
    totalTimeSeconds: 0,
    fontSize: 19,
    timerEnabled: true,
  };
}

export function loadSession(passageIds: number[]): PracticeSession {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getInitialSession(passageIds);
    }
    const parsed = JSON.parse(raw) as PracticeSession;
    if (parsed && parsed.version === 1 && Array.isArray(parsed.passageOrder)) {
      const legacyFontSize = parsed.fontSize as unknown;
      const fontSize = legacyFontSize === 'large' ? 21 : legacyFontSize === 'normal' ? 19 : legacyFontSize;
      return { ...parsed, fontSize: [16, 18, 19, 21, 23, 25].includes(fontSize as number) ? fontSize as PracticeSession['fontSize'] : 19 };
    }
  } catch (e) {
    console.warn('Failed to parse saved session, returning fresh session', e);
  }
  return getInitialSession(passageIds);
}

export function saveSession(session: PracticeSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn('Failed to save session to localStorage', e);
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to remove session from localStorage', e);
  }
}
