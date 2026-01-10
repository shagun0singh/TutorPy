# TutorPy

An AI-powered Python learning tutor that guides users step-by-step through programming concepts.

## Project Structure

```
TutorPy/
├── frontend/           # Frontend files (HTML, CSS, JavaScript)
│   ├── index.html     # Main UI
│   ├── style.css      # Styling
│   └── app.js         # Frontend logic
├── backend/           # Backend server (Node.js + Express)
│   ├── server.js      # Express server
│   └── package.json   # Backend dependencies
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your settings:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT tokens

4. Make sure MongoDB is running:
   - **Local MongoDB**: Install and start MongoDB on your machine
   - **MongoDB Atlas**: Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and use the connection string

5. Start the server:
   ```bash
   npm start
   ```
   Or use `npm run dev` for development with auto-restart.

The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Open `frontend/index.html` in your browser, or use a simple HTTP server:
   ```bash
   cd frontend
   python3 -m http.server 8000
   ```

2. Visit `http://localhost:8000` in your browser.

## Features

- ✅ ChatGPT-like single-page interface
- ✅ Frontend: Plain HTML, CSS, vanilla JavaScript
- ✅ Backend: Node.js with Express
- ✅ MongoDB database connection
- ✅ User authentication (signup/login with JWT)
- ✅ Protected chat routes
- ⏳ AI logic (to be implemented)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Chat
- `POST /api/chat` - Send a message (requires authentication)
  ```json
  {
    "message": "How do I create a for loop in Python?"
  }
  ```
  Headers: `Authorization: Bearer <token>`

### Other
- `GET /health` - Check server and database status
- `GET /` - API information

## How It Works

1. User signs up or logs in
2. Frontend receives JWT token and stores it
3. User enters a Python problem or concept in the chat interface
4. Frontend sends the message with JWT token to the backend
5. Backend verifies authentication and processes the message
6. Backend returns a response to guide the user
7. Frontend displays the AI's response in the chat

## Next Steps

- Implement AI logic in the backend
- Add problem clarification detection
- Add "Thinking mode" for explaining approach without code
- (Future) Add Python code execution
- (Future) Add Monaco editor integration

