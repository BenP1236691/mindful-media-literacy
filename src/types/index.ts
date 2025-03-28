
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  imageUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedModules: string[];
  moduleScores: Record<string, number>;
}

export interface PageContent {
  id: string;
  title: string;
  content: string;
}
