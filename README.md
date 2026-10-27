# Programming School CRM

A full-stack CRM application for managing a programming school's student orders and managers.

The application provides authentication, role-based access, orders management, filtering, sorting, manager administration, orders group management, order comments, statistics, and Excel export functionality.

The project is built with React, TypeScript, Node.js, and Express.js. It uses MongoDB Atlas as a cloud database and Docker Compose for local containerized deployment. The frontend and backend are also deployed separately, allowing the application to be accessed online without installing any dependencies.

## Live Demo
- **Frontend:** https://program-school-crm.vercel.app/
- **Backend API:** https://program-school-crm-api.onrender.com
- **API Documentation (Swagger):** https://program-school-crm-api.onrender.com/docs/

***Please Note***: The backend is hosted on Render's free service and the first request may take longer than usual. Please allow some time for the backend to start before retrying.

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
### 3. Manager Management
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
- Redux Toolkit
- React Redux
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
- Day.js
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

## Getting Started
