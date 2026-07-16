import type { DiagnosisAnswers, DiagnosisResult } from "./diagnosis";

const STORAGE_KEY = "homepilot:diagnosis-results";

export type SavedDiagnosis = {
  id: string;
  savedAt: string;
  answers: DiagnosisAnswers;
  result: DiagnosisResult;
};

function readAll(): SavedDiagnosis[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getLatestSavedDiagnosis(): SavedDiagnosis | null {
  const list = readAll();
  return list.length > 0 ? list[list.length - 1] : null;
}

export function saveDiagnosisResult(
  answers: DiagnosisAnswers,
  result: DiagnosisResult
): SavedDiagnosis {
  const entry: SavedDiagnosis = {
    id: `${Date.now()}`,
    savedAt: new Date().toISOString(),
    answers,
    result,
  };
  if (typeof window !== "undefined") {
    try {
      const list = readAll();
      list.push(entry);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // localStorage 접근 실패 시 저장을 건너뛴다.
    }
  }
  return entry;
}
