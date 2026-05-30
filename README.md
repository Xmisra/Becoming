# Becoming — Versioned Storytelling Platform

Becoming is a timeline-based storytelling platform that helps people document long-term personal growth through evolving journeys rather than static posts.

Instead of writing a single article, users create a journey and continuously add versions over time, capturing progress, setbacks, lessons, and milestones. The platform transforms personal experiences into living timelines and provides AI-powered reflections that summarize growth patterns and emotional progression.

---

## Live Demo

Frontend: https://becoming-pi.vercel.app

Backend API: https://becoming-k0tg.onrender.com

---

## Screenshots

<img width="1470" height="807" alt="Screenshot 2026-05-31 at 2 21 47 AM" src="https://github.com/user-attachments/assets/e9e02fb7-b9fa-4952-a8b3-6715728f3a20" />
<img width="507" height="482" alt="Screenshot 2026-05-31 at 2 22 18 AM" src="https://github.com/user-attachments/assets/8691d73a-5405-49a8-83ad-903099f14c8c" />
<img width="737" height="614" alt="Screenshot 2026-05-31 at 2 22 48 AM" src="https://github.com/user-attachments/assets/2066a74d-6c5c-4a10-be5e-960d2e574a29" />


---

## Why I Built This

Most blogging platforms focus on publishing finished thoughts.

Real growth does not happen that way.

People evolve gradually through small wins, failures, experiments, and course corrections.

Becoming was designed around a simple idea:

> Every version of you deserves a place to exist.

Instead of static posts, users maintain evolving timelines that reflect how their thinking, skills, and emotions change over time.

---

## Key Features

### Authentication & Authorization

* JWT-based authentication
* HTTP-only cookie sessions
* Protected routes
* Authorization middleware
* Persistent login sessions

### Versioned Journey Architecture

* Create personal journeys
* Add chronological timeline updates
* Track emotional state using mood indicators
* View complete evolution history
* Public or private visibility controls

### Explore Feed

* Discover public journeys from other users
* Browse growth stories across different domains
* Read timeline-based narratives instead of isolated posts

### Profile Management

* User profile support
* Profile image uploads using Multer
* Secure media handling

### AI Reflection Engine

Generate meaningful reflections based on an entire journey timeline.

The AI analyzes:

* Emotional progression
* Growth patterns
* Consistency
* Resilience
* Key turning points

Users receive personalized insights generated from their historical journey updates.

---

## Architecture

### Journey Collection

Stores high-level journey metadata.

```text
Journey
├── title
├── description
├── author
├── tags
├── isPublic
└── timestamps
```

### Version Collection

Stores chronological updates separately.

```text
Version
├── journeyId
├── content
├── mood
└── timestamps
```

This separation allows:

* Unlimited timeline growth
* Cleaner data modeling
* Efficient version retrieval
* Easier future scaling

---

## AI Reflection Workflow

```text
User Timeline
      │
      ▼
Fetch Journey Versions
      │
      ▼
Build Timeline Context
      │
      ▼
Gemini API
      │
      ▼
Reflection Generation
      │
      ▼
Display Insight
```

Instead of sending raw database records, the backend transforms version history into structured narrative context before sending it to Gemini, producing more meaningful reflections.

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* Cookie Parser

### AI

* Google Gemini API

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── utils/

backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── services/
└── connection/
```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Xmisra/Becoming.git
cd becoming
```

### Backend Setup

```bash
cd backend
npm install
```

Create a .env file:

```env
PORT=8003
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

* Journey themes and discovery filters
* Tag-based search

---

## Learning Outcomes

Through this project, I gained hands-on experience with:

* REST API design
* Authentication and authorization
* Cookie-based session management
* MongoDB schema design
* File uploads using Multer
* Frontend-backend integration
* AI-powered application development
* Deployment and production configuration
* Full-stack application architecture

---

## Author

Soumik Misra

MCA, National Institute of Technology Kurukshetra

GitHub: https://github.com/Xmisra

LinkedIn: https://www.linkedin.com/in/soumik-misra-91731a1b4/

