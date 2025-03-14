# Habit Tracker

A modern web application for tracking daily, weekly, and monthly habits. Built with .NET 8 and React, featuring a beautiful Material-UI interface and comprehensive statistics tracking.

## Tech Stack

### Backend
- ASP.NET Core 8 Web API
- Entity Framework Core with MySQL
- Clean Architecture
- Repository Pattern
- Statistics Service for habit analytics

### Frontend
- React with TypeScript
- Material-UI components
- React Query for data fetching
- Dark/Light mode support
- Responsive design

## Features

- Create and manage habits with customizable frequencies
- Track daily progress and streaks
- Comprehensive statistics and analytics
  - Current and longest streaks
  - Completion rates
  - Progress by day of week
  - Category-based analytics
- Dark/Light mode with system preference detection
- Modern, responsive UI with smooth animations
- Category organization for habits
- Archive completed or abandoned habits

## Project Structure

- `HabitTracker.API` - Web API endpoints and configuration
- `HabitTracker.Core` - Domain models and entities
- `HabitTracker.Application` - Application services, interfaces, and DTOs
- `HabitTracker.Infrastructure` - Data access and external services
- `habit-tracker-client` - React frontend application

## Getting Started

### Prerequisites
- .NET 8 SDK
- MySQL Server
- Node.js and npm
- Visual Studio 2022, VS Code, or your preferred IDE

### Setup

1. Clone the repository
2. Set up the database connection in `appsettings.json`
3. Navigate to the project directory
4. Run the following commands:

```bash
# Backend setup
dotnet restore
dotnet ef database update --project HabitTracker.Infrastructure --startup-project HabitTracker.API
dotnet run --project HabitTracker.API

# Frontend setup
cd habit-tracker-client
npm install
npm run dev
```

The application will be available at:
- Backend API: http://localhost:5000
- Frontend: http://localhost:5174

## API Endpoints

### Habits
- `GET /api/habits` - Get all habits
- `GET /api/habits/{id}` - Get a specific habit
- `POST /api/habits` - Create a new habit
- `PUT /api/habits/{id}` - Update a habit
- `DELETE /api/habits/{id}` - Delete a habit

### Statistics
- `GET /api/statistics/habit/{id}` - Get habit statistics
- `GET /api/statistics/category/{id}` - Get category statistics
- `GET /api/statistics/user` - Get user statistics

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/{id}` - Update a category
- `DELETE /api/categories/{id}` - Delete a category
