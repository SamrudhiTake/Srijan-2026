# SRIJAN — "TOGETHER, WE CREATE"
### College-Level Technical Fest Website & In-Built MERN Registration System

Official full-stack MERN repository for **SRIJAN**, a college-level technical fest celebrating student innovation, engineering, and competitive excellence.

---

## 🌐 Live Deployments

- **Frontend (Vercel)**: [https://srijan-2026-one.vercel.app](https://srijan-2026-one.vercel.app)
- **Backend (Render)**: [https://srijan-2026-ebak.onrender.com](https://srijan-2026-ebak.onrender.com)
- **Backend Health Check**: [https://srijan-2026-ebak.onrender.com/api/health](https://srijan-2026-ebak.onrender.com/api/health)

### Local Development URLs
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:9000](http://localhost:9000)

---

## 🚀 Full Tech Stack

### Frontend (`client/`)
- **Framework**: React.js 18 (Vite)
- **Styling**: Tailwind CSS (Cosmic Dark & Gold Accent Palette)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Features**: Responsive layout, cosmic canvas particles, interactive event cards, dynamic registration forms, printable registration receipt.

### Backend (`server/`)
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB Atlas + Mongoose
- **Security & Reliability**: CORS configured, rate limiting (`express-rate-limit`), input sanitization, sequential ID generation, duplicate email check.

---

## 📁 Project Structure

```
Srijan/
├── client/                     # React Frontend
│   ├── public/                 # Static assets & brochures (event-1.pdf, etc.)
│   ├── src/
│   │   ├── assets/             # Brand logos & S mark
│   │   ├── components/         # Reusable UI components
│   │   │   ├── IndividualRegistrationForm.jsx # Single participant form
│   │   │   ├── TeamRegistrationForm.jsx       # Dynamic Hackathon team form
│   │   │   ├── RegistrationSuccess.jsx        # Receipt with Print/Download
│   │   │   ├── RegistrationForm.jsx           # Form orchestrator & event switcher
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   └── ...
│   │   ├── data/
│   │   │   └── events.js       # Centralized event data & registration config
│   │   ├── pages/              # Home, Events, EventDetails, Registration, About
│   │   └── services/
│   │       └── api.js          # API client calling Express backend
│   ├── package.json
│   └── vite.config.js          # Configured with /api proxy to http://localhost:5000
│
├── server/                     # Express + MongoDB Backend
│   ├── config/
│   │   └── db.js               # MongoDB Atlas connection handler
│   ├── controllers/
│   │   ├── eventController.js         # Event queries & auto-seeding
│   │   └── registrationController.js  # Registration creation & duplicate validation
│   ├── middleware/
│   │   ├── errorMiddleware.js         # User-friendly error responses
│   │   └── rateLimiter.js             # Spam protection rate limiter
│   ├── models/
│   │   ├── Event.js                   # Event schema
│   │   └── Registration.js            # Registration schema (Individual & Team)
│   ├── routes/
│   │   ├── eventRoutes.js             # /api/events
│   │   └── registrationRoutes.js      # /api/registrations
│   ├── utils/
│   │   └── generateRegistrationId.js  # Sequential ID generator (e.g. SRJ-HACK-0001)
│   ├── data/
│   │   └── seedData.js                # Initial seed data for the 6 competitions
│   ├── server.js                      # Server entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🍃 MongoDB Atlas Setup Guide (Step-by-Step)

Follow these steps to connect your MongoDB Atlas cloud database:

### 1. Create a MongoDB Atlas Account & Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in or create a free account.
2. Click **"Build a Database"** and select the **M0 Free** shared tier.
3. Choose your preferred cloud provider and region (e.g., AWS / Mumbai `ap-south-1` or closest to you).
4. Click **"Create Deployment"**.

### 2. Create a Database User
1. Under **Security** in the left sidebar, click **"Database Access"**.
2. Click **"Add New Database User"**.
3. Authentication Method: **Password**.
4. Set a Username (e.g. `srijan_admin`) and a secure Password.
5. Under Database User Privileges, select **"Read and write to any database"**.
6. Click **"Add User"**.

### 3. Configure IP Access (Network Access)
1. Under **Security** in the left sidebar, click **"Network Access"**.
2. Click **"Add IP Address"**.
3. For development or cloud deployment, click **"Allow Access From Anywhere"** (`0.0.0.0/0`) or enter your current IP.
4. Click **"Confirm"**.

### 4. Obtain the Connection String
1. Under **Deployment** in the left sidebar, click **"Database"**.
2. Click the **"Connect"** button on your cluster.
3. Choose **"Drivers"** (Node.js).
4. Copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```
5. Append your database name before the `?` query string (e.g. `/srijan_db`):
   ```
   mongodb+srv://srijan_admin:YourPassword123@cluster0.abcde.mongodb.net/srijan_db?retryWrites=true&w=majority
   ```

### 5. Add MONGO_URI to `server/.env`
1. Open `server/.env` in your editor.
2. Paste your connection string:
   ```env
   PORT=9000
   CLIENT_URL=https://srijan-2026-one.vercel.app
   MONGO_URI=mongodb+srv://samrudhitake31_db_user:srijan%4012345@cluster0.4bgusfj.mongodb.net/SrijanRegistration
   ```
3. Save the file.

---

## 🏃 Running the Full MERN Stack

### 1. Start the Backend Server (Port 9000)
```bash
cd server
npm install
npm start
```
> The server will automatically connect to MongoDB Atlas and auto-seed the 6 official Srijan events if the collection is empty.
> Health check: `http://localhost:9000/api/health` or `https://srijan-2026-ebak.onrender.com/api/health`

### 2. Start the Frontend Client (Port 3000)
```bash
cd client
npm install
npm run dev
```
> Open your browser at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health status and DB connection status |
| `GET` | `/api/events` | List all available events |
| `GET` | `/api/events/:id` | Get single event by slug or ID |
| `POST` | `/api/registrations` | Register individual participant or Hackathon team |
| `GET` | `/api/registrations/:registrationId` | Query registration by unique ID |
| `GET` | `/api/registrations` | Admin query endpoint (supports `?eventId=`, `?search=`, `?type=`) |

---

## 📋 Registration ID Formats
Generated safely and sequentially by the backend:
- **Hackathon**: `SRJ-HACK-0001`, `SRJ-HACK-0002`...
- **KBC Quiz**: `SRJ-KBC-0001`, `SRJ-KBC-0002`...
- **PCB Designing**: `SRJ-PCB-0001`, `SRJ-PCB-0002`...
- **CAD Modeling**: `SRJ-CAD-0001`, `SRJ-CAD-0002`...
- **Bridge Making**: `SRJ-BRG-0001`, `SRJ-BRG-0002`...
- **Circuit Making**: `SRJ-CIRCUIT-0001`, `SRJ-CIRCUIT-0002`...

---

## 🔍 How to Verify Data in MongoDB Atlas
1. Log in to [cloud.mongodb.com](https://cloud.mongodb.com).
2. Go to **Database** -> click on your cluster -> click **"Browse Collections"**.
3. Select database `srijan_db`.
4. Check collections:
   - `events`: Contains the 6 competition definitions.
   - `registrations`: Displays submitted individual and team registration documents.
