# Real Estate Management

A full-stack real estate management application.

## Tech Stack

- **Frontend:** React.js with Vite (JavaScript)
- **Backend:** Python FastAPI
- **Database:** MySQL
- **ORM:** SQLAlchemy
- **Driver:** PyMySQL

## Project Structure

```
real-estate-managment/
├── frontend/          # React + Vite frontend
├── backend/           # FastAPI backend
│   └── app/
│       ├── models/    # SQLAlchemy models
│       ├── schemas/   # Pydantic schemas
│       └── routers/   # API routers
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (v18+)
- Python (3.10+)
- MySQL server running locally

## Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows (Git Bash / PowerShell)
source venv/Scripts/activate        # Git Bash
# OR
.\venv\Scripts\Activate.ps1         # PowerShell

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your MySQL credentials

# Run the development server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

Interactive docs: `http://localhost:8000/docs`

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## MySQL Configuration

1. Ensure MySQL is running (default port `3306`).
2. Create a database:

```sql
CREATE DATABASE real_estate_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Copy `backend/.env.example` to `backend/.env` and fill in your credentials:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=real_estate_db
```

## API Endpoints

| Method | Endpoint | Description          |
|--------|----------|----------------------|
| GET    | `/`      | Health check / status |

## Notes

- No property tables or website functionality have been implemented yet.
- This is the initial project setup only.
