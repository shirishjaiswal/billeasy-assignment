# 📚 Billeasy Assignment – Book Review API

A backend API built with **Express.js**, **Prisma ORM**, and **JWT Authentication** to manage users, books, and reviews. The project follows a clean architecture with Controllers, Services, and Repositories layers.

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/shirishjaiswal/billeasy-assignment.git
cd billeasy_assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory with the following content:
```
DATABASE_URL="mysql://user:password@localhost:3306/your_db"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="1d"
SERVER_PORT=5000
```

### 4. Prisma Setup
#### Generate Prisma Client
```bash
npx prisma generate
```

#### Run Migrations
```bash
npx prisma migrate dev --name init
```

#### Open Prisma Studio (Optional)
```bash
npx prisma studio
```

#### Database Schema Visual
![alt text](db-visual.png)

## 🏁 Running the Server
### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 🔐 Authentication
For protected routes, include the JWT token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

## 📑 API Documentation
API documentation is available at

(option - 1)
```
https://documenter.getpostman.com/view/26780968/2sB2x2Htbh
```
(Option -2)
```
Step-1 : Open Postman
Step-2 : Click on Import
Step-3 : Select the file present in repo :: /postman/collections/26780968-475720fa-a7e0-42ca-b7f8-0c522f25cf45.json

Now you can use the APIs in Postman
```

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**

## 👨‍💻 Author
Shirish Jaiswal

## 📝 Notes
- Ensure your database (MySQL/PostgreSQL) is running and accessible before executing migrations.
- Replace `your-username` in the clone command with your actual GitHub username.
- For further customization, such as generating a sample `.env` file or adding deployment instructions, please specify your requirements.