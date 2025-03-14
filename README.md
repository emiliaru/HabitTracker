# Habit Tracker

A modern web application for tracking daily, weekly, and monthly habits. Built with .NET 8 and Clean Architecture principles.

## Tech Stack

### Backend
- ASP.NET Core 8 Web API
- Entity Framework Core with SQL Server
- Clean Architecture
- Repository Pattern

### Frontend (Coming Soon)
- React with TypeScript
- Material-UI
- React Query
- React Router

## Project Structure

- `HabitTracker.API` - Web API layer
- `HabitTracker.Core` - Domain models and business logic
- `HabitTracker.Application` - Application interfaces and DTOs
- `HabitTracker.Infrastructure` - Data access and external services

## Getting Started

### Prerequisites
- .NET 8 SDK
- SQL Server (LocalDB or full instance)
- Visual Studio 2022 or VS Code

### Setup

1. Clone the repository
2. Navigate to the project directory
3. Run the following commands:

```bash
# Restore dependencies
dotnet restore

# Create database (from HabitTracker.API directory)
dotnet ef database update

# Run the application
dotnet run --project HabitTracker.API
```

The API will be available at:
- HTTPS: https://localhost:7001
- HTTP: http://localhost:5000

## API Endpoints

### Habits
- `GET /api/habits` - Get all habits
- `GET /api/habits/{id}` - Get a specific habit
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/{id}` - Update a habit
- `DELETE /api/habits/{id}` - Delete a habit

### Habit Progress
- `GET /api/habits/{id}/progress` - Get progress for a habit
- `POST /api/habits/{id}/progress` - Add progress for a habit

## Features

- ✅ Create, read, update, and delete habits
- ✅ Track daily, weekly, or monthly habits
- ✅ Record progress for each habit
- ✅ View habit completion statistics
- ✅ Archive completed or abandoned habits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
