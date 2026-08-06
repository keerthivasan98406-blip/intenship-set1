# Production-Ready Full Stack MERN Personal Portfolio Application

A modern, high-performance, and responsive Full Stack MERN Personal Portfolio website built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **React Router DOM**, **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**.

---

## 🌟 Features

### 1. **Home Page**
- Hero section with role typing animation effect.
- Professional profile avatar and intro.
- Download Resume and View Projects call-to-action buttons.
- Social media profile links (GitHub, LinkedIn, Email).
- Smooth Framer Motion entrance animations.

### 2. **About Page**
- Personal introduction & career objectives.
- Education history with GPA & honors.
- Experience timeline.
- Personal information matrix.

### 3. **Skills Page**
- Categorized skills: Frontend, Backend, Database, Programming Languages, Tools.
- Animated proficiency bars.

### 4. **Projects Page**
- Dynamic project showcase loaded from MongoDB database.
- Live title & technology search bar.
- Category filter buttons (*All, Full Stack, Frontend, Backend, AI/ML*).
- Project detail preview modal.
- Technology badges with GitHub and Live Demo buttons.

### 5. **Resume Page**
- Interactive curriculum vitae preview container.
- Downloadable resume button (.txt / PDF format).

### 6. **Contact Page**
- Validated contact form saving submissions into MongoDB `messages` collection.
- Instant success feedback toast notifications.
- Contact details info cards (Email, Phone, Location).
- Embedded interactive Google Map.

### 7. **Admin Panel**
- Secure Admin Login (`/admin/login`) with JWT token authentication.
- Admin Dashboard (`/admin/dashboard`) to:
  - Add, edit, and delete projects.
  - Add and delete skills.
  - View and delete visitor contact inquiries.

---

## 📁 Project Structure

```
portfolio/
├── client/                     # React Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ScrollToTop, LoadingSpinner, ProtectedRoute
│   │   ├── context/            # AuthContext.jsx
│   │   ├── pages/              # Home, About, Skills, Projects, Resume, Contact, AdminLogin, AdminDashboard, NotFound
│   │   ├── services/           # api.js (Axios wrapper)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind directives + glassmorphism
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── server/                     # Express & Mongoose Backend
│   ├── config/                 # db.js (Mongoose connection)
│   ├── controllers/            # authController, projectController, skillController, messageController
│   ├── middleware/             # authMiddleware, errorHandler
│   ├── models/                 # Project, Skill, Message, Admin (Mongoose schemas)
│   ├── routes/                 # authRoutes, projectRoutes, skillRoutes, messageRoutes
│   ├── .env
│   ├── package.json
│   └── server.js               # Entry point
│
├── package.json                # Root concurrent scripts
└── README.md
```

---

## ⚙️ Installation & Running Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Install Client Dependencies
```bash
cd ../client
npm install
```

### 3. Environment Setup (`server/.env`)
Create or edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mern_portfolio?retryWrites=true&w=majority
JWT_SECRET=mern_portfolio_super_secret_jwt_key_2026
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 4. Run the Full Stack Application

**Run Backend Server:**
```bash
cd server
node server.js
```
*Backend server runs on port 5000: `http://localhost:5000`*

**Run Frontend Dev Server:**
```bash
cd client
npm run dev
```
*Frontend app runs on port 5173: `http://localhost:5173`*

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
1. Push project to GitHub repository.
2. Import repository in [Vercel](https://vercel.com).
3. Set root directory to `client`.
4. Build command: `npm run build`, Output directory: `dist`.

### Backend (Render)
1. Import repository in [Render](https://render.com).
2. Set root directory to `server`.
3. Build command: `npm install`, Start command: `node server.js`.
4. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`).
