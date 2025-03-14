# Śledzik Nawyków

Nowoczesna aplikacja webowa do śledzenia codziennych, tygodniowych i miesięcznych nawyków. Zbudowana przy użyciu .NET 8 i React, z pięknym interfejsem Material-UI i kompleksowym systemem statystyk.

## Technologie

### Backend
- ASP.NET Core 8 Web API
- Entity Framework Core z MySQL
- Architektura Clean Architecture
- Wzorzec Repository
- Serwis statystyk do analizy nawyków

### Frontend
- React z TypeScript
- Komponenty Material-UI
- React Query do pobierania danych
- Tryb ciemny/jasny
- Responsywny design

## Funkcjonalności

- Tworzenie i zarządzanie nawykami z dostosowywanymi częstotliwościami
- Śledzenie dziennych postępów i serii
- Kompleksowe statystyki i analizy
  - Aktualne i najdłuższe serie
  - Wskaźniki ukończenia
  - Postępy według dni tygodnia
  - Analityka według kategorii
- Tryb ciemny/jasny z wykrywaniem preferencji systemowych
- Nowoczesny, responsywny interfejs z płynnymi animacjami
- Organizacja nawyków w kategorie
- Archiwizacja ukończonych lub porzuconych nawyków

## Struktura Projektu

- `HabitTracker.API` - Endpointy API i konfiguracja
- `HabitTracker.Core` - Modele domenowe i encje
- `HabitTracker.Application` - Serwisy aplikacyjne, interfejsy i DTOs
- `HabitTracker.Infrastructure` - Dostęp do danych i usługi zewnętrzne
- `habit-tracker-client` - Aplikacja frontendowa React

## Jak Zacząć

### Wymagania
- .NET 8 SDK
- MySQL Server
- Node.js i npm
- Visual Studio 2022, VS Code lub preferowane IDE

### Instalacja

1. Sklonuj repozytorium
2. Skonfiguruj połączenie z bazą danych w `appsettings.json`
3. Przejdź do katalogu projektu
4. Uruchom następujące komendy:

```bash
# Konfiguracja backendu
dotnet restore
dotnet ef database update --project HabitTracker.Infrastructure --startup-project HabitTracker.API
dotnet run --project HabitTracker.API

# Konfiguracja frontendu
cd habit-tracker-client
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresami:
- Backend API: http://localhost:5000
- Frontend: http://localhost:5174

## Endpointy API

### Nawyki
- `GET /api/habits` - Pobierz wszystkie nawyki
- `GET /api/habits/{id}` - Pobierz konkretny nawyk
- `POST /api/habits` - Utwórz nowy nawyk
- `PUT /api/habits/{id}` - Zaktualizuj nawyk
- `DELETE /api/habits/{id}` - Usuń nawyk

### Statystyki
- `GET /api/statistics/habit/{id}` - Pobierz statystyki nawyku
- `GET /api/statistics/category/{id}` - Pobierz statystyki kategorii
- `GET /api/statistics/user` - Pobierz statystyki użytkownika

### Kategorie
- `GET /api/categories` - Pobierz wszystkie kategorie
- `POST /api/categories` - Utwórz nową kategorię
- `PUT /api/categories/{id}` - Zaktualizuj kategorię
- `DELETE /api/categories/{id}` - Usuń kategorię
