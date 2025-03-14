using HabitTracker.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace HabitTracker.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Habit> Habits => Set<Habit>();
    public DbSet<HabitProgress> HabitProgresses => Set<HabitProgress>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Habit>()
            .HasMany(h => h.Progress)
            .WithOne(p => p.Habit)
            .HasForeignKey(p => p.HabitId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Habit>()
            .Property(h => h.Name)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<Habit>()
            .HasOne(h => h.Category)
            .WithMany(c => c.Habits)
            .HasForeignKey(h => h.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Category>()
            .Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(50);

        modelBuilder.Entity<Category>()
            .Property(c => c.Color)
            .IsRequired()
            .HasMaxLength(7);

        modelBuilder.Entity<HabitProgress>()
            .HasIndex(p => new { p.HabitId, p.Date })
            .IsUnique();
    }
}
