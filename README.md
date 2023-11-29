
# Chop Money Authentication System

This project implements an Authentication System using Node.js with Express as the backend and MongoDB as the database.

## Getting Started

### Prerequisites

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://www.mongodb.com/try/download/community)
- Git: [Download and Install Git](https://git-scm.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/{your-github-username}/chop-money-task.git
```

2. Change into the project directory:

```bash
cd chop-money-task
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the project root and add the following:

```env
MONGODB_URI=mongodb://localhost:27017/chop-money
PORT=8080
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
```

Make sure to replace `your-email@gmail.com` and `your-email-password` with your actual Gmail credentials.

### Running the Application

```bash
npm run dev
```

The server will start at `http://localhost:8080`.

## API Endpoints

- **POST /register**: Register a new user.
- **POST /login**: Log in and get an authentication token.
- **POST /initiate-reset**: Initiate the password reset process.
- **POST /complete-reset**: Complete the password reset process.
- **GET /users**: Get a list of all users (protected route).
- **GET /users/:userId**: Get details of a specific user (protected route).


Remember to replace `{your-github-username}` in the GitHub repository URL and update the content based on your specific project structure and features.