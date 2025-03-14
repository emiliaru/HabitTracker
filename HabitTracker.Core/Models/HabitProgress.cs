namespace HabitTracker.Core.Models;

public class HabitProgress
{
    public int Id { get; set; }
    public int HabitId { get; set; }
    public DateTime Date { get; set; }
    public bool IsCompleted { get; set; }
    public string? Notes { get; set; }
    
    public Habit Habit { get; set; } = null!;
}
