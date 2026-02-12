# Pokedex

This is a full stack Pokedex application built with Angular (frontend) and NestJS (backend).  
The application consumes data from the public PokeAPI, but the frontend does not communicate with it directly. Instead, the backend acts as a middle layer responsible for fetching, normalizing and exposing the data in a simplified format.

The goal of this project was to simulate a real-world technical challenge with a limited development time (96 hours), focusing on clean architecture, data handling and reasonable production practices.

## Tech Stack

Frontend:
- Angular
- RxJS
- Angular Router
- HttpClient

Backend:
- NestJS
- Axios (via HttpService)
- @nestjs/config
- Jest for unit tests

Infrastructure:
- Docker
- Docker Compose
- Nginx (for serving Angular in container)

## Current data flow:

Angular App → NestJS API → PokeAPI

The backend:
- Fetches data from PokeAPI
- Normalizes response structure
- Converts height (decimeters to meters)
- Converts weight (hectograms to kg)
- Handles errors consistently
- Hides external API structure from the frontend

## Features

### Pokemon List
- Paginated listing (limit/offset)
- Load more functionality
- Search by name or id
- Loading states
- Empty state handling
- Navigation to detail page

### Pokemon Details
- Official artwork
- Height (converted to meters)
- Weight (converted to kilograms)
- Types
- Abilities
- Base stats
- Pokemon cry audio (ogg)
- Back navigation

---

## Environment Configuration

The backend uses environment variables via @nestjs/config.

Example `api/.env`:

PORT=3000
POKEAPI_BASE_URL=https://pokeapi.co/api/v2

A fallback value is defined in the service to avoid runtime errors if the variable is missing during local development.

---

## Running the Project

### Using Docker (recommended)

From the project root:

docker compose up --build

Frontend:
http://localhost:4200

Backend:
http://localhost:3000

---

### Running locally without Docker

Backend:

cd api  
npm install  
npm run start:dev  

Frontend:

cd app  
npm install  
npm start  

---

## Testing

Unit tests are implemented in the backend using Jest.

The focus of the tests:
- Service logic
- Data transformation
- Error handling
- Mocking external API calls

External HTTP calls are mocked to keep tests deterministic and independent from the real PokeAPI.

---

## What I Would Improve With More Time

- Add integration tests
- Improve UI styling and responsiveness
- Add caching layer in the backend
- Add request validation and logging
- Add CI pipeline
- Improve accessibility

---

## Author

Marcos dos Santos Souza
