/**
 * Hint System Utilities
 * Manages hint levels and history per problem in localStorage
 */

export interface HintHistory {
  level: number;
  hint: string;
  timestamp: number;
}

export interface ProblemHints {
  problemId: string;
  problem: string;
  hints: HintHistory[];
  currentLevel: number;
}

const STORAGE_KEY = 'tutorpy_hints';

/**
 * Generate a problem ID from the problem text
 */
export function getProblemId(problem: string): string {
  // Create a simple hash from problem text
  let hash = 0;
  for (let i = 0; i < problem.length; i++) {
    const char = problem.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `problem_${Math.abs(hash)}`;
}

/**
 * Get hint data for a problem
 */
export function getProblemHints(problem: string): ProblemHints {
  const problemId = getProblemId(problem);
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (!stored) {
    return {
      problemId,
      problem,
      hints: [],
      currentLevel: 0,
    };
  }

  try {
    const allHints: Record<string, ProblemHints> = JSON.parse(stored);
    return allHints[problemId] || {
      problemId,
      problem,
      hints: [],
      currentLevel: 0,
    };
  } catch {
    return {
      problemId,
      problem,
      hints: [],
      currentLevel: 0,
    };
  }
}

/**
 * Save hint data for a problem
 */
export function saveProblemHints(hints: ProblemHints): void {
  const stored = localStorage.getItem(STORAGE_KEY);
  let allHints: Record<string, ProblemHints> = {};
  
  if (stored) {
    try {
      allHints = JSON.parse(stored);
    } catch {
      allHints = {};
    }
  }

  allHints[hints.problemId] = hints;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allHints));
}

/**
 * Add a new hint and increment level
 */
export function addHint(problem: string, hint: string): ProblemHints {
  const problemHints = getProblemHints(problem);
  const newLevel = problemHints.currentLevel + 1;

  const newHint: HintHistory = {
    level: newLevel,
    hint,
    timestamp: Date.now(),
  };

  const updated: ProblemHints = {
    ...problemHints,
    hints: [...problemHints.hints, newHint],
    currentLevel: newLevel,
  };

  saveProblemHints(updated);
  return updated;
}

/**
 * Reset hints for a problem
 */
export function resetHints(problem: string): void {
  const problemId = getProblemId(problem);
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (!stored) return;

  try {
    const allHints: Record<string, ProblemHints> = JSON.parse(stored);
    delete allHints[problemId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allHints));
  } catch {
    // Ignore errors
  }
}

/**
 * Get hint history as formatted string
 */
export function getHintHistoryString(problemHints: ProblemHints): string {
  if (problemHints.hints.length === 0) {
    return "No previous hints given.";
  }

  return problemHints.hints
    .map((h) => `Level ${h.level}: ${h.hint}`)
    .join('\n');
}
