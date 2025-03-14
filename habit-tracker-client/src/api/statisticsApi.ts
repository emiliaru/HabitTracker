import axios from 'axios';
import { HabitStatistics, CategoryStatistics, UserStatistics } from '../types/habit';

const API_URL = 'http://localhost:5177/api';

export const statisticsApi = {
  getHabitStatistics: async (habitId: number): Promise<HabitStatistics> => {
    const response = await axios.get(`${API_URL}/statistics/habits/${habitId}`);
    return response.data;
  },

  getCategoryStatistics: async (categoryId: number): Promise<CategoryStatistics> => {
    const response = await axios.get(`${API_URL}/statistics/categories/${categoryId}`);
    return response.data;
  },

  getUserStatistics: async (): Promise<UserStatistics> => {
    const response = await axios.get(`${API_URL}/statistics/user`);
    return response.data;
  },
};
