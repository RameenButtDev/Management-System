# 🎓 Student Management System
> Full Stack Project — Next.js Frontend + Node.js/Express/MongoDB Backend

---

## 🚀 How to Run

### 1️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI
npm run dev
```
Backend runs on: **http://localhost:5000**

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
Frontend runs on: **http://localhost:3000**

---

## 📁 Project Structure
```
student-management-system/
├── backend/
│   ├── models/          # MongoDB Schemas
│   ├── controllers/     # Business Logic
│   ├── routes/          # API Routes
│   ├── server.js        # Entry Point
│   └── package.json
│
└── frontend/
    ├── app/             # Next.js App Router
    │   ├── page.js      # Main Dashboard
    │   ├── layout.js    # Root Layout
    │   └── globals.css  # Global Styles
    ├── components/      # Reusable Components
    │   ├── Navbar.js
    │   ├── StatsCards.js
    │   ├── StudentTable.js
    │   └── StudentModal.js
    ├── lib/
    │   └── api.js       # Axios API Client
    └── package.json
```

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students (with filters) |
| GET | /api/students/:id | Get single student |
| POST | /api/students | Add new student |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |
| GET | /api/students/stats | Dashboard stats |

---

## ✨ Features
- ✅ Add / Edit / Delete students
- 🔍 Search by name, roll number, email
- 🔎 Filter by department, status, semester
- 📊 Dashboard stats (total, active, graduated, avg CGPA)
- 📄 Pagination
- ✅ Form validation
- 📱 Fully responsive

## 🛠 Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)