# Application for auctions and bidding.
This application provides a platform for users to participate in auctions, allowing them to bid on a wide range of products. The app is built with a React frontend and a Spring Boot backend, offering a seamless and responsive user experience.
# Requirements
- **Docker**
- **Node.js** [18.16.0]
- **npm** [9.5.1]
- **Java** [17]
- **Maven** [3.8.1]
- **Spring Boot** [3.2.3]
- **React** [18.2.0]
- **PostgreSQL** [15] with database named **auction**
# Installation
## Secrets setup
First you need to set secrets in your root folders
### Backend
You need to add secrets in `.env` file (for starting app via containers) or `backend/.env` file (for starting app manually).
Contents should be like below:
```
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
AWS_ACCESS_KEY=...
AWS_SECRET_KEY=...
AWS_S3_BUCKET=...
JWT_SECRET=...
JWT_EXPIRATION=...
```
Exact keys will be provided privately.
### Frontend
In `frontend/.env`, `REACT_APP_API_URL` must be set. Default value is set to `localhost:8086` and if you need to change port, you must change it in `application.properties` and in `docker-compose.yaml`
## Docker
App is containerized, which means you can start the app using Docker. Using terminal, place yourself in the root folder of project and simply execute `docker compose up` which will start all containers (PostgreSQL, backend and frontend). You can also use `docker compose up -d` which will detach your terminal from executing containers and you will be able to see logs in `Docker Desktop`.
## Manual Setup
### Backend
1. Navigate to the backend directory: `cd backend`
2. Install maven dependencies: `mvn -U clean install`
3. Run the Spring Boot application `mvn spring-boot:run`

All necessary values will be provided through direct conversation
### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install npm packages: `npm install`
3. Start the React app: `npm start`
# Usage
## Frontend
Once both the frontend and backend servers are running, navigate to `http://localhost:3000` in your web browser to start using the Auction and Bidding App.
## Backend
For testing purposes, Swagger is available at `http://localhost:8086/swagger-ui/index.html`.
## Database
If there is a problem with migration, simply execute the script `dropping.sql` in `pgAdmin` and it will clear database of all content.
## AWS
AWS is needed for starting backend, because pictures of products are stored on an S3 bucket. In `application.properties` or in `.env`, you need to set AWS public and secret key for an account which has access, which is described in section for backend setup. You are allowed to add new content to S3 (new pictures of your test products), but you are NOT ALLOWED to modify content from other users, since bucket is shared among users.
