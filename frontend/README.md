# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) application for managing Healthcare Professional (HCP) interactions. The project combines a modern React frontend with a FastAPI backend and integrates LangGraph with the Groq LLM to provide AI-assisted CRM capabilities.

---

## 🚀 Features

- Log HCP interactions
- View previous interactions
- Edit interaction records
- Delete interaction records
- AI Chat Assistant
- Search HCP using AI
- View Interaction History
- Suggest Follow-up actions
- LangGraph Tool Calling
- RESTful CRUD APIs

---

## 🛠️ Tech Stack

### Frontend
- React
- Redux Toolkit
- Material UI
- Axios

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- SQLite (Development Database)

### AI
- LangGraph
- Groq API
- Llama-3.3-70B-Versatile (or Gemma2-9B-IT)

---

## 🤖 LangGraph Tools

The AI agent is implemented using LangGraph and provides the following tools:

1. Log Interaction
2. Edit Interaction
3. Search HCP
4. Interaction History
5. Suggest Follow-up

---

## 📂 Project Structure

```
AI_CRM
│
├── backend
│   ├── app
│   │   ├── routers
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── tools.py
│   │   ├── graph.py
│   │   ├── agent.py
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── features
│   │   ├── pages
│   │   └── api
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate it.

Windows

```bash
venv\Scripts\activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run the backend.

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

## 💻 Frontend Setup

Navigate to frontend.

```bash
cd frontend
```

Install packages.

```bash
npm install
```

Run React.

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

## 🧠 AI Workflow

```
User
      ↓
React UI
      ↓
Redux Toolkit
      ↓
Axios API
      ↓
FastAPI
      ↓
LangGraph Agent
      ↓
Groq LLM
      ↓
Tool Execution
      ↓
SQLite Database
```

---

## 📸 Screenshots

- Dashboard
- Log Interaction Form
- AI Assistant
- Previous Interactions
- Edit Interaction
- Delete Interaction

(Add screenshots here if available.)

---

## 🔮 Future Improvements

- AI-powered automatic form filling from natural language.
- PostgreSQL/MySQL support.
- Authentication and role-based access.
- Meeting transcript summarization.
- Voice-enabled interaction logging.

---

## 👨‍💻 Author

**Mainak Karmakar**

MCA Graduate | Python Backend Developer | AI Enthusiast
