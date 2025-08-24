# Family 100 - Student Edition 🎯

A modern, educational picture-guessing game inspired by the Family Feud format. Students look at images and try to guess descriptive words, learning vocabulary and observation skills in a fun, interactive way.

## ✨ Features

### 🎮 Core Gameplay
- **Family 100 Format**: Multiple correct answers per image, ranked by popularity
- **Forgiving Gameplay**: 3 attempts per question with helpful hints
- **Progressive Hints**: Context-aware clues that adapt to student struggles
- **Educational Focus**: Designed for vocabulary building and critical thinking

### 🎨 Modern UI/UX
- **Beautiful Design**: Gradient backgrounds, glassmorphism cards, smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: High contrast, keyboard navigation, screen reader friendly
- **Dark/Light Theme**: Auto-adapts to system preference

### 📊 Gamification Features
- **Streak System**: Bonus multipliers for consecutive correct answers
- **Achievement System**: Unlock badges for milestones and performance
- **Progress Tracking**: Visual progress bars and detailed statistics
- **Score Animation**: Satisfying number roll-ups and confetti celebrations

### 🎯 Educational Benefits
- **Vocabulary Building**: Students learn new descriptive words
- **Observation Skills**: Encourages detailed image analysis
- **Critical Thinking**: Students must think creatively about word associations
- **Confidence Building**: Multiple attempts and encouraging feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone or download the project
cd family-100

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎲 How to Play

1. **Look at the Image**: Study the picture carefully
2. **Think of Descriptive Words**: What words come to mind?
3. **Type Your Answer**: Enter one word at a time
4. **Find Multiple Answers**: Each image has 5-8 possible words
5. **Build Streaks**: Get bonus points for consecutive correct answers!

### Scoring System
- **Base Points**: Each word has a point value (5-35 points)
- **Popularity Bonus**: More common answers = higher points
- **Streak Multipliers**: 
  - 3+ streak: 1.5x points
  - 5+ streak: 2x points
  - 10+ streak: 3x points

## 📚 Game Data Structure

Add your own questions by editing `src/data.ts`:

```typescript
{
  id: 1,
  image: 'https://example.com/image.jpg',
  title: 'What words describe this beach?',
  answers: [
    { word: 'beautiful', points: 35, rank: 1 },
    { word: 'sunny', points: 28, rank: 2 },
    // ... more answers
  ],
  category: 'nature',
  totalAnswers: 7,
  hints: [
    'Think about how this place makes you feel',
    'Consider the colors you see'
  ]
}
```

## 🛠️ Tech Stack

- **Frontend**: TypeScript + Vite
- **Styling**: Tailwind CSS with custom animations
- **Images**: Unsplash API (high-quality, royalty-free)
- **Build Tool**: Vite (fast development and building)
- **Package Manager**: npm

## 🎨 Customization

### Adding New Categories
1. Edit `src/data.ts`
2. Add questions with new `category` values
3. Questions will automatically group by category

### Custom Styling
- Edit `src/style.css` for global styles
- Modify `tailwind.config.js` for theme customization
- Custom animations are defined in CSS

### Game Rules Modification
- Edit `src/game.ts` to change:
  - Number of attempts (currently 3)
  - Streak multipliers
  - Scoring system
  - Lives/hearts system

## 📱 Mobile Support

The game is fully responsive and includes:
- Touch-friendly buttons and inputs
- Optimized layouts for small screens
- Swipe gestures (planned feature)
- PWA support for offline play

## 🎓 Educational Use

Perfect for:
- **Language Learning**: Vocabulary building and word association
- **ESL Classes**: Visual learning with contextual clues
- **Elementary Education**: Observation and critical thinking skills
- **Special Education**: Supportive, encouraging learning environment

## 🔮 Future Features

- [ ] **Timer Mode**: Optional time pressure for advanced students
- [ ] **Multiplayer**: Compete with classmates in real-time
- [ ] **Teacher Dashboard**: Track student progress and performance
- [ ] **Custom Image Upload**: Teachers can add their own pictures
- [ ] **Offline Mode**: Play without internet connection
- [ ] **Achievement System**: Unlock badges and rewards
- [ ] **Difficulty Levels**: Adaptive content based on age/skill level

## 📄 License

MIT License - feel free to use this in your educational projects!

## 🤝 Contributing

Contributions welcome! Areas we'd love help with:
- More diverse image sets
- Accessibility improvements
- Additional languages/translations
- Performance optimizations

---

Built with ❤️ for students and educators worldwide 🌍