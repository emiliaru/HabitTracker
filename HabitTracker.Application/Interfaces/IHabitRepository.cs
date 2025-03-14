using HabitTracker.Core.Models;

namespace HabitTracker.Application.Interfaces;

public interface IHabitRepository
{
    Task<IEnumerable<Habit>> GetAllHabitsAsync(string userId);
    Task<Habit?> GetHabitByIdAsync(int id, string userId);
    Task<Habit> CreateHabitAsync(Habit habit);
    Task UpdateHabitAsync(Habit habit);
    Task DeleteHabitAsync(int id, string userId);
    Task<IEnumerable<HabitProgress>> GetHabitProgressAsync(int habitId);
    Task<HabitProgress> AddHabitProgressAsync(HabitProgress progress);
    Task<IEnumerable<Category>> GetAllCategoriesAsync(string userId);
    Task<Category?> GetCategoryByIdAsync(int id, string userId);
    Task<Category> CreateCategoryAsync(Category category);
    Task UpdateCategoryAsync(Category category);
    Task DeleteCategoryAsync(int id, string userId);
    Task<IEnumerable<Habit>> GetHabitsByCategoryAsync(int categoryId, string userId);
}
