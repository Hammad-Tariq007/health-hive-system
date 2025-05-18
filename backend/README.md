
# Fitness Platform Backend

A complete Node.js + Express backend for the Fitness Platform, connected to MongoDB.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb+srv://fitnessfreaks:<db_password>@cluster0.pw659.mongodb.net/fitnessfreaks?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_key_here
FRONTEND_URL=http://localhost:5173
```

3. Run the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current logged in user
- `PUT /api/auth/profile` - Update user profile
- `DELETE /api/auth/delete` - Delete user account

### User Management (Admin Only)
- `GET /api/users` - View all users
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete a user

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get a specific workout
- `POST /api/workouts` - Create new workout (Admin)
- `PUT /api/workouts/:id` - Update workout (Admin)
- `DELETE /api/workouts/:id` - Delete workout (Admin)

### Nutrition
- `GET /api/nutrition` - Get all nutrition plans
- `GET /api/nutrition/:id` - Get a specific nutrition plan
- `POST /api/nutrition` - Create new nutrition plan (Admin)
- `PUT /api/nutrition/:id` - Update nutrition plan (Admin)
- `DELETE /api/nutrition/:id` - Delete nutrition plan (Admin)

### Blogs
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a specific blog
- `POST /api/blogs` - Create new blog (Admin)
- `PUT /api/blogs/:id` - Update blog (Admin)
- `DELETE /api/blogs/:id` - Delete blog (Admin)

### Progress Tracking
- `GET /api/progress` - Get user's progress history
- `POST /api/progress` - Create progress entry
- `PUT /api/progress/:id` - Update progress entry

### Community
- `GET /api/community` - Get all community posts
- `POST /api/community` - Create community post
- `POST /api/community/:id/like` - Like/Unlike post
- `POST /api/community/:id/comment` - Comment on post
- `DELETE /api/community/:id` - Delete community post (Admin or Post Owner)

### Subscription
- `POST /api/subscribe` - Create checkout session
- `GET /api/subscribe/status` - Check subscription status
- `POST /api/subscribe/complete` - Complete non-Stripe payment
- `POST /api/subscribe/cancel` - Cancel subscription
- `POST /api/subscribe/webhook` - Webhook for payment providers
