import './style.css';
import { FamilyGame } from './game';
import { UIManager } from './ui';
import { getRandomQuestions } from './data';
import type { Answer } from './types';

class FamilyGameApp {
  private game: FamilyGame | null = null;
  private ui: UIManager;

  constructor() {
    const appContainer = document.querySelector<HTMLDivElement>('#app')!;
    this.ui = new UIManager(appContainer);
    this.showMainMenu();
  }

  private showMainMenu(): void {
    const appContainer = document.querySelector<HTMLDivElement>('#app')!;
    appContainer.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div class="game-card max-w-2xl w-full p-8 rounded-3xl text-center">
          <div class="mb-8">
            <div class="text-6xl mb-6">🎯</div>
            <h1 class="text-5xl font-bold text-white mb-4">Family 100</h1>
            <h2 class="text-2xl text-white/90 mb-2">Student Edition</h2>
            <p class="text-lg text-white/80">Guess the most popular words that describe each picture!</p>
          </div>
          
          <div class="space-y-6 mb-8">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left">
              <h3 class="font-bold text-lg mb-3 text-white">🎮 How to Play:</h3>
              <ul class="text-white/90 space-y-2">
                <li>• Look at each picture carefully</li>
                <li>• Type words that describe what you see</li>
                <li>• Find as many answers as possible</li>
                <li>• Higher points for more popular answers!</li>
                <li>• Build streaks for bonus points</li>
              </ul>
            </div>
          </div>
          
          <div class="space-y-4">
            <button 
              id="start-game-btn"
              class="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚀 Start Game
            </button>
            <button 
              id="practice-btn"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📚 Practice Mode
            </button>
          </div>
          
          <div class="mt-8 text-sm text-white/70">
            <p>Educational game designed for students to improve vocabulary and observation skills</p>
          </div>
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('start-game-btn')?.addEventListener('click', () => this.startGame());
    document.getElementById('practice-btn')?.addEventListener('click', () => this.startGame(true));
  }

  private startGame(practice: boolean = false): void {
    // Get random questions for the game - use all available questions unless practice mode
    const questions = practice ? getRandomQuestions(3) : getRandomQuestions();
    
    // Initialize game with callbacks
    this.game = new FamilyGame(questions, {
      onScoreUpdate: (score: number) => this.ui.updateScore(score),
      onStreakUpdate: (streak: number) => this.ui.updateStreak(streak),
      onAnswerFound: (answer: Answer) => this.handleCorrectAnswer(answer),
      onWrongAnswer: (attempts: number) => this.handleWrongAnswer(attempts),
      onQuestionComplete: () => this.handleQuestionComplete(),
      onGameComplete: (finalScore: number) => this.handleGameComplete(finalScore)
    });

    this.renderCurrentQuestion();
    this.setupEventListeners();
  }

  private renderCurrentQuestion(): void {
    if (!this.game) return;
    
    const question = this.game.getCurrentQuestion();
    const gameState = this.game.getGameState();
    
    this.ui.renderGameScreen(question, gameState);
  }

  private setupEventListeners(): void {
    if (!this.game) return;
    
    const input = document.getElementById('answer-input') as HTMLInputElement;
    const submitBtn = document.getElementById('submit-btn');
    const hintBtn = document.getElementById('hint-btn');
    const skipBtn = document.getElementById('skip-btn');
    const continueBtn = document.getElementById('continue-btn');

    // Regular game mode event listeners
    if (input && submitBtn && !this.game.isInRevealMode()) {
      const handleSubmit = () => {
        const answer = input.value.trim();
        if (answer) {
          this.submitAnswer(answer);
          input.value = '';
        }
      };

      submitBtn.addEventListener('click', handleSubmit);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      });

