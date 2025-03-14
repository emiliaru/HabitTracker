using HabitTracker.Application.DTOs;
using HabitTracker.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace HabitTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly IStatisticsService _statisticsService;

    public StatisticsController(IStatisticsService statisticsService)
    {
        _statisticsService = statisticsService;
    }

    [HttpGet("habits/{habitId}")]
    public async Task<ActionResult<HabitStatistics>> GetHabitStatistics(int habitId)
    {
        try
        {
            var userId = "test-user"; // TODO: Get from authentication
            var statistics = await _statisticsService.GetHabitStatisticsAsync(habitId, userId);
            return Ok(statistics);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("categories/{categoryId}")]
    public async Task<ActionResult<CategoryStatistics>> GetCategoryStatistics(int categoryId)
    {
        try
        {
            var userId = "test-user";
            var statistics = await _statisticsService.GetCategoryStatisticsAsync(categoryId, userId);
            return Ok(statistics);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("user")]
    public async Task<ActionResult<UserStatistics>> GetUserStatistics()
    {
        var userId = "test-user";
        var statistics = await _statisticsService.GetUserStatisticsAsync(userId);
        return Ok(statistics);
    }
}
