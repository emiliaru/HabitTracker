using HabitTracker.Core.Models;

namespace HabitTracker.Application.DTOs;

public class HabitDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public FrequencyType Frequency { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsArchived { get; set; }
}

public class CreateHabitDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public FrequencyType Frequency { get; set; }
}

public class UpdateHabitDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public FrequencyType Frequency { get; set; }
    public bool IsArchived { get; set; }
}
