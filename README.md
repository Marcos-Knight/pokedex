# Pokedex – Full Stack Application

This is a full stack Pokedex application built with Angular (frontend) and NestJS (backend).

The application consumes data from the public PokeAPI. The backend layer fetches, normalizes and exposes structured data to the client. 

## Tech Stack

### Frontend

- Angular
- RxJS
- Angular Router
- HttpClient
- SCSS
- Nginx (for serving the built application in Docker)

### Backend

- NestJS
- Jest (unit testing)

### Infrastructure

- Docker
- Docker Compose
- Nginx with SPA fallback configuration

## Features

### Pokemon List Page

- Paginated listing using limit/offset
- "Load more" functionality
- Search by name or ID
- Loading spinner
- Empty state handling
- Navigation to details page

### Pokemon Details Page

- Official artwork
- Height (converted to meters)
- Weight (converted to kilograms)
- Types
- Abilities
- Base stats
- Pokemon cry audio (OGG)
- Clickable sound icon
- Back navigation
- Loading state handling

## Environment Configuration

The backend uses environment variables via `@nestjs/config`.

Example (`api/.env`):

```
PORT=3000
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

## Running the Project

### Using Docker (recommended)

From the project root:

```
docker compose up --build
```

Frontend:
http://localhost:4200

Backend:
http://localhost:3000


### Running Locally

Backend:

```
cd api
npm install
npm start
```

Frontend:

```
cd app
npm install
npm start
```

## Testing

Unit tests were implemented in the backend using Jest.

The tests focus on:

- Service logic
- Data transformation
- Error handling
- Mocking external API calls

### Running Tests
```
cd api
npm install
npm run test
```

## Technical Decisions

- A backend layer was added to decouple the frontend from the external API.
- Data transformation is centralized in the backend to keep the frontend simpler.
- Separate pages were used instead of a modal to improve navigation and routing clarity.
- Minimal global state management was used to avoid unnecessary complexity.
- Docker was included to simulate a production-like environment.
- Nginx was configured to correctly handle client-side routing for the Angular SPA.

## Possible Improvements

- Integration tests
- Backend caching layer
- Improved UI
- Structured logging
- CI pipeline configuration


## Author

Marcos dos Santos Souza
