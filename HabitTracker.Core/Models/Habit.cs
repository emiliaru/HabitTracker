using System.ComponentModel.DataAnnotations;

namespace HabitTracker.Core.Models;

public class Habit
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public FrequencyType Frequency { get; set; } = FrequencyType.Daily;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsArchived { get; set; }

    public bool IsCompleted { get; set; }

    public int? CategoryId { get; set; }
    public Category? Category { get; set; }

    public int? TargetDays { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Reminder { get; set; }

    public ICollection<HabitProgress> Progress { get; set; } = new List<HabitProgress>();
    public string UserId { get; set; } = string.Empty;
}

public enum FrequencyType
{
    Daily,
    Weekly,
    Monthly
}
