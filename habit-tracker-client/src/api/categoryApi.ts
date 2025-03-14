import axios from 'axios';
import { Category } from '../types/habit';

const API_URL = 'http://localhost:5177/api';

export const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  },

  getCategory: async (id: number): Promise<Category> => {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  },

  createCategory: async (category: Omit<Category, 'id'>): Promise<Category> => {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
  },

  updateCategory: async (id: number, category: Omit<Category, 'id'>): Promise<void> => {
    await axios.put(`${API_URL}/categories/${id}`, category);
  },

  deleteCategory: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/categories/${id}`);
  },

  getHabitsByCategory: async (categoryId: number) => {
    const response = await axios.get(`${API_URL}/categories/${categoryId}/habits`);
    return response.data;
  },
};
