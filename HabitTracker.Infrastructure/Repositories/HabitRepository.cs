using HabitTracker.Application.Interfaces;
using HabitTracker.Core.Models;
using HabitTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HabitTracker.Infrastructure.Repositories;

public class HabitRepository : IHabitRepository
{
    private readonly ApplicationDbContext _context;

    public HabitRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Habit>> GetAllHabitsAsync(string userId)
    {
        return await _context.Habits
            .Include(h => h.Category)
            .Where(h => h.UserId == userId)
            .OrderByDescending(h => h.CreatedAt)
            .ToListAsync();
    }

    public async Task<Habit?> GetHabitByIdAsync(int id, string userId)
    {
        return await _context.Habits
            .Include(h => h.Category)
            .FirstOrDefaultAsync(h => h.Id == id && h.UserId == userId);
    }

    public async Task<Habit> CreateHabitAsync(Habit habit)
    {
        _context.Habits.Add(habit);
        await _context.SaveChangesAsync();
        return habit;
    }

    public async Task UpdateHabitAsync(Habit habit)
    {
        _context.Entry(habit).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteHabitAsync(int id, string userId)
    {
        var habit = await _context.Habits.FindAsync(id);
        if (habit != null && habit.UserId == userId)
        {
            _context.Habits.Remove(habit);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<HabitProgress>> GetHabitProgressAsync(int habitId)
    {
        return await _context.HabitProgresses
            .Where(p => p.HabitId == habitId)
            .OrderByDescending(p => p.Date)
            .ToListAsync();
    }

    public async Task<HabitProgress> AddHabitProgressAsync(HabitProgress progress)
    {
        _context.HabitProgresses.Add(progress);
        await _context.SaveChangesAsync();
        return progress;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync(string userId)
    {
        return await _context.Categories
            .Where(c => c.UserId == userId)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<Category?> GetCategoryByIdAsync(int id, string userId)
    {
        return await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
    }

    public async Task<Category> CreateCategoryAsync(Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task UpdateCategoryAsync(Category category)
    {
        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCategoryAsync(int id, string userId)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category != null && category.UserId == userId)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Habit>> GetHabitsByCategoryAsync(int categoryId, string userId)
    {
        return await _context.Habits
            .Include(h => h.Category)
            .Where(h => h.CategoryId == categoryId && h.UserId == userId)
            .OrderByDescending(h => h.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<HabitProgress>> GetHabitProgressRangeAsync(int habitId, DateTime startDate, DateTime endDate)
    {
        return await _context.HabitProgresses
            .Where(p => p.HabitId == habitId && p.Date >= startDate && p.Date <= endDate)
            .OrderBy(p => p.Date)
            .ToListAsync();
    }

    public async Task<int> GetCurrentStreakAsync(int habitId)
    {
        var today = DateTime.UtcNow.Date;
        var progress = await _context.HabitProgresses
            .Where(p => p.HabitId == habitId && p.Date <= today)
            .OrderByDescending(p => p.Date)
            .ToListAsync();

        int streak = 0;
        var currentDate = today;

        foreach (var p in progress)
        {
            if (p.Date.Date != currentDate)
                break;

            if (p.IsCompleted)
                streak++;
            else
                break;

            currentDate = currentDate.AddDays(-1);
        }

        return streak;
    }

    public async Task<int> GetLongestStreakAsync(int habitId)
    {
        var progress = await _context.HabitProgresses
            .Where(p => p.HabitId == habitId)
            .OrderBy(p => p.Date)
            .ToListAsync();

        int currentStreak = 0;
        int longestStreak = 0;
        DateTime? lastDate = null;

        foreach (var p in progress)
        {
            if (!p.IsCompleted)
            {
                currentStreak = 0;
                continue;
            }

            if (lastDate == null || p.Date == lastDate.Value.AddDays(1))
            {
                currentStreak++;
                longestStreak = Math.Max(longestStreak, currentStreak);
            }
            else
            {
                currentStreak = 1;
            }

            lastDate = p.Date;
        }

        return longestStreak;
    }
}
