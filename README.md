# NASA Mission Control Project

## Public Website
[Link](https://nasa-api-frontend-d41r.onrender.com/)

## Overview
This is a **NASA Mission Control** project built with a **React.js frontend** and a **Node.js backend**. The project simulates a space mission control system where users can schedule and manage space launches.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Render.com, Docker

## API Endpoints
### Launches
- `GET /v1/launches` - Retrieves all scheduled launches.
- `POST /v1/launches` - Schedules a new space launch.
- `DELETE /v1/launches/:id` - Aborts a scheduled launch.

### Planets
- `GET /v1/planets` - Retrieves all habitable planets.

## Running the Project with Docker

### Prerequisites
- Install [Docker](https://www.docker.com/)
- Clone this repository:
  ```sh
  git clone https://github.com/hoan301298/NASA-project.git
  cd nasa-mission-control
  ```

### Docker Setup
Both the frontend and backend have their own **Dockerfiles** in their respective directories (`client/` and `server/`). The project uses **Docker Compose** to manage services.

### Running with Docker Compose
1. Ensure your `.env` files are set up in `client/` and `server/` directories.
2. Run the following command to build and start all services:
   ```sh
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)

### Individual Docker Setup
#### Running the Backend (Node.js)
1. Navigate to the `server/` folder:
   ```sh
   cd server
   ```
2. Build and run the Docker container:
   ```sh
   docker build . -t nasa-backend 
   docker run -p 8000:8000 nasa-backend
   ```

#### Running the Frontend (React.js)
1. Navigate to the `client/` folder:
   ```sh
   cd client
   ```
2. Build and run the Docker container:
   ```sh
   docker build . -t nasa-frontend
   docker run -p 3000:3000 nasa-frontend
   ```

### Downloading Docker Images from Docker Hub
If you prefer to pull pre-built images from Docker Hub instead of building them locally, you can use the following commands:

1. Backend
```sh
 docker pull hoantran301298/nasa-api-backend
 docker run -p 8000:8000 hoantran301298/nasa-api-backend
```

2. Frontend
```sh
 docker pull hoantran301298/nasa-api-frontend
 docker run -p 3000:3000 hoantran301298/nasa-api-frontend
```

## Environment Variables
Set up the following environment variables in `.env` files:
### Backend (`server/.env`)
```
MONGO_URL=???
PORT=8000
```

### Frontend (`client/.env`)
```
REACT_APP_SERVER_URL=localhost:8000/v1
```

## Contributing
Feel free to fork this repository and make improvements. Pull requests are welcome!

## License
MIT License


