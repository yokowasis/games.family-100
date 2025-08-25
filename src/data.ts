import type { Question } from './types';

export const sampleQuestions: Question[] = [
  {
    id: 1,
    image: '/images/lariti_beach.jpg',
    title: 'What words describe Lariti Beach?',
    answers: [
      { word: 'beautiful', points: 35, rank: 1 },
      { word: 'clean', points: 28, rank: 2 },
      { word: 'peaceful', points: 22, rank: 3 },
      { word: 'clear', points: 18, rank: 4 },
      { word: 'exotic', points: 15, rank: 5 },
      { word: 'natural', points: 12, rank: 6 },
      { word: 'refreshing', points: 8, rank: 7 }
    ],
    category: 'nature',
    totalAnswers: 7,
    hints: [
      'Think about how this place makes you feel',
      'Notice the water quality',
      'What word would you use to praise this beach?'
    ]
  },
  {
    id: 2,
    image: '/images/lawata_beach.webp',
    title: 'What words describe Lawata Beach?',
    answers: [
      { word: 'stunning', points: 32, rank: 1 },
      { word: 'sandy', points: 26, rank: 2 },
      { word: 'blue', points: 20, rank: 3 },
      { word: 'tropical', points: 16, rank: 4 },
      { word: 'relaxing', points: 13, rank: 5 },
      { word: 'pristine', points: 10, rank: 6 }
    ],
    category: 'nature',
    totalAnswers: 6,
    hints: [
      'Look at the dominant colors in this photo',
      'Imagine the sensation of walking here',
      'What comes to mind first when you see this?'
    ]
  },
  {
    id: 3,
    image: '/images/gunung_tambora.jpg',
    title: 'What words describe Mount Tambora?',
    answers: [
      { word: 'massive', points: 30, rank: 1 },
      { word: 'tall', points: 25, rank: 2 },
      { word: 'historic', points: 21, rank: 3 },
      { word: 'majestic', points: 17, rank: 4 },
      { word: 'mysterious', points: 14, rank: 5 },
      { word: 'impressive', points: 11, rank: 6 },
      { word: 'legendary', points: 7, rank: 7 }
    ],
    category: 'nature',
    totalAnswers: 7,
    hints: [
      'This mountain is famous worldwide for its eruption',
      'Notice its size and height',
      'Think about the history stored here'
    ]
  },
  {
    id: 4,
    image: '/images/masjid_terapung.jpg',
    title: 'What words describe this floating mosque?',
    answers: [
      { word: 'unique', points: 33, rank: 1 },
      { word: 'beautiful', points: 27, rank: 2 },
      { word: 'modern', points: 19, rank: 3 },
      { word: 'peaceful', points: 15, rank: 4 },
      { word: 'artistic', points: 12, rank: 5 },
      { word: 'elegant', points: 9, rank: 6 }
    ],
    category: 'architecture',
    totalAnswers: 6,
    hints: [
      'What makes this mosque different from others?',
      'Notice its architectural design',
      'Imagine the atmosphere of worship here'
    ]
  },
  {
    id: 5,
    image: '/images/amahami_traditional_market.jpg',
    title: 'What words describe Amahami Traditional Market?',
    answers: [
      { word: 'busy', points: 35, rank: 1 },
      { word: 'traditional', points: 28, rank: 2 },
      { word: 'colorful', points: 22, rank: 3 },
      { word: 'lively', points: 18, rank: 4 },
      { word: 'local', points: 14, rank: 5 },
      { word: 'authentic', points: 10, rank: 6 }
    ],
    category: 'culture',
    totalAnswers: 6,
    hints: [
      'Listen to the atmosphere of a traditional market',
      'See the variety of goods being sold',
      'Feel the local community life'
    ]
  },
  {
    id: 6,
    image: '/images/night_market_amahami.jpg',
    title: 'What words describe the night market in Amahami?',
    answers: [
      { word: 'bright', points: 35, rank: 1 },
      { word: 'crowded', points: 28, rank: 2 },
      { word: 'vibrant', points: 22, rank: 3 },
      { word: 'aromatic', points: 18, rank: 4 },
      { word: 'energetic', points: 15, rank: 5 },
      { word: 'festive', points: 12, rank: 6 },
      { word: 'social', points: 8, rank: 7 }
    ],
    category: 'culture',
    totalAnswers: 7,
    hints: [
      'Notice all the lights and activity',
      'Think about the smells of street food',
      'How does this evening atmosphere feel?'
    ]
  },
  {
    id: 7,
    image: '/images/man_1_kota_bima.jpg',
    title: 'What words describe MAN 1 Kota Bima?',
    answers: [
      { word: 'educational', points: 40, rank: 1 },
      { word: 'academic', points: 30, rank: 2 },
      { word: 'formal', points: 20, rank: 3 },
      { word: 'islamic', points: 15, rank: 4 },
      { word: 'scholarly', points: 10, rank: 5 },
      { word: 'disciplined', points: 8, rank: 6 }
    ],
    category: 'education',
    totalAnswers: 6,
    hints: [
      'A place where students seek knowledge',
      'MAN stands for Madrasah Aliyah Negeri',
      'What values are taught here?'
    ]
  },
  {
    id: 8,
    image: '/images/museum_mbojo_bima.webp',
    title: 'What words describe Museum Mbojo Bima?',
    answers: [
      { word: 'historical', points: 35, rank: 1 },
      { word: 'cultural', points: 28, rank: 2 },
      { word: 'ancient', points: 22, rank: 3 },
      { word: 'valuable', points: 18, rank: 4 },
      { word: 'educational', points: 15, rank: 5 },
      { word: 'preserved', points: 12, rank: 6 },
      { word: 'informative', points: 8, rank: 7 }
    ],
    category: 'culture',
    totalAnswers: 7,
    hints: [
      'A place that stores artifacts from the past',
      'Mbojo is another name for Bima',
      'Here you can learn about ancient times'
    ]
  },
  {
    id: 9,
    image: '/images/lapangan_serasuba.jpg',
    title: 'What words describe Serasuba Field?',
    answers: [
      { word: 'spacious', points: 32, rank: 1 },
      { word: 'green', points: 26, rank: 2 },
      { word: 'athletic', points: 20, rank: 3 },
      { word: 'open', points: 16, rank: 4 },
      { word: 'fresh', points: 13, rank: 5 },
      { word: 'recreational', points: 10, rank: 6 }
    ],
    category: 'recreation',
    totalAnswers: 6,
    hints: [
      'A place for physical activities',
      'Notice the green grass',
      'What activities can be done here?'
    ]
  },
  {
    id: 10,
    image: '/images/mayor_office.jpg',
    title: 'What words describe the Mayor Office?',
    answers: [
      { word: 'official', points: 35, rank: 1 },
      { word: 'formal', points: 28, rank: 2 },
      { word: 'governmental', points: 22, rank: 3 },
      { word: 'administrative', points: 18, rank: 4 },
      { word: 'public', points: 15, rank: 5 },
      { word: 'authoritative', points: 12, rank: 6 }
    ],
    category: 'government',
    totalAnswers: 6,
    hints: [
      'Where the mayor works',
      'Center of public services',
      'Building for city affairs'
    ]
  },
  {
    id: 11,
    image: '/images/taman_amahami.jpg',
    title: 'What words describe Amahami Park?',
    answers: [
      { word: 'green', points: 30, rank: 1 },
      { word: 'pleasant', points: 25, rank: 2 },
      { word: 'comfortable', points: 21, rank: 3 },
      { word: 'relaxing', points: 17, rank: 4 },
      { word: 'shady', points: 14, rank: 5 },
      { word: 'family-friendly', points: 11, rank: 6 },
      { word: 'playful', points: 7, rank: 7 }
    ],
    category: 'recreation',
    totalAnswers: 7,
    hints: [
      'A place for families to gather',
      'The dominant color in this park',
      'The atmosphere created here'
    ]
  },
  {
    id: 12,
    image: '/images/situs_uma_lengge.jpg',
    title: 'What words describe Uma Lengge Site?',
    answers: [
      { word: 'historical', points: 35, rank: 1 },
      { word: 'ancient', points: 28, rank: 2 },
      { word: 'traditional', points: 22, rank: 3 },
      { word: 'sacred', points: 18, rank: 4 },
      { word: 'cultural', points: 15, rank: 5 },
      { word: 'ancestral', points: 12, rank: 6 }
    ],
    category: 'culture',
    totalAnswers: 6,
    hints: [
      'A relic from the past',
      'Uma Lengge is a traditional house',
      'The historical value contained within'
    ]
  }
];

// Utility functions for game data
export const getRandomQuestions = (count?: number): Question[] => {
  const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
  // If no count specified, return all questions
  if (count === undefined) {
    return shuffled;
  }
  return shuffled.slice(0, Math.min(count, sampleQuestions.length));
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return sampleQuestions.filter(q => q.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(sampleQuestions.map(q => q.category))];
};