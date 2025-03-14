namespace HabitTracker.Core.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#2196f3"; // Default blue color
    public string? Icon { get; set; }
    public string UserId { get; set; } = string.Empty;
    public ICollection<Habit> Habits { get; set; } = new List<Habit>();
}
