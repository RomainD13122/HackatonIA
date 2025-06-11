export interface CarbonData {
  transport: number;
  energy: number;
  food: number;
  consumption: number;
  total: number;
  date?: string;
}

export interface HistoricalEntry {
  id: string;
  date: string;
  data: CarbonData;
  notes?: string;
}

export interface PersonalGoal {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'energy' | 'food' | 'consumption' | 'total';
  targetReduction: number; // en kg CO2
  targetDate: string;
  currentProgress: number;
  createdAt: string;
  completed: boolean;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'energy' | 'food' | 'consumption' | 'general';
  type: 'article' | 'video' | 'infographic' | 'tip';
  content: string;
  readTime: number; // en minutes
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  tags: string[];
  imageUrl?: string;
}

export interface CommunityUser {
  id: string;
  username: string;
  level: string;
  totalPoints: number;
  carbonReduction: number;
  joinedAt: string;
  isAnonymous: boolean;
}

export interface GroupChallenge {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'energy' | 'food' | 'consumption';
  targetParticipants: number;
  currentParticipants: number;
  targetReduction: number;
  currentReduction: number;
  startDate: string;
  endDate: string;
  participants: CommunityUser[];
  completed: boolean;
}

export type Page = 'home' | 'calculator' | 'dashboard' | 'challenges' | 'history' | 'goals' | 'education' | 'community';