      // Focus input by default
      input.focus();
    }

    // Reveal mode event listeners
    if (this.game.isInRevealMode()) {
      this.setupRevealModeListeners();

      // Continue button - use once to prevent multiple listeners
      if (continueBtn) {
        continueBtn.onclick = () => {
          if (this.game) {
            this.game.continueFromRevealMode();
          }
        };
      }
    }

    // Use onclick to prevent duplicate listeners
    if (hintBtn) {
      hintBtn.onclick = () => this.showHint();
    }
    if (skipBtn) {
      skipBtn.onclick = () => this.skipQuestion();
    }
  }

  private setupRevealModeListeners(): void {
    // Add click listeners to unrevealed answers using onclick to prevent duplicates
    const revealableAnswers = document.querySelectorAll('.clickable-reveal');
    revealableAnswers.forEach(element => {
      (element as HTMLElement).onclick = () => {
        const answerWord = element.getAttribute('data-answer');
        if (answerWord) {
          this.revealAnswer(answerWord);
        }
      };
    });
  }

  private submitAnswer(answer: string): void {
    if (!this.game) return;

    const result = this.game.submitAnswer(answer);
    
    if (result.success && result.isNewAnswer && result.answer) {
      // Correct new answer
      this.ui.showFeedback(result.message, 'success');
      this.ui.createConfetti();
      
      // Update answer board
      const foundAnswers = this.game.getGameState().foundAnswers;
      const currentQuestion = this.game.getCurrentQuestion();
      const gameState = this.game.getGameState();
      this.ui.updateAnswerBoard(currentQuestion.answers, foundAnswers, this.game.isInRevealMode(), gameState.revealedLetters);
      
      // Animate the revealed answer
      const answerElement = document.querySelector(`[data-answer="${result.answer.word}"]`) as HTMLElement;
      if (answerElement) {
        this.ui.animateCorrectAnswer(answerElement);
      }
    } else if (result.success && !result.isNewAnswer) {
      // Already found
      this.ui.showFeedback(result.message, 'info');
    } else {
      // Wrong answer or entering reveal mode
      this.ui.showFeedback(result.message, 'error');
      this.ui.animateWrongAnswer();
      
      // If entering reveal mode, re-render the screen
      if (this.game.isInRevealMode()) {
        this.renderCurrentQuestion();
        this.setupEventListeners();
      }
    }
  }

  private revealAnswer(answerWord: string): void {
    if (!this.game) return;
    
    const revealedAnswer = this.game.revealAnswer(answerWord);
    if (revealedAnswer) {
      // Update answer board with the new revealed answer
      const foundAnswers = this.game.getGameState().foundAnswers;
      const currentQuestion = this.game.getCurrentQuestion();
      const gameState = this.game.getGameState();
      this.ui.updateAnswerBoard(currentQuestion.answers, foundAnswers, this.game.isInRevealMode(), gameState.revealedLetters);
      
      // Re-attach event listeners to the new DOM elements
      this.setupRevealModeListeners();
      
      // Show feedback
      this.ui.showFeedback(`Revealed: ${revealedAnswer.word.toUpperCase()} (${revealedAnswer.points} points)`, 'info');
      
      // Animate the revealed answer
      const answerElement = document.querySelector(`[data-answer="${revealedAnswer.word}"]`) as HTMLElement;
      if (answerElement) {
        answerElement.classList.remove('clickable-reveal');
        answerElement.classList.add('revealed');
        this.ui.animateCorrectAnswer(answerElement);
      }
    }
  }

  private handleCorrectAnswer(answer: Answer): void {
    // Additional handling for correct answers can go here
    console.log(`Correct answer: ${answer.word} (+${answer.points} points)`);
  }

  private handleWrongAnswer(attempts: number): void {
    this.ui.updateLives(attempts);
    
    // Show hint after 2 wrong attempts
    if (attempts >= 2) {
      this.showHint();
    }
  }

  private showHint(): void {
    if (!this.game) return;
    
    const hint = this.game.getHint();
    const letterHint = this.game.getLetterHint();
    
    if (hint) {
      this.ui.showHint(hint);
    }
    
    if (letterHint) {
      // Update answer board to show revealed letters
      const foundAnswers = this.game.getGameState().foundAnswers;
      const currentQuestion = this.game.getCurrentQuestion();
      const gameState = this.game.getGameState();
      this.ui.updateAnswerBoard(currentQuestion.answers, foundAnswers, this.game.isInRevealMode(), gameState.revealedLetters);
    }
    
    if (!hint && !letterHint) {
      this.ui.showFeedback('No hints available for this question', 'info');
    }
  }

  private skipQuestion(): void {
    if (!this.game) return;
    
    if (confirm('Are you sure you want to skip this question?')) {
      this.game.skipQuestion();
    }
  }

  private handleQuestionComplete(): void {
    if (!this.game) return;
    
    const gameState = this.game.getGameState();
    
    // Immediate transition when coming from reveal mode, delay for normal completion
    const delay = gameState.fromRevealMode ? 0 : 2000;
    
    setTimeout(() => {
      if (gameState.currentQuestionIndex < gameState.totalQuestions - 1) {
        // Show transition to next question
        this.showQuestionTransition();
      }
    }, delay);
  }

  private showQuestionTransition(): void {
    if (!this.game) return;
    
    const appContainer = document.querySelector<HTMLDivElement>('#app')!;
    const gameState = this.game.getGameState();
    const nextQuestionNum = gameState.currentQuestionIndex + 2; // +1 for zero-based, +1 for next
    
    appContainer.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <div class="text-center text-white">
          <div class="text-8xl mb-6 animate-bounce-in">🎉</div>
          <h2 class="text-4xl font-bold mb-4 animate-fade-in">Great Job!</h2>
          <p class="text-xl mb-8 animate-fade-in">Moving to Question ${nextQuestionNum}...</p>
          <div class="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    `;
    
    setTimeout(() => {
      this.renderCurrentQuestion();
      this.setupEventListeners();
    }, 3000);
  }

  private handleGameComplete(finalScore: number): void {
    if (!this.game) return;
    
    const stats = this.game.getStats();
    this.ui.renderGameComplete(finalScore, stats);
    
    // Setup play again button
    document.getElementById('play-again-btn')?.addEventListener('click', () => {
      this.showMainMenu();
    });
    
    document.getElementById('share-btn')?.addEventListener('click', () => {
      this.shareResults(finalScore, stats);
    });
  }

  private shareResults(score: number, stats: any): void {
    const text = `I just scored ${score} points in Family 100 Student Edition! 🎯 Completed ${stats.questionsCompleted} questions with an average of ${stats.averageTimePerQuestion}s per question. Can you beat my score?`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Family 100 - My Results',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FamilyGameApp();
});
