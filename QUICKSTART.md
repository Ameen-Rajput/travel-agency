# Quick Start Guide - Marwa Travel

## 🚀 Fastest Way to Get Started (Without MongoDB)

Your website is **already working** with localStorage! Backend is optional.

### Option 1: Run Without Backend (Simplest)
```bash
npm run dev
```
Visit: http://localhost:5173

Everything works with localStorage:
- ✅ Tours
- ✅ Bookings
- ✅ Reviews
- ✅ Admin panel

---

## 🗄️ Option 2: Add Backend + MongoDB (Recommended for Production)

### A. Using MongoDB Atlas (Free Cloud Database) - EASIEST

1. **Create Free MongoDB Atlas Account:**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up with Google/Email

2. **Create a Cluster:**
   - Choose "Free Shared" tier
   - Select closest region
   - Create cluster (takes 3-5 minutes)

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`

4. **Update .env file:**
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/marwa-travel
   ```

5. **Whitelist Your IP:**
   - In Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)

6. **Start Backend:**
   ```bash
   npm run server
   ```

7. **Create Admin:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/setup
   ```

8. **Start Frontend:**
   ```bash
   npm run dev
   ```

**Done! Everything now works with real database.**

---

### B. Using Local MongoDB (Advanced Users)

1. **Download MongoDB:**
   - Windows: https://www.mongodb.com/try/download/community
   - Install with default settings

2. **Start MongoDB:**
   ```bash
   mongod
   ```

3. **Start Backend:**
   ```bash
   npm run server
   ```

4. **Create Admin:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/setup
   ```

5. **Start Frontend:**
   ```bash
   npm run dev
   ```

---

## 🔑 Default Admin Credentials

- **Username:** `admin`
- **Password:** `Admin@123Secure`

**⚠️ IMPORTANT:** Change password after first login!

---

## 📧 Email Notifications (Optional)

To enable booking confirmation emails:

1. **For Gmail:**
   - Enable 2-factor authentication
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Update `.env`:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-digit-app-password
   ```

2. **Restart backend server**

Now customers get email confirmations automatically!

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Frontend loads at http://localhost:5173
- [ ] Backend running at http://localhost:3001
- [ ] Can access http://localhost:3001/api/health
- [ ] Can login to admin panel
- [ ] Can add tours in admin panel
- [ ] Tours appear on homepage
- [ ] Can make bookings
- [ ] Bookings show in admin dashboard

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- **Solution 1:** Use MongoDB Atlas (easier)
- **Solution 2:** Make sure `mongod` is running
- **Solution 3:** Check MONGODB_URI in `.env`

### "Port 3001 already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill
```

### "Admin already exists"
Admin account is already created. Use existing credentials to login.

### Tours not showing
1. Login to admin panel
2. Go to "Manage Tours"
3. Add at least one tour
4. Refresh homepage

---

## 📱 What Works Right Now (Without MongoDB)

✅ Full website with all features
✅ Tours display
✅ Booking system
✅ Admin panel
✅ Reviews
✅ All animations and UI

Data is stored in **browser localStorage** - perfect for development!

---

## 🎯 Recommended Path

1. **Start simple:** Run without MongoDB first
2. **Add tours:** Use admin panel to add 3-4 tours
3. **Test everything:** Make bookings, add reviews
4. **Then add MongoDB:** Use Atlas for cloud database
5. **Configure email:** Optional but recommended

---

Need more help? Check `IMPROVEMENTS.md` for detailed project overview!
