import type { Question, GameState, Answer } from './types';

export class FamilyGame {
  private gameState: GameState;
  private questions: Question[];
  private currentQuestion: Question;
  private onScoreUpdate: (score: number) => void;
  private onStreakUpdate: (streak: number) => void;
  private onAnswerFound: (answer: Answer) => void;
  private onWrongAnswer: (attempts: number) => void;
  private onQuestionComplete: () => void;
  private onGameComplete: (finalScore: number) => void;

  constructor(
    questions: Question[],
    callbacks: {
      onScoreUpdate: (score: number) => void;
      onStreakUpdate: (streak: number) => void;
      onAnswerFound: (answer: Answer) => void;
      onWrongAnswer: (attempts: number) => void;
      onQuestionComplete: () => void;
      onGameComplete: (finalScore: number) => void;
    }
  ) {
    this.questions = questions;
    this.currentQuestion = questions[0];
    this.onScoreUpdate = callbacks.onScoreUpdate;
    this.onStreakUpdate = callbacks.onStreakUpdate;
    this.onAnswerFound = callbacks.onAnswerFound;
    this.onWrongAnswer = callbacks.onWrongAnswer;
    this.onQuestionComplete = callbacks.onQuestionComplete;
    this.onGameComplete = callbacks.onGameComplete;

    this.gameState = {
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      wrongAttempts: 0,
      foundAnswers: new Set(),
      gameStartTime: Date.now(),
      questionsCompleted: 0,
      totalQuestions: questions.length,
      lives: 3,
      isRevealMode: false,
      fromRevealMode: false,
      revealedLetters: new Map()
    };
  }

  getCurrentQuestion(): Question {
    return this.currentQuestion;
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }

  getFoundAnswers(): Answer[] {
    return this.currentQuestion.answers.filter(answer => 
      this.gameState.foundAnswers.has(answer.word.toLowerCase())
    );
  }

  getRemainingAnswers(): Answer[] {
    return this.currentQuestion.answers.filter(answer => 
      !this.gameState.foundAnswers.has(answer.word.toLowerCase())
    );
  }

  submitAnswer(input: string): { 
    success: boolean; 
    answer?: Answer; 
    isNewAnswer: boolean;
    message: string;
  } {
    const cleanInput = input.trim().toLowerCase();
    
    if (!cleanInput) {
      return {
        success: false,
        isNewAnswer: false,
        message: 'Please enter an answer!'
      };
    }

    // Check if answer exists and hasn't been found
    const foundAnswer = this.currentQuestion.answers.find(
      answer => answer.word.toLowerCase() === cleanInput
    );

    if (foundAnswer) {
      const isNewAnswer = !this.gameState.foundAnswers.has(cleanInput);
      
      if (isNewAnswer) {
        // Add to found answers
        this.gameState.foundAnswers.add(cleanInput);
        
        // Calculate score with streak multiplier
        const streakMultiplier = this.calculateStreakMultiplier();
        const points = Math.round(foundAnswer.points * streakMultiplier);
        
        this.gameState.score += points;
        this.gameState.streak++;
        this.gameState.wrongAttempts = 0; // Reset wrong attempts on correct answer
        
        // Trigger callbacks
        this.onScoreUpdate(this.gameState.score);
        this.onStreakUpdate(this.gameState.streak);
        this.onAnswerFound(foundAnswer);

        // Check if all answers found
        if (this.gameState.foundAnswers.size === this.currentQuestion.totalAnswers) {
          this.completeQuestion();
        }

        return {
          success: true,
          answer: foundAnswer,
          isNewAnswer: true,
          message: `Correct! +${points} points${streakMultiplier > 1 ? ` (${streakMultiplier}x streak bonus!)` : ''}`
        };
      } else {
        return {
          success: true,
          answer: foundAnswer,
          isNewAnswer: false,
          message: 'You already found that answer!'
        };
      }
    } else {
      // Wrong answer
      this.gameState.wrongAttempts++;
      this.gameState.streak = 0; // Reset streak on wrong answer
      
      this.onWrongAnswer(this.gameState.wrongAttempts);
      this.onStreakUpdate(0);

      // Check if max attempts reached (3 strikes)
      if (this.gameState.wrongAttempts >= 3) {
        this.gameState.isRevealMode = true;
        return {
          success: false,
          isNewAnswer: false,
          message: 'Three strikes! Click on the unrevealed answers to see what you missed, then continue.'
        };
      }

      const attemptsLeft = 3 - this.gameState.wrongAttempts;
      return {
        success: false,
        isNewAnswer: false,
        message: `Not quite right. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} left.`
      };
    }
  }

