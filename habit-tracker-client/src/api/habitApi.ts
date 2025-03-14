import axios from 'axios';
import { Habit, CreateHabitDto, UpdateHabitDto, HabitProgress } from '../types/habit';

const API_URL = 'http://localhost:5177/api';

export const habitApi = {
  getAllHabits: async (): Promise<Habit[]> => {
    const response = await axios.get(`${API_URL}/habits`);
    return response.data;
  },

  getHabitById: async (id: number): Promise<Habit> => {
    const response = await axios.get(`${API_URL}/habits/${id}`);
    return response.data;
  },

  createHabit: async (habit: CreateHabitDto): Promise<Habit> => {
    const response = await axios.post(`${API_URL}/habits`, habit);
    return response.data;
  },

  updateHabit: async (id: number, habit: UpdateHabitDto): Promise<void> => {
    await axios.put(`${API_URL}/habits/${id}`, habit);
  },

  deleteHabit: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/habits/${id}`);
  },

  getHabitProgress: async (habitId: number, startDate: Date, endDate: Date): Promise<HabitProgress[]> => {
    const response = await axios.get(`${API_URL}/habits/${habitId}/progress`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    return response.data;
  },

  addProgress: async (habitId: number, progress: Partial<HabitProgress>): Promise<HabitProgress> => {
    const response = await axios.post(`${API_URL}/habits/${habitId}/progress`, progress);
    return response.data;
  },
};
