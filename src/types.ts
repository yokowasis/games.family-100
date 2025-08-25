export interface Answer {
  word: string;
  points: number;
  rank: number;
}

export interface Question {
  id: number;
  image: string;
  title: string;
  answers: Answer[];
  category: string;
  totalAnswers: number;
  hints?: string[];
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  wrongAttempts: number;
  foundAnswers: Set<string>;
  gameStartTime: number;
  questionsCompleted: number;
  totalQuestions: number;
  lives: number;
  timeRemaining?: number;
  isRevealMode?: boolean; // true when player has lost and can click to reveal
  fromRevealMode?: boolean; // true when transitioning from reveal mode
  revealedLetters?: Map<string, Set<number>>; // Map of word -> set of revealed letter positions
}

export interface GameStats {
  totalCorrect: number;
  totalAttempts: number;
  averageTimePerQuestion: number;
  longestStreak: number;
  categoriesPlayed: string[];
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}