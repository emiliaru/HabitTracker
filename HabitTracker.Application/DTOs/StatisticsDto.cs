namespace HabitTracker.Application.DTOs;

public class StatisticsDto
{
    public UserStatisticsDto UserStatistics { get; set; } = new();
    public List<CategoryStatisticsDto> CategoryStatistics { get; set; } = new();
    public List<HabitStatisticsDto> HabitStatistics { get; set; } = new();
}

public class HabitStatisticsDto
{
    public int HabitId { get; set; }
    public string HabitName { get; set; } = string.Empty;
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public double CompletionRate { get; set; }
    public int TotalCompletions { get; set; }
    public int DaysTracked { get; set; }
    public Dictionary<string, int> CompletionsByDay { get; set; } = new();
}

public class CategoryStatisticsDto
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public int TotalHabits { get; set; }
    public int ActiveHabits { get; set; }
    public double AverageCompletionRate { get; set; }
    public Dictionary<string, int> HabitsByFrequency { get; set; } = new();
}

public class UserStatisticsDto
{
    public int TotalHabits { get; set; }
    public int ActiveHabits { get; set; }
    public int TotalCategories { get; set; }
    public double OverallCompletionRate { get; set; }
    public Dictionary<string, double> CompletionRateByCategory { get; set; } = new();
    public List<HabitStatisticsDto> TopPerformingHabits { get; set; } = new();
    public List<HabitStatisticsDto> NeedsAttentionHabits { get; set; } = new();
}
