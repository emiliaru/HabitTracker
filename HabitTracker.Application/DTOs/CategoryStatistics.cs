namespace HabitTracker.Application.DTOs;

public class CategoryStatistics
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public int TotalHabits { get; set; }
    public int ActiveHabits { get; set; }
    public double AverageCompletionRate { get; set; }
    public Dictionary<string, int> HabitsByFrequency { get; set; } = new();
}
