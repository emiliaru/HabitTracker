using HabitTracker.Application.Interfaces;
using HabitTracker.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace HabitTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IHabitRepository _repository;

    public CategoriesController(IHabitRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        // TODO: Get actual user ID from authentication
        var userId = "test-user";
        var categories = await _repository.GetAllCategoriesAsync(userId);
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Category>> GetCategory(int id)
    {
        var userId = "test-user";
        var category = await _repository.GetCategoryByIdAsync(id, userId);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(Category category)
    {
        category.UserId = "test-user"; // TODO: Get from authentication
        var result = await _repository.CreateCategoryAsync(category);
        return CreatedAtAction(nameof(GetCategory), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, Category category)
    {
        var userId = "test-user";
        var existingCategory = await _repository.GetCategoryByIdAsync(id, userId);

        if (existingCategory == null)
        {
            return NotFound();
        }

        existingCategory.Name = category.Name;
        existingCategory.Color = category.Color;
        existingCategory.Icon = category.Icon;

        await _repository.UpdateCategoryAsync(existingCategory);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var userId = "test-user";
        await _repository.DeleteCategoryAsync(id, userId);
        return NoContent();
    }

    [HttpGet("{id}/habits")]
    public async Task<ActionResult<IEnumerable<Habit>>> GetHabitsByCategory(int id)
    {
        var userId = "test-user";
        var habits = await _repository.GetHabitsByCategoryAsync(id, userId);
        return Ok(habits);
    }
}
