export enum FrequencyType {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly'
}

export interface Category {
  id: number;
  name: string;
  color: string;
  icon?: string;
}

export interface Habit {
  id: number;
  name: string;
  description: string;
  frequency: FrequencyType;
  createdAt: string;
  isArchived: boolean;
  isCompleted: boolean;
  categoryId?: number;
  category?: Category;
  targetDays?: number;
  startDate?: string;
  endDate?: string;
  reminder?: string;
}

export interface HabitProgress {
  id: number;
  habitId: number;
  date: string;
  isCompleted: boolean;
  notes?: string;
}

export interface CreateHabitDto {
  name: string;
  description: string;
  frequency: FrequencyType;
  categoryId?: number;
  targetDays?: number;
  startDate?: string;
  endDate?: string;
  reminder?: string;
}

export interface UpdateHabitDto {
  name: string;
  description: string;
  frequency: FrequencyType;
  isArchived: boolean;
  isCompleted: boolean;
  categoryId?: number;
  targetDays?: number;
  startDate?: string;
  endDate?: string;
  reminder?: string;
}

export interface HabitStatistics {
  habitId: number;
  habitName: string;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  totalCompletions: number;
  daysTracked: number;
  completionsByDay: Record<string, number>;
}

export interface CategoryStatistics {
  categoryId: number;
  categoryName: string;
  totalHabits: number;
  activeHabits: number;
  averageCompletionRate: number;
  habitsByFrequency: Record<string, number>;
}

export interface UserStatistics {
  totalHabits: number;
  activeHabits: number;
  totalCategories: number;
  overallCompletionRate: number;
  completionRateByCategory: Record<string, number>;
  topPerformingHabits: HabitStatistics[];
  needsAttentionHabits: HabitStatistics[];
}
