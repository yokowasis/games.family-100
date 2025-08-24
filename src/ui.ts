import type { Question, Answer, GameState } from './types';

export class UIManager {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  renderGameScreen(question: Question, gameState: GameState): void {
    this.container.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <!-- Header -->
        <div class="bg-white/80 backdrop-blur-lg border-b border-white/20 px-4 py-3 shadow-lg">
          <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-4">
              <h1 class="text-2xl font-bold text-gray-800">Family 100: Student Edition</h1>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <span id="question-counter">Question ${gameState.currentQuestionIndex + 1} of ${gameState.totalQuestions}</span>
              </div>
            </div>
            
            <div class="flex items-center gap-6">
              <!-- Score -->
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600" id="score">${gameState.score}</div>
                <div class="text-xs text-gray-500">Score</div>
              </div>
              
              <!-- Streak -->
              <div class="text-center">
                <div class="text-xl font-bold text-orange-500 flex items-center gap-1" id="streak">
                  ${gameState.streak > 0 ? '🔥' : '💫'} ${gameState.streak}
                </div>
                <div class="text-xs text-gray-500">Streak</div>
              </div>
              
              <!-- Lives/Attempts -->
              <div class="text-center">
                <div class="text-lg" id="lives">
                  ${'❤️'.repeat(3 - gameState.wrongAttempts)}${'💔'.repeat(gameState.wrongAttempts)}
                </div>
                <div class="text-xs text-gray-500">Lives</div>
              </div>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="max-w-6xl mx-auto mt-3">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="progress-bar h-2 rounded-full" style="width: ${(gameState.questionsCompleted / gameState.totalQuestions) * 100}%"></div>
            </div>
          </div>
        </div>

        <!-- Main Game Area -->
        <div class="max-w-6xl mx-auto p-6">
          <div class="grid lg:grid-cols-2 gap-8">
            
            <!-- Left: Image and Question -->
            <div class="space-y-6">
              <!-- Question Title -->
              <div class="text-center">
                <h2 class="text-3xl font-bold text-white mb-2">${question.title}</h2>
                <p class="text-white/80">Find as many words as you can!</p>
              </div>
              
              <!-- Image -->
              <div class="game-card rounded-2xl overflow-hidden">
                <img 
                  src="${question.image}" 
                  alt="Question Image" 
                  class="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                  id="question-image"
                >
              </div>
              
                <!-- Input Section -->
                <div class="space-y-4">
                  ${gameState.isRevealMode ? `
                    <!-- Reveal Mode Message -->
                    <div class="bg-red-500/20 backdrop-blur-sm border border-red-300 rounded-2xl p-4 text-center">
                      <h4 class="text-white font-bold text-lg mb-2">🔍 Reveal Mode</h4>
                      <p class="text-white/90">Click on the unrevealed answers to see what you missed!</p>
                    </div>
                    <div class="text-center">
                      <button 
                        id="continue-btn"
                        class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        ➡️ Continue to Next Question
                      </button>
                    </div>
                  ` : `
                    <div class="relative">
                      <input 
                        type="text" 
                        id="answer-input"
                        placeholder="Type your answer here..." 
                        class="w-full px-6 py-4 text-xl rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        autocomplete="off"
                      >
                      <button 
                        id="submit-btn"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all duration-300 font-medium"
                      >
                        Submit
                      </button>
                    </div>
                    
                    <!-- Feedback Area -->
                    <div id="feedback" class="text-center py-2 rounded-xl transition-all duration-300"></div>
                    
                    <!-- Hint Area -->
                    <div id="hint-area" class="text-center text-white/80 italic hidden"></div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-3 justify-center">
                      <button 
                        id="hint-btn"
                        class="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all duration-300 font-medium"
                      >
                        💡 Get Hint
                      </button>
                      <button 
                        id="skip-btn"
                        class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 font-medium"
                      >
                        ⏭️ Skip Question
                      </button>
                    </div>
                  `}
                </div>
            </div>
            
            <!-- Right: Answer Board -->
            <div class="space-y-6">
              <div class="text-center">
                <h3 class="text-2xl font-bold text-white">Answer Board</h3>
                <p class="text-white/80">Found: <span id="found-count">0</span> of ${question.totalAnswers}</p>
              </div>
              
              <div class="answer-board p-6 space-y-3" id="answer-board">
                ${this.renderAnswerSlots(question.answers, new Set(), gameState.isRevealMode || false)}
              </div>
              
