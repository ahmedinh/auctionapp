# Application for auctions and bidding.
This application provides a platform for users to participate in auctions, allowing them to bid on a wide range of products. The app is built with a React frontend and a Spring Boot backend, offering a seamless and responsive user experience.
# Requirements
- **Node.js** [18.16.0]
- **npm** [9.5.1]
- **Java** [17]
- **Maven** [3.8.1]
- **Spring Boot** [3.2.3]
- **React** [18.2.0]
- **PostgreSQL** [16.2] with database named **auction**
# Installation
## Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install maven dependencies: `mvn -U clean install`
3. Run the Spring Boot application `mvn spring-boot:run`

In order to start backend, you need .env file which will contain secrets for AWS S3 bucket and Stripe. Content should be this:
```
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
AWS_ACCESS_KEY=...
AWS_SECRET_KEY=...
AWS_S3_BUCKET=...
```
All necessary values will be provided through direct conversation
## Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install npm packages: `npm install`
3. Start the React app: `npm start`
# Usage
## Frontend
Once both the frontend and backend servers are running, navigate to `http://localhost:3000` in your web browser to start using the Auction and Bidding App.
## Backend
For testing purposes, Swagger is available at `http://localhost:8086/swagger-ui/index.html`.
## Database
For easier startup of database, docker-compose file is added. Steps to start database with Docker:
1. Download Docker.
2. Enter the backend folder using command `cd backend` and then type in `docker compose up -d`. This will download latest PostgreSQL image and run it.
If there is a problem with migration, simply execute the script `dropping.sql` in `pgAdmin` and it will clear database of all content.
## AWS
AWS is needed for starting backend, because pictures of products are stored on an S3 bucket. In `application.properties` or in `.env`, you need to set AWS public and secret key for an account which has access, which is described in section for backend setup. You are allowed to add new content to S3 (new pictures of your test products), but you are NOT ALLOWED to modify content from other users, since bucket is shared among users.
