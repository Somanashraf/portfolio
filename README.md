# Muhammad Soman Ashraf — Portfolio (MERN Stack)

## Quick Start

### 1. Start MongoDB
Make sure MongoDB is running locally on port 27017.

### 2. Start Backend
```bash
cd server
npm install
npm run dev
```
Server runs on http://localhost:5000

### 3. Start Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## Admin Panel
- Visit: http://localhost:5173/admin/signup (first time)
- Then login at: http://localhost:5173/admin/login
- Or click "Admin Panel" in the side menu

## Environment Variables

### server/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### client/.env
```
VITE_API_URL=http://localhost:5000/api
VITE_GNEWS_KEY=your_gnews_api_key  # optional, get free key at gnews.io
```

## Features
- Dark/Light theme toggle (persisted in localStorage)
- Animated hero with typing effect
- Skills with animated progress bars
- Projects grid with hover overlays
- Tech news feed (GNews API)
- Contact form → stored in MongoDB
- Admin panel: manage projects, skills, about, messages
- Visitor analytics dashboard with charts