              <!-- Category Badge -->
              <div class="text-center">
                <span class="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium capitalize">
                  📂 ${question.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderAnswerSlots(answers: Answer[], foundAnswers: Set<string>, isRevealMode: boolean = false): string {
    return answers
      .sort((a, b) => a.rank - b.rank)
      .map(answer => {
        const isFound = foundAnswers.has(answer.word.toLowerCase());
        const canReveal = isRevealMode && !isFound;
        return `
          <div class="answer-slot ${isFound ? 'revealed' : ''} ${canReveal ? 'clickable-reveal' : ''} p-4 rounded-xl text-center transition-all duration-500" 
               data-answer="${answer.word}" ${canReveal ? 'style="cursor: pointer;"' : ''}>
            <div class="flex justify-between items-center">
              <span class="font-bold text-lg">
                ${isFound ? answer.word.toUpperCase() : `${answer.rank}. ${canReveal ? '???' : '???'}`}
              </span>
              <span class="text-2xl font-bold">
                ${isFound ? answer.points : '??'}
              </span>
            </div>
            ${canReveal ? '<div class="text-xs text-blue-200 mt-1">Click to reveal</div>' : ''}
          </div>
        `;
      }).join('');
  }

  updateAnswerBoard(answers: Answer[], foundAnswers: Set<string>, isRevealMode: boolean = false): void {
    const answerBoard = document.getElementById('answer-board');
    if (answerBoard) {
      answerBoard.innerHTML = this.renderAnswerSlots(answers, foundAnswers, isRevealMode);
    }
    
    // Update found count
    const foundCountEl = document.getElementById('found-count');
    if (foundCountEl) {
      foundCountEl.textContent = foundAnswers.size.toString();
    }
  }

  updateScore(score: number): void {
    const scoreEl = document.getElementById('score');
    if (scoreEl) {
      scoreEl.textContent = score.toString();
      scoreEl.classList.add('animate-pulse-success');
      setTimeout(() => scoreEl.classList.remove('animate-pulse-success'), 800);
    }
  }

  updateStreak(streak: number): void {
    const streakEl = document.getElementById('streak');
    if (streakEl) {
      const streakEmoji = streak > 0 ? '🔥' : '💫';
      streakEl.innerHTML = `${streakEmoji} ${streak}`;
      if (streak > 0) {
        streakEl.classList.add('animate-bounce-in');
        setTimeout(() => streakEl.classList.remove('animate-bounce-in'), 600);
      }
    }
  }

  updateLives(wrongAttempts: number): void {
    const livesEl = document.getElementById('lives');
    if (livesEl) {
      const hearts = '❤️'.repeat(3 - wrongAttempts);
      const broken = '💔'.repeat(wrongAttempts);
      livesEl.innerHTML = hearts + broken;
      
      if (wrongAttempts > 0) {
        livesEl.classList.add('animate-shake');
        setTimeout(() => livesEl.classList.remove('animate-shake'), 600);
      }
    }
  }

  showFeedback(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const feedbackEl = document.getElementById('feedback');
    if (!feedbackEl) return;

    const colors = {
      success: 'bg-green-100 text-green-800 border border-green-200',
      error: 'bg-red-100 text-red-800 border border-red-200',
      info: 'bg-blue-100 text-blue-800 border border-blue-200'
    };

    feedbackEl.className = `text-center py-3 px-4 rounded-xl transition-all duration-300 ${colors[type]} animate-fade-in`;
    feedbackEl.textContent = message;

    // Auto-hide after 3 seconds
    setTimeout(() => {
      feedbackEl.className = 'text-center py-2 rounded-xl transition-all duration-300';
      feedbackEl.textContent = '';
    }, 3000);
  }

  showHint(hint: string): void {
    const hintArea = document.getElementById('hint-area');
    if (hintArea) {
      hintArea.textContent = `💡 Hint: ${hint}`;
      hintArea.classList.remove('hidden');
      hintArea.classList.add('animate-fade-in');
    }
  }

  animateCorrectAnswer(answerElement: HTMLElement): void {
    answerElement.classList.add('animate-bounce-in');
    setTimeout(() => answerElement.classList.remove('animate-bounce-in'), 600);
  }

  animateWrongAnswer(): void {
    const input = document.getElementById('answer-input');
    if (input) {
      input.classList.add('input-error');
      setTimeout(() => input.classList.remove('input-error'), 600);
    }
  }

  createConfetti(): void {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-particle fixed pointer-events-none z-50';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '50%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 1000);
    }
  }

  renderGameComplete(finalScore: number, stats: any): void {
    this.container.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div class="game-card max-w-2xl w-full p-8 rounded-3xl text-center">
          <div class="mb-8">
            <div class="text-6xl mb-4">🎉</div>
            <h1 class="text-4xl font-bold text-white mb-2">Congratulations!</h1>
            <p class="text-xl text-white/90">You completed the Family 100 challenge!</p>
          </div>
          
          <div class="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white mb-8">
            <div class="text-5xl font-bold mb-2">${finalScore}</div>
            <div class="text-xl">Final Score</div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div class="text-2xl font-bold text-white">${stats.questionsCompleted}</div>
              <div class="text-sm text-white/80">Questions Completed</div>
            </div>
            <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div class="text-2xl font-bold text-white">${stats.averageTimePerQuestion}s</div>
              <div class="text-sm text-white/80">Avg. Time/Question</div>
            </div>
          </div>
          
          <div class="space-y-4">
            <button 
              id="play-again-btn"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎮 Play Again
            </button>
            <button 
              id="share-btn"
              class="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📤 Share Results
            </button>
          </div>
        </div>
      </div>
    `;
  }
}