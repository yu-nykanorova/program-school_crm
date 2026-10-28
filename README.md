# Programming School CRM

A full-stack CRM application for managing a programming school's student orders and managers.

The application provides authentication, role-based access, orders management, filtering, sorting, managers administration, orders group management, orders comments, statistics, and Excel export functionality.

The project is built with React, TypeScript, Node.js, and Express.js. It uses MongoDB Atlas as a cloud database and Docker Compose for local containerized deployment. The frontend and backend are also deployed separately, allowing the application to be accessed online without installing any dependencies.

## Live Demo
***Please Note***: The backend is hosted on Render's free service and the first request may take longer than usual. Please allow some time for the backend to start before retrying.

- **Frontend:** https://program-school-crm.vercel.app/
- **Backend API:** https://program-school-crm-api.onrender.com
- **API Documentation (Swagger):** https://program-school-crm-api.onrender.com/docs/

## Features
### 1. Authentication and Authorization
User login and logout.  
JWT-based authentication using access and refresh tokens.   
Automatic access token refresh.     
Authentication state management.    
Protected routes and role-based access control.
### 2. User Roles
Admin - access to managers and orders management functionality.  
Manager - access to orders management functionality.
### 3. Managers
View managers information and statuses.   
Create managers.    
Ban and unban managers.     
Manage activation requests.
### 4. Orders
View applications in a table.   
Retrieve application details.   
Filter and sort applications by available fields.    
Navigate through paginated results.  
Edit application information.   
Assign managers and groups.  
Manage application statuses.    
Add and view application comments.  
Export application data to Excel.
### 5. Groups
Retrieve available groups.  
Create groups.  
Assign applications to groups.

## Technologies
**Frontend**
- React 19
- TypeScript
- Vite
- Redux Toolkit, React Redux
- React Router
- Axios
- React Hook Form
- Zod
- SCSS
**Backend**
- Node.js
- Express.js 5
- Typescript
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Joi
- Cron
- ExcelJS
- Swagger UI Express
**Deployment and Tools
- Docker, Docker Compose
- Nginx
- MongoDB Atlas
- Vercel
- Render
- Postman

## Database & Seed Data

- Orders were imported into database from the provided data dump, which was subsequently extended and modified during development.
- Manager accounts and groups were generated and added to the database using a seed script.

## Getting Started

There are two ways to run the project locally:
- Using Docker Compose. Requires Docker Desktop with Docker Compose;
- Without Docker. Requires Node.js 20.x, npm.

The project uses MongoDB Atlas as a cloud database, so a local MongoDB installation is not required.

### 1. Clone the Repository
```bash
git clone git@github.com:yu-nykanorova/program-school_crm.git
cd program-school_crm
```
or download zip from this **[repository](https://github.com/yu-nykanorova/program-school_crm)**

### 2. Configure Environment Variables

Create the following files using the provided environment configuration:
- for running without Docker:
  - backend/.env using .env.example from backend folder;
  - frontend/.env using .env.example from frontend folder.
- for running with Docker:
    - backend/.env.docker using .env.example from backend folder;
    - frontend/.env using .env.example from frontend folder.

***Please Note***: The difference between backend/.env and backend/.env.docker is in variable FRONT_URL. 

**Data for the environment variables can be downloaded [HERE](https://drive.google.com/file/d/1fV-rv0UZkYw5C88fYVs2FPv6sGZOTcc2/view?usp=drive_link)**

### 3. Run with Docker Compose
Make sure Docker Desktop is running.

From the project root directory, execute:
```bash
docker compose up --build
```
Once the containers are running, open the application:  

Frontend: http://localhost:5555     
Backend API: http://localhost:3000  
Swagger UI: http://localhost:3000/docs/

To stop the containers, execute:
```bash
docker compose down
```

### 4. Run Without Docker
To run the frontend and backend separately, open two terminal (windows or bash) from the project root directory.    
Navigate to the backend directory in one terminal:
```bash
cd backend
npm ci
npm run start
```
The backend will start in development mode and the API will be available at: http://localhost:3000

Navigate to the frontend directory in separate terminal:
```bash
cd frontend
npm ci
npm run dev
```
Vite will display the local development URL, by default, it is: http://localhost:5173

## Test Accounts
The project includes a predefined administrator account and a test manager account.     
Use these accounts to sign in to the online application or a locally running instance connected to the provided test database.

***Administrator***:  
Email: admin@gmail.com  
Password: admin

***Manager***:  
Email: manager32@test.com   
Password: CCCccc333@

## API Documentation
The backend API is documented using Swagger.    
Online documentation: https://program-school-crm-api.onrender.com/docs/     
Open this link and select the required address in the server field:
- https://program-school-crm-api.onrender.com for testing deployed backend;
- http://localhost:3000 for local testing.

Authenticated endpoints require a valid access token. Use the authentication functionality documented in Swagger to authorize requests.

## Postman

The repository includes a Postman collection for testing the backend API (folder "postman" in the project root directory).  
Import both files into your Postman.    
Select the imported environment before sending requests.

For testing the API with Postman, the following steps are recommended:
- Authentication - log in using the provided test accounts and obtain the authentication tokens, refresh tokens;
- Orders - retrieve orders, test filtering, sorting and pagination, test order data export;
- Order editing - update order fields, assign groups, change statuses, and add comments where permitted;
- Managers - create manager, retrieve managers, test sorting and pagination, change statuses;
- Statistics - retrieve orders statistic.

## Deployment
The application is deployed using separate services:

**Frontend**: Vercel    
**Backend**: Render     
**Database**: MongoDB Atlas