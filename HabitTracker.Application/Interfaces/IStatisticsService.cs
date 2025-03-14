using HabitTracker.Application.DTOs;

namespace HabitTracker.Application.Interfaces;

public interface IStatisticsService
{
    Task<HabitStatisticsDto> GetHabitStatisticsAsync(int habitId, string userId);
    Task<CategoryStatisticsDto> GetCategoryStatisticsAsync(int categoryId, string userId);
    Task<UserStatisticsDto> GetUserStatisticsAsync(string userId);
}
