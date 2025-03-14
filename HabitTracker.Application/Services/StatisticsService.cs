using HabitTracker.Application.DTOs;
using HabitTracker.Application.Interfaces;
using HabitTracker.Core.Models;

namespace HabitTracker.Application.Services;

public class StatisticsService : IStatisticsService
{
    private readonly IHabitRepository _habitRepository;

    public StatisticsService(IHabitRepository habitRepository)
    {
        _habitRepository = habitRepository;
    }

    public async Task<HabitStatisticsDto> GetHabitStatisticsAsync(int habitId, string userId)
    {
        var habit = await _habitRepository.GetHabitByIdAsync(habitId, userId);
        if (habit == null)
        {
            throw new KeyNotFoundException($"Habit with ID {habitId} not found.");
        }

        var progress = await _habitRepository.GetHabitProgressAsync(habitId);
        var completedDays = progress.Count(p => p.IsCompleted);
        var totalDays = progress.Count;
        var completionRate = totalDays > 0 ? (completedDays * 100.0) / totalDays : 0;

        // Calculate streaks
        var currentStreak = 0;
        var longestStreak = 0;
        var currentCount = 0;

        var orderedProgress = progress.OrderByDescending(p => p.Date).ToList();
        for (var i = 0; i < orderedProgress.Count; i++)
        {
            if (orderedProgress[i].IsCompleted)
            {
                currentCount++;
                if (currentCount > longestStreak)
                {
                    longestStreak = currentCount;
                }
                if (i == 0)
                {
                    currentStreak = currentCount;
                }
            }
            else
            {
                if (i == 0)
                {
                    currentStreak = 0;
                }
                currentCount = 0;
            }
        }

        var completionsByDay = progress
            .GroupBy(p => p.Date.DayOfWeek)
            .ToDictionary(
                g => g.Key.ToString(),
                g => g.Count(p => p.IsCompleted)
            );

        return new HabitStatisticsDto
        {
            HabitId = habitId,
            HabitName = habit.Name,
            CurrentStreak = currentStreak,
            LongestStreak = longestStreak,
            CompletionRate = completionRate,
            TotalCompletions = completedDays,
            DaysTracked = totalDays,
            CompletionsByDay = completionsByDay
        };
    }

    public async Task<CategoryStatisticsDto> GetCategoryStatisticsAsync(int categoryId, string userId)
    {
        var category = await _habitRepository.GetCategoryByIdAsync(categoryId, userId);
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with ID {categoryId} not found.");
        }

        var habits = await _habitRepository.GetHabitsByCategoryAsync(categoryId, userId);
        var activeHabits = habits.Count(h => !h.IsArchived);

        var habitStats = await Task.WhenAll(
            habits.Select(h => GetHabitStatisticsAsync(h.Id, userId))
        );

        var averageCompletionRate = habitStats.Any() 
            ? habitStats.Average(s => s.CompletionRate)
            : 0;

        var habitsByFrequency = habits
            .GroupBy(h => h.Frequency.ToString())
            .ToDictionary(g => g.Key, g => g.Count());

        return new CategoryStatisticsDto
        {
            CategoryId = categoryId,
            CategoryName = category.Name,
            TotalHabits = habits.Count(),
            ActiveHabits = activeHabits,
            AverageCompletionRate = averageCompletionRate,
            HabitsByFrequency = habitsByFrequency
        };
    }

    public async Task<UserStatisticsDto> GetUserStatisticsAsync(string userId)
    {
        var habits = await _habitRepository.GetAllHabitsAsync(userId);
        var categories = await _habitRepository.GetAllCategoriesAsync(userId);

        var habitStats = await Task.WhenAll(
            habits.Select(h => GetHabitStatisticsAsync(h.Id, userId))
        );

        var completionRateByCategory = new Dictionary<string, double>();
        foreach (var category in categories)
        {
            try
            {
                var categoryStats = await GetCategoryStatisticsAsync(category.Id, userId);
                completionRateByCategory[category.Name] = categoryStats.AverageCompletionRate;
            }
            catch (KeyNotFoundException)
            {
                // Skip categories with no habits
                continue;
            }
        }

        return new UserStatisticsDto
        {
            TotalHabits = habits.Count(),
            ActiveHabits = habits.Count(h => !h.IsArchived),
            TotalCategories = categories.Count(),
            OverallCompletionRate = habitStats.Any() ? habitStats.Average(s => s.CompletionRate) : 0,
            CompletionRateByCategory = completionRateByCategory,
            TopPerformingHabits = habitStats
                .OrderByDescending(s => s.CompletionRate)
                .Take(5)
                .ToList(),
            NeedsAttentionHabits = habitStats
                .Where(s => s.CompletionRate < 50)
                .OrderBy(s => s.CompletionRate)
                .Take(5)
                .ToList()
        };
    }
}
