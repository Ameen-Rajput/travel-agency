# Marwa Travel - Setup Instructions

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
Install MongoDB locally from https://www.mongodb.com/try/download/community

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string

### 3. Environment Variables
Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Backend Configuration
PORT=3001
NODE_ENV=development

# MongoDB - Update with your connection string
MONGODB_URI=mongodb://localhost:27017/marwa-travel
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/marwa-travel

# JWT Secret - CHANGE THIS to a random secure string
JWT_SECRET=your-super-secure-random-string-here

# Email Configuration (Optional - for booking confirmations)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@marwatravel.com

# Frontend URL
VITE_API_URL=http://localhost:3001/api
```

### 4. Start MongoDB
If using local MongoDB:
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongodb
```

### 5. Initialize Admin Account
```bash
# Start the backend server
npm run server
```

Then in another terminal or browser:
```bash
# Create initial admin account
curl -X POST http://localhost:3001/api/auth/setup
```

Default credentials:
- Username: `admin`
- Password: `Admin@123Secure`

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

### 6. Start Development Server
In a new terminal:
```bash
npm run dev
```

### 7. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Admin Login**: http://localhost:5173/admin/login

## Scripts

```bash
npm run dev      # Start Vite frontend dev server
npm run server   # Start Express backend server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/setup` - Create initial admin (one-time)

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create tour (protected)
- `PUT /api/tours/:id` - Update tour (protected)
- `DELETE /api/tours/:id` - Delete tour (protected)

### Bookings
- `GET /api/bookings` - Get all bookings (protected)
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/status` - Update booking status (protected)
- `DELETE /api/bookings/:id` - Delete booking (protected)

### Reviews
- `GET /api/reviews` - Get approved reviews
- `GET /api/reviews/all` - Get all reviews (protected)
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/:id` - Delete review (protected)

## Security Features Implemented

✅ JWT-based authentication
✅ Password hashing with bcrypt
✅ Environment variables for secrets
✅ Protected admin routes
✅ Input validation
✅ CORS enabled
✅ No hardcoded credentials

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill
```

### Admin Setup Already Done
If you see "Admin already exists", skip the setup step and use existing credentials.

## Next Steps

1. Login to admin panel: http://localhost:5173/admin/login
2. Add your tours with images
3. Configure email settings for booking notifications
4. Customize the frontend design
5. Test booking flow

## Production Deployment

Before deploying to production:

1. Change JWT_SECRET to a strong random string
2. Change admin password
3. Set NODE_ENV=production
4. Use MongoDB Atlas for database
5. Configure email service
6. Enable HTTPS
7. Set up proper CORS origins

---

Need help? Check the code or create an issue!
