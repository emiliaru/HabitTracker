using HabitTracker.Application.DTOs;
using HabitTracker.Application.Interfaces;
using HabitTracker.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace HabitTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HabitsController : ControllerBase
{
    private readonly IHabitRepository _habitRepository;

    public HabitsController(IHabitRepository habitRepository)
    {
        _habitRepository = habitRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<HabitDto>>> GetHabits()
    {
        // TODO: Get actual user ID from authentication
        var userId = "test-user";
        var habits = await _habitRepository.GetAllHabitsAsync(userId);
        var habitDtos = habits.Select(h => new HabitDto
        {
            Id = h.Id,
            Name = h.Name,
            Description = h.Description,
            Frequency = h.Frequency,
            CreatedAt = h.CreatedAt,
            IsArchived = h.IsArchived
        });

        return Ok(habitDtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HabitDto>> GetHabit(int id)
    {
        var userId = "test-user";
        var habit = await _habitRepository.GetHabitByIdAsync(id, userId);

        if (habit == null)
        {
            return NotFound();
        }

        var habitDto = new HabitDto
        {
            Id = habit.Id,
            Name = habit.Name,
            Description = habit.Description,
            Frequency = habit.Frequency,
            CreatedAt = habit.CreatedAt,
            IsArchived = habit.IsArchived
        };

        return Ok(habitDto);
    }

    [HttpPost]
    public async Task<ActionResult<HabitDto>> CreateHabit(CreateHabitDto createHabitDto)
    {
        var userId = "test-user";
        var habit = new Habit
        {
            Name = createHabitDto.Name,
            Description = createHabitDto.Description,
            Frequency = createHabitDto.Frequency,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        await _habitRepository.CreateHabitAsync(habit);

        var habitDto = new HabitDto
        {
            Id = habit.Id,
            Name = habit.Name,
            Description = habit.Description,
            Frequency = habit.Frequency,
            CreatedAt = habit.CreatedAt,
            IsArchived = habit.IsArchived
        };

        return CreatedAtAction(nameof(GetHabit), new { id = habit.Id }, habitDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHabit(int id, UpdateHabitDto updateHabitDto)
    {
        var userId = "test-user";
        var habit = await _habitRepository.GetHabitByIdAsync(id, userId);

        if (habit == null)
        {
            return NotFound();
        }

        habit.Name = updateHabitDto.Name;
        habit.Description = updateHabitDto.Description;
        habit.Frequency = updateHabitDto.Frequency;
        habit.IsArchived = updateHabitDto.IsArchived;

        await _habitRepository.UpdateHabitAsync(habit);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHabit(int id)
    {
        var userId = "test-user";
        await _habitRepository.DeleteHabitAsync(id, userId);
        return NoContent();
    }

    [HttpGet("{id}/progress")]
    public async Task<ActionResult<IEnumerable<HabitProgress>>> GetHabitProgress(int id, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
    {
        var progress = await _habitRepository.GetHabitProgressAsync(id, startDate, endDate);
        return Ok(progress);
    }

    [HttpPost("{id}/progress")]
    public async Task<ActionResult<HabitProgress>> AddProgress(int id, [FromBody] HabitProgress progress)
    {
        progress.HabitId = id;
        var result = await _habitRepository.AddProgressAsync(progress);
        return CreatedAtAction(nameof(GetHabitProgress), new { id, startDate = progress.Date, endDate = progress.Date }, result);
    }
}
