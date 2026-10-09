# Nutr Challenge Frontend

Frontend application for the Nutr Challenge project, built with React and Vite.

The application communicates with the [Nutr Challenge API](https://github.com/EmanuelNRodrigues/nutr_challenge_api) to access backend functionality.

## Tech Stack

* React
* Vite
* React Router
* Tailwind CSS
* Lucide React icons

## Prerequisites

* Node.js (use a version compatible with the project's Vite version)
* npm
* Docker

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/EmanuelNRodrigues/nutr_challenge_fr.git
cd nutr_challenge_fr
```

### 2. Start the application with Docker

```bash
docker compose up --build
```

Open the local URL displayed in your terminal by Vite.
I expect to be http://localhost:5173/


## Relevant Pages

http://localhost:5173/ - Guest Appointment Page
http://localhost:5173/nutritionist/:id - Selects one Nutritionist page to review Guest Appointments

## Backend Configuration

The frontend depends on the Nutr Challenge API.

The Vite configuration includes a development proxy for `/api` targeting `http://host.docker.internal:3000`, which is intended for a Docker-based development environment.

Ensure the backend is running and that the API proxy target matches your environment.

If the API URL is configurable through environment variables, document the required variable names and provide an `.env.example` file.

The generated production assets are placed in the `dist/` directory.

## Related Repository

* [Nutr Challenge API](https://github.com/EmanuelNRodrigues/nutr_challenge_api)

## Notes

* Vite provides the development server and hot module replacement.
* The API proxy must be configured correctly for frontend-backend communication.
* Do not commit environment files containing secrets.
