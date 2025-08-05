# TripPlanner AI - Full Stack Web Application

A modern travel planning application that uses AI to generate personalized trip itineraries, hotel recommendations, and day-by-day plans.

## Features

- **User Authentication**: Secure login/register system with JWT tokens
- **AI-Powered Trip Planning**: Generate personalized travel plans using Google Gemini AI
- **Location Autocomplete**: Smart location suggestions for destinations
- **Hotel Recommendations**: AI-curated hotel options with ratings and prices
- **Day-by-Day Itineraries**: Detailed daily plans with activities and timing
- **Modern UI**: Beautiful, responsive design with dark theme and animations
- **Trip Management**: Create, view, and delete trips

## Tech Stack

### Frontend
- React 19 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Google Gemini AI for trip generation
- bcrypt for password hashing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Google Gemini API key

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd tripPlanner
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_BACKEND=http://localhost:5000/api
```

### 4. Run the Application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Usage

1. **Register/Login**: Create an account or sign in
2. **Create Trip**: Click "Create New Trip" and fill in:
   - Destination (with autocomplete)
   - Budget level (Budget/Moderate/Luxury)
   - Number of travelers
   - Trip duration
3. **AI Planning**: The AI will generate:
   - Hotel recommendations with prices and ratings
   - Day-by-day itinerary with activities
4. **Manage Trips**: View, edit, or delete your trips from the dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status

### Trips
- `POST /api/trips/create` - Create new trip
- `GET /api/trips/saved` - Get user's saved trips
- `GET /api/trips/:id` - Get specific trip details
- `DELETE /api/trips/:id` - Delete trip

## Project Structure

```
tripPlanner/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   └── ...
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 