  private calculateStreakMultiplier(): number {
    if (this.gameState.streak >= 10) return 3;
    if (this.gameState.streak >= 5) return 2;
    if (this.gameState.streak >= 3) return 1.5;
    return 1;
  }

  getHint(): string | null {
    const hints = this.currentQuestion.hints;
    if (!hints || hints.length === 0) return null;
    
    // Return hint based on wrong attempts
    const hintIndex = Math.min(this.gameState.wrongAttempts, hints.length - 1);
    return hints[hintIndex];
  }

  getLetterHint(): { word: string; revealedPositions: number[] } | null {
    // Get a random unrevealed answer
    const unrevealedAnswers = this.currentQuestion.answers.filter(answer => 
      !this.gameState.foundAnswers.has(answer.word.toLowerCase())
    );
    
    if (unrevealedAnswers.length === 0) return null;
    
    // Pick a random unrevealed answer
    const randomAnswer = unrevealedAnswers[Math.floor(Math.random() * unrevealedAnswers.length)];
    const word = randomAnswer.word.toLowerCase();
    
    // Get or initialize revealed letters for this word
    if (!this.gameState.revealedLetters) {
      this.gameState.revealedLetters = new Map();
    }
    
    let revealedPositions = this.gameState.revealedLetters.get(word) || new Set();
    
    // Find positions that can be revealed (not already revealed)
    const availablePositions: number[] = [];
    for (let i = 0; i < word.length; i++) {
      if (!revealedPositions.has(i) && word[i] !== ' ') {
        availablePositions.push(i);
      }
    }
    
    if (availablePositions.length === 0) return null;
    
    // Reveal a random letter
    const positionToReveal = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    revealedPositions.add(positionToReveal);
    this.gameState.revealedLetters.set(word, revealedPositions);
    
    return {
      word: randomAnswer.word,
      revealedPositions: Array.from(revealedPositions)
    };
  }

  skipQuestion(): void {
    this.completeQuestion();
  }

  private completeQuestion(fromRevealMode: boolean = false): void {
    this.gameState.questionsCompleted++;
    this.gameState.fromRevealMode = fromRevealMode;
    this.onQuestionComplete();

    // Check if game is complete
    if (this.gameState.currentQuestionIndex >= this.questions.length - 1) {
      this.onGameComplete(this.gameState.score);
      return;
    }

    // Move to next question
    this.nextQuestion();
  }

  private nextQuestion(): void {
    this.gameState.currentQuestionIndex++;
    this.currentQuestion = this.questions[this.gameState.currentQuestionIndex];
    this.gameState.foundAnswers.clear();
    this.gameState.wrongAttempts = 0;
    this.gameState.isRevealMode = false;
    this.gameState.fromRevealMode = false; // Reset for next question
    this.gameState.revealedLetters?.clear(); // Clear revealed letters for new question
  }

  getProgress(): { current: number; total: number; percentage: number } {
    return {
      current: this.gameState.questionsCompleted,
      total: this.gameState.totalQuestions,
      percentage: (this.gameState.questionsCompleted / this.gameState.totalQuestions) * 100
    };
  }

  getTimeElapsed(): number {
    return Date.now() - this.gameState.gameStartTime;
  }

  getStats() {
    const timeElapsed = this.getTimeElapsed();
    const averageTimePerQuestion = this.gameState.questionsCompleted > 0 
      ? timeElapsed / this.gameState.questionsCompleted 
      : 0;

    return {
      score: this.gameState.score,
      questionsCompleted: this.gameState.questionsCompleted,
      totalQuestions: this.gameState.totalQuestions,
      timeElapsed,
      averageTimePerQuestion: Math.round(averageTimePerQuestion / 1000), // in seconds
      currentStreak: this.gameState.streak
    };
  }

  isInRevealMode(): boolean {
    return this.gameState.isRevealMode || false;
  }

  revealAnswer(answerWord: string): Answer | null {
    if (!this.gameState.isRevealMode) return null;
    
    const answer = this.currentQuestion.answers.find(
      a => a.word.toLowerCase() === answerWord.toLowerCase()
    );
    
    if (answer && !this.gameState.foundAnswers.has(answerWord.toLowerCase())) {
      // Don't add points or update score when revealing, just mark as found
      this.gameState.foundAnswers.add(answerWord.toLowerCase());
      return answer;
    }
    
    return null;
  }

  continueFromRevealMode(): void {
    if (!this.gameState.isRevealMode) return;
    
    this.gameState.isRevealMode = false;
    this.completeQuestion(true); // Pass flag indicating we came from reveal mode
  }
}